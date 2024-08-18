import { debug } from "console"
import { use, useEffect, useState } from "react"
import Balancer from "react-wrap-balancer"

import axios from "axios"
import { useDebounce } from "use-debounce"

import { Input } from "@/ui"
import { useSocialStore } from "@/stores"

export const HomeInput = () => {
	const [username, setUsername] = useState("")
	const [debouncedValue] = useDebounce(username, 500)

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

					<p className="text-start text-base font-light">
						<Balancer>@madeby{username}</Balancer>
					</p>

					<p className="text-start text-base font-light">
						<Balancer>@{username}company</Balancer>
					</p>

					<p className="text-start text-base font-light">
						<Balancer>@{username}inc</Balancer>
					</p>
				</div>
			)}
		</section>
	)
}
