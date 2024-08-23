import Image from "next/image"
import Link from "next/link"

const Brand = () => {
	return (
		<>
			<Link href="/">
				<Image src="/assets/img/logo.svg" alt={"logo"} width={64} height={64} />
			</Link>
		</>
	)
}

export { Brand }
