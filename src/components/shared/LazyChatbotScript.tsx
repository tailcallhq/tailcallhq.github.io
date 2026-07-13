import React, {useEffect} from "react"

const CHATBOT_SCRIPT_ID = "chatbotscript"

const LazyChatbotScript = (): null => {
  useEffect(() => {
    if (typeof window === "undefined" || document.getElementById(CHATBOT_SCRIPT_ID)) return

    const loadScript = () => {
      if (document.getElementById(CHATBOT_SCRIPT_ID)) return

      const script = document.createElement("script")
      script.id = CHATBOT_SCRIPT_ID
      script.dataset.accountid = "CZPG9aVdtk59Tjz4SMTu8w=="
      script.dataset.websiteid = "75VGI0NlBqessD4BQn2pFg=="
      script.src = "https://app.robofy.ai/bot/js/common.js"
      script.async = true
      document.body.appendChild(script)
    }

    if ("requestIdleCallback" in window) {
      const idleCallback = window.requestIdleCallback(loadScript, {timeout: 4000})
      return () => window.cancelIdleCallback(idleCallback)
    }

    const timeout = setTimeout(loadScript, 2500)
    return () => clearTimeout(timeout)
  }, [])

  return null
}

export default LazyChatbotScript
