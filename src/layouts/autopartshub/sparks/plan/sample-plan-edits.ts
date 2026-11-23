import type { PlanPartId } from "../workspace/plan-parts";
import type { SparksReply } from "../workspace/workspace";

/*
 * Changing an answer in Plan once the prototype is built (prds/sparks.md, "Changing an answer"): what Sparks says about
 * the part of the plan it changed, and the offer to update the prototype. What the AI would supply.
 */

const titles: Record<PlanPartId, string> = {
	problem: "the problem",
	brief: "what we know",
	success: "what success looks like",
	chosen: "what we'll build",
};

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

/**
 * A changed answer, once there's a prototype: Sparks has updated the part of the plan it feeds, says what may no longer
 * fit, and offers to update the prototype.
 */
export const samplePlanEditChangedReply = (part: PlanPartId, validated: boolean): SparksReply => ({
	id: `plan-edit-changed-${part}`,
	from: "sparks",
	thinking: ["Reading your new answer…", "Checking what's built on it…"],
	parts: [
		{
			kind: "text",
			text: `Got it. I've updated ${titles[part]} with your new answer, and I'll work from it from now on.\n\n${impact(part, validated)}\n\n**Want me to update the prototype to match?**`,
		},
	],
	quickReplies: samplePlanEditUpdateReplies,
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
