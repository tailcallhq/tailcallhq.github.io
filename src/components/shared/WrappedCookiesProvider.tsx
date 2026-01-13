import React from "react"
import {CookiesProvider} from "react-cookie"

const WrappedCookiesProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  return <CookiesProvider>{children}</CookiesProvider>
}

export default WrappedCookiesProvider
