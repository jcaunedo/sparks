import { Bell } from "lucide-react";

import type { AutoPartsHubUser } from "./autopartshub";
import { NotificationsPopover, type NotificationsPopoverProps } from "./notifications-popover";
import { HeaderIconButton } from "./header-icon-button";
import { UserAvatar } from "./user-avatar";

/**
 * The right side of the AutoPartsHUB home's and the Sparks start page's headers (AppHeader's 12px apart): notifications,
 * then the user's avatar. No comments: they belong to an idea, so "Comments" is only in an idea's header, and new ones are
 * a notification (prds/sparks.md, "The start page"; sparks.ds "header-autopartshub" → "Sparks", 32:1146, still draws it).
 */
function HeaderActions({
	user,
	notifications,
	onNotifications,
}: {
	user: AutoPartsHubUser;
	/** The bell's notifications popover. Without it, the bell is a plain button (`onNotifications`). */
	notifications?: NotificationsPopoverProps;
	onNotifications?: () => void;
}) {
	return (
		<>
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
