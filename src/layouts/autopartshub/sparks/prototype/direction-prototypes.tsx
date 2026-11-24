import * as React from "react";

import { FitCheckPrototype, fitCheckElements, fitCheckScreens, type FitCheckAudience, type FitCheckChanges } from "./fit-check-prototype";
import {
	CheckoutCheckPrototype,
	checkoutScreens,
	FitDataPrototype,
	fitDataScreens,
	FlagReturnsPrototype,
	flagScreens,
	type PrototypeProps,
} from "./more-prototypes";
import type { PrototypeAudience } from "./prototype-panel";

/** What a prototype covers: for each audience and device, its screens and the steps of the journey each covers. */
type PrototypeContents = { audience: string; device: string; screens: { name: string; covers: number[] }[] };

/**
 * What Sparks builds for each direction (prds/sparks-prototype.md, "What Sparks builds"), by the direction's id: the
 * screens in the order it builds them, a view for each audience (on its device), what she can point at or type over,
 * and the prototype itself. A direction that's mostly a routine gets the pieces it uses and a walkthrough.
 */
type DirectionPrototype = {
	screens: string[];
	audiences: PrototypeAudience[];
	/** The elements she can point at or type over, by id, and how Sparks names them. */
	elements: Record<string, string>;
	render: (props: PrototypeProps) => React.ReactNode;
	/** What's in it, for the plan: each audience's screens and the steps of "How it works" they cover. */
	contents: PrototypeContents[];
	/** What happens on screen but not for real. */
	pretend: (changes: FitCheckChanges) => string[];
	/** What the made-up data represents. */
	sampleData: string;
};

const customer: PrototypeAudience = { id: "customer", label: "Customer", device: "phone" };
const staff: PrototypeAudience = { id: "staff", label: "Store staff", device: "desktop" };

const directionPrototypes: Record<string, DirectionPrototype> = {
	"fit-check": {
		screens: fitCheckScreens,
		audiences: [customer, staff],
		elements: fitCheckElements,
		render: ({ audience, ...props }) => <FitCheckPrototype audience={audience as FitCheckAudience} {...props} />,
		contents: [
			{
				audience: "Customer",
				device: "phone",
				screens: [
					{ name: "the vehicle picker", covers: [0] },
					{ name: "a part that fits", covers: [1] },
					{ name: "a part that doesn't fit", covers: [1, 2] },
					{ name: "the cart", covers: [] },
				],
			},
			{ audience: "Store staff", device: "desktop", screens: [{ name: "the store staff lookup", covers: [] }] },
		],
		pretend: (changes) => ["Saving a vehicle.", "Placing an order.", ...(changes.liveStock ? ["Stock at the nearest store."] : [])],
		sampleData:
			"1 vehicle (2015 Ford F-150 XLT 5.0L V8), 4 parts (one fits, one doesn't, the one that fits instead, one with no fit data), and 1 customer for the store lookup.",
	},
	"flag-returns": {
		screens: flagScreens,
		audiences: [customer],
		elements: {
			"results-title": "the number of results",
			"add-to-cart": 'the "Add to cart" button',
			"cart-title": 'the "Your cart" heading',
		},
		render: (props) => <FlagReturnsPrototype {...props} />,
		contents: [
			{
				audience: "Customer",
				device: "phone",
				screens: [
					{ name: "the search results", covers: [0, 1] },
					{ name: "a flagged part", covers: [2] },
					{ name: "the cart", covers: [] },
				],
			},
		],
		pretend: () => ["Searching.", "Placing an order."],
		sampleData: "1 search (Ford F-150 parts) and 4 parts, two of them flagged as often returned, each with its fit list.",
	},
	"checkout-check": {
		screens: checkoutScreens,
		audiences: [customer, staff],
		elements: {
			"shop-title": 'the "Popular parts" heading',
			"cart-title": 'the "Your cart" heading',
			"go-to-checkout": 'the "Go to checkout" button',
			"checkout-title": 'the "Checkout" heading',
			"place-order": 'the "Place order" button',
			"fit-message": "the fit message",
			"staff-title": 'the "Order lookup" heading',
			"look-up": 'the "Look up" button',
		},
		render: (props) => <CheckoutCheckPrototype {...props} />,
		contents: [
			{
				audience: "Customer",
				device: "phone",
				screens: [
					{ name: "the shop", covers: [] },
					{ name: "the cart", covers: [] },
					{ name: "the fit check at checkout", covers: [0, 1, 2] },
				],
			},
			{ audience: "Store staff", device: "desktop", screens: [{ name: "the store staff order lookup", covers: [] }] },
		],
		pretend: () => ["Placing the order."],
		sampleData:
			"1 vehicle (2015 Ford F-150 XLT 5.0L V8), 4 parts (one fits, one doesn't, the one that fits instead, one with no fit data), and 1 order for the store lookup.",
	},
	"fit-data": {
		screens: fitDataScreens,
		audiences: [
			{ id: "walkthrough", label: "Walkthrough", device: "desktop" },
			staff,
			{ id: "catalog", label: "Catalog team", device: "desktop" },
			customer,
		],
		elements: {
			"walkthrough-title": 'the "How the routine works" heading',
			"return-title": 'the "Return" heading',
			"note-vehicle": 'the "Note it" button',
			"weekly-title": "the weekly list's heading",
			"fit-list-title": 'the "Fits these vehicles" heading',
		},
		render: (props) => <FitDataPrototype {...props} />,
		contents: [
			{ audience: "Walkthrough", device: "desktop", screens: [{ name: "the walkthrough", covers: [0, 1, 2, 3] }] },
			{ audience: "Store staff", device: "desktop", screens: [{ name: "the return screen at the counter", covers: [0] }] },
			{ audience: "Catalog team", device: "desktop", screens: [{ name: "the catalog team's weekly list", covers: [1, 2] }] },
			{ audience: "Customer", device: "phone", screens: [{ name: "the fit list customers see", covers: [3] }] },
		],
		pretend: (changes) => ["Saving a return.", "Fixing a line in the weekly list.", ...(changes.customerReport ? ["Sending a report from the fit list."] : [])],
		sampleData: "4 returns from 3 stores on the weekly list, 2 returns at the counter (one with a saved vehicle, one without), 3 parts, and the fit list for 1 of them.",
	},
};

/** Who a screen is for, by its place in the order Sparks builds them: the audience to show it as while it's being built. */
function screenAudience(prototype: DirectionPrototype, screen: number) {
	const owners = prototype.contents.flatMap((group) => group.screens.map(() => group.audience));
	return prototype.audiences.find((audience) => audience.label === owners[screen]) ?? prototype.audiences[0];
}

export { directionPrototypes, screenAudience, type DirectionPrototype, type PrototypeContents };
