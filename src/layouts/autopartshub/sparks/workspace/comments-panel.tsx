import * as React from "react";
import { ChevronLeft } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/data-display/avatar";
import { Badge } from "@/components/data-display/badge";
import { Button } from "@/components/buttons/button";
import { formatRelativeDate } from "@/lib/relative-date";
import { cn } from "@/lib/utils";

import type { PrototypeComment } from "../prototype/prototype-comments";
import { ReviewerList, viewTone, type Reviewer } from "../review/review-panel";
import { SidePanel } from "./side-panel";

type CommentsPanelProps = {
	/** The reviewers, with their status and, once given, their comment, view and why. Empty before the concept is in review. */
	reviewers: Reviewer[];
	/** Reviewers whose latest feedback she hasn't opened: they show the unread dot. */
	unread?: string[];
	/** She opened a reviewer's comment: it's read now. */
	onRead?: (id: string) => void;
	/** Dana's comments on the prototype ("Add comment"), under "On the prototype", newest first. */
	prototypeComments?: PrototypeComment[];
	/** Selecting one opens it on the prototype (its pin's popover); without it, they're only listed. */
	onOpenPrototypeComment?: (id: string) => void;
	onClose: () => void;
	/** Take focus when it opens (it only opens from "Comments"). */
	autoFocus?: boolean;
	className?: string;
};

/**
 * A comment on the prototype: her avatar, name and when, where it is (the path, the audience, the device, what she clicked), then
 * the comment. A button that opens its pin while the prototype is on screen.
 */
function PrototypeCommentRow({ comment, onOpen }: { comment: PrototypeComment; onOpen?: (id: string) => void }) {
	const time = formatRelativeDate(comment.createdAt);
	const where = [comment.path?.label, comment.scope.audienceLabel, comment.scope.device === "phone" ? "Phone" : "Desktop", comment.where ? `"${comment.where}"` : null]
		.filter(Boolean)
		.join(" · ");
	const content = (
		<>
			<Avatar className='size-8 shrink-0'>
				{comment.author.avatarSrc ? <AvatarImage src={comment.author.avatarSrc} alt='' /> : null}
				<AvatarFallback className='text-xs'>{comment.author.name.charAt(0)}</AvatarFallback>
			</Avatar>
			<span className='flex min-w-0 flex-1 flex-col gap-0.5'>
				<span className='flex items-baseline gap-2'>
					<span className='text-sm font-semibold text-foreground'>{comment.author.name}</span>
					<time dateTime={comment.createdAt} title={time.title} className='text-xs text-muted-foreground'>
						{time.label}
					</time>
				</span>
				<span className='truncate text-xs text-muted-foreground'>{where}</span>
				<span className='text-sm whitespace-pre-line text-foreground'>{comment.text}</span>
			</span>
		</>
	);
	const classes = "flex w-full items-start gap-3 rounded-lg px-2 py-2.5 text-start";
	return onOpen ? (
		<button type='button' className={cn(classes, "outline-none hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring")} onClick={() => onOpen(comment.id)}>
			{content}
		</button>
	) : (
		<div className={classes}>{content}</div>
	);
}

/**
 * "Comments" (prds/sparks.md, "The concept workspace"): the reviewers' feedback beside the conversation, in the same
 * frame as any side panel (`SidePanel`). The list is Review's (`ReviewerList`); a reviewer who has commented or given
 * their view opens their comment, with the unread dot while it's new. Under "On the prototype", Dana's comments pinned on
 * the prototype, each opening its pin. Not in Figma yet.
 */
function CommentsPanel({
	reviewers,
	unread = [],
	onRead,
	prototypeComments = [],
	onOpenPrototypeComment,
	onClose,
	autoFocus,
	className,
}: CommentsPanelProps) {
	const [openId, setOpenId] = React.useState<string | undefined>(undefined);
	const open = reviewers.find((reviewer) => reviewer.id === openId);
	const backRef = React.useRef<HTMLButtonElement>(null);
	const listFocus = React.useRef<string | undefined>(undefined);
	const given = reviewers.filter((reviewer) => reviewer.status === "view").length;

	const openComment = (id: string) => {
		setOpenId(id);
		onRead?.(id);
	};
	const backToList = () => {
		listFocus.current = openId;
		setOpenId(undefined);
	};
	// Opening a comment puts focus on "All comments"; going back, on the reviewer it came from.
	React.useEffect(() => {
		if (open) backRef.current?.focus();
	}, [open]);

	return (
		<SidePanel title='Comments' closeLabel='Close comments' onClose={onClose} autoFocus={autoFocus} className={className} bodyClassName='gap-4'>
			{open ? (
				<article aria-label={`${open.department}'s comment`} className='flex flex-col gap-4'>
					<Button ref={backRef} variant='link' className='h-auto w-fit gap-1 p-0 font-semibold text-link' onClick={backToList}>
						<ChevronLeft aria-hidden />
						All comments
					</Button>
					<div className='flex flex-col gap-1'>
						<div className='flex flex-wrap items-center gap-2'>
							<h3 className='text-base font-semibold text-foreground'>{open.department}</h3>
							{open.status === "view" && open.view ? (
								<Badge variant='flat' tone={viewTone[open.view]} size='xxs'>
									{open.view}
								</Badge>
							) : null}
						</div>
						<p className='text-xs text-muted-foreground'>Evaluates {open.evaluates}</p>
					</div>
					{open.comment ? <p className='text-sm text-foreground'>{open.comment}</p> : null}
					{open.status === "view" && open.why && open.why !== open.comment ? (
						<div className='flex flex-col gap-1'>
							<p className='text-xs text-muted-foreground'>Their view</p>
							<p className='text-sm text-foreground'>"{open.why}"</p>
						</div>
					) : null}
					{open.status === "commented" ? <p className='text-xs text-muted-foreground'>Their view on whether it should advance is still to come.</p> : null}
				</article>
			) : reviewers.length || prototypeComments.length ? (
				<>
					{reviewers.length ? (
						<section aria-labelledby='comments-reviewers' className='flex flex-col gap-3'>
							<h3 id='comments-reviewers' className='text-sm font-semibold text-foreground'>
								Reviewers
							</h3>
							<p className='text-sm text-muted-foreground'>
								{given === reviewers.length
									? "Every reviewer has given their view."
									: `${given} of ${reviewers.length} reviewers have given their view.`}
							</p>
							<div
								ref={(element) => {
									// Back from a comment: focus the reviewer it came from.
									if (!element || !listFocus.current) return;
									const index = reviewers.findIndex((reviewer) => reviewer.id === listFocus.current);
									listFocus.current = undefined;
									element.querySelectorAll("li")[index]?.querySelector("button")?.focus();
								}}
							>
								<ReviewerList reviewers={reviewers} unread={unread} onOpen={openComment} />
							</div>
						</section>
					) : null}
					{prototypeComments.length ? (
						<section aria-labelledby='comments-prototype' className={cn("flex flex-col gap-1", reviewers.length && "border-t border-border pt-4")}>
							<h3 id='comments-prototype' className='pb-2 text-sm font-semibold text-foreground'>
								On the prototype
							</h3>
							<ul className='flex flex-col gap-0.5'>
								{[...prototypeComments].reverse().map((comment) => (
									<li key={comment.id}>
										<PrototypeCommentRow comment={comment} onOpen={onOpenPrototypeComment} />
									</li>
								))}
							</ul>
						</section>
					) : null}
				</>
			) : (
				<div className='flex flex-col gap-1'>
					<p className='text-sm font-medium text-foreground'>No comments yet</p>
					<p className='text-sm text-muted-foreground'>Comments you add on the prototype, and reviewers' feedback in Review, show up here.</p>
				</div>
			)}
		</SidePanel>
	);
}

export { CommentsPanel, type CommentsPanelProps };
