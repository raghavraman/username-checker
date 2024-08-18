import type { Metadata } from "next"
import { Inter as FontSans } from "next/font/google"

import { Providers } from "@/providers"
import { SpeedInsights } from "@vercel/speed-insights/next"

import { Header } from "@/shared"
import { siteConfig } from "@/config/site"

import "./globals.css"

import { Footer } from "@/components/shared/footer"
import { cn } from "@/lib/utils"

const fontSans = FontSans({
	subsets: ["latin"],
	variable: "--font-sans"
})

export const metadata: Metadata = {
	title: siteConfig.title,
	description: siteConfig.description
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body
				className={cn(
					"min-h-screen bg-background font-sans antialiased",
					fontSans.variable
				)}
			>
				<Providers>
					<Header />
					{children}
					<SpeedInsights />
					<Footer />
				</Providers>
			</body>
		</html>
	)
}
