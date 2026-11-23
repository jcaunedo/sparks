import type { Meta, StoryObj } from "@storybook/react-vite";
import { Check } from "lucide-react";

import { Badge } from "./badge";

const meta = {
	title: "Data display/Badge",
	component: Badge,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	args: {
		children: "Badge",
	},
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Figma "Style=Solid, Size=md (default), Tone=Brand". */
export const Default: Story = {};

/** Flat, the status badges' style: Sparks's concept list uses `sm`. */
export const Flat: Story = {
	args: { variant: "flat", tone: "blue", size: "sm", children: "Plan" },
};

/** Figma "Size=xxs": 20px tall, 12px regular text, for the tightest spots (a label inside a dense row or card). */
export const ExtraExtraSmall: Story = {
	args: { variant: "flat", tone: "blue", size: "xxs", children: "Plan" },
};

export const Outline: Story = {
	args: { variant: "outline" },
};

export const Ghost: Story = {
	args: { variant: "ghost" },
};

/** As a link (`asChild`): underlines on hover. */
export const Link: Story = {
	render: (args) => (
		<Badge {...args} variant='link' asChild>
			<a href='#badge'>Badge</a>
		</Badge>
	),
};

/** An svg child is the badge's icon: 12px at `xs` and `sm`, 16px at `default` and `lg`. */
export const WithIcon: Story = {
	args: {
		variant: "flat",
		tone: "green",
		children: (
			<>
				<Check aria-hidden />
				Advanced
			</>
		),
	},
};

const flatTones = ["neutral", "blue", "green", "sky", "purple", "red", "yellow", "amber"] as const;
const solidTones = ["brand", "neutral", "destructive"] as const;
const sizes = ["xxs", "xs", "sm", "default", "lg"] as const;

/** Every style, tone and size Figma draws. */
export const AllVariants: Story = {
	render: () => (
		<div className='flex flex-col gap-4'>
			{sizes.map((size) => (
				<div key={size} className='flex flex-wrap items-center gap-2'>
					{solidTones.map((tone) => (
						<Badge key={`solid-${tone}`} variant='solid' tone={tone} size={size}>
							Solid {tone}
						</Badge>
					))}
					{flatTones.map((tone) => (
						<Badge key={`flat-${tone}`} variant='flat' tone={tone} size={size}>
							{tone}
						</Badge>
					))}
					<Badge variant='outline' size={size}>
						Outline
					</Badge>
					<Badge variant='ghost' size={size}>
						Ghost
					</Badge>
					<Badge variant='link' size={size}>
						Link
					</Badge>
				</div>
			))}
		</div>
	),
};
