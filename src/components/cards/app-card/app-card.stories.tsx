import type { Meta, StoryObj } from "@storybook/react-vite";

import { AutoPartsHubLogo } from "@/components/brand/autoparts-hub-logo";
import { Logo } from "@/components/brand/logo";

import { AppCard } from "./app-card";

const meta = {
	title: "Cards/AppCard",
	component: AppCard,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	decorators: [
		(Story) => (
			<div className='w-[390px]'>
				<Story />
			</div>
		),
	],
	args: {
		logo: <Logo tone='on-light' />,
		description: "Build and run your apps in one place.",
	},
} satisfies Meta<typeof AppCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Figma "app-card": a static card, no hover. */
export const Default: Story = {};

/** As a link (`asChild`), Figma "Hover": lifts, the border darkens, the shadow grows and the description turns foreground. Shows the focus ring on keyboard focus. */
export const AsLink: Story = {
	args: {
		asChild: true,
		children: <a href='#app' aria-label='Open Sparks' />,
	},
};

/** Any logo fits the slot. */
export const AutoPartsHub: Story = {
	args: {
		asChild: true,
		logo: <AutoPartsHubLogo />,
		description: "Find and order parts for every vehicle.",
		children: <a href='#autopartshub' aria-label='Open AutoPartsHUB' />,
	},
};

export const AllVariants: Story = {
	decorators: [
		(Story) => (
			<div className='w-[800px]'>
				<Story />
			</div>
		),
	],
	render: () => (
		<div className='grid grid-cols-2 gap-6'>
			<AppCard logo={<Logo tone='on-light' />} description='Build and run your apps in one place.' />
			<AppCard
				asChild
				logo={<AutoPartsHubLogo />}
				description='Find and order parts for every vehicle.'
			>
				<a href='#autopartshub' aria-label='Open AutoPartsHUB' />
			</AppCard>
		</div>
	),
};
