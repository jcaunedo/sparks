import * as React from "react";
import { ArrowLeft, Bell, ChevronDown, FlaskConical, Folder, ListChecks, MessageCircle, MousePointerClick, Paperclip, Pencil, Users, X, Zap } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { ActivityFeed } from "@/components/chat/activity-feed";
import { AssistantMessage } from "@/components/chat/assistant-message";
import { ClarificationCard } from "@/components/chat/clarification-card";
import { Badge } from "@/components/data-display/badge";
import { UserMessage } from "@/components/chat/user-message";
import { PromptComposer } from "@/components/chat/prompt-composer";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/overlays/dropdown-menu";
import { QuickReplies } from "@/components/chat/quick-replies";
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
	motionDuration,
	overlayVariants,
	panelVariants,
	revealVariants,
	scrollContainerOf,
	scrollIntoViewSmoothly,
	scrollMetrics,
	useMotionPreference,
} from "@/lib/motion";

import type { AutoPartsHubUser } from "../../autopartshub";
import type { Reviewer } from "../review/review-panel";
import { BriefCard, type BriefDraft } from "../plan/brief-card";
import { ChosenCard, type ChosenDraft } from "../plan/chosen-card";
import { ProblemCard, type ProblemDraft } from "../plan/problem-card";
import { DirectionCard, type DirectionDraft } from "../plan/direction-card";
import { SuccessCard, type SuccessDraft } from "../plan/success-card";
import { sparksSteps, type SparksStep } from "../shared/steps";
import type { IdeaComment } from "../review/review-panel";
import type { PrototypeComment } from "../prototype/prototype-comments";
import { CommentsPanel } from "./comments-panel";
import { SidePanelResizer, useSidePanelWidth } from "./side-panel";
import { directionActionFor, type DirectionPaths } from "./plan-parts";
import { SharePopover, type SharePopoverProps } from "./share-popover";
import { HeaderIconButton } from "../../header-icon-button";
import { NotificationsPopover, type NotificationsPopoverProps } from "../../notifications-popover";

/** One of Dana's messages, as she wrote it, line breaks included. */
type SparksUserMessage = {
	id: string;
	from: "user";
	text: string;
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
	changing,
}: {
	reply: SparksReply;
	animate: boolean;
	showQuickReplies: boolean;
	onQuickReply?: (text: string) => void;
	onSuggestionEdit?: (part: string, text: string) => void;
	/** A direction card's call to action ("Generate prototype", "Open prototype"). */
	directionAction?: ReturnType<typeof directionActionFor>;
	/** She's changing her answer to this reply's question: its card opens again (prds/sparks.md, "Changing an answer"). */
	changing?: AnswerChange;
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
					    last with the ↵ key, and Enter picks it. */}
					<QuickReplies replies={reply.quickReplies} onReply={onQuickReply} />
				</motion.div>
			) : null}
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
	onSend?: (text: string) => void;
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
	/** The "+" menu's "Add from library": opens the AutoPartsHUB home on "My library". */
	onAddFromLibrary?: () => void;
	/**
	 * "Comments" in the header: it opens the Comments panel with the reviewers' feedback (`reviewers`, empty before Review).
	 * `unread`: the reviewers whose feedback she hasn't opened; the button and each of them show the dot. `onRead`: she
	 * opened one's comment.
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
	 * What her next message is about, shown above the message box with a way to clear it: the element she pointed at in
	 * the prototype ("Pointing at the "Save vehicle" button"). The box takes focus, with `placeholder` as its hint.
	 */
	composerContext?: { label: string; placeholder?: string; onClear: () => void };
	/**
	 * "Share" in the header, in every step (shown when given): it opens the share popover, with who has access, a field to
	 * add a person or a department, and "Copy link" (prds/sparks.md, "Sharing a concept").
	 */
	share?: Omit<SharePopoverProps, "children">;
	/**
	 * The directions as paths in the prototype (prds/sparks-plan-compare.md, "Directions in the plan"): the ones
	 * built, the one shown, and what a direction card's "Generate prototype" and "Open prototype" do.
	 */
	paths?: DirectionPaths;
	/**
	 * Starts the step after the one reached, from its empty state, once it can start (prds/sparks.md, "Steps"): e.g.
	 * "Evaluate the prototype" once the prototype is built, beside "Back to Prototype". Without it, only "Back to …".
	 */
	nextStepAction?: { label: string; onClick: () => void };
	/**
	 * "Publish" in the header, after Share (prds/sparks-review.md, "Publishing"): gives the teams who review a fixed copy
	 * of the idea and its prototype. `label`: "Publish", "Publish update" once she's changed it since, "Published" when
	 * they have the latest. `hint`: why it can't be selected now (a tooltip), e.g. before there's a prototype.
	 */
	publish?: { label: string; onClick?: () => void; disabled?: boolean; hint?: string };
	/**
	 * "All ideas" in the menu on the concept's name: closes the concept, back to the Sparks start page in the same tab
	 * (prds/sparks.md, "The concept workspace").
	 */
	onClose?: () => void;
	/** "Rename" in the menu on the concept's name: she saved a new name (the header shows it right away). */
	onRename?: (name: string) => void;
};

/** The icon on a step's empty state, before Dana gets there. Product artwork. */
const upcomingIcons = { prototype: MousePointerClick, validate: FlaskConical, review: Users } as const;


/**
 * The header's outlined button, Share: Figma's Button Outlined lg · 36, its label alone (sparks.ds "Sparks Project",
 * 39:1608: 14px each side, sm semibold), no icon.
 */
const headerButtonClasses = "rounded-button-lg px-3.5 text-sm font-semibold text-foreground shadow-xs";

/**
 * The concept's name in its header (sparks.ds "Sparks Project", 79:7175): xl semibold (20/30), `foreground`, with a 22px chevron, 4px after it, opening a menu:
 * "Rename" turns the name into a field (Enter or leaving it saves, Esc cancels), "All ideas" goes back to the start
 * page.
 */
function ConceptName({ name, onRename, onClose }: { name: string; onRename?: (name: string) => void; onClose?: () => void }) {
	const [shown, setShown] = React.useState(name);
	const [editing, setEditing] = React.useState(false);
	const triggerRef = React.useRef<HTMLButtonElement>(null);
	React.useEffect(() => setShown(name), [name]);

	const finish = (value?: string) => {
		const next = value?.trim();
		if (next && next !== shown) {
			setShown(next);
			onRename?.(next);
		}
		setEditing(false);
		requestAnimationFrame(() => triggerRef.current?.focus());
	};

	if (editing) {
		return (
			<input
				aria-label='Idea name'
				defaultValue={shown}
				autoFocus
				onFocus={(event) => event.currentTarget.select()}
				onBlur={(event) => finish(event.currentTarget.value)}
				onKeyDown={(event) => {
					if (event.key === "Enter") finish(event.currentTarget.value);
					if (event.key === "Escape") finish();
				}}
				className='h-10 min-w-0 flex-1 rounded-input border border-input-ring bg-background px-2 font-display text-xl font-semibold text-foreground outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50'
			/>
		);
	}
	return (
		<Typography as='h1' size='xl' weight='semibold' className='min-w-0 text-foreground'>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<button
						ref={triggerRef}
						type='button'
						className='flex max-w-full items-center gap-1 rounded-md outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50'
					>
						<span className='truncate'>{shown}</span>
						<ChevronDown aria-hidden className='size-[22px] shrink-0 text-icon' />
					</button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align='start' sideOffset={8} onCloseAutoFocus={(event) => editing && event.preventDefault()}>
					<DropdownMenuItem onSelect={() => setEditing(true)}>
						<Pencil aria-hidden />
						Rename
					</DropdownMenuItem>
					<DropdownMenuItem onSelect={onClose}>
						<ArrowLeft aria-hidden />
						All ideas
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</Typography>
	);
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
	onAddFromLibrary,
	comments,
	notifications,
	onStepSelect,
	preview: previewProp,
	composerContext,
	share,
	paths,
	nextStepAction,
	publish,
	onClose,
	onRename,
}: SparksWorkspaceProps) {
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
	const threadStep = currentStep;
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

	// A conversation that opens with history (a concept reopened, or "Add Plan") starts at its latest reply, where she
	// left off, not at the introduction.
	React.useLayoutEffect(() => {
		const latest = threadLast ? itemRefs.current.get(threadLast.id) : undefined;
		if (latest) scrollIntoViewSmoothly(latest, { reducedMotion: true, align: "start" });
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
	const itemRef = (id: string) => (element: HTMLLIElement | null) => {
		if (element) itemRefs.current.set(id, element);
		else itemRefs.current.delete(id);
	};

	const send = (text: string) => onSend?.(text);
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

	// A direction's call to action on its card.
	const directionAction = directionActionFor(messages, paths);
	// Comments: the reviewers' feedback and her comments on the prototype, 480px on the right in every step (DESIGN.md →
	// "Side panels share one frame"); with no preview, the conversation stays centered in the rest. It opens only from
	// "Comments", and takes focus.
	const [commentsOpen, setCommentsOpen] = React.useState(false);
	// Its width: 380px to start, dragged from its left edge between 300px and half the window; kept while it's closed.
	const [commentsWidth, setCommentsWidth] = useSidePanelWidth();
	const commentsButtonRef = React.useRef<HTMLButtonElement>(null);
	const closeComments = () => {
		setCommentsOpen(false);
		commentsButtonRef.current?.focus();
	};
	// A step not reached yet, selected to see what it is: its empty state takes the preview's place until she goes back
	// (prds/sparks.md, "Steps"). The step she's on doesn't change.
	const [peekStep, setPeekStep] = React.useState<SparksStep>();
	React.useEffect(() => setPeekStep(undefined), [currentStep]);
	const peeked = sparksSteps.find((step) => step.id === peekStep);
	const currentLabel = sparksSteps.find((step) => step.id === currentStep)?.label ?? "";
	// A step not reached yet (its empty state): no conversation, no message box.
	const conversationHidden = Boolean(peeked?.upcoming);
	const preview = peeked?.upcoming ? (
		<section aria-label={peeked.label} className='flex min-h-0 flex-1 flex-col rounded-card bg-background-subtle p-4'>
			<EmptyState
				className='flex-1'
				icon={React.createElement(upcomingIcons[peeked.id as keyof typeof upcomingIcons], {
					"aria-hidden": true,
					className: "size-8 text-icon-muted",
				})}
				title={peeked.upcoming.title}
				description={peeked.upcoming.description}
				// The next step, once it can start (Evaluate, with the prototype built): its action, and "Back to …" beside it.
				{...(nextStepAction && sparksSteps.findIndex((step) => step.id === peeked.id) === reachedIndex + 1
					? {
							buttonLabel: nextStepAction.label,
							buttonProps: {
								onClick: () => {
									setPeekStep(undefined);
									nextStepAction.onClick();
								},
							},
							secondaryButtonLabel: `Back to ${currentLabel}`,
							secondaryButtonProps: { onClick: () => setPeekStep(undefined) },
						}
					: { buttonLabel: `Back to ${currentLabel}`, buttonProps: { onClick: () => setPeekStep(undefined) } })}
			/>
		</section>
	) : (
		previewProp
	);
	const centered = !preview;

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
			{/* sparks.ds "header-autopartshub" → "Sparks Project" (32:1145): the concept's name alone on the left (xl semibold,
			    its menu on the chevron), the steps centered, the actions on the right. No logo, no back button, no avatar
			    (DESIGN.md → "Sparks Project header"). */}
			<AppHeader
				logo={
					// Figma "Left": the concept's name with its menu; "All ideas" there goes back to the start page.
					<ConceptName name={conceptName} onRename={onRename} onClose={onClose} />
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
				{/* Figma "Right" (sparks.ds "Sparks Project", 32:1145): Comments, notifications, then Share. No "Blueprint": Plan
				    stays the conversation once it's done (prds/sparks.md, "The finished plan"). No close button: "All ideas" goes
				    back to the start page. */}
				<HeaderIconButton
					ref={commentsButtonRef}
					label='Comments'
					dot={Boolean(comments?.unread?.length)}
					aria-expanded={commentsOpen}
					onClick={() => (commentsOpen ? closeComments() : setCommentsOpen(true))}
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
					<SharePopover {...share}>
						<Button variant='outline' className={headerButtonClasses}>
							Share
						</Button>
					</SharePopover>
				) : null}
				{/* "Publish", last (sparks.ds "Sparks Project" with Publish): Button Solid · Neutral lg · 36, the header's
				    button sizes. Share is for people working on the idea with her (the live version); Publish is for the teams
				    who review and decide (a fixed version). Unavailable, it says why in a tooltip (a disabled button gets no
				    hover, so the tooltip sits on a wrapper that takes focus). */}
				{publish ? (
					publish.disabled && publish.hint ? (
						<Tooltip>
							<TooltipTrigger asChild>
								<span tabIndex={0} className='rounded-button-lg outline-none focus-visible:ring-2 focus-visible:ring-ring'>
									<Button variant='neutral' disabled className={cn(headerButtonClasses, "text-neutral-foreground")}>
										{publish.label}
									</Button>
								</span>
							</TooltipTrigger>
							<TooltipContent side='bottom' sideOffset={6}>
								{publish.hint}
							</TooltipContent>
						</Tooltip>
					) : (
						<Button
							variant='neutral'
							disabled={publish.disabled}
							onClick={publish.onClick}
							className={cn(headerButtonClasses, "text-neutral-foreground")}
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
			<main className='flex min-h-0 flex-1'>
			{/* Hidden, not removed, while a step not reached yet shows its empty state: the scroll position stays. */}
			{/* Beside a preview, the narrow column's text is 15px instead of 16px: messages, cards and the message box (every
			    `text-base` inside it; DESIGN.md → "The conversation beside a preview is 15px"). */}
			<div
				className={cn(
					"flex min-h-0 flex-col",
					preview ? "w-[480px] shrink-0 [&_.text-base]:text-[15px]" : "min-w-0 flex-1",
					conversationHidden && "hidden",
				)}
			>
				<div ref={scrollRef} className='scrollbar-subtle min-h-0 flex-1 overflow-y-auto px-8'>
					<div className='mx-auto w-full max-w-[728px]'>
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
											if (!ask) return <UserMessage className={preview ? undefined : "max-w-full"}>{text}</UserMessage>;
											// Her answer to a question card: the pencil after it, inside the bubble, on its last line (a long
											// answer wraps), changes it. 20px, centered on the 24px line, so the bubble keeps its height.
											return (
												<UserMessage className={cn("flex items-end gap-2", preview ? undefined : "max-w-full")}>
													<span className='min-w-0'>{text}</span>
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
											reply={message}
											animate={!initialIds.has(message.id) && !settled.current.has(message.id)}
											// While she changes an answer, only that question's replies show (and take Enter).
											showQuickReplies={index === messages.length - 1 && !changing}
											onQuickReply={send}
											onSuggestionEdit={
												onSuggestionEdit ? (part, text) => onSuggestionEdit(message.id, part, text) : undefined
											}
											directionAction={directionAction}
											changing={message.id === changing?.replyId ? answerChange : undefined}
										/>
									</li>
								),
							)}
						</ol>
					</div>
				</div>
				{/* 24px between the conversation and the message box, outside the scroll area, so text never runs up to the box. */}
				<div className='shrink-0 px-8 pt-6 pb-6'>
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
					<PromptComposer
						ref={composerRef}
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
								<DropdownMenuItem>
									<Paperclip aria-hidden />
									Attach
								</DropdownMenuItem>
								{/* Opens "My library" on the AutoPartsHUB home (prds/sparks.md, "The message box"). */}
								<DropdownMenuItem onSelect={onAddFromLibrary}>
									<Folder aria-hidden />
									Add from library
								</DropdownMenuItem>
								<DropdownMenuItem>
									<Zap aria-hidden />
									Connect
								</DropdownMenuItem>
								{/* The demo's shortcuts, after a line: the first message, ready to send, and the whole of Plan up to the choice. */}
								{initialPrompt || onAddPlan ? <DropdownMenuSeparator /> : null}
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
							</>
						}
						className='mx-auto max-w-[728px]'
						// A new concept: the box is ready for her answer to the introduction's question.
						autoFocus={messages.length === 0}
						onSubmit={(text) => {
							// While she changes an answer, what she types is her new answer, in her words.
							if (changing) finishChange(text, true);
							else send(text);
							setDraft("");
						}}
					/>
				</div>
			</div>
			{preview ? <div className={cn("flex min-h-0 min-w-0 flex-1 flex-col pr-8 pb-6", conversationHidden && "ps-8")}>{preview}</div> : null}
			</main>
		</div>
			{/* The Comments panel, on the right edge, 480px, the screen's full height; it slides in (fades, with reduced motion). */}
			<AnimatePresence initial={false}>
				{commentsOpen ? (
					<motion.aside
						key='comments'
						aria-label='Comments'
						variants={prefersReducedMotion ? overlayVariants : panelVariants}
						initial='initial'
						animate='animate'
						exit='exit'
						className='relative flex h-full shrink-0 flex-col'
						style={{ width: commentsWidth }}
					>
						<SidePanelResizer width={commentsWidth} onWidthChange={setCommentsWidth} label='Resize comments' />
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
