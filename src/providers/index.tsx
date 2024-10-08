"use client"

import { QueryProvider } from "@/providers/queryProvider"
import { ThemeProvider } from "@/providers/themeProvider"

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="light"
			enableSystem
			disableTransitionOnChange
		>
			<QueryProvider>{children}</QueryProvider>
		</ThemeProvider>
	)
}
