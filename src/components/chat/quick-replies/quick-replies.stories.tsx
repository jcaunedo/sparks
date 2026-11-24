import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import { QuickReplies } from "./quick-replies";

const meta = {
	title: "Chat/QuickReplies",
	component: QuickReplies,
	parameters: {
		layout: "padded",
	},
	tags: ["autodocs"],
	args: {
		replies: ["Yes, that's right", "Not quite"],
		onReply: fn(),
	},
} satisfies Meta<typeof QuickReplies>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The first reply shows ↵, and Enter picks it. */
export const Default: Story = {};

/** Three answers, the main one at the right edge. */
export const ThreeReplies: Story = {
	args: { replies: ["Yes, that's right", "Not quite", "I'm not sure"] },
};

/** Without the Enter key, when another set of replies on the screen has it. */
export const WithoutEnter: Story = {
	args: { enter: false },
};

export const AllVariants: Story = {
	render: (args) => (
		<div className='flex flex-col gap-6'>
			<QuickReplies {...args} enter={false} replies={["Build it", "Not quite"]} />
			<QuickReplies {...args} replies={["Yes, that's right", "Not quite", "I'm not sure"]} />
		</div>
	),
};
