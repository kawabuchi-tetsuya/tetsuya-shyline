// 投稿詳細を表示するコンポーネント
import { Box, Card, CardContent, Typography } from '@mui/material'
import { Post } from '@/types/post'

type PostDetailProps = {
  post: Post | null
}

const PostDetailItem: React.FC<PostDetailProps> = ({ post }) => {
  if (!post) return <p>投稿が見つかりませんでした</p>

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
          <div className="border p-4 mb-2 rounded shadow">
            <Typography sx={{ fontSize: 14 }}>{post.content}</Typography>
            <Typography sx={{ fontSize: 12 }}>
              初回投稿：{post.createdAt}
            </Typography>
            <Typography sx={{ fontSize: 12 }}>
              最終更新：{post.fromToday}
            </Typography>

            {/* ↓↓↓ デバッグ用 最後に消す ↓↓↓ */}
            <Typography sx={{ fontSize: 12 }}>post.id: {post.id}</Typography>
            <Typography sx={{ fontSize: 12 }}>
              post.status: {post.status}
            </Typography>
            {/* ↑↑↑ デバッグ用 最後に消す ↑↑↑ */}
          </div>
        </Box>
      </CardContent>
    </Card>
  )
}

export default PostDetailItem
