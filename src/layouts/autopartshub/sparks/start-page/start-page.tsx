import { Plus, Search } from "lucide-react";

import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/buttons/button";
import { Badge, type BadgeProps } from "@/components/data-display/badge";
import { EmptyState } from "@/components/feedback/empty-state";
import { AppHeader } from "@/components/navigation/app-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/navigation/tabs";
import { Typography } from "@/components/typography/typography";
import { formatRelativeDate } from "@/lib/relative-date";
import { cn } from "@/lib/utils";

import type { AutoPartsHubUser } from "../../autopartshub";
import { HeaderActions } from "../../header-actions";
import type { NotificationsPopoverProps } from "../../notifications-popover";
import { OutlineIconButton } from "../shared/outline-icon-button";
import { sparksSteps, type SparksStep } from "../shared/steps";

/** Where a concept is (prds/sparks.md → "The start page"): the step it's on, or where the decision stands. */
type SparksConceptStatus = SparksStep | "waiting" | "advanced" | "stopped";

/** One concept in "Your concepts" or "Shared with you". */
type SparksConceptSummary = {
	id: string;
	name: string;
	/** One line on the problem it solves. */
	summary: string;
	/** Who can see it: "Only you", "You and 2 others", "Shared by Marco". */
	sharing: string;
	/** ISO date it was created: the row's date. */
	createdAt: string;
	/** ISO date of the last edit: the list's order, most recent first. */
	editedAt: string;
	/**
	 * Validate's last result: the share of scenarios that worked in the last finished run (0–100), "failed" when the last
	 * run failed, none before Validate has run.
	 */
	validation?: number | "failed";
	status: SparksConceptStatus;
	/** ISO date the status was reached: shown for "waiting", "advanced" and "stopped". */
	statusDate?: string;
	/** The prototype's preview. Without one, the row shows a tile in one of the logo's colors. */
	previewSrc?: string;
	href: string;
};

type SparksStartPageProps = {
	user: AutoPartsHubUser;
	/** Dana's concepts ("Your ideas"), most recently edited first. */
	concepts: SparksConceptSummary[];
	/** Concepts others shared with her ("Shared with you"). */
	sharedConcepts?: SparksConceptSummary[];
	/** Concepts she archived ("Archive"). */
	archivedConcepts?: SparksConceptSummary[];
	/** The clock relative dates are measured against. Stories pass a fixed one. */
	now?: number;
	/** "New idea": a new concept on Plan, with an empty conversation. */
	onNewIdea?: () => void;
	/** The bell's notifications (the same in every AutoPartsHUB header). */
	notifications?: NotificationsPopoverProps;
};


/* One color per step: Plan purple and Prototype sky as in Figma (Sparks → "Sparks", 1:2); Validate yellow, Review blue. */
const stepTone: Record<SparksStep, BadgeProps["tone"]> = { plan: "purple", prototype: "sky", validate: "yellow", review: "blue" };

const statusBadge: Record<SparksConceptStatus, { label: string; tone: BadgeProps["tone"] }> = {
	...(Object.fromEntries(sparksSteps.map((step) => [step.id, { label: step.label, tone: stepTone[step.id] }])) as Record<
		SparksStep,
		{ label: string; tone: BadgeProps["tone"] }
	>),
	waiting: { label: "Waiting for a decision", tone: "amber" },
	advanced: { label: "Advanced", tone: "green" },
	stopped: { label: "Stopped", tone: "neutral" },
};

/* Figma: the preview tiles are the Sparks logo's colors at 10% on white, in the logo's order. */
const previewTiles = [
	"bg-[color-mix(in_srgb,var(--tangerine)_10%,var(--background))]",
	"bg-[color-mix(in_srgb,var(--amethyst)_10%,var(--background))]",
	"bg-[color-mix(in_srgb,var(--clover)_10%,var(--background))]",
	"bg-[color-mix(in_srgb,var(--citrine)_10%,var(--background))]",
];

const shortDate = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" });

/**
 * Sparks's start page: the title, then Dana's concepts in three tabs ("Your ideas", "Shared with you", "Archive"),
 * with search and "New idea" above the list. Figma: Sparks → "Sparks" (node 1:2).
 */
function SparksStartPage({
	user,
	concepts,
	sharedConcepts = [],
	archivedConcepts = [],
	now = Date.now(),
	onNewIdea,
	notifications,
}: SparksStartPageProps) {
	return (
		<div className='flex min-h-screen flex-col bg-background text-foreground'>
			{/* No back button: Sparks opens in its own tab, and the AutoPartsHUB home stays open in the other. */}
			{/* sparks.ds "header-autopartshub" → "Sparks": the logo is 28px tall. */}
			<AppHeader logo={<Logo className='h-[26px]' />}>
				<HeaderActions user={user} comments={{}} notifications={notifications} />
			</AppHeader>

			{/* 24px top (not Figma's 48: DESIGN.md → "Canvas top padding"), 48px bottom, a 1232px column (248px sides at
			    1728). Figma: 16px between the title and the tabs; the tabs, the buttons and the list are 32px apart. */}
			<main className='px-8 py-6'>
				<div className='mx-auto flex w-full max-w-[1232px] flex-col gap-4'>
					{/* Figma "Frame 10121850": the title on the left, search and "New idea" on the right, on one row. The title
					    alone, no line under it (prds/sparks.md, "The start page"). */}
					<div className='flex flex-wrap items-center justify-between gap-4'>
						{/* Balanced wrapping: when it takes two lines, they're even, never one word alone on the second. */}
						<Typography as='h1' size='3xl' weight='semibold' className='min-w-0 flex-1 text-balance'>
							Turn ideas into testable prototypes.
						</Typography>
						{/* Figma: 8px between the search and "New idea". Both apply whichever tab is open. */}
						<div className='flex shrink-0 items-center gap-2'>
							<OutlineIconButton label='Search ideas'>
								<Search aria-hidden />
							</OutlineIconButton>
							{/* Figma: tone/neutral, radius/button/lg, sm semibold; a 16px plus on the left: 10px before it, 6px between it
							    and the label, 14px after (Figma's 8px padding, the icon's 2px and the label's 6px). */}
							<Button
								variant='neutral'
								className='gap-1.5 rounded-button-lg ps-2.5 pe-3.5 font-semibold'
								onClick={onNewIdea}
							>
								<Plus aria-hidden />
								New idea
							</Button>
						</div>
					</div>

					{/* Figma: line tabs (as on the AutoPartsHUB home), 16px under the title row, then the list 32px under them. */}
					<Tabs defaultValue='yours' className='gap-8'>
						<TabsList variant='line' size='lg'>
							<TabsTrigger value='yours'>Your ideas</TabsTrigger>
							<TabsTrigger value='shared'>Shared with you</TabsTrigger>
							<TabsTrigger value='archive'>Archive</TabsTrigger>
						</TabsList>

						<TabsContent value='yours'>
							<ConceptList
								concepts={concepts}
								now={now}
								empty={{
									title: "No ideas yet",
									description: "Select “New idea” and tell Sparks about a problem you want to solve.",
								}}
							/>
						</TabsContent>
						<TabsContent value='shared'>
							<ConceptList
								concepts={sharedConcepts}
								now={now}
								empty={{
									title: "Nothing shared with you yet",
									description: "When someone shares an idea with you, it'll show up here.",
								}}
							/>
						</TabsContent>
						<TabsContent value='archive'>
							<ConceptList
								concepts={archivedConcepts}
								now={now}
								empty={{
									title: "Nothing archived yet",
									description: "Ideas you archive show up here, out of your list.",
								}}
							/>
						</TabsContent>
					</Tabs>
				</div>
			</main>
		</div>
	);
}

/**
 * Figma "Frame 10121833": the column names, then the rows, a 1px border between them and above the first.
 * One grid for the whole list, each row on it (`subgrid`), so the columns line up from row to row: the idea (408px,
 * with the row's padding: preview, name and summary), then who can see it, created and validation in equal columns, then the status, as wide as
 * the list's widest label so a long one never runs into the column before it (DESIGN.md).
 */
function ConceptList({
	concepts,
	now,
	empty,
	className,
}: {
	concepts: SparksConceptSummary[];
	now: number;
	/** What an empty tab says (not in Figma yet). */
	empty: { title: string; description: string };
	className?: string;
}) {
	if (concepts.length === 0) {
		return <EmptyState className={cn("min-h-[220px]", className)} title={empty.title} description={empty.description} />;
	}
	return (
		<div className={cn("grid grid-cols-[408px_repeat(3,minmax(0,1fr))_max-content] gap-x-6", className)}>
			{/* Figma "Frame 10121829": the column names, sm muted, on a light gray with rounded top corners. Hidden from
			    screen readers: each row is one link, and its cells say their column themselves. */}
			<div
				aria-hidden
				className='col-span-full grid grid-cols-subgrid rounded-t-lg bg-[color-mix(in_srgb,var(--background-subtle)_60%,var(--background))] px-4 py-[11px] text-sm text-muted-foreground'
			>
				<span>Idea</span>
				<span>Share with</span>
				<span>Created</span>
				<span>Validation</span>
				<span>Status</span>
			</div>
			<ul className='col-span-full grid grid-cols-subgrid border-t border-border'>
				{concepts.map((concept, index) => (
					<li key={concept.id} className='col-span-full grid grid-cols-subgrid border-b border-border'>
						<ConceptRow concept={concept} now={now} tile={previewTiles[index % previewTiles.length]} />
					</li>
				))}
			</ul>
		</div>
	);
}

/** What the validation column says: the share of scenarios that worked, "Failed", or "Not run". */
const validationLabel = (validation: SparksConceptSummary["validation"]) =>
	validation === undefined ? "Not run" : validation === "failed" ? "Failed" : `${Math.round(validation)}%`;

/**
 * One concept: its preview, name and summary, then who can see it, when it was created, Validate's last result and
 * where it is. Opens it.
 */
function ConceptRow({ concept, now, tile }: { concept: SparksConceptSummary; now: number; tile: string }) {
	const created = formatRelativeDate(concept.createdAt, now);
	const status = statusBadge[concept.status];
	const statusLabel =
		concept.statusDate && !sparksSteps.some((step) => step.id === concept.status)
			? `${status.label} · ${shortDate.format(new Date(concept.statusDate))}`
			: status.label;

	return (
		// Figma: 20px top and bottom (96px rows), 16px left and right; 16px between the preview and the name, 24px between
		// columns. The idea column is 408px: in a subgrid the row's 16px padding sits inside the first column, so 16 + 392 +
		// the 24px gap puts sharing where Figma's starts (its 400px idea block plus a 16px gap). Hover and focus aren't in Figma.
		<a
			href={concept.href}
			className='col-span-full grid grid-cols-subgrid items-center bg-background px-4 py-5 outline-none transition-colors hover:bg-background-subtle focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset'
		>
			{/* 32px clear on its right (inside the column, so "Share with" stays where Figma has it): the cut name and summary
			    don't run into the next column (DESIGN.md → "Columns"). */}
			<div className='flex min-w-0 items-center gap-4 pe-8'>
				{concept.previewSrc ? (
					<img src={concept.previewSrc} alt='' className='aspect-[4/3] h-14 shrink-0 rounded-[4.667px] object-cover' />
				) : (
					<div aria-hidden className={cn("aspect-[4/3] h-14 shrink-0 rounded-[4.667px]", tile)} />
				)}
				<div className='flex min-w-0 flex-col gap-1'>
					<Typography size='lg' weight='semibold' className='truncate'>
						{concept.name}
					</Typography>
					<Typography size='sm' className='truncate'>
						{concept.summary}
					</Typography>
				</div>
			</div>
			<Typography size='sm' className='min-w-0'>
				<span className='sr-only'>Share with: </span>
				{concept.sharing}
			</Typography>
			<Typography size='sm' className='min-w-0'>
				<span className='sr-only'>Created: </span>
				<time dateTime={concept.createdAt} title={created.title}>
					{created.label}
				</time>
			</Typography>
			{/* Validate's last result: the share of scenarios that worked (prds/sparks.md → "The start page"). */}
			<Typography size='sm' className='min-w-0'>
				<span className='sr-only'>Validation: </span>
				{validationLabel(concept.validation)}
			</Typography>
			<div className='flex'>
				<Badge variant='flat' tone={status.tone} size='xs'>
					{statusLabel}
				</Badge>
			</div>
		</a>
	);
}

export {
	SparksStartPage,
	type SparksStartPageProps,
	type SparksConceptSummary,
	type SparksConceptStatus,
};
