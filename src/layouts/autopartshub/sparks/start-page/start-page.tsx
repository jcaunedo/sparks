import * as React from "react";
import { Archive, ArchiveRestore, ArrowUpRight, Copy, Ellipsis, Plus, Search, Trash2 } from "lucide-react";

import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/buttons/button";
import { Badge, type BadgeProps } from "@/components/data-display/badge";
import { EmptyState } from "@/components/feedback/empty-state";
import { AppHeader } from "@/components/navigation/app-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/navigation/tabs";
import { Typography } from "@/components/typography/typography";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/overlays/dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/overlays/dropdown-menu";
import { formatRelativeDate } from "@/lib/relative-date";
import { cn } from "@/lib/utils";

import type { AutoPartsHubUser } from "../../autopartshub";
import { HeaderActions } from "../../header-actions";
import { HeaderIconButton } from "../../header-icon-button";
import type { NotificationsPopoverProps } from "../../notifications-popover";
import { ideaStatusBadge, type IdeaStatus } from "../shared/idea-status";
import { OutlineIconButton } from "../shared/outline-icon-button";
import { sparksSteps, type SparksStep } from "../shared/steps";

/**
 * Where a concept is (prds/sparks.md → "The start page"): the step it's on while it's a draft, then where it stands with
 * the teams (`IdeaStatus`, as in the concept's header).
 */
type SparksConceptStatus = SparksStep | Exclude<IdeaStatus, "draft">;

/** One concept in "Your concepts" or "Shared with you". */
type SparksConceptSummary = {
	id: string;
	name: string;
	/** One line on the problem it solves: her first message. Empty for an idea she hasn't described yet. */
	summary: string;
	/** Who can see it: "Only you", "You and 2 others", "Shared by Marco". */
	sharing: string;
	/** ISO date it was created: the row's date. */
	createdAt: string;
	/** ISO date of the last edit: the list's order, most recent first. */
	editedAt: string;
	/**
	 * Evaluate's last result: the share of scenarios that worked in the last finished run (0–100), "failed" when the last
	 * run failed, none before Evaluate has run.
	 */
	validation?: number | "failed";
	status: SparksConceptStatus;
	/** ISO date the status was reached: shown for "waiting", "advanced" and "stopped". */
	statusDate?: string;
	/** The prototype's preview. Without one, the row shows a tile in one of the logo's colors. */
	previewSrc?: string;
	href: string;
};

/** Which tab a concept is listed in: what its "…" menu offers depends on it. */
type SparksConceptList = "yours" | "shared" | "archive";

/**
 * A row's "…" menu (prds/sparks.md, "The start page"): "Open" opens it (as the row does); "Duplicate" makes a copy of it,
 * hers, first in "Your ideas"; "Archive" moves it to Archive, and "Unarchive" back; "Delete" asks first, then it's gone.
 */
type SparksConceptAction = "duplicate" | "archive" | "unarchive" | "delete";

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
	/** A row's "…" menu: what she chose, for which concept and from which tab ("Delete" once she's confirmed it). */
	onConceptAction?: (action: SparksConceptAction, concept: SparksConceptSummary, list: SparksConceptList) => void;
};


/* One color per step: Plan purple and Prototype sky as in Figma (Sparks → "Sparks", 1:2); Evaluate yellow, Review blue. */
const stepTone: Record<SparksStep, BadgeProps["tone"]> = { plan: "purple", prototype: "sky", validate: "yellow", review: "blue" };

const statusBadge: Record<SparksConceptStatus, { label: string; tone: BadgeProps["tone"] }> = {
	...(Object.fromEntries(sparksSteps.map((step) => [step.id, { label: step.label, tone: stepTone[step.id] }])) as Record<
		SparksStep,
		{ label: string; tone: BadgeProps["tone"] }
	>),
	// Not the step's name alone: with the teams, it's being reviewed (prds/sparks.md, "The start page").
	review: ideaStatusBadge["in-review"],
	// Published: the same labels and colors as the badge by the concept's name.
	ready: ideaStatusBadge.ready,
	"in-review": ideaStatusBadge["in-review"],
	waiting: ideaStatusBadge.waiting,
	advanced: ideaStatusBadge.advanced,
	stopped: ideaStatusBadge.stopped,
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
	onConceptAction,
}: SparksStartPageProps) {
	// "Delete" asks first: the concept, and the tab it's in, while the dialog is open.
	const [deleting, setDeleting] = React.useState<{ concept: SparksConceptSummary; list: SparksConceptList }>();
	const act = (action: SparksConceptAction | "ask-delete", concept: SparksConceptSummary, list: SparksConceptList) =>
		action === "ask-delete" ? setDeleting({ concept, list }) : onConceptAction?.(action, concept, list);
	return (
		<div className='flex min-h-screen flex-col bg-background text-foreground'>
			{/* No back button: Sparks opens in its own tab, and the AutoPartsHUB home stays open in the other. */}
			{/* sparks.ds "header-autopartshub" → "Sparks": the logo is 28px tall. */}
			<AppHeader logo={<Logo className='h-[26px]' />}>
				<HeaderActions user={user} notifications={notifications} />
			</AppHeader>

			{/* 24px all around (DESIGN.md → "Pages have 24px around"), a 1232px column (248px sides at
			    1728). Figma: 16px between the title and the tabs; the tabs, the buttons and the list are 32px apart. */}
			<main className='px-6 py-6'>
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
							<Button
								variant='neutral'
								onClick={onNewIdea}
							>
								<Plus aria-hidden data-icon='inline-start' />
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
								list='yours'
								onAction={onConceptAction ? act : undefined}
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
								list='shared'
								onAction={onConceptAction ? act : undefined}
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
								list='archive'
								onAction={onConceptAction ? act : undefined}
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
			{/* "Delete" asks first: it can't be undone, and it's gone for everyone she shared it with. */}
			<Dialog open={Boolean(deleting)} onOpenChange={(open) => (open ? null : setDeleting(undefined))}>
				<DialogContent showCloseButton={false}>
					<DialogHeader>
						<DialogTitle>Delete "{deleting?.concept.name}"?</DialogTitle>
						<DialogDescription>
							{deleting?.concept.sharing && deleting.concept.sharing !== "Only you"
								? "It's gone for you and everyone you shared it with, with its conversation, prototype and evaluation. You can't undo this."
								: "It's gone, with its conversation, prototype and evaluation. You can't undo this."}
						</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<Button variant='outline' onClick={() => setDeleting(undefined)}>
							Cancel
						</Button>
						<Button
							variant='destructive'
							onClick={() => {
								if (deleting) onConceptAction?.("delete", deleting.concept, deleting.list);
								setDeleting(undefined);
							}}
						>
							Delete
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
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
	list,
	onAction,
	now,
	empty,
	className,
}: {
	concepts: SparksConceptSummary[];
	list: SparksConceptList;
	/** With it, each row has its "…" menu, in a column of its own at the end. */
	onAction?: (action: SparksConceptAction | "ask-delete", concept: SparksConceptSummary, list: SparksConceptList) => void;
	now: number;
	/** What an empty tab says (not in Figma yet). */
	empty: { title: string; description: string };
	className?: string;
}) {
	if (concepts.length === 0) {
		return <EmptyState className={cn("min-h-[220px]", className)} title={empty.title} description={empty.description} />;
	}
	return (
		<div
			className={cn(
				"grid gap-x-6",
				onAction ? "grid-cols-[408px_repeat(3,minmax(0,1fr))_max-content_36px]" : "grid-cols-[408px_repeat(3,minmax(0,1fr))_max-content]",
				className,
			)}
		>
			{/* Figma "Frame 10121829": the column names, sm muted, on a light gray with rounded top corners. Hidden from
			    screen readers: each row is one link, and its cells say their column themselves. */}
			<div
				aria-hidden
				className='col-span-full grid grid-cols-subgrid rounded-t-lg bg-[color-mix(in_srgb,var(--background-subtle)_60%,var(--background))] px-4 py-[11px] text-sm text-muted-foreground'
			>
				<span>Idea</span>
				<span>Share with</span>
				<span>Created</span>
				<span>Evaluation</span>
				<span>Status</span>
				{onAction ? <span /> : null}
			</div>
			<ul className='col-span-full grid grid-cols-subgrid border-t border-border'>
				{concepts.map((concept, index) => (
					// The whole row lights up on hover (the link and its "…" menu), and stays lit while the menu is open.
					<li
						key={concept.id}
						className='group/row col-span-full grid grid-cols-subgrid items-center border-b border-border bg-background transition-colors hover:bg-background-subtle has-[[data-state=open]]:bg-background-subtle'
					>
						<ConceptRow
							concept={concept}
							now={now}
							tile={previewTiles[index % previewTiles.length]}
							actions={onAction ? (action) => onAction(action, concept, list) : undefined}
							list={list}
						/>
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
 * One concept: its preview, name and summary, then who can see it, when it was created, Evaluate's last result and
 * where it is. Opens it.
 */
function ConceptRow({
	concept,
	now,
	tile,
	list,
	actions,
}: {
	concept: SparksConceptSummary;
	now: number;
	tile: string;
	list: SparksConceptList;
	actions?: (action: SparksConceptAction | "ask-delete") => void;
}) {
	const linkRef = React.useRef<HTMLAnchorElement>(null);
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
		<>
		<a
			ref={linkRef}
			href={concept.href}
			className={cn(
				"grid grid-cols-subgrid items-center py-5 ps-4 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
				// With the "…" menu, the link takes the five columns and the menu the last, 16px from the row's end.
				actions ? "col-span-5" : "col-span-full pe-4",
			)}
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
					{/* Just created, before she describes the problem: the line says so, muted. */}
					<Typography size='sm' className={cn("truncate", !concept.summary && "text-muted-foreground")}>
						{concept.summary || "No problem described yet."}
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
			{/* Evaluate's last result: the share of scenarios that worked (prds/sparks.md → "The start page"). */}
			<Typography size='sm' className='min-w-0'>
				<span className='sr-only'>Evaluation: </span>
				{validationLabel(concept.validation)}
			</Typography>
			<div className='flex'>
				<Badge variant='flat' tone={status.tone} size='xs'>
					{statusLabel}
				</Badge>
			</div>
		</a>
		{actions ? (
			<div className='flex justify-end pe-4'>
				<ConceptMenu name={concept.name} list={list} onOpen={() => linkRef.current?.click()} onAction={actions} />
			</div>
		) : null}
		</>
	);
}

/**
 * A row's "…" menu (prds/sparks.md, "The start page"): a ghost icon button with its name in a tooltip, opening Open,
 * Duplicate, Archive (Unarchive in Archive) and Delete, last, after a line, in the destructive color. An idea shared
 * with her isn't hers to archive or delete: Open and Duplicate only.
 */
function ConceptMenu({
	name,
	list,
	onOpen,
	onAction,
}: {
	name: string;
	list: SparksConceptList;
	onOpen: () => void;
	onAction: (action: SparksConceptAction | "ask-delete") => void;
}) {
	const own = list !== "shared";
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				{/* Subtle until the row is hovered (or it's focused, or its menu is open): the row's content reads first. */}
				<HeaderIconButton
					label={`More actions for ${name}`}
					tooltip='More actions'
					className='text-icon-subtle group-hover/row:text-icon focus-visible:text-icon data-[state=open]:text-icon'
				>
					<Ellipsis aria-hidden />
				</HeaderIconButton>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				<DropdownMenuItem onSelect={onOpen}>
					<ArrowUpRight aria-hidden />
					Open
				</DropdownMenuItem>
				<DropdownMenuItem onSelect={() => onAction("duplicate")}>
					<Copy aria-hidden />
					Duplicate
				</DropdownMenuItem>
				{own ? (
					<DropdownMenuItem onSelect={() => onAction(list === "archive" ? "unarchive" : "archive")}>
						{list === "archive" ? <ArchiveRestore aria-hidden /> : <Archive aria-hidden />}
						{list === "archive" ? "Unarchive" : "Archive"}
					</DropdownMenuItem>
				) : null}
				{own ? (
					<>
						<DropdownMenuSeparator />
						<DropdownMenuItem variant='destructive' onSelect={() => onAction("ask-delete")}>
							<Trash2 aria-hidden />
							Delete
						</DropdownMenuItem>
					</>
				) : null}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export {
	SparksStartPage,
	type SparksConceptAction,
	type SparksConceptList,
	type SparksStartPageProps,
	type SparksConceptSummary,
	type SparksConceptStatus,
};
