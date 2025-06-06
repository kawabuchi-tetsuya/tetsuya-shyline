import { Avatar, Box, IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import { Link } from 'react-router-dom'

export const AvatarDetail = ({ avatarUrl }: { avatarUrl: string }) => (
  <Box sx={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
    <Avatar
      src={avatarUrl}
      sx={{
        width: { xs: 100, sm: 150 },
        height: { xs: 100, sm: 150 },
        border: '1px solid #CCC',
      }}
    />
    <Box
      sx={{ position: 'absolute', bottom: 0, right: 'calc(50% - 75px + 8px' }}
    >
      <Link to="/current/user/edit/avatar">
        <IconButton
          component="a"
          size="small"
          sx={{
            backgroundColor: 'white',
            border: '1px solid #CCC',
            '&:hover': { backgroundColor: '#F5F5F5' },
          }}
        >
          <EditIcon fontSize="small" />
        </IconButton>
      </Link>
    </Box>
  </Box>
)

export default AvatarDetail
