import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

import { Button } from "@/components/buttons/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/overlays/tooltip";
import { cn } from "@/lib/utils";

/*
 * shadcn/ui's Dialog (new-york-v4) on Radix. Corners from sparks.ds: radius/menu/container (16px, `rounded-menu`), as
 * Popover; the close button is the side panels' (ghost icon button, its name in a tooltip). Not in sparks.ds yet.
 */

/** A window in the middle of the screen, over everything else (`Dialog` > `DialogTrigger` + `DialogContent`). */
function Dialog({ ...props }: React.ComponentProps<typeof DialogPrimitive.Root>) {
	return <DialogPrimitive.Root data-slot='dialog' {...props} />;
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
	return (
		<DialogPrimitive.Overlay
			data-slot='dialog-overlay'
			className={cn(
				"fixed inset-0 z-50 bg-black/50 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0",
				className,
			)}
			{...props}
		/>
	);
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
	return (
		<DialogPortal>
			<DialogOverlay />
			<DialogPrimitive.Content
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
					"fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-menu border bg-background p-6 shadow-lg duration-200 outline-none data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 sm:max-w-lg",
					className,
				)}
				{...props}
			>
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
			</DialogPrimitive.Content>
		</DialogPortal>
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
