import * as React from "react";
import { Slot, Slottable } from "@radix-ui/react-slot";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";
import { liftPattern, useMotionPreference } from "@/lib/motion";

const MotionSlot = motion.create(Slot);

const appCardClasses = cn(
	// Figma "app-card": background, 1px border, card radius, shadow-sm, clipped.
	"flex min-h-[220px] w-full flex-col justify-between gap-2 overflow-hidden rounded-card border border-border bg-background shadow-sm",
	// Figma padding 40 / 64 / 40 / 40 (inside the 1px border).
	"pt-10 pr-16 pb-10 pl-10",
	"outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
);

// Figma "Property 1=Hover" (node 39:1694), linked cards only: defined border, shadow-lg.
// Motion's Lift animates only `y`, so CSS owns border and shadow (MOTION.md: never both on one property).
const appCardLinkedClasses =
	"group transition-[border-color,box-shadow] hover:border-border-defined hover:shadow-lg";

type AppCardProps = Omit<React.ComponentProps<"div">, "children"> & {
	/** The app's logo, at the top (e.g. `<Logo tone='on-light' />`). */
	logo: React.ReactNode;
	/** One or two lines about the app, at the bottom. */
	description: React.ReactNode;
	/**
	 * Renders the card as its child, e.g. `<AppCard asChild …><a href='/app' /></AppCard>`.
	 * A linked card lifts on hover (MOTION.md → Lift); a plain card has no motion.
	 */
	asChild?: boolean;
	/** With `asChild`: the element to render as (a link). Its own children are ignored. */
	children?: React.ReactElement;
};

/** A card that introduces an app: its logo and a short description. Figma sparks.ds → "app-card" (set 39:1693: Default 21:348, Hover 39:1694). */
function AppCard({
	className,
	logo,
	description,
	asChild = false,
	children,
	...props
}: AppCardProps) {
	const { resolve } = useMotionPreference();

	const content = (
		<>
			{/* Figma "Top": a 40px row with the logo centered vertically. */}
			<div data-slot='app-card-logo' className='flex h-10 shrink-0 flex-col items-start justify-center'>
				{logo}
			</div>
			{/* Figma: muted at rest; foreground on hover (linked cards only). */}
			<p
				data-slot='app-card-description'
				className={cn(
					"text-base text-muted-foreground",
					asChild && "transition-colors group-hover:text-foreground",
				)}
			>
				{description}
			</p>
		</>
	);

	if (!asChild) {
		return (
			<div data-slot='app-card' className={cn(appCardClasses, className)} {...props}>
				{content}
			</div>
		);
	}

	return (
		<MotionSlot
			data-slot='app-card'
			className={cn(appCardClasses, appCardLinkedClasses, className)}
			whileHover={liftPattern.whileHover}
			transition={resolve(liftPattern.transition ?? {})}
			{...(props as React.ComponentProps<typeof MotionSlot>)}
		>
			{content}
			<Slottable>{children}</Slottable>
		</MotionSlot>
	);
}

export { AppCard, type AppCardProps };
