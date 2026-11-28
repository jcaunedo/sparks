import * as React from "react";
import { Bell, CircleCheck, MessageCircle, MessageSquare } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/data-display/avatar";
import { Badge } from "@/components/data-display/badge";
import { Button } from "@/components/buttons/button";
import { AppHeader } from "@/components/navigation/app-header";
import { RadioGroup, RadioGroupItem } from "@/components/forms/radio-group";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/overlays/dialog";
import { Typography } from "@/components/typography/typography";
import { expandVariants, fadeVariants, overlayVariants, panelVariants, revealVariants, scrollIntoViewSmoothly, useExpandClip, useMotionPreference } from "@/lib/motion";
import { formatRelativeDate } from "@/lib/relative-date";
import { cn } from "@/lib/utils";

import type { AutoPartsHubUser } from "../../autopartshub";
import { HeaderIconButton } from "../../header-icon-button";
import { NotificationsPopover, type NotificationsPopoverProps } from "../../notifications-popover";
import { UserAvatar } from "../../user-avatar";
import { TeamMemberStatusBadge } from "../shared/idea-status";
import { MentionText, type CommentMention, type PrototypeComment, type PrototypeCommentAuthor } from "../prototype/prototype-comments";
import { PrototypePanel, type PrototypeAudience } from "../prototype/prototype-panel";
import { CommentFiltersMenu, defaultCommentFilters, showsComment } from "../workspace/comments-panel";
import { ReadyToBuild, type ReadyCheck } from "../review/review-next";
import { buildContextTitles, buildPartTitles, IdeaCommentLayer, ReviewDocument, SectionsMenu, viewTone, type ConceptForReview, type IdeaComment, type Reviewer } from "../review/review-panel";
import { SidePanel, SidePanelResizer, useSidePanelWidth } from "../workspace/side-panel";

/*
 * The published idea, as a reviewer sees it (prds/sparks-review.md, "What reviewers see and do"): the version Dana
 * published, the idea and its prototype, to read, try, comment on and give a view. With `advanced`, the same page as the
 * team who builds it opens it once it's advanced and shared ("After the decision"): what to build first. Not in Figma yet.
 */

/** The decision that advanced it, and Sparks's check that it's ready to build, as Dana shared it. */
type AdvancedIdea = { owner: string; date: string; reason: string; ready: ReadyCheck[] };

/** A reviewer's view on whether the idea should move forward, and why. */
type ReviewerView = { view: NonNullable<Reviewer["view"]>; why: string; /** The published version it's about. */ version?: number };


/** A version published to the teams: its number, what changed (its name, as in Dana's versions) and when (ISO). */
type PublishedVersion = { version: number; name: string; publishedAt: string };

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
	/**
	 * Every version she's published to them, oldest first, the last being `version`: "Version {n}" on the prototype is a menu
	 * of them, to open an earlier one. Without it, "Version {n}" is a heading alone.
	 */
	versions?: PublishedVersion[];
	/** Dana's invitation, and when she'd like their view by. Not for an advanced idea. */
	invitation?: { text: string; due: string };
	/**
	 * It's been advanced and shared with them, to build: the page opens on what to build (`buildPartTitles`), next to the
	 * prototype, then why and how it was decided (`buildContextTitles`); no invitation and no view to give.
	 */
	advanced?: AdvancedIdea;
	/** The idea, as published: every part of "What's reviewed". */
	concept: ConceptForReview;
	/** The prototype at the published version: its name ("Fit check before you buy"), audiences, screens, and the prototype for an audience. */
	prototype: {
		label: string;
		audiences: PrototypeAudience[];
		screens: number;
		/** Every screen, with its audience: the arrows beside the device go through them (as in Prototype). */
		screenList?: { name: string; audience: string }[];
		render: (audience: string, screen?: number, part?: string) => React.ReactNode;
	};
	/** Comments pinned on the prototype, everyone's, with their threads. While it's in review, only `reviewer`'s show. */
	prototypeComments: PrototypeComment[];
	onPrototypeCommentsChange: (comments: PrototypeComment[]) => void;
	/** Who can be tagged with "@" in a comment on the prototype: people and departments. */
	mentionable?: CommentMention[];
	/** Comments on parts of the idea, everyone's. While it's in review, only `reviewer`'s show. */
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
	unread = false,
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
	/** A reply they haven't opened yet: the unread dot before it, as in Dana's Comments. */
	unread?: boolean;
	onOpen: () => void;
}) {
	const time = formatRelativeDate(createdAt);
	return (
		<button
			type='button'
			onClick={onOpen}
			className='relative flex w-full items-start gap-3 rounded-lg px-2 py-2.5 text-start outline-none hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring'
		>
			{unread ? (
				<span className='absolute top-5.5 -left-1.5 size-2 rounded-full bg-(--sky-500)'>
					<span className='sr-only'>New reply: </span>
				</span>
			) : null}
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
 * Review: the idea for review, as published, on the left, and its prototype on the right. "Share your assessment" in the header
 * opens their view in a popover (Advance, Advance with changes, Don't advance yet, and why); Dana's invitation is the email
 * that brought them here. Each part has
 * "Comment", which opens its comments and the box under its heading; the prototype takes pinned comments, with threads.
 * "Comments" in the header lists their comments (every comment once it's advanced), each opening where it is. They can't change the idea or the prototype.
 */
function PublishedIdea({
	user,
	reviewer,
	ideaName,
	publishedBy,
	version: latestVersion,
	publishedAt: latestPublishedAt,
	versions = [],
	invitation,
	advanced,
	concept,
	prototype,
	prototypeComments: everyonesPrototypeComments,
	mentionable,
	onPrototypeCommentsChange: onEveryonesPrototypeCommentsChange,
	ideaComments: everyonesIdeaComments,
	onIdeaCommentsChange: onEveryonesIdeaCommentsChange,
	view,
	onViewChange,
	notifications,
}: PublishedIdeaProps) {
	// While it's out for review, a reviewer sees only their own comments (with the replies on them), not the other
	// teams': each assessment stays their own (prds/sparks-review.md, "What reviewers see and do"). What they change goes
	// back with everyone else's, untouched. Advanced, the team who builds it sees every comment.
	const own = (comment: { author: PrototypeCommentAuthor }) => Boolean(advanced) || comment.author.name === reviewer.name;
	const prototypeComments = everyonesPrototypeComments.filter(own);
	const onPrototypeCommentsChange = (next: PrototypeComment[]) =>
		onEveryonesPrototypeCommentsChange([...everyonesPrototypeComments.filter((comment) => !own(comment)), ...next]);
	const ideaComments = everyonesIdeaComments.filter(own);
	const onIdeaCommentsChange = (next: IdeaComment[]) =>
		onEveryonesIdeaCommentsChange([...everyonesIdeaComments.filter((comment) => !own(comment)), ...next]);
	// Replies from someone else (Dana) on their comments that they haven't opened yet: the unread dot on "Comments" and on
	// the comment's row, as on Dana's side. Opening the comment (its pin, or from Comments) reads them. What's there when
	// the page opens counts as read.
	const othersReplies = (comment: PrototypeComment) => (comment.replies ?? []).filter((reply) => reply.author.name !== reviewer.name).length;
	const [readReplies, setReadReplies] = React.useState<Record<string, number>>(() =>
		Object.fromEntries([...prototypeComments, ...ideaComments].map((comment) => [comment.id, othersReplies(comment)])),
	);
	const unreadReplies = [...prototypeComments, ...ideaComments]
		.filter((comment) => othersReplies(comment) > (readReplies[comment.id] ?? 0))
		.map((comment) => comment.id);
	const readComment = (id: string | undefined) => {
		const comment = id ? [...prototypeComments, ...ideaComments].find((c) => c.id === id) : undefined;
		if (comment) setReadReplies((current) => ({ ...current, [comment.id]: othersReplies(comment) }));
	};
	const setOpenPin = (id: string | undefined) => {
		setOpenPinState(id);
		readComment(id);
	};
	const [openPin, setOpenPinState] = React.useState<string>();
	const { prefersReducedMotion } = useMotionPreference();
	const documentRef = React.useRef<HTMLDivElement>(null);
	// What scrolls: their assessment (once given) and the idea's card together, as on Dana's Review.
	const scrollRef = React.useRef<HTMLDivElement>(null);
	const assessmentRef = React.useRef<HTMLElement>(null);
	const assessmentClip = useExpandClip();
	const assessmentTitleId = React.useId();
	const firstName = publishedBy.split(" ")[0];
	// The version shown: the latest to start; "Version {n}" on the prototype opens an earlier one.
	const [viewing, setViewing] = React.useState(latestVersion);
	const viewed = versions.find((v) => v.version === viewing);
	const version = viewed?.version ?? latestVersion;
	const publishedAt = viewed?.publishedAt ?? latestPublishedAt;
	const published = formatRelativeDate(publishedAt);

	// Their assessment: picked, with why, then sent; "Change your assessment" opens it again.
	const [choice, setChoice] = React.useState<ReviewerView["view"] | undefined>(view?.view);
	const [why, setWhy] = React.useState(view?.why ?? "");
	const [editingView, setEditingView] = React.useState(!view);
	// "Your assessment" above the idea, once they've sent it (not for the team who builds it).
	const showsAssessment = Boolean(view) && !advanced;
	// The dialog with their assessment, from the header's "Share your assessment" (or "Change your assessment" on its card).
	const [reviewOpen, setReviewOpen] = React.useState(false);
	const viewTitleId = React.useId();
	const whyRef = React.useRef<HTMLTextAreaElement>(null);

	// The comment on the idea whose thread is open, and the part marked for a moment (opened from Comments).
	const [openIdeaPin, setOpenIdeaPinState] = React.useState<string>();
	const setOpenIdeaPin = (id: string | undefined) => {
		setOpenIdeaPinState(id);
		readComment(id);
	};
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
	// Adding a comment: "Add comment" on the prototype's toolbar turns it on for the prototype and the idea (one button).
	const [addingComment, setAddingComment] = React.useState(false);
	// The Comments panel's filters (the icon beside its X): open and resolved, on the idea and on the prototype.
	const [filters, setFilters] = React.useState(defaultCommentFilters);
	const closeComments = () => {
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
	const everything = [
		...ideaComments.map((comment) => ({ kind: "idea" as const, comment, resolved: Boolean(comment.resolved) })),
		...prototypeComments.map((comment) => ({ kind: "prototype" as const, comment, resolved: Boolean(comment.resolved) })),
	].sort((a, b) => Number(a.resolved) - Number(b.resolved) || b.comment.createdAt.localeCompare(a.comment.createdAt));
	const all = everything.filter((entry) => showsComment(filters, entry.comment, entry.kind));

	return (
		<div className='flex h-screen bg-background text-foreground'>
			<div className='flex min-w-0 flex-1 flex-col'>
				{/* The Sparks Project header's frame: the idea's name on the left (no menu: it isn't theirs), with the published
				    version beside it (AppHeader's 16px left gap); Comments, notifications and their avatar on the right. */}
				<AppHeader
					logo={
						<>
							{/* As the concept's name in Dana's header (2xl bold, 24/30), without the dotted underline: it isn't theirs to
							    rename. Then where it stands for them, 12px after it, as her status badge (the version is the
							    prototype's title). */}
							<Typography as='h1' size='2xl' weight='bold' className='min-w-0 truncate leading-[30px] text-foreground'>
								{ideaName}
							</Typography>
							<TeamMemberStatusBadge
								status={advanced ? "advanced" : view ? "assessed" : "assess"}
								date={advanced?.date}
								className='-ms-1 shrink-0'
							/>
						</>
					}
				>
					<HeaderIconButton
						ref={commentsButtonRef}
						label='Comments'
						// A reply they haven't opened: the sky dot, as on Dana's "Comments" and the bell.
						dot={unreadReplies.length > 0}
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
					{/* Their assessment, behind the header's dark button (as Dana's "Publish"), before their avatar, in a dialog: it's
					    the one decision they're asked for, so it takes the screen (dimmed behind it), not a popover. Dana's invitation is
					    the email that brought them here, not part of the page. Once sent, the button reads "Assessment shared". */}
					{advanced ? null : (
						<Dialog open={reviewOpen} onOpenChange={setReviewOpen}>
							<DialogTrigger asChild>
								{view ? (
									// Sent: "Assessment shared", a Flat button (as Dana's "Published"), which opens what they sent, to change it.
									// Their view itself is on the "Your assessment" card.
									<Button variant='flat' className='px-3.5'>
										Assessment shared
									</Button>
								) : (
									<Button variant='neutral' className='px-3.5'>
										Share your assessment
									</Button>
								)}
							</DialogTrigger>
							<DialogContent aria-labelledby={viewTitleId} className='flex flex-col gap-5 p-6 sm:max-w-[560px]'>
								<DialogHeader className='gap-2 text-start'>
									<DialogTitle id={viewTitleId} className='text-xl font-semibold text-foreground-prominent'>
										Your assessment
									</DialogTitle>
									<DialogDescription className='text-base text-foreground'>
										Should it move forward? {firstName} asks for a decision once the teams have given theirs.
									</DialogDescription>
									<p className='text-sm text-muted-foreground'>
										{invitation ? `By ${invitation.due} · ` : ""}Version {version}, published {published.label.toLowerCase()}. {firstName} keeps working on hers; you see
										this version until she publishes an update.
									</p>
								</DialogHeader>
								{view && !editingView ? (
								<div className='flex flex-col gap-2'>
									<Badge variant='flat' tone={viewTone[view.view]} size='sm' className='w-fit'>
										{view.view}
									</Badge>
									<p className='text-base text-foreground'>"{view.why}"</p>
									<Button variant='link' className='h-auto w-fit p-0 text-sm font-medium' onClick={() => setEditingView(true)}>
										Change your assessment
									</Button>
								</div>
								) : (
								<form
									// 24px between the choices, the field and the buttons.
									className='flex flex-col gap-6'
									onSubmit={(event) => {
										event.preventDefault();
										if (!choice || !why.trim()) return;
										onViewChange?.({ view: choice, why: why.trim(), version });
										setEditingView(false);
										setReviewOpen(false);
									}}
								>
									{/* One option per row, each a radio button with its label. */}
									<RadioGroup
										aria-label='Your assessment'
										value={choice ?? ""}
										onValueChange={(next) => {
											// The first choice brings in "Why", with the field ready to type in; moving between options afterwards (arrow
											// keys) leaves focus on them.
											if (!choice) requestAnimationFrame(() => whyRef.current?.focus());
											setChoice(next as ReviewerView["view"]);
										}}
										className='gap-2.5'
									>
										{views.map((option) => (
											<div key={option} className='flex items-center gap-2'>
												<RadioGroupItem value={option} id={`${viewTitleId}-${option}`} />
												<label htmlFor={`${viewTitleId}-${option}`} className='cursor-pointer text-base font-medium text-foreground'>
													{option}
												</label>
											</div>
										))}
									</RadioGroup>
									{/* Only once an option is chosen: why, in a sentence. */}
									{choice ? (
										<motion.div variants={prefersReducedMotion ? fadeVariants : revealVariants} initial={view ? false : "initial"} animate='animate'>
											<textarea
												ref={whyRef}
												aria-label='Why'
												placeholder='Why, in a sentence'
												rows={2}
												value={why}
												onChange={(event) => setWhy(event.target.value)}
												className={fieldClasses}
											/>
										</motion.div>
									) : null}
									{/* The dialog's actions, from the start: "Cancel" (outlined) and "Submit assessment" (Button `neutral`, dark, as Dana's
									    "Publish"), which can't be selected until there's a choice and why. Cancel closes it; changing an assessment
									    already sent, it goes back to what they'd sent. */}
									<div className='flex justify-end gap-2'>
										<Button
											type='button'
											variant='outline'
											onClick={() => {
												if (view) {
													setChoice(view.view);
													setWhy(view.why);
													setEditingView(false);
												}
												setReviewOpen(false);
											}}
										>
											Cancel
										</Button>
										<Button type='submit' variant='neutral' disabled={!choice || !why.trim()}>
											Submit assessment
										</Button>
									</div>
								</form>
								)}
							</DialogContent>
						</Dialog>
					)}
					<UserAvatar user={user} />
				</AppHeader>

				{/* The same two panels as Dana's Review. */}
				<main className='flex min-h-0 flex-1 gap-4 px-6 pb-6'>
					<section aria-label='Idea for review' className='flex min-h-0 min-w-0 flex-1 basis-0 flex-col rounded-card bg-background-subtle'>
						<div className='flex h-[68px] shrink-0 items-center gap-3 px-5'>
							{/* The idea's name, as on Dana's Review; it gives way (truncates) before the badge does. */}
							<Typography as='h2' size='xl' weight='semibold' className='min-w-0 truncate text-foreground' title={prototype.label}>
								{prototype.label}
							</Typography>
							{/* On the right: "Jump to a section", as on Dana's Review. The evidence is at the end of the Summary; where it
							    stands is the header's badge ("Advanced"). */}
							<div className='ms-auto flex shrink-0 items-center'>
								<SectionsMenu
									container={documentRef}
									root={scrollRef}
									lead={showsAssessment ? { label: "Your assessment", target: assessmentRef } : undefined}
									comments={ideaComments}
								/>
							</div>
						</div>
						{/* One scroll for both cards, as on Dana's Review: their assessment, once they've given it, then the idea. */}
						<div ref={scrollRef} className='scrollbar-subtle flex min-h-0 flex-1 flex-col scroll-pt-4 overflow-y-auto px-5 pb-6'>
							{/* "Your assessment" (sparks.ds "Team assessment"'s card: white, 32px padding, 12px corners, 16px above the idea),
							    once they've sent it: their view, why, and "Change your assessment", which opens it in the header's popover.
							    Only theirs: the other teams' views stay with Dana. It comes in (Expand) when they send it. */}
							<AnimatePresence initial={false}>
								{showsAssessment && view ? (
									<motion.div key='your-assessment' {...assessmentClip} variants={expandVariants} initial='initial' animate='animate' exit='exit' className='shrink-0'>
										<div className='pb-4'>
											<section
												ref={assessmentRef}
												tabIndex={-1}
												aria-labelledby={assessmentTitleId}
												className='flex flex-col gap-3 rounded-[12px] bg-background p-8 outline-none'
											>
												<div className='flex items-center justify-between gap-4'>
													<h3 id={assessmentTitleId} className='text-lg font-semibold text-foreground-prominent'>
														Your assessment
													</h3>
													{/* As the team assessment's action (base medium, the link color), without its chevron: it opens a dialog here, not another view. */}
													<button
														type='button'
														onClick={() => {
															setEditingView(true);
															setReviewOpen(true);
														}}
														className='inline-flex shrink-0 items-center rounded-sm text-base font-medium text-link outline-none hover:underline focus-visible:ring-[3px] focus-visible:ring-ring/50'
													>
														Change your assessment
													</button>
												</div>
												<Badge variant='flat' tone={viewTone[view.view]} size='sm' className='w-fit'>
													{view.view}
												</Badge>
												<p className='text-base text-foreground'>"{view.why}"</p>
												<p className='text-sm text-muted-foreground'>
													On version {view.version ?? version}. {firstName} asks for a decision once the teams have given theirs.
												</p>
											</section>
										</div>
									</motion.div>
								) : null}
							</AnimatePresence>
							<div ref={documentRef} className='flex shrink-0 grow flex-col rounded-[12px] bg-background p-8'>
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
						</div>
					</section>
					<PrototypePanel
						className='min-w-0 basis-0'
						audiences={prototype.audiences}
						screens={prototype.screenList}
						paths={[{ id: "published", label: prototype.label }]}
						path='published'
						// As Dana's Review: the idea's panel has the name; the title is the version, with when it was published under it.
						titleShows='version'
						published={{ version, at: publishedAt }}
						versions={versions.map((v) => ({ id: String(v.version), name: v.name, number: v.version, publishedAt: v.publishedAt }))}
						viewingVersion={String(version)}
						onViewVersion={(id) => setViewing(Number(id))}
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
						className='relative flex h-full shrink-0 flex-col border-s border-border bg-[color-mix(in_srgb,var(--background-subtle)_50%,var(--background))]'
						style={{ width: commentsWidth }}
					>
						<SidePanelResizer width={commentsWidth} onWidthChange={setCommentsWidth} label='Resize comments' />
						<SidePanel
							title='Comments'
							actions={<CommentFiltersMenu filters={filters} onChange={setFilters} />}
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
													replies={entry.comment.replies?.length}
													unread={unreadReplies.includes(entry.comment.id)}
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
													unread={unreadReplies.includes(entry.comment.id)}
													onOpen={() => setOpenPin(entry.comment.id)}
												/>
											</li>
										),
									)}
								</ul>
							) : (
								<div className='flex flex-col gap-1'>
									{everything.length ? (
										<p className='text-sm text-muted-foreground'>No comments here with these filters.</p>
									) : (
										<>
											<p className='text-sm font-medium text-foreground'>No comments yet</p>
											<p className='text-sm text-muted-foreground'>Select "Add comment" on the idea or the prototype, then a spot on it, or select text in the idea.</p>
										</>
									)}
								</div>
							)}
						</SidePanel>
					</motion.aside>
				) : null}
			</AnimatePresence>
		</div>
	);
}

export { PublishedIdea, type PublishedVersion, type AdvancedIdea, type IdeaComment, type PublishedIdeaProps, type ReviewerView };
