import apiClient from '../axiosConfig'
import { PostsResponse } from '../types/postsResponse'

export const fetchMorePosts = async (nextKeyset: PostsResponse['meta']['next_keyset']) => {
  if (!nextKeyset) return { posts: [], nextKeyset: null }

  const { data: morePostsData } = await apiClient.get<PostsResponse>(
    `/posts?updated_at=${nextKeyset.updated_at}&id=${nextKeyset.id}`
  )

  return {
    posts: morePostsData.posts,
    nextKeyset: morePostsData.meta.next_keyset || null,
  }
}
