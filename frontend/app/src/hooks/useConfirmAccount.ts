import axios, { AxiosError } from 'axios'
import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useSnackbarState } from '@/hooks/useGlobalState'

export const useConfirmAccount = () => {
  const [, setSnackbarState] = useSnackbarState()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const token = searchParams.get('confirmation_token')

    if (!token) {
      setSnackbarState({
        message: '不正なアクセスです',
        severity: 'error',
        pathname: '/posts',
      })
      navigate('/posts')
      return
    }

    const url = `${import.meta.env.VITE_API_BASE_URL}/user/confirmations`

    axios
      .patch(url, Object.fromEntries(searchParams.entries()))
      .then(() => {
        setSnackbarState({
          message: '認証に成功しました',
          severity: 'success',
          pathname: '/sign_in',
        })
        navigate('/sign_in')
      })
      .catch((e: AxiosError<{ e: string }>) => {
        console.error(e.message)
        setSnackbarState({
          message: '不正なアクセスです',
          severity: 'error',
          pathname: '/posts',
        })
        navigate('/posts')
      })
  }, [searchParams, navigate, setSnackbarState])
}
