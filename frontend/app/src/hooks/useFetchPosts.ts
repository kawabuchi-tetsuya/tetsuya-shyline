// 投稿データを取得するカスタムフック
import { useState, useRef } from 'react'
import useSWR from 'swr'
import { PostsResponse } from '@/types/postsResponse'
import { useNextKeyset } from './useNextKeyset'
import { fetchMorePosts } from './fetchMorePosts'
import { fetcher } from '@/utils'

export const useFetchPosts = (api_path: string) => {
  const url = import.meta.env.VITE_API_BASE_URL + api_path
  const { data, error, mutate } = useSWR(url, fetcher)
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
