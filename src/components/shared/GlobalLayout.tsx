import React, {Suspense, useEffect} from "react"
import {pageLinks} from "@site/src/constants/routes"
import DeferredScript from "./DeferredScript"
import GlobalHead from "./GlobalHead"
import {useCookieConsentManager} from "./CookieConsentProvider"

const CookieConsentModal = React.lazy(() => import("./CookieConsentModal/CookieConsentModal"))

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
      const handle = globalThis.setTimeout(openCookieConsentModal, 8000)
      return () => globalThis.clearTimeout(handle)
    }
  }, [cookieConsent, openCookieConsentModal])

  return (
    <>
      {isCookieConsentModalVisible && (
        <Suspense fallback={null}>
          <CookieConsentModal
            open={isCookieConsentModalVisible}
            onClose={closeCookieConsentModal}
            onAccept={onAccept}
            onDeny={onDeny}
            onPartialAccept={onPartialAccept}
          />
        </Suspense>
      )}
      <DeferredScript
        id="chatbotscript"
        src="https://app.robofy.ai/bot/js/common.js"
        loadOnInteractionOnly
        attributes={{
          "data-accountid": "CZPG9aVdtk59Tjz4SMTu8w==",
          "data-websiteid": "75VGI0NlBqessD4BQn2pFg==",
        }}
      />
      <GlobalHead isCookieConsentAccepted={Boolean(cookieConsent?.accepted)} preferences={cookieConsent?.preferences} />
    </>
  )
}

export default GlobalLayout
