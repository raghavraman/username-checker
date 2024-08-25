import type { Metadata } from "next"
import { Inter as FontSans } from "next/font/google"

import { Providers } from "@/providers"
import { SpeedInsights } from "@vercel/speed-insights/next"

import { Header } from "@/shared"
import { siteConfig } from "@/config/site"

import "./globals.css"

import { Footer } from "@/components/shared/footer"
import { cn } from "@/lib/utils"
import { Analytics } from "@vercel/analytics/react"

const fontSans = FontSans({
	subsets: ["latin"],
	variable: "--font-sans"
})

export const metadata: Metadata = {
	title: siteConfig.title,
	description: siteConfig.description,
	openGraph: {
		title: siteConfig.title,
		description: siteConfig.description,
		images: [
			{
				url: "/assets/img/og-image.jpg",
				width: 1200,
				height: 630,
				alt: "Check username availability across social media platforms instantly."
			}
		],
		url: siteConfig.url,
		type: "website"
	},
	viewport: "width=device-width, initial-scale=1, maximum-scale=1"
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
					"min-h-screen bg-background font-sans antialiased flex flex-col",
					fontSans.variable
				)}
			>
				<Providers>
					<Header />
					{children}
					<Analytics />
					<SpeedInsights />
					<Footer />
				</Providers>
			</body>
		</html>
	)
}
