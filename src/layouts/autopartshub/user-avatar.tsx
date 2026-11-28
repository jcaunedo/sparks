import { Avatar, AvatarFallback, AvatarImage } from "@/components/data-display/avatar";

import type { AutoPartsHubUser } from "./autopartshub";

/**
 * The signed-in user's avatar in every AutoPartsHUB header (the shell's and Sparks's): 36px, as Figma's header
 * (sparks.ds "header-autopartshub", 32:1145) draws it, between Avatar's `default` (32) and `lg` (40); `lg` keeps its
 * larger initial. The photo, or else two initials (first and last name), as in Share's lists ("ML"); the first
 * initial alone when there's no last name.
 */
function UserAvatar({ user }: { user: AutoPartsHubUser }) {
	return (
		<Avatar size='lg' className='size-9'>
			{user.avatarSrc && <AvatarImage src={user.avatarSrc} alt={user.firstName} />}
			<AvatarFallback>{`${user.firstName.charAt(0)}${user.lastName?.charAt(0) ?? ""}`.toUpperCase()}</AvatarFallback>
		</Avatar>
	);
}

export { UserAvatar };
