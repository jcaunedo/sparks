/**
 * Sparks's four steps, in order (prds/sparks.md → "Steps"). Product content, not sample data. `upcoming`: what a step
 * not reached yet says when Dana selects it (what it is, and what to expect there).
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
		label: "Validate",
		upcoming: {
			title: "See what holds up",
			description:
				"After Prototype, Sparks works your prototype through realistic scenarios for customers and store staff, and checks it against AutoParts Co.'s data, engineering and design system. You see what works, what to fix, and how it does against your target.",
		},
	},
	{
		id: "review",
		label: "Review",
		upcoming: {
			title: "Bring in the teams who decide",
			description:
				"Last, the teams who need to weigh in, like UX, Engineering and Stores, review your idea and give their view. You send your recommendation, and the decision owner decides whether it moves forward.",
		},
	},
] as const;

type SparksStep = (typeof sparksSteps)[number]["id"];

export { sparksSteps, type SparksStep };
