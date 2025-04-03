import { useState, useEffect } from 'react'
import { fetcher } from '@/utils'
import { Post } from '@/types/post'

export const useFetchPostDetail = (apiPath: string | null) => {
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!apiPath) return

    const fetchPostDetail = async () => {
      try {
        const data = await fetcher(apiPath)
        setPost(data)
      } catch (error) {
        console.error('Error loading post detail:', error)
        setError('ポストの取得に失敗しました')
      } finally {
        setLoading(false)
      }
    }

    fetchPostDetail()
  }, [apiPath])

  return { post, loading, error }
}
