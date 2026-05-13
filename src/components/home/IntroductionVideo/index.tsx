import React, {useState} from "react"
import {useCookieConsent} from "@site/src/utils/hooks/useCookieConsent"
import "./style.css"

const VIDEO_ID = "1011521201"

/**
 * Renders a click-to-play Vimeo embed.
 *
 * The iframe is NOT inserted into the DOM until the user clicks the play
 * button, which avoids the ~500 KB of Vimeo JS/CSS that Lighthouse flags as
 * render-blocking on mobile.  The video-container already has the thumbnail
 * set as a CSS background-image, so the section looks identical before and
 * after the click.
 */
const IntroductionVideo: React.FC = () => {
  const [active, setActive] = useState(false)
  const {getCookieConsent} = useCookieConsent()

  const dnt = Boolean(getCookieConsent()?.accepted) ? "" : "&dnt=1"
  const src = `https://player.vimeo.com/video/${VIDEO_ID}?autoplay=1&badge=0&autopause=0&player_id=0&app_id=58479${dnt}`

  return (
    <div className="video-wrapper">
      <div className="video-container">
        {active ? (
          <iframe
            src={src}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full"
            title="Tailcall Introduction Video"
          />
        ) : (
          <button
            type="button"
            aria-label="Play introduction video"
            className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-transparent border-0 cursor-pointer"
            onClick={() => setActive(true)}
          >
            {/* Play icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 80 80"
              width="80"
              height="80"
              aria-hidden="true"
              style={{filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.5))"}}
            >
              <circle cx="40" cy="40" r="40" fill="rgba(0,0,0,0.55)" />
              <polygon points="32,24 60,40 32,56" fill="#fff" />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}

export default IntroductionVideo
