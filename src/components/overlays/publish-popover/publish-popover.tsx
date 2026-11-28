import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { Clock, CornerDownRight, Globe, Mail, SquarePen, Trash2, TriangleAlert } from "lucide-react";

import { Button } from "@/components/buttons/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/overlays/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/overlays/popover";
import { Typography } from "@/components/typography/typography";
import { expandVariants, useExpandClip, useMotionPreference } from "@/lib/motion";
import { cn } from "@/lib/utils";

/*
 * Publish: a popover from a "Publish" button (Figma: sparks.ds "Publish your idea (popover)", 129:2258, after Sparks 81:1031;
 * prds/sparks-review.md, "Publishing"). What's shared (each idea with its paths, each at its version), what happens next, who it goes to with a link to change it,
 * links to see the email and add a note, then "Cancel" and the publish button. The caller gives the copy and the data. Not in sparks.ds yet.
 */

/** A path of an idea (a direction prototyped) and the one version of it that goes out ("Fit check before you buy", 2). */
type PublishPath = { name: string; version: React.ReactNode };

/**
 * An idea that's published ("Wrong-part returns"), with the paths that go out with it, each at its version. An idea
 * has no version of its own: its paths do, and each path can have several (one is shared). Without `paths`, `version`
 * shows on the idea's row.
 */
type PublishItem = { name: string; version?: React.ReactNode; paths?: PublishPath[] };

type PublishPopoverProps = {
	/**
	 * `publish` (default; sparks.ds "With team members", "No team members"): what she checks before it goes, with "Cancel"
	 * and the publish button. `published` (sparks.ds "Published", 138:2887): what went out, once it has: the title
	 * ("Your idea is published"), when (`publishedAt`) and where (`link`), what was shared and who it went to, with no
	 * buttons at the bottom.
	 */
	variant?: "publish" | "published";
	/** When it was published, after a 16px clock, above `link` (4px apart), sm medium. With `variant` `published`. */
	publishedAt?: React.ReactNode;
	/** The popover's title, e.g. "Publish your idea". */
	title?: React.ReactNode;
	/** Under the title (16px medium): what publishing does. */
	description?: React.ReactNode;
	/** Where it'll be, under the description: a globe and the address, sm medium in the link color (opens a new tab and closes the popover). */
	link?: string;
	/** Where the link opens, when it isn't the address it shows (e.g. a preview of the page); `link` by default. */
	linkHref?: string;
	/** What goes out, in a bordered list: each idea, then its paths under it, each with "Version: n" on its right. */
	items?: PublishItem[];
	/** The list's label. */
	itemsLabel?: React.ReactNode;
	/** What happens once it's published, under `nextLabel`. */
	next?: React.ReactNode;
	nextLabel?: React.ReactNode;
	/**
	 * Who it goes to (sparks.ds 129:2258). `default`: no box: one semibold line ("Your idea will be shared with 3 team
	 * members."), `detail` under it ("Departments: UX team, Engineering, and Catalog"), then a text link to change who
	 * ("Manage reviewers", sm medium, the link color), 4px apart. `tone` `warning`: no one yet, in a box on the warning
	 * colors, with a solid warning triangle before the line and an outlined button, full width ("Add reviewers to publish
	 * and share your idea."). The action closes the popover first, without taking focus back to the trigger.
	 */
	audience?: { title: React.ReactNode; detail?: React.ReactNode; tone?: "default" | "warning"; action?: { label: string; onClick: () => void } };
	/**
	 * What reviewers get, shown in a dialog from a link ("View invite email"), over the popover, which stays open
	 * behind it. `title` names the dialog for screen readers ("Invite email"); it isn't shown.
	 */
	preview?: { label?: string; title?: string; children: React.ReactNode };
	/**
	 * A note from her (Sparks: added to the email, after its message): "Add a note" opens an empty field under the links,
	 * two lines tall, with `placeholder` (default "Add your note..."), holding `value`, changed with `onChange`. While
	 * it's open the link reads "Remove note" (`removeLabel`), which empties and closes it.
	 */
	note?: { label?: string; removeLabel?: string; fieldLabel?: string; placeholder?: string; value: string; onChange: (value: string) => void };
	/** The main button's label. */
	publishLabel?: string;
	cancelLabel?: string;
	/** Publishing: the popover closes, then this runs. */
	onPublish?: () => void;
	/** Nothing can be published yet (e.g. no one to send it to): the main button can't be selected. */
	blocked?: boolean;
	open?: boolean;
	defaultOpen?: boolean;
	onOpenChange?: (open: boolean) => void;
	/** The trigger: a "Publish" button. */
	children: React.ReactNode;
};

/**
 * What's shared, in a bordered list (8px corners), each with "Version: n" on its right: rows 12px × 10px, sm, the name
 * medium, a line between them. One idea: its paths are the rows, each after a corner arrow (the idea is named around
 * the list; Figma 129:2258). Several: each idea, then its paths under it. The same list wherever what's published is shown
 * (the popover, the invitation email).
 */
function PublishItems({ items, className, ...props }: React.ComponentProps<"ul"> & { items: PublishItem[] }) {
	const list = cn("flex flex-col rounded-lg border border-border text-sm text-foreground", className);
	const only = items.length === 1 && items[0].paths?.length ? items[0] : undefined;
	if (only?.paths)
		return (
			<ul className={list} {...props}>
				{only.paths.map((path) => (
					<li key={path.name} className='flex items-center gap-2 border-b border-border px-3 py-2.5 last:border-b-0'>
						<CornerDownRight aria-hidden className='size-3.5 shrink-0 text-icon-muted' />
						<span className='min-w-0 flex-1 font-medium'>{path.name}</span>
						<span className='shrink-0 text-end'>Version: {path.version}</span>
					</li>
				))}
			</ul>
		);
	return (
		<ul className={list} {...props}>
			{items.map((item) => (
				<li key={item.name} className='border-b border-border last:border-b-0'>
					{/* The idea: its name (medium), and its version only when it has no paths. */}
					<div className='flex items-center gap-2 px-3 py-2.5'>
						<span className='min-w-0 flex-1 font-medium'>{item.name}</span>
						{!item.paths?.length && item.version !== undefined ? <span className='shrink-0 text-end'>Version: {item.version}</span> : null}
					</div>
					{/* Its paths, under it: each one's name after a corner arrow, and the version shared. */}
					{item.paths?.length ? (
						<ul aria-label={`${item.name}: paths`} className='flex flex-col pb-1'>
							{item.paths.map((path) => (
								<li key={path.name} className='flex items-center gap-2 py-1.5 ps-3 pe-3'>
									<CornerDownRight aria-hidden className='size-3.5 shrink-0 text-icon-muted' />
									<span className='min-w-0 flex-1'>{path.name}</span>
									<span className='shrink-0 text-end'>Version: {path.version}</span>
								</li>
							))}
						</ul>
					) : null}
				</li>
			))}
		</ul>
	);
}

// "Add a note", "View invite email": text links in the foreground color with a 14px icon, underlined on hover.
const inlineLink = "h-auto gap-2 p-0 text-sm font-medium text-foreground [&_svg]:size-3.5 [&_svg]:text-icon";

/**
 * Publish: what's shared, what happens next and who it goes to, with "Cancel" and the publish button; or, once it's
 * published (`variant` `published`), what went out, when and to whom.
 */
function PublishPopover({
	variant = "publish",
	publishedAt,
	title = "Publish",
	description,
	link,
	linkHref,
	items = [],
	itemsLabel = "What you're sharing",
	next,
	nextLabel = "What happens next",
	audience,
	preview,
	note,
	publishLabel = "Publish",
	cancelLabel = "Cancel",
	onPublish,
	blocked = false,
	open: openProp,
	defaultOpen = false,
	onOpenChange,
	children,
}: PublishPopoverProps) {
	const [openState, setOpenState] = React.useState(defaultOpen);
	const open = openProp ?? openState;
	const setOpen = (next: boolean) => {
		if (openProp === undefined) setOpenState(next);
		onOpenChange?.(next);
	};
	const published = variant === "published";
	const titleId = React.useId();
	const itemsId = React.useId();
	// The audience link leads somewhere else (e.g. Share): closing, focus doesn't go back to the trigger, or it would
	// close what the link opened.
	const leaving = React.useRef(false);
	const [previewOpen, setPreviewOpen] = React.useState(false);
	const { prefersReducedMotion } = useMotionPreference();
	const noteClip = useExpandClip();
	// Open from the start when there's already a note (written before).
	const [noteOpen, setNoteOpen] = React.useState(() => Boolean(note?.value));
	// While the email shows in its dialog, the popover stays open behind it.
	const keepOpen = (event: Event) => {
		if (previewOpen) event.preventDefault();
	};
	return (
		<>
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>{children}</PopoverTrigger>
			{/* Figma: 520px, no padding of its own; the header, body and actions 8px apart. */}
			<PopoverContent
				align='end'
				sideOffset={8}
				aria-labelledby={titleId}
				className='flex max-h-[min(640px,var(--radix-popover-content-available-height))] w-[520px] flex-col gap-2 p-0'
				// Opening it, focus goes to the popover itself (it's announced by its title), not to its first button.
				onOpenAutoFocus={(event) => {
					event.preventDefault();
					(event.currentTarget as HTMLElement | null)?.focus();
				}}
				onInteractOutside={keepOpen}
				onFocusOutside={keepOpen}
				onCloseAutoFocus={(event) => {
					if (!leaving.current) return;
					leaving.current = false;
					event.preventDefault();
				}}
			>
				{/* Header: 20px on top and the sides; lg bold, prominent (Figma "lg/lg -bold"). */}
				<Typography as='h2' id={titleId} size='lg' weight='bold' className='px-5 pt-5 text-foreground-prominent'>
					{title}
				</Typography>
				{/* Body: 20px on the sides, its parts 16px apart; scrolls if the window is short. 4px below, so the note field's focus
				    ring isn't clipped by the scrolling (the actions take 4px less above, so it's still 8px + 8px to the buttons). */}
				{/* Published, there are no buttons below: 20px at the bottom instead. */}
				<div className={cn("scrollbar-subtle flex min-h-0 flex-col gap-4 overflow-y-auto px-5", published ? "pb-5" : "pb-1")}>
					{description ? <p className='text-base font-medium text-foreground'>{description}</p> : null}
					{/* Published: when, after a clock, then where, 4px apart (sparks.ds 138:3053). */}
					<div className={cn("flex flex-col gap-1", !(published && publishedAt) && "contents")}>
						{published && publishedAt ? (
							<p className='flex items-center gap-1.5 text-sm font-medium text-foreground'>
								<Clock aria-hidden className='size-4 shrink-0 text-icon' />
								{publishedAt}
							</p>
						) : null}
						{link ? (
							<a
								href={linkHref ?? link}
								target='_blank'
								rel='noreferrer'
								// It opens in a new tab, and the popover closes behind it (focus doesn't go back to the trigger).
								onClick={() => {
									leaving.current = true;
									setOpen(false);
								}}
								className='flex w-fit max-w-full items-center gap-1.5 rounded-sm text-sm font-medium text-link outline-none hover:underline focus-visible:ring-[3px] focus-visible:ring-ring/50'
							>
								<Globe aria-hidden className='size-4 shrink-0' />
								<span className='truncate'>{link}</span>
							</a>
						) : null}
					</div>
					{items.length ? (
						<div className='flex flex-col gap-2 text-sm text-foreground'>
							<p id={itemsId} className='font-semibold'>
								{itemsLabel}
							</p>
							<PublishItems aria-labelledby={itemsId} items={items} />
						</div>
					) : null}
					{next ? (
						<div className='text-sm text-foreground'>
							<p className='font-semibold'>{nextLabel}</p>
							<p>{next}</p>
						</div>
					) : null}
					{audience?.tone === "warning" ? (
						// No one yet: a box, 16px around and 16px corners, the line and the button 12px apart (sparks.ds 129:2272).
						<div className='flex flex-col items-start gap-3 rounded-2xl border border-warning-muted bg-warning-subtle p-4 text-sm'>
							<p className='flex items-center gap-2 font-semibold text-warning-emphasis'>
								{/* sparks.ds "triangle-exclamation-point" Style=Solid, 20px, in the warning color, the "!" cut out. */}
								<TriangleAlert aria-hidden className='size-5 shrink-0 fill-warning text-warning [&>path:not(:first-child)]:stroke-warning-subtle' />
								{audience.title}
							</p>
							{audience.action ? (
								<Button
									variant='outline'
									className='w-full'
									onClick={() => {
										leaving.current = true;
										setOpen(false);
										audience.action?.onClick();
									}}
								>
									{audience.action.label}
								</Button>
							) : null}
						</div>
					) : audience ? (
						// Who it goes to, with no box (sparks.ds 136:2774): the line semibold, its detail under it, then the link, 4px
						// apart, 8px more below.
						<div className={cn("flex flex-col items-start gap-1 text-sm text-foreground", !published && "pb-2")}>
							<p>
								<span className='font-semibold'>{audience.title}</span>
								{audience.detail ? (
									<>
										<br />
										{audience.detail}
									</>
								) : null}
							</p>
							{audience.action ? (
								<button
									type='button'
									onClick={() => {
										leaving.current = true;
										setOpen(false);
										audience.action?.onClick();
									}}
									className='rounded-sm font-medium text-link outline-none hover:underline focus-visible:ring-[3px] focus-visible:ring-ring/50'
								>
									{audience.action.label}
								</button>
							) : null}
						</div>
					) : null}
					{/* Links, 24px apart: add a note, see the email. sm medium, foreground, each after its 14px icon (8px gap). The note's
					    field opens under them (Expand: its height and the 16px above it grow together, so nothing jumps). */}
					{preview || note ? (
						<div className='flex flex-col'>
							<div className='flex flex-wrap gap-6'>
								{/* "Add a note" opens the field; then "Remove note", which empties it and closes it. */}
								{note ? (
									noteOpen ? (
										<Button
											variant='link'
											className={inlineLink}
											onClick={() => {
												note.onChange("");
												setNoteOpen(false);
											}}
										>
											<Trash2 aria-hidden />
											{note.removeLabel ?? "Remove note"}
										</Button>
									) : (
										<Button variant='link' className={inlineLink} onClick={() => setNoteOpen(true)}>
											<SquarePen aria-hidden />
											{note.label ?? "Add a note"}
										</Button>
									)
								) : null}
								{preview ? (
									<Button variant='link' className={inlineLink} onClick={() => setPreviewOpen(true)}>
										<Mail aria-hidden />
										{preview.label ?? "View invite email"}
									</Button>
								) : null}
							</div>
							<AnimatePresence initial={false}>
								{note && noteOpen ? (
									<motion.div
										key='note'
										{...noteClip}
										// 4px of room around the field (taken back by the margins), so its focus ring isn't cut by the clip
										// while it opens: it's focused at once, before the clip comes off (DESIGN.md).
										className='-mx-1 -mb-1 px-1 pb-1'
										variants={expandVariants}
										initial={prefersReducedMotion ? false : "initial"}
										animate='animate'
										exit={prefersReducedMotion ? undefined : "exit"}
									>
										{/* The note, once she's asked for it: empty, two lines tall, focused. */}
										<div className='pt-4'>
											<textarea
												aria-label={note.fieldLabel ?? "Note"}
												value={note.value}
												placeholder={note.placeholder ?? "Add your note..."}
												autoFocus
												rows={2}
												onChange={(event) => note.onChange(event.target.value)}
												className='w-full resize-none rounded-input border border-border bg-background px-[11px] py-[7px] text-sm text-foreground outline-none placeholder:text-foreground-subtle focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50'
											/>
										</div>
									</motion.div>
								) : null}
							</AnimatePresence>
						</div>
					) : null}
				</div>
				{/* Actions: 8px above, 20px below and on the sides, on the right, 8px apart. None once it's published. */}
				{published ? null : (
					<div className='flex justify-end gap-2 px-5 pt-1 pb-5'>
						<Button variant='outline' onClick={() => setOpen(false)}>
							{cancelLabel}
						</Button>
						<Button
							variant='neutral'
							disabled={blocked}
							onClick={() => {
								setOpen(false);
								onPublish?.();
							}}
						>
							{publishLabel}
						</Button>
					</div>
				)}
			</PopoverContent>
		</Popover>
		{/* Outside the popover's content, so opening it doesn't close the popover; closing it, focus goes back to the link. */}
		{preview ? (
			<Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
				{/* 808px wide with 84px around: the email's 640px column centered, as much space above and below it as beside it. */}
				<DialogContent className='max-h-[calc(100vh-4rem)] gap-6 overflow-y-auto p-[84px] sm:max-w-[808px]'>
					{/* Named for screen readers only: what it shows (the email) has its own heading. */}
					<DialogHeader className='sr-only'>
						<DialogTitle>{preview.title ?? "Invite email"}</DialogTitle>
					</DialogHeader>
					{preview.children}
				</DialogContent>
			</Dialog>
		) : null}
		</>
	);
}

export { PublishItems, PublishPopover, type PublishItem, type PublishPath, type PublishPopoverProps };
