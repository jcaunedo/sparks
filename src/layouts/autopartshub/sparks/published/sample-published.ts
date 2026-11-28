import type { AutoPartsHubUser } from "../../autopartshub";
import { sampleUser } from "../../sample-data/sample-user";
import { sampleChosenFrom } from "../plan/sample-choose";
import { sampleDirectionFitCheck, sampleDirections, sampleRecommended } from "../plan/sample-directions";
import { sampleSuccessSuggestedTarget } from "../plan/sample-success";
import type { PrototypeComment, PrototypeCommentAuthor } from "../prototype/prototype-comments";
import type { ConceptForReview } from "../review/review-panel";
import type { AdvancedIdea, PublishedVersion } from "./published-idea";
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
 * "Wrong-part returns", version 3 of "Fit check before you buy", with his first comments (and the other teams', which he doesn't see). Everything here
 * is made up.
 */

/** The reviewer signed in: Marcus, from Engineering. */
export const samplePublishedUser: AutoPartsHubUser = { firstName: "Marcus", lastName: "Lee", avatarSrc: samplePersonPhoto("Marcus Lee") };
export const samplePublishedReviewer: PrototypeCommentAuthor = sampleReviewerPeople.marcus;

/**
 * Everyone asked to review "Fit check before you buy" (its five reviewers), each as the header shows them (`user`) and as
 * their comments do (`reviewer`): the Default story opens as the next one each time it loads, so the demo shows that each
 * reviewer sees only their own comments.
 */
export const samplePublishedReviewers: { user: AutoPartsHubUser; reviewer: PrototypeCommentAuthor }[] = reviewProfileFor("fit-check").reviewers.map((r) => {
	const [firstName, ...rest] = r.name.split(" ");
	return { user: { firstName, lastName: rest.join(" "), avatarSrc: samplePersonPhoto(r.name) }, reviewer: sampleReviewerPeople[r.id] };
});

/** Who published it. */
export const samplePublishedBy = "Dana Morales";
const dana: PrototypeCommentAuthor = { name: samplePublishedBy, avatarSrc: sampleUser.avatarSrc };

export const samplePublishedVersion = 3;
export const samplePublishedAt = new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString();

/** The versions Dana published to the teams, oldest first: the first build, then version 3 (version 2 was never published). */
export const samplePublishedVersions: PublishedVersion[] = [
	{ version: 1, name: "First build", publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() },
	{ version: samplePublishedVersion, name: "Fit message names the vehicle first", publishedAt: samplePublishedAt },
];

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

/**
 * Every comment pinned on the prototype so far: Marcus's own, which Dana has answered, and the other teams'. While it's
 * in review he sees only his own (`PublishedIdea` filters them); the others are here to show that.
 */
export const samplePublishedPrototypeComments: PrototypeComment[] = [
	{
		...sampleReviewerPin("marcus")!,
		createdAt: hoursAgo(1.5),
		replies: [{ id: "reply-dana-marcus", text: "Thanks. I'll check the invoice reading with your team before the next version.", createdAt: hoursAgo(1), author: dana }],
	},
	{ ...sampleReviewerPin("priya")!, createdAt: hoursAgo(1.25) },
	{ ...sampleReviewerPin("ana")!, createdAt: hoursAgo(0.5) },
];

/** Every comment on parts of the idea so far: Marcus's own and the catalog team's (which he doesn't see). */
export const samplePublishedIdeaComments: IdeaComment[] = [
	{ ...sampleReviewerIdeaComment("marcus")!, createdAt: hoursAgo(1.1) },
	{ ...sampleReviewerIdeaComment("ana")!, createdAt: hoursAgo(0.75) },
];

/*
 * Once it's advanced and shared (prds/sparks-review.md, "After the decision"): version 4, with the changes made after the
 * reviews (the fit message above the price, engineering's effort, the open question about fit data), as Jordan, a
 * developer on Dana's product team, opens it.
 */

/** Jordan, from Dana's product team, who builds it. */
export const sampleAdvancedUser: AutoPartsHubUser = { firstName: "Jordan", lastName: "Lee", avatarSrc: samplePersonPhoto("Jordan Lee") };
export const sampleAdvancedReader: PrototypeCommentAuthor = sampleTeamMember;

export const sampleAdvancedVersion = 4;
const advancedChanges = { fitAbovePrice: true };
const advancedEvaluation = sampleEvaluation(advancedChanges, sampleAdvancedVersion);

/** Version 4, the one advanced, after the two published for review. */
export const sampleAdvancedVersions: PublishedVersion[] = [
	...samplePublishedVersions,
	{ version: sampleAdvancedVersion, name: "Fit message above the price", publishedAt: samplePublishedAt },
];

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
