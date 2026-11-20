import type { Meta, StoryObj } from "@storybook/react-vite";

import { AutoPartsHubLogo } from "./autoparts-hub-logo";

const meta = {
	title: "Brand/AutoPartsHubLogo",
	component: AutoPartsHubLogo,
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
} satisfies Meta<typeof AutoPartsHubLogo>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Figma "Logo": the full wordmark. */
export const Wordmark: Story = {
	args: { variant: "wordmark" },
};

/** Figma "Symbol": the AH. mark, for tight spaces such as a collapsed sidebar or a favicon-size slot. */
export const SymbolMark: Story = {
	name: "Symbol",
	args: { variant: "symbol" },
};

/** Resize by height; the width follows the artwork's proportions. */
export const Sizes: Story = {
	render: (args) => (
		<div className='flex flex-col items-start gap-6'>
			<AutoPartsHubLogo {...args} className='h-4' />
			<AutoPartsHubLogo {...args} className='h-6' />
			<AutoPartsHubLogo {...args} />
			<AutoPartsHubLogo {...args} className='h-16' />
		</div>
	),
};

export const AllVariants: Story = {
	render: () => (
		<div className='flex flex-col items-start gap-6 rounded-lg bg-white p-8'>
			<AutoPartsHubLogo variant='wordmark' />
			<AutoPartsHubLogo variant='symbol' />
		</div>
	),
};
