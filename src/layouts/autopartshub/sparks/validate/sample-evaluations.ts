import type { FitCheckChanges } from "../prototype/fit-check-prototype";
import type { Evaluation, EvaluationExpert } from "./validate-panel";

/** "1 in 6", written as words in a sentence ("3 of 6"). */
const ofSix = (n: number) => `${n} of 6`;

/*
 * Evaluate for the directions other than "Fit check before you buy" (prds/sparks-validate.md): each one's scenarios,
 * findings and results, honest about what it can and can't do. What the AI would supply: every number is illustrative.
 * A fix the prototype can make is in sampleFixes (sample-validate.ts), and the results follow it: the finding is fixed,
 * its scenarios go better and the estimate moves. The others (another direction, other data) are suggestions for review.
 */

/** An evaluation without what every run adds: the version, the checks, what changed since the last run. */
export type EvaluationBody = Omit<Evaluation, "version" | "checks" | "sinceLast">;

const designFor = (changes: FitCheckChanges, built: string) => [
	`${built} with the design system's components.`,
	changes.lightText
		? "Light gray secondary text departs from the design system (you kept it): it fails the contrast standard."
		: "Text contrast meets the standard.",
	"Screen reader: every message is written out and read in order.",
	"Keyboard only: every step works with Tab and Enter.",
];

const repeatMeasure = {
	name: "Also watching: repeat purchases",
	estimate: "Unclear",
	confidence: "Low" as const,
	method: "Business data analysis",
	why: "No starting point yet: returns aren't matched to later orders.",
};

const repeatAssumption = {
	text: "Customers who return a part that doesn't fit buy less from us afterwards.",
	status: "Still unknown" as const,
	evidence: "Returns aren't matched to later orders yet; the returns team could match them, as planned in what success looks like.",
};

const accessibility = (audience: "Customer" | "Store staff", where: string) => [
	{
		id: "screen-reader",
		label: "Screen reader",
		audience,
		access: "Screen reader",
		situation: `Someone using a screen reader goes through ${where}.`,
		task: "Hear every message in order and act on it.",
		outcome: "done" as const,
		summary: "Every message is written out and read with what it's about.",
		steps: [{ screen: where.charAt(0).toUpperCase() + where.slice(1), evaluation: "Messages are text, not color alone, and buttons say what they do." }],
	},
	{
		id: "keyboard",
		label: "Keyboard only",
		audience,
		access: "Keyboard only",
		situation: `Someone using only a keyboard goes through ${where}.`,
		task: "Do it all without a mouse.",
		outcome: "done" as const,
		summary: "Every step works with Tab and Enter.",
		steps: [{ screen: where.charAt(0).toUpperCase() + where.slice(1), evaluation: "Every field and button is reachable in order, with a visible focus." }],
	},
];

/** An expert's look: its role, focus, notes by screen, and what it concludes (AI agents in a role, never people). */
const expert = (id: string, label: string, focus: string, notes: [string, string][], summary: string): EvaluationExpert => ({
	id,
	label,
	focus,
	notes: notes.map(([screen, note]) => ({ screen, note })),
	summary,
});

/** "Flag often-returned parts": it raises the fit question without answering it, and falls short of the target. */
function flagReturns(changes: FitCheckChanges): EvaluationBody {
	const reminder = Boolean(changes.flagReminder);
	const range = reminder ? "7–14%" : "5–12%";
	const firstTry = reminder ? 4 : 3;
	return {
		read: "Needs another look",
		readText: reminder
			? `Worded as a reminder, nobody read the flag as a warning, but it still falls short: likely ${range} fewer "doesn't fit" returns, below your 25% target. It raises the fit question without answering it. I'd go back to the choice in Plan: a fit check answers it.`
			: 'It points the right way but falls short: likely 5–12% fewer "doesn\'t fit" returns, below your 25% target, and some customers may read the flag as a warning about quality. I\'d go back to the choice in Plan: a fit check answers the question the flag only raises.',
		hypothesis: {
			outcome: "Business data inconclusive · Simulation inconclusive",
			note: "Based on business data and simulated scenarios. Real-user testing is recommended before implementation.",
			text: `We believed that marking parts that get returned a lot in search results would cut wrong-part purchases: 25% fewer "doesn't fit" returns within 3 months of launch. Business data and the scenarios suggest ${range} fewer, below the target. In ${ofSix(firstTry)} customer scenarios, the right part was chosen on the first try.`,
		},
		measures: [
			{
				name: 'Main measure: online orders returned as "doesn\'t fit"',
				estimate: `Likely ${range} fewer`,
				reachesTarget: false,
				confidence: "Medium",
				method: "Business data analysis and AI simulation",
				why: `The flag only reaches parts that come back often, and in ${ofSix(6 - firstTry)} customer scenarios it didn't lead to the right part.`,
			},
			repeatMeasure,
			reminder
				? {
						name: "Must not get worse: online sales",
						estimate: "Likely unchanged",
						status: "Safe",
						method: "AI simulation",
						why: "Worded as a reminder, no customer took the flag as a warning about quality.",
					}
				: {
						name: "Must not get worse: online sales",
						estimate: "Possibly lower",
						status: "At risk",
						method: "AI simulation",
						why: "In 1 of 6 scenarios, a customer took the flag as a warning about quality and left to buy elsewhere.",
					},
		],
		findings: [
			{
				id: "flag-no-answer",
				title: "The flag says a part comes back a lot, not whether it fits the customer's vehicle",
				where: "Search results and the part page",
				severity: "Hurts",
				method: "AI simulation, 2 of 6 customer scenarios",
				fix: 'Show whether it fits the saved vehicle instead. That\'s another direction, "Fit check before you buy": try it as another path, beside this one.',
				direction: { id: "fit-check", name: "Fit check before you buy" },
				status: "open",
			},
			{
				id: "flag-quality",
				title: "Some customers read the flag as a sign the part is bad, and leave",
				where: "Search results",
				severity: "Hurts",
				method: "AI simulation, 1 of 6 customer scenarios",
				fix: 'Word it as a reminder: "Check the fit first".',
				status: reminder ? "fixed" : "open",
			},
			{
				id: "flag-counts",
				title: 'Return counts mix "doesn\'t fit" with damaged and changed-mind returns',
				where: "The data behind the flag",
				severity: "Hurts",
				method: "Business data analysis",
				status: "open",
			},
		],
		scenarios: [
			{
				id: "oil-filter",
				label: "Oil filter · 2015 F-150",
				audience: "Customer",
				situation: "A do-it-yourself customer searches for an oil filter for a 2015 Ford F-150 on a phone.",
				task: "Buy a filter that fits.",
				outcome: "struggled",
				summary: "Saw the flag on the FL-400S, but still couldn't tell whether it fits a 2015 F-150, and bought it anyway.",
				findings: ["flag-no-answer"],
				steps: [
					{ screen: "Search results", evaluation: "The flag says the part comes back a lot; it doesn't say for which vehicles." },
					{ screen: "The part page", evaluation: "The fit list is one tap away, but nothing asks her to check it against her truck." },
				],
			},
			{
				id: "brake-pads",
				label: "Brake pads, not flagged",
				audience: "Customer",
				situation: "A customer buys brake pads, which aren't flagged.",
				task: "Buy pads that fit.",
				outcome: "done",
				summary: "No flag; bought the pads, which fit. Nothing changes for a part that isn't flagged.",
				steps: [{ screen: "Search results", evaluation: "Without a flag, the customer gets no help with fit either way." }],
			},
			{
				id: "spark-plugs",
				label: "Flagged spark plugs",
				audience: "Customer",
				situation: "A customer looks at spark plugs, which are flagged.",
				task: "Avoid buying plugs that don't fit.",
				outcome: "done",
				summary: "Saw the flag, opened the fit list, saw it didn't name her engine, and didn't buy.",
				steps: [{ screen: "The part page", evaluation: "Here the flag works: it led to the fit list, and the fit list answered the question." }],
			},
			{
				id: "hurry",
				label: "In a hurry",
				audience: "Customer",
				situation: "A customer in a hurry adds a part to the cart without reading much, on a phone.",
				task: "Buy the right part without slowing down.",
				outcome: "struggled",
				summary: "Didn't read the flag and bought the wrong filter.",
				findings: ["flag-no-answer"],
				steps: [{ screen: "Search results", evaluation: "A label that asks for a check is easy to skip when moving fast." }],
			},
			{
				id: "mechanic",
				label: "Pro mechanic",
				audience: "Customer",
				situation: "A professional mechanic orders parts for a customer's car on a desktop.",
				task: "Order the right parts quickly.",
				outcome: "done",
				summary: "Knows the fit already and ignored the flag.",
				steps: [{ screen: "Search results", evaluation: "For people who know their parts, the flag is noise." }],
			},
			{
				id: "first-time",
				label: "First-time buyer",
				audience: "Customer",
				situation: "A first-time buyer shops for a part on a laptop.",
				task: "Buy a part that fits, starting from nothing.",
				outcome: reminder ? "done" : "struggled",
				summary: reminder
					? 'Read "Check the fit first", opened the fit list and bought the filter that fits.'
					: "Took the flag to mean the part is bad, and left to buy elsewhere.",
				findings: ["flag-quality"],
				steps: [
					{
						screen: "Search results",
						evaluation: reminder
							? "A reminder about fit says what to do, without suggesting the part is bad."
							: '"Often returned" reads as a warning about quality to someone who doesn\'t know why parts come back.',
					},
				],
			},
			...accessibility("Customer", "the search results and a flagged part"),
		],
		experts: [
			expert("ux", "UX expert", "Usability and the design system", [
				["Search results", "The flag stands out, but it asks for a check without saying how to do it."],
				["The part page", "The fit list is folded away; people who need it may not open it."],
				["The cart", "The cart doesn't mention fit: the last chance to check goes by."],
			], "The flag is seen; what to do about it isn't."),
			expert("copy", "Copywriter", "The words on each screen", [
				["Search results", reminder ? '"Check the fit first" tells people what to do.' : '"Often returned" can read as "bad part".'],
				["Search results count", "The count and the search say what you're looking at. Clear."],
			], reminder ? "The flag reads as a reminder." : 'Reword the flag as a reminder: "Check the fit first".'),
			expert("engineer", "Engineer", "What it needs to be built", [
				["Search results", 'Return counts mix "doesn\'t fit" with damaged and changed-mind returns.'],
			], "Buildable, but the counts need return reasons first."),
			expert("data", "Data analyst", "Business data and the measures", [
				["The part page", 'Flagged parts are about 1 in 12 of what\'s sold; most "doesn\'t fit" returns aren\'t flagged.'],
			], `Likely ${range} fewer "doesn't fit" returns, below the 25% target.`),
		],
		assumptions: [
			{ text: "Customers check the fit list when they see the flag.", status: "Not supported", evidence: "In 3 of 6 scenarios they didn't (AI simulation)." },
			{
				text: 'Return counts show which parts don\'t fit.',
				status: "Not supported",
				evidence: 'They mix "doesn\'t fit" with damaged and changed-mind returns (business data analysis).',
			},
			repeatAssumption,
		],
		build: [
			"Return counts: available from the returns team, but they mix return reasons.",
			"Search results: can change before January; they aren't frozen for the holidays.",
			"Rough effort: Small, as estimated in Plan.",
		],
		design: designFor(changes, "Built"),
		teams: [
			{ team: "Returns team", change: "return counts become customer-facing, so they need to be right." },
			{ team: "Web team", change: "a label on search results and a line on the part page." },
			{ team: "Stores", change: 'may get calls asking why a part is flagged.' },
		],
		realPeople: [
			{ question: reminder ? "Do customers act on the reminder, or skip it?" : "Do customers read the flag as a reminder to check the fit, or as a warning about quality?", how: "a short test of the prototype with 5 to 8 customers." },
			{ question: "Would a fit check answer the question better?", how: "test the flag and a fit check with the same customers." },
		],
	};
}

/** "Fit check at checkout": it can reach the target, but the late warning puts online sales at risk. */
function checkoutCheck(changes: FitCheckChanges): EvaluationBody {
	const early = Boolean(changes.cartCheck);
	const another = Boolean(changes.otherVehicle);
	const range = ["18–28%", "20–30%", "22–32%"][Number(early) + Number(another)];
	const bought = 4 + Number(early) + Number(another);
	const left = [
		...(early ? [] : ["check the fit as parts go in the cart, so checkout has no surprises"]),
		...(another ? [] : ["let customers pick another vehicle at checkout"]),
	];
	return {
		read: left.length ? "Ready with changes" : "Ready for review",
		readText: `It can reach your 25% target: likely ${range} fewer "doesn't fit" returns.${
			early ? " Checked in the cart, nobody met a surprise at checkout, so online sales look safe." : " But online sales are at risk: a warning at the last step made a customer give up the order."
		}${left.length === 2 ? ` Two things are worth changing first: ${left.join("; and ")}.` : left.length === 1 ? ` One thing is worth changing first: ${left[0]}.` : " Nothing found blocks it; how many people leave checkout is still for a live test to show."}`,
		hypothesis: {
			outcome: early ? "Business data supports hypothesis · Simulation supports hypothesis" : "Business data supports hypothesis · Simulation inconclusive",
			note: "Based on business data and simulated scenarios. Real-user testing is recommended before implementation.",
			text: `We believed that flagging parts that don't fit the customer's vehicle at checkout would cut wrong-part purchases: 25% fewer "doesn't fit" returns within 3 months of launch. Business data and the scenarios suggest ${range} fewer. In ${ofSix(bought)} customer scenarios, the right part was bought${early ? "" : "; in 1, the order was given up"}.`,
		},
		measures: [
			{
				name: 'Main measure: online orders returned as "doesn\'t fit"',
				estimate: `Likely ${range} fewer`,
				reachesTarget: true,
				confidence: "Medium",
				method: "Business data analysis and AI simulation",
				why: `Every online order goes through checkout, so nobody skips the check; in ${ofSix(bought)} customer scenarios, the right part was bought.`,
			},
			repeatMeasure,
			early
				? {
						name: "Must not get worse: online sales",
						estimate: "Likely unchanged",
						status: "Watch",
						method: "AI simulation",
						why: "Checked in the cart, no order was given up in the scenarios; a live test would confirm it.",
					}
				: {
						name: "Must not get worse: online sales",
						estimate: "Possibly lower",
						status: "At risk",
						method: "AI simulation",
						why: "In 1 of 6 scenarios, the warning at the last step ended the order.",
					},
		],
		findings: [
			{
				id: "checkout-late",
				title: "A warning at the last step makes some customers give up the order",
				where: "Checkout",
				severity: "Hurts",
				method: "AI simulation, 1 of 6 customer scenarios",
				fix: "Check the fit as parts go in the cart, so checkout has no surprises.",
				status: early ? "fixed" : "open",
			},
			{
				id: "checkout-one-vehicle",
				title: "Checkout offers only the saved vehicle",
				where: "Checkout",
				severity: "Hurts",
				method: "AI simulation, 1 of 6 customer scenarios",
				fix: "Let customers pick another vehicle at checkout.",
				status: another ? "fixed" : "open",
			},
			{
				id: "fit-data-gaps",
				title: "Fit data is missing for about 1 in 8 parts on vehicles over 15 years old",
				where: "Checkout",
				severity: "Hurts",
				method: "Engineering context, catalog data",
				status: "open",
			},
		],
		scenarios: [
			{
				id: "swap",
				label: "Swap at checkout",
				audience: "Customer",
				situation: "A customer adds brake pads and the FL-400S oil filter, then checks out on a phone.",
				task: "End up with parts that fit.",
				outcome: "done",
				summary: "Checkout flagged the filter, and she swapped it for the one that fits.",
				steps: [
					{ screen: "Checkout", evaluation: "The flag is clear, and the swap is one tap." },
				],
			},
			{
				id: "hurry",
				label: "In a hurry",
				audience: "Customer",
				situation: "A customer in a hurry checks out on a phone.",
				task: "Buy the right parts without slowing down.",
				outcome: early ? "done" : "struggled",
				summary: early ? 'Saw "Doesn\'t fit" as the filter went in the cart, swapped it, and checked out.' : 'Saw "Doesn\'t fit" at the last step and gave up the order.',
				findings: ["checkout-late"],
				steps: [
					early
						? { screen: "The cart", evaluation: "Flagged while still choosing, the swap feels like help, not a reason to stop." }
						: { screen: "Checkout", evaluation: "A surprise at the last step, after the decision to buy, reads as a reason to stop." },
				],
			},
			{
				id: "other-car",
				label: "Another car",
				audience: "Customer",
				situation: "A customer buys a part for another car in the household.",
				task: "Buy the part for the other car.",
				outcome: another ? "done" : "struggled",
				summary: another
					? 'Picked "Another vehicle", a 2014 Ford Escape, and the check confirmed the filter fits it.'
					: "Checkout only offered the saved vehicle, so the right part looked wrong.",
				findings: ["checkout-one-vehicle"],
				steps: [
					{
						screen: "Checkout",
						evaluation: another ? "Year, make and model are enough to check against another car." : "With one vehicle to pick, the check can't help when the part is for another car.",
					},
				],
			},
			{
				id: "no-fit-data",
				label: "Spark plugs · older truck",
				audience: "Customer",
				situation: "A customer with an older truck checks out with spark plugs that have no fit data.",
				task: "Find out whether they fit before paying.",
				outcome: "done",
				summary: 'Saw "We\'re not sure this fits" and checked with a store before buying.',
				steps: [{ screen: "Checkout", evaluation: "The message is honest; a next step would keep the order on the site." }],
			},
			{
				id: "mechanic",
				label: "Pro mechanic",
				audience: "Customer",
				situation: "A professional mechanic checks out two parts on a desktop.",
				task: "Confirm both parts fit.",
				outcome: "done",
				summary: "The check confirmed both parts.",
				steps: [{ screen: "Checkout", evaluation: "A quick confirmation, no extra step." }],
			},
			{
				id: "first-time",
				label: "First-time buyer",
				audience: "Customer",
				situation: "A first-time buyer with no saved vehicle checks out on a laptop.",
				task: "Buy a part that fits, starting from nothing.",
				outcome: "done",
				summary: "Was asked for the vehicle at checkout, added it, and the check ran.",
				steps: [{ screen: "Checkout", evaluation: "Asking at checkout works, but it's one more thing at the last step." }],
			},
			{
				id: "store-order",
				label: "Order at the counter",
				audience: "Store staff",
				situation: "A store associate looks up an order whose part was swapped at checkout.",
				task: "See what was flagged and what the customer did.",
				outcome: "done",
				summary: "Saw the vehicle checked and the swap.",
				steps: [{ screen: "Order lookup", evaluation: "The order shows the check and the swap, so the associate can explain it." }],
			},
			...accessibility("Customer", "checkout"),
		],
		experts: [
			expert("ux", "UX expert", "Usability and the design system", [
				["Checkout", early ? "Nothing new at checkout: the fit was checked in the cart." : "A warning at the last step lands after people have decided."],
				["The shop", 'Big cards with "Add to cart" make adding quick; nothing about fit yet.'],
				["The cart", "The cart is the place to check, while people still choose."],
			], early ? "The check comes early enough to help." : "Move the check earlier, into the cart."),
			expert("copy", "Copywriter", "The words on each screen", [
				["The shop", '"Popular parts" says what the grid is. Clear.'],
				["Checkout", '"Swap for the one that fits" says what happens. Clear.'],
				["Place order", "The order button says what it does."],
			], "Clear, plain wording."),
			expert("engineer", "Engineer", "What it needs to be built", [
				["Checkout", "The check reads the catalog's fit data, missing for about 1 in 8 older parts."],
				["Order lookup", "Orders keep the swap: stores can see it. Available."],
			], "Buildable; checkout changes need the payments team."),
			expert("data", "Data analyst", "Business data and the measures", [
				["Checkout", 'Most "doesn\'t fit" returns are caught here, if people swap.'],
			], `Likely ${range} fewer "doesn't fit" returns.`),
		],
		assumptions: [
			{
				text: "People trust a flag that late, and swap the part.",
				status: "Still unknown",
				evidence: "In 4 of 6 scenarios they swapped or checked first; real customers may behave differently.",
			},
			{
				text: "Few people leave checkout when a part is flagged.",
				status: early ? "Still unknown" : "Not supported",
				evidence: early
					? "Checked in the cart, nobody left in the scenarios; a small live test would show the real share."
					: "The simulation suggests about 1 in 6 could; a small live test would show the real share.",
			},
			repeatAssumption,
		],
		build: [
			"Saved vehicles: available from Sales.",
			"Checkout: can change before January; it isn't a product page.",
			"Fit data: missing for about 1 in 8 parts on vehicles over 15 years old.",
			"Rough effort: Medium, as estimated in Plan.",
		],
		design: designFor(changes, "Built"),
		teams: [
			{ team: "Web team", change: `a fit check and a swap in checkout${early ? ", and in the cart" : ""}.` },
			{ team: "Stores", change: "orders with swapped parts, and fewer fit calls after buying." },
			{ team: "Catalog team", change: "gaps in fit data show up at checkout, so filling them matters more." },
		],
		realPeople: [
			{ question: "How many customers give up the order when a part is flagged at checkout?", how: "a small live test with a share of orders." },
			{ question: "Does a check at the end feel helpful, or too late?", how: "a short test of the prototype with 5 to 8 customers." },
		],
	};
}

/** "Complete fit data": low risk and fixes the cause, but slowly; the scenarios are the routine itself. */
function fitData(changes: FitCheckChanges): EvaluationBody {
	const prefill = Boolean(changes.counterPrefill);
	const ask = Boolean(changes.counterAskVehicle);
	const fixes = Number(prefill) + Number(ask);
	const range = ["10–20%", "12–22%", "15–25%"][fixes];
	const worked = 4 + fixes;
	return {
		read: "Needs another look",
		readText:
			fixes === 2
				? `The counter works now: every return gets its vehicle, in a tap or two. But it's still slow to reach customers: likely ${range} fewer "doesn't fit" returns in 3 months, below your 25% target, because fixes wait for the monthly supplier feed. I'd go back to the choice in Plan: pair it with a fit check, or set a target over a year in what success looks like.`
				: `It's low risk and fixes the cause, but slowly: likely ${range} fewer "doesn't fit" returns in 3 months, below your 25% target, though it keeps improving after. I'd go back to the choice in Plan: pair it with a fit check, or set a target over a year in what success looks like.`,
		hypothesis: {
			outcome: "Business data inconclusive · Simulation inconclusive",
			note: "Based on business data and simulated scenarios. A trial in a few stores is recommended before rolling it out.",
			text: `We believed that filling the gaps in fit data for older vehicles would cut wrong-part purchases: 25% fewer "doesn't fit" returns within 3 months of launch. Business data and the scenarios suggest ${range} fewer in that time, more over a year. In ${ofSix(worked)} scenarios, the routine worked as planned.`,
		},
		measures: [
			{
				name: 'Main measure: online orders returned as "doesn\'t fit"',
				estimate: `Likely ${range} fewer in 3 months`,
				reachesTarget: false,
				confidence: "Low",
				method: "Business data analysis and AI simulation",
				why: `Fixes take up to a month to reach customers${fixes === 2 ? "" : ", and the routine depends on stores noting the vehicle on every return"}.`,
			},
			repeatMeasure,
			{
				name: "Must not get worse: online sales",
				estimate: "Likely unchanged",
				status: "Safe",
				method: "AI simulation",
				why: "Nothing changes for customers when they buy.",
			},
		],
		findings: [
			{
				id: "counter-slow",
				title: "Finding the customer's account to note the vehicle adds about 20 seconds per return, so busy stores skip it",
				where: "The return screen at the counter",
				severity: "Hurts",
				method: "AI simulation, 1 of 6 scenarios",
				fix: "Fill the vehicle in from the customer's account, so it's one tap.",
				status: prefill ? "fixed" : "open",
			},
			{
				id: "no-vehicle",
				title: "Returns without a saved vehicle can't be noted",
				where: "The return screen at the counter",
				severity: "Hurts",
				method: "AI simulation, 1 of 6 scenarios",
				fix: "Ask for the vehicle at the counter when the account has none.",
				status: ask ? "fixed" : "open",
			},
			{
				id: "monthly-feed",
				title: "The supplier feed updates monthly, so fixes take up to a month to show",
				where: "The fit list customers see",
				severity: "Hurts",
				method: "Engineering context",
				status: "open",
			},
		],
		scenarios: [
			{
				id: "busy-return",
				label: "Busy Saturday return",
				audience: "Store staff",
				situation: "A store associate takes back a filter that doesn't fit, during a busy Saturday.",
				task: "Note the vehicle without slowing the line.",
				outcome: prefill ? "done" : "struggled",
				summary: prefill
					? "The vehicle was filled in from the account; noting it took one tap, even with a line."
					: "Found the account and noted it, but it took about 20 seconds more; on a busy day, it gets skipped.",
				findings: ["counter-slow"],
				steps: [
					{
						screen: "The return screen",
						evaluation: prefill
							? "One tap to confirm fits a busy counter."
							: "Finding the account is one more step at the counter, and when the line is long, it's the step that gets dropped.",
					},
				],
			},
			{
				id: "no-vehicle",
				label: "No saved vehicle",
				audience: "Store staff",
				situation: "An associate takes back a part from a customer with no saved vehicle.",
				task: "Note which vehicle it didn't fit.",
				outcome: ask ? "done" : "struggled",
				summary: ask ? "No saved vehicle, so the associate asked and picked it: year, make and model." : "No vehicle in the account, so nothing to note.",
				findings: ["no-vehicle"],
				steps: [
					{
						screen: "The return screen",
						evaluation: ask ? "Asking the customer takes a few seconds, and the return still counts." : "Without a saved vehicle, the screen has nothing to fill in.",
					},
				],
			},
			{
				id: "weekly-list",
				label: "Monday's list",
				audience: "Store staff",
				situation: "The returns team sends the week's notes to the catalog team on Monday.",
				task: "Get one clean list to the catalog team.",
				outcome: "done",
				summary: "The notes from every store became one list.",
				steps: [{ screen: "The weekly list", evaluation: "One list, sorted oldest vehicles first, is easy to work through." }],
			},
			{
				id: "catalog-fix",
				label: "Catalog fixes",
				audience: "Store staff",
				situation: "The catalog team works through the week's list.",
				task: "Fix the fit data, oldest vehicles first.",
				outcome: "done",
				summary: "Fixed four lines in a few minutes.",
				steps: [{ screen: "The weekly list", evaluation: '"Fix fit data" per line, with the vehicle and the store, is all the team needs.' }],
			},
			{
				id: "fit-list",
				label: "Fit list · 2014 F-150",
				audience: "Customer",
				situation: "A customer checks the fit list for spark plugs for a 2014 F-150 on a phone.",
				task: "See whether they fit.",
				outcome: "done",
				summary: 'Found the 2014 F-150, marked "Added this week".',
				steps: [{ screen: "The fit list", evaluation: "A fuller fit list answers the question, for those who read it." }],
			},
			{
				id: "still-missing",
				label: "Still missing",
				audience: "Customer",
				situation: "A customer looks for a part whose fit data is still missing.",
				task: "See whether it fits.",
				outcome: "struggled",
				summary: "The fit list didn't name the truck yet; the fix comes with next month's supplier feed.",
				findings: ["monthly-feed"],
				steps: [{ screen: "The fit list", evaluation: "Until the feed updates, the customer sees the same gap as today." }],
			},
			...accessibility("Store staff", "the return screen"),
		],
		experts: [
			expert("ux", "UX expert", "Usability and the design system", [
				["The return screen", prefill ? "One tap to confirm fits a busy counter." : "Finding the account is one step too many at a busy counter."],
				["The weekly list", "One list, oldest vehicles first, is easy to work through."],
			], prefill ? "Quick enough for the counter." : "The counter step needs to be faster."),
			expert("copy", "Copywriter", "The words on each screen", [
				["The walkthrough", "The routine reads as four plain steps."],
				["The fit list", '"Fits these vehicles" says exactly what the list is.'],
			], "Clear for each team."),
			expert("engineer", "Engineer", "What it needs to be built", [
				["The fit list", "Fixes wait for the monthly supplier feed."],
			], "Buildable; the feed sets the pace."),
			expert("data", "Data analyst", "Business data and the measures", [
				["The weekly list", "About 1 in 8 parts on vehicles over 15 years old lack fit data."],
			], `Likely ${range} fewer "doesn't fit" returns, below the 25% target.`),
		],
		assumptions: [
			{
				text: "Stores can note the vehicle on every return without slowing down.",
				status: prefill ? "Supported" : "Not supported",
				evidence: prefill
					? "Filled in from the account, it's one tap, even in busy hours (AI simulation)."
					: "In busy hours, finding the account adds about 20 seconds per return (AI simulation).",
			},
			{ text: "About 1 in 8 parts lack fit data for older vehicles.", status: "Supported", evidence: "Catalog data: about 1 in 8 parts on vehicles over 15 years old." },
			repeatAssumption,
		],
		build: [
			"Return reasons: recorded by stores today; the vehicle isn't.",
			"Supplier feed: updated monthly by the catalog team.",
			prefill ? "The counter screen: the vehicle filled in from the order's account; orders already link to accounts." : "The counter screen: a new field, and finding the customer's account.",
			"Rough effort: Large, as estimated in Plan, mostly the catalog team's time.",
		],
		design: designFor(changes, "The counter screen and the weekly list are built"),
		teams: [
			{ team: "Stores", change: prefill ? 'one tap more on each "doesn\'t fit" return.' : 'about 20 seconds more on each "doesn\'t fit" return.' },
			{ team: "Returns team", change: "a weekly list to the catalog team." },
			{ team: "Catalog team", change: "a new weekly routine, oldest vehicles first." },
		],
		realPeople: [
			{ question: "Will associates note the vehicle on busy days?", how: "a two-week trial in two stores." },
			{ question: "Do customers trust the fit list more once it's fuller?", how: "a short test with customers." },
		],
	};
}

/** The other directions' evaluations, by id. */
export const otherEvaluations: Record<string, (changes: FitCheckChanges) => EvaluationBody> = {
	"flag-returns": flagReturns,
	"checkout-check": checkoutCheck,
	"fit-data": fitData,
};
