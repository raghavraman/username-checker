import Image from "next/image"

import { Icons } from "@/lib/icons"
import { cn } from "@/lib/utils"

import { useSocialStore } from "@/stores"

import socialMediaConfig from "./socialConfig.json"

const SocialMediaItem = ({
	imagePath,
	name,
	taken,
	url,
	signupUrl
}: {
	imagePath: string
	name: string
	taken: "Taken" | "Available" | "Loading"
	url: string
	signupUrl?: string
}) => {
	return (
		<div className="flex flex-row md:gap-8 gap-4 items-center justify-center h-12">
			<div className="flex flex-row gap-2 items-center md:w-1/6 w-1/3">
				<Image src={imagePath} alt={name} width={28} height={28} />
				<p className="text-center text-slate-900 dark:text-slate-100">{name}</p>
			</div>
			<div className="flex items-center md:w-4/6 w-1/3">
				<div className="w-full h-1 border-t border-dotted border-slate-400"></div>
			</div>
			<div className="flex flex-row gap-2 items-center md:w-1/6 w-1/3">
				<p
					className={cn(
						"text-center",
						taken != "Available" && "text-slate-400"
					)}
				>
					{taken}
				</p>
				<a href={taken == "Taken" ? url : signupUrl} target="_blank">
					<Icons.externalLink
						className={cn("h-4 w-4", taken && "text-slate-400")}
						aria-label="GitHub"
					/>
				</a>
			</div>
		</div>
	)
}

export const HomeResult = () => {
	const result = useSocialStore((state) => state.result)
	const username = useSocialStore((state) => state.input)
	const loading = useSocialStore((state) => state.loading)

	return (
		<>
			<section className="flex flex-col items-center justify-center gap-2 md:px-16 md:w-1/2">
				<div className="flex flex-col gap-4 list-none w-full md:px-8">
					{/* <SocialMediaItem
								imagePath="/assets/img/reddit.svg"
								name="Reddit"
								taken={result.reddit}
								url={`https://reddit.com/user/${username}`}
							/> */}

					{socialMediaConfig.map((item, index) => (
						<SocialMediaItem
							key={index}
							imagePath={item.imagePath}
							name={item.name}
							taken={
								loading
									? "Loading"
									: result?.[item.name.toLowerCase() as keyof typeof result]
										? "Taken"
										: "Available"
							}
							url={`https://www.${item.name.toLowerCase()}.com/${username}`}
							signupUrl={item.signupUrl}
						/>
					))}
				</div>
			</section>
		</>
	)
}
