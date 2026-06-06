import React, {useRef, useState} from "react"
import {useCookieConsent} from "@site/src/utils/hooks/useCookieConsent"
import "./style.css"

const IntroductionVideo: React.FC = () => {
  const videoId = "1011521201"
  const videoRef = useRef<HTMLDivElement>(null)
  const {getCookieConsent} = useCookieConsent()
  const cookieConsent = getCookieConsent()
  const [isIframeLoaded, setIsIframeLoaded] = useState(false)

  const handleVimeoAnalytics = () => {
    return Boolean(cookieConsent?.accepted) ? "" : "&dnt=1"
  }

  const handlePlayClick = () => {
    setIsIframeLoaded(true)
  }

  return (
    <div className="video-wrapper" ref={videoRef}>
      <div className="video-container">
        {!isIframeLoaded ? (
          <div
            className="absolute top-0 left-0 w-full h-full cursor-pointer bg-gray-900 flex items-center justify-center"
            onClick={handlePlayClick}
            style={{
              backgroundImage: `url(https://vumbnail.com/${videoId}.jpg)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <svg
              className="w-20 h-20 text-white opacity-90 hover:opacity-100 transition-opacity"
              fill="currentColor"
              viewBox="0 0 84 84"
            >
              <circle cx="42" cy="42" r="42" fill="rgba(0,0,0,0.8)" />
              <path d="M55.5039 40.3359L37.1094 28.0729C35.7803 27.1869 34 28.1396 34 29.737V54.263C34 55.8604 35.7803 56.8131 37.1094 55.9271L55.5038 43.6641C56.6913 42.8725 56.6913 41.1275 55.5039 40.3359Z" />
            </svg>
          </div>
        ) : (
          <iframe
            src={`https://player.vimeo.com/video/${videoId}?autoplay=1&badge=0&autopause=0&player_id=0&app_id=58479${handleVimeoAnalytics()}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full"
            title="Tailcall Introduction Video"
          />
        )}
      </div>
    </div>
  )
}

export default IntroductionVideo
