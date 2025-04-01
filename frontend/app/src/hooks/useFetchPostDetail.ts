import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { fetcher } from '@/utils'
import { Post } from '@/types/post'

export const useFetchPostDetail = (apiPath: string) => {
  const { id } = useParams<{ id: string }>()
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return

    const fetchPostDetail = async () => {
      try {
        const data = await fetcher(`${apiPath}/${id.toString()}`)
        setPost(data)
      } catch (error) {
        console.error('Error loading post detail:', error)
        setError('ポストの取得に失敗しました')
      } finally {
        setLoading(false)
      }
    }

    fetchPostDetail()
  }, [apiPath, id])

  return { post, loading, error }
}
