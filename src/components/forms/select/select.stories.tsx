import type { Meta, StoryObj } from "@storybook/react-vite";

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./select";

const meta = {
	title: "Forms/Select",
	component: Select,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const fruits = ["Apple", "Banana", "Blueberry", "Grapes", "Pineapple"];

/** sparks.ds "Select / Content" (77:6357): a section title, then the items; the chosen one shows a check. */
export const Default: Story = {
	render: (args) => (
		<Select {...args}>
			<SelectTrigger className='w-[200px]' aria-label='Fruit'>
				<SelectValue placeholder='Pick a fruit' />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>Fruits</SelectLabel>
					{fruits.map((fruit) => (
						<SelectItem key={fruit} value={fruit.toLowerCase()}>
							{fruit}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	),
};

/** Open, with a value chosen (Item State=Active) and a disabled item (State=Disabled). Hover is the keyboard or pointer highlight. */
export const AllVariants: Story = {
	args: { defaultOpen: true, defaultValue: "banana" },
	render: (args) => (
		<Select {...args}>
			<SelectTrigger className='w-[200px]' aria-label='Fruit'>
				<SelectValue placeholder='Pick a fruit' />
			</SelectTrigger>
			<SelectContent position='popper'>
				<SelectGroup>
					<SelectLabel>Fruits</SelectLabel>
					{fruits.map((fruit) => (
						<SelectItem key={fruit} value={fruit.toLowerCase()} disabled={fruit === "Pineapple"}>
							{fruit}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	),
};
