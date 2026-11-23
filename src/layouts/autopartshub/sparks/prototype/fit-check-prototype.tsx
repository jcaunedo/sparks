import * as React from "react";
import { Check, ChevronLeft, CircleHelp, Search, ShoppingCart, TriangleAlert, X } from "lucide-react";

import { AutoPartsLogo } from "@/components/brand/autoparts-logo";
import { Badge } from "@/components/data-display/badge";
import { Button } from "@/components/buttons/button";
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
	options: { years: string[]; makes: string[]; models: string[]; trims: string[]; engines: string[] };
	parts: FitPart[];
	/** The part the customer opens first. */
	firstPartId: string;
	/** The customer a store associate looks up. */
	customer: { name: string; phone: string };
	/** This week's "doesn't fit" returns, with the vehicle stores noted: what the catalog team works from. */
	returns?: { id: string; partId: string; vehicle: string; store: string }[];
	/** The search the shop opens on. */
	search?: string;
	/** Returns at the store counter: the order, the part, who bought it and whether their account has a saved vehicle. */
	counterReturns?: { order: string; partId: string; customer: string; savedVehicle: boolean }[];
};

/** The screens, in the order Sparks builds them (each one clickable as soon as it's ready). */
const fitCheckScreens = ["the vehicle picker", "a part that fits", "a part that doesn't fit", "the cart", "the store staff lookup"];

type FitCheckAudience = "customer" | "staff";

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
	"staff-title": "the \"Customer lookup\" heading",
	"look-up": "the \"Look up\" button",
};

type FitCheckPrototypeProps = {
	data: FitCheckData;
	audience: FitCheckAudience;
	/** How many of `fitCheckScreens` are built: the rest show as being built. */
	readyScreens: number;
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
			contentEditable={!view.pointing}
			suppressContentEditableWarning
			spellCheck={false}
			aria-label={`${text} (you can type over it)`}
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
			className: cn("rounded-button-lg", view.changes?.larger?.includes(id) && "h-11 px-6 text-base"),
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

/** A screen that isn't built yet. */
function Building({ screen }: { screen: string }) {
	return (
		<div className='flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center'>
			<div className='h-2 w-40 overflow-hidden rounded-full bg-muted'>
				<div className='h-full w-1/2 animate-pulse rounded-full bg-sparks-accent/40' />
			</div>
			<p className='text-sm text-muted-foreground'>Building {screen}…</p>
		</div>
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
					<Button variant='outline' size='sm' className='rounded-button-md'>
						See the fit list
					</Button>
					<Button variant='outline' size='sm' className='rounded-button-md'>
						Ask a store
					</Button>
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

/** The customer's shop: add a vehicle, open parts and see whether they fit, the cart and a pretend order. */
function CustomerShop({ data, readyScreens }: { data: FitCheckData; readyScreens: number }) {
	const [vehicle, setVehicle] = React.useState<Partial<FitVehicle>>({});
	const [saved, setSaved] = React.useState<FitVehicle | null>(null);
	const [partId, setPartId] = React.useState(data.firstPartId);
	const [cart, setCart] = React.useState<string[]>([]);
	const [view, setView] = React.useState<"part" | "cart" | "ordered">("part");

	const changes = React.useContext(ViewContext).changes;
	const saveButton = useButton("save-vehicle", "Save vehicle");
	const cartButton = useButton("add-to-cart", "Add to cart");
	const orderButton = useButton("place-order", "Place order");
	const part = data.parts.find((p) => p.id === partId) ?? data.parts[0];
	const screenFor = (fit: FitResult) => (fit === "doesnt" ? 2 : 1);
	const complete = (["year", "make", "model", "trim", "engine"] as const).every((key) => vehicle[key]);

	// Sticky: the store's header stays at the top while the page scrolls under it.
	const header = (
		<header className='sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-border bg-background px-4 py-3'>
			{/* The store's own logo: sparks.ds "AutoParts Logo" (73:5941), 20px tall. */}
			<AutoPartsLogo className='h-5' />
			<div className='flex items-center gap-2'>
				{saved ? (
					<button
						type='button'
						onClick={() => setSaved(null)}
						className='rounded-full bg-background-subtle px-2.5 py-1 text-xs font-medium text-foreground hover:bg-muted'
					>
						{vehicleName(saved)} · Change
					</button>
				) : null}
				<button
					type='button'
					aria-label={`Cart, ${cart.length} items`}
					onClick={() => saved && readyScreens > 3 && setView("cart")}
					className='relative grid size-8 place-items-center rounded-full text-icon hover:bg-background-subtle'
				>
					<ShoppingCart className='size-4' aria-hidden />
					{cart.length ? (
						<span className='absolute -top-0.5 -right-0.5 grid size-4 place-items-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground'>
							{cart.length}
						</span>
					) : null}
				</button>
			</div>
		</header>
	);

	// 1. The vehicle picker.
	if (!saved)
		return (
			<>
				{header}
				{readyScreens < 1 ? (
					<Building screen={fitCheckScreens[0]} />
				) : (
					<div className='flex flex-col gap-4 p-4'>
						<div className='flex flex-col gap-1'>
							<EditableText as='h2' id='vehicle-title' className='text-lg font-semibold text-foreground-prominent'>
								Add your vehicle
							</EditableText>
							<EditableText id='vehicle-hint' className='text-sm text-muted-foreground'>
								Add it once, and every part shows whether it fits.
							</EditableText>
						</div>
						<div className='grid grid-cols-2 gap-3'>
							<Field label='Year' value={vehicle.year ?? ""} options={data.options.years} onChange={(year) => setVehicle((v) => ({ ...v, year }))} />
							<Field label='Make' value={vehicle.make ?? ""} options={data.options.makes} onChange={(make) => setVehicle((v) => ({ ...v, make }))} />
							<Field label='Model' value={vehicle.model ?? ""} options={data.options.models} onChange={(model) => setVehicle((v) => ({ ...v, model }))} />
							<Field label='Trim' value={vehicle.trim ?? ""} options={data.options.trims} onChange={(trim) => setVehicle((v) => ({ ...v, trim }))} />
							<div className='col-span-2'>
								<Field label='Engine' value={vehicle.engine ?? ""} options={data.options.engines} onChange={(engine) => setVehicle((v) => ({ ...v, engine }))} />
							</div>
						</div>
						<div className='flex flex-wrap gap-2'>
							<Button {...saveButton.props} disabled={!complete} onClick={() => setSaved(vehicle as FitVehicle)}>
								{saveButton.label}
							</Button>
							<Button variant='ghost' className='rounded-button-lg' onClick={() => setVehicle(data.vehicle)}>
								Use a sample vehicle
							</Button>
						</div>
					</div>
				)}
			</>
		);

	// 4. The cart, and the pretend order.
	if (view === "cart" || view === "ordered")
		return (
			<>
				{header}
				{view === "ordered" ? (
					<div className='flex flex-col items-start gap-3 p-4'>
						<h2 className='text-lg font-semibold text-foreground-prominent'>Order placed</h2>
						<p className='text-sm text-muted-foreground'>This is pretend: nothing was ordered, and no one was charged.</p>
						<Button variant='outline' className='rounded-button-lg' onClick={() => { setCart([]); setView("part"); }}>
							Keep shopping
						</Button>
					</div>
				) : (
					<div className='flex flex-col gap-4 p-4'>
						<button type='button' onClick={() => setView("part")} className='flex w-fit items-center gap-1 text-sm text-muted-foreground hover:text-foreground'>
							<ChevronLeft className='size-4' aria-hidden /> Back
						</button>
						<EditableText as='h2' id='cart-title' className='text-lg font-semibold text-foreground-prominent'>
							Your cart
						</EditableText>
						{cart.length === 0 ? (
							<p className='text-sm text-muted-foreground'>Your cart is empty.</p>
						) : (
							<ul className='flex flex-col divide-y divide-border border-y border-border'>
								{cart.map((id) => {
									const item = data.parts.find((p) => p.id === id)!;
									return (
										<li key={id} className='flex items-start justify-between gap-3 py-3'>
											<div className='flex flex-col gap-1.5'>
												<span className='text-sm font-semibold text-foreground'>{item.name}</span>
												<FitMessage part={item} vehicle={saved} />
											</div>
											<span className='text-sm text-muted-foreground'>{item.price}</span>
										</li>
									);
								})}
							</ul>
						)}
						<Button {...orderButton.props} disabled={cart.length === 0} onClick={() => setView("ordered")}>
							{orderButton.label}
						</Button>
					</div>
				)}
			</>
		);

	// 2–3. A part, with whether it fits; and the other parts to open.
	return (
		<>
			{header}
			{readyScreens <= screenFor(part.fit) ? (
				<Building screen={fitCheckScreens[screenFor(part.fit)]} />
			) : (
				<div className='flex flex-col gap-4 p-4'>
					<PartImage part={part} className='aspect-[4/3] w-full' />
					<div className='flex flex-col gap-2'>
						<h2 className='text-lg font-semibold text-foreground-prominent'>{part.name}</h2>
						{changes?.fitAbovePrice ? <FitMessage part={part} vehicle={saved} /> : null}
						<span className='text-sm text-muted-foreground'>{part.price}</span>
						{changes?.fitAbovePrice ? null : <FitMessage part={part} vehicle={saved} />}
						{changes?.liveStock && part.fit !== "doesnt" ? (
							// Pretend: AutoParts Co. doesn't have live stock by store today.
							<span className='text-sm text-foreground'>In stock at Store 214, 2.1 miles away</span>
						) : null}
					</div>
					{part.fit === "doesnt" && part.fitsInstead?.length ? (
						<div className='flex flex-col gap-2 rounded-md bg-background-subtle p-3'>
							<EditableText as='span' id='fits-instead' className='text-sm font-semibold text-foreground'>
								{`Parts that fit your ${vehicleName(saved)}`}
							</EditableText>
							{part.fitsInstead.map((id) => {
								const other = data.parts.find((p) => p.id === id)!;
								return (
									<button key={id} type='button' onClick={() => setPartId(id)} className='flex items-center justify-between gap-2 text-left text-sm text-foreground underline-offset-4 hover:underline'>
										{other.name} <span className='text-muted-foreground'>{other.price}</span>
									</button>
								);
							})}
						</div>
					) : null}
					<Button
						{...cartButton.props}
						disabled={part.fit === "doesnt" || cart.includes(part.id)}
						onClick={() => setCart((c) => [...c, part.id])}
					>
						{cart.includes(part.id) ? "In your cart" : part.fit === "doesnt" ? "Doesn't fit your vehicle" : cartButton.label}
					</Button>
					<div className='flex flex-col gap-2 border-t border-border pt-3'>
						<span className='text-sm font-semibold text-foreground'>Other parts</span>
						<ul className='flex flex-col gap-1'>
							{data.parts
								.filter((p) => p.id !== part.id)
								.map((p) => (
									<li key={p.id}>
										<button type='button' onClick={() => setPartId(p.id)} className='flex w-full items-center justify-between gap-2 rounded-md px-2 py-1.5 text-left text-sm text-foreground hover:bg-background-subtle'>
											{p.name}
											<span className='text-muted-foreground'>{p.price}</span>
										</button>
									</li>
								))}
						</ul>
					</div>
				</div>
			)}
		</>
	);
}

/** What a store associate sees at the counter: the customer's saved vehicle, and whether a part fits it. */
function StaffLookup({ data, readyScreens }: { data: FitCheckData; readyScreens: number }) {
	const [found, setFound] = React.useState(false);
	const [checked, setChecked] = React.useState<string | null>(null);
	const lookUp = useButton("look-up", "Look up");
	if (readyScreens < 5) return <Building screen={fitCheckScreens[4]} />;
	const part = data.parts.find((p) => p.id === checked);
	return (
		<div className='flex flex-col gap-4 p-4'>
			<div className='sticky top-0 z-10 -mx-4 -mt-4 flex items-center justify-between gap-3 border-b border-border bg-background px-4 pt-4 pb-3'>
				{/* The store's own logo (sparks.ds "AutoParts Logo"), then which screen this is. */}
				<span className='flex items-center gap-2 text-sm font-medium text-foreground-prominent'>
					<AutoPartsLogo className='h-5' />
					<span aria-hidden>·</span> Counter
				</span>
				<span className='text-xs text-muted-foreground'>Store 214</span>
			</div>
			<EditableText as='h2' id='staff-title' className='text-lg font-semibold text-foreground-prominent'>
				Customer lookup
			</EditableText>
			<div className='flex gap-2'>
				<div className='flex h-9 flex-1 items-center gap-2 rounded-input border border-border px-2.5 text-sm text-foreground'>
					<Search className='size-4 text-icon' aria-hidden />
					{data.customer.phone}
				</div>
				<Button {...lookUp.props} onClick={() => setFound(true)}>
					{lookUp.label}
				</Button>
			</div>
			{found ? (
				<div className='flex flex-col gap-3 rounded-md border border-border p-3'>
					<div className='flex flex-col'>
						<span className='text-sm font-semibold text-foreground'>{data.customer.name}</span>
						<span className='text-sm text-muted-foreground'>
							Saved vehicle: {vehicleName(data.vehicle)} {data.vehicle.trim} {data.vehicle.engine}
						</span>
					</div>
					<span className='text-sm font-medium text-foreground'>Will this fit? Pick a part:</span>
					<div className='flex flex-wrap gap-2'>
						{data.parts.map((p) => (
							<Button key={p.id} variant='outline' size='sm' aria-pressed={checked === p.id} className={cn("rounded-button-md", checked === p.id && "border-border-defined")} onClick={() => setChecked(p.id)}>
								{p.name}
							</Button>
						))}
					</div>
					{part ? <FitMessage part={part} vehicle={data.vehicle} /> : null}
				</div>
			) : null}
		</div>
	);
}

/** What every prototype takes for changing it: her changes, pointing, and typing over text. */
type PrototypeViewProps = Pick<FitCheckPrototypeProps, "changes" | "pointing" | "pointedAt" | "onPoint" | "onTextChange">;

/**
 * The frame every prototype's screens sit in: pointing (a click or Enter selects instead of using), what she can type
 * over, and the line that says nothing is real.
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
			{/* So nothing reads as real. */}
			<p className='mt-auto flex items-center gap-1.5 border-t border-border px-4 py-2 text-xs text-muted-foreground'>
				<TriangleAlert className='size-3.5' aria-hidden />
				Prototype: made-up data, nothing is real.
			</p>
		</div>
		</ViewContext.Provider>
	);
}

/** The prototype for "Fit check before you buy", for the audience shown. */
function FitCheckPrototype({ data, audience, readyScreens, ...view }: FitCheckPrototypeProps) {
	return (
		<PrototypeFrame {...view}>
			{audience === "customer" ? <CustomerShop data={data} readyScreens={readyScreens} /> : <StaffLookup data={data} readyScreens={readyScreens} />}
		</PrototypeFrame>
	);
}

export {
	Building,
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
	type FitCheckAudience,
	type FitCheckData,
	type FitCheckPrototypeProps,
	type FitPart,
	type FitResult,
	type FitVehicle,
};
