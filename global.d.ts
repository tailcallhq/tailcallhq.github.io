export {}

declare global {
  interface Window {
    gtag: (...args: any[]) => void
    __homeAssetsRequested?: boolean
  }
}
