import { Button } from '@mui/material'

type Props = {
  onClick: () => void
  disabled: boolean
}

const LoadMoreButton = ({ onClick, disabled }: Props) => {
  return (
    <Button variant="contained" onClick={onClick} disabled={disabled}>
      もっと読む
    </Button>
  )
}

export default LoadMoreButton
