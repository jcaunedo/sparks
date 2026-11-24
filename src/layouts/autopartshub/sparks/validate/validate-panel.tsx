import * as React from "react";
import { ChevronDown, CircleCheck, CircleDashed, CircleX, Square, TriangleAlert } from "lucide-react";
import { motion } from "motion/react";

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

/** A realistic situation worked through the prototype: a situation, never a person. */
type EvaluationScenario = {
	id: string;
	audience: "Customer" | "Store staff";
	/** "Screen reader" or "Keyboard only", for the accessibility scenarios. */
	access?: string;
	situation: string;
	task: string;
	/** Whether the task got done, and the one-line why. */
	outcome: "done" | "struggled";
	summary: string;
	/** Each step: the screen, and Sparks's evaluation there (labeled "AI evaluation", never a customer's words). */
	steps: { screen: string; evaluation: string }[];
};

type EvaluationFinding = {
	id: string;
	title: string;
	where: string;
	severity: "Blocks" | "Hurts" | "Minor";
	method: string;
	/** The suggested fix, when Sparks has one. */
	fix?: string;
	/** The prototype can make the fix: "Fix this in the prototype" offers it. */
	fixable?: boolean;
	status: "open" | "fixed";
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

type ValidatePanelProps = {
	/** The run shown: its results arrive part by part (scenarios, then checks) until it's `finished`. */
	evaluation: Evaluation;
	/** How many parts have finished. */
	done: number;
	/** Sparks has started trying the scenarios; before that (getting ready), the panel is blank. */
	begun: boolean;
	/** Everything is done, the conclusions too: the full results show, the read first. */
	finished: boolean;
	/** The run was stopped: what's done stays, marked "Stopped before finishing". */
	stopped?: boolean;
	/** The run number, for "Run 2 · prototype version 4". */
	run: number;
	onStop?: () => void;
	/** "Fix this in the prototype" on a finding. */
	onFix?: (findingId: string) => void;
	className?: string;
};

const severityTone = { Blocks: "red", Hurts: "amber", Minor: "neutral" } as const;
const readTone = { "Ready for review": "green", "Ready with changes": "amber", "Needs another look": "red" } as const;
const assumptionTone = { Supported: "green", "Not supported": "red", "Still unknown": "neutral" } as const;
const statusTone = { Safe: "green", Watch: "amber", "At risk": "red" } as const;

function Section({ title, children }: { title: string; children: React.ReactNode }) {
	return (
		<section aria-label={title} className='flex flex-col gap-2 border-t border-border pt-4'>
			<Typography as='h3' size='base' weight='semibold' className='text-foreground-prominent'>
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

/** One scenario: its outcome, and its steps one select away. */
function ScenarioRow({ scenario, status }: { scenario: EvaluationScenario; status: "done" | "running" }) {
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
		<motion.li variants={prefersReducedMotion ? fadeVariants : revealVariants} initial={arriving ? "initial" : false} animate='animate' className='flex flex-col gap-1 py-2'>
			<div className='flex items-start gap-2'>
				<span className='pt-0.5'>{icon}</span>
				<div className='flex min-w-0 flex-1 flex-col gap-0.5'>
					<span className='text-sm text-foreground'>{scenario.situation}</span>
					<span className='flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground'>
						{scenario.audience}
						{scenario.access ? ` · ${scenario.access}` : ""} · Task: {scenario.task}
					</span>
					{status === "done" ? (
						<span className='text-sm text-foreground'>
							<span className='font-medium'>{scenario.outcome === "done" ? "Done." : "Struggled."}</span> {scenario.summary}
						</span>
					) : null}
				</div>
				{status === "done" ? (
					<Button
						variant='ghost'
						size='sm'
						aria-expanded={open}
						aria-controls={id}
						className='shrink-0 gap-1 rounded-button-md'
						onClick={() => setOpen((value) => !value)}
					>
						Step through
						<ChevronDown aria-hidden className={cn("transition-transform", open && "rotate-180")} />
					</Button>
				) : null}
			</div>
			{open ? (
				<ol id={id} className='ms-6 flex flex-col gap-2 border-s border-border ps-4'>
					{scenario.steps.map((step, index) => (
						<li key={index} className='flex flex-col gap-0.5'>
							<span className='text-xs font-medium text-muted-foreground'>
								Step {index + 1} · {step.screen}
							</span>
							<span className='text-sm text-foreground'>
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
 * Evaluate's results beside the conversation (prds/sparks-validate.md, "The results"): which run and prototype version,
 * the read and the evidence status, then the measures, findings (with "Fix this in the prototype"), the scenarios (each
 * stepped through), assumptions, whether AutoParts Co. can build it, design and accessibility, what changes for teams,
 * and what only real people can tell us. While it runs, it's blank, then each part comes in as it's done, in that order;
 * it can be stopped. Not in Figma yet.
 */
function ValidatePanel({ evaluation, done, begun, finished, stopped, run, onStop, onFix, className }: ValidatePanelProps) {
	const scenariosDone = Math.min(done, evaluation.scenarios.length);
	// Each check after the scenarios unlocks its sections: business data, engineering context, design system, teams.
	const checked = (index: number) => done > evaluation.scenarios.length + index;
	const running = !finished && !stopped;
	// A run already finished when the panel opens shows at once.
	const [skipEntrance] = React.useState(finished);
	const openFindings = evaluation.findings.filter((f) => f.status === "open");

	const hypothesis = (
		<Section title='The hypothesis'>
			<div className='flex flex-col gap-1 rounded-md bg-background-subtle p-3'>
				<span className='text-sm font-semibold text-foreground'>{evaluation.hypothesis.outcome}</span>
				<span className='text-xs text-muted-foreground'>{evaluation.hypothesis.note}</span>
				<span className='pt-1 text-sm text-foreground'>{evaluation.hypothesis.text}</span>
			</div>
		</Section>
	);
	const measures = (
		<Section title='Effect on the measures'>
			<ul className='flex flex-col gap-3'>
				{evaluation.measures.map((measure) => (
					<li key={measure.name} className='flex flex-col gap-0.5 text-sm'>
						<span className='font-medium text-foreground'>{measure.name}</span>
						<span className='flex flex-wrap items-center gap-2 text-foreground'>
							{measure.status ? (
								<Badge variant='flat' tone={statusTone[measure.status]} size='xxs'>
									{measure.status}
								</Badge>
							) : null}
							{measure.estimate}
							{measure.reachesTarget !== undefined ? (measure.reachesTarget ? ", which reaches your target." : ", below your target.") : ""}
						</span>
						<span className='text-xs text-muted-foreground'>
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
			<ul className='flex flex-col divide-y divide-border'>
				{evaluation.findings.map((finding) => (
					<li key={finding.id} className='flex flex-col gap-1 py-3 first:pt-0'>
						<div className='flex flex-wrap items-center gap-2'>
							<Badge variant='flat' tone={severityTone[finding.severity]} size='xxs'>
								{finding.severity}
							</Badge>
							{finding.status === "fixed" ? (
								<Badge variant='flat' tone='green' size='xxs'>
									Fixed
								</Badge>
							) : null}
							<span className={cn("text-sm font-medium text-foreground", finding.status === "fixed" && "line-through decoration-muted-foreground")}>
								{finding.title}
							</span>
						</div>
						<span className='text-xs text-muted-foreground'>
							Where: {finding.where} · {finding.method}
						</span>
						{finding.fix && finding.status === "open" ? (
							<div className='flex flex-wrap items-center gap-2 pt-1'>
								<span className='text-sm text-foreground'>Suggested fix: {finding.fix}</span>
								{finding.fixable ? (
									<Button variant='outline' size='sm' className='rounded-button-md shadow-xs' onClick={() => onFix?.(finding.id)}>
										Fix this in the prototype
									</Button>
								) : null}
							</div>
						) : null}
					</li>
				))}
			</ul>
		</Section>
	);
	const assumptions = (
		<Section title='Assumptions'>
			<ul className='flex flex-col gap-2'>
				{evaluation.assumptions.map((assumption) => (
					<li key={assumption.text} className='flex flex-col gap-0.5 text-sm'>
						<span className='flex flex-wrap items-center gap-2 text-foreground'>
							<Badge variant='flat' tone={assumptionTone[assumption.status]} size='xxs'>
								{assumption.status}
							</Badge>
							{assumption.text}
						</span>
						<span className='text-xs text-muted-foreground'>{assumption.evidence}</span>
					</li>
				))}
			</ul>
		</Section>
	);
	const build = (
		<Section title='Can AutoParts Co. build it'>
			<ul className='flex list-disc flex-col gap-1 ps-5 text-sm text-foreground'>
				{evaluation.build.map((line) => (
					<li key={line}>{line}</li>
				))}
			</ul>
		</Section>
	);
	const design = (
		<Section title='Design system and accessibility'>
			<ul className='flex list-disc flex-col gap-1 ps-5 text-sm text-foreground'>
				{evaluation.design.map((line) => (
					<li key={line}>{line}</li>
				))}
			</ul>
		</Section>
	);
	const teams = (
		<Section title='What it changes for teams'>
			<ul className='flex flex-col gap-1 text-sm text-foreground'>
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
			<ul className='flex flex-col gap-2 text-sm'>
				{evaluation.realPeople.map((item) => (
					<li key={item.question} className='flex flex-col gap-0.5'>
						<span className='text-foreground'>{item.question}</span>
						<span className='text-xs text-muted-foreground'>How to find out: {item.how}</span>
					</li>
				))}
			</ul>
		</Section>
	);
	// While it runs (or stopped): only what's been done, in the order it's done, each part coming in as it finishes. The
	// scenario being tried shows with its spinner.
	const shownScenarios = evaluation.scenarios.slice(0, scenariosDone + (running && begun ? 1 : 0));
	const scenarios = (
		<Section title={`Scenarios (${evaluation.scenarios.length})`}>
			<ul className='flex flex-col divide-y divide-border'>
				{(finished ? evaluation.scenarios : shownScenarios).map((scenario, index) => (
					<ScenarioRow key={scenario.id} scenario={scenario} status={index < scenariosDone ? "done" : "running"} />
				))}
			</ul>
		</Section>
	);
	const blank = !finished && shownScenarios.length === 0;
	// The newest part stays in view while it runs, until she scrolls (or selects something) to read on her own.
	const { prefersReducedMotion } = useMotionPreference();
	const endRef = React.useRef<HTMLDivElement>(null);
	const scrollerRef = React.useRef<HTMLDivElement>(null);
	const reading = React.useRef(false);
	const stopFollowing = () => {
		reading.current = true;
	};
	React.useEffect(() => {
		if (running && !reading.current && endRef.current) return scrollIntoViewSmoothly(endRef.current, { reducedMotion: Boolean(prefersReducedMotion) });
	}, [done, running, prefersReducedMotion]);
	// A new run follows again; finished, the conclusions come first, so it starts at the top.
	React.useEffect(() => {
		reading.current = false;
	}, [run]);
	React.useLayoutEffect(() => {
		if (finished && scrollerRef.current) scrollerRef.current.scrollTop = 0;
	}, [finished]);

	return (
		<section aria-label='Evaluation' className={cn("flex min-h-0 flex-1 flex-col rounded-card bg-background-subtle p-4", className)}>
			<div className='flex flex-wrap items-center justify-between gap-2 pb-3'>
				<div className='flex flex-col'>
					<Typography as='h2' size='lg' weight='semibold' className='text-foreground-prominent'>
						Evaluation
					</Typography>
					<span className='text-xs text-muted-foreground'>
						Run {run} · prototype version {evaluation.version}
						{finished ? " · finished" : stopped ? " · Stopped before finishing" : ""}
					</span>
				</div>
				{running ? (
					<Button variant='outline' size='sm' className='rounded-button-md shadow-xs' onClick={onStop}>
						<Square aria-hidden /> Stop
					</Button>
				) : null}
			</div>
			{/* Blank until there's something to show: the steps are in the conversation. */}
			{blank ? (
				<div className='flex min-h-0 flex-1 items-center justify-center text-sm text-muted-foreground'>
					{stopped ? "Stopped before there were any results." : null}
				</div>
			) : (
				<motion.div
					// Finished, the results come in as a whole, the conclusions first.
					key={`${run}-${finished}`}
					ref={scrollerRef}
					variants={prefersReducedMotion ? fadeVariants : revealVariants}
					initial={skipEntrance ? false : "initial"}
					animate='animate'
					onWheel={stopFollowing}
					onTouchMove={stopFollowing}
					onPointerDown={stopFollowing}
					onKeyDown={stopFollowing}
					className='scrollbar-subtle flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto rounded-md bg-background p-4'
				>
					{/* Every result says its method; AI simulation is never research with real people. */}
					<p className='flex items-center gap-1.5 text-xs text-muted-foreground'>
						<TriangleAlert aria-hidden className='size-3.5' />
						AI evaluation: simulated scenarios and data checks, not testing with real people.
					</p>
					{finished ? (
						<>
							<div className='flex flex-col gap-2'>
								<Badge variant='flat' tone={readTone[evaluation.read]} size='sm' className='w-fit'>
									{evaluation.read}
								</Badge>
								<p className='text-sm text-foreground'>{evaluation.readText}</p>
								{evaluation.sinceLast ? <p className='text-sm text-muted-foreground'>Since the last run: {evaluation.sinceLast}</p> : null}
							</div>
							{hypothesis}
							{measures}
							{findings}
							{scenarios}
							{assumptions}
							{build}
							{design}
							{teams}
							{realPeople}
						</>
					) : (
						<>
							{scenarios}
							{checked(0) ? <Arriving>{hypothesis}</Arriving> : null}
							{checked(0) ? <Arriving>{measures}</Arriving> : null}
							{checked(1) ? <Arriving>{build}</Arriving> : null}
							{checked(2) ? <Arriving>{design}</Arriving> : null}
							{checked(3) ? <Arriving>{teams}</Arriving> : null}
							<div ref={endRef} aria-hidden className='-mt-4 h-px shrink-0' />
						</>
					)}
				</motion.div>
			)}
		</section>
	);
}

export {
	ValidatePanel,
	type Evaluation,
	type EvaluationFinding,
	type EvaluationMeasure,
	type EvaluationScenario,
	type ValidatePanelProps,
};
