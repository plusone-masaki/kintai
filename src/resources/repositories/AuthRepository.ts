import React from 'react'
import {
  browserLocalPersistence,
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth'
import { app } from '@/plugins/firebase'

type EmailAndPassword = {
  email: string
  password: string
}

const auth = getAuth(app)

export default {
  getAuth: () => auth,

  login: async ({ email, password }: EmailAndPassword) => {
    await setPersistence(auth, browserLocalPersistence)
    return signInWithEmailAndPassword(auth, email, password)
  },

  logout: (setUser: React.Dispatch<User>) => {
    signOut(auth)
  },
}
