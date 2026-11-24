import type { Meta, StoryObj } from "@storybook/react-vite";

import { SectionDivider } from "./section-divider";

const meta = {
	title: "Chat/SectionDivider",
	component: SectionDivider,
	tags: ["autodocs"],
	decorators: [
		(Story) => (
			<div className='max-w-[664px] py-6'>
				<Story />
			</div>
		),
	],
} satisfies Meta<typeof SectionDivider>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A section that ended earlier: the line is just there. */
export const Default: Story = {};

/** A section that has just ended: the line draws itself, left to right. */
export const Drawing: Story = { args: { draw: true } };

/** Still, drawing, and in a narrow column. */
export const AllVariants: Story = {
	render: () => (
		<div className='flex flex-col gap-8'>
			<SectionDivider />
			<SectionDivider draw />
			<SectionDivider className='w-40' />
		</div>
	),
};
