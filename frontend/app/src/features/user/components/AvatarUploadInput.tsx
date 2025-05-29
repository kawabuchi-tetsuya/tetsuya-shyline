type Props = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const AvatarUploadInput = ({ onChange }: Props) => {
  return (
    <input type="file" name="avatar" accept="image/*" onChange={onChange} />
  )
}

export default AvatarUploadInput
