import React, {useState, useEffect, useRef} from "react"
import "lite-youtube-embed/src/lite-yt-embed.css"
import {PlayIcon} from "lucide-react"
import BrowserOnly from "@docusaurus/BrowserOnly"

const Video = () => {
  return (
    <div className="video-container relative">
      {/* Lite YouTube component */}
      <BrowserOnly fallback={<div>loading...</div>}>
        {() => {
          const script = import("lite-youtube-embed/src/lite-yt-embed.js")
          const [isPlaying, setIsPlaying] = useState(false)
          const [player, setPlayer] = useState<any>(null) // Set player type to any for now
          const liteYoutubeRef = useRef<any>(null) // Ref for the lite-youtube element

          useEffect(() => {
            const loadPlayer = async () => {
              if (liteYoutubeRef.current && liteYoutubeRef.current.getYTPlayer) {
                const ytPlayer = await liteYoutubeRef.current.getYTPlayer() // Use ref instead of document.querySelector
                setPlayer(ytPlayer)

                // Listen to player state changes
                ytPlayer?.addEventListener("onStateChange", handlePlayerStateChange)
              }
            }

            // Only call loadPlayer when the script is loaded
            script.then(() => {
              loadPlayer()
            })

            // Cleanup the event listener on unmount
            return () => {
              if (player) {
                player.removeEventListener("onStateChange", handlePlayerStateChange)
              }
            }
          }, [player, liteYoutubeRef]) // Removed unnecessary dependencies

          // Function to handle player state changes
          const handlePlayerStateChange = (event: any) => {
            if (event.data === 2) {
              setIsPlaying(false) // Video paused
            } else if (event.data === 1) {
              setIsPlaying(true) // Video playing
            }
          }

          // Custom play button handler
          const handlePlayClick = async () => {
            if (player) {
              isPlaying ? player.pauseVideo() : player.playVideo()
              setIsPlaying(!isPlaying) // Toggle play/pause button
            }
          }

          return (
            <>
              {!isPlaying && (
                <div
                  style={{
                    border: "1px solid var(--ifm-color-brand)",
                    backdropFilter: "blur(10px) brightness(0.3)",
                  }}
                  className="absolute w-14 h-14 lg:w-24 lg:h-24 z-20 grid items-center justify-items-center cursor-pointer bg-yellow-300 bg-opacity-30 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-2xl lg:rounded-3xl"
                  onClick={handlePlayClick}
                >
                  <PlayIcon color="white" />
                </div>
              )}
              {/* Attach the ref to the lite-youtube element */}
              <lite-youtube
                ref={liteYoutubeRef}
                js-api
                className="w-screen"
                params="modestbranding=1&vq=hd1080&rel=0&fs=0&color=white&controls=0"
                videoid="-hgzB5JhWJQ"
              ></lite-youtube>
            </>
          )
        }}
      </BrowserOnly>
    </div>
  )
}

export default Video
