import type { Meta, StoryObj } from "@storybook/react-vite";

import { FlowLogo } from "./flow-logo";

const meta = {
	title: "Brand/FlowLogo",
	component: FlowLogo,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof FlowLogo>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Figma "flow-logo". Fixed artwork colors. */
export const Default: Story = {};

/** Resize by height; the width follows the artwork's proportions. */
export const Sizes: Story = {
	render: (args) => (
		<div className='flex flex-col items-start gap-6'>
			<FlowLogo {...args} className='h-4' />
			<FlowLogo {...args} className='h-6' />
			<FlowLogo {...args} />
			<FlowLogo {...args} className='h-16' />
		</div>
	),
};

/** On the light and dark themes. */
export const AllVariants: Story = {
	render: () => (
		<div className='grid grid-cols-2 gap-4'>
			<div className='rounded-lg bg-background p-8'>
				<FlowLogo />
			</div>
			<div className='dark rounded-lg bg-background p-8'>
				<FlowLogo />
			</div>
		</div>
	),
};
