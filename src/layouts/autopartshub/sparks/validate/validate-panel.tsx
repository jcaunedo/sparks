import * as React from "react";
import { ChevronDown, CircleCheck, CircleDashed, CircleX, Square, TriangleAlert } from "lucide-react";

import { Badge } from "@/components/data-display/badge";
import { Button } from "@/components/buttons/button";
import { Typography } from "@/components/typography/typography";
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
	/** The run shown: its results arrive part by part while `done` < all parts (scenarios, then checks). */
	evaluation: Evaluation;
	/** How many parts have finished; with everything, the full results show. */
	done: number;
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

/** A section whose check hasn't finished yet. */
function Pending({ what }: { what: string }) {
	return <p className='text-sm text-muted-foreground'>{what}</p>;
}

/** One scenario: its outcome, and its steps one select away. */
function ScenarioRow({ scenario, status }: { scenario: EvaluationScenario; status: "done" | "running" | "waiting" }) {
	const [open, setOpen] = React.useState(false);
	const id = React.useId();
	const icon =
		status !== "done" ? (
			<CircleDashed aria-hidden className={cn("size-4 text-muted-foreground", status === "running" && "animate-spin motion-reduce:animate-none")} />
		) : scenario.outcome === "done" ? (
			<CircleCheck aria-hidden className='size-4 text-success' />
		) : (
			<CircleX aria-hidden className='size-4 text-destructive' />
		);
	return (
		<li className='flex flex-col gap-1 py-2'>
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
		</li>
	);
}

/**
 * Evaluate's results beside the conversation (prds/sparks-validate.md, "The results"): which run and prototype version,
 * the read and the evidence status, then the measures, findings (with "Fix this in the prototype"), the scenarios (each
 * stepped through), assumptions, whether AutoParts Co. can build it, design and accessibility, what changes for teams,
 * and what only real people can tell us. Results fill in as the run goes; it can be stopped. Not in Figma yet.
 */
function ValidatePanel({ evaluation, done, stopped, run, onStop, onFix, className }: ValidatePanelProps) {
	const total = evaluation.scenarios.length + evaluation.checks.length;
	const finished = done >= total;
	const scenariosDone = Math.min(done, evaluation.scenarios.length);
	// Each check after the scenarios unlocks its sections: business data, engineering context, design system, teams.
	const checked = (index: number) => done > evaluation.scenarios.length + index;
	const running = !finished && !stopped;
	const openFindings = evaluation.findings.filter((f) => f.status === "open");

	return (
		<section aria-label='Evaluation' className={cn("flex min-h-0 flex-1 flex-col rounded-card bg-background-subtle p-4", className)}>
			<div className='flex flex-wrap items-center justify-between gap-2 pb-3'>
				<div className='flex flex-col'>
					<Typography as='h2' size='lg' weight='semibold' className='text-foreground-prominent'>
						Evaluation
					</Typography>
					<span className='text-xs text-muted-foreground'>
						Run {run} · prototype version {evaluation.version} ·{" "}
						{finished ? "finished" : stopped ? "Stopped before finishing" : `${done} of ${total} parts done`}
					</span>
				</div>
				{running ? (
					<Button variant='outline' size='sm' className='rounded-button-md shadow-xs' onClick={onStop}>
						<Square aria-hidden /> Stop
					</Button>
				) : null}
			</div>
			<div className='scrollbar-subtle flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto rounded-md bg-background p-4'>
				{/* Every result says its method; AI simulation is never research with real people. */}
				<p className='flex items-center gap-1.5 text-xs text-muted-foreground'>
					<TriangleAlert aria-hidden className='size-3.5' />
					AI evaluation: simulated scenarios and data checks, not testing with real people.
				</p>

				{finished ? (
					<div className='flex flex-col gap-2'>
						<Badge variant='flat' tone={readTone[evaluation.read]} size='sm' className='w-fit'>
							{evaluation.read}
						</Badge>
						<p className='text-sm text-foreground'>{evaluation.readText}</p>
						{evaluation.sinceLast ? <p className='text-sm text-muted-foreground'>Since the last run: {evaluation.sinceLast}</p> : null}
					</div>
				) : null}

				<Section title='The hypothesis'>
					{checked(0) ? (
						<div className='flex flex-col gap-1 rounded-md bg-background-subtle p-3'>
							<span className='text-sm font-semibold text-foreground'>{evaluation.hypothesis.outcome}</span>
							<span className='text-xs text-muted-foreground'>{evaluation.hypothesis.note}</span>
							<span className='pt-1 text-sm text-foreground'>{evaluation.hypothesis.text}</span>
						</div>
					) : (
						<Pending what='After the scenarios and business data.' />
					)}
				</Section>

				<Section title='Effect on the measures'>
					{checked(0) ? (
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
					) : (
						<Pending what='Checking business data…' />
					)}
				</Section>

				<Section title={finished ? `Findings (${openFindings.length} open)` : "Findings"}>
					{finished || stopped ? (
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
					) : (
						<Pending what='Findings come together at the end of the run.' />
					)}
				</Section>

				<Section title={`Scenarios (${evaluation.scenarios.length})`}>
					<ul className='flex flex-col divide-y divide-border'>
						{evaluation.scenarios.map((scenario, index) => (
							<ScenarioRow
								key={scenario.id}
								scenario={scenario}
								status={index < scenariosDone ? "done" : index === scenariosDone && running ? "running" : "waiting"}
							/>
						))}
					</ul>
				</Section>

				<Section title='Assumptions'>
					{finished ? (
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
					) : (
						<Pending what='At the end of the run.' />
					)}
				</Section>

				<Section title='Can AutoParts Co. build it'>
					{checked(1) ? (
						<ul className='flex list-disc flex-col gap-1 ps-5 text-sm text-foreground'>
							{evaluation.build.map((line) => (
								<li key={line}>{line}</li>
							))}
						</ul>
					) : (
						<Pending what='Checking engineering context…' />
					)}
				</Section>

				<Section title='Design system and accessibility'>
					{checked(2) ? (
						<ul className='flex list-disc flex-col gap-1 ps-5 text-sm text-foreground'>
							{evaluation.design.map((line) => (
								<li key={line}>{line}</li>
							))}
						</ul>
					) : (
						<Pending what='Checking the design system…' />
					)}
				</Section>

				<Section title='What it changes for teams'>
					{checked(3) ? (
						<ul className='flex flex-col gap-1 text-sm text-foreground'>
							{evaluation.teams.map((team) => (
								<li key={team.team}>
									<span className='font-medium'>{team.team}:</span> {team.change}
								</li>
							))}
						</ul>
					) : (
						<Pending what='Checking how teams work…' />
					)}
				</Section>

				<Section title='What only real people can tell us'>
					{finished ? (
						<ul className='flex flex-col gap-2 text-sm'>
							{evaluation.realPeople.map((item) => (
								<li key={item.question} className='flex flex-col gap-0.5'>
									<span className='text-foreground'>{item.question}</span>
									<span className='text-xs text-muted-foreground'>How to find out: {item.how}</span>
								</li>
							))}
						</ul>
					) : (
						<Pending what='At the end of the run.' />
					)}
				</Section>
			</div>
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
