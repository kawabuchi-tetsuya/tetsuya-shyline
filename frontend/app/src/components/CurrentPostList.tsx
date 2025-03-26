// 投稿データを取得して表示するコンポーネント
import React from 'react'
import { Box, Container, Divider } from '@mui/material'
import { Post } from '@/types/post'
import CurrentPostItem from './CurrentPostItem'

type PostListProps = {
  posts: Post[]
}

const CurrentPostList: React.FC<PostListProps> = ({ posts }) => {
  return (
    <Container maxWidth="md" sx={{ pt: 6, px: 4 }}>
      {posts.map((post) => (
        <Box key={post.id}>
          <CurrentPostItem post={post} />
          <Divider />
        </Box>
      ))}
    </Container>
  )
}

export default CurrentPostList
