import type { Meta, StoryObj } from "@storybook/react-vite";

import { Checkbox } from "./checkbox";

const meta = {
	title: "Forms/Checkbox",
	component: Checkbox,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

/** With its label: checked by default. */
export const Default: Story = {
	args: { defaultChecked: true, id: "checkbox-default" },
	render: (args) => (
		<div className='flex items-center gap-2'>
			<Checkbox {...args} />
			<label htmlFor='checkbox-default' className='text-sm text-foreground'>
				Tom Becker
			</label>
		</div>
	),
};

/** Unchecked, checked, and disabled. */
export const States: Story = {
	render: () => (
		<div className='flex flex-col gap-3'>
			{[
				{ id: "off", label: "Unchecked" },
				{ id: "on", label: "Checked", checked: true },
				{ id: "disabled", label: "Disabled", disabled: true },
			].map((item) => (
				<div key={item.id} className='flex items-center gap-2'>
					<Checkbox id={`state-${item.id}`} defaultChecked={item.checked} disabled={item.disabled} />
					<label htmlFor={`state-${item.id}`} className='text-sm text-foreground'>
						{item.label}
					</label>
				</div>
			))}
		</div>
	),
};
