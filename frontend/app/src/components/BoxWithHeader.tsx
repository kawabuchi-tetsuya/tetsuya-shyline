import { Box } from '@mui/material'

const BoxWithHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const styles = {
    // ヘッダーの高さ分引く
    minHeight: 'calc(100vh - 64px)',
    backgroundColor: '#e6f2ff',
  }

  return (
    <Box sx={styles}>
      {children}
    </Box>
  )
}

export default BoxWithHeader
