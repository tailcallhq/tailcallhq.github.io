import React from "react"

interface AnnouncementProps {
  text: string
  refLink?: string
  refText?: string
}

const Announcement: React.FC<AnnouncementProps> = ({text, refLink, refText}) => {
  return (
    <div className="w-full h-[39px] bg-black text-white flex items-center justify-center">
      <div className="text-sm sm:text-base md:text-lg font-bold">
        {text}
        {refLink && refText && (
          <a className="text-tailCall-yellow font-bold" href={refLink}>
            {" "}
            {refText}{" "}
          </a>
        )}
      </div>
    </div>
  )
}

export default Announcement
