import type { FitCheckData } from "./fit-check-prototype";
import brakePads from "./images/brake-pads.jpg";
import oilFilter from "./images/oil-filter.jpg";
import sparkPlugs from "./images/spark-plugs.jpg";

/*
 * The made-up data the "Fit check before you buy" prototype runs on (prds/sparks-prototype.md, "What Sparks builds":
 * synthetic, shaped like AutoParts Co.'s). One part fits, one doesn't (with the one that does), and one has no fit data
 * for the vehicle's trim and engine.
 */
export const sampleFitCheck: FitCheckData = {
	vehicle: { year: "2015", make: "Ford", model: "F-150", trim: "XLT", engine: "5.0L V8" },
	vin: "1FTEW1EF0FF000000",
	invoice: "repair-invoice-march.pdf",
	options: {
		years: ["2012", "2013", "2014", "2015", "2016", "2017", "2018"],
		makes: ["Chevrolet", "Ford", "Toyota"],
		models: ["Escape", "F-150", "Fusion", "Silverado 1500", "Tacoma"],
		trims: ["XL", "XLT", "Lariat"],
		engines: ["2.7L V6", "3.5L V6", "5.0L V8"],
	},
	parts: [
		{ id: "brake-pads", name: "Front brake pads, ceramic", price: "$54.99", fit: "fits", image: brakePads, returnRate: "1 in 40 come back", fitsVehicles: ["2015–2020 Ford F-150, all trims", "2011–2014 Ford F-150 XLT, Lariat"] },
		{ id: "oil-filter", name: "Oil filter, FL-400S", price: "$8.99", fit: "doesnt", image: oilFilter, fitsInstead: ["oil-filter-fits"], returnRate: "1 in 6 come back as \"doesn't fit\"", oftenReturned: true, fitsVehicles: ["2011–2017 Ford Escape 2.5L", "2013–2019 Ford Fusion 2.5L"] },
		{ id: "oil-filter-fits", name: "Oil filter, FL-500S", price: "$9.49", fit: "fits", image: oilFilter, returnRate: "1 in 50 come back", fitsVehicles: ["2011–2020 Ford F-150 5.0L V8", "2015–2020 Ford Mustang 5.0L V8"] },
		{ id: "spark-plugs", name: "Spark plugs, iridium (8)", price: "$42.99", fit: "unsure", image: sparkPlugs, returnRate: "1 in 9 come back as \"doesn't fit\"", oftenReturned: true, fitsVehicles: ["2016–2020 Ford F-150 3.5L V6", "2017–2020 Ford Expedition 3.5L V6"] },
	],
	firstPartId: "brake-pads",
	customer: { name: "Jordan Lee", phone: "(555) 014-2290" },
	returns: [
		{ id: "r1", partId: "spark-plugs", vehicle: "2015 Ford F-150 XLT 5.0L V8", store: "Store 214" },
		{ id: "r2", partId: "spark-plugs", vehicle: "2014 Ford F-150 Lariat 5.0L V8", store: "Store 118" },
		{ id: "r3", partId: "oil-filter", vehicle: "2015 Ford F-150 XLT 5.0L V8", store: "Store 214" },
		{ id: "r4", partId: "brake-pads", vehicle: "2009 Ford F-150 XL 4.6L V8", store: "Store 302" },
	],
	search: "Ford F-150 parts",
	counterReturns: [
		{ order: "48107", partId: "oil-filter", customer: "Jordan Lee", savedVehicle: true },
		{ order: "48122", partId: "spark-plugs", customer: "Guest checkout", savedVehicle: false },
	],
};
