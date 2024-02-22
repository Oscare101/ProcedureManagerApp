// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyBiYelPEi10M9xNI1LTd67_I4MG9t3nD_E',
  authDomain: 'smallbusinessapp-ab36a.firebaseapp.com',
  databaseURL:
    'https://smallbusinessapp-ab36a-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'smallbusinessapp-ab36a',
  storageBucket: 'smallbusinessapp-ab36a.appspot.com',
  messagingSenderId: '18287519159',
  appId: '1:18287519159:web:7d7aafcf6632df52537432',
}

// initializeApp(firebaseConfig)
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
