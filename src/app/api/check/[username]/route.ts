// api > hello > route.ts
import { NextRequest, NextResponse } from "next/server"

import axios from "axios"

export const runtime = "edge"

export async function GET(
	request: NextRequest,
	{ params }: { params: { username: string } }
) {
	const { username } = params
	// Run all requests in parallel
	const [
		youtubeRes,
		redditRes,
		snapchatRes,
		pintrestRes,
		twitchRes,
		tiktokRes,
		instaRes
	] = await Promise.all([
		checkYoutube(username),
		checkReddit(username),
		checkSnapchat(username),
		checkPintrest(username),
		checkTwitch(username),
		checkTikTok(username),
		checkInstagram(username)
	])

	// Prepare the response JSON
	const json = {
		youtube: youtubeRes,
		reddit: redditRes,
		snapchat: snapchatRes,
		pintrest: pintrestRes,
		twitch: twitchRes,
		tiktok: tiktokRes,
		instagram: instaRes
	}

	return NextResponse.json(json)
}

// make a fetch request to  youtube.com/{username} in  a seprate function
async function checkYoutube(username: string): Promise<boolean> {
	try {
		const response = await axios.get(`https://youtube.com/@${username}`)
		return response.status === 200
	} catch (error) {
		return false
	}
}

async function checkSnapchat(username: string): Promise<boolean> {
	try {
		const response = await axios.get(`https://www.snapchat.com/add/${username}`)
		return response.status === 200
	} catch (error) {
		return false
	}
}

async function checkReddit(username: string): Promise<boolean> {
	try {
		const response = await axios.get(`https://reddit.com/user/${username}`, {
			headers: {
				accept:
					"text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
				"accept-language": "en-US,en;q=0.9",
				priority: "u=0, i",
				"sec-ch-ua":
					'"Not)A;Brand";v="99", "Google Chrome";v="127", "Chromium";v="127"',
				"sec-ch-ua-mobile": "?0",
				"sec-ch-ua-platform": '"macOS"',
				"sec-fetch-dest": "document",
				"sec-fetch-mode": "navigate",
				"sec-fetch-site": "none",
				"sec-fetch-user": "?1",
				"upgrade-insecure-requests": "1",
				"user-agent":
					"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36"
			}
		})

		if (
			response.data.includes("nobody on Reddit goes by that name") ||
			response.data.includes("username is incorrect")
		)
			return false

		return true
	} catch (error) {
		return false
	}
}

async function checkPintrest(username: string): Promise<boolean> {
	try {
		const response = await axios.get(`https://www.pinterest.com/${username}`, {
			headers: {
				accept:
					"text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
				"accept-language": "en-US,en;q=0.9",
				priority: "u=0, i",
				"sec-ch-ua":
					'"Not)A;Brand";v="99", "Google Chrome";v="127", "Chromium";v="127"',
				"sec-ch-ua-mobile": "?0",
				"sec-ch-ua-platform": '"macOS"',
				"sec-fetch-dest": "document",
				"sec-fetch-mode": "navigate",
				"sec-fetch-site": "none",
				"sec-fetch-user": "?1",
				"upgrade-insecure-requests": "1",
				"user-agent":
					"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36"
			}
		})

		if (
			response.data.includes("nobody on Reddit goes by that name") ||
			response.data.includes("username is incorrect")
		)
			return false

		return true
	} catch (error) {
		return false
	}
}

async function checkTwitch(username: string): Promise<boolean> {
	try {
		const response = await axios.get(`https://www.twitch.tv/${username}`, {
			headers: {
				accept:
					"text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
				"accept-language": "en-US,en;q=0.9",
				priority: "u=0, i",
				"sec-ch-ua":
					'"Not)A;Brand";v="99", "Google Chrome";v="127", "Chromium";v="127"',
				"sec-ch-ua-mobile": "?0",
				"sec-ch-ua-platform": '"macOS"',
				"sec-fetch-dest": "document",
				"sec-fetch-mode": "navigate",
				"sec-fetch-site": "none",
				"sec-fetch-user": "?1",
				"upgrade-insecure-requests": "1",
				"user-agent":
					"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36"
			}
		})

		if (
			response.data.includes(`${username} streams live on Twitch`) ||
			response.data.includes(username)
		)
			return true

		return false
	} catch (error) {
		console.log("Twitch error", error)
		return false
	}
}

async function checkTikTok(username: string): Promise<boolean> {
	try {
		const response = await axios.get(`https://www.tiktok.com/@${username}`, {
			headers: {
				accept:
					"text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
				"accept-language": "en-US,en;q=0.9",
				priority: "u=0, i",
				"sec-ch-ua":
					'"Not)A;Brand";v="99", "Google Chrome";v="127", "Chromium";v="127"',
				"sec-ch-ua-mobile": "?0",
				"sec-ch-ua-platform": '"macOS"',
				"sec-fetch-dest": "document",
				"sec-fetch-mode": "navigate",
				"sec-fetch-site": "none",
				"sec-fetch-user": "?1",
				"upgrade-insecure-requests": "1",
				"user-agent":
					"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36"
			}
		})

		if (response.data.includes("followerCount")) return true

		return false
	} catch (error) {
		return false
	}
}
async function checkTikTk(username: string): Promise<boolean> {
	try {
		const response = await axios.get(`https://www.tiktok.com/@${username}`, {
			headers: {
				accept:
					"text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
				"accept-language": "en-US,en;q=0.9",
				priority: "u=0, i",
				"sec-ch-ua":
					'"Not)A;Brand";v="99", "Google Chrome";v="127", "Chromium";v="127"',
				"sec-ch-ua-mobile": "?0",
				"sec-ch-ua-platform": '"macOS"',
				"sec-fetch-dest": "document",
				"sec-fetch-mode": "navigate",
				"sec-fetch-site": "none",
				"sec-fetch-user": "?1",
				"upgrade-insecure-requests": "1",
				"user-agent":
					"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36"
			}
		})

		if (response.data.includes("followerCount")) return true

		return false
	} catch (error) {
		return false
	}
}

async function checkInstagram(username: string): Promise<boolean> {
	try {
		const response = await axios.get(`https://www.instagram.com/${username}`, {
			headers: {
				accept:
					"text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
				"accept-language": "en-US,en;q=0.9",
				priority: "u=0, i",
				"sec-ch-ua":
					'"Not)A;Brand";v="99", "Google Chrome";v="127", "Chromium";v="127"',
				"sec-ch-ua-mobile": "?0",
				"sec-ch-ua-platform": '"macOS"',
				"sec-fetch-dest": "document",
				"sec-fetch-mode": "navigate",
				"sec-fetch-site": "none",
				"sec-fetch-user": "?1",
				"upgrade-insecure-requests": "1",
				"user-agent":
					"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36"
			}
		})

		if (response.data.includes(`"pageId":"HttpErrorPage"`)) return false

		return true
	} catch (error) {
		return true
	}
}

/**
 * TODO: Customize Axios instance
 * TODO: Generate random user-agent
 */
