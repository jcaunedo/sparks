import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { argsPendingAtLoad, goToStory, openStoryInNewTab, storyHref, storyIds, withStoryLinks } from "../../../story-links";
import { conceptStoryLinks } from "../start-page/concept-story-links";
import { EmptyState } from "@/components/feedback/empty-state";
import { sampleUser } from "../../sample-data/sample-user";
import { sampleLibrary, sampleLibraryNow } from "../../sample-data/sample-library";
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
	sampleFilesAddedReply,
	sampleProblemAddedWords,
	sampleProblemAppReply,
	sampleProblemAppReplyFor,
	sampleProblemCorrectedReply,
	sampleProblemDoneReply,
	sampleProblemEvidenceNewAppReply,
	sampleProblemEvidenceReply,
	sampleProblemFromWordsReply,
	sampleProblemMessageKind,
	sampleProblemNameFrom,
	sampleProblemNewApp,
	sampleProblemNewAppText,
	sampleProblemNotQuiteReply,
	sampleProblemStatementReply,
	sampleProblemSummaryFrom,
	sampleProblemUnclearReply,
	sampleProblemWhoReply,
	sampleProblemWhoReplyAfter,
	sampleProblemEvidenceMoreReply,
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
import { clearDemoSharedComments, useDemoSharedComments } from "../shared/demo-shared-comments";
import {
	clearDemoConcept,
	continueDemoConcept,
	demoConceptHref,
	isContinuingDemoConcept,
	loadDemoConcept,
	returnToIdeas,
	saveDemoConcept,
} from "../shared/demo-session";
import { sampleFitCheck } from "../prototype/sample-fit-check";
import { directionPrototypes, screenAudience } from "../prototype/direction-prototypes";
import type { ReviewDecision } from "../review/sample-review-directions";
import type { IdeaStatus } from "../shared/idea-status";
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
	sampleLaterItem,
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
import {
	sampleFixAgainReply,
	sampleFixFollowUps,
	sampleFixMadeReply,
	sampleFixMessage,
	sampleFixNext,
	sampleFixPlanReply,
	sampleFixStage,
	sampleMakeTheChange,
	sampleFixAll,
} from "../prototype/sample-fix";
import { assetName } from "../../library/library-assets";
import type { LibraryPick } from "./library-dialog";
import type { LibraryItem } from "./library-panel";
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
	sampleValidateStartedReply,
} from "../validate/sample-validate";
import { ReviewPanel, reviewPartsOf, type IdeaComment, type Reviewer, type ReviewNext, type ReviewStatus } from "../review/review-panel";
import { ReviewStatusPanel, ReviewTeamAssessment } from "../review/review-status";
import { ReviewNextOnCard } from "../review/review-next";
import { sampleAssessmentStepMs, sampleReviewFeedback } from "../review/sample-review-status";
import {
	sampleConceptForReview,
	sampleBuildFlag,
	sampleBuildFlagMs,
	sampleProductTeam,
	sampleJira,
	sampleReadyToBuild,
	sampleTeamMember,
	sampleDecision,
	sampleDecisionMs,
	sampleDecisionOwner,
	sampleWithTeamsNote,
	sampleRecommendation,
	sampleReviewChanges,
	sampleReviewersFor,
	sampleReviewerFor,
	sampleReviewerViews,
	sampleRemindedCount,
	sampleRemindedView,
	sampleReviewerPin,
	sampleReviewerIdeaComment,
	sampleReviewBuildFinished,
	sampleReviewBuildProgress,
	sampleReviewBuilt,
	sampleReviewBuildStepMs,
	sampleReviewStepMs,
	sampleReviewProposals,
	sampleNotEvaluatedNote,
	sampleReviewStartedReply,
	sampleInvitationEmail,
	sampleReviewSummary,
sampleDepartmentsInWords,
} from "../review/sample-review";
import { sampleDirectory, sampleMentionable, samplePeopleIn, sampleShareDepartment, sampleShareLink, sampleShareMemberFor, sampleShareOwner } from "../shared/sample-share";
import type { ShareMember } from "@/components/overlays/share-popover";
import { cn } from "@/lib/utils";
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
const problemSteps = [sampleProblemStatementReply, sampleProblemAppReply, sampleProblemEvidenceReply, sampleProblemWhoReply, sampleProblemWhyReply];

/** "It's a new app" on the app's card: nothing is live yet. */
const isNewApp = (messages: SparksMessage[]) => lastSuggestion(messages, "app")?.text === sampleProblemNewAppText;

/** The web addresses in a text, without the punctuation after them. */
const linksIn = (text: string) => (text.match(/https?:\/\/[^\s<>"]+/gi) ?? []).map((url) => url.replace(/[.,;:!?)\]]+$/, ""));
const libraryItem = (kind: LibraryItem["kind"], label: string, { app, title }: Pick<LibraryItem, "app" | "title"> = {}): LibraryItem => ({
	id: `${kind}:${label}`,
	kind,
	label,
	...(title ? { title } : {}),
	...(app ? { app } : {}),
});

/**
 * What Dana gave the idea in the conversation (prds/sparks.md, "The idea's library"): the live app's address, once she
 * confirmed it, her files, the links in her messages, and the notes she typed as supporting material. Each once.
 */
function libraryFrom(messages: SparksMessage[]): LibraryItem[] {
	const app = lastSuggestion(messages, "app");
	const items: LibraryItem[] = app?.confirmed ? linksIn(app.text).map((url) => libraryItem("link", url, { app: true })) : [];
	messages.forEach((message, index) => {
		if (message.from !== "user") return;
		items.push(...(message.attachments ?? []).map((name) => libraryItem("file", name)));
		items.push(...(message.fromLibrary ?? []).map((item) => libraryItem(item.kind, item.label, { title: item.title })));
		items.push(...linksIn(message.text).map((url) => libraryItem("link", url)));
		const words = messages[index - 1]?.id.startsWith("problem-evidence") ? sampleProblemAddedWords(message.text) : undefined;
		// Only a link isn't a note too; "Attach files" isn't an answer.
		if (words && linksIn(words).join(" ") !== words) items.push(libraryItem("note", words));
	});
	return items.filter((item, index) => items.findIndex((other) => other.id === item.id) === index);
}

/** "What you added" in the Problem summary: the library, without the app (it has its own line) and links already in a note. */
const addedFrom = (library: LibraryItem[]) =>
	library
		.filter((item) => !item.app && !(item.kind === "link" && library.some((other) => other.kind === "note" && other.label.includes(item.label))))
		.map((item) => item.title ?? item.label);

/** The problem as it stands: the sample, with Dana's edits to the suggestions, and what she added to support it. */
function problemFrom(messages: SparksMessage[], library = libraryFrom(messages)): ProblemDraft {
	const parts = { ...sampleProblem.parts };
	for (const message of messages) {
		if (message.from !== "sparks") continue;
		for (const part of message.parts) {
			if (part.kind !== "suggestion" || !part.suggestion.edited || !(part.suggestion.part in parts)) continue;
			const id = part.suggestion.part as ProblemPartId;
			parts[id] = { ...parts[id], text: part.suggestion.text, source: "edited" };
		}
	}
	if (isNewApp(messages)) parts.app = { text: sampleProblemNewAppText, source: "you" };
	const problem = { ...sampleProblem, parts, added: addedFrom(library) };
	// The app and what she added have their own lines, so only the rest rewrites the summary.
	const changed = Object.entries(parts).some(([id, part]) => id !== "app" && part.source === "edited");
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
 * Problem part, one thing at a time: the problem statement, the live app it improves, anything that supports it
 * (optional), who it affects, why it matters, then the summary,
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

/** Story-only: Review opens already published (`ReviewPublished`), with no assessment in yet. */
type PrototypeProps = SparksWorkspaceProps & { startPublished?: boolean };

/** A new concept's name until Sparks names it, the same words as the button that created it. */
const newIdeaName = "New idea";

function WorkspacePrototype(props: PrototypeProps) {
	const [messages, setRawMessages] = React.useState<SparksMessage[]>(props.messages);
	// The name Sparks gives the concept ("New idea" until it does), and the one she gave it, which wins: Sparks naming
	// it later doesn't replace hers (prds/sparks.md, "The start page").
	// Reopened with a name she gave it (the demo's saved concept): Sparks's name stays the default, hers is shown.
	const [defaultName, setConceptName] = React.useState(props.defaultConceptName ?? props.conceptName);
	const [herName, setHerName] = React.useState<string | undefined>(() =>
		props.defaultConceptName && props.conceptName !== props.defaultConceptName ? props.conceptName : undefined,
	);
	const conceptName = herName ?? defaultName;
	// A story's messages reset the conversation only when they change, not when Storybook re-renders the same ones (a
	// story that clicks a quick reply for you would otherwise lose what the click added).
	const messageIds = props.messages.map((m) => m.id).join(",");
	const appliedIds = React.useRef(messageIds);
	React.useEffect(() => {
		if (appliedIds.current === messageIds) return;
		appliedIds.current = messageIds;
		setRawMessages(props.messages);
	}, [messageIds]);
	React.useEffect(() => setConceptName(props.defaultConceptName ?? props.conceptName), [props.defaultConceptName, props.conceptName]);
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
	// The path in Review. A story that starts on Review (or past it) has the plan's choice there.
	const [reviewPath, setReviewPath] = React.useState<string | undefined>(() => ((props.reachedStep ?? props.currentStep) === "review" ? planChoiceId : undefined));
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
	// A path's label: the direction's name alone ("Flag often-returned parts"), the idea, not a card in the plan's list.
	const pathLabel = (id: string) => {
		return (sampleDirections.find((d) => d.id === id) ?? sampleDirectionFitCheck).name;
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
	/** `later`: what she left for later on this path ("Add it to What comes later"), for Review's "What comes later". */
	type PathData = { buildStep: number; versions: Version[]; runs: Run[]; later: string[] };
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
		return { buildStep: unfinished ?? (started ? sampleBuildSteps(screensOf(id)).length : 0), versions: [firstVersion], runs: id === planChoiceId ? initialRuns : [], later: [] };
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
		setPathData((current) => ({ ...current, [id]: { buildStep: 0, versions: [firstVersion], runs: [], later: [] } }));
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
	const savedVersion = React.useRef(0);
	const saveVersion = (name: string, next: FitCheckChanges) => {
		const number = versions.length + 1;
		savedVersion.current = number;
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
	// Adding a comment: turned on with "Add comment" on the prototype's toolbar, on the prototype and, in Review, on the idea.
	const [addingComment, setAddingComment] = React.useState(false);
	// Her comments on the prototype, kept here so the Comments panel lists them; the one opened from there.
	const [prototypeComments, setPrototypeComments] = React.useState<PrototypeComment[]>(() =>
		// What others left while she was away, for an idea opened with comments: on the path it's on.
		(props.comments?.prototype ?? []).map((c) => ({ ...c, path: { id: chosenId, label: pathLabel(chosenId) } })),
	);
	// The ones she hasn't opened yet.
	const [newComments, setNewComments] = React.useState<string[]>(() => (props.comments?.prototype ?? []).map((c) => c.id));
	// The reviewers' comments on parts of the idea, and the part to bring into view in Review when one is opened.
	const [ideaComments, setIdeaComments] = React.useState<IdeaComment[]>([]);
	// The comment on the idea whose thread is open (from the Comments panel, or its pin).
	const [openIdeaComment, setOpenIdeaComment] = React.useState<string>();
	const [focusPart, setFocusPart] = React.useState<{ part: string; key: number }>();
	const [openPrototypeComment, setOpenComment] = React.useState<string | undefined>(undefined);
	/** Opened from the panel or on its pin: it's read. */
	const setOpenPrototypeComment = (id: string | undefined) => {
		setOpenComment(id);
		if (id) setNewComments((current) => current.filter((other) => other !== id));
	};
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
		setOpenAt(undefined);
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
	const [selectedFinding, setSelectedFinding] = React.useState<{ id: string; key: number; fromScreen?: boolean }>();
	const selectFinding = (id: string) => setSelectedFinding({ id, key: ++nextId });
	// Findings fixed in the prototype since the last run ("Fix in the prototype"), with the version that fixed them.
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
	/**
	 * "Evaluate" in Prototype's toolbar (prds/sparks-prototype.md, "Finishing the step"): runs it, "Evaluate again" after a
	 * change (or a run she stopped); with results for this version, or a run going, it opens them.
	 */
	const evaluateAction = (() => {
		const current = lastRun && !lastRun.stopped && lastRun.evaluation.version === versions.length;
		if (current) return { label: "Evaluate", onClick: () => setStep("validate") };
		return {
			label: lastRun ? "Evaluate again" : "Evaluate",
			onClick: () => {
				setPointing(false);
				setPointedAt(undefined);
				const reply = withNewId(evaluateFrom("prototype"));
				setMessages((list) => [...list, { id: `u${++nextId}`, from: "user", text: lastRun ? "Evaluate it again." : "Evaluate the prototype." }, reply]);
			},
		};
	})();
	// "Fix in the prototype" (prds/sparks-prototype.md, "Fixing a finding"): the place in Prototype it opens on, for the
	// path it's on, and Sparks's plan for it. A fix already made brings what was done instead.
	const [openAt, setOpenAt] = React.useState<{ path: string; key: number; view: number; part?: string; element?: string; label?: string }>();
	const findingToFix = (id: string) => {
		const finding = lastRun?.evaluation.findings.find((f) => f.id === id);
		return finding && lastRun ? { id, title: finding.title, number: findingNumber(lastRun.evaluation, id), onPage: Boolean(finding.at), at: finding.at } : undefined;
	};
	/** The next finding the prototype can fix, besides this one: by its number. */
	const nextToFix = (id: string) => {
		const next = lastRun?.evaluation.findings.find((f) => f.id !== id && f.status === "open" && f.fixable && sampleFixes[f.id] && !fixedSince[f.id]);
		return next && findingToFix(next.id)?.number;
	};
	const startFix = (id: string, shown?: string): SparksMessage[] => {
		const finding = findingToFix(id);
		const fix = sampleFixes[id];
		if (!finding || !fix) return [];
		const { at } = finding;
		setOpenAt(at && { path: chosenId, key: Date.now(), ...at, label: at.part && sampleFitCheck.parts.find((p) => p.id === at.part)?.name });
		setPointing(false);
		setPointedAt(undefined);
		setWatching(undefined);
		// Back in Evaluate, it's the finding in view.
		selectFinding(id);
		setStep("prototype");
		const fixedIn = fixedSince[id];
		return [
			{ id: `u${++nextId}`, from: "user", text: shown ?? sampleFixMessage(finding, Boolean(fixedIn)) },
			withNewId(
				fixedIn
					? sampleFixAgainReply(finding, fix.summary, fixedIn, changes, nextToFix(id))
					: sampleFixPlanReply(finding, changes, versions.length + 1),
			),
		];
	};
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
	// Review, by path (prds/sparks-review.md, "Review's screen"): each path sent to Review keeps its own review, so
	// switching paths there and back finds it as it was.
	const [reviews, setReviews] = React.useState<
		Record<
			string,
			{
		/** What she wrote with "Add a note" in "Publish your idea": added to the invitation email, after Sparks's message. */
		note?: string;
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
		/** When it started, for the time counting up; how long it took, once it's done. */
		startedAt?: number;
		seconds?: number;
/** The reviews' proposed changes: made (what that did) or left. */
		changes?: { made: boolean; done?: string };
		/** She edited her recommendation; she shared the advanced idea with the reviewers' departments. */
		recommendationEdited?: boolean;
		shared?: boolean;
		/** The prototype version the teams see, once she's published (prds/sparks-review.md, "Publishing"), and when (ISO). */
		published?: number;
		publishedAt?: string;
		/** When "Send a reminder" was selected (ISO), for the version published now. */
		remindedAt?: string;
		/** In the demo, the people a reminder brought in (by id): they answer too, though Sparks didn't suggest them. */
		reminded?: string[];
		/** Advanced: "Create in Jira" (prds/sparks-review.md, "Creating it in Jira"): being created, then created. */
		jira?: "creating" | "created";
		/**
		 * Advanced and shared: what the team who builds it flagged as unclear, Sparks's fix (hers to edit) and what she did
		 * (prds/sparks-review.md, "Something unclear after it advances").
		 */
		buildFlag?: { commentId: string; text: string; criterion: string; suggestion: string; why: string; edited?: boolean; outcome?: "made" | "skipped" };
		/** Clarifications she made after it advanced: a criterion as it was, and as it reads now. */
		clarified?: { from: string; to: string }[];
			}
		>
	>(() =>
		// A story (or an idea reopened) that starts on Review, or past it: the idea, put together.
		(props.reachedStep ?? props.currentStep) === "review"
			? {
					[planChoiceId]: props.startPublished
						? {
								// Published (version 1) just now, to the suggested teams; nobody has assessed it yet.
								status: { kind: "in-review" },
								reviewers: sampleReviewersFor(planChoiceId),
								ticks: 0,
								skipped: initialRuns.length === 0,
								openQuestions: [],
								published: 1,
								publishedAt: new Date().toISOString(),
							}
						: { status: { kind: "ready" }, reviewers: [], ticks: 0, skipped: initialRuns.length === 0, openQuestions: [] },
				}
			: {},
	);
	const lastFinished = (list: Run[]) => [...list].reverse().find((r) => !r.stopped && sampleRunFinished(r.evaluation, r.step))?.evaluation;
	const lastEvaluation = lastFinished(runs);
	// What Review is about: the path sent there (the one shown, before any is).
	const reviewId = reviewPath ?? chosenId;
	type ReviewState = (typeof reviews)[string];
	type ReviewUpdate = ReviewState | undefined | ((current: ReviewState | undefined) => ReviewState | undefined);
	const review: ReviewState | undefined = reviews[reviewId];
	const setReviewFor = (id: string, next: ReviewUpdate) =>
		setReviews((map) => {
			const value = typeof next === "function" ? next(map[id]) : next;
			const copy = { ...map };
			if (value) copy[id] = value;
			else delete copy[id];
			return copy;
		});
	const setReview = (next: ReviewUpdate) => setReviewFor(reviewId, next);
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
			clarified: review?.clarified,
			later: reviewData.later,
		});
	/**
	 * Review opens (prds/sparks-review.md, "Review's screen"): no conversation; Sparks puts the idea together on the left,
	 * part by part (the timer below), beside the prototype. Already published, for this path: it opens as it was.
	 */
	const enterReview = (skipped: boolean) => {
		setStep("review");
		setReached("review");
		setReviewPath(chosenId);
		const existing = reviews[chosenId];
		if (existing?.published !== undefined && !existing.decision) {
			setReviewFor(chosenId, { ...existing, skipped });
			return;
		}
		setReviewFor(chosenId, { status: { kind: "ready" }, reviewers: [], ticks: 0, skipped, openQuestions: [], buildStep: 0, startedAt: Date.now() });
	};
	/**
	 * The paths menu on the idea's name, in Review (with more than one path): Review on that path, and its prototype on the
	 * right. One already in Review opens as it was; another is put together, Evaluate skipped if it has no finished run.
	 */
	const switchReviewPath = (id: string) => {
		if (id === reviewId) return;
		setReviewStatusOpen(false);
		setActivePath(id);
		setReviewPath(id);
		if (!reviews[id])
			setReviewFor(id, { status: { kind: "ready" }, reviewers: [], ticks: 0, skipped: !lastFinished(dataFor(id).runs), openQuestions: [], buildStep: 0, startedAt: Date.now() });
	};
	/**
	 * "Add to Review", in Evaluate and on Review's empty state: it needs a run on the current version; with no run at all,
	 * Review opens with Evaluate skipped, and Sparks says so in Prototype's conversation.
	 */
	const addToReviewBlocked = running
		? "Wait for the evaluation to finish, or stop it."
		: lastEvaluation && lastEvaluation.version !== versions.length
			? "The prototype changed after the last run. Run it again first."
			: undefined;
	const addToReview = () => {
		const skipped = !lastEvaluation;
		const fromPrototype = reached === "prototype";
		setPointing(false);
		setPointedAt(undefined);
		enterReview(skipped);
		// The same as "Go to Review instead": it's still the last question in Prototype.
		if (skipped && fromPrototype)
			setMessages((list) => [
				...list,
				{ id: `u${++nextId}`, from: "user", text: "Add it to Review." },
				{ ...withNewId(sampleReviewStartedReply), step: "prototype" },
			]);
	};
	const [shareMembers, setShareMembers] = React.useState<ShareMember[]>(() => [sampleShareOwner(props.user.firstName, props.user.avatarSrc)]);
	const addMembers = (added: ShareMember[]) =>
		setShareMembers((current) => [...current, ...added.filter((member) => !current.some((m) => m.id === member.id))]);
	// Who reviews it: the people Sparks suggests for this idea (by its direction), first, then their teams, added with
	// "Share" (prds/sparks-review.md, "Who to invite"). Who she's added is who the invitation goes to; a team reviews once
	// it, or its person, is in.
	const suggestedPeople = sampleReviewersFor(reviewId).map((reviewer) => {
		const member = sampleShareMemberFor(reviewer.name, "commenter");
		return { reviewer, member, detail: member.detail };
	});
	// Each of their teams once, when it's a department in Share (a team Share doesn't have would be added as a person).
	const suggestedTeams = [...new Set(sampleReviewersFor(reviewId).map((reviewer) => reviewer.department))]
		.map(sampleShareDepartment)
		.filter((team) => team.kind === "department")
		.map((team) => ({ member: team, detail: team.detail }));
	const suggestedReviewers = [...suggestedPeople, ...suggestedTeams];
	// The reviewers: everyone she added as "Can comment", each person, and the people in each team she added, without
	// those she unchecked; each person once. "Can view" people see it but aren't asked to assess it. They're who the
	// invitation goes to, the count in "Publish your idea", and who the team assessment counts, fixed when she publishes
	// (someone added later joins with the next update) (prds/sparks-review.md, "Team assessment and Review status").
	const addedReviewers = shareMembers.filter((m) => m.role === "commenter");
	const reviewersInShare = (() => {
		const byName = new Map<string, Reviewer>();
		const add = (name: string, subtitle: string | undefined, avatarSrc: string | undefined, department: string) => {
			if (!byName.has(name)) byName.set(name, sampleReviewerFor({ name, subtitle, avatarSrc, department }, reviewId));
		};
		for (const member of addedReviewers) {
			if (member.kind === "person") add(member.name, member.detail, member.avatarSrc, member.detail?.split(" · ")[1] ?? "");
			else
				for (const p of samplePeopleIn(member.name))
					if (!member.excluded?.includes(p.name)) add(p.name, `${p.detail} · ${member.name}`, p.avatarSrc, member.name);
		}
		return [...byName.values()];
	})();
	const reviewerCount = reviewersInShare.length;
	/** The people and teams she added with "Share" get this version of the idea and its prototype, and the email invitation. */
	// What's shared when she publishes: every path built, the one in Review first, each at its latest version.
	const sharedPaths = [reviewId, ...paths.filter((id) => id !== reviewId)];
	const publishIt = () => {
		const publishedAt = new Date().toISOString();
		for (const id of sharedPaths)
			setReviewFor(id, (current) => ({
				...(current ?? { status: { kind: "ready" }, reviewers: [], ticks: 0, skipped: !lastFinished(dataFor(id).runs), openQuestions: [] }),
				status: { kind: "in-review" },
				reviewers: reviewersInShare,
				published: dataFor(id).versions.length,
				publishedAt,
				remindedAt: undefined,
				reminded: undefined,
			}));
	};
	// Published, for the path on screen: its version and when, under the prototype's title in every step.
	const publishedInfo =
		review?.published !== undefined && review.publishedAt && reviewId === chosenId ? { version: review.published, at: review.publishedAt } : undefined;
	// "Publish your idea", open (from the header's Publish).
	const [publishOpen, setPublishOpen] = React.useState(false);
	// A new version published: the reviewers look again, so its assessments start over (each one's view of the earlier
	// version stays with them, `earlier`), and so does the reminder. It goes to who's in Share now: someone she added
	// since the last publish joins, invited; someone she removed is left out.
	const publishUpdate = (version: number) =>
		setReview((current) =>
			current
				? {
						...current,
						published: version,
						publishedAt: new Date().toISOString(),
						remindedAt: undefined,
						reminded: undefined,
						reviewers: reviewersInShare.map((invitee) => {
							const r = current.reviewers.find((existing) => existing.name === invitee.name);
							if (!r) return invitee;
							return r.status === "view" && r.view && r.version !== undefined
								? { ...r, status: "opened", view: undefined, why: undefined, version: undefined, earlier: { version: r.version, view: r.view } }
								: r;
						}),
					}
				: current,
		);
	/** "Publish", "Publish update" or "Published", in the header, on Review (prds/sparks-review.md, "Publishing"). */
	const publishAction = (() => {
		const latest = reviewData.versions.length;
		if (!review) return undefined;
		if (review.buildStep !== undefined) return { label: "Publish", disabled: true, hint: "Putting your idea together…" };
		if (review.published === undefined) return { label: "Publish", onClick: publishIt };
		if (latest > review.published) return { label: "Publish update", onClick: () => publishUpdate(latest) };
		// The teams have the latest: "Published" shows what went out, when and to whom.
		return {
			label: "Published",
			published: {
				at: review.publishedAt ?? new Date().toISOString(),
				// The idea, and each path that went out, at the version published.
				items: [
					{
						name: conceptName,
						paths: sharedPaths
							.filter((id) => reviews[id]?.published !== undefined)
							.map((id) => ({ name: pathLabel(id), version: reviews[id]?.published })),
					},
				],
				reviewers: review.reviewers.length,
				departments: [...new Set(review.reviewers.map((r) => r.department))],
				linkHref: storyHref(storyIds.sparksPublishedIdea),
			},
		};
	})();
	/**
	 * Where the idea stands, in the badge after its name and on its start-page row (prds/sparks.md, "Where an idea
	 * stands"): decided or waiting for a decision on any path; in review once any path is published; ready to publish
	 * once Review has put a path together; a draft until then.
	 */
	const ideaStatus = ((): { status: IdeaStatus; date?: string } => {
		const all = Object.values(reviews);
		const advanced = all.find((r) => r.status.kind === "advanced")?.status;
		if (advanced?.kind === "advanced") return { status: "advanced", date: advanced.date.replace(/, \d{4}$/, "") };
		if (all.some((r) => r.status.kind === "waiting")) return { status: "waiting" };
		// Published: with the teams, until she asks for a decision.
		if (all.some((r) => r.published !== undefined)) return { status: "in-review" };
		return { status: all.some((r) => r.buildStep === undefined) ? "ready" : "draft" };
	})();
	/** What Review is waiting for, at the top of the idea for review (`ReviewNextStep`). */
	// In the demo, the reviewers Sparks suggested answer; anyone else she added stays invited (pending in the team
	// assessment), so the reviews are in once the suggested ones have.
	// A reminder brings some of the others in (`reminded`), so it shows what it does.
	const answersInDemo = (r: Reviewer) => sampleReviewersFor(reviewId).some((s) => s.id === r.id) || Boolean(review?.reminded?.includes(r.id));
	const reviewsIn = Boolean(
		review?.reviewers.some(answersInDemo) && review.reviewers.filter(answersInDemo).every((r) => r.status === "view"),
	);
	const reviewNext = ((): ReviewNext | undefined => {
		if (!review || review.buildStep !== undefined) return undefined;
		const latest = reviewData.versions.length;
		const owner = `${sampleDecisionOwner.name}, ${sampleDecisionOwner.role}`;
		const evaluateIt = () => {
			setActivePath(reviewId);
			startRun();
		};
		const update = (next: Partial<typeof review>) => setReview((current) => (current ? { ...current, ...next } : current));
		if (review.decision)
			return {
				kind: "decided",
				decision: review.decision.kind,
				owner: review.decision.owner,
				reason: review.decision.reason,
				departments: sampleDepartmentsInWords(reviewId),
				team: `your product team, the ${sampleProductTeam.toLowerCase()}`,
				ready: review.decision.kind === "advance" ? sampleReadyToBuild(concept(), reviewChanges, reviewId) : undefined,
				flag: review.buildFlag
					? {
							who: `${sampleTeamMember.name}, from your product team`,
							text: review.buildFlag.text,
							criterion: review.buildFlag.criterion,
							suggestion: review.buildFlag.suggestion,
							why: review.buildFlag.why,
							edited: Boolean(review.buildFlag.edited),
							outcome: review.buildFlag.outcome,
							onChange: (text) => update({ buildFlag: { ...review.buildFlag!, suggestion: text, edited: true } }),
							onMake: () => {
								const flag = review.buildFlag!;
								update({ buildFlag: { ...flag, outcome: "made" }, clarified: [...(review.clarified ?? []), { from: flag.criterion, to: flag.suggestion }] });
								// Jordan, and everyone it's shared with, sees how it was addressed, under the comment.
								// Her reply in its thread, as she'd answer it on the idea herself.
								const how = `I changed the acceptance criterion: "${flag.suggestion}"`;
								setIdeaComments((current) =>
									current.map((c) =>
										c.id === flag.commentId
											? {
													...c,
													addressed: `${props.user.firstName} changed the acceptance criterion: "${flag.suggestion}"`,
													replies: [
														...(c.replies ?? []),
														{ id: `reply-${Date.now()}`, text: how, createdAt: new Date().toISOString(), author: { name: `${props.user.firstName} Morales`, avatarSrc: props.user.avatarSrc } },
													],
												}
											: c,
									),
								);
							},
							onSkip: () => update({ buildFlag: { ...review.buildFlag!, outcome: "skipped" } }),
						}
					: undefined,
				// Advanced: an epic in her product team's Jira project, one story per user story (pretend: nothing is sent).
				jira:
					review.decision.kind === "advance"
						? {
								project: sampleJira.project,
								stories: concept().stories.length,
								status: review.jira ?? "idle",
								epic: sampleJira.epic,
								url: sampleJira.url,
								onCreate: () => {
									update({ jira: "creating" });
									window.setTimeout(() => setReviewFor(reviewId, (current) => (current ? { ...current, jira: "created" } : current)), sampleJira.createMs);
								},
							}
						: undefined,
				shared: Boolean(review.shared),
				// The same sharing as "Share": her product team, then the reviewers' departments, join "Who has access".
				onShare: () => {
					addMembers([sampleProductTeam, ...sampleReviewersFor(reviewId).map((reviewer) => reviewer.department)].map(sampleShareDepartment));
					update({ shared: true });
				},
				onEvaluate: evaluateIt,
				onBackToChoice: () => {
					const reply = backToChoice(`${sampleDecisionOwner.name}'s reason is first in Decisions, so whatever you pick next starts from it.`);
					setMessages((current) => [...current, { id: `u${++nextId}`, from: "user", text: sampleBackToChoice }, withNewId(reply)]);
				},
			};
		if (review.status.kind === "waiting") return { kind: "waiting", owner: sampleDecisionOwner.name };
		if (review.recommendation !== undefined) {
			const open = concept();
			return {
				kind: "recommendation",
				text: review.recommendation,
				edited: Boolean(review.recommendationEdited),
				owner,
				open: open.knownIssues.length + open.gaps.length,
				onChange: (text) => update({ recommendation: text, recommendationEdited: true }),
				onSubmit: () => update({ status: { kind: "waiting", owner: sampleDecisionOwner.name }, submitted: true }),
			};
		}
		if (reviewsIn && !review.changes)
			return {
				kind: "reviews",
				...sampleReviewSummary(reviewChanges, reviewId),
				proposals: sampleReviewProposals(reviewChanges, reviewId),
				onMake: () => {
					const proposed = sampleReviewChanges(reviewChanges, reviewId);
					const moved = proposed.prototype;
					const version = moved ? saveVersion(moved.version, moved.changes) : undefined;
					const what = [...(moved ? [`${moved.done} (version ${version})`] : []), 'the question is under "Open questions"', "the effort is engineering's"];
					update({
						engineeringEffort: true,
						openQuestions: [...review.openQuestions, proposed.question],
						changes: {
							made: true,
							done: `Done: ${what.slice(0, -1).join(", ")} and ${what[what.length - 1]}.${moved ? " Evaluate needs a check now, since the prototype changed." : ""}`,
						},
					});
				},
				onSkip: () => update({ changes: { made: false } }),
			};
		if (reviewsIn)
			return {
				kind: "ask",
				done: review.changes?.done,
				stale: review.published !== undefined && latest > review.published ? { seen: review.published, now: latest } : undefined,
				owner,
				onDraft: () => update({ recommendation: sampleRecommendation(reviewEvaluation, reviewId) }),
			};
		if (review.published !== undefined) return { kind: "in-review", version: review.published, stale: latest > review.published ? latest : undefined };
		return {
			kind: "publish",
			version: latest,
		};
	})();
	/** The first change to a published prototype: Sparks says what the teams still see, once per version published. */
	const withTeamsNote = (reply: SparksReply): SparksReply => {
		const first =
			review?.published !== undefined && reviewPath === chosenId && review.published === versions.length && savedVersion.current === versions.length + 1;
		return first ? sampleWithTeamsNote(reply, versions.length) : reply;
	};
	// Advanced and shared: a while later, someone on her product team flags an acceptance criterion as unclear, and
	// Sparks proposes a fix in the next step (prds/sparks-review.md, "Something unclear after it advances").
	React.useEffect(() => {
		if (!review?.shared || review.decision?.kind !== "advance" || review.buildFlag) return;
		const flag = sampleBuildFlag(concept(), reviewId);
		if (!flag) return;
		const timer = window.setTimeout(() => {
			setIdeaComments((current) => [...current, { ...flag.comment, createdAt: new Date().toISOString() }]);
			setReview((current) =>
				current
					? {
							...current,
							buildFlag: { commentId: flag.comment.id, text: flag.comment.text, criterion: flag.criterion, suggestion: flag.suggestion, why: flag.why },
						}
					: current,
			);
		}, sampleBuildFlagMs);
		return () => window.clearTimeout(timer);
	}, [review?.shared, review?.decision?.kind, review?.buildFlag, reviewId]);
	// Putting the idea together: one step at a time (getting ready, each part, what's open and who to ask).
	React.useEffect(() => {
		if (!review || review.buildStep === undefined) return;
		const { skipped } = review;
		const parts = reviewPartsOf(concept());
		const now = review.buildStep + 1;
		const timer = window.setTimeout(() => {
			const done = sampleReviewBuildFinished(parts, skipped, now);
			setReview({
				...review,
				buildStep: done ? undefined : now,
				seconds: done && review.startedAt ? Math.max(1, Math.round((Date.now() - review.startedAt) / 1000)) : undefined,
			});
		}, sampleReviewBuildStepMs(parts, skipped, review.buildStep));
		return () => window.clearTimeout(timer);
	}, [review]);
	// The reviewers, one step at a time, in turn (invited, opened, commented, their view of the published version); when
	// all have a view, the reviews are in. A view takes longer to come than a step before it, so the team assessment is
	// seen filling, in the reviewers' order.
	React.useEffect(() => {
		if (!review || review.status.kind !== "in-review" || review.published === undefined) return;
		const count = review.reviewers.length;
		const index = Array.from({ length: count }, (_, k) => (review.ticks + k) % count).find(
			(i) => review.reviewers[i].status !== "view" && answersInDemo(review.reviewers[i]),
		);
		if (index === undefined) return;
		const order: Reviewer["status"][] = ["invited", "opened", "commented", "view"];
		const status = order[order.indexOf(review.reviewers[index].status) + 1];
		const timer = window.setTimeout(
			() => {
				const suggestedViews = sampleReviewerViews(reviewChanges, reviewId);
				const views = (id: string) =>
					suggestedViews[id] ?? sampleRemindedView(review.reviewers.find((r) => r.id === id)!, reviewChanges, reviewId);
				const reviewers = review.reviewers.map((r, i): Reviewer => {
					if (i !== index) return r;
					// Commenting, they write the point they'll make in their view; then the view, with why, of this version.
					if (status === "commented") return { ...r, status, comment: views(r.id).why };
					return status === "view" ? { ...r, status, ...views(r.id), version: review.published } : { ...r, status };
				});
				setReview({ ...review, reviewers, ticks: index + 1 });
				// Commenting, a team's lead also pins a comment on the prototype, on what it's about…
				const commented = reviewers[index];
				const pin = commented.status === "commented" ? sampleReviewerPin(commented.id, reviewId) : undefined;
				// …and says something on a part of the idea.
				const said = commented.status === "commented" ? sampleReviewerIdeaComment(commented.id, reviewId) : undefined;
				if (said) setIdeaComments((current) => (current.some((c) => c.id === said.id) ? current : [...current, said]));
				if (pin)
					setPrototypeComments((current) =>
						current.some((c) => c.id === pin.id) ? current : [...current, { ...pin, path: { id: reviewId, label: pathLabel(reviewId) } }],
					);
			},
			status === "view" ? sampleAssessmentStepMs : sampleReviewStepMs,
		);
		return () => window.clearTimeout(timer);
	}, [review, reviewChanges, reviewId]);
	// Review status (prds/sparks-review.md, "Review status"): in the prototype's place on the right, until she goes back.
	// The prototype stays mounted underneath, hidden, so its version, device and screen are as she left them.
	const [reviewStatusOpen, setReviewStatusOpen] = React.useState(false);
	const assessmentTrigger = React.useRef<HTMLButtonElement>(null);
	// Where Review status opens: at a person selected in the card's popovers ("Reviewers"), or at the next step, from the
	// card's next step; at the top from "View full report".
	const [statusFocus, setStatusFocus] = React.useState<{ target: { reviewer: string } | "next-step"; key: number }>();
	const openStatusAt = (target?: { reviewer: string } | "next-step") => {
		setStatusFocus(target ? { target, key: Date.now() } : undefined);
		setReviewStatusOpen(true);
	};
	const closeReviewStatus = () => {
		setReviewStatusOpen(false);
		// Back on the card's "View full report", once the card is back.
		requestAnimationFrame(() => assessmentTrigger.current?.focus());
	};
	// Reminding: the date moves, and in the demo about half of those still pending who weren't answering start to
	// (`sampleRemindedCount`): they open it, comment and give their view, so the card fills.
	const remind = () =>
		setReview((current) => {
			if (!current) return current;
			const waiting = current.reviewers.filter((r) => r.status !== "view" && !answersInDemo(r)).map((r) => r.id);
			const brought = waiting.slice(0, sampleRemindedCount(waiting.length));
			return { ...current, remindedAt: new Date().toISOString(), reminded: [...(current.reminded ?? []), ...brought] };
		});
	// Waiting for a decision: the decision owner decides.
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
		}, sampleDecisionMs);
		return () => window.clearTimeout(timer);
	}, [review?.status.kind, reviewEvaluation, reviewId]);
	// Comments: each reviewer's feedback she's opened, at the status it was (a comment, then their view, each new once).
	const [readFeedback, setReadFeedback] = React.useState<Record<string, Reviewer["status"]>>({});
	const unreadFeedback =
		review && review.status.kind !== "ready"
			? review.reviewers.filter((r) => (r.status === "commented" || r.status === "view") && readFeedback[r.id] !== r.status).map((r) => r.id)
			: [];
	// Comments from the reviewers' page (the "Published idea" story, in this tab or another): they come in once she's
	// published (no one has the idea before), on the path in Review, new to her; her replies go back to it.
	const publishedAny = Object.values(reviews).some((r) => r.published !== undefined);
	useDemoSharedComments("prototype", prototypeComments, setPrototypeComments, {
		enabled: publishedAny,
		adopt: (c) => ({ ...c, path: { id: reviewId, label: pathLabel(reviewId) } }),
		onIncoming: (ids) => setNewComments((current) => [...current, ...ids.filter((id) => !current.includes(id))]),
	});
	useDemoSharedComments("idea", ideaComments, setIdeaComments, { enabled: publishedAny });
	// "Share": who has access, Dana first; added people and departments after her, newest last, each once.
	// The parts of the plan she's changed (by changing an answer) since the prototype last matched it: while there are
	// any, the prototype shows a note (prds/sparks-prototype.md, "When the plan changes").
	const [outdated, setOutdated] = React.useState<PlanPartId[]>([]);
	/** "Yes, update it" (or "Update prototype" on its note): the prototype matches the plan again, as a new version, in Prototype. */
	const matchPlan = () => {
		setStep("prototype");
		const number = saveVersion(samplePlanEditPrototypeVersion, changes);
		setOutdated([]);
		return withNewId(withTeamsNote(samplePlanEditUpdatedReply(number)));
	};

	// The prototype shown, the same in Prototype and Review: every screen for the arrows, and its comments. Each path has its
	// own comments; the Comments panel lists them all, with their path. "@" tags people and teams at AutoParts Co.
	const prototypeScreens = built.screens.map((name, view) => ({ name, audience: screenAudience(built, view).id }));
	const prototypeCommenting = {
		commentAuthor: { name: `${props.user.firstName} Morales`, avatarSrc: props.user.avatarSrc },
		mentionable: sampleMentionable,
		comments: prototypeComments.filter((c) => (c.path?.id ?? chosenId) === chosenId),
		onCommentsChange: (shown: PrototypeComment[]) =>
			setPrototypeComments((current) => [
				...current.filter((c) => (c.path?.id ?? chosenId) !== chosenId),
				...shown.map((c) => (c.path ? c : { ...c, path: { id: chosenId, label: pathLabel(chosenId) } })),
			]),
		openComment: openPrototypeComment,
		onOpenCommentChange: setOpenPrototypeComment,
		commenting: addingComment,
		onCommentingChange: setAddingComment,
	};
	// A prototype that takes comments is on screen (built, in Prototype, or in Review): "Add comment" shows in the Comments
	// panel. Leaving it stops adding one.
	const commentable = (step === "prototype" && isBuilt) || (step === "review" && Boolean(review) && review?.buildStep === undefined);
	React.useEffect(() => {
		if (commentable) return;
		setAddingComment(false);
	}, [commentable]);

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
		setMessages((current) => [...current, withNewId(withTeamsNote(sampleChangeDoneReply(`"${previous}" now reads "${text}"`, number)))]);
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
						return { ...p, ...sampleBuildProgress(buildScreens, now, seconds, isNewApp(current)) };
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

	// The idea's library (prds/sparks.md, "The idea's library"): what she gave it in the conversation and in the panel, less
	// what she removed. What she sends or adds again comes back.
	const [libraryAdded, setLibraryAdded] = React.useState<LibraryItem[]>([]);
	const [libraryRemoved, setLibraryRemoved] = React.useState<string[]>([]);
	const libraryWith = (list: SparksMessage[]) => {
		const said = libraryFrom(list);
		return [...said, ...libraryAdded.filter((item) => !said.some((other) => other.id === item.id))].filter((item) => item.app || !libraryRemoved.includes(item.id));
	};
	const library = libraryWith(messages);
	const addToLibrary = (items: Pick<LibraryItem, "kind" | "label" | "title">[]) => {
		const next = items.map((item) => libraryItem(item.kind, item.label, { title: item.title }));
		setLibraryRemoved((current) => current.filter((id) => !next.some((item) => item.id === id)));
		setLibraryAdded((current) => [...current, ...next.filter((item) => !current.some((other) => other.id === item.id))]);
	};
	// The folder bounces when the conversation adds something, not the panel ("Add files", a link, "Undo").
	const [libraryAddedKey, setLibraryAddedKey] = React.useState(0);
	const fromPanel = React.useRef(false);
	const libraryIds = library.map((item) => item.id).join("\n");
	const knownIds = React.useRef(libraryIds);
	React.useEffect(() => {
		const known = knownIds.current.split("\n");
		const isNew = library.some((item) => !known.includes(item.id));
		knownIds.current = libraryIds;
		if (isNew && !fromPanel.current) setLibraryAddedKey((key) => key + 1);
		fromPanel.current = false;
	}, [libraryIds]);
	// The Problem summary lists what she added, as it stands.
	const added = addedFrom(library);
	const addedKey = added.join("\n");
	React.useEffect(() => {
		setRawMessages((current) => {
			const stale = (p: SparksReplyPart) => p.kind === "problem" && (p.problem.added ?? []).join("\n") !== addedKey;
			if (!current.some((m) => m.from === "sparks" && m.parts.some(stale))) return current;
			return current.map((m) =>
				m.from === "sparks" && m.parts.some(stale) ? { ...m, parts: m.parts.map((p) => (p.kind === "problem" ? { ...p, problem: { ...p.problem, added } } : p)) } : m,
			);
		});
	}, [addedKey]);
	// How many of the Problem part's steps Sparks has asked so far.
	const stepsAsked = problemSteps.filter((step) => messages.some((m) => m.from === "sparks" && m.id.startsWith(step.id))).length;
	const done = messages.some((message) => message.from === "sparks" && message.id.startsWith("problem-done"));
	// Her description of the problem, and whether it's the demo's: another problem is named from her own words.
	const statementAt = messages.findIndex((m) => m.from === "sparks" && m.id.startsWith("problem-statement"));
	const description = statementAt > 0 ? messages[statementAt - 1] : undefined;
	const offScript = description?.from === "user" && sampleProblemMessageKind(description.text) === "other";
	const problemName = offScript && description?.from === "user" ? sampleProblemNameFrom(description.text) : sampleConceptName;

	/** Sends `text`; `shown` is her message when it says it differently (a button's label instead of the quick reply). */
	const send = (text: string, shown?: string, attachments?: string[], fromLibrary?: LibraryPick[]) => {
		const last = messages[messages.length - 1];
		const lastAsk = [...messages]
			.reverse()
			.find((m): m is Extract<SparksMessage, { from: "sparks" }> => m.from === "sparks" && Boolean(m.quickReplies));
		const answeringAsk = last?.from === "sparks" && Boolean(last.quickReplies);
		// What she sends with it, by name: files, and what she picked from My library.
		const sentNames = [...(attachments ?? []), ...(fromLibrary ?? []).map(assetName)];
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
			attachments,
			fromLibrary,
		};
		const given = libraryFrom([userMessage]).map((item) => item.id);
		if (given.length) setLibraryRemoved((current) => current.filter((id) => !given.includes(id)));
		// Only files (or things from My library), when Sparks didn't ask for any: kept with the idea, and the question that's waiting stays open, under
		// Sparks's thanks (prds/sparks.md, "The message box").
		if (!text.trim() && sentNames.length && !(answeringAsk && lastAsk?.attachReply)) {
			const waiting = last?.from === "sparks" && (last.quickReplies || /not-quite|unclear/.test(last.id)) ? last : undefined;
			const card = waiting?.parts.find((p) => p.kind === "suggestion" && !p.suggestion.confirmed);
			const started = messages.some((m) => m.from === "sparks" && m.id.startsWith("problem-statement"));
			const thanks = sampleFilesAddedReply(sentNames, !started ? "start" : card ? "card" : waiting ? "waiting" : "none");
			// It takes the question's place: its id (what her answer is read by), its card and its answers.
			const base = waiting?.id.replace(/-\d+$/, "") ?? thanks.id;
			const reply = withNewId({
				...thanks,
				id: base.startsWith("prototype-building") ? "prototype-change" : base.startsWith("review-building") ? "review-open" : base,
				parts: [...thanks.parts, ...(card?.kind === "suggestion" ? [{ ...card, suggestion: { ...card.suggestion, answering: false } }] : [])],
				quickReplies: waiting?.quickReplies,
			});
			const original = waiting && originalSuggestions.current.get(waiting.id);
			if (original) originalSuggestions.current.set(reply.id, original);
			setMessages([
				...messages.map((m) => (m === waiting ? { ...waiting, parts: waiting.parts.filter((p) => p !== card), quickReplies: undefined } : m)),
				userMessage,
				reply,
			]);
			return;
		}
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
		} else if (step === "prototype") {
			// Prototype: a change to what she pointed at; an answer to Sparks's options; "Yes, evaluate it" or "Go to Review
			// instead" once it's built; otherwise a change asked for in words.
			const builtAll = isBuilt;
			const askId = lastAsk?.id ?? "";
			// Fixing a finding: going with the plan (or the plan and a follow-up), a follow-up once it's made, or the next finding.
			const fixing = sampleFixStage(askId);
			const fixedFinding = fixing && findingToFix(fixing.findingId);
			const followUp = fixing && sampleFixFollowUps(fixing.findingId, changes).find((f) => f.reply === text);
			// "Fix all": the plan and every follow-up left, as one version.
			const fixAll = Boolean(fixing && !fixing.made && text === sampleFixAll);
			const followUps = fixing && fixAll ? sampleFixFollowUps(fixing.findingId, changes) : followUp ? [followUp] : [];
			const goesWithPlan = Boolean(
				fixing && !fixing.made && (text === sampleMakeTheChange || fixAll || (text.trim() && yesPattern.test(text)) || followUp),
			);
			const nextNumber = fixing && nextToFix(fixing.findingId);
			if (!pointedAt && nextNumber && text === sampleFixNext(nextNumber)) {
				setMessages([...messages, ...startFix(lastRun!.evaluation.findings[nextNumber - 1].id, text)]);
				props.onSend?.(text);
				return;
			}
			let reply: SparksReply;
			if (!pointedAt && fixing && fixedFinding && (goesWithPlan || followUp)) {
				const fix = sampleFixes[fixing.findingId];
				const base = goesWithPlan ? { ...changes, ...fix.changes } : changes;
				const changed = followUps.reduce((c, f) => f.apply(c), base);
				const summaries = [...(goesWithPlan ? [fix.summary] : []), ...followUps.map((f) => f.summary)];
				const version = saveVersion([...(goesWithPlan ? [fix.version] : []), ...followUps.map((f) => f.version)].join("; "), changed);
				reply = sampleFixMadeReply(fixedFinding, summaries, version, changed, nextNumber);
			} else if (pointedAt) {
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
				// "Add it to What comes later": what she asked for (her message before Sparks's note) goes in this path's
				// "What comes later", in a few words, for Review.
				const asked = messages[messages.indexOf(lastAsk!) - 1];
				const item = text === sampleBeyondReplies[0] && asked?.from === "user" ? sampleLaterItem(asked.text) : undefined;
				if (item) updatePath(chosenId, (d) => ({ ...d, later: d.later.includes(item) ? d.later : [...d.later, item] }));
				reply = text === sampleBackToChoice ? backToChoice(sampleBackFromPrototype.beyond(direction.name)) : sampleBeyondAnswerReply(text, item);
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
				enterReview(true);
				reply = { ...sampleReviewStartedReply, step: "prototype" };
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
				// Not something Sparks can do here: the plan (or the follow-ups) still waits for her.
				if (intent.kind === "unknown" && fixing) reply = { ...reply, id: askId.replace(/-\d+$/, ""), quickReplies: lastAsk?.quickReplies };
			}
			next = [...next, withNewId(withTeamsNote(reply))];
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
					withNewId(samplePrototypeBuildingReply(id, screensOf(id), 0, isNewApp(messages))),
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
			// "It's a new app": the card says so, in place of Sparks's guess.
			const newApp = asked?.part === "app" && answeringAsk && text === sampleProblemNewApp;
			const onEvidence = Boolean(lastAsk?.id.startsWith("problem-evidence"));
			const corrected = Boolean(asked) && !newApp && (answeringNotQuite || Boolean(asked?.edited));
			next = [
				...(newApp && asked
					? messages.map((m) =>
							m === lastAsk ? answerSuggestion(m, { ...asked, text: sampleProblemNewAppText, basis: undefined, edited: undefined }) : m,
						)
					: withAnswer(messages, lastAsk, asked, answeringNotQuite ? text : undefined)),
				userMessage,
			];
			if (stepsAsked === 1) setConceptName(problemName);
			const problem = problemFrom(next, libraryWith(next));
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
							? sampleProblemAppReplyFor(problemName)
							: newApp
								? sampleProblemEvidenceNewAppReply
								: onEvidence
									? // She added something: Sparks asks once if there's anything else; after that (more, or "That's all"), on to who.
										lastAsk?.id.startsWith("problem-evidence-more")
										? sampleProblemWhoReplyAfter(sentNames, sampleProblemAddedWords(text), !(sentNames.length || sampleProblemAddedWords(text)))
										: sentNames.length || sampleProblemAddedWords(text)
											? sampleProblemEvidenceMoreReply(sentNames, sampleProblemAddedWords(text))
											: sampleProblemWhoReplyAfter([])
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
			const reply = withNewId(samplePrototypeBuildingReply(picked.id, screensOf(picked.id), 0, isNewApp(messages)));
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
			{ ...withNewId(samplePrototypeBuildingReply(picked.id, screensOf(picked.id), 0, isNewApp(messages))), step: "prototype" },
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
					: answer === sampleProblemNewApp
						? { ...base, text: sampleProblemNewAppText, basis: undefined }
						: base;
		let next = messages.map((m, i) => (i === index ? answerSuggestion(m, suggestion, false) : i === index + 1 ? { ...reply, text: answer } : m));
		const part: PlanPartId = current.part.startsWith("brief-") ? "brief" : current.part.startsWith("success-") ? "success" : "problem";
		const has = (kind: SparksReplyPart["kind"]) => next.some((m) => m.from === "sparks" && m.parts.some((p) => p.kind === kind));
		const problem = part === "problem" && has("problem") ? problemFrom(next, libraryWith(next)) : undefined;
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

	// Prototype: the concept she started from "New idea" (or reopened from its row) shows in "Your ideas" once it's
	// named, where it stands, and reopens with its conversation (prds/sparks.md, "The start page"; `demo-session.ts`).
	const tracksDemo = React.useRef(
		(() => {
			if (props.messages.length === 0) return true;
			// A shortcut ("Go to Review" in "+") opened this story on her concept: it carries on with it.
			if (isContinuingDemoConcept()) return true;
			const saved = loadDemoConcept()?.workspace.messages ?? [];
			return saved.length === props.messages.length && saved[saved.length - 1]?.id === props.messages[props.messages.length - 1]?.id;
		})(),
	).current;
	const demoCreatedAt = React.useRef(props.messages.length === 0 ? undefined : loadDemoConcept()?.summary.createdAt);
	// It joins the list once it's named: Sparks names it from the problem she described, or she names it herself; while
	// it's still "New idea", it isn't there. Once in, it stays. Named before she describes it, its line reads "No
	// problem described yet." until she does.
	const listed = React.useRef(props.messages.length > 0 || props.conceptName !== newIdeaName);
	React.useEffect(() => {
		const first = messages.find((m) => m.from === "user");
		if (!tracksDemo) return;
		if (conceptName !== newIdeaName) listed.current = true;
		if (!listed.current) return;
		const now = new Date().toISOString();
		demoCreatedAt.current ??= now;
		const others = shareMembers.length - 1;
		saveDemoConcept({
			summary: {
				id: "demo",
				name: conceptName,
				summary: first?.from === "user" ? first.text : "",
				sharing: others > 0 ? `You and ${others} other${others > 1 ? "s" : ""}` : "Only you",
				createdAt: demoCreatedAt.current,
				editedAt: now,
				validation: lastEvaluation
					? Math.round((lastEvaluation.scenarios.filter((x) => x.outcome === "done").length / lastEvaluation.scenarios.length) * 100)
					: undefined,
				// A draft shows the step it's on; then where it stands, as in its header.
				status: ideaStatus.status === "draft" ? reached : ideaStatus.status,
				statusDate: ideaStatus.status === "waiting" || ideaStatus.status === "advanced" ? now : undefined,
				href: demoConceptHref,
			},
			workspace: { conceptName, defaultConceptName: defaultName, currentStep: step, reachedStep: reached, messages },
		});
	}, [tracksDemo, messages, step, reached, conceptName, defaultName, shareMembers.length, ideaStatus.status, lastEvaluation]);

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
			status={ideaStatus.status}
			statusDate={ideaStatus.date}
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
				onRemove: (id) => setShareMembers((current) => current.filter((m) => m.id !== id)),
				// Selecting a team's name lists its people.
				peopleIn: samplePeopleIn,
				onTeamPeopleChange: (id, excluded) => setShareMembers((current) => current.map((m) => (m.id === id ? { ...m, excluded } : m))),
				link: sampleShareLink,
				// The reviewers Sparks suggests for this idea, in every step once there's a direction: its people (their job title
				// and team), then their teams (how many people).
				recommended:
					paths.length
						? {
								people: suggestedReviewers.map(({ member, detail }) => ({ name: member.name, kind: member.kind, detail, avatarSrc: member.avatarSrc })),
								// A team comes with the people she unchecked in its popover left out.
								onAdd: (name, excluded) =>
									addMembers(
										suggestedReviewers
											.filter(({ member }) => member.name === name)
											.map(({ member }) => (member.kind === "department" && excluded.length ? { ...member, excluded } : member)),
									),
							}
						: undefined,
			}}
			paths={{ built: paths, active: chosenId, inReview: Object.keys(reviews), onRun: runDirection }}
			library={{
				items: library,
				addedKey: libraryAddedKey,
				onAdd: (items) => {
					// Only if it changes the list (something already there doesn't).
					fromPanel.current = items.some((item) => !library.some((other) => other.id === libraryItem(item.kind, item.label).id));
					addToLibrary(items);
				},
				onRemove: (id) => setLibraryRemoved((current) => [...current, id]),
			}}
			// In the header, on Review only.
			// The first time, "Publish" opens what's shared, what happens next and who it goes to, to check before it goes.
			publish={
				step === "review" && publishAction
					? {
							...publishAction,
							// What's shared: the idea, then the prototype in Review, each at the version that goes out.
							details:
								reviewNext?.kind === "publish"
									? {
											// The idea, and every path built (the one in Review first), each at the version that goes out.
											items: [{ name: conceptName, paths: sharedPaths.map((id) => ({ name: pathLabel(id), version: dataFor(id).versions.length })) }],
											reviewers: reviewerCount,
											// The teams it goes to: each team added, and each added person's team, once.
											departments: [
												...new Set(addedReviewers.map((m) => (m.kind === "department" ? m.name : m.detail?.split(" · ")[1])).filter((t): t is string => Boolean(t))),
											],
											// The invitation: Sparks's standard message, due a week after publishing; her note goes after it.
											// The email lists the same items, so it matches what's shared.
											email: {
												from: `${props.user.firstName} Morales`,
												message: sampleInvitationEmail.message,
												due: sampleInvitationEmail.due,
												onReview: () => openStoryInNewTab(storyIds.sparksPublishedIdea),
											},
											note: review?.note,
											onNoteChange: (note) => setReview((current) => (current ? { ...current, note } : current)),
											// The idea's address opens the reviewers' page (the story), here or on the Netlify site.
											linkHref: storyHref(storyIds.sparksPublishedIdea),
										}
									: undefined,
							// No one to send it to until she adds reviewers with "Share".
							blocked: !reviewersInShare.length,
							open: publishOpen,
							onOpenChange: setPublishOpen,
						}
					: undefined
			}
			// Evaluate's and Review's empty states, once the prototype is built: the same as "Yes, evaluate it" and "Add to Review".
			upcomingActions={
				isBuilt
					? {
							validate: {
								label: "Evaluate the prototype",
								onClick: evaluateAction.onClick,
								prototype: { name: pathLabel(chosenId), detail: `Version ${versions.length}` },
							},
							review: {
								label: "Add to Review",
								disabled: Boolean(addToReviewBlocked),
								onClick: addToReview,
								prototype: {
									name: pathLabel(chosenId),
									detail: `Version ${versions.length} · ${
										running
											? "Being evaluated"
											: !lastEvaluation
												? "Not evaluated yet"
												: lastEvaluation.version === versions.length
													? "Evaluated"
													: "Changed since it was evaluated"
									}`,
								},
								note: addToReviewBlocked ?? (lastEvaluation ? undefined : sampleNotEvaluatedNote),
							},
						}
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
			onSend={(text, attachments, fromLibrary) => send(text, undefined, attachments, fromLibrary)}
			onSuggestionEdit={editSuggestion}
			onAnswerCancel={cancelAnswer}
			onAnswerChange={changeAnswer}
			onAddPlan={reached === "plan" ? addPlan : undefined}
			// The demo's jump to Review, with the idea put together (story "Review Ready").
			onGoToReview={() => {
				// Her concept carries on in Review: its row in "Your ideas" follows it there.
				if (tracksDemo) continueDemoConcept();
				goToStory(storyIds.sparksReviewReady);
			}}
			// Comments: the reviewers' feedback once it's in review; the dot while there's feedback she hasn't opened yet.
			comments={{
				reviewers: review?.status.kind === "ready" ? [] : (review?.reviewers ?? []),
				unread: [...unreadFeedback, ...newComments],
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
					setOpenIdeaComment(id);
				},
				// From any step: Prototype opens on its path, with the comment's thread open on its pin.
				onOpenPrototypeComment: (id) => {
					const path = prototypeComments.find((c) => c.id === id)?.path?.id;
					// On Review, the prototype is there already.
					if (step === "review" && (!path || path === chosenId)) {
						setReviewStatusOpen(false);
						return setOpenPrototypeComment(id);
					}
					if (path) setActivePath(path);
					if (step !== "prototype") setStep("prototype");
					setOpenPrototypeComment(id);
				},
			}}
			// Evaluate and Review have no conversation: their two panels take the width.
			conversation={step !== "validate" && step !== "review"}
			preview={
				step === "review" && review ? (
					// Review: no conversation; the idea for review, with its next step, and the final prototype, side by side.
					<div className='flex min-h-0 flex-1 gap-4'>
						<ReviewPanel
							className='min-w-0 basis-0'
							// The idea's name, the direction she chose: "Fit check before you buy".
							title={pathLabel(reviewId)}
							// With more than one path, the name switches between them, as in Prototype: Review on that path.
							paths={paths.map((id) => ({ id, label: pathLabel(id) }))}
							path={reviewId}
							onPathChange={switchReviewPath}
							concept={concept()}
							// In the idea once it's sent; before, it's hers to edit in the next step.
							recommendation={review.submitted ? review.recommendation : undefined}
							// Published: the team assessment above the idea, except while Review status shows it on the right.
							assessment={
								review.published !== undefined && !reviewStatusOpen ? (
									<ReviewTeamAssessment
										context='workspace'
										reviewers={review.reviewers}
										version={review.published}
										remindedAt={review.remindedAt}
										onRemind={remind}
										action={{ label: "View full report", onClick: () => openStatusAt(), ref: assessmentTrigger }}
										onReviewerSelect={(id) => openStatusAt({ reviewer: id })}
										// What to do next, on the card itself (prds/sparks-review.md, "The Team assessment card").
										footer={reviewNext ? <ReviewNextOnCard next={reviewNext} onOpen={() => openStatusAt("next-step")} /> : undefined}
									/>
								) : undefined
							}
							progress={
								review.startedAt === undefined
									? undefined
									: {
											...sampleReviewBuildProgress(reviewPartsOf(concept()), review.skipped, review.buildStep ?? Number.MAX_SAFE_INTEGER, review.seconds),
											startedAt: review.startedAt,
										}
							}
							building={review.buildStep === undefined ? undefined : sampleReviewBuilt(reviewPartsOf(concept()), review.skipped, review.buildStep)}
							focusPart={focusPart}
							// Her comments on parts of the idea, with the teams': "Add comment" on the prototype's toolbar, or selected text.
							comments={{
								items: ideaComments,
								onChange: setIdeaComments,
								author: { name: `${props.user.firstName} Morales`, avatarSrc: props.user.avatarSrc },
								adding: addingComment,
								mentionable: sampleMentionable,
								openId: openIdeaComment,
								onOpenChange: setOpenIdeaComment,
							}}
						/>
						{review.published !== undefined && review.publishedAt && reviewStatusOpen ? (
							<ReviewStatusPanel
								className='min-w-0 basis-0'
								idea={pathLabel(reviewId)}
								version={review.published}
								publishedAt={review.publishedAt}
								feedback={sampleReviewFeedback}
								remindedAt={review.remindedAt}
								onRemind={remind}
								onBack={closeReviewStatus}
								next={reviewNext}
								reviewers={review.reviewers}
								focus={statusFocus}
							/>
						) : null}
						{/* As the teams get it: to try and comment on; changed in Prototype, so no "Edit element" and no restoring.
						    Hidden, not gone, while Review status is open, so it comes back as she left it. */}
						<PrototypePanel
							key={`review-${chosenId}`}
							className={cn("min-w-0 basis-0", reviewStatusOpen && review.published !== undefined && "hidden")}
							audiences={built.audiences}
							screens={prototypeScreens}
							versions={versions}
							paths={[{ id: chosenId, label: pathLabel(chosenId) }]}
							path={chosenId}
							published={publishedInfo}
							// The idea's panel has the name: the title is the version, with when it was published under it.
							titleShows='version'
							{...prototypeCommenting}
						>
							{(audience, screen, part) => built.render({ data: sampleFitCheck, audience, openOn: screen, openPart: part, changes })}
						</PrototypePanel>
					</div>
				) : step === "validate" ? (
					// Evaluate (Figma Sparks "Evaluate", 72:660): no conversation; the evaluation, and the prototype with the
					// scenarios working it, side by side (prds/sparks-validate.md, "Evaluate's screen").
					<div className='flex min-h-0 flex-1 gap-4'>
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
							// Prototype opens on the finding's page, with Sparks's plan for it; while a run is going, there's no fixing.
							onFix={
								lastRunFinished && !lastRun?.stopped
									? (id) => {
											const started = startFix(id);
											setMessages((current) => [...current, ...started]);
										}
									: undefined
							}
							onSelectFinding={selectFinding}
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
									description={`Sparks tries "${direction.name}" in realistic scenarios on the prototype, and checks it against AutoParts Co.'s data. Each path has its own results.`}
									// The same as "Run" in the panel's header, which is the dark one: here it's outlined (EmptyState's second button, on its own).
									secondaryButtonLabel='Evaluate the prototype'
									secondaryButtonProps={{ onClick: startRun }}
								/>
							}
						/>
						<EvaluationPrototype
							key={chosenId}
							className='min-w-0 basis-0'
							audienceFor={(view) => screenAudience(built, view)}
							paths={paths.map((id) => ({ id, label: pathLabel(id) }))}
							path={chosenId}
							onPathChange={setActivePath}
							versions={versions}
							published={publishedInfo}
							// Restoring is a change to the prototype: Sparks says so in Prototype's conversation.
							onRestore={(id) => setMessages((current) => [...current, { ...withNewId(withTeamsNote(restore(id))), step: "prototype" }])}
							// The go-ahead needs a run on the current version; with no run at all, Review opens with Evaluate skipped.
							addToReviewBlocked={addToReviewBlocked}
							onAddToReview={addToReview}
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
							onMarkerSelect={selectFinding}
							// The screen in focus shows its finding in the evaluation too; the one selected, if it's on that screen.
							onScreenFindings={(ids) => {
								if (ids[0]) setSelectedFinding((current) => (current && ids.includes(current.id) ? current : { id: ids[0], key: ++nextId, fromScreen: true }));
							}}
						>
							{(audience, at) => built.render({ data: sampleFitCheck, audience, changes, openOn: at?.view, openPart: at?.part })}
						</EvaluationPrototype>
					</div>
				) : step === "prototype" ? (
					<PrototypePanel
						key={chosenId}
						openAt={openAt?.path === chosenId ? openAt : undefined}
						action={evaluateAction}
						audiences={built.audiences}
						// Every screen Sparks built, for the arrows beside the device.
						screens={prototypeScreens}
						building={isBuilt ? undefined : prototypeBuild}
						pointing={pointing}
						onPointingChange={(on) => {
							setPointing(on);
							if (on) setPointedAt(undefined);
						}}
						versions={versions}
						onRestore={(id) => setMessages((current) => [...current, withNewId(withTeamsNote(restore(id)))])}
						published={publishedInfo}
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
						{...prototypeCommenting}
						paths={paths.map((id) => ({ id, label: pathLabel(id) }))}
						path={chosenId}
						onPathChange={(id) => {
							setActivePath(id);
							setPointing(false);
							setPointedAt(undefined);
						}}
					>
						{(audience, screen, part) =>
							built.render({
								data: sampleFitCheck,
								audience,
								openOn: screen,
								openPart: part,
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

/** "Reset prototype" (demo only): the same as a new idea from "New idea", in place, with the idea she started gone. */
function ResettablePrototype(props: PrototypeProps) {
	const [resets, setResets] = React.useState(0);
	const reset = () => {
		clearDemoConcept();
		clearDemoSharedComments();
		setResets((n) => n + 1);
	};
	const start: Partial<SparksWorkspaceProps> = resets
		? { conceptName: newIdeaName, currentStep: "plan", reachedStep: "plan", messages: [], comments: undefined, openCommentsKey: 0 }
		: {};
	return <WorkspacePrototype key={resets} {...props} {...start} onResetPrototype={reset} />;
}

const meta = {
	title: "Layouts/AutoPartsHUB/Sparks/Workspace",
	component: SparksWorkspace,
	parameters: {
		layout: "fullscreen",
	},
	// Keyed on the concept, so opening another one (a notification about it) starts it fresh.
	// Opened with a concept's args (its row, a notification), it's that concept from the first frame: no new concept first.
	render: (storyArgs, { parameters, id }) => {
		const args = argsPendingAtLoad(id, storyArgs);
		return (
			<ResettablePrototype
				key={`${args.conceptName}-${args.currentStep}-${args.messages[0]?.from === "user" ? args.messages[0].text : ""}`}
				{...args}
				startPublished={Boolean(parameters.startPublished)}
			/>
		);
	},
	// A notification about a concept opens it here, in the same tab.
	decorators: [withStoryLinks(() => conceptStoryLinks())],
	args: {
		user: sampleUser,
		initialPrompt: sampleInitialPrompt,
		notifications: { notifications: sampleNotifications, now: sampleNotificationsNow },
		myLibrary: { assets: sampleLibrary, now: sampleLibraryNow },
		conceptName: newIdeaName,
		currentStep: "plan",
		messages: [],
		// Prototype: closes the concept's tab when the start page opened it; otherwise goes to the start page story.
		// The × and the Sparks symbol both go back to the start page, in the same tab.
		onClose: () => {
			returnToIdeas();
			goToStory(storyIds.sparksStartPage);
		},
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

/** After the statement: the live app confirmed, then the question about supporting material. */
const appConfirmed: SparksMessage[] = [
	confirm(sampleProblemAppReply),
	{ id: "u2a", from: "user", text: "Yes, that's the one" },
	sampleProblemEvidenceReply,
];

/** Sparks's first reply to her description: the problem sharpened with what the data adds, on a card, to confirm. */
export const ProblemStatement: Story = {
	args: {
		conceptName: "New idea",
		messages: [...sampleMessages, sampleProblemStatementReply],
	},
};

/** The statement confirmed: Sparks names the idea and asks which live app it improves, with its address. Not in Figma yet. */
export const ProblemLiveApp: Story = {
	args: {
		conceptName: sampleConceptName,
		messages: [...sampleMessages, confirm(sampleProblemStatementReply), { id: "u2", from: "user", text: "Yes, that's it" }, sampleProblemAppReply],
	},
};

/** The app confirmed: Sparks asks for anything that supports the idea, optional. "Attach files" opens the file picker. Not in Figma yet. */
export const ProblemSupportingMaterial: Story = {
	args: {
		conceptName: sampleConceptName,
		messages: [
			...sampleMessages,
			confirm(sampleProblemStatementReply),
			{ id: "u2", from: "user", text: "Yes, that's it" },
			...appConfirmed,
		],
	},
};

/** A report added: her bubble shows the file, and Sparks says it's kept with the idea. Not in Figma yet. */
export const ProblemReportAdded: Story = {
	args: {
		conceptName: sampleConceptName,
		messages: [
			...sampleMessages,
			confirm(sampleProblemStatementReply),
			{ id: "u2", from: "user", text: "Yes, that's it" },
			...appConfirmed,
			{ id: "u2b", from: "user", text: "", attachments: ["returns-report-q3.pdf"] },
			sampleProblemWhoReplyAfter(["returns-report-q3.pdf"]),
		],
	},
};

/**
 * "Library" open in the header, with what she gave the idea so far: the app's address and the report she attached. Not in
 * Figma yet, except its folder (sparks.ds 77:6793).
 */
export const Library: Story = {
	args: ProblemReportAdded.args,
	play: async ({ canvasElement }) => {
		const button = [...canvasElement.ownerDocument.querySelectorAll("button")].find((b) => b.getAttribute("aria-label") === "Library");
		button?.click();
	},
};

/**
 * The Problem part done, one thing at a time: the statement, the app, what supports it, who it affects, why it matters, then the summary, the divider
 * and Clarify's first question, in one reply.
 */
export const ProblemAgreed: Story = {
	args: {
		conceptName: sampleConceptName,
		messages: [
			...sampleMessages,
			confirm(sampleProblemStatementReply),
			{ id: "u2", from: "user", text: "Yes, that's it" },
			...appConfirmed,
			{ id: "u2b", from: "user", text: "Nothing to add" },
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
	...appConfirmed,
	{ id: "u2b", from: "user", text: "Nothing to add" },
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

/**
 * The prototype built: Sparks's introduction and "Ready for me to put it through its paces?". Plan got there the usual
 * way, "Generate prototype" on Sparks's pick, so its conversation ends at the directions; her message and Sparks's
 * progress are Prototype's. Not in Figma yet.
 */
export const PrototypeReady: Story = {
	args: {
		conceptName: sampleConceptName,
		currentStep: "prototype",
		reachedStep: "prototype",
		messages: [
			...(Directions.args?.messages ?? []),
			{ id: "u15", from: "user", text: `Generate a prototype of "${sampleDirectionFitCheck.name}".` },
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
 * The run finished: the evaluation on the left (Sparks's read first), the prototype on the right opened where the
 * first open finding happens, with its numbered marker; "Add to Review" for the go-ahead, "Run" after a fix.
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

/**
 * "Fix in the prototype" on a finding (here the one behind "Spark plugs · older truck"): Prototype opens on the page
 * where it happens, and Sparks shows its plan, with follow-ups to pick from. Not in Figma yet.
 */
export const FixInPrototype: Story = {
	args: ValidateResults.args,
	play: async ({ canvasElement }) => {
		const buttons = [...canvasElement.ownerDocument.querySelectorAll("button")].filter((b) => b.textContent?.trim() === "Fix in the prototype");
		buttons[1]?.click();
	},
};

/**
 * Review, with the idea put together: no conversation; the idea for review on the left, with the next step on top (who
 * reviews it, the invitation and what publishing does), and the final prototype on the right. Not in Figma yet.
 */
export const ReviewReady: Story = {
	args: { ...ValidateResults.args, currentStep: "review", reachedStep: "review" },
};

/**
 * Review, published (sparks.ds 135:2185): the team assessment above the idea starts empty ("Waiting for the team to
 * assess your idea.", 0 of 8) and fills as assessments come in, one every few seconds, through 3 of 8 (2 support, 1
 * doesn't) to all 8. "View full report" puts Review status (sparks.ds 135:2349) in the prototype's place; its back
 * arrow brings the prototype back as it was.
 */
export const ReviewPublished: Story = {
	args: ReviewReady.args,
	parameters: { startPublished: true },
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
