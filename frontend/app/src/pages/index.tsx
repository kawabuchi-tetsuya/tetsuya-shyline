import { Box, CircularProgress, Container, Typography } from '@mui/material'
import PostList from '@/components/PostList'
import Error from '@/components/Error'
import Loader from '@/components/Loader'
import { useFetchPosts } from '@/hooks/useFetchPosts'
import useInfiniteScroll from '@/hooks/useInfiniteScroll'
import { styles } from '@/styles'
import useSavedScrollPosition from '@/hooks/useSavedScrollPosition'

const Index = () => {
  const {
    postData,
    error,
    isInitialLoading,
    isFetchingMore,
    loadMorePosts,
    hasMore,
  } = useFetchPosts('/posts')

  const { triggerRef } = useInfiniteScroll(loadMorePosts, hasMore)
  useSavedScrollPosition(isInitialLoading, isFetchingMore)

  if (error) return <Error />
  if (isInitialLoading) return <Loader />

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
          {<PostList posts={postData} />}

          {/* ローディング表示 */}
          {hasMore && isFetchingMore && (
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
