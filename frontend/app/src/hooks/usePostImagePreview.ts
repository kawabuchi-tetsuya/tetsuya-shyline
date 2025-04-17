import { useEffect, useState } from 'react'

export const usePostImagePreview = (files: File[]) => {
  const [previewUrls, setPreviewUrls] = useState<string[]>([])

  useEffect(() => {
    const urls = files.map((file) => URL.createObjectURL(file))
    setPreviewUrls(urls)

    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url))
    }
  }, [files])

  return previewUrls
}
