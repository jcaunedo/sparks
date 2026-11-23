import * as React from "react";

import { Button } from "@/components/buttons/button";
import { cn } from "@/lib/utils";

type OutlineIconButtonProps = React.ComponentProps<typeof Button> & {
	/** What the button does, for screen readers ("Search ideas"). */
	label: string;
};

/**
 * Sparks's outline icon button: the start page's search. Figma "Button"
 * (Type=Icon, Style=Outlined, lg · 36): 36px tall, radius/button/lg (12px), shadow-xs, an 18px icon.
 * Layout-only until Button is synced from sparks.ds's "Button" set (ARCHITECTURE.md → "Layout-only parts").
 */
function OutlineIconButton({ label, className, children, ...props }: OutlineIconButtonProps) {
	return (
		<Button
			variant='outline'
			size='icon'
			aria-label={label}
			title={label}
			className={cn("rounded-button-lg text-icon shadow-xs [&_svg]:size-[18px]", className)}
			{...props}
		>
			{children}
		</Button>
	);
}

export { OutlineIconButton, type OutlineIconButtonProps };
