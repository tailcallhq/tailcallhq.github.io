import {useCookies} from "react-cookie"
import {cookieConstants} from "@site/src/constants"

export interface CookieConsentType {
  accepted: boolean
  preferences?: string[]
}

export const useCookieConsent = () => {
  const [cookies, setCookie] = useCookies([cookieConstants.USER_CONSENT])

  const getCookieConsent = (): CookieConsentType => {
    return cookies.userConsent
  }

  const setCookieConsent = (consentData: CookieConsentType) => {
    setCookie(cookieConstants.USER_CONSENT, JSON.stringify(consentData), {maxAge: 366 * 24 * 60 * 60})
  }

  return {
    getCookieConsent,
    setCookieConsent,
  }
}
