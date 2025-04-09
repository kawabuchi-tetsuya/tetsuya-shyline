import { Button, Stack, TextField } from '@mui/material'
import axios, { AxiosError } from 'axios'
import { useState } from 'react'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { useSnackbarState } from '@/hooks/useGlobalState'
import { validationRules } from '@/validations/signUpValidation'

type SignUpFormData = {
  email: string
  password: string
  name: string
  nickname: string
}

type SignUpErrorResponse = {
  errors?: {
    full_messages: string[]
  }
}

const SignUpForm = () => {
  const [, setSnackbarState] = useSnackbarState()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm<SignUpFormData>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      name: '',
      nickname: '',
    },
  })

  const handleError = (error: AxiosError<SignUpErrorResponse>) => {
    const { response } = error
    const messages = response?.data?.errors?.full_messages || []
    if (messages.length > 0) {
      setSnackbarState({
        message: messages[0],
        severity: 'error',
        pathname: '/sign_up',
      })
    }
  }

  const onSubmit: SubmitHandler<SignUpFormData> = async (data) => {
    setIsSubmitting(true)

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth`,
        {
          ...data,
          confirm_success_url: `${import.meta.env.VITE_FRONTEND_BASE_URL}/sign_in`,
        },
        { headers: { 'Content-Type': 'application/json' } }
      )

      localStorage.setItem(
        'access-token',
        response.headers['access-token'] || ''
      )
      localStorage.setItem('client', response.headers['client'] || '')
      localStorage.setItem('uid', response.headers['uid'] || '')

      setSnackbarState({
        message: '認証メールをご確認ください',
        severity: 'success',
        pathname: '/posts',
      })
      window.location.href = '/posts'
    } catch (error) {
      handleError(error as AxiosError<SignUpErrorResponse>)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Stack
      component="form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      spacing={4}
    >
      <Controller
        name="email"
        control={control}
        rules={validationRules.email}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            id="email"
            type="email"
            label="メールアドレス"
            error={fieldState.invalid}
            helperText={fieldState.error?.message}
            sx={{ backgroundColor: 'white' }}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        rules={validationRules.password}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            id="password"
            type="password"
            label="パスワード"
            error={fieldState.invalid}
            helperText={fieldState.error?.message}
            sx={{ backgroundColor: 'white' }}
          />
        )}
      />
      <Controller
        name="name"
        control={control}
        rules={validationRules.name}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            id="username"
            type="text"
            label="user_name"
            error={fieldState.invalid}
            helperText={fieldState.error?.message}
            sx={{ backgroundColor: 'white' }}
            onInput={(e) => {
              const input = e.target as HTMLInputElement
              field.onChange(input.value.replace(/[^\w]/g, ''))
            }}
          />
        )}
      />
      <Controller
        name="nickname"
        control={control}
        rules={validationRules.nickname}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            id="nickname"
            type="text"
            label="ユーザー名"
            error={fieldState.invalid}
            helperText={fieldState.error?.message}
            sx={{ backgroundColor: 'white' }}
          />
        )}
      />
      <Button
        type="submit"
        variant="contained"
        disabled={!isValid || isSubmitting}
        sx={{ fontWeight: 'bold', color: 'white' }}
      >
        {isSubmitting ? '送信中...' : '送信する'}
      </Button>
    </Stack>
  )
}

export default SignUpForm
