import Playground from "@/components/playground"
import {PageTitle, PageDescription} from "@/constants/titles"
import {Metadata} from "next"

export const metadata: Metadata = {
  title: PageTitle.PLAYGROUND,
  description: PageDescription.PLAYGROUND,
}

export default function PlaygroundPage() {
  return (
    <>
      <Playground />
    </>
  )
}
