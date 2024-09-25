import React, {useState} from "react"

const IntroductionVideo: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlay = () => {
    setIsPlaying(true)
  }

  return (
    <div className="grid-light md:p-28">
    <div className="video-container rounded-3xl ">
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center rounded-3xl"
        style={{
          backgroundImage: `url(/images/home/introduction-video-thumbnail.png)`,
        }}
      >
        {!isPlaying ? (
          <>
            <div className="absolute top-0 left-0 bottom-0 right-0 flex items-center justify-center">
              <div
                onClick={handlePlay}
                className="w-14 h-14 md:w-[120px] md:h-[120px] bg-white border md:border-[3px] border-solid border-tailCall-yellow shadow-md backdrop-blur-xl rounded-[20px] md:rounded-[42px] flex items-center justify-center cursor-pointer"
                style={{
                  boxShadow: "0px 22.22px 111.11px 0px #1B19444D",
                }}
              >
                <img src="/icons/basic/play.svg" alt="Play Button Icon" className="size-6 md:size-10" />
              </div>
            </div>
          </>
        ) : (
          <iframe
            className="w-full h-full"
            src={`https://player.vimeo.com/video/1011521201?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Tailcall Introduction Video"
          />
        )}
      </div>
    </div>
    </div>
  )
}

export default IntroductionVideo
