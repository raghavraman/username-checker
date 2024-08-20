"use client"

import { Suspense } from "react"

import { HomeInput } from "./home-input"
import { HomeResult } from "./home-result"

export default function Home() {
	return (
		<main className="flex flex-col md:items-center md:flex-row md:justify-between md:gap-10 flex-1 p-6">
			<HomeInput />
			<HomeResult />
		</main>
	)
}
