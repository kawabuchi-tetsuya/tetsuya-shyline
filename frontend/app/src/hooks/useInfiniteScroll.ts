import { useEffect, useRef } from 'react'

const useInfiniteScroll = (loadMore: () => void, hasMore: boolean) => {
  const observerRef = useRef<IntersectionObserver | null>(null)
  const triggerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!hasMore) return

    observerRef.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        loadMore()
      }
    })

    const target = triggerRef.current

    if (target) {
      observerRef.current.observe(target)
    }

    return () => {
      if (observerRef.current && target) {
        observerRef.current.unobserve(target)
      }
    }
  }, [loadMore, hasMore])

  return { triggerRef }
}

export default useInfiniteScroll
