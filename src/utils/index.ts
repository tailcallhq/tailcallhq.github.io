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

export const isBlogPost = () => {
  const url = new URL(location.pathname, window.location.origin)
  const pathSegments = url.pathname.split("/").filter(Boolean)

  // Check if it's a blog post: starts with 'blog', has more segments, and isn't a pagination page
  const isBlogPost = pathSegments[0] === "blog" && pathSegments.length > 1 && pathSegments[1] !== "page"
  return isBlogPost
}
