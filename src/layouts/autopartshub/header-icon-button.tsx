import * as React from "react";

import { Button } from "@/components/buttons/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/overlays/tooltip";
import { cn } from "@/lib/utils";

/**
 * An icon button in an AutoPartsHUB header: sparks.ds "Button" (Type=Icon, Style=Ghost, lg · 36), radius/button/lg, an
 * 18px icon in colors/icon/foreground. `dot`: the 8px sky dot at its top right (sparks.ds "header-autopartshub" →
 * "Sparks Project", the comments button's Ellipse, #0f9efe), for something new. Its name shows in a tooltip. The bell,
 * comments, and the prototype's toolbar.
 */
function HeaderIconButton({
	label,
	dot = false,
	className,
	children,
	tooltip,
	...props
}: Omit<React.ComponentProps<typeof Button>, "aria-label"> & {
	label: string;
	dot?: boolean;
	/** What the tooltip says, when it isn't `label` (e.g. "Versions (2)" has its own name). */
	tooltip?: React.ReactNode;
}) {
	// Its name shows in a tooltip, below it, on hover and keyboard focus (DESIGN.md → "Icon buttons have a tooltip").
	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<Button
					variant='ghost'
					size='icon'
					aria-label={dot ? `${label}, new` : label}
					className={cn("relative rounded-button-lg text-icon [&_svg]:size-[18px]", className)}
					{...props}
				>
					{children}
					{dot ? <span aria-hidden className='absolute top-0 right-0 size-2 rounded-full bg-(--sky-500)' /> : null}
				</Button>
			</TooltipTrigger>
			<TooltipContent side='bottom' sideOffset={6}>
				{tooltip ?? label}
			</TooltipContent>
		</Tooltip>
	);
}

export { HeaderIconButton };
