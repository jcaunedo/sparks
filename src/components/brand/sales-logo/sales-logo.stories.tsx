import type { Meta, StoryObj } from "@storybook/react-vite";

import { SalesLogo } from "./sales-logo";

const meta = {
	title: "Brand/SalesLogo",
	component: SalesLogo,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof SalesLogo>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Figma "sales-logo". Fixed artwork colors. */
export const Default: Story = {};

/** Resize by height; the width follows the artwork's proportions. */
export const Sizes: Story = {
	render: (args) => (
		<div className='flex flex-col items-start gap-6'>
			<SalesLogo {...args} className='h-4' />
			<SalesLogo {...args} className='h-6' />
			<SalesLogo {...args} />
			<SalesLogo {...args} className='h-16' />
		</div>
	),
};

/** On the light and dark themes. */
export const AllVariants: Story = {
	render: () => (
		<div className='grid grid-cols-2 gap-4'>
			<div className='rounded-lg bg-background p-8'>
				<SalesLogo />
			</div>
			<div className='dark rounded-lg bg-background p-8'>
				<SalesLogo />
			</div>
		</div>
	),
};
