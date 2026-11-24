import * as React from "react";
import { animate, motion } from "motion/react";

import { enterTransition, motionDistance, motionDuration, useMotionPreference } from "@/lib/motion";

/* A screen of the prototype being built (prds/sparks-prototype.md, "Building it"; MOTION.md → "Assemble"). */

/** A piece of the screen: where it sits, for its place in the wireframe. */
type Block = { left: number; top: number; width: number; height: number };

/** Elements that are one piece, whatever they hold. */
const wholePieces = new Set(["IMG", "SVG", "SELECT", "INPUT", "LABEL", "P", "H1", "H2", "H3"]);

/** The screen's pieces, top to bottom as they read: images, headings, lines of text, fields and buttons. */
function piecesOf(element: Element): HTMLElement[] {
	const ownText = [...element.childNodes].some((node) => node.nodeType === Node.TEXT_NODE && node.textContent?.trim());
	const tag = element.tagName.toUpperCase();
	const button = tag === "BUTTON" && !element.querySelector("img");
	if (wholePieces.has(tag) || button || ownText || element.children.length === 0) {
		const box = element.getBoundingClientRect();
		return box.width > 0 && box.height > 0 ? [element as HTMLElement] : [];
	}
	return [...element.children].flatMap(piecesOf);
}

/** A piece's box: a line of text's is as wide as its text, not its column. */
function boxOf(piece: HTMLElement, origin: DOMRect): Block {
	let box = piece.getBoundingClientRect();
	if (/^(P|H1|H2|H3|LABEL)$/.test(piece.tagName)) {
		const range = document.createRange();
		range.selectNodeContents(piece);
		box = range.getBoundingClientRect();
	}
	return { left: box.left - origin.left, top: box.top - origin.top, width: box.width, height: box.height };
}

/**
 * Assembles a screen from blank: its wireframe (a gray block where each piece goes, one after another), then each block
 * replaced by the real piece, top to bottom. It works from the screen's own layout, so any prototype can use it. Under
 * reduced motion, the screen shows whole. Key it by screen, so each one starts from blank.
 */
function BuildingScreen({ children }: { children: React.ReactNode }) {
	const { prefersReducedMotion } = useMotionPreference();
	const screenRef = React.useRef<HTMLDivElement>(null);
	const [blocks, setBlocks] = React.useState<Block[]>([]);

	React.useLayoutEffect(() => {
		const screen = screenRef.current;
		if (!screen || prefersReducedMotion) return;
		const origin = screen.getBoundingClientRect();
		const pieces = piecesOf(screen);
		setBlocks(pieces.map((piece) => boxOf(piece, origin)));
		const step = motionDuration.assembleFill / Math.max(pieces.length, 1);
		// A disabled button is see-through: each piece comes in to its own opacity.
		const opacities = pieces.map((piece) => Number(getComputedStyle(piece).opacity));
		for (const piece of pieces) piece.style.opacity = "0";
		const playing = pieces.map((piece, index) =>
			animate(
				piece,
				{ opacity: [0, opacities[index]], y: [motionDistance.subtle, 0] },
				{ ...enterTransition, delay: motionDuration.assembleWireframe + index * step },
			),
		);
		return () => {
			for (const animation of playing) animation.stop();
			for (const piece of pieces) {
				piece.style.opacity = "";
				piece.style.transform = "";
			}
		};
	}, [prefersReducedMotion]);

	const wireStep = motionDuration.assembleWireframe / Math.max(blocks.length, 1);
	const fillStep = motionDuration.assembleFill / Math.max(blocks.length, 1);
	return (
		<div className='relative h-full overflow-hidden'>
			{/* The lines and surfaces around the pieces come in with the first of them. */}
			<motion.div
				ref={screenRef}
				className='min-h-full'
				initial={prefersReducedMotion ? false : { opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: motionDuration.normal, delay: motionDuration.assembleWireframe }}
			>
				{children}
			</motion.div>
			<div aria-hidden className='pointer-events-none absolute inset-0 z-20'>
				{blocks.map((block, index) => {
					// In with the wireframe, out as its piece arrives.
					const start = index * wireStep;
					const leaves = motionDuration.assembleWireframe + index * fillStep - start;
					const duration = leaves + motionDuration.normal;
					return (
						<motion.span
							key={index}
							className='absolute rounded-md bg-muted'
							style={block}
							initial={{ opacity: 0 }}
							animate={{ opacity: [0, 1, 1, 0] }}
							transition={{ delay: start, duration, times: [0, Math.min(motionDuration.fast, leaves) / duration, leaves / duration, 1], ease: "linear" }}
						/>
					);
				})}
			</div>
		</div>
	);
}

export { BuildingScreen };
