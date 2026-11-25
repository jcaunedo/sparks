import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "@/components/buttons/button";

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./dialog";

const meta = {
	title: "Overlays/Dialog",
	component: Dialog,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Opens from a button; Esc, the X or a click outside closes it, and focus goes back to the button. */
export const Default: Story = {
	render: (args) => (
		<Dialog {...args}>
			<DialogTrigger asChild>
				<Button variant='outline'>Open</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Title</DialogTitle>
					<DialogDescription>A short description of what this asks or shows.</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant='outline'>Cancel</Button>
					</DialogClose>
					<Button>Continue</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	),
};

/** Open on load. */
export const AllVariants: Story = {
	...Default,
	args: { defaultOpen: true },
	parameters: { docs: { disable: true } },
	tags: ["!autodocs"],
};
