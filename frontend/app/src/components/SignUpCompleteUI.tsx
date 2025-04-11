import { Box, Button, Card, CardContent, Typography } from '@mui/material'

const SignUpCompleteUI = ({
  email,
  handleResend,
  isSubmitting,
  canResend,
}: {
  email: string
  handleResend: () => void
  isSubmitting: boolean
  canResend: boolean
}) => {
  return (
    <Box sx={{ mb: 4, pt: 4 }}>
      <Typography
        component="h2"
        sx={{ fontSize: 24, color: 'black', fontWeight: 'bold' }}
      >
        仮登録が完了しました
      </Typography>
      <Card sx={{ p: 3, mt: 8, backgroundColor: 'white' }}>
        <CardContent sx={{ lineHeight: 2 }}>
          <p>
            {email}に、認証用メールを送信しました。
            <br />
            メール内のURLから、認証を完了してください。
            <br />
            迷惑メールフォルダに届く場合があります。ご確認ください。
          </p>
        </CardContent>
      </Card>
      <Box sx={{ mt: 4, textAlign: 'center', width: '100%' }}>
        <Button
          onClick={handleResend}
          variant="outlined"
          sx={{ mt: 2 }}
          disabled={isSubmitting || !canResend}
          fullWidth
        >
          {isSubmitting ? '再送信中...' : '認証メールを再送信'}
        </Button>
      </Box>
    </Box>
  )
}

export default SignUpCompleteUI
