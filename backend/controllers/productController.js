const asyncHandler = require('express-async-handler');
const Product = require('../models/Product');
const Category = require('../models/Category');

const getProducts = asyncHandler(async (req, res) => {
  const pageSize = Number(req.query.pageSize) || 12;
  const page = Number(req.query.pageNumber) || Number(req.query.page) || 1;

  const filter = {};

  if (req.query.keyword) {
    filter.name = { $regex: req.query.keyword, $options: 'i' };
  }

  if (req.query.category) {
    const children = await Category.find({ parent: req.query.category }).select('_id');
    const childIds = children.map(c => c._id);
    filter.category = { $in: [req.query.category, ...childIds] };
  }

  if (req.query.parentCategory) {
    const subCats = await Category.find({ parent: req.query.parentCategory }).select('_id');
    const subCatIds = subCats.map(c => c._id);
    const grandSubCats = await Category.find({ parent: { $in: subCatIds } }).select('_id');
    const allCatIds = [...subCatIds, ...grandSubCats.map(c => c._id)];
    filter.category = { $in: allCatIds };
  }

  if (req.query.featured === 'true') {
    filter.featured = true;
  }

  const sort = req.query.sort || '-createdAt';

  const isLightweight = req.query.featured === 'true' && Number(req.query.pageSize) <= 10;

  const products = await Product.find(filter)
    .select(isLightweight ? 'name price image originalPrice' : undefined)
    .populate(isLightweight ? undefined : { path: 'category', populate: { path: 'parent', select: 'name slug' } })
    .sort(sort)
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .lean();

  if (isLightweight) {
    return res.json({ products, page: 1, pages: 1, count: products.length });
  }

  const count = await Product.countDocuments(filter);

  res.json({
    products,
    page,
    pages: Math.ceil(count / pageSize),
    count,
  });
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate({
    path: 'category',
    populate: { path: 'parent', select: 'name slug' },
  });
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

const createProduct = asyncHandler(async (req, res) => {
  const { name, price, originalPrice, image, description, category, stock, featured } = req.body;

  const product = new Product({
    name,
    price,
    originalPrice: originalPrice || 0,
    image: image || '',
    description: description || '',
    category,
    stock: stock || 0,
    featured: featured || false,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = req.body.name || product.name;
    product.price = req.body.price || product.price;
    product.originalPrice = req.body.originalPrice !== undefined ? req.body.originalPrice : product.originalPrice;
    product.description = req.body.description || product.description;
    product.image = req.body.image || product.image;
    product.category = req.body.category || product.category;
    product.stock = req.body.stock || product.stock;
    product.featured = req.body.featured !== undefined ? req.body.featured : product.featured;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};