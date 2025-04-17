import { Box } from '@mui/material'

type Props = {
  imageUrl: string
  modalRef: React.RefObject<HTMLElement>
}

export const ImagePreviewModal: React.FC<Props> = ({ imageUrl, modalRef }) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0,0,0,0.8)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}
    >
      <Box ref={modalRef}>
        <img src={imageUrl} style={{ maxHeight: '90vh', maxWidth: '90vw' }} />
      </Box>
    </Box>
  )
}
