import React, {Suspense, useEffect, useRef, useState} from "react"

interface LazyHomeSectionProps {
  children: React.ReactNode
  minHeight: number
}

const LazyHomeSection: React.FC<LazyHomeSectionProps> = ({children, minHeight}) => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    const node = wrapperRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true)
          observer.disconnect()
        }
      },
      {rootMargin: "800px 0px"},
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={wrapperRef} style={shouldRender ? undefined : {minHeight}}>
      {shouldRender && <Suspense fallback={<div style={{minHeight}} />}>{children}</Suspense>}
    </div>
  )
}

export default LazyHomeSection
