import * as React from "react";
import { CircleAlert, CircleCheck, Pencil } from "lucide-react";
import { motion } from "motion/react";

import { AssistantMessage } from "@/components/chat/assistant-message";
import { Button } from "@/components/buttons/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/overlays/tooltip";
import { Typography } from "@/components/typography/typography";
import { fadeVariants, revealVariants, useMotionPreference } from "@/lib/motion";
import { cn } from "@/lib/utils";

/*
 * Review's next step, at the top of the idea for review (prds/sparks-review.md, "Review's screen"): what Dana does there,
 * one thing at a time, since Review has no conversation: checking it before publishing, the reviews and what Sparks
 * would change, her recommendation, the decision. Only she sees it: the teams get the idea under it.
 */

/** One line of Sparks's check before an advanced idea goes to the team who builds it, with a fix when it isn't done. */
type ReadyCheck = { label: string; done: boolean; fix?: string };

/**
 * Something the team who builds it flagged as unclear once it advanced (prds/sparks-review.md, "Something unclear after
 * it advances"): who, what they asked, the acceptance criterion as it is, and the clarification Sparks proposes, hers
 * to edit, make or leave for now. Nothing changes until she makes it.
 */
type BuildFlag = {
	/** "Jordan Lee, from your product team". */
	who: string;
	text: string;
	criterion: string;
	suggestion: string;
	/** Where Sparks took the clarification from. */
	why: string;
	edited: boolean;
	onChange: (text: string) => void;
	onMake: () => void;
	onSkip: () => void;
	/** What she did with it. */
	outcome?: "made" | "skipped";
};

/** What Review is waiting for, with what she can do about it. */
type ReviewNext =
	/**
	 * Before publishing: the version that goes out. No box: "Share" and "Publish" in the header are the next step (what's
	 * shared and who it goes to are in "Publish"'s popover).
	 */
	| { kind: "publish"; version: number }
	/** Published: waiting for the teams' views. `stale`: the version now, when they see an earlier one. */
	| { kind: "in-review"; version: number; stale?: number }
	/** Every view is in: what they say, by topic, and what Sparks would change. */
	| { kind: "reviews"; verdict: string; topics: string[]; proposals: string[]; onMake: () => void; onSkip: () => void }
	/** The reviews are dealt with: she asks for a decision when she's ready. `done`: what "Make the changes" did. */
	| { kind: "ask"; done?: string; stale?: { seen: number; now: number }; owner: string; onDraft: () => void }
	/** The recommendation Sparks drafted, hers to edit, then submit. */
	| { kind: "recommendation"; text: string; edited: boolean; owner: string; open: number; onChange: (text: string) => void; onSubmit: () => void }
	| { kind: "waiting"; owner: string }
	| {
			kind: "decided";
			decision: "advance" | "iterate-validate" | "iterate-choice";
			owner: string;
			reason: string;
			/** Who Sparks would share an advanced idea with, in a sentence. */
			departments: string;
			/** Her product team, who builds it: suggested first. */
			team: string;
			/** Advanced: Sparks's check that it's ready to build (prds/sparks-review.md, "Ready to build"). */
			ready?: ReadyCheck[];
			/** Advanced and shared: something the team who builds it flagged as unclear, with Sparks's fix. */
			flag?: BuildFlag;
			shared: boolean;
			onShare: () => void;
			onEvaluate: () => void;
			onBackToChoice: () => void;
	  };

/**
 * Sparks's check before the team builds it: each line done (a check) or not (with its fix). None of them stops her from
 * sharing it; the team sees the same lines. Shared with `PublishedIdea`'s advanced view.
 */
function ReadyToBuild({ checks, title = "Before your team builds it" }: { checks: ReadyCheck[]; title?: string }) {
	return (
		<div className='flex flex-col gap-2'>
			<p className='text-base font-medium text-foreground'>{title}</p>
			<ul className='flex flex-col gap-2'>
				{checks.map((check) => (
					<li key={check.label} className='flex items-start gap-2 text-base'>
						{check.done ? (
							<CircleCheck aria-hidden className='mt-0.5 size-4 shrink-0 text-success' />
						) : (
							<CircleAlert aria-hidden className='mt-0.5 size-4 shrink-0 text-warning' />
						)}
						<span className='flex flex-col gap-0.5'>
							<span className='text-foreground'>
								<span className='sr-only'>{check.done ? "Done: " : "Still open: "}</span>
								{check.label}
							</span>
							{check.fix ? <span className='text-sm text-muted-foreground'>{check.fix}</span> : null}
						</span>
					</li>
				))}
			</ul>
		</div>
	);
}

/** Something flagged as unclear after it advanced, and Sparks's fix: make it, edit it first, or leave it for now. */
function BuildFlagFix({ flag }: { flag: BuildFlag }) {
	const first = flag.who.split(" ")[0];
	return (
		<div className='flex flex-col gap-3 border-t border-border pt-3'>
			<Title>{flag.who} flagged something as unclear</Title>
			<p className='text-base text-foreground'>"{flag.text}"</p>
			<p className={note}>On the acceptance criterion: "{flag.criterion}"</p>
			{flag.outcome === "made" ? (
				<p className='text-base text-foreground'>
					Done. It now reads: "{flag.suggestion}" {first} sees it's been addressed, and how, and everyone it's shared with sees the new wording.
				</p>
			) : flag.outcome === "skipped" ? (
				<p className='text-base text-foreground'>Okay. It stays in Comments, flagged as unclear, until you answer it.</p>
			) : (
				<>
					<p className='text-base font-medium text-foreground'>I'd say it this way:</p>
					<EditableDraft label='Acceptance criterion' text={flag.suggestion} onChange={flag.onChange} />
					<p className={note}>{flag.edited ? "Edited by you." : flag.why} It changes this criterion only; nothing else in the idea changes.</p>
					<div className='flex flex-wrap gap-2'>
						<NextButton onClick={flag.onMake}>Make the change</NextButton>
						<NextButton onClick={flag.onSkip}>Not now</NextButton>
					</div>
				</>
			)}
		</div>
	);
}

/** The same button for everything she can do here: outlined, 36px (the step's dark one is "Publish", in the header). */
function NextButton(props: React.ComponentProps<typeof Button>) {
	return <Button variant='outline' {...props} />;
}

function Title({ children }: { children: React.ReactNode }) {
	return (
		<Typography as='h3' size='lg' weight='semibold' className='text-foreground-prominent'>
			{children}
		</Typography>
	);
}

/** Her words, as Sparks drafted them: a pen opens the field (Enter saves, Shift+Enter adds a line, Esc cancels). */
function EditableDraft({ label, text, onChange }: { label: string; text: string; onChange: (text: string) => void }) {
	const [value, setValue] = React.useState<string>();
	const penRef = React.useRef<HTMLButtonElement>(null);
	const close = (save?: boolean) => {
		if (save && value?.trim()) onChange(value.trim());
		setValue(undefined);
		requestAnimationFrame(() => penRef.current?.focus());
	};
	if (value === undefined)
		return (
			<div className='flex items-start gap-2'>
				<p className='min-w-0 flex-1 text-base whitespace-pre-line text-foreground'>{text}</p>
				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							ref={penRef}
							variant='ghost'
							size='icon'
							aria-label={`Edit ${label.toLowerCase()}`}
							className='-mt-2 shrink-0 text-icon [&_svg]:size-[18px]'
							onClick={() => setValue(text)}
						>
							<Pencil aria-hidden />
						</Button>
					</TooltipTrigger>
					<TooltipContent side='bottom' sideOffset={6}>
						Edit
					</TooltipContent>
				</Tooltip>
			</div>
		);
	return (
		<div className='flex flex-col gap-2'>
			<textarea
				aria-label={label}
				value={value}
				autoFocus
				// The caret at the end, to go on from what's there.
				onFocus={(event) => event.currentTarget.setSelectionRange(event.currentTarget.value.length, event.currentTarget.value.length)}
				rows={Math.max(3, Math.ceil(value.length / 70))}
				onChange={(event) => setValue(event.target.value)}
				onKeyDown={(event) => {
					if (event.key === "Escape") close();
					if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
						event.preventDefault();
						close(true);
					}
				}}
				className='w-full resize-none rounded-input border border-border bg-background px-[11px] py-[7px] text-base text-foreground outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50'
			/>
			<div className='flex justify-end gap-2'>
				<NextButton onClick={() => close()}>Cancel</NextButton>
				<NextButton onClick={() => close(true)}>Save</NextButton>
			</div>
		</div>
	);
}

const note = "text-sm text-muted-foreground";
const list = "flex list-disc flex-col gap-1 ps-6 text-base text-foreground";

/** One next step, with no box around it (a part of the tab, a line under it, as the idea's parts): it comes in (Reveal) as Review moves on, and is announced. */
function ReviewNextStep({ next, className }: { next: ReviewNext; className?: string }) {
	const { prefersReducedMotion } = useMotionPreference();
	const [first] = React.useState(next.kind);
	// The button she used went with its step: focus stays here, on the new one.
	const ref = React.useRef<HTMLElement>(null);
	React.useEffect(() => {
		if (next.kind !== first && document.activeElement === document.body) ref.current?.focus({ preventScroll: true });
	}, [next.kind, first]);
	const body = (() => {
		switch (next.kind) {
			case "publish":
				return null;
			case "in-review":
				return (
					<>
						<Title>The teams have it</Title>
						<p className='text-base text-foreground'>
							They see version {next.version} of your idea and its prototype, and have the invitation. Their feedback shows here and in Comments as it comes in.
						</p>
						{next.stale ? <p className={note}>Your prototype is at version {next.stale} now. When you want them to see it, select "Publish update".</p> : null}
					</>
				);
			case "reviews":
				return (
					<>
						<Title>The reviews are in</Title>
						<p className='text-base text-foreground'>{next.verdict}</p>
						<AssistantMessage text={next.topics.map((topic) => `- ${topic}`).join("\n")} />
						<Title>What Sparks would change</Title>
						<ul className={list}>
							{next.proposals.map((proposal) => (
								<li key={proposal}>{proposal}</li>
							))}
						</ul>
						<div className='flex flex-wrap gap-2'>
							<NextButton onClick={next.onMake}>Make the changes</NextButton>
							<NextButton onClick={next.onSkip}>Not now</NextButton>
						</div>
					</>
				);
			case "ask":
				return (
					<>
						<Title>Ready to ask for a decision?</Title>
						{next.done ? <p className='text-base text-foreground'>{next.done}</p> : null}
						{next.stale ? (
							<p className='text-base text-foreground'>
								The teams still see version {next.stale.seen}. Select "Publish update" when you want them to see version {next.stale.now}.
							</p>
						) : null}
						<p className='text-base text-foreground'>
							Sparks drafts your recommendation for {next.owner}. Or keep working, publish updates as you go, and ask when you're ready.
						</p>
						<div>
							<NextButton onClick={next.onDraft}>Draft my recommendation</NextButton>
						</div>
					</>
				);
			case "recommendation":
				return (
					<>
						<Title>Your recommendation</Title>
						<EditableDraft label='Recommendation' text={next.text} onChange={next.onChange} />
						<p className={note}>
							{next.edited ? "Edited by you. " : "Drafted by Sparks. It's yours: change it if you'd say it differently. "}
							It goes to {next.owner}, with the idea and the reviews. Still open, and listed for them: {next.open} known issues and gaps.
						</p>
						<div>
							<NextButton onClick={next.onSubmit}>Submit it</NextButton>
						</div>
					</>
				);
			case "waiting":
				return (
					<>
						<Title>Sent to {next.owner}</Title>
						<p className='text-base text-foreground'>With the idea, the reviews and your recommendation. The decision shows here as soon as there's one.</p>
					</>
				);
			case "decided":
				return (
					<>
						<Title>
							{next.decision === "advance"
								? `${next.owner} advanced it`
								: next.decision === "iterate-validate"
									? `${next.owner} asked to iterate`
									: `${next.owner} asked to go back to the choice`}
						</Title>
						<p className='text-base text-foreground'>"{next.reason}"</p>
						{next.decision === "advance" ? (
							<>
								<p className='text-base text-foreground'>
									It's in Decisions, and what you learned is now in Previous experiments, so the next person with a similar idea starts from it.
								</p>
								{next.ready?.length ? <ReadyToBuild checks={next.ready} /> : null}
								{next.shared ? (
									<p className='text-base text-foreground'>
										Shared with {next.team}, who'll build it, and {next.departments}, without edit rights. It opens for them on what to build, next to the prototype,
										with the decisions and every reason behind them after it.
									</p>
								) : null}
								{next.shared && next.flag ? <BuildFlagFix flag={next.flag} /> : null}
								{next.shared ? null : (
									<>
										<p className='text-base text-foreground'>
											Share it with {next.team}, who'll build it, and the teams who'll carry it forward: {next.departments}. They'll see it without edit rights, and
											without your conversation with Sparks. It opens for them on what to build. Or use "Share" at the top whenever you're ready.
										</p>
										<div>
											<NextButton onClick={next.onShare}>Share it with them</NextButton>
										</div>
									</>
								)}
							</>
						) : next.decision === "iterate-validate" ? (
							<>
								<p className='text-base text-foreground'>It's in Decisions. The idea goes back to Evaluate, with that reason first.</p>
								<div>
									<NextButton onClick={next.onEvaluate}>Evaluate it</NextButton>
								</div>
							</>
						) : (
							<>
								<p className='text-base text-foreground'>
									It's in Decisions. The idea goes back to the choice in Plan, with that reason first. What you learned from this prototype and its evaluation stays
									in your plan.
								</p>
								<div>
									<NextButton onClick={next.onBackToChoice}>Go back to the choice</NextButton>
								</div>
							</>
						)}
					</>
				);
		}
	})();
	return (
		<section ref={ref} tabIndex={-1} role='status' aria-label='Next step' className={cn("outline-none", className)}>
			<motion.div
				key={next.kind}
				variants={prefersReducedMotion ? fadeVariants : revealVariants}
				initial={next.kind === first ? false : "initial"}
				animate='animate'
				className='flex flex-col gap-3'
			>
				{body}
			</motion.div>
		</section>
	);
}

export { ReadyToBuild, ReviewNextStep, type BuildFlag, type ReadyCheck, type ReviewNext };
