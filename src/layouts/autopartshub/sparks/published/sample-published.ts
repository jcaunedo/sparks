import type { AutoPartsHubUser } from "../../autopartshub";
import { sampleUser } from "../../sample-data/sample-user";
import { sampleChosenFrom } from "../plan/sample-choose";
import { sampleDirectionFitCheck, sampleDirections, sampleRecommended } from "../plan/sample-directions";
import { sampleSuccessSuggestedTarget } from "../plan/sample-success";
import type { PrototypeComment, PrototypeCommentAuthor } from "../prototype/prototype-comments";
import type { ConceptForReview } from "../review/review-panel";
import { sampleConceptForReview, sampleReviewerIdeaComment, sampleReviewerPeople, sampleReviewerPin } from "../review/sample-review";
import { sampleEvaluation } from "../validate/sample-validate";
import type { IdeaComment } from "../review/review-panel";

/*
 * The published idea, as a reviewer from Engineering opens it (prds/sparks-review.md, "What reviewers see and do"):
 * "Wrong-part returns", version 3 of "Fit check before you buy", with the other teams' first comments. Everything here
 * is made up.
 */

/** The reviewer signed in: Marcus, from Engineering. */
export const samplePublishedUser: AutoPartsHubUser = { firstName: "Marcus" };
export const samplePublishedReviewer: PrototypeCommentAuthor = sampleReviewerPeople.eng;

/** Who published it. */
export const samplePublishedBy = "Dana Morales";
const dana: PrototypeCommentAuthor = { name: samplePublishedBy, avatarSrc: sampleUser.avatarSrc };

export const samplePublishedVersion = 3;
export const samplePublishedAt = new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString();

/** Dana's invitation, as Sparks drafted it for engineering. */
export const samplePublishedInvitation = {
	text: "I've been working on a way to cut wrong-part returns. It's defined, prototyped and evaluated with AI scenarios, not yet with real customers. Could you review it by Friday? You can try the prototype and comment on any part. From engineering, I'd most like your view on the fit data.",
	due: "Friday, Nov 28",
};

/** The idea as published: "Fit check before you buy", evaluated, at version 3. */
export const samplePublishedConcept: ConceptForReview = sampleConceptForReview({
	changes: {},
	version: samplePublishedVersion,
	chosen: sampleChosenFrom(sampleDirectionFitCheck, sampleDirections, `${sampleSuccessSuggestedTarget}% fewer "doesn't fit" returns within 3 months of launch.`),
	direction: sampleDirectionFitCheck,
	recommended: sampleRecommended(sampleDirections),
	evaluation: sampleEvaluation({}, samplePublishedVersion),
});

const hoursAgo = (hours: number) => new Date(Date.now() - hours * 60 * 60 * 1000).toISOString();

/** What the other teams have pinned on the prototype so far; Dana has answered the UX team. */
export const samplePublishedPrototypeComments: PrototypeComment[] = [
	{
		...sampleReviewerPin("ux")!,
		createdAt: hoursAgo(1.5),
		replies: [{ id: "reply-dana-ux", text: "Good point. I'll try that heading in the next version.", createdAt: hoursAgo(1), author: dana }],
	},
	{ ...sampleReviewerPin("catalog")!, createdAt: hoursAgo(0.5) },
];

/** What the other teams have said on parts of the idea so far. */
export const samplePublishedIdeaComments: IdeaComment[] = [
	{ ...sampleReviewerIdeaComment("catalog")!, createdAt: hoursAgo(0.75) },
];
