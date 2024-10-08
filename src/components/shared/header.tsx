import { Nav } from "@/shared"
import { Social, Theme } from "@/widgets"
import { Brand } from "@/ui"

export const Header = () => {
	return (
		<header className="sticky py-4 top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="h-14 flex px-6 items-center justify-between">
				<div className="flex gap-4 items-center">
					<Brand />
					<Nav />
				</div>

				<div className="flex items-center justify-end">
					{/* <Social /> */}
					<Theme />
				</div>
			</div>
		</header>
	)
}
