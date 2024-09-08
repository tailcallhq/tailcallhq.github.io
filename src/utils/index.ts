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

export const limitApplier = (string: string, limit: number) => {
  if (string?.length > limit) {
    return string.substr(0, limit) + "..."
  } else {
    return string
  }
}

export const dateformatter = (date: string) => {
  let dateobj = new Date(date)
  return dateobj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}
