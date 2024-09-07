import React, { useState, useEffect, useRef, LegacyRef } from "react"
import "lite-youtube-embed/src/lite-yt-embed.css"
import "lite-youtube-embed/src/lite-yt-embed.js"
import { PlayIcon } from "lucide-react"
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'
import YouTube, { YouTubePlayer } from "react-youtube";

const Video = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [player, setPlayer] = useState(null)
  const liteYoutube = useRef()
  const handleOnReady = (e) => {
    setPlayer(e.target)
  }
  // Function to handle player state changes
  const handlePlayerStateChange = (event) => {
    if (event.data == 2) {
      setIsPlaying(false)
    } else if (event.data == 1) {
      setIsPlaying(true)
    }
  }

  // Custom play button handler
  const handlePlayClick = async () => {
    if (player) {
      isPlaying ? player.pauseVideo() : player.playVideo()
      setIsPlaying(!isPlaying) // Hide play button when the video starts
    }
  }

  return (
    <div className="video-container relative">
      {!isPlaying && player && (
        <div
          style={{ border: "1px solid var(--ifm-color-brand)", backdropFilter: "blur(10px) brightness(0.3)" }}
          className=" absolute   w-14 h-14 lg:w-24 lg:h-24 z-20  grid items-center justify-items-center cursor-pointer bg-yellow-300 bg-opacity-30 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  rounded-2xl lg:rounded-3xl"
          onClick={handlePlayClick}
        >
          <PlayIcon color="white" />
        </div>
      )}
      {/* Lite YouTube component */}
      <YouTube
        videoId="L2vS_050c-M"
        onReady={handleOnReady}
        onPlay={(() => (setIsPlaying(true)))}
        onPause={() => (setIsPlaying(false))}
        className=" yt-embed"
        opts={{
          width: window.innerWidth,
          playerVars: {
            rel: '0',
            controls: '0'
          }
        }}

      />


    </div>
  )
}

export default Video
