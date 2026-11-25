import * as React from "react";
import { Car, Check, ChevronLeft, CircleHelp, FileText, ScanBarcode, ShoppingCart, X } from "lucide-react";

import { AutoPartsLogo } from "@/components/brand/autoparts-logo";
import { Badge } from "@/components/data-display/badge";
import { Button } from "@/components/buttons/button";
import { scrollContainerOf } from "@/lib/motion";
import { cn } from "@/lib/utils";

/*
 * The prototype Sparks builds for "Fit check before you buy" (prds/sparks-prototype.md, "What Sparks builds"): a
 * clickable concept of an AutoParts Co. shop, built with the design system, with made-up data. Nothing is real: saving
 * a vehicle or placing an order happens on screen only ("What's pretend").
 */

/** A vehicle, as a customer describes it. */
type FitVehicle = { year: string; make: string; model: string; trim: string; engine: string };

/** How a part fits the saved vehicle: it fits, it doesn't, or the fit data doesn't cover it. */
type FitResult = "fits" | "doesnt" | "unsure";

type FitPart = {
	id: string;
	name: string;
	price: string;
	fit: FitResult;
	/** For a part that doesn't fit: the ones that do, by id. */
	fitsInstead?: string[];
	/** How often it comes back, for the flag: "1 in 6 come back". */
	returnRate?: string;
	/** Returned often enough to be flagged in search results. */
	oftenReturned?: boolean;
	/** The vehicles its fit list names. */
	fitsVehicles?: string[];
	/** Its product photo. */
	image?: string;
};

/** What the prototype runs on: made-up, shaped like AutoParts Co.'s data. */
type FitCheckData = {
	/** The vehicle the customer adds, and the options the form offers. */
	vehicle: FitVehicle;
	/** That vehicle's made-up VIN, and the past repair invoice it can be read from. */
	vin?: string;
	invoice?: string;
	options: { years: string[]; makes: string[]; models: string[]; trims: string[]; engines: string[] };
	parts: FitPart[];
	/** The part the customer opens first. */
	firstPartId: string;
	/** A customer with a saved vehicle, for a return at the counter. */
	customer: { name: string; phone: string };
	/** This week's "doesn't fit" returns, with the vehicle stores noted: what the catalog team works from. */
	returns?: { id: string; partId: string; vehicle: string; store: string }[];
	/** The search the shop opens on. */
	search?: string;
	/** Returns at the store counter: the order, the part, who bought it and whether their account has a saved vehicle. */
	counterReturns?: { order: string; partId: string; customer: string; savedVehicle: boolean }[];
};

/** The screens, in the order Sparks builds them. */
const fitCheckScreens = ["the vehicle picker", "a part that fits", "a part that doesn't fit", "the cart"];


/**
 * What Dana has changed (prds/sparks-prototype.md, "Changing it"). Each version of the prototype is one of these.
 */
type FitCheckChanges = {
	/** The fit message names the vehicle first: "2015 Ford F-150: fits". */
	vehicleFirst?: boolean;
	/** Text she typed over, or a new name for a button, by element id. */
	text?: Record<string, string>;
	/** Elements she asked to make bigger, by id. */
	larger?: string[];
	/** Live stock at the nearest store, on the product page: pretend, AutoParts Co. doesn't have it today. */
	liveStock?: boolean;
	/** Light gray text, kept against the design system's contrast standard. */
	lightText?: boolean;
	/** The fit message above the price, so it isn't missed (a fix from Evaluate). */
	fitAbovePrice?: boolean;
	/** "We're not sure this fits" offers a next step: "See the fit list", "Ask a store" (a fix from Evaluate). */
	unsureHelp?: boolean;
	/** With `unsureHelp`: "Tell me when you know" too (a follow-up while fixing it; pretend). */
	unsureNotify?: boolean;
	/** "Flag often-returned parts": the flag reads as a reminder to check the fit, not a warning (a fix from Evaluate). */
	flagReminder?: boolean;
	/** "Fit check at checkout": the fit is checked as parts go in the cart, so checkout has no surprises (a fix from Evaluate). */
	cartCheck?: boolean;
	/** "Fit check at checkout": checkout offers another vehicle besides the saved one (a fix from Evaluate). */
	otherVehicle?: boolean;
	/** "Complete fit data": the counter fills the vehicle in from the customer's account, one tap (a fix from Evaluate). */
	counterPrefill?: boolean;
	/** "Complete fit data": with no saved vehicle, the associate picks it at the counter (a fix from Evaluate). */
	counterAskVehicle?: boolean;
	/** "Flag often-returned parts": search results say how often a flagged part comes back (asked in words). */
	flagRate?: boolean;
	/** "Flag often-returned parts": the part page shows the fit list right away (asked in words). */
	fitListOpen?: boolean;
	/** "Fit check at checkout": a part that doesn't fit says which vehicles it does fit (asked in words). */
	explainFit?: boolean;
	/** "Fit check at checkout": the swap shows the price difference (asked in words). */
	swapPriceDiff?: boolean;
	/** "Complete fit data": the weekly list puts the most-returned parts first, one row per part (asked in words). */
	weeklyByCount?: boolean;
	/** "Complete fit data": the fit list lets customers say it's wrong for their vehicle (asked in words). */
	customerReport?: boolean;
};

/** The elements she can point at or type over, and how Sparks names them. */
const fitCheckElements: Record<string, string> = {
	"vehicle-title": "the \"Add your vehicle\" heading",
	"vehicle-hint": "the line under \"Add your vehicle\"",
	"save-vehicle": "the \"Save vehicle\" button",
	"fit-message": "the fit message",
	"add-to-cart": "the \"Add to cart\" button",
	"fits-instead": "\"Parts that fit your vehicle\"",
	"cart-title": "the \"Your cart\" heading",
	"place-order": "the \"Place order\" button",
};

type FitCheckPrototypeProps = {
	data: FitCheckData;
	/** The screen it opens on, by its place in `fitCheckScreens`, as it's being built; without it, where the journey starts. */
	openOn?: number;
	/** The part a product page opens on, by id, when it isn't the screen's own (Evaluate's agents: a part with no fit data). */
	openPart?: string;
	changes?: FitCheckChanges;
	/** "Edit element": a click (or Enter) on an element selects it instead of using it. */
	pointing?: boolean;
	/** The element she pointed at, by id, highlighted until she says what to change. */
	pointedAt?: string;
	onPoint?: (id: string) => void;
	/** She typed over a text, by element id: what it says now, and what it said before. */
	onTextChange?: (id: string, text: string, previous: string) => void;
};

/** What the prototype needs from the changes and the pointing, deep in its screens. */
type View = Pick<FitCheckPrototypeProps, "changes" | "onTextChange" | "pointedAt"> & { pointing?: boolean };
const ViewContext = React.createContext<View>({});

/** Props that make an element something she can point at. */
function pointable(id: string, view: View) {
	return {
		"data-point": id,
		"data-pointed": view.pointedAt === id || undefined,
		tabIndex: view.pointing ? 0 : undefined,
	};
}

/** A text she can type over, as in a document: committed when she leaves it. */
function EditableText({ id, children, className, as: Tag = "p" }: { id: string; children: string; className?: string; as?: "p" | "h2" | "span" }) {
	const view = React.useContext(ViewContext);
	const text = view.changes?.text?.[id] ?? children;
	return (
		<Tag
			{...pointable(id, view)}
			// Only where a change is taken (Prototype): in Evaluate, Review and the reviewers' page it's plain text.
			contentEditable={Boolean(view.onTextChange) && !view.pointing}
			suppressContentEditableWarning
			spellCheck={false}
			aria-label={view.onTextChange ? `${text} (you can type over it)` : undefined}
			onBlur={(event) => {
				const next = event.currentTarget.textContent?.trim() ?? "";
				if (next && next !== text) view.onTextChange?.(id, next, text);
				else event.currentTarget.textContent = text;
			}}
			onKeyDown={(event) => {
				if (event.key === "Enter") {
					event.preventDefault();
					event.currentTarget.blur();
				}
			}}
			className={cn(
				"rounded-sm outline-none focus-visible:bg-background-subtle",
				view.changes?.lightText && Tag === "p" && "text-neutral-400",
				className,
			)}
		>
			{text}
		</Tag>
	);
}

/** A button's label, size and pointing props, with her changes. */
function useButton(id: string, label: string) {
	const view = React.useContext(ViewContext);
	return {
		label: view.changes?.text?.[id] ?? label,
		props: {
			...pointable(id, view),
			className: cn(shopButton, "px-4", view.changes?.larger?.includes(id) && "h-11 px-6 text-base"),
		},
	};
}

const vehicleName = (vehicle: FitVehicle) => `${vehicle.year} ${vehicle.make} ${vehicle.model}`;

/** A part's photo, or a placeholder when there's none. */
function PartImage({ part, className }: { part: FitPart; className?: string }) {
	return part.image ? (
		<img src={part.image} alt='' className={cn("rounded-md bg-background object-contain", className)} />
	) : (
		<div aria-hidden className={cn("rounded-md bg-muted", className)} />
	);
}

/** The changes, deep in any prototype's screens. */
const useChanges = (): FitCheckChanges => React.useContext(ViewContext).changes ?? {};

/**
 * The fit message on a part: the heart of the direction. Written out, with color as a second signal. `fit` overrides
 * the part's own result, for a vehicle other than the saved one.
 */
function FitMessage({ part, vehicle, fit = part.fit }: { part: FitPart; vehicle: FitVehicle; fit?: FitResult }) {
	const view = React.useContext(ViewContext);
	const first = view.changes?.vehicleFirst;
	const larger = view.changes?.larger?.includes("fit-message") && "h-10 px-3 text-base";
	if (fit === "fits")
		return (
			<Badge {...pointable("fit-message", view)} variant='flat' tone='green' size='sm' className={cn("w-fit", larger)}>
				<Check aria-hidden />
				{first ? `${vehicleName(vehicle)}: fits` : `Fits your ${vehicleName(vehicle)}`}
			</Badge>
		);
	if (fit === "doesnt")
		return (
			<Badge {...pointable("fit-message", view)} variant='flat' tone='red' size='sm' className={cn("w-fit", larger)}>
				<X aria-hidden />
				{first ? `${vehicleName(vehicle)}: doesn't fit` : `Doesn't fit your ${vehicleName(vehicle)}`}
			</Badge>
		);
	return (
		<div className='flex flex-col gap-1'>
			<Badge {...pointable("fit-message", view)} variant='flat' tone='amber' size='sm' className={cn("w-fit", larger)}>
				<CircleHelp aria-hidden />
				{first ? `${vehicleName(vehicle)}: not sure it fits` : "We're not sure this fits"}
			</Badge>
			<p className='text-sm text-muted-foreground'>
				Our fit data doesn't cover the {vehicle.trim} {vehicle.engine} for this part yet. Check the fit list, or ask a store.
			</p>
			{view.changes?.unsureHelp ? (
				// A next step, so nobody's left stuck (pretend: nothing opens for real).
				<div className='flex flex-wrap gap-2 pt-1'>
					<Button variant='outline' size='sm' className={shopButtonSm}>
						See the fit list
					</Button>
					<Button variant='outline' size='sm' className={shopButtonSm}>
						Ask a store
					</Button>
					{view.changes.unsureNotify ? (
						<Button variant='outline' size='sm' className={shopButtonSm}>
							Tell me when you know
						</Button>
					) : null}
				</div>
			) : null}
		</div>
	);
}

/** A select in the vehicle form. */
function Field({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
	const id = React.useId();
	return (
		<div className='flex flex-col gap-1'>
			<label htmlFor={id} className='text-sm font-medium text-foreground'>
				{label}
			</label>
			<select
				id={id}
				value={value}
				onChange={(event) => onChange(event.target.value)}
				className='h-9 rounded-input border border-border bg-background px-2.5 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50'
			>
				<option value=''>Select</option>
				{options.map((option) => (
					<option key={option}>{option}</option>
				))}
			</select>
		</div>
	);
}

/** The vehicle's details, in the order the picker asks for them. */
const vehicleSteps = [
	{ key: "year", label: "Year", options: "years" },
	{ key: "make", label: "Make", options: "makes" },
	{ key: "model", label: "Model", options: "models" },
	{ key: "trim", label: "Trim", options: "trims" },
	{ key: "engine", label: "Engine", options: "engines" },
] as const;
type VehicleStep = (typeof vehicleSteps)[number];

/** "$54.99" → 54.99, for the cart's totals. */
const priceValue = (price: string) => Number(price.replace(/[^0-9.]/g, "")) || 0;
const formatPrice = (value: number) => `$${value.toFixed(2)}`;

/*
 * The shop's screens, shared by every prototype's customer view, in a big-type retail app style
 * (prds/sparks-prototype.md, "How the customer's screens look"): large tight headings, generous space, product photos on
 * a soft gray, choices as tiles instead of dropdowns, and one dark pill button per screen, pinned to the bottom on the
 * phone. In the store's colors, with its logo. `ShopScreen` is a `@container`: the desktop frame lays a part out in two
 * columns (the frame's width, not the window's).
 */

/** A screen's heading, in the shop's big type. */
const screenTitle = "text-2xl font-semibold tracking-tight text-foreground-prominent";
/** A section's heading inside a screen. */
const sectionTitle = "text-lg font-semibold text-foreground-prominent";
/** A screen's content column: centered, at most 576px on the desktop. */
const screenBody = "mx-auto flex w-full max-w-xl flex-col gap-6 px-4 pt-6 pb-8";

/** The shop's buttons keep their own lighter look: AutoParts Co.'s, not Sparks's Button (medium text, no shadow). */
const shopButton = "font-medium shadow-none";
/** The same, small. */
const shopButtonSm = cn(shopButton, "px-3 text-xs");

/** The screen's main button: a dark, full-width pill, larger when she asked for it. */
function pillClass(id?: string, larger?: string[]) {
	return cn(shopButton, "h-12 w-full rounded-full px-6 text-base", id && larger?.includes(id) && "h-14 text-lg");
}

/**
 * A screen of the shop. A new `screen` starts at its top: the device's scroll area goes back up (never the page).
 * `view` (its place in the prototype's screens) and `part` (the part it shows) say where a comment added on it is, so it
 * opens there again (`data-view`, `data-part`; `PrototypeComments`). None: it can't be opened on directly.
 */
function ShopScreen({ screen, view, part, children }: { screen: string; view?: number; part?: string; children: React.ReactNode }) {
	const ref = React.useRef<HTMLDivElement>(null);
	React.useEffect(() => {
		const root = ref.current;
		if (!root) return;
		const scroller = scrollContainerOf(root);
		if (scroller !== document.documentElement) scroller.scrollTo({ top: 0 });
	}, [screen]);
	return (
		<div ref={ref} data-view={view} data-part={part} className='@container flex flex-1 flex-col'>
			{children}
		</div>
	);
}

/**
 * The store's header, sticky at the top: the logo and the cart. With a vehicle, a bar under it says which one parts are
 * checked against, with "Change" when it can be changed.
 */
function ShopHeader({
	cart,
	onCart,
	vehicle,
	onChangeVehicle,
}: {
	cart: number;
	onCart?: () => void;
	vehicle?: FitVehicle;
	onChangeVehicle?: () => void;
}) {
	return (
		<div className='sticky top-0 z-20 bg-background'>
			<header className='flex items-center justify-between gap-3 px-4 py-3 @3xl:px-10'>
				{/* The store's own logo: sparks.ds "AutoParts Logo" (73:5941), 30px tall. */}
				<AutoPartsLogo className='h-7.5' />
				<button
					type='button'
					aria-label={`Cart, ${cart} items`}
					onClick={onCart}
					className='relative grid size-10 place-items-center rounded-full text-icon hover:bg-background-subtle'
				>
					<ShoppingCart className='size-5' aria-hidden />
					{cart ? (
						<span className='absolute top-1 right-1 grid size-4 place-items-center rounded-full bg-neutral text-[10px] font-semibold text-neutral-foreground'>
							{cart}
						</span>
					) : null}
				</button>
			</header>
			{vehicle ? (
				// `data-agent`: where Evaluate's scenarios can go that she can't point at (prds/sparks-validate.md, "Running it").
				<div data-agent='vehicle-chip' className='flex items-center justify-between gap-3 bg-background-subtle px-4 py-2.5 text-sm @3xl:px-10'>
					<span className='flex min-w-0 items-center gap-2 text-foreground'>
						<Car className='size-4 shrink-0 text-icon' aria-hidden />
						<span className='truncate'>
							<span className='font-medium'>{vehicleName(vehicle)}</span>{" "}
							<span className='text-muted-foreground'>{[vehicle.trim, vehicle.engine].filter(Boolean).join(" · ")}</span>
						</span>
					</span>
					{onChangeVehicle ? (
						<button
							type='button'
							onClick={onChangeVehicle}
							className='shrink-0 font-medium text-foreground underline underline-offset-4 hover:text-muted-foreground'
						>
							Change
						</button>
					) : null}
				</div>
			) : null}
		</div>
	);
}

/** "Back", to the screen before. */
function BackLink({ onClick }: { onClick: () => void }) {
	return (
		<button type='button' onClick={onClick} className='-ms-1 flex w-fit items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground'>
			<ChevronLeft className='size-4' aria-hidden /> Back
		</button>
	);
}

/** The bottom bar holding a screen's main button: pinned to the bottom on the phone, in the flow on the desktop. */
function ActionBar({ children, className }: { children: React.ReactNode; className?: string }) {
	return (
		<div
			className={cn(
				"sticky bottom-0 z-10 mt-auto border-t border-border bg-background px-4 pt-3 pb-4 @3xl:static @3xl:border-0 @3xl:bg-transparent @3xl:pb-10",
				className,
			)}
		>
			<div className='mx-auto flex w-full max-w-xl flex-col items-center gap-2'>{children}</div>
		</div>
	);
}

/** A part's photo on a soft gray tile, the photo's white melting into it. */
function PartPhoto({ part, className, imageClassName }: { part: FitPart; className?: string; imageClassName?: string }) {
	return (
		<span className={cn("block shrink-0 overflow-hidden rounded-lg bg-background-subtle", className)}>
			<PartImage part={part} className={cn("size-full rounded-none bg-transparent p-2 mix-blend-multiply", imageClassName)} />
		</span>
	);
}

/** A part as a card: its photo, the name and the price, opening it when `onOpen` is given; `children` go under it. */
function PartCard({ part, onOpen, children }: { part: FitPart; onOpen?: () => void; children?: React.ReactNode }) {
	const content = (
		<>
			<PartPhoto
				part={part}
				className='aspect-square w-full group-focus-visible:ring-[3px] group-focus-visible:ring-ring/50'
				imageClassName='p-3 transition-transform group-hover:scale-[1.03] motion-reduce:transition-none'
			/>
			<span className='flex flex-col'>
				<span className='line-clamp-2 text-sm font-medium text-foreground'>{part.name}</span>
				<span className='text-sm text-muted-foreground'>{part.price}</span>
			</span>
		</>
	);
	return (
		<div className='flex flex-col gap-2'>
			{onOpen ? (
				<button type='button' onClick={onOpen} className='group flex flex-col gap-2 text-left outline-none'>
					{content}
				</button>
			) : (
				<div className='flex flex-col gap-2'>{content}</div>
			)}
			{children}
		</div>
	);
}

/**
 * A part as a row: its photo on the left, then the name, the price and `children` (a fit message, a flag). Opens it when
 * `onOpen` is given (then `children` can't hold buttons).
 */
function PartRow({ part, onOpen, children }: { part: FitPart; onOpen?: () => void; children?: React.ReactNode }) {
	const content = (
		<>
			<PartPhoto part={part} className='size-24' />
			<span className='flex min-w-0 flex-1 flex-col gap-1.5'>
				<span className='text-base font-medium text-foreground'>{part.name}</span>
				<span className='text-sm text-muted-foreground'>{part.price}</span>
				{children}
			</span>
		</>
	);
	return onOpen ? (
		<button type='button' onClick={onOpen} className='flex w-full items-start gap-4 rounded-lg text-left outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50'>
			{content}
		</button>
	) : (
		<div className='flex items-start gap-4'>{content}</div>
	);
}

/** The cart's totals: subtotal, pickup and total. */
function CartTotals({ parts }: { parts: FitPart[] }) {
	const subtotal = parts.reduce((sum, part) => sum + priceValue(part.price), 0);
	return (
		<dl className='flex flex-col gap-2 border-t border-border pt-5 text-base'>
			<div className='flex justify-between'>
				<dt className='text-muted-foreground'>Subtotal</dt>
				<dd className='text-foreground'>{formatPrice(subtotal)}</dd>
			</div>
			<div className='flex justify-between'>
				<dt className='text-muted-foreground'>Pickup at Store 214</dt>
				<dd className='text-foreground'>Free</dd>
			</div>
			<div className='flex justify-between border-t border-border pt-3 font-semibold'>
				<dt className='text-foreground-prominent'>Total</dt>
				<dd className='text-foreground-prominent'>{formatPrice(subtotal)}</dd>
			</div>
		</dl>
	);
}

/** "Your cart", with how many items and what they come to. */
function CartHeading({ parts }: { parts: FitPart[] }) {
	const total = parts.reduce((sum, part) => sum + priceValue(part.price), 0);
	return (
		<div className='flex flex-col gap-1'>
			<EditableText as='h2' id='cart-title' className={screenTitle}>
				Your cart
			</EditableText>
			<span className='text-base text-muted-foreground'>
				{parts.length === 1 ? "1 item" : `${parts.length} items`}
				{parts.length ? ` · ${formatPrice(total)}` : ""}
			</span>
		</div>
	);
}

/** The pretend order confirmation, with "Keep shopping". */
function OrderPlaced({ onDone }: { onDone: () => void }) {
	return (
		<>
			<div className='mx-auto flex w-full max-w-xl flex-1 flex-col items-center justify-center gap-4 px-4 py-12 text-center'>
				<span className='grid size-14 place-items-center rounded-full bg-neutral text-neutral-foreground'>
					<Check className='size-7' aria-hidden />
				</span>
				<h2 className={screenTitle}>Order placed</h2>
				<p className='text-base text-muted-foreground'>This is pretend: nothing was ordered, and no one was charged.</p>
			</div>
			<ActionBar>
				<Button variant='outline' className={pillClass()} onClick={onDone}>
					Keep shopping
				</Button>
			</ActionBar>
		</>
	);
}

/**
 * A part's page: its photo edge to edge on the phone (beside the details on the desktop), the details, then `after`
 * (other parts). `action`, the main button, sits with the details on the desktop and is pinned to the bottom on the phone.
 */
function PartLayout({ part, children, action, after }: { part: FitPart; children: React.ReactNode; action: React.ReactNode; after?: React.ReactNode }) {
	return (
		<>
			<div className='flex flex-col @3xl:grid @3xl:grid-cols-2 @3xl:gap-10 @3xl:px-10 @3xl:pt-6'>
				<PartPhoto part={part} className='aspect-square w-full rounded-none @3xl:rounded-card' imageClassName='p-8' />
				<div className='flex flex-col gap-6 px-4 pt-5 pb-8 @3xl:px-0 @3xl:pt-0'>
					{children}
					<div className='hidden @3xl:block'>{action}</div>
				</div>
			</div>
			{after}
			<ActionBar className='@3xl:hidden'>{action}</ActionBar>
		</>
	);
}

/** A row of part cards that scrolls sideways on the phone, a grid on the desktop. */
function PartCarousel({ title, parts, onOpen }: { title: string; parts: FitPart[]; onOpen: (id: string) => void }) {
	if (!parts.length) return null;
	return (
		<section className='flex flex-col gap-3 pb-8 @3xl:px-10'>
			<h3 className={cn(sectionTitle, "px-4 @3xl:px-0")}>{title}</h3>
			<ul className='scrollbar-subtle flex snap-x gap-3 overflow-x-auto px-4 pb-1 @3xl:grid @3xl:grid-cols-4 @3xl:px-0'>
				{parts.map((p) => (
					<li key={p.id} className='w-36 shrink-0 snap-start @3xl:w-auto'>
						<PartCard part={p} onOpen={() => onOpen(p.id)} />
					</li>
				))}
			</ul>
		</section>
	);
}

/** One choice as a tile: bordered, the chosen one outlined in the text color. */
function choiceClass(chosen: boolean) {
	return cn(
		"rounded-lg border text-sm font-medium text-foreground transition-colors outline-none hover:border-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 motion-reduce:transition-none",
		chosen ? "border-foreground ring-1 ring-foreground" : "border-border",
	);
}

/**
 * The vehicle picker: one detail at a time, as tiles; picking one moves to the next. What's picked shows above as chips,
 * and selecting one asks that detail again. With every detail picked, the vehicle shows as it'll be saved.
 */
function VehiclePicker({
	options,
	steps = vehicleSteps,
	value,
	onChange,
}: {
	options: FitCheckData["options"];
	steps?: readonly VehicleStep[];
	value: Partial<FitVehicle>;
	onChange: (value: Partial<FitVehicle>) => void;
}) {
	const [asking, setAsking] = React.useState<keyof FitVehicle>();
	const current = steps.find((step) => step.key === asking) ?? steps.find((step) => !value[step.key]);
	const picked = steps.filter((step) => value[step.key]);
	return (
		<div className='flex flex-col gap-6'>
			{picked.length ? (
				<ul aria-label='Your vehicle so far' className='flex flex-wrap gap-2'>
					{picked.map((step) => (
						<li key={step.key}>
							<button
								type='button'
								aria-label={`${step.label}: ${value[step.key]}. Change`}
								aria-current={current?.key === step.key ? "step" : undefined}
								onClick={() => setAsking(step.key)}
								className={cn(
									"flex h-9 items-center rounded-full border px-3.5 text-sm font-medium text-foreground hover:border-border-defined",
									current?.key === step.key ? "border-foreground" : "border-border bg-background-subtle",
								)}
							>
								{value[step.key]}
							</button>
						</li>
					))}
				</ul>
			) : null}
			{current ? (
				<fieldset className='flex flex-col'>
					<legend className='flex w-full items-baseline justify-between pb-3'>
						<span className={sectionTitle}>{current.label}</span>
						<span className='text-sm text-muted-foreground'>
							{steps.indexOf(current) + 1} of {steps.length}
						</span>
					</legend>
					<div className={cn("grid gap-2", current.key === "year" || current.key === "trim" ? "grid-cols-3" : "grid-cols-2")}>
						{options[current.options].map((option) => (
							<button
								key={option}
								type='button'
								aria-pressed={value[current.key] === option}
								onClick={() => {
									onChange({ ...value, [current.key]: option });
									setAsking(undefined);
								}}
								className={cn("h-12 px-3", choiceClass(value[current.key] === option))}
							>
								{option}
							</button>
						))}
					</div>
				</fieldset>
			) : (
				<div className='flex items-center gap-4 rounded-card bg-background-subtle p-4'>
					<span className='grid size-12 shrink-0 place-items-center rounded-full bg-background'>
						<Car className='size-6 text-icon' aria-hidden />
					</span>
					<span className='flex flex-col'>
						<span className='text-base font-semibold text-foreground-prominent'>{vehicleName(value as FitVehicle)}</span>
						{value.trim || value.engine ? (
							<span className='text-sm text-muted-foreground'>{[value.trim, value.engine].filter(Boolean).join(" · ")}</span>
						) : null}
					</span>
				</div>
			)}
		</div>
	);
}

/** How the vehicle is added besides picking its details: with its VIN, or from a past repair invoice. Both are pretend. */
type VehicleWay = "vin" | "invoice";
const vehicleWays = [
	{ way: "vin", label: "Enter your VIN", icon: ScanBarcode },
	{ way: "invoice", label: "Upload an invoice", icon: FileText },
] as const;

/** A VIN: 17 letters and numbers, never I, O or Q. */
const isVin = (text: string) => /^[A-HJ-NPR-Z0-9]{17}$/i.test(text.trim());

/** The VIN, typed. Any valid one reads as the sample vehicle. */
function VinField({ value, onChange }: { value: string; onChange: (value: string) => void }) {
	const id = React.useId();
	const wrong = value.length === 17 && !isVin(value);
	return (
		<div className='flex flex-col gap-2'>
			<label htmlFor={id} className={sectionTitle}>
				VIN
			</label>
			<input
				id={id}
				value={value}
				maxLength={17}
				autoComplete='off'
				spellCheck={false}
				aria-invalid={wrong || undefined}
				aria-describedby={`${id}-hint`}
				onChange={(event) => onChange(event.target.value.toUpperCase().trim())}
				className='h-12 w-full rounded-lg border border-border bg-background px-4 text-base text-foreground outline-none focus-visible:border-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive'
			/>
			<p id={`${id}-hint`} aria-live='polite' className='text-sm text-muted-foreground'>
				{wrong
					? "That isn't a VIN: it never has the letters I, O or Q. Check it and try again."
					: "17 letters and numbers, on the driver's side door or your insurance card."}
			</p>
		</div>
	);
}

/** The customer's shop: add a vehicle, open parts and see whether they fit, the cart and a pretend order. */
function CustomerShop({ data, openOn, openPart }: { data: FitCheckData; openOn?: number; openPart?: string }) {
	const [vehicle, setVehicle] = React.useState<Partial<FitVehicle>>({});
	const [way, setWay] = React.useState<VehicleWay>();
	const [vin, setVin] = React.useState("");
	const [saved, setSaved] = React.useState<FitVehicle | null>(openOn || openPart ? data.vehicle : null);
	const [partId, setPartId] = React.useState(
		() => openPart ?? (openOn === 2 ? data.parts.find((p) => p.fit === "doesnt")?.id : undefined) ?? data.firstPartId,
	);
	const [cart, setCart] = React.useState<string[]>(openOn === 3 ? [data.firstPartId] : []);
	const [view, setView] = React.useState<"part" | "cart" | "ordered">(openOn === 3 ? "cart" : "part");

	const changes = React.useContext(ViewContext).changes;
	const saveButton = useButton("save-vehicle", "Save vehicle");
	const cartButton = useButton("add-to-cart", "Add to cart");
	const orderButton = useButton("place-order", "Place order");
	const part = data.parts.find((p) => p.id === partId) ?? data.parts[0];
	const complete = vehicleSteps.every((step) => vehicle[step.key]);
	const typeVin = (text: string) => {
		setVin(text);
		setVehicle(isVin(text) ? data.vehicle : {});
	};
	const startOver = () => {
		setWay(undefined);
		setVin("");
		setVehicle({});
	};
	const cartParts = cart.map((id) => data.parts.find((p) => p.id === id)!);
	const header = (
		<ShopHeader
			cart={cart.length}
			onCart={() => saved && setView("cart")}
			vehicle={saved ?? undefined}
			onChangeVehicle={() => {
				setWay(undefined);
				setVin("");
				setSaved(null);
			}}
		/>
	);

	// 1. The vehicle picker.
	if (!saved)
		return (
			<ShopScreen screen='vehicle' view={0}>
				{header}
				<div className={screenBody}>
					<div className='flex flex-col gap-2'>
						<EditableText as='h2' id='vehicle-title' className={screenTitle}>
							Add your vehicle
						</EditableText>
						<EditableText id='vehicle-hint' className='text-base text-muted-foreground'>
							Add it once, and every part shows whether it fits.
						</EditableText>
					</div>
					{way ? (
						<BackLink onClick={startOver} />
					) : (
						<div className='grid grid-cols-2 gap-2'>
							{vehicleWays.map(({ way: id, label, icon: Icon }) => (
								<button
									key={id}
									type='button'
									onClick={() => {
										setWay(id);
										// The invoice is pretend: choosing it reads the sample one.
										setVehicle(id === "invoice" ? data.vehicle : {});
									}}
									className={cn("flex flex-col items-start gap-2 p-4 text-left", choiceClass(false))}
								>
									<Icon className='size-5 text-icon' aria-hidden />
									{label}
								</button>
							))}
							<p className='col-span-2 pt-2 text-sm text-muted-foreground'>Or pick its details:</p>
						</div>
					)}
					{way === "vin" ? <VinField value={vin} onChange={typeVin} /> : null}
					{way && complete ? (
						<p role='status' className='text-base text-foreground'>
							{way === "vin" ? "From your VIN. Is this your vehicle?" : `From ${data.invoice ?? "your invoice"}. Is this your vehicle?`}
						</p>
					) : null}
					{way === "vin" && !complete ? null : <VehiclePicker options={data.options} value={vehicle} onChange={setVehicle} />}
				</div>
				<ActionBar>
					<Button
						{...saveButton.props}
						variant='neutral'
						className={pillClass("save-vehicle", changes?.larger)}
						disabled={!complete}
						onClick={() => setSaved(vehicle as FitVehicle)}
					>
						{saveButton.label}
					</Button>
					{way === "invoice" ? null : (
						<button
							type='button'
							onClick={() => (way === "vin" ? typeVin(data.vin ?? "") : setVehicle(data.vehicle))}
							className='h-9 text-sm font-medium text-foreground underline underline-offset-4 hover:text-muted-foreground'
						>
							{way === "vin" ? "Use a sample VIN" : "Use a sample vehicle"}
						</button>
					)}
				</ActionBar>
			</ShopScreen>
		);

	// 4. The pretend order.
	if (view === "ordered")
		return (
			<ShopScreen screen='ordered'>
				{header}
				<OrderPlaced
					onDone={() => {
						setCart([]);
						setView("part");
					}}
				/>
			</ShopScreen>
		);

	// 4. The cart.
	if (view === "cart")
		return (
			<ShopScreen screen='cart' view={3}>
				{header}
				<div className={screenBody}>
					<BackLink onClick={() => setView("part")} />
					<CartHeading parts={cartParts} />
					{cart.length === 0 ? (
						<p className='text-base text-muted-foreground'>Your cart is empty.</p>
					) : (
						<>
							<ul className='flex flex-col gap-5'>
								{cartParts.map((item) => (
									<li key={item.id}>
										<PartRow part={item}>
											<FitMessage part={item} vehicle={saved} />
										</PartRow>
									</li>
								))}
							</ul>
							<CartTotals parts={cartParts} />
						</>
					)}
				</div>
				<ActionBar>
					<Button
						{...orderButton.props}
						variant='neutral'
						className={pillClass("place-order", changes?.larger)}
						disabled={cart.length === 0}
						onClick={() => setView("ordered")}
					>
						{orderButton.label}
					</Button>
				</ActionBar>
			</ShopScreen>
		);

	// 2–3. A part, with whether it fits; and the other parts to open.
	return (
		<ShopScreen screen={`part-${part.id}`} view={part.fit === "doesnt" ? 2 : 1} part={part.id}>
			{header}
			<PartLayout
				part={part}
				action={
					<Button
						{...cartButton.props}
						variant='neutral'
						className={pillClass("add-to-cart", changes?.larger)}
						disabled={part.fit === "doesnt" || cart.includes(part.id)}
						onClick={() => setCart((c) => [...c, part.id])}
					>
						{cart.includes(part.id) ? "In your cart" : part.fit === "doesnt" ? "Doesn't fit your vehicle" : cartButton.label}
					</Button>
				}
				after={
					<PartCarousel
						title='Other parts'
						parts={data.parts.filter((p) => p.id !== part.id && !part.fitsInstead?.includes(p.id))}
						onOpen={setPartId}
					/>
				}
			>
				<div className='flex flex-col gap-3'>
					<div className='flex flex-col gap-1'>
						<h2 className={screenTitle}>{part.name}</h2>
						{changes?.fitAbovePrice ? null : <span className='text-lg text-foreground'>{part.price}</span>}
					</div>
					<FitMessage part={part} vehicle={saved} />
					{changes?.fitAbovePrice ? <span className='text-lg text-foreground'>{part.price}</span> : null}
					{changes?.liveStock && part.fit !== "doesnt" ? (
						// Pretend: AutoParts Co. doesn't have live stock by store today.
						<span className='text-sm text-foreground'>In stock at Store 214, 2.1 miles away</span>
					) : null}
				</div>
				{part.fit === "doesnt" && part.fitsInstead?.length ? (
					<section className='flex flex-col gap-3'>
						<EditableText as='span' id='fits-instead' className={sectionTitle}>
							{`Parts that fit your ${vehicleName(saved)}`}
						</EditableText>
						<ul className='flex flex-col gap-3'>
							{part.fitsInstead.map((id) => {
								const other = data.parts.find((p) => p.id === id)!;
								return (
									<li key={id}>
										<button
											type='button'
											onClick={() => setPartId(id)}
											className='flex w-full items-center gap-4 rounded-card border border-border p-3 text-left outline-none hover:border-border-defined focus-visible:ring-[3px] focus-visible:ring-ring/50'
										>
											<PartPhoto part={other} className='size-16' imageClassName='p-1.5' />
											<span className='flex min-w-0 flex-1 flex-col gap-1'>
												<span className='text-sm font-medium text-foreground'>{other.name}</span>
												<span className='text-sm text-muted-foreground'>{other.price}</span>
											</span>
											<Badge variant='flat' tone='green' size='xs'>
												<Check aria-hidden />
												Fits
											</Badge>
										</button>
									</li>
								);
							})}
						</ul>
					</section>
				) : null}
			</PartLayout>
		</ShopScreen>
	);
}

/** What every prototype takes for changing it: her changes, pointing, and typing over text. */
type PrototypeViewProps = Pick<FitCheckPrototypeProps, "changes" | "pointing" | "pointedAt" | "onPoint" | "onTextChange">;

/**
 * The frame every prototype's screens sit in: pointing (a click or Enter selects instead of using) and what she can
 * type over. The line that says nothing is real is outside the device, under it (`PrototypePanel`).
 */
function PrototypeFrame({ changes, pointing, pointedAt, onPoint, onTextChange, children }: PrototypeViewProps & { children: React.ReactNode }) {
	// Pointing: a click or Enter on a pointable element selects it instead of using it (prds/sparks-prototype.md,
	// "Changing it"; "Accessibility": Tab moves between elements, Enter selects one).
	const select = (event: React.SyntheticEvent) => {
		if (!pointing) return;
		const target = (event.target as HTMLElement).closest<HTMLElement>("[data-point]");
		event.preventDefault();
		event.stopPropagation();
		if (target?.dataset.point) onPoint?.(target.dataset.point);
	};
	return (
		<ViewContext.Provider value={{ changes, onTextChange, pointedAt, pointing }}>
		<div
			data-pointing={pointing || undefined}
			onClickCapture={select}
			onKeyDownCapture={(event) => (event.key === "Enter" ? select(event) : undefined)}
			className={cn(
				"flex min-h-full flex-col bg-background text-foreground",
				// What she can point at shows on hover and focus; what she pointed at stays outlined.
				"[&_[data-pointed]]:outline-2 [&_[data-pointed]]:outline-offset-2 [&_[data-pointed]]:outline-sparks-accent",
				pointing && "cursor-crosshair [&_[data-point]:focus-visible]:outline-2 [&_[data-point]:focus-visible]:outline-offset-2 [&_[data-point]:focus-visible]:outline-sparks-accent [&_[data-point]:hover]:outline-2 [&_[data-point]:hover]:outline-offset-2 [&_[data-point]:hover]:outline-sparks-accent/60",
			)}
		>
			{children}
		</div>
		</ViewContext.Provider>
	);
}

/** The prototype for "Fit check before you buy": the customer's shop, its only audience. */
function FitCheckPrototype({ data, openOn, openPart, ...view }: FitCheckPrototypeProps) {
	return (
		<PrototypeFrame {...view}>
			<CustomerShop data={data} openOn={openOn} openPart={openPart} />
		</PrototypeFrame>
	);
}

export {
	ActionBar,
	BackLink,
	CartHeading,
	CartTotals,
	choiceClass,
	OrderPlaced,
	PartCard,
	PartCarousel,
	PartLayout,
	PartPhoto,
	PartRow,
	pillClass,
	shopButton,
	shopButtonSm,
	screenBody,
	screenTitle,
	sectionTitle,
	ShopHeader,
	ShopScreen,
	VehiclePicker,
	vehicleSteps,
	EditableText,
	PartImage,
	Field,
	FitMessage,
	PrototypeFrame,
	useButton,
	useChanges,
	vehicleName,
	type PrototypeViewProps,
	FitCheckPrototype,
	fitCheckElements,
	fitCheckScreens,
	type FitCheckChanges,
	type FitCheckData,
	type FitCheckPrototypeProps,
	type FitPart,
	type FitResult,
	type FitVehicle,
};
