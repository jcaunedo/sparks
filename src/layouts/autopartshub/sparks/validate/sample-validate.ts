import type { SparksReply } from "../workspace/workspace";
import { sampleSummaryReplies } from "../plan/sample-success";
import type { FitCheckChanges } from "../prototype/fit-check-prototype";
import { otherEvaluations } from "./sample-evaluations";
import type { Evaluation, EvaluationFinding, EvaluationScenario } from "./validate-panel";

/*
 * Validate for "Wrong-part returns" (prds/sparks-validate.md): the evaluation plan, the run and its results, which
 * depend on the prototype version evaluated (a fix changes the findings, the estimate and the read). What the AI would
 * supply: every number is illustrative, and nothing here is research with real people.
 */

/** The nine scenarios: situations built from patterns across AutoParts Co.'s customers and stores, never a real person. */
function scenariosFor(changes: FitCheckChanges): EvaluationScenario[] {
	return [
		{
			id: "brake-pads",
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
			audience: "Customer",
			situation: "A customer in a hurry adds a part to the cart without reading much, on a phone.",
			task: "Buy the right part without slowing down.",
			outcome: "done",
			summary: changes.fitAbovePrice
				? "Saw the fit message right under the name, before the price."
				: "Got the right part, but the fit message sits below the price and is easy to miss when moving fast.",
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
			audience: "Customer",
			situation: "A customer with an older truck looks at spark plugs that have no fit data.",
			task: "Find out whether the spark plugs fit.",
			outcome: changes.unsureHelp ? "done" : "struggled",
			summary: changes.unsureHelp
				? 'Saw "We\'re not sure this fits" and went to the fit list.'
				: 'Saw "We\'re not sure this fits" but had nowhere to go next, so left the page.',
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
			audience: "Customer",
			situation: "A first-time buyer with no saved vehicle shops on a laptop.",
			task: "Buy a part that fits, starting from nothing.",
			outcome: "done",
			summary: "Was asked to add a vehicle first, and did.",
			steps: [{ screen: "Vehicle picker", evaluation: "Asking for the vehicle first is clear; the reason is said in one line." }],
		},
		{
			id: "store-call",
			audience: "Store staff",
			situation: 'A store associate answers a call asking "will this fit?" during a busy hour.',
			task: "Tell the customer whether the part fits.",
			outcome: "done",
			summary: "Looked the customer up by phone and saw the fit for the part.",
			steps: [{ screen: "Customer lookup", evaluation: "The saved vehicle answers the question without asking the customer to read out their VIN." }],
		},
		{
			id: "screen-reader",
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
	"flag-quality": { changes: { flagReminder: true }, summary: 'the flag reads "Check the fit for your vehicle", as a reminder, not a warning', version: "Flag worded as a reminder" },
	"checkout-late": { changes: { cartCheck: true }, summary: "the fit is checked as parts go in the cart, so checkout has no surprises", version: "Fit checked in the cart" },
	"checkout-one-vehicle": { changes: { otherVehicle: true }, summary: 'checkout offers "Another vehicle", with its year, make and model', version: "Another vehicle at checkout" },
	"counter-slow": { changes: { counterPrefill: true }, summary: "the counter fills the vehicle in from the customer's account, so noting it is one tap", version: "Vehicle filled in at the counter" },
	"no-vehicle": { changes: { counterAskVehicle: true }, summary: "with no saved vehicle, the associate picks it at the counter", version: "Vehicle picked at the counter when none is saved" },
	"light-text": { changes: { lightText: false }, summary: "secondary text is back to the design system's muted gray", version: "Muted gray text, as the design system has it" },
};

/**
 * The evaluation of a prototype version: its changes decide the scenarios' outcomes, the findings, the estimate and the
 * read. `previous` (the last finished run) gives "Since the last run".
 */
export function sampleEvaluation(changes: FitCheckChanges, version: number, previous?: Evaluation, directionId = "fit-check"): Evaluation {
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

/** How many parts a run has: the scenarios, then the checks. */
export const sampleRunParts = (evaluation: Evaluation) => evaluation.scenarios.length + evaluation.checks.length;

/** How long each part takes in the demo, in milliseconds. */
export const sampleRunStepMs = 600;

/** Sparks's progress while it runs: the scenario or check it's on, then done (or stopped). */
export function sampleRunProgress(evaluation: Evaluation, done: number, stopped = false) {
	const total = sampleRunParts(evaluation);
	const scenarios = evaluation.scenarios.length;
	if (stopped) return { text: `Stopped before finishing: ${done} of ${total} parts done.`, done: true };
	if (done >= total)
		return { text: `Finished: ${scenarios} scenarios and ${evaluation.checks.length} checks, on prototype version ${evaluation.version}.`, done: true };
	if (done < scenarios) {
		const situation = evaluation.scenarios[done].situation.replace(/\.$/, "");
		return { text: `Scenario ${done + 1} of ${scenarios}: ${situation.charAt(0).toLowerCase()}${situation.slice(1)}.`, done: false };
	}
	return { text: evaluation.checks[done - scenarios], done: false };
}

/**
 * "Yes, test it": the prototype is in the concept, and Sparks shows how it'll test it before running anything
 * (prds/sparks-validate.md, "The evaluation plan"), as a summary she approves.
 */
export function sampleValidatePlanReply(scenarios: EvaluationScenario[]): SparksReply {
	const lines = scenarios.map((s) => `- ${s.situation}${s.access ? ` (${s.access.toLowerCase()})` : ""}`).join("\n");
	return {
		id: "validate-plan",
		from: "sparks",
		thinking: [
			"Picking the roads to test it on: customers and stores…",
			"Building the scenarios…",
		],
		parts: [
			{
				kind: "text",
				text: `Done. The prototype is in your blueprint.\n\n**Here's how I'll test it:**\n\n${scenarios.length} scenarios, worked through the prototype. Each is a realistic situation built from what AutoParts Co. knows about its customers and stores, never a real person:\n\n${lines}\n\nThen I'll check it against business data, engineering context, the design system and how the teams work. It's an AI evaluation: it shows what could go wrong, not what real people will do.`,
			},
		],
		quickReplies: sampleSummaryReplies,
	};
}

/** After "Not quite" on the plan. */
export const sampleValidatePlanNotQuiteReply: SparksReply = {
	id: "validate-plan-not-quite",
	from: "sparks",
	parts: [{ kind: "text", text: "What would you add, change or remove? Describe a situation, like \"a first-time buyer on a laptop with two saved vehicles\"." }],
};

/** Her change to the plan: taken as a scenario, and the plan's answers again. */
export const sampleValidatePlanAddedReply = (text: string): SparksReply => ({
	id: "validate-plan",
	from: "sparks",
	parts: [{ kind: "text", text: `Thanks, I've added it as a scenario: "${text.replace(/\.$/, "")}". In this demo, the run doesn't include it yet.` }],
	quickReplies: sampleSummaryReplies,
});

/** The run starting: which version, and its progress in place. */
export function sampleValidateRunningReply(evaluation: Evaluation): SparksReply {
	return {
		id: "validate-running",
		from: "sparks",
		parts: [
			{ kind: "text", text: `Running it on prototype version ${evaluation.version}. Results show on the right as they come in; you can stop it any time.` },
			{ kind: "progress", ...sampleRunProgress(evaluation, 0) },
		],
	};
}

/** The answers once the results are in. */
export const sampleValidateResultsReplies = ["Go ahead to Review", "Keep improving"];

/** Going back to the choice in Plan: offered when the read is "Needs another look". */
export const sampleBackToChoice = "Go back to the choice";

/** The answers for this evaluation: going back to the choice first when Sparks's read says so. */
export const sampleValidateResultsRepliesFor = (evaluation?: Evaluation) =>
	evaluation?.read === "Needs another look" ? [sampleBackToChoice, ...sampleValidateResultsReplies] : sampleValidateResultsReplies;

/** The results: Sparks's read, the evidence status by method, and the question. */
export function sampleValidateResultsReply(evaluation: Evaluation): SparksReply {
	return {
		id: "validate-results",
		from: "sparks",
		thinking: [
			"Reading the results off the dyno…",
			"Comparing them with what you set out to prove…",
		],
		parts: [
			{
				kind: "text",
				text: `**${evaluation.read}.** ${evaluation.readText}${evaluation.sinceLast ? `\n\nSince the last run: ${evaluation.sinceLast}` : ""}\n\n**${evaluation.hypothesis.outcome}.** ${evaluation.hypothesis.note}\n\n**${evaluation.read === "Needs another look" ? "Do you want to go back to the choice, take this to review as it is, or keep improving it?" : "Do you want to take this to review, or keep improving it?"}**`,
			},
		],
		quickReplies: sampleValidateResultsRepliesFor(evaluation),
	};
}

export const sampleValidateStoppedReply: SparksReply = {
	id: "validate-stopped",
	from: "sparks",
	parts: [{ kind: "text", text: 'Stopped. The results so far are on the right, marked "Stopped before finishing". Run it again when you\'re ready.' }],
	quickReplies: ["Run it again"],
};

/** "Keep improving": a fix Sparks can make, or a change she describes, then run it again. */
export const sampleValidateKeepImprovingReply = (evaluation?: Evaluation): SparksReply => ({
	id: "validate-improving",
	from: "sparks",
	parts: [
		{
			kind: "text",
			text: evaluation?.findings.some((f) => f.fixable && f.status === "open")
				? 'Okay. Select "Fix this in the prototype" on a finding, or change the prototype yourself, then run it again.'
				: "Okay. The suggested fixes need a decision before they go in the prototype. Tell me a change in Prototype, or point at what to change, then run it again.",
		},
	],
	quickReplies: ["Run it again", "Go ahead to Review"],
});

/** "Go ahead to Review": open findings go as known issues, said once. Review isn't built yet. */
export function sampleValidateGoAheadOpening(open: number) {
	const issues =
		open > 0 ? `${open === 1 ? "One finding is" : `${["", "", "Two", "Three", "Four"][open] ?? open} findings are`} still open. ${open === 1 ? "It goes" : "They'll go"} to review as known issues.\n\n` : "";
	return `${issues}Done. Validate is finished, and the evaluation is in your blueprint.\n\n`;
}

export function sampleValidateGoAheadReply(open: number): SparksReply {
	const issues =
		open > 0 ? `${open === 1 ? "One finding is" : `${["", "", "Two", "Three", "Four"][open] ?? open} findings are`} still open. ${open === 1 ? "It goes" : "They'll go"} to review as known issues.\n\n` : "";
	return {
		id: "validate-done",
		from: "sparks",
		parts: [
			{
				kind: "text",
				text: `${issues}Done. Validate is finished, and the evaluation is in your blueprint.\n\n**Next, Review.**\n\nI'll put the idea together for others to see.`,
			},
		],
	};
}

export const sampleValidateRerunReply: SparksReply = {
	id: "validate-rerun",
	from: "sparks",
	parts: [{ kind: "text", text: "The prototype changed after the last run. Run it again to evaluate the current version." }],
	quickReplies: ["Run it again"],
};

/** "Fix this in the prototype": Prototype opens with the fix offered, hers to accept. */
export const sampleFixOfferReply = (finding: EvaluationFinding): SparksReply => ({
	id: "prototype-fix",
	from: "sparks",
	parts: [{ kind: "text", text: `Here's the fix for "${finding.title}": ${finding.fix?.charAt(0).toLowerCase()}${finding.fix?.slice(1)} Want me to make it?` }],
	quickReplies: ["Make the change", "Not now"],
});

export const sampleFixDoneReply = (summary: string, version: number): SparksReply => ({
	id: "prototype-fix-done",
	from: "sparks",
	parts: [{ kind: "text", text: `Done: ${summary}. I've saved it as version ${version}.\n\n**Want me to run the evaluation again?**` }],
	quickReplies: ["Run it again", "Not now"],
});

export const sampleFixNotNowReply: SparksReply = {
	id: "prototype-change",
	from: "sparks",
	parts: [{ kind: "text", text: "Okay. It's still under Findings when you want it." }],
};

/** What she might ask in Validate (prds/sparks-validate.md, "Checks"), and how Sparks answers. */
export function sampleValidateQuestionReply(text: string, evaluation?: Evaluation): SparksReply {
	const t = text.toLowerCase();
	const say = (answer: string): SparksReply => ({ id: "validate-answer", from: "sparks", parts: [{ kind: "text", text: answer }], quickReplies: sampleValidateResultsRepliesFor(evaluation) });
	if (/love|like it|happy|trust/.test(t))
		return say(
			`${evaluation ? `${evaluation.hypothesis.text.split(". ").slice(-1)[0].replace(/\.$/, "")}. ` : ""}It's an AI evaluation, though: how people feel about it is under "What only real people can tell us", with how to find out.`,
		);
	if (/neighbou?r|friend|real (person|customer)|named|my (mom|dad|wife|husband)/.test(t))
		return say("Scenarios come from patterns across AutoParts Co.'s customers, never a real person, so the evaluation is safe to share. Tell me what's typical about her, like how often she orders and for which car, and I'll add a scenario like that.");
	if (/exact|precise|how many returns|number of returns/.test(t))
		return say(
			`It can't be exact: it rests on business data and simulated scenarios, not on real use. The best estimate is a range: ${(evaluation?.measures[0].estimate ?? "likely 30–50% fewer").toLowerCase().replace(" fewer", ' fewer "doesn\'t fit" returns')}, with ${(evaluation?.measures[0].confidence ?? "medium").toLowerCase()} confidence.`,
		);
	if (/validated|proven|prove/.test(t))
		return say(
			`I'd keep it as the evidence says: ${(evaluation?.hypothesis.outcome ?? "simulation supports hypothesis").toLowerCase()}. That isn't validated: no real people have used it. ${evaluation?.realPeople[0] ? `The first thing to check with real people: ${evaluation.realPeople[0].question.charAt(0).toLowerCase()}${evaluation.realPeople[0].question.slice(1)}` : "A short test with real customers would be the real check."}`,
		);
	return say("I can't do that in this demo yet. You can read the results on the right, step through a scenario, fix a finding in the prototype, or run it again.");
}
