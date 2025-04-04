import { Box, Container } from '@mui/material'
import { useParams } from 'react-router-dom'
import Error from '@/components/Error'
import Loader from '@/components/Loader'
import EditPostAppBar from '@/components/EditPostAppBar'
import PostForm from '@/components/PostForm'
import { usePostForm } from '@/hooks/usePostForm'
import { useRequireSignedIn } from '@/hooks/useRequireSignedIn'

const CurrentPostsEdit = () => {
  useRequireSignedIn()
  const { id: postId } = useParams<{ id: string }>()
  const { formState, dispatch, control, handleSubmit, error } =
    usePostForm(postId)

  if (formState.isLoading) return <Loader />
  if (error) return <Error />

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ backgroundColor: '#EDF2F7', minHeight: '100vh' }}
    >
      <EditPostAppBar
        statusChecked={formState.statusChecked}
        isLoading={formState.isLoading}
        onToggleStatus={() =>
          dispatch({
            type: 'SET_STATUS_CHECKED',
            payload: !formState.statusChecked,
          })
        }
      />
      <Container maxWidth="lg" sx={{ pt: 11, pb: 3 }}>
        <PostForm control={control} contentLength={formState.contentLength} />
      </Container>
    </Box>
  )
}

export default CurrentPostsEdit
