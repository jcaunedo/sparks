import type { SparksReply } from "../workspace/workspace";
import type { FitCheckChanges } from "../prototype/fit-check-prototype";
import type { Evaluation } from "../validate/validate-panel";
import type { ChosenDraft } from "../plan/chosen-card";
import type { DirectionDraft } from "../plan/direction-card";
import type { ConceptForReview, Reviewer } from "./review-panel";
import { reviewProfileFor, type ReviewDecision } from "./sample-review-directions";

/*
 * Review for "Wrong-part returns" (prds/sparks-review.md): the concept for review, put together from what was decided
 * (nothing new), the reviewers' departments and views, Sparks's summary, the recommendation and the decision, for the
 * direction Dana chose (sample-review-directions.ts). What the AI and the people involved would supply: the reviewers
 * and the decision owner are simulated in the demo.
 */

/** The decision owner Sparks suggests: the product lead for the area (prds/sparks-review.md, "The decision"). */
export const sampleDecisionOwner = { name: "Morgan Reyes", role: "the product lead for online sales" };

/** What goes into the concept for review besides the prototype and the evaluation. */
export type ReviewInputs = {
	changes: FitCheckChanges;
	version: number;
	/** "What we'll build", from Plan. */
	chosen: ChosenDraft;
	/** The direction she chose, and the one Sparks recommended. */
	direction: DirectionDraft;
	recommended: DirectionDraft;
	/** The last finished evaluation; none when Validate was skipped. */
	evaluation?: Evaluation;
	/** Engineering's effort replaced Sparks's rough one. */
	engineeringEffort?: boolean;
	/** Questions added after the reviews. */
	openQuestions?: string[];
};

const lowerFirst = (text: string) => text.charAt(0).toLowerCase() + text.slice(1);

/** The concept for review: every part of "What's reviewed", from the spec, each statement keeping its label. */
export function sampleConceptForReview({
	changes,
	version,
	chosen,
	direction,
	recommended,
	evaluation,
	engineeringEffort,
	openQuestions = [],
}: ReviewInputs): ConceptForReview {
	const profile = reviewProfileFor(direction.id);
	const main = evaluation?.measures[0];
	const range = main?.estimate.replace(/^Likely /, "").replace(/ fewer.*$/, "");
	const unknown = evaluation?.assumptions.filter((a) => a.status === "Still unknown").map((a) => a.text.replace(/\.$/, "").toLowerCase()) ?? [];
	const open = evaluation?.findings.filter((f) => f.status === "open" && f.severity !== "Minor") ?? [];
	const isPick = direction.id === recommended.id;
	return {
		evidenceStatus: evaluation
			? `${evaluation.hypothesis.outcome}. ${evaluation.hypothesis.note}`
			: "Not tested. Validate was skipped, so the hypothesis hasn't been checked.",
		summary: `Customers buying parts online can't tell whether a part fits their exact vehicle, so they order the wrong one and send it back: 18,400 orders in 90 days, 1 in 9 online returns. It hits do-it-yourself customers with older vehicles hardest. The goal is fewer orders returned as "doesn't fit", 25% fewer within 3 months, without hurting online sales. The chosen direction is "${chosen.name}": ${lowerFirst(chosen.idea)}${range ? ` Business data and simulated scenarios suggest "doesn't fit" returns would drop ${range}, ${main?.reachesTarget ? "reaching" : "below"} the target.` : ""} Known issues and gaps are listed below.`,
		gaps: [
			...(evaluation ? [] : ["Validate was skipped: the hypothesis is not tested."]),
			...(main && main.reachesTarget === false ? [`The estimate (${range}) is below the 25% target.`] : []),
			"Repeat purchases have no starting point yet.",
			...(unknown.length ? [`Still unknown: ${unknown.join("; ")}.`] : []),
		],
		hypothesis: chosen.believe,
		stories: profile.stories(changes),
		prototype: [`Version ${version}, current when submitted.`, ...profile.prototype(changes)],
		success: [
			'Goal: customers buying online get a part that fits the first time: fewer orders come back as "doesn\'t fit", and fewer of those customers stop buying from us (from Dana).',
			'Main measure: online orders returned as "doesn\'t fit". Today: 18,400 in 90 days, 1 in 9 online returns (business performance, Aug–Oct 2026).',
			'Target: 25% fewer "doesn\'t fit" returns within 3 months of launch (previous experiments, 2025).',
			"Also watching: repeat purchases from customers whose part didn't fit. No starting point yet.",
			"Must not get worse: online sales. Today, 3.1% of visits end in an order (business performance, Aug–Oct 2026).",
			"Not part of this: changing the return policy.",
		],
		why: [
			`Chosen: "${chosen.name}": ${lowerFirst(chosen.why).replace(/\.$/, "")} (${isPick ? "Sparks's recommendation, approved by Dana" : `Dana's choice; Sparks recommended "${recommended.name}"`}).`,
			`Trade-offs accepted: ${lowerFirst(chosen.givesUp)}`,
			`Also considered: ${chosen.alsoConsidered.join(" ")}`,
		],
		evidence: [
			'18,400 online orders came back as "doesn\'t fit" in 90 days, 1 in 9 online returns (business performance, Aug–Oct 2026).',
			"About $410,000 in return shipping and handling in 90 days (business performance, Aug–Oct 2026).",
			'Customers who used last year\'s vehicle selector returned far fewer parts as "doesn\'t fit", but most skipped it (previous experiments, 2025).',
			"Customers often don't know their vehicle's exact details, like the trim or engine size (from Dana).",
			...(evaluation
				? [`The evaluation: ${evaluation.scenarios.length} scenarios and ${evaluation.checks.length} checks on prototype version ${evaluation.version} (AI simulation and business data analysis).`]
				: []),
		],
		build: (evaluation?.build ?? [`Rough effort: ${direction.effort.size}, as estimated in Plan.`]).map((line) =>
			engineeringEffort && line.startsWith("Rough effort") ? profile.effort.line : line,
		),
		design: evaluation?.design ?? [
			"Built with the design system's components.",
			changes.lightText ? "Light gray secondary text departs from the design system (kept by Dana)." : "Text contrast meets the standard.",
		],
		knownIssues: open.map((f) => `${f.title} (${f.severity}, ${f.method}).`),
		realPeople: (evaluation?.realPeople ?? []).map((r) => `${r.question} How: ${r.how}`),
		teams: (evaluation?.teams ?? []).map((t) => `${t.team}: ${t.change}`),
		decisions: [
			"The problem: agreed by Dana.",
			"What we know and what success looks like: approved by Dana.",
			`Direction: "${chosen.name}", ${isPick ? "Sparks's recommendation, approved by Dana" : "chosen by Dana"}.`,
			`Prototype: version ${version}.`,
			evaluation ? "Validate: run, then Dana went ahead to Review." : "Validate: skipped.",
		],
		openQuestions: [...profile.openQuestions, ...openQuestions],
		later: [],
	};
}

/** The departments Sparks suggests: the UX team and engineering always, plus those the concept changes. Never people. */
export const sampleReviewersFor = (directionId?: string): Reviewer[] => reviewProfileFor(directionId).reviewers.map((r) => ({ ...r }));

/** Each department's view once it's done, for the prototype as it stands. */
export const sampleReviewerViews = (changes: FitCheckChanges, directionId?: string) => reviewProfileFor(directionId).views(changes);

/** A department as it reads in a sentence: "the UX team", "engineering". */
const inSentence = (department: string) =>
	department === "UX team" ? "the UX team" : department.endsWith(" team") ? `the ${department.toLowerCase()}` : department.toLowerCase();

/** "the UX team, engineering, stores and the catalog team". */
const departmentsInWords = (directionId?: string) => {
	const names = reviewProfileFor(directionId).reviewers.map((r) => inSentence(r.department));
	return `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;
};

/** The reviewers' next status, one step at a time, in the demo. */
export const sampleReviewStepMs = 700;

const bulletsFor = (lines: string[]) => lines.map((line) => `- ${line}`).join("\n");

/**
 * Review opens: the concept for review on the right, what's still open, who Sparks would invite and why, and the
 * invitation it drafted (prds/sparks-review.md, "Checking it's ready", "Bringing others in"). Sending waits for her.
 */
export function sampleReviewOpenReply(concept: ConceptForReview, opening: string, skipped: boolean, directionId?: string): SparksReply {
	const reviewers = sampleReviewersFor(directionId);
	const open = [...concept.knownIssues.map((issue) => `Known issue: ${issue.charAt(0).toLowerCase()}${issue.slice(1)}`), ...concept.gaps];
	return {
		id: "review-open",
		from: "sparks",
		thinking: [
			"Assembling your idea for review…",
			"Checking what's still open…",
			"Finding the right teams to look it over…",
		],
		parts: [
			{
				kind: "text",
				text: `${opening}**Here's your idea, ready for review.** It's on the right, put together from what you decided, with nothing added.\n\nBefore you bring anyone in, here's what's still open. None of it stops you; it goes to review as known issues and gaps:\n\n${bulletsFor(open)}${skipped ? "\n\nRunning Validate takes a few minutes and would make your recommendation stronger." : ""}\n\nI'd ask four teams to review it:\n\n${bulletsFor(reviewers.map((r) => `**${r.department}:** ${r.evaluates}.`))}\n\n${invitation(skipped, directionId)}`,
			},
		],
		quickReplies: skipped ? ["Looks right, send it", "Run Validate first", "Not quite"] : ["Looks right, send it", "Not quite"],
	};
}

/** The invitation Sparks drafts, and where it goes. */
const invitation = (skipped: boolean, directionId?: string) =>
	`**Here's an invitation I drafted:**\n\n"I've been working on a way to cut wrong-part returns. It's defined, prototyped and ${skipped ? "not yet evaluated" : "evaluated with AI scenarios, not yet with real customers"}. Could you review it by Friday? ${reviewProfileFor(directionId).ask}"\n\nIt goes to ${departmentsInWords(directionId)}, in AutoPartsHUB and by email. Your conversation with me isn't included.`;

export const sampleInviteNotQuiteReply: SparksReply = {
	id: "review-invite-not-quite",
	from: "sparks",
	parts: [{ kind: "text", text: "What would you change: who gets it, or what it says?" }],
};

export const sampleInviteUpdatedReply: SparksReply = {
	id: "review-open",
	from: "sparks",
	parts: [{ kind: "text", text: "Thanks, I've updated the invitation. It still goes only where you said, without your conversation with me." }],
	quickReplies: ["Looks right, send it", "Not quite"],
};

export const sampleInviteSentReply: SparksReply = {
	id: "review-sent",
	from: "sparks",
	parts: [{ kind: "text", text: "Sent. I'll tell you as the reviews come in; each team's status is on the right." }],
};

/** The changes Sparks proposes after the reviews: what it would do, and whether it touches the prototype. */
export function sampleReviewProposals(changes: FitCheckChanges, directionId?: string) {
	const profile = reviewProfileFor(directionId);
	const change = profile.prototypeChange(changes);
	return [
		...(change ? [change.proposal] : []),
		`Add to the open questions: ${lowerFirst(profile.question(changes))}`,
		`Use engineering's effort, ${profile.effort.short}, instead of my rough estimate.`,
	];
}

/** The reviews are in: grouped by topic, where reviewers disagree, and the changes Sparks proposes (hers to accept). */
export function sampleReviewSummaryReply(changes: FitCheckChanges, directionId?: string): SparksReply {
	const profile = reviewProfileFor(directionId);
	return {
		id: "review-summary",
		from: "sparks",
		thinking: [
			"Reading the reviewers' notes…",
			"Lining up what they agree on…",
		],
		parts: [
			{
				kind: "text",
				text: `**The reviews are in.** ${profile.verdict(changes)}\n\n${bulletsFor(profile.topics(changes))}\n\n**Here's what I'd change:**\n\n${bulletsFor(sampleReviewProposals(changes, directionId))}`,
			},
		],
		quickReplies: ["Make the changes", "Not now"],
	};
}

/** What "Make the changes" does: the prototype change (if any), the open question, engineering's effort. */
export const sampleReviewChanges = (changes: FitCheckChanges, directionId?: string) => {
	const profile = reviewProfileFor(directionId);
	return { prototype: profile.prototypeChange(changes), question: profile.question(changes) };
};

/** The recommendation Sparks drafts for her, stating the evidence status apart from what it recommends. */
export function sampleRecommendation(evaluation?: Evaluation, directionId?: string) {
	if (!evaluation)
		return "I'd recommend iterating: run Validate first. The hypothesis hasn't been tested, so there's no estimate of the effect yet. The reviewers support it, and Validate takes a few minutes.";
	return reviewProfileFor(directionId).recommendation(evaluation);
}

/** The recommendation, who it goes to and what's still open, then submitting (hers to confirm). */
export function sampleRecommendationReply(opening: string, recommendation: string, concept: ConceptForReview): SparksReply {
	const open = concept.knownIssues.length + concept.gaps.length;
	return {
		id: "review-recommendation",
		from: "sparks",
		thinking: ["Drafting your recommendation…"],
		parts: [
			{
				kind: "text",
				text: `${opening}**Here's the recommendation I drafted for you:**\n\n${recommendation}\n\nIt goes to ${sampleDecisionOwner.role}, ${sampleDecisionOwner.name}, with the idea and the reviews. It's yours: change it if you'd say it differently. Still open, and listed for them: ${open} known issues and gaps.`,
			},
		],
		quickReplies: ["Looks right, submit it", "Not quite"],
	};
}

export const sampleRecommendationNotQuiteReply: SparksReply = {
	id: "review-recommendation-not-quite",
	from: "sparks",
	parts: [{ kind: "text", text: "What would you say instead? Tell me in your own words; it's recorded as yours." }],
};

export const sampleRecommendationRewrittenReply: SparksReply = {
	id: "review-recommendation",
	from: "sparks",
	parts: [{ kind: "text", text: "Thanks, it's in your words now, on the right." }],
	quickReplies: ["Looks right, submit it", "Not quite"],
};

export const sampleSubmittedReply: SparksReply = {
	id: "review-submitted",
	from: "sparks",
	parts: [
		{
			kind: "text",
			text: `Sent to ${sampleDecisionOwner.name}, with the idea, the reviews and your recommendation. The idea shows "Waiting for a decision"; I'll tell you as soon as there's one.`,
		},
	],
};

/** How long the decision takes in the demo. */
export const sampleDecisionMs = 3500;

/** The decision owner's decision and why, for the recommendation she sent. */
export function sampleDecision(evaluation?: Evaluation, directionId?: string): ReviewDecision {
	return evaluation ? reviewProfileFor(directionId).decision(evaluation) : { kind: "iterate-validate", reason: "Run Validate first, then bring it back." };
}

export function sampleDecisionReply(decision: ReviewDecision, directionId?: string): SparksReply {
	if (decision.kind === "iterate-validate")
		return {
			id: "review-decided",
			from: "sparks",
			parts: [
				{
					kind: "text",
					text: `**${sampleDecisionOwner.name} asked to iterate:** "${decision.reason}"\n\nIt's in Decisions. The idea goes back to Validate, with that reason first.`,
				},
			],
			quickReplies: ["Run Validate"],
		};
	if (decision.kind === "iterate-choice")
		return {
			id: "review-decided",
			from: "sparks",
			parts: [
				{
					kind: "text",
					text: `**${sampleDecisionOwner.name} asked to go back to the choice:** "${decision.reason}"\n\nIt's in Decisions. The idea goes back to the choice in Plan, with that reason first. What we learned from this prototype and its evaluation stays in your blueprint.`,
				},
			],
			quickReplies: ["Go back to the choice"],
		};
	return {
		id: "review-decided",
		from: "sparks",
		parts: [
			{
				kind: "text",
				text: `**${sampleDecisionOwner.name} advanced it:** "${decision.reason}"\n\nIt's in Decisions, and what we learned is now in Previous experiments, so the next person with a similar idea starts from it.\n\n**Want me to share it with the teams who'll carry it forward?** I'd start with the reviewers' departments: ${departmentsInWords(directionId)}. They'll see it without edit rights, and without your conversation with me.`,
			},
		],
		quickReplies: ["Share it with them", "Not now"],
	};
}

export const sampleSharedReply = (directionId?: string): SparksReply => ({
	id: "review-shared",
	from: "sparks",
	parts: [
		{
			kind: "text",
			text: `Shared with ${departmentsInWords(directionId)}, without edit rights. They'll find it in AutoPartsHUB, with the prototype, the decisions and every reason behind them.`,
		},
	],
});

export const sampleShareLaterReply: SparksReply = {
	id: "review-share-later",
	from: "sparks",
	parts: [{ kind: "text", text: 'Okay. Use "Share" at the top whenever you\'re ready.' }],
};

/** What she might ask in Review (prds/sparks-review.md, "Checks"), and how Sparks answers. */
export function sampleReviewQuestionReply(text: string, directionId?: string, evaluation?: Evaluation): SparksReply {
	const t = text.toLowerCase();
	const say = (answer: string): SparksReply => ({ id: "review-answer", from: "sparks", parts: [{ kind: "text", text: answer }] });
	if (/approve|sign off|green ?light/.test(t))
		return say(`The decision belongs to ${sampleDecisionOwner.role}, not to me or you. I can prepare your recommendation so they can decide from the idea alone.`);
	if (/validated|proven|prove/.test(t))
		return say(
			`I'll keep it as the evidence says: ${(evaluation?.hypothesis.outcome ?? "not tested").toLowerCase()}. That isn't validation with real people; the UX team's test with customers would be the real check.`,
		);
	if (/who should review|who.*review/.test(t)) {
		const reviewers = sampleReviewersFor(directionId);
		const names = reviewers.map((r) => `${inSentence(r.department)} (${r.evaluates})`);
		return say(`I'd ask ${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}. You choose the people.`);
	}
	return say("I can't do that in this demo yet. The idea for review is on the right; the conversation moves on as the reviews and the decision come in.");
}

