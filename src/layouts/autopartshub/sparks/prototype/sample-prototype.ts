import type { SparksReply } from "../workspace/workspace";
import type { FitCheckChanges } from "./fit-check-prototype";

/*
 * The Prototype step for "Wrong-part returns" (prds/sparks-prototype.md): Sparks builds the chosen direction screen by
 * screen, then introduces it and asks if it's ready to be put through its paces. What the AI would supply.
 */

/** How long each screen takes to build in the demo, in milliseconds. */
export const sampleBuildStepMs = 1400;

/** Sparks's progress while it builds (`screens`, in order): the screen it's on, or done. */
export function sampleBuildProgress(screens: string[], ready: number) {
	const total = screens.length;
	return ready >= total
		? { text: `Built all ${total} screens.`, done: true }
		: { text: `Building ${screens[ready]}, ${ready + 1} of ${total} screens.`, done: false };
}

/** What Sparks says it's building, by direction: a routine gets the pieces it uses and a walkthrough. */
const buildingNotes: Record<string, string> = {
	"fit-data":
		"This direction is mostly a new routine for stores and the catalog team, so I'll build the screens it uses (the return screen at the counter, the catalog team's weekly list and the fit list customers see) and a walkthrough of how it fits together.",
};

/**
 * "Yes, build it": Plan is done, and Sparks starts building the direction she chose, screen by screen, with its
 * progress in place (prds/sparks-prototype.md, "Building it").
 */
export function samplePrototypeBuildingReply(name: string, screens: string[], ready = 0, directionId = ""): SparksReply {
	return {
		id: "prototype-building",
		from: "sparks",
		thinking: ["Pulling parts from AutoParts Co.'s design system…", "Laying out the screens…"],
		parts: [
			{
				kind: "text",
				text: `Done. Plan is finished, and it's all in your blueprint.\n\n**Now, let's build "${name}".**\n\nI'll use AutoParts Co.'s design system and made-up data, screen by screen. ${buildingNotes[directionId] ? `${buildingNotes[directionId]} ` : ""}You can try each one on the right as soon as it's ready.`,
			},
			{ kind: "progress", ...sampleBuildProgress(screens, ready) },
		],
	};
}

/**
 * Another direction as a path, from the Blueprint (prds/sparks-plan-compare.md, "Directions in the blueprint"): Sparks
 * says what it will build, next to what, and what it will test, and asks once. The id carries the direction.
 */
export function samplePathConfirmReply(directionId: string, name: string, current: string, believe: string): SparksReply {
	return {
		id: `path-confirm-${directionId}`,
		from: "sparks",
		parts: [
			{
				kind: "text",
				text: `I'll build "${name}" as another path, next to "${current}". Both stay: you switch between them at the top of the prototype, and each keeps its own versions and evaluation.\n\n**What we'll test:** ${believe}\n\n**Build it?**`,
			},
		],
		quickReplies: samplePathConfirmReplies,
	};
}

/** The answers to building another path. */
export const samplePathConfirmReplies = ["Yes, build it", "Not now"];

/** "Not now": nothing changes. */
export const samplePathNotNowReply: SparksReply = {
	id: "path-not-now",
	from: "sparks",
	parts: [{ kind: "text", text: "Okay. It's in your blueprint whenever you want to try it." }],
};

/** "Yes, build it": the new path, built screen by screen like the first (its id starts like every build's). */
export function samplePathBuildingReply(name: string, screens: string[], ready = 0, directionId = ""): SparksReply {
	return {
		id: "prototype-building",
		from: "sparks",
		thinking: ["Pulling parts from AutoParts Co.'s design system…", "Laying out the screens…"],
		parts: [
			{
				kind: "text",
				text: `Done. "${name}" is a new path in your blueprint.\n\n**Now, let's build it.**\n\nI'll use AutoParts Co.'s design system and made-up data, screen by screen. ${buildingNotes[directionId] ? `${buildingNotes[directionId]} ` : ""}Your other path stays as it was; switch between them at the top of the prototype.`,
			},
			{ kind: "progress", ...sampleBuildProgress(screens, ready) },
		],
	};
}

/** The answers to the question that finishes the step. */
export const samplePrototypeReadyReplies = ["Yes, test it", "Go to Review instead"];

/** Where to start in each direction's prototype, and what's pretend. */
const readyIntros: Record<string, string> = {
	"fit-check":
		'Your prototype is ready. Start with the customer\'s phone: add a vehicle, then open a few parts and see which fit. Switch to "Store staff" to see what an associate sees at the counter. Placing an order is pretend; nothing leaves the prototype.',
	"flag-returns":
		"Your prototype is ready. Start with the search results on the customer's phone: two parts carry the flag. Open one to see how often it comes back, check its fit list, and add it to the cart. Placing an order is pretend; nothing leaves the prototype.",
	"checkout-check":
		'Your prototype is ready. Start on the customer\'s phone: add a few parts, including the FL-400S oil filter, and go to checkout. Pick the vehicle, and see what doesn\'t fit and the swap. Switch to "Store staff" to see an order at the counter. Placing an order is pretend.',
	"fit-data":
		'Your prototype is ready. Start with the walkthrough, then try each piece: the return screen at the counter ("Store staff"), the weekly list ("Catalog team") and the fit list customers see ("Customer"). Nothing is noted or fixed for real.',
};

/** Built: what's in it, where to start and what's pretend, then the question that finishes the step. */
export const samplePrototypeReadyReply = (directionId = "fit-check"): SparksReply => ({
	id: "prototype-ready",
	from: "sparks",
	parts: [
		{
			kind: "text",
			text: `${readyIntros[directionId] ?? readyIntros["fit-check"]}\n\n**Ready for me to put it through its paces?**\n\nIn Validate, I'll work it through realistic scenarios for customers and store staff, and check it against AutoParts Co.'s data. Try it first if you like, and tell me what to change, or point at something.`,
		},
	],
	quickReplies: samplePrototypeReadyReplies,
});

/** "Yes, test it" or "Go to Review instead": the prototype is in the concept. Validate and Review aren't built yet. */
export function samplePrototypeDoneReply(answer: string): SparksReply {
	return {
		id: "prototype-done",
		from: "sparks",
		parts: [
			{
				kind: "text",
				text:
					answer === "Go to Review instead"
						? "Done. The prototype is in your blueprint, and we'll skip Validate.\n\n**Next, Review.**\n\nI'll put the idea together for others to see."
						: "Done. The prototype is in your blueprint.\n\n**Next, Validate.**\n\nI'll work it through realistic scenarios and tell you what holds up.",
			},
		],
	};
}


/*
 * Changing it (prds/sparks-prototype.md, "Changing it"): what she asks for, in words or pointing at an element, and how
 * Sparks answers. The demo recognizes the changes below; the live AI would understand any.
 */

/** A change asked for in the conversation. */
/** A change asked for in words that only one direction's prototype has: the flag it sets, what Sparks says, the version. */
type DirectionChange = { change: keyof FitCheckChanges; test: RegExp; summary: string; version: string };

/** The changes in words each newer prototype understands (prds/sparks-prototype.md, "Changing it"). */
const directionChanges: Record<string, DirectionChange[]> = {
	"flag-returns": [
		{
			change: "flagRate",
			test: /how often|return rate|show the rate|how many (come back|get returned|are returned)|numbers? (in|on) the (search|results)/,
			summary: "search results say how often a flagged part comes back, under the flag",
			version: "How often it comes back, in search results",
		},
		{
			change: "fitListOpen",
			test: /fit list.*(right away|open|without (a )?(click|tap)|always|straight away|by default)|(open|show|expand).*fit list/,
			summary: "the part page shows the fit list right away, without a tap",
			version: "Fit list open on the part page",
		},
	],
	"checkout-check": [
		{
			change: "explainFit",
			test: /why (it|a part|the part) (doesn'?t|does not) fit|explain|which vehicles? it (does )?fits?|say why|tell (them|customers) why/,
			summary: "a part that doesn't fit says which vehicles it does fit",
			version: "Why it doesn't fit, with the vehicles it fits",
		},
		{
			change: "swapPriceDiff",
			test: /price difference|difference in price|how much more|cost difference|price change|extra cost/,
			summary: 'the swap shows the price difference, like "+$0.50"',
			version: "Price difference on the swap",
		},
	],
	"fit-data": [
		{
			change: "weeklyByCount",
			test: /most (often )?returned|most common|how often|by count|by (the )?number|most returns|sort.*(often|count|returns)/,
			summary: "the weekly list puts the most-returned parts first, one row per part",
			version: "Weekly list by most returned",
		},
		{
			change: "customerReport",
			test: /(customers?|people|shoppers?|buyers?).*(report|tell us|flag|say|let us know)|report (a |the )?wrong|wrong fit/,
			summary: "the fit list lets customers say it's wrong for their vehicle; in the routine, what they send joins the weekly list",
			version: "Customers can report a wrong fit",
		},
	],
};

/** The directions whose prototype has the fit message ("name the vehicle first"), and the one with product pages (stock). */
const withFitMessage = ["fit-check", "checkout-check"];

export type PrototypeIntent =
	| { kind: "direction-change"; change: keyof FitCheckChanges; summary: string; version: string }
	| { kind: "vehicle-first" }
	| { kind: "no-fit-message" }
	| { kind: "live-stock" }
	| { kind: "light-text" }
	| { kind: "beyond" }
	| { kind: "choice" }
	| { kind: "restore" }
	| { kind: "real-data" }
	| { kind: "share" }
	| { kind: "unknown" };

/** What she asked for in words, for the direction being prototyped: a change it understands, or what it can't do. */
export function samplePrototypeIntent(text: string, directionId = "fit-check"): PrototypeIntent {
	const t = text.toLowerCase();
	const own = directionChanges[directionId]?.find((c) => c.test.test(t));
	if (own) return { kind: "direction-change", change: own.change, summary: own.summary, version: own.version };
	if (/vehicle first|name the vehicle|names the vehicle|car first/.test(t)) return withFitMessage.includes(directionId) ? { kind: "vehicle-first" } : { kind: "no-fit-message" };
	if (/stock|availab|nearest store|in store/.test(t)) return directionId === "fit-check" ? { kind: "live-stock" } : { kind: "unknown" };
	if (/(light|lighter|pale)\s*(gray|grey)|gray text|grey text/.test(t)) return { kind: "light-text" };
	if (/install|book|appointment|delivery|financ/.test(t)) return { kind: "beyond" };
	if (/back to the (choice|directions)|(another|a different|the other|other) (direction|option|idea)|change (the )?direction|choose again|pick again|switch direction/.test(t))
		return { kind: "choice" };
	if (/go back|undo|how it was|previous version|restore|revert/.test(t)) return { kind: "restore" };
	if (/real (customer|data|vehicle|order)/.test(t)) return { kind: "real-data" };
	if (/send|share|manager|show (it )?to/.test(t)) return { kind: "share" };
	return { kind: "unknown" };
}

/** A change to the element she pointed at. */
export type ElementIntent = { kind: "larger" } | { kind: "rename"; text: string } | { kind: "light-text" } | { kind: "unknown" };

export function sampleElementIntent(text: string): ElementIntent {
	const quoted = text.match(/["“']([^"”']+)["”']/);
	if (quoted) return { kind: "rename", text: quoted[1] };
	const t = text.toLowerCase();
	const named = t.match(/(?:call it|say|rename it to|change it to)\s+(.+)$/);
	if (named) return { kind: "rename", text: text.slice(text.length - named[1].length).replace(/[.!]$/, "") };
	if (/bigger|larger|too small|more visible|stand out/.test(t)) return { kind: "larger" };
	if (/(light|lighter|pale)\s*(gray|grey)/.test(t)) return { kind: "light-text" };
	return { kind: "unknown" };
}

const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

/** Version names, for what changed (prds/sparks-prototype.md, "Versions"). */
export const sampleVersionNames = {
	first: "First build",
	vehicleFirst: "Fit message names the vehicle first",
	liveStock: "Stock at the nearest store (pretend)",
	lightText: "Light gray text, kept against the design system",
	larger: (element: string) => `${capitalize(element)} made bigger`,
	rename: (element: string, text: string) => `${capitalize(element)} says "${text}"`,
	typed: (before: string, after: string) => `"${after}" instead of "${before}"`,
	restored: (name: string) => `Restored: ${name}`,
};

/** A reply in the Prototype step; the finishing question's answers stay under it. */
function prototypeReply(id: string, text: string, quickReplies = samplePrototypeReadyReplies): SparksReply {
	return { id, from: "sparks", parts: [{ kind: "text", text }], quickReplies };
}

/** Sparks made a change: what it changed, in one line, and the version it saved. */
export const sampleChangeDoneReply = (summary: string, version: number) =>
	prototypeReply("prototype-change", `Done: ${summary}. I've saved it as version ${version}.`);

export const sampleVehicleFirstSummary = 'the fit message names the vehicle first ("2015 Ford F-150: fits")';

export const sampleLiveStockReply = (version: number) =>
	prototypeReply(
		"prototype-change",
		`Done: product pages show stock at the nearest store. It's pretend: AutoParts Co.'s stores don't report stock in real time today (engineering context), so I've added it under "Needs what AutoParts Co. doesn't have yet" for Validate and Review. Saved as version ${version}.`,
	);

/** Beyond the chosen direction: not built, and three ways forward. */
export const sampleBeyondReplies = ["Add it to What comes later", "Go back to the choice", "Drop it"];
export const sampleBeyondReply = (direction: string) =>
	prototypeReply(
		"prototype-beyond",
		`That goes beyond "${direction}", so I haven't built it: the prototype gets evaluated against the direction you chose, and adding to it would drift from it without anyone noticing.\n\nI can add it to "What comes later" in your blueprint, or we can go back to the choice in Plan.`,
		sampleBeyondReplies,
	);
/** "Add it to What comes later" or "Drop it"; "Go back to the choice" reopens the choice in Plan (the stories). */
export function sampleBeyondAnswerReply(answer: string): SparksReply {
	if (answer === "Add it to What comes later")
		return prototypeReply("prototype-change", `Done. It's under "What comes later" in your blueprint, so reviewers see it.`);
	return prototypeReply("prototype-change", "Okay, I've dropped it.");
}

/** Why she's back at the choice, from Prototype: a request beyond the direction, or asking for another direction. */
export const sampleBackFromPrototype = {
	beyond: (direction: string) => `What you asked for goes beyond "${direction}", so it's worth choosing again with it in mind.`,
	asked: "Whichever you pick next, I'll build it from the start.",
};

/** Against the design system: why, in one sentence, and the closest option. */
export const sampleDesignReplies = ["Use the closest option", "Keep my change"];
export const sampleDesignReply = prototypeReply(
	"prototype-design",
	"Light gray text would be hard to read for many customers: it fails the design system's contrast standard. The closest option that passes is the muted gray it already uses for secondary text. Want to keep that?",
	sampleDesignReplies,
);
export const sampleDesignClosestReply = prototypeReply(
	"prototype-change",
	"Then it stays as it is: the secondary text already uses that muted gray, which passes.",
);
export const sampleDesignKeptReply = (version: number) =>
	prototypeReply(
		"prototype-change",
		`Done: secondary text is light gray. I've recorded it under "Departs from the design system", so the UX team sees it in Review. Saved as version ${version}.`,
	);

export const sampleRestoredReply = (restored: number, name: string, version: number) =>
	prototypeReply(
		"prototype-change",
		`Done: I've brought back version ${restored} ("${name}") as the newest one, version ${version}. Nothing is lost: every earlier version is still under Versions.`,
	);
export const sampleNothingToRestoreReply = prototypeReply(
	"prototype-change",
	"There's nothing to go back to yet: this is the first version.",
);

export const sampleRealDataReply = prototypeReply(
	"prototype-change",
	"Prototypes use made-up data by default, so they're safe to share. I can make the sample data closer to real cases instead: more older vehicles, or more parts with gaps in fit data.",
);

export const sampleShareReply = prototypeReply(
	"prototype-change",
	"Others see it in Review, once you submit the idea for a decision. Until then, it's only yours.",
);

/** What she can ask for in words, by direction, after a change Sparks can't make. */
const changesInWords: Record<string, string> = {
	"fit-check": "ask me to name the vehicle first in the fit message, or to show stock at the nearest store",
	"flag-returns": "ask me to show how often a part comes back in the search results, or to open the fit list right away on the part page",
	"checkout-check": "ask me to name the vehicle first in the fit message, to explain why a part doesn't fit, or to show the price difference on the swap",
	"fit-data": "ask me to sort the weekly list by the parts returned most often, or to let customers tell us when the fit list is wrong",
};

export const sampleChangeUnknownReplyFor = (directionId = "fit-check") =>
	prototypeReply(
		"prototype-change",
		`I can't make that change in this demo yet. Here's what works: select "Edit element" and tell me what to change about it, type over any heading, ${changesInWords[directionId] ?? changesInWords["fit-check"]}.`,
	);

export const sampleChangeUnknownReply = sampleChangeUnknownReplyFor();

/** "Name the vehicle first" where the prototype has no fit message: why, and what works instead. */
export const sampleNoFitMessageReply = (directionName: string, directionId: string) =>
	prototypeReply(
		"prototype-change",
		`This prototype has no fit message: "${directionName}" doesn't check whether a part fits a vehicle. Here's what works: select "Edit element" and tell me what to change about it, type over any heading, ${changesInWords[directionId] ?? changesInWords["fit-check"]}.`,
	);

export const sampleElementUnknownReply = (element: string) =>
	prototypeReply("prototype-change", `I'm not sure what to change about ${element}. Try "make it bigger", or "call it "…"".`);
