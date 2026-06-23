const asyncHandler = require('express-async-handler');
const Category = require('../models/Category');

const getCategories = asyncHandler(async (req, res) => {
  const filter = req.query.parent === 'null'
    ? { parent: null }
    : req.query.parent
      ? { parent: req.query.parent }
      : {};
  const categories = await Category.find(filter).populate('parent', 'name slug');
  res.json(categories);
});

const createCategory = asyncHandler(async (req, res) => {
  const { name, slug, description, parent } = req.body;

  const categoryExists = await Category.findOne({ name, parent: parent || null });
  if (categoryExists) {
    res.status(400);
    throw new Error('Category already exists');
  }

  const category = await Category.create({ name, slug, description, parent: parent || null });
  res.status(201).json(category);
});

const updateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (category) {
    category.name = req.body.name || category.name;
    category.slug = req.body.slug || category.slug;
    category.description = req.body.description || category.description;

    const updatedCategory = await category.save();
    res.json(updatedCategory);
  } else {
    res.status(404);
    throw new Error('Category not found');
  }
});

const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (category) {
    await Category.deleteOne({ _id: category._id });
    res.json({ message: 'Category removed' });
  } else {
    res.status(404);
    throw new Error('Category not found');
  }
});

module.exports = {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};