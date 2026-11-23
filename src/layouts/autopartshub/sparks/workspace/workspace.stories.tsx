import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { goToStory, openStoryInNewTab, storyIds, withStoryLinks } from "../../../story-links";
import { conceptStoryLinks } from "../start-page/concept-story-links";
import { sampleUser } from "../../sample-data/sample-user";
import { sampleNotifications, sampleNotificationsNow } from "../../sample-data/sample-notifications";
import type { DirectionDraft } from "../plan/direction-card";
import type { ProblemDraft, ProblemPartId } from "../plan/problem-card";
import {
	sampleBriefAgainReply,
	sampleBriefApprovedReply,
	sampleBriefFrom,
	sampleBriefNotQuiteReply,
	sampleBriefReply,
	sampleClarifyLimitsReply,
	sampleClarifyLimitsSuggestion,
	sampleClarifyNextReplies,
	sampleClarifyTodaySuggestion,
	sampleClarifyWhyReply,
	sampleClarifyWhySuggestion,
	type ClarifyAnswer,
	type ClarifyOutcome,
} from "../plan/sample-clarify";
import {
	sampleProblem,
	sampleProblemApprovedReply,
	sampleProblemCorrectedReply,
	sampleProblemDoneReply,
	sampleProblemFromWordsReply,
	sampleProblemMessageKind,
	sampleProblemNameFrom,
	sampleProblemNotQuiteReply,
	sampleProblemStatementReply,
	sampleProblemSummaryAgainReply,
	sampleProblemSummaryFrom,
	sampleProblemSummaryNotQuiteReply,
	sampleProblemUnclearReply,
	sampleProblemWhoReply,
	sampleProblemWhoReplyFor,
	sampleProblemWhyReply,
	type ProblemCorrectable,
} from "../plan/sample-problem";
import {
	sampleSuccessAgainReply,
	sampleSuccessFrom,
	sampleSuccessMeasureReply,
	sampleSuccessNotQuiteReply,
	sampleSuccessNotWorseReply,
	sampleSuccessRepeatMeasure,
	sampleSuccessSuggestedTarget,
	sampleSuccessSummaryReply,
	sampleSuccessTargetReply,
	sampleSuccessTargetUnlikely,
	sampleSuccessTargetUnlikelyReply,
	type SuccessAnswer,
	type SuccessAnswers,
} from "../plan/sample-success";
import {
	sampleDirectionFitCheck,
	sampleDirections,
	sampleBackToChoiceReply,
	sampleDirectionsAgainReply,
	sampleGoWithIt,
	sampleRecommended,
	sampleSuccessApprovedReply,
} from "../plan/sample-directions";
import {
	sampleChosenAgainReply,
	sampleChosenFrom,
	sampleChosenNotQuiteReply,
	sampleChosenReply,
} from "../plan/sample-choose";
import {
	FitCheckPrototype,
	fitCheckScreens,
	type FitCheckChanges,
} from "../prototype/fit-check-prototype";
import { PrototypePanel } from "../prototype/prototype-panel";
import type { PrototypeComment } from "../prototype/prototype-comments";
import { demoConceptHref, loadDemoConcept, saveDemoConcept } from "../shared/demo-session";
import { sampleFitCheck } from "../prototype/sample-fit-check";
import { directionPrototypes, prototypeSummaryFor } from "../prototype/direction-prototypes";
import { PrototypeSection } from "../prototype/prototype-section";
import type { ReviewDecision } from "../review/sample-review-directions";
import type { SparksStep } from "../shared/steps";
import { BlueprintSteps, type BlueprintSection, type BlueprintStepLine } from "./blueprint";
import type { DecisionEntry } from "./decision-log";
import {
	sampleBackFromPrototype,
	sampleBeyondAnswerReply,
	sampleBeyondReplies,
	sampleBeyondReply,
	sampleBuildProgress,
	sampleBuildStepMs,
	sampleChangeDoneReply,
	sampleChangeUnknownReplyFor,
	sampleNoFitMessageReply,
	sampleDesignClosestReply,
	sampleDesignKeptReply,
	sampleDesignReplies,
	sampleDesignReply,
	sampleElementIntent,
	sampleElementUnknownReply,
	sampleLiveStockReply,
	sampleNothingToRestoreReply,
	samplePrototypeBuildingReply,
	samplePathBuildingReply,
	samplePathConfirmReplies,
	samplePathConfirmReply,
	samplePathNotNowReply,
	samplePrototypeDoneReply,
	samplePrototypeIntent,
	samplePrototypeReadyReplies,
	samplePrototypeReadyReply,
	sampleRealDataReply,
	sampleRestoredReply,
	sampleShareReply,
	sampleVehicleFirstSummary,
	sampleVersionNames,
} from "../prototype/sample-prototype";
import { ValidatePanel, type Evaluation } from "../validate/validate-panel";
import {
	sampleBackToChoice,
	sampleEvaluation,
	sampleFixDoneReply,
	sampleFixes,
	sampleFixNotNowReply,
	sampleFixOfferReply,
	sampleRunParts,
	sampleRunProgress,
	sampleRunStepMs,
	sampleValidateGoAheadOpening,
	sampleValidateKeepImprovingReply,
	sampleValidatePlanAddedReply,
	sampleValidatePlanNotQuiteReply,
	sampleValidatePlanReply,
	sampleValidateQuestionReply,
	sampleValidateRerunReply,
	sampleValidateResultsReply,
	sampleValidateRunningReply,
	sampleValidateStoppedReply,
} from "../validate/sample-validate";
import { ReviewPanel, type Reviewer, type ReviewStatus } from "../review/review-panel";
import {
	sampleConceptForReview,
	sampleDecision,
	sampleDecisionMs,
	sampleDecisionOwner,
	sampleDecisionReply,
	sampleInviteNotQuiteReply,
	sampleInviteSentReply,
	sampleInviteUpdatedReply,
	sampleRecommendation,
	sampleRecommendationNotQuiteReply,
	sampleRecommendationReply,
	sampleRecommendationRewrittenReply,
	sampleReviewChanges,
	sampleReviewersFor,
	sampleReviewerViews,
	sampleReviewOpenReply,
	sampleReviewQuestionReply,
	sampleReviewStepMs,
	sampleReviewSummaryReply,
	sampleShareLaterReply,
	sampleSharedReply,
	sampleSubmittedReply,
} from "../review/sample-review";
import { sampleShareDepartment, sampleShareLink, sampleShareMemberFor, sampleShareOwner } from "../shared/sample-share";
import type { ShareMember } from "./share-popover";
import { sampleConceptName, sampleInitialPrompt, sampleMessages } from "./sample-concept";
import {
	SparksWorkspace,
	type SparksMessage,
	type SparksReply,
	type SparksSuggestion,
	type SparksWorkspaceProps,
} from "./workspace";

let nextId = 0;
const withNewId = (reply: SparksReply): SparksReply => ({ ...reply, id: `${reply.id}-${++nextId}` });

/* The Problem part's steps, in order; the last one is built from what Dana confirmed. */
const problemSteps = [sampleProblemStatementReply, sampleProblemWhoReply, sampleProblemWhyReply];

/** The problem as it stands: the sample, with Dana's edits to the suggestions. */
function problemFrom(messages: SparksMessage[]): ProblemDraft {
	const parts = { ...sampleProblem.parts };
	for (const message of messages) {
		if (message.from !== "sparks") continue;
		for (const part of message.parts) {
			if (part.kind !== "suggestion" || !part.suggestion.edited || !(part.suggestion.part in parts)) continue;
			const id = part.suggestion.part as ProblemPartId;
			parts[id] = { ...parts[id], text: part.suggestion.text, source: "edited" };
		}
	}
	const problem = { ...sampleProblem, parts };
	const changed = Object.values(parts).some((part) => part.source === "edited");
	return changed ? { ...problem, summary: sampleProblemSummaryFrom(problem) } : problem;
}

/** Marks the suggestions in a reply as confirmed, and as assumptions when she wasn't sure. */
const confirm = (message: SparksMessage, assumption = false): SparksMessage =>
	message.from === "sparks"
		? {
				...message,
				parts: message.parts.map((part) =>
					part.kind === "suggestion"
						? {
								...part,
								suggestion: {
									...part.suggestion,
									confirmed: true,
									assumption: part.suggestion.assumption || assumption,
									unsure: assumption || undefined,
								},
							}
						: part,
				),
			}
		: message;

type ClarifyPart = "brief-today" | "brief-why" | "brief-limits";

/**
 * How Dana answered each Clarify question, for the brief: the first answer she gave after it (past "Not quite"). Her
 * own words, or an edit on the card, make it hers; "I'm not sure" leaves Sparks's guess an assumption.
 */
function clarifyAnswers(messages: SparksMessage[]) {
	const answers: Partial<Record<ClarifyPart, { outcome: ClarifyOutcome; text: string }>> = {};
	messages.forEach((message, index) => {
		if (message.from !== "sparks") return;
		for (const part of message.parts) {
			if (part.kind !== "suggestion" || !part.suggestion.part.startsWith("brief-")) continue;
			const reply = messages
				.slice(index + 1)
				.find((m) => m.from === "user" && m.text !== "Not quite");
			if (!reply || reply.from !== "user") continue;
			const { suggestion } = part;
			answers[suggestion.part as ClarifyPart] =
				reply.text === "I'm not sure"
					? { outcome: "not-sure", text: suggestion.text }
					: suggestion.edited
						? { outcome: "her-words", text: suggestion.text }
						: reply.text === message.quickReplies?.[0]
							? { outcome: "confirmed", text: suggestion.text }
							: { outcome: "her-words", text: reply.text };
		}
	});
	return answers;
}

/**
 * Approval: the problem or what we know ("Looks right"), what success looks like or what we'll build ("Looks right, continue" on each), in the concept.
 */
const approve = (messages: SparksMessage[], kind: "problem" | "brief" | "success" | "chosen"): SparksMessage[] =>
	messages.map((message) =>
		message.from === "sparks"
			? {
					...message,
					parts: message.parts.map((part) =>
						part.kind === "problem" && kind === "problem"
							? { ...part, problem: { ...part.problem, approved: true } }
							: part.kind === "brief" && kind === "brief"
							? { ...part, brief: { ...part.brief, approved: true } }
							: part.kind === "success" && kind === "success"
								? { ...part, success: { ...part.success, approved: true } }
								: part.kind === "chosen" && kind === "chosen"
									? { ...part, chosen: { ...part.chosen, approved: true } }
									: part,
					),
				}
			: message,
	);

/** The last suggestion Sparks made for a part of the concept, as it stands (confirmed, edited). */
function lastSuggestion(messages: SparksMessage[], part: string) {
	for (const message of [...messages].reverse()) {
		if (message.from !== "sparks") continue;
		for (const p of message.parts) if (p.kind === "suggestion" && p.suggestion.part === part) return p.suggestion;
	}
	return undefined;
}

/** How Dana answered the Success questions, for the Success criteria, with the brief's assumptions. */
function successAnswers(messages: SparksMessage[]): SuccessAnswers {
	const measure = lastSuggestion(messages, "success-measure")!;
	const brief = messages
		.flatMap((m) => (m.from === "sparks" ? m.parts : []))
		.reverse()
		.find((part) => part.kind === "brief");
	return {
		goal: lastSuggestion(messages, "success-goal")!,
		measure,
		target: lastSuggestion(messages, "success-target")!,
		notWorse: lastSuggestion(messages, "success-not-worse")!,
		measureChoice: measure.text === sampleSuccessRepeatMeasure ? "repeat" : measure.edited ? "own" : "returns",
		briefAssumptions: brief?.kind === "brief" ? brief.brief.assumptions : [],
	};
}

/** Every direction Sparks has shown, in order. */
const directionsFrom = (messages: SparksMessage[]): DirectionDraft[] =>
	messages.flatMap((m) => (m.from === "sparks" ? m.parts : [])).flatMap((p) => (p.kind === "direction" ? [p.direction] : []));

/** "What we'll build" for the direction she picked: a quick reply ("Yes, go with it", or another's name). */
function chosenReply(messages: SparksMessage[], pick: string): SparksReply | undefined {
	const directions = directionsFrom(messages);
	const chosen =
		pick === sampleGoWithIt ? directions.find((direction) => direction.recommended) : directions.find((d) => d.name === pick);
	if (!chosen) return undefined;
	const target = lastSuggestion(messages, "success-target")?.text ?? "";
	return sampleChosenReply(chosen, sampleChosenFrom(chosen, directions, target));
}

/** Replaces the suggestion in a reply (and confirms it, unless `confirmed` is false). */
const answerSuggestion = (message: SparksMessage, suggestion: SparksSuggestion, confirmed = true): SparksMessage => {
	if (message.from !== "sparks") return message;
	const updated: SparksMessage = {
		...message,
		parts: message.parts.map((part) => (part.kind === "suggestion" ? { ...part, suggestion } : part)),
	};
	return confirmed ? confirm(updated) : updated;
};

/**
 * Her words after "Not quite", applied to Sparks's suggestion: starting "Add…" ("Add that also…", "Also…", "And also…", "Yes, and also…", "Plus…", "Include…"), they're
 * added to it; anything else replaces it. The live AI would rewrite the answer whole; the demo appends her addition as a
 * sentence (prds/sparks.md, "Talking with Sparks").
 */
const additionPattern = /^\s*(?:yes[\s,.!]*)?(?:please\s+)?(?:add|also|and\s+also|plus|include)\b[\s,:]*(?:that\s+|this\s+)?(?:also\s+)?/i;
function applyHerWords(current: string, words: string) {
	const match = words.match(additionPattern);
	if (!match) return words;
	const rest = words.slice(match[0].length).trim();
	if (!rest) return current;
	const sentence = `${rest.charAt(0).toUpperCase()}${rest.slice(1)}${/[.!?]$/.test(rest) ? "" : "."}`;
	return `${current.trim()}${/[.!?]$/.test(current.trim()) ? "" : "."} ${sentence}`;
}

/** The suggestion on a reply's card, if it has one. */
const askedSuggestion = (message: SparksMessage): SparksSuggestion | undefined => {
	if (message.from !== "sparks") return undefined;
	const part = message.parts.find((p) => p.kind === "suggestion");
	return part?.kind === "suggestion" ? part.suggestion : undefined;
};

/**
 * Confirms the question being answered; with her words (typed after "Not quite"), they replace the suggestion on its
 * card, or are added to it when they start "Add…" (`applyHerWords`), marked "Edited by you".
 */
const withAnswer = (
	messages: SparksMessage[],
	ask: SparksMessage | undefined,
	suggestion: SparksSuggestion | undefined,
	herWords?: string,
	assumption = false,
): SparksMessage[] =>
	messages.map((m) => {
		if (m !== ask) return m;
		if (herWords && suggestion)
			return answerSuggestion(m, { ...suggestion, text: applyHerWords(suggestion.text, herWords), edited: true, answering: false });
		return confirm(m, assumption);
	});

/**
 * Prototype, Storybook only: the scripted demo path (prds/sparks.md, "The demo"). Dana's description starts Plan's
 * Problem part, one thing at a time: the problem statement, who it affects, why it matters, then the summary, asking
 * "Does this capture the problem?": "Looks right" puts it in the concept and asks Clarify's first question; "Not quite"
 * asks what's off, and her correction brings the question again. The first quick reply confirms and moves on; "Not quite" asks what's
 * off, and her answer moves on; "I'm not sure" (Clarify) keeps Sparks's guess as an assumption. Sparks names the concept
 * after she confirms the problem statement. Each Clarify question after the first ("Why does it happen?", then "What
 * does a solution have to work around?") opens with how Sparks took the last answer; after the last, Sparks shows the
 * Problem brief, built from her answers, and asks if it looks right. "Looks right" puts it in the concept and asks
 * Success's first question, the goal; "Not quite" asks what's off, and her correction brings the question again. Her
 * answer to the goal (confirmed, or in her own words) opens the next question, the main measure: Sparks recommends the
 * returns, and "Repeat purchases instead" picks the other one. Her answer opens the target: from a past experiment for
 * the returns, an assumption with no starting point otherwise. A target for the returns beyond what the vehicle
 * selector managed gets Sparks's reason, with the source, and "Keep my target" (an assumption) or "Use 25%". Then what
 * must not get worse: online sales. After it, Sparks shows the Success criteria, built from her answers, and asks
 * "Ready to look at ways to get there?": "Yes, let's see them" puts them in the concept and shows all four directions at
 * once, Sparks's pick first, with its recommendation and "Want to go with it?"; "Not quite" asks what's off, and her
 * correction brings the question again. "Yes, go with it" or another direction's name brings "What we'll build",
 * drafted in one go, and "Ready for me to build it?"; anything else gets the question again. "Yes, build it" finishes
 * Plan; "Not quite" asks what's off, and her correction brings the question again.
 */
/** The decision as recorded: who decided, what, why and when. */
type ReviewDecisionRecord = ReviewDecision & { owner: string; date: string };

function WorkspacePrototype(props: SparksWorkspaceProps) {
	const [messages, setRawMessages] = React.useState<SparksMessage[]>(props.messages);
	const [conceptName, setConceptName] = React.useState(props.conceptName);
	// A story's messages reset the conversation only when they change, not when Storybook re-renders the same ones (a
	// story that clicks a quick reply for you would otherwise lose what the click added).
	const messageIds = props.messages.map((m) => m.id).join(",");
	const appliedIds = React.useRef(messageIds);
	React.useEffect(() => {
		if (appliedIds.current === messageIds) return;
		appliedIds.current = messageIds;
		setRawMessages(props.messages);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [messageIds]);
	React.useEffect(() => setConceptName(props.conceptName), [props.conceptName]);
	// The step Dana is on and the furthest reached; "Yes, build it" moves both to Prototype.
	const [step, setRawStep] = React.useState(props.currentStep);
	// Each new reply carries the step it came on (prds/sparks.md, "Steps in the conversation"): the step set in the same
	// event, so the reply that starts building is Prototype's. Set the step before adding its reply (React may work out the
	// new messages right away). The messages a story starts with keep theirs.
	const stepRef = React.useRef(props.currentStep);
	const setStep = (next: SparksStep) => {
		stepRef.current = next;
		setRawStep(next);
	};
	const setMessages = (update: React.SetStateAction<SparksMessage[]>) =>
		setRawMessages((current) => {
			const next = typeof update === "function" ? update(current) : update;
			const known = new Set(current.map((m) => m.id));
			return next.map((m) => (m.from === "sparks" && !m.step && !known.has(m.id) ? { ...m, step: stepRef.current } : m));
		});
	const [reached, setReached] = React.useState(props.reachedStep ?? props.currentStep);
	const chosenParts = messages.flatMap((m) => (m.from === "sparks" ? m.parts : [])).flatMap((p) => (p.kind === "chosen" ? [p.chosen] : []));
	// The direction picked in Plan (Sparks's pick if none yet).
	const planChoiceId = sampleDirections.find((d) => d.name === chosenParts[chosenParts.length - 1]?.name)?.id ?? sampleDirectionFitCheck.id;
	// Paths (prds/sparks-prototype.md, "Paths"): every direction built, in the order built, and the one shown. A story
	// that starts past Plan has its pick built. Review is about one path; on Review, that's the one shown.
	const [paths, setPaths] = React.useState<string[]>(() => ((props.reachedStep ?? props.currentStep) === "plan" ? [] : [planChoiceId]));
	const [activePath, setActivePath] = React.useState<string>();
	const [reviewPath, setReviewPath] = React.useState<string>();
	const chosenId = step === "review" && reviewPath ? reviewPath : (activePath ?? planChoiceId);
	const built = directionPrototypes[chosenId] ?? directionPrototypes["fit-check"];
	// Validate and Review follow the path shown: its "What we'll build" (drafted here when a story starts later, or for a
	// path added from the Blueprint).
	const direction = sampleDirections.find((d) => d.id === chosenId) ?? sampleDirectionFitCheck;
	const recommendedDirection = sampleRecommended(sampleDirections);
	const targetText = lastSuggestion(messages, "success-target")?.text ?? `${sampleSuccessSuggestedTarget}% fewer "doesn't fit" returns within 3 months of launch.`;
	const chosenDraftFor = (d: (typeof sampleDirections)[number]) =>
		[...chosenParts].reverse().find((c) => c.name === d.name) ?? sampleChosenFrom(d, sampleDirections, targetText);
	const chosenDraft = chosenDraftFor(direction);
	// A path's label, numbered as in Sparks's list of directions ("2. Flag often-returned parts").
	const directionOrder = directionsFrom(messages).length ? directionsFrom(messages) : sampleDirections;
	const pathLabel = (id: string) => {
		const index = directionOrder.findIndex((d) => d.id === id);
		const name = (sampleDirections.find((d) => d.id === id) ?? sampleDirectionFitCheck).name;
		return index >= 0 ? `${index + 1}. ${name}` : name;
	};

	// Each path's own build progress (screens built), versions and Validate runs. A story that opens on Prototype has its
	// pick built.
	type Version = { id: string; name: string; changes: FitCheckChanges };
	type Run = { evaluation: Evaluation; done: number; stopped?: boolean };
	type PathData = { ready: number; versions: Version[]; runs: Run[] };
	const firstVersion: Version = { id: "v1", name: sampleVersionNames.first, changes: {} };
	const pathDefault = (id: string): PathData => ({
		ready: (props.reachedStep ?? props.currentStep) !== "plan" ? (directionPrototypes[id] ?? directionPrototypes["fit-check"]).screens.length : 0,
		versions: [firstVersion],
		runs: [],
	});
	const [pathData, setPathData] = React.useState<Record<string, PathData>>({});
	const dataFor = (id: string) => pathData[id] ?? pathDefault(id);
	const updatePath = (id: string, update: (data: PathData) => PathData) =>
		setPathData((current) => ({ ...current, [id]: update(current[id] ?? pathDefault(id)) }));
	const { ready, versions, runs } = dataFor(chosenId);
	const setVersions = (update: (current: Version[]) => Version[]) => updatePath(chosenId, (d) => ({ ...d, versions: update(d.versions) }));
	const setRuns = (update: (current: Run[]) => Run[]) => updatePath(chosenId, (d) => ({ ...d, runs: update(d.runs) }));
	// The path being built (the one shown, unless another was started).
	const [buildingPath, setBuildingPath] = React.useState<string>();
	// The paths added from the Blueprint, for Decisions.
	const [pathDecisions, setPathDecisions] = React.useState<{ id: string; name: string; believe: string }[]>([]);
	/** A direction becomes a path: added (once), built from version 1, and shown. */
	const startPath = (id: string) => {
		setPaths((current) => (current.includes(id) ? current : [...current, id]));
		setPathData((current) => ({ ...current, [id]: { ready: 0, versions: [firstVersion], runs: [] } }));
		setActivePath(id);
		setBuildingPath(id);
	};
	/** Back to the choice in Plan, from Prototype, Validate or Review: the directions again, without the one she tried. */
	const backToChoice = (reason: string) => {
		setStep("plan");
		return sampleBackToChoiceReply(directionsFrom(messages), direction.name, reason, runs.length > 0);
	};

	// Changing it (prds/sparks-prototype.md, "Changing it"): every change saves a named version; the last is current.
	const changes = versions[versions.length - 1].changes;
	const saveVersion = (name: string, next: FitCheckChanges) => {
		const number = versions.length + 1;
		setVersions((current) => [...current, { id: `v${number}`, name, changes: next }]);
		return number;
	};
	// Restoring saves the version as the newest: nothing is lost.
	const restore = (id: string) => {
		const index = versions.findIndex((version) => version.id === id);
		const version = versions[index];
		const number = saveVersion(sampleVersionNames.restored(version.name), version.changes);
		return sampleRestoredReply(index + 1, version.name, number);
	};
	// "Edit element": on while she picks; then the element she picked, until she says what to change.
	const [pointing, setPointing] = React.useState(false);
	// Her comments on the prototype, kept here so the Comments panel lists them; the one opened from there.
	const [prototypeComments, setPrototypeComments] = React.useState<PrototypeComment[]>([]);
	const [openPrototypeComment, setOpenPrototypeComment] = React.useState<string | undefined>(undefined);
	const [pointedAt, setPointedAt] = React.useState<string>();
	// Validate (prds/sparks-validate.md): every run, with how far it got; the last one is shown.
	const lastRun = runs[runs.length - 1];
	const lastRunFinished = lastRun ? lastRun.done >= sampleRunParts(lastRun.evaluation) : false;
	// The finding whose fix Sparks offered in Prototype.
	const [pendingFix, setPendingFix] = React.useState<string>();
	/** Starts a run on the current prototype version, compared with the last finished run. */
	const startRun = () => {
		const previous = [...runs].reverse().find((r) => r.done >= sampleRunParts(r.evaluation) && !r.stopped)?.evaluation;
		const evaluation = sampleEvaluation(changes, versions.length, previous, chosenId);
		setRuns((current) => [...current, { evaluation, done: 0 }]);
		setStep("validate");
		setReached((current) => (current === "review" ? current : "validate"));
		return sampleValidateRunningReply(evaluation);
	};
	/** Updates the latest run's progress line, and adds a reply after it if there is one. */
	const setRunProgress = (progress: { text: string; done: boolean }, extra?: SparksReply) =>
		setMessages((current) => {
			const ids = current.map((m) => m.id);
			const index = ids.length - 1 - [...ids].reverse().findIndex((id) => id.startsWith("validate-running"));
			const updated = current.map((m, i) =>
				i === index && m.from === "sparks"
					? { ...m, parts: m.parts.map((p) => (p.kind === "progress" ? { kind: "progress" as const, ...progress } : p)) }
					: m,
			);
			return extra ? [...updated, withNewId(extra)] : updated;
		});
	// Running: one part at a time; the results come in, and when it's done, Sparks's read and the question.
	React.useEffect(() => {
		if (step !== "validate" || !lastRun || lastRun.stopped || lastRunFinished) return;
		const timer = window.setTimeout(() => {
			const done = lastRun.done + 1;
			setRuns((current) => current.map((r, i) => (i === current.length - 1 ? { ...r, done } : r)));
			const finished = done >= sampleRunParts(lastRun.evaluation);
			setRunProgress(sampleRunProgress(lastRun.evaluation, done), finished ? sampleValidateResultsReply(lastRun.evaluation) : undefined);
		}, sampleRunStepMs);
		return () => window.clearTimeout(timer);
	}, [step, lastRun, lastRunFinished]);
	const stopRun = () => {
		if (!lastRun) return;
		setRuns((current) => current.map((r, i) => (i === current.length - 1 ? { ...r, stopped: true } : r)));
		setRunProgress(sampleRunProgress(lastRun.evaluation, lastRun.done, true), sampleValidateStoppedReply);
	};
	// Review (prds/sparks-review.md): where it stands, the reviewers, what changed after the reviews, and her recommendation.
	const [review, setReview] = React.useState<{
		status: ReviewStatus;
		reviewers: Reviewer[];
		ticks: number;
		skipped: boolean;
		engineeringEffort?: boolean;
		openQuestions: string[];
		recommendation?: string;
		/** Her recommendation went to the decision owner. */
		submitted?: boolean;
		/** The decision, once made: kept for the Review's line in the Blueprint. */
		decision?: ReviewDecisionRecord;
	}>();
	const lastFinished = (list: Run[]) => [...list].reverse().find((r) => !r.stopped && r.done >= sampleRunParts(r.evaluation))?.evaluation;
	const lastEvaluation = lastFinished(runs);
	// What Review is about: the path sent there (the one shown, before any is).
	const reviewId = reviewPath ?? chosenId;
	const reviewData = dataFor(reviewId);
	const reviewChanges = reviewData.versions[reviewData.versions.length - 1].changes;
	const reviewDirection = sampleDirections.find((d) => d.id === reviewId) ?? sampleDirectionFitCheck;
	const reviewEvaluation = review?.skipped ? undefined : lastFinished(reviewData.runs);
	const concept = (extra: { engineeringEffort?: boolean; openQuestions?: string[]; changes?: FitCheckChanges; version?: number } = {}) =>
		sampleConceptForReview({
			changes: extra.changes ?? reviewChanges,
			version: extra.version ?? reviewData.versions.length,
			chosen: chosenDraftFor(reviewDirection),
			direction: reviewDirection,
			recommended: recommendedDirection,
			evaluation: reviewEvaluation,
			engineeringEffort: extra.engineeringEffort ?? review?.engineeringEffort,
			openQuestions: extra.openQuestions ?? review?.openQuestions,
		});
	/** Review opens: the concept for review, what's open, who to invite and the invitation (`opening` says how she got here). */
	const enterReview = (opening: string, skipped: boolean) => {
		setReview({ status: { kind: "ready" }, reviewers: [], ticks: 0, skipped, openQuestions: [] });
		setReviewPath(chosenId);
		setStep("review");
		setReached("review");
		const prepared = sampleConceptForReview({
			changes,
			version: versions.length,
			chosen: chosenDraft,
			direction,
			recommended: recommendedDirection,
			evaluation: skipped ? undefined : lastEvaluation,
		});
		return sampleReviewOpenReply(prepared, opening, skipped, chosenId);
	};
	// The reviewers, one step at a time (invited, opened, commented, their view); when all have a view, Sparks's summary.
	React.useEffect(() => {
		if (!review || review.status.kind !== "in-review") return;
		if (review.reviewers.every((r) => r.status === "view")) return;
		const timer = window.setTimeout(() => {
			const order: Reviewer["status"][] = ["invited", "opened", "commented", "view"];
			const index = review.ticks % review.reviewers.length;
			const views = sampleReviewerViews(reviewChanges, reviewId);
			const reviewers = review.reviewers.map((r, i) => {
				if (i !== index || r.status === "view") return r;
				const status = order[order.indexOf(r.status) + 1];
				// Commenting, they write the point they'll make in their view; then the view, with why.
				if (status === "commented") return { ...r, status, comment: views[r.id]?.why };
				return status === "view" ? { ...r, status, ...views[r.id] } : { ...r, status };
			});
			setReview({ ...review, reviewers, ticks: review.ticks + 1 });
			if (reviewers.every((r) => r.status === "view")) setMessages((current) => [...current, { ...withNewId(sampleReviewSummaryReply(reviewChanges, reviewId)), step: "review" }]);
		}, sampleReviewStepMs);
		return () => window.clearTimeout(timer);
	}, [review, reviewChanges, reviewId]);
	// Waiting for a decision: the decision owner decides, and Sparks tells her.
	React.useEffect(() => {
		if (review?.status.kind !== "waiting") return;
		const timer = window.setTimeout(() => {
			const decision = sampleDecision(reviewEvaluation, reviewId);
			const date = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
			setReview((current) =>
				current
					? {
							...current,
							status:
								decision.kind === "advance"
									? { kind: "advanced", owner: sampleDecisionOwner.name, date, reason: decision.reason }
									: { kind: "ready" },
							decision: { ...decision, owner: sampleDecisionOwner.name, date },
						}
					: current,
			);
			setMessages((current) => [...current, { ...withNewId(sampleDecisionReply(decision, reviewId)), step: "review" }]);
		}, sampleDecisionMs);
		return () => window.clearTimeout(timer);
	}, [review?.status.kind, reviewEvaluation, reviewId]);
	// Comments: each reviewer's feedback she's opened, at the status it was (a comment, then their view, each new once).
	const [readFeedback, setReadFeedback] = React.useState<Record<string, Reviewer["status"]>>({});
	const unreadFeedback =
		review && review.status.kind !== "ready"
			? review.reviewers.filter((r) => (r.status === "commented" || r.status === "view") && readFeedback[r.id] !== r.status).map((r) => r.id)
			: [];
	// "Share": who has access, Dana first; added people and departments after her, newest last, each once.
	const [shareMembers, setShareMembers] = React.useState<ShareMember[]>(() => [sampleShareOwner(props.user.firstName, props.user.avatarSrc)]);
	const addMembers = (added: ShareMember[]) =>
		setShareMembers((current) => [...current, ...added.filter((member) => !current.some((m) => m.id === member.id))]);
	const typedOver = (id: string, text: string, previous: string) => {
		const number = saveVersion(sampleVersionNames.typed(previous, text), { ...changes, text: { ...changes.text, [id]: text } });
		setMessages((current) => [...current, withNewId(sampleChangeDoneReply(`"${previous}" now reads "${text}"`, number))]);
	};

	// Building: one screen at a time, Sparks's progress updated in place; when it's done, Sparks introduces it.
	const building = messages.some((m) => m.from === "sparks" && m.id.startsWith("prototype-building"));
	// The path being built keeps building while she looks at another.
	const buildId = buildingPath ?? chosenId;
	const buildReady = dataFor(buildId).ready;
	const buildBuilt = directionPrototypes[buildId] ?? directionPrototypes["fit-check"];
	React.useEffect(() => {
		if (step !== "prototype" || !building || buildReady >= buildBuilt.screens.length) return;
		const timer = window.setTimeout(() => {
			const now = buildReady + 1;
			updatePath(buildId, (d) => ({ ...d, ready: now }));
			setMessages((current) => {
				const latest = current.length - 1 - [...current].reverse().findIndex((m) => m.id.startsWith("prototype-building"));
				const updated = current.map((m, i) =>
					i === latest && m.from === "sparks"
						? { ...m, parts: m.parts.map((p) => (p.kind === "progress" ? { kind: "progress" as const, ...sampleBuildProgress(buildBuilt.screens, now) } : p)) }
						: m,
				);
				return now >= buildBuilt.screens.length ? [...updated, withNewId(samplePrototypeReadyReply(buildId))] : updated;
			});
		}, sampleBuildStepMs);
		return () => window.clearTimeout(timer);
	}, [step, building, buildReady, buildBuilt, buildId]);

	// How many of the Problem part's steps Sparks has asked so far.
	const stepsAsked = messages.filter(
		(message) => message.from === "sparks" && problemSteps.some((step) => message.id.startsWith(step.id)),
	).length;
	const done = messages.some((message) => message.from === "sparks" && message.id.startsWith("problem-done"));
	// Her description of the problem, and whether it's the demo's: another problem is named from her own words.
	const statementAt = messages.findIndex((m) => m.from === "sparks" && m.id.startsWith("problem-statement"));
	const description = statementAt > 0 ? messages[statementAt - 1] : undefined;
	const offScript = description?.from === "user" && sampleProblemMessageKind(description.text) === "other";
	const problemName = offScript && description?.from === "user" ? sampleProblemNameFrom(description.text) : sampleConceptName;

	const send = (text: string) => {
		const last = messages[messages.length - 1];
		const lastAsk = [...messages]
			.reverse()
			.find((m): m is Extract<SparksMessage, { from: "sparks" }> => m.from === "sparks" && Boolean(m.quickReplies));
		const answeringAsk = last?.from === "sparks" && Boolean(last.quickReplies);
		// Her own words for the question card still open: after "Not quite" (the card folded to its question), or typed
		// instead of picking a quick reply.
		const openCard =
			last?.from === "sparks"
				? last.parts.find((part) => part.kind === "suggestion" && !part.suggestion.confirmed)
				: undefined;
		const inHerWords =
			openCard?.kind === "suggestion" &&
			last?.from === "sparks" &&
			(Boolean(openCard.suggestion.answering) || !last.quickReplies?.includes(text));
		const answeringNotQuite = (last?.from === "sparks" && last.id.startsWith("problem-not-quite")) || inHerWords;
		// Her bubble: what she typed; when it adds to the suggestion on the open card ("Add…", "Plus…"), the whole answer,
		// the suggestion with her addition, as it ends on the card.
		const adding = inHerWords && openCard?.kind === "suggestion" && additionPattern.test(text);
		const userMessage: SparksMessage = {
			id: `u${++nextId}`,
			from: "user",
			text: adding && openCard?.kind === "suggestion" ? applyHerWords(openCard.suggestion.text, text) : text,
		};
		const onBrief = lastAsk?.id.startsWith("brief-summary") || lastAsk?.id.startsWith("brief-again");
		const onProblemSummary = lastAsk?.id.startsWith("problem-done") || lastAsk?.id.startsWith("problem-summary-again");
		const onSuccessSummary = lastAsk?.id.startsWith("success-summary") || lastAsk?.id.startsWith("success-again");
		const onUnlikelyTarget = lastAsk?.id.startsWith("success-target-unlikely");
		// The directions, waiting for "Yes, go with it" or another's name; then "What we'll build", for "Yes, build it".
		const onDirections = lastAsk?.id.startsWith("directions");
		const onChosen = lastAsk?.id.startsWith("chosen-summary") || lastAsk?.id.startsWith("chosen-again");
		// The Success question on the card being answered (the goal, the main measure, the target, then what must not get worse).
		const successAsk =
			lastAsk?.from === "sparks"
				? lastAsk.parts.find((part) => part.kind === "suggestion" && part.suggestion.part.startsWith("success-"))
				: undefined;
		let next: SparksMessage[] = [...messages, userMessage];
		// Another path, offered from the Blueprint: "Yes, build it" builds it beside the others; "Not now" leaves it.
		const confirmingPath =
			lastAsk?.id.startsWith("path-confirm-") && answeringAsk ? lastAsk.id.replace(/^path-confirm-/, "").replace(/-\d+$/, "") : undefined;

		if (confirmingPath && samplePathConfirmReplies.includes(text)) {
			if (text === samplePathConfirmReplies[0]) {
				const added = sampleDirections.find((d) => d.id === confirmingPath) ?? sampleDirectionFitCheck;
				next = [...next, withNewId(samplePathBuildingReply(added.name, (directionPrototypes[added.id] ?? directionPrototypes["fit-check"]).screens, 0, added.id))];
				startPath(added.id);
				setPathDecisions((current) => [...current, { id: `path-${added.id}-${current.length}`, name: added.name, believe: chosenDraftFor(added).believe }]);
				setStep("prototype");
			} else next = [...next, withNewId(samplePathNotNowReply)];
		} else if (step === "review") {
			// Review: the invitation, the reviews' proposed changes, the recommendation and submitting, then sharing.
			const askId = lastAsk?.id ?? "";
			let reply: SparksReply;
			if (askId.startsWith("review-open") && answeringAsk && text === "Looks right, send it") {
				setReview((current) => (current ? { ...current, status: { kind: "in-review" }, reviewers: sampleReviewersFor(chosenId) } : current));
				reply = sampleInviteSentReply;
			} else if (askId.startsWith("review-open") && answeringAsk && text === "Run Validate first") {
				setStep("validate");
				reply = runs.length ? startRun() : sampleValidatePlanReply(sampleEvaluation(changes, versions.length, undefined, chosenId).scenarios);
			} else if (askId.startsWith("review-open") && answeringAsk && text === "Not quite") reply = sampleInviteNotQuiteReply;
			else if (last?.id.startsWith("review-invite-not-quite")) reply = sampleInviteUpdatedReply;
			else if (askId.startsWith("review-summary") && answeringAsk && (text === "Make the changes" || text === "Not now")) {
				const make = text === "Make the changes";
				const proposed = sampleReviewChanges(changes, chosenId);
				const question = proposed.question;
				let nextChanges = changes;
				let version = versions.length;
				let opening = "Okay, nothing changed.\n\n";
				if (make) {
					const moved = proposed.prototype;
					if (moved) {
						nextChanges = moved.changes;
						version = saveVersion(moved.version, nextChanges);
					}
					opening = `Done: ${moved ? `${moved.done} (version ${version}), ` : ""}the question is under "Open questions", and the effort is engineering's.${moved ? " Validate needs a check now, since the prototype changed." : ""}\n\n`;
				}
				const recommendation = sampleRecommendation(reviewEvaluation, chosenId);
				const openQuestions = make ? [...(review?.openQuestions ?? []), question] : (review?.openQuestions ?? []);
				setReview((current) => (current ? { ...current, recommendation, engineeringEffort: current.engineeringEffort || make, openQuestions } : current));
				reply = sampleRecommendationReply(
					opening,
					recommendation,
					concept({ changes: nextChanges, version, engineeringEffort: review?.engineeringEffort || make, openQuestions }),
				);
			} else if (askId.startsWith("review-recommendation") && answeringAsk && text === "Looks right, submit it") {
				setReview((current) => (current ? { ...current, status: { kind: "waiting", owner: sampleDecisionOwner.name }, submitted: true } : current));
				reply = sampleSubmittedReply;
			} else if (askId.startsWith("review-recommendation") && answeringAsk && text === "Not quite") reply = sampleRecommendationNotQuiteReply;
			else if (last?.id.startsWith("review-recommendation-not-quite")) {
				setReview((current) => (current ? { ...current, recommendation: text } : current));
				reply = sampleRecommendationRewrittenReply;
			} else if (askId.startsWith("review-decided") && answeringAsk && text === "Share it with them") {
				// The same sharing as "Share": the reviewers' departments join "Who has access".
				addMembers(sampleReviewersFor(chosenId).map((reviewer) => sampleShareDepartment(reviewer.department)));
				reply = sampleSharedReply(chosenId);
			}
			else if (askId.startsWith("review-decided") && answeringAsk && text === sampleBackToChoice)
				reply = backToChoice(`${sampleDecisionOwner.name}'s reason is first in Decisions, so whatever you pick next starts from it.`);
			else if (askId.startsWith("review-decided") && answeringAsk && text === "Not now") reply = sampleShareLaterReply;
			else if (askId.startsWith("review-decided") && answeringAsk && text === "Run Validate") {
				setStep("validate");
				reply = runs.length ? startRun() : sampleValidatePlanReply(sampleEvaluation(changes, versions.length, undefined, chosenId).scenarios);
			} else reply = sampleReviewQuestionReply(text, chosenId, reviewEvaluation);
			next = [...next, withNewId(reply)];
		} else if (step === "validate") {
			// Validate: the plan's answers, then running it again, going ahead or keeping on improving; anything else is a
			// question about the results.
			const askId = lastAsk?.id ?? "";
			let reply: SparksReply;
			if (askId.startsWith("validate-plan") && answeringAsk && text === "Looks right, continue") reply = startRun();
			else if (askId.startsWith("validate-plan") && answeringAsk && text === "Not quite") reply = sampleValidatePlanNotQuiteReply;
			else if (last?.id.startsWith("validate-plan-not-quite"))
				reply = /neighbou?r|friend|real (person|customer)/i.test(text) ? sampleValidateQuestionReply(text, lastRun?.evaluation) : sampleValidatePlanAddedReply(text);
			else if (/^run (it )?again/i.test(text)) reply = startRun();
			else if (text === sampleBackToChoice && lastRunFinished && !lastRun?.stopped)
				reply = backToChoice("The evaluation suggests it won't reach your target on its own.");
			else if (text === "Go ahead to Review") {
				const open = lastRun?.evaluation.findings.filter((f) => f.status === "open" && f.severity !== "Minor").length ?? 0;
				reply =
					!lastRunFinished || lastRun?.stopped || lastRun?.evaluation.version !== versions.length
						? sampleValidateRerunReply
						: enterReview(sampleValidateGoAheadOpening(0), false); // The open findings are listed as known issues right after.
			} else if (text === "Keep improving") reply = sampleValidateKeepImprovingReply(lastRun?.evaluation);
			else reply = sampleValidateQuestionReply(text, lastRun?.evaluation);
			next = [...next, withNewId(reply)];
		} else if (step === "prototype" && (lastAsk?.id ?? "").startsWith("prototype-fix-done") && answeringAsk) {
			// After a fix from Validate: run it again, or not now.
			next = [...next, withNewId(text === "Run it again" ? startRun() : sampleFixNotNowReply)];
		} else if (step === "prototype" && (lastAsk?.id ?? "").startsWith("prototype-fix") && answeringAsk && pendingFix) {
			// "Fix this in the prototype": she makes the change Sparks offered, or not now.
			if (text === "Make the change") {
				const fix = sampleFixes[pendingFix];
				const number = saveVersion(fix.version, { ...changes, ...fix.changes });
				next = [...next, withNewId(sampleFixDoneReply(fix.summary, number))];
			} else next = [...next, withNewId(sampleFixNotNowReply)];
			setPendingFix(undefined);
		} else if (step === "prototype") {
			// Prototype: a change to what she pointed at; an answer to Sparks's options; "Yes, test it" or "Go to Review
			// instead" once it's built; otherwise a change asked for in words.
			const builtAll = ready >= built.screens.length;
			const askId = lastAsk?.id ?? "";
			let reply: SparksReply;
			if (pointedAt) {
				const element = built.elements[pointedAt] ?? "that";
				const intent = sampleElementIntent(text);
				reply =
					intent.kind === "larger"
						? sampleChangeDoneReply(
								`I made ${element} bigger`,
								saveVersion(sampleVersionNames.larger(element), { ...changes, larger: [...(changes.larger ?? []), pointedAt] }),
							)
						: intent.kind === "rename"
							? sampleChangeDoneReply(
									`${element} now says "${intent.text}"`,
									saveVersion(sampleVersionNames.rename(element, intent.text), {
										...changes,
										text: { ...changes.text, [pointedAt]: intent.text },
									}),
								)
							: intent.kind === "light-text"
								? sampleDesignReply
								: sampleElementUnknownReply(element);
				setPointedAt(undefined);
			} else if (askId.startsWith("prototype-beyond") && sampleBeyondReplies.includes(text)) {
				reply = text === sampleBackToChoice ? backToChoice(sampleBackFromPrototype.beyond(direction.name)) : sampleBeyondAnswerReply(text);
			} else if (samplePrototypeIntent(text, chosenId).kind === "choice") {
				// Asking for another direction, in words: the choice reopens in Plan.
				reply = backToChoice(sampleBackFromPrototype.asked);
			} else if (askId.startsWith("prototype-design") && sampleDesignReplies.includes(text)) {
				reply =
					text === "Keep my change"
						? sampleDesignKeptReply(saveVersion(sampleVersionNames.lightText, { ...changes, lightText: true }))
						: sampleDesignClosestReply;
			} else if (builtAll && text === "Yes, test it") {
				// Validate opens: the plan first (or straight to a new run, once there's been one).
				setStep("validate");
				setReached((current) => (current === "review" ? current : "validate"));
				reply = runs.length ? startRun() : sampleValidatePlanReply(sampleEvaluation(changes, versions.length, undefined, chosenId).scenarios);
			} else if (builtAll && text === "Go to Review instead") {
				reply = enterReview("Done. The prototype is in your blueprint, and we'll skip Validate.\n\n", true);
			} else if (builtAll && samplePrototypeReadyReplies.includes(text)) {
				reply = samplePrototypeDoneReply(text);
			} else {
				const intent = samplePrototypeIntent(text, chosenId);
				reply =
					intent.kind === "direction-change"
						? sampleChangeDoneReply(intent.summary, saveVersion(intent.version, { ...changes, [intent.change]: true }))
						: intent.kind === "no-fit-message"
							? sampleNoFitMessageReply(direction.name, chosenId)
							: intent.kind === "vehicle-first"
						? sampleChangeDoneReply(sampleVehicleFirstSummary, saveVersion(sampleVersionNames.vehicleFirst, { ...changes, vehicleFirst: true }))
						: intent.kind === "live-stock"
							? sampleLiveStockReply(saveVersion(sampleVersionNames.liveStock, { ...changes, liveStock: true }))
							: intent.kind === "light-text"
								? sampleDesignReply
								: intent.kind === "beyond"
									? sampleBeyondReply(direction.name)
									: intent.kind === "restore"
										? versions.length > 1
											? restore(versions[versions.length - 2].id)
											: sampleNothingToRestoreReply
										: intent.kind === "real-data"
											? sampleRealDataReply
											: intent.kind === "share"
												? sampleShareReply
												: sampleChangeUnknownReplyFor(chosenId);
			}
			next = [...next, withNewId(reply)];
		} else if (!messages.some((m) => m.from === "sparks" && m.id.startsWith("problem-statement"))) {
			// Her description: the demo's problem gets sharpened with the data; too little gets asked again; another problem
			// is structured from her words alone.
			const kind = sampleProblemMessageKind(text);
			next = [
				...next,
				withNewId(
					kind === "demo"
						? sampleProblemStatementReply
						: kind === "unclear"
							? sampleProblemUnclearReply
							: sampleProblemFromWordsReply(text),
				),
			];
		} else if (onProblemSummary && (answeringAsk || last?.id.startsWith("problem-summary-not-quite"))) {
			// The Problem summary: "Looks right" puts it in the concept and asks Clarify's first question; "Not quite" asks
			// what's off; her correction updates it.
			if (text === "Looks right, continue")
				next = [...approve(messages, "problem"), userMessage, withNewId(sampleProblemApprovedReply)];
			else if (answeringAsk && text === "Not quite") next = [...next, withNewId(sampleProblemSummaryNotQuiteReply)];
			else next = [...next, withNewId(sampleProblemSummaryAgainReply)];
		} else if (onBrief && (answeringAsk || last?.id.startsWith("brief-not-quite"))) {
			// The brief: "Looks right" puts it in the concept; "Not quite" asks what's off; her correction updates it.
			if (text === "Looks right, continue") next = [...approve(messages, "brief"), userMessage, withNewId(sampleBriefApprovedReply)];
			else if (answeringAsk && text === "Not quite") next = [...next, withNewId(sampleBriefNotQuiteReply)];
			else next = [...next, withNewId(sampleBriefAgainReply)];
		} else if (onSuccessSummary && (answeringAsk || last?.id.startsWith("success-not-quite"))) {
			// The Success criteria: "Yes, let's see them" puts them in the concept; "Not quite" asks what's off; her
			// correction updates them.
			if (text === "Looks right, continue")
				next = [
					...approve(messages, "success"),
					userMessage,
					withNewId(sampleSuccessApprovedReply(successAnswers(messages).measureChoice)),
				];
			else if (answeringAsk && text === "Not quite") next = [...next, withNewId(sampleSuccessNotQuiteReply)];
			else next = [...next, withNewId(sampleSuccessAgainReply)];
		} else if (onUnlikelyTarget && (answeringAsk || answeringNotQuite)) {
			// Her target looked unlikely: she keeps it, as an assumption, or takes Sparks's. Either way, Sparks moves on.
			const lowered = text === `Use ${sampleSuccessSuggestedTarget}%`;
			const original = lastSuggestion([sampleSuccessTargetReply("yes")], "success-target")!;
			next = messages.map((m) => {
				const target = m.from === "sparks" && m.parts.find((p) => p.kind === "suggestion" && p.suggestion.part === "success-target");
				if (!target || target.kind !== "suggestion") return m;
				return answerSuggestion(m, lowered ? original : { ...target.suggestion, assumption: true });
			});
			next = [...next, userMessage, withNewId(sampleSuccessNotWorseReply(lowered ? "lowered" : "kept"))];
		} else if (onDirections && answeringAsk) {
			// The directions: she goes with Sparks's pick or picks another, and Sparks drafts "What we'll build"; anything
			// else gets the question again.
			const reply = chosenReply(messages, text);
			next = [...next, withNewId(reply ?? sampleDirectionsAgainReply(directionsFrom(messages)))];
		} else if (onChosen && (answeringAsk || last?.id.startsWith("chosen-not-quite"))) {
			// "What we'll build": "Yes, build it" puts it in the concept and finishes Plan; "Not quite" asks what's off; her
			// correction updates it.
			const chosen = [...messages]
				.reverse()
				.flatMap((m) => (m.from === "sparks" ? m.parts : []))
				.find((p) => p.kind === "chosen");
			if (text === "Looks right, continue") {
				// Plan is done: Prototype opens beside the conversation, and Sparks starts building.
				const name = chosen?.kind === "chosen" ? chosen.chosen.name : "";
				const id = sampleDirections.find((d) => d.name === name)?.id ?? "fit-check";
				next = [
					...approve(messages, "chosen"),
					userMessage,
					withNewId(samplePrototypeBuildingReply(name, (directionPrototypes[id] ?? directionPrototypes["fit-check"]).screens, 0, id)),
				];
				setStep("prototype");
				setReached("prototype");
				// The pick is a path: the first, or another one after going back to the choice. Its prototype and evaluation
				// start fresh; the other paths, and the review of one, stay.
				startPath(id);
				setPendingFix(undefined);
			}
			else if (answeringAsk && text === "Not quite") next = [...next, withNewId(sampleChosenNotQuiteReply)];
			else next = [...next, withNewId(sampleChosenAgainReply)];
		} else if (answeringAsk && text === "Not quite" && openCard) {
			// "Not quite" on a question card: the card folds to its question, and she answers it in the message box. No
			// bubble and no reply: the question is what's asked.
			next = messages.map((m) =>
				m === last && m.from === "sparks"
					? {
							...m,
							parts: m.parts.map((p) =>
								p.kind === "suggestion" ? { ...p, suggestion: { ...p.suggestion, answering: true } } : p,
							),
						}
					: m,
			);
		} else if (answeringAsk && text === "Not quite") {
			// "Not quite" with no card: Sparks asks what's off; her answer moves on.
			next = [...next, withNewId(sampleProblemNotQuiteReply)];
		} else if (successAsk?.kind === "suggestion" && (answeringAsk || answeringNotQuite)) {
			// A Success question: Sparks's suggestion confirmed, the other measure it offered, or her own words (typed, or
			// edited on the card). The other measure, or her words, replace the suggestion on the card.
			const { suggestion } = successAsk;
			const alternative = answeringAsk && text === "Repeat purchases instead";
			const typed = !alternative && !(answeringAsk && text === lastAsk?.quickReplies?.[0]);
			const answer: SuccessAnswer = alternative ? "alternative" : typed || suggestion.edited ? "typed" : "yes";
			const answered = alternative
				? { ...suggestion, text: sampleSuccessRepeatMeasure, basis: undefined }
				: typed
					? { ...suggestion, text: applyHerWords(suggestion.text, text), edited: true }
					: suggestion;
			// A target for the returns beyond what the vehicle selector managed: her number goes on the card, and Sparks says
			// why it looks unlikely before moving on.
			const unlikely =
				suggestion.part === "success-target" &&
				suggestion.basis === "Previous experiments" &&
				Boolean(answered.edited) &&
				sampleSuccessTargetUnlikely(answered.text);
			if (unlikely) {
				next = [
					...messages.map((m) => (m === lastAsk ? answerSuggestion(m, answered, false) : m)),
					userMessage,
					withNewId(sampleSuccessTargetUnlikelyReply),
				];
			} else {
				next = [...messages.map((m) => (m === lastAsk ? answerSuggestion(m, answered) : m)), userMessage];
				const reply =
					suggestion.part === "success-goal"
						? sampleSuccessMeasureReply(answer)
						: suggestion.part === "success-measure"
							? sampleSuccessTargetReply(answer)
							: suggestion.part === "success-target"
								? sampleSuccessNotWorseReply(answer)
								: sampleSuccessSummaryReply(answer, sampleSuccessFrom(successAnswers(next)));
				next = [...next, withNewId(reply)];
			}
		} else if (!done && (answeringAsk || answeringNotQuite)) {
			// Problem: confirmed, so Sparks asks the next thing, then sums up. Corrected (her words after "Not quite", or an
			// edit on the card), her words go on the card and Sparks says what changed and why it matters first.
			const asked = lastAsk ? askedSuggestion(lastAsk) : undefined;
			const corrected = Boolean(asked) && (answeringNotQuite || Boolean(asked?.edited));
			next = [...withAnswer(messages, lastAsk, asked, answeringNotQuite ? text : undefined), userMessage];
			if (stepsAsked === 1) setConceptName(problemName);
			const problem = problemFrom(next);
			next = [
				...next,
				withNewId(
					corrected && asked
						? sampleProblemCorrectedReply(
								asked.part as ProblemCorrectable,
								problem,
								problemName,
								answeringNotQuite && additionPattern.test(text),
							)
						: stepsAsked === 1
							? sampleProblemWhoReplyFor(problemName)
							: stepsAsked < problemSteps.length
								? problemSteps[stepsAsked]
								: sampleProblemDoneReply(problem),
				),
			];
		} else if (done && (answeringAsk || answeringNotQuite)) {
			// A Clarify question answered: "I'm not sure" keeps Sparks's guess as an assumption. Sparks takes the answer in
			// one line and asks the next question; after the last one, it shows the brief.
			const question = lastAsk ? askedSuggestion(lastAsk) : undefined;
			const answer: ClarifyAnswer =
				text === "I'm not sure"
					? "not-sure"
					: answeringAsk && text === lastAsk?.quickReplies?.[0] && !question?.edited
						? "yes"
						: "typed";
			// How many of the questions after the first Sparks has asked: each reply's id starts with its question's.
			const asked = sampleClarifyNextReplies.filter((ask) =>
				messages.some((m) => m.from === "sparks" && m.id.startsWith(ask("yes").id)),
			).length;
			const nextAsk = sampleClarifyNextReplies[asked];
			// Her words after "Not quite" go on the card, as an edit would.
			next = [
				...withAnswer(messages, lastAsk, question, answeringNotQuite ? text : undefined, answer === "not-sure"),
				userMessage,
			];
			next = [...next, withNewId(nextAsk ? nextAsk(answer) : sampleBriefReply(answer, sampleBriefFrom(clarifyAnswers(next))))];
		}
		setMessages(next);
		props.onSend?.(text);
	};

	/**
	 * A direction's action in the Blueprint (prds/sparks-plan-compare.md, "Directions in the blueprint"): before Plan is
	 * done, picking it, as in the conversation; after, its path opens if it's built, or Sparks offers to build it.
	 */
	const runDirection = (picked: (typeof sampleDirections)[number]) => {
		if (!paths.length) {
			// "Generate prototype" in Plan is her choice and her go-ahead in one: Sparks shows what it'll build, already in
			// the blueprint, finishes Plan and starts building; Prototype opens and the conversation goes on there.
			const summary = chosenReply(messages, picked.name);
			const card = summary?.parts.find((part) => part.kind === "chosen");
			const opening = summary?.parts.find((part) => part.kind === "text");
			if (!summary || card?.kind !== "chosen") return;
			const build = samplePrototypeBuildingReply(
				picked.name,
				(directionPrototypes[picked.id] ?? directionPrototypes["fit-check"]).screens,
				0,
				picked.id,
			);
			const reply = withNewId({
				...build,
				parts: [...(opening ? [opening] : []), { ...card, chosen: { ...card.chosen, approved: true } }, ...build.parts],
			});
			setStep("prototype");
			setReached("prototype");
			setMessages((current) => [
				...current,
				{ id: `u${++nextId}`, from: "user", text: `Generate a prototype of "${picked.name}".` },
				reply,
			]);
			startPath(picked.id);
			setPendingFix(undefined);
			return;
		}
		if (paths.includes(picked.id)) {
			setActivePath(picked.id);
			setStep("prototype");
			return;
		}
		setMessages((current) => [
			...current,
			{ id: `u${++nextId}`, from: "user", text: `Let's also try "${picked.name}".` },
			withNewId(samplePathConfirmReply(picked.id, picked.name, direction.name, chosenDraftFor(picked).believe)),
		]);
	};

	// Esc after "Not quite": the card opens again, as before she picked it.
	const cancelAnswer = () =>
		setMessages((current) =>
			current.map((message, index) =>
				index === current.length - 1 && message.from === "sparks"
					? {
							...message,
							parts: message.parts.map((p) =>
								p.kind === "suggestion" ? { ...p, suggestion: { ...p.suggestion, answering: false } } : p,
							),
						}
					: message,
			),
		);

	const editSuggestion = (replyId: string, part: string, text: string) =>
		setMessages((current) =>
			current.map((message) =>
				message.id === replyId && message.from === "sparks"
					? {
							...message,
							parts: message.parts.map((p) =>
								p.kind === "suggestion" && p.suggestion.part === part
									? { ...p, suggestion: { ...p.suggestion, text, edited: true } }
									: p,
							),
						}
					: message,
			),
		);

	// The Blueprint's sections after Plan's (the workspace takes those from the messages; prds/sparks.md, "The Blueprint"):
	// what we built, once the prototype is built (its spec: what's pretend, what the real thing would need), then where
	// each later step stands, one line each with "Open". The evaluation and the review stay in their own steps' panels.
	const prototypeBuilt = reached !== "plan" && (reached !== "prototype" || ready >= built.screens.length);
	const validateSkipped = Boolean(review?.skipped) && runs.length === 0;
	const reviewStatusLabel = { ready: "Ready for review", "in-review": "In review", waiting: "Waiting for a decision", advanced: "Advanced" } as const;
	const reviewDecisionLabel = { advance: "Advanced", "iterate-validate": "Back to Validate", "iterate-choice": "Back to the choice in Plan" } as const;
	const currentVersion = versions[versions.length - 1];
	const stepLines: BlueprintStepLine[] = [
		...(reached !== "plan"
			? [
					{
						step: "Prototype",
						text: prototypeBuilt
							? `${paths.length > 1 ? `${direction.name}, v` : "V"}ersion ${versions.length}: ${currentVersion.name}.${paths.length > 1 ? ` ${paths.length} paths built.` : ""}`
							: `Building, ${ready} of ${built.screens.length} screens.`,
						onOpen: () => setStep("prototype"),
					},
				]
			: []),
		...(reached === "validate" || reached === "review"
			? [
					{
						step: "Validate",
						text: validateSkipped
							? "Skipped: the hypothesis isn't tested."
							: !lastRun
								? "Not run yet."
								: lastRun.stopped
									? `Run ${runs.length} on version ${lastRun.evaluation.version}, stopped.`
									: !lastRunFinished
										? `Run ${runs.length} on version ${lastRun.evaluation.version}, running.`
										: `Run ${runs.length} on version ${lastRun.evaluation.version}: ${lastRun.evaluation.read}. ${lastRun.evaluation.hypothesis.outcome}.`,
						onOpen: validateSkipped ? undefined : () => setStep("validate"),
					},
				]
			: []),
		...(review
			? [
					{
						step: "Review",
						text: review.decision
							? `${reviewDecisionLabel[review.decision.kind]}, by ${review.decision.owner}, ${review.decision.date}.`
							: review.status.kind === "in-review"
								? `In review: ${review.reviewers.filter((r) => r.status === "view").length} of ${review.reviewers.length} views in.`
								: `${reviewStatusLabel[review.status.kind]}.`,
						onOpen: () => setStep("review"),
					},
				]
			: []),
	];
	const conceptSections: BlueprintSection[] = [
		...(prototypeBuilt
			? [
					{
						id: "prototype",
						title: paths.length > 1 ? `What we built: ${direction.name}` : "What we built",
						content: (
							<PrototypeSection summary={prototypeSummaryFor(chosenId, direction.howItWorks, versions)} onTry={() => setStep("prototype")} />
						),
					},
				]
			: []),
		...(stepLines.length ? [{ id: "where-it-stands", title: "Where it stands", content: <BlueprintSteps lines={stepLines} /> }] : []),
	];

	// The decisions after Plan's (prds/sparks.md, "The decision log"), from what happened. Each id carries the round (how
	// many prototypes were built: a new pick after going back to the choice builds again and resets the later steps), so
	// a later round's decisions are new entries and the earlier ones stay.
	const round = messages.filter((m) => m.from === "sparks" && m.id.startsWith("prototype-building")).length;
	const who = props.user.firstName;
	const decisionLabel = {
		advance: "Advanced the idea",
		"iterate-validate": "Asked to iterate: back to Validate",
		"iterate-choice": "Asked to iterate: back to the choice in Plan",
	} as const;
	const laterDecisions: DecisionEntry[] = [
		...pathDecisions.map((added) => ({ id: added.id, what: `Added a path: ${added.name}`, detail: added.believe, who, step: "Prototype" })),
		...versions
			.filter((v) => v.name === sampleVersionNames.lightText)
			.map((v) => ({
				id: `prototype-light-text-${round}-${v.id}`,
				what: "Kept light gray text, against the design system",
				detail: "It fails the contrast standard; it's listed under \"Departs from the design system\" for the UX team.",
				who,
				step: "Prototype",
			})),
		...(reached === "validate" || reached === "review"
			? [{ id: `prototype-done-${round}`, what: `Finished Prototype at version ${runs[0]?.evaluation.version ?? versions.length}`, who, step: "Prototype" }]
			: []),
		...(review?.skipped && runs.length === 0
			? [{ id: `validate-skipped-${round}`, what: "Skipped Validate", detail: "The hypothesis isn't tested; Review lists it as a gap.", who, step: "Validate" }]
			: []),
		...(review && !review.skipped && lastEvaluation
			? [
					{
						id: `validate-go-ahead-${round}`,
						what: "Went ahead to Review",
						detail: `Evidence status: ${lastEvaluation.hypothesis.outcome}.`,
						who,
						step: "Validate",
					},
				]
			: []),
		...(review?.reviewers ?? [])
			.filter((r) => r.status === "view" && r.view)
			.map((r) => ({ id: `review-view-${round}-${r.id}`, what: r.view!, detail: r.why, who: r.department, step: "Review" })),
		...(review?.recommendation
			? [
					{
						id: `review-changes-${round}`,
						what: review.engineeringEffort ? "Accepted the changes Sparks proposed after the reviews" : "Kept the idea as it was after the reviews",
						who,
						step: "Review",
					},
				]
			: []),
		...(review?.submitted && review.recommendation
			? [{ id: `review-recommendation-${round}`, what: `Sent the recommendation to ${sampleDecisionOwner.name}`, detail: review.recommendation, who, step: "Review" }]
			: []),
		...(review?.decision
			? [
					{
						id: `review-decision-${round}-${review.decision.kind}`,
						what: decisionLabel[review.decision.kind],
						detail: `"${review.decision.reason}"`,
						who: review.decision.owner,
						step: "Review",
					},
				]
			: []),
		...(messages.some((m) => m.from === "sparks" && m.id.startsWith("review-shared"))
			? [{ id: `review-shared-${round}`, what: "Shared it with the reviewers' departments, without edit rights", who, step: "Review" }]
			: []),
	];

	// Prototype: the concept she started from "New idea" (or reopened from its row) shows in "Your ideas", where it
	// stands, and reopens with its conversation (prds/sparks.md, "The start page"; `demo-session.ts`).
	const tracksDemo = React.useRef(
		(() => {
			if (props.messages.length === 0) return true;
			const saved = loadDemoConcept()?.workspace.messages ?? [];
			return saved.length === props.messages.length && saved[saved.length - 1]?.id === props.messages[props.messages.length - 1]?.id;
		})(),
	).current;
	const demoCreatedAt = React.useRef(props.messages.length === 0 ? undefined : loadDemoConcept()?.summary.createdAt);
	React.useEffect(() => {
		const first = messages.find((m) => m.from === "user");
		if (!tracksDemo || first?.from !== "user") return;
		const now = new Date().toISOString();
		demoCreatedAt.current ??= now;
		const others = shareMembers.length - 1;
		const reviewKind = review?.status.kind;
		saveDemoConcept({
			summary: {
				id: "demo",
				name: conceptName,
				summary: first.text,
				sharing: others > 0 ? `You and ${others} other${others > 1 ? "s" : ""}` : "Only you",
				createdAt: demoCreatedAt.current,
				editedAt: now,
				validation: lastEvaluation
					? Math.round((lastEvaluation.scenarios.filter((x) => x.outcome === "done").length / lastEvaluation.scenarios.length) * 100)
					: undefined,
				status: reviewKind === "waiting" || reviewKind === "advanced" ? reviewKind : reached,
				statusDate: reviewKind === "waiting" || reviewKind === "advanced" ? now : undefined,
				href: demoConceptHref,
			},
			workspace: { conceptName, currentStep: step, reachedStep: reached, messages },
		});
	}, [tracksDemo, messages, step, reached, conceptName, shareMembers.length, review?.status.kind, lastEvaluation]);

	return (
		<SparksWorkspace
			{...props}
			conceptName={conceptName}
			currentStep={step}
			reachedStep={reached}
			onStepSelect={setStep}
			share={{
				members: shareMembers,
				onInvite: (who, role) => addMembers([sampleShareMemberFor(who, role)]),
				onRoleChange: (id, role) => setShareMembers((current) => current.map((m) => (m.id === id ? { ...m, role } : m))),
				link: sampleShareLink,
			}}
			concept={conceptSections.length ? conceptSections : undefined}
			decisions={laterDecisions}
			paths={{ built: paths, active: chosenId, onRun: runDirection }}
			composerContext={
				step === "prototype" && pointedAt
					? {
							label: `Pointing at ${built.elements[pointedAt] ?? "that"}`,
							placeholder: "What should change about it?",
							onClear: () => setPointedAt(undefined),
						}
					: undefined
			}
			messages={messages}
			onSend={send}
			onSuggestionEdit={editSuggestion}
			onAnswerCancel={cancelAnswer}
			// "Add from library": the AutoPartsHUB home on "My library", in its own tab, so the concept stays open here.
			onAddFromLibrary={() => openStoryInNewTab(storyIds.autoPartsHubHome, { defaultTab: "library" })}
			// Comments: the reviewers' feedback once it's in review; the dot while there's feedback she hasn't opened yet.
			comments={{
				reviewers: review?.status.kind === "ready" ? [] : (review?.reviewers ?? []),
				unread: unreadFeedback,
				onRead: (id) => {
					const status = review?.reviewers.find((r) => r.id === id)?.status;
					if (status) setReadFeedback((current) => ({ ...current, [id]: status }));
				},
				prototype: prototypeComments,
				// Opening one shows its path first.
				onOpenPrototypeComment:
					step === "prototype"
						? (id) => {
								const path = prototypeComments.find((c) => c.id === id)?.path?.id;
								if (path) setActivePath(path);
								setOpenPrototypeComment(id);
							}
						: undefined,
			}}
			preview={
				step === "review" && review ? (
					<ReviewPanel concept={concept()} status={review.status} reviewers={review.reviewers} recommendation={review.recommendation} />
				) : step === "validate" ? (
					lastRun ? (
						<ValidatePanel
							evaluation={lastRun.evaluation}
							done={lastRun.done}
							stopped={lastRun.stopped}
							run={runs.length}
							onStop={stopRun}
							onFix={(id) => {
								const finding = lastRun.evaluation.findings.find((f) => f.id === id);
								if (!finding) return;
								setPendingFix(id);
								setStep("prototype");
								setMessages((current) => [...current, withNewId(sampleFixOfferReply(finding))]);
							}}
						/>
					) : (
						<section
							aria-label='Evaluation'
							className='flex flex-1 items-center justify-center rounded-card bg-background-subtle p-8 text-sm text-muted-foreground'
						>
							The plan is in the conversation. Results show here once it runs.
						</section>
					)
				) : step === "prototype" ? (
					<PrototypePanel
						key={chosenId}
						audiences={built.audiences}
						readyScreens={ready}
						totalScreens={built.screens.length}
						pointing={pointing}
						onPointingChange={(on) => {
							setPointing(on);
							if (on) setPointedAt(undefined);
						}}
						versions={versions}
						onRestore={(id) => setMessages((current) => [...current, withNewId(restore(id))])}
						commentAuthor={{ name: `${props.user.firstName} Morales`, avatarSrc: props.user.avatarSrc }}
						// Each path has its own comments; the Comments panel lists them all, with their path.
						comments={prototypeComments.filter((c) => (c.path?.id ?? chosenId) === chosenId)}
						onCommentsChange={(shown) =>
							setPrototypeComments((current) => [
								...current.filter((c) => (c.path?.id ?? chosenId) !== chosenId),
								...shown.map((c) => (c.path ? c : { ...c, path: { id: chosenId, label: pathLabel(chosenId) } })),
							])
						}
						paths={paths.map((id) => ({ id, label: pathLabel(id) }))}
						path={chosenId}
						onPathChange={(id) => {
							setActivePath(id);
							setPointing(false);
							setPointedAt(undefined);
						}}
						openComment={openPrototypeComment}
						onOpenCommentChange={setOpenPrototypeComment}
					>
						{(audience) =>
							built.render({
								data: sampleFitCheck,
								audience,
								readyScreens: ready,
								changes,
								pointing,
								pointedAt,
								onPoint: (id) => {
									setPointedAt(id);
									setPointing(false);
								},
								onTextChange: typedOver,
							})
						}
					</PrototypePanel>
				) : undefined
			}
		/>
	);
}

const meta = {
	title: "Layouts/AutoPartsHUB/Sparks/Workspace",
	component: SparksWorkspace,
	parameters: {
		layout: "fullscreen",
	},
	// Keyed on the concept, so opening another one (a notification about it) starts it fresh.
	render: (args) => <WorkspacePrototype key={`${args.conceptName}-${args.currentStep}-${args.messages[0]?.from === "user" ? args.messages[0].text : ""}`} {...args} />,
	// A notification about a concept opens it here, in the same tab.
	decorators: [withStoryLinks(() => conceptStoryLinks())],
	args: {
		user: sampleUser,
		initialPrompt: sampleInitialPrompt,
		notifications: { notifications: sampleNotifications, now: sampleNotificationsNow },
		conceptName: "New idea",
		currentStep: "plan",
		messages: [],
		// Prototype: closes the concept's tab when the start page opened it; otherwise goes to the start page story.
		// The × and the Sparks symbol both go back to the start page, in the same tab.
		onClose: () => goToStory(storyIds.sparksStartPage),
	},
} satisfies Meta<typeof SparksWorkspace>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * A new concept, right after "New idea": Sparks's introduction streams in, ending with its question. Describe a problem
 * to see Sparks's reply. Not in Figma yet.
 */
export const Default: Story = {};

/** Dana has described her problem and Sparks has named the concept. Figma: Sparks → "Sparks Project" (node 27:1932). */
export const FirstMessage: Story = {
	args: {
		conceptName: sampleConceptName,
		messages: sampleMessages,
	},
};

/** Sparks's first reply to her description: the problem sharpened with what the data adds, on a card, to confirm. */
export const ProblemStatement: Story = {
	args: {
		conceptName: "New idea",
		messages: [...sampleMessages, sampleProblemStatementReply],
	},
};

/**
 * The Problem part done, one thing at a time: the statement, who it affects, why it matters, then the summary as a
 * "Draft", asking "Does this capture the problem?".
 */
export const ProblemAgreed: Story = {
	args: {
		conceptName: sampleConceptName,
		messages: [
			...sampleMessages,
			confirm(sampleProblemStatementReply),
			{ id: "u2", from: "user", text: "Yes, that's it" },
			confirm(sampleProblemWhoReply),
			{ id: "u3", from: "user", text: "Yes, that's right" },
			confirm(sampleProblemWhyReply),
			{ id: "u4", from: "user", text: "Yes, that's right" },
			sampleProblemDoneReply(sampleProblem),
		],
	},
};

/** "Looks right" on the summary: the problem is in the concept, and Sparks asks Clarify's first question. */
export const ProblemApproved: Story = {
	args: {
		conceptName: sampleConceptName,
		messages: [
			...approve(ProblemAgreed.args?.messages ?? [], "problem"),
			{ id: "u5", from: "user", text: "Looks right, continue" },
			sampleProblemApprovedReply,
		],
	},
};

/** The conversation up to the Problem brief, every question confirmed. */
const briefMessages: SparksMessage[] = [
	...sampleMessages,
	confirm(sampleProblemStatementReply),
	{ id: "u2", from: "user", text: "Yes, that's it" },
	confirm(sampleProblemWhoReply),
	{ id: "u3", from: "user", text: "Yes, that's right" },
	confirm(sampleProblemWhyReply),
	{ id: "u4", from: "user", text: "Yes, that's right" },
	...approve([sampleProblemDoneReply(sampleProblem)], "problem"),
	{ id: "u5", from: "user", text: "Looks right, continue" },
	confirm(sampleProblemApprovedReply),
	{ id: "u5b", from: "user", text: "Yes, that's right" },
	confirm(sampleClarifyWhyReply("yes")),
	{ id: "u6", from: "user", text: "Yes, that's right" },
	confirm(sampleClarifyLimitsReply("yes")),
	{ id: "u7", from: "user", text: "Yes, that's right" },
	sampleBriefReply(
		"yes",
		sampleBriefFrom({
			"brief-today": { outcome: "confirmed", text: sampleClarifyTodaySuggestion.text },
			"brief-why": { outcome: "confirmed", text: sampleClarifyWhySuggestion.text },
			"brief-limits": { outcome: "confirmed", text: sampleClarifyLimitsSuggestion.text },
		}),
	),
];

/** Clarify done, every guess confirmed: the Problem brief, waiting for "Looks right". Not in Figma yet. */
export const ProblemBrief: Story = {
	args: {
		conceptName: sampleConceptName,
		messages: briefMessages,
	},
};

/**
 * "Looks right" on the brief: it's in the concept, and Sparks asks Success's first question, the goal, drafted from the
 * brief. Not in Figma yet.
 */
export const SuccessGoal: Story = {
	args: {
		conceptName: sampleConceptName,
		messages: [...approve(briefMessages, "brief"), { id: "u8", from: "user", text: "Looks right, continue" }, sampleBriefApprovedReply],
	},
};

/**
 * The goal confirmed: Sparks asks for the main measure, recommends the returns and says why, with repeat purchases one
 * quick reply away. Not in Figma yet.
 */
export const SuccessMeasure: Story = {
	args: {
		conceptName: sampleConceptName,
		messages: [
			...approve(briefMessages, "brief"),
			{ id: "u8", from: "user", text: "Looks right, continue" },
			confirm(sampleBriefApprovedReply),
			{ id: "u9", from: "user", text: "Yes, that's right" },
			sampleSuccessMeasureReply("yes"),
		],
	},
};

/** The conversation up to the target question, with the goal and the returns as main measure confirmed. */
const successToTarget: SparksMessage[] = [
	...approve(briefMessages, "brief"),
	{ id: "u8", from: "user", text: "Looks right, continue" },
	confirm(sampleBriefApprovedReply),
	{ id: "u9", from: "user", text: "Yes, that's right" },
	confirm(sampleSuccessMeasureReply("yes")),
	{ id: "u10", from: "user", text: "Yes, that's right" },
];

/**
 * The returns chosen as the main measure: Sparks suggests a target and by when, aiming lower than the vehicle selector
 * did for the customers who used it. Not in Figma yet.
 */
export const SuccessTarget: Story = {
	args: {
		conceptName: sampleConceptName,
		messages: [
			...approve(briefMessages, "brief"),
			{ id: "u8", from: "user", text: "Looks right, continue" },
			confirm(sampleBriefApprovedReply),
			{ id: "u9", from: "user", text: "Yes, that's right" },
			confirm(sampleSuccessMeasureReply("yes")),
			{ id: "u10", from: "user", text: "Yes, that's right" },
			sampleSuccessTargetReply("yes"),
		],
	},
};

/**
 * The target agreed: Sparks's last Success question, what must not get worse, with why in plain words. Not in Figma
 * yet.
 */
export const SuccessNotWorse: Story = {
	args: {
		conceptName: sampleConceptName,
		messages: [
			...approve(briefMessages, "brief"),
			{ id: "u8", from: "user", text: "Looks right, continue" },
			confirm(sampleBriefApprovedReply),
			{ id: "u9", from: "user", text: "Yes, that's right" },
			confirm(sampleSuccessMeasureReply("yes")),
			{ id: "u10", from: "user", text: "Yes, that's right" },
			confirm(sampleSuccessTargetReply("yes")),
			{ id: "u11", from: "user", text: "Yes, that's right" },
			sampleSuccessNotWorseReply("yes"),
		],
	},
};

/** Dana wants returns cut in half: more than the vehicle selector managed, so Sparks says why and lets her decide. */
export const SuccessTargetUnlikely: Story = {
	args: {
		conceptName: sampleConceptName,
		messages: [
			...successToTarget,
			{
				...sampleSuccessTargetReply("yes"),
				parts: sampleSuccessTargetReply("yes").parts.map((part) =>
					part.kind === "suggestion"
						? { ...part, suggestion: { ...part.suggestion, text: "Cut them in half within 3 months.", edited: true } }
						: part,
				),
			},
			{ id: "u11", from: "user", text: "Cut them in half within 3 months." },
			sampleSuccessTargetUnlikelyReply,
		],
	},
};

/** Every Success question answered: the Success criteria, waiting for "Yes, let's see them". Not in Figma yet. */
export const SuccessCriteria: Story = {
	args: {
		conceptName: sampleConceptName,
		messages: (() => {
			const answered: SparksMessage[] = [
				...successToTarget,
				confirm(sampleSuccessTargetReply("yes")),
				{ id: "u11", from: "user", text: "Yes, that's right" },
				confirm(sampleSuccessNotWorseReply("yes")),
				{ id: "u12", from: "user", text: "Yes, that's right" },
			];
			return [...answered, sampleSuccessSummaryReply("yes", sampleSuccessFrom(successAnswers(answered)))];
		})(),
	},
};

/**
 * "Yes, let's see them": what success looks like is in the concept, and Sparks shows all four directions at once, its
 * pick first ("Recommended"), recommends "Fit check before you buy" from the main measure, and asks "Want to go with
 * it?", with the others one tap away. Not in Figma yet.
 */
export const Directions: Story = {
	args: {
		conceptName: sampleConceptName,
		messages: (() => {
			const answered: SparksMessage[] = [
				...successToTarget,
				confirm(sampleSuccessTargetReply("yes")),
				{ id: "u11", from: "user", text: "Yes, that's right" },
				confirm(sampleSuccessNotWorseReply("yes")),
				{ id: "u12", from: "user", text: "Yes, that's right" },
			];
			return [
				...approve([...answered, sampleSuccessSummaryReply("yes", sampleSuccessFrom(successAnswers(answered)))], "success"),
				{ id: "u13", from: "user", text: "Looks right, continue" },
				sampleSuccessApprovedReply("returns"),
			];
		})(),
	},
};

/** "Yes, go with it": "What we'll build", drafted in one go, and "Ready for me to build it?". Not in Figma yet. */
export const WhatWellBuild: Story = {
	args: {
		conceptName: sampleConceptName,
		messages: (() => {
			const shown = Directions.args?.messages ?? [];
			return [...shown, { id: "u14", from: "user", text: sampleGoWithIt } as SparksMessage, chosenReply(shown, sampleGoWithIt)!];
		})(),
	},
};

/**
 * "Yes, build it": Plan is done, Prototype opens beside the conversation, and Sparks builds "Fit check before you buy"
 * screen by screen (each one clickable as soon as it's ready), then introduces it. Not in Figma yet.
 */
export const PrototypeBuilding: Story = {
	args: {
		conceptName: sampleConceptName,
		messages: WhatWellBuild.args?.messages ?? [],
	},
	play: async ({ canvasElement }) => {
		const button = [...canvasElement.ownerDocument.querySelectorAll("button")].find((b) => b.textContent === "Looks right, continue");
		button?.click();
	},
};

/** The prototype built: Sparks's introduction and "Ready for me to put it through its paces?". Not in Figma yet. */
export const PrototypeReady: Story = {
	args: {
		conceptName: sampleConceptName,
		currentStep: "prototype",
		reachedStep: "prototype",
		messages: [
			...approve(WhatWellBuild.args?.messages ?? [], "chosen"),
			{ id: "u15", from: "user", text: "Looks right, continue" },
			{ ...samplePrototypeBuildingReply(sampleDirectionFitCheck.name, fitCheckScreens, fitCheckScreens.length), step: "prototype" },
			samplePrototypeReadyReply(),
		],
	},
};

/** "Yes, test it": Validate opens with Sparks's evaluation plan, nine scenarios and the checks, before running anything. */
export const ValidatePlan: Story = {
	args: {
		conceptName: sampleConceptName,
		currentStep: "validate",
		reachedStep: "validate",
		messages: [
			...(PrototypeReady.args?.messages ?? []),
			{ id: "u16", from: "user", text: "Yes, test it" },
			{ ...sampleValidatePlanReply(sampleEvaluation({}, 1).scenarios), step: "validate" },
		],
	},
};

/** "Looks right, continue" on the plan: the run, results filling in beside the conversation, then Sparks's read. */
export const ValidateRunning: Story = {
	args: ValidatePlan.args,
	play: async ({ canvasElement }) => {
		const button = [...canvasElement.ownerDocument.querySelectorAll("button")].find((b) => b.textContent === "Looks right, continue");
		button?.click();
	},
};

/** "Go to Review instead" at the end of Prototype: Review opens with Validate skipped, "Not tested", and the gap listed. */
export const ReviewWithoutValidate: Story = {
	args: PrototypeReady.args,
	play: async ({ canvasElement }) => {
		const button = [...canvasElement.ownerDocument.querySelectorAll("button")].find((b) => b.textContent === "Go to Review instead");
		button?.click();
	},
};

/**
 * Back on Plan after reaching Validate: Plan is done, so it shows the Blueprint beside the conversation (the problem, what
 * we know, success, the directions, what we'll build, what we built, where it stands, decisions), with the conversation
 * at Plan's start. Dividers mark where it moved to Prototype and Validate; selecting a step scrolls there. Prototype and
 * Validate can be selected, Review can't yet. Not in Figma yet.
 */
export const StepsReached: Story = {
	args: {
		conceptName: sampleConceptName,
		messages: ValidatePlan.args?.messages ?? [],
		currentStep: "plan",
		reachedStep: "validate",
	},
};
