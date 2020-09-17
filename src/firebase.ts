import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import config from "./firebaseconfig";

const firebaseConfig = firebase.initializeApp(config);

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
