// 投稿詳細を表示するコンポーネント
import { Update } from '@mui/icons-material'
import ArticleIcon from '@mui/icons-material/Article'
import {
  Box,
  Card,
  Container,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material'
import { Post } from '@/types/post'
import { ImagePreviewModal } from '@/components/ImagePreviewModal'
import { PostThumbnailList } from '@/components/PostThumbnailList'
import { useImagePreviewModal } from '@/hooks/useImagePreviewModal'
import DebugPostDetail from './DebugPostDetail'

type PostDetailProps = {
  post: Post | null
}

const PostDetailItem: React.FC<PostDetailProps> = ({ post }) => {
  const { selectedImageUrl, setSelectedImageUrl, modalRef } =
    useImagePreviewModal()

  if (!post) return <p>投稿が見つかりませんでした</p>

  const primaryTextStyle = {
    fontSize: { xs: 12, sm: 14 },
    color: 'inherit',
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ pt: 6, pb: 3 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '0 8px',
            m: 'auto',
          }}
        >
          <Box sx={{ textAlign: 'center', width: '100%' }}>
            <Typography
              component="h2"
              sx={{
                fontSize: { xs: 21, sm: 25 },
                fontWeight: 'bold',
                lineHeight: '40px',
              }}
            >
              {post?.user.name} さんの投稿
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', gap: '0 24px' }}>
        <Box sx={{ width: '100%' }}>
          <Card
            sx={{
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
              <Typography
                sx={{
                  fontSize: 14,
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                }}
              >
                {post?.content}
              </Typography>

              {/* 画像 */}
              {post.thumbnailUrls.length > 0 && (
                <PostThumbnailList
                  thumbnails={post.thumbnailUrls}
                  originals={post.originalImageUrls}
                  onImageClick={setSelectedImageUrl}
                />
              )}

              {/* 画像選択時にオーバーレイ表示 */}
              {selectedImageUrl && (
                <ImagePreviewModal
                  imageUrl={selectedImageUrl}
                  modalRef={modalRef}
                />
              )}
            </Box>
            <List sx={{ color: '#6E7B85' }}>
              <ListItem divider>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ pr: 1 }}>
                      <ArticleIcon />
                    </Box>
                    <ListItemText
                      primary="初回投稿"
                      primaryTypographyProps={primaryTextStyle}
                    />
                  </Box>
                  <Box>
                    <ListItemText
                      primary={`${post?.createdAt} (${post?.createdAtFromToday})`}
                      primaryTypographyProps={primaryTextStyle}
                    />
                  </Box>
                </Box>
              </ListItem>
              <ListItem>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ pr: 1 }}>
                      <Update />
                    </Box>
                    <ListItemText
                      primary="最終更新"
                      primaryTypographyProps={primaryTextStyle}
                    />
                  </Box>
                  <Box>
                    <ListItemText
                      primary={`${post?.updatedAt} (${post?.updatedAtFromToday})`}
                      primaryTypographyProps={primaryTextStyle}
                    />
                  </Box>
                </Box>
              </ListItem>
            </List>
          </Card>
        </Box>
      </Box>
      {/* ↓↓↓ デバッグ用 最後に消す ↓↓↓ */}
      <DebugPostDetail post={post} />
      {/* ↑↑↑ デバッグ用 最後に消す ↑↑↑ */}
    </Container>
  )
}

export default PostDetailItem
