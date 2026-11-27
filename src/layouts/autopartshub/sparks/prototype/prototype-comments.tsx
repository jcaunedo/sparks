import * as React from "react";
import { ArrowUp, AtSign, CircleCheck, MessageCirclePlus, RotateCcw, Trash2 } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/data-display/avatar";
import { Button } from "@/components/buttons/button";
import { Popover, PopoverAnchor, PopoverContent, PopoverTrigger } from "@/components/overlays/popover";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/overlays/tooltip";
import { formatRelativeDate } from "@/lib/relative-date";
import { scrollContainerOf } from "@/lib/motion";
import { cn } from "@/lib/utils";

import { handlePeopleKeys, matchPeople, PeopleList, type PeopleOption } from "@/components/forms/people-list";

/*
 * Comments on the prototype (prds/sparks-prototype.md, "Commenting on it"): with "Add comment" on, a click on the
 * prototype drops a pin there and opens a popover to write the comment; once added, the pin stays. Not in Figma yet.
 */

/** Who wrote it: name and photo, and for a reviewer their team ("UX team"), shown after the name. */
type PrototypeCommentAuthor = { name: string; avatarSrc?: string; role?: string };

/**
 * Someone who can be tagged in a comment with "@" (prds/sparks-prototype.md, "Commenting on it"): a person, with their
 * team, or a whole department.
 */
type CommentMention = PeopleOption;

/** A reply in a comment's thread. */
type PrototypeCommentReply = { id: string; text: string; createdAt: string; author: PrototypeCommentAuthor; mentions?: CommentMention[] };

/**
 * Where a comment sits: an element she can point at (`point`, so the pin comes back when its screen does), or else the
 * element she clicked (`node`, shown while it's on screen); `fx`/`fy` place it inside that element (0–1).
 */
type CommentAnchor = {
	point?: string;
	/** Which of the elements with that `point` on the screen, when there are several (each part's fit message in the cart). */
	nth?: number;
	node?: HTMLElement;
	fx: number;
	fy: number;
	/**
	 * The screen it's on (its place in the prototype's screens) and the part that screen shows, so it opens there and its
	 * pin shows only there. Without `view`, a screen that can't be opened on directly: it shows with its element.
	 */
	view?: number;
	part?: string;
	/** Where it is on that screen (0–1), for an element with no `point` once the screen has been left and opened again. */
	screenAt?: { fx: number; fy: number };
	/** What she clicked, in words ("Add your vehicle"), when it says something. */
	where?: string;
	/** The text she selected to comment on, when she started it from a selection: shown quoted above the comment. */
	quote?: string;
	/** Where that text is in its element's text (`point`, or `node`): highlighted there while the comment is open. */
	quoteAt?: { start: number; length: number };
};

/** Where comments are being added: the audience and device shown. A pin shows only where it was added. */
type CommentScope = { key: string; audience: string; audienceLabel: string; device: "phone" | "desktop" };

type PrototypeComment = CommentAnchor & {
	id: string;
	scope: CommentScope;
	/** The path it's on (a direction built), when the prototype has paths; set by whoever keeps the comments. */
	path?: { id: string; label: string };
	text: string;
	createdAt: string;
	author: PrototypeCommentAuthor;
	/** Who it tags ("@Priya Shah", "@Catalog"): shown in the brand color in the text. */
	mentions?: CommentMention[];
	/** The thread: replies, oldest first. */
	replies?: PrototypeCommentReply[];
	/** Marked as resolved: its pin leaves the prototype (it shows again when it's opened from the Comments panel). */
	resolved?: boolean;
};

type PrototypeCommentsProps = {
	/** "Add comment" is on: a click (or Enter) on the prototype starts a comment instead of using it. */
	active: boolean;
	author: PrototypeCommentAuthor;
	/** The audience and device shown. */
	scope: CommentScope;
	comments: PrototypeComment[];
	onAdd: (comment: PrototypeComment) => void;
	/** Deleting a comment: only `author`'s own. */
	onDelete: (id: string) => void;
	/** A reply added, or the comment resolved or reopened. Without it, the thread is read-only. */
	onUpdate?: (comment: PrototypeComment) => void;
	/** Who can be tagged with "@" in a comment or a reply: people and departments. Without it, there's no "@". */
	mentionable?: CommentMention[];
	/** The comment whose popover is open, e.g. opened from the Comments panel; with `onOpenChange`, controlled. */
	openId?: string;
	onOpenChange?: (id: string | undefined) => void;
	/**
	 * Comments can start from selected text too: selecting text shows "Add comment" above it, which starts a comment
	 * pinned where the selection starts, with the text quoted (the idea for review; not the prototype, whose text is UI).
	 */
	selectable?: boolean;
	/**
	 * The layer takes its container's full height (`h-full`, default: the prototype's device). Off, it's as tall as what's
	 * in it (the idea for review, in a scrolling card: with the full height, the text would run past it and the card's
	 * bottom padding would be lost).
	 */
	fill?: boolean;
	children: React.ReactNode;
};

/** The screen on show in the prototype, with its `view` and `part` (`ShopScreen`). */
const screenIn = (content: Element | null | undefined) => {
	const root = content?.querySelector<HTMLElement>("[data-view]") ?? undefined;
	return { root, view: root ? Number(root.dataset.view) : undefined, part: root?.dataset.part };
};

/** Whether the screen on show is the comment's. */
const onCommentScreen = (content: Element | null | undefined, comment: Pick<CommentAnchor, "view" | "part">) => {
	const screen = screenIn(content);
	return comment.view === undefined || (screen.view === comment.view && (!comment.part || screen.part === comment.part));
};

/** What an element says, for "where" a comment is: its own text or name, first line, when it's short enough to name it. */
function describe(element: HTMLElement, pointable: boolean) {
	if (!pointable && element.children.length > 0) return undefined;
	const name = element.getAttribute("aria-label")?.replace(/ \(you can type over it\)$/, "") || element.innerText || "";
	const line = name.split("\n")[0].trim();
	return line && line.length <= 60 ? line : undefined;
}

const initials = (name: string) =>
	name
		.split(/\s+/)
		.map((word) => word.charAt(0))
		.slice(0, 2)
		.join("")
		.toUpperCase();

/**
 * A comment's pin: her avatar in a white drop whose bottom-left corner marks the spot. Blue while its popover is open.
 * Sits with that corner on the point it was added at.
 */
function Pin({ author, open, className, ...props }: React.ComponentProps<"button"> & { author: PrototypeCommentAuthor; open?: boolean }) {
	return (
		<button
			type='button'
			data-comment-pin=''
			className={cn(
				"absolute size-9 -translate-y-full rounded-full rounded-bl-none p-[3px] shadow-md outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring",
				open ? "bg-primary" : "bg-background",
				className,
			)}
			{...props}
		>
			<Avatar className='size-full'>
				{author.avatarSrc ? <AvatarImage src={author.avatarSrc} alt='' /> : null}
				<AvatarFallback className='text-[10px]'>{initials(author.name)}</AvatarFallback>
			</Avatar>
		</button>
	);
}

/** A comment's text with the people and teams it tags ("@Priya Shah") in the brand color. */
function MentionText({ text, mentions = [] }: { text: string; mentions?: CommentMention[] }) {
	const names = mentions.map((m) => m.name).sort((x, y) => y.length - x.length);
	if (!names.length) return <>{text}</>;
	const pattern = new RegExp(`(@(?:${names.map((n) => n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")}))`, "g");
	return (
		<>
			{text.split(pattern).map((piece, index) =>
				index % 2 ? (
					<span key={index} className='font-medium text-primary'>
						{piece}
					</span>
				) : (
					piece
				),
			)}
		</>
	);
}

/** The "@…" being typed right before the caret, if any: where it starts and what's typed after it. */
function mentionQuery(text: string, caret: number) {
	const before = text.slice(0, caret);
	const at = before.lastIndexOf("@");
	if (at < 0 || (at > 0 && !/\s/.test(before[at - 1]))) return undefined;
	const query = before.slice(at + 1);
	return query.length <= 30 && !/\n/.test(query) ? { start: at, query } : undefined;
}

/**
 * The box she writes in: Enter adds the comment, Shift+Enter a new line, Esc (the popover's) drops it. With
 * `mentionable`, "@" (typed, or the button at the bottom left) opens the list of people and teams to tag: typing narrows
 * it, ↑/↓ move, Enter or Tab picks, Esc closes only the list.
 */
function CommentForm({
	onSubmit,
	label = "Comment",
	placeholder = "Add a comment",
	autoFocus = true,
	rows = 3,
	mentionable = [],
}: {
	onSubmit: (text: string, mentions: CommentMention[]) => void;
	label?: string;
	placeholder?: string;
	autoFocus?: boolean;
	rows?: number;
	mentionable?: CommentMention[];
}) {
	const [text, setText] = React.useState("");
	const [caret, setCaret] = React.useState(0);
	const [tagged, setTagged] = React.useState<CommentMention[]>([]);
	const [active, setActive] = React.useState(0);
	const [dismissed, setDismissed] = React.useState<number>();
	const ref = React.useRef<HTMLTextAreaElement>(null);
	// The box the "@" list opens under.
	const boxRef = React.useRef<HTMLDivElement>(null);
	const listId = React.useId();

	const query = mentionable.length ? mentionQuery(text, caret) : undefined;
	const matches = query ? matchPeople(mentionable, query.query) : [];
	const listOpen = Boolean(query) && matches.length > 0 && dismissed !== query?.start;
	React.useEffect(() => setActive(0), [query?.query]);

	const reset = () => {
		setText("");
		setTagged([]);
		setCaret(0);
	};
	const submit = () => {
		const value = text.trim();
		if (!value) return;
		// Only the tags still in the text.
		onSubmit(value, tagged.filter((m) => value.includes(`@${m.name}`)));
		reset();
	};
	// Where the caret goes after a tag is put in: set right after the text renders, before she types on.
	const pendingCaret = React.useRef<number>(undefined);
	React.useLayoutEffect(() => {
		const position = pendingCaret.current;
		if (position === undefined || !ref.current) return;
		pendingCaret.current = undefined;
		ref.current.focus();
		ref.current.setSelectionRange(position, position);
		setCaret(position);
	}, [text]);
	const moveCaret = (position: number) => {
		pendingCaret.current = position;
	};
	const pick = (mention: CommentMention) => {
		if (!query) return;
		const inserted = `@${mention.name} `;
		const next = text.slice(0, query.start) + inserted + text.slice(caret);
		setText(next);
		setTagged((current) => (current.some((m) => m.id === mention.id) ? current : [...current, mention]));
		moveCaret(query.start + inserted.length);
	};
	// The "@" button: starts a tag where the caret is (after a space), and opens the list.
	const startMention = () => {
		const position = ref.current?.selectionStart ?? text.length;
		const before = text.slice(0, position);
		const insert = before && !/\s$/.test(before) ? " @" : "@";
		setText(before + insert + text.slice(position));
		setDismissed(undefined);
		moveCaret(position + insert.length);
	};

	return (
		<form
			onSubmit={(event) => {
				event.preventDefault();
				submit();
			}}
		>
			<div ref={boxRef}>
				<textarea
					ref={ref}
					autoFocus={autoFocus}
					aria-label={label}
					placeholder={placeholder}
					rows={rows}
					value={text}
					role={mentionable.length ? "combobox" : undefined}
					aria-autocomplete={mentionable.length ? "list" : undefined}
					aria-expanded={mentionable.length ? listOpen : undefined}
					aria-controls={listOpen ? listId : undefined}
					aria-activedescendant={listOpen ? `${listId}-${active}` : undefined}
					onChange={(event) => {
						setText(event.target.value);
						setCaret(event.target.selectionStart);
					}}
					onSelect={(event) => setCaret(event.currentTarget.selectionStart)}
					onKeyDown={(event) => {
						// The list's keys first; Esc closes the list, not the comment.
						if (listOpen && handlePeopleKeys(event, { options: matches, active, setActive, pick, close: () => setDismissed(query?.start) }))
							return;
						if (event.key === "Enter" && !event.shiftKey) {
							event.preventDefault();
							submit();
						}
					}}
					className='block w-full resize-none bg-transparent px-4 pt-4 text-sm text-foreground outline-none placeholder:text-muted-foreground'
				/>
				{/* The people and teams to tag, under the box (the same list as Share's field). */}
				{listOpen ? (
					<PeopleList
						id={listId}
						label='People and teams'
						options={matches}
						active={active}
						onActiveChange={setActive}
						onPick={pick}
						anchor={boxRef}
						inset={8}
					/>
				) : null}
			</div>
			{/* "@" at the bottom left, to tag someone; send on the right. */}
			<div className={cn("flex items-center border-t border-border px-3 py-2", mentionable.length ? "justify-between" : "justify-end")}>
				{mentionable.length ? (
					<Tooltip>
						<TooltipTrigger asChild>
							<Button type='button' variant='ghost' size='icon' aria-label='Mention someone' className='size-8 rounded-full text-icon' onClick={startMention}>
								<AtSign aria-hidden />
							</Button>
						</TooltipTrigger>
						<TooltipContent side='bottom' sideOffset={6}>
							Mention someone
						</TooltipContent>
					</Tooltip>
				) : null}
				<Button type='submit' size='icon' aria-label={label === "Comment" ? "Add comment" : `Send ${label.toLowerCase()}`} disabled={!text.trim()} className='size-8 rounded-full'>
					<ArrowUp aria-hidden />
				</Button>
			</div>
		</form>
	);
}

/** One message in a thread: avatar, name with their team under it, when, then the text. */
/** How far above selected text "Add comment" floats, and the pin it becomes, in px. */
const selectionGap = 8;

/** The name of the highlight on the open comment's quoted text (CSS Custom Highlight API). */
const quoteHighlight = "comment-quote";

/**
 * Where a comment's quoted text is now: in its element (its `point`, or the `node` it was made on), at `quoteAt`, or,
 * if the text has changed since, wherever that text is found in it. None when it's gone.
 */
function quoteRange(content: HTMLElement, anchor: CommentAnchor): Range | undefined {
	let element: HTMLElement | null | undefined = anchor.node?.isConnected && content.contains(anchor.node) ? anchor.node : null;
	if (!element && anchor.point) element = content.querySelector<HTMLElement>(`[data-point="${CSS.escape(anchor.point)}"]`);
	if (!element || !anchor.quote) return undefined;
	const text = element.textContent ?? "";
	const wanted = anchor.quote.replace(/…$/, "");
	let start = anchor.quoteAt?.start ?? -1;
	let length = anchor.quoteAt?.length ?? 0;
	const at = (from: number, size: number) => text.slice(from, from + size).replace(/\s+/g, " ").trim();
	if (start < 0 || !at(start, length).startsWith(wanted.slice(0, 40))) {
		start = text.indexOf(wanted);
		length = wanted.length;
	}
	if (start < 0) return undefined;
	// From character offsets to a range over the element's text nodes.
	const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
	const range = document.createRange();
	let seen = 0;
	let started = false;
	for (let node = walker.nextNode(); node; node = walker.nextNode()) {
		const size = node.textContent?.length ?? 0;
		if (!started && start <= seen + size) {
			range.setStart(node, start - seen);
			started = true;
		}
		if (started && start + length <= seen + size) {
			range.setEnd(node, start + length - seen);
			return range;
		}
		seen += size;
	}
	return undefined;
}

/** The text a comment is about, quoted: a line on its left, muted, at most three lines. */
function Quote({ text, className }: { text: string; className?: string }) {
	return <p className={cn("line-clamp-3 border-s-2 border-border-defined ps-2 text-sm text-muted-foreground", className)}>{text}</p>;
}

function ThreadEntry({
	author,
	createdAt,
	text,
	quote,
	mentions,
	actions,
}: {
	author: PrototypeCommentAuthor;
	createdAt: string;
	text: string;
	/** The text it's about (started from a selection), quoted above it. */
	quote?: string;
	mentions?: CommentMention[];
	actions?: React.ReactNode;
}) {
	const time = formatRelativeDate(createdAt);
	return (
		// 8px between the name, the quote and the text.
		<div className='flex flex-col gap-2'>
			<div className='flex items-center gap-2'>
				<Avatar className='size-6'>
					{author.avatarSrc ? <AvatarImage src={author.avatarSrc} alt='' /> : null}
					<AvatarFallback className='text-[10px]'>{initials(author.name)}</AvatarFallback>
				</Avatar>
				{/* The name, with their team under it. */}
				<span className='flex min-w-0 flex-col'>
					<span className='text-sm font-semibold text-foreground'>{author.name}</span>
					{author.role ? <span className='text-xs text-foreground'>{author.role}</span> : null}
				</span>
				{/* When, on the right, before the actions. */}
				<time dateTime={createdAt} title={time.title} className='ms-auto shrink-0 text-xs text-muted-foreground'>
					{time.label}
				</time>
				{actions ? <span className='flex items-center gap-0.5'>{actions}</span> : null}
			</div>
			{quote ? <Quote text={quote} className='ms-8' /> : null}
			<p className='ps-8 text-sm whitespace-pre-line text-foreground'>
				<MentionText text={text} mentions={mentions} />
			</p>
		</div>
	);
}

/** A small icon action in a thread's header, named in a tooltip. */
function ThreadAction({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<Button variant='ghost' size='icon' aria-label={label} className='size-7 rounded-button-sm text-icon' onClick={onClick}>
					{children}
				</Button>
			</TooltipTrigger>
			<TooltipContent side='bottom' sideOffset={6}>
				{label}
			</TooltipContent>
		</Tooltip>
	);
}

/**
 * The prototype with its comment pins over it. The pins sit in a layer of their own beside the screens, placed from the
 * element each is anchored to, and move with it as the screen changes or scrolls.
 */
function PrototypeComments({
	active,
	author,
	scope,
	comments,
	onAdd,
	onDelete,
	onUpdate,
	mentionable,
	openId: openIdProp,
	onOpenChange,
	selectable = false,
	fill = true,
	children,
}: PrototypeCommentsProps) {
	const contentRef = React.useRef<HTMLDivElement>(null);
	const wrapperRef = React.useRef<HTMLDivElement>(null);
	const [draft, setDraft] = React.useState<CommentAnchor | null>(null);
	const [openIdState, setOpenIdState] = React.useState<string | undefined>(undefined);
	const openId = onOpenChange ? openIdProp : openIdState;
	const setOpenId = onOpenChange ?? setOpenIdState;
	const openIdNow = React.useRef(openId);
	openIdNow.current = openId;
	const [positions, setPositions] = React.useState<Record<string, { x: number; y: number } | null>>({});
	// Resolved comments leave the prototype, unless one is opened (from the Comments panel).
	const shown = comments.filter((comment) => comment.scope.key === scope.key && (!comment.resolved || comment.id === openId));

	// Where an anchor is now, in the layer's coordinates; null while its element isn't on screen.
	const place = React.useCallback((anchor: CommentAnchor) => {
		const content = contentRef.current;
		const wrapper = wrapperRef.current;
		if (!content || !wrapper) return null;
		if (!onCommentScreen(content, anchor)) return null;
		let { fx, fy } = anchor;
		let element: HTMLElement | null | undefined = anchor.node?.isConnected && content.contains(anchor.node) ? anchor.node : null;
		if (!element && anchor.point) {
			const matches = content.querySelectorAll<HTMLElement>(`[data-point="${CSS.escape(anchor.point)}"]`);
			element = matches[anchor.nth ?? 0] ?? matches[0];
		}
		if (!element && anchor.screenAt && anchor.view !== undefined) {
			element = screenIn(content).root;
			({ fx, fy } = anchor.screenAt);
		}
		if (!element) return null;
		const rect = element.getBoundingClientRect();
		const origin = wrapper.getBoundingClientRect();
		// The phone can be scaled to fit (`FitPhone`): pins sit in its own, unscaled pixels.
		const k = origin.width / (wrapper.offsetWidth || origin.width || 1) || 1;
		return { x: Math.round((rect.left - origin.left + fx * rect.width) / k), y: Math.round((rect.top - origin.top + fy * rect.height) / k) };
	}, []);

	const measure = React.useCallback(() => {
		const next: Record<string, { x: number; y: number } | null> = {};
		for (const comment of shown) next[comment.id] = place(comment);
		if (draft) next.draft = place(draft);
		setPositions((current) => (JSON.stringify(current) === JSON.stringify(next) ? current : next));
	}, [shown, draft, place]);

	React.useLayoutEffect(measure, [measure]);
	// The screens change under the pins (a new screen, text typed over, a resize): place them again.
	React.useEffect(() => {
		const content = contentRef.current;
		if (!content) return;
		let frame = 0;
		const schedule = () => {
			cancelAnimationFrame(frame);
			frame = requestAnimationFrame(measure);
		};
		const resize = new ResizeObserver(schedule);
		resize.observe(content);
		const mutations = new MutationObserver(schedule);
		mutations.observe(content, { subtree: true, childList: true, characterData: true, attributes: true });
		// What's pinned to the bottom of the screen stays while the rest scrolls, and so does its pin.
		const scroller = scrollContainerOf(content);
		scroller.addEventListener("scroll", schedule, { passive: true });
		return () => {
			cancelAnimationFrame(frame);
			scroller.removeEventListener("scroll", schedule);
			resize.disconnect();
			mutations.disconnect();
		};
	}, [measure]);
	// The comment opened comes into view inside the device, once its screen is there.
	const openPlaced = Boolean(openId && positions[openId]);
	React.useEffect(() => {
		const wrapper = wrapperRef.current;
		const pin = openPlaced ? wrapper?.querySelector<HTMLElement>("[data-comment-pin][aria-expanded=true]") : undefined;
		if (!wrapper || !pin) return;
		const scroller = scrollContainerOf(wrapper);
		const p = pin.getBoundingClientRect();
		const s = scroller.getBoundingClientRect();
		const k = s.height / (scroller.offsetHeight || s.height || 1) || 1;
		if (p.top < s.top + 24 || p.bottom > s.bottom - 24) scroller.scrollTop += (p.top - s.top - s.height / 3) / k;
	}, [openId, openPlaced]);
	// Turning "Add comment" off drops a comment she hadn't added, unless it started from a selection (no mode for that).
	React.useEffect(() => {
		if (!active) setDraft((current) => (current?.quote ? current : null));
	}, [active]);

	// Selected text: "Add comment" above it, where the selection starts; it follows the text as it scrolls.
	const [selection, setSelection] = React.useState<{ x: number; y: number; anchor: CommentAnchor } | null>(null);
	React.useEffect(() => {
		if (!selectable) return;
		const update = () => {
			const content = contentRef.current;
			const wrapper = wrapperRef.current;
			const picked = document.getSelection();
			if (!content || !wrapper || !picked || picked.isCollapsed || !picked.rangeCount) return setSelection(null);
			const range = picked.getRangeAt(0);
			const quote = picked.toString().replace(/\s+/g, " ").trim();
			if (!quote || !content.contains(range.commonAncestorContainer)) return setSelection(null);
			const lines = [...range.getClientRects()].filter((rect) => rect.width > 0);
			const first = lines[0] ?? range.getBoundingClientRect();
			// The pin goes where "Add comment" shows, so the button becomes the pin: above where the selection starts, its corner
			// `selectionGap` over the first line's top-left, on the part (`data-point`) it starts in, so it moves with it.
			const begin = range.startContainer instanceof HTMLElement ? range.startContainer : range.startContainer.parentElement;
			if (!begin) return setSelection(null);
			const pointable = begin.closest<HTMLElement>("[data-point]");
			const element = pointable && content.contains(pointable) ? pointable : begin;
			const rect = element.getBoundingClientRect();
			// Where the text starts in the element's text, to highlight it again while the comment is open.
			const before = document.createRange();
			before.setStart(element, 0);
			before.setEnd(range.startContainer, range.startOffset);
			const quoteAt = element.contains(range.startContainer) ? { start: before.toString().length, length: range.toString().length } : undefined;
			const origin = wrapper.getBoundingClientRect();
			setSelection({
				x: first.left - origin.left,
				y: first.top - origin.top,
				anchor: {
					point: element === pointable ? pointable.dataset.point : undefined,
					node: element,
					fx: (first.left - rect.left) / (rect.width || 1),
					fy: (first.top - selectionGap - rect.top) / (rect.height || 1),
					where: element === pointable ? describe(pointable, true) : undefined,
					quote: quote.length > 280 ? `${quote.slice(0, 277)}…` : quote,
					quoteAt,
				},
			});
		};
		document.addEventListener("selectionchange", update);
		const scroller = contentRef.current ? scrollContainerOf(contentRef.current) : undefined;
		scroller?.addEventListener("scroll", update, { passive: true });
		return () => {
			document.removeEventListener("selectionchange", update);
			scroller?.removeEventListener("scroll", update);
		};
	}, [selectable]);
	// The open comment's text (or the one being written from a selection), highlighted where it is.
	const quoted = draft?.quote ? draft : shown.find((comment) => comment.id === openId && comment.quote);
	React.useEffect(() => {
		const content = contentRef.current;
		if (!quoted || !content || typeof CSS === "undefined" || !("highlights" in CSS)) return;
		const range = quoteRange(content, quoted);
		if (!range) return;
		CSS.highlights.set(quoteHighlight, new Highlight(range));
		return () => {
			CSS.highlights.delete(quoteHighlight);
		};
	}, [quoted]);

	const startFromSelection = () => {
		if (!selection) return;
		setOpenId(undefined);
		setDraft(selection.anchor);
		setSelection(null);
		document.getSelection()?.removeAllRanges();
	};

	// Where a comment goes when it's put on `target` at a point (client coordinates; none: its middle): the part it's on
	// (`data-point`) or the element itself, where inside it, and its screen.
	const anchorOn = (target: HTMLElement, client?: { x: number; y: number }): CommentAnchor | null => {
		const content = contentRef.current;
		if (!content?.contains(target)) return null;
		const pointable = target.closest<HTMLElement>("[data-point]");
		const element = pointable && content.contains(pointable) ? pointable : target;
		const rect = element.getBoundingClientRect();
		const at = client
			? { fx: (client.x - rect.left) / (rect.width || 1), fy: (client.y - rect.top) / (rect.height || 1) }
			: { fx: 0.5, fy: 0.5 };
		// Its screen, and where on it, so it opens there later.
		const { root, view, part } = screenIn(content);
		const r = root?.getBoundingClientRect();
		const screenAt = r && { fx: (rect.left + at.fx * rect.width - r.left) / (r.width || 1), fy: (rect.top + at.fy * rect.height - r.top) / (r.height || 1) };
		const point = element === pointable ? pointable.dataset.point : undefined;
		const nth = point ? [...content.querySelectorAll(`[data-point="${CSS.escape(point)}"]`)].indexOf(element) : undefined;
		return { point, nth, node: element, view, part, screenAt, where: describe(element, element === pointable), ...at };
	};

	// With "Add comment" on, a click on the prototype starts a comment there instead of using it; Enter starts one on
	// the element with focus, in its middle.
	const start = (event: React.MouseEvent | React.KeyboardEvent) => {
		const target = event.target as HTMLElement;
		if (!active || !contentRef.current?.contains(target)) return;
		event.preventDefault();
		event.stopPropagation();
		const anchor = anchorOn(target, "clientX" in event ? { x: event.clientX, y: event.clientY } : undefined);
		if (!anchor) return;
		setOpenId(undefined);
		setDraft(anchor);
	};

	// Dragging a pin (the one being written, or her own once added) moves it: it follows the pointer, and where it's
	// dropped (its corner) is where it sits now, on whatever is there. A click without moving opens it, as before.
	const [dragged, setDragged] = React.useState<{ id: string; x: number; y: number } | null>(null);
	const drag = React.useRef<{ id: string; pointer: number; from: { x: number; y: number }; at: { x: number; y: number }; k: number; moved: boolean } | null>(null);
	const justDragged = React.useRef(false);
	const dragHandlers = (id: string, onDrop: (anchor: CommentAnchor) => void) => ({
		onPointerDown: (event: React.PointerEvent<HTMLButtonElement>) => {
			justDragged.current = false;
			const at = positions[id];
			const wrapper = wrapperRef.current;
			if (event.button !== 0 || !at || !wrapper) return;
			const origin = wrapper.getBoundingClientRect();
			const k = origin.width / (wrapper.offsetWidth || origin.width || 1) || 1;
			drag.current = { id, pointer: event.pointerId, from: { x: event.clientX, y: event.clientY }, at, k, moved: false };
			event.currentTarget.setPointerCapture(event.pointerId);
			// Focus stays where it is (the comment being written keeps its caret); a click still opens it.
			event.preventDefault();
		},
		onPointerMove: (event: React.PointerEvent<HTMLButtonElement>) => {
			const d = drag.current;
			if (!d || d.pointer !== event.pointerId) return;
			const dx = event.clientX - d.from.x;
			const dy = event.clientY - d.from.y;
			// A few pixels first, so a click that wobbles still opens it.
			if (!d.moved && Math.hypot(dx, dy) < 4) return;
			d.moved = true;
			setDragged({ id, x: d.at.x + dx / d.k, y: d.at.y + dy / d.k });
		},
		onPointerUp: (event: React.PointerEvent<HTMLButtonElement>) => {
			const d = drag.current;
			drag.current = null;
			if (!d?.moved) return;
			justDragged.current = true;
			setDragged(null);
			const wrapper = wrapperRef.current;
			const content = contentRef.current;
			if (!wrapper || !content) return;
			// The pin's corner, where it was dropped.
			const origin = wrapper.getBoundingClientRect();
			const x = origin.left + d.at.x * d.k + (event.clientX - d.from.x);
			const y = origin.top + d.at.y * d.k + (event.clientY - d.from.y);
			const target = document.elementsFromPoint(x, y).find((el): el is HTMLElement => el instanceof HTMLElement && el !== content && content.contains(el));
			// Dropped off the prototype: it goes back where it was.
			const anchor = target ? anchorOn(target, { x, y }) : null;
			if (anchor) onDrop(anchor);
		},
		onPointerCancel: () => {
			drag.current = null;
			setDragged(null);
		},
		// The click that ends a drag doesn't open or close it.
		onClick: (event: React.MouseEvent) => {
			if (!justDragged.current) return;
			justDragged.current = false;
			event.preventDefault();
		},
	});
	// Moved onto another element, a quote's place in the text no longer applies (the quote itself stays).
	const moved = <T extends CommentAnchor>(from: T, anchor: CommentAnchor): T => ({ ...from, ...anchor, quote: from.quote, quoteAt: anchor.node === from.node ? from.quoteAt : undefined });

	return (
		<div ref={wrapperRef} className={cn("relative", fill && "h-full")}>
			{/* The open comment's quoted text: the highlight's color (corn-100, as a marker pen). */}
			{selectable ? <style>{`::highlight(${quoteHighlight}) { background-color: var(--corn-100); color: inherit; }`}</style> : null}
			<div
				ref={contentRef}
				onClickCapture={start}
				// Clicking into text she can type over would focus it: not while commenting.
				onMouseDownCapture={(event) => active && contentRef.current?.contains(event.target as Node) && event.preventDefault()}
				onKeyDownCapture={(event) => (event.key === "Enter" ? start(event) : undefined)}
				// `isolate`: the screens' own stacking (the sticky header and bottom bar) stays under the pins.
				className={cn("isolate", fill && "h-full", active && "cursor-crosshair [&_*]:cursor-crosshair")}
			>
				{children}
			</div>
			{shown.map((comment) => {
				const at = dragged?.id === comment.id ? dragged : positions[comment.id];
				if (!at) return null;
				// Her own comment can be moved (and kept: `onUpdate`).
				const movable = Boolean(onUpdate) && comment.author.name === author.name;
				const time = formatRelativeDate(comment.createdAt);
				return (
					<Popover key={comment.id} open={openId === comment.id} onOpenChange={(open) => setOpenId(open ? comment.id : undefined)}>
						<PopoverTrigger asChild>
							<Pin
								author={comment.author}
								open={openId === comment.id}
								aria-label={`${comment.author.name}'s comment: ${comment.text}${comment.replies?.length ? `, ${comment.replies.length} ${comment.replies.length === 1 ? "reply" : "replies"}` : ""}`}
								style={{ left: at.x, top: at.y }}
								className={cn(movable && "cursor-grab touch-none active:cursor-grabbing", dragged?.id === comment.id && "z-10")}
								{...(movable ? dragHandlers(comment.id, (anchor) => onUpdate?.(moved(comment, anchor))) : {})}
							/>
						</PopoverTrigger>
						{/* The thread: the comment, its replies, a box to reply; resolve or reopen, and delete her own. */}
						<PopoverContent
							side='bottom'
							align='start'
							sideOffset={8}
							aria-label={`${comment.author.name}'s comment`}
							// It follows its pin while the pin is dragged.
							updatePositionStrategy='always'
							className='flex w-80 flex-col gap-3 p-0 outline-none'
							// Focus on the thread, not on its first button, whose tooltip would cover the comment and take the first Esc.
							onOpenAutoFocus={(event) => {
								event.preventDefault();
								(event.currentTarget as HTMLElement).focus();
							}}
							// Another one is opening: this one doesn't take focus back to its pin, which would close that one.
							onCloseAutoFocus={(event) => openIdNow.current && openIdNow.current !== comment.id && event.preventDefault()}
						>
							<div className='flex flex-col gap-3 px-4 pt-4'>
								{comment.resolved ? (
									<p className='flex items-center gap-1.5 text-xs font-medium text-success'>
										<CircleCheck aria-hidden className='size-3.5' /> Resolved
									</p>
								) : null}
								<ThreadEntry
									author={comment.author}
									createdAt={comment.createdAt}
									text={comment.text}
									quote={comment.quote}
									mentions={comment.mentions}
									actions={
										<>
											{onUpdate ? (
												comment.resolved ? (
													<ThreadAction label='Reopen' onClick={() => onUpdate({ ...comment, resolved: false })}>
														<RotateCcw aria-hidden />
													</ThreadAction>
												) : (
													<ThreadAction
														label='Mark as resolved'
														onClick={() => {
															onUpdate({ ...comment, resolved: true });
															setOpenId(undefined);
														}}
													>
														<CircleCheck aria-hidden />
													</ThreadAction>
												)
											) : null}
											{comment.author.name === author.name ? (
												<ThreadAction
													label='Delete comment'
													onClick={() => {
														onDelete(comment.id);
														setOpenId(undefined);
													}}
												>
													<Trash2 aria-hidden />
												</ThreadAction>
											) : null}
										</>
									}
								/>
								{(comment.replies ?? []).map((reply) => (
									<ThreadEntry key={reply.id} author={reply.author} createdAt={reply.createdAt} text={reply.text} mentions={reply.mentions} />
								))}
							</div>
							{onUpdate ? (
								<div className='border-t border-border'>
									<CommentForm
										label='Reply'
										placeholder='Reply'
										rows={1}
										autoFocus={false}
										mentionable={mentionable}
										onSubmit={(text, mentions) =>
											onUpdate({
												...comment,
												resolved: false,
												replies: [
													...(comment.replies ?? []),
													{ id: `reply-${Date.now()}`, text, createdAt: new Date().toISOString(), author, mentions: mentions.length ? mentions : undefined },
												],
											})
										}
									/>
								</div>
							) : null}
						</PopoverContent>
					</Popover>
				);
			})}
			{/* Selected text: "Add comment" floats above where it starts (mousedown keeps the selection). Its hover darkens its
			    own fill (the hover tint mixed into the popover color), never see-through: text sits under it. */}
			{selection && !draft ? (
				<button
					type='button'
					onMouseDown={(event) => event.preventDefault()}
					onClick={startFromSelection}
					className='absolute z-20 flex h-9 -translate-y-full items-center gap-2 rounded-button-lg border border-border bg-popover px-3 text-sm font-medium text-foreground shadow-2xl outline-none hover:bg-[color-mix(in_oklab,var(--foreground)_6%,var(--popover))] focus-visible:ring-2 focus-visible:ring-ring'
					style={{ left: selection.x, top: selection.y - selectionGap }}
				>
					<MessageCirclePlus aria-hidden className='size-4 text-icon' />
					Add comment
				</button>
			) : null}
			{draft && positions.draft ? (
				<Popover open onOpenChange={(open) => !open && setDraft(null)}>
					<PopoverAnchor asChild>
						<Pin
							author={author}
							open
							tabIndex={-1}
							aria-hidden
							data-comment-draft=''
							style={dragged?.id === "draft" ? { left: dragged.x, top: dragged.y } : { left: positions.draft.x, top: positions.draft.y }}
							className='cursor-grab touch-none active:cursor-grabbing'
							{...dragHandlers("draft", (anchor) => setDraft((current) => (current ? moved(current, anchor) : current)))}
						/>
					</PopoverAnchor>
					<PopoverContent
						side='bottom'
						align='start'
						sideOffset={8}
						aria-label='New comment'
						className='w-80 overflow-hidden p-0'
						// It follows its pin while the pin is dragged.
						updatePositionStrategy='always'
						// A click elsewhere on the prototype starts another comment instead, and dragging its pin moves it: don't let
						// either drop this one first.
						onInteractOutside={(event) => {
							const target = event.target as Element;
							if (contentRef.current?.contains(target) || target.closest?.("[data-comment-draft]")) event.preventDefault();
						}}
					>
						{draft.quote ? <Quote text={draft.quote} className='mx-4 mt-4' /> : null}
						<CommentForm
							mentionable={mentionable}
							onSubmit={(text, mentions) => {
								const id = `comment-${Date.now()}`;
								onAdd({ ...draft, id, scope, text, createdAt: new Date().toISOString(), author, mentions: mentions.length ? mentions : undefined });
								setDraft(null);
							}}
						/>
					</PopoverContent>
				</Popover>
			) : null}
		</div>
	);
}

export { MentionText, onCommentScreen, PrototypeComments, type CommentMention, type CommentScope, type PrototypeComment, type PrototypeCommentAuthor, type PrototypeCommentReply, type PrototypeCommentsProps };
