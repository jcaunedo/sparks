import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { Building2, Check, ChevronDown, ChevronUp, CirclePlus, Link2 } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/data-display/avatar";
import { Button } from "@/components/buttons/button";
import { Checkbox } from "@/components/forms/checkbox";
import { Select, SelectContent, SelectItem, SelectSeparator, SelectTrigger, SelectValue } from "@/components/forms/select";
import { handlePeopleKeys, matchPeople, PeopleList, type PeopleOption } from "@/components/forms/people-list";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/overlays/popover";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/overlays/tooltip";
import { Typography } from "@/components/typography/typography";
import { expandVariants, fadeVariants, iconSwapReducedVariants, iconSwapVariants, useExpandClip, useMotionPreference } from "@/lib/motion";
import { cn } from "@/lib/utils";

/*
 * Share: a popover from a "Share" button (prds/sparks.md, "Sharing a concept"). The owner adds a person or a department
 * as "Can view", "Can comment" or "Can edit", sees who has access, changes or removes their role, picks who in a team
 * gets access, and adds the people and teams recommended for it. The same Share everywhere it shows: the caller gives
 * the copy (`title`, `description`, `rolesHint`) and the data. Not in sparks.ds yet.
 */

/** Someone with access: a person or a whole department. */
type ShareMember = {
	id: string;
	kind: "person" | "department";
	name: string;
	/** A person's job title and team ("UX lead · UX team"), or a department's size ("4 people"). */
	detail?: string;
	/** Owner: Dana. Everyone she adds can view, view and comment, or edit (a collaborator). */
	role: "owner" | ShareRole;
	avatarSrc?: string;
	/** A department: the people in it she unchecked in its popover, who don't get access with it. */
	excluded?: string[];
};

/**
 * What someone she adds can do: look at the idea and the prototype, also leave feedback, or work on it with her (a
 * collaborator: they change the plan, the prototype and the rest, and take part in the conversation with Sparks).
 */
type ShareRole = "viewer" | "commenter" | "editor";

const shareRoles: { value: ShareRole; label: string }[] = [
	{ value: "viewer", label: "Can view" },
	{ value: "commenter", label: "Can comment" },
	{ value: "editor", label: "Can edit" },
];

const allRoles: ShareRole[] = ["viewer", "commenter", "editor"];
const roleLabel = (role: ShareRole) => shareRoles.find((r) => r.value === role)?.label ?? "";

type SharePopoverProps = {
	/** The popover's title, e.g. "Share idea". */
	title?: React.ReactNode;
	/** Under the title (14px medium): who sees it and when, e.g. "… see the idea and its prototype once you publish it." */
	description?: React.ReactNode;
	/** 8px under the field (12px muted): what each role adds. */
	rolesHint?: React.ReactNode;
	/** Who has access now, the owner first. */
	members: ShareMember[];
	/** She added someone: what she typed (a name, an email or a department), with the role. The caller works out who it is. */
	onInvite: (who: string, role: ShareRole) => void;
	/**
	 * The company's people (with their team) and departments: typing in the field shows the ones that match, to pick
	 * from (`PeopleList`, the same list as "@" in comments). Picking one invites them with the role on the field's right.
	 * Anyone else is invited by email: "Invite" shows once the field holds a valid email.
	 */
	directory?: PeopleOption[];
	/** The roles she can give, in order; the first is the default unless "Can comment" is among them. All three by default. */
	roles?: ShareRole[];
	/** She changed the role of someone she added. */
	onRoleChange?: (id: string, role: ShareRole) => void;
	/** She removed someone she added ("Remove", last in their role's menu): they lose access. */
	onRemove?: (id: string) => void;
	/**
	 * The people in a team (a department): selecting a team's name opens them in a popover, each with a checkbox, all
	 * checked; unchecking someone keeps them out when the team gets access.
	 */
	peopleIn?: (team: string) => ShareTeamPerson[];
	/** She unchecked or checked people in a team she added: who's out (`ShareMember` `excluded`). */
	onTeamPeopleChange?: (id: string, excluded: string[]) => void;
	/**
	 * The people and teams recommended for it (in Sparks: the reviewers for the idea, prds/sparks-review.md, "Who to
	 * invite"), each with their `detail` as in "Who has access". `label` (default "View recommended reviewers"), under who
	 * has access, shows the ones not there yet, closed each time Share opens (selecting it opens them), each added with its
	 * circle-plus or by selecting its row; hidden once they all are. "Add all" shows only while they're open.
	 */
	recommended?: {
		label?: string;
		people: ShareSuggestion[];
		/** Adding one; for a team, the people she unchecked in its popover first. "Add all" calls it for each one left. */
		onAdd: (name: string, excluded: string[]) => void;
		/** "Add all", on the right of `label` while the list is open: adds every one not added yet. */
		addAllLabel?: string;
	};
	/** The link to what's shared, for "Copy link". */
	link: string;
	/** Open it from elsewhere (e.g. "Manage reviewers" in `PublishPopover`): controlled `open`, with `onOpenChange`. */
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
	/** The trigger: a "Share" button. */
	children: React.ReactNode;
};

/** Someone recommended, not added yet: a person (their photo) or a team. */
type ShareSuggestion = { name: string; kind: ShareMember["kind"]; detail?: string; avatarSrc?: string };

const initials = (name: string) =>
	name
		.split(/\s+/)
		.map((word) => word.charAt(0))
		.slice(0, 2)
		.join("")
		.toUpperCase();

/** Someone with access, as an avatar: their photo or initials, or a building for a department. */
function MemberAvatar({ member, className }: { member: ShareMember; className?: string }) {
	return (
		<Avatar className={className}>
			{member.avatarSrc ? <AvatarImage src={member.avatarSrc} alt='' /> : null}
			<AvatarFallback className={member.kind === "department" ? "bg-neutral-muted text-foreground" : undefined}>
				{member.kind === "department" ? <Building2 aria-hidden className='size-4' /> : initials(member.name)}
			</AvatarFallback>
		</Avatar>
	);
}

/** Share: copy the link, add a person or a department with a role, who has access, and who's recommended. */
function SharePopover({
	title = "Share",
	description,
	rolesHint,
	members,
	onInvite,
	directory = [],
	roles = allRoles,
	onRoleChange,
	onRemove,
	peopleIn,
	onTeamPeopleChange,
	recommended,
	link,
	open,
	onOpenChange,
	children,
}: SharePopoverProps) {
	// Who's unchecked in a suggested team not added yet; an added team keeps it on its member (`excluded`).
	const [pendingExcluded, setPendingExcluded] = React.useState<Record<string, string[]>>({});
	const teamPeople = (name: string, member?: ShareMember) => {
		const people = peopleIn?.(name);
		if (!people?.length) return undefined;
		const excluded = member ? (member.excluded ?? []) : (pendingExcluded[name] ?? []);
		return {
			people,
			excluded,
			onChange: (next: string[]) => (member ? onTeamPeopleChange?.(member.id, next) : setPendingExcluded((current) => ({ ...current, [name]: next }))),
		};
	};
const [value, setValue] = React.useState("");
	// The people and departments matching what she's typed, without those who already have access.
	const [active, setActive] = React.useState(0);
	const [listClosed, setListClosed] = React.useState(false);
	const listId = React.useId();
	const has = new Set(members.map((member) => member.name.toLowerCase()));
	const recommendedLeft = (recommended?.people ?? []).filter((reviewer) => !has.has(reviewer.name.toLowerCase()));
	// The recommended reviewers are closed each time Share opens; she opens them from "View recommended reviewers".
	const [showRecommended, setShowRecommended] = React.useState(false);
	const { prefersReducedMotion } = useMotionPreference();
	const recommendedClip = useExpandClip();
	React.useEffect(() => {
		if (open) setShowRecommended(false);
	}, [open]);
	const recommendedId = React.useId();
	const matches = value.trim() ? matchPeople(directory.filter((option) => !has.has(option.name.toLowerCase())), value) : [];
	const listOpen = matches.length > 0 && !listClosed;
	const pick = (option: PeopleOption) => {
		onInvite(option.name, role);
		setValue("");
		inputRef.current?.focus();
	};
	const [picked, setRole] = React.useState<ShareRole>("commenter");
	// The role picked, while it's on offer (the popover stays mounted from step to step).
	const role = roles.includes(picked) ? picked : roles.includes("commenter") ? "commenter" : roles[0];
	const [copied, setCopied] = React.useState(false);
	const inputId = React.useId();
	const inputRef = React.useRef<HTMLInputElement>(null);
	const formRef = React.useRef<HTMLFormElement>(null);
	const descriptionId = React.useId();
	const rolesHintId = React.useId();

	// "Invite" is for an email: people and departments in the directory are picked from the list.
	const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
	const invite = () => {
		const who = value.trim();
		if (!email) return;
		onInvite(who, role);
		setValue("");
	};
	const copyLink = async () => {
		try {
			await navigator.clipboard.writeText(link);
		} catch {
			// The clipboard can be blocked (an iframe, permissions): the button still confirms, as there's nothing to retry.
		}
		setCopied(true);
		window.setTimeout(() => setCopied(false), 2000);
	};

	return (
		<Popover
			open={open}
			onOpenChange={(next) => {
				if (next) setShowRecommended(false);
				onOpenChange?.(next);
			}}
		>
			<PopoverTrigger asChild>{children}</PopoverTrigger>
			<PopoverContent align='end' sideOffset={8} aria-labelledby={`${inputId}-title`} className='scrollbar-subtle flex max-h-(--radix-popover-content-available-height) w-[460px] flex-col gap-4 overflow-y-auto p-5'
				// Opening it, she's here to add someone: the field takes focus, not "Copy link".
				onOpenAutoFocus={(event) => {
					event.preventDefault();
					inputRef.current?.focus();
				}}
			>
				{/* The title and the description 6px apart. */}
				<div className='flex flex-col gap-1.5'>
					<div className='flex items-center justify-between gap-3'>
						<Typography as='h2' id={`${inputId}-title`} size='lg' weight='semibold' className='text-foreground-prominent'>
							{title}
						</Typography>
						<Button variant='link' className='h-auto gap-1.5 p-0 font-semibold text-link' onClick={copyLink}>
							{copied ? <Check aria-hidden /> : <Link2 aria-hidden />}
							{copied ? "Link copied" : "Copy link"}
						</Button>
					</div>
					{/* Who sees it and when (14px medium); what each role adds sits under the field, by its role menu. */}
					{description ? (
						<p id={descriptionId} className='text-sm font-medium text-foreground'>
							{description}
						</p>
					) : null}
				</div>
				<div className='flex flex-col gap-2'>
					<form
						ref={formRef}
						className='flex gap-2'
						onSubmit={(event) => {
							event.preventDefault();
							invite();
						}}
					>
						<label htmlFor={inputId} className='sr-only'>
							Name, email or department
						</label>
						{/* One field: who, and the role on its right (a borderless Select inside the field's border). */}
						<div className='flex h-9 min-w-0 flex-1 items-center rounded-input border border-input bg-background focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/30'>
							<input
								ref={inputRef}
								id={inputId}
								value={value}
								onChange={(event) => {
									setValue(event.target.value);
									setActive(0);
									setListClosed(false);
								}}
								onKeyDown={(event) => {
									// The list's keys while it's open; Esc closes the list, not Share.
									if (listOpen) handlePeopleKeys(event, { options: matches, active, setActive, pick, close: () => setListClosed(true) });
								}}
								placeholder='Name, email or department'
								aria-describedby={[description ? descriptionId : "", rolesHint ? rolesHintId : ""].join(" ").trim() || undefined}
								autoComplete='off'
								role={directory.length ? "combobox" : undefined}
								aria-autocomplete={directory.length ? "list" : undefined}
								aria-expanded={directory.length ? listOpen : undefined}
								aria-controls={listOpen ? listId : undefined}
								aria-activedescendant={listOpen ? `${listId}-${active}` : undefined}
								className='h-full min-w-0 flex-1 bg-transparent ps-3 text-sm text-foreground outline-none placeholder:text-foreground-subtle'
							/>
							{roles.length > 1 ? (
								<RoleSelect value={role} roles={roles} onChange={setRole} label='Role for who you invite' />
							) : (
								<span className='shrink-0 px-2 text-sm text-muted-foreground'>{roleLabel(role)}</span>
							)}
						</div>
						{/* Only once what she's typed is an email; until then the field takes the whole row. */}
						{email ? (
							<Button type='submit' variant='neutral'>
								Invite
							</Button>
						) : null}
						{/* What matches, under the field, as wide as it (the role and "Invite" stay visible), over Share: never cut off. */}
						{listOpen ? (
							<PeopleList
								id={listId}
								label='People and departments'
								options={matches}
								active={active}
								onActiveChange={setActive}
								onPick={pick}
								anchor={formRef}
							/>
						) : null}
					</form>
					{/* What each role adds, 8px under the field (12px muted). */}
					{rolesHint ? (
						<p id={rolesHintId} className='text-xs text-muted-foreground'>
							{rolesHint}
						</p>
					) : null}
				</div>
				<div className='flex flex-col gap-2'>
					<p className='text-sm text-foreground'>Who has access</p>
					{/* No height of its own: every row shows, and the whole popover scrolls if it's taller than the window. */}
					{/* Someone added comes in, and someone removed leaves, with Expand (`ExpandRow`): the rows under them, and what's
					    below the list, slide instead of jumping. The 12px between rows is inside each row, so it goes with it. */}
					<ul aria-label='Who has access' className='flex flex-col'>
						<AnimatePresence initial={false}>
						{members.map((member) => (
							<ExpandRow key={member.id} space='pt-3'>
							<div className='flex items-center gap-3'>
								<MemberAvatar member={member} />
								<MemberName member={member} team={member.kind === "department" ? teamPeople(member.name, member) : undefined} />
								{/* Their role's menu, with "Remove" last. A role that isn't in `roles` is the only one in it; with nothing to
								    change and no "Remove", it shows as text. */}
								{member.role === "owner" || (!onRemove && (!onRoleChange || roles.length < 2 || !roles.includes(member.role))) ? (
									<span className='shrink-0 px-2 text-sm text-muted-foreground'>
										{member.role === "owner" ? "Owner" : roleLabel(member.role)}
									</span>
								) : (
									<RoleSelect
										value={member.role}
										roles={onRoleChange && roles.includes(member.role) ? roles : [member.role]}
										onChange={(next) => onRoleChange?.(member.id, next)}
										onRemove={onRemove ? () => onRemove(member.id) : undefined}
										label={`Role for ${member.name}`}
									/>
								)}
							</div>
							</ExpandRow>
						))}
						</AnimatePresence>
					</ul>
					{/* The reviewers Sparks recommends for this idea, not added yet: open when Share opens, each added on its own.
					    A line between them and who has access, 16px on either side. */}
					{/* The last one added, the section closes with Expand too (the column's 8px gap taken back above and given back
					    inside, so nothing jumps). */}
					<AnimatePresence initial={false}>
					{recommendedLeft.length ? (
						<ExpandBlock key='recommended-section' className='-mt-2'>
							<div className='flex flex-col gap-2 pt-2'>
							<hr className='mt-2 border-border' />
							{/* The toggle, and "Add all" on the right while the list is open (it fades in and out with it), 8px more above
							    them than between the rows. */}
							<div className='mt-2 flex items-center justify-between gap-3'>
							<Button
								variant='link'
								// Regular weight, as a link in the text.
								className='h-auto w-fit gap-1.5 p-0 font-normal text-link'
								aria-expanded={showRecommended}
								aria-controls={recommendedId}
								onClick={() => setShowRecommended((open) => !open)}
							>
								{recommended?.label ?? "View recommended reviewers"} ({recommendedLeft.length})
								{/* Up while open, down while closed: one replacing the other in place (MOTION.md → `iconSwapVariants`). */}
								<span className='relative grid size-4 place-items-center'>
									<AnimatePresence initial={false}>
										<motion.span
											key={showRecommended ? "up" : "down"}
											className='absolute inset-0 grid place-items-center'
											variants={prefersReducedMotion ? iconSwapReducedVariants : iconSwapVariants}
											initial='hidden'
											animate='shown'
											exit='hidden'
										>
											{showRecommended ? <ChevronUp aria-hidden /> : <ChevronDown aria-hidden />}
										</motion.span>
									</AnimatePresence>
								</span>
							</Button>
							<AnimatePresence initial={false}>
							{showRecommended ? (
								<motion.div
									key='add-all'
									className='shrink-0'
									variants={prefersReducedMotion ? undefined : fadeVariants}
									initial='initial'
									animate='animate'
									exit='exit'
								>
									{/* Every one left at once (each as its own circle-plus would); focus goes to the field, since this section closes. */}
									<Button
										variant='link'
										className='h-auto shrink-0 p-0 font-medium text-link'
										onClick={() => {
											for (const reviewer of recommendedLeft) recommended?.onAdd(reviewer.name, pendingExcluded[reviewer.name] ?? []);
											inputRef.current?.focus();
										}}
									>
										{recommended?.addAllLabel ?? "Add all"}
									</Button>
								</motion.div>
							) : null}
							</AnimatePresence>
							</div>
							{/* Expand (MOTION.md): the list opens and closes in place, its height and the 8px above it together (the
							    -8px takes back the column's gap, the 8px inside gives it back), so nothing jumps; clipped only while it
							    moves. Reduced motion: at once. */}
							<AnimatePresence initial={false}>
							{showRecommended ? (
								<motion.div
									key='recommended'
									{...recommendedClip}
									variants={expandVariants}
									initial={prefersReducedMotion ? false : "initial"}
									animate='animate'
									exit={prefersReducedMotion ? undefined : "exit"}
									className='-mt-2'
								>
								<ul id={recommendedId} aria-label='Recommended reviewers' className='flex flex-col pt-2'>
									{/* Added, a row leaves (and comes back if they're removed from "Who has access"), with Expand. */}
									<AnimatePresence initial={false}>
									{recommendedLeft.map((reviewer) => {
										const add = () => recommended?.onAdd(reviewer.name, pendingExcluded[reviewer.name] ?? []);
										return (
											<ExpandRow key={reviewer.name} space='pt-1'>
											<RecommendedRow name={reviewer.name} onAdd={add}>
												<MemberAvatar member={{ id: reviewer.name, kind: reviewer.kind, name: reviewer.name, role: "commenter", avatarSrc: reviewer.avatarSrc }} />
												<MemberName
													member={{ name: reviewer.name, detail: reviewer.detail }}
													team={reviewer.kind === "department" ? teamPeople(reviewer.name) : undefined}
												/>
											</RecommendedRow>
											</ExpandRow>
										);
									})}
									</AnimatePresence>
								</ul>
								</motion.div>
							) : null}
							</AnimatePresence>
							</div>
						</ExpandBlock>
					) : null}
					</AnimatePresence>
				</div>

			</PopoverContent>
		</Popover>
	);
}

/**
 * A row coming into a list or leaving it, with Expand (MOTION.md): its height and opacity together, so what's under it
 * slides; clipped only while it moves (`useExpandClip`), so a focus ring or a menu's trigger isn't cut once it's there.
 * Rows shown when the list opens don't animate (`AnimatePresence initial={false}` around them). Reduced motion: at once.
 * Space above a row goes inside it (`space`, e.g. `pt-3`, on a wrapper: never padding on the animated element itself,
 * which its height can't go below), so it opens and closes with the row.
 */
function ExpandRow({ space, children }: { space: string; children: React.ReactNode }) {
	// The space goes on a wrapper inside: on the animated element, its height couldn't go below its padding, and the
	// space would jump in or out at once. None above the first row.
	return (
		<ExpandBlock as='li' className='[&:first-child>*]:pt-0'>
			<div className={space}>{children}</div>
		</ExpandBlock>
	);
}

/** `ExpandRow` for any block: a `div` (or an `li`). */
function ExpandBlock({ as = "div", className, children }: { as?: "div" | "li"; className?: string; children: React.ReactNode }) {
	const { prefersReducedMotion } = useMotionPreference();
	const clip = useExpandClip<HTMLElement>();
	const Element = as === "li" ? motion.li : motion.div;
	return (
		<Element
			{...clip}
			ref={clip.ref as React.RefObject<never>}
			variants={expandVariants}
			initial={prefersReducedMotion ? false : "initial"}
			animate='animate'
			exit={prefersReducedMotion ? undefined : "exit"}
			className={className}
		>
			{children}
		</Element>
	);
}

/**
 * A recommended person or team, not added yet: the whole row adds it on a click (the circle-plus is the button for the
 * keyboard). A team's name opens its people instead; a click inside that popover (a portal, outside the row's DOM)
 * doesn't add it. While the row is hovered, or the button has focus, the circle-plus turns solid in the link color: the
 * outline icon gives way to the filled one (MOTION.md: `iconSwapVariants`; reduced motion: at once).
 */
function RecommendedRow({ name, onAdd, children }: { name: string; onAdd: () => void; children: React.ReactNode }) {
	const { prefersReducedMotion } = useMotionPreference();
	const swap = prefersReducedMotion ? iconSwapReducedVariants : iconSwapVariants;
	const [hovered, setHovered] = React.useState(false);
	const [focused, setFocused] = React.useState(false);
	const hot = hovered || focused;
	return (
		<div
			className='-mx-2 flex cursor-pointer items-center gap-3 rounded-lg px-2 py-1 hover:bg-accent'
			onPointerEnter={() => setHovered(true)}
			onPointerLeave={() => setHovered(false)}
			onClick={(event) => {
				if (!event.currentTarget.contains(event.target as Node)) return;
				if ((event.target as HTMLElement).closest("button")) return;
				onAdd();
			}}
		>
			{children}
			{/* A ghost icon button with an 18px circle-plus, named in its tooltip ("Add UX team"). */}
			<Tooltip>
				<TooltipTrigger asChild>
					<Button
						variant='ghost'
						size='icon'
						aria-label={`Add ${name}`}
						className='relative shrink-0 text-icon hover:bg-transparent [&_svg]:size-[18px]'
						onClick={onAdd}
						onFocus={(event) => setFocused(event.currentTarget.matches(":focus-visible"))}
						onBlur={() => setFocused(false)}
					>
						<AnimatePresence initial={false}>
							<motion.span key={hot ? "solid" : "outline"} className='absolute inset-0 grid place-items-center' variants={swap} initial='hidden' animate='shown' exit='hidden'>
								{/* Solid: the circle filled with the link color, the plus in the background color. */}
								{hot ? <CirclePlus aria-hidden className='fill-link text-link [&_path]:stroke-background' /> : <CirclePlus aria-hidden />}
							</motion.span>
						</AnimatePresence>
					</Button>
				</TooltipTrigger>
				<TooltipContent side='bottom' sideOffset={6}>
					Add {name}
				</TooltipContent>
			</Tooltip>
		</div>
	);
}

/** Someone in a team, as its popover lists them: name, job title, photo. */
type ShareTeamPerson = { name: string; detail?: string; avatarSrc?: string };

/**
 * A person's or a team's name, with their job title and team, or the team's size, under it ("4 of 5 people" with some unchecked). A
 * team with people is a button: it opens a popover listing them, each with a checkbox, all checked to start, and
 * "Unselect all" / "Select all" (prds/sparks.md, "Sharing a concept").
 */
function MemberName({
	member,
	team,
}: {
	member: { name: string; detail?: string };
	team?: { people: ShareTeamPerson[]; excluded: string[]; onChange: (excluded: string[]) => void };
}) {
	const listId = React.useId();
	const included = team ? team.people.length - team.excluded.filter((name) => team.people.some((p) => p.name === name)).length : 0;
	const detail = team && included < team.people.length ? `${included} of ${team.people.length} people` : member.detail;
	const text = (
		<>
			<span className='truncate text-sm font-semibold text-foreground'>{member.name}</span>
			{/* A team's size opens its people: in the link color, underlined on hover, so it reads as something to select. */}
			{detail ? <span className={cn("truncate text-xs", team ? "text-link underline-offset-2 group-hover/team:underline group-focus-visible/team:underline" : "text-muted-foreground")}>{detail}</span> : null}
		</>
	);
	if (!team) return <div className='flex min-w-0 flex-1 flex-col'>{text}</div>;
	const { people, excluded, onChange } = team;
	const allIn = included === people.length;
	return (
		<div className='flex min-w-0 flex-1'>
			<Popover>
				<PopoverTrigger asChild>
					<button
						type='button'
						aria-label={`${member.name}, ${detail ?? `${people.length} people`}: see who's in it`}
						className='group/team -mx-1.5 -my-0.5 flex min-w-0 flex-col items-start rounded-md px-1.5 py-0.5 text-start outline-none focus-visible:ring-2 focus-visible:ring-ring'
					>
						{text}
					</button>
				</PopoverTrigger>
				<PopoverContent align='start' sideOffset={6} aria-label={`People in ${member.name}`} className='flex w-80 flex-col gap-3 p-4'>
					<div className='flex items-center justify-between gap-3'>
						<p className='text-sm font-semibold text-foreground'>
							{member.name} · {people.length} {people.length === 1 ? "person" : "people"}
						</p>
						{/* Everyone in, or no one. */}
						<Button variant='link' className='h-auto shrink-0 p-0 text-sm font-normal text-link' onClick={() => onChange(allIn ? people.map((p) => p.name) : [])}>
							{allIn ? "Unselect all" : "Select all"}
						</Button>
					</div>
					<ul className='flex flex-col gap-2.5'>
						{people.map((person) => {
							const id = `${listId}-${person.name}`;
							const checked = !excluded.includes(person.name);
							return (
								<li key={person.name} className='flex items-center gap-2.5'>
									<Checkbox
										id={id}
										checked={checked}
										onCheckedChange={(on) => onChange(on ? excluded.filter((name) => name !== person.name) : [...excluded, person.name])}
									/>
									<label htmlFor={id} className='flex min-w-0 flex-1 cursor-pointer items-center gap-2.5'>
										<Avatar className='size-8'>
											{person.avatarSrc ? <AvatarImage src={person.avatarSrc} alt='' /> : null}
											<AvatarFallback className='text-xs'>{initials(person.name)}</AvatarFallback>
										</Avatar>
										<span className='flex min-w-0 flex-col'>
											<span className='truncate text-sm font-semibold text-foreground'>{person.name}</span>
											{person.detail ? <span className='truncate text-xs text-muted-foreground'>{person.detail}</span> : null}
										</span>
									</label>
								</li>
							);
						})}
					</ul>
				</PopoverContent>
			</Popover>
		</div>
	);
}

/**
 * "Can view", "Can comment" or "Can edit", as a `Select` without a border: the trigger is the role and a chevron, the list sparks.ds's
 * Select panel. Used in the invite field and on each person or department she added.
 */
function RoleSelect({
	value,
	roles,
	onChange,
	onRemove,
	label,
}: {
	value: ShareRole;
	roles: ShareRole[];
	onChange: (role: ShareRole) => void;
	/** "Remove", after a line, in the destructive color: takes away their access. */
	onRemove?: () => void;
	label: string;
}) {
	return (
		<Select value={value} onValueChange={(next) => (next === "remove" ? onRemove?.() : onChange(next as ShareRole))}>
			<SelectTrigger
				size='sm'
				aria-label={label}
				className='shrink-0 gap-1 border-0 bg-transparent px-2 text-muted-foreground shadow-none hover:bg-accent focus-visible:ring-2'
			>
				<SelectValue />
			</SelectTrigger>
			<SelectContent position='popper' align='end' className='min-w-[160px]'>
				{shareRoles.filter((r) => roles.includes(r.value)).map((r) => (
					<SelectItem key={r.value} value={r.value}>
						{r.label}
					</SelectItem>
				))}
				{onRemove ? (
					<>
						<SelectSeparator />
						<SelectItem value='remove' className='text-destructive focus:text-destructive'>
							Remove
						</SelectItem>
					</>
				) : null}
			</SelectContent>
		</Select>
	);
}

export { SharePopover, shareRoles, type SharePopoverProps, type ShareMember, type ShareRole, type ShareSuggestion, type ShareTeamPerson };
