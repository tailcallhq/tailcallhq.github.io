export default function Video() {
  return (
    <div className=" grid grid-light items-center p-12 justify-items-center">
      <div style={{padding: "56.25% 0 0 0", borderRadius: 24}} className="relative overflow-clip w-[100%] h-[100%]">
        <iframe
          src="https://player.vimeo.com/video/1011521201?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
          frameborder="0"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
          style={{position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 100}}
          title="Tailcall Introduction"
        ></iframe>
      </div>
    </div>
  )
}
