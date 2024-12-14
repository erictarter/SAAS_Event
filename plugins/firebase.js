import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCC9qW38BiG7wlCgAEi-j3IG5q5auu39FA",
  authDomain: "event-saas-cb32e.firebaseapp.com",
  projectId: "event-saas-cb32e",
  storageBucket: "event-saas-cb32e.firebasestorage.app",
  messagingSenderId: "99764803671",
  appId: "1:99764803671:web:52b76bd7019c5d3ed0ab12",
  measurementId: "G-DYLM6YRZDH"
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

const auth = firebase.auth()
auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
const db = firebase.firestore()

export { auth, db }