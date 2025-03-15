import { Post } from './post'

export type PostsResponse = {
  posts: Post[]
  meta: {
    next_keyset?: {
      updated_at: string
      id: number
    } | null
  }
}
