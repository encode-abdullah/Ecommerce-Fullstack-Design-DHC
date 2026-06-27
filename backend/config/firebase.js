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
} else if (process.env.FIREBASE_TYPE) {
  try {
    const serviceAccount = {
      type: process.env.FIREBASE_TYPE,
      project_id: process.env.FIREBASE_PROJECT_ID,
      private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
      private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      client_id: process.env.FIREBASE_CLIENT_ID,
      auth_uri: process.env.FIREBASE_AUTH_URI,
      token_uri: process.env.FIREBASE_TOKEN_URI,
      auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_CERT_URL,
      client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,
    };
    app = admin.initializeApp({
      credential: admin.cert(serviceAccount),
    });
    console.log('Firebase Admin initialized with individual env vars');
  } catch (error) {
    console.warn('Failed to initialize Firebase with env vars:', error.message);
    app = admin.initializeApp();
    console.log('Firebase Admin initialized with application default credentials');
  }
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
