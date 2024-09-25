export default function Video() {
  return (
    <div className="grid grid-light items-center p-12 justify-items-center">
      <div
        style={{padding: "56.25% 0 0 0", borderRadius: 24, boxShadow: "rgba(0, 0, 0) 0px 0px 20px 0px"}}
        className="  relative overflow-clip w-[100%] h-[100%]"
      >
        <iframe
          src="https://player.vimeo.com/video/1011521201?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
          frameborder="0"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
          className="absolute top-0 left-0 w-full h-full z-50"
          title="Tailcall Introduction"
        ></iframe>
      </div>
    </div>
  )
}
