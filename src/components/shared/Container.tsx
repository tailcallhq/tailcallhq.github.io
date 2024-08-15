import React from "react"
import clsx from "clsx"

const Container = ({children, className}: {children: React.ReactNode; className?: string}): JSX.Element => {
  return <section className={clsx("w-full px-4 py-6 md:px-36 md:py-20", className)}>{children}</section>
}

export default Container
