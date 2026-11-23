import type { Meta, StoryObj } from "@storybook/react-vite";

import { StepNav, StepNavItem } from "./step-nav";

const steps = ["Plan", "Prototype", "Validate", "Review"] as const;

const meta = {
	title: "Navigation/StepNav",
	component: StepNav,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	args: {
		"aria-label": "Steps",
	},
} satisfies Meta<typeof StepNav>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Figma "Sparks Project": the first step is current; the others can't be selected yet. */
export const Default: Story = {
	render: (args) => (
		<StepNav {...args}>
			{steps.map((step, index) => (
				<StepNavItem key={step} current={index === 0} disabled={index > 0}>
					{step}
				</StepNavItem>
			))}
		</StepNav>
	),
};

/** Later in the flow: earlier steps can be selected again (hover them). */
export const LaterStep: Story = {
	render: (args) => (
		<StepNav {...args}>
			{steps.map((step, index) => (
				<StepNavItem key={step} current={index === 2} disabled={index > 2}>
					{step}
				</StepNavItem>
			))}
		</StepNav>
	),
};

/** Steps not reached yet that can still be selected (`upcoming`): muted text, with hover. Sparks uses this to explain a step before Dana gets there. */
export const Upcoming: Story = {
	render: (args) => (
		<StepNav {...args}>
			{steps.map((step, index) => (
				<StepNavItem key={step} current={index === 0} upcoming={index > 0}>
					{step}
				</StepNavItem>
			))}
		</StepNav>
	),
};

/** As links (`asChild`), for apps that route each step to its own URL. */
export const AsLinks: Story = {
	render: (args) => (
		<StepNav {...args}>
			{steps.map((step, index) => (
				<StepNavItem key={step} asChild current={index === 1}>
					<a href={`#${step.toLowerCase()}`}>{step}</a>
				</StepNavItem>
			))}
		</StepNav>
	),
};

export const AllVariants: Story = {
	render: (args) => (
		<div className='flex flex-col gap-4'>
			{steps.map((current, currentIndex) => (
				<StepNav key={current} {...args}>
					{steps.map((step, index) => (
						<StepNavItem key={step} current={index === currentIndex} disabled={index > currentIndex}>
							{step}
						</StepNavItem>
					))}
				</StepNav>
			))}
		</div>
	),
};
