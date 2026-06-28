const express = require('express');
const {
  createOrder,
  getMyOrders,
  getOrderById,
  cancelOrder,
} = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');
const { validateObjectId } = require('../middleware/validate');

const router = express.Router();

router.route('/').post(protect, createOrder);
router.route('/myorders').get(protect, getMyOrders);
router.route('/:id').get(protect, validateObjectId, getOrderById);
router.route('/:id/cancel').put(protect, validateObjectId, cancelOrder);

module.exports = router;
