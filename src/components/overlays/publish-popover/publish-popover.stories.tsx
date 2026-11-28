import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "@/components/buttons/button";

import { PublishPopover } from "./publish-popover";

const next = (several: boolean) =>
	`Reviewers will receive an email invitation to explore your ${several ? "ideas" : "idea"}, try the prototype, and share feedback. You can continue working independently and publish updates when you're ready.`;

const meta = {
	title: "Overlays/Publish Popover",
	component: PublishPopover,
	parameters: { layout: "centered" },
	tags: ["autodocs"],
	args: {
		title: "Publish your idea",
		description: "Share your Wrong-part returns idea and interactive prototypes with your selected reviewers.",
		// Where it'll be (sparks.ds 129:2258).
		link: "https://autopartshub.example/sparks/wrong-part-returns",
		itemsLabel: "Idea solution paths you're sharing",
		// One idea and its paths, each at the version that goes out.
		items: [
			{
				name: "Wrong-part returns",
				paths: [
					{ name: "Fit check before you buy", version: 3 },
					{ name: "Fit check at checkout", version: 1 },
				],
			},
		],
		next: next(false),
		// "Add a note" and "View invite email" (the email's content is the caller's).
		note: { fieldLabel: "Note to reviewers", value: "", onChange: () => {} },
		preview: { title: "Invite email", children: <p className='text-sm'>The invitation email, as reviewers get it.</p> },
		publishLabel: "Publish & invite",
		defaultOpen: true,
		children: <Button variant='neutral'>Publish</Button>,
	},
	decorators: [
		(Story) => (
			<div className='flex h-[640px] w-[600px] justify-end'>
				<Story />
			</div>
		),
	],
} satisfies Meta<typeof PublishPopover>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Figma "With team members": who it goes to, and "Manage reviewers". */
export const WithReviewers: Story = {
	args: {
		audience: {
			title: "Your idea will be shared with 3 team members.",
			detail: "Departments: Leadership, UX team, and Sales team",
			action: { label: "Manage reviewers", onClick: () => {} },
		},
	},
};

/** Figma "No team members": no one to send it to yet, so the publish button can't be selected. */
export const NoReviewers: Story = {
	args: {
		description: "Share your Wrong-part returns idea and interactive prototype with your selected reviewers.",
		items: [{ name: "Wrong-part returns", paths: [{ name: "Fit check before you buy", version: 2 }] }],
		next: next(false),
		audience: { title: "No reviewers added yet", tone: "warning", action: { label: "Add reviewers to publish and share your idea.", onClick: () => {} } },
		blocked: true,
	},
};

/**
 * Figma "Published" (138:2887): once it's out, from the header's "Published" (a Flat button): when, where, what was
 * shared and who it went to, with no buttons at the bottom.
 */
export const Published: Story = {
	args: {
		variant: "published",
		title: "Your idea is published",
		publishedAt: "Fri, Nov 27, 2026, 4:43 PM",
		description: undefined,
		itemsLabel: "Idea solution paths shared",
		next: undefined,
		note: undefined,
		preview: undefined,
		audience: {
			title: "Your idea was shared with 3 team members.",
			detail: "Departments: Leadership, UX team, and Sales team",
			action: { label: "Manage reviewers", onClick: () => {} },
		},
		children: <Button variant='flat'>Published</Button>,
	},
};

/** The three Figma variants, side by side. */
export const AllVariants: Story = {
	decorators: [
		() => (
			<div className='flex gap-[560px]'>
				<div className='h-[560px]'>
					<PublishPopover {...meta.args} {...WithReviewers.args} />
				</div>
				<div className='h-[560px]'>
					<PublishPopover {...meta.args} {...NoReviewers.args} />
				</div>
				<div className='h-[560px]'>
					<PublishPopover {...meta.args} {...Published.args} />
				</div>
			</div>
		),
	],
};
