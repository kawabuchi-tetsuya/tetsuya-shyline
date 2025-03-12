import { AppBar, Box, Button, Container } from '@mui/material'
import { Link } from 'react-router-dom'
import { useUserState } from '../hooks/useGlobalState'

const Header = () => {
  const [user] = useUserState()

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
                    to="/signup"
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
                <Box>{user.name}</Box>
              )}
            </>
          )}
        </Box>
      </Container>
    </AppBar>
  )
}

export default Header
