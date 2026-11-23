import type { Meta, StoryObj } from "@storybook/react-vite";

import { Logo } from "./logo";

const meta = {
	title: "Brand/Logo",
	component: Logo,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		tone: {
			control: "inline-radio",
			options: ["auto", "on-light", "on-dark"],
		},
	},
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

/** `tone="auto"`: blue sparkle in light mode, white sparkle under `.dark`. */
export const Default: Story = {
	args: { tone: "auto" },
};

/** Inside a `.dark` container, the auto tone switches the sparkle to white. */
export const AutoInDarkMode: Story = {
	args: { tone: "auto" },
	decorators: [
		(Story) => (
			<div className='dark rounded-lg bg-background p-8'>
				<Story />
			</div>
		),
	],
};

/** Figma "Variant2": blue sparkle, forced for light backgrounds. */
export const OnLight: Story = {
	args: { tone: "on-light" },
	decorators: [
		(Story) => (
			<div className='rounded-lg bg-white p-8'>
				<Story />
			</div>
		),
	],
};

/** Figma "Default": white sparkle, forced for dark backgrounds such as a photo or a colored hero. */
export const OnDark: Story = {
	args: { tone: "on-dark" },
	decorators: [
		(Story) => (
			<div className='rounded-lg bg-[#282828] p-8'>
				<Story />
			</div>
		),
	],
};

/** Resize by height; the width follows the artwork's proportions. */
export const Sizes: Story = {
	render: (args) => (
		<div className='flex flex-col items-start gap-6'>
			<Logo {...args} className='h-4' />
			<Logo {...args} className='h-6' />
			<Logo {...args} />
			<Logo {...args} className='h-16' />
		</div>
	),
};

/** Figma "Symbol": the "S" and its sparkle, e.g. as a small brand mark. The concept's header now uses the wordmark (26px). */
export const Symbol: Story = {
	args: { variant: "symbol" },
};

export const AllVariants: Story = {
	render: () => (
		<div className='grid grid-cols-2 gap-4'>
			<div className='rounded-lg bg-background p-8'>
				<Logo variant='symbol' />
			</div>
			<div className='dark rounded-lg bg-background p-8'>
				<Logo variant='symbol' />
			</div>
			<div className='rounded-lg bg-background p-8'>
				<Logo tone='auto' />
			</div>
			<div className='dark rounded-lg bg-background p-8'>
				<Logo tone='auto' />
			</div>
			<div className='rounded-lg bg-white p-8'>
				<Logo tone='on-light' />
			</div>
			<div className='rounded-lg bg-[#282828] p-8'>
				<Logo tone='on-dark' />
			</div>
		</div>
	),
};
