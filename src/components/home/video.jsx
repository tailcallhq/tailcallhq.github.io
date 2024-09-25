export default function Video() {
  return (
    <div className="grid grid-light items-center sm:p-12 p-0 justify-items-center">
      <div
        style={{padding: "56.25% 0 0 0", boxShadow: "rgb(0 0 0 / 62%) 0px 0px 10px 0px"}}
        className="  sm:rounded-[24px] rounded-none  relative overflow-clip w-[100%] h-[100%]"
      >
        <iframe
          src="https://player.vimeo.com/video/1011521201?badge=0&amp;autopause=0&amp;autoplay=1&amp;player_id=0&amp;app_id=58479"
          frameborder="0"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
          className="absolute top-0 left-0 w-full h-full z-50"
          title="Tailcall Introduction"
        ></iframe>
      </div>
    </div>
  )
}
