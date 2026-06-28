const express = require('express');
const {
  syncUser,
  getUserProfile,
  updateUserProfile,
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { validateSyncUser, validateProfileUpdate } = require('../middleware/validate');

const router = express.Router();

router.post('/sync', protect, validateSyncUser, syncUser);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, validateProfileUpdate, updateUserProfile);

module.exports = router;
