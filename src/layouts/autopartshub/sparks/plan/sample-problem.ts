import type { SparksReply } from "../workspace/workspace";
import type { ProblemDraft } from "./problem-card";
import { sampleClarifyReplies, sampleClarifyTodaySuggestion } from "./sample-clarify";
import { sampleIntoNext } from "./sample-section";

/*
 * Plan's Problem part for "Wrong-part returns", one thing at a time (prds/sparks-plan-problem.md). What the AI and
 * company knowledge would supply: every number is illustrative (prds/sparks.md, "The demo").
 */

/** The problem as Sparks drafts it from Dana's description and company knowledge. */
export const sampleProblem: ProblemDraft = {
	parts: {
		name: { text: "Wrong-part returns", source: "sparks" },
		statement: {
			text: "Customers shopping for parts online can't tell for sure whether a part fits their exact vehicle. Whether it fits depends on details like the year, make, model, trim and engine, and it's easy to get one of them wrong or not know it at all. So they order the part that looks right, only find out it doesn't fit when they go to install it, and have to send it back and start over.\n\nThat costs on several fronts. Returns keep rising. Stores spend time on calls from customers asking \"will this fit?\", before and after they buy. And some of the customers who end up with the wrong part lose confidence and stop buying from us. The problem to solve is helping customers know a part fits their vehicle before they buy it.",
			source: "sparks",
			basis: "Your message",
		},
		app: {
			text: "AutoParts Co. online store, search results\nhttps://shop.autopartsco.example/search",
			source: "sparks",
			basis: "Your message and product ecosystem",
		},
		who: {
			text: "Do-it-yourself customers buying online, most often for vehicles more than 10 years old.",
			source: "sparks",
			basis: "Customer intelligence",
		},
		today: { text: "People buying online get parts that don't fit their car and send them back.", source: "you" },
		why: {
			text: "Each return costs shipping, handling and store time, and customers who return a part that doesn't fit are less likely to buy from us again.",
			source: "sparks",
			basis: "Business performance",
			assumption: true,
		},
	},
	ideas: ["In search results, flag parts that get returned a lot, so people double-check before they buy."],
	summary: `Customers buying parts online can't tell for sure whether a part fits their exact vehicle. They order what looks right, find out it doesn't fit when they go to install it, and send it back. It happens most to do-it-yourself customers, especially with vehicles more than 10 years old.

It matters because:

- Every return costs shipping, handling and store time.
- Stores spend time answering calls asking "will this fit?".
- Some of these customers stop buying from us. No data shows that yet, so it's an assumption we'll check.

Your idea, flagging parts that get returned a lot in search results, is kept for when we look at solutions.`,
};

/**
 * The summary once she's changed a part: the same shape, in her words. The live AI would rewrite it whole; the demo
 * puts her words in place.
 */
export function sampleProblemSummaryFrom(problem: ProblemDraft): string {
	const { statement, who, why } = problem.parts;
	const assumed = why.assumption && why.source !== "edited" ? " No data shows all of that yet, so it's an assumption we'll check." : "";
	return [
		statement.text,
		`**Who it affects most:** ${who.text}`,
		`**Why it matters:** ${why.text}${assumed}`,
		problem.ideas?.length ? "Your idea is kept for when we look at solutions." : "",
	]
		.filter(Boolean)
		.join("\n\n");
}

const { statement, app, who, why } = sampleProblem.parts;

/**
 * Step 1, the reply to her description: thanks, her idea kept for later in a few words, and her description expanded the
 * way an expert would describe it, from her words alone; the data comes later, where it helps (prds/sparks-plan-problem.md,
 * "Describing it as an expert").
 */
export const sampleProblemStatementReply: SparksReply = {
	id: "problem-statement",
	from: "sparks",
	thinking: [
		"Popping the hood on support cases…",
		"Running the numbers on sales and returns…",
		"Going through the service history of past experiments…",
	],
	parts: [
		{
			kind: "text",
			text: "Thanks, Dana. Here's the problem as I understand it, in a bit more detail:",
		},
		{
			kind: "suggestion",
			suggestion: {
				part: "statement",
				question: "Problem to solve",
				text: statement.text,
				basis: statement.basis,
			},
		},
	],
	quickReplies: ["Yes, that's it", "Not quite"],
};

/**
 * After a correction (her words after "Not quite", or an edit on the card): what changed and why it matters, in its own
 * paragraph before the next question (prds/sparks-plan-problem.md, "Correcting a suggestion").
 */
export type ProblemCorrectable = "statement" | "app" | "who" | "why";
const problemChanges: Record<ProblemCorrectable, string> = {
	statement:
		"Thanks, I've changed the problem to your words. Everything else in your plan builds on it, so it should say it the way you see it.",
	app: "Thanks, I've changed the app. The prototype will start from what's live there, so it has to be the right one.",
	who: "Thanks, I've changed who it affects. It decides whose orders and returns I look at from here, so I'd rather go with what you know.",
	why: "Thanks, I've changed why it matters. What success looks like comes from it later, so it should be in your words.",
};

/** The same, when her words started "Add…": added to Sparks's answer, not replacing it. */
const problemAdditions: Record<ProblemCorrectable, string> = {
	statement: "Thanks, I've added that to the problem. Everything else in your plan builds on it.",
	app: "Thanks, I've added that to the app. The prototype will start from what's live there.",
	who: "Thanks, I've added that to who it affects. It decides whose orders and returns I look at from here.",
	why: "Thanks, I've added that to why it matters. What success looks like comes from it later.",
};

/** The other answer to "Which app does this improve?": nothing is live yet. */
export const sampleProblemNewApp = "It's a new app";
/** What that answer puts on the card, and in the plan. */
export const sampleProblemNewAppText = "A new app, with nothing live yet";

/**
 * Step 2: Sparks names the concept (`name`) and asks which live app it improves, with its guess and the address: the
 * prototype starts from it (prds/sparks-plan-problem.md, "The live app").
 */
function problemAppReply(opening: string, name = sampleProblem.parts.name.text): SparksReply {
	return {
		id: "problem-app",
		from: "sparks",
		thinking: ["Looking under the hood of AutoParts Co.'s apps…"],
		parts: [
			{
				kind: "text",
				text: `${opening}I've named this idea "${name}". You can rename it any time.\n\nNext, the app you want to improve. I'll start the prototype from what's already live there. You mentioned search results, so my guess is the online store.`,
			},
			{
				kind: "suggestion",
				suggestion: { part: "app", question: "Which app does this improve?", text: app.text, basis: app.basis },
			},
		],
		quickReplies: ["Yes, that's the one", "Not quite", sampleProblemNewApp],
	};
}
export const sampleProblemAppReply = problemAppReply("Good. ");
/** Step 2 with another name: for a problem off the demo's script, named from her words. */
export const sampleProblemAppReplyFor = (name: string) => problemAppReply("Good. ", name);

/** The answer that opens the file picker instead of being sent. */
const attachFiles = "Attach files";
/** The answer that opens "Add from library" instead of being sent. */
const addFromLibrary = "Add from library";

/** Step 3: anything that supports the idea, optional (prds/sparks-plan-problem.md, "Supporting material"). */
function problemEvidenceReply(opening: string): SparksReply {
	return {
		id: "problem-evidence",
		from: "sparks",
		parts: [
			{
				kind: "text",
				text: `${opening}**Do you have anything that supports your idea?**\n\nA report, a document, customer feedback or a link all help. Attach files, add from your library, or paste a link or notes in the message box. It's optional, and I'll keep what you add with this idea, marked as yours.`,
			},
		],
		quickReplies: ["Nothing to add", attachFiles, addFromLibrary],
		attachReply: attachFiles,
		libraryReply: addFromLibrary,
	};
}
export const sampleProblemEvidenceReply = problemEvidenceReply("Got it. I'll start from what's live there today.\n\n");
export const sampleProblemEvidenceNewAppReply = problemEvidenceReply(
	"Got it. With nothing live yet, I'll start from AutoParts Co.'s design system.\n\n",
);

/** What she answered there: "Nothing to add" (or a typed no) adds nothing; the rest are her words (a link, notes). */
export const sampleProblemAddedWords = (text: string) =>
	!text.trim() || /^\s*(nothing to add|nothing|none|no|nope|not (?:now|really)|skip)[\s.!]*$/i.test(text) ? undefined : text.trim();

/** "a", "b" and "c", in quotes. */
const fileNames = (files: string[]) => {
	const names = files.map((file) => `"${file}"`);
	return names.length < 2 ? names.join("") : `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;
};

/**
 * Files she sent on their own, when Sparks didn't ask for any (prds/sparks.md, "The message box"): it keeps them and goes
 * back to what it was waiting for: her description (`start`), a question card (`card`) or another answer (`waiting`).
 */
export function sampleFilesAddedReply(files: string[], waiting: "start" | "card" | "waiting" | "none"): SparksReply {
	const next = {
		start: "\n\n**What problem do you want to solve?**\nDescribe it in your own words.",
		card: " Back to the question:",
		waiting: " Whenever you're ready, we can go on.",
		none: "",
	}[waiting];
	return { id: "files-added", from: "sparks", parts: [{ kind: "text", text: `Thanks, I've added ${fileNames(files)} to this idea, marked as yours.${next}` }] };
}

/** Step 4: Sparks says what she added, then checks who has the problem. */
export function sampleProblemWhoReplyAfter(files: string[], words?: string): SparksReply {
	const list = fileNames(files);
	const opening = files.length
		? `Thanks, I've added ${list}${words ? " and your note" : ""} to this idea, marked as yours. `
		: words
			? "Thanks, I've added that to this idea, marked as yours. "
			: "No problem. ";
	return {
		id: "problem-who",
		from: "sparks",
		thinking: ["Looking at who asks stores about fit…"],
		parts: [
			{
				kind: "text",
				text: `${opening}Next, who runs into this most. My guess comes from what customers ask stores about fit.`,
			},
			{
				kind: "suggestion",
				suggestion: { part: "who", question: "Who does it affect most?", text: who.text, basis: who.basis },
			},
		],
		quickReplies: ["Yes, that's right", "Not quite"],
	};
}
export const sampleProblemWhoReply = sampleProblemWhoReplyAfter([]);

/** Step 5: why it matters, with the one number that sizes it and the assumption called out. */
function problemWhyReply(opening: string): SparksReply {
	return {
		id: "problem-why",
		from: "sparks",
		parts: [
			{
				kind: "text",
				text: `${opening}Last, why it matters. The returns cost shipping, handling and store time (business performance, Aug–Oct 2026). You agreed that some of those customers don't come back. No data shows that yet, so I've marked it as an assumption we'll check later.`,
			},
			{
				kind: "suggestion",
				suggestion: {
					part: "why",
					question: "Why does it matter?",
					text: why.text,
					basis: why.basis,
					assumption: true,
				},
			},
		],
		quickReplies: ["Yes, that's right", "Not quite"],
	};
}
export const sampleProblemWhyReply = problemWhyReply("");

/**
 * Step 6: what's been tried, then the problem as it stands, whole, built from what she confirmed; then Sparks goes on to
 * Clarify (prds/sparks-plan-problem.md, "Finishing this part").
 */
export function sampleProblemDoneReply(problem: ProblemDraft, opening = ""): SparksReply {
	const summary: SparksReply = {
		id: "problem-done",
		from: "sparks",
		parts: [
			{
				kind: "text",
				text: `${opening}That's the problem. One thing before we dig in: AutoParts Co. tested a vehicle selector on product pages last year. Customers who used it returned far fewer parts as "doesn't fit", but most skipped it (previous experiments, 2025). I'll bring it back when we look at solutions.

**Here's the problem as a whole:**`,
			},
			{ kind: "problem", problem },
			{ kind: "text", text: "Done. The problem is in your plan." },
		],
	};
	return sampleIntoNext(summary, problemNextReply);
}

/** The next section, after the problem's summary: Clarify's first question (prds/sparks-plan-clarify.md, "Starting this part"). */
const problemNextReply: SparksReply = {
	id: "problem-approved",
	from: "sparks",
	parts: [
		{
			kind: "text",
			text: "**Now, let's understand it better and clarify a few things.**\n\nThe data already tells me how often this happens and what it costs, so I'll only ask what it can't, one question at a time. At the end, I'll put it all together for you to check.",
		},
		{ kind: "suggestion", suggestion: sampleClarifyTodaySuggestion },
	],
	quickReplies: sampleClarifyReplies,
};

/**
 * The next step after she corrected one: what changed and why it matters, then the next question as usual. After the
 * last step, the summary.
 */
export function sampleProblemCorrectedReply(part: ProblemCorrectable, problem: ProblemDraft, name?: string, added = false): SparksReply {
	const opening = `${(added ? problemAdditions : problemChanges)[part]}\n\n`;
	if (part === "statement") return problemAppReply(opening, name);
	if (part === "app") return problemEvidenceReply(opening);
	if (part === "who") return problemWhyReply(opening);
	return sampleProblemDoneReply(problem, opening);
}

/** After "Not quite", at any step of Plan: her answer goes on the card, and Sparks says what changed before moving on. */
export const sampleProblemNotQuiteReply: SparksReply = {
	id: "problem-not-quite",
	from: "sparks",
	parts: [{ kind: "text", text: "What's off? Tell me in your own words, or edit it on the card." }],
};

/*
 * Her first message, off the demo's script (prds/sparks-plan-problem.md, "What she might write"). The demo sharpens a
 * problem about parts that don't fit; too little gets asked again, and another problem is answered honestly, from her
 * words alone, with nothing invented.
 */

/** What her first message is: the demo's problem (or close to it), too little to work with, or another problem. */
export type ProblemMessageKind = "demo" | "unclear" | "other";

export function sampleProblemMessageKind(text: string): ProblemMessageKind {
	const words = text.trim().split(/\s+/).filter((word) => /[a-z]{2,}/i.test(word) && /[aeiouy]/i.test(word));
	if (words.length < 4) return "unclear";
	return /\b(fit|fits|fitting|return|returns|returned|wrong part|wrong parts)\b/i.test(text) ? "demo" : "other";
}

/** Too little to work with: Sparks says so and asks again, with what helps. */
export const sampleProblemUnclearReply: SparksReply = {
	id: "problem-unclear",
	from: "sparks",
	parts: [
		{
			kind: "text",
			text: "I'm not sure I follow yet. What's going wrong, and for whom? A sentence or two in your own words is enough, the way you'd tell a colleague.",
		},
	],
};

/** Words a short name never ends on. */
const fillerWords = new Set(["a", "an", "the", "to", "too", "of", "in", "on", "for", "and", "or", "with", "very", "so", "is", "are"]);

/** A short name from her words: the first few, without a filler word at the end, as a title. */
export function sampleProblemNameFrom(text: string) {
	const words = text.replace(/[^\w\s'-]/g, " ").trim().split(/\s+/).slice(0, 4);
	while (words.length > 1 && fillerWords.has(words[words.length - 1].toLowerCase())) words.pop();
	const name = words.join(" ");
	return name.charAt(0).toUpperCase() + name.slice(1);
}

/** Another problem: no data on it, so the card holds her own words, and Sparks says so. */
export function sampleProblemFromWordsReply(text: string): SparksReply {
	return {
		id: "problem-statement",
		from: "sparks",
		thinking: [
			"Popping the hood on support cases…",
			"Running the numbers on sales and returns…",
			"Going through the service history of past experiments…",
		],
		parts: [
			{
				kind: "text",
				text: "Thanks, Dana. I couldn't find anything about this in AutoParts Co.'s data yet, so I've kept it to what you told me. We'll fill in the rest together.",
			},
			{
				kind: "suggestion",
				suggestion: { part: "statement", question: "Problem to solve", text: text.trim(), basis: "Your message" },
			},
		],
		quickReplies: ["Yes, that's it", "Not quite"],
	};
}
