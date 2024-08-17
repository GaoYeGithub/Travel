import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCJehmF1WargtYYGBm-WlzJRyw1RShqCHI",
    authDomain: "login-ade2f.firebaseapp.com",
    projectId: "login-ade2f",
    storageBucket: "login-ade2f.appspot.com",
    messagingSenderId: "400542060628",
    appId: "1:400542060628:web:4a830e3617f48a213e1dc1",
    measurementId: "G-3Y7L2BTW6C"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
