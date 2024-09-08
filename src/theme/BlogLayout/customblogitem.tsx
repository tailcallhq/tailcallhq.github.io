import {dateformatter, limitApplier} from "@site/src/utils"

export default function BlogItemCustom(props) {
  const {title, authors, ismobile, main, link, image, date} = props

  console.log(props)

  return (
    title && (
      <div
        className="p-2"
        style={{borderRadius: 20, border: ismobile && !main ? "1px solid var(--ifm-hr-background-color)" : "none"}}
      >
        {(!ismobile || main) && (
          <a href={link}>
            <img loading={main ? "eager" : "lazy"} src={image} />
          </a>
        )}
        <p className="opacity-60">{dateformatter(date)}</p>
        <BlogIntro {...props} />
        <div className="flex flex-row gap-6">{authors?.map((info) => <AuthorInfo {...info} />)}</div>
      </div>
    )
  )
}

export const AuthorInfo = ({url, image_url, name}) => (
  <a href={url}>
    <div className="flex flex-row  gap-2">
      <img src={image_url} className="w-[30px] h-[30px] rounded-full" />
      <p className="font-extrabold">{name}</p>
    </div>
  </a>
)

export const BlogIntro = ({title, description, main, link}) => {
  const [ttlLimit, descLimit] = main ? [50, 150] : [48, 70]
  return (
    <>
      <a href={link}>
        <h3>{limitApplier(title, ttlLimit)}</h3>
      </a>
      <p>{limitApplier(description, descLimit)}</p>
    </>
  )
}
