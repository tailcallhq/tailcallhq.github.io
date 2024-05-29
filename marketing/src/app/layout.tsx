import type {Metadata} from "next"
import {Space_Grotesk, Space_Mono} from "next/font/google"
import Footer from "@/components/shared/Footer"
import Header from "@/components/shared/Header"
import {PageDescription, PageTitle} from "@/constants/titles"
import "./globals.css"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
})

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: PageTitle.HOME,
  description: PageDescription.HOME,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${spaceMono.variable}`}>
      <head>
        <link rel="icon" type="image/svg+xml" href="/images/favicon/favicon.svg" />
        <link rel="icon" type="image/png" href="/images/favicon/favicon.png" />
      </head>
      <body className={spaceGrotesk.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
