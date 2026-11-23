import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
	// Figma "badge": fully rounded, 1px transparent border, Figtree medium, one line. An svg child is a small icon.
	"inline-flex w-fit shrink-0 items-center justify-center whitespace-nowrap rounded-full border border-transparent font-medium leading-none transition-colors [&_svg]:pointer-events-none [&_svg]:shrink-0",
	{
		variants: {
			/** Figma "Style". */
			variant: {
				solid: "",
				flat: "",
				outline: "border-border bg-background text-foreground",
				ghost: "text-foreground",
				link: "text-primary underline-offset-4 [a&]:hover:underline",
			},
			/** Figma "Tone". Each style draws only some tones; see `compoundVariants`. */
			tone: {
				brand: "",
				neutral: "",
				destructive: "",
				blue: "",
				green: "",
				sky: "",
				purple: "",
				red: "",
				yellow: "",
				amber: "",
			},
			/**
			 * Figma "Size", on SIZE-SCALE.md's steps (Figma "md (default)" is `default`), plus `xxs` (20px, badge only).
			 * Gaps and padding are Figma's per size. `xxs` is the one size in regular weight, at 12px.
			 */
			size: {
				xxs: "h-5 gap-1 px-1.5 py-0.5 text-xs font-normal [&_svg]:size-3",
				xs: "h-6 gap-1 px-2 py-0.5 text-sm [&_svg]:size-3",
				sm: "h-8 gap-1 px-2.5 py-1.5 text-sm [&_svg]:size-3",
				default: "h-9 gap-1.5 px-3 py-2 text-base [&_svg]:size-4",
				lg: "h-10 gap-1.5 px-3.5 py-2.5 text-base [&_svg]:size-4",
			},
		},
		compoundVariants: [
			// Solid: brand, neutral, destructive.
			{ variant: "solid", tone: "brand", class: "bg-primary text-primary-foreground" },
			{ variant: "solid", tone: "neutral", class: "bg-neutral text-neutral-foreground" },
			{ variant: "solid", tone: "destructive", class: "bg-destructive text-white" },
			// Flat: neutral plus the colored badge tokens. Yellow and amber have no badge token in Figma: they use
			// the corn and flamingo palettes directly (palettes/corn/100 + 800, palettes/flamingo/100 + 700).
			{ variant: "flat", tone: "neutral", class: "bg-neutral-muted text-foreground" },
			{ variant: "flat", tone: "blue", class: "bg-badge-blue text-badge-blue-foreground" },
			{ variant: "flat", tone: "green", class: "bg-badge-green text-badge-green-foreground" },
			{ variant: "flat", tone: "sky", class: "bg-badge-sky text-badge-sky-foreground" },
			{ variant: "flat", tone: "purple", class: "bg-badge-purple text-badge-purple-foreground" },
			{ variant: "flat", tone: "red", class: "bg-badge-red text-badge-red-foreground" },
			{ variant: "flat", tone: "yellow", class: "bg-(--corn-100) text-(--corn-800)" },
			{ variant: "flat", tone: "amber", class: "bg-(--flamingo-100) text-(--flamingo-700)" },
		],
		defaultVariants: {
			variant: "solid",
			tone: "brand",
			size: "default",
		},
	},
);

type BadgeProps = React.ComponentProps<"span"> &
	VariantProps<typeof badgeVariants> & {
		/** Renders the badge styles on its child (e.g. a link). */
		asChild?: boolean;
	};

/**
 * A short label for a status or category. Figma sparks.ds → "badge" (node 21:640).
 * Styles and their tones: `solid` (brand, neutral, destructive), `flat` (neutral, blue, green, sky, purple, red,
 * yellow, amber), `outline`, `ghost` and `link` (one tone each, no `tone` needed).
 */
function Badge({
	className,
	variant = "solid",
	tone = "brand",
	size = "default",
	asChild = false,
	...props
}: BadgeProps) {
	const Component = asChild ? Slot : "span";

	return (
		<Component
			data-slot='badge'
			data-variant={variant}
			data-tone={tone}
			data-size={size}
			className={cn(badgeVariants({ variant, tone, size }), className)}
			{...props}
		/>
	);
}

export { Badge, badgeVariants, type BadgeProps };
