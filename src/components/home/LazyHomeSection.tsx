import React, {Suspense, useEffect, useRef, useState} from "react"

interface LazyHomeSectionProps {
  children: React.ReactNode
  minHeight?: string
}

const LazyHomeSection: React.FC<LazyHomeSectionProps> = ({children, minHeight = "24rem"}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    let observer: IntersectionObserver | null = null

    const startObserving = () => {
      if (isVisible || observer) return

      if (!("IntersectionObserver" in window)) {
        setIsVisible(true)
        return
      }

      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer?.disconnect()
          }
        },
        {rootMargin: "0px"},
      )

      observer.observe(element)
    }

    window.addEventListener("scroll", startObserving, {once: true, passive: true})
    window.addEventListener("wheel", startObserving, {once: true, passive: true})
    window.addEventListener("touchstart", startObserving, {once: true, passive: true})
    window.addEventListener("keydown", startObserving, {once: true})

    return () => {
      observer?.disconnect()
      window.removeEventListener("scroll", startObserving)
      window.removeEventListener("wheel", startObserving)
      window.removeEventListener("touchstart", startObserving)
      window.removeEventListener("keydown", startObserving)
    }
  }, [isVisible])

  return (
    <div ref={ref} style={!isVisible ? {minHeight} : undefined}>
      {isVisible ? <Suspense fallback={null}>{children}</Suspense> : null}
    </div>
  )
}

export default LazyHomeSection
