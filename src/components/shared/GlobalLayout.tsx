import React, {useEffect} from "react"
import {pageLinks} from "@site/src/constants/routes"
import CookieConsentModal from "./CookieConsentModal/CookieConsentModal"
import GlobalHead from "./GlobalHead"
import {useCookieConsentManager} from "./CookieConsentProvider"

const GlobalLayout: React.FC = () => {
  const {
    isCookieConsentModalVisible,
    openCookieConsentModal,
    closeCookieConsentModal,
    onAccept,
    onDeny,
    onPartialAccept,
    cookieConsent,
  } = useCookieConsentManager()

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.pathname.includes(pageLinks.privacyPolicy)) return

    if (!cookieConsent) {
      openCookieConsentModal()
    }
  }, [cookieConsent])

  useEffect(() => {
    if (typeof window === "undefined") return

    let timeoutId: ReturnType<typeof setTimeout> | undefined

    const loadChatWidget = () => {
      if (document.getElementById("chatbotscript")) return

      const script = document.createElement("script")
      script.id = "chatbotscript"
      script.async = true
      script.defer = true
      script.dataset.accountid = "CZPG9aVdtk59Tjz4SMTu8w=="
      script.dataset.websiteid = "75VGI0NlBqessD4BQn2pFg=="
      script.src = `https://app.robofy.ai/bot/js/common.js?v=${Date.now()}`
      document.body.appendChild(script)
    }

    const scheduleChatWidget = () => {
      timeoutId = setTimeout(loadChatWidget, 8000)
    }

    if (document.readyState === "complete") {
      scheduleChatWidget()
    } else {
      window.addEventListener("load", scheduleChatWidget, {once: true})
    }

    return () => {
      window.removeEventListener("load", scheduleChatWidget)
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [])

  return (
    <>
      <CookieConsentModal
        open={isCookieConsentModalVisible}
        onClose={closeCookieConsentModal}
        onAccept={onAccept}
        onDeny={onDeny}
        onPartialAccept={onPartialAccept}
      />
      <GlobalHead isCookieConsentAccepted={Boolean(cookieConsent?.accepted)} preferences={cookieConsent?.preferences} />
    </>
  )
}

export default GlobalLayout
