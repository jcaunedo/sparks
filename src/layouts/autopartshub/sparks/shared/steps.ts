/**
 * Sparks's four steps, in order (prds/sparks.md → "Steps"). Product content, not sample data. `upcoming`: what a step
 * not reached yet says when Dana selects it (what it is, and what to expect there). `titleFor`: the title once the step can
 * start, naming the path it would work on (prds/sparks.md, "Starting a step from its explanation").
 */
const sparksSteps = [
	{ id: "plan", label: "Plan", upcoming: undefined },
	{
		id: "prototype",
		label: "Prototype",
		upcoming: {
			title: "Try your idea before anyone builds it",
			description:
				"Once Plan is done, Sparks builds a clickable prototype of the direction you choose, screen by screen, with AutoParts Co.'s design system and made-up data. You try it here, on a phone or a desktop, and ask for changes in the conversation.",
		},
	},
	{
		id: "validate",
		label: "Evaluate",
		upcoming: {
			title: "See what holds up",
			titleFor: (path: string) => `See what holds up in your\n“${path}” prototype`,
			description:
				"After Prototype, AI agents, each with the profile of a different person who'd use it, try your prototype in realistic scenarios, and Sparks checks it against AutoParts Co.'s data, engineering and design system. You see what works, what to fix, and how it does against your target.",
		},
	},
	{
		id: "review",
		label: "Review",
		upcoming: {
			title: "Bring in the teams who decide",
			titleFor: (path: string) => `Bring in the teams who decide on your\n“${path}” prototype`,
			description:
				"Last, you check what the teams will see and publish it. Those who need to weigh in, like UX, Engineering and Stores, try your idea and give their view. Then you send your recommendation, and the decision owner decides whether it moves forward.",
		},
	},
] as const;

type SparksStep = (typeof sparksSteps)[number]["id"];

export { sparksSteps, type SparksStep };
