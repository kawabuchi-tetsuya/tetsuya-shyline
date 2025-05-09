// 投稿アイテムを表示するコンポーネント
import { useNavigate } from 'react-router-dom'
import { Box, Card, CardContent, Typography } from '@mui/material'
import { ImagePreviewModal } from '@/components/ImagePreviewModal'
import { PostThumbnailList } from '@/components/PostThumbnailList'
import { useImagePreviewModal } from '@/hooks/useImagePreviewModal'
import { Post } from '@/types/post'

type PostItemProps = {
  post: Post
}

const PostItem: React.FC<PostItemProps> = ({ post }) => {
  const navigate = useNavigate()
  const handleClick = () => {
    sessionStorage.setItem('scrollPositionPosts', window.scrollY.toString())
    navigate(`/posts/${post.id}`)
  }

  const { selectedImageUrl, setSelectedImageUrl, modalRef } =
    useImagePreviewModal()

  return (
    <Card onClick={handleClick}>
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
            <Typography
              sx={{
                fontSize: 14,
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
              }}
            >
              {post.content}
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

            <Typography sx={{ fontSize: 12 }}>
              最終更新：{post.updatedAtFromToday}
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

export default PostItem
