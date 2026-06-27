const express = require('express');
const {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/categoryController');
const { protect, admin } = require('../middleware/authMiddleware');
const { validateCategory, validateObjectId } = require('../middleware/validate');

const router = express.Router();

router.route('/').get(getCategories).post(protect, admin, validateCategory, createCategory);
router
  .route('/:id')
  .put(protect, admin, validateObjectId, validateCategory, updateCategory)
  .delete(protect, admin, validateObjectId, deleteCategory);

module.exports = router;
