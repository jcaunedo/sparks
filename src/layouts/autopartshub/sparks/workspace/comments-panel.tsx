import * as React from "react";
import { ChevronLeft, CircleCheck, ListFilter, MessageSquare } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/data-display/avatar";
import { Badge } from "@/components/data-display/badge";
import { Button } from "@/components/buttons/button";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/overlays/dropdown-menu";
import { formatRelativeDate } from "@/lib/relative-date";
import { cn } from "@/lib/utils";

import { MentionText, type PrototypeComment } from "../prototype/prototype-comments";
import { ReviewerList, ReviewerStatus, type IdeaComment, type Reviewer } from "../review/review-panel";
import { HeaderIconButton } from "../../header-icon-button";
import { SidePanel } from "./side-panel";

type CommentsPanelProps = {
	/** The reviewers, with their status and, once given, their comment, view and why. Empty before the concept is in review. */
	reviewers: Reviewer[];
	/** What she hasn't opened, by id: the reviewers with new feedback, and the new comments on the prototype. They show the unread dot. */
	unread?: string[];
	/** She opened a reviewer's comment: it's read now. */
	onRead?: (id: string) => void;
	/**
	 * The comments pinned on the prototype, hers and the reviewers' (a reviewer's `author.role` is their team), under "On
	 * the prototype": open ones newest first, then "Resolved". Each reviewer's also show when their comment is opened.
	 */
	prototypeComments?: PrototypeComment[];
	/** Selecting one opens it on the prototype (its pin's thread, to read, reply or resolve); without it, they're only listed. */
	onOpenPrototypeComment?: (id: string) => void;
	/** The reviewers' comments on parts of the idea, under "On the idea", newest first, and in each reviewer's comment. */
	ideaComments?: IdeaComment[];
	/** Selecting one opens its part in Review, brought into view. */
	onOpenIdeaComment?: (id: string) => void;
	onClose: () => void;
	/** Take focus when it opens (it only opens from "Comments"). */
	autoFocus?: boolean;
	className?: string;
};

/**
 * Which comments the Comments panel shows (prds/sparks-review.md, "Comments on the idea"): open and resolved ones, on
 * the idea and on the prototype. Resolved ones are hidden to start.
 */
type CommentFilters = { open: boolean; resolved: boolean; idea: boolean; prototype: boolean };
const defaultCommentFilters: CommentFilters = { open: true, resolved: false, idea: true, prototype: true };

/** Whether a comment shows with these filters: its state (open or resolved) and where it is. */
const showsComment = (filters: CommentFilters, comment: { resolved?: boolean }, where: "idea" | "prototype") =>
	filters[where] && (comment.resolved ? filters.resolved : filters.open);

/**
 * The filters, from an icon beside the Comments panel's X (where "Add comment" was): a menu of checkboxes, "Show"
 * (Open, Resolved) and "Where" (On the idea, On the prototype). The dot shows while they differ from the start.
 */
function CommentFiltersMenu({ filters, onChange }: { filters: CommentFilters; onChange: (filters: CommentFilters) => void }) {
	const changed = (Object.keys(defaultCommentFilters) as (keyof CommentFilters)[]).some((key) => filters[key] !== defaultCommentFilters[key]);
	const item = (key: keyof CommentFilters, label: string) => (
		<DropdownMenuCheckboxItem
			checked={filters[key]}
			onCheckedChange={(on) => onChange({ ...filters, [key]: Boolean(on) })}
			// Choosing one keeps the menu open, to set the others.
			onSelect={(event) => event.preventDefault()}
		>
			{label}
		</DropdownMenuCheckboxItem>
	);
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<HeaderIconButton label='Filter comments' tooltip='Filter' dot={changed}>
					<ListFilter aria-hidden />
				</HeaderIconButton>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end' className='min-w-[200px]'>
				<DropdownMenuLabel>Show</DropdownMenuLabel>
				{item("open", "Open")}
				{item("resolved", "Resolved")}
				<DropdownMenuSeparator />
				<DropdownMenuLabel>Where</DropdownMenuLabel>
				{item("idea", "On the idea")}
				{item("prototype", "On the prototype")}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

/** Two initials, as on the comment's pin, so the avatar's color matches it (Avatar picks the color from them). */
const initialsOf = (name: string) =>
	name
		.split(/\s+/)
		.map((word) => word.charAt(0))
		.slice(0, 2)
		.join("")
		.toUpperCase();

/**
 * A comment on the prototype: her avatar, name and when, where it is (the path, the audience, the device, what she clicked), then
 * the comment. A button that opens its pin while the prototype is on screen.
 */
function PrototypeCommentRow({ comment, unread = false, onOpen }: { comment: PrototypeComment; unread?: boolean; onOpen?: (id: string) => void }) {
	const replies = comment.replies?.length ?? 0;
	const time = formatRelativeDate(comment.createdAt);
	const where = [comment.path?.label, comment.scope.audienceLabel, comment.scope.device === "phone" ? "Phone" : "Desktop", comment.where ? `"${comment.where}"` : null]
		.filter(Boolean)
		.join(" · ");
	const content = (
		<>
			{/* New, not opened yet: the reviewers' unread dot, before it. */}
			{unread ? (
				<span className='absolute top-5.5 -left-1.5 size-2 rounded-full bg-(--sky-500)'>
					<span className='sr-only'>New: </span>
				</span>
			) : null}
			<Avatar className='size-8 shrink-0'>
				{comment.author.avatarSrc ? <AvatarImage src={comment.author.avatarSrc} alt='' /> : null}
				<AvatarFallback className='text-xs'>{initialsOf(comment.author.name)}</AvatarFallback>
			</Avatar>
			<span className='flex min-w-0 flex-1 flex-col gap-0.5'>
				<span className='flex items-baseline gap-2'>
					<span className='text-sm font-semibold text-foreground'>{comment.author.name}</span>
					{comment.author.role ? <span className='text-xs text-muted-foreground'>{comment.author.role}</span> : null}
					<time dateTime={comment.createdAt} title={time.title} className='text-xs text-muted-foreground'>
						{time.label}
					</time>
				</span>
				<span className='truncate text-xs text-muted-foreground'>{where}</span>
				<span className={cn("text-sm whitespace-pre-line", comment.resolved ? "text-muted-foreground" : "text-foreground")}>
					<MentionText text={comment.text} mentions={comment.mentions} />
				</span>
				{/* The thread: how many replies, and whether it's resolved. */}
				{replies || comment.resolved ? (
					<span className='flex items-center gap-3 pt-0.5 text-xs text-muted-foreground'>
						{replies ? (
							<span className='flex items-center gap-1 text-link'>
								<MessageSquare aria-hidden className='size-3.5' />
								{replies} {replies === 1 ? "reply" : "replies"}
							</span>
						) : null}
						{comment.resolved ? (
							<span className='flex items-center gap-1 text-success'>
								<CircleCheck aria-hidden className='size-3.5' />
								Resolved
							</span>
						) : null}
					</span>
				) : null}
			</span>
		</>
	);
	const classes = "relative flex w-full items-start gap-3 rounded-lg px-2 py-2.5 text-start";
	return onOpen ? (
		<button type='button' className={cn(classes, "outline-none hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring")} onClick={() => onOpen(comment.id)}>
			{content}
		</button>
	) : (
		<div className={classes}>{content}</div>
	);
}

/** A reviewer's comment on a part of the idea: who, their team, when, which part, the text, and "Unclear". Opens the part in Review. */
function IdeaCommentRow({ comment, onOpen }: { comment: IdeaComment; onOpen?: (id: string) => void }) {
	const time = formatRelativeDate(comment.createdAt);
	const content = (
		<>
			<Avatar className='size-8 shrink-0'>
				{comment.author.avatarSrc ? <AvatarImage src={comment.author.avatarSrc} alt='' /> : null}
				<AvatarFallback className='text-xs'>{initialsOf(comment.author.name)}</AvatarFallback>
			</Avatar>
			<span className='flex min-w-0 flex-1 flex-col gap-0.5'>
				<span className='flex items-baseline gap-2'>
					<span className='text-sm font-semibold text-foreground'>{comment.author.name}</span>
					{comment.author.role ? <span className='text-xs text-muted-foreground'>{comment.author.role}</span> : null}
					<time dateTime={comment.createdAt} title={time.title} className='text-xs text-muted-foreground'>
						{time.label}
					</time>
				</span>
				<span className='truncate text-xs text-muted-foreground'>On "{comment.part}"</span>
				{/* The text it's about, when it started from a selection. */}
				{comment.quote ? <span className='line-clamp-2 border-s-2 border-border-defined ps-2 text-xs text-muted-foreground'>{comment.quote}</span> : null}
				<span className='text-sm whitespace-pre-line text-foreground'>{comment.text}</span>
				{comment.unclear ? (
					<span className='pt-0.5'>
						<Badge variant='flat' tone='amber' size='xxs'>
							Unclear
						</Badge>
					</span>
				) : null}
				{comment.addressed ? (
					<span className='flex items-start gap-1 pt-0.5 text-xs text-muted-foreground'>
						<CircleCheck aria-hidden className='mt-px size-3.5 shrink-0 text-success' />
						<span>
							<span className='font-medium text-success'>Addressed.</span> {comment.addressed}
						</span>
					</span>
				) : null}
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
 * "Comments" (prds/sparks.md, "The concept workspace"): the reviewers' feedback, in a column on the right edge
 * (`SidePanel`, as Figma's "Plan summary", 63:12460): each section's title lg semibold, a line and 24px between sections. The list is Review's (`ReviewerList`); a reviewer who has commented or given
 * their view opens their comment, with the unread dot while it's new.Under "On the prototype", the comments pinned on
 * the prototype (hers and the reviewers'), open first, then resolved, each opening its thread on the prototype. Not in Figma yet.
 */
function CommentsPanel({
	reviewers,
	unread = [],
	onRead,
	prototypeComments = [],
	onOpenPrototypeComment,
	ideaComments = [],
	onOpenIdeaComment,
	onClose,
	autoFocus,
	className,
}: CommentsPanelProps) {
	const [openId, setOpenId] = React.useState<string | undefined>(undefined);
	const open = reviewers.find((reviewer) => reviewer.id === openId);
	const backRef = React.useRef<HTMLButtonElement>(null);
	const listFocus = React.useRef<string | undefined>(undefined);
	const given = reviewers.filter((reviewer) => reviewer.status === "view").length;
	// What a reviewer wrote: by the person, not their team (a team has several reviewers).
	const pinsBy = (name: string) => prototypeComments.filter((comment) => comment.author.name === name);
	const ideaBy = (name: string) => ideaComments.filter((comment) => comment.author.name === name);
	const [filters, setFilters] = React.useState(defaultCommentFilters);
	const newestIdea = [...ideaComments].reverse().filter((comment) => showsComment(filters, comment, "idea"));
	const openPins = [...prototypeComments].reverse().filter((comment) => !comment.resolved && showsComment(filters, comment, "prototype"));
	const resolvedPins = [...prototypeComments].reverse().filter((comment) => comment.resolved && showsComment(filters, comment, "prototype"));

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
		<SidePanel
			title='Comments'
			// Filters beside the X; adding a comment is on what it's about (the prototype's toolbar, the idea's header).
			actions={<CommentFiltersMenu filters={filters} onChange={setFilters} />}
			closeLabel='Close comments'
			onClose={onClose}
			autoFocus={autoFocus}
			className={className}
			bodyClassName='gap-6'
		>
			{open ? (
				<article aria-label={`${open.name}'s comment`} className='flex flex-col gap-4'>
					<Button ref={backRef} variant='link' className='h-auto w-fit gap-1 p-0 font-semibold text-link' onClick={backToList}>
						<ChevronLeft aria-hidden />
						All comments
					</Button>
					<div className='flex flex-col gap-1'>
						{/* The name, and their team right under it, no gap, as in Share's lists. */}
						<div>
							<h3 className='text-base font-semibold text-foreground'>{open.name}</h3>
							<p className='text-xs text-muted-foreground'>
								{open.department} · Evaluates {open.evaluates}
							</p>
						</div>
						{/* Where they stand, under their team, 6px below it, as in the list. */}
						<span className='flex pt-0.5'>
							<ReviewerStatus reviewer={open} size='xs' />
						</span>
					</div>
					{open.comment ? <p className='text-sm text-foreground'>{open.comment}</p> : null}
					{open.status === "view" && open.why && open.why !== open.comment ? (
						<div className='flex flex-col gap-1'>
							<p className='text-xs text-muted-foreground'>Their view</p>
							<p className='text-sm text-foreground'>"{open.why}"</p>
						</div>
					) : null}
						{open.status === "commented" ? <p className='text-xs text-muted-foreground'>Their view on whether it should advance is still to come.</p> : null}
						{/* What they said on parts of the idea: each opens its part in Review. */}
						{ideaBy(open.name).length ? (
							<section aria-labelledby='comments-their-parts' className='flex flex-col gap-1 border-t border-border pt-4'>
								<h4 id='comments-their-parts' className='pb-1 text-sm font-semibold text-foreground'>
									On the idea
								</h4>
								<ul className='flex flex-col gap-0.5'>
									{ideaBy(open.name).map((comment) => (
										<li key={comment.id}>
											<IdeaCommentRow comment={comment} onOpen={onOpenIdeaComment} />
										</li>
									))}
								</ul>
							</section>
						) : null}
						{/* What they pinned on the prototype: each opens its thread there. */}
						{pinsBy(open.name).length ? (
							<section aria-labelledby='comments-their-pins' className='flex flex-col gap-1 border-t border-border pt-4'>
								<h4 id='comments-their-pins' className='pb-1 text-sm font-semibold text-foreground'>
									On the prototype
								</h4>
								<ul className='flex flex-col gap-0.5'>
									{pinsBy(open.name).map((comment) => (
										<li key={comment.id}>
											<PrototypeCommentRow comment={comment} unread={unread.includes(comment.id)} onOpen={onOpenPrototypeComment} />
										</li>
									))}
								</ul>
							</section>
						) : null}
					</article>
			) : reviewers.length || prototypeComments.length || ideaComments.length ? (
				<>
					{reviewers.length ? (
						<section aria-labelledby='comments-reviewers' className='flex flex-col gap-2'>
							<h3 id='comments-reviewers' className='text-lg font-semibold text-foreground'>
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
								<ReviewerList
									reviewers={reviewers}
									unread={unread}
									onOpen={openComment}
									notes={Object.fromEntries(
										reviewers.map((reviewer) => {
											const onIdea = ideaBy(reviewer.name).length;
											const onPrototype = pinsBy(reviewer.name).filter((comment) => !comment.resolved).length;
											const lines = [
												onIdea ? `${onIdea} ${onIdea === 1 ? "comment" : "comments"} on the idea` : "",
												onPrototype ? `${onPrototype} open on the prototype` : "",
											].filter(Boolean);
											return [reviewer.id, lines.join(" · ")];
										}),
									)}
								/>
							</div>
						</section>
					) : null}
					{newestIdea.length ? (
						<section aria-labelledby='comments-idea' className={cn("flex flex-col gap-1", reviewers.length && "border-t border-border pt-6")}>
							<h3 id='comments-idea' className='pb-2 text-lg font-semibold text-foreground'>
								On the idea
							</h3>
							<ul className='flex flex-col gap-0.5'>
								{newestIdea.map((comment) => (
									<li key={comment.id}>
										<IdeaCommentRow comment={comment} onOpen={onOpenIdeaComment} />
									</li>
								))}
							</ul>
						</section>
					) : null}
					{filters.prototype && prototypeComments.length ? (
						<section aria-labelledby='comments-prototype' className={cn("flex flex-col gap-1", (reviewers.length || newestIdea.length) && "border-t border-border pt-6")}>
							<h3 id='comments-prototype' className='pb-2 text-lg font-semibold text-foreground'>
								On the prototype
							</h3>
								<ul className='flex flex-col gap-0.5'>
									{openPins.map((comment) => (
										<li key={comment.id}>
											<PrototypeCommentRow comment={comment} unread={unread.includes(comment.id)} onOpen={onOpenPrototypeComment} />
										</li>
									))}
								</ul>
								{/* Nothing open to show: everything's resolved, or the filters hide what there is. */}
								{!openPins.length && !resolvedPins.length ? (
									<p className='px-2 text-sm text-muted-foreground'>
										{filters.open && prototypeComments.every((comment) => comment.resolved)
											? "Everything on the prototype is resolved."
											: "No comments here with these filters."}
									</p>
								) : null}
								{resolvedPins.length ? (
									<>
										{openPins.length ? <h4 className='px-2 pt-3 pb-1 text-xs font-semibold text-muted-foreground'>Resolved ({resolvedPins.length})</h4> : null}
										<ul className='flex flex-col gap-0.5'>
											{resolvedPins.map((comment) => (
												<li key={comment.id}>
													<PrototypeCommentRow comment={comment} unread={unread.includes(comment.id)} onOpen={onOpenPrototypeComment} />
												</li>
											))}
										</ul>
									</>
								) : null}
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

export { CommentFiltersMenu, CommentsPanel, defaultCommentFilters, showsComment, type CommentFilters, type CommentsPanelProps };
