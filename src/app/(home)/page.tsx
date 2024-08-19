"use client"

import { Suspense } from "react"

import { HomeInput } from "./home-input"
import { HomeResult } from "./home-result"

export default function Home() {
	return (
		<main className="flex flex-col md:items-center md:flex-row md:justify-center min-h-screen md:gap-10">
			<Suspense>
				<HomeInput />
			</Suspense>

			<HomeResult />
		</main>
	)
}
