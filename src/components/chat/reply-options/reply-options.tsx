import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * One choice: what it's called (sent as the user's answer) and, under it, what it does: `steps` (a short list, e.g. a
 * plan) and `detail` (a muted line after them).
 */
type ReplyOption = { label: string; steps?: string[]; detail?: React.ReactNode };

type ReplyOptionsProps = Omit<React.ComponentProps<"div">, "children" | "ref" | "onSelect"> & {
	/** The choices, the recommended one first. Its label is what `onSelect` gets. */
	options: ReplyOption[];
	/** Picking one. */
	onSelect?: (label: string) => void;
	/** Names the group for screen readers ("What should Sparks do?"). */
	"aria-label"?: string;
};

/**
 * The choices under an assistant's question when they go further than yes or no (e.g. a fix, with more on top of it, and
 * "Fix all" last; the first can carry the plan itself as `steps`), read as a numbered list in the message: no container,
 * each option's title numbered ("1. Make this change") with a subtle underline that darkens on hover, what it does under
 * it. The whole option is the button; selecting it sends it. ↑/↓ move between the options. Not in sparks.ds yet.
 */
function ReplyOptions({ options, onSelect, className, ...props }: ReplyOptionsProps) {
	const listRef = React.useRef<HTMLDivElement>(null);

	const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
		if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
		const rows = Array.from(listRef.current?.querySelectorAll<HTMLButtonElement>("[data-slot='reply-option']") ?? []);
		const at = rows.indexOf(document.activeElement as HTMLButtonElement);
		if (at < 0) return;
		event.preventDefault();
		rows[(at + (event.key === "ArrowDown" ? 1 : -1) + rows.length) % rows.length]?.focus();
	};

	return (
		<div
			ref={listRef}
			role='group'
			data-slot='reply-options'
			className={cn("flex w-full flex-col gap-4", className)}
			onKeyDown={onKeyDown}
			{...props}
		>
			{options.map((option, index) => (
				<button
					key={option.label}
					type='button'
					data-slot='reply-option'
					onClick={() => onSelect?.(option.label)}
					className='group flex w-full cursor-pointer items-start gap-1.5 rounded-sm text-left text-base outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50'
				>
					{/* The number reads as a numbered list's ("1. Make this change"), in the title's style; what's under the
					    title lines up with its text. */}
					<span aria-hidden className='min-w-5 shrink-0 font-semibold text-foreground tabular-nums'>
						{index + 1}.
					</span>
					<span className='flex min-w-0 flex-1 flex-col gap-1'>
						<span className='self-start font-semibold text-foreground underline decoration-border-defined decoration-1 underline-offset-4 transition-colors motion-reduce:transition-none group-hover:decoration-foreground group-focus-visible:decoration-foreground'>
							{option.label}
						</span>
						{option.steps?.length ? (
							<span className='flex flex-col gap-1'>
								{option.steps.map((step) => (
									<span key={step} className='flex gap-2 text-foreground'>
										<span aria-hidden className='mt-2.5 size-1 shrink-0 rounded-full bg-icon-muted' />
										{step}
									</span>
								))}
							</span>
						) : null}
						{option.detail ? <span className='text-muted-foreground'>{option.detail}</span> : null}
					</span>
				</button>
			))}
		</div>
	);
}

export { ReplyOptions, type ReplyOption, type ReplyOptionsProps };
