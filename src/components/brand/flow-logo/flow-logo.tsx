import * as React from "react";

import { cn } from "@/lib/utils";

/*
 * Artwork from Figma sparks.ds → Branding → "flow-logo" (node 21:420).
 * Path data and gradient are Figma's SVG export, copied verbatim (one compound path).
 * Literal hex is intentional: logo artwork is exempt from tokens (DESIGN.md → "Product logos").
 */

type FlowLogoProps = Omit<React.ComponentProps<"svg">, "children">;

/** The Flow logo. Resize it by height (`className='h-6'`); the width follows. */
function FlowLogo({
	className,
	"aria-label": ariaLabel = "Flow",
	...props
}: FlowLogoProps) {
	// Unique gradient id, so several logos on one page don't share (or break) each other's fill.
	const gradientId = `${React.useId()}-flow`;

	return (
		<svg
			data-slot='flow-logo'
			role='img'
			aria-label={ariaLabel}
			width='117.444'
			height='31.374'
			viewBox='0 0 117.444 31.374'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			className={cn("block h-[31.374px] w-auto shrink-0", className)}
			{...props}
		>
			{/* FLOW */}
			<path d='M49.2021 18.6953C49.4334 20.1904 50.0063 21.5324 50.9199 22.7217C52.5439 24.8357 54.7771 25.8926 57.6191 25.8926C60.3348 25.8925 62.7075 24.9968 64.7373 23.2051C66.1751 21.9446 67.2266 20.4407 67.8955 18.6953H73.8535C72.9234 22.0727 71.0893 24.9344 68.3496 27.2793C65.1577 30.0092 61.4616 31.374 57.2617 31.374C52.5577 31.374 48.8823 29.7285 46.2363 26.4385C44.4461 24.191 43.4568 21.6099 43.2666 18.6953H49.2021ZM22.3447 5.96387H10.1016L8.72363 13.7764H20.2441L19.3623 18.7314H7.84863L5.7334 30.7227H0L2.125 18.6953H7.83594L8.70215 13.7539H2.99805L5.31348 0.651367H23.2891L22.3447 5.96387ZM29.207 25.4102H42.1641L41.2188 30.7227H22.5078L24.6328 18.6953H30.3857L29.207 25.4102ZM84.3271 20.1807L84.4316 22.1553H84.5576L85.4404 20.1807L86.1514 18.6953H91.1289L85.377 30.7227H79.959L77.124 0.651367H82.7939L84.3271 20.1807ZM102.114 20.1807L102.324 22.1553H102.429L103.248 20.1807L103.881 18.6953H109.342L103.941 30.7227H98.5654L96.1709 10.9199L95.9609 8.82031H95.8145L94.8477 10.9199L93.4922 13.7539H88.5156L94.7852 0.651367H99.8672L102.114 20.1807ZM111.561 13.7539H105.984L111.564 0.651367H117.444L111.561 13.7539ZM60.4746 0C65.0246 0 68.6645 1.65207 71.3945 4.95605C73.4976 7.47754 74.5471 10.4101 74.5449 13.7539H68.7129C68.6249 11.812 68.0076 10.1042 66.8584 8.63086C65.2344 6.53099 63.0086 5.48047 60.1807 5.48047C57.4787 5.48048 55.1055 6.38354 53.0615 8.18945C51.3221 9.71442 50.1527 11.5699 49.5488 13.7539H43.6475C44.4676 9.89581 46.3871 6.67582 49.4072 4.09473C52.5852 1.36475 56.2746 2.06633e-05 60.4746 0ZM31.2529 13.7539H25.5059L27.8213 0.651367H33.5537L31.2529 13.7539Z' fill={`url(#${gradientId})`} />
			<defs>
				<linearGradient id={gradientId} x1='-1.17572' y1='16.2229' x2='114.824' y2='16.2229' gradientUnits='userSpaceOnUse'>
					<stop stopColor='#00F7EB' />
					<stop offset='0.519231' stopColor='#FF9328' />
					<stop offset='1' stopColor='#CF0000' />
				</linearGradient>
			</defs>
		</svg>
	);
}

export { FlowLogo, type FlowLogoProps };
