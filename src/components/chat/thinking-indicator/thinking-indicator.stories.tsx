import type { Meta, StoryObj } from "@storybook/react-vite";

import { ThinkingIndicator } from "./thinking-indicator";

const meta = {
	title: "Chat/ThinkingIndicator",
	component: ThinkingIndicator,
	parameters: {
		layout: "padded",
	},
	tags: ["autodocs"],
	args: {
		steps: [
			"Popping the hood on support cases…",
			"Running the numbers on sales and returns…",
			"Going through the service history of past experiments…",
		],
	},
} satisfies Meta<typeof ThinkingIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Three lines, each for `thinkingStep`; the last one stays. The dot takes the next logo color each time it lands. */
export const Default: Story = {};

/** One line: it stays while the dot hops and the gradient moves. */
export const OneLine: Story = {
	args: { steps: ["Reading the gauges: what we know so far…"] },
};

export const AllVariants: Story = {
	render: (args) => (
		<div className='flex flex-col gap-6'>
			<ThinkingIndicator {...args} />
			<ThinkingIndicator steps={["Assembling the parts of your blueprint…", "Running a final inspection…"]} />
			<ThinkingIndicator steps={["Reading the gauges: what we know so far…"]} />
		</div>
	),
};
