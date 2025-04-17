import { useState, useRef, useEffect } from 'react'

export const useImagePreviewModal = () => {
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null)
  const modalRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !(modalRef.current as HTMLElement).contains(event.target as Node)
      ) {
        setSelectedImageUrl(null)
      }
    }
    if (selectedImageUrl) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [selectedImageUrl])

  return {
    selectedImageUrl,
    setSelectedImageUrl,
    modalRef,
  }
}
