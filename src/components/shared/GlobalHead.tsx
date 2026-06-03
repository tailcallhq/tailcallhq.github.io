import React from "react"
import Head from "@docusaurus/Head"
import {gtagScriptContent, reb2bScriptContent} from "@site/src/constants"

interface GlobalHeadProps {
  isCookieConsentAccepted?: boolean
  preferences?: string[]
}

const GlobalHead: React.FC<GlobalHeadProps> = ({isCookieConsentAccepted = false, preferences}) => {
  const injectAnalyticsScripts = () => {
    return (
      <>
        <script>{gtagScriptContent}</script>
        <script type="text/javascript">{reb2bScriptContent}</script>
      </>
    )
  }

  const injectScripts = (preferences: string[] | undefined): JSX.Element[] => {
    const activeScripts: JSX.Element[] = []

    const preferenceMapping: Record<string, () => JSX.Element> = {
      Analytics: injectAnalyticsScripts,
    }

    if (!preferences) {
      Object.values(preferenceMapping).forEach((injectFunction, index: number) =>
        activeScripts.push(<React.Fragment key={index}>{injectFunction()}</React.Fragment>),
      )
    } else {
      preferences.forEach((preference) => {
        const injectFunction = preferenceMapping[preference]
        if (injectFunction) activeScripts.push(injectFunction())
      })
    }

    return activeScripts
  }

  return <Head>{isCookieConsentAccepted && injectScripts(preferences)}</Head>
}

export default GlobalHead
