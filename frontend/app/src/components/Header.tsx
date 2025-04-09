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
import axios, { AxiosError, AxiosResponse } from 'axios'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useUserState } from '@/hooks/useGlobalState'
import { getAuthHeaders } from '@/utils/auth'

const Header = () => {
  const [user] = useUserState()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  // ヘッダを非表示にするパス
  const hideHeaderPathnames = ['/current/posts/edit/[id]']

  if (hideHeaderPathnames.includes(window.location.pathname)) {
    return <></>
  }

  const addNewPost = () => {
    const url = `${import.meta.env.VITE_API_BASE_URL}/current/posts`

    const headers = getAuthHeaders()

    axios({ method: 'POST', url: url, headers: headers })
      .then((res: AxiosResponse) => {
        window.location.href = `/current/posts/edit/${res.data.id}`
      })
      .catch((e: AxiosError<{ error: string }>) => {
        console.log(e.message)
      })
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  // ロゴクリック時、投稿一覧をフルリロードする
  const handleClickLogo = (event: React.MouseEvent) => {
    event.preventDefault() // リンクのデフォルトの挙動を無効化
    window.location.href = '/posts'
  }

  // アイコンクリック時、サインインユーザーの投稿一覧をフルリロードする
  const handleClickCurrentPosts = (event: React.MouseEvent) => {
    event.preventDefault() // リンクのデフォルトの挙動を無効化
    window.location.href = '/current/posts'
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
            <Link to="/posts" onClick={handleClickLogo}>
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
                    to="/sign_in"
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
                    to="/sign_up"
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
                      onClick={addNewPost}
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
                    <MenuItem
                      component={Link}
                      to="/current/posts"
                      onClick={handleClickCurrentPosts}
                    >
                      <ListItemIcon>
                        <ArticleIcon fontSize="small" />
                      </ListItemIcon>
                      投稿の管理
                    </MenuItem>
                    <MenuItem component={Link} to="/sign_out">
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
