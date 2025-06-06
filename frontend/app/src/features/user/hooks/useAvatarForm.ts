import { useEffect, useState } from 'react'
import apiClient from '@/axiosConfig'
import { useSnackbarState } from '@/hooks/useGlobalState'
import { User } from '@/types/user'

type Props = {
  user: User
  mutate: () => void
}

export const useAvatarForm = ({ user, mutate }: Props) => {
  const [, setSnackbar] = useSnackbarState()
  const [preview, setPreview] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (user?.avatarUrl) setPreview(user.avatarUrl)
  }, [user])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setSelectedFile(file)
    const reader = new FileReader()
    reader.onloadend = () => setPreview(reader.result as string)
    reader.readAsDataURL(file)
  }

  const handleSubmit = async () => {
    if (!selectedFile) return
    setIsSubmitting(true)
    const formData = new FormData()
    formData.append('avatar', selectedFile)
    try {
      await apiClient.patch('/current/user/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      mutate()
      setSnackbar({
        message: 'アバター画像を更新しました',
        severity: 'success',
        pathname: '/current/user/edit/avatar',
      })
    } catch (error) {
      console.error(error)
      setSnackbar({
        message: 'アバター画像の更新に失敗しました',
        severity: 'error',
        pathname: '/current/user/edit/avatar',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    preview,
    selectedFile,
    handleFileChange,
    handleSubmit,
    isSubmitting,
  }
}
