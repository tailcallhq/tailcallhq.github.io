import ReactGA from "react-ga4"

export const analyticsHandler = (category: string, action: string, label: string): void => {
  ReactGA.event({
    category: category,
    action: action,
    label: label,
  })
}
