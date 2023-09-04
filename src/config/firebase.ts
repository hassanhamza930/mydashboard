// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDZlsa__6NLCjlDc41uxuugEUOhNcdhjCo",
  authDomain: "the-dashboard-78f15.firebaseapp.com",
  projectId: "the-dashboard-78f15",
  storageBucket: "the-dashboard-78f15.appspot.com",
  messagingSenderId: "798579997007",
  appId: "1:798579997007:web:eb672430cc253d25fe6d3a",
  measurementId: "G-NZVJF9BD3K",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
getAnalytics(firebaseApp);
