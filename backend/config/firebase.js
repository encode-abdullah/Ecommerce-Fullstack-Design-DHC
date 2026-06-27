const admin = require('firebase-admin');
const { getAuth } = require('firebase-admin/auth');
const path = require('path');
const fs = require('fs');

const serviceAccountPath = path.join(__dirname, 'serviceAccountKey.json');

let app;

if (fs.existsSync(serviceAccountPath)) {
  const serviceAccount = require(serviceAccountPath);
  app = admin.initializeApp({
    credential: admin.cert(serviceAccount),
  });
  console.log('Firebase Admin initialized with service account');
} else {
  try {
    app = admin.initializeApp();
    console.log('Firebase Admin initialized with application default credentials');
  } catch (error) {
    console.warn('Firebase Admin not fully initialized. Some auth features may not work.');
  }
}

const auth = app ? getAuth(app) : null;

module.exports = { admin, auth };
