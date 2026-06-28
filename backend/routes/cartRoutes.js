const express = require('express');
const { body, param } = require('express-validator');
const {
  getCart,
  addToCart,
  updateCart,
  removeFromCart,
  clearCart,
} = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');
const { handleValidationErrors } = require('../middleware/validate');

const router = express.Router();

router.route('/').get(protect, getCart);

router.post('/add', protect, [
  body('productId').isMongoId().withMessage('Invalid product ID'),
  body('quantity').optional().isInt({ min: 1, max: 999 }).withMessage('Quantity must be 1-999'),
  handleValidationErrors,
], addToCart);

router.put('/update', protect, [
  body('productId').isMongoId().withMessage('Invalid product ID'),
  body('quantity').isInt({ min: 1, max: 999 }).withMessage('Quantity must be 1-999'),
  handleValidationErrors,
], updateCart);

router.delete('/remove/:productId', protect, [
  param('productId').isMongoId().withMessage('Invalid product ID'),
  handleValidationErrors,
], removeFromCart);

router.delete('/clear', protect, clearCart);

module.exports = router;
