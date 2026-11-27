import type { Meta, StoryObj } from "@storybook/react-vite";

import { InlineAlert } from "./inline-alert";

const meta = {
	title: "Feedback/InlineAlert",
	component: InlineAlert,
	tags: ["autodocs"],
	args: {
		children: "Description goes here.",
		action: { label: "Action", onClick: () => {} },
		onDismiss: () => {},
	},
	decorators: [
		(Story) => (
			// sparks.ds draws it 400px wide.
			<div className='w-[400px]'>
				<Story />
			</div>
		),
	],
} satisfies Meta<typeof InlineAlert>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Figma "Info". */
export const Info: Story = { args: { tone: "info" } };

/** Figma "Success". */
export const Success: Story = { args: { tone: "success" } };

/** Figma "Danger" (`destructive`): announced at once (`role="alert"`). */
export const Destructive: Story = { args: { tone: "destructive" } };

/** Figma "Warning": announced at once (`role="alert"`). */
export const Warning: Story = { args: { tone: "warning" } };

/** The message alone: no action, no ×. */
export const MessageOnly: Story = { args: { action: undefined, onDismiss: undefined } };

/** A longer message wraps; the action and the × stay on the first line's row, centered. (Example copy.) */
export const LongMessage: Story = {
	args: { tone: "warning", children: "Fit data is missing for about 1 in 8 parts on vehicles over 15 years old, so some parts can only say \"We're not sure this fits\"." },
};

/** All four tones, as in sparks.ds. */
export const AllVariants: Story = {
	render: (args) => (
		<div className='flex flex-col gap-4'>
			{(["info", "success", "destructive", "warning"] as const).map((tone) => (
				<InlineAlert key={tone} {...args} tone={tone} />
			))}
		</div>
	),
};
