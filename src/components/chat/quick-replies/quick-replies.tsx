import * as React from "react";
import { Check, CornerDownLeft } from "lucide-react";

import { Button } from "@/components/buttons/button";
import { useEnterShortcut } from "@/lib/hooks/use-enter-shortcut";
import { scrollContainerOf, scrollIntoViewSmoothly, scrollMetrics, useMotionPreference } from "@/lib/motion";
import { cn } from "@/lib/utils";

type QuickRepliesProps = Omit<React.ComponentProps<"div">, "children" | "ref"> & {
	/** The likely answers, the main one ("Yes, that's right", "Build it") first. */
	replies: string[];
	/** Picking one. */
	onReply?: (reply: string) => void;
	/**
	 * The first reply is the "continue": it shows the ↵ key and Enter picks it, while focus is on the page or in the empty
	 * message box; out of view, Enter scrolls to the replies first. On by default; turn it off when another set of replies on the screen has it.
	 */
	enter?: boolean;
	/**
	 * The reply picked before, while the user changes an answer: it shows a check after its label (a 16px `Check` in
	 * `text-icon-muted`) and `aria-pressed`. Picking it again keeps that answer.
	 */
	selected?: string;
};

/**
 * The answers under an assistant's question (sparks.ds "ctas"): Button Outlined, 36px, 14px sides, sm semibold,
 * radius/button/lg, shadow-xs, 10px apart, on the right. The first reply (the "continue") is last, at the right edge, with
 * the ↵ key after its label; the order on screen is the order in the page, so Tab follows it.
 */
function QuickReplies({ replies, onReply, enter = true, selected, className, ...props }: QuickRepliesProps) {
	const main = replies[0];
	const { prefersReducedMotion } = useMotionPreference();
	const rowRef = React.useRef<HTMLDivElement>(null);
	useEnterShortcut(
		enter && main !== undefined && onReply
			? () => {
					// Out of view, Enter brings the replies into view instead: it never answers a question she can't see.
					const row = rowRef.current;
					if (row) {
						const view = scrollMetrics(scrollContainerOf(row));
						const box = row.getBoundingClientRect();
						if (box.top < view.top || box.bottom > view.bottom) {
							scrollIntoViewSmoothly(row, { reducedMotion: Boolean(prefersReducedMotion) });
							return;
						}
					}
					onReply(main);
				}
			: undefined,
	);
	return (
		<div ref={rowRef} data-slot='quick-replies' className={cn("flex w-full flex-wrap justify-end gap-2.5", className)} {...props}>
			{[...replies].reverse().map((reply) => {
				const isMain = enter && reply === main;
				const isSelected = selected !== undefined && reply === selected;
				return (
					<Button
						key={reply}
						variant='outline'
						// The main reply: the label's 14px on the left, the key's 10px on the right (Figma: 8px padding, the icon's 2px).
						className={cn("rounded-button-lg px-3.5 text-sm font-semibold text-foreground shadow-xs", isMain && "pe-2.5")}
						aria-keyshortcuts={isMain ? "Enter" : undefined}
						aria-pressed={selected !== undefined ? isSelected : undefined}
						onClick={() => onReply?.(reply)}
					>
						{reply}
						{isSelected ? <Check aria-hidden className='text-icon-muted' /> : null}
						{isMain ? <CornerDownLeft aria-hidden /> : null}
					</Button>
				);
			})}
		</div>
	);
}

export { QuickReplies, type QuickRepliesProps };
