import axios, { AxiosResponse, AxiosError } from 'axios'

export const fetcher = (url: string) =>
  axios
    .get(url)
    .then((res: AxiosResponse) => res.data)
    .catch((error: AxiosError) => {
      throw error
    })
