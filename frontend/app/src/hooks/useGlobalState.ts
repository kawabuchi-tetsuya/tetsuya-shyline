import useSWR from 'swr'
import { UserStateType } from '../types/userStateType'

export const useUserState = () => {
  const fallbackData: UserStateType = {
    id: 0,
    name: '',
    email: '',
    isSignedIn: false,
    isFetched: false,
  }

  const { data: state, mutate: setState } = useSWR('user', null, {
    fallbackData: fallbackData,
  })
  return [state, setState] as [UserStateType, (value: UserStateType) => void]
}
