import { Box } from '@mui/material'

type Props = {
  thumbnails: string[]
  originals: string[]
  onImageClick: (url: string) => void
}

export const PostThumbnailList: React.FC<Props> = ({
  thumbnails,
  originals,
  onImageClick,
}) => {
  return (
    <Box>
      {thumbnails.map((thumbnailUrl, i) => (
        <img
          key={i}
          src={thumbnailUrl}
          width={150}
          onClick={(e) => {
            e.stopPropagation()
            onImageClick(originals[i])
          }}
          style={{ cursor: 'pointer', marginRight: 8, marginBottom: 8 }}
        />
      ))}
    </Box>
  )
}
