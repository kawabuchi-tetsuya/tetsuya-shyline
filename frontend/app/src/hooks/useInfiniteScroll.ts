import { useEffect } from 'react'

const useInfiniteScroll = (loadMore: () => void, hasMore: boolean) => {
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 200 &&
        hasMore
      ){
        loadMore()
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [loadMore, hasMore])
}

export default useInfiniteScroll
