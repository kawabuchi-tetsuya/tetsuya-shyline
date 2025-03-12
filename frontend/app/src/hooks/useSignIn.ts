import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useUserState } from './useGlobalState'
import { SignInFormData } from '../types/signInFormData'

export const useSignIn = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useUserState()
  const navigate = useNavigate()

  const signIn = async (data: SignInFormData) => {
    try {
      setIsLoading(true)
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/sign_in`,
        data,
        { headers: { 'Content-Type': 'application/json' } }
      )

      localStorage.setItem('access-token', res.headers['access-token'])
      localStorage.setItem('client', res.headers['client'])
      localStorage.setItem('uid', res.headers['uid'])

      setUser({
        ...(user ?? {}),
        isFetched: false,
      })
      navigate('/posts')
    } catch (error) {
      console.error('Sign-in error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return { signIn, isLoading }
}
