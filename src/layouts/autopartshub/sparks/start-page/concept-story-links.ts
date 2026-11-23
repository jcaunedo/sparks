import { storyIds, type StoryLink } from "../../../story-links";
import { demoConceptHref, loadDemoConcept } from "../shared/demo-session";
import { sparksSteps, type SparksStep } from "../shared/steps";
import type { SparksWorkspaceProps } from "../workspace/workspace";
import { sampleArchivedConcepts, sampleConcepts, sampleSharedConcepts } from "./sample-concepts";
import type { SparksConceptSummary } from "./start-page";

/*
 * Prototype: a row opens the workspace story with that concept, on the step it's on, its problem as Dana's first
 * message. A concept past the steps (waiting for a decision, advanced, stopped) opens on Review.
 */
function openConcept(concept: SparksConceptSummary): StoryLink {
	const step = sparksSteps.some((s) => s.id === concept.status) ? (concept.status as SparksStep) : "review";
	const args: Partial<SparksWorkspaceProps> = {
		conceptName: concept.name,
		currentStep: step,
		reachedStep: step,
		messages: [{ id: "m1", from: "user", text: concept.summary }],
	};
	// A concept opens in the same tab; "All ideas" comes back here (prds/sparks.md, "The concept workspace").
	return { storyId: storyIds.sparksWorkspace, args };
}

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
	// The concept she started from "New idea": it opens where she left it, its conversation included.
	const demo = loadDemoConcept();
	if (demo) links[demoConceptHref] = { storyId: storyIds.sparksWorkspace, args: demo.workspace, ...(newTab ? { newTab: true } : {}) };
	return links;
}

export { conceptStoryLinks, openConcept };
