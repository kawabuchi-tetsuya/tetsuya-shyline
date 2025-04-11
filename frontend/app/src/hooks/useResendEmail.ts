import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSnackbarState } from '@/hooks/useGlobalState'

const useResendEmail = (email: string) => {
  const [, setSnackbarState] = useSnackbarState()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [canResend, setCanResend] = useState(true)
  const [resendTimeout, setResendTimeout] = useState<ReturnType<
    typeof setTimeout
  > | null>(null)

  useEffect(() => {
    const lastSent = localStorage.getItem('lastResendTimestamp')
    if (lastSent) {
      const timeSinceLastSent = Date.now() - Number(lastSent)
      const waitTime = 60 * 1000

      if (timeSinceLastSent < waitTime) {
        setCanResend(false)
        const remainingTime = waitTime - timeSinceLastSent

        const timerId = setTimeout(() => {
          setCanResend(true)
          localStorage.removeItem('lastResendTimestamp')
        }, remainingTime)

        setResendTimeout(timerId)
      }
    }

    return () => {
      if (resendTimeout) {
        clearTimeout(resendTimeout)
      }
    }
  }, [resendTimeout])

  const handleResend = async () => {
    setIsSubmitting(true)
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/confirmation`,
        {
          email,
          redirect_url: `${import.meta.env.VITE_FRONTEND_BASE_URL}/sign_in`,
        }
      )
      setSnackbarState({
        message: '認証メールを再送しました',
        severity: 'success',
        pathname: '/sign_up/complete',
      })
      localStorage.setItem('lastResendTimestamp', String(Date.now()))
      setCanResend(false)
    } catch (error) {
      console.error(error)
      setSnackbarState({
        message: '認証メールの再送に失敗しました',
        severity: 'error',
        pathname: '/sign_up/complete',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return { isSubmitting, canResend, handleResend }
}

export default useResendEmail
