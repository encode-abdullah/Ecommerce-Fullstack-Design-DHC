const asyncHandler = require('express-async-handler');
const { auth } = require('../config/firebase');
const User = require('../models/User');

if (!auth) {
  console.warn('Firebase Auth is not initialized. Authentication will not work.');
}

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decodedToken = await auth.verifyIdToken(token);
      const firebaseUid = decodedToken.uid;

      let user = await User.findOne({ firebaseUid }).select('-password');

      if (!user) {
        user = await User.create({
          firebaseUid,
          name: decodedToken.name || decodedToken.email?.split('@')[0] || 'User',
          email: decodedToken.email || '',
          role: 'user',
          profileImage: decodedToken.picture || '',
        });
      }

      req.user = user;
      next();
    } catch (error) {
      console.error('Auth verification failed:', error.message);
      res.status(401);
      throw new Error('Not authorized');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized');
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403);
    throw new Error('Admin access required');
  }
};

module.exports = { protect, admin };
