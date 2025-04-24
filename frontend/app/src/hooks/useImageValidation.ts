import { useRef } from 'react'

const MAX_IMAGE_COUNT = 4
const MAX_FILE_SIZE_MB = 5
const MAX_FILE_SIZE = MAX_FILE_SIZE_MB * 1024 * 1024
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp']

export const useImageValidation = () => {
  const errorRef = useRef<string | null>(null)

  const validateImages = (files: File[]): File[] | null => {
    errorRef.current = null
    if (!files) return null

    const fileArray = Array.from(files)

    if (fileArray.length > MAX_IMAGE_COUNT) {
      errorRef.current = `画像は${MAX_IMAGE_COUNT}枚まで選択可能です`
      return null
    }

    for (const file of fileArray) {
      if (!ACCEPTED_TYPES.includes(file.type)) {
        errorRef.current = '画像の形式はjpeg, png, webpのみ選択可能です'
        return null
      }

      if (file.size > MAX_FILE_SIZE) {
        errorRef.current = `画像のサイズは${MAX_FILE_SIZE_MB}MBまで選択可能です`
        return null
      }
    }

    return fileArray
  }

  return { validateImages, errorMessage: errorRef.current }
}
