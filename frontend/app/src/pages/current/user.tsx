import { Box } from '@mui/material'
import Error from '@/components/Error'
import Loader from '@/components/Loader'
import UserDetailItem from '@/features/user/components/UserDetailItem'
import { useRequireSignedIn } from '@/hooks/useRequireSignedIn'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { styles } from '@/styles'

const CurrentUser = () => {
  useRequireSignedIn()
  const { user, error, isLoading } = useCurrentUser()

  if (error) return <Error />
  if (isLoading) return <Loader />
  if (!user) return <p>ユーザーが見つかりませんでした</p>

  return (
    <Box sx={styles.pageMinHeight}>
      <UserDetailItem user={user} />
    </Box>
  )
}

export default CurrentUser
