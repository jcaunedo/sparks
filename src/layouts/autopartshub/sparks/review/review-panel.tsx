import * as React from "react";
import { CircleCheck, CircleDashed, Clock, Eye, MessageSquare } from "lucide-react";

import { Badge } from "@/components/data-display/badge";
import { Typography } from "@/components/typography/typography";
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
	className?: string;
};

const viewTone = { Advance: "green", "Advance with changes": "amber", "Don't advance yet": "red" } as const;
const statusLabel = { invited: "Invited", opened: "Opened it", commented: "Commented" } as const;

function Part({ title, items, children }: { title: string; items?: string[]; children?: React.ReactNode }) {
	return (
		<section aria-label={title} className='flex flex-col gap-2 border-t border-border pt-4 first:border-t-0 first:pt-0'>
			<Typography as='h3' size='base' weight='semibold' className='text-foreground-prominent'>
				{title}
			</Typography>
			{children}
			{items?.length ? (
				<ul className='flex list-disc flex-col gap-1 ps-5 text-sm text-foreground'>
					{items.map((item) => (
						<li key={item}>{item}</li>
					))}
				</ul>
			) : null}
			{items && items.length === 0 ? <p className='text-sm text-muted-foreground'>None.</p> : null}
		</section>
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
}: {
	reviewers: Reviewer[];
	unread?: string[];
	onOpen?: (id: string) => void;
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
					</Row>
				</li>
				);
			})}
		</ul>
	);
}

/**
 * The concept for review beside the conversation in Review (prds/sparks-review.md): where it stands (ready, in review,
 * waiting for a decision, advanced), the reviewers' status and views, then every part of "What's reviewed", one
 * heading each, in order. Not in Figma yet.
 */
function ReviewPanel({ concept, status, reviewers, recommendation, className }: ReviewPanelProps) {
	const banner =
		status.kind === "advanced" ? (
			<Badge variant='flat' tone='green' size='sm' className='w-fit'>
				Advanced · {status.date}
			</Badge>
		) : status.kind === "waiting" ? (
			<Badge variant='flat' tone='blue' size='sm' className='w-fit'>
				<Clock aria-hidden /> Waiting for a decision from {status.owner}
			</Badge>
		) : status.kind === "in-review" ? (
			<Badge variant='flat' tone='blue' size='sm' className='w-fit'>
				In review
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
					<span className='text-xs text-muted-foreground'>{concept.evidenceStatus.split(".")[0]}</span>
				</div>
			</div>
			<div className='scrollbar-subtle flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto rounded-md bg-background p-4'>
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

				<Part title='Summary'>
					<p className='text-sm font-medium text-foreground'>{concept.evidenceStatus}</p>
					<p className='text-sm text-foreground'>{concept.summary}</p>
				</Part>
				<Part title='Gaps' items={concept.gaps} />
				{recommendation ? (
					<Part title='Recommendation'>
						<p className='text-sm text-foreground'>{recommendation}</p>
						<span className='text-xs text-muted-foreground'>Dana's recommendation</span>
					</Part>
				) : null}
				<Part title='What we believe (hypothesis)'>
					<p className='text-sm text-foreground'>{concept.hypothesis}</p>
				</Part>
				<Part title='What people need to do (user stories), and how to know it’s done (acceptance criteria)'>
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
				</Part>
				<Part title='The prototype' items={concept.prototype} />
				<Part title='Success criteria' items={concept.success} />
				<Part title='Why this direction' items={concept.why} />
				<Part title='The evidence' items={concept.evidence} />
				<Part title='What it needs to be built' items={concept.build} />
				<Part title='Design notes' items={concept.design} />
				<Part title='Known issues' items={concept.knownIssues} />
				<Part title='For the UX team to test with real people' items={concept.realPeople} />
				<Part title='What it changes for teams' items={concept.teams} />
				<Part title='Decisions' items={concept.decisions} />
				<Part title='Open questions' items={concept.openQuestions} />
				<Part title='What comes later' items={concept.later} />
			</div>
		</section>
	);
}

export { ReviewerList, ReviewPanel, viewTone, type ConceptForReview, type ReviewPanelProps, type ReviewStatus, type Reviewer };
