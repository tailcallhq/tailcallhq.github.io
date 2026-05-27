import React, {Suspense, useEffect, useState} from "react"

import Banner from "./Banner"

const DeferredSections = React.lazy(() => import("./DeferredSections"))

const DeferredSectionsLoader = (): JSX.Element | null => {
  const [isReady, setIsReady] = useState(() => {
    return typeof window !== "undefined" && Boolean(window.__homeAssetsRequested)
  })

  useEffect(() => {
    if (typeof window === "undefined") return

    const loadSections = () => setIsReady(true)
    const events: Array<keyof WindowEventMap> = ["scroll", "pointerdown", "touchstart", "keydown"]

    events.forEach((eventName) => {
      window.addEventListener(eventName, loadSections, {once: true, passive: true})
    })

    return () => {
      events.forEach((eventName) => {
        window.removeEventListener(eventName, loadSections)
      })
    }
  }, [])

  if (!isReady) return null

  return (
    <Suspense fallback={null}>
      <DeferredSections />
    </Suspense>
  )
}

const HomePage = (): JSX.Element => {
  return (
    <div className="">
      <Banner />
      <DeferredSectionsLoader />
    </div>
  )
}

export default HomePage
