export type Post = {
  id: number
  content: string
  status: string
  createdAt: string
  createdAtFromToday: string
  updatedAt: string
  updatedAtFromToday: string
  user: { name: string }
}
