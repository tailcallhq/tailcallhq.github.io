import React, {useState} from "react"

const IntroductionVideo: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <div className="video-wrapper">
      <div className="video-container">
        <div
          className="video-background"
          style={{
            backgroundImage: `url(/images/home/introduction-video-thumbnail.png)`,
          }}
        >
          {!isPlaying ? (
            <div className="play-button" onClick={() => setIsPlaying(true)}>
              <img className="size-6 md:size-10" src="/icons/basic/play.svg" alt="Play Button Icon" />
            </div>
          ) : (
            <iframe
              src="https://player.vimeo.com/video/1011521201?autoplay=1&badge=0&autopause=0&player_id=0&app_id=58479"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full"
              title="Tailcall Introduction Video"
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default IntroductionVideo
