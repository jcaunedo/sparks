import type { Meta, StoryObj } from "@storybook/react-vite";

import { AutoPartsHubHome } from "./home";
import { sampleApps } from "./sample-apps";
import { sampleUser } from "./sample-user";

const meta = {
	title: "Layouts/AutoPartsHUB/Home",
	component: AutoPartsHubHome,
	parameters: {
		layout: "fullscreen",
	},
	args: {
		user: sampleUser,
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
