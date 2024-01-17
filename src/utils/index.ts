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


export const setBodyOverflow = (value: "initial" | "hidden") => {
  document.body.style.overflow = value
}

export const getSearchInputRef = () => {
  return document.getElementById("search_input_react")
}