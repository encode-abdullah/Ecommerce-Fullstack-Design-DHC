import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyB4itFR0knS57AzP-gRug5PMRQu2y1XqfU",
  authDomain: "dravix-ecommerce.firebaseapp.com",
  projectId: "dravix-ecommerce",
  storageBucket: "dravix-ecommerce.firebasestorage.app",
  messagingSenderId: "692240641306",
  appId: "1:692240641306:web:4237cb50fdf791479b50a3",
  measurementId: "G-R9DFX9G11G"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
