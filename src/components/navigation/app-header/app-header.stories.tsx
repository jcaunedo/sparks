import type { Meta, StoryObj } from "@storybook/react-vite";

import { AutoPartsHubLogo } from "@/components/brand/autoparts-hub-logo";
import { Logo } from "@/components/brand/logo";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/components/data-display/avatar";
import samplePhotoW1 from "@/components/data-display/avatar/sample-photos/w1.png";

import { AppHeader } from "./app-header";

const meta = {
	title: "Navigation/AppHeader",
	component: AppHeader,
	parameters: {
		layout: "fullscreen",
	},
	tags: ["autodocs"],
	args: {
		logo: <AutoPartsHubLogo />,
	},
} satisfies Meta<typeof AppHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Figma "header-autopartshub": the AutoPartsHUB logo and the user's avatar (`lg`, 40px). */
export const AutoPartsHub: Story = {
	args: {
		logo: <AutoPartsHubLogo />,
		children: (
			<Avatar size='lg'>
				<AvatarImage src={samplePhotoW1} alt='Ana Brown' />
				<AvatarFallback>AB</AvatarFallback>
			</Avatar>
		),
	},
};

/** Figma "Property 1=Sparks": the Sparks logo at 32px tall, and the user's avatar. */
export const Sparks: Story = {
	args: {
		logo: <Logo className='h-8' />,
		children: (
			<Avatar size='lg'>
				<AvatarImage src={samplePhotoW1} alt='Ana Brown' />
				<AvatarFallback>AB</AvatarFallback>
			</Avatar>
		),
	},
};

/** No photo: the avatar shows the user's initials. */
export const WithInitials: Story = {
	args: {
		logo: <AutoPartsHubLogo />,
		children: (
			<Avatar size='lg'>
				<AvatarFallback>AB</AvatarFallback>
			</Avatar>
		),
	},
};

/** The symbol logo, for narrow screens. */
export const Compact: Story = {
	args: {
		logo: <AutoPartsHubLogo variant='symbol' />,
		children: (
			<Avatar size='lg'>
				<AvatarImage src={samplePhotoW1} alt='Ana Brown' />
				<AvatarFallback>AB</AvatarFallback>
			</Avatar>
		),
	},
};

export const AllVariants: Story = {
	render: () => (
		<div className='flex flex-col divide-y divide-border'>
			<AppHeader logo={<AutoPartsHubLogo />}>
				<Avatar size='lg'>
					<AvatarImage src={samplePhotoW1} alt='Ana Brown' />
					<AvatarFallback>AB</AvatarFallback>
				</Avatar>
			</AppHeader>
			<AppHeader logo={<AutoPartsHubLogo variant='symbol' />}>
				<Avatar size='lg'>
					<AvatarFallback>AB</AvatarFallback>
				</Avatar>
			</AppHeader>
			<AppHeader logo={<Logo className='h-8' />}>
				<Avatar size='lg'>
					<AvatarFallback>MB</AvatarFallback>
				</Avatar>
			</AppHeader>
		</div>
	),
};
