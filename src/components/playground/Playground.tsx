import React, {useEffect, useMemo, useState} from "react"
import {GraphiQL} from "graphiql"
import {analyticsHandler, isValidURL, sendConversionEvent} from "@site/src/utils"
import {CookiePreferenceCategory, playgroundAdsConversionId} from "@site/src/constants"
import "graphiql/graphiql.css"
import "../../css/graphiql.css"
import {type FetcherParams, FetcherOpts} from "@graphiql/toolkit"
import {useCookieConsent} from "@site/src/utils/hooks/useCookieConsent"
import {createGraphiQLFetcher} from "@graphiql/create-fetcher"
import Link from "@docusaurus/Link"
import {FileCode2} from "lucide-react"
import {pageLinks} from "@site/src/constants/routes"

const useDebouncedValue = (inputValue: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(inputValue)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(inputValue)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [inputValue, delay])

  return debouncedValue
}

const Playground = () => {
  const apiEndpointParam = typeof window !== "undefined" && new URLSearchParams(window.location.search).get("u")
  const initialApiEndpoint =
    (typeof apiEndpointParam === "string" && isValidURL(apiEndpointParam) && new URL(apiEndpointParam)) || ""
  const [apiEndpoint, setApiEndpoint] = useState<URL | string>(
    initialApiEndpoint !== "" ? new URL(initialApiEndpoint) : "",
  )
  const [inputValue, setInputValue] = useState<string>(initialApiEndpoint.toString())

  const {getCookieConsent} = useCookieConsent()
  const cookieConsent = getCookieConsent()

  const debouncedApiEndpoint = useDebouncedValue(inputValue, 500)
  const apiEndpointInputClasses = `border border-solid border-tailCall-border-light-500 rounded-lg font-space-grotesk h-11 w-[100%]
    p-SPACE_04 text-content-small outline-none focus:border-x-tailCall-light-700`

  useEffect(() => {
    if (isValidURL(debouncedApiEndpoint)) {
      setApiEndpoint(new URL(debouncedApiEndpoint))
    }
  }, [debouncedApiEndpoint])

  const graphQLFetcher = async (graphQLParams: FetcherParams, opts?: FetcherOpts) => {
    if (apiEndpoint.toString().trim() === "") {
      return Promise.resolve({})
    }
    analyticsHandler("GraphQL", "tc_fetch_query", apiEndpoint.toString())
    sendConversionEvent(playgroundAdsConversionId)

    const fetcher = createGraphiQLFetcher({url: apiEndpoint.toString()})
    return fetcher(
      graphQLParams as unknown as Parameters<typeof fetcher>[0],
      opts as unknown as Parameters<typeof fetcher>[1],
    )
  }

  const emptyGraphiqlStorageObject = {
    getItem: (): null => null,
    setItem: (): void => undefined,
    removeItem: (): void => undefined,
    clear: (): void => undefined,
    length: 0,
  }

  const graphiqlStorage = useMemo(() => {
    if (
      cookieConsent?.accepted &&
      (!cookieConsent?.preferences || cookieConsent?.preferences?.includes(CookiePreferenceCategory.PREFERENCE))
    ) {
      // Defaults to local storage
      return undefined
    }

    // Block storing graphiql data in local storage if user denies cookie consent
    return emptyGraphiqlStorageObject
  }, [cookieConsent])

  return (
    <div className="min-h-[90vh]">
      {typeof window !== "undefined" && (
        <div className="mt-SPACE_06">
          <div className="mb-SPACE_04 flex flex-col gap-SPACE_03 px-SPACE_04 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="m-0 text-title-medium text-tailCall-dark-700 dark:text-tailCall-light-100">Playground</h1>
              <p className="m-0 mt-SPACE_01 text-content-tiny text-tailCall-dark-100 dark:text-tailCall-light-500">
                Test a GraphQL endpoint or generate a Tailcall runtime config before deployment.
              </p>
            </div>
            <Link
              to={pageLinks.configGenerator}
              className="inline-flex h-10 items-center justify-center gap-SPACE_02 rounded-md border border-solid border-tailCall-border-light-500 bg-tailCall-light-100 px-SPACE_03 text-content-tiny font-bold text-tailCall-dark-500 no-underline transition-colors hover:bg-tailCall-light-200 hover:no-underline dark:border-tailCall-border-dark-200 dark:bg-tailCall-dark-400 dark:text-tailCall-light-100 dark:hover:bg-tailCall-dark-300"
            >
              <FileCode2 size={16} aria-hidden="true" />
              Config generator
            </Link>
          </div>
          <div className="flex px-SPACE_04">
            <input
              name="api-endpoint"
              type="url"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className={apiEndpointInputClasses}
              placeholder="API Endpoint"
            />
          </div>
          <div className="flex my-SPACE_03">
            <GraphiQL fetcher={graphQLFetcher} storage={graphiqlStorage}>
              <GraphiQL.Logo>
                <></>
              </GraphiQL.Logo>
            </GraphiQL>
          </div>
        </div>
      )}
    </div>
  )
}

export default Playground
