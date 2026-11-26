import * as React from "react";
import { CircleCheck, CircleDashed, Clock, ExternalLink, Eye, LoaderCircle, MessageSquare } from "lucide-react";
import { motion } from "motion/react";

import { ActivityFeed } from "@/components/chat/activity-feed";
import { Badge } from "@/components/data-display/badge";
import { Button } from "@/components/buttons/button";
import { Typography } from "@/components/typography/typography";
import { fadeVariants, revealVariants, scrollIntoViewSmoothly, useMotionPreference } from "@/lib/motion";
import { cn } from "@/lib/utils";

import { PrototypeComments, type CommentMention, type CommentScope, type PrototypeComment, type PrototypeCommentAuthor } from "../prototype/prototype-comments";
import { ReviewNextStep, type ReviewNext } from "./review-next";

/*
 * Review (prds/sparks-review.md): the concept prepared for review from the spec (nothing new, every statement keeping
 * its label), the reviewers and their views, the recommendation and the decision.
 */

/** A department invited to review: what it evaluates, how far it's got, and its view. Departments, never named people. */
type Reviewer = {
	id: string;
	department: string;
	evaluates: string;
	status: "invited" | "opened" | "commented" | "view";
	view?: "Advance" | "Advance with changes" | "Don't advance yet";
	/** Their sentence on why, once they've given their view. */
	why?: string;
	/** What they wrote when they commented (before their view), shown in Comments. */
	comment?: string;
};

/** The concept for review (prds/sparks-review.md, "What's reviewed"), one part per heading. */
type ConceptForReview = {
	/** The evidence status with its method, first: "Simulation supports hypothesis…", or "Not tested". */
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
	build: string[];
	/** What the build has to record so the success criteria can be measured once it's live, drafted from them. */
	tracking: string[];
	design: string[];
	knownIssues: string[];
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
 * Comments panel (`openId`). The same as on the prototype (`PrototypeComments`).
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
	status: ReviewStatus;
	reviewers: Reviewer[];
	/** Dana's recommendation, once she sends it. */
	recommendation?: string;
	/** What Review is waiting for, at the top: what she does there, one thing at a time. Not for the teams. */
	next?: ReviewNext;
	/** The views are all in, before the decision is asked for: the badge says so. */
	reviewsIn?: boolean;
	/** Sparks putting it together, as `ActivityFeed` shows it: done, it folds to "Put together in 18s". */
	progress?: React.ComponentProps<typeof ActivityFeed>;
	/**
	 * While Sparks puts it together (prds/sparks-review.md, "Putting it together"): whether the writing has begun (before
	 * that, the panel is blank), and how many parts are written so far, in the order of `reviewPartTitles`. The next one
	 * shows as being written. Without it, the whole idea shows.
	 */
	building?: { begun: boolean; written: number };
	/** The prototype version the teams see, once she's published it. */
	published?: number;
	/** Once published: opens the page the teams see (`PublishedIdea`), in its own tab. */
	onOpenPublished?: () => void;
	/** A part to bring into view (a comment on it was opened), with a key that changes each time it's asked. */
	focusPart?: { part: string; key: number };
	/** Comments on the idea (prds/sparks-review.md, "Comments on the idea"): pinned on it, as on the prototype. */
	comments?: IdeaCommentsProps;
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
 * The same parts, in the order the team who builds it reads them (prds/sparks-review.md, "After the decision"): what to
 * build first, next to the prototype; then why, and how it was decided (`buildContextTitles`).
 */
const buildPartTitles = [
	"What people need to do (user stories), and how to know it’s done (acceptance criteria)",
	"The prototype",
	"What it needs to be built",
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

/** One part of the idea, under its heading. `reveal`: it's just been written, so it comes in (Reveal). */
function Part({
	title,
	items,
	reveal = false,
	action,
	below,
	marked = false,
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
	children?: React.ReactNode;
}) {
	const { prefersReducedMotion } = useMotionPreference();
	return (
		<motion.section
			aria-label={title}
			data-part={title}
			// What a comment on the idea is pinned to (`IdeaCommentLayer`): the part, wherever it moves.
			data-point={title}
			variants={revealVariants}
			initial={reveal && !prefersReducedMotion ? "initial" : false}
			animate='animate'
			className={cn(
				"flex flex-col gap-2 rounded-sm transition-colors",
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
 * The reviewers: each department's status (invited, opened, commented) or view, what it evaluates, and why. With
 * `onOpen` (Comments), a reviewer who has commented or given their view is a button that opens their comment, with the
 * unread dot while it's in `unread`; the others stay plain rows.
 */
function ReviewerList({
	reviewers,
	unread = [],
	onOpen,
	notes = {},
	size = "sm",
}: {
	/** Text size: `sm` in the narrow Comments panel; `base` in Review's panel, as Evaluate's text. */
	size?: "sm" | "base";
	reviewers: Reviewer[];
	unread?: string[];
	onOpen?: (id: string) => void;
	/** A line under a reviewer, by id, e.g. "2 open comments on the prototype". */
	notes?: Record<string, string>;
}) {
	return (
		<ul className='flex flex-col divide-y divide-border'>
			{reviewers.map((reviewer) => {
				const openable = Boolean(onOpen) && (reviewer.status === "commented" || reviewer.status === "view");
				const isUnread = openable && unread.includes(reviewer.id);
				const Row = openable ? "button" : "div";
				return (
				<li key={reviewer.id}>
					<Row
						{...(openable ? { type: "button" as const, onClick: () => onOpen?.(reviewer.id) } : {})}
						className={cn(
							"relative flex w-full flex-col gap-1 py-2 text-start",
							openable && "-mx-2 rounded-md px-2 outline-none hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring",
						)}
					>
					{/* New feedback she hasn't opened: the unread dot (the notifications' sky), before the name. */}
					{isUnread ? (
						<span className='absolute top-3.5 -left-2.5 size-2 rounded-full bg-(--sky-500)'>
							<span className='sr-only'>New: </span>
						</span>
					) : null}
					<div className='flex flex-wrap items-center gap-2'>
						{reviewer.status === "view" ? (
							<CircleCheck aria-hidden className='size-4 text-success' />
						) : reviewer.status === "commented" ? (
							<MessageSquare aria-hidden className='size-4 text-icon' />
						) : reviewer.status === "opened" ? (
							<Eye aria-hidden className='size-4 text-icon' />
						) : (
							<CircleDashed aria-hidden className='size-4 text-muted-foreground' />
						)}
						<span className={cn("font-medium text-foreground", size === "base" ? "text-base" : "text-sm")}>{reviewer.department}</span>
						{reviewer.status === "view" && reviewer.view ? (
							<Badge variant='flat' tone={viewTone[reviewer.view]} size='xxs'>
								{reviewer.view}
							</Badge>
						) : (
							<span className={cn("text-muted-foreground", size === "base" ? "text-sm" : "text-xs")}>{statusLabel[reviewer.status as keyof typeof statusLabel]}</span>
						)}
					</div>
					<span className={cn("ps-6 text-muted-foreground", size === "base" ? "text-sm" : "text-xs")}>Evaluates {reviewer.evaluates}</span>
					{reviewer.why ? <span className={cn("ps-6 text-foreground", size === "base" ? "text-base" : "text-sm")}>"{reviewer.why}"</span> : null}
					{notes[reviewer.id] ? <span className='ps-6 text-xs font-medium text-link'>{notes[reviewer.id]}</span> : null}
					</Row>
				</li>
				);
			})}
		</ul>
	);
}

/** What each part says, by its title in `reviewPartTitles`. */
function reviewPartBody(concept: ConceptForReview): Record<ReviewPartTitle, { items?: string[]; children?: React.ReactNode }> {
	return {
		Summary: {
			children: (
				<>
					<p className='text-base font-medium text-foreground'>{concept.evidenceStatus}</p>
					<p className='text-base text-foreground'>{concept.summary}</p>
				</>
			),
		},
		Gaps: { items: concept.gaps },
		"Known issues": { items: concept.knownIssues },
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
		"The evidence": { items: concept.evidence },
		"What it needs to be built": { items: concept.build },
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
}: {
	concept: ConceptForReview;
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
	const body = reviewPartBody(concept);
	return (
		<>
			{titles.slice(0, shown ?? titles.length).map((title) => (
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
 * The idea for review, on Review's left, with the prototype on its right (prds/sparks-review.md, "Review's screen"): on
 * top, where it stands and "See what the teams see"; on a card, what Sparks put together in (its progress), the next step
 * (`ReviewNextStep`), the reviewers once it's published, then every part of "What's reviewed", one heading each, in
 * order. The same frame as Evaluate's panel. Not in Figma yet.
 */
function ReviewPanel({ concept, status, reviewers, recommendation, next, reviewsIn = false, progress, building: build, published, onOpenPublished, focusPart, comments, className }: ReviewPanelProps) {
const building = Boolean(build);
	// A comment on a part was opened: that part comes into view, at the top, and is marked for a moment.
	const documentRef = React.useRef<HTMLDivElement>(null);
	const [marked, setMarked] = React.useState<string>();
	const { prefersReducedMotion: reducedFocus } = useMotionPreference();
	React.useEffect(() => {
		if (!focusPart) return;
		const element = documentRef.current?.querySelector<HTMLElement>(`[data-part="${CSS.escape(focusPart.part)}"]`);
		if (!element) return;
		setMarked(focusPart.part);
const timer = window.setTimeout(() => setMarked(undefined), 1600);
		const stop = scrollIntoViewSmoothly(element, { reducedMotion: Boolean(reducedFocus), align: "start" });
		return () => {
			window.clearTimeout(timer);
			stop();
		};
	}, [focusPart, reducedFocus]);
	const shown = build ? build.written : reviewPartTitles.length;
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
	// While it's put together, its progress shows at the top: no badge.
	const banner = building ? null : status.kind === "advanced" ? (
			<Badge variant='flat' tone='green' size='sm' className='w-fit'>
				Advanced · {status.date}
			</Badge>
		) : status.kind === "waiting" ? (
			<Badge variant='flat' tone='blue' size='sm' className='w-fit'>
				<Clock aria-hidden /> Waiting for a decision from {status.owner}
			</Badge>
		) : status.kind === "in-review" ? (
			<Badge variant='flat' tone='blue' size='sm' className='w-fit'>
				{reviewsIn ? "The reviews are in" : published ? `Published · version ${published}` : "In review"}
			</Badge>
		) : (
			<Badge variant='flat' tone='neutral' size='sm' className='w-fit'>
				Ready for review
			</Badge>
		);
	return (
		<section aria-label='Idea for review' className={cn("flex min-h-0 flex-1 flex-col rounded-card bg-background-subtle", className)}>
			{/* The same header as Evaluate's panels: 68px. */}
			<div className='flex h-[68px] shrink-0 items-center gap-3 px-5'>
				<Typography as='h2' size='xl' weight='semibold' className='shrink-0 text-foreground'>
					Idea for review
				</Typography>
				{banner}
				{/* What the teams see: the published version's page, in its own tab, as a link would open it. */}
				{published && onOpenPublished ? (
					<Button variant='link' className='ms-auto h-auto min-w-0 gap-1 p-0 text-sm font-medium' onClick={onOpenPublished}>
						<span className='truncate'>See what the teams see</span>
						<ExternalLink aria-hidden className='size-3.5' />
						<span className='sr-only'>(opens in a new tab)</span>
					</Button>
				) : null}
			</div>
			<motion.div
				variants={prefersReducedMotion ? fadeVariants : revealVariants}
				initial={openedBuilding ? "initial" : false}
				animate='animate'
				onScroll={(event) => {
					const el = event.currentTarget;
					following.current = el.scrollHeight - el.scrollTop - el.clientHeight < 96;
				}}
				ref={documentRef}
				aria-busy={building || undefined}
								className='scrollbar-subtle mx-5 mb-6 flex min-h-0 flex-1 flex-col scroll-pt-4 overflow-y-auto rounded-[12px] bg-background p-8'
			>
				{/* Comments on the idea, the same as on the prototype: with "Add comment" on, a click drops a pin. */}
				<IdeaCommentLayer comments={building ? undefined : comments}>
					{/* As Evaluate's panel: sections one under the other, a line between each, 24px on either side of it. */}
					<div className='flex flex-col divide-y divide-border [&>*]:py-6 [&>*:first-child]:pt-0 [&>*:last-child]:pb-0'>
						{progress || (next && !building) ? (
							<div className='flex flex-col gap-3'>
								{progress ? <ActivityFeed {...progress} /> : null}
								{next && !building ? <ReviewNextStep next={next} /> : null}
							</div>
						) : null}

						{reviewers.length ? (
							<section aria-label='Reviewers' className='flex flex-col gap-2'>
								<Typography as='h3' size='lg' weight='semibold' className='text-foreground-prominent'>
									Reviewers
								</Typography>
								<ReviewerList reviewers={reviewers} size='base' />
							</section>
						) : null}

						{/* The parts written so far, each coming in as it's written; then the one being written. */}
						{blank ? null : <ReviewDocument concept={concept} recommendation={recommendation} shown={shown} reveal={building} marked={marked} />}
						{building && !blank && shown < reviewPartTitles.length ? <PartInProgress ref={writingRef} title={reviewPartTitles[shown]} /> : null}
					</div>
				</IdeaCommentLayer>
				{building && shown >= reviewPartTitles.length ? <div ref={writingRef} aria-hidden className='h-px shrink-0' /> : null}
			</motion.div>
		</section>
	);
}

export {
	buildContextTitles,
	buildPartTitles,
	ideaCommentAt,
	IdeaCommentLayer,
	ReviewDocument,
	ReviewerList,
	ReviewPanel,
	reviewPartTitles,
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
