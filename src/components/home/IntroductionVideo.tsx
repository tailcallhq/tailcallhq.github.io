import React, {useState, useEffect, useRef} from "react"

const IntroductionVideo: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [thumbnailUrl, setThumbnailUrl] = useState("")
  const videoId = "1011521201"
  const videoRef = useRef<HTMLDivElement>(null)

  const fetchThumbnail = async () => {
    const response = await fetch(`https://vimeo.com/api/oembed.json?url=https://vimeo.com/${videoId}`)
    const data = await response.json()
    const fullResUrl = data.thumbnail_url.split("-d")[0] + "-d"
    setThumbnailUrl(fullResUrl)
  }

  useEffect(() => {
    fetchThumbnail()

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsPlaying(true)
        }
      },
      {rootMargin: "200px"},
    )

    if (videoRef.current) {
      observer.observe(videoRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <div className="video-wrapper" ref={videoRef}>
      <div className="video-container">
        <div
          className="video-background"
          style={{
            backgroundImage: `url(${thumbnailUrl})`,
          }}
        >
          {!isPlaying ? (
            <div className="play-button" onClick={() => setIsPlaying(true)}>
              <img className="size-6 md:size-10" src="/icons/basic/play.svg" alt="Play Button Icon" />
            </div>
          ) : (
            <iframe
              src={`https://player.vimeo.com/video/${videoId}?autoplay=0&badge=0&autopause=0&player_id=0&app_id=58479`}
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
