// 投稿詳細にデバッグ用データを表示するコンポーネント（最後に消すこと）
import { Box, Card, List, ListItem, ListItemText } from '@mui/material'
import { Post } from '@/types/post'

type PostDetailProps = {
  post: Post | null
}
const DebugPostDetail: React.FC<PostDetailProps> = ({ post }) => {
  return (
    <Box sx={{ display: 'flex', gap: '0 24px', pt: 3 }}>
      <Box sx={{ width: '100%' }}>
        <Card
          sx={{
            backgroundColor: '#AAA',
            backShadow: 'none',
            borderRadius: '12px',
            maxWidth: 840,
            m: '0 auto',
          }}
        >
          <Box
            sx={{
              p: 3,
            }}
          >
            <List>
              <ListItem divider>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ pr: 1 }}>
                    <ListItemText primary="投稿ID（デバッグ用）" />
                  </Box>
                  <Box>
                    <ListItemText primary={post?.id} />
                  </Box>
                </Box>
              </ListItem>
              <ListItem>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ pr: 1 }}>
                    <ListItemText primary="投稿ステータス（デバッグ用）" />
                  </Box>
                  <Box>
                    <ListItemText primary={post?.status} />
                  </Box>
                </Box>
              </ListItem>
            </List>
          </Box>
        </Card>
      </Box>
    </Box>
  )
}

export default DebugPostDetail
