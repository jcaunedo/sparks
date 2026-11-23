import { PlanSummary, lowerFirst } from "./plan-summary";

/**
 * The Chosen direction section (prds/sparks-plan-compare.md, "The Chosen direction section"), drafted by Sparks in one
 * go once Dana picks a direction: what it is, why it's the one, what we believe it will do, what it gives up, the others,
 * and what Evaluate checks.
 */
type ChosenDraft = {
	name: string;
	idea: string;
	why: string;
	/** The hypothesis: what this direction should achieve, and how she'll know (the target from what success looks like). */
	believe: string;
	givesUp: string;
	/** The other directions, each with its effect and effort. */
	alsoConsidered: string[];
	/** Its assumptions, most important first. */
	toCheck: string[];
	/** She said "Yes, build it": it's in her concept, and Plan is done. */
	approved?: boolean;
};

type ChosenCardProps = {
	/** Smaller text, for the plan. */
	compact?: boolean;
	chosen: ChosenDraft;
	className?: string;
};

/**
 * What we'll build (the Chosen direction), summed up in Sparks's reply, the last of Plan's summaries: the direction and
 * why, what we believe, what it gives up, the others and what's still to check. No card around it. Not in Figma yet.
 */
function ChosenCard({ chosen, compact, className }: ChosenCardProps) {
	const { text, sources } = chosenSummary(chosen);
	return <PlanSummary label="What we'll build" text={text} sources={sources} compact={compact} className={className} />;
}

/** The summary's text (AssistantMessage's format) and its sources line: what the card shows, and what the plan edits. */
function chosenSummary(chosen: ChosenDraft) {
	const text = [
		`**${chosen.name}:** ${lowerFirst(chosen.idea)} ${chosen.why}`,
		chosen.believe,
		`The trade-off: ${lowerFirst(chosen.givesUp)}`,
		"We also looked at:",
		chosen.alsoConsidered.map((direction) => `- ${direction}`).join("\n"),
		chosen.toCheck.length ? "Still to check:" : "",
		chosen.toCheck.map((item) => `- ${item}`).join("\n"),
	]
		.filter(Boolean)
		.join("\n\n");
	return { text, sources: "From the direction you chose and what success looks like." };
}

export { ChosenCard, chosenSummary, type ChosenCardProps, type ChosenDraft };
