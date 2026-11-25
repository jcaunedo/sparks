import type { PrototypeComment } from "../prototype/prototype-comments";
import { sampleReviewerPin } from "../review/sample-review";

/*
 * The comments Dana's collaborators left on the prototype of "Fit check before checkout" while she was away: three, as
 * the notification about them says (`sample-notifications.ts`, n1). Made up.
 */

/** The idea they're on (its id in `sampleConcepts`), and the notification's link, which opens it with Comments open. */
export const sampleNewCommentsIdea = "fit-check";
export const sampleNewCommentsHref = "#fit-check-comments";
export const sampleNewCommentsNotification = "n1";

/** The comments, oldest first, dated from when they're asked for. */
export const sampleNewComments = (now = Date.now()): PrototypeComment[] =>
	["catalog", "eng", "ux"].flatMap((team, index) => {
		const pin = sampleReviewerPin(team, "fit-check");
		return pin ? [{ ...pin, id: `new-comment-${team}`, createdAt: new Date(now - (2 - index) * 14 * 60_000).toISOString() }] : [];
	});
