import type { Meta, StoryObj } from "@storybook/react-vite";

import { storyIds, withStoryLinks } from "../../story-links";
import { AutoPartsHubHome } from "./home";
import { sampleApps } from "./sample-apps";
import { sampleUser } from "../sample-data/sample-user";
import { conceptStoryLinks } from "../sparks/start-page/concept-story-links";
import { sampleNotifications, sampleNotificationsNow } from "../sample-data/sample-notifications";

const meta = {
	title: "Layouts/AutoPartsHUB/Home",
	component: AutoPartsHubHome,
	parameters: {
		layout: "fullscreen",
	},
	// Prototype: the Sparks card opens the Sparks start page in a new tab, as the cards do.
	// "#sparks" opens Sparks in its own tab; a notification about a concept opens that concept in its own tab too.
	decorators: [withStoryLinks(() => ({ ...conceptStoryLinks(true), "#sparks": { storyId: storyIds.sparksStartPage, newTab: true } }))],
	args: {
		user: sampleUser,
		notifications: { notifications: sampleNotifications, now: sampleNotificationsNow },
		apps: sampleApps,
	},
} satisfies Meta<typeof AutoPartsHubHome>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Figma: Sparks → "AutoPartsHUB" (node 7:1021). */
export const Default: Story = {};

/** No profile photo: the avatar shows the first initial. */
export const NoPhoto: Story = {
	args: {
		user: { ...sampleUser, avatarSrc: undefined },
	},
};

/** Opened on "My library", as Sparks's "Add from library" opens it. Its content isn't designed yet: the empty state. */
export const MyLibrary: Story = {
	args: { defaultTab: "library" },
};
