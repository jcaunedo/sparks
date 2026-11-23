import type { AppNotification } from "../notifications-popover";

/*
 * Dana's notifications, the same in every AutoPartsHUB header: comments, reviews and shares from Sparks, and a data
 * warning, each about one of the start page's concepts (`href`, the concept's link). Made up; dates count back from
 * `sampleNotificationsNow`.
 */

/** The clock the sample times are counted from (Nov 22, 2026, 11:00). */
export const sampleNotificationsNow = new Date("2026-11-22T11:00:00").getTime();

const ago = (minutes: number) => new Date(sampleNotificationsNow - minutes * 60_000).toISOString();

export const sampleNotifications: AppNotification[] = [
	{
		id: "n1",
		kind: "person",
		name: "Priya Shah",
		title: "Priya Shah commented on Fit check before checkout",
		href: "#fit-check",
		description: "The fit message on the product page reads well. Could it name the trim too?",
		createdAt: ago(0),
		unread: true,
	},
	{
		id: "n2",
		kind: "department",
		title: "The UX team gave their view on Bulk quotes for fleets",
		href: "#fleet-quotes",
		description: "Advance with changes: try the quote form with two or three fleet buyers first.",
		createdAt: ago(23),
		unread: true,
	},
	{
		id: "n3",
		kind: "success",
		title: "Validate finished for Reorder in one tap",
		href: "#shop-reorders",
		description: "83% of scenarios worked. One finding is still open.",
		createdAt: ago(60 * 26),
	},
	{
		id: "n4",
		kind: "warning",
		title: "Fit data is incomplete for some 2008 models",
		href: "#fit-check",
		description: "Fit checks may say \"Not sure\" for parts on the 2008 Escape and Fusion.",
		createdAt: ago(60 * 30),
		unread: true,
	},
	{
		id: "n5",
		kind: "update",
		title: "Bulk quotes for fleets advanced",
		href: "#fleet-quotes",
		description: "Morgan Reyes advanced it to the teams who'll build it.",
		createdAt: ago(60 * 24 * 4),
	},
	{
		id: "n6",
		kind: "person",
		name: "Sam Ortiz",
		title: "Sam Ortiz shared Pickup slots in store with you",
		href: "#store-pickup",
		description: "You can view and comment.",
		createdAt: ago(60 * 24 * 7),
	},
];
