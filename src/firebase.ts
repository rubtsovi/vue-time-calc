import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDHmbZhg7hsz1yTESCHvraKOhp3CUzJpoQ",
  authDomain: "timmy-the-app.firebaseapp.com",
  databaseURL: "https://timmy-the-app.firebaseio.com",
  projectId: "timmy-the-app",
  storageBucket: "timmy-the-app.appspot.com",
  messagingSenderId: "707237817295",
  appId: "1:707237817295:web:323575b792fd53536580ba",
};
firebase.initializeApp(firebaseConfig);

// utils
const db = firebase.firestore();
const auth = firebase.auth();

// collection references
const usersCollection = db.collection("users");

const googleProvider = new firebase.auth.GoogleAuthProvider();
const facebookProvider = new firebase.auth.FacebookAuthProvider();
const githubProvider = new firebase.auth.GithubAuthProvider();

// export utils/refs
export { db, auth, usersCollection, googleProvider, facebookProvider, githubProvider };
