import type { LibraryAsset } from "../library/library-assets";

/*
 * "My library": Dana's files, links and notes across ideas, newest first. Made up; on the home's tab and in Sparks's "Add
 * from library". Dates are counted from `sampleLibraryNow`.
 */

/** The clock the sample times are counted from (Nov 22, 2026, 11:00). */
export const sampleLibraryNow = new Date("2026-11-22T11:00:00").getTime();

export const sampleLibrary: LibraryAsset[] = [
	{ id: "returns-q3", kind: "file", label: "Returns by reason Q3 2026.xlsx", size: "840 KB", addedAt: "2026-11-21T15:20:00" },
	{
		id: "store-calls",
		kind: "note",
		title: "Store visit notes",
		label: "Counter staff check fit by hand on three sites before they sell a part. Most returns they see are the wrong trim or engine.",
		addedAt: "2026-11-18T17:05:00",
	},
	{ id: "selector-test", kind: "file", label: "Vehicle selector test results.pdf", size: "1.6 MB", addedAt: "2026-11-16T10:40:00" },
	{ id: "product-page", kind: "link", title: "Product page analytics", label: "https://analytics.autopartsco.example/product-page", addedAt: "2026-11-13T09:15:00" },
	{ id: "fit-interviews", kind: "file", label: "Customer interviews on fit.docx", size: "320 KB", addedAt: "2026-11-12T14:30:00" },
	{ id: "wrong-part-photo", kind: "file", label: "Wrong brake pad photo.jpg", size: "2.1 MB", addedAt: "2026-11-11T11:10:00" },
	{ id: "catalog-gaps", kind: "file", label: "Fit data gaps by model year.csv", size: "96 KB", addedAt: "2026-11-07T16:45:00" },
	{ id: "holiday-freeze", kind: "link", title: "Holiday change calendar", label: "https://intranet.autopartsco.example/holiday-changes", addedAt: "2026-11-05T08:50:00" },
	{
		id: "support-themes",
		kind: "note",
		title: "Support themes in October",
		label: "\"Will this fit my car?\" is the top question before a purchase. After it: delivery dates, then core returns.",
		addedAt: "2026-11-02T13:00:00",
	},
	{ id: "fleet-brief", kind: "file", label: "Fleet customers brief.pptx", size: "4.8 MB", addedAt: "2026-10-28T10:00:00" },
	{ id: "delivery-survey", kind: "file", label: "Delivery date survey.pdf", size: "780 KB", addedAt: "2026-10-20T15:35:00" },
	{ id: "pickup-study", kind: "link", title: "Store pickup study", label: "https://research.autopartsco.example/store-pickup", addedAt: "2026-10-14T09:25:00" },
];
