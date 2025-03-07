import { Container, Typography } from '@mui/material'
import PostList from '../components/PostList'
import Loader from '../components/Loader'
import BoxWithHeader from '../components/BoxWithHeader'
import { useFetchPosts } from '../hooks/useFetchPosts'
import useInfiniteScroll from '../hooks/useInfiniteScroll'

const Index = () => {
  const { posts, error, loading, loadMorePosts, nextKeyset } = useFetchPosts()
  const hasMore = nextKeyset !== null
  
  useInfiniteScroll(loadMorePosts, hasMore)

  if (error) return <div>An error has occurred.</div>
  if (loading) return <Loader />

  return (
    <BoxWithHeader>
      <Container maxWidth='md' sx={{ pt:6 }}>
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
    </BoxWithHeader>
  )
}

export default Index
