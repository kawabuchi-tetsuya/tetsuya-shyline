import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import { Avatar, Box, Container, IconButton, Tooltip } from '@mui/material'
import Error from '@/components/Error'
import PostDetailItem from '@/components/PostDetailItem'
import Loader from '@/components/Loader'
import { useFetchPostDetail } from '@/hooks/useFetchPostDetail'
import { styles } from '@/styles'
import { Link, useParams } from 'react-router-dom'

const PostDetail = () => {
  const { id } = useParams<{ id: string }>()
  const apiPath = `/posts/${id?.toString()}`
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
            <Link to="/posts">
              <Avatar>
                <Tooltip title="投稿一覧に戻る">
                  <IconButton sx={{ backgroundColor: '#F1F5FA' }}>
                    <ChevronLeftIcon sx={{ color: '#99AAB6' }} />
                  </IconButton>
                </Tooltip>
              </Avatar>
            </Link>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ flexGrow: 1 }} />
        </Container>
      </Box>
      {/* 投稿データの表示 */}
      <PostDetailItem key={`${post?.id}`} post={post} />
    </Box>
  )
}

export default PostDetail
