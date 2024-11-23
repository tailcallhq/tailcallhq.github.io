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
