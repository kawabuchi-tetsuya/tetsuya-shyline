import { useEffect, useState } from 'react'
import { PostsResponse } from '../types/postsResponse'

export const useNextKeyset = (data?: PostsResponse) => {
  type NextKeysetType = PostsResponse['meta']['next_keyset']
  const [nextKeyset, setNextKeyset] = useState<NextKeysetType>(null)

  useEffect(() => {
    if (data?.meta.next_keyset) {
      setNextKeyset(data.meta.next_keyset)
    }
  }, [data?.meta.next_keyset])

  return {nextKeyset, setNextKeyset }
}
