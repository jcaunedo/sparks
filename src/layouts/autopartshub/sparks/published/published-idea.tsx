import * as React from "react";
import { CircleCheck, MessageSquare } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/data-display/avatar";
import { Badge } from "@/components/data-display/badge";
import { Button } from "@/components/buttons/button";
import { AppHeader } from "@/components/navigation/app-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/navigation/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/forms/select";
import { Typography } from "@/components/typography/typography";
import { scrollIntoViewSmoothly, useMotionPreference } from "@/lib/motion";
import { formatRelativeDate } from "@/lib/relative-date";
import { cn } from "@/lib/utils";

import type { AutoPartsHubUser } from "../../autopartshub";
import { HeaderActions } from "../../header-actions";
import type { NotificationsPopoverProps } from "../../notifications-popover";
import type { PrototypeComment, PrototypeCommentAuthor } from "../prototype/prototype-comments";
import { PrototypePanel, type PrototypeAudience } from "../prototype/prototype-panel";
import { ReviewDocument, reviewPartTitles, viewTone, type ConceptForReview, type IdeaComment, type Reviewer } from "../review/review-panel";

/*
 * The published idea, as a reviewer sees it (prds/sparks-review.md, "What reviewers see and do"): the version Dana
 * published, the idea and its prototype, to read, try, comment on and give a view. Not in Figma yet.
 */

/** A reviewer's view on whether the idea should move forward, and why. */
type ReviewerView = { view: NonNullable<Reviewer["view"]>; why: string };


type PublishedIdeaProps = {
	/** The signed-in reviewer, for the header's avatar. */
	user: AutoPartsHubUser;
	/** The reviewer as their comments show them: name, photo and team ("Engineering"). */
	reviewer: PrototypeCommentAuthor;
	/** The idea's name, e.g. "Wrong-part returns". */
	ideaName: string;
	/** Who published it, e.g. "Dana Morales". */
	publishedBy: string;
	/** The version published, and when (ISO). */
	version: number;
	publishedAt: string;
	/** Dana's invitation, and when she'd like their view by. */
	invitation: { text: string; due: string };
	/** The idea, as published: every part of "What's reviewed". */
	concept: ConceptForReview;
	/** The prototype at the published version: its name ("1. Fit check before you buy"), audiences, screens, and the prototype for an audience. */
	prototype: { label: string; audiences: PrototypeAudience[]; screens: number; render: (audience: string) => React.ReactNode };
	/** Comments pinned on the prototype, everyone's, with their threads. */
	prototypeComments: PrototypeComment[];
	onPrototypeCommentsChange: (comments: PrototypeComment[]) => void;
	/** Comments on parts of the idea, everyone's. */
	ideaComments: IdeaComment[];
	onIdeaCommentsChange: (comments: IdeaComment[]) => void;
	/** Their view, once sent. */
	view?: ReviewerView;
	onViewChange: (view: ReviewerView | undefined) => void;
	notifications?: NotificationsPopoverProps;
};

const views: ReviewerView["view"][] = ["Advance", "Advance with changes", "Don't advance yet"];

/** The text field's look, as in the clarification card's edit (DESIGN.md → "Clarification card"). */
const fieldClasses =
	"w-full resize-none rounded-input border border-border bg-background px-[11px] py-[7px] text-sm text-foreground outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50";

const initialsOf = (name: string) =>
	name
		.split(/\s+/)
		.map((word) => word.charAt(0))
		.slice(0, 2)
		.join("")
		.toUpperCase();

/** One comment in the reviewer's list: who, their team, when, where, the text, and its thread's state. Opens where it is. */
function CommentRow({
	author,
	createdAt,
	where,
	text,
	unclear,
	replies = 0,
	resolved,
	onOpen,
}: {
	author: PrototypeCommentAuthor;
	createdAt: string;
	where: string;
	text: string;
	unclear?: boolean;
	replies?: number;
	resolved?: boolean;
	onOpen: () => void;
}) {
	const time = formatRelativeDate(createdAt);
	return (
		<button
			type='button'
			onClick={onOpen}
			className='flex w-full items-start gap-3 rounded-lg px-2 py-2.5 text-start outline-none hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring'
		>
			<Avatar className='size-8 shrink-0'>
				{author.avatarSrc ? <AvatarImage src={author.avatarSrc} alt='' /> : null}
				<AvatarFallback className='text-xs'>{initialsOf(author.name)}</AvatarFallback>
			</Avatar>
			<span className='flex min-w-0 flex-1 flex-col gap-0.5'>
				<span className='flex flex-wrap items-baseline gap-2'>
					<span className='text-sm font-semibold text-foreground'>{author.name}</span>
					{author.role ? <span className='text-xs text-muted-foreground'>{author.role}</span> : null}
					<time dateTime={createdAt} title={time.title} className='text-xs text-muted-foreground'>
						{time.label}
					</time>
				</span>
				<span className='truncate text-xs text-muted-foreground'>{where}</span>
				<span className={cn("text-sm whitespace-pre-line", resolved ? "text-muted-foreground" : "text-foreground")}>{text}</span>
				{unclear || replies || resolved ? (
					<span className='flex flex-wrap items-center gap-3 pt-0.5 text-xs text-muted-foreground'>
						{unclear ? (
							<Badge variant='flat' tone='amber' size='xxs'>
								Unclear
							</Badge>
						) : null}
						{replies ? (
							<span className='flex items-center gap-1'>
								<MessageSquare aria-hidden className='size-3.5' />
								{replies} {replies === 1 ? "reply" : "replies"}
							</span>
						) : null}
						{resolved ? (
							<span className='flex items-center gap-1 text-success'>
								<CircleCheck aria-hidden className='size-3.5' />
								Resolved
							</span>
						) : null}
					</span>
				) : null}
			</span>
		</button>
	);
}

/**
 * The page a reviewer opens from Dana's invitation (prds/sparks-review.md, "What reviewers see and do"): the version she
 * published, as "Idea" (the idea for review, part by part, each with "Comment") and "Prototype" (to try, with comments
 * pinned on it, threads to reply to and resolve). On the left, their review: the invitation, their view (Advance,
 * Advance with changes, Don't advance yet, and why), and every comment, each opening where it is. They can't change the
 * idea or the prototype.
 */
function PublishedIdea({
	user,
	reviewer,
	ideaName,
	publishedBy,
	version,
	publishedAt,
	invitation,
	concept,
	prototype,
	prototypeComments,
	onPrototypeCommentsChange,
	ideaComments,
	onIdeaCommentsChange,
	view,
	onViewChange,
	notifications,
}: PublishedIdeaProps) {
	const [tab, setTab] = React.useState<"idea" | "prototype">("idea");
	const [openPin, setOpenPin] = React.useState<string>();
	const { prefersReducedMotion } = useMotionPreference();
	const documentRef = React.useRef<HTMLDivElement>(null);
	const fieldRef = React.useRef<HTMLTextAreaElement>(null);
	const firstName = publishedBy.split(" ")[0];
	const published = formatRelativeDate(publishedAt);

	// Their view: picked, with why, then sent; "Change your view" opens it again.
	const [choice, setChoice] = React.useState<ReviewerView["view"] | undefined>(view?.view);
	const [why, setWhy] = React.useState(view?.why ?? "");
	const [editingView, setEditingView] = React.useState(!view);

	// A comment on the idea: the part it's about, the text, and whether the part is unclear.
	const [part, setPart] = React.useState<string>(reviewPartTitles[0]);
	const [text, setText] = React.useState("");
	const [unclear, setUnclear] = React.useState(false);
	const addComment = () => {
		if (!text.trim()) return;
		onIdeaCommentsChange([
			...ideaComments,
			{ id: `idea-comment-${Date.now()}`, part, text: text.trim(), createdAt: new Date().toISOString(), author: reviewer, unclear: unclear || undefined },
		]);
		setText("");
		setUnclear(false);
	};

	// "Comment" on a part: the box below is set to that part, ready to write.
	const commentOn = (title: string) => {
		setPart(title);
		requestAnimationFrame(() => fieldRef.current?.focus());
	};
	// A comment opens where it is: its part in "Idea" (scrolled into view), or its pin's thread in "Prototype".
	const openIdeaComment = (title: string) => {
		setTab("idea");
		requestAnimationFrame(() => {
			const element = documentRef.current?.querySelector<HTMLElement>(`[data-part="${CSS.escape(title)}"]`);
			if (element) scrollIntoViewSmoothly(element, { reducedMotion: Boolean(prefersReducedMotion), align: "start" });
		});
	};
	const openPrototypeComment = (id: string) => {
		setTab("prototype");
		setOpenPin(id);
	};

	const commentsOnPart = (title: string) => ideaComments.filter((comment) => comment.part === title).length;
	// Every comment, newest first; resolved ones on the prototype last.
	const all = [
		...ideaComments.map((comment) => ({ kind: "idea" as const, comment, resolved: false })),
		...prototypeComments.map((comment) => ({ kind: "prototype" as const, comment, resolved: Boolean(comment.resolved) })),
	].sort((a, b) => Number(a.resolved) - Number(b.resolved) || b.comment.createdAt.localeCompare(a.comment.createdAt));

	return (
		<Tabs value={tab} onValueChange={(value) => setTab(value as "idea" | "prototype")} className='flex h-screen flex-col gap-0 bg-background text-foreground'>
			{/* The Sparks Project header's frame: the idea's name on the left (no menu: it isn't theirs), "Idea" and
			    "Prototype" centered, the published version, notifications and their avatar on the right. */}
			<AppHeader
				logo={
					<Typography as='h1' size='xl' weight='semibold' className='min-w-0 truncate text-foreground'>
						{ideaName}
					</Typography>
				}
				nav={
					<TabsList aria-label='What to look at'>
						<TabsTrigger value='idea'>Idea</TabsTrigger>
						<TabsTrigger value='prototype'>Prototype</TabsTrigger>
					</TabsList>
				}
			>
				<Badge variant='flat' tone='blue' size='sm'>
					Version {version}
				</Badge>
				<HeaderActions user={user} notifications={notifications} />
			</AppHeader>

			<main className='flex min-h-0 flex-1 gap-0 pe-8 pb-6'>
				{/* Their review, in the conversation's place: 480px on the left. */}
				<aside aria-label='Your review' className='flex w-[480px] shrink-0 flex-col'>
					<div className='scrollbar-subtle flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto px-8 pb-4'>
						<section aria-label='Invitation' className='flex flex-col gap-2 rounded-card bg-background-subtle p-4'>
							<p className='text-sm font-semibold text-foreground'>{publishedBy} asked you to review this idea</p>
							<blockquote className='text-sm text-foreground'>"{invitation.text}"</blockquote>
							<p className='text-xs text-muted-foreground'>
								By {invitation.due} · Version {version}, published {published.label.toLowerCase()}. {firstName} keeps working on hers; you see
								this version until she publishes an update.
							</p>
						</section>

						<section aria-labelledby='your-view' className='flex flex-col gap-3'>
							<div className='flex flex-col gap-0.5'>
								<h2 id='your-view' className='text-base font-semibold text-foreground-prominent'>
									Your view
								</h2>
								<p className='text-sm text-muted-foreground'>Should it move forward? {firstName} asks for a decision once the teams have given theirs.</p>
							</div>
							{view && !editingView ? (
								<div className='flex flex-col gap-2'>
									<Badge variant='flat' tone={viewTone[view.view]} size='sm' className='w-fit'>
										{view.view}
									</Badge>
									<p className='text-sm text-foreground'>"{view.why}"</p>
									<Button variant='link' className='h-auto w-fit p-0 text-sm font-medium' onClick={() => setEditingView(true)}>
										Change your view
									</Button>
								</div>
							) : (
								<form
									className='flex flex-col gap-3'
									onSubmit={(event) => {
										event.preventDefault();
										if (!choice || !why.trim()) return;
										onViewChange({ view: choice, why: why.trim() });
										setEditingView(false);
									}}
								>
									<div role='radiogroup' aria-label='Your view' className='flex flex-wrap gap-2'>
										{views.map((option) => (
											<button
												key={option}
												type='button'
												role='radio'
												aria-checked={choice === option}
												onClick={() => setChoice(option)}
												className={cn(
													"h-9 rounded-button-lg border px-3.5 text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring",
													choice === option ? "border-border-defined bg-accent text-foreground" : "border-border bg-background text-foreground hover:bg-accent",
												)}
											>
												{option}
											</button>
										))}
									</div>
									<textarea
										aria-label='Why'
										placeholder='Why, in a sentence'
										rows={2}
										value={why}
										onChange={(event) => setWhy(event.target.value)}
										className={fieldClasses}
									/>
									<div className='flex justify-end gap-2'>
										{view ? (
											<Button type='button' variant='outline' size='sm' onClick={() => setEditingView(false)}>
												Cancel
											</Button>
										) : null}
										<Button type='submit' size='sm' disabled={!choice || !why.trim()}>
											Send your view
										</Button>
									</div>
								</form>
							)}
						</section>

						<section aria-labelledby='comments' className='flex flex-col gap-1 border-t border-border pt-4'>
							<h2 id='comments' className='pb-1 text-base font-semibold text-foreground-prominent'>
								Comments {all.length ? <span className='font-normal text-muted-foreground'>({all.length})</span> : null}
							</h2>
							{all.length ? (
								<ul className='flex flex-col gap-0.5'>
									{all.map((entry) =>
										entry.kind === "idea" ? (
											<li key={entry.comment.id}>
												<CommentRow
													author={entry.comment.author}
													createdAt={entry.comment.createdAt}
													where={`On "${entry.comment.part}"`}
													text={entry.comment.text}
													unclear={entry.comment.unclear}
													onOpen={() => openIdeaComment(entry.comment.part)}
												/>
											</li>
										) : (
											<li key={entry.comment.id}>
												<CommentRow
													author={entry.comment.author}
													createdAt={entry.comment.createdAt}
													where={["On the prototype", entry.comment.scope.audienceLabel, entry.comment.scope.device === "phone" ? "Phone" : "Desktop", entry.comment.where ? `"${entry.comment.where}"` : null]
														.filter(Boolean)
														.join(" · ")}
													text={entry.comment.text}
													replies={entry.comment.replies?.length}
													resolved={entry.comment.resolved}
													onOpen={() => openPrototypeComment(entry.comment.id)}
												/>
											</li>
										),
									)}
								</ul>
							) : (
								<p className='text-sm text-muted-foreground'>No comments yet.</p>
							)}
						</section>
					</div>

					{/* Commenting on a part of the idea; on the prototype, it's "Add comment" there. */}
					<form
						aria-label='Comment on the idea'
						className='flex shrink-0 flex-col gap-2 border-t border-border px-8 pt-4'
						onSubmit={(event) => {
							event.preventDefault();
							addComment();
						}}
					>
						<Select value={part} onValueChange={setPart}>
							<SelectTrigger aria-label='Comment on' className='h-9 w-full bg-background'>
								<span className='flex min-w-0 flex-1 items-center gap-2'>
									<span className='text-muted-foreground'>On</span>
									<SelectValue />
								</span>
							</SelectTrigger>
							<SelectContent position='popper' side='top'>
								{reviewPartTitles.map((title) => (
									<SelectItem key={title} value={title}>
										{title}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						<textarea
							ref={fieldRef}
							aria-label='Comment'
							placeholder='Add a comment'
							rows={2}
							value={text}
							onChange={(event) => setText(event.target.value)}
							onKeyDown={(event) => {
								if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
									event.preventDefault();
									addComment();
								}
							}}
							className={fieldClasses}
						/>
						<div className='flex items-center justify-between gap-3'>
							<label className='flex items-center gap-2 text-sm text-foreground'>
								<input type='checkbox' checked={unclear} onChange={(event) => setUnclear(event.target.checked)} className='size-4 accent-primary' />
								This part is unclear
							</label>
							<Button type='submit' size='sm' disabled={!text.trim()}>
								Comment
							</Button>
						</div>
						<p className='text-xs text-muted-foreground'>To comment on the prototype, open it and select "Add comment".</p>
					</form>
				</aside>

				{/* The idea and the prototype, as published: one at a time, from the header's tabs. */}
				<TabsContent value='idea' className='mt-0 flex min-h-0 flex-1 flex-col rounded-card bg-background-subtle p-4'>
					<div className='flex flex-col gap-1 pb-3'>
						<Typography as='h2' size='lg' weight='semibold' className='text-foreground-prominent'>
							Idea for review
						</Typography>
						<span className='text-xs text-muted-foreground'>{concept.evidenceStatus.split(".")[0]}</span>
					</div>
					<div ref={documentRef} className='scrollbar-subtle flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto rounded-md bg-background p-4'>
						<ReviewDocument
							concept={concept}
							partAction={(title) => (
								<Button variant='ghost' size='sm' aria-label={`Comment on "${title}"`} className='h-7 shrink-0 gap-1.5 px-2 text-xs text-muted-foreground' onClick={() => commentOn(title)}>
									<MessageSquare aria-hidden className='size-3.5' />
									{commentsOnPart(title) ? commentsOnPart(title) : "Comment"}
								</Button>
							)}
						/>
					</div>
				</TabsContent>
				<TabsContent value='prototype' className='mt-0 flex min-h-0 flex-1 flex-col'>
					<PrototypePanel
						audiences={prototype.audiences}
						readyScreens={prototype.screens}
						totalScreens={prototype.screens}
						paths={[{ id: "published", label: prototype.label }]}
						path='published'
						commentAuthor={reviewer}
						comments={prototypeComments}
						onCommentsChange={onPrototypeCommentsChange}
						openComment={openPin}
						onOpenCommentChange={setOpenPin}
					>
						{prototype.render}
					</PrototypePanel>
				</TabsContent>
			</main>
		</Tabs>
	);
}

export { PublishedIdea, type IdeaComment, type PublishedIdeaProps, type ReviewerView };
