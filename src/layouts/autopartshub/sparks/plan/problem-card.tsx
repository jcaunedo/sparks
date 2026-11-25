import { PlanSummary } from "./plan-summary";

/** The parts of the Problem section Dana needs before moving on (prds/sparks-plan-problem.md, "The Problem section"). */
type ProblemPartId = "name" | "statement" | "app" | "who" | "today" | "why";

/** One part as it stands in the concept. */
type ProblemPartDraft = {
	text: string;
	/** "sparks": Sparks suggested it and Dana confirmed it. "you": her own words. "edited": she changed Sparks's text. */
	source: "sparks" | "you" | "edited";
	/** The company knowledge source it draws on, e.g. "Customer intelligence". */
	basis?: string;
	/** Relies on something no evidence supports yet: labeled "Assumption". */
	assumption?: boolean;
};

/** The Problem section, part by part. */
type ProblemDraft = {
	parts: Record<ProblemPartId, ProblemPartDraft>;
	/** What Dana added to support the idea: file names, links or notes, marked as hers ("Supporting material"). */
	added?: string[];
	/** Solutions Dana mentioned, kept for the directions ("Ideas to explore"), in her words. */
	ideas?: string[];
	/**
	 * The problem as Sparks sums it up for her: a short, conversational summary in AssistantMessage's format (paragraphs,
	 * "- " lists, **bold**), built from the parts, with what's still an assumption said in words.
	 */
	summary: string;
	/** Dana said it captures the problem: it's in her concept. "Draft" until then. */
	approved?: boolean;
};

/** Where the summary comes from, in one line: her words, and the company knowledge it draws on. */
function sourcesLine(problem: ProblemDraft) {
	const sources: string[] = [];
	for (const part of Object.values(problem.parts)) {
		const source =
			part.source === "edited" ? "your changes" : part.basis ? part.basis.toLowerCase() : part.source === "you" ? "your message" : "";
		for (const each of source.split(" and ")) if (each && !sources.includes(each)) sources.push(each);
	}
	if (problem.added?.length) sources.push("what you added");
	const list = sources.length < 2 ? sources.join("") : `${sources.slice(0, -1).join(", ")} and ${sources[sources.length - 1]}`;
	return `From ${list}.`;
}

type ProblemCardProps = {
	/** Smaller text, for the plan. */
	compact?: boolean;
	problem: ProblemDraft;
	className?: string;
};

/**
 * The problem as it stands, as a short conversational summary in Sparks's reply, shown once at the end of Plan's Problem
 * part for Dana to approve as a whole (prds/sparks-plan-problem.md, "The Problem summary"). No card around it: it reads
 * as Sparks summing up, with one sources line under it. Read only: she changes it by asking Sparks, or from the
 * plan. Not in Figma yet.
 */
function ProblemCard({ problem, compact, className }: ProblemCardProps) {
	const { text, sources } = problemSummary(problem);
	return <PlanSummary label='The problem' text={text} sources={sources} compact={compact} className={className} />;
}

/** The summary's text (AssistantMessage's format) and its sources line: what the card shows, and what the plan edits. */
function problemSummary(problem: ProblemDraft) {
	// The app's name, with its address (the card's second line) in brackets.
	const [app, ...address] = problem.parts.app.text.split("\n");
	const text = [
		problem.summary,
		`**The app it improves:** ${app}${address.length ? ` (${address.join(", ")})` : ""}`,
		problem.added?.length ? `**What you added:** ${problem.added.join(", ")}` : "",
	]
		.filter(Boolean)
		.join("\n\n");
	return { text, sources: sourcesLine(problem) };
}

export { ProblemCard, problemSummary, type ProblemCardProps, type ProblemDraft, type ProblemPartDraft, type ProblemPartId };
