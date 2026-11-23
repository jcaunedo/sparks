import * as React from "react";
import { CircleCheck, CircleDashed, Clock, ExternalLink, Eye, LoaderCircle, MessageSquare } from "lucide-react";
import { motion } from "motion/react";

import { Badge } from "@/components/data-display/badge";
import { Button } from "@/components/buttons/button";
import { Typography } from "@/components/typography/typography";
import { revealVariants, scrollIntoViewSmoothly, useMotionPreference } from "@/lib/motion";
import { cn } from "@/lib/utils";

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
type IdeaComment = {
	id: string;
	part: string;
	text: string;
	createdAt: string;
	author: { name: string; avatarSrc?: string; role?: string };
	unclear?: boolean;
};

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
	/** Dana's recommendation, once drafted. */
	recommendation?: string;
	/**
	 * While Sparks writes it (prds/sparks-review.md, "Putting it together"): how many parts are written so far, in the
	 * order of `reviewPartTitles`. The next one shows as being written. Without it, the whole idea shows.
	 */
	built?: number;
	/** The prototype version the teams see, once she's published it. */
	published?: number;
	/** Once published: opens the page the teams see (`PublishedIdea`), in its own tab. */
	onOpenPublished?: () => void;
	/** A part to bring into view (a comment on it was opened), with a key that changes each time it's asked. */
	focusPart?: { part: string; key: number };
	className?: string;
};

/** The parts of the idea for review, in order (prds/sparks-review.md, "What's reviewed"). Dana's recommendation joins after Gaps once she drafts it. */
const reviewPartTitles = [
	"Summary",
	"Gaps",
	"What we believe (hypothesis)",
	"What people need to do (user stories), and how to know it’s done (acceptance criteria)",
	"The prototype",
	"Success criteria",
	"Why this direction",
	"The evidence",
	"What it needs to be built",
	"Design notes",
	"Known issues",
	"For the UX team to test with real people",
	"What it changes for teams",
	"Decisions",
	"Open questions",
	"What comes later",
] as const;

const viewTone = { Advance: "green", "Advance with changes": "amber", "Don't advance yet": "red" } as const;
const statusLabel = { invited: "Invited", opened: "Opened it", commented: "Commented" } as const;

/** One part of the idea, under its heading. `reveal`: it's just been written, so it comes in (Reveal). */
function Part({
	title,
	items,
	reveal = false,
	action,
	marked = false,
	children,
}: {
	title: string;
	items?: string[];
	reveal?: boolean;
	/** On the heading's right, e.g. a reviewer's "Comment". */
	action?: React.ReactNode;
	/** Marked for a moment: a comment on it was just opened. */
	marked?: boolean;
	children?: React.ReactNode;
}) {
	const { prefersReducedMotion } = useMotionPreference();
	return (
		<motion.section
			aria-label={title}
			data-part={title}
			variants={revealVariants}
			initial={reveal && !prefersReducedMotion ? "initial" : false}
			animate='animate'
			className={cn(
				"flex flex-col gap-2 rounded-sm border-t border-border pt-4 transition-colors first:border-t-0 first:pt-0",
				marked && "bg-(--corn-50)",
			)}
		>
			<div className='flex items-start justify-between gap-3'>
				<Typography as='h3' size='base' weight='semibold' className='text-foreground-prominent'>
					{title}
				</Typography>
				{action}
			</div>
			{children}
			{items?.length ? (
				<ul className='flex list-disc flex-col gap-1 ps-5 text-sm text-foreground'>
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
		<div ref={ref} className='flex flex-col gap-2 border-t border-border pt-4 first:border-t-0 first:pt-0'>
			<Typography as='h3' size='base' weight='semibold' className='text-foreground-prominent'>
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
}: {
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
						<span className='text-sm font-medium text-foreground'>{reviewer.department}</span>
						{reviewer.status === "view" && reviewer.view ? (
							<Badge variant='flat' tone={viewTone[reviewer.view]} size='xxs'>
								{reviewer.view}
							</Badge>
						) : (
							<span className='text-xs text-muted-foreground'>{statusLabel[reviewer.status as keyof typeof statusLabel]}</span>
						)}
					</div>
					<span className='ps-6 text-xs text-muted-foreground'>Evaluates {reviewer.evaluates}</span>
					{reviewer.why ? <span className='ps-6 text-sm text-foreground'>"{reviewer.why}"</span> : null}
					{notes[reviewer.id] ? <span className='ps-6 text-xs font-medium text-link'>{notes[reviewer.id]}</span> : null}
					</Row>
				</li>
				);
			})}
		</ul>
	);
}

/** What each part says, by its title in `reviewPartTitles`. */
function reviewPartBody(concept: ConceptForReview): Record<(typeof reviewPartTitles)[number], { items?: string[]; children?: React.ReactNode }> {
	return {
		Summary: {
			children: (
				<>
					<p className='text-sm font-medium text-foreground'>{concept.evidenceStatus}</p>
					<p className='text-sm text-foreground'>{concept.summary}</p>
				</>
			),
		},
		Gaps: { items: concept.gaps },
		"What we believe (hypothesis)": { children: <p className='text-sm text-foreground'>{concept.hypothesis}</p> },
		"What people need to do (user stories), and how to know it’s done (acceptance criteria)": {
			children: (
				<ul className='flex flex-col gap-3'>
					{concept.stories.map((item) => (
						<li key={item.story} className='flex flex-col gap-1 text-sm'>
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
		"Design notes": { items: concept.design },
		"Known issues": { items: concept.knownIssues },
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
 * each coming in (`reveal`). `partAction`: something on each part's heading, e.g. a reviewer's "Comment".
 */
function ReviewDocument({
	concept,
	recommendation,
	shown = reviewPartTitles.length,
	reveal = false,
	partAction,
	marked,
}: {
	concept: ConceptForReview;
	/** A part marked for a moment (a comment on it was just opened). */
	marked?: string;
	/** Dana's recommendation, after Gaps, once drafted. */
	recommendation?: string;
	shown?: number;
	reveal?: boolean;
	partAction?: (title: string) => React.ReactNode;
}) {
	const body = reviewPartBody(concept);
	return (
		<>
			{reviewPartTitles.slice(0, shown).map((title) => (
				<React.Fragment key={title}>
					<Part title={title} reveal={reveal} action={partAction?.(title)} marked={marked === title} {...body[title]} />
					{title === "Gaps" && recommendation ? (
						<Part title='Recommendation'>
							<p className='text-sm text-foreground'>{recommendation}</p>
							<span className='text-xs text-muted-foreground'>Dana's recommendation</span>
						</Part>
					) : null}
				</React.Fragment>
			))}
		</>
	);
}

/**
 * The concept for review beside the conversation in Review (prds/sparks-review.md): where it stands (ready, in review,
 * waiting for a decision, advanced), the reviewers' status and views, then every part of "What's reviewed", one
 * heading each, in order. Not in Figma yet.
 */
function ReviewPanel({ concept, status, reviewers, recommendation, built, published, onOpenPublished, focusPart, className }: ReviewPanelProps) {
	const building = built !== undefined && built < reviewPartTitles.length;
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
	const shown = building ? built : reviewPartTitles.length;
	// While it's written, the view follows the newest part, unless she has scrolled up to read.
	const writingRef = React.useRef<HTMLDivElement>(null);
	const following = React.useRef(true);
	const { prefersReducedMotion } = useMotionPreference();
	React.useEffect(() => {
		if (!building || !following.current || !writingRef.current) return;
		return scrollIntoViewSmoothly(writingRef.current, { reducedMotion: Boolean(prefersReducedMotion), align: "nearest" });
	}, [building, shown, prefersReducedMotion]);
	const banner = building ? (
		<Badge variant='flat' tone='neutral' size='sm' className='w-fit'>
			<LoaderCircle aria-hidden className='animate-spin motion-reduce:animate-none' /> Putting it together…
		</Badge>
	) : status.kind === "advanced" ? (
			<Badge variant='flat' tone='green' size='sm' className='w-fit'>
				Advanced · {status.date}
			</Badge>
		) : status.kind === "waiting" ? (
			<Badge variant='flat' tone='blue' size='sm' className='w-fit'>
				<Clock aria-hidden /> Waiting for a decision from {status.owner}
			</Badge>
		) : status.kind === "in-review" ? (
			<Badge variant='flat' tone='blue' size='sm' className='w-fit'>
				{published ? `Published · version ${published}` : "In review"}
			</Badge>
		) : (
			<Badge variant='flat' tone='neutral' size='sm' className='w-fit'>
				Ready for review
			</Badge>
		);
	return (
		<section aria-label='Idea for review' className={cn("flex min-h-0 flex-1 flex-col rounded-card bg-background-subtle p-4", className)}>
			<div className='flex flex-col gap-1 pb-3'>
				<Typography as='h2' size='lg' weight='semibold' className='text-foreground-prominent'>
					Idea for review
				</Typography>
				<div className='flex flex-wrap items-center gap-2'>
					{banner}
{building ? null : <span className='text-xs text-muted-foreground'>{concept.evidenceStatus.split(".")[0]}</span>}
					{/* What the teams see: the published version's page, in its own tab, as a link would open it. */}
					{published && onOpenPublished ? (
						<Button variant='link' className='ms-auto h-auto gap-1 p-0 text-sm font-medium' onClick={onOpenPublished}>
							See what the teams see
							<ExternalLink aria-hidden className='size-3.5' />
							<span className='sr-only'>(opens in a new tab)</span>
						</Button>
					) : null}
				</div>
			</div>
			<div
				onScroll={(event) => {
					const el = event.currentTarget;
					following.current = el.scrollHeight - el.scrollTop - el.clientHeight < 96;
				}}
				ref={documentRef}
				aria-busy={building || undefined}
				className='scrollbar-subtle flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto rounded-md bg-background p-4'
			>
				{status.kind === "advanced" ? (
					<div className='flex flex-col gap-1 rounded-md bg-background-subtle p-3 text-sm'>
						<span className='font-semibold text-foreground'>
							Advanced by {status.owner}, {status.date}
						</span>
						<span className='text-foreground'>"{status.reason}"</span>
					</div>
				) : null}

				{reviewers.length ? (
					<section aria-label='Reviewers' className='flex flex-col gap-2'>
						<Typography as='h3' size='base' weight='semibold' className='text-foreground-prominent'>
							Reviewers
						</Typography>
						<ReviewerList reviewers={reviewers} />
					</section>
				) : null}

				{/* The parts written so far, each coming in as it's written; then the one being written. */}
				<ReviewDocument concept={concept} recommendation={recommendation} shown={shown} reveal={built !== undefined} marked={marked} />
				{building ? <PartInProgress ref={writingRef} title={reviewPartTitles[shown]} /> : null}
			</div>
		</section>
	);
}

export { ReviewDocument, ReviewerList, ReviewPanel, reviewPartTitles, viewTone, type ConceptForReview, type IdeaComment, type ReviewPanelProps, type ReviewStatus, type Reviewer };
