import useSWR from 'swr'
import { UserStateType } from '@/types/userStateType'
import { SnackbarStateType } from '@/types/snackbarStateType'

export const useUserState = () => {
  const fallbackData: UserStateType = {
    id: 0,
    name: '',
    nickname: '',
    email: '',
    isSignedIn: false,
    isFetched: false,
  }

  const { data: state, mutate: setState } = useSWR('user', null, {
    fallbackData: fallbackData,
  })
  return [state, setState] as [UserStateType, (value: UserStateType) => void]
}

export const useSnackbarState = () => {
  const fallbackData: SnackbarStateType = {
    message: null,
    severity: null,
    pathname: null,
  }

  const { data: state, mutate: setState } = useSWR('snackbar', null, {
    fallbackData: fallbackData,
  })
  return [state, setState] as [
    SnackbarStateType,
    (value: SnackbarStateType) => void,
  ]
}
