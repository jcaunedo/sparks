import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";
import { layoutSpring, motionDuration, useMotionPreference } from "@/lib/motion";

/** Whether the sliding pill is in place; until then (the first render, on a server) the current step draws its own. */
const StepNavContext = React.createContext(false);

/* Figma Sparks → "Sparks Project" (27:1932): the current step is a sapphire gradient (palettes/sapphire 400 → 500). */
const currentFill = "bg-linear-to-b from-(--sapphire-400) to-(--sapphire-500)";

type StepNavProps = React.ComponentProps<"nav">;

/**
 * The steps of a flow as a row of pills, the current one in the Sparks gradient. Figma sparks.ds → "header-autopartshub",
 * "Sparks Project" (node 39:1598), with the current and not-reached looks from Sparks → "Sparks Project" (27:1932).
 * The gradient pill slides between steps, as the tabs' indicator (MOTION.md → Step nav). Give it an `aria-label` ("Steps").
 */
function StepNav({ className, children, ...props }: StepNavProps) {
	const { resolve } = useMotionPreference();
	const listRef = React.useRef<HTMLOListElement>(null);
	// Where the current step is in the row. Measured inside the row (not with a shared `layoutId`, as Tabs), so the pill stays
	// on its step when the whole row moves, e.g. a side panel opening (DESIGN.md → "Step nav's sliding pill").
	const [pill, setPill] = React.useState<{ x: number; width: number; slide: boolean }>();
	const measure = React.useCallback((slide: boolean) => {
		const step = listRef.current?.querySelector<HTMLElement>('[data-current="true"]')?.parentElement;
		const next = step ? { x: step.offsetLeft, width: step.offsetWidth } : undefined;
		setPill((now) => (now?.x === next?.x && now?.width === next?.width ? now : next && { ...next, slide: slide && Boolean(now) }));
	}, []);
	React.useLayoutEffect(() => measure(true));
	// Its own size changed (the font arriving): no slide.
	React.useEffect(() => {
		if (!listRef.current) return;
		const observer = new ResizeObserver(() => measure(false));
		observer.observe(listRef.current);
		return () => observer.disconnect();
	}, [measure]);

	return (
		<StepNavContext.Provider value={Boolean(pill)}>
			<nav data-slot='step-nav' className={className} {...props}>
				{/* Figma: 6px between pills. `isolate`: the pills' fills, the sliding pill and the labels stack in that order. */}
				<ol ref={listRef} className='relative isolate flex items-center gap-1.5'>
					{pill ? (
						<motion.li
							aria-hidden='true'
							data-slot='step-nav-indicator'
							initial={false}
							animate={{ x: pill.x, width: pill.width }}
							transition={pill.slide ? resolve(layoutSpring) : { duration: 0 }}
							className={cn("pointer-events-none absolute inset-y-0 left-0 -z-10 rounded-full", currentFill)}
						/>
					) : null}
					{children}
				</ol>
			</nav>
		</StepNavContext.Provider>
	);
}

type StepNavItemProps = React.ComponentProps<"button"> & {
	/** The step the user is on: sapphire gradient pill, `aria-current="step"`. */
	current?: boolean;
	/**
	 * A step not reached yet that can still be selected (e.g. to see what it is): the muted text of `disabled`, with hover
	 * and click.
	 */
	upcoming?: boolean;
	/** Renders the pill on its child, a link (`<StepNavItem asChild><a href='…'>Plan</a></StepNavItem>`). */
	asChild?: boolean;
};

/**
 * One step in a `StepNav`. `upcoming` marks a step not reached yet that can be selected (muted text); `disabled`, one
 * that can't (muted text, no hover or click).
 */
function StepNavItem({ className, current = false, upcoming = false, asChild = false, disabled, style, ...props }: StepNavItemProps) {
	const Component = asChild ? Slot : "button";
	const pillInPlace = React.useContext(StepNavContext);
	const { prefersReducedMotion } = useMotionPreference();

	return (
		<li className='flex'>
			<Component
				data-slot='step-nav-item'
				data-current={current}
				data-upcoming={upcoming || undefined}
				aria-current={current ? "step" : undefined}
				aria-disabled={asChild && disabled ? true : undefined}
				disabled={asChild ? undefined : disabled}
				type={asChild ? undefined : "button"}
				// The label turns white as the pill reaches it, not before: white on the gray fill can't be read.
				style={{ ...style, transitionDelay: current && !prefersReducedMotion ? `${motionDuration.instant}s` : undefined }}
				className={cn(
					// Figma "badge": 36px tall, fully rounded, 1px transparent border + 12px side padding, base medium.
					"relative inline-flex h-9 items-center justify-center whitespace-nowrap rounded-full border border-transparent px-3 text-base font-medium outline-none transition-colors",
					"focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
					// The fill, under the sliding pill: neutral/muted. Hover isn't in Figma: a light darken (color-mix), only on steps
					// that can be selected.
					"before:absolute before:-inset-px before:-z-20 before:rounded-full before:bg-neutral-muted before:transition-colors",
					current && !pillInPlace && "before:bg-linear-to-b before:from-(--sapphire-400) before:to-(--sapphire-500)",
					current ? "text-brand-foreground" : "text-foreground hover:before:bg-[color-mix(in_srgb,var(--neutral-muted)_92%,black)]",
					// Not reached yet: muted text (colors/foreground/muted, sparks.ds "header-autopartshub" → "Sparks Project",
					// 39:1598), no hover and no click (the global cursor rule skips disabled buttons; links get aria-disabled).
					"disabled:text-muted-foreground disabled:hover:before:bg-neutral-muted aria-disabled:pointer-events-none aria-disabled:text-muted-foreground",
					// Upcoming: the same muted text, still selectable (hover darkens the pill, the text turns foreground).
					upcoming && !current && "text-muted-foreground hover:text-foreground",
					className,
				)}
				{...props}
			/>
		</li>
	);
}

export { StepNav, StepNavItem, type StepNavProps, type StepNavItemProps };
