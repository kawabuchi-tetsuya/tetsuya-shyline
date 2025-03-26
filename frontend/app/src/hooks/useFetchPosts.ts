// 投稿データを取得するカスタムフック
import { useState, useReducer } from 'react'
import useSWR from 'swr'
import { PostsResponse } from '@/types/postsResponse'
import { useNextKeyset } from './useNextKeyset'
import { fetcher } from '@/utils'
import { LoadingAction } from '@/types/loadingAction'

export const useFetchPosts = (apiPath: string) => {
  const url = import.meta.env.VITE_API_BASE_URL + apiPath
  const [error, setError] = useState(null)
  const { data, mutate } = useSWR(url, fetcher, {
    onError: (err) => setError(err),
    // ブラウザフォーカス時の自動リフェッチを無効化する
    revalidateOnFocus: false,
  })
  const { nextKeyset } = useNextKeyset(data)

  const [hasMore, setHasMore] = useState(true)
  const [isLoadingMore, dispatchLoading] = useReducer(
    (state: boolean, action: LoadingAction) => {
      switch (action.type) {
        case 'START_LOADING':
          return true
        case 'STOP_LOADING':
          return false
        default:
          return state
      }
    },
    false
  )

  const loadMorePosts = async () => {
    if (isLoadingMore || !nextKeyset || !hasMore) return

    dispatchLoading({ type: 'START_LOADING' })

    try {
      const params = new URLSearchParams({
        updated_at: nextKeyset.updatedAt,
        id: nextKeyset.id.toString(),
      })

      const moreData = await fetcher(`${apiPath}?${params.toString()}`)

      if (moreData.posts.length === 0) {
        setHasMore(false)
        return
      }

      const updatePosts = (prevData?: PostsResponse) => {
        const updatedKeyset =
          moreData.meta.nextKeyset ?? prevData?.meta?.nextKeyset

        return {
          posts: [...(prevData?.posts || []), ...moreData.posts],
          meta: { nextKeyset: { ...updatedKeyset } },
        }
      }

      mutate(updatePosts, false)
    } catch (error) {
      console.error('Error loading more posts:', error)
    } finally {
      dispatchLoading({ type: 'STOP_LOADING' })
    }
  }

  return {
    postData: {
      posts: data?.posts || [],
      nextKeyset,
    },
    error,
    loading: !data,
    loadMorePosts,
    isLoadingMore,
    hasMore,
  }
}
