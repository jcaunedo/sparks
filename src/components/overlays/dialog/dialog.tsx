import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { Button } from "@/components/buttons/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/overlays/tooltip";
import { dialogVariants, fadeVariants, overlayVariants, useMotionPreference } from "@/lib/motion";
import { cn } from "@/lib/utils";

/*
 * shadcn/ui's Dialog (new-york-v4) on Radix. Corners from sparks.ds: radius/menu/container (16px, `rounded-menu`), as
 * Popover; the close button is the side panels' (ghost icon button, its name in a tooltip). Not in sparks.ds yet.
 */

/** Whether the dialog is open, for `DialogContent` to play its way out before it unmounts (MOTION.md → Dialogs). */
const DialogOpenContext = React.createContext(false);

/** A window in the middle of the screen, over everything else (`Dialog` > `DialogTrigger` + `DialogContent`). */
function Dialog({ open: openProp, defaultOpen = false, onOpenChange, ...props }: React.ComponentProps<typeof DialogPrimitive.Root>) {
	// Controlled or not, it knows whether it's open, so its content can animate out instead of vanishing.
	const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
	const open = openProp ?? uncontrolledOpen;
	const setOpen = (next: boolean) => {
		if (openProp === undefined) setUncontrolledOpen(next);
		onOpenChange?.(next);
	};
	return (
		<DialogOpenContext.Provider value={open}>
			<DialogPrimitive.Root data-slot='dialog' open={open} onOpenChange={setOpen} {...props} />
		</DialogOpenContext.Provider>
	);
}

function DialogTrigger({ ...props }: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
	return <DialogPrimitive.Trigger data-slot='dialog-trigger' {...props} />;
}

function DialogPortal({ ...props }: React.ComponentProps<typeof DialogPrimitive.Portal>) {
	return <DialogPrimitive.Portal data-slot='dialog-portal' {...props} />;
}

function DialogClose({ ...props }: React.ComponentProps<typeof DialogPrimitive.Close>) {
	return <DialogPrimitive.Close data-slot='dialog-close' {...props} />;
}

function DialogOverlay({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
	return <DialogPrimitive.Overlay data-slot='dialog-overlay' className={cn("fixed inset-0 z-50 bg-black/50", className)} {...props} />;
}

function DialogContent({
	className,
	children,
	showCloseButton = true,
	onOpenAutoFocus,
	...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
	/** The X at the top right. */
	showCloseButton?: boolean;
}) {
	const open = React.useContext(DialogOpenContext);
	const { prefersReducedMotion } = useMotionPreference();
	// Mounted while it plays out (`forceMount`): the scrim fades and the window grows in from 95% as it fades in, then
	// the reverse, shorter, as it closes (`dialogVariants`). Reduced motion: both just fade.
	return (
		<AnimatePresence>
			{open ? (
				<DialogPortal forceMount>
					<DialogOverlay forceMount asChild>
						<motion.div variants={overlayVariants} initial='initial' animate='animate' exit='exit' />
					</DialogOverlay>
					<DialogPrimitive.Content
						forceMount
						asChild
						data-slot='dialog-content'
						// Opening it puts focus on the dialog itself, not its close button, whose tooltip would open on focus.
						onOpenAutoFocus={
							onOpenAutoFocus ??
							((event) => {
								event.preventDefault();
								(event.currentTarget as HTMLElement).focus();
							})
						}
						className={cn(
							// Centered with `translate` (Tailwind 4's own property), so Motion's `scale` (on `transform`) adds to it.
							"fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-menu border bg-background p-6 shadow-lg outline-none sm:max-w-lg",
							className,
						)}
						{...props}
					>
						<motion.div variants={prefersReducedMotion ? fadeVariants : dialogVariants} initial='initial' animate='animate' exit='exit'>
							{children}
							{showCloseButton ? (
								<Tooltip>
									<TooltipTrigger asChild>
										<DialogPrimitive.Close asChild>
											<Button
												variant='ghost'
												size='icon'
												aria-label='Close'
												className='absolute top-3.5 right-3.5 text-icon [&_svg]:size-[18px]'
											>
												<X aria-hidden />
											</Button>
										</DialogPrimitive.Close>
									</TooltipTrigger>
									<TooltipContent side='bottom' sideOffset={6}>
										Close
									</TooltipContent>
								</Tooltip>
							) : null}
						</motion.div>
					</DialogPrimitive.Content>
				</DialogPortal>
			) : null}
		</AnimatePresence>
	);
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
	return <div data-slot='dialog-header' className={cn("flex flex-col gap-2 pe-10 text-left", className)} {...props} />;
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
	return <div data-slot='dialog-footer' className={cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)} {...props} />;
}

function DialogTitle({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Title>) {
	return <DialogPrimitive.Title data-slot='dialog-title' className={cn("text-lg font-semibold text-foreground", className)} {...props} />;
}

function DialogDescription({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Description>) {
	return <DialogPrimitive.Description data-slot='dialog-description' className={cn("text-sm text-muted-foreground", className)} {...props} />;
}

export {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogOverlay,
	DialogPortal,
	DialogTitle,
	DialogTrigger,
};
