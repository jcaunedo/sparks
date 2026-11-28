import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

// Opened from Publish (the idea's address, the invitation's link), it takes the version she published (`story-links` applies
// the args the opening tab left).
import "../../../story-links";
import { directionPrototypes, screenAudience } from "../prototype/direction-prototypes";
import type { PrototypeComment } from "../prototype/prototype-comments";
import { sampleFitCheck } from "../prototype/sample-fit-check";
import { useDemoSharedComments } from "../shared/demo-shared-comments";
import { sampleMentionable } from "../shared/sample-share";
import type { IdeaComment } from "../review/review-panel";
import { PublishedIdea, type PublishedIdeaProps, type ReviewerView } from "./published-idea";
import {
	sampleAdvanced,
	sampleAdvancedAddressedComments,
	sampleAdvancedClarifiedConcept,
	sampleAdvancedConcept,
	sampleAdvancedReader,
	sampleAdvancedUser,
	sampleAdvancedVersion,
	sampleAdvancedVersions,
	samplePublishedAt,
	samplePublishedBy,
	samplePublishedConcept,
	samplePublishedIdeaComments,
	samplePublishedInvitation,
	samplePublishedPrototypeComments,
	samplePublishedReviewer,
	samplePublishedReviewers,
	samplePublishedUser,
	samplePublishedVersion,
	samplePublishedVersions,
} from "./sample-published";

const fitCheck = directionPrototypes["fit-check"];

/** The page with its comments and the reviewer's view kept in state, so it can be used. */
function PublishedIdeaPrototype(props: Omit<PublishedIdeaProps, "onPrototypeCommentsChange" | "onIdeaCommentsChange" | "onViewChange">) {
	const [prototypeComments, setPrototypeComments] = React.useState<PrototypeComment[]>(props.prototypeComments);
	const [ideaComments, setIdeaComments] = React.useState<IdeaComment[]>(props.ideaComments);
	const [view, setView] = React.useState<ReviewerView | undefined>(props.view);
	// What they comment shows on Dana's Review (the Workspace stories, in this tab or another), and her replies here.
	useDemoSharedComments("prototype", prototypeComments, setPrototypeComments);
	useDemoSharedComments("idea", ideaComments, setIdeaComments);
	return (
		<PublishedIdea
			{...props}
			prototypeComments={prototypeComments}
			onPrototypeCommentsChange={setPrototypeComments}
			ideaComments={ideaComments}
			onIdeaCommentsChange={setIdeaComments}
			view={view}
			onViewChange={setView}
		/>
	);
}

/**
 * The demo's reviewer for this page load: the next of `samplePublishedReviewers` each time the page loads (kept in the
 * browser; at random without storage). Worked out once per load, so re-renders and story switches keep the same person.
 */
let thisLoadsReviewer: (typeof samplePublishedReviewers)[number] | undefined;
function reviewerForThisLoad() {
	if (thisLoadsReviewer) return thisLoadsReviewer;
	const count = samplePublishedReviewers.length;
	let index = Math.floor(Math.random() * count);
	try {
		const last = Number(window.localStorage.getItem("sparks-demo-published-reviewer"));
		index = Number.isInteger(last) && last >= 0 ? (last + 1) % count : 0;
		window.localStorage.setItem("sparks-demo-published-reviewer", String(index));
	} catch {
		// No storage (private window, blocked): the random one stands.
	}
	thisLoadsReviewer = samplePublishedReviewers[index];
	return thisLoadsReviewer;
}

const meta = {
	title: "Layouts/AutoPartsHUB/Sparks/Published idea",
	component: PublishedIdeaPrototype,
	parameters: { layout: "fullscreen" },
	args: {
		user: samplePublishedUser,
		reviewer: samplePublishedReviewer,
		ideaName: "Wrong-part returns",
		publishedBy: samplePublishedBy,
		version: samplePublishedVersion,
		publishedAt: samplePublishedAt,
		versions: samplePublishedVersions,
		invitation: samplePublishedInvitation,
		concept: samplePublishedConcept,
		prototype: {
			label: "Fit check before you buy",
			audiences: fitCheck.audiences,
			screens: fitCheck.screens.length,
			screenList: fitCheck.screens.map((name, view) => ({ name, audience: screenAudience(fitCheck, view).id })),
			render: (audience, screen, part) => fitCheck.render({ data: sampleFitCheck, audience, changes: {}, openOn: screen, openPart: part }),
		},
		prototypeComments: samplePublishedPrototypeComments,
		mentionable: sampleMentionable,
		ideaComments: samplePublishedIdeaComments,
	},
} satisfies Meta<typeof PublishedIdeaPrototype>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * What a reviewer sees from Dana's invitation: version 3 of the idea and its prototype, their own comments (the other
 * teams' aren't shown), and their view still to give. Each time the page loads it's the next of the five reviewers
 * (Priya, Lucas, Marcus, Ana, Nina), so the demo shows each one sees only their own. Not in Figma yet.
 */
export const Default: Story = {
	// A different reviewer each time the page loads: their name and photo, and only their comments.
	render: (args) => {
		const { user, reviewer } = reviewerForThisLoad();
		return <PublishedIdeaPrototype {...args} user={user} reviewer={reviewer} />;
	},
};

/** Their assessment sent: "Advance", with why; "Change your assessment" opens it again. */
export const ViewSent: Story = {
	args: { view: { view: "Advance", why: "Saved vehicles are there. About 6 weeks for the web team, after the holiday freeze." } },
};

/** No comments yet: before they've added one. */
export const NoComments: Story = { args: { prototypeComments: [], ideaComments: [] } };

/**
 * Advanced and shared with Dana's product team (prds/sparks-review.md, "After the decision"): what Jordan, a developer,
 * opens. What to build first, next to the prototype (user stories and acceptance criteria, what it needs, what to track,
 * design notes, open questions), then why it's built this way. "Ready to build" shows Sparks's check, with what's still
 * open.
 */
export const Advanced: Story = {
	args: {
		user: sampleAdvancedUser,
		reviewer: sampleAdvancedReader,
		version: sampleAdvancedVersion,
		versions: sampleAdvancedVersions,
		concept: sampleAdvancedConcept,
		advanced: sampleAdvanced,
		invitation: undefined,
		prototype: {
			label: "Fit check before you buy",
			audiences: fitCheck.audiences,
			screens: fitCheck.screens.length,
			screenList: fitCheck.screens.map((name, view) => ({ name, audience: screenAudience(fitCheck, view).id })),
			render: (audience, screen, part) => fitCheck.render({ data: sampleFitCheck, audience, changes: { fitAbovePrice: true }, openOn: screen, openPart: part }),
		},
		prototypeComments: [],
		ideaComments: [],
	},
};

/**
 * Jordan flagged an acceptance criterion as unclear ("What counts as "no fit data"?"), and Dana made the fix Sparks
 * proposed: the criterion reads differently now, and the comment shows "Addressed." with how, under the part and in
 * "Comments".
 */
export const UnclearAddressed: Story = {
	args: { ...Advanced.args, concept: sampleAdvancedClarifiedConcept, ideaComments: sampleAdvancedAddressedComments },
};
