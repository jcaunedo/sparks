import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { goToStory, storyIds, withStoryLinks, type StoryLink } from "../../../story-links";
import { sampleUser } from "../../sample-data/sample-user";
import { sampleNotifications, sampleNotificationsNow } from "../../sample-data/sample-notifications";
import type { SparksWorkspaceProps } from "../workspace/workspace";
import { sampleArchivedConcepts, sampleConcepts, sampleNow, sampleSharedConcepts } from "./sample-concepts";
import { SparksStartPage, type SparksStartPageProps } from "./start-page";
import { conceptStoryLinks, noComments } from "./concept-story-links";
import { openDemoConcept } from "../shared/demo-session";

/* Prototype: "New idea" opens the workspace with a new concept on Plan and an empty conversation. */
const newConcept: Partial<SparksWorkspaceProps> = {
	conceptName: "New idea",
	currentStep: "plan",
	reachedStep: "plan",
	messages: [],
	...noComments,
};

/**
 * Prototype: the concept she started from "New idea" leads "Your ideas" when she comes back from it ("All ideas"). Opened
 * any other way, it isn't there: the demo starts over (prds/sparks.md, "The start page"; `demo-session.ts`).
 */
function StartPagePrototype(props: SparksStartPageProps) {
	const [demo] = React.useState(openDemoConcept);
	return <SparksStartPage {...props} concepts={demo ? [demo.summary, ...props.concepts] : props.concepts} />;
}

const meta = {
	title: "Layouts/AutoPartsHUB/Sparks/Start page",
	component: SparksStartPage,
	parameters: {
		layout: "fullscreen",
	},
	decorators: [withStoryLinks(() => conceptStoryLinks())],
	render: (args) => <StartPagePrototype {...args} />,
	args: {
		user: sampleUser,
		notifications: { notifications: sampleNotifications, now: sampleNotificationsNow },
		concepts: sampleConcepts,
		sharedConcepts: sampleSharedConcepts,
		archivedConcepts: sampleArchivedConcepts,
		now: sampleNow,
		// Prototype: "New idea" opens the workspace story, in the same tab.
		onNewIdea: () => goToStory(storyIds.sparksWorkspace, newConcept),
	},
} satisfies Meta<typeof SparksStartPage>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Dana's concepts, with "Shared with you" and "Archive" in the other tabs. Figma: Sparks → "Sparks" (node 1:2). */
export const Default: Story = {};

/** First visit, no concepts: every tab shows its empty state. Not in Figma yet. */
export const FirstVisit: Story = {
	args: {
		concepts: [],
		sharedConcepts: [],
		archivedConcepts: [],
	},
};
