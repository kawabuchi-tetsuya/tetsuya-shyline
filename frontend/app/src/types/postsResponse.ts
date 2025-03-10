import { Post } from './post'

export interface PostsResponse {
  posts: Post[]
  meta: {
    next_keyset?: {
      updated_at: string
      id: number
    } | null
  }
}
