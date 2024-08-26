import React from "react"
import clsx from "clsx"

const Section = ({
  children,
  className,
  innerClassName,
}: {
  children: React.ReactNode
  className?: string
  innerClassName?: string
}): JSX.Element => {
  return (
    <section className={clsx("w-full px-8 py-6 md:px-24 lg:px-36 lg:py-20", className)}>
      <div className={clsx("w-full max-w-7xl mx-auto", innerClassName)}>{children}</div>
    </section>
  )
}

export default Section
