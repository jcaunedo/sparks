import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { TeamAssessment, type TeamAssessmentPerson } from "./team-assessment";

/** 8 people asked, 3 in: 2 support, 1 doesn't, 5 pending. */
const people: TeamAssessmentPerson[] = [
	{
		id: "priya",
		name: "Priya Shah",
		team: "UX team",
		subtitle: "UX lead · UX team",
		outcome: "support",
		status: "Advance with changes",
		detail: "Move the fit message above the price: customers in a hurry miss it.",
	},
	{ id: "lucas", name: "Lucas Ferreira", team: "Catalog team", outcome: "against", status: "Don't advance yet" },
	{ id: "marcus", name: "Marcus Lee", team: "Engineering", outcome: "support", status: "Advance" },
	{ id: "ana", name: "Ana Silva", team: "Catalog team", outcome: "pending", status: "Commented" },
	{ id: "maya", name: "Maya Patel", team: "UX team", outcome: "pending", status: "Commented" },
	{ id: "nina", name: "Nina Kowalski", team: "Engineering", outcome: "pending", status: "Opened it" },
	{ id: "daniel", name: "Daniel Kim", team: "UX team", outcome: "pending", status: "Opened it" },
	{ id: "ethan", name: "Ethan Brooks", team: "Engineering", outcome: "pending", status: "Invited" },
];

const meta = {
	title: "Data display/TeamAssessment",
	component: TeamAssessment,
	tags: ["autodocs"],
	args: {
		summary: "Early feedback favors moving forward.",
		invited: 8,
		support: 2,
		against: 1,
		action: { label: "View full report", onClick: () => {} },
		onRemind: () => {},
		people,
	},
	decorators: [
		(Story) => (
			// sparks.ds draws it 796px wide, on a panel's subtle background.
			<div className='w-[796px] max-w-full bg-background-subtle p-4'>
				<Story />
			</div>
		),
	],
} satisfies Meta<typeof TeamAssessment>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * sparks.ds "Team assessment" (135:2671): 3 of 8 in, 2 support, 1 doesn't, 5 pending. Each legend item (or its segment)
 * lists who's in it, by team, with their status.
 */
export const Default: Story = {};

/** Without `people`: the legend is just a legend. */
export const WithoutPeople: Story = { args: { people: undefined } };

/** Published, nothing in yet: the whole bar is pending. */
export const Awaiting: Story = { args: { summary: "Waiting for the team to assess your idea.", support: 0, against: 0 } };

/** In progress, the two sides even. */
export const InProgressMixed: Story = { args: { summary: "The team has mixed perspectives on the proposed solution.", support: 2, against: 2 } };

/** In progress, more against than for. */
export const InProgressNegative: Story = { args: { summary: "Early feedback raises concerns about moving forward.", support: 1, against: 2 } };

/** Everyone has answered: no reminder. */
export const CompletedPositive: Story = { args: { summary: "The team recommends moving forward.", support: 6, against: 2 } };

export const CompletedMixed: Story = { args: { summary: "The team has mixed recommendations on moving forward.", support: 4, against: 4 } };

export const CompletedNegative: Story = { args: { summary: "The team does not recommend moving forward.", support: 2, against: 6 } };

/** After "Send a reminder": it says so instead. */
export const Reminded: Story = { args: { reminded: "Reminder sent on Nov 27, 2026, 2:46 PM" } };

/** `inset`, inside a white panel (Review status, sparks.ds 135:2393), with no action. */
export const Inset: Story = {
	args: { variant: "inset", action: undefined },
	decorators: [
		(Story) => (
			<div className='bg-background p-4'>
				<Story />
			</div>
		),
	],
};

/** Assessments arriving one at a time: the segments move to their new shares. */
export const Updating: Story = {
	render: (args) => {
		const answers = ["support", "support", "against", "support", "support", "against", "support", "support"] as const;
		const [received, setReceived] = React.useState(0);
		React.useEffect(() => {
			const timer = window.setInterval(() => setReceived((n) => (n >= answers.length ? 0 : n + 1)), 1500);
			return () => window.clearInterval(timer);
		}, []);
		const support = answers.slice(0, received).filter((a) => a === "support").length;
		return <TeamAssessment {...args} people={undefined} support={support} against={received - support} summary={`${received} in so far.`} />;
	},
};

/** Every state together: awaiting, in progress, completed. */
export const AllVariants: Story = {
	render: (args) => (
		<div className='flex flex-col gap-4'>
			<TeamAssessment {...args} people={undefined} summary='Waiting for the team to assess your idea.' support={0} against={0} />
			<TeamAssessment {...args} />
			<TeamAssessment {...args} people={undefined} summary='The team recommends moving forward.' support={6} against={2} />
			<TeamAssessment {...args} variant='inset' action={undefined} />
		</div>
	),
};
