import * as React from "react";
import { Building2, Check, Link2 } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/data-display/avatar";
import { Button } from "@/components/buttons/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/forms/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/overlays/popover";
import { Typography } from "@/components/typography/typography";
import { cn } from "@/lib/utils";

import { handlePeopleKeys, matchPeople, PeopleList, type PeopleOption } from "../shared/people-list";

/*
 * "Share" (prds/sparks.md, "Sharing a concept"): a popover from the header, in every step. Dana adds a person or a
 * department as "Can view", "Can comment" or "Can edit". Only "Can edit" (a collaborator) can change the idea and sees
 * her conversation with Sparks; for everyone else it stays hidden.
 * Kept simple on purpose: it isn't designed yet (not in Figma).
 */

/** Someone with access: a person or a whole department. */
type ShareMember = {
	id: string;
	kind: "person" | "department";
	name: string;
	/** A person's email, or a department's size ("12 people"). */
	detail?: string;
	/** Owner: Dana. Everyone she adds can view, view and comment, or edit (a collaborator). */
	role: "owner" | ShareRole;
	avatarSrc?: string;
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

type SharePopoverProps = {
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
	/** She changed the role of someone she added. */
	onRoleChange?: (id: string, role: ShareRole) => void;
	/** The concept's link, for "Copy link". */
	link: string;
	/** The trigger: the header's "Share" button. */
	children: React.ReactNode;
};

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

/** The concept's sharing: copy its link, add a person or a department, and who has access. */
function SharePopover({ members, onInvite, directory = [], onRoleChange, link, children }: SharePopoverProps) {
	const [value, setValue] = React.useState("");
	// The people and departments matching what she's typed, without those who already have access.
	const [active, setActive] = React.useState(0);
	const [listClosed, setListClosed] = React.useState(false);
	const listId = React.useId();
	const has = new Set(members.map((member) => member.name.toLowerCase()));
	const matches = value.trim() ? matchPeople(directory.filter((option) => !has.has(option.name.toLowerCase())), value) : [];
	const listOpen = matches.length > 0 && !listClosed;
	const pick = (option: PeopleOption) => {
		onInvite(option.name, role);
		setValue("");
		inputRef.current?.focus();
	};
	const [role, setRole] = React.useState<ShareRole>("commenter");
	const [copied, setCopied] = React.useState(false);
	const inputId = React.useId();
	const inputRef = React.useRef<HTMLInputElement>(null);
	const descriptionId = React.useId();

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
		<Popover>
			<PopoverTrigger asChild>{children}</PopoverTrigger>
			<PopoverContent align='end' sideOffset={8} aria-labelledby={`${inputId}-title`} className='flex w-[460px] flex-col gap-4 p-5'
				// Opening it, she's here to add someone: the field takes focus, not "Copy link".
				onOpenAutoFocus={(event) => {
					event.preventDefault();
					inputRef.current?.focus();
				}}
			>
				<div className='flex items-center justify-between gap-3'>
					<Typography as='h2' id={`${inputId}-title`} size='lg' weight='semibold' className='text-foreground-prominent'>
						Share idea
					</Typography>
					<Button variant='link' className='h-auto gap-1.5 p-0 font-semibold text-link' onClick={copyLink}>
						{copied ? <Check aria-hidden /> : <Link2 aria-hidden />}
						{copied ? "Link copied" : "Copy link"}
					</Button>
				</div>
				<p id={descriptionId} className='text-sm text-muted-foreground'>
					People and departments you add can see the idea and the prototype. With "Can comment", they can also leave
					feedback. With "Can edit", they work on it with you, in your conversation with Sparks too; otherwise, it
					stays hidden.
				</p>
				<form
					className='relative flex gap-2'
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
							aria-describedby={descriptionId}
							autoComplete='off'
							role={directory.length ? "combobox" : undefined}
							aria-autocomplete={directory.length ? "list" : undefined}
							aria-expanded={directory.length ? listOpen : undefined}
							aria-controls={listOpen ? listId : undefined}
							aria-activedescendant={listOpen ? `${listId}-${active}` : undefined}
							className='h-full min-w-0 flex-1 bg-transparent ps-3 text-sm text-foreground outline-none placeholder:text-foreground-subtle'
						/>
						<RoleSelect value={role} onChange={setRole} label='Role for who you invite' />
					</div>
					{/* Only once what she's typed is an email; until then the field takes the whole row. */}
					{email ? (
						<Button type='submit' variant='neutral'>
							Invite
						</Button>
					) : null}
					{/* What matches, under the field, as wide as it (the role and "Invite" stay visible). */}
					{listOpen ? (
						<PeopleList
							id={listId}
							label='People and departments'
							options={matches}
							active={active}
							onActiveChange={setActive}
							onPick={pick}
							className='absolute inset-x-0 top-full mt-1'
						/>
					) : null}
				</form>
				<div className='flex flex-col gap-2'>
					<p className='text-sm text-muted-foreground'>Who has access</p>
					<ul aria-label='Who has access' className='flex max-h-64 flex-col gap-3 overflow-y-auto'>
						{members.map((member) => (
							<li key={member.id} className='flex items-center gap-3'>
								<MemberAvatar member={member} />
								<div className='flex min-w-0 flex-1 flex-col'>
									<span className='truncate text-sm font-medium text-foreground'>{member.name}</span>
									{member.detail ? <span className='truncate text-xs text-muted-foreground'>{member.detail}</span> : null}
								</div>
								{member.role === "owner" || !onRoleChange ? (
									<span className='shrink-0 px-2 text-sm text-muted-foreground'>
										{member.role === "owner" ? "Owner" : shareRoles.find((r) => r.value === member.role)?.label}
									</span>
								) : (
									<RoleSelect
										value={member.role}
										onChange={(next) => onRoleChange(member.id, next)}
										label={`Role for ${member.name}`}
									/>
								)}
							</li>
						))}
					</ul>
				</div>
			</PopoverContent>
		</Popover>
	);
}

/**
 * "Can view", "Can comment" or "Can edit", as a `Select` without a border: the trigger is the role and a chevron, the list sparks.ds's
 * Select panel. Used in the invite field and on each person or department she added.
 */
function RoleSelect({ value, onChange, label }: { value: ShareRole; onChange: (role: ShareRole) => void; label: string }) {
	return (
		<Select value={value} onValueChange={(next) => onChange(next as ShareRole)}>
			<SelectTrigger
				size='sm'
				aria-label={label}
				className='shrink-0 gap-1 border-0 bg-transparent px-2 text-muted-foreground shadow-none hover:bg-accent focus-visible:ring-2'
			>
				<SelectValue />
			</SelectTrigger>
			<SelectContent position='popper' align='end' className='min-w-[160px]'>
				{shareRoles.map((r) => (
					<SelectItem key={r.value} value={r.value}>
						{r.label}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}

export { SharePopover, type SharePopoverProps, type ShareMember, type ShareRole };
