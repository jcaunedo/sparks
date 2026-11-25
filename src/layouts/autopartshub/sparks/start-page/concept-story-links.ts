import { sampleNotifications, sampleNotificationsNow } from "../../sample-data/sample-notifications";
import { storyIds, type StoryLink } from "../../../story-links";
import { demoConceptHref, loadDemoConcept } from "../shared/demo-session";
import { sparksSteps, type SparksStep } from "../shared/steps";
import type { SparksWorkspaceProps } from "../workspace/workspace";
import { sampleArchivedConcepts, sampleConcepts, sampleSharedConcepts } from "./sample-concepts";
import { sampleNewComments, sampleNewCommentsHref, sampleNewCommentsIdea, sampleNewCommentsNotification } from "./sample-new-comments";
import type { SparksConceptSummary } from "./start-page";

/*
 * Prototype: a row opens the workspace story with that concept, on the step it's on, its problem as Dana's first
 * message. A concept past the steps (waiting for a decision, advanced, stopped) opens on Review. `withComments`: from the
 * notification about its new comments, with Comments open and that notification read.
 */
function openConcept(concept: SparksConceptSummary, withComments = false): StoryLink {
	const step = sparksSteps.some((s) => s.id === concept.status) ? (concept.status as SparksStep) : "review";
	const args: Partial<SparksWorkspaceProps> = {
		conceptName: concept.name,
		currentStep: step,
		reachedStep: step,
		messages: [{ id: "m1", from: "user", text: concept.summary }],
		comments: { prototype: concept.id === sampleNewCommentsIdea ? sampleNewComments() : [] },
		openCommentsKey: withComments ? Date.now() : 0,
		notifications: {
			notifications: withComments ? sampleNotifications.map((n) => (n.id === sampleNewCommentsNotification ? { ...n, unread: false } : n)) : sampleNotifications,
			now: sampleNotificationsNow,
		},
	};
	// A concept opens in the same tab; "All ideas" comes back here (prds/sparks.md, "The concept workspace").
	return { storyId: storyIds.sparksWorkspace, args };
}

/** What a concept with no comments sets, so one opened before doesn't leave its own (Storybook keeps a story's args). */
const noComments: Partial<SparksWorkspaceProps> = { comments: { prototype: [] }, openCommentsKey: 0 };

/**
 * Every sample concept's link (`#fit-check`…) mapped to its workspace story, for `withStoryLinks`: the start page's rows,
 * and a notification about a concept, wherever the bell is, plus the concept she started from "New idea" in this tab
 * (`demo-session.ts`). Pass it to `withStoryLinks` as a function, so that one is read at the click. `newTab`: from
 * outside Sparks (the AutoPartsHUB home), the concept opens in its own tab, as Sparks does.
 */
function conceptStoryLinks(newTab = false): Record<string, StoryLink> {
	const links: Record<string, StoryLink> = Object.fromEntries(
		[...sampleConcepts, ...sampleSharedConcepts, ...sampleArchivedConcepts].map((concept) => {
			const link = openConcept(concept) as Exclude<StoryLink, string>;
			return [concept.href, newTab ? { ...link, newTab: true } : link];
		}),
	);
	// The notification about an idea's new comments.
	const commented = sampleConcepts.find((concept) => concept.id === sampleNewCommentsIdea);
	if (commented) {
		const link = openConcept(commented, true) as Exclude<StoryLink, string>;
		links[sampleNewCommentsHref] = newTab ? { ...link, newTab: true } : link;
	}
	// The concept she started from "New idea": it opens where she left it, its conversation included.
	const demo = loadDemoConcept();
	if (demo) links[demoConceptHref] = { storyId: storyIds.sparksWorkspace, args: { ...demo.workspace, ...noComments }, ...(newTab ? { newTab: true } : {}) };
	return links;
}

export { conceptStoryLinks, noComments, openConcept };
