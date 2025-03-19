import axios, { AxiosResponse, AxiosError } from 'axios'

export const fetcher = (url: string) =>
  axios
    .get(url, {
      headers: {
        'Content-Type': 'application/json',
        'access-token': localStorage.getItem('access-token') || '',
        client: localStorage.getItem('client') || '',
        uid: localStorage.getItem('uid') || '',
      },
    })
    .then((res: AxiosResponse) => res.data)
    .catch((error: AxiosError) => {
      console.error('Fetch error:', error.message)
      throw error
    })
