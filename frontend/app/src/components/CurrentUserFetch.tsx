import axios, { AxiosResponse, AxiosError } from 'axios'
import { useEffect } from 'react'
import { useUserState } from '../hooks/useGlobalState'

const CurrentUserFetch = () => {
  const [user, setUser] = useUserState()

  useEffect(() => {
    if (user.isFetched) {
      return
    }

    const accessToken = localStorage.getItem('access-token')
    const client = localStorage.getItem('client')
    const uid = localStorage.getItem('uid')

    if (accessToken && client && uid) {
      const url = import.meta.env.VITE_API_BASE_URL + '/current/user'

      axios
        .get(url, {
          headers: {
            'Content-Type': 'application/json',
            'access-token': accessToken,
            client: client,
            uid: uid,
          },
        })
        .then((res: AxiosResponse) => {
          setUser({
            ...user,
            ...res.data,
            isSignedIn: true,
            isFetched: true,
          })
        })
        .catch((err: AxiosError<{ error: string }>) => {
          console.error('Error fetching user:', err.message)
          setUser({
            ...user,
            isFetched: true,
          })
        })
    } else {
      setUser({
        ...user,
        isFetched: true,
      })
    }
  }, [user, setUser])

  return null
}

export default CurrentUserFetch
