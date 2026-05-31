import React, {useMemo} from "react"
import {GraphiQL} from "graphiql"
import type {Fetcher} from "@graphiql/toolkit"
import {createGraphiQLFetcher} from "@graphiql/create-fetcher"
import {CookiePreferenceCategory, playgroundAdsConversionId} from "@site/src/constants"
import {analyticsHandler, sendConversionEvent} from "@site/src/utils"
import {useCookieConsent} from "@site/src/utils/hooks/useCookieConsent"
import "graphiql/graphiql.css"
import "../../css/graphiql.css"

type GraphiQLPanelProps = {
  apiEndpoint: string
}

const emptyGraphiqlStorageObject = {
  getItem: (): null => null,
  setItem: (): void => undefined,
  removeItem: (): void => undefined,
  clear: (): void => undefined,
  length: 0,
}

const GraphiQLPanel = ({apiEndpoint}: GraphiQLPanelProps) => {
  const {getCookieConsent} = useCookieConsent()
  const cookieConsent = getCookieConsent()

  const graphQLFetcher: Fetcher = (graphQLParams, opts) => {
    analyticsHandler("GraphQL", "tc_fetch_query", apiEndpoint)
    sendConversionEvent(playgroundAdsConversionId)

    const fetcher = createGraphiQLFetcher({url: apiEndpoint}) as unknown as Fetcher
    return fetcher(graphQLParams, opts)
  }

  const graphiqlStorage = useMemo(() => {
    if (
      cookieConsent?.accepted &&
      (!cookieConsent?.preferences || cookieConsent?.preferences?.includes(CookiePreferenceCategory.PREFERENCE))
    ) {
      return undefined
    }

    return emptyGraphiqlStorageObject
  }, [cookieConsent])

  return (
    <GraphiQL fetcher={graphQLFetcher} storage={graphiqlStorage}>
      <GraphiQL.Logo>
        <></>
      </GraphiQL.Logo>
    </GraphiQL>
  )
}

export default GraphiQLPanel
