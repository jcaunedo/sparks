import type { Meta, StoryObj } from "@storybook/react-vite";

import { AutoPartsLogo } from "./autoparts-logo";

const meta = {
	title: "Brand/AutoPartsLogo",
	component: AutoPartsLogo,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		variant: {
			control: "inline-radio",
			options: ["wordmark", "symbol"],
		},
	},
} satisfies Meta<typeof AutoPartsLogo>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Figma "AutoParts Logo": the full wordmark. */
export const Wordmark: Story = {
	args: { variant: "wordmark" },
};

/** Figma "AutoPartsHUB Symbol": the AP. mark, for tight spaces. */
export const SymbolMark: Story = {
	name: "Symbol",
	args: { variant: "symbol" },
};

/** Resize by height; the width follows the artwork's proportions. The prototypes' shop header uses `h-5`. */
export const Sizes: Story = {
	render: (args) => (
		<div className='flex flex-col items-start gap-6'>
			<AutoPartsLogo {...args} className='h-4' />
			<AutoPartsLogo {...args} className='h-5' />
			<AutoPartsLogo {...args} />
			<AutoPartsLogo {...args} className='h-16' />
		</div>
	),
};

export const AllVariants: Story = {
	render: () => (
		<div className='flex flex-col items-start gap-6 rounded-lg bg-white p-8'>
			<AutoPartsLogo variant='wordmark' />
			<AutoPartsLogo variant='symbol' />
		</div>
	),
};
