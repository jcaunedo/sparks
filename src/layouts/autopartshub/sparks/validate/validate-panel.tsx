import * as React from "react";
import { Check, ChevronDown, CircleCheck, CircleDashed, CircleX, GitBranchPlus, Play, Square, TriangleAlert, WandSparkles } from "lucide-react";
import { motion } from "motion/react";

import { ActivityFeed } from "@/components/chat/activity-feed";
import { Badge } from "@/components/data-display/badge";
import { Button } from "@/components/buttons/button";
import { Typography } from "@/components/typography/typography";
import { fadeVariants, revealVariants, scrollIntoViewSmoothly, useMotionPreference } from "@/lib/motion";
import { cn } from "@/lib/utils";

/*
 * Evaluate's results (prds/sparks-validate.md, "The results"): a scenario-based AI evaluation of the prototype, plus
 * checks against business data, engineering context, the design system and how teams work. Every result says its
 * method; nothing from AI simulation is shown as research with real people.
 */

/**
 * A place in the prototype: a screen by its place in the direction's screens (what the prototype opens on), the part
 * a product page shows when it isn't the first one, and an element on it by its `data-point` or `data-agent` id. Where
 * a scenario's agent stops (prds/sparks-validate.md, "Running it"), and where a finding's marker sits.
 */
type PrototypeStop = { view: number; part?: string; element?: string };

/** A realistic situation worked through the prototype: a situation, never a person. */
type EvaluationScenario = {
	id: string;
	/** A few words for its agent's tag on the prototype ("In a hurry", "Screen reader"): the situation, never a name. */
	label: string;
	audience: "Customer" | "Store staff";
	/** "Screen reader" or "Keyboard only", for the accessibility scenarios. */
	access?: string;
	situation: string;
	task: string;
	/** Whether the task got done, and the one-line why. */
	outcome: "done" | "struggled";
	summary: string;
	/** Each step: the screen, Sparks's evaluation there (labeled "AI evaluation", never a customer's words), and where its agent stops. */
	steps: { screen: string; evaluation: string; at?: PrototypeStop }[];
	/** The findings behind its trouble, by id: each one's fix shows on the scenario, so she can fix it from there. */
	findings?: string[];
};

/**
 * An expert's look at the prototype, by an AI agent in a role (UX expert, Copywriter, Engineer, Data analyst): what it
 * looks at, a note at each place, and what it concludes. An AI review, never a person's (prds/sparks-validate.md, "The
 * agents").
 */
type EvaluationExpert = {
	id: string;
	/** Its role, for its agent's tag: "UX expert", "Copywriter". */
	label: string;
	/** What it looks at: "Usability and the design system". */
	focus: string;
	notes: { screen: string; note: string; at?: PrototypeStop }[];
	summary: string;
};

type EvaluationFinding = {
	id: string;
	title: string;
	where: string;
	severity: "Blocks" | "Hurts" | "Minor";
	method: string;
	/** The suggested fix, when Sparks has one. */
	fix?: string;
	/** The prototype can make the fix: "Fix in the prototype" offers it. */
	fixable?: boolean;
	/**
	 * The suggestion is another direction (the flag can't say whether a part fits; the fit check does): the suggestion
	 * offers to try it as another path, or to open it once it's built.
	 */
	direction?: { id: string; name: string };
	status: "open" | "fixed";
	/** Where it happens on the prototype: its numbered marker sits there. Without it (the data, every screen), no marker. */
	at?: PrototypeStop;
};

type EvaluationMeasure = {
	name: string;
	/** Always a range ("30–45% fewer"), or a status for what must not get worse. */
	estimate: string;
	/** For what must not get worse: Safe, Watch or At risk. */
	status?: "Safe" | "Watch" | "At risk";
	reachesTarget?: boolean;
	confidence?: "Low" | "Medium" | "High";
	method: string;
	why: string;
};

type Evaluation = {
	/** The prototype version it evaluated. */
	version: number;
	read: "Ready for review" | "Ready with changes" | "Needs another look";
	/** Sparks's read in two or three sentences. */
	readText: string;
	/** The evidence status: an outcome by method ("Simulation supports hypothesis"), with what it rests on. */
	hypothesis: { outcome: string; note: string; text: string };
	measures: EvaluationMeasure[];
	findings: EvaluationFinding[];
	scenarios: EvaluationScenario[];
	/** The experts' looks at the prototype, alongside the scenarios. */
	experts?: EvaluationExpert[];
	assumptions: { text: string; status: "Supported" | "Not supported" | "Still unknown"; evidence: string }[];
	build: string[];
	design: string[];
	teams: { team: string; change: string }[];
	realPeople: { question: string; how: string }[];
	/** The checks after the scenarios, in the order they run: "Checking business data…". */
	checks: string[];
	/** What changed since the last run, when there was one. */
	sinceLast?: string;
};

/** The run's progress, as `ActivityFeed` shows it (the same as while a prototype is built). */
type EvaluationProgress = { status: string; steps: string[]; startedAt?: number; done?: boolean; doneLabel?: string; stopped?: boolean };

type ValidatePanelProps = {
	/** The run shown, if there's one yet: its results arrive part by part (scenarios, then checks) until it's `finished`. */
	evaluation?: Evaluation;
	/** How many parts have finished. */
	done?: number;
	/** Sparks has started trying the scenarios; before that (getting ready), only the progress shows. */
	begun?: boolean;
	/** Everything is done, the conclusions too: the full results show, the read first. */
	finished?: boolean;
	/** The run was stopped: what's done stays, marked "Stopped before finishing". */
	stopped?: boolean;
	progress?: EvaluationProgress;
	/**
	 * Where each agent is, by id (scenarios and experts work at once, so they finish in any order): working or done. Without
	 * it, scenarios are done in order, as many as `done`.
	 */
	agentStatus?: Record<string, "running" | "done">;
	/** "Run" (or "Run again"), and Stop while it runs, in the panel's header. */
	onRun?: () => void;
	onStop?: () => void;
	/** The prototype's version now, when it's newer than the one evaluated: "Run again" stands out. */
	currentVersion?: number;
	/** Findings fixed in the prototype since this run, by id: the version that fixed them. */
	fixedSince?: Record<string, number>;
	/**
	 * "Fix in the prototype" on a finding or on a scenario that ran into it ("Change the fix in the prototype" once it's
	 * fixed): Prototype opens on its page, with Sparks's plan in the conversation. Without it (a run is going), no button.
	 */
	onFix?: (findingId: string) => void;
	/**
	 * A suggestion that's another direction (`EvaluationFinding.direction`): "Try "…"" builds it as another path, "Open "…""
	 * opens it once built (as a direction card's "Generate prototype" / "Open prototype"). Without it, no button.
	 */
	directionAction?: (directionId: string) => { built: boolean; onClick: () => void } | undefined;
	/** Selecting a finding that has a place on the prototype: the prototype shows it there, with its marker. */
	onSelectFinding?: (findingId: string) => void;
	/** The finding selected (from the list or its marker): highlighted and brought into view. */
	selectedFinding?: { id: string; key: number };
	/** "Watch it on the prototype" on a scenario: its agent goes through it again, with what Sparks saw at each step. */
	onWatch?: (scenarioId: string) => void;
	/** "Go back to the choice", offered with a "Needs another look" read. */
	onBackToChoice?: () => void;
	/** Shown when there's no run yet, e.g. "This prototype hasn't been evaluated yet". */
	empty?: React.ReactNode;
	className?: string;
};

const severityTone = { Blocks: "red", Hurts: "amber", Minor: "neutral" } as const;
const readTone = { "Ready for review": "green", "Ready with changes": "amber", "Needs another look": "red" } as const;
const assumptionTone = { Supported: "green", "Not supported": "red", "Still unknown": "neutral" } as const;
const statusTone = { Safe: "green", Watch: "amber", "At risk": "red" } as const;

/** A finding's number: the same on its marker on the prototype and in the list. */
const findingNumber = (evaluation: Evaluation, id: string) => evaluation.findings.findIndex((f) => f.id === id) + 1;

/** A finding's number in a circle: the severity's color while it's open, a check once it's fixed (as on its marker). */
function FindingNumber({ number, severity, fixed, placed }: { number: number; severity: EvaluationFinding["severity"]; fixed: boolean; placed: boolean }) {
	return (
		<span
			aria-hidden
			className={cn(
				"grid size-6 shrink-0 place-items-center rounded-full text-xs font-semibold",
				fixed
					? "bg-success text-white"
					: !placed
						? "bg-background-defined text-muted-foreground"
						: severity === "Blocks"
							? "bg-destructive text-white"
							: severity === "Hurts"
								? "bg-warning text-white"
								: "bg-background-defined text-foreground",
			)}
		>
			{fixed ? <Check className='size-3.5' strokeWidth={3} /> : number}
		</span>
	);
}

/**
 * A finding's suggested fix, the same on the finding and on a scenario that ran into it: "Suggested fix: …" with "Fix in
 * the prototype" when the prototype can make it, "Suggestion: …" alone when it needs a decision first. Fixed since the
 * run (`fixed`): only the way back to its fix.
 */
function FindingFix({
	finding,
	fixed = false,
	onFix,
	directionAction,
	className,
}: {
	finding: EvaluationFinding;
	fixed?: boolean;
	onFix?: (findingId: string) => void;
	directionAction?: ValidatePanelProps["directionAction"];
	className?: string;
}) {
	if (!finding.fix || (fixed && !onFix)) return null;
	const tryDirection = finding.direction && directionAction?.(finding.direction.id);
	return (
		<div className={cn("flex flex-col items-start gap-2", className)}>
			{fixed ? null : (
				<span className='text-base text-foreground'>
					{finding.fixable ? "Suggested fix" : "Suggestion"}: {finding.fix}
				</span>
			)}
			{finding.fixable ? (
				onFix ? (
					<Button variant='neutral' onClick={() => onFix(finding.id)}>
						<WandSparkles aria-hidden data-icon='inline-start' /> {fixed ? "Change the fix in the prototype" : "Fix in the prototype"}
					</Button>
				) : null
			) : finding.direction && tryDirection ? (
				// Another direction: tried as another path beside this one, which stays as it is.
				<Button variant='neutral' onClick={tryDirection.onClick}>
					<GitBranchPlus aria-hidden data-icon='inline-start' /> {tryDirection.built ? "Open" : "Try"} "{finding.direction.name}"
				</Button>
			) : null}
		</div>
	);
}

/** "Fixed in version {n} · run again to check it": a finding fixed in the prototype since the run. */
function FixedSinceBadge({ version }: { version: number }) {
	return (
		<Badge variant='flat' tone='blue' size='xxs'>
			Fixed in version {version} · run again to check it
		</Badge>
	);
}

/** One section of the results (Figma Sparks "Evaluate", 72:660): its title, then what it says. */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
	return (
		<section aria-label={title} className='flex flex-col gap-2'>
			<Typography as='h3' size='lg' weight='semibold' className='text-foreground-prominent'>
				{title}
			</Typography>
			{children}
		</section>
	);
}

/** A part of the results coming in as it finishes (Reveal). */
function Arriving({ children }: { children: React.ReactNode }) {
	const { prefersReducedMotion } = useMotionPreference();
	return (
		<motion.div variants={prefersReducedMotion ? fadeVariants : revealVariants} initial='initial' animate='animate'>
			{children}
		</motion.div>
	);
}

/** A finding a scenario ran into, with its number in the list and the version that fixed it since the run, if any. */
type ScenarioFinding = { finding: EvaluationFinding; number: number; fixedLater?: number };

/**
 * One scenario: its outcome, the findings behind its trouble with their fixes (so she can fix it right there), its steps
 * one select away, and watching it on the prototype.
 */
function ScenarioRow({
	scenario,
	status,
	onWatch,
	findings = [],
	onFix,
	directionAction,
	onSelectFinding,
}: {
	scenario: EvaluationScenario;
	status: "done" | "running";
	onWatch?: () => void;
	findings?: ScenarioFinding[];
	onFix?: (findingId: string) => void;
	onSelectFinding?: (findingId: string) => void;
	directionAction?: ValidatePanelProps["directionAction"];
}) {
	const [open, setOpen] = React.useState(false);
	const id = React.useId();
	const { prefersReducedMotion } = useMotionPreference();
	// It comes in as Sparks starts on it; one that's done already is just there.
	const [arriving] = React.useState(status === "running");
	const icon =
		status !== "done" ? (
			<CircleDashed aria-hidden className='size-4 animate-spin text-muted-foreground motion-reduce:animate-none' />
		) : scenario.outcome === "done" ? (
			<CircleCheck aria-hidden className='size-4 text-success' />
		) : (
			<CircleX aria-hidden className='size-4 text-destructive' />
		);
	return (
		<motion.li variants={prefersReducedMotion ? fadeVariants : revealVariants} initial={arriving ? "initial" : false} animate='animate' className='flex flex-col gap-1 py-3 first:pt-0 last:pb-0'>
			<div className='flex items-start gap-2'>
				<span className='pt-1'>{icon}</span>
				<div className='flex min-w-0 flex-1 flex-col gap-0.5'>
					<span className='text-base font-medium text-foreground'>{scenario.label}</span>
					<span className='text-base text-foreground'>{scenario.situation}</span>
					<span className='text-sm text-muted-foreground'>
						{scenario.audience}
						{scenario.access ? ` · ${scenario.access}` : ""} · Task: {scenario.task}
					</span>
					{status === "done" ? (
						<span className='text-base text-foreground'>
							<span className='font-medium'>{scenario.outcome === "done" ? "Done." : "Struggled."}</span> {scenario.summary}
						</span>
					) : null}
					{/* What got in its way, from the findings, with the fix: the same as on the finding. A finding fixed since the run
					    says so, until she runs it again. */}
					{status === "done"
						? findings.map(({ finding, number, fixedLater }) => (
								<div key={finding.id} className='flex flex-col items-start gap-2 pt-1'>
									<span className='text-sm text-muted-foreground'>
										{finding.at && onSelectFinding ? (
											<button
												type='button'
												aria-label={`Finding ${number}, ${finding.title}: show it on the prototype`}
												className='rounded-sm underline decoration-border-defined underline-offset-2 outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring'
												onClick={() => onSelectFinding(finding.id)}
											>
												Finding {number}
											</button>
										) : (
											<span>Finding {number}</span>
										)}{" "}
										· {finding.title}
									</span>
									{fixedLater ? <FixedSinceBadge version={fixedLater} /> : null}
									<FindingFix finding={finding} fixed={Boolean(fixedLater)} onFix={onFix} directionAction={directionAction} />
								</div>
							))
						: null}
					{status === "done" ? (
						<div className='flex flex-wrap items-center gap-1 pt-1'>
							{onWatch ? (
								<Button variant='ghost' size='sm' className='-ms-2 text-link hover:text-link' onClick={onWatch}>
									<Play aria-hidden data-icon='inline-start' />
									Watch it on the prototype
								</Button>
							) : null}
							<Button variant='ghost' size='sm' aria-expanded={open} aria-controls={id} className={cn("text-link hover:text-link", !onWatch && "-ms-3")} onClick={() => setOpen((value) => !value)}>
								Step through
								<ChevronDown aria-hidden data-icon='inline-end' className={cn("transition-transform", open && "rotate-180")} />
							</Button>
						</div>
					) : null}
				</div>
			</div>
			{open ? (
				<ol id={id} className='ms-6 flex flex-col gap-2 border-s border-border ps-4'>
					{scenario.steps.map((step, index) => (
						<li key={index} className='flex flex-col gap-0.5'>
							<span className='text-sm font-medium text-muted-foreground'>
								Step {index + 1} · {step.screen}
							</span>
							<span className='text-base text-foreground'>
								<span className='font-medium'>AI evaluation:</span> {step.evaluation}
							</span>
						</li>
					))}
				</ol>
			) : null}
		</motion.li>
	);
}

/**
 * Evaluate's results, beside the prototype (Figma Sparks "Evaluate", 72:660; prds/sparks-validate.md, "The results"):
 * "Evaluation" and "Run" (Stop while it runs) on top, then, on a card, the run's progress (folding to "Evaluated in
 * 22s"), Sparks's read, the hypothesis, the measures, the findings (numbered as their markers on the prototype, with "Fix
 * in the prototype"), the scenarios (each watched on the prototype or stepped through), assumptions, whether
 * AutoParts Co. can build it, design and accessibility, what changes for teams, and what only real people can tell us.
 * While it runs, each part comes in as it's done, in that order.
 */
function ValidatePanel({
	evaluation,
	done = 0,
	begun = false,
	finished = false,
	stopped = false,
	progress,
	agentStatus,
	onRun,
	onStop,
	currentVersion,
	fixedSince = {},
	onFix,
	directionAction,
	onSelectFinding,
	selectedFinding,
	onWatch,
	onBackToChoice,
	empty,
	className,
}: ValidatePanelProps) {
	const running = Boolean(evaluation) && !finished && !stopped;
	const changedSince = Boolean(evaluation && currentVersion && currentVersion !== evaluation.version);
	// A run already finished when the panel opens shows at once.
	const [skipEntrance] = React.useState(finished);
	const { prefersReducedMotion } = useMotionPreference();
	const endRef = React.useRef<HTMLDivElement>(null);
	const scrollerRef = React.useRef<HTMLDivElement>(null);
	const reading = React.useRef(false);
	const findingRefs = React.useRef(new Map<string, HTMLLIElement>());
	const findingsRef = React.useRef<HTMLDivElement>(null);
	const stopFollowing = () => {
		reading.current = true;
	};
	// The newest part stays in view while it runs, until she scrolls (or selects something) to read on her own.
	React.useEffect(() => {
		if (running && !reading.current && endRef.current) return scrollIntoViewSmoothly(endRef.current, { reducedMotion: Boolean(prefersReducedMotion) });
	}, [done, running, prefersReducedMotion]);
	// A new run follows again; finished, the conclusions come first, so it starts at the top.
	React.useEffect(() => {
		reading.current = false;
	}, [evaluation]);
	React.useLayoutEffect(() => {
		if (finished && scrollerRef.current) scrollerRef.current.scrollTop = 0;
	}, [finished]);
	// A finding selected already as Evaluate opens is there from the start; it scrolls only to one selected after.
	const opened = React.useRef(false);
	// A finding selected on the prototype (its marker, or the screen it's on) comes to the top of the card: the first one
	// with the "Findings" heading above it, so the two panels show the same thing.
	React.useEffect(() => {
		const row = selectedFinding && findingRefs.current.get(selectedFinding.id);
		if (!row || !evaluation) return;
		const first = evaluation.findings[0]?.id === selectedFinding?.id;
		const target = first && findingsRef.current ? findingsRef.current : row;
		return scrollIntoViewSmoothly(target, { reducedMotion: Boolean(prefersReducedMotion) || !opened.current, align: "start" });
	}, [selectedFinding?.key]);
	React.useEffect(() => {
		opened.current = true;
	}, []);

	const header = (
		<div className='flex h-[68px] shrink-0 items-center justify-between gap-3 px-5'>
			<Typography as='h2' size='lg' weight='medium' className='text-foreground-prominent'>
				Evaluation
			</Typography>
			{running ? (
				<Button variant='outline' onClick={onStop}>
					<Square aria-hidden data-icon='inline-start' /> Stop
				</Button>
			) : onRun ? (
				<Button variant='neutral' onClick={onRun}>
					<Play aria-hidden data-icon='inline-start' /> {evaluation ? "Run again" : "Run"}
				</Button>
			) : null}
		</div>
	);

	if (!evaluation)
		return (
			<section aria-label='Evaluation' className={cn("flex min-h-0 flex-1 flex-col rounded-card bg-background-subtle", className)}>
				{header}
				<div className='mx-5 mb-6 flex min-h-0 flex-1 flex-col rounded-[12px] bg-background p-8'>{empty}</div>
			</section>
		);

	const scenariosDone = Math.min(done, evaluation.scenarios.length);
	// Each check after the scenarios unlocks its sections: business data, engineering context, design system, teams.
	const checked = (index: number) => done > evaluation.scenarios.length + index;
	const openFindings = evaluation.findings.filter((f) => f.status === "open" && !fixedSince[f.id]);

	const read = (
		<div className='flex flex-col gap-2'>
			<Badge variant='flat' tone={readTone[evaluation.read]} size='sm' className='w-fit'>
				{evaluation.read}
			</Badge>
			<p className='text-base text-foreground'>{evaluation.readText}</p>
			{evaluation.sinceLast ? <p className='text-sm text-muted-foreground'>Since the last run: {evaluation.sinceLast}</p> : null}
			{evaluation.read === "Needs another look" && onBackToChoice ? (
				<Button variant='outline' className='mt-1 w-fit' onClick={onBackToChoice}>
					Go back to the choice
				</Button>
			) : null}
		</div>
	);
	const hypothesis = (
		<Section title='The hypothesis'>
			<span className='text-base font-medium text-foreground'>{evaluation.hypothesis.outcome}</span>
			<p className='text-base text-foreground'>{evaluation.hypothesis.text}</p>
			<span className='text-sm text-muted-foreground'>{evaluation.hypothesis.note}</span>
		</Section>
	);
	const measures = (
		<Section title='Effect on the measures'>
			<ul className='flex flex-col gap-3'>
				{evaluation.measures.map((measure) => (
					<li key={measure.name} className='flex flex-col gap-0.5'>
						<span className='text-base font-medium text-foreground'>{measure.name}</span>
						<span className='flex flex-wrap items-center gap-2 text-base text-foreground'>
							{measure.status ? (
								<Badge variant='flat' tone={statusTone[measure.status]} size='xxs'>
									{measure.status}
								</Badge>
							) : null}
							{measure.estimate}
							{measure.reachesTarget !== undefined ? (measure.reachesTarget ? ", which reaches your target." : ", below your target.") : ""}
						</span>
						<span className='text-sm text-muted-foreground'>
							{measure.confidence ? `${measure.confidence} confidence · ` : ""}
							{measure.method}. {measure.why}
						</span>
					</li>
				))}
			</ul>
		</Section>
	);
	const findings = (
		<Section title={`Findings (${openFindings.length} open)`}>
			{evaluation.findings.some((f) => f.at) ? (
				<p className='text-sm text-muted-foreground'>The numbered ones are marked on the prototype, where they happen. Select one to see it there.</p>
			) : null}
			<ul className='flex flex-col'>
				{evaluation.findings.map((finding, index) => {
					const fixedLater = fixedSince[finding.id];
					const fixed = finding.status === "fixed" || Boolean(fixedLater);
					const selected = selectedFinding?.id === finding.id;
					const content = (
						<>
							<FindingNumber number={index + 1} severity={finding.severity} fixed={fixed} placed={Boolean(finding.at)} />
							<span className='flex min-w-0 flex-1 flex-col gap-1'>
								<span className={cn("text-base font-medium text-foreground", finding.status === "fixed" && "line-through decoration-muted-foreground")}>
									{finding.title}
								</span>
								<span className='text-sm text-muted-foreground'>
									Where: {finding.where} · {finding.method}
								</span>
								<span className='flex flex-wrap gap-1.5'>
									<Badge variant='flat' tone={severityTone[finding.severity]} size='xxs'>
										{finding.severity}
									</Badge>
									{finding.status === "fixed" ? (
										<Badge variant='flat' tone='green' size='xxs'>
											Fixed
										</Badge>
									) : fixedLater ? (
										<FixedSinceBadge version={fixedLater} />
									) : null}
								</span>
							</span>
						</>
					);
					return (
						<li
							key={finding.id}
							ref={(node) => {
								if (node) findingRefs.current.set(finding.id, node);
								else findingRefs.current.delete(finding.id);
							}}
							className={cn("-mx-2 flex flex-col gap-2 rounded-lg px-2 py-3 transition-colors", selected && "bg-background-subtle")}
						>
							{finding.at && onSelectFinding ? (
								<button
									type='button'
									aria-label={`${finding.title}: show it on the prototype`}
									className='flex items-start gap-3 rounded-md text-start outline-none focus-visible:ring-2 focus-visible:ring-ring'
									onClick={() => onSelectFinding(finding.id)}
								>
									{content}
								</button>
							) : (
								<div className='flex items-start gap-3'>{content}</div>
							)}
							{finding.status === "open" ? <FindingFix finding={finding} fixed={Boolean(fixedLater)} onFix={onFix} directionAction={directionAction} className='ps-9' /> : null}
						</li>
					);
				})}
			</ul>
		</Section>
	);
	const assumptions = (
		<Section title='Assumptions'>
			<ul className='flex flex-col gap-3'>
				{evaluation.assumptions.map((assumption) => (
					<li key={assumption.text} className='flex flex-col gap-0.5'>
						<span className='flex flex-wrap items-center gap-2 text-base text-foreground'>
							<Badge variant='flat' tone={assumptionTone[assumption.status]} size='xxs'>
								{assumption.status}
							</Badge>
							{assumption.text}
						</span>
						<span className='text-sm text-muted-foreground'>{assumption.evidence}</span>
					</li>
				))}
			</ul>
		</Section>
	);
	const list = (title: string, lines: string[]) => (
		<Section title={title}>
			<ul className='flex list-disc flex-col gap-1 ps-5 text-base text-foreground'>
				{lines.map((line) => (
					<li key={line}>{line}</li>
				))}
			</ul>
		</Section>
	);
	const teams = (
		<Section title='What it changes for teams'>
			<ul className='flex flex-col gap-1 text-base text-foreground'>
				{evaluation.teams.map((team) => (
					<li key={team.team}>
						<span className='font-medium'>{team.team}:</span> {team.change}
					</li>
				))}
			</ul>
		</Section>
	);
	const realPeople = (
		<Section title='What only real people can tell us'>
			<ul className='flex flex-col gap-3'>
				{evaluation.realPeople.map((item) => (
					<li key={item.question} className='flex flex-col gap-0.5'>
						<span className='text-base text-foreground'>{item.question}</span>
						<span className='text-sm text-muted-foreground'>How to find out: {item.how}</span>
					</li>
				))}
			</ul>
		</Section>
	);
	// While it runs (or stopped): only the scenarios started, each with its spinner until it's done. With `agentStatus`,
	// they come in as their agents start; without, in order.
	const statusOf = (id: string, index: number): "done" | "running" | undefined =>
		finished ? "done" : agentStatus ? agentStatus[id] : index < scenariosDone ? "done" : index === scenariosDone && running && begun ? "running" : undefined;
	const shownScenarios = evaluation.scenarios.filter((scenario, index) => statusOf(scenario.id, index));
	const scenarios = (
		<Section title={`Scenarios (${evaluation.scenarios.length})`}>
			<ul className='flex flex-col divide-y divide-border'>
				{shownScenarios.map((scenario) => (
					<ScenarioRow
						key={scenario.id}
						scenario={scenario}
						status={statusOf(scenario.id, evaluation.scenarios.indexOf(scenario)) ?? "running"}
						onWatch={finished && onWatch && scenario.steps.some((step) => step.at) ? () => onWatch(scenario.id) : undefined}
						// The open findings behind its trouble (one fixed in this run's version leaves nothing to do).
						findings={(scenario.findings ?? []).flatMap((id) => {
							const finding = evaluation.findings.find((f) => f.id === id);
							return finding && finding.status === "open" ? [{ finding, number: findingNumber(evaluation, id), fixedLater: fixedSince[id] }] : [];
						})}
						onFix={onFix}
						directionAction={directionAction}
						onSelectFinding={onSelectFinding}
					/>
				))}
			</ul>
		</Section>
	);

	// The experts' looks (AI agents in a role), each as it's done: what it looked at, a note per place, what it concludes.
	const shownExperts = (evaluation.experts ?? []).filter((expert) => finished || agentStatus?.[expert.id] === "done");
	const experts = shownExperts.length ? (
		<Section title='Expert reviews'>
			<p className='text-sm text-muted-foreground'>AI agents in a role, not people.</p>
			<ul className='flex flex-col divide-y divide-border'>
				{shownExperts.map((expert) => (
					<motion.li
						key={expert.id}
						variants={prefersReducedMotion ? fadeVariants : revealVariants}
						initial={finished ? false : "initial"}
						animate='animate'
						className='flex flex-col gap-1 py-3 first:pt-0 last:pb-0'
					>
						<span className='text-base font-medium text-foreground'>
							{expert.label} <span className='font-normal text-muted-foreground'>· {expert.focus}</span>
						</span>
						<span className='text-base text-foreground'>{expert.summary}</span>
						<ul className='flex flex-col gap-1 pt-1'>
							{expert.notes.map((note) => (
								<li key={note.screen + note.note} className='text-sm text-foreground'>
									<span className='text-muted-foreground'>{note.screen} · </span>
									<span className='font-medium'>AI evaluation:</span> {note.note}
								</li>
							))}
						</ul>
						{onWatch && expert.notes.some((note) => note.at) && finished ? (
							<Button variant='ghost' size='sm' className='-ms-2 w-fit text-link hover:text-link' onClick={() => onWatch(expert.id)}>
								<Play aria-hidden data-icon='inline-start' />
								Watch it on the prototype
							</Button>
						) : null}
					</motion.li>
				))}
			</ul>
		</Section>
	) : null;

	return (
		<section aria-label='Evaluation' className={cn("flex min-h-0 flex-1 flex-col rounded-card bg-background-subtle", className)}>
			{header}
			<div
				ref={scrollerRef}
				onWheel={stopFollowing}
				onTouchMove={stopFollowing}
				onPointerDown={stopFollowing}
				onKeyDown={stopFollowing}
				className='scrollbar-subtle mx-5 mb-6 flex min-h-0 flex-1 flex-col overflow-y-auto rounded-[12px] bg-background p-8'
			>
				{/* Sections one under the other, a line between each, 24px on either side of it. */}
				<div className='flex flex-col divide-y divide-border [&>*]:py-6 [&>*:first-child]:pt-0 [&>*:last-child]:pb-0'>
					<div className='flex flex-col gap-3'>
						{/* The run's progress, the same as while a prototype is built: done, it folds to "Evaluated in 22s". */}
						{progress ? <ActivityFeed {...progress} /> : null}
						<span className='flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground'>
							<TriangleAlert aria-hidden className='size-3.5' />
							AI evaluation of prototype version {evaluation.version}: simulated scenarios and data checks, not testing with real people.
						</span>
						{changedSince ? (
							<p role='status' className='rounded-lg border border-border-defined px-3 py-2 text-sm text-foreground'>
								<span className='font-medium'>The prototype changed since this run.</span> It's version {currentVersion} now: run it again to check the changes.
							</p>
						) : null}
						{stopped ? <p className='text-sm text-muted-foreground'>Stopped before finishing. Findings come from a finished run: run it again to get them.</p> : null}
					</div>
					{finished ? (
						<motion.div
							key='results'
							variants={prefersReducedMotion ? fadeVariants : revealVariants}
							initial={skipEntrance ? false : "initial"}
							animate='animate'
							className='flex flex-col divide-y divide-border [&>*]:py-6 [&>*:first-child]:pt-0 [&>*:last-child]:pb-0'
						>
							{read}
							{hypothesis}
							{measures}
							<div ref={findingsRef}>{findings}</div>
							{scenarios}
							{experts}
							{assumptions}
							{list("Can AutoParts Co. build it", evaluation.build)}
							{list("Design system and accessibility", evaluation.design)}
							{teams}
							{realPeople}
						</motion.div>
					) : shownScenarios.length ? (
						<div className='flex flex-col divide-y divide-border [&>*]:py-6 [&>*:first-child]:pt-0 [&>*:last-child]:pb-0'>
							{scenarios}
							{experts}
							{checked(0) ? <Arriving>{hypothesis}</Arriving> : null}
							{checked(0) ? <Arriving>{measures}</Arriving> : null}
							{checked(1) ? <Arriving>{list("Can AutoParts Co. build it", evaluation.build)}</Arriving> : null}
							{checked(2) ? <Arriving>{list("Design system and accessibility", evaluation.design)}</Arriving> : null}
							{checked(3) ? <Arriving>{teams}</Arriving> : null}
						</div>
					) : null}
				</div>
				<div ref={endRef} aria-hidden className='h-px shrink-0' />
			</div>
		</section>
	);
}

export {
	findingNumber,
	ValidatePanel,
	type Evaluation,
	type EvaluationFinding,
	type EvaluationMeasure,
	type EvaluationProgress,
	type EvaluationExpert,
	type EvaluationScenario,
	type PrototypeStop,
	type ValidatePanelProps,
};
