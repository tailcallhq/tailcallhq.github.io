import React, {useRef, useState} from "react"
import {useCookieConsent} from "@site/src/utils/hooks/useCookieConsent"
import "./style.css"

const IntroductionVideo: React.FC = () => {
  const videoId = "1011521201"
  const videoRef = useRef<HTMLDivElement>(null)
  const {getCookieConsent} = useCookieConsent()
  const cookieConsent = getCookieConsent()
  const [loaded, setLoaded] = useState(false)

  const handleVimeoAnalytics = () => {
    return Boolean(cookieConsent?.accepted) ? "" : "&dnt=1"
  }

  return (
    <div className="video-wrapper" ref={videoRef}>
      <div className="video-container">
        {loaded ? (
          <iframe
            src={`https://player.vimeo.com/video/${videoId}?autoplay=1&badge=0&autopause=0&player_id=0&app_id=58479${handleVimeoAnalytics()}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full"
            title="Tailcall Introduction Video"
          />
        ) : (
          <button
            type="button"
            onClick={() => setLoaded(true)}
            aria-label="Play introduction video"
            className="absolute top-0 left-0 w-full h-full cursor-pointer border-0 p-0"
            style={{backgroundImage: "url(/images/intro-video-thumbnail.jpg)", backgroundSize: "cover", backgroundPosition: "center"}}
          >
            <svg width="68" height="48" viewBox="0 0 68 48" aria-hidden="true" className="m-auto">
              <path d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55c-2.93.78-4.63 3.26-5.42 6.19C.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z" fill="#f00"/>
              <path d="M45 24L27 14v20" fill="#fff"/>
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}

export default IntroductionVideo
