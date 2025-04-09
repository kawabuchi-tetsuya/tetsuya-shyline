import { Box, Container, Typography } from '@mui/material'
import SignUpForm from '@/components/SignUpForm'
import { styles } from '@/styles'

const SignUp = () => {
  return (
    <Box sx={{ ...styles.pageMinHeight, backgroundColor: '#EDF2F7' }}>
      <Container maxWidth="sm">
        <Box sx={{ mb: 4, pt: 4 }}>
          <Typography
            component="h2"
            sx={{ fontSize: 32, color: 'black', fontWeight: 'bold' }}
          >
            Sign Up
          </Typography>
        </Box>
        <SignUpForm />
      </Container>
    </Box>
  )
}

export default SignUp
