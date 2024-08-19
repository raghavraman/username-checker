// api > hello > route.ts
import { link } from "fs"
import { NextRequest, NextResponse } from "next/server"

import { getUserOnPlatform } from "@/lib/axios"
import { AxiosError } from "axios"

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
		instaRes,
		linkTreeRes
	] = await Promise.all([
		checkYoutube(username),
		checkReddit(username),
		checkSnapchat(username),
		checkPintrest(username),
		checkTwitch(username),
		checkTikTok(username),
		checkInstagram(username),
		checkLinkTree(username)
	])

	// Prepare the response JSON
	const json = {
		youtube: youtubeRes,
		reddit: redditRes,
		snapchat: snapchatRes,
		pintrest: pintrestRes,
		twitch: twitchRes,
		tiktok: tiktokRes,
		instagram: instaRes,
		linktree: linkTreeRes
	}

	return NextResponse.json(json)
}

// make a fetch request to  youtube.com/{username} in  a seprate function
async function checkYoutube(username: string): Promise<boolean | null> {
	try {
		const response = await getUserOnPlatform(
			`https://youtube.com/@${username}`,
			null
		)
		return response.status === 200
	} catch (error) {
		if (error instanceof AxiosError) {
			if (error.response?.status === 404) return false
		}
		console.log("Youtube error", error)
		return null
	}
}

async function checkSnapchat(username: string): Promise<boolean | null> {
	try {
		const response = await getUserOnPlatform(
			`https://www.snapchat.com/add/${username}`,
			null
		)
		return response.status === 200
	} catch (error) {
		if (error instanceof AxiosError) {
			if (error.response?.status === 404) return false
		}
		console.log("Snapchat error", error)
		return null
	}
}

async function checkReddit(username: string): Promise<boolean | null> {
	return null

	try {
		const response = await getUserOnPlatform(
			`https://oauth.reddit.com/user/${username}`,
			null
		)

		if (response.data.includes("reddit.com: page not found")) return false

		return true
	} catch (error) {
		console.log("Reddit error", error)
		return null
	}
}

async function checkPintrest(username: string): Promise<boolean | null> {
	try {
		const response = await getUserOnPlatform(
			`https://www.pinterest.com/${username}`,
			null
		)

		if (response.data.includes("User not found")) return false

		return true
	} catch (error) {
		console.log("Pinterest error", error)
		return null
	}
}

async function checkTwitch(username: string): Promise<boolean | null> {
	try {
		const response = await getUserOnPlatform(
			`https://www.twitch.tv/${username}`,
			"https://www.twitch.tv/"
		)

		if (
			response.data.includes(`${username} streams live on Twitch`) ||
			response.data.includes(username)
		)
			return true

		return false
	} catch (error) {
		console.log("Twitch error", error)
		return null
	}
}

async function checkTikTok(username: string): Promise<boolean | null> {
	try {
		const response = await getUserOnPlatform(
			`https://www.tiktok.com/@${username}`,
			"https://www.tiktok.com/"
		)

		if (response.data.includes("followerCount")) return true

		return false
	} catch (error) {
		console.log("TikTok error", error)
		return null
	}
}

async function checkInstagram(username: string): Promise<boolean | null> {
	try {
		const response = await getUserOnPlatform(
			`https://www.instagram.com/${username}`,
			"https://www.instagram.com/"
		)
		console.log("LinkTree response", response.data)

		if (
			response.data.includes("Content not found") ||
			response.data.includes(`"pageId":"HttpErrorPage"`)
		)
			return false

		return true
	} catch (error) {
		console.log("Instagram error", error)
		return null
	}
}

async function checkLinkTree(username: string): Promise<boolean | null> {
	try {
		const response = await getUserOnPlatform(
			`https://www.linktr.ee/${username}`,
			null
		)

		if (
			response.data.includes(`"statusCode":404`) ||
			response.data.includes(404)
		)
			return false

		return true
	} catch (error) {
		console.log("LinkTree error", error)
		return null
	}
}
