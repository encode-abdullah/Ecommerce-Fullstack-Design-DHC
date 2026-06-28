const express = require('express');
const {
  syncUser,
  getUserProfile,
  updateUserProfile,
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { validateSyncUser, validateProfileUpdate } = require('../middleware/validate');
const { generalLimiter, registerLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

router.post('/sync', protect, registerLimiter, validateSyncUser, syncUser);
router
  .route('/profile')
  .get(protect, generalLimiter, getUserProfile)
  .put(protect, generalLimiter, validateProfileUpdate, updateUserProfile);

module.exports = router;
