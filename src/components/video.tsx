import React from "react"

export default function Video() {
  return (
    <div className="responsive-iframe-container">
      <iframe
        src="https://www.youtube.com/embed/-hgzB5JhWJQ?si=xhDxmw5--9Qu11IL&rel=0"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  )
}
