import express from 'express';
import {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders
} from '../controllers/orders.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .post(protect, createOrder)
  .get(protect, getMyOrders);

router.get('/admin', protect, admin, getAllOrders);
router.route('/:id')
  .get(protect, getOrderById);

export default router;