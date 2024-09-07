import React, {useState, useEffect, useRef, LegacyRef} from "react"
import "lite-youtube-embed/src/lite-yt-embed.css"
import "lite-youtube-embed/src/lite-yt-embed.js"
import {PlayIcon} from "lucide-react"

const Video = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [player, setPlayer] = useState(null)
  const liteYoutube = useRef()

  useEffect(() => {
    if (!liteYoutube) {
      return
    }

    const loadPlayer = async () => {
      const ytPlayer = await liteYoutube.current.getYTPlayer()
      setPlayer(ytPlayer)

      // Listen to player state changes
      ytPlayer.addEventListener("onStateChange", handlePlayerStateChange)
    }

    loadPlayer()

    // Cleanup the event listener on unmount
    return () => {
      if (player) {
        player.removeEventListener("onStateChange", handlePlayerStateChange)
      }
    }
  }, [player, liteYoutube])

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
      {!isPlaying && (
        <div
          style={{border: "1px solid var(--ifm-color-brand)", backdropFilter: "blur(10px) brightness(0.3)"}}
          className=" absolute   w-14 h-14 lg:w-24 lg:h-24 z-20  grid items-center justify-items-center cursor-pointer bg-yellow-300 bg-opacity-30 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  rounded-2xl lg:rounded-3xl"
          onClick={handlePlayClick}
        >
          <PlayIcon color="white" />
        </div>
      )}
      {/* Lite YouTube component */}
      <lite-youtube
        js-api
        ref={liteYoutube as any}
        className="w-screen"
        params={"modestbranding=1&vq=hd1080&rel=0&fs=0&color=white&controls=0" as any}
        videoid="-hgzB5JhWJQ"
      ></lite-youtube>
    </div>
  )
}

export default Video
