import { Box } from '@mui/material'
import Error from '@/components/Error'
import Loader from '@/components/Loader'
import NicknameForm from '@/features/user/components/NicknameForm'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { useRequireSignedIn } from '@/hooks/useRequireSignedIn'
import { styles } from '@/styles'

const CurrentUserEditNickname = () => {
  useRequireSignedIn()
  const { user, error, isLoading, mutate } = useCurrentUser()

  if (error) return <Error />
  if (isLoading) return <Loader />
  if (!user) return <p>ユーザーが見つかりませんでした</p>

  return (
    <Box sx={{ ...styles.pageMinHeight, backgroundColor: '#EDF2F7' }}>
      <NicknameForm user={user} mutate={mutate} />
    </Box>
  )
}

export default CurrentUserEditNickname
