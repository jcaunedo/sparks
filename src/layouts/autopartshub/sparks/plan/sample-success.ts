import type { SparksReply, SparksSuggestion } from "../workspace/workspace";
import type { SuccessAssumptionCheck, SuccessDraft, SuccessPartDraft } from "./success-card";

/*
 * Plan's Success part for "Wrong-part returns", one question at a time (prds/sparks-plan-define-success.md). What the AI
 * and company knowledge would supply.
 */

/** The answers to the goal: it's Dana's call, so there's no "I'm not sure". */
export const sampleSuccessReplies = ["Yes, that's right", "Not quite"];

/**
 * The first question, asked in the reply that puts the brief in the concept: the goal, drafted from the brief, with no
 * solution in it.
 */
export const sampleSuccessGoalSuggestion: SparksSuggestion = {
	part: "success-goal",
	question: "What will be different if this works?",
	text: "Customers buying online get a part that fits the first time: fewer orders come back as \"doesn't fit\", and fewer of those customers stop buying from us.",
	basis: "What we know",
};

/**
 * How Dana answered a Success question: confirmed Sparks's suggestion, picked the other measure Sparks offered, or
 * put it in her own words (typed, or edited on the card).
 */
export type SuccessAnswer = "yes" | "alternative" | "typed";

/**
 * The second question: the main measure, the one result that says whether it worked. Sparks recommends the returns,
 * with today's figure; repeat purchases are the other candidate, one quick reply away.
 */
export const sampleSuccessMeasureSuggestion: SparksSuggestion = {
	part: "success-measure",
	question: "Which result matters most?",
	text: "Fewer online orders returned as \"doesn't fit\". Today: 18,400 in the last 90 days, 1 in 9 online returns.",
	basis: "Business performance",
};

/** The other candidate, if she picks it: nothing links returns to later purchases today, so it has no starting point. */
export const sampleSuccessRepeatMeasure =
	"More repeat purchases from customers whose part didn't fit. No starting point yet: AutoParts Co. doesn't link returns to later purchases today.";

/** The answers to the main measure: Sparks's pick, the other candidate, or something else. */
export const sampleSuccessMeasureReplies = ["Yes, that's right", "Repeat purchases instead", "Not quite"];

/**
 * After a correction (her words after "Not quite", or an edit on the card): what changed and why it matters, in its own
 * paragraph before the next question (prds/sparks-plan-define-success.md, "Answering").
 */
const successChanges = {
	goal: "Thanks, I've changed the goal. The measures and the target all come from it, so it should say what you want to be different.",
	measure:
		"Thanks, I've changed the main measure. It's the one result we'll judge this by, so it should be the one you'd report on.",
	target: "Thanks, I've changed the target. It's what we'll hold the results to, so it should be a number you'd stand behind.",
	notWorse:
		"Thanks, I've changed what must not get worse. Every idea gets checked against it too, so a fix for the returns can't quietly cost you somewhere else.",
};

const goalAcknowledgements: Record<SuccessAnswer, string> = {
	yes: "Got it, that's the goal. ",
	alternative: "Got it, that's the goal. ",
	typed: `${successChanges.goal}\n\n`,
};

/** After the goal: how Sparks took it, then the main measure, with why it recommends the returns. */
export function sampleSuccessMeasureReply(answer: SuccessAnswer): SparksReply {
	return {
		id: "success-measure",
		from: "sparks",
		thinking: [
			"Weighing returns against repeat purchases…",
			"Checking how fast each one moves…",
		],
		parts: [
			{
				kind: "text",
				text: `${goalAcknowledgements[answer]}Next, the main measure: the one result that tells us whether this worked.\n\nI'd pick the returns. They're the biggest cost we found, and they show a change within weeks. Repeat purchases take months to move, so I'd watch them as another measure.`,
			},
			{ kind: "suggestion", suggestion: sampleSuccessMeasureSuggestion },
		],
		quickReplies: sampleSuccessMeasureReplies,
	};
}

/** The answers to the target: it's Dana's call, like the goal. */
export const sampleSuccessTargetReplies = ["Yes, that's right", "Not quite"];

/**
 * The third question, after the main measure: the target and by when. For the returns, Sparks aims lower than the
 * vehicle selector did for the customers who used it, since most skipped it. With no starting point (repeat purchases,
 * or a measure in her words), any target is a guess, so it's an assumption Validate checks.
 */
const targetQuestions: Record<SuccessAnswer, { leadIn: string; suggestion: SparksSuggestion }> = {
	yes: {
		leadIn:
			"Got it: fewer \"doesn't fit\" returns is the main measure, and repeat purchases another one. Next, the target: how far returns should drop, and by when.\n\nThe vehicle selector cut these returns by about half for the customers who used it, but most skipped it. So across all online orders, I'd aim lower:",
		suggestion: {
			part: "success-target",
			question: "What's the target?",
			text: "25% fewer \"doesn't fit\" returns within 3 months of launch: from 18,400 to about 13,800 every 90 days.",
			basis: "Previous experiments",
		},
	},
	alternative: {
		leadIn:
			"Got it: repeat purchases is the main measure, and the returns another one.\n\nThere's no starting point for it yet, but we can get one: the returns team could match returns to later orders from the same customers. I've added that to what we'll check in Validate.\n\nNext, the target: how far it should move, and by when. Until we have a starting point, any target is a guess, so I've marked it as an assumption:",
		suggestion: {
			part: "success-target",
			question: "What's the target?",
			text: "10% more of these customers buy from us again within 6 months of launch.",
			assumption: true,
		},
	},
	typed: {
		leadIn: `${successChanges.measure}\n\nNext, the target: how far it should move, and by when.\n\nI don't have data on that measure yet, so any target is a guess for now. I've marked it as an assumption, and we'll check it in Validate:`,
		suggestion: {
			part: "success-target",
			question: "What's the target?",
			text: "25% better within 3 months of launch, measured from when we have a starting point.",
			assumption: true,
		},
	},
};

/** After the main measure: how Sparks took it, then the target, with where the number comes from. */
export function sampleSuccessTargetReply(answer: SuccessAnswer): SparksReply {
	const { leadIn, suggestion } = targetQuestions[answer];
	return {
		id: "success-target",
		from: "sparks",
		parts: [
			{ kind: "text", text: leadIn },
			{ kind: "suggestion", suggestion },
		],
		quickReplies: sampleSuccessTargetReplies,
	};
}

/** The answers to what must not get worse. */
export const sampleSuccessNotWorseReplies = ["Yes, that's right", "Not quite"];

/**
 * The fourth and last question, after the target: what must not get worse. Solution-free, from the brief's costs and
 * who's involved: whatever fixes the returns mustn't cost sales.
 */
export const sampleSuccessNotWorseSuggestion: SparksSuggestion = {
	part: "success-not-worse",
	question: "What must not get worse?",
	text: "Online sales. Today, 3.1% of visits to the site end in an order.",
	basis: "Business performance",
};

/** After the target: how Sparks took it, then what must not get worse, with why in plain words. */
export function sampleSuccessNotWorseReply(answer: SuccessTargetAnswer): SparksReply {
	return {
		id: "success-not-worse",
		from: "sparks",
		parts: [
			{
				kind: "text",
				text: `${targetAcknowledgements[answer]}Last, what must not get worse.\n\nA fix can push one number up and another down. If buying a part takes an extra step, fewer people might buy. So I'd keep an eye on online sales:`,
			},
			{ kind: "suggestion", suggestion: sampleSuccessNotWorseSuggestion },
		],
		quickReplies: sampleSuccessNotWorseReplies,
	};
}

/*
 * A target the data says is unlikely (prds/sparks-plan-define-success.md, "Starting points and targets"): Sparks says
 * so, with the source, and Dana decides.
 */

/** Sparks's own target for the returns, and the most it treats as likely: the vehicle selector halved them, for its users only. */
export const sampleSuccessSuggestedTarget = 25;
const likelyTargetLimit = 40;

/** The percentage in a target, "half" as 50; undefined when there's none. */
function targetPercent(text: string) {
	const match = text.match(/(\d+(?:\.\d+)?)\s*%/);
	if (match) return Number(match[1]);
	return /\bhalf\b/i.test(text) ? 50 : undefined;
}

/** Whether a target for the returns goes beyond what the vehicle selector managed. */
export function sampleSuccessTargetUnlikely(text: string) {
	const percent = targetPercent(text);
	return percent !== undefined && percent >= likelyTargetLimit;
}

/** The answers when a target looks unlikely: hers, kept as an assumption, or Sparks's. */
export const sampleSuccessUnlikelyReplies = ["Keep my target", `Use ${sampleSuccessSuggestedTarget}%`];

/** Her target is beyond what the closest experiment achieved: Sparks says why, with the source, and lets her decide. */
export const sampleSuccessTargetUnlikelyReply: SparksReply = {
	id: "success-target-unlikely",
	from: "sparks",
	parts: [
		{
			kind: "text",
			text: `That's more than the vehicle selector managed. It cut these returns by about half, but only for the customers who used it, and most skipped it (previous experiments, 2025).\n\nYou can keep your target, and I'll mark it as an assumption for Validate to check, or go with ${sampleSuccessSuggestedTarget}%.`,
		},
	],
	quickReplies: sampleSuccessUnlikelyReplies,
};

/** How Sparks takes the target: confirmed, in her words, hers kept despite the data, or Sparks's after all. */
export type SuccessTargetAnswer = SuccessAnswer | "kept" | "lowered";

const targetAcknowledgements: Record<SuccessTargetAnswer, string> = {
	yes: "Got it, that's the target. ",
	alternative: "Got it, that's the target. ",
	typed: `${successChanges.target}\n\n`,
	kept: "Got it, I've kept your target and marked it as an assumption. ",
	lowered: `Got it, ${sampleSuccessSuggestedTarget}% it is. `,
};

/*
 * The Success criteria: built from Dana's answers to the four questions, plus what Sparks drafts without asking
 * (the other measures, what's not part of the concept, and how each assumption will be checked).
 */

/** What Dana ended with for each Success question, and which main measure she picked. */
export type SuccessAnswers = {
	goal: SparksSuggestion;
	measure: SparksSuggestion;
	target: SparksSuggestion;
	notWorse: SparksSuggestion;
	/** Sparks's pick (the returns), the other candidate (repeat purchases), or a measure in her words. */
	measureChoice: "returns" | "repeat" | "own";
	/** The brief's "Assumptions to check". */
	briefAssumptions: string[];
};

const returnsMeasure: SuccessPartDraft = {
	text: "Online orders returned as \"doesn't fit\". Today: 18,400 in the last 90 days, 1 in 9 online returns.",
	source: "evidence",
	basis: "business performance, Aug–Oct 2026",
};
const repeatMeasure: SuccessPartDraft = {
	text: "Repeat purchases from customers whose part didn't fit. No starting point yet.",
	source: "sparks",
};

/** A part as Dana answered it: her words, or Sparks's suggestion with its evidence. */
function answered(suggestion: SparksSuggestion, evidenceBasis?: string): SuccessPartDraft {
	if (suggestion.edited) return { text: suggestion.text, source: "dana", assumption: suggestion.assumption };
	if (suggestion.assumption) return { text: suggestion.text, source: "sparks", assumption: true };
	return evidenceBasis ? { text: suggestion.text, source: "evidence", basis: evidenceBasis } : { text: suggestion.text, source: "dana" };
}

/** The Success criteria, from how Dana answered each question. */
export function sampleSuccessFrom(answers: SuccessAnswers): SuccessDraft {
	const { measureChoice } = answers;
	const mainMeasure: SuccessPartDraft =
		measureChoice === "returns"
			? returnsMeasure
			: measureChoice === "repeat"
				? { ...repeatMeasure, source: "dana" }
				: { text: answers.measure.text, source: "dana" };
	const otherMeasures =
		measureChoice === "returns" ? [repeatMeasure] : measureChoice === "repeat" ? [returnsMeasure] : [returnsMeasure, repeatMeasure];

	const assumptionChecks: SuccessAssumptionCheck[] = answers.briefAssumptions.map((assumption) =>
		/buy less from us/.test(assumption)
			? { assumption, checkedBy: "Shown by repeat purchases, once we have a starting point. In Validate until then." }
			: { assumption, checkedBy: "Checked in Validate." },
	);
	if (measureChoice !== "returns")
		assumptionChecks.push({
			assumption: "A starting point for repeat purchases.",
			checkedBy: "The returns team matches returns to later orders from the same customers, in Validate.",
		});
	if (answers.target.assumption)
		assumptionChecks.push({ assumption: "That the target is realistic.", checkedBy: "Checked in Validate." });

	return {
		goal: { text: answers.goal.text, source: "dana" },
		mainMeasure,
		target: answered(answers.target, measureChoice === "returns" ? "previous experiments, 2025" : undefined),
		otherMeasures,
		notWorse: answered(answers.notWorse, "business performance, Aug–Oct 2026"),
		notInScope: {
			text: "Changing the return policy. This is about customers buying the right part in the first place.",
			source: "sparks",
		},
		assumptionChecks,
	};
}

/** The answers to the Success criteria. */
/**
 * The answers to every Plan summary (the problem, what we know, what success looks like, what we'll build): the first
 * approves it and moves on, so it says so, and there's no question before it (prds/sparks.md, "Talking with Sparks").
 */
export const sampleSummaryReplies = ["Looks right, continue", "Not quite"];

export const sampleSuccessSummaryReplies = sampleSummaryReplies;

/** After the last question: how Sparks took it, the Success criteria, and the approval question. */
export function sampleSuccessSummaryReply(answer: SuccessAnswer, success: SuccessDraft): SparksReply {
	return {
		id: "success-summary",
		from: "sparks",
		thinking: ["Putting the success criteria on the lift…"],
		parts: [
			{
				kind: "text",
				text: `${answer === "typed" ? `${successChanges.notWorse}\n\n` : "Got it. "}That's all I need to ask.\n\n**Here's what success looks like:**`,
			},
			{ kind: "success", success },
			{
				kind: "text",
				text: "From here on, every idea gets checked against this.",
			},
		],
		quickReplies: sampleSuccessSummaryReplies,
	};
}

/** After "Not quite" on the Success criteria: the card can't be edited in place, so Sparks asks what's off. */
export const sampleSuccessNotQuiteReply: SparksReply = {
	id: "success-not-quite",
	from: "sparks",
	parts: [{ kind: "text", text: "What's off? Tell me in your own words, and I'll update it." }],
};

/** After her correction: Sparks updates the Success criteria and asks again. */
export const sampleSuccessAgainReply: SparksReply = {
	id: "success-again",
	from: "sparks",
	parts: [{ kind: "text", text: "Thanks, I've updated it." }],
	quickReplies: sampleSuccessSummaryReplies,
};
