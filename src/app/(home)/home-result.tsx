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
		<li>
			<div className="flex flex-row gap-8 items-center justify-center h-12">
				<div className="flex flex-row gap-1 items-center justify-center">
					<Image src={imagePath} alt={name} width={28} height={28} />
					<p className="text-center">{name}</p>
				</div>
				<div className="flex items-center justify-center w-full">
					<hr className="w-20 md:w-60 h-px bg-gray-200 border-0 dark:bg-gray-700" />
				</div>
				<div className="flex flex-row gap-2">
					<p className={cn("text-center", taken && "text-slate-400")}>
						{taken ? "Taken" : "Available"}
					</p>
					<a href={taken ? url : signupUrl} target="_blank">
						<Icons.externalLink className="h-5 w-5" aria-label="GitHub" />
					</a>
				</div>
			</div>
		</li>
	)
}

export const HomeResult = () => {
	const result = useSocialStore((state) => state.result)
	const username = useSocialStore((state) => state.input)
	const loading = useSocialStore((state) => state.loading)

	return (
		<>
			{!loading && result && (
				<section className="flex flex-col items-center gap-2 py-8">
					<ul className="flex flex-col gap-4 list-none">
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
					</ul>
				</section>
			)}
		</>
	)
}
