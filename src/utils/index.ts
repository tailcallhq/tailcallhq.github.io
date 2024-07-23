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

export const downloadFile = (file: string, fileType: string, fileName: string) => {
  const blobFile = new Blob([file], { type: fileType });
  const url = URL.createObjectURL(blobFile);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
