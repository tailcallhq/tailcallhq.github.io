import React, {useEffect, useState} from "react"

interface NoEmbedResponse {
  html: string
  provider_url: string
  type: string
  height: number
  title: string
  thumbnail_url: string
  author_name: string
  author_url: string
  provider_name: string
  thumbnail_width: number
  width: number
  version: string
  thumbnail_height: number
  url: string
}

const VIDEO_ID = "-hgzB5JhWJQ"

const Youtube: React.FC = () => {
  const [videoData, setVideoData] = useState<NoEmbedResponse | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const fetchNoEmbed = async (videoID: string): Promise<NoEmbedResponse> => {
    const response = await fetch(`https://noembed.com/embed?url=https://www.youtube.com/watch?v=${videoID}`)
    return (await response.json()) as NoEmbedResponse
  }

  const handlePlay = () => {
    setIsPlaying(true)
  }

  useEffect(() => {
    fetchNoEmbed(VIDEO_ID).then((data) => setVideoData(data))
  }, [])

  return (
    <div className="video-container">
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
        style={{backgroundImage: `url(${videoData?.thumbnail_url})`}}
      >
        {!isPlaying ? (
          <div className="absolute top-0 left-0 bottom-0 right-0 flex items-center justify-center">
            <div
              onClick={handlePlay}
              className="w-14 h-14 md:w-[120px] md:h-[120px] bg-gradient-to-t from-yellow-200/20 to-transparent border md:border-[3px] border-solid border-yellow-500 shadow-md backdrop-blur-xl rounded-[20px] md:rounded-[42px] flex items-center justify-center cursor-pointer"
            >
              <img src="/icons/basic/play.svg" alt="Play Button Icon" className="w-6 h-6 md:w-12 md:h-12" />
            </div>
          </div>
        ) : (
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${VIDEO_ID}?feature=oembed&autoplay=1`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={videoData?.title}
          ></iframe>
        )}
      </div>
    </div>
  )
}

export default Youtube
