import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import { Folder, Paperclip } from "lucide-react";

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

/** With an icon before a reply's label (`icons`). */
export const WithIcons: Story = {
	args: {
		replies: ["Nothing to add", "Attach files", "Add from library"],
		icons: { "Attach files": <Paperclip />, "Add from library": <Folder /> },
	},
};

/** One per row, for a narrow conversation (beside a preview). */
export const OnePerRow: Story = {
	args: { onePerRow: true, replies: ["Yes, evaluate it", "Fix finding 1 next", "Also name the vehicle first"] },
	decorators: [
		(Story) => (
			<div className='w-[416px]'>
				<Story />
			</div>
		),
	],
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
