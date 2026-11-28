import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import { ReplyOptions } from "./reply-options";

const meta = {
	title: "Chat/ReplyOptions",
	component: ReplyOptions,
	parameters: {
		layout: "padded",
	},
	tags: ["autodocs"],
	decorators: [
		(Story) => (
			<div className='w-[416px]'>
				<Story />
			</div>
		),
	],
	args: {
		"aria-label": "What should Sparks do?",
		options: [
			{
				label: "Make this change",
				steps: [
					'Add two buttons under "We\'re not sure this fits": "See the fit list" and "Ask a store".',
					"Keep the message as it is: it's honest, it only needs a way out.",
					'Leave "Add to cart" available, for customers who already know.',
				],
				detail: "Both already exist at AutoParts Co., so nothing new has to be built behind them.",
			},
			{ label: 'Also offer "Tell me when you know"', detail: '"Tell me when you know" is there too (pretend: nothing is sent)' },
			{ label: "Also name the vehicle first", detail: 'The fit message names the vehicle first ("2015 Ford F-150: fits")' },
			{ label: "Fix all", detail: "Everything above" },
		],
		onSelect: fn(),
	},
} satisfies Meta<typeof ReplyOptions>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A fix (its plan as `steps`) and what can go on top of it, "Fix all" last. */
export const Default: Story = {};

/** Labels alone, with no detail under them. */
export const LabelsOnly: Story = {
	args: {
		options: [{ label: "Make this change" }, { label: "Also make it bigger" }, { label: "Fix all" }],
	},
};

export const AllVariants: Story = {
	render: (args) => (
		<div className='flex flex-col gap-6'>
			<ReplyOptions {...args} />
			<ReplyOptions {...args} options={[{ label: "Make this change" }, { label: "Also make it bigger" }, { label: "Fix all" }]} />
		</div>
	),
};
