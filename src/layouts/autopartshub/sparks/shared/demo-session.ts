import type { SparksConceptSummary } from "../start-page/start-page";
import type { SparksWorkspaceProps } from "../workspace/workspace";

/*
 * Prototype only (stories, never a screen): the concept Dana started from "New idea" in this tab, so it shows in "Your
 * ideas" and opens where she left it (prds/sparks.md, "The start page"). Kept in sessionStorage, and only while she's
 * going between the two: the start page opened any other way (from the home, from Storybook's sidebar, reloaded) starts
 * the demo over, with no idea of hers yet. One concept: starting another from "New idea" replaces it.
 */

type DemoConcept = {
	/** Its row in "Your ideas". */
	summary: SparksConceptSummary;
	/** What reopening it gives the workspace: its name, step and conversation. */
	workspace: Pick<SparksWorkspaceProps, "conceptName" | "currentStep" | "reachedStep" | "messages">;
};

const key = "sparks:demo-concept";

/** Set by "All ideas" as it goes to the start page, which takes it: this visit comes from an idea. */
const returningKey = "sparks:demo-returning";

/** The row's link, mapped to the workspace story by `conceptStoryLinks`. */
const demoConceptHref = "#demo-concept";

function loadDemoConcept(): DemoConcept | undefined {
	try {
		const saved = sessionStorage.getItem(key);
		return saved ? (JSON.parse(saved) as DemoConcept) : undefined;
	} catch {
		return undefined;
	}
}

function saveDemoConcept(concept: DemoConcept) {
	try {
		sessionStorage.setItem(key, JSON.stringify(concept));
	} catch {
		// No storage: the concept just doesn't show in the list.
	}
}

/** "Reset prototype": the concept she started is gone. */
function clearDemoConcept() {
	try {
		sessionStorage.removeItem(key);
	} catch {
		// No storage: there's no concept to clear.
	}
}

/** "All ideas": the start page about to open keeps the concept she started. */
function returnToIdeas() {
	try {
		sessionStorage.setItem(returningKey, "yes");
	} catch {
		// No storage: there's no concept to keep.
	}
}

/** For the start page as it opens, once: the concept she started, if she comes from an idea; otherwise the demo starts over. */
function openDemoConcept(): DemoConcept | undefined {
	try {
		if (!sessionStorage.getItem(returningKey)) sessionStorage.removeItem(key);
		sessionStorage.removeItem(returningKey);
	} catch {
		// No storage: there's no concept.
	}
	return loadDemoConcept();
}

export { clearDemoConcept, demoConceptHref, loadDemoConcept, openDemoConcept, returnToIdeas, saveDemoConcept, type DemoConcept };
