const express = require('express');
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware');
const { validateProduct, validateObjectId } = require('../middleware/validate');

const router = express.Router();

router.route('/').get(getProducts).post(protect, admin, validateProduct, createProduct);
router
  .route('/:id')
  .get(validateObjectId, getProductById)
  .put(protect, admin, validateObjectId, validateProduct, updateProduct)
  .delete(protect, admin, validateObjectId, deleteProduct);

module.exports = router;
