// 投稿アイテムを表示するコンポーネント
import React from 'react'
import { Box, Card, CardContent, Typography } from '@mui/material'
import { Post } from '../types/post'

interface PostItemProps {
  post: Post;
}

const PostItem: React.FC<PostItemProps> = ({ post }) => {
  return (
    <Card>
      <CardContent>
        <Typography
          component={'h3'}
          sx={{
            mb: 2,
            minHeight: 20,
            fontSize: 16,
            fontWeight: 'bold',
            lineHeight: 1.5,
          }}
        >
          {post.user.name}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <div className='border p-4 mb-2 rounded shadow'>
            <Typography sx={{ fontSize: 12 }}>{post.content}</Typography>
            <Typography sx={{ fontSize: 12 }}>最終更新：{post.from_today}</Typography>

            {/* ↓↓↓ デバッグ用 最後に消す ↓↓↓ */}
            <Typography sx={{ fontSize: 12 }}>post.id: {post.id}</Typography>
            <Typography sx={{ fontSize: 12 }}>post.status: {post.status}</Typography>
            {/* ↑↑↑ デバッグ用 最後に消す ↑↑↑ */}

          </div>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PostItem;
