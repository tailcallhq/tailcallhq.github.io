import React, {useRef} from "react"
import "./style.css"

const IntroductionVideo: React.FC = () => {
  const videoId = "1011521201"
  const videoRef = useRef<HTMLDivElement>(null)

  return (
    <div className="video-wrapper" ref={videoRef}>
      <div className="video-container">
        <iframe
          src={`https://player.vimeo.com/video/${videoId}?autoplay=0&badge=0&autopause=0&player_id=0&app_id=58479`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full"
          title="Tailcall Introduction Video"
          loading="lazy"
        />
      </div>
    </div>
  )
}

export default IntroductionVideo
