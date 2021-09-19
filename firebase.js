import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDWkUIiC-ZVUL22uXiRsazpzqkWEwGiArI",
  authDomain: "docs-clone-2d59e.firebaseapp.com",
  projectId: "docs-clone-2d59e",
  storageBucket: "docs-clone-2d59e.appspot.com",
  messagingSenderId: "1088395587198",
  appId: "1:1088395587198:web:169f0210c70799006bf22f",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();

export { db };
