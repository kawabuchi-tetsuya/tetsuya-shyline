import { Box, CircularProgress, Container, Typography } from '@mui/material'
import CurrentPostList from '@/components/CurrentPostList'
import Error from '@/components/Error'
import Loader from '@/components/Loader'
import { useFetchPosts } from '@/hooks/useFetchPosts'
import useInfiniteScroll from '@/hooks/useInfiniteScroll'
import useSavedScrollPosition from '@/hooks/useSavedScrollPosition'
import { useRequireSignedIn } from '@/hooks/useRequireSignedIn'
import { useUserState } from '@/hooks/useGlobalState'
import { styles } from '@/styles'

const CurrentPosts = () => {
  useRequireSignedIn()
  const [user] = useUserState()
  const apiPath = user.isSignedIn ? '/current/posts' : '/posts'

  const {
    postData,
    error,
    isInitialLoading,
    isFetchingMore,
    loadMorePosts,
    hasMore,
  } = useFetchPosts(apiPath)

  const { triggerRef } = useInfiniteScroll(loadMorePosts, hasMore)
  useSavedScrollPosition(
    isInitialLoading,
    isFetchingMore,
    'scrollPositionCurrentPosts'
  )

  if (error) return <Error />
  if (isInitialLoading) return <Loader />

  return (
    <Box sx={styles.pageMinHeight}>
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
          あなたの投稿一覧
        </Typography>
        <div>
          {/* 投稿データの表示 */}
          {<CurrentPostList posts={postData} />}

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

export default CurrentPosts
