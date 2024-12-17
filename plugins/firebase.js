import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

const auth = firebase.auth()

auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  .then(() => {
    console.log('Firebase persistence set to LOCAL')
  })
  .catch((error) => {
    console.error('Error setting Firebase persistence:', error)
  })

const db = firebase.firestore()

export { auth, db }