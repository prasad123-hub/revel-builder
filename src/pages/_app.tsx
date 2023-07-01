import { cn } from "@/lib/utils"

import "@/styles/globals.css"

import type { AppProps } from "next/app"
import { Caveat, Inter } from "next/font/google"
import LocalFont from "next/font/local"

const fontSans = Inter({ subsets: ["latin"], variable: "--font-sans" })
const fontHand = Caveat({ subsets: ["latin"], variable: "--font-hand" })

// import calsans font from /src/styles/fonts/calsans.ttf
const fontCal = LocalFont({
  src: "../styles/fonts/calsans.ttf",
  variable: "--font-cal",
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${fontSans.style.fontFamily};
        }
      `}</style>
      <main
        className={cn(
          "min-h-screen font-sans antialiased",
          fontSans.variable,
          fontHand.variable,
          fontCal.variable
        )}
      >
        <Component {...pageProps} />
      </main>
    </>
  )
}
