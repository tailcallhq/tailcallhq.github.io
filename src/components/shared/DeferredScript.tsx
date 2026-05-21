import React, {useEffect} from "react"

interface DeferredScriptProps {
  id: string
  src: string
  attributes?: Record<string, string>
  loadOnInteractionOnly?: boolean
}

const DeferredScript: React.FC<DeferredScriptProps> = ({id, src, attributes = {}, loadOnInteractionOnly = false}) => {
  useEffect(() => {
    if (document.getElementById(id)) return

    const loadScript = () => {
      if (document.getElementById(id)) return

      const script = document.createElement("script")
      script.id = id
      script.src = src
      script.async = true
      Object.entries(attributes).forEach(([name, value]) => {
        script.setAttribute(name, value)
      })
      document.body.appendChild(script)
    }

    if (loadOnInteractionOnly) {
      const options = {once: true, passive: true}
      window.addEventListener("pointerdown", loadScript, options)
      window.addEventListener("keydown", loadScript, options)
      window.addEventListener("touchstart", loadScript, options)

      return () => {
        window.removeEventListener("pointerdown", loadScript)
        window.removeEventListener("keydown", loadScript)
        window.removeEventListener("touchstart", loadScript)
      }
    }

    const schedule = window.requestIdleCallback ?? ((callback) => globalThis.setTimeout(callback, 3000))
    const handle = schedule(loadScript)

    return () => {
      if ("cancelIdleCallback" in window) {
        window.cancelIdleCallback(handle as number)
      } else {
        globalThis.clearTimeout(handle as number)
      }
    }
  }, [attributes, id, loadOnInteractionOnly, src])

  return null
}

export default DeferredScript
