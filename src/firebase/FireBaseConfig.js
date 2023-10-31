// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZUkl3F-4O07Yi-d1SkTzGouo4RVEKQEQ",
  authDomain: "fir-practice-70e10.firebaseapp.com",
  projectId: "fir-practice-70e10",
  storageBucket: "fir-practice-70e10.appspot.com",
  messagingSenderId: "181060611254",
  appId: "1:181060611254:web:ee7b16805fec8657274a17"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;