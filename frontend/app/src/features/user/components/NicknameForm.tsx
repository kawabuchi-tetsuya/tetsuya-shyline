import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { Controller } from 'react-hook-form'
import { useNicknameForm } from '@/features/user/hooks/useNicknameForm'
import { User } from '@/types/user'

type Props = {
  user: User
  mutate: () => void
}

export const NicknameForm = ({ user, mutate }: Props) => {
  const { control, handleSubmit, isSubmitting, isValid, onSubmit } =
    useNicknameForm({ user, mutate })

  return (
    <Container maxWidth="sm">
      <Box sx={{ mb: 4, pt: 4 }}>
        <Typography
          component="h2"
          sx={{ fontSize: 28, color: 'black', fontWeight: 'bold' }}
        >
          ユーザー名編集
        </Typography>
      </Box>
      <Stack
        component="form"
        spacing={4}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <Controller
          name="nickname"
          control={control}
          rules={{ required: 'ユーザー名は必須です' }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="ユーザー名"
              fullWidth
              variant="outlined"
              error={fieldState.invalid}
              helperText={fieldState.error?.message}
              sx={{ backgroundColor: 'white' }}
            />
          )}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={!isValid}
          loading={isSubmitting}
          sx={{ fontWeight: 'bold', color: 'white' }}
        >
          更新する
        </Button>
      </Stack>
      <Button
        type="button"
        variant="outlined"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
        onClick={() => {
          window.location.href = '/current/user'
        }}
      >
        戻る
      </Button>
    </Container>
  )
}

export default NicknameForm
