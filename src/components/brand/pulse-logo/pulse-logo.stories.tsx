import type { Meta, StoryObj } from "@storybook/react-vite";

import { PulseLogo } from "./pulse-logo";

const meta = {
	title: "Brand/PulseLogo",
	component: PulseLogo,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof PulseLogo>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Figma "pulse-logo". Follows the theme: Figma binds it to `foreground/prominent`. */
export const Default: Story = {};

/** Resize by height; the width follows the artwork's proportions. */
export const Sizes: Story = {
	render: (args) => (
		<div className='flex flex-col items-start gap-6'>
			<PulseLogo {...args} className='h-4' />
			<PulseLogo {...args} className='h-6' />
			<PulseLogo {...args} />
			<PulseLogo {...args} className='h-16' />
		</div>
	),
};

/** On the light and dark themes. */
export const AllVariants: Story = {
	render: () => (
		<div className='grid grid-cols-2 gap-4'>
			<div className='rounded-lg bg-background p-8'>
				<PulseLogo />
			</div>
			<div className='dark rounded-lg bg-background p-8'>
				<PulseLogo />
			</div>
		</div>
	),
};
