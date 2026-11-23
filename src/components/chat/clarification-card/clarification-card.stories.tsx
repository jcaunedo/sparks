import type { Meta, StoryObj } from "@storybook/react-vite";

import { Badge } from "@/components/data-display/badge";

import { ClarificationCard } from "./clarification-card";

const meta = {
	title: "Chat/ClarificationCard",
	component: ClarificationCard,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	decorators: [
		(Story) => (
			<div className='w-[584px] max-w-full'>
				<Story />
			</div>
		),
	],
	args: {
		question: "Who does it affect?",
		answer: "Do-it-yourself customers buying online, most often for vehicles more than 10 years old.",
		source: "Suggested by Sparks · from customer intelligence",
		replies: ["Yes, that's right", "Not quite"],
		onEdit: () => {},
	},
} satisfies Meta<typeof ClarificationCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Figma "State=Default": the question, the answer with its edit button, where it came from, and the replies. */
export const Default: Story = {};

/** Figma "State=Edit": the answer in a field with Cancel and Save on the right; the source line and the replies wait until it's saved or cancelled. */
export const Edit: Story = {
	args: {
		defaultEditing: true,
	},
};

/** An answer that relies on something unproven: the "Assumption" label (xxs) between the question and the answer. */
export const WithAssumption: Story = {
	args: {
		question: "Why does it matter?",
		answer:
			"Each return costs shipping, handling and store time, and customers who return a part that doesn't fit are less likely to buy from us again.",
		badge: (
			<Badge variant='flat' tone='amber' size='xxs'>
				Assumption
			</Badge>
		),
		source: "Suggested by Sparks · from business performance",
	},
};

/** Answered: no replies and no edit button, as it stays in the conversation. */
export const Answered: Story = {
	args: {
		replies: [],
		onEdit: undefined,
	},
};

export const AllVariants: Story = {
	render: (args) => (
		<div className='flex flex-col gap-8'>
			<ClarificationCard {...args} />
			<ClarificationCard {...args} defaultEditing />
			<ClarificationCard {...args} replies={[]} onEdit={undefined} />
		</div>
	),
};
