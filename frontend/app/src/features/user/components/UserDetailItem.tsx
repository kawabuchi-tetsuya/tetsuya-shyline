import { Box, Card, Container, List, Typography } from '@mui/material'
import AvatarDetail from '@/features/user/components/AvatarDetail'
import UserDetailRow from '@/features/user/components/UserDetailRow'
import { User } from '@/types/user'

type UserDetailProps = {
  user: User
}
const UserDetailItem: React.FC<UserDetailProps> = ({ user }) => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ pt: 6, pb: 3 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '0 8px',
            m: 'auto',
          }}
        >
          <Box sx={{ textAlign: 'center', width: '100%' }}>
            <Typography
              component="h2"
              sx={{
                fontSize: { xs: 21, sm: 25 },
                fontWeight: 'bold',
                lineHeight: '40px',
              }}
            >
              {user.nickname} さんの情報
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* アバター表示 */}
      <AvatarDetail avatarUrl={user.avatarUrl} />

      {/* ユーザー情報表示 */}
      <Box sx={{ display: 'flex', gap: '0 24px' }}>
        <Box sx={{ width: '100%' }}>
          <Card
            sx={{
              backShadow: 'none',
              borderRadius: '12px',
              maxWidth: 840,
              m: '0 auto',
            }}
          >
            <List sx={{ color: '#6E7B85' }}>
              <UserDetailRow label="user_name" value={user.name} />
              <UserDetailRow
                label="ユーザー名"
                value={user.nickname}
                url="/current/user/edit/nickname"
              />
              <UserDetailRow
                label="メールアドレス"
                value={user.email}
                divider={false}
              />
            </List>
          </Card>
        </Box>
      </Box>
    </Container>
  )
}

export default UserDetailItem
