import type { Meta, StoryObj } from "@storybook/react-vite";

import { RadioGroup, RadioGroupItem } from "./radio-group";

const meta = {
	title: "Forms/Radio Group",
	component: RadioGroup,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

const options = ["Advance", "Advance with changes", "Don't advance yet"];

/** One option per row, each with its label; only one can be chosen. Arrow keys move between them. */
export const Default: Story = {
	args: { defaultValue: "Advance", "aria-label": "Your view" },
	render: (args) => (
		<RadioGroup {...args}>
			{options.map((option) => (
				<div key={option} className='flex items-center gap-2'>
					<RadioGroupItem value={option} id={`option-${option}`} />
					<label htmlFor={`option-${option}`} className='text-sm text-foreground'>
						{option}
					</label>
				</div>
			))}
		</RadioGroup>
	),
};

/** Nothing chosen yet, and one option disabled. */
export const States: Story = {
	args: { "aria-label": "Your view" },
	render: (args) => (
		<RadioGroup {...args}>
			{options.map((option, index) => (
				<div key={option} className='flex items-center gap-2'>
					<RadioGroupItem value={option} id={`state-${option}`} disabled={index === 2} />
					<label htmlFor={`state-${option}`} className='text-sm text-foreground'>
						{option}
					</label>
				</div>
			))}
		</RadioGroup>
	),
};
