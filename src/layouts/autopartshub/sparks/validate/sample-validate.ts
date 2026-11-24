import type { SparksReply } from "../workspace/workspace";
import type { FitCheckChanges } from "../prototype/fit-check-prototype";
import { otherEvaluations } from "./sample-evaluations";
import type { Evaluation, EvaluationExpert, EvaluationFinding, EvaluationScenario, PrototypeStop } from "./validate-panel";

/*
 * Evaluate for "Wrong-part returns" (prds/sparks-validate.md): the run and its results, which
 * depend on the prototype version evaluated (a fix changes the findings, the estimate and the read). What the AI would
 * supply: every number is illustrative, and nothing here is research with real people.
 */

/** The nine scenarios: situations built from patterns across AutoParts Co.'s customers and stores, never a real person. */
function scenariosFor(changes: FitCheckChanges): EvaluationScenario[] {
	return [
		{
			id: "brake-pads",
			label: "Brake pads · 2015 F-150",
			audience: "Customer",
			situation: "A do-it-yourself customer buys front brake pads for a 2015 Ford F-150 on a phone.",
			task: "Find brake pads that fit, on the first try.",
			outcome: "done",
			summary: 'Saved the vehicle, saw "Fits your 2015 Ford F-150" and added the right pads.',
			steps: [
				{ screen: "Vehicle picker", evaluation: "Five fields is a lot on a phone, but each is a familiar choice, and it's done once." },
				{ screen: "Product page", evaluation: "The fit message confirms the part fits before it goes in the cart." },
			],
		},
		{
			id: "oil-filter",
			label: "Wrong oil filter",
			audience: "Customer",
			situation: "A customer picks an oil filter that doesn't fit and needs the one that does.",
			task: "End up with a filter that fits.",
			outcome: "done",
			summary: 'Saw "Doesn\'t fit", then picked the filter under "Parts that fit".',
			steps: [
				{ screen: "Product page, a part that doesn't fit", evaluation: '"Add to cart" is replaced by "Doesn\'t fit your vehicle", so the wrong filter can\'t be bought by accident.' },
				{ screen: "Parts that fit", evaluation: "The filter that fits is one tap away." },
			],
		},
		{
			id: "hurry",
			label: "In a hurry",
			audience: "Customer",
			situation: "A customer in a hurry adds a part to the cart without reading much, on a phone.",
			task: "Buy the right part without slowing down.",
			outcome: "done",
			summary: changes.fitAbovePrice
				? "Saw the fit message right under the name, before the price."
				: "Got the right part, but the fit message sits below the price and is easy to miss when moving fast.",
			findings: ["fit-below-price"],
			steps: [
				{
					screen: "Product page",
					evaluation: changes.fitAbovePrice
						? "The fit message is the second thing on the page, so it's seen even at a glance."
						: 'The eye goes from the name to the price to "Add to cart"; the fit message below the price can be skipped.',
				},
			],
		},
		{
			id: "no-fit-data",
			label: "Spark plugs · older truck",
			audience: "Customer",
			situation: "A customer with an older truck looks at spark plugs that have no fit data.",
			task: "Find out whether the spark plugs fit.",
			outcome: changes.unsureHelp ? "done" : "struggled",
			summary: changes.unsureHelp
				? 'Saw "We\'re not sure this fits" and went to the fit list.'
				: 'Saw "We\'re not sure this fits" but had nowhere to go next, so left the page.',
			findings: ["unsure-dead-end"],
			steps: [
				{
					screen: "Product page, a part with no fit data",
					evaluation: changes.unsureHelp
						? '"See the fit list" and "Ask a store" give a next step right where the doubt is.'
						: "The message is honest, but it says to check the fit list without a way to get there.",
				},
			],
		},
		{
			id: "mechanic",
			label: "Pro mechanic",
			audience: "Customer",
			situation: "A professional mechanic orders two parts for a customer's car on a desktop.",
			task: "Check both parts fit the customer's car, not their own.",
			outcome: "done",
			summary: "Changed the vehicle to the customer's, then checked both parts.",
			steps: [
				{ screen: "Vehicle chip", evaluation: '"Change" is there, but someone switching cars all day would want more than one saved vehicle.' },
			],
		},
		{
			id: "first-time",
			label: "First-time buyer",
			audience: "Customer",
			situation: "A first-time buyer with no saved vehicle shops on a laptop.",
			task: "Buy a part that fits, starting from nothing.",
			outcome: "done",
			summary: "Was asked to add a vehicle first, and did.",
			steps: [{ screen: "Vehicle picker", evaluation: "Asking for the vehicle first is clear; the reason is said in one line." }],
		},
		{
			id: "store-call",
			label: "Call at the counter",
			audience: "Store staff",
			situation: 'A store associate answers a call asking "will this fit?" during a busy hour.',
			task: "Tell the customer whether the part fits.",
			outcome: "done",
			summary: "Looked the customer up by phone and saw the fit for the part.",
			steps: [{ screen: "Customer lookup", evaluation: "The saved vehicle answers the question without asking the customer to read out their VIN." }],
		},
		{
			id: "screen-reader",
			label: "Screen reader",
			audience: "Customer",
			access: "Screen reader",
			situation: "A customer using a screen reader checks whether brake pads fit.",
			task: "Hear whether the part fits before buying.",
			outcome: "done",
			summary: "The fit message is read with the part and makes sense on its own.",
			steps: [{ screen: "Product page", evaluation: 'The message is written out ("Fits your 2015 Ford F-150"), not shown by color alone.' }],
		},
		{
			id: "keyboard",
			label: "Keyboard only",
			audience: "Customer",
			access: "Keyboard only",
			situation: "A customer using only a keyboard saves a vehicle and adds a part.",
			task: "Do it all without a mouse.",
			outcome: "done",
			summary: "Every step works with Tab and Enter.",
			steps: [{ screen: "Vehicle picker and product page", evaluation: "Every field and button is reachable in order, with a visible focus." }],
		},
	];
}

/** The experts on "Fit check before you buy": AI agents in a role, each with a note where it looked. */
function expertsFor(changes: FitCheckChanges): EvaluationExpert[] {
	return [
		{
			id: "ux",
			label: "UX expert",
			focus: "Usability and the design system",
			notes: [
				{ screen: "Vehicle picker heading", note: "Five choices on a phone, but each is a familiar tile, and it's done once." },
				{
					screen: "Product page",
					note: changes.fitAbovePrice
						? "Under the name, the fit is seen before the price."
						: "The fit sits under the price. People decide at the price, so it's easy to miss.",
				},
				{ screen: "The cart", note: "The cart repeats the fit: reassuring at the last step." },
			],
			summary: changes.fitAbovePrice ? "Clear from start to finish." : "Clear, except the fit message's place on the product page.",
		},
		{
			id: "copy",
			label: "Copywriter",
			focus: "The words on each screen",
			notes: [
				{ screen: "Vehicle picker heading", note: '"Add your vehicle" says what; the line under it says why. Keep both.' },
				{ screen: "Product page, a part that doesn't fit", note: '"Doesn\'t fit your 2015 Ford F-150" names the vehicle. No doubt left.' },
				{
					screen: "Product page, a part with no fit data",
					note: changes.unsureHelp
						? '"See the fit list" and "Ask a store" say what to do next.'
						: '"We\'re not sure this fits" is honest, but doesn\'t say what to do next.',
				},
			],
			summary: changes.unsureHelp ? "Every message says what it means and what to do." : '"We\'re not sure this fits" needs a next step.',
		},
		{
			id: "engineer",
			label: "Engineer",
			focus: "What it needs to be built",
			notes: [
				{ screen: "Vehicle chip", note: "Saved vehicles come from Sales' customer accounts. Available." },
				{ screen: "Product page", note: "The fit reads the catalog's fit data, missing for about 1 in 8 parts on older vehicles." },
				{ screen: "Customer lookup", note: "Lookup by phone uses the store system's accounts. Available." },
			],
			summary: "Buildable with what AutoParts Co. has; the fit data gaps stay.",
		},
		{
			id: "data",
			label: "Data analyst",
			focus: "Business data and the measures",
			notes: [
				{ screen: "Product page", note: 'Where last year\'s vehicle selector was used, "doesn\'t fit" returns dropped the most.' },
				{ screen: "The cart", note: "This changes orders with a saved vehicle: about 6 in 10 online orders." },
			],
			summary: 'Likely to reach the 25% target on "doesn\'t fit" returns.',
		},
	];
}

/** The checks after the scenarios, in the order they run. */
const checks = ["Checking business data…", "Checking engineering context…", "Checking the design system…", "Checking how teams work…"];

function findingsFor(changes: FitCheckChanges): EvaluationFinding[] {
	const findings: EvaluationFinding[] = [
		{
			id: "fit-below-price",
			title: "The fit message sits below the price and is easy to miss",
			where: "Product page",
			severity: "Hurts",
			method: "AI simulation, 2 of 6 customer scenarios",
			fix: "Show the fit message right under the part's name, above the price.",
			status: changes.fitAbovePrice ? "fixed" : "open",
		},
		{
			id: "unsure-dead-end",
			title: '"We\'re not sure this fits" leaves people with no next step',
			where: "Product page, a part with no fit data",
			severity: "Hurts",
			method: "AI simulation, 1 of 6 customer scenarios",
			fix: 'Add "See the fit list" and "Ask a store" under it.',
			status: changes.unsureHelp ? "fixed" : "open",
		},
		{
			id: "fit-data-gaps",
			title: "Fit data is missing for about 1 in 8 parts on vehicles over 15 years old",
			where: "Every product page",
			severity: "Hurts",
			method: "Engineering context, catalog data",
			status: "open",
		},
	];
	if (changes.lightText)
		findings.push({
			id: "light-text",
			title: "Light gray secondary text fails the contrast standard",
			where: "Every screen",
			severity: "Hurts",
			method: "Design system",
			fix: "Use the design system's muted gray, which passes.",
			status: "open",
		});
	return findings;
}

/** What each finding's fix changes in the prototype, and how Sparks says it. */
export const sampleFixes: Record<string, { changes: FitCheckChanges; summary: string; version: string }> = {
	"fit-below-price": { changes: { fitAbovePrice: true }, summary: "the fit message is right under the part's name, above the price", version: "Fit message above the price" },
	"unsure-dead-end": { changes: { unsureHelp: true }, summary: '"We\'re not sure this fits" offers "See the fit list" and "Ask a store"', version: "A next step when the fit isn't known" },
	"flag-quality": { changes: { flagReminder: true }, summary: 'the flag reads "Check the fit first", as a reminder, not a warning', version: "Flag worded as a reminder" },
	"checkout-late": { changes: { cartCheck: true }, summary: "the fit is checked as parts go in the cart, so checkout has no surprises", version: "Fit checked in the cart" },
	"checkout-one-vehicle": { changes: { otherVehicle: true }, summary: 'checkout offers "Another vehicle", with its year, make and model', version: "Another vehicle at checkout" },
	"counter-slow": { changes: { counterPrefill: true }, summary: "the counter fills the vehicle in from the customer's account, so noting it is one tap", version: "Vehicle filled in at the counter" },
	"no-vehicle": { changes: { counterAskVehicle: true }, summary: "with no saved vehicle, the associate picks it at the counter", version: "Vehicle picked at the counter when none is saved" },
	"light-text": { changes: { lightText: false }, summary: "secondary text is back to the design system's muted gray", version: "Muted gray text, as the design system has it" },
};

/**
 * Where each direction's scenarios go on its prototype, for their agents (prds/sparks-validate.md, "Running it"): a
 * step's screen, by name, is a screen of the prototype (its place in the direction's screens), the part it opens on
 * and the element (a `data-point` or `data-agent` id). And where each finding happens, for its marker; a finding about
 * the data or every screen has none. What the AI would supply along with the steps.
 */
const sampleStops: Record<string, { screens: Record<string, PrototypeStop>; findings: Record<string, PrototypeStop> }> = {
	"fit-check": {
		screens: {
			"Vehicle picker": { view: 0, element: "save-vehicle" },
			"Vehicle picker and product page": { view: 0, element: "save-vehicle" },
			"Product page": { view: 1, element: "fit-message" },
			"Product page, a part that doesn't fit": { view: 2, element: "fit-message" },
			"Parts that fit": { view: 2, element: "fits-instead" },
			"Product page, a part with no fit data": { view: 1, part: "spark-plugs", element: "fit-message" },
			"Vehicle chip": { view: 1, element: "vehicle-chip" },
			"Customer lookup": { view: 4, element: "look-up" },
			"Vehicle picker heading": { view: 0, element: "vehicle-title" },
			"The cart": { view: 3, element: "place-order" },
		},
		findings: {
			"fit-below-price": { view: 1, element: "fit-message" },
			"unsure-dead-end": { view: 1, part: "spark-plugs", element: "fit-message" },
		},
	},
	"flag-returns": {
		screens: {
			"Search results": { view: 0, element: "return-flag" },
			"The search results and a flagged part": { view: 0, element: "return-flag" },
			"The part page": { view: 1, element: "fit-list" },
			"Search results count": { view: 0, element: "results-title" },
			"The cart": { view: 2, element: "cart-title" },
		},
		findings: {
			"flag-no-answer": { view: 1, element: "fit-list" },
			"flag-quality": { view: 0, element: "return-flag" },
		},
	},
	"checkout-check": {
		screens: {
			Checkout: { view: 2, element: "fit-message" },
			"The cart": { view: 1, element: "go-to-checkout" },
			"Order lookup": { view: 3, element: "look-up" },
			"The shop": { view: 0, element: "shop-title" },
			"Place order": { view: 2, element: "place-order" },
		},
		findings: {
			"checkout-late": { view: 2, element: "fit-message" },
			"checkout-one-vehicle": { view: 2, element: "checkout-title" },
		},
	},
	"fit-data": {
		screens: {
			"The return screen": { view: 1, element: "note-vehicle" },
			"The weekly list": { view: 2, element: "weekly-title" },
			"The fit list": { view: 3, element: "fit-list-title" },
			"The walkthrough": { view: 0, element: "walkthrough-title" },
		},
		findings: {
			"counter-slow": { view: 1, element: "note-vehicle" },
			"no-vehicle": { view: 1, element: "return-title" },
			"monthly-feed": { view: 3, element: "fit-list-title" },
		},
	},
};

/** The evaluation with where its agents go and where its findings' markers sit. */
function withStops(evaluation: Evaluation, directionId: string): Evaluation {
	const stops = sampleStops[directionId];
	if (!stops) return evaluation;
	return {
		...evaluation,
		scenarios: evaluation.scenarios.map((s) => ({ ...s, steps: s.steps.map((step) => ({ ...step, at: step.at ?? stops.screens[step.screen] })) })),
		findings: evaluation.findings.map((f) => ({ ...f, at: f.at ?? stops.findings[f.id] })),
		experts: evaluation.experts?.map((e) => ({ ...e, notes: e.notes.map((n) => ({ ...n, at: n.at ?? stops.screens[n.screen] })) })),
	};
}

/**
 * The evaluation of a prototype version: its changes decide the scenarios' outcomes, the findings, the estimate and the
 * read. `previous` (the last finished run) gives "Since the last run".
 */
export function sampleEvaluation(changes: FitCheckChanges, version: number, previous?: Evaluation, directionId = "fit-check"): Evaluation {
	return withStops(evaluationFor(changes, version, previous, directionId), directionId);
}

function evaluationFor(changes: FitCheckChanges, version: number, previous: Evaluation | undefined, directionId: string): Evaluation {
	const other = otherEvaluations[directionId];
	if (other) {
		// Another direction: its own evaluation, plus what every run adds.
		const body = other(changes);
		const findings = [
			...body.findings.map((f) => ({ ...f, fixable: f.id in sampleFixes })),
			...(changes.lightText
				? [{ id: "light-text", title: "Light gray secondary text fails the contrast standard", where: "Every screen", severity: "Hurts" as const, method: "Design system", fix: "Use the design system's muted gray, which passes.", fixable: true, status: "open" as const }]
				: []),
		];
		return { ...body, findings, version, checks, sinceLast: sinceLastFor(previous, findings, body.measures[0].estimate) };
	}
	const scenarios = scenariosFor(changes);
	const findings = findingsFor(changes).map((f) => ({ ...f, fixable: Boolean(f.fix) }));
	const customer = scenarios.filter((s) => s.audience === "Customer" && !s.access);
	const firstTry = customer.filter((s) => s.outcome === "done").length;
	const fixedCount = [changes.fitAbovePrice, changes.unsureHelp].filter(Boolean).length;
	const range = ["30–45%", "33–48%", "35–50%"][fixedCount];
	const fixable = findings.filter((f) => f.status === "open" && f.fix);
	const read = fixable.length ? "Ready with changes" : "Ready for review";
	const readText = fixable.length
		? `It mostly holds up: business data and the scenarios suggest ${range} fewer "doesn't fit" returns, which reaches your 25% target. ${fixable.length === 1 ? "One thing is" : `${["", "", "Two", "Three", "Four"][fixable.length] ?? fixable.length} things are`} worth fixing first: ${fixable.map((f) => f.title.charAt(0).toLowerCase() + f.title.slice(1)).join("; ")}.`
		: `Nothing found that blocks it: business data and the scenarios suggest ${range} fewer "doesn't fit" returns, which reaches your 25% target. One thing goes to review as a known issue: the gaps in fit data for older vehicles, which the catalog team would need to fill.`;
	const sinceLast = sinceLastFor(previous, findings, `Likely ${range} fewer`);
	return {
		version,
		read,
		readText,
		hypothesis: {
			outcome: "Business data supports hypothesis · Simulation supports hypothesis",
			note: "Based on business data and simulated scenarios. Real-user testing is recommended before implementation.",
			text: `We believed that showing on every product page whether a part fits the customer's saved vehicle would cut wrong-part purchases: 25% fewer "doesn't fit" returns within 3 months of launch. Business data and the scenarios suggest ${range} fewer. In ${firstTry} of ${customer.length} customer scenarios, the right part was chosen on the first try.`,
		},
		measures: [
			{
				name: 'Main measure: online orders returned as "doesn\'t fit"',
				estimate: `Likely ${range} fewer`,
				reachesTarget: true,
				confidence: "Medium",
				method: "Business data analysis and AI simulation",
				why: `Customers who used last year's vehicle selector returned far fewer parts as "doesn't fit", and the right part was chosen on the first try in ${firstTry} of ${customer.length} customer scenarios.`,
			},
			{
				name: "Also watching: repeat purchases",
				estimate: "Unclear",
				confidence: "Low",
				method: "Business data analysis",
				why: "No starting point yet: returns aren't matched to later orders.",
			},
			{
				name: "Must not get worse: online sales",
				estimate: "Likely unchanged",
				status: "Watch",
				method: "AI simulation",
				why: 'Checking the fit adds no step, but "Doesn\'t fit" on a part could send some customers elsewhere.',
			},
		],
		findings,
		scenarios,
		experts: expertsFor(changes),
		assumptions: [
			{
				text: "Customers will save their vehicle.",
				status: "Still unknown",
				evidence: "The scenarios assume they do. A short test with real customers, or a small live trial, would show how many.",
			},
			{
				text: "Fit data covers most parts customers buy.",
				status: "Supported",
				evidence: "About 7 in 8 parts have fit data for vehicles under 15 years old (engineering context, catalog data).",
			},
			{
				text: "Customers who return a part that doesn't fit buy less from us afterwards.",
				status: "Still unknown",
				evidence: "Returns aren't matched to later orders yet; the returns team could match them, as planned in what success looks like.",
			},
		],
		build: [
			"Saved vehicles: available from Sales (customer accounts).",
			"Fit data: available from the catalog, but missing for about 1 in 8 parts on vehicles over 15 years old.",
			"Product pages: can't change until early January (holiday freeze).",
			...(changes.liveStock ? ["Stock at the nearest store: not available. Stores don't report stock in real time (engineering context), so it stays pretend."] : []),
			"Rough effort: Medium, as estimated in Plan.",
		],
		design: [
			"Built with the design system's components: buttons, badges and form fields.",
			changes.lightText
				? "Light gray secondary text departs from the design system (you kept it): it fails the contrast standard."
				: "Text contrast meets the standard.",
			"Screen reader: the fit message is read with the part and makes sense on its own.",
			"Keyboard only: every step works with Tab and Enter.",
		],
		teams: [
			{ team: "Stores", change: 'fewer "will this fit?" calls; associates need to know what "We\'re not sure this fits" means.' },
			{ team: "Catalog team", change: "gaps in fit data become visible to customers, so filling them matters more." },
			{ team: "Web team", change: "a fit check on every product page, using saved vehicles." },
		],
		realPeople: [
			{ question: "Do customers trust the fit message enough to buy without checking elsewhere?", how: "a short test of the prototype with 5 to 8 customers." },
			{ question: "Do professional mechanics want a saved vehicle, or do they switch cars all day?", how: "interviews with a few mechanics who order often." },
			{ question: "Do associates use the counter lookup on busy days?", how: "a trial in two stores." },
		],
		checks,
		sinceLast,
	};
}

/** What changed since the last run: findings fixed, and the main estimate now. */
function sinceLastFor(previous: Evaluation | undefined, findings: EvaluationFinding[], estimate: string) {
	if (!previous) return undefined;
	const wasOpen = previous.findings.filter((f) => f.status === "open");
	const nowFixed = wasOpen.filter((f) => findings.find((g) => g.id === f.id)?.status !== "open").length;
	return `${nowFixed} of ${wasOpen.length} findings fixed. "Doesn't fit" returns: now ${estimate.charAt(0).toLowerCase()}${estimate.slice(1)}.`;
}

/** Before the scenarios, and after the checks: the same for every run. */
const runStart = (evaluation: Evaluation) => [
	"Reading your prototype and your target",
	"Picking the customers and stores to try it as",
	`Writing ${evaluation.scenarios.length} scenarios`,
];
const runEnd = ["Reading the results", "Comparing them with your target"];

/** Everything Sparks does in a run, in order: getting ready, each scenario, each check, then the conclusions. */
const runSteps = (evaluation: Evaluation) => [
	...runStart(evaluation),
	...evaluation.scenarios.map((scenario) => scenario.situation.replace(/\.$/, "")),
	...evaluation.checks.map((check) => check.replace(/…$/, "")),
	...runEnd,
];

/** A run has finished at this step (how many of its steps are done). */
export const sampleRunFinished = (evaluation: Evaluation, step: number) => step >= runSteps(evaluation).length;

/** How far the results are at a step, for the panel: whether the scenarios have begun, and how many parts (scenarios, then checks) are done. */
export function sampleRunResults(evaluation: Evaluation, step: number) {
	const done = step - runStart(evaluation).length;
	return { begun: done >= 0, done: Math.min(Math.max(done, 0), evaluation.scenarios.length + evaluation.checks.length) };
}

/** How long a step takes in the demo, in milliseconds, a little more or less each time. */
export const sampleRunStepMs = () => Math.round(1000 * (1 + Math.random() * 0.3));

/**
 * Sparks's progress while it runs (`step`: how many steps are done), with one status for each stage; then done (or
 * stopped). While the agents work, all at once (prds/sparks-validate.md, "The agents"): each agent as it finishes
 * (`finished`, in that order), then the screen they're on now (`screen`), in progress, until `agentsDone`.
 */
export function sampleRunProgress(
	evaluation: Evaluation,
	step: number,
	{
		stopped = false,
		seconds = 22,
		finished = [],
		agentsDone = false,
		screen,
	}: { stopped?: boolean; seconds?: number; finished?: string[]; agentsDone?: boolean; screen?: { label: string; agents: number } } = {},
) {
	const start = runStart(evaluation);
	const { begun, done } = sampleRunResults(evaluation, step);
	const scenarios = evaluation.scenarios.length;
	const checks = evaluation.checks.length;
	const agents = scenarios + (evaluation.experts?.length ?? 0);
	const finishedLines = finished.flatMap((id) => {
		const scenario = evaluation.scenarios.find((s) => s.id === id);
		if (scenario) return [`${scenario.label}: ${scenario.outcome === "done" ? "got it done" : "struggled"}`];
		const expert = evaluation.experts?.find((e) => e.id === id);
		return expert ? [`${expert.label}: ${expert.notes.length} ${expert.notes.length === 1 ? "note" : "notes"}`] : [];
	});
	const working = begun && !agentsDone;
	const checksDone = Math.max(0, done - scenarios);
	const ended = step >= runSteps(evaluation).length;
	const steps = !begun
		? start.slice(0, stopped ? step : step + 1)
		: [
				...start,
				...finishedLines,
				...(working && screen && !stopped ? [`On ${screen.label}: ${screen.agents} ${screen.agents === 1 ? "agent" : "agents"} at work`] : []),
				...(working ? [] : evaluation.checks.slice(0, Math.min(checks, checksDone + (stopped ? 0 : 1))).map((check) => check.replace(/…$/, ""))),
				...(checksDone >= checks ? runEnd.slice(0, Math.min(runEnd.length, step - start.length - scenarios - checks + (stopped || ended ? 0 : 1))) : []),
			];
	return {
		status: !begun
			? "Planning the test drive…"
			: working
				? `Test-driving it with ${agents} agents…`
				: checksDone < checks
					? `Running ${checks} checks…`
					: "Reading the results off the dyno…",
		steps,
		done: stopped || ended,
		stopped,
		doneLabel: stopped ? `Stopped before finishing: ${finished.length} of ${agents} agents done.` : `Evaluated in ${seconds}s`,
	};
}

/**
 * "Yes, evaluate it" (or "Evaluate it" in Review): Evaluate opens and the run starts there, beside the prototype, with
 * no conversation (prds/sparks-validate.md, "Running it"). Sparks's answer stays in the step she asked from.
 */
export const sampleValidateStartedReply: SparksReply = {
	id: "validate-started",
	from: "sparks",
	parts: [{ kind: "text", text: "On it. I'm trying it in Evaluate: the scenarios work the prototype there, and the results come in beside it." }],
};

/** Going back to the choice in Plan: offered when the read is "Needs another look". */
export const sampleBackToChoice = "Go back to the choice";

/** "Add to Review": open findings go as known issues, said once, at the top of what Sparks says in Review. */
export function sampleValidateGoAheadOpening(open: number) {
	const issues =
		open > 0 ? `${open === 1 ? "One finding is" : `${["", "", "Two", "Three", "Four"][open] ?? open} findings are`} still open. ${open === 1 ? "It goes" : "They'll go"} to review as known issues.\n\n` : "";
	return `${issues}Done. Evaluate is finished, and the evaluation is in your plan.\n\n`;
}
