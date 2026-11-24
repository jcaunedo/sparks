import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { ActivityFeed } from "./activity-feed";

const steps = [
	"Reading your plan",
	"Picking parts from AutoParts Co.'s design system",
	"Making up sample vehicles and parts",
	"Building the vehicle picker",
	"Building a part that fits",
	"Building the cart",
	"Checking it on phone and desktop",
];

const meta = {
	title: "Chat/ActivityFeed",
	component: ActivityFeed,
	tags: ["autodocs"],
	args: { status: "Assembling your prototype…", steps: steps.slice(0, 4) },
	decorators: [
		(Story) => (
			<div className='w-[416px]'>
				<Story />
			</div>
		),
	],
} satisfies Meta<typeof ActivityFeed>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Working: the status and the latest steps, the last one in progress. */
export const Working: Story = {};

/** Finished: one line, which opens to show every step. */
export const Done: Story = { args: { steps, done: true, doneLabel: "Built in 18s" } };

/** Ended before finishing. */
export const Stopped: Story = { args: { steps: steps.slice(0, 5), done: true, stopped: true, doneLabel: "Stopped before finishing: 4 of 7 steps done." } };

/** Live: a step every second, then folded. */
export const Live: Story = {
	render: function Render() {
		const [count, setCount] = React.useState(1);
		const [startedAt] = React.useState(() => Date.now());
		React.useEffect(() => {
			if (count > steps.length) return;
			const timer = window.setTimeout(() => setCount((c) => c + 1), 1000);
			return () => window.clearTimeout(timer);
		}, [count]);
		return (
			<ActivityFeed
				status='Assembling your prototype…'
				steps={steps.slice(0, count)}
				startedAt={startedAt}
				done={count > steps.length}
				doneLabel='Built in 7s'
			/>
		);
	},
};

/** Every state together. */
export const AllVariants: Story = {
	render: () => (
		<div className='flex flex-col gap-8'>
			<ActivityFeed status='Assembling your prototype…' steps={steps.slice(0, 4)} />
			<ActivityFeed status='' steps={steps} done doneLabel='Built in 18s' />
			<ActivityFeed status='' steps={steps.slice(0, 5)} done stopped doneLabel='Stopped before finishing: 4 of 7 steps done.' />
		</div>
	),
};
