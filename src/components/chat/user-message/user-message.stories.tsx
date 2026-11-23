import type { Meta, StoryObj } from "@storybook/react-vite";

import { UserMessage } from "./user-message";

const meta = {
	title: "Chat/UserMessage",
	component: UserMessage,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	decorators: [
		(Story) => (
			<div className='flex w-[640px] max-w-full flex-col items-end'>
				<Story />
			</div>
		),
	],
	args: {
		children: "User message goes here.",
	},
} satisfies Meta<typeof UserMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Figma "user-message": one short line. */
export const Default: Story = {};

/** A long message wraps, up to 80% of the conversation's width. */
export const LongText: Story = {
	args: {
		children:
			"Too many customers buy parts that don't fit their car. They bring them back to the store, call to ask which one is right, and some just go to a competitor.",
	},
};

/** Line breaks the user typed with Shift+Enter are kept. */
export const LineBreaks: Story = {
	args: {
		children: "Two things I've noticed:\n- Returns marked \"doesn't fit\" keep going up.\n- Most of them are for older vehicles.",
	},
};

export const AllVariants: Story = {
	render: () => (
		<div className='flex w-full flex-col items-end gap-3'>
			<UserMessage>User message goes here.</UserMessage>
			<UserMessage>
				Too many customers buy parts that don't fit their car. They bring them back to the store, call to ask
				which one is right, and some just go to a competitor.
			</UserMessage>
			<UserMessage>{"Two things I've noticed:\n- Returns marked \"doesn't fit\" keep going up.\n- Most of them are for older vehicles."}</UserMessage>
		</div>
	),
};
