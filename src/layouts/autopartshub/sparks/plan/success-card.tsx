import { PlanSummary, listInWords, lowerFirst, sourcesLine, withSource } from "./plan-summary";

/** One statement in the Success criteria and where it came from: evidence, Dana, or Sparks (a suggestion she hasn't changed). */
type SuccessPartDraft = {
	text: string;
	source: "evidence" | "dana" | "sparks";
	/** For evidence: the source and the period it covers, e.g. "business performance, Aug–Oct 2026". */
	basis?: string;
	/** Rests on something no evidence supports yet (a target with no starting point, or one beyond what's been seen). */
	assumption?: boolean;
};

/** One assumption from the brief, or from this part, and what checks it: a measure, or Evaluate. */
type SuccessAssumptionCheck = {
	assumption: string;
	checkedBy: string;
};

/** The Success criteria (prds/sparks-plan-define-success.md, "The Success criteria section"). */
type SuccessDraft = {
	goal: SuccessPartDraft;
	mainMeasure: SuccessPartDraft;
	target: SuccessPartDraft;
	otherMeasures: SuccessPartDraft[];
	notWorse: SuccessPartDraft;
	notInScope: SuccessPartDraft;
	assumptionChecks: SuccessAssumptionCheck[];
	/** Dana approved it: it's in her concept. */
	approved?: boolean;
};

/** A part as Sparks says it: with its source in brackets, "from you", or called an assumption. */
function inWords(part: SuccessPartDraft) {
	const said = withSource(part.text, part.source === "dana" ? "from you" : part.source === "evidence" ? part.basis : undefined);
	return part.assumption ? `${said} That's an assumption for now.` : said;
}

type SuccessCardProps = {
	/** Smaller text, for the plan. */
	compact?: boolean;
	success: SuccessDraft;
	className?: string;
};

/**
 * What success looks like (the Success criteria), summed up in Sparks's reply at the end of Plan's Success part
 * (prds/sparks-plan-define-success.md, "Finishing this part"): the goal, then the measures, the target, what must not
 * get worse and what's not part of it, then how each assumption will be checked. No card around it. Not in Figma yet.
 */
function SuccessCard({ success, compact, className }: SuccessCardProps) {
	const { text, sources } = successSummary(success);
	return <PlanSummary label='What success looks like' text={text} sources={sources} compact={compact} className={className} />;
}

/** The summary's text (AssistantMessage's format) and its sources line: what the card shows, and what the plan edits. */
function successSummary(success: SuccessDraft) {
	const others = success.otherMeasures.map((measure) => lowerFirst(measure.text.replace(/\.$/, "")));
	const lines = [
		`- **Main measure:** ${inWords(success.mainMeasure)}`,
		`- **Target:** ${inWords(success.target)}`,
		others.length ? `- **Also watching:** ${listInWords(others)}.` : "",
		`- **Must not get worse:** ${inWords(success.notWorse)}`,
		`- **Not part of this:** ${inWords(success.notInScope)}`,
	].filter(Boolean);
	// The goal named as one ("Goal:", "reached the goal"), so the demo reads plainly: what we're after, then how we'll know.
	const text = [
		`**Goal:** ${inWords(success.goal)}`,
		"We'll know we've reached the goal by:",
		lines.join("\n"),
		success.assumptionChecks.length ? "How we'll check what we're assuming:" : "",
		success.assumptionChecks.map(({ assumption, checkedBy }) => `- ${assumption} ${checkedBy}`).join("\n"),
	]
		.filter(Boolean)
		.join("\n\n");
	const parts = [success.goal, success.mainMeasure, success.target, ...success.otherMeasures, success.notWorse];
	const sources = parts.flatMap((part) =>
		part.source === "dana" ? ["you"] : part.source === "evidence" && part.basis ? [part.basis] : [],
	);
	return { text, sources: sourcesLine(sources) };
}

export {
	SuccessCard,
	successSummary,
	type SuccessAssumptionCheck,
	type SuccessCardProps,
	type SuccessDraft,
	type SuccessPartDraft,
};
