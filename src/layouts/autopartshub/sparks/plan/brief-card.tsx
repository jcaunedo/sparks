import { PlanSummary, sourcesLine, withSource } from "./plan-summary";

/** The parts of the Problem brief (prds/sparks-plan-clarify.md, "The Problem brief"), "Assumptions to check" aside. */
type BriefPartId = "size" | "cost" | "today" | "why" | "tried" | "limits" | "involved";

/** One part of the brief and where it stands: backed by evidence, from Dana, or an assumption. */
type BriefPartDraft = {
	text: string;
	source: "evidence" | "dana" | "assumption";
	/** For evidence: the source and the period it covers, e.g. "business performance, Aug–Oct 2026". */
	basis?: string;
};

/** The Problem brief: a short summary, its parts, and the assumptions to check. */
type BriefDraft = {
	summary: string;
	parts: Record<BriefPartId, BriefPartDraft>;
	assumptions: string[];
	/** Dana said it looks right: it's in her concept. */
	approved?: boolean;
};

/*
 * Product copy: how each part is introduced, in the order Sparks sums them up. Only what Clarify adds: who it affects is
 * in the problem already (prds/sparks-plan-clarify.md, "The Problem brief").
 */
const briefParts: { id: BriefPartId; label: string }[] = [
	{ id: "today", label: "What customers do about it" },
	{ id: "why", label: "Why it happens" },
	{ id: "limits", label: "What a solution has to work around" },
	{ id: "involved", label: "Who's involved" },
];

/** A part as Sparks says it: with its source in brackets, "from you", or called a guess. */
function inWords(part: BriefPartDraft) {
	if (part.source === "assumption") return `${part.text} That's my guess for now, so it's an assumption.`;
	return withSource(part.text, part.source === "dana" ? "from you" : part.basis);
}

type BriefCardProps = {
	/** Smaller text, for the Blueprint. */
	compact?: boolean;
	brief: BriefDraft;
	className?: string;
};

/**
 * What we know (the Problem brief), summed up in Sparks's reply at the end of Plan's Clarify part
 * (prds/sparks-plan-clarify.md, "Finishing this part"): the short summary (how often, what it costs, what's been tried),
 * then the rest as lines with where each came from, then what's still to check. No card around it. Not in Figma yet.
 */
function BriefCard({ brief, compact, className }: BriefCardProps) {
	const lines = briefParts.map(({ id, label }) => `- **${label}:** ${inWords(brief.parts[id])}`);
	const text = [
		brief.summary,
		"Here's what's behind it:",
		lines.join("\n"),
		brief.assumptions.length ? "Still to check:" : "",
		brief.assumptions.map((assumption) => `- ${assumption}`).join("\n"),
	]
		.filter(Boolean)
		.join("\n\n");
	const sources = Object.values(brief.parts).flatMap((part) =>
		part.source === "dana" ? ["you"] : part.source === "evidence" && part.basis ? [part.basis] : [],
	);
	return <PlanSummary label='What we know' text={text} sources={sourcesLine(sources)} compact={compact} className={className} />;
}

export { BriefCard, type BriefCardProps, type BriefDraft, type BriefPartDraft, type BriefPartId };
