import { Post } from './post'

export type PostsResponse = {
  posts: Post[]
  meta: {
    nextKeyset?: {
      updatedAt: string
      id: number
    } | null
  }
}
