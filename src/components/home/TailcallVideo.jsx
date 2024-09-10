import React from "react"
import {useState} from "react"

const TailcallVideo = () => {
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlayButtonClick = () => {
    setIsPlaying(true)
  }

  return (
    <section className="w-full bg-tailCall-light-100 text-tailCall-light-100 ">
      <div className="w-full 2xl:max-w-7xl mx-auto mb-[-8px]">
        <div className="w-[100%]">
          {!isPlaying ? (
            <div className="relative">
              <img
                src="https://img.youtube.com/vi/-hgzB5JhWJQ/maxresdefault.jpg"
                alt="Video Thumbnail"
                className="w-full h-[70vh] object-cover bg-cover bg-center"
              />
              <button
                className="absolute inset-0 m-auto w-14 h-14 border-none bg-white rounded-xl flex items-center justify-center"
                style={{top: "10%", left: "10%", transform: "translate(-50%, -50%)"}}
                onClick={handlePlayButtonClick}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 text-black"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            </div>
          ) : (
            <div className="h-[90vh]">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/-hgzB5JhWJQ?autoplay=1&rel=0&controls=0&modestbranding=1&iv_load_policy=3"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default TailcallVideo
