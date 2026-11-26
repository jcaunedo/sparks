import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

// Opened from Dana's Review panel ("See what the teams see"), it takes the version she published (`story-links` applies
// the args the opening tab left).
import "../../../story-links";
import { directionPrototypes, screenAudience } from "../prototype/direction-prototypes";
import type { PrototypeComment } from "../prototype/prototype-comments";
import { sampleFitCheck } from "../prototype/sample-fit-check";
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
	samplePublishedAt,
	samplePublishedBy,
	samplePublishedConcept,
	samplePublishedIdeaComments,
	samplePublishedInvitation,
	samplePublishedPrototypeComments,
	samplePublishedReviewer,
	samplePublishedUser,
	samplePublishedVersion,
} from "./sample-published";

const fitCheck = directionPrototypes["fit-check"];

/** The page with its comments and the reviewer's view kept in state, so it can be used. */
function PublishedIdeaPrototype(props: Omit<PublishedIdeaProps, "onPrototypeCommentsChange" | "onIdeaCommentsChange" | "onViewChange">) {
	const [prototypeComments, setPrototypeComments] = React.useState<PrototypeComment[]>(props.prototypeComments);
	const [ideaComments, setIdeaComments] = React.useState<IdeaComment[]>(props.ideaComments);
	const [view, setView] = React.useState<ReviewerView | undefined>(props.view);
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
		invitation: samplePublishedInvitation,
		concept: samplePublishedConcept,
		prototype: {
			label: "1. Fit check before you buy",
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
 * What a reviewer from Engineering sees from Dana's invitation: version 3 of the idea and its prototype, the other teams'
 * first comments, and their own view still to give. Not in Figma yet.
 */
export const Default: Story = {};

/** Their view sent: "Advance", with why; "Change your view" opens it again. */
export const ViewSent: Story = {
	args: { view: { view: "Advance", why: "Saved vehicles are there. About 6 weeks for the web team, after the holiday freeze." } },
};

/** No comments yet: the first reviewer to open it. */
export const NoComments: Story = { args: { prototypeComments: [], ideaComments: [] } };

/**
 * Advanced and shared with Dana's product team (prds/sparks-review.md, "After the decision"): what Jordan, a developer,
 * opens. What to build first, next to the prototype (user stories and acceptance criteria, what it needs, what to track,
 * design notes, open questions), then why it's built this way. "Ready to build" shows Sparks's check, with what's still
 * open. "See what the teams see" in Dana's Review opens it once she's shared it.
 */
export const Advanced: Story = {
	args: {
		user: sampleAdvancedUser,
		reviewer: sampleAdvancedReader,
		version: sampleAdvancedVersion,
		concept: sampleAdvancedConcept,
		advanced: sampleAdvanced,
		invitation: undefined,
		prototype: {
			label: "1. Fit check before you buy",
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
