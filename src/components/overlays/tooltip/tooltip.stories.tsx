import type { Meta, StoryObj } from "@storybook/react-vite";
import { Maximize2, Monitor, Smartphone } from "lucide-react";

import { Button } from "@/components/buttons/button";

import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";

const meta = {
	title: "Overlays/Tooltip",
	component: Tooltip,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

/** An icon button's name, on hover and focus. The button keeps its own `aria-label`. */
export const Default: Story = {
	render: (args) => (
		<Tooltip {...args}>
			<TooltipTrigger asChild>
				<Button variant='ghost' size='icon' aria-label='Try it full screen'>
					<Maximize2 aria-hidden />
				</Button>
			</TooltipTrigger>
			<TooltipContent>Try it full screen</TooltipContent>
		</Tooltip>
	),
};

/** Open, below its trigger, as in the prototype's toolbar. */
export const Open: Story = {
	args: { open: true },
	render: (args) => (
		<div className='flex gap-2 p-10'>
			<Tooltip {...args}>
				<TooltipTrigger asChild>
					<Button variant='ghost' size='icon' aria-label='Phone'>
						<Smartphone aria-hidden />
					</Button>
				</TooltipTrigger>
				<TooltipContent side='bottom' sideOffset={4}>
					Phone
				</TooltipContent>
			</Tooltip>
			<Button variant='ghost' size='icon' aria-label='Desktop'>
				<Monitor aria-hidden />
			</Button>
		</div>
	),
};
