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
    if (typeof window === "undefined" || !cookieConsent?.accepted || document.getElementById("chatbotscript")) return

    const loadChatbot = () => {
      const script = document.createElement("script")

      script.id = "chatbotscript"
      script.dataset.accountid = "CZPG9aVdtk59Tjz4SMTu8w=="
      script.dataset.websiteid = "75VGI0NlBqessD4BQn2pFg=="
      script.src = "https://app.robofy.ai/bot/js/common.js"
      script.async = true

      document.body.appendChild(script)
    }

    const idleWindow = window as Window & {
      requestIdleCallback?: (callback: () => void) => number
    }

    if (idleWindow.requestIdleCallback) {
      idleWindow.requestIdleCallback(loadChatbot)
    } else {
      window.setTimeout(loadChatbot, 1500)
    }
  }, [cookieConsent?.accepted])

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
