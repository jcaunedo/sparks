import type * as React from "react";
import { Building2 } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/data-display/avatar";
import { cn } from "@/lib/utils";

/*
 * The list of people and departments to pick from while typing: "@" in a comment on the prototype, and the field in
 * "Share" (prds/sparks-prototype.md, "Commenting on it"; prds/sparks.md, "Sharing a concept"). One list, so both look and
 * work the same: typing narrows it, ↑/↓ move, Enter (or Tab) picks, Esc closes it. Not in Figma yet.
 */

/** Someone to pick: a person, with their team, or a whole department, with its size. */
type PeopleOption = { id: string; kind: "person" | "department"; name: string; detail?: string; avatarSrc?: string };

const initials = (name: string) =>
	name
		.split(/\s+/)
		.map((word) => word.charAt(0))
		.slice(0, 2)
		.join("")
		.toUpperCase();

/**
 * The options whose name (or a word in it) starts with what she typed, then the people whose team does ("eng" lists
 * Engineering, then its people), at most `limit` (8). Empty when nothing's typed.
 */
function matchPeople(options: PeopleOption[], query: string, limit = 8) {
	const q = query.trim().toLowerCase();
	if (!q) return [];
	const starts = (text: string) => {
		const t = text.toLowerCase();
		return t.startsWith(q) || t.split(/\s+/).some((word) => word.startsWith(q));
	};
	const byName = options.filter((option) => starts(option.name));
	const byTeam = options.filter((option) => option.kind === "person" && !byName.includes(option) && option.detail && starts(option.detail));
	return [...byName, ...byTeam].slice(0, limit);
}

/** A person's photo or initials, or a building for a department: the same as "Who has access" in Share. */
function PeopleAvatar({ option, className }: { option: Pick<PeopleOption, "kind" | "name" | "avatarSrc">; className?: string }) {
	return (
		<Avatar className={className}>
			{option.avatarSrc ? <AvatarImage src={option.avatarSrc} alt='' /> : null}
			<AvatarFallback className={cn("text-[10px]", option.kind === "department" && "bg-neutral-muted text-foreground")}>
				{option.kind === "department" ? <Building2 aria-hidden className='size-3.5' /> : initials(option.name)}
			</AvatarFallback>
		</Avatar>
	);
}

/**
 * The list, under the field it belongs to (the caller positions it): the menu panel (as DropdownMenu's: 10px corners,
 * border, shadow-xl, 4px padding), 36px rows 2px apart, each with its avatar, the name (sm medium) and, on the right,
 * the team or size (xs muted). The field keeps focus (`aria-activedescendant` points at `${id}-${index}`); a click picks.
 */
function PeopleList({
	id,
	label,
	options,
	active,
	onActiveChange,
	onPick,
	className,
}: {
	id: string;
	label: string;
	options: PeopleOption[];
	active: number;
	onActiveChange: (index: number) => void;
	onPick: (option: PeopleOption) => void;
	className?: string;
}) {
	return (
		<ul
			id={id}
			role='listbox'
			aria-label={label}
			className={cn("z-10 flex flex-col gap-[2px] rounded-input border border-border bg-popover p-1 shadow-xl", className)}
		>
			{options.map((option, index) => (
				<li
					key={option.id}
					id={`${id}-${index}`}
					role='option'
					aria-selected={index === active}
					// Picking doesn't take focus from the field.
					onMouseDown={(event) => {
						event.preventDefault();
						onPick(option);
					}}
					onMouseEnter={() => onActiveChange(index)}
					className={cn(
						"flex h-9 cursor-default items-center gap-2 rounded-md px-2 text-sm font-medium text-foreground",
						index === active && "bg-accent text-accent-foreground",
					)}
				>
					<PeopleAvatar option={option} className='size-6' />
					<span className='truncate'>{option.name}</span>
					{option.detail ? <span className='ms-auto shrink-0 text-xs font-normal text-muted-foreground'>{option.detail}</span> : null}
				</li>
			))}
		</ul>
	);
}

/**
 * The keys a field with the list handles while it's open: ↑/↓ move (wrapping), Enter or Tab picks, Esc closes it (and
 * goes no further, so a popover around it stays open). Returns true when it handled the key.
 */
function handlePeopleKeys(
	event: React.KeyboardEvent,
	list: { options: PeopleOption[]; active: number; setActive: (index: number) => void; pick: (option: PeopleOption) => void; close: () => void },
) {
	const { options, active, setActive, pick, close } = list;
	if (event.key === "ArrowDown" || event.key === "ArrowUp") {
		event.preventDefault();
		setActive((active + (event.key === "ArrowDown" ? 1 : -1) + options.length) % options.length);
		return true;
	}
	if (event.key === "Enter" || event.key === "Tab") {
		event.preventDefault();
		pick(options[active]);
		return true;
	}
	if (event.key === "Escape") {
		event.preventDefault();
		event.stopPropagation();
		close();
		return true;
	}
	return false;
}

export { PeopleAvatar, PeopleList, handlePeopleKeys, matchPeople, type PeopleOption };
