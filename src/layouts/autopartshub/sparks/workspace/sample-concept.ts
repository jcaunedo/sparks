import type { SparksMessage } from "./workspace";

/** The concept in the workspace stories once Dana has answered: Sparks names it from her problem. */
export const sampleConceptName = "Wrong-part returns";

/* Dana's first message, her answer to Sparks's introduction: the problem as she sees it, and the idea she walked in with.
 * Also the message box's "Initial prompt" (the "+" menu), so the demo can start without typing it. */
export const sampleInitialPrompt =
	"Too many people buying online get parts that don't fit their car and send them back. I would like to implement in search results, a way to flag parts that get returned a lot, so people double-check before they buy.";

export const sampleMessages: SparksMessage[] = [{ id: "m1", from: "user", text: sampleInitialPrompt }];
