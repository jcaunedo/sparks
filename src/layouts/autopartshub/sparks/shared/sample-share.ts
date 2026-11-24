import type { CommentMention } from "../prototype/prototype-comments";
import type { ShareMember, ShareRole } from "../workspace/share-popover";
import { samplePersonPhoto } from "../../sample-data/sample-people";

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

/** People at AutoParts Co.: name, email and team (the reviewers' people included), 38 across ten teams. */
const directory = [
	{ id: "priya", name: "Priya Shah", email: "priya.shah@autopartsco.example", team: "UX team" },
	{ id: "marcus", name: "Marcus Lee", email: "marcus.lee@autopartsco.example", team: "Engineering" },
	{ id: "tom", name: "Tom Becker", email: "tom.becker@autopartsco.example", team: "Stores" },
	{ id: "ana", name: "Ana Silva", email: "ana.silva@autopartsco.example", team: "Catalog" },
	{ id: "sam", name: "Sam Ortiz", email: "sam.ortiz@autopartsco.example", team: "Online sales" },
	{ id: "lee", name: "Lee Carter", email: "lee.carter@autopartsco.example", team: "Customer support" },
	{ id: "jordan", name: "Jordan Lee", email: "jordan.lee@autopartsco.example", team: "Engineering" },
	// More people across the teams, so a letter or two brings up several to pick from.
	{ id: "maya-patel", name: "Maya Patel", email: "maya.patel@autopartsco.example", team: "UX team" },
	{ id: "daniel-kim", name: "Daniel Kim", email: "daniel.kim@autopartsco.example", team: "UX team" },
	{ id: "sofia-reyes", name: "Sofia Reyes", email: "sofia.reyes@autopartsco.example", team: "UX team" },
	{ id: "ethan-brooks", name: "Ethan Brooks", email: "ethan.brooks@autopartsco.example", team: "Engineering" },
	{ id: "nina-kowalski", name: "Nina Kowalski", email: "nina.kowalski@autopartsco.example", team: "Engineering" },
	{ id: "omar-haddad", name: "Omar Haddad", email: "omar.haddad@autopartsco.example", team: "Engineering" },
	{ id: "chloe-martin", name: "Chloe Martin", email: "chloe.martin@autopartsco.example", team: "Engineering" },
	{ id: "ravi-menon", name: "Ravi Menon", email: "ravi.menon@autopartsco.example", team: "Engineering" },
	{ id: "carlos-mendez", name: "Carlos Mendez", email: "carlos.mendez@autopartsco.example", team: "Stores" },
	{ id: "grace-okafor", name: "Grace Okafor", email: "grace.okafor@autopartsco.example", team: "Stores" },
	{ id: "mike-sullivan", name: "Mike Sullivan", email: "mike.sullivan@autopartsco.example", team: "Stores" },
	{ id: "hannah-wright", name: "Hannah Wright", email: "hannah.wright@autopartsco.example", team: "Stores" },
	{ id: "lucas-ferreira", name: "Lucas Ferreira", email: "lucas.ferreira@autopartsco.example", team: "Catalog" },
	{ id: "emily-chen", name: "Emily Chen", email: "emily.chen@autopartsco.example", team: "Catalog" },
	{ id: "aaron-price", name: "Aaron Price", email: "aaron.price@autopartsco.example", team: "Catalog" },
	{ id: "olivia-bennett", name: "Olivia Bennett", email: "olivia.bennett@autopartsco.example", team: "Online sales" },
	{ id: "marco-rossi", name: "Marco Rossi", email: "marco.rossi@autopartsco.example", team: "Online sales" },
	{ id: "sara-lindqvist", name: "Sara Lindqvist", email: "sara.lindqvist@autopartsco.example", team: "Online sales" },
	{ id: "diego-alvarez", name: "Diego Alvarez", email: "diego.alvarez@autopartsco.example", team: "Customer support" },
	{ id: "kayla-johnson", name: "Kayla Johnson", email: "kayla.johnson@autopartsco.example", team: "Customer support" },
	{ id: "ben-adler", name: "Ben Adler", email: "ben.adler@autopartsco.example", team: "Customer support" },
	{ id: "laura-gomez", name: "Laura Gomez", email: "laura.gomez@autopartsco.example", team: "Marketing" },
	{ id: "tyler-nguyen", name: "Tyler Nguyen", email: "tyler.nguyen@autopartsco.example", team: "Marketing" },
	{ id: "isabel-costa", name: "Isabel Costa", email: "isabel.costa@autopartsco.example", team: "Marketing" },
	{ id: "noah-fischer", name: "Noah Fischer", email: "noah.fischer@autopartsco.example", team: "Data & analytics" },
	{ id: "amara-diallo", name: "Amara Diallo", email: "amara.diallo@autopartsco.example", team: "Data & analytics" },
	{ id: "clara-hoffman", name: "Clara Hoffman", email: "clara.hoffman@autopartsco.example", team: "Product" },
	{ id: "james-whitaker", name: "James Whitaker", email: "james.whitaker@autopartsco.example", team: "Product" },
	{ id: "elena-petrova", name: "Elena Petrova", email: "elena.petrova@autopartsco.example", team: "Product" },
	{ id: "victor-santos", name: "Victor Santos", email: "victor.santos@autopartsco.example", team: "Supply chain" },
	{ id: "rachel-moore", name: "Rachel Moore", email: "rachel.moore@autopartsco.example", team: "Supply chain" },
];

const people: Omit<ShareMember, "role">[] = directory.map(({ id, name, email }) => ({
	id,
	kind: "person",
	name,
	detail: email,
	avatarSrc: samplePersonPhoto(name),
}));

const departments: Omit<ShareMember, "role">[] = [
	{ id: "ux", kind: "department", name: "UX team", detail: "8 people" },
	{ id: "engineering", kind: "department", name: "Engineering", detail: "34 people" },
	{ id: "stores", kind: "department", name: "Stores", detail: "212 people" },
	{ id: "catalog", kind: "department", name: "Catalog", detail: "11 people" },
	{ id: "online-sales", kind: "department", name: "Online sales", detail: "15 people" },
	{ id: "customer-support", kind: "department", name: "Customer support", detail: "40 people" },
	{ id: "marketing", kind: "department", name: "Marketing", detail: "18 people" },
	{ id: "data", kind: "department", name: "Data & analytics", detail: "9 people" },
	{ id: "product", kind: "department", name: "Product", detail: "12 people" },
	{ id: "supply-chain", kind: "department", name: "Supply chain", detail: "26 people" },
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

/**
 * The people (with their team) and departments (with their size) to pick from while typing: "@" in a comment on the
 * prototype (prds/sparks-prototype.md, "Commenting on it") and Share's field (prds/sparks.md, "Sharing a concept").
 * Made up; the real list comes from the company directory.
 */
export const sampleDirectory: CommentMention[] = [
	...directory.map(({ id, name, team }): CommentMention => ({ id, kind: "person", name, detail: team, avatarSrc: samplePersonPhoto(name) })),
	...departments.map(({ id, name, detail }): CommentMention => ({ id, kind: "department", name, detail })),
];

/** Who can be tagged with "@" in a comment: everyone in the directory. */
export const sampleMentionable = sampleDirectory;
