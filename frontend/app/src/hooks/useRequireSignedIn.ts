import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserState, useSnackbarState } from './useGlobalState'

export function useRequireSignedIn() {
  const navigate = useNavigate()
  const [user] = useUserState()
  const [, setSnackbar] = useSnackbarState()

  useEffect(() => {
    if (user.isFetched && !user.isSignedIn) {
      setSnackbar({
        message: 'サインインしてください',
        severity: 'error',
        pathname: '/sign-in',
      })
      navigate('/sign-in')
    }
  }, [user, navigate, setSnackbar])
}
