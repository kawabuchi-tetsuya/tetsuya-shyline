import { Box, Container, Typography } from '@mui/material'
import { styles } from '@/styles'
import Error from '@/components/Error'
import Loader from '@/components/Loader'
import { useFetchPostDetail } from '@/hooks/useFetchPostDetail'
import PostDetailItem from '@/components/PostDetailItem'

const PostDetail = () => {
  const { post, loading, error } = useFetchPostDetail('/posts')

  if (error) return <Error />
  if (loading) return <Loader />

  return (
    <Box sx={(styles.pageMinHeight, { backgroundColor: '#E6F2FF' })}>
      <Container maxWidth="md" sx={{ pt: 6 }}>
        <Typography
          component="h1"
          sx={{
            mb: 2,
            fontSize: 24,
            fontWeight: 'bold',
            lineHeight: 1.5,
            color: 'black',
          }}
        >
          投稿詳細
        </Typography>
        <div>
          {/* 投稿データの表示 */}
          <PostDetailItem key={`${post?.id}`} post={post} />
        </div>
      </Container>
    </Box>
  )
}

export default PostDetail
