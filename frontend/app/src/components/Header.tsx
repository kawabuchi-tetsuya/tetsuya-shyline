import ArticleIcon from '@mui/icons-material/Article'
import Logout from '@mui/icons-material/Logout'
import PersonIcon from '@mui/icons-material/Person'
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useUserState } from '../hooks/useGlobalState'

const Header = () => {
  const [user] = useUserState()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: 'white',
        color: 'black',
        boxShadow: 'none',
        py: '12px',
      }}
    >
      <Container maxWidth="lg" sx={{ px: 2 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box>
            <Link to="/posts">
              <img src="/logo.png" alt="logo" width={150} height={40} />
            </Link>
          </Box>
          {user.isFetched && (
            <>
              {!user.isSignedIn && (
                // 未ログインのとき
                <Box>
                  <Button
                    component={Link}
                    to="/sign-in"
                    color="primary"
                    variant="contained"
                    sx={{
                      color: 'white',
                      textTransform: 'none',
                      fontSize: 16,
                      borderRadius: 2,
                      boxShadow: 'none',
                    }}
                  >
                    Sign In
                  </Button>
                  <Button
                    component={Link}
                    to="/sign-up"
                    color="primary"
                    variant="outlined"
                    sx={{
                      textTransform: 'none',
                      fontSize: 16,
                      borderRadius: 2,
                      boxShadow: 'none',
                      border: '1.5px solid #3EA8FF',
                      ml: 2,
                    }}
                  >
                    Sign Up
                  </Button>
                </Box>
              )}
              {user.isSignedIn && (
                // ログイン済みのとき
                <Box sx={{ display: 'flex' }}>
                  <IconButton onClick={handleClick} sx={{ p: 0 }}>
                    <Avatar>
                      <PersonIcon />
                    </Avatar>
                  </IconButton>
                  <Box sx={{ ml: 2 }}>
                    <Button
                      color="primary"
                      variant="contained"
                      sx={{
                        textTransform: 'none',
                        fontSize: 16,
                        borderRadius: 2,
                        width: 100,
                        boxShadow: 'none',
                      }}
                    >
                      Add new
                    </Button>
                  </Box>
                  <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                  >
                    <Box sx={{ pl: 2, py: 1 }}>
                      <Typography sx={{ fontWeight: 'bold' }}>
                        {user.name}
                      </Typography>
                    </Box>
                    <Divider />
                    <MenuItem>
                      <ListItemIcon>
                        <ArticleIcon fontSize="small" />
                      </ListItemIcon>
                      投稿の管理
                    </MenuItem>
                    <MenuItem component={Link} to="/sign-out">
                      <ListItemIcon>
                        <Logout fontSize="small" />
                      </ListItemIcon>
                      サインアウト
                    </MenuItem>
                  </Menu>
                </Box>
              )}
            </>
          )}
        </Box>
      </Container>
    </AppBar>
  )
}

export default Header
