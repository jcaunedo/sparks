import * as React from "react";
import { PanelRight } from "lucide-react";

import { Button } from "@/components/buttons/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/overlays/tooltip";
import { Typography } from "@/components/typography/typography";
import { cn } from "@/lib/utils";

type SidePanelProps = {
	/** Its heading, e.g. "Comments". */
	title: string;
	/** Buttons before the close button. */
	actions?: React.ReactNode;
	/** The close button's name, e.g. "Close blueprint". */
	closeLabel: string;
	onClose: () => void;
	/** Take focus when it opens (the close button): when she opened it, not when it opened on its own. */
	autoFocus?: boolean;
	/** Classes for the white card that holds the content, e.g. its gap. */
	bodyClassName?: string;
	className?: string;
	children: React.ReactNode;
};

/**
 * A panel beside the conversation (Comments). Figma Sparks → "Sparks Project" (55:7660): on
 * background-subtle with 16px corners, the title (lg semibold) and its buttons in a 60px row, the close button last (the
 * panel icon), then a white card (12px corners, 32px padding) that scrolls. Esc closes it too, from inside.
 */
function SidePanel({ title, actions, closeLabel, onClose, autoFocus = false, bodyClassName, className, children }: SidePanelProps) {
	const titleId = React.useId();
	const closeRef = React.useRef<HTMLButtonElement>(null);
	React.useEffect(() => {
		if (autoFocus) closeRef.current?.focus();
	}, [autoFocus]);
	return (
		<section
			aria-labelledby={titleId}
			className={cn("flex min-h-0 flex-1 flex-col overflow-clip rounded-card bg-background-subtle", className)}
			onKeyDown={(event) => {
				if (event.key === "Escape") {
					event.stopPropagation();
					onClose();
				}
			}}
		>
			{/* Figma "output": 12px top and bottom, 21px sides; the buttons 12px apart, at 60% opacity. */}
			<div className='flex shrink-0 items-center justify-between gap-3 px-[21px] py-3'>
				<Typography as='h2' id={titleId} size='lg' weight='semibold' className='text-foreground'>
					{title}
				</Typography>
				<div className='flex items-center gap-3'>
					{actions}
					{/* Figma "Button" (Type=Icon, Style=Ghost, lg · 36), the panel icon: hides the panel. */}
					<Tooltip>
						<TooltipTrigger asChild>
							<Button ref={closeRef} variant='ghost' size='icon' aria-label={closeLabel} className={sidePanelButtonClasses} onClick={onClose}>
								<PanelRight aria-hidden />
							</Button>
						</TooltipTrigger>
						<TooltipContent side='bottom' sideOffset={6}>
							Close
						</TooltipContent>
					</Tooltip>
				</div>
			</div>
			<div className='flex min-h-0 flex-1 flex-col px-6 pb-6'>
				<div className={cn("scrollbar-subtle flex min-h-0 flex-1 flex-col overflow-y-auto rounded-avatar-square bg-background p-8", bodyClassName)}>
					{children}
				</div>
			</div>
		</section>
	);
}

/** The panel row's icon buttons: ghost, 36px, an 18px icon, 60% opacity until hovered, focused or open. */
const sidePanelButtonClasses =
	"rounded-button-lg text-icon opacity-60 hover:opacity-100 focus-visible:opacity-100 data-[state=open]:opacity-100 [&_svg]:size-[18px]";

export { SidePanel, sidePanelButtonClasses, type SidePanelProps };
