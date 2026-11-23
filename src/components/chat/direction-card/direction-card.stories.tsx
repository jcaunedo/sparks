import type { Meta, StoryObj } from "@storybook/react-vite";

import { Badge } from "@/components/data-display/badge";

import { DirectionCard } from "./direction-card";

const details = [
	{ label: "What's good", content: 'Answers "will this fit?" on every page, with nothing extra to do.' },
	{
		label: "How it works",
		content: (
			<ol>
				<li>You add your car to your account once.</li>
				<li>Every part says "Fits your 2015 F-150" or "Doesn't fit".</li>
				<li>If it doesn't fit, you see parts that do.</li>
			</ol>
		),
	},
	{
		label: "Expected effect",
		content:
			'Fewer "doesn\'t fit" returns: it answers the fit question before people buy. Customers who used the vehicle selector returned far fewer parts (previous experiments, 2025).',
	},
	{
		label: "Effort",
		content: (
			<>
				Medium. Saved vehicles exist, but every product page needs the fit check.
				<span className='block text-xs text-muted-foreground'>Sparks's estimate. Engineering confirms it in Review.</span>
			</>
		),
	},
	{
		label: "What we don't know yet",
		content: (
			<ul>
				<li>Whether customers will save their vehicle.</li>
				<li>How many parts have no fit data.</li>
			</ul>
		),
	},
];

const meta = {
	title: "Chat/DirectionCard",
	component: DirectionCard,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	decorators: [
		(Story) => (
			<div className='w-[664px]'>
				<Story />
			</div>
		),
	],
	args: {
		number: 1,
		title: "Fit check before you buy",
		emphasized: true,
		badges: (
			<Badge variant='flat' tone='green' size='xs'>
				Recommended
			</Badge>
		),
		description: "Customers save their vehicle once, and every product page says whether the part fits.",
		location: "On the product page",
		ratings: [
			{ label: "Effect", value: "Big" },
			{ label: "Effort", value: "Medium" },
			{ label: "Risk", value: "Medium" },
		],
		lines: [{ label: "The catch", content: "Product pages can't change until early January, so it can't launch before then." }],
		details,
		action: { label: "Generate prototype", onClick: () => {} },
	},
} satisfies Meta<typeof DirectionCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Figma "State=Collapsed": the details behind "Show more". The assistant's pick, with the darker border. */
export const Collapsed: Story = {};

/** Figma "State=Expanded": the details shown, "Show less" under them. */
export const Expanded: Story = { args: { defaultOpen: true } };

/** Not the assistant's pick: the default border, and another label ("Your idea"). */
export const NotEmphasized: Story = {
	args: {
		number: 2,
		title: "Flag often-returned parts",
		emphasized: false,
		badges: (
			<Badge variant='flat' tone='purple' size='xs'>
				Your idea
			</Badge>
		),
		description: "Search results flag parts that often come back, so people double-check before they buy.",
		location: "In search results",
		ratings: [
			{ label: "Effect", value: "Some" },
			{ label: "Effort", value: "Small" },
			{ label: "Risk", value: "Low" },
		],
	},
};

/** Without an action (e.g. the direction already picked while the plan is open). */
export const WithoutAction: Story = { args: { action: undefined } };

/** Both states and both borders together. */
export const AllVariants: Story = {
	render: (args) => (
		<div className='flex flex-col gap-4'>
			<DirectionCard {...args} />
			<DirectionCard {...args} defaultOpen />
			<DirectionCard {...args} emphasized={false} badges={undefined} number={2} />
		</div>
	),
};
