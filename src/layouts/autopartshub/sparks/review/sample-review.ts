import type { SparksReply } from "../workspace/workspace";
import type { FitCheckChanges } from "../prototype/fit-check-prototype";
import type { Evaluation } from "../validate/validate-panel";
import type { ChosenDraft } from "../plan/chosen-card";
import type { DirectionDraft } from "../plan/direction-card";
import type { ConceptForReview, IdeaComment, Reviewer } from "./review-panel";
import type { CommentScope, PrototypeComment, PrototypeCommentAuthor } from "../prototype/prototype-comments";
import { reviewProfileFor, type ReviewDecision } from "./sample-review-directions";
import { samplePersonPhoto } from "../../sample-data/sample-people";

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
	/** The last finished evaluation; none when Evaluate was skipped. */
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
			: "Not tested. Evaluate was skipped, so the hypothesis hasn't been checked.",
		summary: `Customers buying parts online can't tell whether a part fits their exact vehicle, so they order the wrong one and send it back: 18,400 orders in 90 days, 1 in 9 online returns. It hits do-it-yourself customers with older vehicles hardest. The goal is fewer orders returned as "doesn't fit", 25% fewer within 3 months, without hurting online sales. The chosen direction is "${chosen.name}": ${lowerFirst(chosen.idea)}${range ? ` Business data and simulated scenarios suggest "doesn't fit" returns would drop ${range}, ${main?.reachesTarget ? "reaching" : "below"} the target.` : ""} Known issues and gaps are listed below.`,
		gaps: [
			...(evaluation ? [] : ["Evaluate was skipped: the hypothesis is not tested."]),
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
			evaluation ? "Evaluate: run, then Dana went ahead to Review." : "Evaluate: skipped.",
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

/** Who comments for each team (made-up people): their name and team on what they pin on the prototype. */
export const sampleReviewerPeople: Record<string, PrototypeCommentAuthor> = {
	ux: { name: "Priya Shah", role: "UX team", avatarSrc: samplePersonPhoto("Priya Shah") },
	eng: { name: "Marcus Lee", role: "Engineering", avatarSrc: samplePersonPhoto("Marcus Lee") },
	stores: { name: "Tom Becker", role: "Stores", avatarSrc: samplePersonPhoto("Tom Becker") },
	catalog: { name: "Ana Silva", role: "Catalog team", avatarSrc: samplePersonPhoto("Ana Silva") },
};

const onPhone: CommentScope = { key: "customer-phone", audience: "customer", audienceLabel: "Customer", device: "phone" };
const atCounter: CommentScope = { key: "staff-desktop", audience: "staff", audienceLabel: "Store staff", device: "desktop" };

/** What each team pins on the "Fit check before you buy" prototype while it reviews, on the element it's about. */
const fitCheckPins: Record<string, Omit<PrototypeComment, "id" | "createdAt" | "author">> = {
	ux: {
		point: "vehicle-title",
		fx: 0.85,
		fy: 0.5,
		where: "Add your vehicle",
		scope: onPhone,
		text: "Lead with what they get: \"See which parts fit your car\" says why to add it.",
	},
	eng: {
		point: "save-vehicle",
		fx: 0.5,
		fy: 0.5,
		where: "Save vehicle",
		scope: onPhone,
		text: "Saved vehicles are already in accounts, so this can reuse them. Should it save the vehicle for guests too?",
	},
	stores: {
		point: "look-up",
		fx: 0.5,
		fy: 0.5,
		where: "Look up",
		scope: atCounter,
		text: "At the counter we mostly look customers up by phone number. Can that be the first field?",
	},
	catalog: {
		point: "vehicle-hint",
		fx: 0.8,
		fy: 0.5,
		where: "Add it once, and every part shows whether it fits.",
		scope: onPhone,
		text: "For older vehicles we don't have trim-level fit data yet, so expect \"We're not sure this fits\" there often.",
	},
};

/** What each team says on a part of the "Fit check before you buy" idea while it reviews; "Unclear" flags the part. */
const fitCheckIdeaComments: Record<string, Pick<IdeaComment, "part" | "text" | "unclear">> = {
	ux: { part: "For the UX team to test with real people", text: "We can test the fit message with 5 customers in the first week of December." },
	eng: { part: "What it needs to be built", text: "Saved vehicles are there. The fit check on every product page is the bulk of it: about 6 weeks for the web team." },
	catalog: {
		part: "What it needs to be built",
		text: "Who fills the fit data gaps for older vehicles, and by when? It isn't on our plan yet.",
		unclear: true,
	},
};

/** The comment a team leaves on a part of the idea as it reviews (prds/sparks-review.md, "What reviewers see and do"), by reviewer id. */
export function sampleReviewerIdeaComment(reviewerId: string, directionId?: string): IdeaComment | undefined {
	const comment = (directionId ?? "fit-check") === "fit-check" ? fitCheckIdeaComments[reviewerId] : undefined;
	const author = sampleReviewerPeople[reviewerId];
	return comment && author ? { ...comment, id: `idea-comment-${reviewerId}`, author, createdAt: new Date().toISOString() } : undefined;
}

/** The comment a team pins on the prototype as it reviews (prds/sparks-review.md, "What reviewers see and do"), by reviewer id. */
export function sampleReviewerPin(reviewerId: string, directionId?: string): PrototypeComment | undefined {
	const pin = (directionId ?? "fit-check") === "fit-check" ? fitCheckPins[reviewerId] : undefined;
	const author = sampleReviewerPeople[reviewerId];
	return pin && author ? { ...pin, id: `pin-${reviewerId}`, author, createdAt: new Date().toISOString() } : undefined;
}

/** Before writing, and after: with Evaluate skipped, there's no evaluation to read. */
const reviewStart = (skipped: boolean) => [
	"Gathering what you decided in Plan",
	"Reading the prototype and what's pretend in it",
	...(skipped ? [] : ["Reading the evaluation and its findings"]),
];
const reviewEnd = ["Checking what's still open", "Finding the right teams to look it over", "Drafting the invitation"];

/** Everything Sparks does to put the idea together, in order: getting ready, each part (`titles`), then what's open and who to ask. */
const reviewSteps = (titles: readonly string[], skipped: boolean) => [
	...reviewStart(skipped),
	...titles.map((title) => `Writing "${title}"`),
	...reviewEnd,
];

/** The idea is ready at this step (how many of its steps are done). */
export const sampleReviewBuildFinished = (titles: readonly string[], skipped: boolean, step: number) => step >= reviewSteps(titles, skipped).length;

/** How far the idea is at a step, for the panel: whether the writing has begun, and how many parts are written. */
export function sampleReviewBuilt(titles: readonly string[], skipped: boolean, step: number) {
	const written = step - reviewStart(skipped).length;
	return { begun: written >= 0, written: Math.min(Math.max(written, 0), titles.length) };
}

/** How long a step takes in the demo, in milliseconds, a little more or less each time: a part is quicker to write. */
export function sampleReviewBuildStepMs(titles: readonly string[], skipped: boolean, step: number) {
	const start = reviewStart(skipped).length;
	return Math.round((step >= start && step < start + titles.length ? 650 : 1000) * (1 + Math.random() * 0.3));
}

/** Sparks's progress as it puts the idea together (`step`: how many steps are done), with one status for each stage. */
export function sampleReviewBuildProgress(titles: readonly string[], skipped: boolean, step: number, seconds = 18) {
	const steps = reviewSteps(titles, skipped);
	const { begun, written } = sampleReviewBuilt(titles, skipped, step);
	return {
		status: !begun ? "Laying out the parts of your idea…" : written < titles.length ? "Writing your idea for review…" : "Giving it a final polish…",
		steps: steps.slice(0, step + 1),
		done: step >= steps.length,
		doneLabel: `Put together in ${seconds}s`,
	};
}

/**
 * Going to Review: Sparks writes the idea for review on the right, part by part (prds/sparks-review.md, "Putting it
 * together"). Only its progress until it's done; then the same reply says what it put together, what's open and who to
 * ask (`sampleReviewOpenReply`).
 */
export function sampleReviewBuildingReply(titles: readonly string[], skipped: boolean, step = 0): SparksReply {
	return {
		id: "review-building",
		from: "sparks",
		parts: [{ kind: "progress", ...sampleReviewBuildProgress(titles, skipped, step), startedAt: Date.now() }],
	};
}

/** Sparks's reply that waits for her to publish: with its progress, or on its own when she's said something since. */
export const isReviewOpenReply = (id: string) => id.startsWith("review-open") || id.startsWith("review-building");

const bulletsFor = (lines: string[]) => lines.map((line) => `- ${line}`).join("\n");

/** The answer that publishes the idea for the teams, after Sparks shows what they'll get. */
export const samplePublishIt = "Looks right, publish it";

/**
 * The idea is put together: what's in it, what's still open, who Sparks would invite and why, what publishing gives
 * them, and the invitation it drafted (prds/sparks-review.md, "Checking it's ready", "Publishing"). `opening` says how
 * she got here. Publishing waits for her. `version`: the prototype's version they'd get.
 */
export function sampleReviewOpenReply(concept: ConceptForReview, opening: string, skipped: boolean, directionId?: string, version = 1): SparksReply {
	const reviewers = sampleReviewersFor(directionId);
	const open = [...concept.knownIssues.map((issue) => `Known issue: ${issue.charAt(0).toLowerCase()}${issue.slice(1)}`), ...concept.gaps];
	return {
		id: "review-open",
		from: "sparks",
		parts: [
			{
				kind: "text",
				text: [
					`${opening.trim()} Your idea is ready for review.`.trim(),
					"**Here's what I put together:**",
					"It's all on the right, from what you decided, with nothing added:",
					bulletsFor([
						`**The idea:** the summary, what we believe, why this direction, and ${concept.stories.length} user stories with how to know each one is done.`,
						`**The evidence:** the success criteria, what the data says and ${skipped ? "that it hasn't been evaluated" : "what Evaluate found"}, with the gaps and known issues.`,
						"**For the teams:** what it needs to be built, design notes, what it changes for each team, and what to test with real people.",
					]),
					"**Here's what's still open:**",
					"None of it stops you; it goes to review as known issues and gaps.",
					bulletsFor(open),
					skipped ? "Running Evaluate takes a few minutes and would make your recommendation stronger." : "",
					"**I'd ask four teams to review it:**",
					bulletsFor(reviewers.map((r) => `**${r.department}:** ${r.evaluates}.`)),
					`**Publishing gives them a fixed copy:** this idea and the prototype as it is now (version ${version}), to try and comment on. You keep working on yours; when you change it, publish an update. Asking for a decision comes later, when you're ready.`,
					invitation(skipped, directionId),
				]
					.filter(Boolean)
					.join("\n\n"),
			},
		],
		quickReplies: skipped ? [samplePublishIt, "Evaluate it first", "Not quite"] : [samplePublishIt, "Not quite"],
	};
}

/** The invitation Sparks drafts, and where it goes. */
const invitation = (skipped: boolean, directionId?: string) =>
	`**Here's an invitation I drafted:**\n\n"I've been working on a way to cut wrong-part returns. It's defined, prototyped and ${skipped ? "not yet evaluated" : "evaluated with AI scenarios, not yet with real customers"}. Could you review it by Friday? You can try the prototype and comment on any part. ${reviewProfileFor(directionId).ask}"\n\nIt goes to ${departmentsInWords(directionId)}, in AutoPartsHUB and by email. Your conversation with me isn't included.`;

export const sampleInviteNotQuiteReply: SparksReply = {
	id: "review-invite-not-quite",
	from: "sparks",
	parts: [{ kind: "text", text: "What would you change: who gets it, or what it says?" }],
};

export const sampleInviteUpdatedReply: SparksReply = {
	id: "review-open",
	from: "sparks",
	parts: [{ kind: "text", text: "Thanks, I've updated the invitation. It still goes only where you said, without your conversation with me." }],
	quickReplies: [samplePublishIt, "Not quite"],
};

/** Published: the teams have version `version` of the idea and its prototype, and the invitation. */
export const sampleInviteSentReply = (version: number): SparksReply => ({
	id: "review-sent",
	from: "sparks",
	parts: [
		{
			kind: "text",
			text: `Published. The teams now see version ${version} of your idea and its prototype, and I've sent them the invitation. I'll tell you as their feedback comes in; each team's status is on the right.`,
		},
	],
});

/** "Publish update": the teams now see the latest version; what they said about the earlier one stays. */
export const samplePublishedUpdateReply = (version: number): SparksReply => ({
	id: "review-update-published",
	from: "sparks",
	parts: [
		{
			kind: "text",
			text: `Done. The teams now see version ${version} of your idea and its prototype, and I've told them what changed. Their feedback on the earlier version stays, marked with the version it was about.`,
		},
	],
});

/** After the reviews: ask for a decision now, or keep working (prds/sparks-review.md, "The recommendation"). */
export const sampleAskDecision = "Draft my recommendation";

/**
 * After the changes from the reviews (`opening` says what changed): asking for a decision is her call, now or later.
 * `stale`: the prototype changed since it was published, so the teams see an earlier version.
 */
export function sampleDecisionAskReply(opening: string, stale?: number): SparksReply {
	return {
		id: "review-ask-decision",
		from: "sparks",
		parts: [
			{
				kind: "text",
				text: `${opening}${stale ? `The teams still see the earlier version: select "Publish update" when you want them to see version ${stale}.\n\n` : ""}**Ready to ask for a decision?** I'll draft your recommendation for ${sampleDecisionOwner.role}, ${sampleDecisionOwner.name}. Or keep working, and ask when you're ready.`,
			},
		],
		quickReplies: [sampleAskDecision, "Not yet"],
	};
}

/** "Not yet": the decision waits; she can ask for it any time. */
export const sampleDecisionLaterReply: SparksReply = {
	id: "review-decision-later",
	from: "sparks",
	parts: [{ kind: "text", text: "Okay. Keep working on it, and publish updates as you go. When you're ready for a decision, tell me." }],
	quickReplies: ["Ask for a decision"],
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
		return "I'd recommend iterating: evaluate it first. The hypothesis hasn't been tested, so there's no estimate of the effect yet. The reviewers support it, and Evaluate takes a few minutes.";
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
	return evaluation ? reviewProfileFor(directionId).decision(evaluation) : { kind: "iterate-validate", reason: "Evaluate it first, then bring it back." };
}

export function sampleDecisionReply(decision: ReviewDecision, directionId?: string): SparksReply {
	if (decision.kind === "iterate-validate")
		return {
			id: "review-decided",
			from: "sparks",
			parts: [
				{
					kind: "text",
					text: `**${sampleDecisionOwner.name} asked to iterate:** "${decision.reason}"\n\nIt's in Decisions. The idea goes back to Evaluate, with that reason first.`,
				},
			],
			quickReplies: ["Evaluate it"],
		};
	if (decision.kind === "iterate-choice")
		return {
			id: "review-decided",
			from: "sparks",
			parts: [
				{
					kind: "text",
					text: `**${sampleDecisionOwner.name} asked to go back to the choice:** "${decision.reason}"\n\nIt's in Decisions. The idea goes back to the choice in Plan, with that reason first. What we learned from this prototype and its evaluation stays in your plan.`,
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

