import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { goToStory, storyIds, withStoryLinks, type StoryLink } from "../../../story-links";
import { sampleUser } from "../../sample-data/sample-user";
import { sampleNotifications, sampleNotificationsNow } from "../../sample-data/sample-notifications";
import type { SparksWorkspaceProps } from "../workspace/workspace";
import { sampleArchivedConcepts, sampleConcepts, sampleNow, sampleSharedConcepts } from "./sample-concepts";
import { SparksStartPage, type SparksConceptAction, type SparksConceptList, type SparksConceptSummary, type SparksStartPageProps } from "./start-page";
import { conceptStoryLinks, noComments } from "./concept-story-links";
import { clearDemoConcept, openDemoConcept } from "../shared/demo-session";

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
	// A row's "…" menu, for this visit: Duplicate puts a copy first in "Your ideas", Archive and Unarchive move it between
	// the tabs, Delete takes it out (and the idea she started, if it's that one, for good).
	const [yours, setYours] = React.useState(() => (demo ? [demo.summary, ...props.concepts] : props.concepts));
	const [archived, setArchived] = React.useState(props.archivedConcepts ?? []);
	const copies = React.useRef(0);
	const onConceptAction = (action: SparksConceptAction, concept: SparksConceptSummary, list: SparksConceptList) => {
		const without = (concepts: SparksConceptSummary[]) => concepts.filter((c) => c.id !== concept.id);
		const now = new Date().toISOString();
		if (action === "duplicate")
			setYours((current) => [
				{ ...concept, id: `${concept.id}-copy-${++copies.current}`, name: `${concept.name} (copy)`, sharing: "Only you", createdAt: now, editedAt: now },
				...current,
			]);
		if (action === "archive") {
			setYours(without);
			setArchived((current) => [concept, ...current]);
		}
		if (action === "unarchive") {
			setArchived(without);
			setYours((current) => [concept, ...current]);
		}
		if (action === "delete") {
			if (list === "archive") setArchived(without);
			else setYours(without);
			if (concept.id === demo?.summary.id) clearDemoConcept();
		}
	};
	return <SparksStartPage {...props} concepts={yours} archivedConcepts={archived} onConceptAction={onConceptAction} />;
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
