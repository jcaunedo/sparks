import * as React from "react";
import { CircleCheck, MessageCircle, MessageSquare } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/data-display/avatar";
import { Badge } from "@/components/data-display/badge";
import { Button } from "@/components/buttons/button";
import { AppHeader } from "@/components/navigation/app-header";
import { Typography } from "@/components/typography/typography";
import { overlayVariants, panelVariants, scrollIntoViewSmoothly, useMotionPreference } from "@/lib/motion";
import { formatRelativeDate } from "@/lib/relative-date";
import { cn } from "@/lib/utils";

import type { AutoPartsHubUser } from "../../autopartshub";
import { HeaderActions } from "../../header-actions";
import { HeaderIconButton } from "../../header-icon-button";
import type { NotificationsPopoverProps } from "../../notifications-popover";
import { MentionText, type CommentMention, type PrototypeComment, type PrototypeCommentAuthor } from "../prototype/prototype-comments";
import { PrototypePanel, type PrototypeAudience } from "../prototype/prototype-panel";
import { ReviewDocument, viewTone, type ConceptForReview, type IdeaComment, type Reviewer } from "../review/review-panel";
import { SidePanel, SidePanelResizer, useSidePanelWidth } from "../workspace/side-panel";

/*
 * The published idea, as a reviewer sees it (prds/sparks-review.md, "What reviewers see and do"): the version Dana
 * published, the idea and its prototype, to read, try, comment on and give a view. Not in Figma yet.
 */

/** A reviewer's view on whether the idea should move forward, and why. */
type ReviewerView = { view: NonNullable<Reviewer["view"]>; why: string };


type PublishedIdeaProps = {
	/** The signed-in reviewer, for the header's avatar. */
	user: AutoPartsHubUser;
	/** The reviewer as their comments show them: name, photo and team ("Engineering"). */
	reviewer: PrototypeCommentAuthor;
	/** The idea's name, e.g. "Wrong-part returns". */
	ideaName: string;
	/** Who published it, e.g. "Dana Morales". */
	publishedBy: string;
	/** The version published, and when (ISO). */
	version: number;
	publishedAt: string;
	/** Dana's invitation, and when she'd like their view by. */
	invitation: { text: string; due: string };
	/** The idea, as published: every part of "What's reviewed". */
	concept: ConceptForReview;
	/** The prototype at the published version: its name ("1. Fit check before you buy"), audiences, screens, and the prototype for an audience. */
	prototype: {
		label: string;
		audiences: PrototypeAudience[];
		screens: number;
		/** Every screen, with its audience: the arrows beside the device go through them (as in Prototype). */
		screenList?: { name: string; audience: string }[];
		render: (audience: string, screen?: number, part?: string) => React.ReactNode;
	};
	/** Comments pinned on the prototype, everyone's, with their threads. */
	prototypeComments: PrototypeComment[];
	onPrototypeCommentsChange: (comments: PrototypeComment[]) => void;
	/** Who can be tagged with "@" in a comment on the prototype: people and departments. */
	mentionable?: CommentMention[];
	/** Comments on parts of the idea, everyone's. */
	ideaComments: IdeaComment[];
	onIdeaCommentsChange: (comments: IdeaComment[]) => void;
	/** Their view, once sent. */
	view?: ReviewerView;
	onViewChange: (view: ReviewerView | undefined) => void;
	notifications?: NotificationsPopoverProps;
};

const views: ReviewerView["view"][] = ["Advance", "Advance with changes", "Don't advance yet"];

/** The text field's look, as in the clarification card's edit (DESIGN.md → "Clarification card"). */
const fieldClasses =
	"w-full resize-none rounded-input border border-border bg-background px-[11px] py-[7px] text-sm text-foreground outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50";

const initialsOf = (name: string) =>
	name
		.split(/\s+/)
		.map((word) => word.charAt(0))
		.slice(0, 2)
		.join("")
		.toUpperCase();

/** One comment in the reviewer's list: who, their team, when, where, the text, and its thread's state. Opens where it is. */
function CommentRow({
	author,
	createdAt,
	where,
	text,
	mentions,
	unclear,
	replies = 0,
	resolved,
	onOpen,
}: {
	author: PrototypeCommentAuthor;
	createdAt: string;
	where: string;
	text: string;
	mentions?: CommentMention[];
	unclear?: boolean;
	replies?: number;
	resolved?: boolean;
	onOpen: () => void;
}) {
	const time = formatRelativeDate(createdAt);
	return (
		<button
			type='button'
			onClick={onOpen}
			className='flex w-full items-start gap-3 rounded-lg px-2 py-2.5 text-start outline-none hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring'
		>
			<Avatar className='size-8 shrink-0'>
				{author.avatarSrc ? <AvatarImage src={author.avatarSrc} alt='' /> : null}
				<AvatarFallback className='text-xs'>{initialsOf(author.name)}</AvatarFallback>
			</Avatar>
			<span className='flex min-w-0 flex-1 flex-col gap-0.5'>
				<span className='flex flex-wrap items-baseline gap-2'>
					<span className='text-sm font-semibold text-foreground'>{author.name}</span>
					{author.role ? <span className='text-xs text-muted-foreground'>{author.role}</span> : null}
					<time dateTime={createdAt} title={time.title} className='text-xs text-muted-foreground'>
						{time.label}
					</time>
				</span>
				<span className='truncate text-xs text-muted-foreground'>{where}</span>
				<span className={cn("text-sm whitespace-pre-line", resolved ? "text-muted-foreground" : "text-foreground")}>
					<MentionText text={text} mentions={mentions} />
				</span>
				{unclear || replies || resolved ? (
					<span className='flex flex-wrap items-center gap-3 pt-0.5 text-xs text-muted-foreground'>
						{unclear ? (
							<Badge variant='flat' tone='amber' size='xxs'>
								Unclear
							</Badge>
						) : null}
						{replies ? (
							<span className='flex items-center gap-1 text-link'>
								<MessageSquare aria-hidden className='size-3.5' />
								{replies} {replies === 1 ? "reply" : "replies"}
							</span>
						) : null}
						{resolved ? (
							<span className='flex items-center gap-1 text-success'>
								<CircleCheck aria-hidden className='size-3.5' />
								Resolved
							</span>
						) : null}
					</span>
				) : null}
			</span>
		</button>
	);
}

/** A part's comments, under its heading, and the box to add one: Enter adds it, Shift+Enter starts a line, Esc closes it. */
function PartComments({ comments, onAdd, onCancel }: { comments: IdeaComment[]; onAdd: (text: string, unclear: boolean) => void; onCancel: () => void }) {
	const [text, setText] = React.useState("");
	const [unclear, setUnclear] = React.useState(false);
	const add = () => {
		if (!text.trim()) return;
		onAdd(text.trim(), unclear);
		setText("");
		setUnclear(false);
	};
	return (
		<div className='flex flex-col gap-3 rounded-lg bg-background-subtle p-3'>
			{comments.length ? (
				<ul className='flex flex-col gap-3'>
					{comments.map((comment) => {
						const time = formatRelativeDate(comment.createdAt);
						return (
							<li key={comment.id} className='flex items-start gap-3'>
								<Avatar className='size-8 shrink-0'>
									{comment.author.avatarSrc ? <AvatarImage src={comment.author.avatarSrc} alt='' /> : null}
									<AvatarFallback className='text-xs'>{initialsOf(comment.author.name)}</AvatarFallback>
								</Avatar>
								<span className='flex min-w-0 flex-1 flex-col items-start gap-0.5'>
									<span className='flex flex-wrap items-baseline gap-2'>
										<span className='text-sm font-semibold text-foreground'>{comment.author.name}</span>
										{comment.author.role ? <span className='text-xs text-muted-foreground'>{comment.author.role}</span> : null}
										<time dateTime={comment.createdAt} title={time.title} className='text-xs text-muted-foreground'>
											{time.label}
										</time>
									</span>
									<span className='text-sm whitespace-pre-line text-foreground'>{comment.text}</span>
									{comment.unclear ? (
										<Badge variant='flat' tone='amber' size='xxs'>
											Unclear
										</Badge>
									) : null}
								</span>
							</li>
						);
					})}
				</ul>
			) : null}
			<form
				className='flex flex-col gap-2'
				onSubmit={(event) => {
					event.preventDefault();
					add();
				}}
			>
				<textarea
					aria-label='Comment'
					placeholder='Add a comment'
					autoFocus
					rows={2}
					value={text}
					onChange={(event) => setText(event.target.value)}
					onKeyDown={(event) => {
						if (event.key === "Escape") onCancel();
						if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
							event.preventDefault();
							add();
						}
					}}
					className={fieldClasses}
				/>
				<div className='flex flex-wrap items-center justify-between gap-3'>
					<label className='flex items-center gap-2 text-sm text-foreground'>
						<input type='checkbox' checked={unclear} onChange={(event) => setUnclear(event.target.checked)} className='size-4 accent-primary' />
						This part is unclear
					</label>
					<span className='flex gap-2'>
						<Button type='button' variant='outline' size='sm' onClick={onCancel}>
							Cancel
						</Button>
						<Button type='submit' size='sm' disabled={!text.trim()}>
							Comment
						</Button>
					</span>
				</div>
			</form>
		</div>
	);
}

/**
 * The page a reviewer opens from Dana's invitation (prds/sparks-review.md, "What reviewers see and do"), laid out as Dana's
 * Review: the idea for review, as published, on the left, and its prototype on the right. At the top of the idea, their
 * review: the invitation and their view (Advance, Advance with changes, Don't advance yet, and why). Each part has
 * "Comment", which opens its comments and the box under its heading; the prototype takes pinned comments, with threads.
 * "Comments" in the header lists every comment, each opening where it is. They can't change the idea or the prototype.
 */
function PublishedIdea({
	user,
	reviewer,
	ideaName,
	publishedBy,
	version,
	publishedAt,
	invitation,
	concept,
	prototype,
	prototypeComments,
	mentionable,
	onPrototypeCommentsChange,
	ideaComments,
	onIdeaCommentsChange,
	view,
	onViewChange,
	notifications,
}: PublishedIdeaProps) {
	const [openPin, setOpenPin] = React.useState<string>();
	const { prefersReducedMotion } = useMotionPreference();
	const documentRef = React.useRef<HTMLDivElement>(null);
	const firstName = publishedBy.split(" ")[0];
	const published = formatRelativeDate(publishedAt);

	// Their view: picked, with why, then sent; "Change your view" opens it again.
	const [choice, setChoice] = React.useState<ReviewerView["view"] | undefined>(view?.view);
	const [why, setWhy] = React.useState(view?.why ?? "");
	const [editingView, setEditingView] = React.useState(!view);

	// The part whose comments are open, under its heading, and the one marked for a moment (opened from Comments).
	const [openPart, setOpenPart] = React.useState<string>();
	const [marked, setMarked] = React.useState<string>();
	React.useEffect(() => {
		if (!marked) return;
		const timer = window.setTimeout(() => setMarked(undefined), 1600);
		return () => window.clearTimeout(timer);
	}, [marked]);

	// "Comments", as on Dana's side: a column on the right edge, the screen's full height.
	const [commentsOpen, setCommentsOpen] = React.useState(false);
	const [commentsWidth, setCommentsWidth] = useSidePanelWidth();
	const commentsButtonRef = React.useRef<HTMLButtonElement>(null);
	const closeComments = () => {
		setCommentsOpen(false);
		commentsButtonRef.current?.focus();
	};

	// A comment opens where it is: its part of the idea, brought to the top, or its pin's thread on the prototype.
	const openIdeaComment = (title: string) => {
		setOpenPart(title);
		setMarked(title);
		requestAnimationFrame(() => {
			const element = documentRef.current?.querySelector<HTMLElement>(`[data-part="${CSS.escape(title)}"]`);
			if (element) scrollIntoViewSmoothly(element, { reducedMotion: Boolean(prefersReducedMotion), align: "start" });
		});
	};

	const commentsOnPart = (title: string) => ideaComments.filter((comment) => comment.part === title);
	// Every comment, newest first; resolved ones on the prototype last.
	const all = [
		...ideaComments.map((comment) => ({ kind: "idea" as const, comment, resolved: false })),
		...prototypeComments.map((comment) => ({ kind: "prototype" as const, comment, resolved: Boolean(comment.resolved) })),
	].sort((a, b) => Number(a.resolved) - Number(b.resolved) || b.comment.createdAt.localeCompare(a.comment.createdAt));

	return (
		<div className='flex h-screen bg-background text-foreground'>
			<div className='flex min-w-0 flex-1 flex-col'>
				{/* The Sparks Project header's frame: the idea's name on the left (no menu: it isn't theirs); Comments, the published
				    version, notifications and their avatar on the right. */}
				<AppHeader
					logo={
						<Typography as='h1' size='xl' weight='semibold' className='min-w-0 truncate text-foreground'>
							{ideaName}
						</Typography>
					}
				>
					<HeaderIconButton
						ref={commentsButtonRef}
						label='Comments'
						aria-expanded={commentsOpen}
						onClick={() => (commentsOpen ? closeComments() : setCommentsOpen(true))}
					>
						<MessageCircle aria-hidden />
					</HeaderIconButton>
					<Badge variant='flat' tone='blue' size='sm'>
						Version {version}
					</Badge>
					<HeaderActions user={user} notifications={notifications} />
				</AppHeader>

				{/* The same two panels as Dana's Review. */}
				<main className='flex min-h-0 flex-1 gap-4 px-6 pb-6'>
					<section aria-label='Idea for review' className='flex min-h-0 min-w-0 flex-1 basis-0 flex-col rounded-card bg-background-subtle'>
						<div className='flex h-[68px] shrink-0 items-center gap-3 px-5'>
							<Typography as='h2' size='lg' weight='medium' className='shrink-0 text-foreground-prominent'>
								Idea for review
							</Typography>
							<span className='min-w-0 truncate text-xs text-muted-foreground'>{concept.evidenceStatus.split(".")[0]}</span>
						</div>
						<div
							ref={documentRef}
							className='scrollbar-subtle mx-5 mb-6 flex min-h-0 flex-1 flex-col gap-4 scroll-pt-4 overflow-y-auto rounded-[12px] bg-background p-8'
						>
							{/* Their review, where Dana's Review has her next step: the same box. */}
							<section aria-label='Your review' className='flex flex-col gap-4 rounded-lg border border-border-defined p-4'>
								<div className='flex flex-col gap-2'>
									<h3 className='text-base font-semibold text-foreground-prominent'>{publishedBy} asked you to review this idea</h3>
									<blockquote className='text-sm text-foreground'>"{invitation.text}"</blockquote>
									<p className='text-xs text-muted-foreground'>
										By {invitation.due} · Version {version}, published {published.label.toLowerCase()}. {firstName} keeps working on hers; you see this version
										until she publishes an update.
									</p>
								</div>
								<div className='flex flex-col gap-3 border-t border-border pt-4'>
									<div className='flex flex-col gap-0.5'>
										<h3 className='text-base font-semibold text-foreground-prominent'>Your view</h3>
										<p className='text-sm text-muted-foreground'>Should it move forward? {firstName} asks for a decision once the teams have given theirs.</p>
									</div>
									{view && !editingView ? (
										<div className='flex flex-col gap-2'>
											<Badge variant='flat' tone={viewTone[view.view]} size='sm' className='w-fit'>
												{view.view}
											</Badge>
											<p className='text-sm text-foreground'>"{view.why}"</p>
											<Button variant='link' className='h-auto w-fit p-0 text-sm font-medium' onClick={() => setEditingView(true)}>
												Change your view
											</Button>
										</div>
									) : (
										<form
											className='flex flex-col gap-3'
											onSubmit={(event) => {
												event.preventDefault();
												if (!choice || !why.trim()) return;
												onViewChange({ view: choice, why: why.trim() });
												setEditingView(false);
											}}
										>
											<div role='radiogroup' aria-label='Your view' className='flex flex-wrap gap-2'>
												{views.map((option) => (
													<button
														key={option}
														type='button'
														role='radio'
														aria-checked={choice === option}
														onClick={() => setChoice(option)}
														className={cn(
															"h-9 rounded-button-lg border px-3.5 text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring",
															choice === option ? "border-border-defined bg-accent text-foreground" : "border-border bg-background text-foreground hover:bg-accent",
														)}
													>
														{option}
													</button>
												))}
											</div>
											<textarea
												aria-label='Why'
												placeholder='Why, in a sentence'
												rows={2}
												value={why}
												onChange={(event) => setWhy(event.target.value)}
												className={fieldClasses}
											/>
											<div className='flex justify-end gap-2'>
												{view ? (
													<Button type='button' variant='outline' size='sm' onClick={() => setEditingView(false)}>
														Cancel
													</Button>
												) : null}
												<Button type='submit' size='sm' disabled={!choice || !why.trim()}>
													Send your view
												</Button>
											</div>
										</form>
									)}
								</div>
							</section>
							<ReviewDocument
								concept={concept}
								marked={marked}
								partAction={(title) => {
									const count = commentsOnPart(title).length;
									return (
										<Button
											variant='ghost'
											size='sm'
											aria-label={`Comment on "${title}"${count ? `, ${count} so far` : ""}`}
											aria-expanded={openPart === title}
											className='h-7 shrink-0 gap-1.5 rounded-button-sm px-2 text-xs text-muted-foreground'
											onClick={() => setOpenPart((current) => (current === title ? undefined : title))}
										>
											<MessageSquare aria-hidden className='size-3.5' />
											{count ? count : "Comment"}
										</Button>
									);
								}}
								partBelow={(title) =>
									openPart === title ? (
										<PartComments
											comments={commentsOnPart(title)}
											onCancel={() => setOpenPart(undefined)}
											onAdd={(text, unclear) =>
												onIdeaCommentsChange([
													...ideaComments,
													{ id: `idea-comment-${Date.now()}`, part: title, text, createdAt: new Date().toISOString(), author: reviewer, unclear: unclear || undefined },
												])
											}
										/>
									) : null
								}
							/>
						</div>
					</section>
					<PrototypePanel
						className='min-w-0 basis-0'
						audiences={prototype.audiences}
						screens={prototype.screenList}
						paths={[{ id: "published", label: prototype.label }]}
						path='published'
						commentAuthor={reviewer}
						comments={prototypeComments}
						onCommentsChange={onPrototypeCommentsChange}
						mentionable={mentionable}
						openComment={openPin}
						onOpenCommentChange={setOpenPin}
					>
						{prototype.render}
					</PrototypePanel>
				</main>
			</div>
			<AnimatePresence initial={false}>
				{commentsOpen ? (
					<motion.aside
						key='comments'
						aria-label='Comments'
						variants={prefersReducedMotion ? overlayVariants : panelVariants}
						initial='initial'
						animate='animate'
						exit='exit'
						className='relative flex h-full shrink-0 flex-col'
						style={{ width: commentsWidth }}
					>
						<SidePanelResizer width={commentsWidth} onWidthChange={setCommentsWidth} label='Resize comments' />
						<SidePanel title='Comments' closeLabel='Close comments' onClose={closeComments} autoFocus>
							{all.length ? (
								<ul className='flex flex-col gap-0.5'>
									{all.map((entry) =>
										entry.kind === "idea" ? (
											<li key={entry.comment.id}>
												<CommentRow
													author={entry.comment.author}
													createdAt={entry.comment.createdAt}
													where={`On "${entry.comment.part}"`}
													text={entry.comment.text}
													unclear={entry.comment.unclear}
													onOpen={() => openIdeaComment(entry.comment.part)}
												/>
											</li>
										) : (
											<li key={entry.comment.id}>
												<CommentRow
													author={entry.comment.author}
													createdAt={entry.comment.createdAt}
													where={["On the prototype", entry.comment.scope.audienceLabel, entry.comment.scope.device === "phone" ? "Phone" : "Desktop", entry.comment.where ? `"${entry.comment.where}"` : null]
														.filter(Boolean)
														.join(" · ")}
													text={entry.comment.text}
													mentions={entry.comment.mentions}
													replies={entry.comment.replies?.length}
													resolved={entry.comment.resolved}
													onOpen={() => setOpenPin(entry.comment.id)}
												/>
											</li>
										),
									)}
								</ul>
							) : (
								<div className='flex flex-col gap-1'>
									<p className='text-sm font-medium text-foreground'>No comments yet</p>
									<p className='text-sm text-muted-foreground'>Select "Comment" on a part of the idea, or "Add comment" on the prototype.</p>
								</div>
							)}
						</SidePanel>
					</motion.aside>
				) : null}
			</AnimatePresence>
		</div>
	);
}

export { PublishedIdea, type IdeaComment, type PublishedIdeaProps, type ReviewerView };
