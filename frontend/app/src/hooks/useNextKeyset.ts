import { useEffect, useState } from 'react'
import { PostsResponse } from '@/types/postsResponse'

export const useNextKeyset = (data?: PostsResponse) => {
  type NextKeysetType = PostsResponse['meta']['nextKeyset']
  const [nextKeyset, setNextKeyset] = useState<NextKeysetType>(null)
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    if (!data?.meta?.nextKeyset) return

    const newKeyset = data.meta.nextKeyset

    if (isUpdating || nextKeyset?.id === newKeyset.id) return

    setIsUpdating(true)
    setNextKeyset({ ...newKeyset })

    setTimeout(() => setIsUpdating(false), 50)
  }, [data?.meta?.nextKeyset, isUpdating, nextKeyset?.id])

  return { nextKeyset, setNextKeyset, isUpdating }
}
