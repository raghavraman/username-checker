"use client"

import Image from "next/image"

import { HomeInput } from "./home-input"
import { HomeResult } from "./home-result"

export default function Home() {
	return (
		<main className="flex flex-col md:items-center md:flex-row md:justify-center min-h-screen gap-10">
			<HomeInput />
			<HomeResult />
		</main>
	)
}
