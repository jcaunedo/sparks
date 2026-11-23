import type { Meta, StoryObj } from "@storybook/react-vite";

import { goToStory, storyIds, withStoryLinks, type StoryLink } from "../../../story-links";
import { sampleUser } from "../../sample-data/sample-user";
import { sampleNotifications, sampleNotificationsNow } from "../../sample-data/sample-notifications";
import type { SparksWorkspaceProps } from "../workspace/workspace";
import { sampleArchivedConcepts, sampleConcepts, sampleNow, sampleSharedConcepts } from "./sample-concepts";
import { SparksStartPage } from "./start-page";
import { conceptStoryLinks } from "./concept-story-links";
import { loadDemoConcept } from "../shared/demo-session";

/* Prototype: "New idea" opens the workspace with a new concept on Plan and an empty conversation. */
const newConcept: Partial<SparksWorkspaceProps> = {
	conceptName: "New idea",
	currentStep: "plan",
	reachedStep: "plan",
	messages: [],
};

const meta = {
	title: "Layouts/AutoPartsHUB/Sparks/Start page",
	component: SparksStartPage,
	parameters: {
		layout: "fullscreen",
	},
	decorators: [withStoryLinks(() => conceptStoryLinks())],
	// Prototype: the concept she started from "New idea" in this tab leads "Your ideas" (prds/sparks.md, "The start page").
	render: (args) => {
		const demo = loadDemoConcept();
		return <SparksStartPage {...args} concepts={demo ? [demo.summary, ...args.concepts] : args.concepts} />;
	},
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
