import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { goToStory, openStoryInNewTab, storyIds, withStoryLinks } from "../../../story-links";
import { conceptStoryLinks } from "../start-page/concept-story-links";
import { EmptyState } from "@/components/feedback/empty-state";
import { sampleUser } from "../../sample-data/sample-user";
import { sampleNotifications, sampleNotificationsNow } from "../../sample-data/sample-notifications";
import type { DirectionDraft } from "../plan/direction-card";
import type { ProblemDraft, ProblemPartId } from "../plan/problem-card";
import {
	sampleBriefFrom,
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
	sampleProblemCorrectedReply,
	sampleProblemDoneReply,
	sampleProblemFromWordsReply,
	sampleProblemMessageKind,
	sampleProblemNameFrom,
	sampleProblemNotQuiteReply,
	sampleProblemStatementReply,
	sampleProblemSummaryFrom,
	sampleProblemUnclearReply,
	sampleProblemWhoReply,
	sampleProblemWhoReplyFor,
	sampleProblemWhyReply,
	type ProblemCorrectable,
} from "../plan/sample-problem";
import {
	sampleSuccessFrom,
	sampleSuccessMeasureReply,
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
	sampleBuildIt,
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
import { directionPrototypes, screenAudience } from "../prototype/direction-prototypes";
import type { ReviewDecision } from "../review/sample-review-directions";
import type { SparksStep } from "../shared/steps";
import type { PlanPartId } from "./plan-parts";
import {
	samplePlanEditChangedReply,
	samplePlanEditNotNowReply,
	samplePlanEditOutOfDate,
	samplePlanEditPrototypeVersion,
	samplePlanEditUpdatedReply,
	samplePlanEditUpdateReplies,
} from "../plan/sample-plan-edits";
import {
	sampleBackFromPrototype,
	sampleBeyondAnswerReply,
	sampleBeyondReplies,
	sampleBeyondReply,
	sampleBuildProgress,
	sampleBuildScreen,
	sampleBuildStepMs,
	sampleBuildSteps,
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
import { EvaluationPrototype, type EvaluationAgent } from "../validate/evaluation-prototype";
import { findingNumber, ValidatePanel, type Evaluation, type PrototypeStop } from "../validate/validate-panel";
import {
	sampleBackToChoice,
	sampleEvaluation,
	sampleFixes,
	sampleRunFinished,
	sampleRunProgress,
	sampleRunResults,
	sampleRunStepMs,
	sampleValidateGoAheadOpening,
	sampleValidateStartedReply,
} from "../validate/sample-validate";
import { ReviewPanel, reviewPartTitles, type IdeaComment, type Reviewer, type ReviewStatus } from "../review/review-panel";
import {
	sampleConceptForReview,
	sampleDecision,
	sampleDecisionMs,
	sampleDecisionOwner,
	sampleDecisionReply,
	sampleInviteNotQuiteReply,
	sampleInviteSentReply,
	samplePublishIt,
	samplePublishedUpdateReply,
	sampleDecisionAskReply,
	sampleDecisionLaterReply,
	sampleAskDecision,
	sampleInviteUpdatedReply,
	sampleRecommendation,
	sampleRecommendationNotQuiteReply,
	sampleRecommendationReply,
	sampleRecommendationRewrittenReply,
	sampleReviewChanges,
	sampleReviewersFor,
	sampleReviewerViews,
	isReviewOpenReply,
	sampleReviewBuildingReply,
	sampleReviewerPin,
	sampleReviewerIdeaComment,
	sampleReviewBuildFinished,
	sampleReviewBuildProgress,
	sampleReviewBuilt,
	sampleReviewBuildStepMs,
	sampleReviewOpenReply,
	sampleReviewQuestionReply,
	sampleReviewStepMs,
	sampleReviewSummaryReply,
	sampleShareLaterReply,
	sampleSharedReply,
	sampleSubmittedReply,
} from "../review/sample-review";
import { sampleDirectory, sampleMentionable, sampleShareDepartment, sampleShareLink, sampleShareMemberFor, sampleShareOwner } from "../shared/sample-share";
import type { ShareMember } from "./share-popover";
import { sampleConceptName, sampleInitialPrompt, sampleMessages } from "./sample-concept";
import {
	SparksWorkspace,
	type SparksMessage,
	type SparksReply,
	type SparksReplyPart,
	type SparksSuggestion,
	type SparksWorkspaceProps,
} from "./workspace";

// New messages' ids start past the ones the stories start with ("u1"…"u30"), so no two messages share one (each
// message's step is looked up by id).
let nextId = 1000;
const withNewId = (reply: SparksReply): SparksReply => ({ ...reply, id: `${reply.id}-${++nextId}` });

/** Sparks's reply goes on: after its progress, what it did (a prototype built, a run finished or stopped). */
const goOn = (reply: SparksReply, more: SparksReply): SparksReply => ({
	...reply,
	parts: [...reply.parts, ...more.parts],
	quickReplies: more.quickReplies,
});

/** Adds what Sparks did to the reply at `index`, or, if she's said something since, as a new reply. */
const withMore = (messages: SparksMessage[], index: number, more: SparksReply): SparksMessage[] => {
	const reply = messages[index];
	return index === messages.length - 1 && reply.from === "sparks"
		? messages.map((m, i) => (i === index ? goOn(reply, more) : m))
		: [...messages, withNewId(more)];
};

/** The latest summary of a kind in the conversation (after a correction, the corrected one): what her next correction updates. */
function latestOf<K extends "problem" | "brief" | "success" | "chosen">(messages: SparksMessage[], kind: K) {
	return [...messages]
		.reverse()
		.flatMap((m) => (m.from === "sparks" ? m.parts : []))
		.find((p): p is Extract<SparksReplyPart, { kind: K }> => p.kind === kind);
}

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

/** "Build it": what we'll build is approved, and in the concept. */
const approveChosen = (messages: SparksMessage[]): SparksMessage[] =>
	messages.map((message) =>
		message.from === "sparks"
			? {
					...message,
					parts: message.parts.map((part) => (part.kind === "chosen" ? { ...part, chosen: { ...part.chosen, approved: true } } : part)),
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

/** "What we'll build" for the direction she picked, typed: "Yes, go with it" (Sparks's pick) or a direction's name. */
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

/** A typed yes, or a typed no, to "What we'll build": short, with nothing else in it ("looks right", "yes, build it", "not quite"). */
const yesPattern = /^\s*(?:(?:yes|yep|ok|okay|sure|great|perfect)[\s,.!]*)?(?:continue|looks (?:right|good)(?:, continue)?|that's (?:it|right)|sounds good|go ahead|build it|yes|yep|ok|okay|sure|great|perfect)?[\s.!]*$/i;
const noPattern = /^\s*(?:not quite|no|nope|not really)[\s.!]*$/i;

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
 * Problem part, one thing at a time: the problem statement, who it affects, why it matters, then the summary,
 * which goes in the concept, the zigzag divider and Clarify's first question, in the same reply. The first quick reply confirms and moves on; "Not quite" asks what's
 * off, and her answer moves on; "I'm not sure" (Clarify) keeps Sparks's guess as an assumption. Sparks names the concept
 * after she confirms the problem statement. Each Clarify question after the first ("Why does it happen?", then "What
 * does a solution have to work around?") opens with how Sparks took the last answer; after the last, Sparks shows the
 * Problem brief, built from her answers, and goes on the same way to
 * Success's first question, the goal. Her
 * answer to the goal (confirmed, or in her own words) opens the next question, the main measure: Sparks recommends the
 * returns, and "Repeat purchases instead" picks the other one. Her answer opens the target: from a past experiment for
 * the returns, an assumption with no starting point otherwise. A target for the returns beyond what the vehicle
 * selector managed gets Sparks's reason, with the source, and "Keep my target" (an assumption) or "Use 25%". Then what
 * must not get worse: online sales. After it, Sparks shows the Success criteria, built from her answers, and goes
 * on to all four directions at once, its recommendation above them,
 * Sparks's pick first. A card's "Generate prototype" picks it and starts building; typed, "Yes, go with it" or a direction's
 * name brings "What we'll build", drafted in one go; anything else points back to the cards. "Build it" finishes
 * Plan; "Not quite" asks what's off, and her correction brings the question again.
 */
/** The decision as recorded: who decided, what, why and when. */
type ReviewDecisionRecord = ReviewDecision & { owner: string; date: string };

function WorkspacePrototype(props: SparksWorkspaceProps) {
	const [messages, setRawMessages] = React.useState<SparksMessage[]>(props.messages);
	// The name Sparks gives the concept ("New idea" until it does), and the one she gave it, which wins: Sparks naming
	// it later doesn't replace hers (prds/sparks.md, "The start page").
	const [defaultName, setConceptName] = React.useState(props.conceptName);
	const [herName, setHerName] = React.useState<string>();
	const conceptName = herName ?? defaultName;
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
	// Each question card's suggestion as Sparks first made it, by its reply's id: what changing an answer goes back to
	// (prds/sparks.md, "Changing an answer"). New replies also carry it as `suggested`, for the card shown again.
	const originalSuggestions = React.useRef(new Map<string, SparksSuggestion>());
	const setMessages = (update: React.SetStateAction<SparksMessage[]>) =>
		setRawMessages((current) => {
			const next = typeof update === "function" ? update(current) : update;
			const known = new Set(current.map((m) => m.id));
			return next.map((m) => {
				if (m.from !== "sparks" || known.has(m.id)) return m;
				const suggestion = askedSuggestion(m);
				if (suggestion && !originalSuggestions.current.has(m.id)) originalSuggestions.current.set(m.id, suggestion);
				return {
					...m,
					step: m.step ?? stepRef.current,
					parts: m.parts.map((p) =>
						p.kind === "suggestion" && p.suggestion.suggested === undefined
							? { ...p, suggestion: { ...p.suggestion, suggested: p.suggestion.text } }
							: p,
					),
				};
			});
		});
	const [reached, setReached] = React.useState(props.reachedStep ?? props.currentStep);
	const chosenParts = messages.flatMap((m) => (m.from === "sparks" ? m.parts : [])).flatMap((p) => (p.kind === "chosen" ? [p.chosen] : []));
	/** The reply that builds a direction's prototype, the latest if it was built again. */
	const buildReplyOf = (id: string) =>
		[...messages].reverse().find((m) => m.from === "sparks" && m.id.startsWith(`prototype-building-${id}`));
	// The direction picked in Plan: approved in "What we'll build", or built from its card (Sparks's pick if none yet).
	const planChoiceId =
		sampleDirections.find((d) => d.name === chosenParts[chosenParts.length - 1]?.name)?.id ??
		sampleDirections.find((d) => buildReplyOf(d.id))?.id ??
		sampleDirectionFitCheck.id;
	// Paths (prds/sparks-prototype.md, "Paths"): every direction built, in the order built, and the one shown. A story
	// that starts past Plan has its pick built. Review is about one path; on Review, that's the one shown.
	const [paths, setPaths] = React.useState<string[]>(() => ((props.reachedStep ?? props.currentStep) === "plan" ? [] : [planChoiceId]));
	const [activePath, setActivePath] = React.useState<string>();
	const [reviewPath, setReviewPath] = React.useState<string>();
	const chosenId = step === "review" && reviewPath ? reviewPath : (activePath ?? planChoiceId);
	const built = directionPrototypes[chosenId] ?? directionPrototypes["fit-check"];
	// Evaluate and Review follow the path shown: its "What we'll build" (drafted here when a story starts later, or for a
	// path added from the plan).
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

	// Each path's own build progress (how many of `sampleBuildSteps` are finished), versions and Evaluate runs. A story that
	// opens on Prototype has its pick built, unless its conversation stops while it's being built (a concept reopened).
	type Version = { id: string; name: string; changes: FitCheckChanges };
	/** `step`: how many of the run's steps are done; `startedAt`, for the time counting up; `seconds`, once it's done. */
	/**
	 * `started`, `finished`: the agents (scenarios and experts), in the order they started and finished; `agentsDone`:
	 * every agent is done, so the checks can run; `screen`: where they're working now, for the progress.
	 */
	type Run = {
		evaluation: Evaluation;
		step: number;
		startedAt: number;
		seconds?: number;
		stopped?: boolean;
		started: string[];
		finished: string[];
		agentsDone?: boolean;
		screen?: { label: string; agents: number };
	};
	type PathData = { buildStep: number; versions: Version[]; runs: Run[] };
	const firstVersion: Version = { id: "v1", name: sampleVersionNames.first, changes: {} };
	const screensOf = (id: string) => (directionPrototypes[id] ?? directionPrototypes["fit-check"]).screens;
	// A story (or a reopened concept) whose conversation already started a run: that run, finished.
	const [initialRuns] = React.useState<Run[]>(() =>
		props.messages.some((m) => m.from === "sparks" && m.id.startsWith("validate-started"))
			? [(() => {
					const evaluation = sampleEvaluation({}, 1, undefined, planChoiceId);
					const all = [...evaluation.scenarios, ...(evaluation.experts ?? [])].map((a) => a.id);
					return { evaluation, step: Number.MAX_SAFE_INTEGER, startedAt: Date.now(), seconds: 24, started: all, finished: all, agentsDone: true };
				})()]
			: [],
	);
	const pathDefault = (id: string): PathData => {
		const progress = buildReplyOf(id);
		const part = progress?.from === "sparks" ? progress.parts.find((p) => p.kind === "progress") : undefined;
		const unfinished = part?.kind === "progress" && !part.done ? part.steps.length - 1 : undefined;
		const started = (props.reachedStep ?? props.currentStep) !== "plan";
		return { buildStep: unfinished ?? (started ? sampleBuildSteps(screensOf(id)).length : 0), versions: [firstVersion], runs: id === planChoiceId ? initialRuns : [] };
	};
	const [pathData, setPathData] = React.useState<Record<string, PathData>>({});
	const dataFor = (id: string) => pathData[id] ?? pathDefault(id);
	const updatePath = (id: string, update: (data: PathData) => PathData) =>
		setPathData((current) => ({ ...current, [id]: update(current[id] ?? pathDefault(id)) }));
	const { buildStep, versions, runs } = dataFor(chosenId);
	const isBuilt = buildStep >= sampleBuildSteps(built.screens).length;
	const setVersions = (update: (current: Version[]) => Version[]) => updatePath(chosenId, (d) => ({ ...d, versions: update(d.versions) }));
	const setRuns = (update: (current: Run[]) => Run[]) => updatePath(chosenId, (d) => ({ ...d, runs: update(d.runs) }));
	// The path being built (the one shown, unless another was started).
	const [buildingPath, setBuildingPath] = React.useState<string>();
	/** A direction becomes a path: added (once), built from version 1, and shown. */
	const startPath = (id: string) => {
		setPaths((current) => (current.includes(id) ? current : [...current, id]));
		setPathData((current) => ({ ...current, [id]: { buildStep: 0, versions: [firstVersion], runs: [] } }));
		setActivePath(id);
		setBuildingPath(id);
	};
	/** Back to the choice in Plan, from Prototype, Evaluate or Review: the directions again, without the one she tried. */
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
	// The reviewers' comments on parts of the idea, and the part to bring into view in Review when one is opened.
	const [ideaComments, setIdeaComments] = React.useState<IdeaComment[]>([]);
	const [focusPart, setFocusPart] = React.useState<{ part: string; key: number }>();
	const [openPrototypeComment, setOpenPrototypeComment] = React.useState<string | undefined>(undefined);
	const [pointedAt, setPointedAt] = React.useState<string>();
	// Evaluate (prds/sparks-validate.md): every run, with how far it got; the last one is shown.
	const lastRun = runs[runs.length - 1];
	const lastRunFinished = lastRun ? sampleRunFinished(lastRun.evaluation, lastRun.step) : false;
	/** Starts a run on the current prototype version, compared with the last finished run: Evaluate opens on it. */
	const startRun = () => {
		const previous = [...runs].reverse().find((r) => sampleRunFinished(r.evaluation, r.step) && !r.stopped)?.evaluation;
		const evaluation = sampleEvaluation(changes, versions.length, previous, chosenId);
		setRuns((current) => [...current, { evaluation, step: 0, startedAt: Date.now(), started: [], finished: [] }]);
		setWatching(undefined);
		setSelectedFinding(undefined);
		setStep("validate");
		setReached((current) => (current === "review" ? current : "validate"));
	};
	/** Asked for in a conversation ("Yes, evaluate it", "Evaluate it"): the run starts, and Sparks's answer stays in that step. */
	const evaluateFrom = (from: SparksStep): SparksReply => {
		startRun();
		return { ...sampleValidateStartedReply, step: from };
	};
	const lastResults = lastRun ? sampleRunResults(lastRun.evaluation, lastRun.step) : undefined;
	const running = Boolean(lastRun && !lastRun.stopped && !lastRunFinished);
	// The agents at work (scenarios and experts, all at once, on the prototype): the run waits for them before the checks.
	const agentsWorking = Boolean(running && lastResults?.begun && !lastRun?.agentsDone);
	const updateRun = (update: (run: Run) => Run) => setRuns((current) => current.map((r, i) => (i === current.length - 1 ? update(r) : r)));
	/** The latest run moves on a step; the last one records how long it took. */
	const advanceRun = () =>
		updateRun((r) => {
			const next = r.step + 1;
			return { ...r, step: next, seconds: sampleRunFinished(r.evaluation, next) ? Math.max(1, Math.round((Date.now() - r.startedAt) / 1000)) : r.seconds };
		});
	// Running: getting ready, then the agents (on the prototype, moving the run on as each scenario finishes), then each
	// check and the conclusions, the results coming in beside the prototype.
	React.useEffect(() => {
		if (step !== "validate" || !running || agentsWorking) return;
		// Getting ready and the checks after the agents are quick, so the run never sits still for long.
		const timer = window.setTimeout(advanceRun, sampleRunStepMs() / (lastResults?.begun ? 2 : 2.5));
		return () => window.clearTimeout(timer);
	}, [step, lastRun, running, agentsWorking]);
	const stopRun = () =>
		setRuns((current) =>
			current.map((r, i) => (i === current.length - 1 ? { ...r, stopped: true, seconds: Math.max(1, Math.round((Date.now() - r.startedAt) / 1000)) } : r)),
		);
	// A scenario watched again on the prototype, and the finding selected (in the list or on its marker).
	const [watching, setWatching] = React.useState<{ id: string; key: number }>();
	const [selectedFinding, setSelectedFinding] = React.useState<{ id: string; key: number }>();
	// Findings fixed in the prototype since the last run ("Fix this in the prototype"), with the version that fixed them.
	const fixedSince: Record<string, number> = {};
	if (lastRun)
		for (const finding of lastRun.evaluation.findings) {
			const fix = sampleFixes[finding.id];
			if (finding.status !== "open" || !fix) continue;
			const applied = (c: FitCheckChanges) => Object.entries(fix.changes).every(([key, value]) => c[key as keyof FitCheckChanges] === value);
			if (!applied(changes)) continue;
			const index = versions.findIndex((v, i) => i >= lastRun.evaluation.version && applied(v.changes));
			if (index >= 0) fixedSince[finding.id] = index + 1;
		}
	// Evaluate's agents and the strip of screens they work (prds/sparks-validate.md, "The agents"): each scenario and
	// expert, with where it stops, what Sparks saw there and the open finding it reveals there; the screens are the
	// prototype's, plus any part a product page opens on, in the journey's order.
	const sameAt = (a?: PrototypeStop, b?: PrototypeStop) => Boolean(a && b && a.view === b.view && a.part === b.part && a.element === b.element);
	const openFindings = (lastRun?.evaluation.findings ?? []).filter((f) => f.status === "open" && f.at);
	const evaluationAgents: EvaluationAgent[] = lastRun
		? [
				...lastRun.evaluation.scenarios.map((scenario) => ({
					id: scenario.id,
					label: scenario.label,
					kind: scenario.access ? ("access" as const) : ("customer" as const),
					stops: scenario.steps.flatMap((s) => (s.at ? [{ at: s.at, note: s.evaluation, finding: openFindings.find((f) => sameAt(f.at, s.at))?.id }] : [])),
				})),
				...(lastRun.evaluation.experts ?? []).map((expert) => ({
					id: expert.id,
					label: expert.label,
					kind: "expert" as const,
					stops: expert.notes.flatMap((n) => (n.at ? [{ at: n.at, note: n.note, finding: openFindings.find((f) => sameAt(f.at, n.at))?.id }] : [])),
				})),
			]
		: [];
	// Every screen is evaluated: one that no agent's steps reach gets a look from the UX expert (or the first agent).
	const coveredKey = (at: { view: number; part?: string }) => `${at.view}:${at.part ?? ""}`;
	const covered = new Set(evaluationAgents.flatMap((a) => a.stops.map((s) => coveredKey(s.at))));
	const reviewer = evaluationAgents.find((a) => a.id === "ux") ?? evaluationAgents[0];
	if (reviewer)
		built.screens.forEach((name, view) => {
			if (!covered.has(coveredKey({ view })))
				reviewer.stops = [...reviewer.stops, { at: { view }, note: `Nothing to flag on ${name}.` }].sort((a, b) => a.at.view - b.at.view);
		});
	const evaluationScreens = (() => {
		const places = [
			...built.screens.map((name, view): { at: Omit<PrototypeStop, "element">; label: string } => ({ at: { view }, label: name })),
			...evaluationAgents.flatMap((a) => a.stops.map((s) => s.at)).concat(openFindings.map((f) => f.at!))
				.filter((at) => at.part)
				.map((at) => ({ at: { view: at.view, part: at.part }, label: sampleFitCheck.parts.find((p) => p.id === at.part)?.name ?? built.screens[at.view] })),
		];
		const unique = places.filter((p, i) => places.findIndex((q) => q.at.view === p.at.view && q.at.part === p.at.part) === i);
		return unique.sort((a, b) => a.at.view - b.at.view || (a.at.part ? 1 : 0) - (b.at.part ? 1 : 0));
	})();
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
		/** The decision, once made: kept for the Review's line in the plan. */
		decision?: ReviewDecisionRecord;
		/** While Sparks puts the idea together: how many of its steps are done. */
		buildStep?: number;
		/** What Sparks says it put together, once it's done. */
		ready?: SparksReply;
		/** The prototype version the teams see, once she's published (prds/sparks-review.md, "Publishing"). */
		published?: number;
	}>();
	const lastFinished = (list: Run[]) => [...list].reverse().find((r) => !r.stopped && sampleRunFinished(r.evaluation, r.step))?.evaluation;
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
		// Sparks writes it on the right, part by part (the timer below); once it's done, the same reply says what's in it.
		setReview({
			status: { kind: "ready" },
			reviewers: [],
			ticks: 0,
			skipped,
			openQuestions: [],
			buildStep: 0,
			ready: sampleReviewOpenReply(prepared, opening, skipped, chosenId, versions.length),
		});
		return sampleReviewBuildingReply(reviewPartTitles, skipped);
	};
	/**
	 * "Publish" in the header (prds/sparks-review.md, "Publishing"): before Review, it opens Review, where Sparks writes
	 * the idea for review and shows what the teams will get; there, it publishes; once published, "Publish update" when
	 * the prototype has changed since, and "Published" when the teams have the latest.
	 */
	const publishIdea = () => {
		const reply = enterReview("", !lastEvaluation);
		setMessages((current) => [...current, { id: `u${++nextId}`, from: "user", text: "Publish my idea." }, withNewId(reply)]);
	};
	const publishUpdate = (version: number) => {
		setReview((current) => (current ? { ...current, published: version } : current));
		setMessages((current) => [
			...current,
			{ id: `u${++nextId}`, from: "user", text: "Publish an update." },
			withNewId(samplePublishedUpdateReply(version)),
		]);
	};
	const publishButton = (() => {
		const latest = dataFor(reviewPath ?? chosenId).versions.length;
		const lastMessage = messages[messages.length - 1];
		if (reached === "plan" || !isBuilt)
			return { label: "Publish", disabled: true, hint: "Build a prototype first: the teams get your idea and its prototype." };
		if (!review) return { label: "Publish", onClick: publishIdea };
		if (review.buildStep !== undefined) return { label: "Publish", disabled: true, hint: "Putting your idea together…" };
		if (review.published === undefined)
			return {
				label: "Publish",
				// Sparks's question is waiting: this is her yes. Otherwise, back to Review, where it is.
				onClick: () =>
					step === "review" && lastMessage?.from === "sparks" && isReviewOpenReply(lastMessage.id)
						? send(samplePublishIt)
						: setStep("review"),
			};
		if (latest > review.published) return { label: "Publish update", onClick: () => publishUpdate(latest) };
		return { label: "Published", disabled: true, hint: `The teams see the latest version, ${review.published}.` };
	})();
	// Putting the idea together: one step at a time (getting ready, each part, what's open and who to ask), Sparks's progress
	// updated in place; when it's done, the same reply says what it put together (or a new one, if she's said something).
	React.useEffect(() => {
		if (!review || review.buildStep === undefined) return;
		const { skipped, ready } = review;
		const now = review.buildStep + 1;
		const timer = window.setTimeout(() => {
			const done = sampleReviewBuildFinished(reviewPartTitles, skipped, now);
			setReview({ ...review, buildStep: done ? undefined : now, ready: done ? undefined : ready });
			setMessages((current) => {
				const latest = current.length - 1 - [...current].reverse().findIndex((m) => m.id.startsWith("review-building"));
				const updated = current.map((m, i) => {
					if (i !== latest || m.from !== "sparks") return m;
					const parts = m.parts.map((p) => {
						if (p.kind !== "progress") return p;
						const seconds = p.startedAt ? Math.max(1, Math.round((Date.now() - p.startedAt) / 1000)) : undefined;
						return { ...p, ...sampleReviewBuildProgress(reviewPartTitles, skipped, now, seconds) };
					});
					return { ...m, parts };
				});
				return done && ready ? withMore(updated, latest, { ...ready, step: "review" as const }) : updated;
			});
		}, sampleReviewBuildStepMs(reviewPartTitles, skipped, review.buildStep));
		return () => window.clearTimeout(timer);
	}, [review]);
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
			// Commenting, a team also pins a comment on the prototype, on what it's about.
			const commented = reviewers[index];
			const pin = commented.status === "commented" ? sampleReviewerPin(commented.id, reviewId) : undefined;
			// …and says something on a part of the idea.
			const said = commented.status === "commented" ? sampleReviewerIdeaComment(commented.id, reviewId) : undefined;
			if (said) setIdeaComments((current) => (current.some((c) => c.id === said.id) ? current : [...current, said]));
			if (pin)
				setPrototypeComments((current) =>
					current.some((c) => c.id === pin.id) ? current : [...current, { ...pin, path: { id: reviewId, label: pathLabel(reviewId) } }],
				);
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
	// The parts of the plan she's changed (by changing an answer) since the prototype last matched it: while there are
	// any, the prototype shows a note (prds/sparks-prototype.md, "When the plan changes").
	const [outdated, setOutdated] = React.useState<PlanPartId[]>([]);
	/** "Yes, update it" (or "Update prototype" on its note): the prototype matches the plan again, as a new version, in Prototype. */
	const matchPlan = () => {
		setStep("prototype");
		const number = saveVersion(samplePlanEditPrototypeVersion, changes);
		setOutdated([]);
		return withNewId(samplePlanEditUpdatedReply(number));
	};

	// The screen being built, shown as it's assembled; the last one stays while Sparks checks it all.
	const prototypeBuild = (() => {
		const { screen, readyScreens } = sampleBuildScreen(built.screens, buildStep);
		const audience = screen === undefined ? undefined : screenAudience(built, screen);
		return {
			readyScreens,
			totalScreens: built.screens.length,
			screen: audience && {
				key: screen!,
				device: audience.device,
				content: built.render({ data: sampleFitCheck, audience: audience.id, openOn: screen, changes }),
			},
		};
	})();

	const typedOver = (id: string, text: string, previous: string) => {
		const number = saveVersion(sampleVersionNames.typed(previous, text), { ...changes, text: { ...changes.text, [id]: text } });
		setMessages((current) => [...current, withNewId(sampleChangeDoneReply(`"${previous}" now reads "${text}"`, number))]);
	};

	// Building: one step at a time (getting ready, each screen, the checks), Sparks's progress updated in place; when it's
	// done, the same reply goes on to what it built (or a new one, if she's said something since).
	const building = messages.some((m) => m.from === "sparks" && m.id.startsWith("prototype-building"));
	// The path being built keeps building while she looks at another.
	const buildId = buildingPath ?? chosenId;
	const currentBuildStep = dataFor(buildId).buildStep;
	const buildScreens = screensOf(buildId);
	React.useEffect(() => {
		const total = sampleBuildSteps(buildScreens).length;
		if (step !== "prototype" || !building || currentBuildStep >= total) return;
		const timer = window.setTimeout(() => {
			const now = currentBuildStep + 1;
			updatePath(buildId, (d) => ({ ...d, buildStep: now }));
			setMessages((current) => {
				const latest = current.length - 1 - [...current].reverse().findIndex((m) => m.id.startsWith("prototype-building"));
				const updated = current.map((m, i) => {
					if (i !== latest || m.from !== "sparks") return m;
					const parts = m.parts.map((p) => {
						if (p.kind !== "progress") return p;
						const seconds = p.startedAt ? Math.max(1, Math.round((Date.now() - p.startedAt) / 1000)) : undefined;
						return { ...p, ...sampleBuildProgress(buildScreens, now, seconds) };
					});
					return { ...m, parts };
				});
				if (now < total) return updated;
				const ready = samplePrototypeReadyReply(
					sampleDirections.find((d) => d.id === buildId) ?? sampleDirectionFitCheck,
					(directionPrototypes[buildId] ?? directionPrototypes["fit-check"]).contents,
					paths.length > 1,
				);
				return withMore(updated, latest, ready);
			});
		}, sampleBuildStepMs(buildScreens, currentBuildStep));
		return () => window.clearTimeout(timer);
	}, [step, building, currentBuildStep, buildId]);

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

	/** Sends `text`; `shown` is her message when it says it differently (a button's label instead of the quick reply). */
	const send = (text: string, shown?: string) => {
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
			text: shown ?? (adding && openCard?.kind === "suggestion" ? applyHerWords(openCard.suggestion.text, text) : text),
		};
		const onUnlikelyTarget = lastAsk?.id.startsWith("success-target-unlikely");
		// The directions, waiting for a card's "Generate prototype" (runDirection) or, typed, a direction's name or "Yes, go
		// with it"; then "What we'll build", for "Build it".
		const onDirections = lastAsk?.id.startsWith("directions");
		const onChosen = lastAsk?.id.startsWith("chosen-summary") || lastAsk?.id.startsWith("chosen-again");
		// The Success question on the card being answered (the goal, the main measure, the target, then what must not get worse).
		const successAsk =
			lastAsk?.from === "sparks"
				? lastAsk.parts.find((part) => part.kind === "suggestion" && part.suggestion.part.startsWith("success-"))
				: undefined;
		let next: SparksMessage[] = [...messages, userMessage];
		// "What we'll build": a typed yes builds it, a typed no asks what's off.
		const buildsIt = text === sampleBuildIt || yesPattern.test(text);
		const notQuite = noPattern.test(text);
		// Sparks's offer after a change in the plan: "Yes, update it" updates the prototype; "Not now" leaves its note.
		const onPlanEditOffer = Boolean(lastAsk?.id.startsWith("plan-edit-changed")) && answeringAsk && samplePlanEditUpdateReplies.includes(text);

		if (onPlanEditOffer) {
			next = [...next, text === samplePlanEditUpdateReplies[0] ? matchPlan() : withNewId(samplePlanEditNotNowReply)];
		} else if (step === "review") {
			// Review: the invitation, the reviews' proposed changes, the recommendation and submitting, then sharing.
			const askId = lastAsk?.id ?? "";
			let reply: SparksReply;
			if (isReviewOpenReply(askId) && answeringAsk && text === samplePublishIt) {
				// Published: the teams get this version of the idea and its prototype, and the invitation.
				setReview((current) =>
					current ? { ...current, status: { kind: "in-review" }, reviewers: sampleReviewersFor(chosenId), published: versions.length } : current,
				);
				reply = sampleInviteSentReply(versions.length);
			} else if (isReviewOpenReply(askId) && answeringAsk && text === "Evaluate it first") {
				reply = evaluateFrom("review");
			} else if (isReviewOpenReply(askId) && answeringAsk && text === "Not quite") reply = sampleInviteNotQuiteReply;
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
					opening = `Done: ${moved ? `${moved.done} (version ${version}), ` : ""}the question is under "Open questions", and the effort is engineering's.${moved ? " Evaluate needs a check now, since the prototype changed." : ""}\n\n`;
				}
				const openQuestions = make ? [...(review?.openQuestions ?? []), question] : (review?.openQuestions ?? []);
				setReview((current) => (current ? { ...current, engineeringEffort: current.engineeringEffort || make, openQuestions } : current));
				// Feedback first, the decision when she's ready: Sparks asks, and says if the teams now see an earlier version.
				reply = sampleDecisionAskReply(opening, review?.published && version > review.published ? version : undefined);
			} else if (
				(askId.startsWith("review-ask-decision") || askId.startsWith("review-decision-later")) &&
				answeringAsk &&
				(text === sampleAskDecision || text === "Ask for a decision" || text === "Not yet")
			) {
				if (text === "Not yet") reply = sampleDecisionLaterReply;
				else {
					const recommendation = sampleRecommendation(reviewEvaluation, chosenId);
					setReview((current) => (current ? { ...current, recommendation } : current));
					reply = sampleRecommendationReply("", recommendation, concept());
				}
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
			else if (askId.startsWith("review-decided") && answeringAsk && text === "Evaluate it") {
				reply = evaluateFrom("review");
			} else reply = sampleReviewQuestionReply(text, chosenId, reviewEvaluation);
			next = [...next, withNewId(reply)];
		} else if (step === "prototype") {
			// Prototype: a change to what she pointed at; an answer to Sparks's options; "Yes, evaluate it" or "Go to Review
			// instead" once it's built; otherwise a change asked for in words.
			const builtAll = isBuilt;
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
			} else if (builtAll && text === "Yes, evaluate it") {
				// Evaluate opens and the run starts there; Sparks's answer stays in Prototype.
				reply = evaluateFrom("prototype");
			} else if (builtAll && text === "Go to Review instead") {
				reply = enterReview("Done. The prototype is in your plan, and we'll skip Evaluate.\n\n", true);
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
			next = [...next, withNewId(reply ?? sampleDirectionsAgainReply())];
		} else if (onChosen && (answeringAsk || last?.id.startsWith("chosen-not-quite"))) {
			// "What we'll build": "Build it" puts it in the concept and finishes Plan; "Not quite" asks what's off; her
			// correction updates it.
			const chosen = [...messages]
				.reverse()
				.flatMap((m) => (m.from === "sparks" ? m.parts : []))
				.find((p) => p.kind === "chosen");
			if (buildsIt) {
				// Plan is done: Prototype opens beside the conversation, and Sparks starts building.
				const name = chosen?.kind === "chosen" ? chosen.chosen.name : "";
				const id = sampleDirections.find((d) => d.name === name)?.id ?? "fit-check";
				next = [
					...approveChosen(messages),
					userMessage,
					withNewId(samplePrototypeBuildingReply(id, screensOf(id))),
				];
				setStep("prototype");
				setReached("prototype");
				// The pick is a path: the first, or another one after going back to the choice. Its prototype and evaluation
				// start fresh; the other paths, and the review of one, stay.
				startPath(id);
				setWatching(undefined);
				setSelectedFinding(undefined);
			}
			else if (answeringAsk && notQuite) next = [...next, withNewId(sampleChosenNotQuiteReply)];
			else next = [...next, withNewId(sampleChosenAgainReply(latestOf(messages, "chosen")!.chosen, text))];
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
								: sampleSuccessSummaryReply(answer, sampleSuccessFrom(successAnswers(next)), sampleSuccessApprovedReply(successAnswers(next).measureChoice));
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
	 * A direction card's action (prds/sparks-plan-compare.md, "Directions in the plan"): before Plan is done, picking it;
	 * after, its path opens if it's built, or Sparks builds it as another path at once.
	 */
	const runDirection = (picked: (typeof sampleDirections)[number]) => {
		if (!paths.length) {
			// "Generate prototype" in Plan is her choice and her go-ahead in one: it finishes Plan and Sparks starts building,
			// so its reply is only its progress until the prototype is built, then what it built. Prototype opens and the
			// conversation goes on there. What we'll build goes in the plan in the background.
			const reply = withNewId(samplePrototypeBuildingReply(picked.id, screensOf(picked.id)));
			setStep("prototype");
			setReached("prototype");
			setMessages((current) => [
				...current,
				{ id: `u${++nextId}`, from: "user", text: `Generate a prototype of "${picked.name}".` },
				reply,
			]);
			startPath(picked.id);
			setWatching(undefined);
			setSelectedFinding(undefined);
			return;
		}
		if (paths.includes(picked.id)) {
			setActivePath(picked.id);
			setStep("prototype");
			return;
		}
		// Another direction, once Plan is done: "Generate prototype" is her go-ahead, so Sparks builds it as another path at
		// once, with no "Build it?" (prds/sparks-plan-compare.md, "Directions in the plan"). Prototype opens; her message
		// and Sparks's progress belong there, where its path will be. What it built says it's a new path.
		setStep("prototype");
		setMessages((current) => [
			...current,
			{ id: `u${++nextId}`, from: "user", text: `Let's also try "${picked.name}".`, step: "prototype" },
			{ ...withNewId(samplePrototypeBuildingReply(picked.id, screensOf(picked.id))), step: "prototype" },
		]);
		startPath(picked.id);
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

	/**
	 * Changing an answer in Plan (prds/sparks.md, "Changing an answer"): the question's card takes her new answer (a quick
	 * reply it offered, or her own words) and her bubble says it; the summary that answer feeds is drafted again from her
	 * answers, keeping whether she approved it (what we'll build follows a changed target). Once there's a prototype, the
	 * part is out of date, and Sparks says what changed and offers to update the prototype, at the end of Plan.
	 */
	const changeAnswer = (replyId: string, answer: string, own: boolean) => {
		const index = messages.findIndex((m) => m.id === replyId);
		const ask = messages[index];
		const reply = messages[index + 1];
		const current = ask ? askedSuggestion(ask) : undefined;
		if (!ask || !current || reply?.from !== "user") return;
		const original = originalSuggestions.current.get(replyId) ?? { ...current, text: current.suggested ?? current.text };
		const base: SparksSuggestion = { ...original, confirmed: true, answering: false, edited: undefined, unsure: undefined, suggested: original.text };
		const suggestion: SparksSuggestion = own
			? { ...base, text: answer, edited: true }
			: answer === "I'm not sure"
				? { ...base, assumption: true, unsure: true }
				: answer === "Repeat purchases instead"
					? { ...base, text: sampleSuccessRepeatMeasure, basis: undefined }
					: base;
		let next = messages.map((m, i) => (i === index ? answerSuggestion(m, suggestion, false) : i === index + 1 ? { ...reply, text: answer } : m));
		const part: PlanPartId = current.part.startsWith("brief-") ? "brief" : current.part.startsWith("success-") ? "success" : "problem";
		const has = (kind: SparksReplyPart["kind"]) => next.some((m) => m.from === "sparks" && m.parts.some((p) => p.kind === kind));
		const problem = part === "problem" && has("problem") ? problemFrom(next) : undefined;
		const brief = part === "brief" && has("brief") ? sampleBriefFrom(clarifyAnswers(next)) : undefined;
		const success = part === "success" && has("success") ? sampleSuccessFrom(successAnswers(next)) : undefined;
		const target = lastSuggestion(next, "success-target")?.text ?? "";
		const directions = directionsFrom(next);
		next = next.map((m) =>
			m.from !== "sparks"
				? m
				: {
						...m,
						parts: m.parts.map((p) => {
							if (p.kind === "problem" && problem) return { ...p, problem: { ...problem, approved: p.problem.approved } };
							if (p.kind === "brief" && brief) return { ...p, brief: { ...brief, approved: p.brief.approved } };
							if (p.kind === "success" && success) return { ...p, success: { ...success, approved: p.success.approved } };
							const direction = p.kind === "chosen" && success ? directions.find((d) => d.name === p.chosen.name) : undefined;
							if (p.kind === "chosen" && direction)
								return { ...p, chosen: { ...sampleChosenFrom(direction, directions, target), approved: p.chosen.approved } };
							return p;
						}),
					},
		);
		if (paths.length) {
			setOutdated((list) => (list.includes(part) ? list : [...list, part]));
			next = [...next, withNewId(samplePlanEditChangedReply(part, runs.length > 0))];
		}
		setMessages(next);
	};

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

	// "Add Plan" in the "+" menu (demo only): Plan's whole conversation, up to the directions, as the Directions story
	// has it. The workspace opens again on it (a new key), so it shows whole, at the directions, like a concept reopened.
	const [planAdded, setPlanAdded] = React.useState(0);
	const addPlan = () => {
		setStep("plan");
		setMessages(Directions.args?.messages ?? []);
		setConceptName(sampleConceptName);
		setPlanAdded((n) => n + 1);
	};

	return (
		<SparksWorkspace
			{...props}
			key={planAdded}
			// Right after "Add Plan", the view glides from the introduction down to the directions.
			glideToLatest={planAdded > 0}
			conceptName={conceptName}
			defaultConceptName={defaultName}
			onRename={(name) => setHerName(name === defaultName ? undefined : name)}
			onUseDefaultName={() => setHerName(undefined)}
			currentStep={step}
			reachedStep={reached}
			onStepSelect={setStep}
			share={{
				members: shareMembers,
				onInvite: (who, role) => addMembers([sampleShareMemberFor(who, role)]),
				// Typing in the field lists the people and departments that match.
				directory: sampleDirectory,
				onRoleChange: (id, role) => setShareMembers((current) => current.map((m) => (m.id === id ? { ...m, role } : m))),
				link: sampleShareLink,
			}}
			paths={{ built: paths, active: chosenId, onRun: runDirection }}
			// Evaluate's empty state, once the prototype is built: the same as "Yes, evaluate it".
			publish={publishButton}
			nextStepAction={
				reached === "prototype" && isBuilt
					? { label: "Evaluate the prototype", onClick: () => send("Yes, evaluate it", "Evaluate the prototype.") }
					: undefined
			}
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
			onAnswerChange={changeAnswer}
			// "Add from library": the AutoPartsHUB home on "My library", in its own tab, so the concept stays open here.
			onAddPlan={reached === "plan" ? addPlan : undefined}
			onAddFromLibrary={() => openStoryInNewTab(storyIds.autoPartsHubHome, { defaultTab: "library" }, "autopartshub-home")}
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
				idea: ideaComments,
				// From any step: Review opens, with the part brought into view.
				onOpenIdeaComment: (id) => {
					const part = ideaComments.find((c) => c.id === id)?.part;
					if (!part) return;
					if (step !== "review") setStep("review");
					setFocusPart({ part, key: Date.now() });
				},
				// From any step: Prototype opens on its path, with the comment's thread open on its pin.
				onOpenPrototypeComment: (id) => {
					const path = prototypeComments.find((c) => c.id === id)?.path?.id;
					if (path) setActivePath(path);
					if (step !== "prototype") setStep("prototype");
					setOpenPrototypeComment(id);
				},
			}}
			// Evaluate has no conversation: the prototype and the evaluation take the width.
			conversation={step !== "validate"}
			preview={
				step === "review" && review ? (
					<ReviewPanel
						concept={concept()}
						status={review.status}
						reviewers={review.reviewers}
						recommendation={review.recommendation}
						building={review.buildStep === undefined ? undefined : sampleReviewBuilt(reviewPartTitles, review.skipped, review.buildStep)}
						published={review.published}
						focusPart={focusPart}
						// Opens the reviewers' page for the version they see, in its own tab.
						onOpenPublished={() => openStoryInNewTab(storyIds.sparksPublishedIdea, { version: review.published })}
					/>
				) : step === "validate" ? (
					// Evaluate (Figma Sparks "Evaluate", 72:660): no conversation; the prototype, with the scenarios working it, and
					// the evaluation, side by side (prds/sparks-validate.md, "Evaluate's screen").
					<div className='flex min-h-0 flex-1 gap-4'>
						<EvaluationPrototype
							key={chosenId}
							className='min-w-0 basis-0'
							audienceFor={(view) => screenAudience(built, view)}
							paths={paths.map((id) => ({ id, label: pathLabel(id) }))}
							path={chosenId}
							onPathChange={setActivePath}
							versions={versions}
							// Restoring is a change to the prototype: Sparks says so in Prototype's conversation.
							onRestore={(id) => setMessages((current) => [...current, { ...withNewId(restore(id)), step: "prototype" }])}
							// The go-ahead needs a run on the current version; with no run at all, Review opens with Evaluate skipped.
							addToReviewBlocked={
								lastEvaluation && lastEvaluation.version !== versions.length ? "The prototype changed after the last run. Run it again first." : undefined
							}
							onAddToReview={() => {
								const open = lastEvaluation
									? lastEvaluation.findings.filter((f) => f.status === "open" && f.severity !== "Minor" && !fixedSince[f.id]).length
									: 0;
								const reply = enterReview(sampleValidateGoAheadOpening(open), !lastEvaluation);
								setMessages((current) => [...current, { id: `u${++nextId}`, from: "user", text: "Add it to Review." }, withNewId(reply)]);
							}}
							screens={evaluationScreens}
							agents={evaluationAgents}
							run={agentsWorking && lastRun ? { key: lastRun.startedAt, done: lastRun.finished } : undefined}
							onAgentStart={(id) => updateRun((r) => (r.started.includes(id) ? r : { ...r, started: [...r.started, id] }))}
							onAgentDone={(id) =>
								updateRun((r) => {
									if (r.finished.includes(id)) return r;
									// A scenario finishing moves the run on a step; an expert's look adds to the results.
									const scenario = r.evaluation.scenarios.some((s) => s.id === id);
									return { ...r, finished: [...r.finished, id], step: scenario ? r.step + 1 : r.step };
								})
							}
							onScreen={(label, agents) => updateRun((r) => ({ ...r, screen: { label, agents } }))}
							onAgentsDone={() => updateRun((r) => ({ ...r, agentsDone: true, screen: undefined }))}
							revealMarkers={Boolean(lastRun && lastRunFinished && !lastRun.stopped)}
							watching={watching}
							onWatchEnd={() => setWatching(undefined)}
							// Where the run's open findings happen (each drops as an agent finds it); the ones fixed since, with a check.
							markers={
								lastRun && !lastRun.stopped
									? lastRun.evaluation.findings.flatMap((f) =>
											f.at && f.status === "open"
												? [{ id: f.id, number: findingNumber(lastRun.evaluation, f.id), title: f.title, at: f.at, severity: f.severity, fixed: Boolean(fixedSince[f.id]) }]
												: [],
										)
									: []
							}
							focus={selectedFinding}
							onMarkerSelect={(id) => setSelectedFinding({ id, key: Date.now() })}
							// The screen in focus shows its finding in the evaluation too.
							onScreenFindings={(ids) => {
								if (ids[0]) setSelectedFinding({ id: ids[0], key: Date.now() });
							}}
						>
							{(audience, at) => built.render({ data: sampleFitCheck, audience, changes, openOn: at?.view, openPart: at?.part })}
						</EvaluationPrototype>
						<ValidatePanel
							className='min-w-0 basis-0'
							evaluation={lastRun?.evaluation}
							{...(lastRun ? sampleRunResults(lastRun.evaluation, lastRun.step) : {})}
							finished={lastRunFinished && !lastRun?.stopped}
							stopped={lastRun?.stopped}
							progress={
								lastRun
									? {
											...sampleRunProgress(lastRun.evaluation, lastRun.step, {
												stopped: lastRun.stopped,
												seconds: lastRun.seconds,
												finished: lastRun.finished,
												agentsDone: lastRun.agentsDone,
												screen: lastRun.screen,
											}),
											startedAt: lastRun.startedAt,
										}
									: undefined
							}
							agentStatus={
								lastRun
									? Object.fromEntries([
											...lastRun.started.map((id) => [id, "running"] as const),
											...lastRun.finished.map((id) => [id, "done"] as const),
										])
									: undefined
							}
							onRun={startRun}
							onStop={stopRun}
							currentVersion={versions.length}
							fixedSince={fixedSince}
							// The fix is made in place, as a new version, and the prototype shows it; then "Run again" checks it.
							onFix={(id) => {
								const fix = sampleFixes[id];
								if (!fix) return;
								saveVersion(fix.version, { ...changes, ...fix.changes });
								setSelectedFinding({ id, key: Date.now() });
							}}
							onSelectFinding={(id) => setSelectedFinding({ id, key: Date.now() })}
							selectedFinding={selectedFinding}
							onWatch={(id) => setWatching({ id, key: Date.now() })}
							// A suggestion that's another direction: built as another path (as its card's "Generate prototype"), or opened.
							directionAction={(id) => {
								const picked = sampleDirections.find((d) => d.id === id);
								return picked ? { built: paths.includes(id), onClick: () => runDirection(picked) } : undefined;
							}}
							onBackToChoice={() => {
								const reply = backToChoice("The evaluation suggests it won't reach your target on its own.");
								setMessages((current) => [...current, { id: `u${++nextId}`, from: "user", text: sampleBackToChoice }, withNewId(reply)]);
							}}
							empty={
								// Evaluate reached on another path: this one has no run yet.
								<EmptyState
									className='flex-1'
									title="This prototype hasn't been evaluated yet"
									description={`Select "Run": Sparks tries "${direction.name}" in realistic scenarios on the prototype, and checks it against AutoParts Co.'s data. Each path has its own results.`}
								/>
							}
						/>
					</div>
				) : step === "prototype" ? (
					<PrototypePanel
						key={chosenId}
						audiences={built.audiences}
						// Every screen Sparks built, for the arrows beside the device.
						screens={built.screens.map((name, view) => ({ name, audience: screenAudience(built, view).id }))}
						building={isBuilt ? undefined : prototypeBuild}
						pointing={pointing}
						onPointingChange={(on) => {
							setPointing(on);
							if (on) setPointedAt(undefined);
						}}
						versions={versions}
						onRestore={(id) => setMessages((current) => [...current, withNewId(restore(id))])}
						// Built from an earlier version of the plan: the note, and the way to update it (prds/sparks-prototype.md, "When the plan changes").
						notice={
							outdated.length
								? {
										text: samplePlanEditOutOfDate(outdated),
										actionLabel: "Update prototype",
										onAction: () => {
											const reply = matchPlan();
											setMessages((current) => [...current, { id: `u${++nextId}`, from: "user", text: "Update the prototype to match the plan." }, reply]);
										},
									}
								: undefined
						}
						commentAuthor={{ name: `${props.user.firstName} Morales`, avatarSrc: props.user.avatarSrc }}
						// "@" in a comment tags people and teams at AutoParts Co.
						mentionable={sampleMentionable}
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
						{(audience, screen) =>
							built.render({
								data: sampleFitCheck,
								audience,
								openOn: screen,
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
 * The Problem part done, one thing at a time: the statement, who it affects, why it matters, then the summary, the divider
 * and Clarify's first question, in one reply.
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

/** The conversation up to the Problem brief, every question confirmed. */
const briefMessages: SparksMessage[] = [
	...sampleMessages,
	confirm(sampleProblemStatementReply),
	{ id: "u2", from: "user", text: "Yes, that's it" },
	confirm(sampleProblemWhoReply),
	{ id: "u3", from: "user", text: "Yes, that's right" },
	confirm(sampleProblemWhyReply),
	{ id: "u4", from: "user", text: "Yes, that's right" },
	confirm(sampleProblemDoneReply(sampleProblem)),
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

/** The same, with Success's goal confirmed. */
const briefConfirmed: SparksMessage[] = briefMessages.map((m, i) => (i === briefMessages.length - 1 ? confirm(m) : m));

/** Clarify done, every guess confirmed: what we know, the divider and Success's first question, the goal. Not in Figma yet. */
export const ProblemBrief: Story = {
	args: {
		conceptName: sampleConceptName,
		messages: briefMessages,
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
			...briefConfirmed,
			{ id: "u9", from: "user", text: "Yes, that's right" },
			sampleSuccessMeasureReply("yes"),
		],
	},
};

/** The conversation up to the target question, with the goal and the returns as main measure confirmed. */
const successToTarget: SparksMessage[] = [
	...briefConfirmed,
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
			...briefConfirmed,
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
			...briefConfirmed,
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

/**
 * Every Success question answered: what success looks like, the divider, then all four directions at once, Sparks's
 * pick first ("Recommended"), its recommendation of "Fit check before you buy" (from the main measure) above them. No
 * question and no quick replies: she picks with a card's "Generate prototype". Not in Figma yet.
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
			return [...answered, sampleSuccessSummaryReply("yes", sampleSuccessFrom(successAnswers(answered)), sampleSuccessApprovedReply("returns"))];
		})(),
	},
};

/** Typed "Yes, go with it" at the directions: "What we'll build", drafted in one go. Not in Figma yet. */
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
 * "Generate prototype" on a direction: Plan is done and Prototype opens. Sparks's reply is its progress, step by step,
 * while the panel, blank at first, shows each screen as it's assembled; done, the progress folds to "Built in …" and Sparks
 * says what it built. Not in Figma yet.
 */
export const PrototypeBuilding: Story = {
	args: {
		conceptName: sampleConceptName,
		messages: Directions.args?.messages ?? [],
	},
	play: async ({ canvasElement }) => {
		const button = [...canvasElement.ownerDocument.querySelectorAll("button")].find((b) => b.textContent === "Generate prototype");
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
			...approveChosen(WhatWellBuild.args?.messages ?? []),
			{ id: "u15", from: "user", text: sampleBuildIt },
			{
				...goOn(
					samplePrototypeBuildingReply("fit-check", fitCheckScreens, sampleBuildSteps(fitCheckScreens).length),
					samplePrototypeReadyReply(sampleDirectionFitCheck, directionPrototypes["fit-check"].contents),
				),
				step: "prototype",
			},
		],
	},
};

/**
 * "Yes, evaluate it": Evaluate opens with no conversation, the prototype and the evaluation side by side (Figma Sparks
 * "Evaluate", 72:660). The scenarios line up beside the phone, and each, as an agent, works the prototype in turn while
 * the results come in on the right; then the markers stay where findings happen.
 */
export const ValidateRunning: Story = {
	args: PrototypeReady.args,
	play: async ({ canvasElement }) => {
		const button = [...canvasElement.ownerDocument.querySelectorAll("button")].find((b) => b.textContent === "Yes, evaluate it");
		button?.click();
	},
};

/**
 * The run finished: the evaluation on the right (Sparks's read first), the prototype on the left opened where the
 * first open finding happens, with its numbered marker; "Add to Review" for the go-ahead, "Run again" after a fix.
 */
export const ValidateResults: Story = {
	args: {
		conceptName: sampleConceptName,
		currentStep: "validate",
		reachedStep: "validate",
		messages: [
			...(PrototypeReady.args?.messages ?? []),
			{ id: "u16", from: "user", text: "Yes, evaluate it" },
			{ ...sampleValidateStartedReply, step: "prototype" },
		],
	},
};

/** "Go to Review instead" at the end of Prototype: Review opens with Evaluate skipped, "Not tested", and the gap listed. */
export const ReviewWithoutValidate: Story = {
	args: PrototypeReady.args,
	play: async ({ canvasElement }) => {
		const button = [...canvasElement.ownerDocument.querySelectorAll("button")].find((b) => b.textContent === "Go to Review instead");
		button?.click();
	},
};

/**
 * Back on Plan after reaching Evaluate: Plan is done, and it's still the conversation it was built in, with nothing
 * beside it: her answers to Sparks's questions show a pencil to change them (prds/sparks.md, "Changing an answer").
 * Prototype and Evaluate can be selected, Review can't yet. Not in Figma yet.
 */
export const StepsReached: Story = {
	args: {
		conceptName: sampleConceptName,
		messages: ValidateResults.args?.messages ?? [],
		currentStep: "plan",
		reachedStep: "validate",
	},
};
