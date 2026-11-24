import * as React from "react";
import { ArrowUp, AtSign, CircleCheck, RotateCcw, Trash2 } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/data-display/avatar";
import { Button } from "@/components/buttons/button";
import { Popover, PopoverAnchor, PopoverContent, PopoverTrigger } from "@/components/overlays/popover";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/overlays/tooltip";
import { formatRelativeDate } from "@/lib/relative-date";
import { cn } from "@/lib/utils";

import { handlePeopleKeys, matchPeople, PeopleList, type PeopleOption } from "../shared/people-list";

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
type CommentAnchor = { point?: string; node?: HTMLElement; fx: number; fy: number; /** What she clicked, in words ("Add your vehicle"), when it says something. */ where?: string };

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
	children: React.ReactNode;
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
			<div className='relative'>
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
						className='absolute inset-x-2 top-full mt-1'
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

/** One message in a thread: avatar, name, team, when, then the text. */
function ThreadEntry({
	author,
	createdAt,
	text,
	mentions,
	actions,
}: {
	author: PrototypeCommentAuthor;
	createdAt: string;
	text: string;
	mentions?: CommentMention[];
	actions?: React.ReactNode;
}) {
	const time = formatRelativeDate(createdAt);
	return (
		<div className='flex flex-col gap-1'>
			<div className='flex items-center gap-2'>
				<Avatar className='size-6'>
					{author.avatarSrc ? <AvatarImage src={author.avatarSrc} alt='' /> : null}
					<AvatarFallback className='text-[10px]'>{initials(author.name)}</AvatarFallback>
				</Avatar>
				<span className='text-sm font-semibold text-foreground'>{author.name}</span>
				{author.role ? <span className='text-xs text-muted-foreground'>{author.role}</span> : null}
				<time dateTime={createdAt} title={time.title} className='text-xs text-muted-foreground'>
					{time.label}
				</time>
				{actions ? <span className='ms-auto flex items-center gap-0.5'>{actions}</span> : null}
			</div>
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
				<Button variant='ghost' size='icon' aria-label={label} className='size-7 text-icon' onClick={onClick}>
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
	children,
}: PrototypeCommentsProps) {
	const contentRef = React.useRef<HTMLDivElement>(null);
	const wrapperRef = React.useRef<HTMLDivElement>(null);
	const [draft, setDraft] = React.useState<CommentAnchor | null>(null);
	const [openIdState, setOpenIdState] = React.useState<string | undefined>(undefined);
	const openId = onOpenChange ? openIdProp : openIdState;
	const setOpenId = onOpenChange ?? setOpenIdState;
	const [positions, setPositions] = React.useState<Record<string, { x: number; y: number } | null>>({});
	// Resolved comments leave the prototype, unless one is opened (from the Comments panel).
	const shown = comments.filter((comment) => comment.scope.key === scope.key && (!comment.resolved || comment.id === openId));

	// Where an anchor is now, in the layer's coordinates; null while its element isn't on screen.
	const place = React.useCallback((anchor: CommentAnchor) => {
		const content = contentRef.current;
		const wrapper = wrapperRef.current;
		if (!content || !wrapper) return null;
		const element =
			anchor.node?.isConnected && content.contains(anchor.node)
				? anchor.node
				: anchor.point
					? content.querySelector<HTMLElement>(`[data-point="${CSS.escape(anchor.point)}"]`)
					: null;
		if (!element) return null;
		const rect = element.getBoundingClientRect();
		const origin = wrapper.getBoundingClientRect();
		// The phone can be scaled to fit (`FitPhone`): pins sit in its own, unscaled pixels.
		const k = origin.width / (wrapper.offsetWidth || origin.width || 1) || 1;
		return { x: Math.round((rect.left - origin.left + anchor.fx * rect.width) / k), y: Math.round((rect.top - origin.top + anchor.fy * rect.height) / k) };
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
		return () => {
			cancelAnimationFrame(frame);
			resize.disconnect();
			mutations.disconnect();
		};
	}, [measure]);
	// Turning "Add comment" off drops a comment she hadn't added.
	React.useEffect(() => {
		if (!active) setDraft(null);
	}, [active]);

	// With "Add comment" on, a click on the prototype starts a comment there instead of using it; Enter starts one on
	// the element with focus, in its middle.
	const start = (event: React.MouseEvent | React.KeyboardEvent) => {
		const target = event.target as HTMLElement;
		if (!active || !contentRef.current?.contains(target)) return;
		event.preventDefault();
		event.stopPropagation();
		const pointable = target.closest<HTMLElement>("[data-point]");
		const element = pointable && contentRef.current.contains(pointable) ? pointable : target;
		const rect = element.getBoundingClientRect();
		const at =
			"clientX" in event
				? { fx: (event.clientX - rect.left) / (rect.width || 1), fy: (event.clientY - rect.top) / (rect.height || 1) }
				: { fx: 0.5, fy: 0.5 };
		setOpenId(undefined);
		setDraft({ point: pointable?.dataset.point, node: element, where: describe(element, element === pointable), ...at });
	};

	return (
		<div ref={wrapperRef} className='relative h-full'>
			<div
				ref={contentRef}
				onClickCapture={start}
				// Clicking into text she can type over would focus it: not while commenting.
				onMouseDownCapture={(event) => active && contentRef.current?.contains(event.target as Node) && event.preventDefault()}
				onKeyDownCapture={(event) => (event.key === "Enter" ? start(event) : undefined)}
				className={cn("h-full", active && "cursor-crosshair [&_*]:cursor-crosshair")}
			>
				{children}
			</div>
			{shown.map((comment) => {
				const at = positions[comment.id];
				if (!at) return null;
				const time = formatRelativeDate(comment.createdAt);
				return (
					<Popover key={comment.id} open={openId === comment.id} onOpenChange={(open) => setOpenId(open ? comment.id : undefined)}>
						<PopoverTrigger asChild>
							<Pin
								author={comment.author}
								open={openId === comment.id}
								aria-label={`${comment.author.name}'s comment: ${comment.text}${comment.replies?.length ? `, ${comment.replies.length} ${comment.replies.length === 1 ? "reply" : "replies"}` : ""}`}
								style={{ left: at.x, top: at.y }}
							/>
						</PopoverTrigger>
						{/* The thread: the comment, its replies, a box to reply; resolve or reopen, and delete her own. */}
						<PopoverContent side='bottom' align='start' sideOffset={8} aria-label={`${comment.author.name}'s comment`} className='flex w-80 flex-col gap-3 p-0'>
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
			{draft && positions.draft ? (
				<Popover open onOpenChange={(open) => !open && setDraft(null)}>
					<PopoverAnchor asChild>
						<Pin author={author} open tabIndex={-1} aria-hidden style={{ left: positions.draft.x, top: positions.draft.y }} />
					</PopoverAnchor>
					<PopoverContent
						side='bottom'
						align='start'
						sideOffset={8}
						aria-label='New comment'
						className='w-80 overflow-hidden p-0'
						// A click elsewhere on the prototype starts another comment instead; don't let it drop this one first.
						onInteractOutside={(event) => contentRef.current?.contains(event.target as Node) && event.preventDefault()}
					>
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

export { MentionText, PrototypeComments, type CommentMention, type CommentScope, type PrototypeComment, type PrototypeCommentAuthor, type PrototypeCommentReply, type PrototypeCommentsProps };
