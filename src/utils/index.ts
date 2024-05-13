import ReactGA from "react-ga4"

// Function to handle analytics events
export const analyticsHandler = (category: string, action: string, label: string): void => {
  // Sending event to Google Analytics
  ReactGA.event({
    category: category,
    action: action,
    label: label,
  })
}

// Function to set overflow on body
export const setBodyOverflow = (value: "initial" | "hidden") => {
  document.body.style.overflow = value
}

// Function to get search element ref
export const getSearchInputRef = () => {
  return document.getElementById("search_input_react")
}

export const validateEmail = (email: string) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return regex.test(email)
}

export const isValidURL = (url: string) => {
  try {
    new URL(url)
    return true
  } catch (error) {
    return false
  }
}

export const isSafariEnvBrowser = () => {
  return window.navigator.platform.startsWith("Mac") || /iP(hone|ad|od)/.test(window.navigator.userAgent)
}

export const hackSafariAutoFocus = () => {
  const fakeInput = document.createElement('input')
  fakeInput.style.height = '0'
  fakeInput.style.position = 'fixed'
  fakeInput.style.caretColor = 'transparent'
  document.body.insertBefore(fakeInput, document.body.firstChild)

  fakeInput.focus({ preventScroll: true })

  return () => {
    document.body.removeChild(fakeInput)
  }
}