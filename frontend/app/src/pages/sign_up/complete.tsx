import { Box, Container } from '@mui/material'
import { styles } from '@/styles'
import Error from '@/components/Error'
import useResendEmail from '@/hooks/useResendEmail'
import SignUpCompleteUI from '@/components/SignUpCompleteUI'

const SignUpComplete = () => {
  const email = localStorage.getItem('signupEmail')

  const { handleResend, isSubmitting, canResend } = useResendEmail(email || '')

  if (!email) {
    return <Error />
  }

  return (
    <Box sx={{ ...styles.pageMinHeight, backgroundColor: '#EDF2F7' }}>
      <Container maxWidth="sm">
        <SignUpCompleteUI
          email={email}
          handleResend={handleResend}
          isSubmitting={isSubmitting}
          canResend={canResend}
        />
      </Container>
    </Box>
  )
}

export default SignUpComplete
