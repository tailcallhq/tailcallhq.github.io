import React from "react"
import clsx from "clsx"

const Section = ({children, className}: {children: React.ReactNode; className?: string}): JSX.Element => {
  return <section className={clsx("w-full px-8 py-6 md:px-24 lg:px-36 lg:py-20", className)}>{children}</section>
}

export default Section
