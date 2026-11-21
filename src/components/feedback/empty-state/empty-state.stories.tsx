import type { Meta, StoryObj } from "@storybook/react-vite";
import { BookOpen } from "lucide-react";

import { EmptyState } from "./empty-state";

const meta = {
	title: "Feedback/EmptyState",
	component: EmptyState,
	tags: ["autodocs"],
	args: {
		title: "No connections yet",
		description: "When connections are added, they'll show up here.",
	},
	decorators: [
		(Story) => (
			// Stands in for an empty panel; the empty state centers itself in it.
			<div className='flex h-[400px] w-[800px] bg-background'>
				<Story />
			</div>
		),
	],
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

/** AutoPartsHUB home → Connections. */
export const Default: Story = {};

/** With a button. The label names the action, never "OK" or "Continue". (Example copy.) */
export const WithAction: Story = {
	args: {
		title: "Nothing in Knowledge yet",
		description: "When knowledge is added, it'll show up here.",
		buttonLabel: "Add knowledge",
		buttonProps: { onClick: () => {} },
	},
};

/** Title only, no description. */
export const TitleOnly: Story = {
	args: { description: undefined },
};

/** With an icon above the title. sparks.ds has no empty-state icon yet; this shows the slot. */
export const WithIcon: Story = {
	args: {
		icon: <BookOpen aria-hidden='true' className='size-8 text-icon-muted' />,
	},
};

export const AllVariants: Story = {
	decorators: [
		(Story) => (
			<div className='flex w-[800px] flex-col gap-10 bg-background py-10'>
				<Story />
			</div>
		),
	],
	render: (args) => (
		<>
			<EmptyState {...args} />
			<EmptyState {...args} description={undefined} />
			<EmptyState {...args} icon={<BookOpen aria-hidden='true' className='size-8 text-icon-muted' />} />
			<EmptyState {...args} buttonLabel='Add knowledge' buttonProps={{ onClick: () => {} }} />
		</>
	),
};
