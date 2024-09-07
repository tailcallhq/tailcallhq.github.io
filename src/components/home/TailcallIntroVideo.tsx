import React from "react"

const TailcallIntroVideo = () => {
  return (
    <div className="relative pb-[56.25%] h-0 overflow-hidden max-w-full bg-black">
      <iframe
        className="absolute top-0 left-0 w-full h-full border-0"
        src="https://www.youtube.com/embed/-hgzB5JhWJQ"
        title="Tailcall Introduction Video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
      ></iframe>
    </div>
  )
}

export default TailcallIntroVideo
