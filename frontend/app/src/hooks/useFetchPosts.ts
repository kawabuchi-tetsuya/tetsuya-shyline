// 投稿データを取得するカスタムフック
import useSWRInfinite from 'swr/infinite'
import { PostsResponse } from '@/types/postsResponse'
import { fetcher } from '@/utils'

export const useFetchPosts = (apiPath: string) => {
  const url = import.meta.env.VITE_API_BASE_URL + apiPath

  const getKey = (_pageIndex: number, previousPageData: PostsResponse) => {
    if (!previousPageData?.meta.nextKeyset) return url

    const params = new URLSearchParams({
      updated_at: previousPageData.meta.nextKeyset.updatedAt || '',
      id: previousPageData.meta.nextKeyset.id?.toString() || '',
    })
    return `${url}?${params.toString()}`
  }

  const {
    data,
    error: swrError,
    size,
    setSize,
    isValidating,
    mutate,
  } = useSWRInfinite(getKey, fetcher, {
    revalidateOnFocus: false, // ブラウザフォーカス時の自動リフェッチを無効化
    revalidateIfStale: false, // データ取得から5分経過後の自動リフェッチを無効化
    revalidateOnReconnect: false, // 再接続時の自動リフェッチを無効化
  })

  const postData = data?.flatMap((page) => page.posts) ?? []
  const hasMore = data?.[data.length - 1]?.meta?.nextKeyset !== null
  const isInitialLoading = size === 1 && isValidating
  const isFetchingMore = size > 1 && isValidating

  const refreshPosts = () => {
    mutate()
  }
  const loadMorePosts = () => {
    if (!hasMore || isValidating) return

    setSize(size + 1)
  }

  return {
    postData,
    error: swrError,
    isInitialLoading,
    isFetchingMore,
    loadMorePosts,
    refreshPosts,
    hasMore,
  }
}
