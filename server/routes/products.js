import express from 'express';
import {
  getProducts,
  getProductById,
  createProductReview,
  getTopProducts,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/products.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getProducts)
  .post(protect, admin, createProduct);

router.get('/top', getTopProducts);
router.route('/:id')
  .get(getProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

router.post('/:id/reviews', protect, createProductReview);

export default router;