import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "@/components/buttons/button";

import { Toaster, toast } from "./sonner";

const meta = {
	title: "Feedback/Sonner",
	component: Toaster,
	tags: ["autodocs"],
} satisfies Meta<typeof Toaster>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A confirmation, with what happened under it and an action. */
export const Default: Story = {
	render: (args) => (
		<>
			<Toaster {...args} />
			<Button
				variant='outline'
				onClick={() =>
					toast.success("Added to this idea's library", {
						description: '"car2.avif", "car3.avif" and "sales-report.xlsx"',
						action: { label: "View", onClick: () => {} },
					})
				}
			>
				Show toast
			</Button>
		</>
	),
};

/** Every kind, one after the other. */
export const AllVariants: Story = {
	render: (args) => (
		<>
			<Toaster {...args} />
			<div className='flex flex-wrap gap-2'>
				<Button variant='outline' onClick={() => toast("Event created")}>
					Default
				</Button>
				<Button variant='outline' onClick={() => toast.success("Saved")}>
					Success
				</Button>
				<Button variant='outline' onClick={() => toast.info("Heads up")}>
					Info
				</Button>
				<Button variant='outline' onClick={() => toast.warning("Check this")}>
					Warning
				</Button>
				<Button variant='outline' onClick={() => toast.error("Couldn't save")}>
					Error
				</Button>
			</div>
		</>
	),
};
