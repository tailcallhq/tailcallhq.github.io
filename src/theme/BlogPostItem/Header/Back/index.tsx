import {ArrowLeft} from "lucide-react"
import React from "react"

export default function BlogBackbutton(): JSX.Element {
  return (
    <div
      className="flex items-center gap-2 my-8 cursor-pointer"
      onClick={() => {
        window.history.back()
      }}
    >
      <ArrowLeft size={24} color="black" />
      <span className="text-content-small text-tailCall-light-600">Back to Blogs</span>
    </div>
  )
}
