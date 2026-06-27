const asyncHandler = require('express-async-handler');
const User = require('../models/User');

const syncUser = asyncHandler(async (req, res) => {
  const { firebaseUid, email, name, profileImage } = req.body;

  let user = await User.findOne({ firebaseUid }).select('-password');

  if (!user) {
    user = await User.findOne({ email }).select('-password');
    if (user) {
      user.firebaseUid = firebaseUid;
      if (!user.profileImage && profileImage) {
        user.profileImage = profileImage;
      }
      if (!user.name && name) {
        user.name = name;
      }
      user = await user.save();
    }
  }

  if (!user) {
    user = await User.create({
      firebaseUid,
      name: name || email?.split('@')[0] || 'User',
      email: email || '',
      profileImage: profileImage || '',
      role: 'user',
    });
    user = user.toObject();
    delete user.password;
  }

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    profileImage: user.profileImage || '',
    firebaseUid: user.firebaseUid,
  });
});

const getUserProfile = asyncHandler(async (req, res) => {
  res.json({
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    role: req.user.role,
    profileImage: req.user.profileImage || '',
    firebaseUid: req.user.firebaseUid,
  });
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.profileImage !== undefined) {
      user.profileImage = req.body.profileImage;
    }
    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      profileImage: updatedUser.profileImage || '',
      firebaseUid: updatedUser.firebaseUid,
    });
  } else {
    res.status(401);
    throw new Error('Not authorized');
  }
});

module.exports = {
  syncUser,
  getUserProfile,
  updateUserProfile,
};
