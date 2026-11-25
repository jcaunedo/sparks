import * as React from "react";
import { Pencil } from "lucide-react";
import { motion } from "motion/react";

import { AssistantMessage } from "@/components/chat/assistant-message";
import { Button } from "@/components/buttons/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/overlays/tooltip";
import { Typography } from "@/components/typography/typography";
import { fadeVariants, revealVariants, useMotionPreference } from "@/lib/motion";
import { cn } from "@/lib/utils";

/*
 * Review's next step, at the top of the idea for review (prds/sparks-review.md, "Review's screen"): what Dana does there,
 * one thing at a time, since Review has no conversation: who reviews it and the invitation, the reviews and what Sparks
 * would change, her recommendation, the decision. Only she sees it: the teams get the idea under it.
 */

/** What Review is waiting for, with what she can do about it. */
type ReviewNext =
	/** Before publishing: who reviews it, the invitation (hers to edit), and what publishing gives them. */
	| {
			kind: "publish";
			version: number;
			teams: { id: string; department: string; evaluates: string }[];
			invitation: string;
			onInvitationChange: (text: string) => void;
			/** Who gets it, in a sentence: "the UX team, engineering, stores and the catalog team". */
			goesTo: string;
			/** Evaluate was skipped: run it first. */
			onEvaluate?: () => void;
	  }
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
			shared: boolean;
			onShare: () => void;
			onEvaluate: () => void;
			onBackToChoice: () => void;
	  };

/** The same button for everything she can do here: outlined, 36px (the step's dark one is "Publish", in the header). */
function NextButton(props: React.ComponentProps<typeof Button>) {
	return <Button variant='outline' {...props} />;
}

function Title({ children }: { children: React.ReactNode }) {
	return (
		<Typography as='h3' size='base' weight='semibold' className='text-foreground-prominent'>
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
				<p className='min-w-0 flex-1 text-sm whitespace-pre-line text-foreground'>{text}</p>
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
				className='w-full resize-none rounded-input border border-border bg-background px-[11px] py-[7px] text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50'
			/>
			<div className='flex justify-end gap-2'>
				<NextButton onClick={() => close()}>Cancel</NextButton>
				<NextButton onClick={() => close(true)}>Save</NextButton>
			</div>
		</div>
	);
}

const note = "text-sm text-muted-foreground";
const list = "flex list-disc flex-col gap-1 ps-6 text-sm text-foreground";

/**
 * "Publishing it", a part of the idea only Dana sees, before she publishes: who reviews it and what each evaluates, the
 * invitation (hers to edit) and what publishing gives them.
 */
function PublishingPart({ next }: { next: Extract<ReviewNext, { kind: "publish" }> }) {
	const label = "text-sm font-medium text-foreground";
	return (
		<section aria-label='Publishing it' data-part='Publishing it' className='flex flex-col gap-2 border-t border-border pt-4'>
			<Title>Publishing it</Title>
			<p className={note}>Only you see this part.</p>
			<p className={label}>Who reviews it</p>
			<ul className={list}>
				{next.teams.map((team) => (
					<li key={team.id}>
						<span className='font-medium'>{team.department}:</span> {team.evaluates}.
					</li>
				))}
			</ul>
			<p className={cn(label, "pt-1")}>The invitation</p>
			<EditableDraft label='Invitation' text={next.invitation} onChange={next.onInvitationChange} />
			<p className={note}>It goes to {next.goesTo}, in AutoPartsHUB and by email. Your conversation with Sparks isn't included.</p>
			<p className={cn(label, "pt-1")}>What they get</p>
			<p className='text-sm text-foreground'>
				A fixed copy: this idea and the prototype as it is now (version {next.version}), to try and comment on. You keep working on yours; when you change it,
				publish an update. Asking for a decision comes later, when you're ready.
			</p>
		</section>
	);
}

/** One next step, in a bordered box: it comes in (Reveal) as Review moves on, and is announced. */
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
				return (
					<>
						<Title>Check it, then publish it</Title>
						<p className='text-sm text-foreground'>
							This is what the teams get, with the prototype on the right. Who reviews it and the invitation are under "Publishing it". The gaps and known issues
							don't stop you: they go to the teams as they are. When it looks right, select "Publish".
						</p>
						{next.onEvaluate ? (
							<>
								<p className='text-sm text-foreground'>Evaluate was skipped. Running it takes a few minutes and would make your recommendation stronger.</p>
								<div>
									<NextButton onClick={next.onEvaluate}>Evaluate it first</NextButton>
								</div>
							</>
						) : null}
					</>
				);
			case "in-review":
				return (
					<>
						<Title>The teams have it</Title>
						<p className='text-sm text-foreground'>
							They see version {next.version} of your idea and its prototype, and have the invitation. Their feedback shows here and in Comments as it comes in.
						</p>
						{next.stale ? <p className={note}>Your prototype is at version {next.stale} now. When you want them to see it, select "Publish update".</p> : null}
					</>
				);
			case "reviews":
				return (
					<>
						<Title>The reviews are in</Title>
						<p className='text-sm text-foreground'>{next.verdict}</p>
						<AssistantMessage className='text-sm' text={next.topics.map((topic) => `- ${topic}`).join("\n")} />
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
						{next.done ? <p className='text-sm text-foreground'>{next.done}</p> : null}
						{next.stale ? (
							<p className='text-sm text-foreground'>
								The teams still see version {next.stale.seen}. Select "Publish update" when you want them to see version {next.stale.now}.
							</p>
						) : null}
						<p className='text-sm text-foreground'>
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
						<p className='text-sm text-foreground'>With the idea, the reviews and your recommendation. The decision shows here as soon as there's one.</p>
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
						<p className='text-sm text-foreground'>"{next.reason}"</p>
						{next.decision === "advance" ? (
							<>
								<p className='text-sm text-foreground'>
									It's in Decisions, and what you learned is now in Previous experiments, so the next person with a similar idea starts from it.
								</p>
								{next.shared ? (
									<p className='text-sm text-foreground'>
										Shared with {next.departments}, without edit rights. They'll find it in AutoPartsHUB, with the prototype, the decisions and every reason behind
										them.
									</p>
								) : (
									<>
										<p className='text-sm text-foreground'>
											Share it with the teams who'll carry it forward: {next.departments}. They'll see it without edit rights, and without your conversation with
											Sparks. Or use "Share" at the top whenever you're ready.
										</p>
										<div>
											<NextButton onClick={next.onShare}>Share it with them</NextButton>
										</div>
									</>
								)}
							</>
						) : next.decision === "iterate-validate" ? (
							<>
								<p className='text-sm text-foreground'>It's in Decisions. The idea goes back to Evaluate, with that reason first.</p>
								<div>
									<NextButton onClick={next.onEvaluate}>Evaluate it</NextButton>
								</div>
							</>
						) : (
							<>
								<p className='text-sm text-foreground'>
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
		<section ref={ref} tabIndex={-1} role='status' aria-label='Next step' className={cn("rounded-lg border border-border-defined p-4 outline-none", className)}>
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

export { PublishingPart, ReviewNextStep, type ReviewNext };
