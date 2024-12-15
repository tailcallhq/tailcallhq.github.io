import React from "react"
import Marquee from "react-fast-marquee"
import GreaterThanUnderscoreIcon from "@site/static/icons/basic/gt-undescore-gray.svg"

interface LogoItem {
  logo: string
  name: string
  link?: string
}

interface TrustedByMarqueeProps {
  title?: string
  logos: LogoItem[]
  onClick?: () => void
  titleClassName?: string
  desktopClassName?: string
  mobileClassName?: string
}

const TrustedByMarquee: React.FC<TrustedByMarqueeProps> = ({
  title = "Deploy Anywhere",
  logos,
  onClick,
  titleClassName = "text-content-small font-bold sm:text-title-tiny lg:text-title-small text-tailCall-light-500 text-center space-x-1",
  desktopClassName = "hidden sm:flex space-x-SPACE_16 px-8 mt-SPACE_10 overflow-hidden",
  mobileClassName = "sm:hidden flex items-center justify-around flex-wrap mt-SPACE_06 space-y-SPACE_02",
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick()
    }
  }

  const renderLogo = (partner: LogoItem) => (
    <div key={partner.name} className="h-20">
      {partner.link ? (
        <a href={partner.link} target="_blank" rel="noopener noreferrer">
          <img src={partner.logo} alt={partner.name} className="max-w-[152px]" />
        </a>
      ) : (
        <img src={partner.logo} alt={partner.name} className="max-w-[152px]" />
      )}
    </div>
  )

  return (
    <section className={`px-10 md:px-0 ${onClick ? "cursor-pointer" : ""}`} onClick={handleClick}>
      <div className={titleClassName}>
        <GreaterThanUnderscoreIcon className="h-4 w-6" />
        <span>{title}</span>
      </div>

      <Marquee autoFill>
        <div className={desktopClassName}>{logos.map(renderLogo)}</div>
      </Marquee>

      <div className={mobileClassName}>{logos.map(renderLogo)}</div>
    </section>
  )
}

export default TrustedByMarquee
