import React, {useEffect, useState} from "react"
import BrowserOnly from "@docusaurus/BrowserOnly"
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment"
import type {LottieComponentProps} from "lottie-light-react"

const LottieContainer: React.FC<LottieComponentProps> = ({animationData, loop = true, className = ""}) => {
  const [Lottie, setLottie] = useState<{default: React.FC<LottieComponentProps>} | null>(null)

  useEffect(() => {
    if (ExecutionEnvironment.canUseDOM) {
      import("lottie-light-react").then((LottieModule) => {
        setLottie(LottieModule)
      })
    }
  }, [])

  return (
    <BrowserOnly>
      {() => (Lottie ? <Lottie.default animationData={animationData} loop={loop} className={className} /> : <></>)}
    </BrowserOnly>
  )
}

export default LottieContainer
