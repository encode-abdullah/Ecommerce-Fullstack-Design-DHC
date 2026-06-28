const { body, param, validationResult } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: errors.array().map(e => ({ field: e.path, message: e.msg })),
    });
  }
  next();
};

const validateRegister = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 }).withMessage('Name must be 2-50 characters')
    .matches(/^[a-zA-Z\s]+$/).withMessage('Name must contain only letters and spaces'),
  body('email')
    .trim()
    .isEmail().withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 8, max: 128 }).withMessage('Password must be 8-128 characters')
    .matches(/[a-z]/).withMessage('Password must contain a lowercase letter')
    .matches(/[A-Z]/).withMessage('Password must contain an uppercase letter')
    .matches(/[0-9]/).withMessage('Password must contain a number'),
  handleValidationErrors,
];

const validateLogin = [
  body('email')
    .trim()
    .isEmail().withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ max: 128 }).withMessage('Password is too long'),
  handleValidationErrors,
];

const validateProduct = [
  body('name')
    .trim()
    .isLength({ min: 1, max: 200 }).withMessage('Product name must be 1-200 characters'),
  body('price')
    .isFloat({ min: 0.01 }).withMessage('Price must be a positive number'),
  body('category')
    .optional()
    .isMongoId().withMessage('Invalid category ID'),
  body('stock')
    .optional()
    .isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),
  body('originalPrice')
    .optional()
    .isFloat({ min: 0 }).withMessage('Original price must be non-negative'),
  handleValidationErrors,
];

const validateCategory = [
  body('name')
    .trim()
    .isLength({ min: 1, max: 100 }).withMessage('Category name must be 1-100 characters'),
  body('parent')
    .optional({ nullable: true })
    .isMongoId().withMessage('Invalid parent category ID'),
  handleValidationErrors,
];

const validateObjectId = [
  param('id')
    .isMongoId().withMessage('Invalid ID format'),
  handleValidationErrors,
];

const validateSyncUser = [
  body('firebaseUid')
    .notEmpty().withMessage('Firebase UID is required'),
  body('email')
    .optional()
    .isEmail().withMessage('Invalid email format')
    .normalizeEmail(),
  body('name')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 }).withMessage('Name must be 1-100 characters'),
  handleValidationErrors,
];

const validateProfileUpdate = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 }).withMessage('Name must be 1-100 characters'),
  body('email')
    .optional()
    .isEmail().withMessage('Invalid email format')
    .normalizeEmail(),
  body('profileImage')
    .optional()
    .isString().withMessage('Profile image must be a string'),
  handleValidationErrors,
];

module.exports = {
  handleValidationErrors,
  validateRegister,
  validateLogin,
  validateProduct,
  validateCategory,
  validateObjectId,
  validateSyncUser,
  validateProfileUpdate,
};
