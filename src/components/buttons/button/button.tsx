import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
	"inline-flex shrink-0 items-center justify-center whitespace-nowrap text-sm font-semibold transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
	{
		variants: {
			variant: {
				default: "bg-primary text-primary-foreground hover:bg-primary/90",
				// sparks.ds "Button" (38:124) Style=Solid, Tone=Destructive. Hover: a 20% black layer on the fill (Figma), as
				// color-mix; an opacity would lighten it instead.
				destructive:
					"bg-destructive text-destructive-foreground hover:bg-[color-mix(in_srgb,var(--destructive)_80%,black)]",
				// sparks.ds Style=Outlined, Tone=Neutral: foreground text, shadow-xs. Hover: the hover fill (colors/states/hover, `accent`) and the darker
				// border (colors/input/ring, `input-ring`).
				outline:
					"border border-input bg-background text-foreground shadow-xs hover:border-input-ring hover:bg-accent hover:text-accent-foreground",
				// The dark neutral tone (Figma colors/tone/neutral/neutral), e.g. Sparks's "New idea"; sparks.ds Style=Solid.
				// Hover: a 20% white layer on the fill (Figma), so it lightens, as color-mix.
				// Disabled: the muted fill and subtle text (Figma: Sparks "Publish your idea", "Publish & invite"), not faded to 50%.
				neutral:
					"bg-neutral text-neutral-foreground hover:bg-[color-mix(in_srgb,var(--neutral)_80%,white)] disabled:bg-neutral-muted disabled:text-foreground-subtle disabled:opacity-100",
				secondary:
					"bg-secondary text-secondary-foreground hover:bg-secondary/80",
				// sparks.ds Style=Ghost, Tone=Neutral. Hover: the hover fill (colors/states/hover, `accent`).
				ghost: "hover:bg-accent hover:text-accent-foreground",
				link: "text-primary underline-offset-4 hover:underline",
			},
			size: {
				// sparks.ds "Button", Type=Text: each size's corners, side padding and icon gap. An icon beside the label takes
				// `data-icon` ("inline-start" | "inline-end", as in shadcn), and its side gets Figma's smaller padding.
				// lg · 36
				default:
					"h-9 gap-1.5 rounded-button-lg px-3.5 has-data-[icon=inline-end]:pe-2.5 has-data-[icon=inline-start]:ps-2.5",
				// md · 32
				sm: "h-8 gap-1.25 rounded-button-md px-3 has-data-[icon=inline-end]:pe-2 has-data-[icon=inline-start]:ps-2",
				// xl · 40
				lg: "h-10 gap-2 rounded-button-xl px-4.5 text-base has-data-[icon=inline-end]:pe-3 has-data-[icon=inline-start]:ps-4",
				// Type=Icon, lg · 36
				icon: "size-9 rounded-button-lg",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

type ButtonProps = React.ComponentProps<"button"> &
	VariantProps<typeof buttonVariants> & {
		asChild?: boolean;
	};

/** Triggers an action or event, such as submitting a form or moving to the next step. */
function Button({
	className,
	variant = "default",
	size = "default",
	asChild = false,
	...props
}: ButtonProps) {
	const Component = asChild ? Slot : "button";

	return (
		<Component
			data-slot='button'
			data-variant={variant}
			data-size={size}
			className={cn(buttonVariants({ variant, size, className }))}
			{...props}
		/>
	);
}

export { Button, buttonVariants, type ButtonProps };
