import type { Meta, StoryObj } from "@storybook/react-vite";

import { UserMessage } from "@/components/chat/user-message";

import { AssistantMessage } from "./assistant-message";

const formatted = `Here's how I understand it: customers buying online can't be sure a part fits their vehicle.

1. **Who:** do-it-yourself customers buying online
2. **What goes wrong:** they buy a part that doesn't fit and return it

Does that sound right?`;

const meta = {
	title: "Chat/AssistantMessage",
	component: AssistantMessage,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	decorators: [
		(Story) => (
			<div className='flex w-[640px] max-w-full flex-col'>
				<Story />
			</div>
		),
	],
	args: {
		text: "Assistant message goes here.",
	},
} satisfies Meta<typeof AssistantMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

/** One short paragraph. */
export const Default: Story = {};

/** Paragraphs, a numbered list and bold, 12px apart. */
export const Formatted: Story = {
	args: {
		text: formatted,
	},
};

/** Streams in a few words at a time, pausing after each sentence and list item, with a blinking caret. Reload to replay. */
export const Streaming: Story = {
	args: {
		text: formatted,
		stream: true,
	},
};

/** In a conversation: the assistant's message on the page, the user's bubble on the right. */
export const AllVariants: Story = {
	render: () => (
		<div className='flex w-full flex-col gap-4'>
			<AssistantMessage text='What problem do you want to solve?' />
			<div className='flex justify-end'>
				<UserMessage>Customers keep buying parts that don't fit their car, and then return them.</UserMessage>
			</div>
			<AssistantMessage text={formatted} />
		</div>
	),
};
