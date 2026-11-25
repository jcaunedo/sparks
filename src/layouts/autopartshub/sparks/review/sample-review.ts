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
export const sampleDepartmentsInWords = (directionId?: string) => {
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

/** What each team pins on the "Fit check before you buy" prototype while it reviews, on the element it's about. */
const fitCheckPins: Record<string, Omit<PrototypeComment, "id" | "createdAt" | "author">> = {
	ux: {
		point: "vehicle-title",
		fx: 0.85,
		fy: 0.5,
		where: "Add your vehicle",
		view: 0,
		scope: onPhone,
		text: "Lead with what they get: \"See which parts fit your car\" says why to add it.",
	},
	eng: {
		point: "save-vehicle",
		fx: 0.8,
		fy: 0.5,
		where: "Save vehicle",
		view: 0,
		scope: onPhone,
		text: "Saved vehicles are already in accounts, so this can reuse them. Should it save the vehicle for guests too?",
	},
	stores: {
		point: "save-vehicle",
		fx: 0.15,
		fy: 0.5,
		where: "Save vehicle",
		view: 0,
		scope: onPhone,
		text: "When someone calls us about a part, can we see the vehicle they saved here?",
	},
	catalog: {
		point: "vehicle-hint",
		fx: 0.8,
		fy: 0.5,
		where: "Add it once, and every part shows whether it fits.",
		view: 0,
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

/** "Go to Review instead", in Prototype: Sparks's answer there (Review has no conversation). */
export const sampleReviewStartedReply: SparksReply = {
	id: "review-started",
	from: "sparks",
	parts: [{ kind: "text", text: "On it. The prototype is in your plan, and we'll skip Evaluate. I'm putting your idea together in Review." }],
};

/** On Review's empty state, before it's evaluated. */
export const sampleNotEvaluatedNote = "Evaluating it first is optional, but it makes your recommendation stronger.";

/** The invitation Sparks drafts for the teams. */
export const sampleInvitation = (skipped: boolean, directionId?: string) =>
	`I've been working on a way to cut wrong-part returns. It's defined, prototyped and ${skipped ? "not yet evaluated" : "evaluated with AI scenarios, not yet with real customers"}. Could you review it by Friday? You can try the prototype and comment on any part. ${reviewProfileFor(directionId).ask}`;

/** A change to a published prototype (its first): the teams still see `published`, until she publishes an update in Review. */
export function sampleWithTeamsNote(reply: SparksReply, published: number): SparksReply {
	const note = `The teams still see version ${published}. When you want them to see this one, publish an update in Review.`;
	let added = false;
	return {
		...reply,
		// After what changed, before anything Sparks asks.
		parts: reply.parts.map((part) => {
			if (added || part.kind !== "text") return part;
			added = true;
			const [first, ...rest] = part.text.split("\n\n");
			return { ...part, text: [first, note, ...rest].join("\n\n") };
		}),
	};
}

/** The changes Sparks proposes after the reviews: what it would do, and whether it touches the prototype. */
export function sampleReviewProposals(changes: FitCheckChanges, directionId?: string) {
	const profile = reviewProfileFor(directionId);
	const change = profile.prototypeChange(changes);
	return [
		...(change ? [change.proposal] : []),
		`Add to the open questions: ${lowerFirst(profile.question(changes))}`,
		`Use engineering's effort, ${profile.effort.short}, instead of Sparks's rough one.`,
	];
}

/** The reviews in one sentence, and by topic. */
export const sampleReviewSummary = (changes: FitCheckChanges, directionId?: string) => {
	const profile = reviewProfileFor(directionId);
	return { verdict: profile.verdict(changes), topics: profile.topics(changes) };
};

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

/** How long the decision takes in the demo. */
export const sampleDecisionMs = 3500;

/** The decision owner's decision and why, for the recommendation she sent. */
export function sampleDecision(evaluation?: Evaluation, directionId?: string): ReviewDecision {
	return evaluation ? reviewProfileFor(directionId).decision(evaluation) : { kind: "iterate-validate", reason: "Evaluate it first, then bring it back." };
}
