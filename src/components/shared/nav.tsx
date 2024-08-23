"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import clsx from "clsx"

import { navConfig } from "@/config"

export const Nav = () => {
	const pathname = usePathname()

	if (!navConfig) return null

	return (
		<nav className="flex font-semibold text-black items-center gap-4 text-sm lg:gap-6">
			{navConfig?.map(({ title, href = "/" }: any) => (
				<Link
					key={href}
					href={href}
					className={clsx(
						"transition-colors hover:text-foreground/80 text-2xl leading-8",
						pathname === href ? "text-foreground" : "text-foreground/60"
					)}
				>
					{title}
				</Link>
			))}
		</nav>
	)
}
