import * as React from "react";
import { Bell, Building2, CheckCheck, CircleAlert, CircleCheck, Megaphone, MessageCircle, TriangleAlert } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/data-display/avatar";
import { Button } from "@/components/buttons/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/navigation/tabs";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/overlays/popover";
import { Typography } from "@/components/typography/typography";
import { formatRelativeDate } from "@/lib/relative-date";
import { cn } from "@/lib/utils";

import { HeaderIconButton } from "./header-icon-button";

/*
 * Notifications (prds/autopartshub-home.md, "The header"): a popover from the bell in every AutoPartsHUB header. Unread
 * and All, newest first; "Clear all" empties it. Kept simple: it isn't in Figma yet (after a typical notifications panel).
 */

/**
 * One notification. `kind` sets what leads it: a person's avatar, a department, or an icon for what happened. `comments`:
 * the new comments on one idea, counted in one notification ("3 new comments on …"); its link opens the idea with Comments
 * open.
 */
type AppNotification = {
	id: string;
	kind: "person" | "department" | "comments" | "success" | "warning" | "error" | "update";
	title: string;
	/** One line under the title; it's cut with an ellipsis when it's longer. */
	description: string;
	/** ISO date. */
	createdAt: string;
	unread?: boolean;
	/** A person's photo; without one, their initials. */
	avatarSrc?: string;
	/** A person's name, for their initials. */
	name?: string;
	/** The concept it's about: selecting it opens the concept (and marks it read). */
	href?: string;
};

type NotificationsPopoverProps = {
	notifications: AppNotification[];
	/** The clock the times are counted from (stories pin it); defaults to now. */
	now?: number;
};

const kindIcon = {
	comments: { icon: MessageCircle, className: "bg-neutral-muted text-foreground" },
	success: { icon: CircleCheck, className: "bg-success-muted text-success" },
	warning: { icon: TriangleAlert, className: "bg-warning-muted text-warning" },
	error: { icon: CircleAlert, className: "bg-destructive-muted text-destructive" },
	update: { icon: Megaphone, className: "bg-success-muted text-success" },
} as const;

const initials = (name = "") =>
	name
		.split(/\s+/)
		.map((word) => word.charAt(0))
		.slice(0, 2)
		.join("")
		.toUpperCase();

/** A notification's row: a link to its concept when it has one, else a button that only marks it read. */
function Row({ href, ...props }: { href?: string; onClick: () => void; className: string; children: React.ReactNode }) {
	return href ? <a href={href} {...props} /> : <button type='button' {...props} />;
}

/** What leads a notification: the person's avatar, a building for a department, or the kind's icon in a tinted circle. */
function NotificationLead({ notification }: { notification: AppNotification }) {
	if (notification.kind === "person" || notification.kind === "department") {
		return (
			<Avatar size='lg' className='shrink-0'>
				{notification.avatarSrc ? <AvatarImage src={notification.avatarSrc} alt='' /> : null}
				<AvatarFallback className={notification.kind === "department" ? "bg-neutral-muted text-foreground" : undefined}>
					{notification.kind === "department" ? <Building2 aria-hidden className='size-4' /> : initials(notification.name)}
				</AvatarFallback>
			</Avatar>
		);
	}
	const { icon: Icon, className } = kindIcon[notification.kind];
	return (
		<span aria-hidden className={cn("grid size-10 shrink-0 place-items-center rounded-full", className)}>
			<Icon className='size-5' />
		</span>
	);
}

/**
 * The bell and its notifications: the bell shows a dot while any is unread; the popover has "Clear all", Unread and All
 * tabs, and the list (an unread dot, what leads it, the title, one line, the time). Selecting one opens its concept and
 * marks it read.
 */
function NotificationsPopover({ notifications, now }: NotificationsPopoverProps) {
	// Read and cleared are hers to change here; the list itself comes in through props.
	const [read, setRead] = React.useState<Set<string>>(() => new Set());
	const [cleared, setCleared] = React.useState(false);
	const [open, setOpen] = React.useState(false);
	const items = cleared ? [] : notifications.map((n) => ({ ...n, unread: n.unread && !read.has(n.id) }));
	const unread = items.filter((n) => n.unread);
	const markRead = (id: string) => setRead((current) => new Set(current).add(id));

	const list = (shown: typeof items) => (
		<ul className='flex flex-col gap-0.5'>
			{shown.map((notification) => {
				const time = formatRelativeDate(notification.createdAt, now);
				return (
					<li key={notification.id}>
						<Row
							href={notification.href}
							onClick={() => {
								markRead(notification.id);
								// It opens what it's about: the popover doesn't stay over it.
								if (notification.href) setOpen(false);
							}}
							className='flex w-full items-center gap-3 rounded-lg px-2 py-2.5 text-start outline-none hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring'
						>
							{/* The unread dot (the bell's sky), or its space, so the rows line up. */}
							<span aria-hidden className={cn("size-2 shrink-0 rounded-full", notification.unread && "bg-(--sky-500)")} />
							<NotificationLead notification={notification} />
							<span className='flex min-w-0 flex-1 flex-col'>
								<span className='text-sm font-medium text-foreground'>
									{notification.unread ? <span className='sr-only'>Unread: </span> : null}
									{notification.title}
								</span>
								<span className='truncate text-sm text-muted-foreground'>{notification.description}</span>
							</span>
							<time dateTime={notification.createdAt} title={time.title} className='shrink-0 self-start pt-0.5 text-xs text-muted-foreground'>
								{time.label}
							</time>
						</Row>
					</li>
				);
			})}
		</ul>
	);

	const empty = (title: string, description?: string) => (
		<div className='flex flex-col items-center gap-2 px-4 py-8 text-center'>
			<Bell aria-hidden className='size-6 text-muted-foreground' />
			<p className='text-sm text-foreground'>{title}</p>
			{description ? <p className='text-xs text-muted-foreground'>{description}</p> : null}
		</div>
	);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<HeaderIconButton label='Notifications' dot={unread.length > 0}>
					<Bell aria-hidden />
				</HeaderIconButton>
			</PopoverTrigger>
			<PopoverContent align='end' sideOffset={8} className='flex w-[440px] flex-col gap-4 p-5' aria-label='Notifications'>
				<div className='flex items-center justify-between gap-3'>
					<Typography as='h2' size='lg' weight='semibold' className='text-foreground-prominent'>
						Notifications
					</Typography>
					{items.length ? (
						<Button variant='link' className='h-auto gap-1.5 p-0 font-semibold text-link' onClick={() => setCleared(true)}>
							<CheckCheck aria-hidden />
							Clear all
						</Button>
					) : null}
				</div>
				<Tabs defaultValue='unread' className='gap-3'>
					<TabsList className='self-center'>
						<TabsTrigger value='unread'>Unread</TabsTrigger>
						<TabsTrigger value='all'>All</TabsTrigger>
					</TabsList>
					<TabsContent value='unread' className='max-h-[420px] overflow-y-auto'>
						{unread.length ? list(unread) : empty("You're all caught up.")}
					</TabsContent>
					<TabsContent value='all' className='max-h-[420px] overflow-y-auto'>
						{items.length
							? list(items)
							: empty("All cleared. Nothing to show here now.", "Notifications older than 60 days are cleared automatically.")}
					</TabsContent>
				</Tabs>
			</PopoverContent>
		</Popover>
	);
}

export { NotificationsPopover, type NotificationsPopoverProps, type AppNotification };
