import React, {useEffect, useRef, useState} from "react"

type HomeSectionModule = {
  default: React.ComponentType
}

type LazyHomeSectionProps = {
  load: () => Promise<HomeSectionModule>
  minHeight: number
  rootMargin?: string
  threshold?: number
}

const LazyHomeSection = ({
  load,
  minHeight,
  rootMargin = "900px 0px",
  threshold = 0,
}: LazyHomeSectionProps): JSX.Element => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [SectionComponent, setSectionComponent] = useState<React.ComponentType | null>(null)

  useEffect(() => {
    const container = containerRef.current
    let cancelled = false

    const loadSection = () => {
      load().then((module) => {
        if (!cancelled) {
          setSectionComponent(() => module.default)
        }
      })
    }

    if (!container || SectionComponent) {
      return () => {
        cancelled = true
      }
    }

    if (!("IntersectionObserver" in window)) {
      loadSection()
      return () => {
        cancelled = true
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= threshold) {
          observer.disconnect()
          loadSection()
        }
      },
      {rootMargin, threshold},
    )

    observer.observe(container)

    return () => {
      cancelled = true
      observer.disconnect()
    }
  }, [load, rootMargin, SectionComponent, threshold])

  return (
    <div ref={containerRef} className="homepage-deferred-section" style={SectionComponent ? undefined : {minHeight}}>
      {SectionComponent ? <SectionComponent /> : null}
    </div>
  )
}

export default LazyHomeSection
