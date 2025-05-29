import { Box, Button, Container, Stack, Typography } from '@mui/material'
import AvatarPreview from '@/features/user/components/AvatarPreview'
import AvatarUploadInput from '@/features/user/components/AvatarUploadInput'
import { useAvatarForm } from '@/features/user/hooks/useAvatarForm'
import { User } from '@/types/user'

type Props = {
  user: User
  mutate: () => void
}

const AvatarForm = ({ user, mutate }: Props) => {
  const {
    preview,
    selectedFile,
    isSubmitting,
    handleFileChange,
    handleSubmit,
  } = useAvatarForm({ user, mutate })

  return (
    <Container maxWidth="sm">
      <Box sx={{ mb: 4, pt: 4 }}>
        <Typography
          component="h2"
          sx={{ fontSize: 28, color: 'black', fontWeight: 'bold' }}
        >
          アバター画像の変更
        </Typography>
      </Box>
      <Stack spacing={4}>
        <AvatarPreview src={preview} />
        <AvatarUploadInput onChange={handleFileChange} />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSubmit}
          disabled={!selectedFile}
          loading={isSubmitting}
          sx={{ fontWeight: 'bold', color: 'white' }}
        >
          更新する
        </Button>
      </Stack>
      <Button
        type="button"
        variant="outlined"
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

export default AvatarForm
