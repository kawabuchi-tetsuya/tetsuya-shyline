import { Settings } from '@mui/icons-material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import {
  Avatar,
  Box,
  Container,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material'
import { styles } from '@/styles'
import Error from '@/components/Error'
import Loader from '@/components/Loader'
import { useFetchPostDetail } from '@/hooks/useFetchPostDetail'
import { useRequireSignedIn } from '@/hooks/useRequireSignedIn'
import { useUserState } from '@/hooks/useGlobalState'
import { Link, useParams } from 'react-router-dom'
import PostDetailItem from '@/components/PostDetailItem'

const CurrentPostDetail = () => {
  useRequireSignedIn()
  const [user] = useUserState()
  const { id } = useParams<{ id: string }>()
  const apiPath = user.isSignedIn ? `/current/posts/${id?.toString()}` : null
  const { post, loading, error } = useFetchPostDetail(apiPath)

  if (error) return <Error />
  if (loading) return <Loader />

  return (
    <Box sx={{ ...styles.pageMinHeight, backgroundColor: '#EDF2F7', pb: 6 }}>
      <Box
        sx={{
          display: 'block',
          backgroundColor: 'white',
          borderTop: '0.5px solid #ACBCC7',
          height: 56,
          color: '#6E7B85',
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            display: 'flex',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <Link to="/current/posts">
              <Avatar>
                <Tooltip title="投稿の管理に戻る">
                  <IconButton sx={{ backgroundColor: '#F1F5FA' }}>
                    <ChevronLeftIcon sx={{ color: '#99AAB6' }} />
                  </IconButton>
                </Tooltip>
              </Avatar>
            </Link>
          </Box>
          <Box sx={{ flexGrow: 1, textAlign: 'center' }}>
            <Settings />
            <Typography
              component="p"
              sx={{ display: 'inline-block', fontSize: { xs: 14, sm: 16 } }}
            >
              ステータス： {post?.status}
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
        </Container>
      </Box>
      <PostDetailItem key={`${post?.id}`} post={post} />
    </Box>
  )
}

export default CurrentPostDetail
