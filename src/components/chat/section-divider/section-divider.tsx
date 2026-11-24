import * as React from "react";
import { motion } from "motion/react";

import { lineDrawVariants, useMotionPreference } from "@/lib/motion";
import { cn } from "@/lib/utils";

/*
 * Where one section of a conversation with the assistant ends and the next starts: a zigzag line. Not in sparks.ds yet.
 */

/**
 * One zigzag of the line, 12 × 6px, repeated across. It starts and ends on a peak of the next ones, so the strokes meet
 * at the tile's edges. A mask: the color is the element's background.
 */
const zigzag = `url("data:image/svg+xml,${encodeURIComponent(
	"<svg xmlns='http://www.w3.org/2000/svg' width='12' height='6' viewBox='0 0 12 6'><path d='M-6 1 0 5 6 1 12 5 18 1' fill='none' stroke='black' stroke-linejoin='round'/></svg>",
)}")`;

type SectionDividerProps = Omit<React.ComponentProps<typeof motion.div>, "children"> & {
	/** The section has just ended: the line draws itself from left to right. Without it, it's just there. */
	draw?: boolean;
	/** Called once it's drawn (at once when it isn't, or under reduced motion), e.g. to bring in what follows. */
	onDrawn?: () => void;
};

/** A zigzag line between two sections of a conversation, its container's full width. No name: what follows names itself. */
function SectionDivider({ draw = false, onDrawn, className, style, ...props }: SectionDividerProps) {
	const { prefersReducedMotion } = useMotionPreference();
	// Decided as it appears: a line already drawn stays as it is.
	const [draws] = React.useState(draw && !prefersReducedMotion);
	const onDrawnRef = React.useRef(onDrawn);
	onDrawnRef.current = onDrawn;
	React.useEffect(() => {
		if (!draws) onDrawnRef.current?.();
	}, [draws]);
	return (
		<motion.div
			role='separator'
			data-slot='section-divider'
			variants={lineDrawVariants}
			initial={draws ? "hidden" : false}
			animate='shown'
			onAnimationComplete={() => draws && onDrawnRef.current?.()}
			className={cn("h-1.5 w-full bg-border-defined", className)}
			style={{ maskImage: zigzag, WebkitMaskImage: zigzag, maskRepeat: "repeat-x", WebkitMaskRepeat: "repeat-x", ...style }}
			{...props}
		/>
	);
}

export { SectionDivider, type SectionDividerProps };
