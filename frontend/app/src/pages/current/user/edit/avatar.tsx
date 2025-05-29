import { Box } from '@mui/material'
import AvatarForm from '@/features/user/components/AvatarForm'
import Error from '@/components/Error'
import Loader from '@/components/Loader'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { useRequireSignedIn } from '@/hooks/useRequireSignedIn'
import { styles } from '@/styles'

const CurrentUserEditAvatar = () => {
  useRequireSignedIn()
  const { user, error, isLoading, mutate } = useCurrentUser()

  if (error) return <Error />
  if (isLoading) return <Loader />
  if (!user) return <p>ユーザーが見つかりませんでした</p>

  return (
    <Box sx={{ ...styles.pageMinHeight }}>
      <AvatarForm user={user} mutate={mutate} />
    </Box>
  )
}

export default CurrentUserEditAvatar
