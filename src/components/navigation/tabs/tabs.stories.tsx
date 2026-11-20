import type { Meta, StoryObj } from "@storybook/react-vite";
import { CircleUser, Settings, Users } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";

const meta = {
	title: "Navigation/Tabs",
	component: TabsList,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		variant: { control: "inline-radio", options: ["default", "line"] },
		size: { control: "inline-radio", options: ["default", "lg"] },
		baseline: { control: "boolean" },
	},
	args: {
		variant: "default",
		size: "default",
		baseline: false,
	},
	render: (args) => (
		<Tabs defaultValue='overview'>
			<TabsList {...args}>
				<TabsTrigger value='overview'>Overview</TabsTrigger>
				<TabsTrigger value='activity'>Activity</TabsTrigger>
				<TabsTrigger value='settings'>Settings</TabsTrigger>
			</TabsList>
		</Tabs>
	),
} satisfies Meta<typeof TabsList>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Figma "Variant=Default": tabs on a muted track; the active tab is a white pill. */
export const Default: Story = {};

/** Figma "Variant=Line": the active tab is underlined. */
export const Line: Story = {
	args: { variant: "line" },
};

/** Figma "State=Default (line)": a 1px line under every tab. */
export const LineWithBaseline: Story = {
	args: { variant: "line", baseline: true },
};

/** Figma "lg - 40". */
export const Large: Story = {
	args: { size: "lg" },
};

/** Figma's optional 16px icon, before the label. */
export const WithIcons: Story = {
	render: (args) => (
		<Tabs defaultValue='profile'>
			<TabsList {...args}>
				<TabsTrigger value='profile'>
					<CircleUser aria-hidden='true' />
					Profile
				</TabsTrigger>
				<TabsTrigger value='team'>
					<Users aria-hidden='true' />
					Team
				</TabsTrigger>
				<TabsTrigger value='settings'>
					<Settings aria-hidden='true' />
					Settings
				</TabsTrigger>
			</TabsList>
		</Tabs>
	),
};

/** With panels: each tab shows its own content. A disabled tab can't be selected. */
export const WithContent: Story = {
	render: (args) => (
		<Tabs defaultValue='overview' className='w-96'>
			<TabsList {...args}>
				<TabsTrigger value='overview'>Overview</TabsTrigger>
				<TabsTrigger value='activity'>Activity</TabsTrigger>
				<TabsTrigger value='billing' disabled>
					Billing
				</TabsTrigger>
			</TabsList>
			<TabsContent value='overview' className='text-sm text-foreground'>
				A summary of the workspace.
			</TabsContent>
			<TabsContent value='activity' className='text-sm text-foreground'>
				Recent changes by your team.
			</TabsContent>
			<TabsContent value='billing' className='text-sm text-foreground'>
				Plan and invoices.
			</TabsContent>
		</Tabs>
	),
};

export const AllVariants: Story = {
	render: () => (
		<div className='flex flex-col items-start gap-6'>
			{(["default", "line"] as const).map((variant) =>
				(["default", "lg"] as const).map((size) => (
					<Tabs key={`${variant}-${size}`} defaultValue='tab-1'>
						<TabsList variant={variant} size={size}>
							<TabsTrigger value='tab-1'>Tab</TabsTrigger>
							<TabsTrigger value='tab-2'>Tab</TabsTrigger>
							<TabsTrigger value='tab-3'>Tab</TabsTrigger>
						</TabsList>
					</Tabs>
				)),
			)}
			{(["default", "lg"] as const).map((size) => (
				<Tabs key={`baseline-${size}`} defaultValue='tab-1'>
					<TabsList variant='line' size={size} baseline>
						<TabsTrigger value='tab-1'>Tab</TabsTrigger>
						<TabsTrigger value='tab-2'>Tab</TabsTrigger>
						<TabsTrigger value='tab-3'>Tab</TabsTrigger>
					</TabsList>
				</Tabs>
			))}
		</div>
	),
};
