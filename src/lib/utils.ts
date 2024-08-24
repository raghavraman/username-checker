import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function delay(ms = 1000) {
	return function (x: any) {
		return new Promise((resolve) => setTimeout(() => resolve(x), ms))
	}
}

export function randomUsername() {
	const name = [
		"apple",
		"google",
		"airbnb",
		"doordash",
		"louisvuitton"
		// "microsoft",
		// "amazon",
		// "uber",
		// "meta",
		// "robinhood",
		// "stripe",
		// "gucci",
		// "zara",
		// "hm",
		// "nike",
		// "awaytravel",
		// "rimowa",
		// "tumi",
		// "patagonia",
		// "northface"
	]

	const randomIndex = Math.floor(Math.random() * name.length)
	return name[randomIndex]
}
