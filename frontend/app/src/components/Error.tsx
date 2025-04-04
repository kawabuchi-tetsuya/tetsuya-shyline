import { Card, CardContent, Container } from '@mui/material'

type ErrorProps = {
  customMessage?: string
}

const Error = ({ customMessage }: ErrorProps) => {
  const defaultMessage =
    '現在、システムに技術的な問題が発生しています。ご不便をおかけして申し訳ありませんが、復旧までしばらくお待ちください。'

  return (
    <Container maxWidth="sm">
      <Card sx={{ p: 3, mt: 8, backgroundColor: '#EEE' }}>
        <CardContent sx={{ lineHeight: 2 }}>
          <p>{customMessage || defaultMessage}</p>
        </CardContent>
      </Card>
    </Container>
  )
}

export default Error
