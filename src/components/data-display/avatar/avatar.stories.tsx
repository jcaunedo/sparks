import type { Meta, StoryObj } from "@storybook/react-vite";

import {
	Avatar,
	AvatarAdd,
	AvatarBadge,
	AvatarFallback,
	AvatarImage,
	type AvatarColor,
} from "./avatar";
import samplePhotoW1 from "./sample-photos/w1.png";
import samplePhotoM1 from "./sample-photos/m1.png";

const meta = {
	title: "Data Display/Avatar",
	component: Avatar,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		size: {
			control: "inline-radio",
			options: ["default", "lg"],
		},
	},
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

const colors: AvatarColor[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

/** Figma "w1": a photo. The initials show while it loads, or if it fails. */
export const Photo: Story = {
	args: { size: "default" },
	render: (args) => (
		<Avatar {...args}>
			<AvatarImage src={samplePhotoW1} alt='Ana Brown' />
			<AvatarFallback>AB</AvatarFallback>
		</Avatar>
	),
};

/** Figma "i1"–"i10": initials when there's no photo. Without `color`, the color is picked from the initials. */
export const Initials: Story = {
	args: { size: "default" },
	render: (args) => (
		<Avatar {...args}>
			<AvatarFallback>AB</AvatarFallback>
		</Avatar>
	),
};

/** Figma "Show Dot": the online dot. */
export const WithBadge: Story = {
	args: { size: "default" },
	render: (args) => (
		<Avatar {...args}>
			<AvatarImage src={samplePhotoM1} alt='Marco Bell' />
			<AvatarFallback>MB</AvatarFallback>
			<AvatarBadge>
				<span className='sr-only'>Online</span>
			</AvatarBadge>
		</Avatar>
	),
};

/** Figma "Add": a button that sits with avatars. */
export const Add: Story = {
	args: { size: "default" },
	render: (args) => <AvatarAdd size={args.size} />,
};

/** `default` is 32px (the sparks.ds avatar set); `lg` is 40px (the header avatar). */
export const Sizes: Story = {
	render: () => (
		<div className='flex items-center gap-4'>
			{(["default", "lg"] as const).map((size) => (
				<div key={size} className='flex items-center gap-2'>
					<Avatar size={size}>
						<AvatarImage src={samplePhotoW1} alt='Ana Brown' />
						<AvatarFallback>AB</AvatarFallback>
						<AvatarBadge>
							<span className='sr-only'>Online</span>
						</AvatarBadge>
					</Avatar>
					<Avatar size={size}>
						<AvatarFallback color={1}>AB</AvatarFallback>
					</Avatar>
					<AvatarAdd size={size} />
				</div>
			))}
		</div>
	),
};

export const AllVariants: Story = {
	render: () => (
		<div className='flex flex-col gap-4'>
			<div className='flex items-center gap-2'>
				<Avatar>
					<AvatarImage src={samplePhotoW1} alt='Ana Brown' />
					<AvatarFallback>AB</AvatarFallback>
				</Avatar>
				<Avatar>
					<AvatarImage src={samplePhotoM1} alt='Marco Bell' />
					<AvatarFallback>MB</AvatarFallback>
				</Avatar>
				<AvatarAdd />
			</div>
			<div className='flex items-center gap-2'>
				{colors.map((color) => (
					<Avatar key={color}>
						<AvatarFallback color={color}>AB</AvatarFallback>
					</Avatar>
				))}
			</div>
			<div className='flex items-center gap-2'>
				{colors.map((color) => (
					<Avatar key={color}>
						<AvatarFallback color={color}>AB</AvatarFallback>
						<AvatarBadge>
							<span className='sr-only'>Online</span>
						</AvatarBadge>
					</Avatar>
				))}
			</div>
		</div>
	),
};
