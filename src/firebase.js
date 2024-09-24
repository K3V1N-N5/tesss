import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { ref as refStorage,getStorage } from 'firebase/storage';

firebase.initializeApp({
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
});

firebase.storage = getStorage(this,'gs://');
firebase.refStorage = refStorage;
firebase.database = firebase.firestore;

const fb = firebase;

export default fb;
