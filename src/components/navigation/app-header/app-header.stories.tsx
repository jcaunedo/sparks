import type { Meta, StoryObj } from "@storybook/react-vite";
import { Bell, X } from "lucide-react";

import { AutoPartsHubLogo } from "@/components/brand/autoparts-hub-logo";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/buttons/button";
import { StepNav, StepNavItem } from "@/components/navigation/step-nav";
import { Typography } from "@/components/typography/typography";
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

/**
 * Figma "header-autopartshub" → "AutoPartsHUB" and "Sparks": notifications (the ghost icon button with a bell, 18px), then
 * the user's avatar at 36px, 16px apart. 92px tall.
 */
function UserActions({ initials, photo = false }: { initials: string; photo?: boolean }) {
	return (
		<>
			<Button
				variant='ghost'
				size='icon'
				aria-label='Notifications'
				title='Notifications'
				className='rounded-button-lg text-icon [&_svg]:size-[18px]'
			>
				<Bell aria-hidden />
			</Button>
			<Avatar size='lg' className='size-9'>
				{photo ? <AvatarImage src={samplePhotoW1} alt='Ana Brown' /> : null}
				<AvatarFallback>{initials}</AvatarFallback>
			</Avatar>
		</>
	);
}

/** Figma "header-autopartshub" → "AutoPartsHUB": the AutoPartsHUB logo, notifications and the user's avatar (36px). */
export const AutoPartsHub: Story = {
	args: {
		logo: <AutoPartsHubLogo />,
		children: (
			<UserActions initials='AB' photo />
		),
	},
};

// Figma "Sparks Project" Share button: outline, with radius/button/lg (12px), shadow-xs and semibold text.
// Header-only overrides until Button is synced from sparks.ds (DESIGN.md → "Sparks Project header").
const headerButtonClasses = "rounded-button-lg shadow-xs";

/** Figma "Button" (Type=Icon, Style=Ghost, lg · 36) with the ×: closes the concept's tab. */
function CloseButton() {
	return (
		<Button
			variant='ghost'
			size='icon'
			aria-label='Close idea'
			title='Close idea'
			className='rounded-button-lg text-icon [&_svg]:size-[18px]'
		>
			<X aria-hidden />
		</Button>
	);
}

/** Figma "Property 1=Sparks": the Sparks logo at 28px tall, notifications and the user's avatar. No back button: Sparks opens in its own tab. */
export const Sparks: Story = {
	args: {
		logo: <Logo className='h-7' />,
		children: (
			<UserActions initials='AB' photo />
		),
	},
};

const steps = ["Plan", "Prototype", "Evaluate", "Review"] as const;

function ProjectStart({ name }: { name: string }) {
	return (
		<Typography as='h1' size='xl' weight='semibold' className='truncate text-foreground-prominent'>
			{name}
		</Typography>
	);
}

function ProjectSteps({ current }: { current: number }) {
	return (
		<StepNav aria-label='Steps'>
			{steps.map((step, index) => (
				<StepNavItem key={step} current={index === current} disabled={index > current}>
					{step}
				</StepNavItem>
			))}
		</StepNav>
	);
}

/** Figma "Sparks Project": the concept workspace. The concept's name, the steps centered, the close button (92px tall). */
export const SparksProject: Story = {
	args: {
		logo: <ProjectStart name='Wrong-part returns' />,
		nav: <ProjectSteps current={0} />,
		children: <CloseButton />,
	},
};

/** "Sparks Project" in Review: "Share" shows from Review on (Figma `showShareButton`). */
export const SparksProjectWithShare: Story = {
	args: {
		logo: <ProjectStart name='Wrong-part returns' />,
		nav: <ProjectSteps current={3} />,
		children: (
			<>
				<Button variant='outline' className={`${headerButtonClasses} h-9 px-3.5 font-semibold`}>
					Share
				</Button>
				<CloseButton />
			</>
		),
	},
};

/** No photo: the avatar shows the user's initials. */
export const WithInitials: Story = {
	args: {
		logo: <AutoPartsHubLogo />,
		children: (
			<UserActions initials='AB' />
		),
	},
};

/** The symbol logo, for narrow screens. */
export const Compact: Story = {
	args: {
		logo: <AutoPartsHubLogo variant='symbol' />,
		children: (
			<UserActions initials='AB' photo />
		),
	},
};

export const AllVariants: Story = {
	render: () => (
		<div className='flex flex-col divide-y divide-border'>
			<AppHeader logo={<AutoPartsHubLogo />}>
				<UserActions initials='AB' photo />
			</AppHeader>
			<AppHeader logo={<AutoPartsHubLogo variant='symbol' />}>
				<UserActions initials='AB' />
			</AppHeader>
			<AppHeader
				logo={<Logo className='h-7' />}
			>
				<UserActions initials='MB' />
			</AppHeader>
			<AppHeader logo={<ProjectStart name='Wrong-part returns' />} nav={<ProjectSteps current={0} />}>
				<CloseButton />
			</AppHeader>
		</div>
	),
};
