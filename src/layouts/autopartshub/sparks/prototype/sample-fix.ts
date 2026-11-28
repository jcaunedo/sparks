import type { SparksReply } from "../workspace/workspace";
import type { FitCheckChanges } from "./fit-check-prototype";

/*
 * "Fix in the prototype" on a finding in Evaluate (prds/sparks-prototype.md, "Fixing a finding"): Prototype opens on the
 * page it's about, Sparks shows its plan first, and Dana goes with it, takes it further or says what she'd do instead.
 * What the AI would supply. The change itself is in `sampleFixes` (validate/sample-validate.ts).
 */

/** A suggested follow-up: something more, on top of the fix. `reply` is its quick reply. */
export type FixFollowUp = {
	reply: string;
	/** How Sparks says it's done. */
	summary: string;
	/** The version's name. */
	version: string;
	apply: (changes: FitCheckChanges) => FitCheckChanges;
	applied: (changes: FitCheckChanges) => boolean;
};

const flagFollowUp = (reply: string, summary: string, version: string, change: keyof FitCheckChanges): FixFollowUp => ({
	reply,
	summary,
	version,
	apply: (changes) => ({ ...changes, [change]: true }),
	applied: (changes) => Boolean(changes[change]),
});
const largerFollowUp = (reply: string, summary: string, version: string, element: string): FixFollowUp => ({
	reply,
	summary,
	version,
	apply: (changes) => ({ ...changes, larger: [...(changes.larger ?? []), element] }),
	applied: (changes) => Boolean(changes.larger?.includes(element)),
});

const vehicleFirst = flagFollowUp("Also name the vehicle first", 'the fit message names the vehicle first ("2015 Ford F-150: fits")', "Fit message names the vehicle first", "vehicleFirst");
const explainFit = flagFollowUp("Also say why it doesn't fit", "a part that doesn't fit says which vehicles it does fit", "Why it doesn't fit, with the vehicles it fits", "explainFit");
const biggerNoteIt = largerFollowUp('Also make "Note it" bigger', 'the "Note it" button is bigger', '"Note it" made bigger', "note-vehicle");

/** Sparks's plan for a finding: what it will do, in order, why, and what she can ask for on top. */
type FixPlan = { steps: string[]; why: string; followUps: FixFollowUp[] };

const fixPlans: Record<string, FixPlan> = {
	"fit-below-price": {
		steps: [
			"Move the fit message right under the part's name, above the price.",
			"Keep its words and colors as they are.",
			"Do the same on every product page, so it's always in one place.",
		],
		why: "People in a hurry look at the name and the price, so the message goes between them.",
		followUps: [vehicleFirst, largerFollowUp("Also make it bigger", "the fit message is bigger", "Fit message made bigger", "fit-message")],
	},
	"unsure-dead-end": {
		steps: [
			'Add two buttons under "We\'re not sure this fits": "See the fit list" and "Ask a store".',
			"Keep the message as it is: it's honest, it only needs a way out.",
			'Leave "Add to cart" available, for customers who already know.',
		],
		why: "Both already exist at AutoParts Co., so customers get an answer and nothing new has to be built behind them.",
		followUps: [
			flagFollowUp('Also offer "Tell me when you know"', '"Tell me when you know" is there too (pretend: nothing is sent)', '"Tell me when you know" when the fit isn\'t known', "unsureNotify"),
			vehicleFirst,
		],
	},
	"flag-quality": {
		steps: ['Change the flag to "Check the fit first".', "Show it the same way in the search results and on the part's page.", "Keep the explanation on the part's page."],
		why: "It reads as a reminder to check, not as a sign the part is bad.",
		followUps: [
			flagFollowUp("Also show how often it comes back", "search results say how often a flagged part comes back, under the flag", "How often it comes back, in search results", "flagRate"),
			flagFollowUp("Also open the fit list", "the part page shows the fit list right away, without a tap", "Fit list open on the part page", "fitListOpen"),
		],
	},
	"checkout-late": {
		steps: ["Check the fit as each part goes in the cart.", "Show the fit message next to the part there, with the swap when it doesn't fit.", "Keep the check at checkout as a last look."],
		why: "Customers find out while they're still choosing, not when they're about to pay.",
		followUps: [explainFit, flagFollowUp("Also show the price difference", 'the swap shows the price difference, like "+$0.50"', "Price difference on the swap", "swapPriceDiff")],
	},
	"checkout-one-vehicle": {
		steps: ['Add "Another vehicle" next to the saved one at checkout.', "Ask for its year, make and model, one at a time.", "Check the cart against that vehicle."],
		why: "It's the same way customers already add a vehicle, so there's nothing new to learn.",
		followUps: [explainFit, vehicleFirst],
	},
	"counter-slow": {
		steps: ["Fill the vehicle in from the customer's account when the return opens.", 'Keep "Note it" as the only thing to tap.'],
		why: "It takes out the step that made busy stores skip it.",
		followUps: [biggerNoteIt],
	},
	"no-vehicle": {
		steps: ["When the account has no vehicle, ask for it at the counter: year, make and model.", "Note the return with that vehicle, as with a saved one."],
		why: "These returns are the ones missing from the weekly list today.",
		followUps: [biggerNoteIt],
	},
	"light-text": {
		steps: ["Put secondary text back to the design system's muted gray.", "Change nothing else."],
		why: "It's the closest gray that passes the contrast standard.",
		followUps: [],
	},
};

const planFor = (findingId: string): FixPlan => fixPlans[findingId] ?? { steps: [], why: "", followUps: [] };

export const sampleMakeTheChange = "Make this change";
/** The last option, with two follow-ups or more: the plan and every follow-up, as one version. */
export const sampleFixAll = "Fix all";
const evaluateAgain = "Yes, evaluate it";

/** "Fix finding 1 next": another finding the prototype can fix, without going back to Evaluate. */
export const sampleFixNext = (number: number) => `Fix finding ${number} next`;

/** What a fix's replies are about: the finding, with its number in Evaluate's list. */
export type FixedFinding = { id: string; title: string; number: number; onPage: boolean };

/** Her message, sent by "Fix in the prototype" (or "Change the fix in the prototype", once it's fixed). */
export const sampleFixMessage = (finding: FixedFinding, fixed: boolean) =>
	fixed ? `Change the fix for finding ${finding.number}: ${finding.title}.` : `Fix finding ${finding.number}: ${finding.title}.`;

/** The follow-ups still to make, as the changes stand. */
export const sampleFixFollowUps = (findingId: string, changes: FitCheckChanges) => planFor(findingId).followUps.filter((f) => !f.applied(changes));

/** Which finding a fix's reply is about, and where it stands: its plan waits for her, or it's made. */
export function sampleFixStage(replyId: string): { findingId: string; made: boolean } | undefined {
	const match = replyId.match(/^prototype-fix-(plan|made)-(.+)-\d+$/);
	return match ? { findingId: match[2], made: match[1] === "made" } : undefined;
}

const sentence = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

/**
 * The plan first: what Sparks will change and why. Nothing changes yet. With follow-ups, the plan and what she can pick
 * are one numbered list: the plan itself (↵, its steps and why), each follow-up on top of it, and "Fix all" last (with
 * two or more). Without, the plan is in the message and "Make this change" is its only reply.
 */
export function sampleFixPlanReply(finding: FixedFinding, changes: FitCheckChanges, nextVersion: number): SparksReply {
	const plan = planFor(finding.id);
	const followUps = sampleFixFollowUps(finding.id, changes);
	const fixAll = followUps.length > 1;
	const where = finding.onPage ? "I've opened the page where it happens." : "It's on every page.";
	const back = `It will be version ${nextVersion}, so you can always go back.`;
	const thinking = [`Looking under the hood of finding ${finding.number}…`, "Finding parts that fit in the design system…", "Planning the repair…"];
	if (!followUps.length)
		return {
			id: `prototype-fix-plan-${finding.id}`,
			from: "sparks",
			thinking,
			parts: [
				{
					kind: "text",
					text: `${where}\n\n**Here's my plan:**\n\n${plan.steps.map((step, i) => `${i + 1}. ${step}`).join("\n")}\n\n${plan.why} ${back}\n\n**Should I make this change?**\n\nIf not, tell me what you'd do instead.`,
				},
			],
			quickReplies: [sampleMakeTheChange],
		};
	return {
		id: `prototype-fix-plan-${finding.id}`,
		from: "sparks",
		thinking,
		parts: [
			{
				kind: "text",
				text: `${where}\n\n**Should I make this change?**\n\nHere's my plan and what I can add to it. Pick one, or tell me what you'd do instead. ${back}`,
			},
		],
		quickReplies: [sampleMakeTheChange, ...followUps.map((f) => f.reply), ...(fixAll ? [sampleFixAll] : [])],
		options: {
			label: "What should Sparks do?",
			steps: { [sampleMakeTheChange]: plan.steps },
			details: {
				[sampleMakeTheChange]: plan.why,
				...Object.fromEntries(followUps.map((f) => [f.reply, sentence(f.summary)])),
				...(fixAll ? { [sampleFixAll]: "Everything above" } : {}),
			},
		},
	};
}

/** The replies under a fix that's made: evaluating it again first, then another finding to fix, then the follow-ups left. */
const madeReplies = (findingId: string, changes: FitCheckChanges, nextFinding?: number) => [
	evaluateAgain,
	...(nextFinding ? [sampleFixNext(nextFinding)] : []),
	...sampleFixFollowUps(findingId, changes).map((f) => f.reply),
];

/** "a", "a, and b", "a, b, and c". */
const listed = (items: string[]) => (items.length < 3 ? items.join(", and ") : `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`);

/** Made: what changed, the version, and that only a new run can confirm it; then what she can do next. */
export function sampleFixMadeReply(finding: FixedFinding, summaries: string[], version: number, changes: FitCheckChanges, nextFinding?: number): SparksReply {
	return {
		id: `prototype-fix-made-${finding.id}`,
		from: "sparks",
		parts: [
			{
				kind: "text",
				text: `Done: ${listed(summaries)}. I've saved it as version ${version}.\n\nTry it on the prototype. Finding ${finding.number} stays to be checked until I run the evaluation again.\n\n**Ready for me to evaluate it again?**\n\nOr keep going: tell me what else to change.`,
			},
		],
		quickReplies: madeReplies(finding.id, changes, nextFinding),
	};
}

/** Already fixed: what was done, and what she can do on top. */
export function sampleFixAgainReply(finding: FixedFinding, summary: string, version: number, changes: FitCheckChanges, nextFinding?: number): SparksReply {
	const where = finding.onPage ? "I've opened the page where it happens. " : "";
	const replies = madeReplies(finding.id, changes, nextFinding);
	return {
		id: `prototype-fix-made-${finding.id}`,
		from: "sparks",
		parts: [
			{
				kind: "text",
				text: `${where}Finding ${finding.number} was fixed in version ${version}: ${summary}.\n\n**What would you change about it?**\n\nTell me in your own words${replies.length > 1 ? ", pick one below," : ""} or I can evaluate it as it is.`,
			},
		],
		quickReplies: replies,
	};
}
