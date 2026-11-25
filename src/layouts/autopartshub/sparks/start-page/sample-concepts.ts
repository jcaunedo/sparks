import type { SparksConceptSummary } from "./start-page";

/** The stories' clock, so "Yesterday" and "2 hr ago" don't drift: Nov 21, 2026, 10:00 AM. */
export const sampleNow = new Date("2026-11-21T10:00:00").getTime();

/* Dana's concepts, most recently edited first: one on each kind of status. */
export const sampleConcepts: SparksConceptSummary[] = [
	{
		id: "fit-check",
		name: "Fit check before checkout",
		summary: "Too many returns are parts that don't fit the customer's car.",
		sharing: "You and 3 others",
		createdAt: "2026-11-14T09:30:00",
		validation: "failed",
		editedAt: "2026-11-21T08:05:00",
		status: "prototype",
		href: "#fit-check",
	},
	{
		id: "delivery-date",
		name: "Delivery date on the product page",
		summary: "Customers leave at checkout when they first see the delivery date.",
		sharing: "Only you",
		createdAt: "2026-11-20T15:10:00",
		editedAt: "2026-11-20T16:40:00",
		status: "plan",
		href: "#delivery-date",
	},
	{
		id: "shop-reorders",
		name: "Reorder in one tap",
		summary: "Repair shops reorder the same parts every week, one item at a time.",
		sharing: "You and 3 others",
		createdAt: "2026-11-03T10:00:00",
		validation: 83,
		editedAt: "2026-11-18T11:20:00",
		status: "waiting",
		statusDate: "2026-11-18T11:20:00",
		href: "#shop-reorders",
	},
	{
		id: "fleet-quotes",
		name: "Bulk quotes for fleets",
		summary: "Fleet managers ask for quotes by email and wait days for an answer.",
		sharing: "You and 5 others",
		createdAt: "2026-10-21T14:00:00",
		validation: 100,
		editedAt: "2026-11-12T09:00:00",
		status: "advanced",
		statusDate: "2026-11-12T09:00:00",
		href: "#fleet-quotes",
	},
];

/* A concept another product manager shared with Dana. */
export const sampleSharedConcepts: SparksConceptSummary[] = [
	{
		id: "store-pickup",
		name: "Pickup slots in store",
		summary: "Customers who choose store pickup don't know when to come.",
		sharing: "Shared by Marco",
		createdAt: "2026-11-10T09:15:00",
		validation: 67,
		editedAt: "2026-11-19T14:30:00",
		status: "review",
		href: "#store-pickup",
	},
];

/* A concept Dana archived after it was stopped. */
export const sampleArchivedConcepts: SparksConceptSummary[] = [
	{
		id: "parts-subscription",
		name: "Oil change kits by subscription",
		summary: "Customers buy the same oil and filter every few months and forget to reorder.",
		sharing: "You and 2 others",
		createdAt: "2026-10-06T11:45:00",
		validation: 33,
		editedAt: "2026-10-28T15:10:00",
		status: "stopped",
		statusDate: "2026-10-28T15:10:00",
		href: "#parts-subscription",
	},
];
