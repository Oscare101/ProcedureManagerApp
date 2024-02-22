import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { auth, db } from '../firebase'

import {
  set,
  ref,
  getDatabase,
  get,
  onValue,
  update,
  remove,
} from 'firebase/database'
import { ref as refStorage, deleteObject } from 'firebase/storage'
import { MMKV } from 'react-native-mmkv'

// var md5 = require('md5')
export const storage = new MMKV()

export async function LogIn(email: string, password: string) {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password)
    storage.set('email', email)
    storage.set('password', password)
    return { response: response }
  } catch (error: any) {
    if (error.code.includes('wrong-password')) {
      return { error: 'wrong-password' }
    } else if (error.code.includes('user-not-found')) {
      return { error: 'user-not-found' }
    } else {
      return { error: 'error' }
    }
  }
}

export async function LogOut() {
  try {
    const response = await signOut(auth)
    storage.delete('email')
    storage.delete('password')
    return { response: response }
  } catch (error: any) {
    return { error: 'error' }
  }
}
