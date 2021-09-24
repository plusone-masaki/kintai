// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore/lite'
import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyD4__FI77fXkuU7Jnh7XiYIj8gH1ZkyztA',
  authDomain: 'kintai-b9d1a.firebaseapp.com',
  projectId: 'kintai-b9d1a',
  storageBucket: 'kintai-b9d1a.appspot.com',
  messagingSenderId: '1040045189229',
  appId: '1:1040045189229:web:81d6f0ed2d785b02d4b764',
  measurementId: 'G-E95KP24JZB'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = process.browser && getAnalytics(app)
const db = getFirestore(app)

export {
  app,
  db,
}
