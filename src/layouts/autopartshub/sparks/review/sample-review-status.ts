import type { ReviewFeedback } from "./review-status";

/*
 * Sample data for Review status (prds/sparks-review.md, "Team assessment and Review status"): what Sparks makes of the
 * assessments. The people asked and their views are the reviewers (`sample-review-directions.ts`). Replace with API data.
 */

/** How long a reviewer takes to give their view after commenting, in the demo: slow enough to watch the card fill. */
export const sampleAssessmentStepMs = 2500;

/** What Sparks makes of the assessments (AI-generated in the product; written here). */
export const sampleReviewFeedback: ReviewFeedback = {
	summary:
		"The assessments received so far support reducing wrong-part returns and show value in the proposed vehicle compatibility experience. Key concerns include the availability and accuracy of compatibility data for older vehicles, invoice recognition reliability, and the experience when vehicle compatibility cannot be confirmed. Further validation is recommended before implementation.",
	criteria: [
		{ area: "Problem is worth solving", result: "Strong support" },
		{ area: "Proposed direction", result: "Support" },
		{ area: "Business value", result: "Strong support" },
		{ area: "Technical feasibility", result: "Mixed" },
		{ area: "Ready to implement", result: "Needs validation" },
	],
	nextSteps: [
		"Validate vehicle compatibility data coverage for older vehicles.",
		"Improve the experience when compatibility cannot be confirmed.",
		"Validate invoice recognition accuracy.",
		"Conduct real-customer testing before implementation.",
	],
};
