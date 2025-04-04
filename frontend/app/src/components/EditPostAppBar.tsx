import {
  AppBar,
  Box,
  Button,
  IconButton,
  Switch,
  Toolbar,
  Typography,
} from '@mui/material'
import ArrowBackSharpIcon from '@mui/icons-material/ArrowBackSharp'
import { Link } from 'react-router-dom'

type Props = {
  statusChecked: boolean
  isLoading: boolean
  onToggleStatus: () => void
}

const EditPostAppBar = ({
  statusChecked,
  isLoading,
  onToggleStatus,
}: Props) => {
  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#EDF2F7' }}>
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/current/posts">
            <IconButton>
              <ArrowBackSharpIcon />
            </IconButton>
          </Link>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: { xs: '0 16px', sm: '0 24px' },
          }}
        >
          <Box sx={{ textAlign: 'center' }}>
            <Switch checked={statusChecked} onChange={onToggleStatus} />
            <Typography sx={{ fontSize: { xs: 12, sm: 15 }, color: '#6E7B85' }}>
              下書き／公開
            </Typography>
          </Box>
          <Button
            variant="contained"
            disabled={isLoading}
            type="submit"
            sx={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: { xs: 12, sm: 16 },
            }}
          >
            更新する
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default EditPostAppBar
