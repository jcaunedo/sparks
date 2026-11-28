import type { DirectionDraft, DirectionStatus } from "../plan/direction-card";
import type { SparksMessage, SparksReplyPart } from "./workspace";

/*
 * Plan's parts and its directions' actions. Plan stays the conversation it was built in, once it's done too
 * (prds/sparks.md, "The finished plan"): there's no separate document; a direction's card keeps its action.
 */

/** Plan's four summaries, each fed by the questions Dana answered: what changing an answer can change. */
type PlanPartId = "problem" | "brief" | "success" | "chosen";

/**
 * The directions as paths in the prototype: the ones built (in the order built), the one shown, and what running one
 * does (the story decides: before Plan is done it picks it; after, Sparks offers to build it as another path, or opens
 * the path when it's built).
 */
type DirectionPaths = {
	built: string[];
	active?: string;
	/** The paths sent to Review: their cards say "In Review". */
	inReview?: string[];
	onRun: (direction: DirectionDraft) => void;
};

/**
 * A direction's call to action on its card: "Generate prototype" (before Plan is done it picks the direction, and "What
 * we'll build" comes first; after, Sparks offers to build it as another path), or "Open prototype" once it's built. None
 * for the direction already picked while Plan is open.
 */
function directionActionFor(messages: SparksMessage[], paths?: DirectionPaths) {
	const chosen = latest(messages, "chosen")?.chosen.name;
	return (direction: DirectionDraft) => {
		if (!paths) return undefined;
		const planDone = paths.built.length > 0;
		if (!planDone && direction.name === chosen) return undefined;
		return { label: paths.built.includes(direction.id) ? "Open prototype" : "Generate prototype", onClick: () => paths.onRun(direction) };
	};
}

/** A direction's status under its name: "In Review" once its path is in Review, "Generated" once it's built. */
function directionStatusFor(paths?: DirectionPaths) {
	return (direction: DirectionDraft): DirectionStatus =>
		paths?.inReview?.includes(direction.id) ? "in-review" : paths?.built.includes(direction.id) ? "generated" : "not-generated";
}

/** The latest part of a kind in the conversation (after a correction, the corrected one). */
function latest<K extends SparksReplyPart["kind"]>(messages: SparksMessage[], kind: K) {
	for (let i = messages.length - 1; i >= 0; i--) {
		const message = messages[i];
		if (message.from !== "sparks") continue;
		const part = message.parts.find((p): p is Extract<SparksReplyPart, { kind: K }> => p.kind === kind);
		if (part) return part;
	}
	return undefined;
}

export { directionActionFor, directionStatusFor, type DirectionPaths, type PlanPartId };
