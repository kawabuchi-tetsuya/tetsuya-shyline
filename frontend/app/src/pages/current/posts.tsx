import { Box, Container, Typography } from '@mui/material'
import CurrentPostList from '@/components/CurrentPostList'
import Loader from '@/components/Loader'
import { useFetchPosts } from '@/hooks/useFetchPosts'
import useInfiniteScroll from '@/hooks/useInfiniteScroll'
import { useRequireSignedIn } from '@/hooks/useRequireSignedIn'
import { useUserState } from '@/hooks/useGlobalState'
import { styles } from '@/styles'

const CurrentPosts = () => {
  useRequireSignedIn()
  const [user] = useUserState()

  const { posts, error, loading, loadMorePosts, nextKeyset } = useFetchPosts(
    user.isSignedIn ? '/current/posts' : '/posts'
  )

  const hasMore = nextKeyset !== null
  useInfiniteScroll(loadMorePosts, hasMore)

  if (!user.isSignedIn) return <div>サインインが必要です。</div>
  if (error) return <div>エラーが発生しました。</div>
  if (loading) return <Loader />

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
          {<CurrentPostList posts={posts} />}
        </div>
      </Container>
    </Box>
  )
}

export default CurrentPosts
