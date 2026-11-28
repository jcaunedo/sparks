import * as React from "react";

import { AutoPartsHubLogo } from "@/components/brand/autoparts-hub-logo";
import { AppHeader } from "@/components/navigation/app-header";

import { HeaderActions } from "./header-actions";
import type { NotificationsPopoverProps } from "./notifications-popover";

/** The signed-in user, as the AutoPartsHUB shell and its pages show them. */
type AutoPartsHubUser = {
	firstName: string;
	/** With `firstName`, the avatar's two initials when there's no photo ("ML"), as in Share's lists. */
	lastName?: string;
	/** Profile photo URL. Without one, the avatar shows the initials. */
	avatarSrc?: string;
};

type AutoPartsHubShellProps = {
	user: AutoPartsHubUser;
	/** The bell's notifications (the same in every AutoPartsHUB header). */
	notifications?: NotificationsPopoverProps;
	children?: React.ReactNode;
};

/**
 * The AutoPartsHUB app frame every page shares: subtle background, header with the
 * logo, notifications and the user's avatar. Figma: Sparks → "AutoPartsHUB" (node 7:1021).
 */
function AutoPartsHubShell({ user, notifications, children }: AutoPartsHubShellProps) {
	return (
		<div className='flex min-h-screen flex-col bg-background-subtle text-foreground'>
			<AppHeader logo={<AutoPartsHubLogo />}>
				<HeaderActions user={user} notifications={notifications} />
			</AppHeader>
			{/* Fills the screen below the header, so a page can stretch into it (e.g. an empty state centered in the rest of the screen). */}
			<main className='flex flex-1 flex-col'>{children}</main>
		</div>
	);
}

export { AutoPartsHubShell, type AutoPartsHubShellProps, type AutoPartsHubUser };
