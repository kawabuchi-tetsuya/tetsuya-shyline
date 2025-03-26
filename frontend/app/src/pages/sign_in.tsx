import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Stack,
} from '@mui/material'
import { useMemo } from 'react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { SignInFormData } from '@/types/signInFormData'
import { useSignIn } from '@/hooks/useSignIn'
import { styles } from '@/styles'

const SignIn = () => {
  const { signIn, isLoading } = useSignIn()

  const defaultValues = useMemo(
    () => ({
      email: '',
      password: '',
    }),
    []
  )

  const validationRules = useMemo(
    () => ({
      email: {
        required: 'メールアドレスを入力してください。',
        pattern: {
          value:
            /^[a-zA-Z0-9_+-]+(.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/,
          message: '正しい形式のメールアドレスを入力してください。',
        },
      },
      password: {
        required: 'パスワードを入力してください。',
      },
    }),
    []
  )

  const { handleSubmit, control } = useForm<SignInFormData>({ defaultValues })

  const onSubmit: SubmitHandler<SignInFormData> = async (data) => {
    await signIn(data)
  }

  return (
    <Box sx={styles.pageMinHeight}>
      <Container maxWidth="sm">
        <Box sx={{ mb: 4, pt: 4 }}>
          <Typography component="h2" sx={{ fontSize: 32, fontWeight: 'bold' }}>
            Sign In
          </Typography>
        </Box>
        <Stack component="form" onSubmit={handleSubmit(onSubmit)} spacing={4}>
          <Controller
            name="email"
            control={control}
            rules={validationRules.email}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                type="text"
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
                type="password"
                label="パスワード"
                error={fieldState.invalid}
                helperText={fieldState.error?.message}
                sx={{ backgroundColor: 'white' }}
              />
            )}
          />
          <Button
            type="submit"
            variant="contained"
            loading={isLoading}
            sx={{ fontWeight: 'bold', color: 'white' }}
          >
            送信する
          </Button>
        </Stack>
      </Container>
    </Box>
  )
}

export default SignIn
