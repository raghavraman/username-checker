import { debug } from "console"
import { use, useEffect, useRef, useState } from "react"
import Balancer from "react-wrap-balancer"

import { randomUsername } from "@/lib/utils"
import axios from "axios"
import { useDebounce } from "use-debounce"

import { Input } from "@/ui"
import { useSocialStore } from "@/stores"

export const HomeInput = () => {
	const randomName = randomUsername()
	const [username, setUsername] = useState(randomName)
	const [debouncedValue] = useDebounce(username, 500)
	const [usernameSuggestions, setUsernameSuggestions] = useState<string[]>([])

	const setUsernameInStore = useSocialStore((state) => state.setInput)
	const setResult = useSocialStore((state) => state.setResult)
	const setLoading = useSocialStore((state) => state.setLoading)

	const inputRef = useRef<HTMLInputElement | null>(null)

	useEffect(() => {
		if (!debouncedValue) {
			setResult(null)
			return
		}

		setUsernameInStore(debouncedValue)
		fetchResult(debouncedValue)
	}, [debouncedValue])

	const fetchResult = async (username: string) => {
		setLoading(true)
		try {
			const response = await axios.get(`/api/check/${username}`)
			// console.log("response", response.data)
			setResult(response.data as socialNameResult) // Adjust according to your API response
		} catch (error) {
			console.error("Error fetching data:", error)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		if (username) {
			inputRef.current?.focus()
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

	const handleFocus = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const lengthOfInput = event.target.value.length
		requestAnimationFrame(() => {
			setTimeout(() => {
				event.target.setSelectionRange(lengthOfInput, lengthOfInput)
			}, 1000)
		})
	}

	return (
		<section className="flex flex-col md:items-end justify-center gap-2 md:w-1/2 mb-8">
			<div className="flex flex-col">
				<p className="text-start text-base font-normal text-slate-400">
					<Balancer>dibs for</Balancer>
				</p>

				<Input
					type="username"
					ref={inputRef}
					placeholder="username"
					className="w-96 text-ellipsis text-nowrap overflow-hidden focus:outline-none text-5xl text-start items-start font-bold tracking-tighter lowercase text-slate-900 dark:text-slate-100"
					spellCheck="false"
					value={username}
					onChange={(e) => setUsername(e.target.value.toLowerCase())}
					onFocus={handleFocus}
				/>

				{/* {!!username && (
					<div className="flex flex-col gap-4 my-8">
						<p className="text-start text-base font-light text-slate-400">
							<Balancer>also try,</Balancer>
						</p>

						{usernameSuggestions?.map((suggestion) => (
							<div key={suggestion} className="flex flex-row gap-1">
								<p
									className="text-start text-base font-normal cursor-pointer hover:font-bold"
									onClick={(e) => setUsername(suggestion)}
								>
									<Balancer>@{suggestion}</Balancer>
								</p>
							</div>
						))}
					</div>
				)} */}
			</div>
		</section>
	)
}
