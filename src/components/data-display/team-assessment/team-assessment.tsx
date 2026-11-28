import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { ChevronRight } from "lucide-react";
import { motion } from "motion/react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/data-display/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/overlays/popover";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/overlays/tooltip";
import { layoutSpring, useMotionPreference } from "@/lib/motion";
import { cn } from "@/lib/utils";

/*
 * sparks.ds "Team assessment" (135:2671): how the people asked to assess something have answered so far. A title with an
 * action on its right, a one-line summary, "3 of 8 assessments received" with "38% completed" on the right, a bar of
 * everyone invited (support, doesn't support, pending), its legend, then "Send a reminder" on its own line under it. The bar always adds up to everyone invited: its segments
 * touch, in the legend's order, each its exact share (DESIGN.md → "Team assessment bar"). With `people`, each legend
 * item (and its segment) opens a popover with who's in it, by team, each with their status.
 */

const teamAssessmentVariants = cva("flex w-full flex-col gap-3 rounded-[12px]", {
	variants: {
		/**
		 * `card`: on its own, on a panel's subtle background (white, 32px padding, 24px at the bottom under "Send a reminder";
		 * sparks.ds 135:2671). `inset`: inside a white panel (`background-soft`, 24px top and bottom, 32px sides; Review status, sparks.ds 135:2393).
		 */
		variant: {
			// With "Send a reminder" last, 24px under it: the link's line already adds space (32px under the legend otherwise).
			card: "bg-background p-8 has-data-[slot=team-assessment-remind]:pb-6",
			inset: "bg-background-soft px-8 py-6",
		},
	},
	defaultVariants: { variant: "card" },
});

/** The three outcomes, in the bar's and the legend's order, each with its fill (sparks.ds palettes). */
const outcomeFill = {
	support: "bg-(--success-500)",
	against: "bg-(--destructive-400)",
	// Pending is the track's gray (sparks.ds palettes/gray/100): what's left of the bar is who hasn't answered yet.
	pending: "bg-neutral-muted",
} as const;

type TeamAssessmentOutcome = "support" | "against" | "pending";

/** Someone asked to assess it: where they stand, and their status in words (a view, "Invited", "Opened it"…). */
type TeamAssessmentPerson = {
	id: string;
	name: string;
	/** The team they belong to: the popover lists people team by team. */
	team?: string;
	/** Under their name (xs, muted), as in Share's lists: their job title and team ("UX lead · UX team"). */
	subtitle?: string;
	avatarSrc?: string;
	outcome: TeamAssessmentOutcome;
	/** On the row's right, e.g. a view's `Badge`, or muted text for someone pending. */
	status?: React.ReactNode;
	/** Under their name (sm, foreground), e.g. the changes they ask for with "Advance with changes". */
	detail?: React.ReactNode;
};

type TeamAssessmentAction = {
	label: string;
	/** Without it, the action shows but can't be selected yet; `hint` says why, in a tooltip. */
	onClick?: () => void;
	hint?: string;
	ref?: React.Ref<HTMLButtonElement>;
};

type TeamAssessmentProps = Omit<React.ComponentProps<"section">, "title"> &
	VariantProps<typeof teamAssessmentVariants> & {
		/** Defaults to "Team assessment". */
		title?: string;
		/** Where it stands, one sentence (lg): "Early feedback favors moving forward." */
		summary: string;
		/** Everyone asked to assess it. */
		invited: number;
		/** Assessments that support it, and that don't. Pending is what's left of `invited`. */
		support: number;
		against: number;
		/** On the title's right (base medium, the link color, a chevron-right after it), e.g. "View full report". */
		action?: TeamAssessmentAction;
		/** "Send a reminder", on its own line under the legend, on the left, shown only while someone hasn't answered. */
		onRemind?: () => void;
		remindLabel?: string;
		/** When the latest reminder went out, muted, after "Send a reminder" (which stays: she can send another), e.g. "Reminder sent on Nov 27, 2026, 2:46 PM". */
		reminded?: React.ReactNode;
		/**
		 * Everyone asked, each with their outcome and status: the legend's items and the bar's segments then open a popover
		 * listing who's in each. Keep it in step with `invited`, `support` and `against`.
		 */
		people?: TeamAssessmentPerson[];
		/**
		 * Selecting a person in a popover: their row becomes a button (the hover fill, the focus ring); the popover closes,
		 * then this runs, e.g. to open the full report at their assessment. `personSelectLabel` names it for screen readers
		 * ("See {name}'s assessment" by default).
		 */
		onPersonSelect?: (id: string) => void;
		personSelectLabel?: (person: TeamAssessmentPerson) => string;
		/** Last, after a line (24px above and below it): e.g. what to do next, with its buttons. Rendering nothing, no line. */
		footer?: React.ReactNode;
	};

const linkClasses =
	"inline-flex items-center gap-1.5 rounded-sm text-link outline-none hover:underline focus-visible:ring-[3px] focus-visible:ring-ring/50";

/** Each outcome's name, as the popover's title. */
const outcomeTitle = { support: "Support", against: "Don't support", pending: "Pending" } as const;

/**
 * The people in one outcome, team by team (teams in order of first appearance), each as in Share's lists: their photo,
 * name (sm semibold) and `subtitle` (xs muted), then their status under it and any `detail` (the changes they ask for).
 */
function PeopleByTeam({
	people,
	onSelect,
	selectLabel,
}: {
	people: TeamAssessmentPerson[];
	onSelect?: (id: string) => void;
	selectLabel: (person: TeamAssessmentPerson) => string;
}) {
	const teams = [...new Set(people.map((person) => person.team ?? ""))];
	const ordered = teams.flatMap((team) => people.filter((person) => (person.team ?? "") === team));
	return (
		// Selectable rows get 8px of fill around them (`-mx-2 px-2`, 6px top and bottom), so they keep the list's alignment.
		<ul className={cn("flex max-h-96 flex-col overflow-y-auto", onSelect ? "-mx-2 gap-1 px-0" : "gap-4")}>
			{ordered.map((person) => {
				const Row = onSelect ? "button" : "div";
				return (
				<li key={person.id}>
					<Row
						{...(onSelect ? { type: "button" as const, onClick: () => onSelect(person.id), "aria-label": selectLabel(person) } : {})}
						className={cn(
							"flex w-full items-start gap-2 text-start",
							onSelect && "cursor-pointer rounded-md px-2 py-1.5 outline-none hover:bg-accent focus-visible:ring-[3px] focus-visible:ring-ring/50",
						)}
					>
					<Avatar className='shrink-0'>
						{person.avatarSrc ? <AvatarImage src={person.avatarSrc} alt='' /> : null}
						<AvatarFallback>{person.name.split(" ").map((part) => part[0]).join("").slice(0, 2)}</AvatarFallback>
					</Avatar>
					<div className='flex min-w-0 flex-1 flex-col items-start'>
						<span className='max-w-full truncate text-sm font-semibold text-foreground'>{person.name}</span>
						{person.subtitle ? <span className='max-w-full truncate text-xs text-muted-foreground'>{person.subtitle}</span> : null}
						{person.status ? <span className='mt-1.5 text-sm text-muted-foreground'>{person.status}</span> : null}
						{person.detail ? <span className='mt-1 text-sm text-foreground'>{person.detail}</span> : null}
					</div>
					</Row>
				</li>
				);
			})}
		</ul>
	);
}

/** The legend's words for each outcome, by how many: "2 support", "1 doesn't support", "5 pending". */
const outcomeWords = {
	support: (count: number) => `${count} support`,
	against: (count: number) => `${count} ${count === 1 ? "doesn't" : "don't"} support`,
	pending: (count: number) => `${count} pending`,
};

/** How the people asked to assess something have answered: progress, a bar of everyone invited and its legend. */
function TeamAssessment({
	title = "Team assessment",
	summary,
	invited,
	support,
	against,
	action,
	onRemind,
	remindLabel = "Send a reminder",
	reminded,
	people,
	onPersonSelect,
	personSelectLabel = (person) => `See ${person.name}'s assessment`,
	footer,
	variant = "card",
	className,
	...props
}: TeamAssessmentProps) {
	const { prefersReducedMotion } = useMotionPreference();
	const total = Math.max(0, invited);
	const supporting = Math.min(Math.max(0, support), total);
	const opposing = Math.min(Math.max(0, against), total - supporting);
	const pending = total - supporting - opposing;
	const received = supporting + opposing;
	const counts = { support: supporting, against: opposing, pending };
	const outcomes = (["support", "against", "pending"] as const).map((key) => ({ key, count: counts[key], words: outcomeWords[key](counts[key]) }));
	const titleId = React.useId();
	// The outcome whose people are listed, opened from its legend item or its segment.
	const [listed, setListed] = React.useState<TeamAssessmentOutcome | null>(null);
	const peopleIn = (key: TeamAssessmentOutcome) => people?.filter((person) => person.outcome === key) ?? [];
	// Selecting a person closes the popover without sending focus back to its legend item: `onPersonSelect` takes her
	// somewhere else (their assessment), and focus goes there.
	const selectingRef = React.useRef(false);

	const actionButton = action ? (
		<button
			ref={action.ref}
			type='button'
			onClick={action.onClick}
			aria-disabled={action.onClick ? undefined : true}
			className={cn(linkClasses, "shrink-0 gap-1 text-base font-medium", !action.onClick && "cursor-default opacity-50 hover:no-underline")}
		>
			{action.label}
			{/* It opens somewhere else (Review status): a 16px chevron after the label, 4px apart, as "Show more"'s. Its glyph
			    leaves ~5px empty on the right of its box, so it's pulled in by that much: the chevron's tip lines up with the
			    card's right edge ("% completed", the bar) (DESIGN.md). */}
			<ChevronRight aria-hidden className='-me-[5px] size-4' />
		</button>
	) : null;

	return (
		<section
			data-slot='team-assessment'
			data-variant={variant}
			aria-labelledby={titleId}
			className={cn(teamAssessmentVariants({ variant }), className)}
			{...props}
		>
			<div className='flex flex-col'>
				<div className='flex items-center justify-between gap-4'>
					<h3 id={titleId} className='text-lg font-semibold text-foreground-prominent'>
						{title}
					</h3>
					{action && !action.onClick && action.hint ? (
						<Tooltip>
							<TooltipTrigger asChild>{actionButton}</TooltipTrigger>
							<TooltipContent side='bottom' sideOffset={6}>
								{action.hint}
							</TooltipContent>
						</Tooltip>
					) : (
						actionButton
					)}
				</div>
				{/* Announced when it changes, as assessments come in. */}
				<p aria-live='polite' className='text-lg text-foreground-prominent'>
					{summary}
				</p>
			</div>
			<div className='flex flex-col gap-2'>
				<div className='flex flex-wrap items-baseline gap-x-2 text-base text-foreground'>
					<p aria-live='polite'>
						<span className='font-semibold'>
							{received} of {total}
						</span>{" "}
						assessments received
					</p>
					{/* How much of it is done, on the right (sparks.ds 135:2185): received of everyone invited, rounded. */}
					{total > 0 ? <span className='ms-auto text-muted-foreground'>{Math.round((received / total) * 100)}% completed</span> : null}
				</div>
				{/* Everyone invited, as one bar: the segments touch, each its exact share; the legend says it in words. */}
				<div
					role='img'
					aria-label={`${outcomes.map((o) => o.words).join(", ")}, of ${total} invited`}
					className='flex h-6 w-full overflow-hidden rounded-lg bg-neutral-muted'
				>
					{outcomes.map(({ key, count }) =>
						count > 0 ? (
							<motion.span
								key={key}
								// With `people`, a segment opens its legend item's list (pointer only: the legend is the keyboard way).
								onClick={people ? () => setListed(key) : undefined}
								// A new assessment moves the segments to their new shares (`layout`); reduced motion: at once.
								layout={prefersReducedMotion ? false : true}
								transition={layoutSpring}
								data-outcome={key}
								className={cn("h-full shrink-0", outcomeFill[key], people && "cursor-pointer")}
								style={{ width: `${(count / total) * 100}%` }}
							/>
						) : null,
					)}
				</div>
				{/* Without `people`, the legend repeats the bar's label, so it's hidden from screen readers; with them, each item
				    opens who's in it (none to open at 0). */}
				<ul aria-hidden={people ? undefined : true} className='flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-foreground'>
					{outcomes.map(({ key, count, words }) => {
						const swatch = <span className={cn("size-2.5 shrink-0", outcomeFill[key], key === "pending" && "border border-border-defined")} />;
						if (!people || count === 0)
							return (
								<li key={key} className='flex items-center gap-2'>
									{swatch}
									{words}
								</li>
							);
						return (
							<li key={key}>
								<Popover open={listed === key} onOpenChange={(open) => setListed(open ? key : null)}>
									<PopoverTrigger asChild>
										<button
											type='button'
											className='flex items-center gap-2 rounded-sm outline-none hover:underline focus-visible:ring-[3px] focus-visible:ring-ring/50'
										>
											{swatch}
											{words}
										</button>
									</PopoverTrigger>
									<PopoverContent
										align='start'
										className='flex w-80 flex-col gap-3'
										onCloseAutoFocus={(event) => {
											if (!selectingRef.current) return;
											selectingRef.current = false;
											event.preventDefault();
										}}
									>
										<h2 className='text-base font-semibold text-foreground-prominent'>
											{outcomeTitle[key]} <span className='font-normal text-muted-foreground'>· {count} of {total}</span>
										</h2>
										<PeopleByTeam
											people={peopleIn(key)}
											selectLabel={personSelectLabel}
											onSelect={
												onPersonSelect
													? (id) => {
															selectingRef.current = true;
															setListed(null);
															onPersonSelect(id);
														}
													: undefined
											}
										/>
									</PopoverContent>
								</Popover>
							</li>
						);
					})}
				</ul>
				{/* "Send a reminder", on its own line under the legend, on the left, 16px below it, while anyone is pending: the
				    counts read first, then what she can do about them. It stays once sent (she can send another); when the
				    latest went out follows it, muted, 12px after it. */}
				{pending > 0 && (onRemind || reminded) ? (
					<div data-slot='team-assessment-remind' className='flex flex-wrap items-baseline gap-x-3 pt-2 text-base'>
						{onRemind ? (
							<button type='button' onClick={onRemind} className={linkClasses}>
								{remindLabel}
							</button>
						) : null}
						{reminded ? <span aria-live='polite' className='text-muted-foreground'>{reminded}</span> : null}
					</div>
				) : null}
			</div>
			{/* Hidden while what's passed renders nothing (`empty:hidden`): no line and no space for nothing. */}
			{footer ? <div className='mt-3 border-t border-border pt-6 empty:hidden'>{footer}</div> : null}
		</section>
	);
}

export { TeamAssessment, teamAssessmentVariants, type TeamAssessmentAction, type TeamAssessmentOutcome, type TeamAssessmentPerson, type TeamAssessmentProps };
