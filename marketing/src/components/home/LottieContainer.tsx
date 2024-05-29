import React, {useEffect, useState} from "react"
import type {AnimationConfigWithData, LottiePlayer} from "lottie-web"

type LottieContainerProps = {
  animationData: object
  loop?: boolean
  className?: string
}

declare global {
  interface Window {
    lottie: LottiePlayer
  }
}

const LottieContainer: React.FC<LottieContainerProps> = ({animationData, loop = true, className = ""}) => {
  const [lottie, setLottie] = useState<LottiePlayer | null>(null)

  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://unpkg.com/lottie-web@5.12.2/build/player/lottie_light.min.js"
    script.onload = () => {
      setLottie(window.lottie)
    }
    document.body.appendChild(script)
    return () => {
      document.body.removeChild(script)
    }
  }, [])
  return lottie ? (
    <div
      className={className}
      ref={(container) => {
        if (container && !container.firstChild) {
          lottie.loadAnimation({
            container: container,
            renderer: "svg",
            loop: loop,
            autoplay: true,
            animationData: animationData,
          })
        }
      }}
    />
  ) : (
    <></>
  )
}

export default LottieContainer
