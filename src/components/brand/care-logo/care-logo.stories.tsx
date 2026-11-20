import type { Meta, StoryObj } from "@storybook/react-vite";

import { CareLogo } from "./care-logo";

const meta = {
	title: "Brand/CareLogo",
	component: CareLogo,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof CareLogo>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Figma "care-logo". Fixed artwork colors. */
export const Default: Story = {};

/** Resize by height; the width follows the artwork's proportions. */
export const Sizes: Story = {
	render: (args) => (
		<div className='flex flex-col items-start gap-6'>
			<CareLogo {...args} className='h-4' />
			<CareLogo {...args} className='h-6' />
			<CareLogo {...args} />
			<CareLogo {...args} className='h-16' />
		</div>
	),
};

/** On the light and dark themes. */
export const AllVariants: Story = {
	render: () => (
		<div className='grid grid-cols-2 gap-4'>
			<div className='rounded-lg bg-background p-8'>
				<CareLogo />
			</div>
			<div className='dark rounded-lg bg-background p-8'>
				<CareLogo />
			</div>
		</div>
	),
};
