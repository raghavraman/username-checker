import { Nav } from "@/shared"
import { Social, Theme } from "@/widgets"
import { Brand } from "@/ui"

export const Footer = () => {
	return (
		<footer className="sticky bottom-0 z-50 w-full border-t border-top/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container h-14 flex max-w-screen-lg items-center justify-center">
				<div className="flex gap-4 lg:gap-6 items-center text-center text-base text-slate-400">
					<span>
						weekend project by
						<a href="https://x.com/rghvraman" target="_blank">
							<b> raghav </b>
						</a>
						&
						<a href="https://x.com/hariamogh" target="_blank">
							<span>
								<b> hari </b>
							</span>
						</a>
					</span>
				</div>
			</div>
		</footer>
	)
}
