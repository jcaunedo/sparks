import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "@/components/buttons/button";

import { Popover, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle, PopoverTrigger } from "./popover";

const meta = {
	title: "Overlays/Popover",
	component: Popover,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A panel from a button, closed until it's selected. */
export const Default: Story = {
	render: (args) => (
		<Popover {...args}>
			<PopoverTrigger asChild>
				<Button variant='outline'>Open</Button>
			</PopoverTrigger>
			<PopoverContent>
				<PopoverHeader>
					<PopoverTitle>Title</PopoverTitle>
					<PopoverDescription>A short description of what's in the panel.</PopoverDescription>
				</PopoverHeader>
			</PopoverContent>
		</Popover>
	),
};

/** Open on load. */
export const AllVariants: Story = {
	...Default,
	args: { defaultOpen: true },
};
