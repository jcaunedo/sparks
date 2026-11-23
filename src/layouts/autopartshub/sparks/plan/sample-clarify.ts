import type { SparksReply, SparksSuggestion } from "../workspace/workspace";
import type { BriefDraft, BriefPartDraft } from "./brief-card";
import { sampleSuccessGoalSuggestion, sampleSuccessReplies, sampleSummaryReplies } from "./sample-success";

/*
 * Plan's Clarify part for "Wrong-part returns", one question at a time (prds/sparks-plan-clarify.md). What the AI and
 * company knowledge would supply.
 */

export { sampleSummaryReplies };

/** The answers to a Clarify question: "I'm not sure" is a good answer too. */
export const sampleClarifyReplies = ["Yes, that's right", "Not quite", "I'm not sure"];

/** The first question, asked right after the Problem summary: what people do today (the brief's "What people do today"). */
export const sampleClarifyTodaySuggestion: SparksSuggestion = {
	part: "brief-today",
	question: "What do customers do today when they're not sure a part fits?",
	text: "Most call or visit a store to ask. Some check the fit list on the product page, and some order two options and send back the one that doesn't fit.",
	basis: "Customer intelligence",
};

/** How Sparks takes an answer, in one line before its next question. */
export type ClarifyAnswer = "yes" | "not-sure" | "typed";

/** The Clarify questions, by the brief part each fills. */
type ClarifyPart = "brief-today" | "brief-why" | "brief-limits";

/**
 * After a correction (her words after "Not quite", or an edit on the card): what changed and why it matters, in its own
 * paragraph before the next question (prds/sparks-plan-clarify.md, "Answering").
 */
const clarifyChanges: Record<ClarifyPart, string> = {
	"brief-today":
		"Thanks, I've changed what customers do today. Any solution has to fit how people buy now, so it's worth getting right.",
	"brief-why":
		"Thanks, I've changed why it happens. The solutions we look at will go after the cause, so your view counts more than my guess.",
	"brief-limits":
		"Thanks, I've changed what a solution has to work around. I'll check every direction against these limits, so they need to be right.",
};

/** How Sparks takes her answer to the question before (`previous`), ahead of what comes next. */
function acknowledge(answer: ClarifyAnswer, previous: ClarifyPart): string {
	if (answer === "typed") return `${clarifyChanges[previous]}\n\n`;
	return answer === "yes" ? "Got it. " : "No problem. I'll note it as an assumption, and we'll check it in Validate. ";
}

/** A Clarify question after the first: how Sparks took her last answer, a lead-in, then the question on its card. */
function clarifyReply(id: string, previous: ClarifyPart, leadIn: string, suggestion: SparksSuggestion) {
	return (answer: ClarifyAnswer): SparksReply => ({
		id,
		from: "sparks",
		parts: [
			{ kind: "text", text: `${acknowledge(answer, previous)}${leadIn}` },
			{ kind: "suggestion", suggestion },
		],
		quickReplies: sampleClarifyReplies,
	});
}

/**
 * The second question: why it happens (the brief's "Why it happens"). No data says for sure, so Sparks's guess starts
 * as an assumption.
 */
export const sampleClarifyWhySuggestion: SparksSuggestion = {
	part: "brief-why",
	question: "Why does it happen?",
	text: "Customers often don't know their vehicle's exact details, like the trim or engine size, and our fit data has gaps for vehicles more than 10 years old.",
	assumption: true,
};
export const sampleClarifyWhyReply = clarifyReply(
	"clarify-why",
	"brief-today",
	"Next, why it happens. Nothing in the data says for sure, so this is my best guess:",
	sampleClarifyWhySuggestion,
);

/** The third question: what any solution has to respect (the brief's "Limits"), from engineering context. */
export const sampleClarifyLimitsSuggestion: SparksSuggestion = {
	part: "brief-limits",
	question: "What does a solution have to work around?",
	text: "Product pages can't change during the holiday freeze, until early January, and fit data comes from a supplier feed that the catalog team updates once a month.",
	basis: "Engineering context",
};
export const sampleClarifyLimitsReply = clarifyReply(
	"clarify-limits",
	"brief-why",
	"Next, what any solution has to work around. Here's what I found in engineering context:",
	sampleClarifyLimitsSuggestion,
);

/** The Clarify questions after the first, in the order Sparks asks them. */
export const sampleClarifyNextReplies = [sampleClarifyWhyReply, sampleClarifyLimitsReply];


/*
 * The Problem brief: what company knowledge says, plus how Dana answered each question. A confirmed guess from data
 * stays evidence; a confirmed guess with no data behind it (why it happens) becomes hers; "I'm not sure" leaves it an
 * assumption; an answer in her own words is hers.
 */

/** How Dana answered a Clarify question, by the brief part it fills. */
export type ClarifyOutcome = "confirmed" | "not-sure" | "her-words";

/** The brief's summary, its parts from company knowledge, and Sparks's guesses for the parts it asked about. */
const briefBase = {
	summary:
		"About 1 in 9 online returns is a part that doesn't fit, costing about $410,000 in 90 days. A vehicle selector helped the customers who used it, but most skipped it.",
	parts: {
		size: {
			text: "18,400 online orders came back as \"doesn't fit\" in the last 90 days, 1 in 9 online returns.",
			source: "evidence",
			basis: "business performance, Aug–Oct 2026",
		},
		cost: {
			text: "About $410,000 in return shipping and handling in 90 days, plus store staff time answering fit questions.",
			source: "evidence",
			basis: "business performance, Aug–Oct 2026",
		},
		tried: {
			text: "A vehicle selector on product pages: customers who used it returned far fewer parts as \"doesn't fit\", but most skipped it.",
			source: "evidence",
			basis: "previous experiments, 2025",
		},
		involved: {
			text: "Do-it-yourself customers, professional mechanics, store staff, the returns team, the catalog team and the web team.",
			source: "evidence",
			basis: "customer intelligence and product ecosystem",
		},
	},
} as const;

/** The brief, from how Dana answered each question (by its suggestion's `part`) and the text each ended with. */
export function sampleBriefFrom(
	answers: Partial<Record<ClarifyPart, { outcome: ClarifyOutcome; text: string }>>,
): BriefDraft {
	const asked = (
		part: ClarifyPart,
		guess: SparksSuggestion,
		evidenceBasis?: string,
	): BriefPartDraft => {
		const answer = answers[part] ?? { outcome: "not-sure" as const, text: guess.text };
		if (answer.outcome === "her-words") return { text: answer.text, source: "dana" };
		if (answer.outcome === "not-sure") return { text: answer.text, source: "assumption" };
		return evidenceBasis ? { text: answer.text, source: "evidence", basis: evidenceBasis } : { text: answer.text, source: "dana" };
	};
	const parts: BriefDraft["parts"] = {
		...briefBase.parts,
		today: asked("brief-today", sampleClarifyTodaySuggestion, "customer intelligence, last 6 months"),
		why: asked("brief-why", sampleClarifyWhySuggestion),
		limits: asked("brief-limits", sampleClarifyLimitsSuggestion, "engineering context"),
	};
	const assumptions = [
		"Customers who return a part that doesn't fit buy less from us afterwards.",
		...(Object.values(parts) as BriefPartDraft[]).filter((part) => part.source === "assumption").map((part) => part.text),
	];
	return { summary: briefBase.summary, parts, assumptions };
}

/** The end of Clarify: how Sparks took the last answer, the brief, its biggest assumption, and the approval question. */
export function sampleBriefReply(answer: ClarifyAnswer, brief: BriefDraft): SparksReply {
	const whyAssumed = brief.parts.why.source === "assumption";
	return {
		id: "brief-summary",
		from: "sparks",
		thinking: ["Lining up what we know with what we're assuming…"],
		parts: [
			{ kind: "text", text: `${acknowledge(answer, "brief-limits")}That's all I need to ask.\n\n**Here's what we know so far:**` },
			{ kind: "brief", brief },
			// With more than one assumption, Sparks says which matters most; with one, the summary already says it. No
			// question after it: the buttons say what they do ("Looks right, continue").
			...(brief.assumptions.length < 2
				? []
				: [
						{
							kind: "text" as const,
							text: whyAssumed
								? "The biggest thing we're assuming is that customers don't know their exact vehicle details, and that's why they buy the wrong part."
								: "The biggest thing we're assuming is that customers who return a part that doesn't fit buy less from us afterwards.",
						},
					]),
		],
		quickReplies: sampleSummaryReplies,
	};
}

/** After "Not quite" on the brief: the brief can't be edited on its card, so Sparks asks what's off. */
export const sampleBriefNotQuiteReply: SparksReply = {
	id: "brief-not-quite",
	from: "sparks",
	parts: [{ kind: "text", text: "What's off? Tell me in your own words, and I'll update it." }],
};

/** After her correction: Sparks updates the brief and asks again. */
export const sampleBriefAgainReply: SparksReply = {
	id: "brief-again",
	from: "sparks",
	parts: [{ kind: "text", text: "Thanks, I've updated it." }],
	quickReplies: sampleSummaryReplies,
};

/**
 * "Looks right": the brief is in the concept, and Sparks goes straight into Success's first question, the goal, with no
 * button in between (prds/sparks-plan-define-success.md, "Starting this part").
 */
export const sampleBriefApprovedReply: SparksReply = {
	id: "brief-approved",
	from: "sparks",
	thinking: ["Reading the gauges: what we know so far…", "Lining up the next question…"],
	parts: [
		{
			kind: "text",
			text: "**Now, let's define what success looks like.**\n\nWe'll agree on it before looking at any solutions, so later you can tell whether the one you pick works. I'll suggest each part from what we know, one at a time. First, the goal:",
		},
		{ kind: "suggestion", suggestion: sampleSuccessGoalSuggestion },
	],
	quickReplies: sampleSuccessReplies,
};
