import { Nav } from "@/shared"
import { Social, Theme } from "@/widgets"
import { Brand } from "@/ui"

export const Header = () => {
	return (
		<header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="h-14 flex mx-8 items-center justify-between">
				<div className="flex gap-4 items-center">
					<Brand />
					<Nav />
				</div>

				<div className="flex items-center justify-end border-2 rounded-lg border-slate-600 dark:border-slate-400">
					{/* <Social /> */}
					<Theme />
				</div>
			</div>
		</header>
	)
}
