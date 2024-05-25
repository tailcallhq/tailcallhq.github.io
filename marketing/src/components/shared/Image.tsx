import React from "react"

const Image: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = ({src, alt, loading = "lazy", ...props}) => {
  return (
    <picture>
      <source srcSet={src?.replace(".png", ".avif")} type="image/avif" />
      <img src={src} alt={alt} loading={loading} {...props} />
    </picture>
  )
}

export default Image
