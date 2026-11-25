import type { SparksReply } from "../workspace/workspace";
import type { ChosenDraft } from "./chosen-card";
import type { DirectionDraft } from "./direction-card";
import { sampleWithCorrection } from "./sample-correction";

/*
 * Choosing, the end of Plan (prds/sparks-plan-compare.md): once Dana picks a direction, Sparks drafts everything the
 * concept needs about it in one card, "What we'll build", and asks one question. What the AI would supply.
 */

/** Why it's the one, the hypothesis's change, and what it gives up, by the direction's id. */
const chosenDetails: Record<string, { why: string; change: string; givesUp: string }> = {
	"fit-check": {
		why: "It should cut \"doesn't fit\" returns the most, for Medium effort, and customers add their vehicle only once.",
		change: "showing on every product page whether a part fits the customer's saved vehicle",
		givesUp:
			"It can't launch before early January, when product pages can change again. And fit data has gaps for older vehicles, so for some parts it can only say \"We're not sure this fits\".",
	},
	"checkout-check": {
		why: "It catches the wrong part before the order goes through, and it can launch before January.",
		change: "flagging parts that don't fit the customer's vehicle at checkout",
		givesUp: "A warning at the last step can make some people give up the order, so we'll watch online sales closely.",
	},
	"flag-returns": {
		why: "It's the quickest to build, with data AutoParts Co. already has, and it can launch before January.",
		change: "marking parts that get returned a lot in search results",
		givesUp: "It says a part comes back a lot, not whether it fits, so it would cut fewer of these returns.",
	},
	"fit-data": {
		why: "It goes after the cause we found, with the lowest risk, and makes any fit check later more accurate.",
		change: "filling the gaps in fit data for older vehicles",
		givesUp: "It's the largest effort, and results build over months, not weeks.",
	},
};

/**
 * What goes on "What we'll build" for the direction she chose: drafted by Sparks, with the target from what success
 * looks like (`target`) in the hypothesis.
 */
export function sampleChosenFrom(chosen: DirectionDraft, directions: DirectionDraft[], target: string): ChosenDraft {
	const details = chosenDetails[chosen.id];
	const lower = (text: string) => text.charAt(0).toLowerCase() + text.slice(1);
	return {
		name: chosen.name,
		idea: chosen.idea,
		why: details.why,
		believe: `We believe that ${details.change} will cut wrong-part purchases by customers buying online. We'll know it worked if we reach the target: ${lower(target)}`,
		givesUp: details.givesUp,
		alsoConsidered: directions
			.filter((direction) => direction.id !== chosen.id)
			.map((direction) => `${direction.name}: ${lower(direction.effect)} effect, ${lower(direction.effort.size)} effort.`),
		toCheck: chosen.unknowns,
	};
}

/** The answers to "What we'll build": hers is a decision, so it says what it does and shows as her message. */
export const sampleBuildIt = "Build it";
export const sampleChosenReplies = [sampleBuildIt, "Not quite"];

/**
 * After her pick: "What we'll build", drafted in one go, and one question. Against Sparks's pick, it says the catch
 * once, without arguing (prds/sparks-plan-compare.md, "Choosing").
 */
export function sampleChosenReply(chosen: DirectionDraft, card: ChosenDraft): SparksReply {
	const opening = chosen.recommended
		? "Got it.\n\n**Here's what we'll build:**"
		: `Got it: "${chosen.name}". One thing to keep in mind: ${chosen.catch.charAt(0).toLowerCase()}${chosen.catch.slice(1)} I've put it in the trade-off.\n\n**Here's what we'll build:**`;
	return {
		id: "chosen-summary",
		from: "sparks",
		thinking: ["Assembling the parts of your plan…", "Running a final inspection…"],
		parts: [
			{ kind: "text", text: opening },
			{ kind: "chosen", chosen: card },
			{ kind: "text", text: "That's the end of Plan. Once it looks right, I'll build it." },
		],
		quickReplies: sampleChosenReplies,
	};
}

/** After "Not quite": the card can't be edited in place, so Sparks asks what's off. */
export const sampleChosenNotQuiteReply: SparksReply = {
	id: "chosen-not-quite",
	from: "sparks",
	parts: [{ kind: "text", text: "What's off? Tell me in your own words, and I'll update it." }],
};

/** After her correction: Sparks updates it, shows it again with her words worked in, and asks again. */
export const sampleChosenAgainReply = (chosen: ChosenDraft, words: string): SparksReply => ({
	id: "chosen-again",
	from: "sparks",
	parts: [
		{ kind: "text", text: "Thanks, I've updated it.\n\n**Here's what we'll build now:**" },
		{ kind: "chosen", chosen: { ...chosen, why: sampleWithCorrection(chosen.why, words), approved: false } },
	],
	quickReplies: sampleChosenReplies,
});
