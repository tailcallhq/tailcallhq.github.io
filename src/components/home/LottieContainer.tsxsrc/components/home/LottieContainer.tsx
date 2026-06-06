import React, {useEffect, useState, useRef} from "react"
import BrowserOnly from "@docusaurus/BrowserOnly"
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment"
import type {LottieComponentProps} from "lottie-light-react"

const LottieContainer: React.FC<LottieComponentProps> = ({animationData, loop = true, className = ""}) => {
  const [Lottie, setLottie] = useState<{default: React.FC<LottieComponentProps>} | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ExecutionEnvironment.canUseDOM || !containerRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true)
            observer.disconnect()
          }
        })
      },
      {
        rootMargin: "50px",
      },
    )

    observer.observe(containerRef.current)

    return () => {
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    if (isVisible && ExecutionEnvironment.canUseDOM) {
      import("lottie-light-react").then((LottieModule) => {
        setLottie(LottieModule)
      })
    }
  }, [isVisible])

  return (
    <div ref={containerRef} className={className}>
      <BrowserOnly>
        {() =>
          Lottie && isVisible ? <Lottie.default animationData={animationData} loop={loop} className={className} /> : <></>
        }
      </BrowserOnly>
    </div>
  )
}

export default LottieContainer
