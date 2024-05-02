import React from "react"

const baseUrl = "/tailcallhq.github.io/"
const Image: React.FC<React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>> = (
  props,
) => {
  const avifSrc = `${baseUrl}${props.src?.replace(/\.(jpeg|jpg|png)$/, ".avif")}`
  const avifSrcSet = props.srcSet
    ?.replace(/\.png/g, ".avif")
    .split(",")
    .map((src) => `${baseUrl}${src.trim()}`)
    .join(", ")
  return (
    <picture>
      <source srcSet={avifSrcSet || avifSrc} type="image/avif" />
      <img {...props} src={`${baseUrl}${props.src}`} />
    </picture>
  )
}

export default Image
