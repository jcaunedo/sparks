import type { PlanPartId } from "../workspace/plan-document";
import type { SparksReply } from "../workspace/workspace";

/*
 * Editing the plan (prds/sparks.md, "The finished plan"): how Sparks reads an edit (only the wording, or what it
 * means), what it says when the meaning changed, and the offer to update the prototype. What the AI would supply.
 */

const titles: Record<PlanPartId, string> = {
	problem: "the problem",
	brief: "what we know",
	success: "what success looks like",
	chosen: "what we'll build",
};

/** The words of a text, lower case, for comparing two versions. */
const words = (text: string) => text.toLowerCase().match(/[a-z0-9%$.,']+/g)?.map((w) => w.replace(/[.,]+$/, "")) ?? [];
/** Its numbers (targets, amounts, periods): any change to one changes what it means. */
const numbers = (text: string) => (text.match(/\d[\d,.]*%?/g) ?? []).map((n) => n.replace(/[.,]+$/, "")).join(" ");
const negations = new Set(["not", "no", "never", "don't", "doesn't", "isn't", "won't", "without"]);

/**
 * Only the wording, or what it means: a number changed, a "not" added or removed, or more than a sixth of the words
 * changed is a change in meaning. A typo or a rephrasing is wording. Sparks decides; Dana doesn't have to.
 */
export function samplePlanEditEditKind(before: string, after: string): "wording" | "meaning" {
	if (numbers(before) !== numbers(after)) return "meaning";
	const a = words(before);
	const b = words(after);
	const count = (list: string[]) => list.reduce((map, w) => map.set(w, (map.get(w) ?? 0) + 1), new Map<string, number>());
	const ca = count(a);
	const cb = count(b);
	let changed = 0;
	for (const [w, n] of ca) changed += Math.max(0, n - (cb.get(w) ?? 0));
	for (const [w, n] of cb) changed += Math.max(0, n - (ca.get(w) ?? 0));
	const negationChanged = [...negations].some((w) => (ca.get(w) ?? 0) !== (cb.get(w) ?? 0));
	return negationChanged || changed / Math.max(a.length, b.length, 1) > 1 / 6 ? "meaning" : "wording";
}

/** The plan's first version: Plan as it was when it finished. */
export const samplePlanEditFirstVersion = "Plan finished";

/** A version's name, for what changed ("Changed what success looks like", "Reworded the problem"). */
export const samplePlanEditVersionName = (part: PlanPartId, kind: "wording" | "meaning") =>
	`${kind === "meaning" ? "Changed" : "Reworded"} ${titles[part]}`;

export const samplePlanEditRestoredName = (version: number) => `Restored version ${version}`;

/** The answers to Sparks's offer to update the prototype. */
export const samplePlanEditUpdateReplies = ["Yes, update it", "Not now"];

/** What may no longer fit, for the part she changed. */
function impact(part: PlanPartId | undefined, validated: boolean) {
	const validate = validated ? " Evaluate's last run was on that version too." : "";
	if (part === "success")
		return `The prototype was built for the earlier version of what success looks like${validated ? ", and Evaluate's last run measured against it." : "."}`;
	if (part === "problem") return `Everything after the problem builds on it, so the prototype may no longer fit: it was built from the earlier version.${validate}`;
	if (part === "brief") return `The prototype was built from what we knew before, so it may no longer fit.${validate}`;
	if (part === "chosen") return `The prototype was built from the earlier version of what we'll build, so it may no longer fit.${validate}`;
	return `The prototype was built from the plan as it was, so it may no longer fit.${validate}`;
}

/** An edit that changes what Plan says: Sparks works from it, says what may no longer fit, and offers to update the prototype. */
export const samplePlanEditChangedReply = (part: PlanPartId, validated: boolean): SparksReply => ({
	id: `plan-edit-changed-${part}`,
	from: "sparks",
	thinking: ["Reading your change…", "Checking what's built on it…"],
	parts: [
		{
			kind: "text",
			text: `Got it. Your change to ${titles[part]} is in your plan, and I'll work from it from now on.\n\n${impact(part, validated)}\n\n**Want me to update the prototype to match?**`,
		},
	],
	quickReplies: samplePlanEditUpdateReplies,
});

/** Restoring an earlier version: the same offer when what it says differs from the version she had; otherwise nothing to update. */
export const samplePlanEditRestoredReply = (restored: number, saved: number, changed: boolean, validated: boolean): SparksReply => ({
	id: "plan-edit-changed-restore",
	from: "sparks",
	parts: [
		{
			kind: "text",
			text: changed
				? `Done. I've brought back version ${restored} of your plan and saved it as version ${saved}.\n\n${impact(undefined, validated)}\n\n**Want me to update the prototype to match?**`
				: `Done. I've brought back version ${restored} of your plan and saved it as version ${saved}. Only the wording differs, so the prototype still fits.`,
		},
	],
	quickReplies: changed ? samplePlanEditUpdateReplies : undefined,
});

/** "Yes, update it": the prototype matches the plan again, as a new version. */
export const samplePlanEditUpdatedReply = (version: number): SparksReply => ({
	id: "plan-edit-updated",
	from: "sparks",
	thinking: ["Lining the prototype up with your plan…"],
	parts: [{ kind: "text", text: `Done. The prototype matches your plan again. I've saved it as version ${version}.` }],
});

/** "Not now": nothing changes, and the prototype says it's out of date until it's updated. */
export const samplePlanEditNotNowReply: SparksReply = {
	id: "plan-edit-not-now",
	from: "sparks",
	parts: [
		{
			kind: "text",
			text: "OK, I'll leave it as it is. The prototype shows a note until it matches your plan again, and you can update it from there.",
		},
	],
};

/** The prototype's version once it matches the plan again. */
export const samplePlanEditPrototypeVersion = "Matched to the plan";

/** The note on the prototype while it was built from an earlier version of the plan: what she's changed since. */
export const samplePlanEditOutOfDate = (parts: PlanPartId[]) => {
	const changed = parts.length ? parts.map((p) => titles[p]) : ["your plan"];
	const list = changed.length < 2 ? changed[0] : `${changed.slice(0, -1).join(", ")} and ${changed[changed.length - 1]}`;
	return `Built from an earlier version of the plan: you've since changed ${list}.`;
};
