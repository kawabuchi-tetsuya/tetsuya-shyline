import { Box, CircularProgress, Container, Typography } from '@mui/material'
import PostList from '@/components/PostList'
import Loader from '@/components/Loader'
import { useFetchPosts } from '@/hooks/useFetchPosts'
import useInfiniteScroll from '@/hooks/useInfiniteScroll'
import { styles } from '@/styles'

const Index = () => {
  const { postData, error, loading, loadMorePosts, isLoadingMore, hasMore } =
    useFetchPosts('/posts')

  const { triggerRef } = useInfiniteScroll(loadMorePosts, hasMore)

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
          {<PostList posts={postData.posts} />}

          {/* ローディング表示 */}
          {hasMore && isLoadingMore && (
            <CircularProgress
              sx={{
                margin: 'auto',
                display: 'flex',
                paddingY: 2,
              }}
            />
          )}

          {/* スクロールトリガー */}
          <div ref={triggerRef} style={{ height: '10px' }} />
        </div>
      </Container>
    </Box>
  )
}

export default Index
