import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "QuizMania - Fun Personality Quizzes",
  description:
    "Discover something new about yourself with our fun personality quizzes! Take a break and explore who you really are.",
  keywords: "personality quiz, fun quiz, personality test, online quiz, quiz game",
  authors: [{ name: "QuizMania" }],
  creator: "QuizMania",
  publisher: "QuizMania",
  robots: "index, follow",
  openGraph: {
    title: "QuizMania - Fun Personality Quizzes",
    description: "Discover something new about yourself with our fun personality quizzes!",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "QuizMania - Fun Personality Quizzes",
    description: "Discover something new about yourself with our fun personality quizzes!",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
