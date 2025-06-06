import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import apiClient from '@/axiosConfig'
import { useSnackbarState } from '@/hooks/useGlobalState'
import { User } from '@/types/user'

type FormData = {
  nickname: string
}

type Props = {
  user: User
  mutate: () => void
}

export const useNicknameForm = ({ user, mutate }: Props) => {
  const [, setSnackbar] = useSnackbarState()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<FormData>({ mode: 'onChange' })

  useEffect(() => {
    reset({ nickname: user.nickname || '' })
  }, [user, reset])

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    try {
      await apiClient.put('/current/user', { nickname: data.nickname })
      setSnackbar({
        message: 'ユーザー名を変更しました',
        severity: 'success',
        pathname: 'current/user/edit/nickname',
      })
      mutate()
    } catch (e) {
      console.error(e)
      setSnackbar({
        message: 'ユーザー名の変更に失敗しました',
        severity: 'error',
        pathname: 'current/user/edit/nickname',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    control,
    handleSubmit,
    onSubmit,
    isSubmitting,
    isValid,
  }
}
