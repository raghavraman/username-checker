import { debug } from "console"
import { use, useEffect, useState } from "react"
import Balancer from "react-wrap-balancer"
import { useSearchParams } from "next/navigation"

import { Icons } from "@/lib/icons"
import { randomUsername } from "@/lib/utils"
import axios from "axios"
import { useDebounce } from "use-debounce"

import { Input } from "@/ui"
import { useSocialStore } from "@/stores"

export const HomeInput = () => {
	const randomName = randomUsername()
	const searchParams = useSearchParams()
	const usernameQuery = searchParams.get("username")
	const [username, setUsername] = useState(usernameQuery || randomName)
	const [debouncedValue] = useDebounce(username, 500)
	const [usernameSuggestions, setUsernameSuggestions] = useState<string[]>([])

	const setUsernameInStore = useSocialStore((state) => state.setInput)
	const setResult = useSocialStore((state) => state.setResult)

	useEffect(() => {
		if (!debouncedValue) {
			setResult(null)

			return
		}

		setUsernameInStore(debouncedValue)
		fetchResult(debouncedValue)
	}, [debouncedValue])

	const fetchResult = async (username: string) => {
		try {
			const response = await axios.get(`/api/check/${username}`)
			console.log("response", response.data)
			setResult(response.data as socialNameResult) // Adjust according to your API response
		} catch (error) {
			console.error("Error fetching data:", error)
		}
	}

	useEffect(() => {
		if (username) {
			const suggestions = socialNameSuggestions(username)
			setUsernameSuggestions(suggestions)
		}
	}, [username])

	const socialNameSuggestions = (username: string) => {
		if (username.startsWith("madeby")) {
			return [
				username.replace("madeby", ""),
				username.replace("madeby", "").concat("company"),
				username.replace("madeby", "").concat("inc")
			]
		} else if (username.endsWith("company")) {
			return [
				username.replace("company", ""),
				"madeby".concat(username.replace("company", "")),
				username.replace("company", "").concat("inc")
			]
		} else if (username.endsWith("inc")) {
			return [
				username.replace("inc", ""),
				"madeby".concat(username.replace("inc", "")),
				username.replace("inc", "").concat("company")
			]
		} else {
			return [
				"madeby".concat(username),
				username.concat("company"),
				username.concat("inc")
			]
		}
	}

	return (
		<section className="flex flex-col justify-center gap-2 px-4 py-4">
			<p className="text-start text-base font-light text-slate-400">
				<Balancer>username availability for</Balancer>
			</p>

			<Input
				type="username"
				placeholder="username"
				className="border-0 border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none text-5xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1] lowercase"
				prefix="@"
				spellCheck="false"
				value={username}
				onChange={(e) => setUsername(e.target.value.toLowerCase())}
			/>

			{!!username && (
				<div className="flex flex-col gap-4 my-8">
					<p className="text-start text-base font-light">
						<Balancer>also try,</Balancer>
					</p>

					{usernameSuggestions?.map((suggestion) => (
						<div key={suggestion} className="flex flex-row gap-1">
							<p className="text-start text-base font-light">
								<Balancer>@{suggestion}</Balancer>
							</p>
							<a href={`/?username=${suggestion}`} target="_blank">
								<Icons.externalLink
									className="h-5 w-5"
									aria-label="External-link"
								/>
							</a>
						</div>
					))}
				</div>
			)}
		</section>
	)
}
