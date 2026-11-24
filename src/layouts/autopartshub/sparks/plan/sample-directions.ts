import type { SparksReply } from "../workspace/workspace";
import type { DirectionDraft } from "./direction-card";

/*
 * Plan's directions for "Wrong-part returns" (prds/sparks-plan-generate-directions.md): all four in one reply, rated,
 * Sparks's recommendation above them, picked with a card's "Generate prototype". What the AI and company knowledge would supply: every number is illustrative
 * (prds/sparks.md, "The demo").
 */

/**
 * The customer's vehicle checked on every product page. It looks like last year's vehicle selector, so the card says
 * what was learned, and it changes product pages, frozen until early January.
 */
export const sampleDirectionFitCheck: DirectionDraft = {
	id: "fit-check",
	name: "Fit check before you buy",
	idea: "Customers save their vehicle once, and every product page says whether the part fits.",
	where: "On the product page",
	effect: "Big",
	effort: { size: "Medium", reason: "Saved vehicles exist, but every product page needs the fit check." },
	risk: { level: "Medium", reason: "It's only as good as the fit data, which has gaps for vehicles over 10 years old." },
	notWorse: "Safe",
	catch: "Product pages can't change until early January, so it can't launch before then.",
	good: "Answers \"will this fit?\" on every page, with nothing extra to do.",
	howItWorks: [
		"You add your car to your account once.",
		"Every part says \"Fits your 2015 F-150\" or \"Doesn't fit\".",
		"If it doesn't fit, you see parts that do.",
	],
	expectedImpact:
		"Fewer \"doesn't fit\" returns: it answers the fit question before people buy. Customers who used the vehicle selector returned far fewer parts (previous experiments, 2025).",
	buildsOn: "The vehicles customers already save in their account, and the catalog's fit data.",
	unknowns: ["Whether customers will save their vehicle.", "How many parts have no fit data."],
	departments: "Web team, catalog team.",
	triedBefore:
		"A vehicle selector on product pages, 2025. Customers who used it returned far fewer parts as \"doesn't fit\", but most skipped it. This one checks automatically, so there's no step to skip.",
};

/** Dana's own idea, from her first message, filled in like the others, honest about its limit. */
export const sampleDirectionFlagReturns: DirectionDraft = {
	id: "flag-returns",
	name: "Flag often-returned parts",
	idea: "Search results mark parts that get returned a lot, with a reminder to check the fit before buying.",
	where: "In search results",
	effect: "Little",
	effort: { size: "Small", reason: "Return counts exist; it's a label on search results." },
	risk: { level: "Medium", reason: "No data on whether people check the fit when they see the flag." },
	notWorse: "Watch",
	catch: "It says a part comes back a lot, not whether it fits your car.",
	good: "Quick to build, with data AutoParts Co. already has. Search results aren't frozen for the holidays, so it could go live before January.",
	howItWorks: [
		"You search for a part.",
		"Parts that come back often say \"Often returned: check the fit before you buy\".",
		"You check the fit list before you add it to your cart.",
	],
	expectedImpact:
		"Some fewer \"doesn't fit\" returns, if the flag makes people check the fit. No data shows how many would yet. Parts come back for other reasons too (damaged, changed mind).",
	buildsOn: "The return counts the returns team already records for each part, and the search results page.",
	unknowns: [
		"Whether people check the fit when they see the flag, or just pick another part.",
		"How many of each part's returns are \"doesn't fit\", not damaged or changed mind.",
	],
	departments: "Web team, returns team.",
	fromDana: true,
};

/** The fit check at checkout, the one step every online order goes through, at the risk of people giving up the order. */
export const sampleDirectionCheckout: DirectionDraft = {
	id: "checkout-check",
	name: "Fit check at checkout",
	idea: "Checkout asks for the vehicle and flags anything in the cart that doesn't fit.",
	where: "At checkout",
	effect: "Some",
	effort: { size: "Medium", reason: "Checkout already knows the account; the fit check and the swap need building." },
	risk: { level: "Medium", reason: "No data on how many people leave checkout when a part is flagged." },
	notWorse: "At risk",
	catch: "A warning at the last step can make some people give up the order.",
	good: "Every online order goes through checkout, so nobody skips it. Checkout isn't a product page, so it could launch before January.",
	howItWorks: [
		"At checkout, you pick your vehicle, or it's already there from your account.",
		"Anything in your cart that doesn't fit is flagged.",
		"You swap it for one that fits, or keep it if you know it's right.",
	],
	expectedImpact:
		"Fewer \"doesn't fit\" returns: it catches the wrong part before the order is placed, but late, so some people will keep the part anyway.",
	buildsOn: "The checkout, the vehicles customers save in their account, and the catalog's fit data.",
	unknowns: [
		"How many people leave checkout when a part is flagged.",
		"Whether people trust a flag that late, or keep the part anyway.",
	],
	departments: "Web team, catalog team.",
};

/** Not a screen: a change in how teams work, going after the cause, gaps in fit data for older vehicles. */
export const sampleDirectionFitData: DirectionDraft = {
	id: "fit-data",
	name: "Complete fit data",
	idea: "The catalog team fills the gaps in fit data for older vehicles, with stores reporting parts that came back as \"doesn't fit\".",
	where: "Behind the scenes: stores, the returns team and the catalog team",
	effect: "Some",
	effort: { size: "Large", reason: "Thousands of older vehicles, and a new weekly routine for stores and the catalog team." },
	risk: { level: "Low", reason: "Fixing data is well understood; the risk is stores keeping up the routine." },
	notWorse: "Safe",
	catch: "Results build slowly, over months, not weeks.",
	good: "It fixes the cause, not the symptom, and makes every fit check more accurate.",
	howItWorks: [
		"A customer brings back a part that doesn't fit, and store staff note the vehicle.",
		"Each week, the catalog team gets the list of parts and vehicles that didn't match.",
		"They fix the fit data, oldest vehicles first.",
		"Fit lists on the site get more accurate, and so would any fit check later.",
	],
	expectedImpact:
		"Fewer \"doesn't fit\" returns, slowly: it goes after the cause we found, gaps in fit data for older vehicles.",
	buildsOn: "The return reasons stores already record, and the supplier feed the catalog team updates every month.",
	unknowns: [
		"How many parts have gaps in fit data today.",
		"Whether stores can note the vehicle on every return without slowing down.",
	],
	departments: "Catalog team, store staff, returns team.",
};

export const sampleDirections = [sampleDirectionFitCheck, sampleDirectionFlagReturns, sampleDirectionCheckout, sampleDirectionFitData];

const effectOrder = ["Big", "Some", "Little", "Unclear"];
const effortOrder = ["Small", "Medium", "Large"];

/**
 * Sparks's pick, from what success looks like (prds/sparks-plan-generate-directions.md, "Sparks's pick"): the biggest
 * effect on the main measure, then nothing at risk among what must not get worse, then the least effort.
 */
export function sampleRecommended(directions: DirectionDraft[]): DirectionDraft {
	return [...directions].sort(
		(a, b) =>
			effectOrder.indexOf(a.effect) - effectOrder.indexOf(b.effect) ||
			Number(a.notWorse === "At risk") - Number(b.notWorse === "At risk") ||
			effortOrder.indexOf(a.effort.size) - effortOrder.indexOf(b.effort.size),
	)[0];
}

/** Why Sparks recommends each direction, in the reply, by its id. */
const recommendations: Record<string, string> = {
	"fit-check":
		"It should cut \"doesn't fit\" returns the most: customers who used last year's vehicle selector returned far fewer, and this one checks without anyone having to look for it. It's Medium effort, since it builds on the vehicles customers already save. The catch is timing: product pages can't change until early January.",
	"checkout-check":
		"It catches the wrong part before the order goes through, and it could launch before January. The catch: a warning at the last step can make some people give up the order.",
	"fit-data":
		"It goes after the cause we found, and it's the lowest risk. The catch: it's the largest effort, and results build over months.",
	"flag-returns": "It's the quickest to build. The catch: it says a part comes back a lot, not whether it fits.",
};

/**
 * Typed instead of using a card: go with Sparks's pick. There are no quick replies under the directions; she picks with
 * a card's "Generate prototype", or types a direction's name.
 */
export const sampleGoWithIt = "Yes, go with it";

/**
 * How she picks, once the cards are shown: no question and no quick replies, the cards' "Generate prototype". The
 * reply keeps `quickReplies: []`, so what she types still answers it (a direction's name picks it).
 */
const pickOnCard = 'Select "Generate prototype" on the one you want to start with.';

/**
 * "Yes, let's see them": what success looks like is in the concept, and Sparks shows every direction at once, its pick
 * first, and recommends one, weighing what Dana already agreed (her main measure) instead of asking what matters most.
 * Its recommendation comes before the cards, so she reads why before she compares; no question and no quick replies
 * after them: she picks with a card's "Generate prototype". `measure` is the main measure she picked.
 */
export function sampleSuccessApprovedReply(measure: "returns" | "repeat" | "own" = "returns"): SparksReply {
	const pick = sampleRecommended(sampleDirections);
	const directions = [pick, ...sampleDirections.filter((direction) => direction !== pick)].map((direction) => ({
		...direction,
		recommended: direction === pick,
	}));
	const weighing =
		measure === "returns"
			? "Your main measure is fewer \"doesn't fit\" returns, so I weighed which one cuts them most, without putting online sales at risk."
			: "Nothing tells us yet how these would move your main measure, so I weighed which one cuts \"doesn't fit\" returns most, without putting online sales at risk.";
	const hers = directions.find((direction) => direction.fromDana && !direction.recommended);
	return {
		id: "directions",
		from: "sparks",
		thinking: [
			"Looking at what Sales and Care already have in the garage…",
			"Checking the mileage on past experiments…",
			"Mapping routes, from a quick fix to a bigger change…",
		],
		parts: [
			{
				kind: "text",
				text: [
					`**Next, pick the path to prototype first.**\n\nI found four ways to get there, from a quick fix to a bigger change, and your idea is one of them. ${weighing} Each one can become its own prototype: we'll start with one, and you can try the others later from your plan.`,
					`I'd go with "${pick.name}". ${recommendations[pick.id]}`,
					hers
						? `Your idea, "${hers.name}", is the quickest to build. But it says a part comes back a lot, not whether it fits, so it would cut fewer of these returns. It could work alongside "${pick.name}" later.`
						: undefined,
					`Here they are, my pick first. ${pickOnCard}`,
				]
					.filter(Boolean)
					.join("\n\n"),
			},
			...directions.map((direction) => ({ kind: "direction" as const, direction })),
		],
		quickReplies: [],
	};
}

/**
 * Back at the choice, from Prototype, Evaluate or Review (prds/sparks-plan-compare.md, "Going back to the choice"): the
 * directions are where they were, `reason` says why she's back, and she picks another with its card's "Generate
 * prototype" (no quick replies). `evaluated`: Evaluate has run on it, so there's something learned to keep.
 */
export function sampleBackToChoiceReply(directions: DirectionDraft[], tried: string, reason: string, evaluated = true): SparksReply {
	const pick = directions.find((direction) => direction.recommended) ?? directions[0];
	return {
		id: "directions-back",
		from: "sparks",
		parts: [
			{
				kind: "text",
				text: `Okay, we're back at the choice in Plan. ${reason}\n\nThe four directions are where we left them, above. Your prototype of "${tried}"${evaluated ? " and what we learned from it stay" : " stays"} in your plan.\n\n**Which would you like to try instead?** ${pick.name === tried ? "" : `I'd go with "${pick.name}". `}Select "Generate prototype" on its card above.`,
			},
		],
		quickReplies: [],
	};
}

/** Something else typed at the directions (a doubt, a change): Sparks takes it and points back to the cards. */
export function sampleDirectionsAgainReply(): SparksReply {
	return {
		id: "directions-again",
		from: "sparks",
		parts: [{ kind: "text", text: 'Thanks, I\'ll work that in.\n\nWhen you\'re ready, select "Generate prototype" on the one you want to start with.' }],
		quickReplies: [],
	};
}
