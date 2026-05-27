import React, {useRef, useState} from "react"
import {useCookieConsent} from "@site/src/utils/hooks/useCookieConsent"
import "./style.css"

const IntroductionVideo: React.FC = () => {
  const videoId = "1011521201"
  const videoRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const {getCookieConsent} = useCookieConsent()
  const cookieConsent = getCookieConsent()

  const handleVimeoAnalytics = () => {
    return Boolean(cookieConsent?.accepted) ? "" : "&dnt=1"
  }

  return (
    <div className="video-wrapper" ref={videoRef}>
      <div className="video-container">
        {isLoaded ? (
          <iframe
            src={`https://player.vimeo.com/video/${videoId}?autoplay=1&badge=0&autopause=0&player_id=0&app_id=58479${handleVimeoAnalytics()}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full"
            title="Tailcall Introduction Video"
          />
        ) : (
          <button className="video-play-button" type="button" onClick={() => setIsLoaded(true)}>
            <span className="video-play-icon" aria-hidden="true" />
            <span className="sr-only">Play Tailcall introduction video</span>
          </button>
        )}
      </div>
    </div>
  )
}

export default IntroductionVideo
