import Image from "next/image"

import { Icons } from "@/lib/icons"
import { cn } from "@/lib/utils"

import { useSocialStore } from "@/stores"

const SocialMediaItem = ({
	imagePath,
	name,
	taken,
	url,
	signupUrl
}: {
	imagePath: string
	name: string
	taken: boolean | null
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
				<hr className="w-full h-px border-t-0 border-dotted border-t-slate-400" />
			</div>
			<div className="flex flex-row gap-2 md:w-1/6 w-1/3">
				<p className={cn("text-center", taken && "text-slate-400")}>
					{taken ? "Taken" : "Available"}
				</p>
				<a href={taken ? url : signupUrl} target="_blank">
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
			{!loading && result && (
				<section className="flex flex-col items-center justify-center gap-2 p-4 md:px-16 md:w-1/2">
					<div className="flex flex-col gap-4 list-none w-full md:px-8">
						<SocialMediaItem
							imagePath="/assets/img/instagram.svg"
							name="Instagram"
							taken={result.instagram}
							url={`https://www.instagram.com/${username}`}
							signupUrl="https://www.instagram.com/accounts/emailsignup/"
						/>
						<SocialMediaItem
							imagePath="/assets/img/youtube.svg"
							name="Youtube"
							taken={result.youtube}
							url={`https://www.youtube.com/@${username}`}
							signupUrl="https://www.youtube.com/signup"
						/>
						<SocialMediaItem
							imagePath="/assets/img/tiktok.svg"
							name="TikTok"
							taken={result.tiktok}
							url={`https://www.tiktok.com/@${username}`}
							signupUrl="https://www.tiktok.com/signup"
						/>
						<SocialMediaItem
							imagePath="/assets/img/pinterest.svg"
							name="Pinterest"
							taken={result.pintrest}
							url={`https://www.pinterest.com/${username}`}
							signupUrl="https://www.pinterest.com/"
						/>
						<SocialMediaItem
							imagePath="/assets/img/snapchat.svg"
							name="Snapchat"
							taken={result.snapchat}
							url={`https://www.snapchat.com/add/${username}`}
							signupUrl="https://accounts.snapchat.com/accounts/v2/signup"
						/>
						{/* <SocialMediaItem
							imagePath="/assets/img/reddit.svg"
							name="Reddit"
							taken={result.reddit}
							url={`https://reddit.com/user/${username}`}
						/> */}
						<SocialMediaItem
							imagePath="/assets/img/twitch.svg"
							name="Twitch"
							taken={result.twitch}
							url={`https://www.twitch.tv/${username}`}
							signupUrl="https://www.twitch.tv/signup"
						/>
						<SocialMediaItem
							imagePath="/assets/img/linktree.svg"
							name="Linktree"
							taken={result.linktree}
							url={`https://www.linktr.ee/${username}`}
							signupUrl="https://auth.linktr.ee/login"
						/>
					</div>
				</section>
			)}
		</>
	)
}
