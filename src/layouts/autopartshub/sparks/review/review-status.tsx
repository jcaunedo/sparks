import * as React from "react";
import { ArrowLeft, Download } from "lucide-react";
import { motion, PresenceContext } from "motion/react";

import { TeamAssessment, type TeamAssessmentAction } from "@/components/data-display/team-assessment";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/data-display/table";
import { Typography } from "@/components/typography/typography";
import { expandVariants, fadeVariants, motionDistance, revealVariants, scrollIntoViewSmoothly, standardTransition, useExpandClip, useMotionPreference } from "@/lib/motion";
import { cn } from "@/lib/utils";

import { HeaderIconButton } from "../../header-icon-button";
import { publishedFormat } from "../shared/versions-menu";
import { ReviewerList, ReviewerStatus, type Reviewer } from "./review-panel";
import { ReviewNextStep, type ReviewNext } from "./review-next";

/*
 * The team's assessment of a published idea (prds/sparks-review.md, "Team assessment" and "Review status"): one data
 * source for the card on the idea's panel and for Review status, which takes the prototype's place on the right.
 */

/** What one person's view counts as: they support moving it forward, or they don't. */
type AssessmentOutcome = "support" | "against";

type AssessmentCounts = { invited: number; received: number; support: number; against: number; pending: number };

/**
 * A reviewer's assessment of `version`, once they've given their view of it: "Advance" and "Advance with changes"
 * support it, "Don't advance yet" doesn't (⚠️ a demo mapping, prds/sparks-review.md, "The assessment data"). A view of an
 * earlier version doesn't count.
 */
function outcomeOf(reviewer: Reviewer, version: number): AssessmentOutcome | undefined {
	if (reviewer.status !== "view" || !reviewer.view || reviewer.version !== version) return undefined;
	return reviewer.view === "Don't advance yet" ? "against" : "support";
}

/** The counts for one published version, from the reviewers: everyone asked, and each one's assessment of it. */
function countAssessments(reviewers: Reviewer[], version: number): AssessmentCounts {
	const outcomes = reviewers.map((r) => outcomeOf(r, version));
	const support = outcomes.filter((o) => o === "support").length;
	const against = outcomes.filter((o) => o === "against").length;
	return { invited: reviewers.length, received: support + against, support, against, pending: reviewers.length - support - against };
}

/** Where the assessments stand (prds/sparks-review.md, "Assessment lifecycle"). */
type AssessmentState =
	| "awaiting"
	| "in-progress-positive"
	| "in-progress-mixed"
	| "in-progress-negative"
	| "completed-positive"
	| "completed-mixed"
	| "completed-negative";

/**
 * ⚠️ A demo rule, not a decided one (prds/sparks-review.md, "Assessment lifecycle"): no assessment yet is awaiting;
 * everyone in is completed; more support than not is positive, fewer is negative, even is mixed. No threshold and no
 * approval: the decision owner decides. Replace it when the rules are set.
 */
function assessmentState({ received, pending, support, against }: AssessmentCounts): AssessmentState {
	if (received === 0) return "awaiting";
	const phase = pending === 0 ? "completed" : "in-progress";
	const lean = support > against ? "positive" : support < against ? "negative" : "mixed";
	return `${phase}-${lean}`;
}

/** The summary line for each state: product copy. */
const assessmentSummaries: Record<AssessmentState, string> = {
	awaiting: "Waiting for the team to assess your idea.",
	"in-progress-positive": "Early feedback favors moving forward.",
	"in-progress-mixed": "The team has mixed perspectives on the proposed solution.",
	"in-progress-negative": "Early feedback raises concerns about moving forward.",
	"completed-positive": "The team recommends moving forward.",
	"completed-mixed": "The team has mixed recommendations on moving forward.",
	"completed-negative": "The team does not recommend moving forward.",
};

/**
 * What the assessments add up to, written by Sparks from them (AI-generated): a synthesis, a result by area and what to
 * do next. In production it's derived from the assessments received; in the demo it's sample data.
 */
type ReviewFeedback = {
	summary: string;
	/** One row per area assessed: "Problem is worth solving" → "Strong support". Not the overall decision. */
	criteria: { area: string; result: string }[];
	nextSteps: string[];
};

/** "Reminder sent on Nov 27, 2026, 2:46 PM". */
function RemindedOn({ at }: { at: string }) {
	return (
		<>
			Reminder sent on <time dateTime={at}>{publishedFormat.format(new Date(at))}</time>
		</>
	);
}

/**
 * The team assessment card for one published version, the same component in both places (`TeamAssessment`): on the
 * idea's panel (`card`, with "View full report") and in Review status (`inset`, no action: its people are in the popovers and "Assessments"). Counted from the
 * reviewers, who are also its people: each legend item lists who's in it, by team, with their status (`ReviewerStatus`,
 * as in the reviewers' list). "Send a reminder" shows while anyone hasn't answered; once sent, when.
 */
function ReviewTeamAssessment({
	reviewers,
	version,
	context,
	action,
	remindedAt,
	onRemind,
	onReviewerSelect,
	footer,
	className,
}: {
	reviewers: Reviewer[];
	version: number;
	context: "workspace" | "status";
	action?: TeamAssessmentAction;
	/** When "Send a reminder" was selected (ISO), for the version published now. */
	remindedAt?: string;
	onRemind?: () => void;
	/** Selecting a person in a popover: their assessment in Review status ("Assessments"). */
	onReviewerSelect?: (id: string) => void;
	/** Last on the card, after a line: the next step (`ReviewNextOnCard`), on the idea's panel only. */
	footer?: React.ReactNode;
	className?: string;
}) {
	const counts = countAssessments(reviewers, version);
	return (
		<TeamAssessment
			variant={context === "workspace" ? "card" : "inset"}
			summary={assessmentSummaries[assessmentState(counts)]}
			invited={counts.invited}
			support={counts.support}
			against={counts.against}
			action={action}
			onRemind={onRemind}
			reminded={remindedAt ? <RemindedOn at={remindedAt} /> : undefined}
			people={reviewers.map((r) => ({
				id: r.id,
				name: r.name,
				team: r.department,
				subtitle: r.subtitle,
				avatarSrc: r.avatarSrc,
				outcome: outcomeOf(r, version) ?? "pending",
				status: <ReviewerStatus reviewer={r} size='sm' />,
				// "Advance with changes": the changes they ask for, under their name.
				detail: outcomeOf(r, version) && r.view === "Advance with changes" && r.why ? r.why : undefined,
			}))}
			onPersonSelect={onReviewerSelect}
			footer={footer}
			className={className}
		/>
	);
}

/** A section of Review status: its heading (lg semibold), then what it says. */
function StatusSection({ title, children }: { title: string; children: React.ReactNode }) {
	return (
		<section aria-label={title} className='flex flex-col gap-3'>
			<Typography as='h3' size='lg' weight='semibold' className='text-foreground-prominent'>
				{title}
			</Typography>
			{children}
		</section>
	);
}

/** The report "Download report" saves: what Review status shows, as plain text. */
function reviewReport({
	idea,
	version,
	publishedAt,
	counts,
	feedback,
}: {
	idea: string;
	version: number;
	publishedAt: string;
	counts: AssessmentCounts;
	feedback?: ReviewFeedback;
}) {
	// Names and statuses are in the reviewers' list on screen; the report gives the counts.
	const lines = [
		`Review status: ${idea}`,
		`Version ${version} · Published ${publishedFormat.format(new Date(publishedAt))}`,
		"",
		"Team assessment",
		assessmentSummaries[assessmentState(counts)],
		`${counts.received} of ${counts.invited} assessments received: ${counts.support} support, ${counts.against} don't support, ${counts.pending} pending.`,
	];
	if (feedback && counts.received > 0)
		lines.push(
			"",
			"Feedback summary",
			feedback.summary,
			`AI-generated · Based on ${counts.received} ${counts.received === 1 ? "assessment" : "assessments"}`,
			"",
			"Assessment criteria",
			...feedback.criteria.map((row) => `- ${row.area}: ${row.result}`),
			"",
			"Recommended next steps",
			...feedback.nextSteps.map((step) => `- ${step}`),
		);
	lines.push("", "The team's assessments inform the decision. The decision owner makes it.");
	return lines.join("\n");
}

/** Saves `text` as a file, in the browser. */
function saveTextFile(name: string, text: string) {
	const url = URL.createObjectURL(new Blob([text], { type: "text/plain;charset=utf-8" }));
	const link = document.createElement("a");
	link.href = url;
	link.download = name;
	link.click();
	window.setTimeout(() => URL.revokeObjectURL(url), 0);
}

type ReviewStatusPanelProps = {
	/** The idea's name, for the report ("Fit check before you buy"). */
	idea: string;
	/** The published version the assessments are of, and when it was published (ISO). */
	version: number;
	publishedAt: string;
	feedback?: ReviewFeedback;
	remindedAt?: string;
	onRemind?: () => void;
	/** The back arrow: the prototype again, as it was. Called once its team assessment has folded up (`onLeaving` first). */
	onBack: () => void;
	/**
	 * The back arrow, as its team assessment starts folding up: the idea panel's card can open again at the same time, so
	 * the card reads as going back over (MOTION.md → "Review status's team assessment").
	 */
	onLeaving?: () => void;
	/** Review's next step, after the results (prds/sparks-review.md, "The next step"): only Dana sees it. */
	next?: ReviewNext;
	/** Everyone asked to review it, with their team and where each one is: the team assessment counts their views. */
	reviewers: Reviewer[];
	/**
	 * What each reviewer has written (`reviewerCommentNotes`), the line under them in "Assessments"; with
	 * `onOpenComments`, a link to their comments in Comments.
	 */
	commentNotes?: Record<string, string>;
	onOpenComments?: (id: string) => void;
	/**
	 * Where to open it (`key` tells a new request from the same one): a reviewer (`reviewer`, their id: "Assessments"
	 * scrolls to them, at the top, and marks their row for a moment, e.g. after selecting them in the idea panel's team
	 * assessment) or the next step (`"next-step"`, e.g. from the card's "See what Sparks would change").
	 */
	focus?: { target: { reviewer: string } | "next-step"; key: number };
	className?: string;
};

/**
 * Review status (sparks.ds 135:2349), in the prototype's place on Review's right: back to the prototype, the title, the
 * version the assessments are of and "Download report"; then the team assessment, what Sparks makes of the feedback so
 * far, the result by area, the next steps it recommends, and Review's next step with the teams reviewing. Results show
 * only once an assessment is in.
 */
function ReviewStatusPanel({
	idea,
	version,
	publishedAt,
	feedback,
	remindedAt,
	onRemind,
	onBack,
	onLeaving,
	next,
	reviewers,
	commentNotes,
	onOpenComments,
	focus,
	className,
}: ReviewStatusPanelProps) {
	const { prefersReducedMotion } = useMotionPreference();
	// A reviewer selected (here, or in the idea panel's card): their row in "Assessments" comes into view and is marked for
	// a moment, as a part of the idea is when a comment on it is opened. The next step, from the card: it comes into view.
	const [shown, setShown] = React.useState(focus);
	React.useEffect(() => {
		if (focus) setShown(focus);
	}, [focus]);
	const bodyRef = React.useRef<HTMLDivElement>(null);
	const [markedReviewer, setMarkedReviewer] = React.useState<string>();
	React.useEffect(() => {
		if (!shown) return;
		let stop = () => {};
		let timer = 0;
		const frame = requestAnimationFrame(() => {
			const { target } = shown;
			const element = bodyRef.current?.querySelector<HTMLElement>(
				target === "next-step" ? "[data-next-step]" : `[data-reviewer="${CSS.escape(target.reviewer)}"]`,
			);
			if (!element) return;
			if (target !== "next-step") {
				setMarkedReviewer(target.reviewer);
				timer = window.setTimeout(() => setMarkedReviewer(undefined), 1600);
			}
			element.focus({ preventScroll: true });
			stop = scrollIntoViewSmoothly(element, { reducedMotion: Boolean(prefersReducedMotion), align: "start" });
		});
		return () => {
			cancelAnimationFrame(frame);
			window.clearTimeout(timer);
			stop();
		};
	}, [shown, prefersReducedMotion]);
	const counts = countAssessments(reviewers, version);
	const results = feedback && counts.received > 0 ? feedback : undefined;
	// Opening it, focus goes to its title, so the panel that took the prototype's place is where she is.
	const titleRef = React.useRef<HTMLHeadingElement>(null);
	// Opened at a reviewer or the next step, focus goes there instead (above).
	React.useEffect(() => {
		if (!focus) titleRef.current?.focus({ preventScroll: true });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	const shownNext = next && next.kind !== "publish" ? next : undefined;
	// The team assessment arrives from the idea's panel, where it folds up as this opens (Expand): here it opens the other
	// way, its height growing from the top while it glides down from above, so it reads as the same card coming over
	// (MOTION.md → "Review status's team assessment").
	const assessmentClip = useExpandClip();
	// Going back: the card folds up (the reverse of how it came), then the prototype comes back.
	const [leaving, setLeaving] = React.useState(false);
	const back = () => {
		if (leaving) return;
		onLeaving?.();
		setLeaving(true);
	};
	return (
		// Its entrances play wherever it opens: the step's layer sits in an `AnimatePresence initial={false}`, and a layer
		// that was there on load would pass "no entrance" to everything mounted in it later (DESIGN.md → "Review status
		// plays its entrances").
		<PresenceContext.Provider value={null}>
		<motion.section
			aria-labelledby='review-status-title'
			variants={prefersReducedMotion ? fadeVariants : revealVariants}
			initial='initial'
			animate='animate'
			// sparks.ds 135:2386: white, a border, 16px corners, 16px top and bottom, 20px sides, 16px under the toolbar. The
			// outer box is the prototype panel's (16px a side, border included: `px-[15px]`), so opening it doesn't move the
			// idea's panel (both are `basis-0`); the other 4px are inside (DESIGN.md → "Review status keeps the prototype's box").
			className={cn("flex min-h-0 flex-1 flex-col gap-4 rounded-card border border-border bg-background px-[15px] py-[15px]", className)}
		>
			<div className='flex shrink-0 items-center gap-4 px-1'>
				{/* Back: a Flat icon button (sparks.ds Flat, 36px: the light neutral fill), so it reads as a button on the white panel. */}
				<HeaderIconButton label='Back to the prototype' variant='flat' onClick={back} className='shrink-0'>
					<ArrowLeft aria-hidden />
				</HeaderIconButton>
				<div className='flex min-w-0 flex-1 flex-col'>
					<Typography
						as='h2'
						id='review-status-title'
						ref={titleRef}
						tabIndex={-1}
						size='xl'
						weight='semibold'
						className='truncate text-foreground outline-none'
					>
						Review status
					</Typography>
					{/* The version the assessments are of: they belong to it, not to her working copy. */}
					<p className='truncate text-xs text-muted-foreground'>
						Version {version} · Published <time dateTime={publishedAt}>{publishedFormat.format(new Date(publishedAt))}</time>
					</p>
				</div>
				<HeaderIconButton
					label='Download report'
					className='shrink-0'
					onClick={() =>
						saveTextFile(
							`${idea.replace(/[^\w-]+/g, "-").toLowerCase()}-review-status-v${version}.txt`,
							reviewReport({ idea, version, publishedAt, counts, feedback: results }),
						)
					}
				>
					<Download aria-hidden />
				</HeaderIconButton>
			</div>
			<div ref={bodyRef} className='scrollbar-subtle -mx-[15px] flex min-h-0 flex-1 flex-col overflow-y-auto px-[19px]'>
				<div className='flex flex-col gap-6 pb-2'>
					<motion.div
						{...(prefersReducedMotion ? {} : assessmentClip)}
						variants={prefersReducedMotion ? fadeVariants : expandVariants}
						initial='initial'
						animate={leaving ? "exit" : "animate"}
						onAnimationComplete={(definition) => {
							// The clip comes off once it settles (`useExpandClip`), then, folded up, back to the prototype.
							if (!prefersReducedMotion) assessmentClip.onAnimationComplete();
							if (definition === "exit") onBack();
						}}
						className='shrink-0'
					>
						<motion.div
							initial={prefersReducedMotion ? false : { y: -motionDistance.medium }}
							animate={{ y: leaving && !prefersReducedMotion ? -motionDistance.medium : 0, transition: standardTransition }}
							className='flex flex-col gap-2'
						>
							<ReviewTeamAssessment
								context='status'
								reviewers={reviewers}
								version={version}
								remindedAt={remindedAt}
								onRemind={onRemind}
								onReviewerSelect={(id) => setShown({ target: { reviewer: id }, key: Date.now() })}
							/>
							{/* The team recommends; it doesn't approve (prds/sparks-review.md, "Assessment lifecycle"). */}
							<p className='px-1 text-sm text-muted-foreground'>The team's assessments inform the decision. The decision owner makes it, once you ask.</p>
						</motion.div>
					</motion.div>
					<div className='flex flex-col divide-y divide-border [&>*]:py-6 [&>*:first-child]:pt-0 [&>*:last-child]:pb-0'>
						{results ? (
							<>
								{/* What the team said, kept apart from the business data and the simulation from earlier steps. */}
								<section aria-label='Feedback summary' className='flex flex-col gap-2'>
									<Typography as='h3' size='lg' weight='semibold' className='text-foreground-prominent'>
										Feedback summary
									</Typography>
									<p className='text-base text-foreground'>{results.summary}</p>
									<p className='text-xs text-muted-foreground'>
										AI-generated · Based on {counts.received} {counts.received === 1 ? "assessment" : "assessments"}
									</p>
								</section>
								<StatusSection title='Assessment criteria'>
									<Table className='text-base text-foreground'>
										<TableHeader>
											<TableRow className='hover:bg-transparent'>
												<TableHead className='h-auto w-1/2 px-2 py-1.5 text-base font-semibold'>Area</TableHead>
												<TableHead className='h-auto px-2 py-1.5 text-base font-semibold'>Result</TableHead>
											</TableRow>
										</TableHeader>
										{/* A line under every row, the last one too (sparks.ds 135:2423). */}
										<TableBody className='[&_tr:last-child]:border-b'>
											{results.criteria.map((row) => (
												<TableRow key={row.area} className='hover:bg-transparent'>
													<TableCell className='px-2 py-1.5 whitespace-normal'>{row.area}</TableCell>
													<TableCell className='px-2 py-1.5 whitespace-normal'>{row.result}</TableCell>
												</TableRow>
											))}
										</TableBody>
									</Table>
								</StatusSection>
								<StatusSection title='Recommended next steps'>
									<ul className='flex list-disc flex-col gap-1 ps-5 text-base text-foreground'>
										{results.nextSteps.map((step) => (
											<li key={step}>{step}</li>
										))}
									</ul>
								</StatusSection>
							</>
						) : (
							// Nothing to sum up before the first assessment: no results, no made-up summary.
							<p className='text-base text-muted-foreground'>
								The feedback summary, the results by area and the next steps show here once the first assessment is in.
							</p>
						)}
						{/* Review's next step and the teams reviewing, moved here from the idea's panel. */}
						{shownNext ? <ReviewNextStep next={shownNext} /> : null}
						{reviewers.length ? (
							// Each person's assessment: their view and why, or how far they've got, and what they've commented.
							<StatusSection title='Assessments'>
								<ReviewerList reviewers={reviewers} size='base' marked={markedReviewer} notes={commentNotes} onOpenComments={onOpenComments} />
							</StatusSection>
						) : null}
					</div>
				</div>
			</div>
		</motion.section>
		</PresenceContext.Provider>
	);
}

export {
	assessmentState,
	assessmentSummaries,
	countAssessments,
	ReviewStatusPanel,
	ReviewTeamAssessment,
	type AssessmentCounts,
	type AssessmentOutcome,
	type AssessmentState,
	type ReviewFeedback,
	type ReviewStatusPanelProps,
};
