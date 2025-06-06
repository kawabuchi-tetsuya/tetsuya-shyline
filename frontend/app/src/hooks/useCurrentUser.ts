import useSWR from 'swr'
import { fetcher } from '@/utils'
import { User } from '@/types/user'

export const useCurrentUser = () => {
  const url = `${import.meta.env.VITE_API_BASE_URL}/current/user`
  const { data, error, isLoading, mutate } = useSWR<User>(url, fetcher)

  return {
    user: data,
    error,
    isLoading,
    mutate,
  }
}
