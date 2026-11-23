import { Bell, MessageCircle } from "lucide-react";

import type { AutoPartsHubUser } from "./autopartshub";
import { NotificationsPopover, type NotificationsPopoverProps } from "./notifications-popover";
import { HeaderIconButton } from "./header-icon-button";
import { UserAvatar } from "./user-avatar";

/**
 * The right side of the AutoPartsHUB home's and the Sparks start page's headers (AppHeader's 12px apart): on the start
 * page comments first (`comments`), then notifications, then the user's avatar. Figma sparks.ds "header-autopartshub" →
 * "AutoPartsHUB" (21:186: bell, avatar) and "Sparks" (32:1146: comments, bell, avatar). A concept's header ("Sparks
 * Project") has its own: who has access with Share, comments, notifications and the close button. What comments and
 * notifications open isn't designed yet (prds/autopartshub-home.md, prds/sparks.md).
 */
function HeaderActions({
	user,
	comments,
	notifications,
	onNotifications,
}: {
	user: AutoPartsHubUser;
	/** Show "Comments" (Sparks): `unread` puts the dot on it. */
	comments?: { unread?: boolean; onOpen?: () => void };
	/** The bell's notifications popover. Without it, the bell is a plain button (`onNotifications`). */
	notifications?: NotificationsPopoverProps;
	onNotifications?: () => void;
}) {
	return (
		<>
			{comments ? (
				<HeaderIconButton label='Comments' dot={comments.unread} onClick={comments.onOpen}>
					<MessageCircle aria-hidden />
				</HeaderIconButton>
			) : null}
			{notifications ? (
				<NotificationsPopover {...notifications} />
			) : (
				<HeaderIconButton label='Notifications' onClick={onNotifications}>
					<Bell aria-hidden />
				</HeaderIconButton>
			)}
			<UserAvatar user={user} />
		</>
	);
}

export { HeaderActions };
