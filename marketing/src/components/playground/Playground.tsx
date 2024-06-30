"use client"
import React, {useEffect, useState} from "react"
import {GraphiQL} from "graphiql-tc/esm"
import {isValidURL} from "../../utils"
import "../../app/graphiql.css"
import "graphiql-tc/graphiql.min.css"

import {type FetcherParams, FetcherOpts} from "@graphiql/toolkit"

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

    const response = await fetch(apiEndpoint.toString(), {
      method: "post",
      headers: {"Content-Type": "application/json", ...opts?.headers},
      body: JSON.stringify(graphQLParams),
    })
    return await response.json()
  }

  return (
    <div className="min-h-[90vh]">
      {typeof window !== "undefined" && (
        <div className="mt-SPACE_06">
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
            <GraphiQL fetcher={graphQLFetcher}>
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
