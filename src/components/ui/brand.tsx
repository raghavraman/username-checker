import Image from "next/image"
import Link from "next/link"

const Brand = () => {
	return (
		<>
			<Link href="/">
				<Image src="/assets/img/logo.svg" alt={"logo"} width={32} height={32} />
			</Link>
		</>
	)
}

export { Brand }
