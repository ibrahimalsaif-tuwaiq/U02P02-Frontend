import firebase from "firebase/compat/app";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCh0JOfpKh62gmHx9oaauSWYovLYJzuzOc",
  authDomain: "u02p02-c76cc.firebaseapp.com",
  projectId: "u02p02-c76cc",
  storageBucket: "u02p02-c76cc.appspot.com",
  messagingSenderId: "1073861395114",
  appId: "1:1073861395114:web:7abf769381de79486606d3",
  measurementId: "G-2Z2LHS2M26",
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
