import type { FitCheckChanges } from "../prototype/fit-check-prototype";
import { directionPrototypes } from "../prototype/direction-prototypes";
import type { Evaluation } from "../validate/validate-panel";
import type { ConceptForReview, Reviewer } from "./review-panel";

/*
 * Review, direction by direction (prds/sparks-review.md): what differs with the direction Dana chose. The user stories,
 * what the prototype pretends, who reviews it and what they say, what Sparks proposes after the reviews, its
 * recommendation and the decision. What the AI and the people involved would supply: all of it is simulated.
 */

/** What the decision owner decided: advance, iterate in Evaluate (it wasn't tested), or go back to the choice in Plan. */
export type ReviewDecision = { kind: "advance" | "iterate-validate" | "iterate-choice"; reason: string };

/** A change to the prototype that Sparks proposes after the reviews. */
type PrototypeChange = { changes: FitCheckChanges; version: string; done: string };

export type ReviewProfile = {
	stories: (changes: FitCheckChanges) => ConceptForReview["stories"];
	/** What's pretend and the sample data, after the version line. */
	prototype: (changes: FitCheckChanges) => string[];
	reviewers: Reviewer[];
	views: (changes: FitCheckChanges) => Record<string, Pick<Reviewer, "view" | "why">>;
	/** "All four teams would advance it…": the reviews in one sentence. */
	verdict: (changes: FitCheckChanges) => string;
	/** The reviews, grouped by topic. */
	topics: (changes: FitCheckChanges) => string[];
	/** The prototype change Sparks proposes after the reviews, if any. */
	prototypeChange: (changes: FitCheckChanges) => (PrototypeChange & { proposal: string }) | undefined;
	/** The open question Sparks proposes adding after the reviews. */
	question: (changes: FitCheckChanges) => string;
	/** Engineering's effort, replacing Sparks's rough one. */
	effort: { short: string; line: string };
	/** What the invitation asks of engineering. */
	ask: string;
	/**
	 * "For engineering to check": what Sparks couldn't settle about building it (speed, systems, data), each with how to
	 * check it ("… How: …"), as "For the UX team to test with real people" does for the experience.
	 */
	engineering: string[];
	openQuestions: string[];
	/**
	 * Once it's advanced and shared: what someone on the team who builds it flags as unclear (an acceptance criterion),
	 * and the clarification Sparks proposes: the words it replaces in the criterion, and where they come from.
	 */
	buildFlag?: { part: string; text: string; from: string; to: string; why: string };
	/** The recommendation once it's been evaluated. */
	recommendation: (evaluation: Evaluation) => string;
	decision: (evaluation: Evaluation) => ReviewDecision;
};

/** "What's pretend" and the sample data, as the plan's Prototype section says them. */
const prototypeLines = (directionId: string, changes: FitCheckChanges) => {
	const built = directionPrototypes[directionId];
	const pretend = built.pretend(changes).map((item) => item.replace(/\.$/, "").toLowerCase());
	return [`What's pretend: ${pretend.length > 1 ? `${pretend.slice(0, -1).join(", ")} and ${pretend[pretend.length - 1]}` : pretend[0]}.`, `Sample data: ${built.sampleData}`];
};

const rangeOf = (evaluation: Evaluation) =>
	evaluation.measures[0].estimate
		.replace(/^Likely /, "")
		.replace(/ fewer.*$/, "")
		.trim();

const ux = (evaluates = "the experience, the design notes and what to test with real people"): Reviewer => ({
	id: "ux",
	department: "UX team",
	evaluates,
	status: "invited",
});
const eng: Reviewer = { id: "eng", department: "Engineering", evaluates: "whether it can be built as described, what's missing and the effort", status: "invited" };

const fitCheck: ReviewProfile = {
	stories: (changes) => {
		const fits = changes.vehicleFirst ? '"2015 Ford F-150: fits"' : '"Fits your 2015 Ford F-150"';
		return [
			{
				story: "As a customer buying online, I add my vehicle once, so every part can say whether it fits.",
				criteria: [
					"Given no saved vehicle, when I open the shop, then I'm asked to add one: with its VIN, a past repair invoice, or its year, make, model, trim and engine.",
					"Given a vehicle read from a VIN or an invoice, then I'm asked if it's mine before it's saved.",
					'Given I save a vehicle, then it shows at the top of every page with "Change".',
				],
			},
			{
				story: "As a customer buying online, I see whether a part fits my saved vehicle before I add it to the cart.",
				criteria: [
					`Given a saved 2015 Ford F-150, when a part that fits opens, then the page says ${fits}${changes.fitAbovePrice ? ", right under the part's name" : ""}.`,
					'Given a part that doesn\'t fit, then the page says it doesn\'t fit, "Add to cart" is unavailable, and parts that fit are listed.',
					`Given a part with no fit data for my vehicle, then the page says "We're not sure this fits" and why${changes.unsureHelp ? ', with "See the fit list" and "Ask a store"' : ""}.`,
				],
			},
		];
	},
	prototype: (changes) => prototypeLines("fit-check", changes),
	// The UX team, engineering and the catalog team (the fit data it depends on). Not stores.
	reviewers: [ux(), eng, { id: "catalog", department: "Catalog team", evaluates: "the fit data it depends on", status: "invited" }],
	views: (changes) => ({
		ux: changes.fitAbovePrice
			? { view: "Advance", why: "The fit message is easy to see now. Test it with customers before building." }
			: { view: "Advance with changes", why: "Move the fit message above the price: customers in a hurry miss it." },
		eng: { view: "Advance", why: "Saved vehicles are there; reading VINs and invoices is new. About 6 weeks for the web team, after the holiday freeze." },
		catalog: { view: "Advance with changes", why: "We can fill the fit data gaps for older vehicles, but we need a date and someone to own it." },
	}),
	verdict: (changes) => `All three teams would advance it, ${changes.fitAbovePrice ? "one" : "two"} of them with changes.`,
	topics: (changes) => [
		changes.fitAbovePrice
			? "**The fit message:** everyone's fine with it as it is; the UX team wants it tested with customers before the build."
			: "**The fit message:** the UX team wants it above the price, so customers in a hurry see it.",
		"**Building it:** engineering confirms saved vehicles, and gives about 6 weeks for the web team, after the holiday freeze.",
		"**Fit data:** the catalog team can fill the gaps for older vehicles, but needs a date and an owner.",
	],
	prototypeChange: (changes) =>
		changes.fitAbovePrice
			? undefined
			: {
					proposal: "Move the fit message above the price, as the UX team asks. It changes the prototype, so Evaluate will need a check.",
					changes: { ...changes, fitAbovePrice: true },
					version: "Fit message above the price, from the UX team's review",
					done: "the fit message is above the price",
				},
	question: () => "Who fills the fit data gaps for older vehicles, and by when?",
	effort: { short: "about 6 weeks", line: "Effort: about 6 weeks for the web team, after the holiday freeze (from engineering)." },
	ask: "From engineering, I'd most like your view on the fit data.",
	engineering: [
		"Can every product page ask the catalog whether a part fits the saved vehicle without slowing the page down? How: a load test with a busy day's traffic.",
		"Reading VINs and invoices: build it, or use an outside service? How: a short spike comparing the two.",
		"Where saved vehicles live: in the customer accounts Sales already has, or somewhere new? How: a check with the Sales accounts team.",
	],
	openQuestions: ["Do professional mechanics need more than one saved vehicle?"],
	buildFlag: {
		part: "What people need to do (user stories), and how to know it’s done (acceptance criteria)",
		text: 'What counts as "no fit data"? No fit list at all, or a list with my model but not my trim or engine? They\'re different checks.',
		from: "Given a part with no fit data for my vehicle,",
		to: "Given a part whose fit list has my vehicle's model but not its trim or engine, or that has no fit list at all,",
		why: 'From the prototype: its "We\'re not sure this fits" message says the fit data doesn\'t cover the vehicle\'s trim and engine.',
	},
	recommendation: (evaluation) =>
		`I'd recommend advancing, with real-user testing first. The simulation and business data support the hypothesis: "doesn't fit" returns are likely to drop ${rangeOf(evaluation)}, against a target of 25%. That's based on simulated scenarios, so the UX team's test of the fit message with real customers should come before the build. All three reviewing teams support it.`,
	decision: () => ({
		kind: "advance",
		reason: "Advance. The case is clear and honest about what's still simulated. Test the fit message with customers first, as recommended.",
	}),
};

const flagReturns: ReviewProfile = {
	stories: (changes) => [
		{
			story: "As a customer buying online, I see in search results which parts often come back, so I check the fit before I buy.",
			criteria: [
				`Given a part that comes back as "doesn't fit" more than 1 in 10 times, when it shows in search results, then it's marked "${changes.flagReminder ? "Check the fit first" : "Often returned"}", in words, not color alone.`,
				"Given a part that doesn't, then nothing is marked.",
			],
		},
		{
			story: "As a customer buying online, I can check the fit of a flagged part from its page.",
			criteria: ["Given a flagged part, when I open it, then the page says how often it comes back and links to its fit list.", "When I open the fit list, then I see every vehicle it fits."],
		},
		{
			story: "As the returns team, I keep the counts behind the flag right.",
			criteria: ['Given the week\'s returns, when the flags update, then only "doesn\'t fit" returns count.'],
		},
	],
	prototype: (changes) => prototypeLines("flag-returns", changes),
	reviewers: [
		ux("the experience, how the flag reads, and what to test with real people"),
		eng,
		{ id: "stores", department: "Stores", evaluates: "calls about flagged parts", status: "invited" },
		{ id: "returns", department: "Returns team", evaluates: "the return counts behind the flag", status: "invited" },
	],
	views: (changes) => ({
		ux: changes.flagReminder
			? { view: "Don't advance yet", why: "The reminder reads better, but it still raises the fit question without answering it." }
			: { view: "Don't advance yet", why: "The flag can read as \"this part is bad\". It raises the fit question without answering it." },
		eng: { view: "Advance", why: "Return counts are there. About 2 weeks for the web team, before the holiday freeze." },
		stores: { view: "Advance with changes", why: "We'll get calls asking why a part is flagged. We need a line to answer them with." },
		returns: { view: "Advance with changes", why: 'Our counts mix return reasons. We can separate "doesn\'t fit", but it takes a month.' },
	}),
	verdict: () => "The teams are split: engineering would advance it, stores and the returns team only with changes, and the UX team not yet.",
	topics: (changes) => [
		changes.flagReminder
			? "**The flag:** the UX team says the reminder reads better but still doesn't answer whether a part fits; stores expect calls about it."
			: "**The flag:** the UX team thinks customers may read it as a warning about quality; stores expect calls about it.",
		"**Building it:** engineering gives about 2 weeks for the web team, before the holiday freeze.",
		'**The counts:** the returns team can count only "doesn\'t fit" returns, but needs a month to set it up.',
	],
	prototypeChange: (changes) =>
		changes.flagReminder
			? undefined
			: {
					proposal: 'Word the flag as a reminder, "Check the fit first", as the UX team suggests. It changes the prototype, so Evaluate will need a check.',
					changes: { ...changes, flagReminder: true },
					version: "Flag worded as a reminder, from the UX team's review",
					done: 'the flag reads "Check the fit first"',
				},
	question: () => 'Can the counts include only "doesn\'t fit" returns before launch?',
	effort: { short: "about 2 weeks", line: "Effort: about 2 weeks for the web team, before the holiday freeze (from engineering)." },
	ask: "From engineering, I'd most like your view on the return counts.",
	engineering: [
		"Can the return counts be split by reason, so only \"doesn't fit\" returns count? How: a query on last quarter's returns.",
		"Can search results read the counts without slowing down, and how fresh do they need to be? How: a load test on search.",
	],
	openQuestions: ['How should the flag be worded so it reads as a reminder, not a warning?'],
	recommendation: (evaluation) =>
		`I'd recommend going back to the choice. Business data and the simulation are inconclusive: "doesn't fit" returns would likely drop ${rangeOf(evaluation)}, below the 25% target, and ${evaluation.findings.some((f) => f.id === "flag-quality" && f.status === "fixed") ? "even worded as a reminder, the flag doesn't say whether a part fits" : "the UX team worries the flag reads as a warning about quality"}. It's quick to build, so it could still come later, alongside a fit check.`,
	decision: () => ({
		kind: "iterate-choice",
		reason: "It's quick, but it won't reach the target on its own. Look again at a fit check, and keep this as a possible add-on.",
	}),
};

const checkoutCheck: ReviewProfile = {
	stories: (changes) => [
		{
			story: "As a customer buying online, I find out at checkout whether everything in my cart fits my vehicle.",
			criteria: [
				"Given a saved vehicle, when I check out, then every item says whether it fits.",
				"Given no saved vehicle, when I check out, then I'm asked for it first: year, make, model, trim and engine.",
				...(changes.cartCheck ? ["Given a saved vehicle, when I add a part to the cart, then it says whether it fits, with a swap if it doesn't."] : []),
				...(changes.otherVehicle ? ['Given the parts are for another car, when I pick "Another vehicle" at checkout with its year, make and model, then everything is checked against it.'] : []),
			],
		},
		{
			story: "As a customer buying online, I swap a part that doesn't fit without leaving checkout.",
			criteria: [
				'Given an item that doesn\'t fit, then checkout says so and offers the part that fits, with "Swap".',
				'Given an item with no fit data for my vehicle, then checkout says "We\'re not sure this fits" and why.',
			],
		},
	],
	prototype: (changes) => prototypeLines("checkout-check", changes),
	reviewers: [
		ux(),
		eng,
		{ id: "stores", department: "Stores", evaluates: "orders with swapped parts and fit calls after buying", status: "invited" },
		{ id: "catalog", department: "Catalog team", evaluates: "the fit data it depends on", status: "invited" },
	],
	views: (changes) => ({
		ux: changes.cartCheck
			? { view: "Advance", why: "Checked in the cart, checkout has no surprises. Test it with customers before building." }
			: { view: "Advance with changes", why: "Check the fit as parts go in the cart, so checkout has no surprises." },
		eng: { view: "Advance", why: "Saved vehicles are there, and checkout isn't frozen. About 4 weeks for the web team, before January." },
		stores: { view: "Advance", why: "Seeing the swap on the order helps us explain it." },
		catalog: { view: "Advance with changes", why: "Gaps in fit data show up at checkout now. We need a date and an owner to fill them." },
	}),
	verdict: (changes) => `All four teams would advance it, ${changes.cartCheck ? "one" : "two"} of them with changes.`,
	topics: (changes) => [
		changes.cartCheck
			? "**The warning:** with the fit checked in the cart, everyone's fine with it; the UX team wants it tested with customers before the build."
			: "**The late warning:** the UX team wants the fit checked as parts go in the cart, so checkout has no surprises; stores are fine with it as it is.",
		"**Building it:** engineering confirms saved vehicles, and gives about 4 weeks for the web team, before January.",
		"**Fit data:** the catalog team can fill the gaps for older vehicles, but needs a date and an owner.",
	],
	prototypeChange: (changes) =>
		changes.cartCheck
			? undefined
			: {
					proposal: "Check the fit as parts go in the cart, as the UX team asks. It changes the prototype, so Evaluate will need a check.",
					changes: { ...changes, cartCheck: true },
					version: "Fit checked in the cart, from the UX team's review",
					done: "the fit is checked as parts go in the cart",
				},
	question: () => "Who fills the fit data gaps for older vehicles, and by when?",
	effort: { short: "about 4 weeks", line: "Effort: about 4 weeks for the web team, before January (from engineering)." },
	ask: "From engineering, I'd most like your view on changing checkout before January.",
	engineering: [
		"Can checkout check each part against the saved vehicle and offer a swap without slowing the order down? How: a load test on checkout.",
		"Can the order system change a part at checkout? How: a check with the orders team.",
	],
	openQuestions: [],
	recommendation: (evaluation) =>
		`I'd recommend advancing, with a small live test first. Business data supports the hypothesis: "doesn't fit" returns are likely to drop ${rangeOf(evaluation)}, against a target of 25%. ${
			evaluation.findings.some((f) => f.id === "checkout-late" && f.status === "fixed")
				? "With the fit checked in the cart, no one gave up the order in the scenarios, but that's simulated, so a live test with a share of orders should confirm online sales hold before it goes to everyone."
				: "But the simulation suggests some customers give up the order at the warning, so a live test with a share of orders should show what happens to online sales before it goes to everyone."
		} All four reviewing teams support it.`,
	decision: () => ({
		kind: "advance",
		reason: "Advance, with the live test first. If online sales drop, we stop and look again at checking the fit earlier.",
	}),
	buildFlag: {
		part: "What people need to do (user stories), and how to know it’s done (acceptance criteria)",
		text: 'What counts as "no fit data"? No fit list at all, or a list with my model but not my trim or engine? They\'re different checks.',
		from: "Given an item with no fit data for my vehicle,",
		to: "Given an item whose fit list has my vehicle's model but not its trim or engine, or that has no fit list at all,",
		why: 'From the prototype: its "We\'re not sure this fits" message says the fit data doesn\'t cover the vehicle\'s trim and engine.',
	},
};

const fitData: ReviewProfile = {
	stories: (changes) => [
		{
			story: 'As a store associate, I note which vehicle a part didn\'t fit when I take back a "doesn\'t fit" return.',
			criteria: [
				changes.counterPrefill
					? "Given the customer's account has a saved vehicle, when I take the return, then the vehicle is filled in and I confirm it with one tap."
					: "Given the customer's account has a saved vehicle, when I find the account by phone number, then I pick the vehicle it was for.",
				changes.counterAskVehicle
					? "Given it has none, then I ask the customer and pick the vehicle at the counter: year, make and model."
					: "Given it has none, then the return goes on without a vehicle.",
			],
		},
		{
			story: "As the catalog team, I get one list a week of parts and the vehicles they didn't fit, oldest vehicles first.",
			criteria: ["Given the week's notes from every store, on Monday, then they're one list, oldest vehicles first.", 'When I fix a line, then it\'s marked "Fixed" with the date.'],
		},
		{
			story: "As a customer buying online, I see a fuller fit list on the product page.",
			criteria: ['Given a fit fixed this week, when I open the fit list, then the vehicle shows, marked "Added this week".'],
		},
	],
	prototype: (changes) => prototypeLines("fit-data", changes),
	reviewers: [
		ux("the counter screen, the weekly list, and what to test with real people"),
		eng,
		{ id: "stores", department: "Stores", evaluates: "what changes at the counter", status: "invited" },
		{ id: "catalog", department: "Catalog team", evaluates: "the weekly routine and the supplier feed", status: "invited" },
	],
	views: (changes) => ({
		ux: changes.counterPrefill
			? { view: "Advance", why: "One tap at the counter is right. Try it in two stores before rolling it out." }
			: { view: "Advance with changes", why: "Fill the vehicle in from the customer's account, so it's one tap at the counter." },
		eng: { view: "Advance", why: "Return reasons are there; the vehicle field is new. About 3 weeks, plus the catalog team's time." },
		stores: changes.counterPrefill
			? { view: "Advance", why: "One tap we can do, even on a busy Saturday." }
			: { view: "Don't advance yet", why: "On a busy Saturday, 20 more seconds per return is too much. We'd skip it." },
		catalog: { view: "Advance with changes", why: "We can do a weekly list, but fixes only reach customers with the monthly supplier feed." },
	}),
	verdict: (changes) =>
		changes.counterPrefill
			? "All four teams would advance it, one of them with changes."
			: "The teams are split: engineering would advance it, the UX team and the catalog team only with changes, and stores not yet.",
	topics: (changes) => [
		changes.counterPrefill
			? "**At the counter:** with the vehicle filled in from the account, stores say one tap works even on busy days."
			: "**At the counter:** stores say 20 more seconds per return is too much on busy days; the UX team suggests filling the vehicle in from the account.",
		"**Building it:** engineering gives about 3 weeks, plus the catalog team's time each week.",
		"**Reaching customers:** the catalog team's fixes show only after the monthly supplier feed.",
	],
	prototypeChange: (changes) =>
		changes.counterPrefill
			? undefined
			: {
					proposal: "Fill the vehicle in from the customer's account at the counter, as the UX team suggests. It changes the prototype, so Evaluate will need a check.",
					changes: { ...changes, counterPrefill: true },
					version: "Vehicle filled in at the counter, from the UX team's review",
					done: "the counter fills the vehicle in from the customer's account",
				},
	question: () => "Can the supplier feed update weekly, so fixes reach customers sooner?",
	effort: { short: "about 3 weeks", line: "Effort: about 3 weeks for engineering, plus about a day a week for the catalog team (from engineering)." },
	ask: "From engineering, I'd most like your view on the counter screen.",
	engineering: [
		"Can the counter screen find the customer's account from the order fast enough at the counter? How: a test on the store system.",
		"Can the weekly list be built from return reasons and the supplier feed without anyone putting it together? How: a sample run on last month's returns.",
	],
	openQuestions: ["Who owns the weekly list once it's running?"],
	recommendation: (evaluation) =>
		`I'd recommend going back to the choice. It's low risk and fixes the cause, but business data and the simulation are inconclusive: "doesn't fit" returns would likely drop ${rangeOf(evaluation)} in 3 months, below the 25% target, and ${
			evaluation.findings.some((f) => f.id === "counter-slow" && f.status === "fixed")
				? "the counter works, but fixes wait for the monthly supplier feed"
				: "stores say they'd skip noting the vehicle on busy days"
		}. Paired with a fit check, or with a target over a year, it could be the right call.`,
	decision: () => ({
		kind: "iterate-choice",
		reason: "It's low risk, but it's too slow for a 3-month target. Pair it with a fit check, or set a target over a year, then bring it back.",
	}),
};

/** Review for each direction, by id. */
export const reviewProfiles: Record<string, ReviewProfile> = {
	"fit-check": fitCheck,
	"flag-returns": flagReturns,
	"checkout-check": checkoutCheck,
	"fit-data": fitData,
};

/** The profile for a direction (fit check when unknown). */
export const reviewProfileFor = (directionId?: string) => reviewProfiles[directionId ?? ""] ?? fitCheck;
