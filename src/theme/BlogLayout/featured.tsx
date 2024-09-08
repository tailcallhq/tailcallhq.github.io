import {AuthorInfo, BlogIntro} from "./customblogitem"

export default function Featured({items}) {
  return (
    <div
      className="w-full flex flex-col flex-nowrap gap-4 p-2 px-5"
      style={{borderLeft: "1px solid var(--ifm-hr-background-color)"}}
    >
      <h2>Featured Posts</h2>
      {items?.slice(0, 6).map((item) => <FeaturedItem {...item} />)}
    </div>
  )
}

const FeaturedItem = (props) => {
  return (
    <div>
      <AuthorInfo {...props.authors[0]} />
      <BlogIntro {...props} />
    </div>
  )
}
