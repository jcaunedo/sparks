import type { CommentMention } from "../prototype/prototype-comments";
import type { ShareMember, ShareRole } from "@/components/overlays/share-popover";
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
	detail: "Product manager · Online shopping squad",
	role: "owner",
	avatarSrc,
});

/** People at AutoParts Co.: name, job title, email and team (the reviewers' people included), 38 across ten teams. */
const directory = [
	{ id: "priya", name: "Priya Shah", title: "UX lead", email: "priya.shah@autopartsco.example", team: "UX team" },
	{ id: "marcus", name: "Marcus Lee", title: "Engineering manager", email: "marcus.lee@autopartsco.example", team: "Engineering" },
	{ id: "tom", name: "Tom Becker", title: "Store operations manager", email: "tom.becker@autopartsco.example", team: "Stores" },
	{ id: "ana", name: "Ana Silva", title: "Catalog manager", email: "ana.silva@autopartsco.example", team: "Catalog" },
	{ id: "sam", name: "Sam Ortiz", title: "E-commerce manager", email: "sam.ortiz@autopartsco.example", team: "Online sales" },
	{ id: "lee", name: "Lee Carter", title: "Support team lead", email: "lee.carter@autopartsco.example", team: "Customer support" },
	{ id: "jordan", name: "Jordan Lee", title: "Senior software engineer", email: "jordan.lee@autopartsco.example", team: "Engineering" },
	// More people across the teams, so a letter or two brings up several to pick from.
	{ id: "maya-patel", name: "Maya Patel", title: "Product designer", email: "maya.patel@autopartsco.example", team: "UX team" },
	{ id: "daniel-kim", name: "Daniel Kim", title: "UX researcher", email: "daniel.kim@autopartsco.example", team: "UX team" },
	{ id: "sofia-reyes", name: "Sofia Reyes", title: "Content designer", email: "sofia.reyes@autopartsco.example", team: "UX team" },
	{ id: "ethan-brooks", name: "Ethan Brooks", title: "Frontend engineer", email: "ethan.brooks@autopartsco.example", team: "Engineering" },
	{ id: "nina-kowalski", name: "Nina Kowalski", title: "Backend engineer", email: "nina.kowalski@autopartsco.example", team: "Engineering" },
	{ id: "omar-haddad", name: "Omar Haddad", title: "QA engineer", email: "omar.haddad@autopartsco.example", team: "Engineering" },
	{ id: "chloe-martin", name: "Chloe Martin", title: "Mobile engineer", email: "chloe.martin@autopartsco.example", team: "Engineering" },
	{ id: "ravi-menon", name: "Ravi Menon", title: "Platform engineer", email: "ravi.menon@autopartsco.example", team: "Engineering" },
	{ id: "carlos-mendez", name: "Carlos Mendez", title: "Store manager", email: "carlos.mendez@autopartsco.example", team: "Stores" },
	{ id: "grace-okafor", name: "Grace Okafor", title: "Regional store manager", email: "grace.okafor@autopartsco.example", team: "Stores" },
	{ id: "mike-sullivan", name: "Mike Sullivan", title: "Parts counter lead", email: "mike.sullivan@autopartsco.example", team: "Stores" },
	{ id: "hannah-wright", name: "Hannah Wright", title: "Store trainer", email: "hannah.wright@autopartsco.example", team: "Stores" },
	{ id: "lucas-ferreira", name: "Lucas Ferreira", title: "Fitment data specialist", email: "lucas.ferreira@autopartsco.example", team: "Catalog" },
	{ id: "emily-chen", name: "Emily Chen", title: "Catalog analyst", email: "emily.chen@autopartsco.example", team: "Catalog" },
	{ id: "aaron-price", name: "Aaron Price", title: "Product data coordinator", email: "aaron.price@autopartsco.example", team: "Catalog" },
	{ id: "olivia-bennett", name: "Olivia Bennett", title: "Online merchandiser", email: "olivia.bennett@autopartsco.example", team: "Online sales" },
	{ id: "marco-rossi", name: "Marco Rossi", title: "Conversion analyst", email: "marco.rossi@autopartsco.example", team: "Online sales" },
	{ id: "sara-lindqvist", name: "Sara Lindqvist", title: "Pricing manager", email: "sara.lindqvist@autopartsco.example", team: "Online sales" },
	{ id: "diego-alvarez", name: "Diego Alvarez", title: "Support specialist", email: "diego.alvarez@autopartsco.example", team: "Customer support" },
	{ id: "kayla-johnson", name: "Kayla Johnson", title: "Returns specialist", email: "kayla.johnson@autopartsco.example", team: "Customer support" },
	{ id: "ben-adler", name: "Ben Adler", title: "Support operations analyst", email: "ben.adler@autopartsco.example", team: "Customer support" },
	{ id: "laura-gomez", name: "Laura Gomez", title: "Marketing manager", email: "laura.gomez@autopartsco.example", team: "Marketing" },
	{ id: "tyler-nguyen", name: "Tyler Nguyen", title: "CRM specialist", email: "tyler.nguyen@autopartsco.example", team: "Marketing" },
	{ id: "isabel-costa", name: "Isabel Costa", title: "Brand manager", email: "isabel.costa@autopartsco.example", team: "Marketing" },
	{ id: "noah-fischer", name: "Noah Fischer", title: "Data analyst", email: "noah.fischer@autopartsco.example", team: "Data & analytics" },
	{ id: "amara-diallo", name: "Amara Diallo", title: "Data scientist", email: "amara.diallo@autopartsco.example", team: "Data & analytics" },
	{ id: "clara-hoffman", name: "Clara Hoffman", title: "Product manager", email: "clara.hoffman@autopartsco.example", team: "Product" },
	{ id: "james-whitaker", name: "James Whitaker", title: "Senior product manager", email: "james.whitaker@autopartsco.example", team: "Product" },
	{ id: "elena-petrova", name: "Elena Petrova", title: "Product owner", email: "elena.petrova@autopartsco.example", team: "Product" },
	{ id: "victor-santos", name: "Victor Santos", title: "Supply chain manager", email: "victor.santos@autopartsco.example", team: "Supply chain" },
	{ id: "rachel-moore", name: "Rachel Moore", title: "Inventory planner", email: "rachel.moore@autopartsco.example", team: "Supply chain" },
];

// Under a person's name: their job title and team, which say more than an email about why they're in it.
const people: Omit<ShareMember, "role">[] = directory.map(({ id, name, title, team }) => ({
	id,
	kind: "person",
	name,
	detail: `${title} · ${team}`,
	avatarSrc: samplePersonPhoto(name),
}));

// Each team's size, at most 5 people: the people in it who'd review or work on an idea, not the whole department.
const departments: Omit<ShareMember, "role">[] = [
	{ id: "ux", kind: "department", name: "UX team", detail: "4 people" },
	{ id: "engineering", kind: "department", name: "Engineering", detail: "5 people" },
	{ id: "stores", kind: "department", name: "Stores", detail: "5 people" },
	{ id: "catalog", kind: "department", name: "Catalog", detail: "4 people" },
	{ id: "online-sales", kind: "department", name: "Online sales", detail: "4 people" },
	{ id: "customer-support", kind: "department", name: "Customer support", detail: "4 people" },
	{ id: "marketing", kind: "department", name: "Marketing", detail: "3 people" },
	{ id: "data", kind: "department", name: "Data & analytics", detail: "2 people" },
	{ id: "product", kind: "department", name: "Product", detail: "3 people" },
	// Dana's own product team, who builds what she advances: her squad.
	{ id: "online-shopping-squad", kind: "department", name: "Online shopping squad", detail: "5 people" },
	{ id: "supply-chain", kind: "department", name: "Supply chain", detail: "2 people" },
];

/**
 * Who she meant: a department or a person from the directory (by name, first name or email), or else whoever she typed:
 * an email as it is, a name as a person.
 */
export function sampleShareMemberFor(who: string, role: ShareRole = "commenter"): ShareMember {
	const t = who.trim().toLowerCase();
	// "Catalog team" is the Catalog department.
	const bare = t.replace(/ team$/, "");
	const byEmail = directory.find((person) => person.email === t)?.id;
	const match = [...departments, ...people].find(
		(entry) =>
			entry.id === byEmail ||
			entry.name.toLowerCase() === t ||
			entry.name.toLowerCase() === bare ||
			entry.name.toLowerCase().split(" ")[0] === t,
	);
	if (match) return { ...match, role };
	const isEmail = t.includes("@");
	return { id: `added-${t}`, kind: "person", name: who.trim(), detail: isEmail ? undefined : "Invited by name", role };
}

/** A department by its name ("Stores"), e.g. the reviewers' departments once the concept advances: they can comment. */
export const sampleShareDepartment = (name: string): ShareMember => sampleShareMemberFor(name, "commenter");

/** The people in a team, from the directory ("Catalog": Ana Silva, Lucas Ferreira…), with their job title and photo. */
export const samplePeopleIn = (team: string) =>
	directory
		.filter((person) => person.team.toLowerCase() === team.toLowerCase())
		.map(({ name, title }) => ({ name, detail: title, avatarSrc: samplePersonPhoto(name) }));

/** The concept's link, for "Copy link". */
export const sampleShareLink = "https://autopartshub.example/sparks/wrong-part-returns";

/**
 * The people (with their team: the list is one line per person) and departments (with their size) to pick from while typing: "@" in a comment on the
 * prototype (prds/sparks-prototype.md, "Commenting on it") and Share's field (prds/sparks.md, "Sharing a concept").
 * Made up; the real list comes from the company directory.
 */
export const sampleDirectory: CommentMention[] = [
	...directory.map(({ id, name, team }): CommentMention => ({ id, kind: "person", name, detail: team, avatarSrc: samplePersonPhoto(name) })),
	...departments.map(({ id, name, detail }): CommentMention => ({ id, kind: "department", name, detail })),
];

/** Who can be tagged with "@" in a comment: everyone in the directory. */
export const sampleMentionable = sampleDirectory;
