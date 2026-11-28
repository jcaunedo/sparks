import * as React from "react";

import { cn } from "@/lib/utils";
import { Button, type ButtonProps } from "@/components/buttons/button";
import { Typography } from "@/components/typography/typography";

/*
 * Ported from verita-ucl's `EmptyState` (feedback/empty-state), same layout and API.
 * sparks.ds has no empty-state design yet (DESIGN.md → "Empty states").
 */

type EmptyStateProps = Omit<React.ComponentProps<"div">, "title" | "children"> & {
	/** Headline, e.g. "No connections yet". A line break ("\n") starts a new line. */
	title: string;
	/** Supporting line, e.g. "When connections are added, they'll show up here." */
	description?: string;
	/** Optional icon or illustration above the title. */
	icon?: React.ReactNode;
	/** Optional content between the text and the buttons, e.g. the prototype the action is about. */
	children?: React.ReactNode;
	/** Call-to-action text. Omit for no button. */
	buttonLabel?: string;
	/** Forwarded to the button (`onClick`, or `asChild` with a link). */
	buttonProps?: Omit<ButtonProps, "size" | "variant" | "children">;
	/** A second, outlined button before the main one, e.g. "Back to Prototype" beside "Run evaluation". */
	secondaryButtonLabel?: string;
	/** Forwarded to the second button. */
	secondaryButtonProps?: Omit<ButtonProps, "size" | "variant" | "children">;
};

/**
 * A centered message for a view, tab or filter with nothing to show: optional icon, title,
 * description and an optional button. Every empty view uses this layout; only the copy changes.
 * Centers itself in the space its parent gives it: pass `className='flex-1'` or a height to fill a panel.
 */
function EmptyState({
	title,
	description,
	icon,
	children,
	buttonLabel,
	buttonProps,
	secondaryButtonLabel,
	secondaryButtonProps,
	className,
	...props
}: EmptyStateProps) {
	return (
		<div
			data-slot='empty-state'
			className={cn(
				"flex w-full flex-col items-center justify-center gap-4 text-center",
				className,
			)}
			{...props}
		>
			{/* Icon, title and description 8px apart, the text at most 720px wide (480px wrapped a
			    short description into four lines); the button sits 16px below the group. */}
			<div className='flex max-w-[720px] flex-col items-center gap-2'>
				{icon && (
					<div data-slot='empty-state-icon' className='flex items-center justify-center'>
						{icon}
					</div>
				)}
				<Typography as='h2' size='lg' weight='semibold' className='whitespace-pre-line text-foreground'>
					{title}
				</Typography>
				{description && (
					<Typography size='base' className='text-muted-foreground'>
						{description}
					</Typography>
				)}
			</div>
			{children}
			{/* The main action last, the second one 8px before it (as Cancel before Save). */}
			{(buttonLabel || secondaryButtonLabel) && (
				<div className='flex flex-wrap items-center justify-center gap-2'>
					{secondaryButtonLabel && (
						<Button variant='outline' {...secondaryButtonProps}>
							{secondaryButtonLabel}
						</Button>
					)}
					{buttonLabel && (
						<Button variant='neutral' {...buttonProps}>
							{buttonLabel}
						</Button>
					)}
				</div>
			)}
		</div>
	);
}

export { EmptyState, type EmptyStateProps };
