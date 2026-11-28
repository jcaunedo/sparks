import type { Meta, StoryObj } from "@storybook/react-vite";

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./table";

const meta = {
	title: "Data display/Table",
	component: Table,
	tags: ["autodocs"],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

const rows = [
	{ area: "Problem is worth solving", result: "Strong support" },
	{ area: "Proposed direction", result: "Support" },
	{ area: "Technical feasibility", result: "Mixed" },
];

/** shadcn's Table as is. */
export const Default: Story = {
	render: () => (
		<Table>
			<TableCaption>Assessment criteria</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead>Area</TableHead>
					<TableHead>Result</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{rows.map((row) => (
					<TableRow key={row.area}>
						<TableCell>{row.area}</TableCell>
						<TableCell>{row.result}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	),
};

/** Every part together: the same as Default (shadcn's Table has no variants). */
export const AllVariants: Story = Default;
