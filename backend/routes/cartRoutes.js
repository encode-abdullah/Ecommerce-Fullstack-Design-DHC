const express = require('express');
const {
  getCart,
  addToCart,
  updateCart,
  removeFromCart,
  clearCart,
} = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').get(protect, getCart);
router.post('/add', protect, addToCart);
router.put('/update', protect, updateCart);
router.delete('/remove/:productId', protect, removeFromCart);
router.delete('/clear', protect, clearCart);

module.exports = router;