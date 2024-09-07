import React, {useState} from "react"
import {PlayIcon} from "lucide-react"

const TailcallIntroVideo = () => {
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlay = () => {
    setIsPlaying(true)
  }

  return (
    <div className="relative pb-[56.25%] h-0 overflow-hidden max-w-full bg-black">
      {!isPlaying && (
        <>
          <img
            src={require("@site/static/images/home/tailcall-intro-thumbnail.png").default}
            alt="Tailcall Introduction Video Thumbnail"
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
          <button
            onClick={handlePlay}
            className="absolute w-14 h-14 lg:w-24 lg:h-24 z-20 grid items-center justify-items-center cursor-pointer bg-yellow-300 bg-opacity-30 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-2xl lg:rounded-3xl border border-[var(--ifm-color-brand)] backdrop-blur-[10px] backdrop-brightness-[0.3]"
            aria-label="Play Tailcall Introduction Video"
          >
            <PlayIcon color="white" />
          </button>
        </>
      )}
      {isPlaying && (
        <iframe
          className="absolute top-0 left-0 w-full h-full border-0"
          src="https://www.youtube.com/embed/-hgzB5JhWJQ?autoplay=1"
          title="Tailcall Introduction Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        ></iframe>
      )}
    </div>
  )
}

export default TailcallIntroVideo
