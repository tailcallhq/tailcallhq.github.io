import React from "react"
import {Metadata} from "next"
import {PageDescription, PageTitle} from "@/constants/titles"
import ContactPage from "@/components/contact"

export const metadata: Metadata = {
  title: PageTitle.CONTACT,
  description: PageDescription.CONTACT,
}

const Contact = (): JSX.Element => {
  return <ContactPage />
}

export default Contact
