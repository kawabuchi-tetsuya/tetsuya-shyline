import { Box, IconButton, ListItem, ListItemText } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import { Link } from 'react-router-dom'

type UserDetailRowProps = {
  label: string
  value: string
  icon?: React.ReactNode
  divider?: boolean
  url?: string
}

const UserDetailRow: React.FC<UserDetailRowProps> = ({
  label,
  value,
  icon,
  divider = true,
  url,
}) => {
  const primaryTextStyle = {
    fontSize: { xs: 12, sm: 14 },
    color: 'inherit',
  }

  return (
    <ListItem divider={divider}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ pr: 1 }}>{icon}</Box>
          <ListItemText
            primary={label}
            primaryTypographyProps={{ ...primaryTextStyle }}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <ListItemText
            primary={value}
            primaryTypographyProps={{ ...primaryTextStyle }}
          />
          {url && (
            <Link to={url}>
              <IconButton>
                <EditIcon />
              </IconButton>
            </Link>
          )}
        </Box>
      </Box>
    </ListItem>
  )
}

export default UserDetailRow
