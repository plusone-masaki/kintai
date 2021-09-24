import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import RepositoryFactory from '@/resources/RepositoryFactory'

const authRepository = RepositoryFactory.get('auth')

export const AuthContext = React.createContext(null)
export const AuthProvider = ({ children }) => {
  const router = useRouter()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const auth = authRepository.getAuth()
    auth.onAuthStateChanged(currentUser => {
      setUser(currentUser)

      if (router.pathname !== '/login' && !currentUser) {
        router.push('/login')
      }
    })
  }, [])

  return (
    <AuthContext.Provider value={{ user }}>
      { children }
    </AuthContext.Provider>
  )
}
