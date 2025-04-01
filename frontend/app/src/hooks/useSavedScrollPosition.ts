import { useEffect } from 'react'

const useSavedScrollPosition = (
  isInitialLoading: boolean,
  isFetchingMore: boolean
) => {
  useEffect(() => {
    if (isInitialLoading) {
      sessionStorage.removeItem('scrollPosition')
      return
    }
    if (isFetchingMore) return

    const savedScrollPosition = sessionStorage.getItem('scrollPosition')
    if (savedScrollPosition) {
      window.scrollTo(0, parseInt(savedScrollPosition))
      sessionStorage.removeItem('scrollPosition')
    }
  }, [isInitialLoading, isFetchingMore])
}

export default useSavedScrollPosition
