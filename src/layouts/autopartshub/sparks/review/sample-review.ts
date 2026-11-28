import type { SparksReply } from "../workspace/workspace";
import type { FitCheckChanges } from "../prototype/fit-check-prototype";
import type { Evaluation } from "../validate/validate-panel";
import type { ChosenDraft } from "../plan/chosen-card";
import type { DirectionDraft } from "../plan/direction-card";
import { ideaCommentAt, type ConceptForReview, type IdeaComment, type Reviewer } from "./review-panel";
import type { ReadyCheck } from "./review-next";
import type { InvitationEmailProps } from "../invitation-email/invitation-email";
import type { CommentScope, PrototypeComment, PrototypeCommentAuthor } from "../prototype/prototype-comments";
import { reviewProfileFor, reviewProfiles, type ReviewDecision } from "./sample-review-directions";
import { samplePersonPhoto } from "../../sample-data/sample-people";

/** Sources as the evidence names them, each once: "from " dropped, "a and b" split. */
const evidenceSourcesOf = (sources: string[]) =>
	[...new Set(sources.flatMap((source) => source.replace(/^from /, "").split(" and ")).map((source) => source.trim()))];

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
	/** Clarifications Dana accepted after it advanced: words replaced in the acceptance criteria. */
	clarified?: { from: string; to: string }[];
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
	clarified = [],
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
		stories: profile.stories(changes).map((item) => ({
			...item,
			criteria: item.criteria.map((criterion) => clarified.reduce((text, fix) => text.replace(fix.from, fix.to), criterion)),
		})),
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
		// Each source in the evidence's brackets, once, without its dates ("business performance, Aug–Oct 2026" → "business
		// performance"; "from Dana" → "Dana"; "AI simulation and business data analysis" → both).
		evidenceSources: evidenceSourcesOf([
			"business performance",
			"previous experiments",
			"from Dana",
			...(evaluation ? ["AI simulation and business data analysis"] : []),
		]),
		build: (evaluation?.build ?? [`Rough effort: ${direction.effort.size}, as estimated in Plan.`]).map((line) =>
			engineeringEffort && line.startsWith("Rough effort") ? profile.effort.line : line,
		),
		// What the success criteria need recorded, so they can be measured once it's live: restated from them, nothing new.
		tracking: [
			'Every online return marked "doesn\'t fit", with its order, from launch: the main measure (today, 18,400 in 90 days).',
			"What the customer was told about fit when they ordered, on the part's page and in the cart, so each return can be matched to it.",
			"Visits and orders online, so a drop in online sales shows (today, 3.1% of visits end in an order).",
			"Later orders from customers who returned a part that didn't fit, matched to the return. There's no starting point yet, so recording starts before launch.",
		],
		design: evaluation?.design ?? [
			"Built with the design system's components.",
			changes.lightText ? "Light gray secondary text departs from the design system (kept by Dana)." : "Text contrast meets the standard.",
		],
		knownIssues: open.map((f) => `${f.title} (${f.severity}, ${f.method}).`),
		engineering: profile.engineering,
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

/** Dana's product team, who builds an advanced idea (made up): Sparks suggests it first when she shares it. */
export const sampleProductTeam = "Online shopping squad";

/**
 * Sparks's check before an advanced idea goes to the team who builds it (prds/sparks-review.md, "Ready to build"): every
 * user story has acceptance criteria, the effort is engineering's, what to track is written, and no open question blocks
 * building. Nothing here stops her from sharing it.
 */
export function sampleReadyToBuild(concept: ConceptForReview, changes: FitCheckChanges, directionId?: string): ReadyCheck[] {
	const profile = reviewProfileFor(directionId);
	const without = concept.stories.filter((item) => item.criteria.length === 0).length;
	const effort = concept.build.find((line) => line.includes("(from engineering)"));
	const blocking = concept.openQuestions.filter((question) => question === profile.question(changes));
	return [
		without
			? { label: `${without} user ${without === 1 ? "story has" : "stories have"} no acceptance criteria`, done: false, fix: "Add them in the plan, so the team knows when it's done." }
			: { label: "Every user story has its acceptance criteria", done: true },
		effort
			? { label: `Effort from engineering: ${profile.effort.short}`, done: true }
			: { label: "The effort is still Sparks's rough estimate", done: false, fix: "Ask engineering for theirs before the team plans the work." },
		concept.tracking.length
			? { label: "What to track is written, from the success criteria", done: true }
			: { label: "Nothing says what to track yet", done: false, fix: "Without it, the main measure can't be checked after launch." },
		blocking.length
			? {
					label: `${blocking.length === 1 ? "An open question blocks" : `${blocking.length} open questions block`} building: "${blocking[0]}"`,
					done: false,
					fix: "Answer it before the team starts, or share it now: it's listed under Open questions for them.",
				}
			: { label: "No open question blocks building", done: true },
	];
}

/**
 * The people Sparks suggests (5), from the UX team and engineering always, plus the teams the concept changes, each with
 * their team, in the order their views come in (the demo).
 */
export const sampleReviewersFor = (directionId?: string): Reviewer[] => reviewProfileFor(directionId).reviewers.map((r) => ({ ...r }));

/**
 * Someone she added with "Share" as a reviewer: one of the people Sparks suggests (with their part in the demo), or
 * anyone else, invited, evaluating what someone from their team evaluates. In the demo, only the suggested people answer.
 */
export const sampleReviewerFor = (
	who: { name: string; subtitle?: string; avatarSrc?: string; department: string },
	directionId?: string,
): Reviewer => {
	const suggested = reviewProfileFor(directionId).reviewers.find((r) => r.name === who.name);
	if (suggested) return { ...suggested };
	const sameTeam = (r: Reviewer) => r.department.replace(/ team$/, "") === who.department.replace(/ team$/, "");
	const teammate = Object.values(reviewProfiles)
		.flatMap((profile) => profile.reviewers)
		.find(sameTeam);
	return {
		id: `invitee-${who.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
		name: who.name,
		avatarSrc: who.avatarSrc,
		subtitle: who.subtitle,
		department: who.department,
		evaluates: teammate?.evaluates ?? "the idea and its prototype",
		status: "invited",
	};
};

/** Each person's view once they've given it, by their id, for the prototype as it stands. */
export const sampleReviewerViews = (changes: FitCheckChanges, directionId?: string) => reviewProfileFor(directionId).views(changes);

/** A department as it reads in a sentence: "the UX team", "engineering". */
const inSentence = (department: string) =>
	department === "UX team" ? "the UX team" : department.endsWith(" team") ? `the ${department.toLowerCase()}` : department.toLowerCase();

/** "the UX team, engineering, stores and the catalog team". */
export const sampleDepartmentsInWords = (directionId?: string) => {
	const names = [...new Set(reviewProfileFor(directionId).reviewers.map((r) => r.department))].map(inSentence);
	return `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;
};

/** The reviewers' next status, one step at a time, in the demo. */
export const sampleReviewStepMs = 700;

/** Every reviewer as the author of what they write (name, team, photo), by their id, across the directions. */
export const sampleReviewerPeople: Record<string, PrototypeCommentAuthor> = Object.fromEntries(
	Object.values(reviewProfiles)
		.flatMap((profile) => profile.reviewers)
		.map((r) => [r.id, { name: r.name, role: r.department, avatarSrc: samplePersonPhoto(r.name) }]),
);

const onPhone: CommentScope = { key: "customer-phone", audience: "customer", audienceLabel: "Customer", device: "phone" };

/** What each team's lead pins on the "Fit check before you buy" prototype while they review, on the element it's about, by reviewer id. */
const fitCheckPins: Record<string, Omit<PrototypeComment, "id" | "createdAt" | "author">> = {
	priya: {
		point: "vehicle-title",
		fx: 0.85,
		fy: 0.5,
		where: "Add your vehicle",
		view: 0,
		scope: onPhone,
		text: "Lead with what they get: \"See which parts fit your car\" says why to add it.",
	},
	marcus: {
		point: "save-vehicle",
		fx: 0.8,
		fy: 0.5,
		where: "Save vehicle",
		view: 0,
		scope: onPhone,
		text: "Saved vehicles are already in accounts, so this can reuse them. Should it save the vehicle for guests too?",
	},
	tom: {
		point: "save-vehicle",
		fx: 0.15,
		fy: 0.5,
		where: "Save vehicle",
		view: 0,
		scope: onPhone,
		text: "When someone calls us about a part, can we see the vehicle they saved here?",
	},
	ana: {
		point: "vehicle-hint",
		fx: 0.8,
		fy: 0.5,
		where: "Add it once, and every part shows whether it fits.",
		view: 0,
		scope: onPhone,
		text: "For older vehicles we don't have trim-level fit data yet, so expect \"We're not sure this fits\" there often.",
	},
};

/** What each team's lead says on a part of the "Fit check before you buy" idea while they review, by reviewer id; "Unclear" flags the part. */
const fitCheckIdeaComments: Record<string, Pick<IdeaComment, "part" | "text" | "unclear"> & { fy?: number }> = {
	priya: { part: "For the UX team to test with real people", text: "We can test the fit message with 5 customers in the first week of December." },
	marcus: { part: "What it needs to be built", text: "Saved vehicles are there. The fit check on every product page is the bulk of it: about 6 weeks for the web team." },
	ana: {
		part: "What it needs to be built",
		text: "Who fills the fit data gaps for older vehicles, and by when? It isn't on our plan yet.",
		unclear: true,
		// Lower on the same part as engineering's, so the two pins don't overlap.
		fy: 0.55,
	},
};

/** The comment a team leaves on a part of the idea as it reviews (prds/sparks-review.md, "What reviewers see and do"), by reviewer id. */
export function sampleReviewerIdeaComment(reviewerId: string, directionId?: string): IdeaComment | undefined {
	const comment = (directionId ?? "fit-check") === "fit-check" ? fitCheckIdeaComments[reviewerId] : undefined;
	const author = sampleReviewerPeople[reviewerId];
	if (!comment || !author) return undefined;
	const { fy, ...rest } = comment;
	// Pinned on its part, as a comment on the prototype is on its screen.
	return { ...ideaCommentAt(comment.part, undefined, fy), ...rest, id: `idea-comment-${reviewerId}`, author, createdAt: new Date().toISOString() };
}

/** Jordan, on Dana's product team: who flags something unclear once it's advanced and shared. */
export const sampleTeamMember: PrototypeCommentAuthor = { name: "Jordan Lee", role: "Online shopping squad", avatarSrc: samplePersonPhoto("Jordan Lee") };

/** How long after she shares the advanced idea Jordan flags a part as unclear, in the demo. */
export const sampleBuildFlagMs = 4000;

/**
 * Once it's advanced and shared (prds/sparks-review.md, "Something unclear after it advances"): Jordan's comment, flagging
 * an acceptance criterion as unclear, and the fix Sparks proposes: the criterion as it is, as it would read, and why.
 */
export function sampleBuildFlag(concept: ConceptForReview, directionId?: string) {
	const flag = reviewProfileFor(directionId).buildFlag;
	const criterion = concept.stories.flatMap((item) => item.criteria).find((text) => flag && text.includes(flag.from));
	if (!flag || !criterion) return undefined;
	const comment: IdeaComment = {
		// Pinned on the user stories, low, near the criteria.
		...ideaCommentAt(flag.part, undefined, 0.7),
		id: "idea-comment-build-flag",
		part: flag.part,
		text: flag.text,
		createdAt: new Date().toISOString(),
		author: sampleTeamMember,
		unclear: true,
	};
	return { comment, from: flag.from, to: flag.to, criterion, suggestion: criterion.replace(flag.from, flag.to), why: flag.why };
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


/**
 * The invitation email's standard message, which Sparks writes for the idea (prds/sparks-review.md, "The invitation");
 * Dana's note ("Add a note" in "Publish your idea") goes after it.
 */
export const sampleInviteMessage =
	"I've been working on an idea to reduce wrong-part returns and would love your feedback. Explore the prototype and share your thoughts to help us assess its feasibility, refine the solution, and bring it to our customers as soon as possible.";

/** When the teams should review it by: a week after it's published ("December 3"). */
export const sampleReviewDue = (published: Date = new Date()) =>
	new Date(published.getTime() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", { month: "long", day: "numeric" });

/** The invitation email for the "Wrong-part returns" idea and its prototype, version 1, with the standard message. */
export const sampleInvitationEmail: Omit<InvitationEmailProps, "variant"> = {
	from: "Dana Morales",
	// One idea and the path it was prototyped on, at the version that goes out.
	items: [{ name: "Wrong-part returns", paths: [{ name: "Fit check before you buy", version: 1 }] }],
	message: sampleInviteMessage,
	due: sampleReviewDue(),
};

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
	return { verdict: verdictOf(Object.values(profile.views(changes))), topics: profile.topics(changes) };
};

/** The views in one sentence, counted, so it always matches the team assessment: "6 of the 8 reviewers would advance it…". */
function verdictOf(views: Pick<Reviewer, "view">[]) {
	const total = views.length;
	const advance = views.filter((v) => v.view && v.view !== "Don't advance yet").length;
	const withChanges = views.filter((v) => v.view === "Advance with changes").length;
	const changes = withChanges ? `, ${withChanges} of them with changes` : "";
	if (advance === total) return `All ${total} reviewers would advance it${changes}.`;
	return `${advance} of the ${total} reviewers would advance it${changes}; ${total - advance} wouldn't yet.`;
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

/** How long the decision takes in the demo. */
export const sampleDecisionMs = 3500;

/** The decision owner's decision and why, for the recommendation she sent. */
export function sampleDecision(evaluation?: Evaluation, directionId?: string): ReviewDecision {
	return evaluation ? reviewProfileFor(directionId).decision(evaluation) : { kind: "iterate-validate", reason: "Evaluate it first, then bring it back." };
}
