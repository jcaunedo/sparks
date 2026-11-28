import * as React from "react";
import { Check, LoaderCircle, Menu } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { ActivityFeed } from "@/components/chat/activity-feed";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/data-display/avatar";
import { Badge } from "@/components/data-display/badge";
import { InlineAlert } from "@/components/feedback/inline-alert";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/overlays/dropdown-menu";
import { Typography } from "@/components/typography/typography";
import { expandVariants, fadeVariants, revealVariants, scrollIntoViewSmoothly, useExpandClip, useMotionPreference } from "@/lib/motion";
import { formatRelativeDate } from "@/lib/relative-date";
import { cn } from "@/lib/utils";

import { HeaderIconButton } from "../../header-icon-button";
import { PrototypeComments, type CommentMention, type CommentScope, type PrototypeComment, type PrototypeCommentAuthor } from "../prototype/prototype-comments";
import { listInWords } from "../plan/plan-summary";
import { VersionsMenu } from "../shared/versions-menu";
import type { ReviewNext } from "./review-next";

/*
 * Review (prds/sparks-review.md): the concept prepared for review from the spec (nothing new, every statement keeping
 * its label), the reviewers and their views, the recommendation and the decision.
 */

/**
 * A person asked to review it, and their team: what they evaluate, how far they've got, and their view (their
 * assessment) of a published version. Their view is what the team assessment counts (`review-status.tsx`).
 */
type Reviewer = {
	id: string;
	name: string;
	avatarSrc?: string;
	/** Their job title and team, as Share shows them ("UX lead · UX team"). */
	subtitle?: string;
	/** Their team ("UX team", "Engineering"). */
	department: string;
	evaluates: string;
	status: "invited" | "opened" | "commented" | "view";
	/** When they reached `status` (ISO): invited when it was published, then each step. Shown after it ("Invited · 14 min ago"). */
	at?: string;
	view?: "Advance" | "Advance with changes" | "Don't advance yet";
	/** Their sentence on why, once they've given their view. */
	why?: string;
	/** What they wrote when they commented (before their view), shown in Comments. */
	comment?: string;
	/** The published version their view is about. */
	version?: number;
	/** Their view of an earlier version, kept once an update is published and they look again. */
	earlier?: { version: number; view: NonNullable<Reviewer["view"]> };
};

/** The concept for review (prds/sparks-review.md, "What's reviewed"), one part per heading. */
type ConceptForReview = {
	/** The evidence status with its method, first: "Simulation supports hypothesis…", or "Not evaluated" (Evaluate skipped). */
	evidenceStatus: string;
	summary: string;
	gaps: string[];
	hypothesis: string;
	/** User stories, each with its acceptance criteria. */
	stories: { story: string; criteria: string[] }[];
	prototype: string[];
	success: string[];
	why: string[];
	evidence: string[];
	/**
	 * Where the evidence comes from, each once ("business performance", "previous experiments", "Dana", "AI simulation"):
	 * the line under "The evidence", "From …".
	 */
	evidenceSources?: string[];
	build: string[];
	/** What Sparks couldn't settle about building it, each with how engineering can check it ("… How: …"). */
	engineering: string[];
	/** What the build has to record so the success criteria can be measured once it's live, drafted from them. */
	tracking: string[];
	design: string[];
	knownIssues: string[];
	/**
	 * Evaluate was skipped: nothing has looked for issues, so "Known issues" shows a warning instead of "None."
	 * (prds/sparks-review.md, "What's reviewed").
	 */
	evaluationSkipped?: boolean;
	realPeople: string[];
	teams: string[];
	decisions: string[];
	openQuestions: string[];
	later: string[];
};

/**
 * A comment on a part of the idea ("Gaps", "Success criteria"…), by a reviewer on the published version, optionally
 * flagging the part as unclear. Listed in Dana's Comments panel and on the reviewers' page.
 */
type IdeaComment = PrototypeComment & {
	/** The part it's on, its pin's `point` ("Gaps"), or "Idea for review" off the parts. */
	part: string;
	unclear?: boolean;
	/** How Dana addressed it, once she has (prds/sparks.md, "Feedback"): everyone sees it under the comment. */
	addressed?: string;
};

/** Comments on the idea have one scope: the idea, whatever the prototype shows. */
const ideaCommentScope: CommentScope = { key: "idea", audience: "idea", audienceLabel: "Idea", device: "desktop" };

/** Where a comment on a part sits, for one made outside the page (sample data): pinned to the part, `fx`/`fy` inside it. */
const ideaCommentAt = (part: string, fx = 0.94, fy = 0.12) => ({ point: part, fx, fy, scope: ideaCommentScope, where: part });

/**
 * Comments on the idea: everyone's, hers to add (`author`) with "Add comment" on (`adding`), threads opened from the
 * Comments panel (`openId`). The same as on the prototype (`PrototypeComments`). `adding` is turned on and off by "Add
 * comment" on the prototype's toolbar: one button for both, none in the idea's header.
 */
type IdeaCommentsProps = {
	items: IdeaComment[];
	onChange: (comments: IdeaComment[]) => void;
	author: PrototypeCommentAuthor;
	adding?: boolean;
	mentionable?: CommentMention[];
	openId?: string;
	onOpenChange?: (id: string | undefined) => void;
};

/**
 * The idea with its comments pinned on it (prds/sparks-review.md, "Comments on the idea"), exactly as on the prototype:
 * with "Add comment" on, a click (or Enter) drops a pin and opens the box; each pin opens its thread, to reply, resolve
 * or delete her own. A pin on a part (`data-point`) follows it. Without `comments`, just the idea.
 */
function IdeaCommentLayer({ comments, children }: { comments?: IdeaCommentsProps; children: React.ReactNode }) {
	if (!comments) return <>{children}</>;
	const { items, onChange } = comments;
	return (
		<PrototypeComments
			active={Boolean(comments.adding)}
			author={comments.author}
			scope={ideaCommentScope}
			comments={items}
			onAdd={(comment) => onChange([...items, { ...comment, part: comment.point ?? "Idea for review" }])}
			onDelete={(id) => onChange(items.filter((item) => item.id !== id))}
			onUpdate={(comment) => onChange(items.map((item) => (item.id === comment.id ? { ...item, ...comment } : item)))}
			mentionable={comments.mentionable}
			openId={comments.openId}
			onOpenChange={comments.onOpenChange}
			// Selecting text in the idea offers "Add comment" too, with the text quoted.
			selectable
			// As tall as the idea, so the card's padding stays below its last part.
			fill={false}
		>
			{children}
		</PrototypeComments>
	);
}


/** Where the concept is in Review. */
type ReviewStatus =
	| { kind: "ready" }
	| { kind: "in-review" }
	| { kind: "waiting"; owner: string }
	| { kind: "advanced"; owner: string; date: string; reason: string };

type ReviewPanelProps = {
	concept: ConceptForReview;
	/** Dana's recommendation, once she sends it. */
	recommendation?: string;
	/**
	 * Above the idea, on its own card, once it's published: the team assessment (`ReviewTeamAssessment`,
	 * prds/sparks-review.md, "Team assessment"). Hidden while Review status shows it on the right. Review's next step and
	 * the reviewers are in Review status.
	 */
	assessment?: React.ReactNode;
	/** The panel's heading: the idea's name ("Fit check before you buy"). Defaults to "Idea for review". */
	title?: string;
	/**
	 * The paths built (prds/sparks-review.md, "Review's screen"): with more than one, the heading is a menu to switch
	 * between them ("Paths"), the same as the prototype's title in Prototype and Evaluate.
	 */
	paths?: { id: string; label: string }[];
	path?: string;
	onPathChange?: (id: string) => void;
	/** Sparks putting it together, as `ActivityFeed` shows it: done, it folds to "Put together in 18s". */
	progress?: React.ComponentProps<typeof ActivityFeed>;
	/**
	 * While Sparks puts it together (prds/sparks-review.md, "Putting it together"): whether the writing has begun (before
	 * that, the panel is blank), and how many parts are written so far, in the order of `reviewPartsOf(concept)`. The next one
	 * shows as being written. Without it, the whole idea shows.
	 */
	building?: { begun: boolean; written: number };
	/** A part to bring into view (a comment on it was opened), with a key that changes each time it's asked. */
	focusPart?: { part: string; key: number };
	/** Comments on the idea (prds/sparks-review.md, "Comments on the idea"): pinned on it, as on the prototype. */
	comments?: IdeaCommentsProps;
	/** Evaluate skipped: "Run evaluation" in "Known issues"'s warning, which opens Evaluate with the run started. */
	onEvaluate?: () => void;
	className?: string;
};

/** The parts of the idea for review, in order (prds/sparks-review.md, "What's reviewed"). What's still open (Gaps, Known issues) comes right after the summary. Dana's recommendation joins after it once she sends it. */
const reviewPartTitles = [
	"Summary",
	"Gaps",
	"Known issues",
	"What we believe (hypothesis)",
	"What people need to do (user stories), and how to know it’s done (acceptance criteria)",
	"The prototype",
	"Success criteria",
	"Why this direction",
	"The evidence",
	"What it needs to be built",
	"For engineering to check",
	"What to track",
	"Design notes",
	"For the UX team to test with real people",
	"What it changes for teams",
	"Decisions",
	"Open questions",
	"What comes later",
] as const;

type ReviewPartTitle = (typeof reviewPartTitles)[number];

/**
 * The parts shown only when they have something in them (prds/sparks-review.md, "What's reviewed"): "What comes later"
 * is filled only when Dana leaves something for later, so empty it's left out instead of saying "None.".
 */
const partsShownOnlyFilled = { "What comes later": (concept: ConceptForReview) => concept.later.length > 0 } as const satisfies Partial<
	Record<ReviewPartTitle, (concept: ConceptForReview) => boolean>
>;

/** The parts of `titles` this idea shows, in their order: every one, less those left out while empty. */
function reviewPartsOf(concept: ConceptForReview, titles: readonly ReviewPartTitle[] = reviewPartTitles): ReviewPartTitle[] {
	return titles.filter((title) => {
		const filled = partsShownOnlyFilled[title as keyof typeof partsShownOnlyFilled];
		return filled ? filled(concept) : true;
	});
}

/**
 * The same parts, in the order the team who builds it reads them (prds/sparks-review.md, "After the decision"): what to
 * build first, next to the prototype; then why, and how it was decided (`buildContextTitles`).
 */
const buildPartTitles = [
	"What people need to do (user stories), and how to know it’s done (acceptance criteria)",
	"The prototype",
	"What it needs to be built",
	"For engineering to check",
	"What to track",
	"Design notes",
	"Open questions",
	"Known issues",
	"For the UX team to test with real people",
	"What it changes for teams",
] as const satisfies readonly ReviewPartTitle[];

const buildContextTitles = [
	"Summary",
	"Success criteria",
	"What we believe (hypothesis)",
	"Why this direction",
	"The evidence",
	"Gaps",
	"Decisions",
	"What comes later",
] as const satisfies readonly ReviewPartTitle[];

const viewTone = { Advance: "green", "Advance with changes": "amber", "Don't advance yet": "red" } as const;
const statusLabel = { invited: "Invited", opened: "Opened it", commented: "Commented" } as const;

/**
 * Where a reviewer stands, the same wherever it shows (the reviewers' list, Comments, the team assessment's people): their
 * view as a flat badge in its tone, or how far they've got in muted text ("Invited", "Opened it", "Commented").
 */
function ReviewerStatus({ reviewer, size = "sm" }: { reviewer: Reviewer; size?: "xs" | "sm" }) {
	const text = size === "sm" ? "text-sm" : "text-xs";
	// When they got there, after it, muted: "Invited · 14 min ago", "Advance · Yesterday" (the comments' time format).
	const when = reviewer.at ? formatRelativeDate(reviewer.at) : undefined;
	const time = when ? (
		<span className={cn("text-muted-foreground", text)}>
			· <time dateTime={reviewer.at} title={when.title}>{when.label}</time>
		</span>
	) : null;
	if (reviewer.status === "view" && reviewer.view)
		return (
			<span className='inline-flex flex-wrap items-center gap-1.5'>
				<Badge variant='flat' tone={viewTone[reviewer.view]} size='xxs'>
					{reviewer.view}
				</Badge>
				{time}
			</span>
		);
	return (
		<span className='inline-flex flex-wrap items-baseline gap-1'>
			<span className={cn("text-foreground", text)}>{statusLabel[reviewer.status as keyof typeof statusLabel]}</span>
			{time}
		</span>
	);
}

/** One part of the idea, under its heading. `reveal`: it's just been written, so it comes in (Reveal). */
function Part({
	title,
	items,
	reveal = false,
	action,
	below,
	marked = false,
	sources,
	children,
}: {
	title: string;
	items?: string[];
	reveal?: boolean;
	/** On the heading's right, e.g. a reviewer's "Comment". */
	action?: React.ReactNode;
	/** Right under the heading, e.g. a reviewer's comments on it. */
	below?: React.ReactNode;
	/** Marked for a moment: a comment on it was just opened. */
	marked?: boolean;
	/** Where what it says comes from: one muted line under it, "From …" (as Plan's summaries). */
	sources?: string[];
	children?: React.ReactNode;
}) {
	const { prefersReducedMotion } = useMotionPreference();
	return (
		<motion.section
			aria-label={title}
			data-part={title}
			// "Jump to a section" puts focus here (no ring: it's where she's reading, not a control).
			tabIndex={-1}
			// What a comment on the idea is pinned to (`IdeaCommentLayer`): the part, wherever it moves.
			data-point={title}
			variants={revealVariants}
			initial={reveal && !prefersReducedMotion ? "initial" : false}
			animate='animate'
			className={cn(
				"flex flex-col gap-2 rounded-sm outline-none transition-colors",
				marked && "bg-(--corn-50)",
			)}
		>
			<div className='flex items-start justify-between gap-3'>
				<Typography as='h3' size='lg' weight='semibold' className='text-foreground-prominent'>
					{title}
				</Typography>
				{action}
			</div>
			{below}
			{children}
			{items?.length ? (
				<ul className='flex list-disc flex-col gap-1 ps-5 text-base text-foreground'>
					{items.map((item) => (
						<li key={item}>{item}</li>
					))}
				</ul>
			) : null}
			{items && items.length === 0 ? <p className='text-sm text-muted-foreground'>None.</p> : null}
			{/* Plan's sources line (`PlanSummary`), a step smaller than the text it's under: sm here, under base. */}
			{sources?.length ? <p className='text-sm text-muted-foreground'>From {listInWords(sources)}.</p> : null}
		</motion.section>
	);
}

/** The part Sparks is writing now: its heading, "Writing…" and two placeholder lines. */
function PartInProgress({ title, ref }: { title: string; ref?: React.Ref<HTMLDivElement> }) {
	return (
		<div ref={ref} className='flex flex-col gap-2'>
			<Typography as='h3' size='lg' weight='semibold' className='text-foreground-prominent'>
				{title}
			</Typography>
			<p className='flex items-center gap-2 text-sm text-muted-foreground'>
				<LoaderCircle aria-hidden className='size-4 animate-spin motion-reduce:animate-none' />
				Writing…
			</p>
			<span aria-hidden className='h-3 w-full animate-pulse rounded-sm bg-muted motion-reduce:animate-none' />
			<span aria-hidden className='h-3 w-4/5 animate-pulse rounded-sm bg-muted motion-reduce:animate-none' />
		</div>
	);
}

/**
 * What each reviewer has written, by id, for the line under them ("1 comment on the idea · 1 open on the prototype"):
 * by the person, not their team (a team has several reviewers). Nothing for someone who hasn't commented. The same line
 * in Comments and in Review status's "Assessments".
 */
function reviewerCommentNotes(reviewers: Reviewer[], ideaComments: IdeaComment[] = [], prototypeComments: PrototypeComment[] = []) {
	return Object.fromEntries(
		reviewers.map((reviewer) => {
			const onIdea = ideaComments.filter((comment) => comment.author.name === reviewer.name).length;
			const onPrototype = prototypeComments.filter((comment) => comment.author.name === reviewer.name && !comment.resolved).length;
			const lines = [
				onIdea ? `${onIdea} ${onIdea === 1 ? "comment" : "comments"} on the idea` : "",
				onPrototype ? `${onPrototype} open on the prototype` : "",
			].filter(Boolean);
			return [reviewer.id, lines.join(" · ")];
		}),
	) as Record<string, string>;
}

/**
 * The reviewers: each person's photo, name, and title and team, then their status (invited, opened, commented) or view
 * under it, and why. With `onOpen` (Comments), a reviewer who has commented or given their view is a button that opens
 * their comment, with the unread dot while it's in `unread`; the others stay plain rows. With `onOpenComments` (Review
 * status), their comments line is a link to their comments in Comments.
 */
function ReviewerList({
	reviewers,
	unread = [],
	onOpen,
	onOpenComments,
	notes = {},
	size = "sm",
	marked,
}: {
	/** A reviewer marked for a moment (by id): selected in the team assessment, so their row is where to look. */
	marked?: string;
	/** Text size: `sm` in the narrow Comments panel; `base` in Review's panel, as Evaluate's text. */
	size?: "sm" | "base";
	reviewers: Reviewer[];
	unread?: string[];
	onOpen?: (id: string) => void;
	/** A line under a reviewer, by id, e.g. "1 comment on the idea · 1 open on the prototype" (`reviewerCommentNotes`). */
	notes?: Record<string, string>;
	/** Their `notes` line becomes a link (for rows that don't open anything themselves): their comments, in Comments. */
	onOpenComments?: (id: string) => void;
}) {
	return (
		<ul className='flex flex-col divide-y divide-border'>
			{reviewers.map((reviewer) => {
				const openable = Boolean(onOpen) && (reviewer.status === "commented" || reviewer.status === "view");
				const isUnread = openable && unread.includes(reviewer.id);
				const Row = openable ? "button" : "div";
				return (
				// Focusable from code only (`data-reviewer`), so selecting them in the team assessment puts her on their row.
				<li key={reviewer.id} data-reviewer={reviewer.id} tabIndex={-1} className='outline-none'>
					<Row
						{...(openable ? { type: "button" as const, onClick: () => onOpen?.(reviewer.id) } : {})}
						className={cn(
							// 8px of fill around the row (`-mx-2 px-2`), for the hover and for the mark, without moving its text.
							"relative -mx-2 flex w-[calc(100%+1rem)] flex-col gap-1 rounded-md px-2 py-2 text-start transition-colors motion-reduce:transition-none",
							openable && "outline-none hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring",
							marked === reviewer.id && "bg-(--corn-50)",
						)}
					>
					{/* New feedback she hasn't opened: the unread dot (the notifications' sky), before the name. */}
					{isUnread ? (
						<span className='absolute top-3.5 -left-2.5 size-2 rounded-full bg-(--sky-500)'>
							<span className='sr-only'>New: </span>
						</span>
					) : null}
					{/* Their photo (32px), centered on their name and title, as in Share's lists; where they stand is the badge
					    under them, not an icon. */}
					<span className='flex min-w-0 items-center gap-2'>
						<Avatar className='shrink-0'>
							{reviewer.avatarSrc ? <AvatarImage src={reviewer.avatarSrc} alt='' /> : null}
							<AvatarFallback>{reviewer.name.split(" ").map((part) => part[0]).join("").slice(0, 2)}</AvatarFallback>
						</Avatar>
						{/* The name, and their title and team right under it ("Catalog manager · Catalog"), exactly as in Share's lists
						    (sm semibold, xs muted, no gap); their view of an earlier version after it, once they're looking again. */}
						<span className='flex min-w-0 flex-col'>
							<span className='truncate text-sm font-semibold text-foreground'>{reviewer.name}</span>
							<span className='truncate text-xs text-muted-foreground'>
								{reviewer.subtitle ?? reviewer.department}
								{reviewer.earlier && reviewer.status !== "view" ? ` · ${reviewer.earlier.view} on version ${reviewer.earlier.version}` : ""}
							</span>
						</span>
					</span>
					{/* Under them, aligned with the name (40px in: the photo and its 8px gap): where they stand (their view's badge, or
					    "Invited"…), 6px below the title and 4px above why, as in the team assessment's popovers (prds/sparks-review.md,
					    "Assessments"). */}
					<span className='flex min-w-0 flex-col gap-1 ps-10'>
						<span className='flex pt-0.5'>
							<ReviewerStatus reviewer={reviewer} size={size === "base" ? "sm" : "xs"} />
						</span>
						{reviewer.why ? <span className={cn("text-foreground", size === "base" ? "text-base" : "text-sm")}>"{reviewer.why}"</span> : null}
						{notes[reviewer.id] ? (
							// A row that opens their comment says so itself; otherwise the line is the link to them, in Comments.
							onOpenComments && !openable ? (
								<button
									type='button'
									className={cn(
										"w-fit rounded-sm text-start font-medium text-link underline-offset-2 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring",
										size === "base" ? "text-sm" : "text-xs",
									)}
									onClick={() => onOpenComments(reviewer.id)}
								>
									{notes[reviewer.id]}
								</button>
							) : (
								<span className='text-xs font-medium text-link'>{notes[reviewer.id]}</span>
							)
						) : null}
					</span>
					</Row>
				</li>
				);
			})}
		</ul>
	);
}

/**
 * The evidence's outcomes, one per method and one per line, at the end of the Summary ("Business data supports hypothesis",
 * "Simulation supports hypothesis"; prds/sparks.md, "Evidence status"): sm, foreground, each after a 14px check in the
 * success color when it supports the hypothesis; the others (not evaluated, doesn't support, inconclusive) without one.
 */
function EvidenceOutcomes({ status }: { status: string }) {
	// The status's first sentence holds the outcomes, " · " between them; what follows explains the method.
	const outcomes = status.split(".")[0].split(" · ").map((outcome) => outcome.trim()).filter(Boolean);
	if (!outcomes.length) return null;
	return (
		// One per line, 8px more above them than between the Summary's paragraphs (16px).
		<ul aria-label='Evidence' className='flex flex-col gap-1 pt-2 text-sm text-foreground'>
			{outcomes.map((outcome) => {
				const supports = /supports hypothesis$/i.test(outcome) && !/not support/i.test(outcome);
				return (
					<li key={outcome} className='flex items-center gap-1.5'>
						{supports ? <Check aria-hidden className='size-3.5 shrink-0 text-success' /> : null}
						{outcome}
					</li>
				);
			})}
		</ul>
	);
}

/** What each part says, by its title in `reviewPartTitles`. */
function reviewPartBody(concept: ConceptForReview, onEvaluate?: () => void): Record<ReviewPartTitle, { items?: string[]; sources?: string[]; children?: React.ReactNode }> {
	return {
		Summary: {
			children: (
				<>
					<p className='text-base font-medium text-foreground'>{concept.evidenceStatus}</p>
					<p className='text-base text-foreground'>{concept.summary}</p>
					<EvidenceOutcomes status={concept.evidenceStatus} />
				</>
			),
		},
		Gaps: { items: concept.gaps },
		// Evaluate skipped: "None." would say it was checked and is fine; it says it wasn't checked, with a way to (Dana's side).
		"Known issues":
			concept.evaluationSkipped && !concept.knownIssues.length
				? {
						children: (
							<InlineAlert tone='warning' action={onEvaluate ? { label: "Run evaluation", onClick: onEvaluate } : undefined}>
								Evaluate was skipped, so issues haven't been checked.
							</InlineAlert>
						),
					}
				: { items: concept.knownIssues },
		"What we believe (hypothesis)": { children: <p className='text-base text-foreground'>{concept.hypothesis}</p> },
		"What people need to do (user stories), and how to know it’s done (acceptance criteria)": {
			children: (
				<ul className='flex flex-col gap-3'>
					{concept.stories.map((item) => (
						<li key={item.story} className='flex flex-col gap-1 text-base'>
							<span className='font-medium text-foreground'>{item.story}</span>
							<ul className='flex list-disc flex-col gap-0.5 ps-5 text-foreground'>
								{item.criteria.map((criterion) => (
									<li key={criterion}>{criterion}</li>
								))}
							</ul>
						</li>
					))}
				</ul>
			),
		},
		"The prototype": { items: concept.prototype },
		"Success criteria": { items: concept.success },
		"Why this direction": { items: concept.why },
		"The evidence": { items: concept.evidence, sources: concept.evidenceSources },
		"What it needs to be built": { items: concept.build },
		"For engineering to check": { items: concept.engineering },
		"What to track": { items: concept.tracking },
		"Design notes": { items: concept.design },
		"For the UX team to test with real people": { items: concept.realPeople },
		"What it changes for teams": { items: concept.teams },
		Decisions: { items: concept.decisions },
		"Open questions": { items: concept.openQuestions },
		"What comes later": { items: concept.later },
	};
}


/**
 * The idea for review, part by part (prds/sparks-review.md, "What's reviewed"): the same document in Dana's Review
 * panel and on the page the teams open (`PublishedIdea`). `shown`: the parts written so far, while Sparks writes it,
 * each coming in (`reveal`). `partAction`: something on each part's heading, e.g. a reviewer's "Comment"; `partBelow`: under it.
 * `titles`: which parts, in which order (the team who builds it reads `buildPartTitles` first); every part by default.
 */
function ReviewDocument({
	concept,
	titles = reviewPartTitles,
	recommendation,
	shown,
	reveal = false,
	partAction,
	partBelow,
	marked,
	onEvaluate,
}: {
	concept: ConceptForReview;
	/** "Run evaluation" in "Known issues" when Evaluate was skipped (Dana's Review; none on the teams' page). */
	onEvaluate?: () => void;
titles?: readonly ReviewPartTitle[];
	/** A part marked for a moment (a comment on it was just opened). */
	marked?: string;
/** Dana's recommendation, after Known issues, once sent. */
	recommendation?: string;
	shown?: number;
	reveal?: boolean;
	partAction?: (title: string) => React.ReactNode;
	partBelow?: (title: string) => React.ReactNode;
}) {
	const body = reviewPartBody(concept, onEvaluate);
	const parts = reviewPartsOf(concept, titles);
	return (
		<>
			{parts.slice(0, shown ?? parts.length).map((title) => (
				<React.Fragment key={title}>
					<Part
						title={title}
						reveal={reveal}
						action={partAction?.(title)}
						below={partBelow?.(title)}
						marked={marked === title}
{...body[title]}
					/>
					{title === "Known issues" && recommendation ? (
						<Part title='Recommendation'>
							<p className='text-base text-foreground'>{recommendation}</p>
							<span className='text-sm text-muted-foreground'>Dana's recommendation</span>
						</Part>
					) : null}
</React.Fragment>
			))}
		</>
	);
}

/**
 * "Jump to a section" (a ghost icon button, lucide `Menu`, on the right of the idea panel's header): a menu with the
 * idea's parts as they are on the page (`[data-part]` in `container`, read when it opens: only those written, Dana's
 * recommendation once sent); choosing one scrolls the card to it, at the top (`scrollIntoViewSmoothly`). `onJump` runs
 * first. The same on Dana's Review and the reviewers' page.
 *
 * `comments`: a part with an open comment she hasn't seen yet has a sky dot on the left of its name. It's seen once
 * she jumps to the part, or once its heading has been fully on screen in `container` (scrolled to, or there when the
 * comment came); a new comment on it brings the dot back. While any part has one, the button has the dot too.
 */
function SectionsMenu({
	container,
	root,
	lead,
	onJump,
	comments = [],
}: {
	/** Where the parts are (`[data-part]`). */
	container: React.RefObject<HTMLElement | null>;
	/** What scrolls, when it isn't `container` (e.g. Review's panel, where the team assessment scrolls with the idea). */
	root?: React.RefObject<HTMLElement | null>;
	/** First in the list, with a line under it, before the parts: e.g. "Team assessment", once it's published. */
	lead?: { label: string; target: React.RefObject<HTMLElement | null> };
	onJump?: () => void;
	comments?: Pick<IdeaComment, "id" | "part" | "resolved">[];
}) {
	const { prefersReducedMotion } = useMotionPreference();
	const [parts, setParts] = React.useState<string[]>([]);
	// The comments she has seen, by id: their part was on screen, or she jumped to it.
	const [seen, setSeen] = React.useState<ReadonlySet<string>>(() => new Set());
	const open = comments.filter((c) => !c.resolved);
	// The comments as they are now, for the observer below (set up earlier, it would see only the ones there then).
	const openRef = React.useRef(open);
	openRef.current = open;
	const see = (part: string) =>
		setSeen((current) => {
			const ids = openRef.current.filter((c) => c.part === part && !current.has(c.id)).map((c) => c.id);
			return ids.length ? new Set([...current, ...ids]) : current;
		});
	const unseenComments = open.filter((c) => !seen.has(c.id));
	const unseen = new Set(unseenComments.map((c) => c.part));
	// By comment, not by part: a second comment on a part already marked brings the dot back and is watched for too.
	const unseenKey = unseenComments.map((c) => `${c.id}@${c.part}`).join("|");
	// A part's heading fully on screen in the card marks its comments seen. Watched again whenever an unseen comment
	// comes, so one on a part already on screen is seen at once.
	React.useEffect(() => {
		const parts = container.current;
		if (!parts || !unseenKey || typeof IntersectionObserver === "undefined") return;
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					const part = (entry.target.closest("[data-part]") as HTMLElement | null)?.dataset.part;
					if (entry.isIntersecting && part) see(part);
				}
			},
			// On screen means in what scrolls.
			{ root: root?.current ?? parts, threshold: 1 },
		);
		for (const part of unseen) {
			const heading = parts.querySelector(`[data-part="${CSS.escape(part)}"] h3`);
			if (heading) observer.observe(heading);
		}
		return () => observer.disconnect();
	}, [container, root, unseenKey]);
	// A part was chosen: closing, focus goes to it, not back to the button (no ring, no tooltip left on it).
	const jumped = React.useRef(false);
	const goTo = (element: HTMLElement | null | undefined) => {
		if (!element) return;
		element.focus({ preventScroll: true });
		scrollIntoViewSmoothly(element, { reducedMotion: Boolean(prefersReducedMotion), align: "start" });
	};
	const jump = (part: string) => {
		jumped.current = true;
		see(part);
		onJump?.();
		requestAnimationFrame(() => goTo(container.current?.querySelector<HTMLElement>(`[data-part="${CSS.escape(part)}"]`)));
	};
	const jumpToLead = () => {
		jumped.current = true;
		onJump?.();
		requestAnimationFrame(() => goTo(lead?.target.current));
	};
	return (
		<DropdownMenu
			onOpenChange={(open) => {
				if (open) setParts([...(container.current?.querySelectorAll<HTMLElement>("[data-part]") ?? [])].map((el) => el.dataset.part ?? "").filter(Boolean));
			}}
		>
			<DropdownMenuTrigger asChild>
				{/* The header's sky dot (as on the bell) while any part has a comment she hasn't seen. */}
				<HeaderIconButton label='Jump to a section' dot={unseen.size > 0} className='shrink-0'>
					<Menu aria-hidden />
				</HeaderIconButton>
			</DropdownMenuTrigger>
			{/* 320px: the longest titles truncate. */}
			<DropdownMenuContent
				align='end'
				className='w-80'
				onCloseAutoFocus={(event) => {
					if (!jumped.current) return;
					jumped.current = false;
					event.preventDefault();
				}}
			>
				{/* What sits above the idea (the team assessment), first, with a line under it before the idea's parts. */}
				{lead ? (
					<>
						<DropdownMenuItem onSelect={jumpToLead}>
							{unseen.size ? <span aria-hidden className='size-2 shrink-0 rounded-full' /> : null}
							<span className='min-w-0 truncate'>{lead.label}</span>
						</DropdownMenuItem>
						<DropdownMenuSeparator />
					</>
				) : null}
				{parts.map((part) => (
					<DropdownMenuItem key={part} onSelect={() => jump(part)}>
						{/* The dot's place is kept on every part while any has one, so the names stay aligned (the notifications' sky). */}
						{unseen.size ? <span aria-hidden className={cn("size-2 shrink-0 rounded-full", unseen.has(part) && "bg-(--sky-500)")} /> : null}
						<span className='min-w-0 truncate'>{part}</span>
						{unseen.has(part) ? <span className='sr-only'>(new comments)</span> : null}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

/**
 * The idea for review, on Review's left, with the prototype (or Review status) on its right (prds/sparks-review.md,
 * "Review's screen"; sparks.ds 135:2185): the idea's name; once it's published, the team assessment on its own card
 * (`assessment`); then, on a card, Sparks's progress while it puts it together and every part of "What's reviewed", one
 * heading each, in order. No tabs: Review's next step and the reviewers are in Review status. The same frame as
 * Evaluate's panel.
 */
function ReviewPanel({ concept, title = "Idea for review", paths = [], path, onPathChange, recommendation, assessment, progress, building: build, focusPart, comments, onEvaluate, className }: ReviewPanelProps) {
	const building = Boolean(build);
	// A comment on a part was opened: that part comes into view, at the top, and is marked for a moment.
	const documentRef = React.useRef<HTMLDivElement>(null);
	// What scrolls: the team assessment and the idea's card together.
	const scrollRef = React.useRef<HTMLDivElement>(null);
	const assessmentRef = React.useRef<HTMLDivElement>(null);
	const [marked, setMarked] = React.useState<string>();
	const { prefersReducedMotion: reducedFocus } = useMotionPreference();
	const assessmentClip = useExpandClip();
	React.useEffect(() => {
		if (!focusPart) return;
		let stop = () => {};
		let timer = 0;
		const frame = requestAnimationFrame(() => {
			const element = documentRef.current?.querySelector<HTMLElement>(`[data-part="${CSS.escape(focusPart.part)}"]`);
			if (!element) return;
			setMarked(focusPart.part);
			timer = window.setTimeout(() => setMarked(undefined), 1600);
			stop = scrollIntoViewSmoothly(element, { reducedMotion: Boolean(reducedFocus), align: "start" });
		});
		return () => {
			cancelAnimationFrame(frame);
			window.clearTimeout(timer);
			stop();
		};
	}, [focusPart, reducedFocus]);
	const parts = reviewPartsOf(concept);
	const shown = build ? build.written : parts.length;
	const blank = build ? !build.begun : false;
	// While it's written, the view follows the newest part, unless she has scrolled up to read.
	const writingRef = React.useRef<HTMLDivElement>(null);
	const following = React.useRef(true);
	const { prefersReducedMotion } = useMotionPreference();
	// It opened while being put together: its surface comes in with the first part.
	const [openedBuilding] = React.useState(building);
	React.useEffect(() => {
		if (!building || !following.current || !writingRef.current) return;
		return scrollIntoViewSmoothly(writingRef.current, { reducedMotion: Boolean(prefersReducedMotion), align: "nearest" });
	}, [building, blank, shown, prefersReducedMotion]);
	// Put together: the summary comes first, so it goes back to the top, unless she has scrolled up to read.
	const wasBuilding = React.useRef(building);
	React.useEffect(() => {
		if (wasBuilding.current && !building && following.current && documentRef.current?.firstElementChild) {
			wasBuilding.current = building;
			return scrollIntoViewSmoothly(documentRef.current.firstElementChild as HTMLElement, { reducedMotion: Boolean(prefersReducedMotion), align: "start" });
		}
		wasBuilding.current = building;
	}, [building, prefersReducedMotion]);
	return (
		<section aria-label='Idea for review' className={cn("flex min-h-0 flex-1 flex-col rounded-card bg-background-subtle", className)}>
			{/* The same header as Evaluate's panels: 68px. */}
			<div className='flex h-[68px] shrink-0 items-center gap-3 px-5'>
				{/* The idea's name; it gives way (truncates) before the menu does. No status badge: the header's badge says where
				    the idea stands ("Ready to publish", "In review", "Waiting for a decision", "Advanced"). */}
				{paths.length > 1 ? (
					<div className='min-w-0'>
						<VersionsMenu title={title} versions={[]} paths={paths} path={path} onPathChange={onPathChange} size='xl' />
					</div>
				) : (
					<Typography as='h2' size='xl' weight='semibold' className='min-w-0 truncate text-foreground' title={title}>
						{title}
					</Typography>
				)}
				{/* On the right: "Jump to a section" (not while it's being put together). */}
				{building ? null : (
					<div className='ms-auto flex shrink-0 items-center'>
						<SectionsMenu
							container={documentRef}
							root={scrollRef}
							lead={assessment ? { label: "Team assessment", target: assessmentRef } : undefined}
							comments={comments?.items}
						/>
					</div>
				)}
			</div>
			{/* One scroll for both cards: the team assessment, on its own card above the idea once it's published (sparks.ds
			    135:2185, 16px above the idea's card), and the idea's card; they scroll together, the scrollbar at the panel's
			    edge. The assessment folds away while Review status shows it on the right (Expand), and back. */}
			<div
				ref={scrollRef}
				onScroll={(event) => {
					const el = event.currentTarget;
					following.current = el.scrollHeight - el.scrollTop - el.clientHeight < 96;
				}}
				className='scrollbar-subtle flex min-h-0 flex-1 flex-col scroll-pt-4 overflow-y-auto px-5 pb-6'
			>
				<AnimatePresence initial={false}>
					{assessment && !building ? (
						<motion.div key='assessment' {...assessmentClip} variants={expandVariants} initial='initial' animate='animate' exit='exit' className='shrink-0'>
							{/* "Team assessment" in "Jump to a section" brings it here (focus, without a ring). */}
							<div ref={assessmentRef} tabIndex={-1} className='pb-4 outline-none'>
								{assessment}
							</div>
						</motion.div>
					) : null}
				</AnimatePresence>
				<motion.div
					variants={prefersReducedMotion ? fadeVariants : revealVariants}
					initial={openedBuilding ? "initial" : false}
					animate='animate'
					ref={documentRef}
					aria-busy={building || undefined}
					// It fills the rest of the panel when it's short (while it's written), and grows with its parts.
					className='flex shrink-0 grow flex-col rounded-[12px] bg-background p-8'
				>
					{/* Comments on the idea, the same as on the prototype: with "Add comment" on, a click drops a pin. */}
					<IdeaCommentLayer comments={building ? undefined : comments}>
						{/* As Evaluate's panel: sections one under the other, a line between each, 24px on either side of it. */}
						<div className='flex flex-col divide-y divide-border [&>*]:py-6 [&>*:first-child]:pt-0 [&>*:last-child]:pb-0'>
							{/* Sparks's progress while it puts the idea together; once done, it's gone (the header's badge says
							    "Ready to publish"). */}
							{progress && !progress.done ? <ActivityFeed {...progress} /> : null}
							{/* The parts written so far, each coming in as it's written; then the one being written. */}
							{blank ? null : <ReviewDocument concept={concept} onEvaluate={onEvaluate} recommendation={recommendation} shown={shown} reveal={building} marked={marked} />}
							{building && !blank && shown < parts.length ? <PartInProgress ref={writingRef} title={parts[shown]} /> : null}
						</div>
					</IdeaCommentLayer>
					{building && shown >= parts.length ? <div ref={writingRef} aria-hidden className='h-px shrink-0' /> : null}
				</motion.div>
			</div>
		</section>
	);
}

export {
	buildContextTitles,
	buildPartTitles,
	ideaCommentAt,
	IdeaCommentLayer,
	ReviewDocument,
	reviewerCommentNotes,
	ReviewerList,
	ReviewerStatus,
	ReviewPanel,
	reviewPartTitles,
	reviewPartsOf,
	SectionsMenu,
	viewTone,
	type ConceptForReview,
	type IdeaComment,
	type IdeaCommentsProps,
	type ReviewPanelProps,
	type ReviewPartTitle,
	type ReviewStatus,
	type Reviewer,
};
export type { ReviewNext };
