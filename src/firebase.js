import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const app = firebase.initializeApp({
  apiKey: "AIzaSyDmxc1WmCtXmdgeSWZj79IRTK-7-g9VDGc",
  authDomain: "auth-test-development-b7d8b.firebaseapp.com",
  projectId: "auth-test-development-b7d8b",
  storageBucket: "auth-test-development-b7d8b.appspot.com",
  messagingSenderId: "529720081735",
  appId: "1:529720081735:web:5f24d3746d4ebbdfdd6062",
  //   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  //   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  //   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  //   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  //   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  //   appId: process.env.REACT_APP_FIREBASE_APP_ID,
});

export const auth = app.auth();
export default app;
