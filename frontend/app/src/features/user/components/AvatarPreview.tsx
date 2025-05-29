import { Avatar } from '@mui/material'

type Props = {
  src: string | null
}

const AvatarPreview = ({ src }: Props) => {
  return (
    <Avatar
      src={src ?? undefined}
      sx={{ width: 120, height: 120, mx: 'auto', border: '1px solid #CCC' }}
    />
  )
}

export default AvatarPreview
