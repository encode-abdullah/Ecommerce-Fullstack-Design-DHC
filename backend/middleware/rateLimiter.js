const rateLimit = require('express-rate-limit');

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 500,
  message: { message: 'Too many requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { message: 'Too many login attempts. Please try again in 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
});

const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 3,
  message: { message: 'Too many registration attempts. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

const failedLoginAttempts = new Map();
const LOCKOUT_DURATION = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;

const checkAccountLockout = (req, res, next) => {
  const { email } = req.body;
  if (!email) return next();

  const normalizedEmail = email.toLowerCase().trim();
  const record = failedLoginAttempts.get(normalizedEmail);

  if (record && record.lockedUntil && Date.now() < record.lockedUntil) {
    return res.status(423).json({ message: 'Account temporarily locked. Try again in 15 minutes.' });
  }

  if (record && record.lockedUntil && Date.now() >= record.lockedUntil) {
    failedLoginAttempts.delete(normalizedEmail);
  }

  next();
};

const recordFailedLogin = (email) => {
  const normalizedEmail = email.toLowerCase().trim();
  const record = failedLoginAttempts.get(normalizedEmail) || { attempts: 0 };
  record.attempts += 1;

  if (record.attempts >= MAX_ATTEMPTS) {
    record.lockedUntil = Date.now() + LOCKOUT_DURATION;
    record.attempts = 0;
  }

  failedLoginAttempts.set(normalizedEmail, record);
};

const clearFailedLogins = (email) => {
  const normalizedEmail = email.toLowerCase().trim();
  failedLoginAttempts.delete(normalizedEmail);
};

module.exports = {
  generalLimiter,
  loginLimiter,
  registerLimiter,
  checkAccountLockout,
  recordFailedLogin,
  clearFailedLogins,
};
