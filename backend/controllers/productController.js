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
    filter.category = req.query.category;
  }

  if (req.query.parentCategory) {
    const subCats = await Category.find({ parent: req.query.parentCategory }).select('_id');
    filter.category = { $in: subCats.map(c => c._id) };
  }

  if (req.query.featured === 'true') {
    filter.featured = true;
  }

  const sort = req.query.sort || '-createdAt';

  const count = await Product.countDocuments(filter);

  const products = await Product.find(filter)
    .populate({ path: 'category', populate: { path: 'parent', select: 'name slug' } })
    .sort(sort)
    .limit(pageSize)
    .skip(pageSize * (page - 1));

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
  const product = new Product({
    name: 'Sample Name',
    price: 0,
    description: 'Sample Description',
    image: '/images/sample.jpg',
    category: req.body.category,
    stock: 0,
    featured: false,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = req.body.name || product.name;
    product.price = req.body.price || product.price;
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