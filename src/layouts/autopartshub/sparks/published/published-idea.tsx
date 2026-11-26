import * as React from "react";
import { Bell, CircleCheck, MessageCircle, MessageSquare } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/data-display/avatar";
import { Badge } from "@/components/data-display/badge";
import { Button } from "@/components/buttons/button";
import { AppHeader } from "@/components/navigation/app-header";
import { RadioGroup, RadioGroupItem } from "@/components/forms/radio-group";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/overlays/popover";
import { Typography } from "@/components/typography/typography";
import { fadeVariants, overlayVariants, panelVariants, revealVariants, scrollIntoViewSmoothly, useMotionPreference } from "@/lib/motion";
import { formatRelativeDate } from "@/lib/relative-date";
import { cn } from "@/lib/utils";

import type { AutoPartsHubUser } from "../../autopartshub";
import { HeaderIconButton } from "../../header-icon-button";
import { NotificationsPopover, type NotificationsPopoverProps } from "../../notifications-popover";
import { UserAvatar } from "../../user-avatar";
import { MentionText, type CommentMention, type PrototypeComment, type PrototypeCommentAuthor } from "../prototype/prototype-comments";
import { AddCommentButton, PrototypePanel, type PrototypeAudience } from "../prototype/prototype-panel";
import { ReadyToBuild, type ReadyCheck } from "../review/review-next";
import { buildContextTitles, buildPartTitles, IdeaCommentLayer, ReviewDocument, viewTone, type ConceptForReview, type IdeaComment, type Reviewer } from "../review/review-panel";
import { SidePanel, SidePanelResizer, useSidePanelWidth } from "../workspace/side-panel";

/*
 * The published idea, as a reviewer sees it (prds/sparks-review.md, "What reviewers see and do"): the version Dana
 * published, the idea and its prototype, to read, try, comment on and give a view. With `advanced`, the same page as the
 * team who builds it opens it once it's advanced and shared ("After the decision"): what to build first. Not in Figma yet.
 */

/** The decision that advanced it, and Sparks's check that it's ready to build, as Dana shared it. */
type AdvancedIdea = { owner: string; date: string; reason: string; ready: ReadyCheck[] };

/** A reviewer's view on whether the idea should move forward, and why. */
type ReviewerView = { view: NonNullable<Reviewer["view"]>; why: string };


type PublishedIdeaProps = {
	/** The signed-in reviewer (or, advanced, someone on the team who builds it), for the header's avatar. */
	user: AutoPartsHubUser;
	/** Who's reading, as their comments show them: name, photo and team ("Engineering"). */
	reviewer: PrototypeCommentAuthor;
	/** The idea's name, e.g. "Wrong-part returns". */
	ideaName: string;
	/** Who published it, e.g. "Dana Morales". */
	publishedBy: string;
	/** The version published, and when (ISO). */
	version: number;
	publishedAt: string;
	/** Dana's invitation, and when she'd like their view by. Not for an advanced idea. */
	invitation?: { text: string; due: string };
	/**
	 * It's been advanced and shared with them, to build: the page opens on what to build (`buildPartTitles`), next to the
	 * prototype, then why and how it was decided (`buildContextTitles`); no invitation and no view to give.
	 */
	advanced?: AdvancedIdea;
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
	onViewChange?: (view: ReviewerView | undefined) => void;
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
	addressed,
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
	/** How Dana addressed it (a comment on a part of the idea). */
	addressed?: string;
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
				{addressed ? (
					<span className='flex items-start gap-1 pt-0.5 text-xs text-muted-foreground'>
						<CircleCheck aria-hidden className='mt-px size-3.5 shrink-0 text-success' />
						<span>
							<span className='font-medium text-success'>Addressed.</span> {addressed}
						</span>
					</span>
				) : null}
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


/**
 * The page a reviewer opens from Dana's invitation (prds/sparks-review.md, "What reviewers see and do"), laid out as Dana's
 * Review: the idea for review, as published, on the left, and its prototype on the right. "Share your review" in the header
 * opens their view in a popover (Advance, Advance with changes, Don't advance yet, and why); Dana's invitation is the email
 * that brought them here. Each part has
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
	advanced,
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
	// The popover with their view, from the header's "Share your review".
	const [reviewOpen, setReviewOpen] = React.useState(false);
	const viewTitleId = React.useId();
	const whyRef = React.useRef<HTMLTextAreaElement>(null);

	// The comment on the idea whose thread is open, and the part marked for a moment (opened from Comments).
	const [openIdeaPin, setOpenIdeaPin] = React.useState<string>();
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
	// Adding a comment on the prototype: "Add comment" is in the Comments panel; closing the panel stops it.
	const [addingComment, setAddingComment] = React.useState(false);
	const closeComments = () => {
		setAddingComment(false);
		setCommentsOpen(false);
		commentsButtonRef.current?.focus();
	};

	// A comment opens where it is: its part of the idea, brought to the top, or its pin's thread on the prototype.
	const openIdeaComment = (id: string) => {
		const title = ideaComments.find((comment) => comment.id === id)?.part;
		if (!title) return;
		setOpenIdeaPin(id);
		setMarked(title);
		requestAnimationFrame(() => {
			const element = documentRef.current?.querySelector<HTMLElement>(`[data-part="${CSS.escape(title)}"]`);
			if (element) scrollIntoViewSmoothly(element, { reducedMotion: Boolean(prefersReducedMotion), align: "start" });
		});
	};

// Every comment, newest first; resolved ones on the prototype last.
	const all = [
		...ideaComments.map((comment) => ({ kind: "idea" as const, comment, resolved: false })),
		...prototypeComments.map((comment) => ({ kind: "prototype" as const, comment, resolved: Boolean(comment.resolved) })),
	].sort((a, b) => Number(a.resolved) - Number(b.resolved) || b.comment.createdAt.localeCompare(a.comment.createdAt));

	return (
		<div className='flex h-screen bg-background text-foreground'>
			<div className='flex min-w-0 flex-1 flex-col'>
				{/* The Sparks Project header's frame: the idea's name on the left (no menu: it isn't theirs), with the published
				    version beside it (AppHeader's 16px left gap); Comments, notifications and their avatar on the right. */}
				<AppHeader
					logo={
						<>
							<Typography as='h1' size='xl' weight='semibold' className='min-w-0 truncate text-foreground'>
								{ideaName}
							</Typography>
							<Badge variant='flat' tone='blue' size='sm' className='shrink-0'>
								Version {version}
							</Badge>
						</>
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
					{notifications ? (
						<NotificationsPopover {...notifications} />
					) : (
						<HeaderIconButton label='Notifications'>
							<Bell aria-hidden />
						</HeaderIconButton>
					)}
					{/* Their view, behind the header's dark button (as Dana's "Publish"), before their avatar, in a popover. Dana's
					    invitation is the email that brought them here, not part of the page. Once sent, the button says their view. */}
					{advanced ? null : (
						<Popover open={reviewOpen} onOpenChange={setReviewOpen}>
							<PopoverTrigger asChild>
								{view ? (
									<Button variant='outline' className='px-3.5'>
										Your view: {view.view}
									</Button>
								) : (
									<Button variant='neutral' className='px-3.5'>
										Share your review
									</Button>
								)}
							</PopoverTrigger>
							<PopoverContent align='end' sideOffset={8} aria-labelledby={viewTitleId} className='flex w-[440px] flex-col gap-3 p-5'>
								<div className='flex flex-col gap-1'>
									<Typography as='h2' id={viewTitleId} size='lg' weight='semibold' className='text-foreground-prominent'>
										Your review
									</Typography>
									<p className='text-sm text-foreground'>Should it move forward? {firstName} asks for a decision once the teams have given theirs.</p>
									<p className='text-xs text-muted-foreground'>
										{invitation ? `By ${invitation.due} · ` : ""}Version {version}, published {published.label.toLowerCase()}. {firstName} keeps working on hers; you see
										this version until she publishes an update.
									</p>
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
										onViewChange?.({ view: choice, why: why.trim() });
										setEditingView(false);
										setReviewOpen(false);
									}}
								>
									{/* One option per row, each a radio button with its label. */}
									<RadioGroup
										aria-label='Your review'
										value={choice ?? ""}
										onValueChange={(next) => {
											// The first choice brings in "Why" and "Submit review", with the field ready to type in; moving between
											// options afterwards (arrow keys) leaves focus on them.
											if (!choice) requestAnimationFrame(() => whyRef.current?.focus());
											setChoice(next as ReviewerView["view"]);
										}}
										className='gap-2.5'
									>
										{views.map((option) => (
											<div key={option} className='flex items-center gap-2'>
												<RadioGroupItem value={option} id={`${viewTitleId}-${option}`} />
												<label htmlFor={`${viewTitleId}-${option}`} className='cursor-pointer text-sm font-medium text-foreground'>
													{option}
												</label>
											</div>
										))}
									</RadioGroup>
									{/* Only once an option is chosen: why, and "Submit review". */}
									{choice ? (
										<motion.div
											variants={prefersReducedMotion ? fadeVariants : revealVariants}
											initial={view ? false : "initial"}
											animate='animate'
											className='flex flex-col gap-3'
										>
											<textarea
												ref={whyRef}
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
												<Button type='submit' size='sm' disabled={!why.trim()}>
													Submit review
												</Button>
											</div>
										</motion.div>
									) : null}
								</form>
								)}
							</PopoverContent>
						</Popover>
					)}
					<UserAvatar user={user} />
				</AppHeader>

				{/* The same two panels as Dana's Review. */}
				<main className='flex min-h-0 flex-1 gap-4 px-6 pb-6'>
					<section aria-label='Idea for review' className='flex min-h-0 min-w-0 flex-1 basis-0 flex-col rounded-card bg-background-subtle'>
						<div className='flex h-[68px] shrink-0 items-center gap-3 px-5'>
							<Typography as='h2' size='xl' weight='semibold' className='shrink-0 text-foreground'>
								{advanced ? "Advanced idea" : "Idea for review"}
							</Typography>
							{advanced ? (
								<Badge variant='flat' tone='green' size='sm' className='shrink-0'>
									Advanced · {advanced.date}
								</Badge>
							) : null}
							<span className='min-w-0 truncate text-xs text-muted-foreground'>{concept.evidenceStatus.split(".")[0]}</span>
						</div>
						<div
							ref={documentRef}
							className='scrollbar-subtle mx-5 mb-6 flex min-h-0 flex-1 flex-col scroll-pt-4 overflow-y-auto rounded-[12px] bg-background p-8'
						>
							{/* Comments on the idea, the same as on the prototype: with "Add comment" on, a click drops a pin. */}
							<IdeaCommentLayer
								comments={{
									items: ideaComments,
									onChange: onIdeaCommentsChange,
									author: reviewer,
									adding: addingComment,
									mentionable,
									openId: openIdeaPin,
									onOpenChange: setOpenIdeaPin,
								}}
							>
								{/* As Evaluate's panel: sections one under the other, a line between each, 24px on either side of it. */}
								<div className='flex flex-col divide-y divide-border [&>*]:py-6 [&>*:first-child]:pt-0 [&>*:last-child]:pb-0'>
									{advanced ? (
										// Advanced: what was decided, how to read it, and Sparks's check, at the top of the idea.
										<div>
											<section aria-label='About this idea' className='flex flex-col gap-4 rounded-lg border border-border-defined p-4'>
												<div className='flex flex-col gap-2'>
													<h3 className='text-lg font-semibold text-foreground-prominent'>{publishedBy} shared this idea with you to build</h3>
													<p className='text-base text-foreground'>
														{advanced.owner} advanced it on {advanced.date}: "{advanced.reason}"
													</p>
													<p className='text-sm text-muted-foreground'>
														Version {version}. It starts with what to build, next to the prototype; why it's built this way, and every decision, come after.
														Something unclear? Select "Add comment" in Comments, then its part, and mark it unclear: Sparks proposes a fix, and {firstName} decides.
													</p>
												</div>
												<div className='border-t border-border pt-4'>
													<ReadyToBuild checks={advanced.ready} title='Ready to build' />
												</div>
											</section>
										</div>
									) : null}
									{(advanced ? [buildPartTitles, buildContextTitles] : [undefined]).map((titles, index) => (
										<React.Fragment key={index}>
											{index === 1 ? (
												// Advanced: after what to build, why it's built this way and how it was decided.
												<Typography as='h2' size='lg' weight='semibold' className='text-foreground-prominent'>
													Why it's built this way
												</Typography>
											) : null}
											<ReviewDocument concept={concept} titles={titles} marked={marked} />
										</React.Fragment>
									))}
								</div>
							</IdeaCommentLayer>
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
						commenting={addingComment}
						onCommentingChange={setAddingComment}
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
						<SidePanel
							title='Comments'
							actions={<AddCommentButton pressed={addingComment} onPressedChange={setAddingComment} />}
							closeLabel='Close comments'
							onClose={closeComments}
							autoFocus
						>
							{all.length ? (
								<ul className='flex flex-col gap-0.5'>
									{all.map((entry) =>
										entry.kind === "idea" ? (
											<li key={entry.comment.id}>
												<CommentRow
													author={entry.comment.author}
													createdAt={entry.comment.createdAt}
													where={`On "${entry.comment.part}"${entry.comment.quote ? `: “${entry.comment.quote}”` : ""}`}
													text={entry.comment.text}
													unclear={entry.comment.unclear}
													addressed={entry.comment.addressed}
onOpen={() => openIdeaComment(entry.comment.id)}
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
									<p className='text-sm text-muted-foreground'>Select "Add comment" above, then a part of the idea or a spot on the prototype.</p>
								</div>
							)}
						</SidePanel>
					</motion.aside>
				) : null}
			</AnimatePresence>
		</div>
	);
}

export { PublishedIdea, type AdvancedIdea, type IdeaComment, type PublishedIdeaProps, type ReviewerView };
