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
	/** An icon before a reply's label, by reply: `{ "Attach files": <Paperclip /> }` (an svg component; decorative). */
	icons?: Record<string, React.ReactElement<React.SVGProps<SVGSVGElement>>>;
	/** One reply per row, on the right, the main one last: for a narrow conversation, where a row would wrap unevenly. */
	onePerRow?: boolean;
};

/**
 * The answers under an assistant's question (sparks.ds "ctas"): Button Outlined, 36px, 14px sides, sm semibold,
 * radius/button/lg, shadow-xs, 10px apart, on the right. The first reply (the "continue") is last, at the right edge, with
 * the ↵ key after its label; the order on screen is the order in the page, so Tab follows it.
 */
function QuickReplies({ replies, onReply, enter = true, selected, icons, onePerRow = false, className, ...props }: QuickRepliesProps) {
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
		<div ref={rowRef} data-slot='quick-replies' className={cn("flex w-full gap-2.5", onePerRow ? "flex-col items-end" : "flex-wrap justify-end", className)} {...props}>
			{[...replies].reverse().map((reply) => {
				const isMain = enter && reply === main;
				const isSelected = selected !== undefined && reply === selected;
				return (
					<Button
						key={reply}
						variant='outline'
						aria-keyshortcuts={isMain ? "Enter" : undefined}
						aria-pressed={selected !== undefined ? isSelected : undefined}
						onClick={() => onReply?.(reply)}
					>
						{icons?.[reply]
							? React.cloneElement(icons[reply], { "aria-hidden": true, "data-icon": "inline-start" } as React.SVGProps<SVGSVGElement>)
							: null}
						{reply}
						{isSelected ? <Check aria-hidden className='text-icon-muted' /> : null}
						{isMain ? <CornerDownLeft aria-hidden data-icon='inline-end' /> : null}
					</Button>
				);
			})}
		</div>
	);
}

export { QuickReplies, type QuickRepliesProps };
