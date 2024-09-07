import React from "react"

const TailCallIntroVideo = (): JSX.Element => {
  return (
    <div className="w-full h-[202px] md:h-[550px] lg:h-[900px] ">
      <iframe
        width="100%"
        height="100%"
        src="https://www.youtube.com/embed/-hgzB5JhWJQ?si=AM9-GnahduDZenCk"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen>
      </iframe>
    </div>
  )
}

export default TailCallIntroVideo