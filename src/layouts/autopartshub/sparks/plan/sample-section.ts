import type { SparksReply, SparksReplyPart } from "../workspace/workspace";

const inPlan = (part: SparksReplyPart): SparksReplyPart =>
	part.kind === "problem"
		? { ...part, problem: { ...part.problem, approved: true } }
		: part.kind === "brief"
			? { ...part, brief: { ...part.brief, approved: true } }
			: part.kind === "success"
				? { ...part, success: { ...part.success, approved: true } }
				: part;

/**
 * A Plan summary, then the next section, in one reply: the summary goes in the plan (it says so last), the divider ends
 * the section, and Sparks goes on by itself (prds/sparks.md, "Talking with Sparks"). She has already confirmed what's in the summary.
 */
export const sampleIntoNext = (summary: SparksReply, next: SparksReply): SparksReply => ({
	...summary,
	parts: [...summary.parts.map(inPlan), { kind: "section", thinking: next.thinking }, ...next.parts],
	quickReplies: next.quickReplies,
});
