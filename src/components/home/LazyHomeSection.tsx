import React, {useEffect, useRef, useState} from "react"

interface LazyHomeSectionProps {
  children: React.ReactNode
  minHeight?: number
}

const LazyHomeSection: React.FC<LazyHomeSectionProps> = ({children, minHeight = 320}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container || isVisible) {
      return
    }

    if (!("IntersectionObserver" in window)) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      {rootMargin: "600px 0px"}
    )

    observer.observe(container)
    return () => observer.disconnect()
  }, [isVisible])

  return (
    <div ref={containerRef} style={isVisible ? undefined : {minHeight}}>
      {isVisible ? children : null}
    </div>
  )
}

export default LazyHomeSection
