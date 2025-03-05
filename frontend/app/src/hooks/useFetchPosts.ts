// 投稿データを取得するカスタムフック
import { useState, useRef } from 'react'
import useSWR from 'swr'
import apiClient from '../axiosConfig'
import { PostsResponse } from '../types/postsResponse'
import { useNextKeyset } from './useNextKeyset'
import { fetchMorePosts } from './fetchMorePosts'

const fetcher = (url: string) => apiClient.get<PostsResponse>(url).then((res) => res.data)

export const useFetchPosts = () => {
  const { data, error, mutate } = useSWR('/posts', fetcher)
  const { nextKeyset, setNextKeyset } = useNextKeyset(data)
  const [isLoadingMore, setIsLoadingMore] = useState(false)

  // 連続リクエストを防止
  const isFetchingRef = useRef(false)

  const loadMorePosts = async () => {
    if (isFetchingRef.current || !nextKeyset) return

    isFetchingRef.current = true
    setIsLoadingMore(true)

    try {
      const { posts, nextKeyset: newKeyset } = await fetchMorePosts(nextKeyset)

      if (newKeyset && newKeyset.id === nextKeyset.id) {
        console.warn('Duplicate fetch prevented.')
        return
      }

      mutate(
        (prevData?: PostsResponse) => ({
          posts: [...(prevData?.posts || []), ...posts],
          meta: { ...prevData?.meta, next_keyset: newKeyset },
        }),
        false
      )

      setNextKeyset(newKeyset)
    } catch (error) {
      console.error('Error loading more posts:', error)
    } finally {
      isFetchingRef.current = false
      setIsLoadingMore(false)
    }
  }

  return {
    posts: data?.posts || [],
    error,
    loading: !data,
    loadMorePosts,
    nextKeyset,
    isLoadingMore,
  }
}
