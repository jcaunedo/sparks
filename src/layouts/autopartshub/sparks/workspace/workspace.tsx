import * as React from "react";
import { ArrowLeft, Bell, ClipboardCheck, Undo2, Folder, ListChecks, MessageCircle, MousePointerClick, Paperclip, Pencil, RotateCcw, X, Zap } from "lucide-react";
import { animate, AnimatePresence, motion, useAnimationControls, useIsPresent, usePresenceData, type Variants } from "motion/react";

import { ActivityFeed } from "@/components/chat/activity-feed";
import { AssistantMessage } from "@/components/chat/assistant-message";
import { ClarificationCard } from "@/components/chat/clarification-card";
import { Badge } from "@/components/data-display/badge";
import { UserMessage } from "@/components/chat/user-message";
import { PromptComposer } from "@/components/chat/prompt-composer";
import { DropdownMenuItem, DropdownMenuSeparator } from "@/components/overlays/dropdown-menu";
import { QuickReplies } from "@/components/chat/quick-replies";
import { ReplyOptions } from "@/components/chat/reply-options";
import { SectionDivider } from "@/components/chat/section-divider";
import { ThinkingIndicator } from "@/components/chat/thinking-indicator";
import { AppHeader } from "@/components/navigation/app-header";
import { StepNav, StepNavItem } from "@/components/navigation/step-nav";
import { Button } from "@/components/buttons/button";
import { EmptyState } from "@/components/feedback/empty-state";
import { Typography } from "@/components/typography/typography";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/overlays/tooltip";
import { cn } from "@/lib/utils";
import {
	bounceReducedVariants,
	bounceVariants,
	easeOutTransition,
	glideScrollTransition,
	fadeVariants,
	layoutSpring,
	motionDistance,
	motionDuration,
	overlayVariants,
	panelVariants,
	revealVariants,
	rollVariants,
	scrollContainerOf,
	scrollIntoViewSmoothly,
	scrollMetrics,
	stepChangeAt,
	stepChangeTransition,
	useMotionPreference,
} from "@/lib/motion";

import type { AutoPartsHubUser } from "../../autopartshub";
import type { Reviewer } from "../review/review-panel";
import { BriefCard, type BriefDraft } from "../plan/brief-card";
import { ChosenCard, type ChosenDraft } from "../plan/chosen-card";
import { ProblemCard, type ProblemDraft } from "../plan/problem-card";
import { DirectionCard, type DirectionDraft } from "../plan/direction-card";
import { SuccessCard, type SuccessDraft } from "../plan/success-card";
import { IdeaStatusBadge, type IdeaStatus } from "../shared/idea-status";
import type { PanelActionProps } from "../shared/panel-action";
import { sparksSteps, type SparksStep } from "../shared/steps";
import type { IdeaComment } from "../review/review-panel";
import type { PrototypeComment } from "../prototype/prototype-comments";
import { CommentsPanel } from "./comments-panel";
import { attachTypes, LibraryPanel, type LibraryPanelProps } from "./library-panel";
import { assetName, libraryIcon } from "../../library/library-assets";
import { LibraryDialog, type LibraryDialogProps, type LibraryPick } from "./library-dialog";
import { SidePanelResizer, useSidePanelWidth } from "./side-panel";
import { directionActionFor, directionStatusFor, type DirectionPaths } from "./plan-parts";
import { PublishPopover, type PublishItem } from "@/components/overlays/publish-popover";
import { SharePopover, type SharePopoverProps } from "@/components/overlays/share-popover";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/overlays/popover";
import { HeaderIconButton } from "../../header-icon-button";
import { NotificationsPopover, type NotificationsPopoverProps } from "../../notifications-popover";
import { InvitationEmail, type InvitationEmailProps } from "../invitation-email/invitation-email";
import emptyPrototype from "./images/empty-prototype.png";
import emptyEvaluate from "./images/empty-evaluate.png";
import emptyReview from "./images/empty-review.png";

/** One of Dana's messages, as she wrote it, line breaks included. */
type SparksUserMessage = {
	id: string;
	from: "user";
	text: string;
	/** The files she attached, by name. With no text, the message is only its files. */
	attachments?: string[];
	/** What she added from My library ("Add from library"): shown as the files are. */
	fromLibrary?: LibraryPick[];
};

/** One thing Sparks drafted and asks Dana to confirm, shown as a ClarificationCard. */
type SparksSuggestion = {
	/** Which part of the concept it fills, e.g. "who". */
	part: string;
	/** What Sparks asks, e.g. "Who does it affect most?". */
	question: string;
	text: string;
	/** The company knowledge source it draws on, e.g. "Customer intelligence". */
	basis?: string;
	/** Relies on something no evidence supports yet: labeled "Assumption". */
	assumption?: boolean;
	/** Dana changed the text. */
	edited?: boolean;
	/** Dana answered it: it's in her concept, without replies or Edit from here. */
	confirmed?: boolean;
	/** She answered "I'm not sure": it stays Sparks's guess, as an assumption, not confirmed by her. */
	unsure?: boolean;
	/** "Not quite": the card folds to its question, and she answers it in the message box. */
	answering?: boolean;
	/**
	 * Sparks's answer as it first suggested it, before her answer replaced or edited it: what the card shows again while
	 * she changes her answer (prds/sparks.md, "Changing an answer"). Without it, `text`.
	 */
	suggested?: string;
};

/** Where a suggestion came from. */
function suggestionSource(suggestion: SparksSuggestion) {
	if (suggestion.edited) return "Edited by you";
	return suggestion.basis ? `Suggested by Sparks · from ${suggestion.basis.toLowerCase()}` : "Suggested by Sparks";
}

/** The files sent with a message, in its bubble, under the text. */
function MessageFiles({ files = [], fromLibrary = [], spaced }: { files?: string[]; fromLibrary?: LibraryPick[]; spaced: boolean }) {
	if (!files.length && !fromLibrary.length) return null;
	return (
		<span className={cn("flex flex-col gap-1", spaced && "mt-1")}>
			{files.map((name) => (
				<span key={name} className='flex min-w-0 items-center gap-1.5 [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-icon-muted'>
					<Paperclip aria-hidden />
					<span className='min-w-0 truncate'>{name}</span>
				</span>
			))}
			{fromLibrary.map((item) => (
				<span key={`${item.kind}:${item.label}`} className='flex min-w-0 items-center gap-1.5 [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-icon-muted'>
					{React.createElement(libraryIcon(item), { "aria-hidden": true })}
					<span className='min-w-0 truncate'>{assetName(item)}</span>
				</span>
			))}
		</span>
	);
}

/** Quick replies that don't answer a question card: the card stays until she answers it. */
const notAnswers = new Set(["Not quite"]);

/**
 * What Dana's message shows. Answering a question card with a quick reply ("Yes, that's right", or another answer Sparks
 * offered, such as "Repeat purchases instead"), her bubble shows the answer itself, as it ended on the card (with her
 * edit, if she made one), and the card folds to its question (prds/sparks.md, "Talking with Sparks"). "Not quite" and
 * "I'm not sure" show as she said them.
 */
function userMessageText(messages: SparksMessage[], index: number) {
	const message = messages[index];
	const asked = messages[index - 1];
	if (message?.from !== "user") return "";
	if (asked?.from !== "sparks" || !asked.quickReplies?.includes(message.text) || notAnswers.has(message.text))
		return message.text;
	const part = asked.parts.find((p) => p.kind === "suggestion");
	return part?.kind === "suggestion" && part.suggestion.confirmed && !part.suggestion.unsure
		? part.suggestion.text
		: message.text;
}

/** The "Assumption" label (sparks.ds badge, flat amber, xxs), between a question and its answer, while nothing confirms it. */
function assumptionBadge() {
	return (
		<Badge variant='flat' tone='amber' size='xxs'>
			Assumption
		</Badge>
	);
}

/**
 * A piece of a reply from Sparks, in order: text (AssistantMessage's format), one suggestion to confirm (last, with the
 * reply's quick replies on its card), or a summary card: the problem once it's agreed, what we know, what success looks
 * like, a direction (all of them in one reply), or what we'll build.
 */
type SparksReplyPart =
	| { kind: "text"; text: string }
	| { kind: "suggestion"; suggestion: SparksSuggestion }
	| { kind: "problem"; problem: ProblemDraft }
	| { kind: "brief"; brief: BriefDraft }
	| { kind: "success"; success: SuccessDraft }
	| { kind: "direction"; direction: DirectionDraft }
	| { kind: "chosen"; chosen: ChosenDraft }
	/** A section of Plan ends here: the zigzag divider, then what Sparks works through before it goes on. */
	| { kind: "section"; thinking?: string[] }
	/**
	 * Sparks doing a long piece of work (ActivityFeed): its status and the steps so far, updated in place; `done`, it folds
	 * to `doneLabel`. The prototype being built, a run in Evaluate and the idea being written for Review all use it.
	 */
	| { kind: "progress"; status: string; steps: string[]; startedAt?: number; done?: boolean; doneLabel: string; stopped?: boolean };

/** A reply from Sparks. */
type SparksReply = {
	id: string;
	from: "sparks";
	/**
	 * The step it came on (prds/sparks.md, "Steps in the conversation"): it shows in that step's conversation, with Dana's
	 * message it answers. Without it, the same step as the reply before (Plan for the first).
	 */
	step?: SparksStep;
	/** What Sparks works through before it replies, a line at a time ("Popping the hood on support cases…"), shown while it works on a new reply. */
	thinking?: string[];
	parts: SparksReplyPart[];
	/** Likely answers under the reply while it's the last message; selecting one sends it as Dana's message. */
	quickReplies?: string[];
	/**
	 * The quick replies show as a numbered list of options (ReplyOptions) instead of buttons, each with what it does under
	 * it (`steps`, then `details`, by reply): for choices that go further than yes or no, such as a fix's plan (its steps
	 * in the first option), what can go on top of it and "Fix all" (prds/sparks-prototype.md, "Fixing a finding").
	 */
	options?: { label?: string; steps?: Record<string, string[]>; details?: Record<string, string> };
	/**
	 * The quick reply that opens the file picker instead of being sent ("Attach files"). While this is the last message,
	 * files can be sent with no text.
	 */
	attachReply?: string;
	/**
	 * The quick reply that opens "Add from library" instead of being sent. What she adds from
	 * there, with this reply or the "+" menu, is her answer.
	 */
	libraryReply?: string;
};

/** One message in the conversation. Sparks's introduction comes first in every concept, outside this list. */
type SparksMessage = SparksUserMessage | SparksReply;

/** Changing her answer to a question card: what she answered, and what each choice does. */
type AnswerChange = {
	/** The quick reply she picked, if she picked one ("Yes, that's right", "Repeat purchases instead"). */
	selected?: string;
	/** Her own words, if she answered in them (typed after "Not quite", or an edit on the card). */
	own?: string;
	/** "Not quite": the card folds to its question, and she types her new answer in the message box. */
	answering: boolean;
	onReply: (reply: string) => void;
	/** An edit on the card, saved: her new answer, in her words. */
	onEdit: (text: string) => void;
	/** "Keep my answer" (or Esc): nothing changes. */
	onKeep: () => void;
};

/**
 * The question she's changing her answer to, open again where it was asked (prds/sparks.md, "Changing an answer"):
 * "Changing your answer" and "Keep my answer" above it, then its card as Sparks first asked it, Sparks's answer and its
 * replies, the one she picked before with a check. After "Not quite", the card folds to its question while she types.
 */
function ChangingAnswer({ suggestion, replies, change }: { suggestion: SparksSuggestion; replies: string[]; change: AnswerChange }) {
	return (
		<div className='flex flex-col gap-2'>
			<div className='flex items-center justify-between gap-3'>
				<p className='min-w-0 text-sm text-muted-foreground'>
					{change.own ? `Changing your answer: "${change.own}"` : "Changing your answer"}
				</p>
				{/* A link in the brand color, sm regular (like a direction card's "Show more", but regular). */}
				<Button variant='link' className='h-auto shrink-0 p-0 text-sm font-normal' onClick={change.onKeep}>
					Keep my answer
				</Button>
			</div>
			{change.answering ? (
				<AssistantMessage text={`**${suggestion.question}**`} />
			) : (
				<ClarificationCard
					question={suggestion.question}
					answer={suggestion.suggested ?? suggestion.text}
					badge={suggestion.assumption ? assumptionBadge() : undefined}
					source={suggestion.basis ? `Suggested by Sparks · from ${suggestion.basis.toLowerCase()}` : "Suggested by Sparks"}
					replies={replies}
					selectedReply={change.selected}
					onReply={change.onReply}
					onEdit={change.onEdit}
				/>
			)}
		</div>
	);
}

/** How long Sparks thinks over `lines`: about `thinkingStep` per line, a little more or less, so it reads like real work (ms). */
const thinkingTime = (lines: number) => motionDuration.thinkingStep * lines * (0.9 + Math.random() * 0.3) * 1000;

/**
 * Where a section of Plan ends inside a reply and the next starts: the divider draws, Sparks thinks below it
 * (while there's something to work through), then the section comes in. Already there (`active` off), only the divider.
 * 32px above and below it.
 */
function SectionBreak({ active, thinking, onDone }: { active: boolean; thinking?: string[]; onDone: () => void }) {
	const [drawn, setDrawn] = React.useState(false);
	const lines = thinking?.length ?? 0;
	const onDoneRef = React.useRef(onDone);
	onDoneRef.current = onDone;
	const { prefersReducedMotion } = useMotionPreference();
	const dividerRef = React.useRef<HTMLDivElement>(null);
	// The section ends just below the view: it moves once, only enough to show the divider and the line below it
	// (`scroll-mb-24`), so she sees that Sparks went on. Further away, she's reading somewhere else: it stays put.
	React.useEffect(() => {
		const divider = dividerRef.current;
		if (!active || !divider) return;
		const below = divider.getBoundingClientRect().bottom + 96 - scrollMetrics(scrollContainerOf(divider)).bottom;
		if (below > 0 && below < 240) return scrollIntoViewSmoothly(divider, { reducedMotion: Boolean(prefersReducedMotion) });
		// Only as it appears.
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	React.useEffect(() => {
		if (!active || !drawn) return;
		const timer = window.setTimeout(() => onDoneRef.current(), thinkingTime(lines));
		return () => window.clearTimeout(timer);
	}, [active, drawn, lines]);
	return (
		<>
			<SectionDivider ref={dividerRef} draw={active} onDrawn={() => setDrawn(true)} className='my-4 scroll-mb-24' />
			{active && drawn && thinking && lines > 0 ? <ThinkingIndicator steps={thinking} /> : null}
		</>
	);
}

/**
 * A reply from Sparks. New, it shows Sparks thinking (ThinkingIndicator), then its parts one after the other: text
 * streams, a card Reveals. Already in the conversation when the concept opened, it shows whole.
 */
function SparksReplyView({
	reply,
	animate,
	showQuickReplies,
	onQuickReply,
	onSuggestionEdit,
	directionAction,
	directionStatus,
	changing,
	narrow = false,
}: {
	reply: SparksReply;
	animate: boolean;
	showQuickReplies: boolean;
	onQuickReply?: (text: string) => void;
	onSuggestionEdit?: (part: string, text: string) => void;
	/** A direction card's call to action ("Generate prototype", "Open prototype"). */
	directionAction?: ReturnType<typeof directionActionFor>;
	/** A direction card's status under its name ("Not generated yet", "Generated", "In Review"). */
	directionStatus?: ReturnType<typeof directionStatusFor>;
	/** She's changing her answer to this reply's question: its card opens again (prds/sparks.md, "Changing an answer"). */
	changing?: AnswerChange;
	/** In the column beside a preview: its quick replies sit one per row. */
	narrow?: boolean;
}) {
	const { prefersReducedMotion } = useMotionPreference();
	const [thinking, setThinking] = React.useState(animate && Boolean(reply.thinking?.length));
	// Parts before `step` are whole; part `step` is coming in.
	// A reply can go on after it's shown (the prototype's progress, then what was built): not animated (she came back to
	// its step), what's added shows whole.
	const [shownParts, setStep] = React.useState(animate ? 0 : reply.parts.length);
	const step = animate ? shownParts : reply.parts.length;
	const done = step >= reply.parts.length;

	React.useEffect(() => {
		if (!thinking) return;
		const timer = window.setTimeout(() => setThinking(false), thinkingTime(reply.thinking?.length ?? 1));
		return () => window.clearTimeout(timer);
	}, [thinking, reply.thinking]);

	// A card under reduced motion appears at once, so what follows it comes in right away (a section waits for its thinking).
	const current = reply.parts[step];
	React.useEffect(() => {
		if (!thinking && current && current.kind !== "text" && current.kind !== "section" && prefersReducedMotion) setStep((s) => s + 1);
	}, [thinking, current, prefersReducedMotion]);

	// Done, a new reply's actions (its card's replies, or the quick replies under it) come into view if they ended up
	// below it: the conversation moves once, only as far as needed, so she sees what to do next (prds/sparks.md, "The
	// concept workspace"). Interrupted by her own scrolling; nothing moves if they're already in view.
	const endRef = React.useRef<HTMLDivElement>(null);
	const hasActions = Boolean(showQuickReplies && reply.quickReplies?.length);
	React.useEffect(() => {
		if (!animate || !done || !hasActions || !endRef.current) return;
		return scrollIntoViewSmoothly(endRef.current, { reducedMotion: Boolean(prefersReducedMotion) });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [done, hasActions]);

	if (thinking) return <ThinkingIndicator steps={reply.thinking ?? []} />;

	return (
		<div className='flex flex-col gap-4'>
			{reply.parts.slice(0, step + 1).map((part, index) => {
				const active = animate && index === step;
				if (part.kind === "text")
					return (
						<AssistantMessage
							key={index}
							text={part.text}
							stream={active}
							onStreamEnd={active ? () => setStep(index + 1) : undefined}
						/>
					);
				if (part.kind === "section")
					return <SectionBreak key={index} active={active} thinking={part.thinking} onDone={() => setStep(index + 1)} />;
				return (
					<motion.div
						key={index}
						variants={revealVariants}
						initial={active && !prefersReducedMotion ? "initial" : false}
						animate='animate'
						onAnimationComplete={active ? () => setStep(index + 1) : undefined}
					>
						{part.kind === "problem" ? (
							<ProblemCard problem={part.problem} />
						) : part.kind === "brief" ? (
							<BriefCard brief={part.brief} />
						) : part.kind === "success" ? (
							<SuccessCard success={part.success} />
						) : part.kind === "direction" ? (
							<DirectionCard
								direction={part.direction}
								number={reply.parts.slice(0, index + 1).filter((p) => p.kind === "direction").length}
								status={directionStatus?.(part.direction)}
								action={directionAction?.(part.direction)}
							/>
						) : part.kind === "chosen" ? (
							<ChosenCard chosen={part.chosen} />
						) : part.kind === "progress" ? (
							<ActivityFeed
								status={part.status}
								steps={part.steps}
								startedAt={part.startedAt}
								done={part.done}
								doneLabel={part.doneLabel}
								stopped={part.stopped}
							/>
						) : changing ? (
							<ChangingAnswer suggestion={part.suggestion} replies={reply.quickReplies ?? []} change={changing} />
						) : part.suggestion.confirmed || part.suggestion.answering ? (
							// Answered, or "Not quite": the card folds to its question; her answer is (or goes) in her bubble.
							<AssistantMessage text={`**${part.suggestion.question}**`} />
						) : (
							<ClarificationCard
								question={part.suggestion.question}
								answer={part.suggestion.text}
								badge={part.suggestion.assumption && !part.suggestion.edited ? assumptionBadge() : undefined}
								source={suggestionSource(part.suggestion)}
								replies={done && showQuickReplies && !part.suggestion.confirmed ? reply.quickReplies : []}
								onReply={onQuickReply}
								onEdit={
									onSuggestionEdit && !part.suggestion.confirmed
										? (text) => onSuggestionEdit(part.suggestion.part, text)
										: undefined
								}
							/>
						)}
					</motion.div>
				);
			})}
			{/* Quick replies of a reply without a clarification card show under it; a card carries its own. */}
			{done &&
			showQuickReplies &&
			reply.quickReplies?.length &&
			!reply.parts.some((part) => part.kind === "suggestion") ? (
				<motion.div
					variants={revealVariants}
					initial={animate && !prefersReducedMotion ? "initial" : false}
					animate='animate'
				>
					{/* The same replies as ClarificationCard's (`QuickReplies`, sparks.ds "ctas"): the first one, the "continue",
					    last with the ↵ key, and Enter picks it. As options, a numbered list, the first one with the ↵ key. */}
					{reply.options ? (
						<ReplyOptions
							aria-label={reply.options.label}
							options={reply.quickReplies.map((label) => ({
								label,
								steps: reply.options?.steps?.[label],
								detail: reply.options?.details?.[label],
							}))}
							onSelect={onQuickReply}
						/>
					) : (
					<QuickReplies
						replies={reply.quickReplies}
						onReply={onQuickReply}
						onePerRow={narrow}
						// The same icons as in the "+" menu.
						icons={{
							...(reply.attachReply ? { [reply.attachReply]: <Paperclip /> } : {}),
							...(reply.libraryReply ? { [reply.libraryReply]: <Folder /> } : {}),
						}}
					/>
					)}
				</motion.div>
			) : null}
			{/* The reply's end, for bringing its actions into view, with 32px below them. */}
			<div ref={endRef} aria-hidden className='-mt-4 h-px scroll-mb-8' />
		</div>
	);
}

type SparksWorkspaceProps = {
	user: AutoPartsHubUser;
	/** The concept's name, in the header. */
	conceptName: string;
	/** The step Dana is on. */
	currentStep: SparksStep;
	/** The furthest step reached: the steps after it can't be selected yet. Defaults to the current step. */
	reachedStep?: SparksStep;
	messages: SparksMessage[];
	/** Sends what Dana wrote in the message box, or the quick reply she selected. */
	onSend?: (text: string, attachments?: string[], fromLibrary?: LibraryPick[]) => void;
	/** Dana edited a suggestion on its card: the reply it's in and which part it fills. */
	onSuggestionEdit?: (replyId: string, part: string, text: string) => void;
	/**
	 * Esc in the message box after "Not quite": she won't answer in her own words after all. Clear `answering` on the last
	 * reply's suggestion, so its card opens again with its replies (prds/sparks.md, "Talking with Sparks").
	 */
	onAnswerCancel?: () => void;
	/**
	 * Changing an answer in Plan (prds/sparks.md, "Changing an answer"): her answers to Sparks's question cards show a
	 * pencil, and the question opens again where it was asked. Called with the reply that asked it and her new answer: a
	 * quick reply it offered (`own` false), or her own words, typed or edited on the card (`own` true). Picking the answer
	 * she had changes nothing and isn't called. Without it, there's no pencil.
	 */
	onAnswerChange?: (replyId: string, answer: string, own: boolean) => void;
	/**
	 * The message box's "Initial prompt" (its "+" menu, sparks.ds "select-prompt-add"): the text it puts in the box, ready to
	 * send or edit. Without it, the menu has no "Initial prompt".
	 */
	initialPrompt?: string;
	/**
	 * The "+" menu's "Add Plan", for the demo: fills Plan's conversation from her first message to the directions, as if
	 * she'd answered every question, so the demo can start at the choice. Without it, the menu has no "Add Plan".
	 */
	onAddPlan?: () => void;
	/**
	 * The "+" menu's "Reset prototype", for the demo: a new idea, as if nothing had been done. Without it, the menu has no
	 * "Reset prototype".
	 */
	onResetPrototype?: () => void;
	/**
	 * The "+" menu's "Go to Review", for the demo: jumps to Review with the idea put together, ready to publish. Without
	 * it, the menu has no "Go to Review".
	 */
	onGoToReview?: () => void;
	/**
	 * Opens at the introduction and scrolls smoothly down to where the conversation's history ends (its latest section),
	 * instead of starting there: right after "Add Plan", so the filled-in Plan goes by. Reduced motion: it starts there.
	 */
	glideToLatest?: boolean;
	/** "My library", for "Add from library" (the "+" menu, a `libraryReply`), a dialog to search it and add to the idea; what she adds is sent (`onSend`'s `fromLibrary`). */
	myLibrary?: Pick<LibraryDialogProps, "assets" | "now">;
	/**
	 * "Comments" in the header: it opens the Comments panel with the reviewers' feedback (`reviewers`, empty before Review).
	 * `unread`: what she hasn't opened, by id, the reviewers with new feedback and the new comments on the prototype; the
	 * button and each of them show the dot. `onRead`: she opened a reviewer's comment.
	 */
	comments?: {
		reviewers?: Reviewer[];
		unread?: string[];
		onRead?: (id: string) => void;
		/** Dana's comments on the prototype ("Add comment"), listed under "On the prototype". */
		prototype?: PrototypeComment[];
		/** Selecting one opens it on the prototype; without it (no prototype on screen), they're only listed. */
		onOpenPrototypeComment?: (id: string) => void;
		/** The reviewers' comments on parts of the idea, listed under "On the idea". */
		idea?: IdeaComment[];
		/** Selecting one opens its part in Review. */
		onOpenIdeaComment?: (id: string) => void;
	};
	/**
	 * Opens Comments: set as the idea opens, from the notification about its new comments (prds/sparks.md, "New comments"),
	 * and each time it changes. 0 or nothing: closed.
	 */
	openCommentsKey?: number;
	/** The bell's notifications popover (the same as every AutoPartsHUB header's). */
	notifications?: NotificationsPopoverProps;
	/**
	 * Selecting a step she has reached. The conversation scrolls to where that step last began (to the end for the step
	 * it's on now).
	 */
	onStepSelect?: (step: SparksStep) => void;
	/**
	 * What shows beside the conversation, e.g. the prototype in the Prototype step (prds/sparks-prototype.md, "Trying
	 * it"). With it, the conversation narrows to a column on the left and this takes the rest of the width. Plan has none:
	 * it's the conversation, once it's done too (prds/sparks.md, "The finished plan").
	 */
	preview?: React.ReactNode;
	/**
	 * Whether the step has a conversation (default `true`). Evaluate has none: the preview takes the whole width, the
	 * prototype and the evaluation side by side (prds/sparks-validate.md, "Evaluate's screen"; Figma Sparks "Evaluate",
	 * 72:660). The conversation is kept, hidden, so going back to a step finds it where it was.
	 */
	conversation?: boolean;
	/**
	 * What her next message is about, shown above the message box with a way to clear it: the element she pointed at in
	 * the prototype ("Pointing at the "Save vehicle" button"). The box takes focus, with `placeholder` as its hint.
	 */
	composerContext?: { label: string; placeholder?: string; onClear: () => void };
	/**
	 * "Share" in the header, in every step (shown when given): UCL's `SharePopover`, the same in every step (prds/sparks.md,
	 * "Sharing a concept"): the three roles, who has access, a field to add a person or a department, "Copy link", and
	 * the recommended reviewers once there's a direction (`share.recommended`). The workspace gives its copy.
	 */
	share?: Omit<SharePopoverProps, "children">;
	/**
	 * The directions as paths in the prototype (prds/sparks-plan-compare.md, "Directions in the plan"): the ones
	 * built, the one shown, the ones in Review (each card's status), and what a direction card's "Generate prototype" and
	 * "Open prototype" do.
	 */
	paths?: DirectionPaths;
	/**
	 * Starts a step not reached yet, from its empty state, once it can start (prds/sparks.md, "Moving through the steps"):
	 * "Evaluate the prototype" and "Add to Review" once the prototype is built, with the prototype they're about. A step
	 * without one has only "Back to …".
	 */
	upcomingActions?: Partial<Record<SparksStep, UpcomingAction>>;
	/**
	 * "Library" (a folder) in the header: opens the Library panel with the files, links and notes she gave this idea, to add
	 * more or remove some (prds/sparks.md, "The idea's library"). Always there, in every step.
	 */
	library?: Pick<LibraryPanelProps, "items" | "onAdd" | "onRemove"> & {
		/** Changes each time something is added from the conversation: the folder bounces, to show where it went. */
		addedKey?: number;
	};
	/**
	 * "Publish" in the header, after Share, on Review only (prds/sparks-review.md, "Publishing"): gives the teams who review
	 * a fixed copy of the idea and its prototype. `label`: "Publish", "Publish update" once she's changed it since,
	 * "Published" when they have the latest. `hint`: why it can't be selected now (a tooltip). Not for collaborators.
	 * `details`: what she checks before it goes, in UCL's `PublishPopover` ("Publish your idea"): what's shared (the idea and
	 * its prototype, each with its version) and how many people it goes to, with "Manage reviewers" (opens Share); `email`,
	 * the invitation reviewers get ("View invite email", in a dialog); `note`, what she wrote with "Add a note", added to
	 * the email after its message. "Publish & invite" calls `onClick`. Without `details`, "Publish" publishes at once
	 * (e.g. "Publish update"). `blocked`: "Publish & invite" can't be selected yet (no one to send it to).
	 */
	publish?: PanelActionProps & {
		details?: {
			items: PublishItem[];
			reviewers: number;
			/** The teams it goes to, each once: "Departments: UX team, Engineering, and Catalog" under the count. */
			departments?: string[];
			email: Omit<InvitationEmailProps, "variant" | "items">;
			note?: string;
			onNoteChange?: (note: string) => void;
			/** Where the idea's address under the description opens (the reviewers' page); the address itself by default. */
			linkHref?: string;
		};
		blocked?: boolean;
		/**
		 * Once the teams have the latest ("Published"): what went out, in `PublishPopover` `published` (sparks.ds 138:2887),
		 * from the header's "Published", a Flat button: when (`at`, an ISO timestamp: "Fri, Nov 27, 2026, 4:43 PM"), the paths at the versions published, how many people it
		 * went to and their teams, with "Manage reviewers" (opens Share).
		 */
		published?: { at: string; items: PublishItem[]; reviewers: number; departments?: string[]; linkHref?: string };
		/** "Publish your idea" open, kept outside so something else can open it (Review's "Publish now"). */
		open?: boolean;
		onOpenChange?: (open: boolean) => void;
	};
	/**
	 * "All ideas" in the menu on the concept's name: closes the concept, back to the Sparks start page in the same tab
	 * (prds/sparks.md, "The concept workspace").
	 */
	onClose?: () => void;
	/** "Rename" in the menu on the concept's name: she saved a new name (the header shows it right away). */
	onRename?: (name: string) => void;
	/**
	 * The name Sparks gave the concept ("New idea" before it does). When `conceptName` isn't it (she renamed it), the
	 * menu on the name offers "Use default name", which calls `onUseDefaultName` (prds/sparks.md, "The start page").
	 */
	defaultConceptName?: string;
	onUseDefaultName?: () => void;
	/**
	 * Where the idea stands (`IdeaStatus`: "Draft", "Ready to publish", "In review"…), a badge
	 * after its name (prds/sparks.md, "Where an idea stands"), with `statusDate` after it once decided.
	 */
	status?: IdeaStatus;
	statusDate?: string;
};

/** Starting a step from its empty state: the button, and the prototype it's about. */
type UpcomingAction = {
	label: string;
	onClick: () => void;
	disabled?: boolean;
	/** The prototype she's on, e.g. "Fit check before you buy", "Version 2 · Not evaluated yet". */
	prototype: { name: string; detail: string };
	/** What to know before starting it, or why it can't start now. */
	note?: string;
};

/** The prototype a step not reached yet would work on: its name, its version and where it stands, on a card. */
function UpcomingPrototype({ name, detail, note }: UpcomingAction["prototype"] & { note?: string }) {
	return (
		<div className='flex max-w-[480px] flex-col items-center gap-2'>
			<div className='flex max-w-full items-center gap-3 rounded-[12px] border border-border bg-background py-3 ps-4 pe-5 text-start'>
				<MousePointerClick aria-hidden className='size-5 shrink-0 text-icon' />
				<div className='flex min-w-0 flex-col'>
					<Typography size='base' weight='semibold' className='text-foreground-prominent'>
						{name}
					</Typography>
					<Typography size='sm' className='text-muted-foreground'>
						{detail}
					</Typography>
				</div>
			</div>
			{note ? (
				<Typography size='sm' className='text-muted-foreground'>
					{note}
				</Typography>
			) : null}
		</div>
	);
}

/**
 * The illustration on a step's empty state, before Dana gets there (product artwork, not sample data): Prototype the
 * drafting hands, Evaluate the hands on the board, Review the light bulb between laptops. Ink on a transparent
 * background at 80% opacity, 24px above the title (`mb-4` on top of the empty state's 8px gap). Drawn 160px tall, except Evaluate's,
 * a wider drawing that read too large at that height: 200px wide, its height from its proportions (about 134px).
 * DESIGN.md → "Step empty states have an illustration".
 */
const upcomingIllustrations = {
	prototype: { src: emptyPrototype, className: "h-40 w-auto" },
	validate: { src: emptyEvaluate, className: "h-auto w-[200px]" },
	review: { src: emptyReview, className: "h-40 w-auto" },
} as const;


/** When an idea went out, in the Published popover: "Fri, Nov 27, 2026, 4:43 PM" (sparks.ds 138:2894). */
const publishedAtFormat = new Intl.DateTimeFormat("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" });

/**
 * The left of the concept's header (sparks.ds "Sparks Project", 39:1598): the back button, then the concept's name, 16px
 * apart. Back (Button neutral, 32px, 12px corners, a 16px arrow; "All ideas" in its tooltip) closes the concept, to the
 * start page. The name (79:7175: 2xl bold, 24/30, `foreground`, a dotted underline) is selected to rename it: it turns
 * into a field (Enter or leaving it saves, Esc cancels). Once she's renamed it, "Use default name" stays on its right
 * (an undo arrow, sparks.ds 114:1444), back to the name Sparks gave it.
 */
function ConceptName({
	name,
	defaultName,
	onRename,
	onUseDefaultName,
	onClose,
	status,
	statusDate,
}: {
	name: string;
	defaultName?: string;
	onRename?: (name: string) => void;
	onUseDefaultName?: () => void;
	onClose?: () => void;
	status?: IdeaStatus;
	statusDate?: string;
}) {
	const [shown, setShown] = React.useState(name);
	const [editing, setEditing] = React.useState(false);
	const nameRef = React.useRef<HTMLButtonElement>(null);
	const inputRef = React.useRef<HTMLInputElement>(null);
	const undoRef = React.useRef<HTMLButtonElement>(null);
	const { prefersReducedMotion } = useMotionPreference();
	// What's in the field as she types, so the undo arrow comes as soon as the name differs from Sparks's.
	const [draft, setDraft] = React.useState(name);
	// "Use default name" shows only while the name is being edited, and only while it isn't Sparks's name: one she saved
	// before, or what she's typing now.
	const renamed = Boolean(defaultName && onUseDefaultName && draft.trim() !== defaultName);
	React.useEffect(() => setShown(name), [name]);
	React.useEffect(() => {
		if (editing) setDraft(shown);
	}, [editing]);
	/** Focus left the field and the undo button for somewhere else: the name she typed is saved. */
	const leftEditing = (next: EventTarget | null) => {
		if (next === inputRef.current || next === undoRef.current) return;
		finish(inputRef.current?.value);
	};
	const useDefaultName = () => {
		setEditing(false);
		onUseDefaultName?.();
		requestAnimationFrame(() => nameRef.current?.focus());
	};
	const finish = (value?: string) => {
		const next = value?.trim();
		setEditing(false);
		// The field closes on the old name, then it rolls to the new one (MOTION.md → Roll), as when Sparks names it.
		requestAnimationFrame(() => {
			if (next && next !== shown) {
				setShown(next);
				onRename?.(next);
			}
			nameRef.current?.focus();
		});
	};

	return (
		<div className='flex min-w-0 flex-1 items-center gap-4'>
			{onClose ? (
				<Tooltip>
					<TooltipTrigger asChild>
						<Button variant='neutral' size='icon' aria-label='All ideas' onClick={onClose} className='size-8 shrink-0 rounded-button-md [&_svg]:size-4'>
							<ArrowLeft aria-hidden />
						</Button>
					</TooltipTrigger>
					<TooltipContent side='bottom' sideOffset={6}>
						All ideas
					</TooltipContent>
				</Tooltip>
			) : null}
			{/* `relative`: "Use default name" leaving is popped out of the flow (`popLayout`), placed against this. */}
			<div className='relative flex min-w-0 items-center gap-1'>
			{editing ? (
				<input
					ref={inputRef}
					aria-label='Idea name'
					defaultValue={shown}
					onChange={(event) => setDraft(event.currentTarget.value)}
					autoFocus
					// The whole name selected, so typing replaces it (an arrow key keeps it and moves the caret).
					onFocus={(event) => event.currentTarget.select()}
					// Tabbing to "Use default name" keeps the field open; anywhere else saves what she typed.
					onBlur={(event) => leftEditing(event.relatedTarget)}
					onKeyDown={(event) => {
						if (event.key === "Enter") finish(event.currentTarget.value);
						if (event.key === "Escape") finish();
					}}
					// No box: the same text, in the same place (2xl bold, 30px line, the dotted underline), so nothing moves; it
					// grows with what she types (`field-sizing-content`).
					className='field-sizing-content h-[30px] max-w-full min-w-[1ch] bg-transparent p-0 font-display text-2xl leading-[30px] font-bold text-foreground underline decoration-dotted decoration-from-font underline-offset-[5px] outline-none'
				/>
			) : (
					<Typography as='h1' size='2xl' weight='bold' className='min-w-0 leading-[30px] text-foreground'>
						{/* No tooltip: the text cursor and the dotted underline say it's editable; screen readers hear "Rename". */}
						<button
							ref={nameRef}
							type='button'
							aria-description='Rename'
							onClick={() => setEditing(true)}
							className='flex max-w-full cursor-text rounded-md underline decoration-dotted decoration-from-font underline-offset-[5px] outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50'
						>
							{/* Roll (MOTION.md): when the name changes ("New idea" named by Sparks, or renamed), the old one moves up
							    and out and the new one comes up from below, clipped to the line. Not on the first render. */}
							{/* `text-start`: a button centers its text, which would center the shorter name while both share the cell. */}
							<span className='-mt-1 -mb-2 inline-grid min-w-0 overflow-hidden pt-1 pb-2 text-start'>
								<AnimatePresence initial={false}>
									<motion.span
										key={shown}
										variants={prefersReducedMotion ? fadeVariants : rollVariants}
										initial='initial'
										animate='animate'
										exit='exit'
										className='col-start-1 row-start-1 truncate'
									>
										{shown}
									</motion.span>
								</AnimatePresence>
							</span>
						</button>
					</Typography>
			)}
				{/* "Use default name", after the field, only while she edits a name she has changed. It fades in (and out) while
				    the badge slides over to make room (`layout`, below); `popLayout`: leaving, it gives its room back at once. */}
				<AnimatePresence initial={false} mode='popLayout'>
					{editing && renamed ? (
						<motion.span key='undo' variants={fadeVariants} initial='initial' animate='animate' exit='exit' className='flex shrink-0'>
							<Tooltip>
								<TooltipTrigger asChild>
									<Button
										ref={undoRef}
										variant='ghost'
										size='icon'
										aria-label='Use default name'
										// Pressing it doesn't blur the field first (which would save what she typed).
										onMouseDown={(event) => event.preventDefault()}
										onClick={useDefaultName}
										onBlur={(event) => leftEditing(event.relatedTarget)}
										className='size-8 shrink-0 rounded-button-md text-icon [&_svg]:size-[18px]'
									>
										<Undo2 aria-hidden />
									</Button>
								</TooltipTrigger>
								<TooltipContent side='bottom' sideOffset={6}>
									Use default name: {defaultName}
								</TooltipContent>
							</Tooltip>
						</motion.span>
					) : null}
				</AnimatePresence>
			</div>
			{/* Where the idea stands, 12px after the name (or "Use default name", while it shows); it never shrinks: the name
			    truncates first. It slides when what's before it changes width (`layout`, `layoutSpring`): "Use default name"
			    showing or going, a new name rolling in. Reduced motion: it moves at once. */}
			{status ? (
				<motion.span layout={prefersReducedMotion ? false : "position"} transition={layoutSpring} className='-ms-1 flex shrink-0'>
					<IdeaStatusBadge status={status} date={statusDate} />
				</motion.span>
			) : null}
		</div>
	);
}

/** "UX team", "UX team and Catalog", "UX team, Engineering, and Catalog" (sparks.ds 129:2258's list, with the last comma). */
function inWordsWithAnd(names: string[]) {
	if (names.length <= 2) return names.join(" and ");
	return `${names.slice(0, -1).join(", ")}, and ${names[names.length - 1]}`;
}

/**
 * Sparks's first message in every concept (prds/sparks.md, "Sparks's introduction"): who it is, what she'll end up
 * with and that she decides, then where she starts (Plan, and what she'll define in it) and what follows, and the
 * question that starts Plan. Product copy, not sample data.
 */
function sparksIntroduction(firstName: string) {
	return `Hi ${firstName}, I'm Sparks. Together we'll turn your idea into a prototype you can test before anything gets built. I draft, you decide. Everything is saved as you go.

We start with Plan: we'll define the problem, agree on what success looks like, and choose the direction to prototype. Then I'll build it, test it, and help you take it to the teams who decide.

**What problem do you want to solve?**
Describe it in your own words, the way you'd tell a colleague. Rough is fine.`;
}

/** How the workspace is laid out: the conversation alone, beside a preview, two panels without it, or a step's empty state. */
type WorkspaceLayout = "centered" | "split" | "panels" | "upcoming";

/**
 * Going from one layout to another: the conversation narrows to its column ("narrow": Plan ↔ Prototype), or the step
 * gives way to another ("trade": everything else; `stepChangeAt`). `mainWidth`: `<main>`'s when it started.
 * `leavingStep`: the conversation that stays while it fades out.
 */
type LayoutShift = { kind: "narrow" | "trade"; from: WorkspaceLayout; mainWidth: number; leavingStep?: SparksStep };

/** The conversation's column beside a preview. */
const conversationWidth = 480;

/**
 * Where the panel on the right starts, in `<main>`: after the conversation, the second of two equal panels (16px apart,
 * 24px on each side), or the whole width (a step's empty state). It always ends 24px from the right.
 */
const panelLeftIn = (layout: WorkspaceLayout, mainWidth: number) =>
	({ centered: undefined, split: conversationWidth, panels: mainWidth / 2 + 8, upcoming: 24 })[layout];

const between = (from: number, to: number, progress: number) => from + (to - from) * progress;

/** `custom`: whether the layout she leaves fades out or is just gone. Gone before what's new is in, so they don't show over each other. */
const previewLayerVariants: Variants = {
	leave: (fades: boolean) => ({ opacity: 0, transition: fades ? { ...easeOutTransition, duration: motionDuration.fast } : { duration: 0 } }),
};

/** What's beside the conversation, or takes its place. Leaving, it can't be used anymore. */
function PreviewLayer({ className, children, style, ref }: { className?: string; children: React.ReactNode; style?: React.CSSProperties; ref?: React.Ref<HTMLDivElement> }) {
	const present = useIsPresent();
	const fades = Boolean(usePresenceData());
	return (
		<motion.div
			ref={ref}
			data-layer={present ? "in" : "out"}
			inert={!present}
			variants={previewLayerVariants}
			exit='leave'
			style={style}
			className={cn(className, !present && (fades ? "z-10" : "invisible"))}
		>
			{children}
		</motion.div>
	);
}

/** A layer's parts, for the step change: what's in it, its two panels when it has two, and its phone. */
function layerParts(main: HTMLElement, which: "in" | "out") {
	const content = main.querySelector<HTMLElement>(`[data-layer=${which}] [data-layer-content]`);
	const panels = content?.querySelectorAll<HTMLElement>(":scope > div > section");
	return {
		content,
		side: panels?.length === 2 ? panels[0] : undefined,
		phone: content?.querySelector<HTMLElement>("[data-phone]") ?? undefined,
	};
}

/** A picture of the phone as it was, to glide from one step to the other: the same markup, scrolled the same, inert. */
function pictureOf(phone: HTMLElement) {
	const picture = phone.cloneNode(true) as HTMLElement;
	picture.inert = true;
	picture.setAttribute("aria-hidden", "true");
	picture.removeAttribute("data-phone");
	// No second element with the same id, except inside drawings: their gradients are found by id.
	picture.querySelectorAll("[id]").forEach((element) => element.closest("svg") || element.removeAttribute("id"));
	picture.querySelectorAll("[data-comment-pin]").forEach((pin) => pin.remove());
	Object.assign(picture.style, { position: "absolute", left: "0", top: "0", zIndex: "20", pointerEvents: "none", transformOrigin: "0 0" });
	const scrolled = [...phone.querySelectorAll<HTMLElement>("*")];
	const copies = [...picture.querySelectorAll<HTMLElement>("*")];
	return {
		picture,
		// Scrolling only holds once it's on the page. (Pins are gone from the copy, so only the same markup is matched.)
		restoreScroll: () => {
			const originals = scrolled.filter((element) => element.scrollTop > 0 && !element.closest("[data-comment-pin]"));
			for (const element of originals) {
				const index = scrolled.filter((other) => !other.closest("[data-comment-pin]")).indexOf(element);
				if (copies[index]) copies[index].scrollTop = element.scrollTop;
			}
		},
	};
}

/**
 * Where Dana works on a concept: the header with the concept's name and the four steps, the conversation with Sparks
 * centered (Sparks's introduction first), and the message box at the bottom. Figma: Sparks → "Sparks Project" (node 27:1932).
 */
function SparksWorkspace({
	user,
	conceptName,
	currentStep,
	reachedStep = currentStep,
	messages,
	onSend,
	onSuggestionEdit,
	onAnswerCancel,
	onAnswerChange,
	initialPrompt,
	onAddPlan,
	onResetPrototype,
	onGoToReview,
	glideToLatest = false,
	myLibrary,
	comments,
	openCommentsKey = 0,
	library,
	notifications,
	onStepSelect,
	preview: previewProp,
	conversation = true,
	composerContext,
	share,
	paths,
	upcomingActions,
	publish,
	onClose,
	onRename,
	defaultConceptName,
	status,
	statusDate,
	onUseDefaultName,
}: SparksWorkspaceProps) {
	// Share, opened from its button or from "Manage reviewers" in Publish (once Publish has closed and given focus back).
	const [shareOpen, setShareOpen] = React.useState(false);
	const openShare = () => window.setTimeout(() => setShareOpen(true), 0);
	// How many prototypes "Publish your idea" shares (every path of every idea): its copy says "prototype" or "prototypes".
	const publishedPaths = publish?.details?.items.reduce((n, item) => n + (item.paths?.length ?? 1), 0) ?? 0;
	const reachedIndex = sparksSteps.findIndex((step) => step.id === reachedStep);
	// A concept that opens with no messages is new: its introduction streams in. Reopened, it's history and shows whole.
	// Sending while it streams shows the rest at once.
	const [isNew] = React.useState(messages.length === 0);
	// Sparks's replies already there when the concept opened show whole; new ones come in.
	const [initialIds] = React.useState(() => new Set(messages.map((message) => message.id)));

	// When Dana sends, the conversation scrolls so her message sits at the top of the view, with Sparks's answer coming
	// in right below it (the view doesn't chase the bottom). The newest reply is tall enough to fill the view under her
	// message, so the message can reach the top while the answer is still short, and has half the view below its end, so
	// scrolling down a long answer stops with its end in the middle of the view. Her message with no reply is just
	// brought into view.
	const { prefersReducedMotion } = useMotionPreference();
	const scrollRef = React.useRef<HTMLDivElement>(null);
	const itemRefs = React.useRef(new Map<string, HTMLLIElement>());
	const [viewHeight, setViewHeight] = React.useState(0);
	const [sentHeight, setSentHeight] = React.useState(0);
	// The scroller's padding above the conversation (none: Figma starts it right under the header). Not room the newest
	// reply can fill.
	const scrollPadding = 0;
	React.useEffect(() => {
		const scroller = scrollRef.current;
		if (!scroller) return;
		const observer = new ResizeObserver(() => setViewHeight(scroller.clientHeight));
		observer.observe(scroller);
		return () => observer.disconnect();
	}, []);
	// Steps in the conversation (prds/sparks.md, "Steps in the conversation"): each step shows its own conversation, so
	// Plan's never shows in Prototype, or the other way round. A reply belongs to the step it came on (without one, the
	// reply before's; Plan for the first); Dana's message belongs with the reply that answers it ("Generate a prototype…"
	// starts Prototype's), or, with none yet, with the step she sent it from.
	// Going to a step with no conversation (Prototype → Evaluate), the one she leaves stays while it fades out.
	const [shift, setShift] = React.useState<LayoutShift>();
	const threadStep = shift?.leavingStep ?? currentStep;
	const stepOf = new Map<string, SparksStep>();
	{
		let step: SparksStep = "plan";
		const waiting: string[] = [];
		for (const message of messages) {
			if (message.from === "user") {
				waiting.push(message.id);
				continue;
			}
			step = message.step ?? step;
			for (const id of waiting.splice(0)) stepOf.set(id, step);
			stepOf.set(message.id, step);
		}
		for (const id of waiting) stepOf.set(id, threadStep);
	}
	const thread = messages.filter((message) => stepOf.get(message.id) === threadStep);
	const threadLast = thread[thread.length - 1];
	// Another step's conversation opens at its latest message, at once (a different conversation, not a move in this one).
	const shownStep = React.useRef(threadStep);
	// Replies already shown in a step's conversation show whole when she comes back to it: no thinking or streaming again.
	const settled = React.useRef(new Set<string>());
	React.useLayoutEffect(() => {
		if (shownStep.current === threadStep) return;
		for (const [id, step] of stepOf) if (step === shownStep.current) settled.current.add(id);
		shownStep.current = threadStep;
		const latest = threadLast ? itemRefs.current.get(threadLast.id) : undefined;
		if (latest) scrollIntoViewSmoothly(latest, { reducedMotion: true, align: "nearest" });
		else scrollRef.current?.scrollTo({ top: 0 });
	}, [threadStep, threadLast]);

	// A conversation that opens with history (a concept reopened) shows where she left off, nothing streaming or
	// thinking again: it fades in at its top (the introduction), then glides down until its end sits in the middle of the
	// view (`endRef`, the half-view space under it; `glideScrollTransition`, 1.2s), so she sees what's there on the way.
	// Any wheel, touch, click or key stops it. Reduced motion: at its end at once, no fade.
	const [reopened] = React.useState(initialIds.size > 0 && !glideToLatest);
	const endRef = React.useRef<HTMLDivElement>(null);
	const glideToEnd = React.useRef<() => void>(() => {});
	const glideStarted = React.useRef(false);
	const startGlideToEnd = () => {
		if (!reopened || glideStarted.current || !endRef.current) return;
		glideStarted.current = true;
		glideToEnd.current = scrollIntoViewSmoothly(endRef.current, {
			reducedMotion: Boolean(prefersReducedMotion),
			align: "end",
			transition: glideScrollTransition,
		});
	};
	React.useEffect(() => () => glideToEnd.current(), []);
	React.useLayoutEffect(() => {
		// Reduced motion: no fade to wait for, so once the view's height (and the space under the end) is known.
		if (prefersReducedMotion && viewHeight) startGlideToEnd();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [viewHeight]);
	// Right after "Add Plan" (`glideToLatest`), it starts at its latest reply, and a reply that goes on after a section
	// divider at its last section ("Next, pick the path to prototype first.", not the success summary before it): it
	// glides there from the introduction over 1.2s (`glideScrollTransition`), slow enough to see the Plan go by; any
	// wheel, touch, click or key stops it.
	React.useLayoutEffect(() => {
		const latest = threadLast ? itemRefs.current.get(threadLast.id) : undefined;
		if (!latest || !glideToLatest) return;
		const dividers = latest.querySelectorAll<HTMLElement>("[data-slot=section-divider]");
		const lastSection = dividers[dividers.length - 1]?.nextElementSibling;
		return scrollIntoViewSmoothly(lastSection instanceof HTMLElement ? lastSection : latest, {
			reducedMotion: Boolean(prefersReducedMotion),
			align: "start",
			transition: glideScrollTransition,
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const last = messages[messages.length - 1];
	const beforeLast = messages[messages.length - 2];
	const lastIsNewReply = last?.from === "sparks" && !initialIds.has(last.id);
	// Her message that the new reply answers: the one the view scrolls to.
	const sent = lastIsNewReply && beforeLast?.from === "user" ? beforeLast : undefined;
	const scrolledFor = React.useRef<string | undefined>(undefined);
	React.useEffect(() => {
		if (!last || initialIds.has(last.id) || scrolledFor.current === last.id) return;
		scrolledFor.current = last.id;
		const target = itemRefs.current.get(sent?.id ?? last.id);
		if (!target) return;
		// The reply fills the view below her message: the view's height, less her message and the 32px below it.
		setSentHeight(sent ? target.offsetHeight + 32 : 0);
		return scrollIntoViewSmoothly(target, {
			reducedMotion: Boolean(prefersReducedMotion),
			align: lastIsNewReply ? "start" : "nearest",
		});
	}, [last, sent, lastIsNewReply, initialIds, prefersReducedMotion]);
	// Her message's height can change after it's sent: from Plan to Prototype the column narrows to 480px and it wraps to
	// more lines. Measured once, the reply's `minHeight` went 24px past the view, so the conversation scrolled and the
	// scrollbar flashed (DESIGN.md → "Sparks Project background and column").
	const sentId = sent?.id;
	React.useEffect(() => {
		const target = sentId ? itemRefs.current.get(sentId) : undefined;
		if (!target) return;
		const observer = new ResizeObserver(() => setSentHeight(target.offsetHeight + 32));
		observer.observe(target);
		return () => observer.disconnect();
	}, [sentId]);
	const itemRef = (id: string) => (element: HTMLLIElement | null) => {
		if (element) itemRefs.current.set(id, element);
		else itemRefs.current.delete(id);
	};

	// Attached files, waiting to be sent with her next message: "Attach files" in the "+" menu, or a reply's "Attach files".
	const [files, setFiles] = React.useState<string[]>([]);
	const fileInputRef = React.useRef<HTMLInputElement>(null);
	// Picked from a reply's "Attach files", they're her answer: sent as soon as they're picked. From the "+" menu, they
	// wait in the message box, to go with what she types (prds/sparks-plan-problem.md, "Supporting material").
	const sendOnPick = React.useRef(false);
	const pickFiles = (sendNow = false) => {
		sendOnPick.current = sendNow;
		fileInputRef.current?.click();
	};
	// "Add from library": the dialog with everything in My library.
	const [pickingFromLibrary, setPickingFromLibrary] = React.useState(false);
	// The images she picked, by file name, to open from Library: in this tab only (nothing is uploaded).
	const [images, setImages] = React.useState<Record<string, string>>({});
	const keepImages = (picked: File[]) => {
		const added = picked.filter((file) => file.type.startsWith("image/")).map((file) => [file.name, URL.createObjectURL(file)]);
		if (added.length) setImages((current) => ({ ...current, ...Object.fromEntries(added) }));
	};
	// Sparks asked for files: they can go with no text, and "Nothing to add" with files waiting sends the files.
	const attachReply = last?.from === "sparks" ? last.attachReply : undefined;
	const libraryReply = last?.from === "sparks" ? last.libraryReply : undefined;
	const send = (text: string, fromLibrary?: LibraryPick[]) => {
		onSend?.(text, files.length ? files : undefined, fromLibrary);
		setFiles([]);
	};
	const quickReply = (text: string) => {
		if (attachReply && text === attachReply) return pickFiles(true);
		if (libraryReply && text === libraryReply) return setPickingFromLibrary(true);
		send(attachReply && files.length ? "" : text);
	};
	// What's in the message box. "Initial prompt" fills it; the menu closing puts focus there, caret at the end.
	const [draft, setDraft] = React.useState("");
	const fillDraft = (text: string) => setDraft(text);

	// "Not quite" on a question card: the question stays open, and the message box is ready for her answer.
	const composerRef = React.useRef<HTMLTextAreaElement>(null);
	const answeringPart =
		last?.from === "sparks"
			? last.parts.find((part) => part.kind === "suggestion" && part.suggestion.answering)
			: undefined;
	const answering = Boolean(answeringPart);
	// Sparks's answer, on offer in the message box: Tab puts it there to edit instead of typing it again.
	const offeredAnswer = answeringPart?.kind === "suggestion" ? answeringPart.suggestion.text : undefined;
	React.useEffect(() => {
		if (answering) composerRef.current?.focus();
	}, [answering]);
	// Esc after "Not quite": the card opens again, and focus goes back to its "Not quite", where she was.
	const refocusNotQuite = React.useRef(false);
	const cancelAnswer = () => {
		refocusNotQuite.current = true;
		onAnswerCancel?.();
	};
	React.useEffect(() => {
		if (answering || !refocusNotQuite.current || !last) return;
		refocusNotQuite.current = false;
		const buttons = itemRefs.current.get(last.id)?.querySelectorAll("button") ?? [];
		[...buttons].find((button) => notAnswers.has(button.textContent?.trim() ?? ""))?.focus();
	}, [answering, last]);
	// Changing an answer (prds/sparks.md, "Changing an answer"): her answer to a question card in Plan shows a pencil;
	// selecting it opens the question again where it was asked, with her answer's bubble out of the way, until she picks
	// a new answer or keeps hers. One at a time; selecting a step closes it.
	const [changing, setChanging] = React.useState<{ answerId: string; replyId: string; answering: boolean }>();
	React.useEffect(() => setChanging(undefined), [currentStep]);
	/** The question card her message answers, if she can change that answer: the reply before it, answered. */
	const changeableAsk = (index: number) => {
		const message = messages[index];
		const asked = messages[index - 1];
		if (!onAnswerChange || message?.from !== "user" || asked?.from !== "sparks" || stepOf.get(message.id) !== "plan") return undefined;
		if (notAnswers.has(message.text)) return undefined;
		const part = asked.parts.find((p) => p.kind === "suggestion");
		return part?.kind === "suggestion" && part.suggestion.confirmed ? { reply: asked, suggestion: part.suggestion } : undefined;
	};
	const changeIndex = changing ? messages.findIndex((m) => m.id === changing.answerId) : -1;
	const changeAsk = changeIndex >= 0 ? changeableAsk(changeIndex) : undefined;
	const changeAnswer = changeIndex >= 0 ? messages[changeIndex] : undefined;
	// What she answered: a quick reply the question offered, or her own words.
	const changeSelected =
		changeAsk && changeAnswer?.from === "user" && changeAsk.reply.quickReplies?.includes(changeAnswer.text) ? changeAnswer.text : undefined;
	const changeOwn = changeAsk && !changeSelected ? changeAsk.suggestion.text : undefined;
	// Closing it gives focus back to the pencil she started from.
	const closeChange = () => {
		const id = changing?.answerId;
		setChanging(undefined);
		if (id) requestAnimationFrame(() => itemRefs.current.get(id)?.querySelector<HTMLButtonElement>("[data-change-answer]")?.focus());
	};
	const finishChange = (answer: string, own: boolean) => {
		if (!changing) return;
		const same = own ? answer.trim() === changeOwn?.trim() : answer === changeSelected;
		if (!same) onAnswerChange?.(changing.replyId, own ? answer.trim() : answer, own);
		closeChange();
	};
	const answerChange: AnswerChange | undefined = changing
		? {
				selected: changeSelected,
				own: changeOwn,
				answering: changing.answering,
				onReply: (reply) =>
					notAnswers.has(reply) ? setChanging({ ...changing, answering: true }) : finishChange(reply, false),
				onEdit: (text) => finishChange(text, true),
				onKeep: closeChange,
			}
		: undefined;
	// "Not quite" while changing: the message box is ready for her new answer.
	React.useEffect(() => {
		if (changing?.answering) composerRef.current?.focus();
	}, [changing?.answering]);

	// A direction's call to action on its card, and its status under its name.
	const directionAction = directionActionFor(messages, paths);
	const directionStatus = directionStatusFor(paths);
	// Comments: the reviewers' feedback and her comments on the prototype, 480px on the right in every step (DESIGN.md →
	// "Side panels share one frame"); with no preview, the conversation stays centered in the rest. Library: what she gave
	// the idea. One panel at a time, in the same column; each opens only from its button, and takes focus.
	const [sidePanel, setSidePanel] = React.useState<"comments" | "library" | undefined>(openCommentsKey ? "comments" : undefined);
	const openedFor = React.useRef(openCommentsKey);
	React.useEffect(() => {
		if (openCommentsKey === openedFor.current) return;
		openedFor.current = openCommentsKey;
		if (openCommentsKey) setSidePanel("comments");
	}, [openCommentsKey]);
	const commentsOpen = sidePanel === "comments";
const libraryOpen = sidePanel === "library";
	// Its width: 380px to start, dragged from its left edge between 300px and half the window; kept while it's closed.
	const [sidePanelWidth, setSidePanelWidth] = useSidePanelWidth();
	const commentsButtonRef = React.useRef<HTMLButtonElement>(null);
	const closeComments = () => {
		setSidePanel(undefined);
		commentsButtonRef.current?.focus();
	};
	const libraryButtonRef = React.useRef<HTMLButtonElement>(null);
	const closeLibrary = () => {
		setSidePanel(undefined);
		libraryButtonRef.current?.focus();
	};
	// Something she gave Sparks in the conversation lands in Library: its folder bounces (not when it opens, nor for what
	// she adds in the panel itself).
	const libraryBounce = useAnimationControls();
	const libraryAddedKey = library?.addedKey;
	const bouncedFor = React.useRef(libraryAddedKey);
	React.useEffect(() => {
		if (libraryAddedKey === bouncedFor.current) return;
		bouncedFor.current = libraryAddedKey;
		void libraryBounce.start("bounce");
	}, [libraryAddedKey, libraryBounce]);
	// A step not reached yet, selected to see what it is: its empty state takes the preview's place until she goes back
	// (prds/sparks.md, "Steps"). The step she's on doesn't change.
	const [peekStep, setPeekStep] = React.useState<SparksStep>();
	React.useEffect(() => setPeekStep(undefined), [currentStep]);
	const peeked = sparksSteps.find((step) => step.id === peekStep);
	const peekedAction = peeked && upcomingActions?.[peeked.id];
	const currentLabel = sparksSteps.find((step) => step.id === currentStep)?.label ?? "";
	// A step not reached yet (its empty state), or a step with no conversation (Evaluate): no conversation, no message box.
	const conversationHidden = Boolean(peeked?.upcoming) || !conversation;
	const preview = peeked?.upcoming ? (
		<section aria-label={peeked.label} className='flex min-h-0 flex-1 flex-col rounded-card bg-background-subtle p-4'>
			<EmptyState
				className='flex-1'
				icon={(() => {
					const illustration = upcomingIllustrations[peeked.id as keyof typeof upcomingIllustrations];
					return <img src={illustration.src} alt='' className={cn("mb-4 opacity-80", illustration.className)} />;
				})()}
				title={peeked.upcoming.title}
				description={peeked.upcoming.description}
				// Once it can start (Evaluate and Review, with the prototype built): its action, and "Back to …" beside it.
				{...(peekedAction
					? {
							buttonLabel: peekedAction.label,
							buttonProps: {
								disabled: peekedAction.disabled,
								onClick: () => {
									setPeekStep(undefined);
									peekedAction.onClick();
								},
							},
							secondaryButtonLabel: `Back to ${currentLabel}`,
							secondaryButtonProps: { onClick: () => setPeekStep(undefined) },
						}
					: { buttonLabel: `Back to ${currentLabel}`, buttonProps: { onClick: () => setPeekStep(undefined) } })}
			>
				{peekedAction ? <UpcomingPrototype {...peekedAction.prototype} note={peekedAction.note} /> : null}
			</EmptyState>
		</section>
	) : (
		previewProp
	);
	// Leaving Plan for a step's empty state, or for Evaluate or Review: its conversation stays as wide as it was.
	const centered = !preview || (shift?.kind === "trade" && shift.from === "centered");

	// Plan → Prototype (and back): the conversation narrows from the full width to its 480px column while the preview
	// slides in from the right behind it, on `easeOutTransition` (ease-out, 300ms; MOTION.md → "Step change"). Only
	// between the two layouts with the conversation showing, not for a step's empty state. Reduced motion: it switches.
	// Any other step (Prototype ↔ Evaluate or Review, a step's empty state): see `trading`.
	// At rest the classes size the column (`flex-1` centered, `w-[480px]` beside a preview); only during the shift is its
	// width set inline, from one to the other, then cleared.
	const mainRef = React.useRef<HTMLElement>(null);
	const columnRef = React.useRef<HTMLDivElement>(null);
	const layout: WorkspaceLayout = peeked?.upcoming ? "upcoming" : !conversation ? "panels" : preview ? "split" : "centered";
	const split = layout === "split";
	// What's on screen, as one layer: the prototype beside the conversation, a step's two panels, or a step's empty state.
	const layerId = layout === "panels" ? currentStep : layout === "upcoming" ? `upcoming-${peeked?.id}` : layout;
	const [layoutWas, setLayoutWas] = React.useState({ layout, layerId, step: currentStep });
	if (layoutWas.layerId !== layerId || layoutWas.step !== currentStep) {
		const was = layoutWas.layout;
		if (layoutWas.layerId !== layerId) {
			const narrows = (was === "centered" && layout === "split") || (was === "split" && layout === "centered");
			const mainWidth = mainRef.current?.clientWidth ?? 0;
			const eases = !prefersReducedMotion && mainWidth > conversationWidth;
			const leavesConversation = (was === "split" || was === "centered") && layout !== "split" && layout !== "centered";
			setShift(eases ? { kind: narrows ? "narrow" : "trade", from: was, mainWidth, leavingStep: leavesConversation ? layoutWas.step : undefined } : undefined);
		}
		setLayoutWas({ layout, layerId, step: currentStep });
	}
	const narrowing = shift?.kind === "narrow";
	// Any other change of step (MOTION.md → "Step change"): the panel on the right is there in both, so it glides from one
	// layout's place to the other's, with the phone in it; the conversation and the panel on the left take turns.
	const trading = shift?.kind === "trade" ? shift : undefined;
	const columnLeaving = Boolean(trading) && conversationHidden && trading?.leavingStep !== undefined;
	const gliding = trading !== undefined && panelLeftIn(trading.from, trading.mainWidth) !== undefined && panelLeftIn(layout, trading.mainWidth) !== undefined;
	const glidingPanelRef = React.useRef<HTMLDivElement>(null);
	React.useLayoutEffect(() => {
		const column = columnRef.current;
		const main = mainRef.current;
		if (!shift || !column || !main) return;
		// From 0 to 1, styles set by hand: Motion keeps the values it animates on an element and writes them again with the
		// next animation, so a width from one shift would come back in another. Set before the first paint.
		// Only what it set is cleared: some of these elements have inline styles of their own (a phone's size).
		const styled = new Map<HTMLElement, Set<string>>();
		const set = (element: HTMLElement | null | undefined, style: Partial<CSSStyleDeclaration>) => {
			if (!element) return;
			const keys = styled.get(element) ?? new Set();
			styled.set(element, keys);
			for (const key of Object.keys(style)) keys.add(key);
			Object.assign(element.style, style);
		};
		let picture: HTMLElement | undefined;
		let draw: (t: number) => void;
		if (shift.kind === "trade") {
			const hadConversation = shift.from === "split" || shift.from === "centered";
			const hasConversation = layout === "split" || layout === "centered";
			const fromLeft = panelLeftIn(shift.from, shift.mainWidth);
			const toLeft = panelLeftIn(layout, shift.mainWidth);
			const arriving = layerParts(main, "in");
			const leaving = layerParts(main, "out");
			// The phone, when both steps have one: a picture of it as it was glides to the other's place, over the real one.
			const origin = main.getBoundingClientRect();
			const start = leaving.phone && arriving.phone ? leaving.phone.getBoundingClientRect() : undefined;
			if (leaving.phone && start) {
				const made = pictureOf(leaving.phone);
				picture = made.picture;
				main.append(picture);
				made.restoreScroll();
				set(leaving.phone, { visibility: "hidden" });
			}
			const glide = (left: number, t: number) => (fromLeft === undefined || toLeft === undefined ? 0 : between(fromLeft, toLeft, t) - left);
			draw = (t) => {
				const { move, leave, enter, side, settle } = stepChangeAt(t);
				// The conversation leaves to the left, and comes in from there.
				if (hadConversation && !hasConversation) set(column, { opacity: `${1 - leave}`, transform: `translateX(${-move * motionDistance.large}px)` });
				if (hasConversation && !hadConversation) set(column, { opacity: `${side}`, transform: `translateX(${(side - 1) * motionDistance.large}px)` });
				// The panel on the right, in its own color, so it doesn't blink while what's in it changes; what's in it follows.
				if (fromLeft !== undefined && toLeft !== undefined) set(glidingPanelRef.current, { left: `${between(fromLeft, toLeft, move)}px` });
				if (fromLeft !== undefined && shift.from !== "panels") set(leaving.content, { marginLeft: `${glide(fromLeft, move)}px` });
				set(arriving.content, { opacity: `${enter}`, marginLeft: toLeft !== undefined && layout !== "panels" ? `${glide(toLeft, move)}px` : "" });
				// The panel on the left (the evaluation, the idea for review) comes in where the conversation was.
				set(arriving.side, { opacity: `${side}`, transform: `translateX(${(side - 1) * motionDistance.large}px)` });
				if (picture && start && arriving.phone) {
					const phone = arriving.phone;
					// Its own place now, which moves as its panel does.
					set(phone, { transform: "none", transformOrigin: "0 0" });
					const end = phone.getBoundingClientRect();
					const width = between(start.width, end.width || start.width, move);
					const x = between(start.left, end.left, move);
					const y = between(start.top, end.top, move);
					if (end.width) set(phone, { transform: `translate(${x - end.left}px, ${y - end.top}px) scale(${width / end.width})` });
					picture.style.transform = `translate(${x - origin.left}px, ${y - origin.top}px) scale(${width / start.width})`;
					picture.style.opacity = `${1 - settle}`;
				}
			};
		} else {
			draw = (t) => {
				const here = split ? 1 - t : t;
				set(column, { width: `${between(conversationWidth, shift.mainWidth, here)}px` });
			};
		}
		draw(0);
		const controls = animate(0, 1, {
			...(shift.kind === "trade" ? stepChangeTransition : easeOutTransition),
			onUpdate: draw,
			onComplete: () => setShift((current) => (current === shift ? undefined : current)),
		});
		return () => {
			controls.stop();
			picture?.remove();
			for (const [element, keys] of styled) for (const key of keys) Object.assign(element.style, { [key]: "" });
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [shift]);

	// Pointing at something: the box is ready for what to change.
	React.useEffect(() => {
		if (composerContext) composerRef.current?.focus();
	}, [composerContext?.label]);

	return (
		// The screen's height: the conversation scrolls between the header and the message box.
		// sparks.ds/Sparks "Sparks Project": white down to the middle, then a soft gray at the bottom (DESIGN.md → "Sparks
		// Project background").
		// The Comments panel is a column of its own on the right, the screen's full height, beside the header too (Sparks
		// "Sparks Project", 63:12460, "Plan summary"); everything else is in the column on its left.
		<div className='flex h-screen bg-background bg-linear-to-b from-background from-50% to-[color-mix(in_srgb,var(--background-subtle)_50%,var(--background))] text-foreground'>
		<div className='flex min-w-0 flex-1 flex-col'>
			{/* sparks.ds "header-autopartshub" → "Sparks Project" (32:1145): the back button and the concept's name on the left
			    (2xl bold, 24/30, dotted underline: selected, it's renamed), the steps centered, the actions on the right. No logo, no
			    avatar (DESIGN.md → "Sparks Project header"). */}
			<AppHeader
				logo={
					// Figma "Left": back ("All ideas", to the start page), then the concept's name, selected to rename it.
					<ConceptName
						name={conceptName}
						defaultName={defaultConceptName}
						onRename={onRename}
						onUseDefaultName={onUseDefaultName}
						onClose={onClose}
						status={status}
						statusDate={statusDate}
					/>
				}
				nav={
					<StepNav aria-label='Steps'>
						{sparksSteps.map((step, index) => (
							<StepNavItem
								key={step.id}
								current={step.id === (peekStep ?? currentStep)}
								// Not reached yet: still selectable, to see what the step is (its empty state).
								upcoming={index > reachedIndex}
								onClick={() => {
									if (index > reachedIndex) return setPeekStep(step.id);
									setPeekStep(undefined);
									// Its own conversation opens at its latest message.
									if (step.id !== currentStep) onStepSelect?.(step.id);
								}}
							>
								{step.label}
							</StepNavItem>
						))}
					</StepNav>
				}
			>
				{/* Figma "Right" (sparks.ds "Sparks Project", 32:1145): Library, Comments, notifications, then Share. No "Blueprint": Plan
				    stays the conversation once it's done (prds/sparks.md, "The finished plan"). No close button: "All ideas" goes
				    back to the start page. */}
				{library ? (
					<HeaderIconButton
						ref={libraryButtonRef}
						label='Library'
						aria-expanded={libraryOpen}
						onClick={() => (libraryOpen ? closeLibrary() : setSidePanel("library"))}
					>
						{/* sparks.ds "folder" (77:6793), Lucide's. */}
						<motion.span variants={prefersReducedMotion ? bounceReducedVariants : bounceVariants} initial='rest' animate={libraryBounce} className='flex'>
							<Folder aria-hidden />
						</motion.span>
					</HeaderIconButton>
				) : null}
				<HeaderIconButton
					ref={commentsButtonRef}
					label='Comments'
					dot={Boolean(comments?.unread?.length)}
					aria-expanded={commentsOpen}
					onClick={() => (commentsOpen ? closeComments() : setSidePanel("comments"))}
				>
					<MessageCircle aria-hidden />
				</HeaderIconButton>
				{notifications ? (
					<NotificationsPopover {...notifications} />
				) : (
					<HeaderIconButton label='Notifications'>
						<Bell aria-hidden />
					</HeaderIconButton>
				)}
				{/* "Share", in every step (prds/sparks.md, "Sharing a concept"): Figma's Share, Button Outlined lg · 36, its label
				    alone (no icon). No avatars beside it (32:1145): who has access is in Share's popover. */}
				{share ? (
					// The same Share in every step: whoever she adds with "Can view" or "Can comment" sees it once she publishes it.
					<SharePopover
						title='Share idea'
						description='People and departments you add see the idea and its prototype once you publish it.'
						rolesHint='With "Can comment", they can also leave feedback. With "Can edit", they work on it with you right away, in your conversation with Sparks too.'
						{...share}
						// Also opened from "Manage reviewers" in Publish.
						open={shareOpen}
						onOpenChange={setShareOpen}
					>
						<Button variant='outline'>Share</Button>
					</SharePopover>
				) : null}
				{/* "Publish", last, on Review only (sparks.ds "Sparks Project" with Publish): Button Solid · Neutral lg · 36, the header's
				    button sizes. Share is for people working on the idea with her (the live version); Publish is for the teams
				    who review and decide (a fixed version). Unavailable, it says why in a tooltip (a disabled button gets no
				    hover, so the tooltip sits on a wrapper that takes focus). */}
				{publish ? (
					publish.published && !publish.disabled ? (
						// "Published": the teams have the latest. A Flat button (sparks.ds 38:324) that shows what went out, when and to
						// whom (sparks.ds "Publish your idea (popover)" → Published, 138:2887).
						<PublishPopover
							variant='published'
							title='Your idea is published'
							publishedAt={<time dateTime={publish.published.at}>{publishedAtFormat.format(new Date(publish.published.at))}</time>}
							link={share?.link}
							linkHref={publish.published.linkHref}
							itemsLabel='Idea solution paths shared'
							items={publish.published.items}
							audience={{
								title: `Your idea was shared with ${publish.published.reviewers} team ${publish.published.reviewers === 1 ? "member" : "members"}.`,
								detail: publish.published.departments?.length ? `Departments: ${inWordsWithAnd(publish.published.departments)}` : undefined,
								action: { label: "Manage reviewers", onClick: openShare },
							}}
							open={publish.open}
							onOpenChange={publish.onOpenChange}
						>
							<Button variant='flat'>{publish.label}</Button>
						</PublishPopover>
					) : publish.disabled && publish.hint ? (
						<Tooltip>
							<TooltipTrigger asChild>
								<span tabIndex={0} className='rounded-button-lg outline-none focus-visible:ring-2 focus-visible:ring-ring'>
									<Button variant='neutral' disabled>
										{publish.label}
									</Button>
								</span>
							</TooltipTrigger>
							<TooltipContent side='bottom' sideOffset={6}>
								{publish.hint}
							</TooltipContent>
						</Tooltip>
					) : publish.details && !publish.disabled ? (
						// The first time: what's shared, what happens next and who it goes to (Figma: Sparks 81:1031).
						<PublishPopover
							title='Publish your idea'
							// sparks.ds "Publish your idea (popover)" (129:2258): the idea named in the description, then where it'll be.
							description={`Share your ${conceptName} idea and interactive ${publishedPaths > 1 ? "prototypes" : "prototype"} with your selected reviewers.`}
							link={share?.link}
							linkHref={publish.details.linkHref}
							itemsLabel="Idea solution paths you're sharing"
							items={publish.details.items}
							next={`Reviewers will receive an email invitation to explore your ${publish.details.items.length > 1 ? "ideas" : "idea"}, try the ${publishedPaths > 1 ? "prototypes" : "prototype"}, and share feedback. You can continue working independently and publish updates when you're ready.`}
							audience={
								publish.details.reviewers
									? {
											title: `Your idea will be shared with ${publish.details.reviewers} team ${publish.details.reviewers === 1 ? "member" : "members"}.`,
											detail: publish.details.departments?.length ? `Departments: ${inWordsWithAnd(publish.details.departments)}` : undefined,
											action: { label: "Manage reviewers", onClick: openShare },
										}
									: { title: "No reviewers added yet", tone: "warning", action: { label: "Add reviewers to publish and share your idea.", onClick: openShare } }
							}
							// The email as reviewers get it, with her note as its message once she's written one.
							preview={{
								title: "Invite email",
								// What's shared in the email is what the popover lists.
								children: (
									<InvitationEmail {...publish.details.email} items={publish.details.items} note={publish.details.note?.trim() || undefined} variant='preview' />
								),
							}}
							note={
								publish.details.onNoteChange
									? { fieldLabel: "Note to reviewers", value: publish.details.note ?? "", onChange: publish.details.onNoteChange }
									: undefined
							}
							publishLabel='Publish & invite'
							onPublish={publish.onClick}
							blocked={publish.blocked}
							open={publish.open}
							onOpenChange={publish.onOpenChange}
						>
							<Button variant='neutral'>{publish.label}</Button>
						</PublishPopover>
					) : (
						<Button
							variant='neutral'
							disabled={publish.disabled}
							onClick={publish.onClick}
						>
							{publish.label}
						</Button>
					)
				) : null}
			</AppHeader>

			{/* Figma "Canvas": a 728px column centered (500px sides at 1728), starting right under the header (its 28px bottom
			    padding is the space above the first message), the message box 24px from the bottom. The whole area scrolls, so
			    the scrollbar sits at the page's edge and the text scrolls up to the header. */}
			{/* With a preview (the prototype), the conversation is a 480px column on the left and the preview takes the rest. */}
			{/* Clipped while the layout shifts, so the preview comes in from the right edge. */}
			<main ref={mainRef} className={cn("relative flex min-h-0 flex-1", shift && "overflow-hidden")}>
			{/* Hidden, not removed, while a step not reached yet shows its empty state: the scroll position stays. */}
			{/* Beside a preview, the narrow column's text is 15px instead of 16px: messages, cards and the message box (every
			    `text-base` inside it; DESIGN.md → "The conversation beside a preview is 15px"). */}
			{/* While the layout shifts, its width is set inline (see `shift`), so no width class then. */}
			<div
				ref={columnRef}
				inert={columnLeaving}
				className={cn(
					"flex min-h-0 flex-col",
					narrowing ? "min-w-0 shrink-0" : !centered ? "w-[480px] shrink-0" : "min-w-0 flex-1",
					// Fading out where the panels take its place, as wide as it was.
					columnLeaving && (centered ? "absolute inset-0 w-auto" : "absolute inset-y-0 left-0"),
					// …and its headings sit 12px below what's above them, like any paragraph (24px in Plan).
					!centered && "[&_.text-base]:text-[15px] [&_[data-slot=assistant-message]_p]:mt-0",
					conversationHidden && !columnLeaving && "hidden",
				)}
			>
				{/* No scrollbar while the layout shifts: the text rewraps as the column narrows. */}
				<div ref={scrollRef} className={cn("scrollbar-subtle min-h-0 flex-1 overflow-y-auto px-6", shift && "[scrollbar-width:none]")}>
					<motion.div
						className='mx-auto w-full max-w-[728px]'
						// Reopened: it fades in at its top, then glides to its end (above).
						variants={fadeVariants}
						initial={reopened && !prefersReducedMotion ? "initial" : false}
						animate='animate'
						onAnimationComplete={startGlideToEnd}
					>
						<ol aria-label='Conversation' aria-live='polite' className='flex flex-col gap-4'>
							{/* The introduction: first in every concept, in Plan's conversation, 32px above what follows it. */}
							{threadStep === "plan" ? (
								<li className={cn("mb-4", centered && "pe-16")}>
									<AssistantMessage text={sparksIntroduction(user.firstName)} stream={isNew && messages.length === 0} />
								</li>
							) : null}
							{/* Only this step's conversation; the index stays the whole conversation's (quick replies only on the latest). */}
							{messages.map((message, index) =>
								stepOf.get(message.id) !== threadStep || message.id === changing?.answerId ? null : message.from === "user" ? (
									// Dana's messages sit on the right (UserMessage caps itself at 80% of the column).
									// 32px below it, as below Sparks's replies (the list's 16px gap plus mb-4).
									<li
										key={message.id}
										ref={itemRef(message.id)}
										className={cn("mb-4 flex justify-end last:mb-0", centered && "ps-16")}
									>
										{/* Centered, her messages keep 64px clear on the left (664px at most), as Sparks's replies do on the right. Not UserMessage's 80%. */}
										{(() => {
											const ask = changeableAsk(index);
											const text = userMessageText(messages, index);
											if (!ask)
												return (
													<UserMessage className={preview ? undefined : "max-w-full"}>
														{text}
														<MessageFiles files={message.attachments} fromLibrary={message.fromLibrary} spaced={Boolean(text)} />
													</UserMessage>
												);
											// Her answer to a question card: the pencil after it, inside the bubble, on its last line (a long
											// answer wraps), changes it. 20px, centered on the 24px line, so the bubble keeps its height.
											return (
												<UserMessage className={cn("flex items-end gap-2", preview ? undefined : "max-w-full")}>
													<span className='min-w-0'>
														{text}
														<MessageFiles files={message.attachments} fromLibrary={message.fromLibrary} spaced={Boolean(text)} />
													</span>
													<Tooltip>
														<TooltipTrigger asChild>
															<button
																type='button'
																data-change-answer
																aria-label={`Change answer: ${ask.suggestion.question}`}
																onClick={() => {
																	setChanging({ answerId: message.id, replyId: ask.reply.id, answering: false });
																	setDraft("");
																}}
																className='-me-1 mb-0.5 flex size-5 shrink-0 items-center justify-center rounded-sm text-icon-muted outline-none transition-colors hover:text-icon focus-visible:ring-[3px] focus-visible:ring-ring/50 motion-reduce:transition-none [&_svg]:size-4'
															>
																<Pencil aria-hidden />
															</button>
														</TooltipTrigger>
														{/* Above the pencil, not below like the other icon buttons (DESIGN.md → "Changing an answer"). */}
														<TooltipContent side='top' sideOffset={6}>
															Change answer
														</TooltipContent>
													</Tooltip>
												</UserMessage>
											);
										})()}
									</li>
								) : (
									// Sparks's replies keep 32px from what follows them, like the introduction.
									<li
										key={message.id}
										ref={itemRef(message.id)}
										// Centered, Sparks's replies keep 64px clear on the right, as in Figma 27:1932 (664px of the 728px column).
										className={cn("mb-4 last:mb-0", centered && "pe-16")}
										style={
											lastIsNewReply && message === last
												? {
														// No message above it ("Continue"): it fills the view on its own.
														minHeight: Math.max(0, viewHeight - scrollPadding - (sent ? sentHeight : 0)),
														// Room below its end: scrolling down a long reply, she can bring its end up to the middle of
														// the view, and no further.
														paddingBottom: Math.round(viewHeight / 2),
													}
												: undefined
										}
									>
										<SparksReplyView
											narrow={Boolean(preview)}
											reply={message}
											animate={!initialIds.has(message.id) && !settled.current.has(message.id)}
											// While she changes an answer, only that question's replies show (and take Enter).
											showQuickReplies={index === messages.length - 1 && !changing}
											onQuickReply={quickReply}
											onSuggestionEdit={
												onSuggestionEdit ? (part, text) => onSuggestionEdit(message.id, part, text) : undefined
											}
											directionAction={directionAction}
											directionStatus={directionStatus}
											changing={message.id === changing?.replyId ? answerChange : undefined}
										/>
									</li>
								),
							)}
						</ol>
						{/* Reopened (no reply coming in): half the view under the conversation's end, so it can sit in the middle
						    of the view, as a new reply's end can (prds/sparks.md, "The concept workspace"). */}
						{!lastIsNewReply && thread.length ? <div ref={endRef} aria-hidden style={{ height: Math.round(viewHeight / 2) }} /> : null}
					</motion.div>
				</div>
				{/* 24px between the conversation and the message box, outside the scroll area, so text never runs up to the box. */}
				<div className='shrink-0 px-6 pt-6 pb-6'>
					{composerContext ? (
						<div className={cn("mb-2 flex items-center gap-2 text-sm text-foreground", "mx-auto max-w-[728px]")}>
							<span className='flex min-w-0 items-center gap-1.5 rounded-full bg-background-subtle py-1 ps-3 pe-1'>
								<span className='truncate'>{composerContext.label}</span>
								<Button
									variant='ghost'
									size='icon'
									aria-label='Stop pointing'
									className='size-6 rounded-full [&_svg]:size-3.5'
									onClick={composerContext.onClear}
								>
									<X aria-hidden />
								</Button>
							</span>
						</div>
					) : null}
					{/* The browser's file picker. Only the names are kept: nothing is uploaded in the prototype. */}
					<input
						ref={fileInputRef}
						type='file'
						multiple
						accept={attachTypes}
						aria-label='Attach files'
						tabIndex={-1}
						className='hidden'
						onChange={(event) => {
							const picked = [...(event.target.files ?? [])];
							keepImages(picked);
							const names = picked.map((file) => file.name);
							// Cleared, so the same file can be picked again after it's removed.
							event.target.value = "";
							if (!names.length) return;
							if (sendOnPick.current) {
								// Her answer to "Attach files": sent at once, with any files already waiting in the box.
								sendOnPick.current = false;
								onSend?.("", [...files, ...names.filter((name) => !files.includes(name))]);
								setFiles([]);
								return;
							}
							setFiles((current) => [...current, ...names.filter((name) => !current.includes(name))]);
							composerRef.current?.focus();
						}}
					/>
					<LibraryDialog
						open={pickingFromLibrary}
						onOpenChange={setPickingFromLibrary}
						assets={myLibrary?.assets ?? []}
						now={myLibrary?.now}
						items={library?.items ?? []}
						// Sent in the conversation, as files on their own: her answer when Sparks asked for supporting material.
						onAdd={(items) => send("", items)}
						// Back to her message, as the "+" menu.
						onCloseAutoFocus={(event) => {
							event.preventDefault();
							composerRef.current?.focus();
						}}
					/>
					<PromptComposer
						ref={composerRef}
						attachments={files}
						onAttachmentRemove={(index) => setFiles((current) => current.filter((_, i) => i !== index))}
						aria-label='Message Sparks'
						placeholder={
							composerContext?.placeholder ??
							(changing ? "Type your new answer…" : answering ? "Type your answer…" : "Message Sparks…")
						}
						// Controlled, so "Initial prompt" can fill it; it clears on send and on Esc.
						value={draft}
						onChange={(event) => setDraft(event.target.value)}
						suggestion={changing?.answering ? (changeAsk?.suggestion.suggested ?? changeAsk?.suggestion.text) : offeredAnswer}
						onSuggestionAccept={setDraft}
						onCancel={
							// Changing an answer: Esc after "Not quite" opens its card again; otherwise she keeps her answer.
							changing
								? () => {
										setDraft("");
										if (changing.answering) setChanging({ ...changing, answering: false });
										else closeChange();
									}
								: answering && onAnswerCancel
									? () => {
											setDraft("");
											cancelAnswer();
										}
									: undefined
						}
						// sparks.ds "select-prompt-add" (77:6726): attach, add from the library, connect, and the demo's initial prompt.
						addMenu={
							<>
								<DropdownMenuItem onSelect={() => pickFiles()}>
									<Paperclip aria-hidden />
									Attach files
								</DropdownMenuItem>
								{/* A dialog with everything in My library (prds/sparks.md, "Adding from My library"). */}
								<DropdownMenuItem onSelect={() => setPickingFromLibrary(true)}>
									<Folder aria-hidden />
									Add from library
								</DropdownMenuItem>
								<DropdownMenuItem>
									<Zap aria-hidden />
									Add a connection
								</DropdownMenuItem>
								{/* The demo's shortcuts, after a line: the first message, ready to send, the whole of Plan up to
								    the choice, Review, and starting over. */}
								{initialPrompt || onAddPlan || onGoToReview || onResetPrototype ? <DropdownMenuSeparator /> : null}
								{initialPrompt ? (
									<DropdownMenuItem onSelect={() => fillDraft(initialPrompt)}>
										<MessageCircle aria-hidden />
										Initial prompt
									</DropdownMenuItem>
								) : null}
								{onAddPlan ? (
									<DropdownMenuItem onSelect={onAddPlan}>
										<ListChecks aria-hidden />
										Add Plan
									</DropdownMenuItem>
								) : null}
								{onGoToReview ? (
									<DropdownMenuItem onSelect={onGoToReview}>
										<ClipboardCheck aria-hidden />
										Go to Review
									</DropdownMenuItem>
								) : null}
								{/* Starting over, set apart by a line from the shortcuts that move the demo along. */}
								{onResetPrototype && (initialPrompt || onAddPlan || onGoToReview) ? <DropdownMenuSeparator /> : null}
								{onResetPrototype ? (
									<DropdownMenuItem onSelect={onResetPrototype}>
										<RotateCcw aria-hidden />
										Reset prototype
									</DropdownMenuItem>
								) : null}
							</>
						}
						className='mx-auto max-w-[728px]'
						// A new concept: the box is ready for her answer to the introduction's question.
						autoFocus={messages.length === 0}
						onSubmit={(text) => {
							// While she changes an answer, what she types is her new answer, in her words.
							// Only files: her answer stays as it was.
							if (changing && text.trim()) finishChange(text, true);
							else {
								if (changing) closeChange();
								send(text);
							}
							setDraft("");
						}}
					/>
				</div>
			</div>
			{/* Between steps, the panel on the right gliding from one place to the other, behind what's in it (`trading`). */}
			{gliding ? <div ref={glidingPanelRef} aria-hidden className='absolute top-0 right-6 bottom-6 rounded-card bg-background-subtle' /> : null}
			{/* Plan → Prototype: the preview keeps its final width (pushed in from the right as the conversation narrows) and
			    fades in. Between other steps, the one she leaves fades out on top of the one coming in (`trading`). */}
			<AnimatePresence initial={false} mode='popLayout' custom={Boolean(trading)}>
			{preview ? (
				<PreviewLayer
					key={layerId}
					style={narrowing && split && shift ? { width: shift.mainWidth - conversationWidth, flex: "none" } : undefined}
					// Without a conversation (Evaluate, Figma 72:660), 24px on each side and below.
					className={cn("relative flex min-h-0 min-w-0 flex-1 flex-col pb-6", layout === "panels" ? "px-6" : cn("pr-6", conversationHidden && "ps-6"))}
				>
					<motion.div initial={narrowing ? { opacity: 0 } : false} animate={{ opacity: 1 }} transition={easeOutTransition} className='flex min-h-0 flex-1 flex-col'>
						<div data-layer-content className='flex min-h-0 flex-1 flex-col'>
							{preview}
						</div>
					</motion.div>
				</PreviewLayer>
			) : null}
			</AnimatePresence>
			</main>
		</div>
			{/* Comments or Library, on the right edge, the screen's full height; it slides in (fades, with reduced motion). From one
			    to the other, the column stays (the aside carries the panel's border and gray, so nothing behind shows through) and
			    its content crossfades: the one leaving fades out, then the other fades in (MOTION.md → "Side panels"). */}
			<AnimatePresence initial={false}>
				{sidePanel ? (
					<motion.aside
						key='side-panel'
						aria-label={commentsOpen ? "Comments" : "Library"}
						variants={prefersReducedMotion ? overlayVariants : panelVariants}
						initial='initial'
						animate='animate'
						exit='exit'
						className='relative flex h-full shrink-0 flex-col border-s border-border bg-[color-mix(in_srgb,var(--background-subtle)_50%,var(--background))]'
						style={{ width: sidePanelWidth }}
					>
						<SidePanelResizer width={sidePanelWidth} onWidthChange={setSidePanelWidth} label={commentsOpen ? "Resize comments" : "Resize library"} />
						<AnimatePresence initial={false} mode='wait'>
						<motion.div
							key={libraryOpen && library ? "library" : "comments"}
							variants={prefersReducedMotion ? undefined : fadeVariants}
							initial='initial'
							animate='animate'
							exit='exit'
							className='flex min-h-0 flex-1 flex-col'
						>
						{libraryOpen && library ? (
							<LibraryPanel items={library.items} onAdd={library.onAdd} onRemove={library.onRemove} images={images} onFilesPicked={keepImages} onClose={closeLibrary} autoFocus />
						) : (
						<CommentsPanel
							reviewers={comments?.reviewers ?? []}
							unread={comments?.unread}
							onRead={comments?.onRead}
							prototypeComments={comments?.prototype}
							onOpenPrototypeComment={comments?.onOpenPrototypeComment}
							ideaComments={comments?.idea}
							onOpenIdeaComment={comments?.onOpenIdeaComment}
onClose={closeComments}
							autoFocus
						/>
						)}
						</motion.div>
						</AnimatePresence>
					</motion.aside>
				) : null}
			</AnimatePresence>
		</div>
	);
}

export {
	SparksWorkspace,
	type SparksWorkspaceProps,
	type SparksMessage,
	type SparksUserMessage,
	type SparksReply,
	type SparksReplyPart,
	type SparksSuggestion,
};
