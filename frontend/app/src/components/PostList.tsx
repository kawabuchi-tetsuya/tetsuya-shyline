// 投稿データを取得して表示するコンポーネント
import React from 'react'
import { Grid } from '@mui/material'
import { Post } from '@/types/post'
import PostItem from '@/features/post/components/PostItem'

type PostListProps = {
  posts: Post[]
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
  return (
    <Grid container spacing={3}>
      {posts.map((post) => (
        <Grid item xs={12} key={post.id}>
          <PostItem post={post} />
        </Grid>
      ))}
    </Grid>
  )
}

export default PostList
