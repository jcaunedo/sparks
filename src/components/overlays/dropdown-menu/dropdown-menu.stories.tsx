import type { Meta, StoryObj } from "@storybook/react-vite";
import { Menu } from "lucide-react";

import { Button } from "@/components/buttons/button";

import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "./dropdown-menu";

const meta = {
	title: "Overlays/DropdownMenu",
	component: DropdownMenu,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof DropdownMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A list of places to go, as the Blueprint's "Jump to a section". */
export const Default: Story = {
	render: (args) => (
		<DropdownMenu {...args}>
			<DropdownMenuTrigger asChild>
				<Button variant='ghost' size='icon' aria-label='Jump to a section' className='rounded-button-lg text-icon [&_svg]:size-[18px]'>
					<Menu aria-hidden />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				<DropdownMenuLabel>Plan</DropdownMenuLabel>
				<DropdownMenuItem>The problem</DropdownMenuItem>
				<DropdownMenuItem>What we know</DropdownMenuItem>
				<DropdownMenuItem>What success looks like</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem>Decisions</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	),
};

/** Open on load, with a checkbox item and a disabled one. */
export const AllVariants: Story = {
	args: { defaultOpen: true },
	render: (args) => (
		<DropdownMenu {...args}>
			<DropdownMenuTrigger asChild>
				<Button variant='outline'>Open</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>Label</DropdownMenuLabel>
				<DropdownMenuItem>Item</DropdownMenuItem>
				<DropdownMenuCheckboxItem checked>Checked item</DropdownMenuCheckboxItem>
				<DropdownMenuItem disabled>Disabled item</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem variant='destructive'>Destructive item</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	),
};
