import type { Meta, StoryObj } from "@storybook/react-vite";

import { storyIds, withStoryLinks, withTabName } from "../../story-links";
import { AutoPartsHubHome } from "./home";
import { sampleApps } from "./sample-apps";
import { sampleUser } from "../sample-data/sample-user";
import { conceptStoryLinks } from "../sparks/start-page/concept-story-links";
import { sampleLibrary, sampleLibraryNow } from "../sample-data/sample-library";
import { sampleNotifications, sampleNotificationsNow } from "../sample-data/sample-notifications";

const meta = {
	title: "Layouts/AutoPartsHUB/Home",
	component: AutoPartsHubHome,
	parameters: {
		layout: "fullscreen",
	},
	// Prototype: the Sparks card opens the Sparks start page in a new tab, as the cards do.
	// "#sparks" opens Sparks in its own tab; a notification about a concept opens that concept in its own tab too.
	decorators: [withTabName("autopartshub-home"), withStoryLinks(() => ({ ...conceptStoryLinks(true), "#sparks": { storyId: storyIds.sparksStartPage, newTab: true, tab: "autopartshub-sparks" } }))],
	args: {
		user: sampleUser,
		notifications: { notifications: sampleNotifications, now: sampleNotificationsNow },
		apps: sampleApps,
		library: sampleLibrary,
		now: sampleLibraryNow,
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

/** "My library": the same assets as Sparks's "Add from library". Not designed yet. */
export const MyLibrary: Story = {
	args: { defaultTab: "library" },
};

/** "My library" with nothing in it: the empty state. */
export const MyLibraryEmpty: Story = {
	args: { defaultTab: "library", library: [] },
};
