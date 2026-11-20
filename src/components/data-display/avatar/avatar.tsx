import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cva, type VariantProps } from "class-variance-authority";
import { Plus } from "lucide-react";

import { cn } from "@/lib/utils";

/*
 * Figma sparks.ds → "avatar" component set (node 21:201), on shadcn/ui's Avatar.
 * - Photo variants (w1…w10, m1…m3) → <AvatarImage src>.
 * - Initials variants (i1…i10) → <AvatarFallback color={1…10}>.
 * - "Show Dot" → <AvatarBadge>.
 * - "Add" → <AvatarAdd>, a button.
 */

const avatarVariants = cva(
	// No `overflow-hidden` (shadcn has it): it would clip the badge to the circle.
	// The image and fallback round themselves instead (DESIGN.md → "Avatar").
	"group/avatar relative flex shrink-0 rounded-full select-none",
	{
		variants: {
			size: {
				// Figma avatar set: 32px.
				default: "size-8",
				// Figma "Avatar / Users" in the header: 40px.
				lg: "size-10",
			},
		},
		defaultVariants: {
			size: "default",
		},
	},
);

type AvatarProps = React.ComponentProps<typeof AvatarPrimitive.Root> &
	VariantProps<typeof avatarVariants>;

/** A person's photo, with their initials as the fallback while it loads or when there's none. */
function Avatar({ className, size = "default", ...props }: AvatarProps) {
	return (
		<AvatarPrimitive.Root
			data-slot='avatar'
			data-size={size}
			className={cn(avatarVariants({ size, className }))}
			{...props}
		/>
	);
}

/** The photo. Hidden until it loads; the fallback shows meanwhile. */
function AvatarImage({
	className,
	...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
	return (
		<AvatarPrimitive.Image
			data-slot='avatar-image'
			className={cn("aspect-square size-full rounded-full object-cover", className)}
			{...props}
		/>
	);
}

/* Figma initials variants i1…i10, in order. */
const avatarColors = {
	1: "bg-avatar-1",
	2: "bg-avatar-2",
	3: "bg-avatar-3",
	4: "bg-avatar-4",
	5: "bg-avatar-5",
	6: "bg-avatar-6",
	7: "bg-avatar-7",
	8: "bg-avatar-8",
	9: "bg-avatar-9",
	10: "bg-avatar-10",
} as const;

type AvatarColor = keyof typeof avatarColors;

/** Picks a stable color (1–10) from text, so the same initials always get the same color. */
function avatarColorFor(text: string): AvatarColor {
	let hash = 0;
	for (const char of text) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
	return ((hash % 10) + 1) as AvatarColor;
}

type AvatarFallbackProps = Omit<
	React.ComponentProps<typeof AvatarPrimitive.Fallback>,
	"color"
> & {
	/** Background color, Figma i1–i10. Without it, the color is picked from the initials. */
	color?: AvatarColor;
};

/** The person's initials on a colored circle. Shown while the image loads, or when there's none. */
function AvatarFallback({
	className,
	color,
	children,
	...props
}: AvatarFallbackProps) {
	const resolvedColor =
		color ??
		avatarColorFor(
			typeof children === "string" || typeof children === "number"
				? String(children)
				: "",
		);

	return (
		<AvatarPrimitive.Fallback
			data-slot='avatar-fallback'
			data-color={resolvedColor}
			className={cn(
				// Figtree Bold 11px at 32px (Figma, no text style; DESIGN.md → "Avatar").
				"flex size-full items-center justify-center rounded-full text-[11px] leading-none font-bold text-primary-foreground group-data-[size=lg]/avatar:text-sm",
				avatarColors[resolvedColor],
				className,
			)}
			{...props}
		>
			{children}
		</AvatarPrimitive.Fallback>
	);
}

/**
 * Status dot on the avatar's bottom-right corner (Figma "Show Dot": online).
 * Put screen-reader text inside it, e.g. `<span className='sr-only'>Online</span>`.
 */
function AvatarBadge({ className, ...props }: React.ComponentProps<"span">) {
	return (
		<span
			data-slot='avatar-badge'
			className={cn(
				// 8px at 32px, with a 2px background ring outside it (Figma stroke: outside).
				"absolute right-0 bottom-0 z-10 size-2 rounded-full bg-success ring-2 ring-background",
				"group-data-[size=lg]/avatar:size-2.5",
				className,
			)}
			{...props}
		/>
	);
}

type AvatarAddProps = React.ComponentProps<"button"> &
	VariantProps<typeof avatarVariants>;

/** Round "add person" button that sits with avatars (Figma "Add"). Defaults to a plus icon. */
function AvatarAdd({
	className,
	size = "default",
	type = "button",
	"aria-label": ariaLabel = "Add person",
	children,
	...props
}: AvatarAddProps) {
	return (
		<button
			data-slot='avatar-add'
			data-size={size}
			type={type}
			aria-label={ariaLabel}
			className={cn(
				avatarVariants({ size }),
				// Same hover and focus as Button's outline variant. Figma draws no states for it.
				"items-center justify-center border border-border bg-background text-icon transition-colors outline-none hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&>svg]:pointer-events-none [&>svg]:size-4 [&>svg]:shrink-0",
				className,
			)}
			{...props}
		>
			{children ?? <Plus aria-hidden='true' />}
		</button>
	);
}

export {
	Avatar,
	AvatarImage,
	AvatarFallback,
	AvatarBadge,
	AvatarAdd,
	avatarVariants,
	avatarColors,
	avatarColorFor,
	type AvatarProps,
	type AvatarFallbackProps,
	type AvatarAddProps,
	type AvatarColor,
};
