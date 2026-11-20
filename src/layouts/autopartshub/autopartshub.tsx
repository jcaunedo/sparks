import * as React from "react";

import { AutoPartsHubLogo } from "@/components/brand/autoparts-hub-logo";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/components/data-display/avatar";
import { AppHeader } from "@/components/navigation/app-header";

/** The signed-in user, as the AutoPartsHUB shell and its pages show them. */
type AutoPartsHubUser = {
	firstName: string;
	/** Profile photo URL. Without one, the avatar shows the first initial. */
	avatarSrc?: string;
};

type AutoPartsHubShellProps = {
	user: AutoPartsHubUser;
	children?: React.ReactNode;
};

/**
 * The AutoPartsHUB app frame every page shares: subtle background, header with the
 * logo and the user's avatar. Figma: Sparks → "AutoPartsHUB" (node 7:1021).
 */
function AutoPartsHubShell({ user, children }: AutoPartsHubShellProps) {
	return (
		<div className='flex min-h-screen flex-col bg-background-subtle text-foreground'>
			<AppHeader logo={<AutoPartsHubLogo />}>
				<Avatar size='lg'>
					{user.avatarSrc && <AvatarImage src={user.avatarSrc} alt={user.firstName} />}
					<AvatarFallback>{user.firstName.charAt(0).toUpperCase()}</AvatarFallback>
				</Avatar>
			</AppHeader>
			<main className='flex-1'>{children}</main>
		</div>
	);
}

export { AutoPartsHubShell, type AutoPartsHubShellProps, type AutoPartsHubUser };
