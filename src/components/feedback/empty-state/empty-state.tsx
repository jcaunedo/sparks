import * as React from "react";

import { cn } from "@/lib/utils";
import { Button, type ButtonProps } from "@/components/buttons/button";
import { Typography } from "@/components/typography/typography";

/*
 * Ported from verita-ucl's `EmptyState` (feedback/empty-state), same layout and API.
 * sparks.ds has no empty-state design yet (DESIGN.md → "Empty states").
 */

type EmptyStateProps = Omit<React.ComponentProps<"div">, "title"> & {
	/** Headline, e.g. "No connections yet". */
	title: string;
	/** Supporting line, e.g. "When connections are added, they'll show up here." */
	description?: string;
	/** Optional icon or illustration above the title. */
	icon?: React.ReactNode;
	/** Call-to-action text. Omit for no button. */
	buttonLabel?: string;
	/** Forwarded to the button (`onClick`, or `asChild` with a link). */
	buttonProps?: Omit<ButtonProps, "size" | "variant" | "children">;
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
	buttonLabel,
	buttonProps,
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
			{/* Icon, title and description 8px apart; the button sits 16px below the group. */}
			<div className='flex flex-col items-center gap-2'>
				{icon && (
					<div data-slot='empty-state-icon' className='flex items-center justify-center'>
						{icon}
					</div>
				)}
				<Typography as='h2' size='lg' weight='semibold' className='text-foreground'>
					{title}
				</Typography>
				{description && (
					<Typography size='base' className='text-muted-foreground'>
						{description}
					</Typography>
				)}
			</div>
			{buttonLabel && (
				<Button size='sm' {...buttonProps}>
					{buttonLabel}
				</Button>
			)}
		</div>
	);
}

export { EmptyState, type EmptyStateProps };
