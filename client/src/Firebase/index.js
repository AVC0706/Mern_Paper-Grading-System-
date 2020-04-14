import firebase from "firebase/app";
import "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8O_kO4V5kZYjGL2wOqvAz-Tn09jgP9Tk",
  authDomain: "testlogin-75605.firebaseapp.com",
  databaseURL: "https://testlogin-75605.firebaseio.com",
  projectId: "testlogin-75605",
  storageBucket: "testlogin-75605.appspot.com",
  messagingSenderId: "679575888781",
  appId: "1:679575888781:web:78e3240de9d8326abf13c4",
  measurementId: "G-V4X480SQ4H"
};

// Initialize Firebase

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { firebase, storage as default };
