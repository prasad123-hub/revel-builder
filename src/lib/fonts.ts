import { Inter } from "next/font/google"
import localFont from "next/font/local"

export const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const fontHand = localFont({
  src: "../assets/fonts/Caveat-Regular.ttf",
  variable: "--font-hand",
})

export const fontCal = localFont({
  src: "../assets/fonts/CalSans.ttf",
  variable: "--font-cal",
})
