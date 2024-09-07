import React from "react"

const TailcallVideo = () => {
  return (
    <div>
      <div className="w-[100%] mb-[-10px]">
        <iframe
          width="100%"
          height="600vh"
          src="https://www.youtube.com/embed/-hgzB5JhWJQ?rel=0&controls=0&modestbranding=1&iv_load_policy=3"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  )
}

export default TailcallVideo
