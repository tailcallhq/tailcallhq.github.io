import React from "react"
import "./style.css"

const videoId = "1011521201"
const videoHash = "d3576926f4"
const vimeoWatchUrl = `https://vimeo.com/${videoId}/${videoHash}`

const IntroductionVideo: React.FC = () => {
  return (
    <div className="video-wrapper">
      <div className="video-container">
        <a className="video-facade" href={vimeoWatchUrl} rel="noopener noreferrer" target="_blank">
          <span className="video-play-icon" aria-hidden="true" />
          <span className="sr-only">Open Tailcall introduction video on Vimeo</span>
        </a>
      </div>
    </div>
  )
}

export default IntroductionVideo
