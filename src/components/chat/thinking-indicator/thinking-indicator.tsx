import * as React from "react";
import { AnimatePresence, motion } from "motion/react";

import { cn } from "@/lib/utils";
import { motionDistance, motionDuration, motionScale, useMotionPreference } from "@/lib/motion";

/*
 * Sparks thinking before it replies (Figma: Sparks, "Sparks Project" 27:1932, node 64:13203): a 10px dot, 10px gap,
 * then the line in base text filled with a gradient of the logo's colors. Not in sparks.ds yet.
 */

/** The Sparks logo's letter colors, in order (S P A R K S): the dot takes the next one each time it lands. */
const logoColors = [
	"var(--sapphire)",
	"var(--tangerine)",
	"var(--amethyst)",
	"var(--clover)",
	"var(--citrine)",
	"var(--cerulean)",
] as const;

/**
 * The line's gradient: the six logo colors, one line wide each (a tile six lines wide), so about two show at a time as
 * in Figma. It starts and ends sapphire, so it loops without a seam, and runs backwards, so moving right brings the
 * colors in from the left in the logo's order, like the dot.
 */
const shimmerColors = [logoColors[0], ...logoColors.slice(1).reverse(), logoColors[0]];
const shimmerGradient = `linear-gradient(90deg, ${shimmerColors
	.map((color, index) => `${color} ${((index / (shimmerColors.length - 1)) * 100).toFixed(2)}%`)
	.join(", ")})`;

type ThinkingIndicatorProps = Omit<React.ComponentProps<"div">, "children"> & {
	/**
	 * What the assistant is working through, one line at a time ("Popping the hood on support cases…"). Each shows for
	 * `motionDuration.thinkingStep`, then the next slides in; the last one stays until the reply replaces the indicator.
	 */
	steps: string[];
};

/** The hopping dot: one hop per mount; landing hands over to the next color, which remounts it for the next hop. */
function ThinkingDot({ still }: { still: boolean }) {
	const [color, setColor] = React.useState(0);
	const squash = motionScale.thinkingSquash;
	return (
		<motion.span
			key={color}
			aria-hidden
			data-slot='thinking-indicator-dot'
			className='size-2.5 shrink-0 rounded-full'
			style={{ backgroundColor: logoColors[still ? 0 : color], originY: 1 }}
			animate={
				still
					? undefined
					: {
							y: [0, -motionDistance.thinkingHop, 0, 0],
							scaleX: [1, 0.92, 2 - squash, 1],
							scaleY: [1, 1.08, squash, 1],
						}
			}
			transition={{ duration: motionDuration.thinkingHop, times: [0, 0.45, 0.8, 1], ease: ["easeOut", "easeIn", "easeOut"] }}
			onAnimationComplete={still ? undefined : () => setColor((current) => (current + 1) % logoColors.length)}
		/>
	);
}

/**
 * The assistant thinking before it replies: a dot hopping through the Sparks logo colors, and what it's working
 * through, a line at a time, with a gradient moving across it. Reduced motion keeps the dot still and the gradient
 * in place; the lines still change.
 */
function ThinkingIndicator({ steps, className, ...props }: ThinkingIndicatorProps) {
	const { prefersReducedMotion } = useMotionPreference();
	const [index, setIndex] = React.useState(0);
	const last = Math.max(steps.length - 1, 0);

	React.useEffect(() => {
		if (index >= last) return;
		const timer = window.setTimeout(() => setIndex((current) => current + 1), motionDuration.thinkingStep * 1000);
		return () => window.clearTimeout(timer);
	}, [index, last]);

	const line = steps[Math.min(index, last)] ?? "";
	return (
		<div
			role='status'
			data-slot='thinking-indicator'
			className={cn("flex items-center gap-2.5 text-base", className)}
			{...props}
		>
			<ThinkingDot still={Boolean(prefersReducedMotion)} />
			{/* Clips the next line while it slides up into place. */}
			<span className='relative min-w-0 overflow-hidden'>
				<AnimatePresence mode='wait'>
					<motion.span
						key={index}
						className='block truncate bg-clip-text bg-repeat-x text-transparent [background-size:600%_100%]'
						style={{ backgroundImage: shimmerGradient }}
						initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: motionDistance.subtle }}
						animate={{
							opacity: 1,
							y: 0,
							// Moving one tile (six lines) to the right: with the image six times the line's width, -120% is one
							// whole tile. The colors flow left to right.
							...(prefersReducedMotion ? {} : { backgroundPositionX: ["0%", "-120%"] }),
						}}
						exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -motionDistance.subtle }}
						transition={{
							default: { duration: motionDuration.fast, ease: "easeOut" },
							backgroundPositionX: { duration: motionDuration.thinkingShimmer, ease: "linear", repeat: Infinity },
						}}
					>
						{line}
					</motion.span>
				</AnimatePresence>
			</span>
		</div>
	);
}

export { ThinkingIndicator, type ThinkingIndicatorProps };
