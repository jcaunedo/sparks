import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

// Opened from Dana's Review panel ("See what the teams see"), it takes the version she published (`story-links` applies
// the args the opening tab left).
import "../../../story-links";
import { directionPrototypes } from "../prototype/direction-prototypes";
import type { PrototypeComment } from "../prototype/prototype-comments";
import { sampleFitCheck } from "../prototype/sample-fit-check";
import type { IdeaComment } from "../review/review-panel";
import { PublishedIdea, type PublishedIdeaProps, type ReviewerView } from "./published-idea";
import {
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
			render: (audience) => fitCheck.render({ data: sampleFitCheck, audience, readyScreens: fitCheck.screens.length, changes: {} }),
		},
		prototypeComments: samplePublishedPrototypeComments,
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
