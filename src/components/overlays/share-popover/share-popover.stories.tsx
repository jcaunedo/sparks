import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "@/components/buttons/button";

import { SharePopover, type ShareMember, type ShareRole } from "./share-popover";

// Made-up people and teams, for the stories only.
const directory = [
	{ id: "priya", kind: "person" as const, name: "Priya Shah", detail: "UX team" },
	{ id: "marcus", kind: "person" as const, name: "Marcus Lee", detail: "Engineering" },
	{ id: "ana", kind: "person" as const, name: "Ana Silva", detail: "Catalog" },
	{ id: "ux", kind: "department" as const, name: "UX team", detail: "3 people" },
	{ id: "catalog", kind: "department" as const, name: "Catalog", detail: "3 people" },
];
const details: Record<string, string> = { "Priya Shah": "UX lead · UX team", "Marcus Lee": "Engineering manager · Engineering", "Ana Silva": "Catalog manager · Catalog" };
const teams: Record<string, { name: string; detail: string }[]> = {
	"UX team": [
		{ name: "Priya Shah", detail: "UX lead" },
		{ name: "Maya Patel", detail: "Product designer" },
		{ name: "Daniel Kim", detail: "UX researcher" },
	],
	Catalog: [
		{ name: "Ana Silva", detail: "Catalog manager" },
		{ name: "Lucas Ferreira", detail: "Fit data specialist" },
		{ name: "Emily Chen", detail: "Catalog analyst" },
	],
};
const owner: ShareMember = { id: "owner", kind: "person", name: "Dana Morales (you)", detail: "Product manager · Online shopping squad", role: "owner" };

/** A working Share: adding, changing a role, removing, a team's people and the recommended ones. */
function ShareDemo({ open, recommended = true, roles }: { open?: boolean; recommended?: boolean; roles?: ShareRole[] }) {
	const [members, setMembers] = React.useState<ShareMember[]>([owner]);
	const memberFor = (name: string, role: ShareRole): ShareMember => {
		const found = directory.find((option) => option.name === name);
		return found
			? { id: found.id, kind: found.kind, name: found.name, detail: found.kind === "person" ? details[found.name] : found.detail, role }
			: { id: `added-${name}`, kind: "person", name, role };
	};
	const add = (member: ShareMember) => setMembers((current) => (current.some((m) => m.id === member.id) ? current : [...current, member]));
	return (
		<SharePopover
			title='Share idea'
			description='People and departments you add see the idea and its prototype once you publish it.'
			rolesHint='With "Can comment", they can also leave feedback. With "Can edit", they work on it with you right away, in your conversation with Sparks too.'
			members={members}
			roles={roles}
			directory={directory}
			onInvite={(who, role) => add(memberFor(who, role))}
			onRoleChange={(id, role) => setMembers((current) => current.map((m) => (m.id === id ? { ...m, role } : m)))}
			onRemove={(id) => setMembers((current) => current.filter((m) => m.id !== id))}
			peopleIn={(team) => teams[team] ?? []}
			onTeamPeopleChange={(id, excluded) => setMembers((current) => current.map((m) => (m.id === id ? { ...m, excluded } : m)))}
			recommended={
				recommended
					? {
							people: [
								{ name: "Priya Shah", kind: "person", detail: details["Priya Shah"] },
								{ name: "Ana Silva", kind: "person", detail: details["Ana Silva"] },
								{ name: "UX team", kind: "department", detail: "3 people" },
								{ name: "Catalog", kind: "department", detail: "3 people" },
							],
							onAdd: (name, excluded) => add({ ...memberFor(name, "commenter"), ...(excluded.length ? { excluded } : {}) }),
						}
					: undefined
			}
			link='https://example.com/ideas/fit-check'
		>
			<Button variant='outline'>Share</Button>
		</SharePopover>
	);
}

const meta = {
	title: "Overlays/Share Popover",
	component: ShareDemo,
	parameters: { layout: "centered" },
	tags: ["autodocs"],
} satisfies Meta<typeof ShareDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Share with the recommended people and teams: select "Share", then "View recommended reviewers". */
export const Default: Story = {};

/** Nothing recommended: who has access and the field only. */
export const WithoutRecommended: Story = { args: { recommended: false } };

/** Only some roles on offer (here "Can view" and "Can comment"). */
export const FewerRoles: Story = { args: { roles: ["viewer", "commenter"] } };

/** Every state together: the default and without recommendations. */
export const AllVariants: Story = {
	render: () => (
		<div className='flex gap-4'>
			<ShareDemo />
			<ShareDemo recommended={false} />
		</div>
	),
};
