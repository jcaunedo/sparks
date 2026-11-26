import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { handlePeopleKeys, matchPeople, PeopleList, type PeopleOption } from "./people-list";

// Made-up people and teams, for the stories only.
const options: PeopleOption[] = [
	{ id: "priya", kind: "person", name: "Priya Shah", detail: "UX team" },
	{ id: "marcus", kind: "person", name: "Marcus Lee", detail: "Engineering" },
	{ id: "jordan", kind: "person", name: "Jordan Lee", detail: "Engineering" },
	{ id: "ana", kind: "person", name: "Ana Silva", detail: "Catalog" },
	{ id: "ux", kind: "department", name: "UX team", detail: "4 people" },
	{ id: "engineering", kind: "department", name: "Engineering", detail: "5 people" },
];

/** A field with the list under it: type to narrow it, ↑/↓ to move, Enter or Tab to pick, Esc to close it. */
function PeopleField({ initial = "" }: { initial?: string }) {
	const [value, setValue] = React.useState(initial);
	const [active, setActive] = React.useState(0);
	const [picked, setPicked] = React.useState<string>();
	const [closed, setClosed] = React.useState(false);
	const id = React.useId();
	const matches = matchPeople(options, value);
	const open = matches.length > 0 && !closed;
	const pick = (option: PeopleOption) => {
		setPicked(option.name);
		setValue("");
	};
	return (
		<div className='flex w-80 flex-col gap-2'>
			<div className='relative'>
				<input
					value={value}
					onChange={(event) => {
						setValue(event.target.value);
						setActive(0);
						setClosed(false);
					}}
					onKeyDown={(event) => {
						if (open) handlePeopleKeys(event, { options: matches, active, setActive, pick, close: () => setClosed(true) });
					}}
					placeholder='Name or department'
					aria-label='Name or department'
					role='combobox'
					aria-expanded={open}
					aria-controls={open ? id : undefined}
					aria-activedescendant={open ? `${id}-${active}` : undefined}
					className='h-9 w-full rounded-input border border-input bg-background px-3 text-sm outline-none'
				/>
				{open ? (
					<PeopleList id={id} label='People and departments' options={matches} active={active} onActiveChange={setActive} onPick={pick} className='absolute inset-x-0 top-full mt-1' />
				) : null}
			</div>
			{picked ? <p className='text-sm text-muted-foreground'>Picked: {picked}</p> : null}
		</div>
	);
}

const meta = {
	title: "Forms/People List",
	component: PeopleField,
	parameters: { layout: "centered" },
	tags: ["autodocs"],
} satisfies Meta<typeof PeopleField>;

export default meta;
type Story = StoryObj<typeof meta>;

/** An empty field: the list shows once something's typed. */
export const Default: Story = {};

/** "eng": Engineering first, then the people in it. */
export const Matching: Story = { args: { initial: "eng" } };

/** Both states together. */
export const AllVariants: Story = {
	render: () => (
		<div className='flex flex-col gap-40'>
			<PeopleField />
			<PeopleField initial='eng' />
		</div>
	),
};
