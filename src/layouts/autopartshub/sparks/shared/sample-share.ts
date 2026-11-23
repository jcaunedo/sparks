import type { ShareMember, ShareRole } from "../workspace/share-popover";

/*
 * Who can be added from "Share" (prds/sparks.md, "Sharing a concept"): people and departments at AutoParts Co. Made up;
 * the real list comes from the company directory.
 */

/** Dana, the concept's owner: first in "Who has access". */
export const sampleShareOwner = (firstName: string, avatarSrc?: string): ShareMember => ({
	id: "owner",
	kind: "person",
	name: `${firstName} Morales (you)`,
	detail: "dana.morales@autopartsco.example",
	role: "owner",
	avatarSrc,
});

const people: Omit<ShareMember, "role">[] = [
	{ id: "priya", kind: "person", name: "Priya Shah", detail: "priya.shah@autopartsco.example" },
	{ id: "sam", kind: "person", name: "Sam Ortiz", detail: "sam.ortiz@autopartsco.example" },
	{ id: "lee", kind: "person", name: "Lee Carter", detail: "lee.carter@autopartsco.example" },
	{ id: "jordan", kind: "person", name: "Jordan Lee", detail: "jordan.lee@autopartsco.example" },
];

const departments: Omit<ShareMember, "role">[] = [
	{ id: "ux", kind: "department", name: "UX team", detail: "8 people" },
	{ id: "engineering", kind: "department", name: "Engineering", detail: "34 people" },
	{ id: "stores", kind: "department", name: "Stores", detail: "212 people" },
	{ id: "catalog", kind: "department", name: "Catalog", detail: "11 people" },
	{ id: "online-sales", kind: "department", name: "Online sales", detail: "15 people" },
	{ id: "customer-support", kind: "department", name: "Customer support", detail: "40 people" },
];

/**
 * Who she meant: a department or a person from the directory (by name, first name or email), or else whoever she typed:
 * an email as it is, a name as a person.
 */
export function sampleShareMemberFor(who: string, role: ShareRole = "commenter"): ShareMember {
	const t = who.trim().toLowerCase();
	const match = [...departments, ...people].find(
		(entry) => entry.name.toLowerCase() === t || entry.name.toLowerCase().split(" ")[0] === t || entry.detail?.toLowerCase() === t,
	);
	if (match) return { ...match, role };
	const isEmail = t.includes("@");
	return { id: `added-${t}`, kind: "person", name: who.trim(), detail: isEmail ? undefined : "Invited by name", role };
}

/** A department by its name ("Stores"), e.g. the reviewers' departments once the concept advances: they can comment. */
export const sampleShareDepartment = (name: string): ShareMember => sampleShareMemberFor(name, "commenter");

/** The concept's link, for "Copy link". */
export const sampleShareLink = "https://autopartshub.example/sparks/wrong-part-returns";
