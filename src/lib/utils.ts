import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge, taught the radius tokens in `theme.css` (`--radius-*`) that aren't Tailwind's own, so a component's
 * `rounded-button-lg` replaces a base `rounded-md` instead of both staying and `rounded-md` winning in the CSS.
 * The same for shadow tokens (`--shadow-*`). Add a name here whenever `theme.css` gets a new `--radius-*` or
 * `--shadow-*` token (DESIGN.md → "cn() knows the radius tokens").
 */
const twMerge = extendTailwindMerge({
	extend: {
		theme: {
			radius: [
				"avatar-square",
				"button-xs",
				"button-sm",
				"button-md",
				"button-lg",
				"button-xl",
				"card",
				"composer",
				"input",
				"menu",
				"menu-item",
				"message",
				"message-tail",
				"modal",
			],
			// The shadow tokens that aren't Tailwind's own (`--shadow-*`), for the same reason.
			shadow: ["composer", "sonner"],
		},
	},
});

export function cn(...inputs: ClassValue[]): string {
	return twMerge(clsx(inputs));
}
