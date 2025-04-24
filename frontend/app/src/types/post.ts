export type Post = {
  id: number
  content: string
  status: string
  createdAt: string
  createdAtFromToday: string
  updatedAt: string
  updatedAtFromToday: string
  originalImageUrls: string[]
  thumbnailUrls: string[]
  user: {
    name: string
    nickname: string
  }
}
