import React from "react"

interface AnnouncementProps {
  text: string
  refLink?: string
  refText?: string
}

const Announcement: React.FC<AnnouncementProps> = ({text, refLink, refText}) => {
  return (
    <div className="w-full h-auto bg-black text-white flex items-center justify-center p-2 sm:p-3">
      <div className="text-center">
        <span className="text-sm sm:text-base md:text-lg font-bold">
          {text}
          {refLink && refText && (
            <a className="text-tailCall-yellow font-bold ml-2" href={refLink}>
              {refText}
            </a>
          )}
        </span>
      </div>
    </div>
  )
}

export default Announcement
