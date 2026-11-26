import type { AutoPartsHubUser } from "../../autopartshub";
import { sampleUser } from "../../sample-data/sample-user";
import { sampleChosenFrom } from "../plan/sample-choose";
import { sampleDirectionFitCheck, sampleDirections, sampleRecommended } from "../plan/sample-directions";
import { sampleSuccessSuggestedTarget } from "../plan/sample-success";
import type { PrototypeComment, PrototypeCommentAuthor } from "../prototype/prototype-comments";
import type { ConceptForReview } from "../review/review-panel";
import type { AdvancedIdea } from "./published-idea";
import {
	sampleBuildFlag,
	sampleConceptForReview,
	sampleDecision,
	sampleDecisionOwner,
	sampleReadyToBuild,
	sampleReviewerIdeaComment,
	sampleReviewerPeople,
	sampleReviewerPin,
	sampleTeamMember,
} from "../review/sample-review";
import { reviewProfileFor } from "../review/sample-review-directions";
import { samplePersonPhoto } from "../../sample-data/sample-people";
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

/*
 * Once it's advanced and shared (prds/sparks-review.md, "After the decision"): version 4, with the changes made after the
 * reviews (the fit message above the price, engineering's effort, the open question about fit data), as Jordan, a
 * developer on Dana's product team, opens it.
 */

/** Jordan, from Dana's product team, who builds it. */
export const sampleAdvancedUser: AutoPartsHubUser = { firstName: "Jordan", avatarSrc: samplePersonPhoto("Jordan Lee") };
export const sampleAdvancedReader: PrototypeCommentAuthor = sampleTeamMember;

export const sampleAdvancedVersion = 4;
const advancedChanges = { fitAbovePrice: true };
const advancedEvaluation = sampleEvaluation(advancedChanges, sampleAdvancedVersion);

/** The idea as it was advanced. */
export const sampleAdvancedConcept: ConceptForReview = sampleConceptForReview({
	changes: advancedChanges,
	version: sampleAdvancedVersion,
	chosen: sampleChosenFrom(sampleDirectionFitCheck, sampleDirections, `${sampleSuccessSuggestedTarget}% fewer "doesn't fit" returns within 3 months of launch.`),
	direction: sampleDirectionFitCheck,
	recommended: sampleRecommended(sampleDirections),
	evaluation: advancedEvaluation,
	engineeringEffort: true,
	openQuestions: [reviewProfileFor("fit-check").question(advancedChanges)],
});

/**
 * Jordan flagged an acceptance criterion as unclear, and Dana made Sparks's fix (prds/sparks-review.md, "Something unclear
 * after it advances"): the criterion as it reads now, and the comment, addressed.
 */
const buildFlag = sampleBuildFlag(sampleAdvancedConcept, "fit-check")!;
export const sampleAdvancedClarifiedConcept: ConceptForReview = {
	...sampleAdvancedConcept,
	stories: sampleAdvancedConcept.stories.map((item) => ({
		...item,
		criteria: item.criteria.map((criterion) => (criterion === buildFlag.criterion ? buildFlag.suggestion : criterion)),
	})),
};
export const sampleAdvancedAddressedComments: IdeaComment[] = [
	{
		...buildFlag.comment,
		createdAt: hoursAgo(3),
		addressed: `Dana changed the acceptance criterion: "${buildFlag.suggestion}"`,
		replies: [{ id: "reply-dana-build-flag", text: `I changed the acceptance criterion: "${buildFlag.suggestion}"`, createdAt: hoursAgo(2), author: dana }],
	},
];

/** The decision, and Sparks's check that it's ready to build, as Dana shared it. */
export const sampleAdvanced: AdvancedIdea = {
	owner: sampleDecisionOwner.name,
	date: "Nov 24, 2026",
	reason: sampleDecision(advancedEvaluation, "fit-check").reason,
	ready: sampleReadyToBuild(sampleAdvancedConcept, advancedChanges, "fit-check"),
};
