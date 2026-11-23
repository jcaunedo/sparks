import { Badge } from "@/components/data-display/badge";
import { Button } from "@/components/buttons/button";

import { briefSummary } from "../plan/brief-card";
import { chosenSummary } from "../plan/chosen-card";
import type { DirectionDraft } from "../plan/direction-card";
import { problemSummary } from "../plan/problem-card";
import { successSummary } from "../plan/success-card";
import { PlanText, type PlanEdits, type PlanPartId, type PlanSection } from "./plan-document";
import type { DecisionEntry } from "./decision-log";
import type { SparksMessage, SparksReplyPart } from "./workspace";

/*
 * Plan's sections in the PlanDocument (prds/sparks.md, "The finished plan"): what Dana approved in the conversation,
 * taken from the latest draft of each part. The problem, what we know, what success looks like and what we'll build
 * show the same summaries as the conversation; the directions are listed compactly, with Sparks's pick and the one she
 * chose, as soon as Sparks shows them, each with its action (prds/sparks-plan-compare.md, "Directions in the plan").
 */

/**
 * The directions as paths in the prototype: the ones built (in the order built), the one shown, and what running one
 * does (the story decides: before Plan is done it picks it, as in the conversation; after, Sparks offers to build it
 * as another path, or opens the path when it's built).
 */
type DirectionPaths = { built: string[]; active?: string; onRun: (direction: DirectionDraft) => void };

/**
 * A direction's call to action, the same on its card in the conversation and in the plan: "Generate prototype"
 * (before Plan is done it picks the direction, and "What we'll build" comes first; after, Sparks offers to build it as
 * another path), or "Open prototype" once it's built. None for the direction already picked while Plan is open.
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

/** The directions from the reply that showed them, in its order (Sparks's pick first). */
function directionsIn(messages: SparksMessage[]): DirectionDraft[] {
	for (let i = messages.length - 1; i >= 0; i--) {
		const message = messages[i];
		if (message.from !== "sparks") continue;
		const directions = message.parts.flatMap((p) => (p.kind === "direction" ? [p.direction] : []));
		if (directions.length) return directions;
	}
	return [];
}

/** Every direction Sparks proposed, compactly: the name, its labels, the idea, and effect, effort and risk. */
function DirectionsSummary({
	directions,
	chosen,
	paths,
	actionFor,
}: {
	directions: DirectionDraft[];
	chosen?: string;
	paths?: DirectionPaths;
	actionFor: ReturnType<typeof directionActionFor>;
}) {
	return (
		<ul className='flex flex-col gap-3'>
			{directions.map((direction, index) => (
				<li key={direction.id} className='flex flex-col gap-1 text-sm'>
					{/* As on the cards: "1. Name" on the left, its labels right-aligned on the same line. */}
					<span className='flex items-start justify-between gap-3'>
						<span className='font-semibold text-foreground'>
							{index + 1}. {direction.name}
						</span>
						<span className='flex shrink-0 flex-wrap items-center justify-end gap-2'>
						{direction.name === chosen ? (
							<Badge variant='flat' tone='blue' size='xxs'>
								Chosen
							</Badge>
						) : null}
						{paths?.built.includes(direction.id) && paths.built.length > 1 ? (
							<Badge variant='flat' tone='sky' size='xxs'>
								{direction.id === (paths.active ?? paths.built[0]) ? "Showing" : "Path"}
							</Badge>
						) : null}
						{direction.recommended ? (
							<Badge variant='flat' tone='green' size='xxs'>
								Recommended
							</Badge>
						) : null}
						{direction.fromDana ? (
							<Badge variant='flat' tone='purple' size='xxs'>
								Your idea
							</Badge>
						) : null}
						</span>
					</span>
					<span className='text-foreground'>{direction.idea}</span>
					<span className='text-muted-foreground'>
						{direction.effect} effect · {direction.effort.size} effort · {direction.risk.level} risk
					</span>
					{/* Its action, the same as on its card ("Generate prototype", "Open prototype"); the same outlined button as
					    "Try it" in "What we built". */}
					{(() => {
						const action = actionFor(direction);
						return action ? (
							<Button
								variant='outline'
								size='sm'
								aria-label={`${action.label}: ${direction.name}`}
								className='mt-1 w-fit rounded-button-md shadow-xs'
								onClick={action.onClick}
							>
								{action.label}
							</Button>
						) : null;
					})()}
				</li>
			))}
		</ul>
	);
}

/** Editing Plan's parts in the plan: her edits so far, and what saving one does. */
type PlanEditing = {
	edits: PlanEdits;
	onEdit: (part: PlanPartId, text: string, before: string) => void;
	/** Edit mode is on: the parts take the caret. Off, they read as the summaries, edits included. */
	editable?: boolean;
};

/** The titles of Plan's parts, in the PlanDocument, the Versions menu and what Sparks says about an edit. */
const planPartTitles: Record<PlanPartId, string> = {
	problem: "The problem",
	brief: "What we know",
	success: "What success looks like",
	chosen: "What we'll build",
};

/**
 * Plan's sections reached so far: each one once it's in her concept (the problem, what we know, what success looks
 * like, approved; the directions, as soon as Sparks shows them; what we'll build, approved). The four summaries are
 * editable in place with `editing` (prds/sparks.md, "The finished plan"); her edit replaces Sparks's summary from then on.
 */
function planSections(messages: SparksMessage[], paths?: DirectionPaths, editing?: PlanEditing): PlanSection[] {
	const sections: PlanSection[] = [];
	const part = (id: PlanPartId, summary: { text: string; sources?: string }): PlanSection => {
		const edit = editing?.edits[id];
		return {
			id,
			title: planPartTitles[id],
			content: (
				<PlanText
					label={planPartTitles[id]}
					text={edit ?? summary.text}
					sources={summary.sources}
					edited={edit !== undefined}
					onCommit={editing?.editable ? (text, before) => editing.onEdit(id, text, before) : undefined}
				/>
			),
		};
	};
	const problem = latest(messages, "problem");
	if (problem?.problem.approved) sections.push(part("problem", problemSummary(problem.problem)));
	const brief = latest(messages, "brief");
	if (brief?.brief.approved) sections.push(part("brief", briefSummary(brief.brief)));
	const success = latest(messages, "success");
	if (success?.success.approved) sections.push(part("success", successSummary(success.success)));
	const chosen = latest(messages, "chosen");
	const directions = directionsIn(messages);
	if (directions.length)
		sections.push({
			id: "directions",
			title: "Directions",
			content: <DirectionsSummary directions={directions} chosen={chosen?.chosen.name} paths={paths} actionFor={directionActionFor(messages, paths)} />,
		});
	if (chosen?.chosen.approved) sections.push(part("chosen", chosenSummary(chosen.chosen)));
	return sections;
}

const lowerFirst = (text: string) => text.charAt(0).toLowerCase() + text.slice(1);

/**
 * Plan's decisions, in the order they were made (prds/sparks.md, "The decision log"): each part she approved, the main
 * measure, a target she kept over the data, each direction she chose (a later pick is a new entry) and what we'll build,
 * which finishes Plan. `who` is the concept's owner.
 */
function planDecisions(messages: SparksMessage[], who: string): DecisionEntry[] {
	const entries: DecisionEntry[] = [];
	const problem = latest(messages, "problem");
	if (problem?.problem.approved) entries.push({ id: "plan-problem", what: "Agreed the problem", who, step: "Plan" });
	const brief = latest(messages, "brief");
	if (brief?.brief.approved) entries.push({ id: "plan-brief", what: "Approved what we know", who, step: "Plan" });
	const success = latest(messages, "success");
	if (success?.success.approved) {
		const { mainMeasure, target } = success.success;
		entries.push({ id: "plan-measure", what: `Chose the main measure: ${lowerFirst(mainMeasure.text.split(". ")[0].replace(/\.$/, ""))}`, who, step: "Plan" });
		if (target.assumption && target.source === "dana")
			entries.push({
				id: "plan-target-kept",
				what: "Kept the target over the data",
				detail: `${target.text} It's marked as an assumption for Evaluate to check.`,
				who,
				step: "Plan",
			});
		entries.push({ id: "plan-success", what: "Approved what success looks like", who, step: "Plan" });
	}
	// Each pick of a direction, in order; a correction of "What we'll build" (the same direction again) isn't a new pick.
	const recommended = directionsIn(messages).find((d) => d.recommended)?.name;
	let previous = "";
	let round = 0;
	for (const message of messages) {
		if (message.from !== "sparks") continue;
		const part = message.parts.find((p): p is Extract<SparksReplyPart, { kind: "chosen" }> => p.kind === "chosen");
		if (!part) continue;
		const { name, why, believe, approved } = part.chosen;
		if (name !== previous) {
			round += 1;
			previous = name;
			entries.push({
				id: `plan-direction-${round}`,
				what: `Chose the direction "${name}"`,
				detail: `${why}${recommended && recommended !== name ? ` Sparks recommended "${recommended}".` : ""}`,
				who,
				step: "Plan",
			});
		}
		if (approved && !entries.some((e) => e.id === `plan-built-${round}`))
			entries.push({ id: `plan-built-${round}`, what: "Approved what we'll build and its hypothesis, finishing Plan", detail: believe, who, step: "Plan" });
	}
	return entries;
}

/** The text a part shows now: her edit, or Sparks's summary. What an edit is compared with. */
function planPartText(messages: SparksMessage[], id: PlanPartId, edits: PlanEdits = {}) {
	const edit = edits[id];
	if (edit !== undefined) return edit;
	const problem = latest(messages, "problem");
	const brief = latest(messages, "brief");
	const success = latest(messages, "success");
	const chosen = latest(messages, "chosen");
	if (id === "problem") return problem ? problemSummary(problem.problem).text : "";
	if (id === "brief") return brief ? briefSummary(brief.brief).text : "";
	if (id === "success") return success ? successSummary(success.success).text : "";
	return chosen ? chosenSummary(chosen.chosen).text : "";
}

export { type PlanEditing, type DirectionPaths, planPartTitles, directionActionFor, planDecisions, planPartText, planSections };
