import * as React from "react";

import { cn } from "@/lib/utils";

type AppHeaderProps = Omit<React.ComponentProps<"header">, "children"> & {
	/** The app's logo, on the left (e.g. `<AutoPartsHubLogo />`). */
	logo: React.ReactNode;
	/** What sits on the right, such as the user's avatar. */
	children?: React.ReactNode;
};

/**
 * The app's top bar: logo on the left, actions (such as the user's avatar) on the right.
 * Figma sparks.ds → "header-autopartshub" set (node 32:1145): "AutoPartsHUB" (`<AutoPartsHubLogo />`)
 * and "Sparks" (`<Logo className='h-8' />`, the Sparks logo at 32px tall).
 */
function AppHeader({ className, logo, children, ...props }: AppHeaderProps) {
	return (
		<header
			data-slot='app-header'
			className={cn(
				// Figma: padding 28 top/bottom (spacing/7), 32 left/right; space-between, centered. Its 1353px
				// gap is just what space-between leaves at 1728px; gap-4 only keeps the sides apart on narrow screens.
				"flex w-full items-center justify-between gap-4 px-8 py-7",
				className,
			)}
			{...props}
		>
			{logo}
			<div data-slot='app-header-actions' className='flex shrink-0 items-center'>
				{children}
			</div>
		</header>
	);
}

export { AppHeader, type AppHeaderProps };
