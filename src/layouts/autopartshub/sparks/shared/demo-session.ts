import type { SparksConceptSummary } from "../start-page/start-page";
import type { SparksWorkspaceProps } from "../workspace/workspace";

/*
 * Prototype only (stories, never a screen): the concept Dana started from "New idea" in this tab, so it shows in "Your
 * ideas" and opens where she left it (prds/sparks.md, "The start page"). Kept in sessionStorage: closing the tab
 * starts the demo over. One concept: starting another from "New idea" replaces it.
 */

type DemoConcept = {
	/** Its row in "Your ideas". */
	summary: SparksConceptSummary;
	/** What reopening it gives the workspace: its name, step and conversation. */
	workspace: Pick<SparksWorkspaceProps, "conceptName" | "currentStep" | "reachedStep" | "messages">;
};

const key = "sparks:demo-concept";

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

export { demoConceptHref, loadDemoConcept, saveDemoConcept, type DemoConcept };
