import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ProPathway - Discover Your Perfect Career Path",
  description: "Find personalized career recommendations and explore current remote job opportunities tailored to your skills and interests.",
  keywords: "career, jobs, remote work, career path, job search, skills, interests",
  authors: [{ name: "Career Pathfinder Team" }],
  generator: "v0.dev",
  icons: {
    icon: "/job.ico", // can also be png or svg
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
