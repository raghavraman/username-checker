"use client"

import { useSearchParams } from "next/navigation"

import { HomeInput } from "./home-input"
import { HomeResult } from "./home-result"

export default function Home() {
	const searchParams = useSearchParams()

	const username = searchParams.get("username")

	return (
		<main className="flex flex-col md:items-center md:flex-row md:justify-center min-h-screen gap-10">
			<HomeInput username={username} />
			<HomeResult />
		</main>
	)
}
