import Link from "@docusaurus/Link"
import {ArrowLeft} from "lucide-react"
import React from "react"

export default function BlogBackButton(): JSX.Element {
  return (
    <Link to="/blog" className="flex items-center gap-2 my-8 cursor-pointer !no-underline" onClick={() => {}}>
      <ArrowLeft size={24} color="black" />
      <span className="text-content-small text-tailCall-light-600">Back to Blogs</span>
    </Link>
  )
}
