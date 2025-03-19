import { Box, Container, Typography } from '@mui/material'
import PostList from '@/components/PostList'
import Loader from '@/components/Loader'
import { useFetchPosts } from '@/hooks/useFetchPosts'
import useInfiniteScroll from '@/hooks/useInfiniteScroll'
import { styles } from '@/styles'

const Index = () => {
  const { posts, error, loading, loadMorePosts, nextKeyset } =
    useFetchPosts('/posts')
  const hasMore = nextKeyset !== null

  useInfiniteScroll(loadMorePosts, hasMore)

  if (error) return <div>エラーが発生しました。</div>
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
          投稿一覧
        </Typography>
        <div>
          {/* 投稿データの表示 */}
          {<PostList posts={posts} />}
        </div>
      </Container>
    </Box>
  )
}

export default Index
