import type { Meta, StoryObj } from "@storybook/react-vite";

import { openStoryInNewTab, storyIds } from "../../../story-links";
import { sampleInvitationEmail } from "../review/sample-review";
import { InvitationEmail } from "./invitation-email";

const meta = {
	title: "Layouts/AutoPartsHUB/Sparks/Invitation email",
	component: InvitationEmail,
	parameters: { layout: "fullscreen" },
	// "View idea" opens the reviewers' page.
	args: { ...sampleInvitationEmail, onReview: () => openStoryInNewTab(storyIds.sparksPublishedIdea) },
} satisfies Meta<typeof InvitationEmail>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The email a reviewer gets (Figma "Email", 80:763), for one idea and one path, with Sparks's standard message. */
export const Default: Story = {};

/** One idea with two paths: still "an idea"; its paths are listed under its name, each at the version shared. */
export const SeveralPaths: Story = {
	args: {
		items: [
			{
				name: "Wrong-part returns",
				paths: [
					{ name: "Fit check before you buy", version: 3 },
					{ name: "Fit check at checkout", version: 1 },
				],
			},
		],
	},
};

/** Several ideas: the heading counts the ideas, and they're listed with their paths, as in "Publish your idea". */
export const Several: Story = {
	args: {
		items: [
			{ name: "Wrong-part returns", paths: [{ name: "Fit check before you buy", version: 3 }] },
			{ name: "Faster store pickup", paths: [{ name: "Ready-for-pickup alerts", version: 2 }] },
		],
	},
};

/** With the note Dana added in "Publish your idea" ("Add a note"), after the standard message. */
export const WithNote: Story = {
	args: {
		note:
			"Hi all, this is the fit check we talked about on Monday. I'd most like your view on the fit data and whether the VIN step feels right on a phone. Thanks!",
	},
};
