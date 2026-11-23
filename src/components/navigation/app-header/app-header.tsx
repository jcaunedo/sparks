import * as React from "react";

import { cn } from "@/lib/utils";

type AppHeaderProps = Omit<React.ComponentProps<"header">, "children"> & {
	/** What sits on the left: the app's logo (e.g. `<AutoPartsHubLogo />`), or the page's name. */
	logo: React.ReactNode;
	/** Optional navigation centered in the header, such as a concept's steps (`<StepNav>`). */
	nav?: React.ReactNode;
	/** What sits on the right, such as the user's avatar, or Share and a close button. */
	children?: React.ReactNode;
};

/**
 * The app's top bar: logo on the left, optional navigation in the center, actions (such as the user's avatar) on the right.
 * Figma sparks.ds → "header-autopartshub" set (node 32:1145): "AutoPartsHUB" (`<AutoPartsHubLogo />`),
 * "Sparks" (`<Logo className='h-7' />`, the Sparks logo at 28px tall) and "Sparks Project" (the concept's name on
 * the left, the steps as `nav`, Share and the close button on the right). All three are 92px tall: a 36px row between
 * 28px top and bottom. The AutoPartsHUB and Sparks right sides are notifications and a 36px avatar.
 */
function AppHeader({ className, logo, nav, children, ...props }: AppHeaderProps) {
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
			{/* Figma "Left"/"Right": with `nav`, both sides take an equal share of the width (flex 1) so the nav stays
			    centered on the page, whatever the widths of the logo and the actions. 16px between items on the left, 12px on
			    the right (sparks.ds "header-autopartshub", every variant's "Right" gap 12). */}
			<div data-slot='app-header-start' className={cn("flex items-center gap-4", nav && "min-w-0 flex-1")}>
				{logo}
			</div>
			{nav && (
				<div data-slot='app-header-nav' className='flex shrink-0 justify-center'>
					{nav}
				</div>
			)}
			<div
				data-slot='app-header-actions'
				className={cn("flex shrink-0 items-center gap-3", nav && "min-w-0 flex-1 justify-end")}
			>
				{children}
			</div>
		</header>
	);
}

export { AppHeader, type AppHeaderProps };
