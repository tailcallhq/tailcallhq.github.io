import React, {useState} from "react"

// import {founders} from "@site/src/constants"
import Link from "@docusaurus/Link"

type Founder = {
  founder: {
    id: number
    name: string
    title: string
    image: string
    socialLinks: Social[]
  }
}

type SocialIconProps = {
  social: Social
}

const Founder = ({founder}: Founder): JSX.Element => {
  return (
    <div>
      <img src={founder.image} alt={founder.name} className="h-[300px] sm:h-[366px] object-contain" />

      <div className="flex flex-col space-y-SPACE_02 items-start">
        <span className="text-content-small font-bold sm:text-title-small">{founder.name}</span>
        <span className="text-content-tiny sm:text-content-small text-tailCall-dark-500">{founder.title}</span>
        {/* <div className="flex items-center gap-x-SPACE_05">
          {founder.socialLinks.map((social) => (
            <SocialIcon key={social.id} social={social} />
          ))}
        </div> */}
      </div>
    </div>
  )
}

const SocialIcon = ({social}: SocialIconProps) => {
  const [isHovered, setIsHovered] = useState(false)

  const getIcon = (name: string, isHovered: boolean) => {
    switch (name) {
      case "linkedin":
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <mask id="mask0_1387_3208" maskUnits="userSpaceOnUse" x="3" y="3" width="18" height="18">
              <path d="M21 3H3V21H21V3Z" fill="white" />
            </mask>
            <g mask="url(#mask0_1387_3208)">
              <path
                d="M8.17805 18.9997V9.55356H5.1769V18.9997H8.17805ZM6.6781 8.26408C7.72445 8.26408 8.37587 7.53873 8.37587 6.63224C8.35628 5.70511 7.72445 5 6.698 5C5.67085 5 5 5.70511 5 6.63216C5 7.53864 5.65118 8.26399 6.65844 8.26399L6.6781 8.26408ZM9.83923 18.9997H12.8401V13.7251C12.8401 13.4432 12.8597 13.1605 12.939 12.9591C13.1559 12.3948 13.6497 11.8107 14.4789 11.8107C15.5646 11.8107 15.9992 12.6768 15.9992 13.9468V18.9997H19V13.5836C19 10.6822 17.5196 9.3321 15.5452 9.3321C13.9264 9.3321 13.2154 10.2787 12.8204 10.9234H12.8404V9.55389H9.83939C9.87856 10.44 9.83923 18.9997 9.83923 18.9997Z"
                fill={isHovered ? "var(--ifm-color-brand-linkedin)" : "var(--ifm-color-brand-light-600"}
              />
            </g>
          </svg>
        )

      case "discord":
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <mask id="mask0_1387_3215" maskUnits="userSpaceOnUse" x="2" y="4" width="20" height="16">
              <path d="M22 4H2V20H22V4Z" fill="white" />
            </mask>
            <g mask="url(#mask0_1387_3215)">
              <path
                d="M18.9309 5.42515C17.6561 4.82111 16.2891 4.37607 14.8599 4.12118C14.8339 4.11627 14.8079 4.12856 14.7944 4.15315C14.6187 4.47606 14.4239 4.89732 14.2876 5.22844C12.7503 4.99076 11.221 4.99076 9.71526 5.22844C9.57887 4.88997 9.37706 4.47606 9.20047 4.15315C9.18706 4.12939 9.16106 4.11709 9.13504 4.12118C7.70659 4.37526 6.33963 4.82029 5.06411 5.42515C5.05306 5.43007 5.0436 5.43827 5.03732 5.44891C2.44449 9.44932 1.73421 13.3514 2.08265 17.2051C2.08422 17.2239 2.09447 17.2419 2.10866 17.2534C3.81934 18.5508 5.47642 19.3385 7.10273 19.8606C7.12875 19.8687 7.15633 19.8588 7.1729 19.8367C7.5576 19.2942 7.90053 18.7222 8.19456 18.1205C8.21191 18.0853 8.19535 18.0435 8.15988 18.0295C7.61594 17.8165 7.098 17.5567 6.59977 17.2617C6.56036 17.2379 6.55721 17.1796 6.59346 17.1517C6.69831 17.0706 6.80317 16.9863 6.9033 16.901C6.92141 16.8854 6.94664 16.8822 6.96794 16.8919C10.2411 18.4353 13.7847 18.4353 17.0191 16.8919C17.0404 16.8813 17.0657 16.8846 17.0846 16.9002C17.1847 16.9855 17.2896 17.0706 17.3952 17.1517C17.4314 17.1796 17.4291 17.2379 17.3897 17.2617C16.8914 17.5624 16.3734 17.8165 15.8288 18.0287C15.7933 18.0426 15.7776 18.0853 15.7949 18.1205C16.0952 18.7212 16.4381 19.2934 16.8158 19.8359C16.8316 19.8588 16.8599 19.8687 16.8859 19.8606C18.5201 19.3385 20.1772 18.5508 21.8879 17.2534C21.9029 17.2419 21.9123 17.2247 21.9139 17.2059C22.3309 12.7506 21.2154 8.88053 18.9569 5.44973C18.9513 5.43827 18.9419 5.43007 18.9309 5.42515ZM8.68335 14.8586C7.69791 14.8586 6.88594 13.9242 6.88594 12.7769C6.88594 11.6294 7.68216 10.6951 8.68335 10.6951C9.69239 10.6951 10.4966 11.6376 10.4808 12.7769C10.4808 13.9242 9.68451 14.8586 8.68335 14.8586ZM15.329 14.8586C14.3436 14.8586 13.5316 13.9242 13.5316 12.7769C13.5316 11.6294 14.3278 10.6951 15.329 10.6951C16.338 10.6951 17.1421 11.6376 17.1263 12.7769C17.1263 13.9242 16.338 14.8586 15.329 14.8586Z"
                fill={isHovered ? "var(--ifm-color-brand-discord)" : "var(--ifm-color-brand-light-600"}
              />
            </g>
          </svg>
        )

      case "x":
        return (
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M18.7447 6.42798H21.2748L15.7473 12.7456L22.25 21.3425H17.1584L13.1705 16.1285L8.60746 21.3425H6.07582L11.9881 14.585L5.75 6.42798H10.9708L14.5755 11.1937L18.7447 6.42798ZM17.8567 19.8281H19.2587L10.209 7.86283H8.7046L17.8567 19.8281Z"
              fill={isHovered ? "var(--ifm-color-black)" : "var(--ifm-color-brand-light-600"}
            />
          </svg>
        )

      default:
        break
    }
  }

  return (
    <Link
      href={social.href}
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="h-7 w-7 sm:h-8 sm:w-8 flex items-center justify-center"
      onClick={() => setIsHovered(false)}
    >
      {getIcon(social.name, isHovered)}
    </Link>
  )
}

const Founders = () => {
  return (
    <section className="my-SPACE_08 mx-SPACE_06 sm:my-SPACE_10 lg:my-SPACE_06 flex flex-wrap items-center justify-around max-w-6xl sm:mx-SPACE_04 lg:mx-auto gap-y-SPACE_08 sm:gap-y-SPACE_12 lg:gap-y-SPACE_16">
      {/* {founders.map((founder) => (
        <Founder founder={founder} key={founder.id} />
      ))} */}
    </section>
  )
}

export default Founders
