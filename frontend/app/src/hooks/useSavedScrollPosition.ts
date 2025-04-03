import { useEffect } from 'react'

const useSavedScrollPosition = (
  isInitialLoading: boolean,
  isFetchingMore: boolean,
  keyName: string
) => {
  useEffect(() => {
    if (isInitialLoading) {
      sessionStorage.removeItem(keyName)
      return
    }
    if (isFetchingMore) return

    const savedScrollPosition = sessionStorage.getItem(keyName)
    if (savedScrollPosition) {
      window.scrollTo(0, parseInt(savedScrollPosition))
      sessionStorage.removeItem(keyName)
    }
  }, [isInitialLoading, isFetchingMore, keyName])
}

export default useSavedScrollPosition
