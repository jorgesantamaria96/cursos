import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBHUo_AqluB783HDZB63BHkCocOK_7YhDg",
  authDomain: "react-app-cursos-cc99a.firebaseapp.com",
  projectId: "react-app-cursos-cc99a",
  storageBucket: "react-app-cursos-cc99a.appspot.com",
  messagingSenderId: "751146839629",
  appId: "1:751146839629:web:4e60e92f2d18dd63b57604",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { db, googleAuthProvider, firebase };
