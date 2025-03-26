// サインインユーザーの投稿アイテムを表示するコンポーネント
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import EditIcon from '@mui/icons-material/Edit'
import { Avatar, Box, IconButton, Tooltip, Typography } from '@mui/material'
import React from 'react'
import { Post } from '@/types/post'

type PostItemProps = {
  post: Post
}

const CurrentPostItem: React.FC<PostItemProps> = ({ post }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        minHeight: 80,
        paddingY: 2,
      }}
    >
      <Box sx={{ width: 'auto', pr: 3 }}>
        <div>
          <Typography sx={{ fontSize: 14 }}>{post.content}</Typography>
          <Typography sx={{ fontSize: 12 }}>
            最終更新：{post.fromToday}
          </Typography>

          {/* ↓↓↓ デバッグ用 最後に消す ↓↓↓ */}
          <Typography sx={{ fontSize: 12 }}>user: {post.user.name}</Typography>
          <Typography sx={{ fontSize: 12 }}>post.id: {post.id}</Typography>
          {/* ↑↑↑ デバッグ用 最後に消す ↑↑↑ */}
        </div>
      </Box>
      <Box
        sx={{
          minWidth: 180,
          width: 180,
          display: 'flex',
          justifyContent: 'space-between',
          alignContent: 'center',
        }}
      >
        <>
          {post.status == '下書き' && (
            <Box
              sx={{
                display: 'inline',
                fontSize: 12,
                textAlign: 'center',
                border: '1px solid #9FAFBA',
                p: '4px',
                borderRadius: 1,
                color: '#9FAFBA',
                fontWeight: 'bold',
                alignSelf: 'center',
              }}
            >
              {post.status}
            </Box>
          )}
          {post.status == '公開中' && (
            <Box
              sx={{
                display: 'inline',
                fontSize: 12,
                textAlign: 'center',
                border: '1px solid #3EA8FF',
                p: '4px',
                borderRadius: 1,
                color: '#3EA8FF',
                fontWeight: 'bold',
                alignSelf: 'center',
              }}
            >
              {post.status}
            </Box>
          )}
        </>
        <Box>
          <Avatar>
            <Tooltip title="編集する">
              <IconButton sx={{ backgroundColor: '#F1F5FA' }}>
                <EditIcon sx={{ color: '#99AAB6' }} />
              </IconButton>
            </Tooltip>
          </Avatar>
        </Box>
        <Box>
          <Avatar>
            <Tooltip title="表示を確認">
              <IconButton sx={{ backgroundColor: '#F1F5FA' }}>
                <ChevronRightIcon sx={{ color: '#99AAB6' }} />
              </IconButton>
            </Tooltip>
          </Avatar>
        </Box>
      </Box>
    </Box>
  )
}

export default CurrentPostItem
