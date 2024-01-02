/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,md,mdx}", "./docs/**/*.{md,mdx}"],
  theme: {
    extend: {
      colors: {
        tailCall: {
          light: {
            100: "#FFFFFF",
            200: "#F3F3F3",
            300: "#E7E7E7",
            400: "#CECECF",
            500: "#B6B6B7",
            600: "#858586",
            700: "#B4B4B4",
          },
          dark: {
            100: "#545556",
            200: "#323335",
            300: "#232426",
            400: "#1C1D1F",
            500: "#121315",
            600: "#121212",
            700: "#000000",
          },
          yellow: "#FDEA2E",
        },
      },
    },
    fontFamily: {
      "space-grotesk": ["Space Grotesk", "sans-serif"],
      "space-mono": ["Space Mono", "monospace"],
    },
    fontSize: {
      "display-large": [
        "96px",
        {
          lineHeight: "105.6px",
          fontWeight: "700",
          letterSpacing: "-3px",
        },
      ],
      "display-medium": [
        "64px",
        {
          lineHeight: "70.4px",
          fontWeight: "700",
          letterSpacing: "-2px",
        },
      ],
      "display-small": [
        "56px",
        {
          lineHeight: "67.2px",
          fontWeight: "700",
          letterSpacing: "-2px",
        },
      ],
      "display-tiny": [
        "40px",
        {
          lineHeight: "48px",
          fontWeight: "700",
          letterSpacing: "-2px",
        },
      ],
      "title-large": [
        "32px",
        {
          lineHeight: "41.6px",
          fontWeight: "700",
          letterSpacing: "-1px",
        },
      ],
      "title-semi-large": [
        "28px",
        {
          lineHeight: "36.4px",
          fontWeight: "700",
          letterSpacing: "-4%",
        },
      ],
      "title-medium": [
        "24px",
        {
          lineHeight: "33.6px",
          fontWeight: "700",
          letterSpacing: "-1px",
        },
      ],
      "title-small": [
        "20px",
        {
          lineHeight: "26px",
          fontWeight: "700",
          letterSpacing: "0px",
        },
      ],
      "title-tiny": [
        "18px",
        {
          lineHeight: "22.8px",
          fontWeight: "700",
          letterSpacing: "0px",
        },
      ],
      "content-large": [
        "24px",
        {
          lineHeight: "36px",
          fontWeight: "400",
          letterSpacing: "-2%",
        },
      ],
      "content-medium": [
        "20px",
        {
          lineHeight: "32px",
          fontWeight: "400",
          letterSpacing: "-2%",
        },
      ],
      "content-small": [
        "16px",
        {
          lineHeight: "24px",
          fontWeight: "400",
          letterSpacing: "-2%",
        },
      ],
      "content-tiny": [
        "14px",
        {
          lineHeight: "20.73px",
          fontWeight: "400",
          letterSpacing: "-4%",
        },
      ],
    },
  },
  plugins: [],
  darkMode: ["class", '[data-theme="dark"]'],
  corePlugins: {
    preflight: false,
  },
  blocklist: ["container"],
}
