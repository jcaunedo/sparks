import type { AutoPartsHubUser } from "../autopartshub";

import sampleAvatar from "./images/sample-avatar.png";

/* The signed-in user (Dana), shared by every AutoPartsHUB screen: "Welcome back, Dana" and the header's avatar photo. */
export const sampleUser: AutoPartsHubUser = {
	firstName: "Dana",
	avatarSrc: sampleAvatar,
};
