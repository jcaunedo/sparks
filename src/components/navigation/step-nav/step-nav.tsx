import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";

type StepNavProps = React.ComponentProps<"nav">;

/**
 * The steps of a flow as a row of pills, the current one in the Sparks gradient. Figma sparks.ds → "header-autopartshub",
 * "Sparks Project" (node 39:1598), with the current and not-reached looks from Sparks → "Sparks Project" (27:1932).
 * Give it an `aria-label` ("Steps").
 */
function StepNav({ className, children, ...props }: StepNavProps) {
	return (
		<nav data-slot='step-nav' className={className} {...props}>
			{/* Figma: 6px between pills. */}
			<ol className='flex items-center gap-1.5'>{children}</ol>
		</nav>
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
function StepNavItem({ className, current = false, upcoming = false, asChild = false, disabled, ...props }: StepNavItemProps) {
	const Component = asChild ? Slot : "button";

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
				className={cn(
					// Figma "badge": 36px tall, fully rounded, 1px transparent border + 12px side padding, base medium.
					"inline-flex h-9 items-center justify-center whitespace-nowrap rounded-full border border-transparent px-3 text-base font-medium outline-none transition-colors",
					"focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
					// Figma Sparks → "Sparks Project" (27:1932): the current step is a sapphire gradient (palettes/sapphire 400 → 500,
					// top to bottom) with on-brand text; the others are neutral/muted with foreground text. Hover isn't in Figma:
					// a light darken (color-mix), only on steps that can be selected.
					current
						? "bg-linear-to-b from-(--sapphire-400) to-(--sapphire-500) text-brand-foreground"
						: "bg-neutral-muted text-foreground hover:bg-[color-mix(in_srgb,var(--neutral-muted)_92%,black)]",
					// Not reached yet: muted text (colors/foreground/muted, sparks.ds "header-autopartshub" → "Sparks Project",
					// 39:1598), no hover and no click (the global cursor rule skips disabled buttons; links get aria-disabled).
					"disabled:text-muted-foreground disabled:hover:bg-neutral-muted aria-disabled:pointer-events-none aria-disabled:text-muted-foreground",
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
