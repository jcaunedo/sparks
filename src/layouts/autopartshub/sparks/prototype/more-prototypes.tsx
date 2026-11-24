import * as React from "react";
import { Car, Check, ChevronDown, ClipboardList, Search, TriangleAlert, Users } from "lucide-react";

import { AutoPartsLogo } from "@/components/brand/autoparts-logo";
import { Badge } from "@/components/data-display/badge";
import { Button } from "@/components/buttons/button";
import { cn } from "@/lib/utils";

import {
	ActionBar,
	BackLink,
	CartHeading,
	CartTotals,
	choiceClass,
	EditableText,
	Field,
	FitMessage,
	OrderPlaced,
	PartCard,
	PartCarousel,
	PartImage,
	PartLayout,
	PartRow,
	pillClass,
	PrototypeFrame,
	screenBody,
	screenTitle,
	sectionTitle,
	ShopHeader,
	ShopScreen,
	useButton,
	useChanges,
	VehiclePicker,
	vehicleName,
	vehicleSteps,
	type FitCheckData,
	type FitPart,
	type FitResult,
	type FitVehicle,
	type PrototypeViewProps,
} from "./fit-check-prototype";

/*
 * The prototypes for the other three directions (prds/sparks-prototype.md, "What Sparks builds"), on the same made-up
 * data as "Fit check before you buy", with the same frame: pointing, typing over text, nothing real. Their customer
 * screens use the same shop pieces as "Fit check before you buy" (`ShopHeader`, `PartLayout`, `PartRow`, `ActionBar`…),
 * so every prototype's shop looks and behaves the same.
 */

type PrototypeProps = PrototypeViewProps & {
	data: FitCheckData;
	audience: string;
	/** The screen it opens on, by its place in the direction's screens, as it's being built; without it, where the journey starts. */
	openOn?: number;
	/** The part a product page opens on, by id (Evaluate's agents); only "Fit check before you buy" uses it. */
	openPart?: string;
};

/**
 * The flag, written out: color is a second signal, never the only one. Worded as a reminder once Evaluate's fix is
 * made, so it doesn't read as a warning about quality.
 */
function ReturnFlag() {
	const { flagReminder } = useChanges();
	// `data-agent`: where Evaluate's scenarios can go (prds/sparks-validate.md, "Running it").
	return flagReminder ? (
		<Badge data-agent='return-flag' variant='flat' tone='blue' size='sm' className='w-fit'>
			<Car aria-hidden />
			Check the fit first
		</Badge>
	) : (
		<Badge data-agent='return-flag' variant='flat' tone='amber' size='sm' className='w-fit'>
			<TriangleAlert aria-hidden />
			Often returned
		</Badge>
	);
}

/** "+$0.50": what a swap adds to the price (or takes off). */
function priceDifference(to: string, from: string) {
	const cents = Math.round((Number(to.replace(/[^0-9.]/g, "")) - Number(from.replace(/[^0-9.]/g, ""))) * 100);
	return `${cents < 0 ? "−" : "+"}$${(Math.abs(cents) / 100).toFixed(2)}`;
}

/** Whether a part fits a vehicle other than the saved one, from its fit list ("2011–2017 Ford Escape 2.5L"). */
function fitForVehicle(part: FitPart, vehicle: Pick<FitVehicle, "year" | "make" | "model">): FitResult {
	if (!part.fitsVehicles?.length) return "unsure";
	const year = Number(vehicle.year);
	const fits = part.fitsVehicles.some((line) => {
		const range = line.match(/^(\d{4})–(\d{4})/);
		return line.includes(`${vehicle.make} ${vehicle.model}`) && range && year >= Number(range[1]) && year <= Number(range[2]);
	});
	return fits ? "fits" : "doesnt";
}

/* ------------------------------------------------------------------------------------------------------------------ */
/* Flag often-returned parts                                                                                           */
/* ------------------------------------------------------------------------------------------------------------------ */

const flagScreens = ["the search results", "a flagged part", "the cart"];

/** Search results mark parts that come back a lot; the part page says how often, with the fit list to check. */
function FlagReturnsPrototype({ data, openOn, openPart: _openPart, ...view }: PrototypeProps) {
	const flagged = openOn ? data.parts.find((p) => p.oftenReturned)?.id : undefined;
	const [partId, setPartId] = React.useState<string | undefined>(flagged);
	const [cart, setCart] = React.useState<string[]>(openOn === 2 && flagged ? [flagged] : []);
	const [screen, setScreen] = React.useState<"results" | "part" | "cart" | "ordered">(openOn === 2 ? "cart" : openOn === 1 ? "part" : "results");
	// Open or closed by her; until then, open when she asked for the fit list right away.
	const [fitListShown, setFitListOpen] = React.useState<boolean>();
	const addButton = useButton("add-to-cart", "Add to cart");
	const part = data.parts.find((p) => p.id === partId);
	// Outside its own frame, so the changes come from the props (useChanges() works inside the frame).
	const flagReminder = view.changes?.flagReminder;
	const flagRate = view.changes?.flagRate;
	const larger = view.changes?.larger;
	const fitListOpen = fitListShown ?? Boolean(view.changes?.fitListOpen);
	const cartParts = cart.map((id) => data.parts.find((p) => p.id === id)!);
	const header = <ShopHeader cart={cart.length} onCart={() => setScreen("cart")} />;
	const openPart = (id: string) => {
		setPartId(id);
		setScreen("part");
		setFitListOpen(undefined);
	};

	let body: React.ReactNode;
	if (screen === "results" || !part) {
		body = (
			<div className={screenBody}>
				<div className='flex h-11 items-center gap-2 rounded-full bg-background-subtle px-4 text-base text-foreground'>
					<Search className='size-5 text-icon' aria-hidden />
					{data.search ?? "Parts"}
				</div>
				<EditableText as='span' id='results-title' className='text-sm text-muted-foreground'>
					{`${data.parts.length} results`}
				</EditableText>
				<ul className='flex flex-col gap-5'>
					{data.parts.map((p) => (
						<li key={p.id}>
							<PartRow part={p} onOpen={() => openPart(p.id)}>
								{p.oftenReturned ? <ReturnFlag /> : null}
								{p.oftenReturned && flagRate ? <span className='text-xs text-muted-foreground'>{p.returnRate}</span> : null}
							</PartRow>
						</li>
					))}
				</ul>
			</div>
		);
	} else if (screen === "part") {
		body = (
			<>
				<div className='px-4 pt-3 @3xl:px-10'>
					<BackLink onClick={() => setScreen("results")} />
				</div>
				<PartLayout
					part={part}
					action={
						<Button
							{...addButton.props}
							variant='neutral'
							className={pillClass("add-to-cart", larger)}
							disabled={cart.includes(part.id)}
							onClick={() => setCart((c) => [...c, part.id])}
						>
							{cart.includes(part.id) ? "In your cart" : addButton.label}
						</Button>
					}
					after={<PartCarousel title='Other parts' parts={data.parts.filter((p) => p.id !== part.id)} onOpen={openPart} />}
				>
					<div className='flex flex-col gap-3'>
						<div className='flex flex-col gap-1'>
							<h2 className={screenTitle}>{part.name}</h2>
							<span className='text-lg text-foreground'>{part.price}</span>
						</div>
						{part.oftenReturned ? (
							<>
								<ReturnFlag />
								<p className='text-base text-foreground'>
									{flagReminder
										? `${part.returnRate}, almost always because it was bought for a different vehicle. Check the fit list before you buy.`
										: `${part.returnRate}. Most people who send it back bought it for a different vehicle.`}
								</p>
							</>
						) : null}
					</div>
					{/* The fit list, as a row that opens in place. */}
					<section className='flex flex-col border-y border-border'>
						<button
							type='button'
							data-agent='fit-list'
							aria-expanded={fitListOpen}
							onClick={() => setFitListOpen(!fitListOpen)}
							className='flex h-14 w-full items-center justify-between gap-3 text-left text-base font-medium text-foreground outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50'
						>
							{fitListOpen ? "Hide the fit list" : "Check the fit list"}
							<ChevronDown className={cn("size-5 text-icon transition-transform motion-reduce:transition-none", fitListOpen && "rotate-180")} aria-hidden />
						</button>
						{fitListOpen ? (
							<ul className='flex flex-col gap-2 pb-4 text-base text-foreground'>
								{(part.fitsVehicles ?? []).map((vehicle) => (
									<li key={vehicle}>{vehicle}</li>
								))}
							</ul>
						) : null}
					</section>
				</PartLayout>
			</>
		);
	} else if (screen === "ordered") {
		body = (
			<OrderPlaced
				onDone={() => {
					setCart([]);
					setScreen("results");
				}}
			/>
		);
	} else {
		body = (
			<>
				<div className={screenBody}>
					<BackLink onClick={() => setScreen(part ? "part" : "results")} />
					<CartHeading parts={cartParts} />
					{cart.length === 0 ? (
						<p className='text-base text-muted-foreground'>Your cart is empty.</p>
					) : (
						<>
							<ul className='flex flex-col gap-5'>
								{cartParts.map((item) => (
									<li key={item.id}>
										<PartRow part={item}>{item.oftenReturned ? <ReturnFlag /> : null}</PartRow>
									</li>
								))}
							</ul>
							<CartTotals parts={cartParts} />
						</>
					)}
				</div>
				<ActionBar>
					<Button variant='neutral' className={pillClass("place-order", larger)} disabled={cart.length === 0} onClick={() => setScreen("ordered")}>
						Place order
					</Button>
				</ActionBar>
			</>
		);
	}
	return (
		<PrototypeFrame {...view}>
			<ShopScreen screen={`${screen}-${partId ?? ""}`}>
				{header}
				{body}
			</ShopScreen>
		</PrototypeFrame>
	);
}

/* ------------------------------------------------------------------------------------------------------------------ */
/* Fit check at checkout                                                                                               */
/* ------------------------------------------------------------------------------------------------------------------ */

const checkoutScreens = ["the shop", "the cart", "the fit check at checkout", "the store staff order lookup"];

/** The vehicle another one is picked as at checkout: year, make and model. */
const otherVehicleSteps = vehicleSteps.slice(0, 3);

/**
 * Shopping as today; at checkout, every item is checked against the vehicle, with a swap for what doesn't fit. Evaluate's
 * fixes: the fit checked as parts go in the cart (`cartCheck`), and another vehicle at checkout (`otherVehicle`).
 */
function CheckoutCustomer({ data, openOn }: { data: FitCheckData; openOn?: number }) {
	const { cartCheck, otherVehicle, explainFit, swapPriceDiff, larger } = useChanges();
	const [cart, setCart] = React.useState<string[]>(() => (openOn ? data.parts.slice(0, 2).map((p) => p.id) : []));
	const [screen, setScreen] = React.useState<"shop" | "cart" | "checkout" | "ordered">(openOn === 1 ? "cart" : openOn === 2 ? "checkout" : "shop");
	const [picked, setPicked] = React.useState<"saved" | "other" | undefined>(openOn === 2 ? "saved" : undefined);
	const [other, setOther] = React.useState({ year: "", make: "", model: "" });
	const checkoutButton = useButton("go-to-checkout", "Go to checkout");
	const orderButton = useButton("place-order", "Place order");
	const vehicle = data.vehicle;
	// Checked in the cart, the saved vehicle is already known at checkout.
	const choice = picked ?? (cartCheck ? "saved" : undefined);
	const otherReady = Boolean(other.year && other.make && other.model);
	const checked: FitVehicle | undefined = choice === "saved" ? vehicle : choice === "other" && otherReady ? { ...other, trim: "", engine: "" } : undefined;
	const fitOf = (item: FitPart) => (choice === "other" ? fitForVehicle(item, other) : item.fit);
	const cartParts = cart.map((id) => data.parts.find((p) => p.id === id)!);
	const header = <ShopHeader cart={cart.length} vehicle={cartCheck ? vehicle : undefined} onCart={() => setScreen("cart")} />;
	const reset = () => {
		setCart([]);
		setScreen("shop");
		setPicked(undefined);
		setOther({ year: "", make: "", model: "" });
	};

	/** The fit message for an item, and for one that doesn't fit, the swap (saved vehicle only) and removing it. */
	const fitRow = (item: FitPart, onVehicle: FitVehicle, fit: FitResult) => {
		const swap = fit === "doesnt" && onVehicle === vehicle ? item.fitsInstead?.map((sid) => data.parts.find((p) => p.id === sid)!)[0] : undefined;
		const fitsList = item.fitsVehicles ?? [];
		return (
			<>
				<FitMessage part={item} vehicle={onVehicle} fit={fit} />
				{explainFit && fit === "doesnt" && fitsList.length ? (
					<p className='text-sm text-muted-foreground'>
						It fits the {fitsList.length > 1 ? `${fitsList.slice(0, -1).join(", ")} and ${fitsList[fitsList.length - 1]}` : fitsList[0]}, not the{" "}
						{[vehicleName(onVehicle), onVehicle.trim, onVehicle.engine].filter(Boolean).join(" ")}.
					</p>
				) : null}
				{fit === "doesnt" ? (
					<div className='flex flex-wrap gap-2'>
						{swap ? (
							<Button
								variant='outline'
								size='sm'
								className='h-9 rounded-full px-4'
								onClick={() => setCart((c) => (c.includes(swap.id) ? c.filter((cid) => cid !== item.id) : c.map((cid) => (cid === item.id ? swap.id : cid))))}
							>
								Swap for {swap.name}, {swap.price}
								{swapPriceDiff ? ` (${priceDifference(swap.price, item.price)})` : ""}
							</Button>
						) : null}
						<Button variant='ghost' size='sm' className='h-9 rounded-full px-4' onClick={() => setCart((c) => c.filter((cid) => cid !== item.id))}>
							Remove it
						</Button>
					</div>
				) : null}
			</>
		);
	};

	if (screen === "ordered")
		return (
			<ShopScreen screen='ordered'>
				{header}
				<OrderPlaced onDone={reset} />
			</ShopScreen>
		);

	if (screen === "checkout")
		return (
			<ShopScreen screen='checkout'>
				{header}
				<div className={screenBody}>
					<BackLink onClick={() => setScreen("cart")} />
					<EditableText as='h2' id='checkout-title' className={screenTitle}>
						Checkout
					</EditableText>
					{/* Which vehicle: the saved one or (with Evaluate's fix) another, as tiles. Another is picked like the
					    vehicle picker: year, make and model, one at a time. */}
					<section className='flex flex-col gap-3'>
						<h3 className={sectionTitle}>Which vehicle are these parts for?</h3>
						<div role='group' aria-label='Which vehicle are these parts for?' className='flex flex-col gap-2'>
							<button
								type='button'
								aria-pressed={choice === "saved"}
								onClick={() => setPicked("saved")}
								className={cn("flex items-center gap-3 p-4 text-left", choiceClass(choice === "saved"))}
							>
								<Car className='size-5 shrink-0 text-icon' aria-hidden />
								<span className='flex flex-col'>
									<span className='text-base'>{vehicleName(vehicle)}</span>
									<span className='font-normal text-muted-foreground'>
										{vehicle.trim} · {vehicle.engine} · Saved
									</span>
								</span>
							</button>
							{otherVehicle ? (
								<button
									type='button'
									aria-pressed={choice === "other"}
									onClick={() => setPicked("other")}
									className={cn("flex items-center gap-3 p-4 text-left text-base", choiceClass(choice === "other"))}
								>
									<Car className='size-5 shrink-0 text-icon' aria-hidden />
									Another vehicle
								</button>
							) : null}
						</div>
						{choice === "other" ? (
							<VehiclePicker
								options={data.options}
								steps={otherVehicleSteps}
								value={other}
								onChange={(v) => setOther({ year: v.year ?? "", make: v.make ?? "", model: v.model ?? "" })}
							/>
						) : null}
					</section>
					{checked ? (
						<>
							<ul className='flex flex-col gap-5'>
								{cartParts.map((item) => (
									<li key={item.id}>
										<PartRow part={item}>{fitRow(item, checked, fitOf(item))}</PartRow>
									</li>
								))}
							</ul>
							<CartTotals parts={cartParts} />
						</>
					) : (
						<p className='text-base text-muted-foreground'>
							{choice === "other" ? "Pick the year, make and model, and I'll check everything in your cart fits it." : "Pick the vehicle, and I'll check everything in your cart fits it."}
						</p>
					)}
				</div>
				<ActionBar>
					<Button
						{...orderButton.props}
						variant='neutral'
						className={pillClass("place-order", larger)}
						disabled={!checked || cart.length === 0}
						onClick={() => setScreen("ordered")}
					>
						{orderButton.label}
					</Button>
				</ActionBar>
			</ShopScreen>
		);

	if (screen === "cart")
		return (
			<ShopScreen screen='cart'>
				{header}
				<div className={screenBody}>
					<BackLink onClick={() => setScreen("shop")} />
					<CartHeading parts={cartParts} />
					{cart.length === 0 ? (
						<p className='text-base text-muted-foreground'>Your cart is empty.</p>
					) : (
						<>
							<ul className='flex flex-col gap-5'>
								{cartParts.map((item) => (
									<li key={item.id}>
										<PartRow part={item}>{cartCheck ? fitRow(item, vehicle, item.fit) : null}</PartRow>
									</li>
								))}
							</ul>
							<CartTotals parts={cartParts} />
						</>
					)}
				</div>
				<ActionBar>
					<Button
						{...checkoutButton.props}
						variant='neutral'
						className={pillClass("go-to-checkout", larger)}
						disabled={cart.length === 0}
						onClick={() => setScreen("checkout")}
					>
						{checkoutButton.label}
					</Button>
				</ActionBar>
			</ShopScreen>
		);

	return (
		<ShopScreen screen='shop'>
			{header}
			<div className='flex flex-col gap-6 px-4 pt-6 pb-8 @3xl:px-10'>
				<EditableText as='h2' id='shop-title' className={screenTitle}>
					Popular parts
				</EditableText>
				<ul className='grid grid-cols-2 gap-x-3 gap-y-6 @3xl:grid-cols-4'>
					{data.parts.map((p) => (
						<li key={p.id}>
							<PartCard part={p}>
								<Button
									variant='outline'
									size='sm'
									className='h-9 w-full rounded-full'
									disabled={cart.includes(p.id)}
									onClick={() => setCart((c) => [...c, p.id])}
								>
									{cart.includes(p.id) ? "In your cart" : "Add to cart"}
								</Button>
								{/* Checked as it goes in the cart: no surprises at checkout. */}
								{cartCheck && cart.includes(p.id) ? fitRow(p, vehicle, p.fit) : null}
							</PartCard>
						</li>
					))}
				</ul>
			</div>
		</ShopScreen>
	);
}

/** At the counter: an order, with what checkout flagged and what the customer did about it. */
function CheckoutStaff({ data, openOn }: { data: FitCheckData; openOn?: number }) {
	const [found, setFound] = React.useState(openOn !== undefined);
	const lookUp = useButton("look-up", "Look up");
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
				Order lookup
			</EditableText>
			<div className='flex gap-2'>
				<div className='flex h-9 flex-1 items-center gap-2 rounded-input border border-border px-2.5 text-sm text-foreground'>
					<Search className='size-4 text-icon' aria-hidden />
					Order 48213 · {data.customer.name}
				</div>
				<Button {...lookUp.props} onClick={() => setFound(true)}>
					{lookUp.label}
				</Button>
			</div>
			{found ? (
				<div className='flex flex-col gap-3 rounded-md border border-border p-3 text-sm'>
					<span className='text-foreground'>
						Checked at checkout against: <span className='font-semibold'>{vehicleName(data.vehicle)} {data.vehicle.trim} {data.vehicle.engine}</span>
					</span>
					<ul className='flex flex-col gap-2'>
						<li className='flex items-center gap-2 text-foreground'>
							<Check className='size-4 text-success' aria-hidden /> Front brake pads, ceramic: fits
						</li>
						<li className='flex items-center gap-2 text-foreground'>
							<Check className='size-4 text-success' aria-hidden /> Oil filter, FL-500S: swapped in for FL-400S, which didn't fit
						</li>
					</ul>
				</div>
			) : null}
		</div>
	);
}

function CheckoutCheckPrototype({ data, audience, openOn, openPart: _openPart, ...view }: PrototypeProps) {
	return (
		<PrototypeFrame {...view}>
			{audience === "staff" ? <CheckoutStaff data={data} openOn={openOn} /> : <CheckoutCustomer data={data} openOn={openOn} />}
		</PrototypeFrame>
	);
}

/* ------------------------------------------------------------------------------------------------------------------ */
/* Complete fit data: a routine, so the pieces it uses and a walkthrough (prds/sparks-prototype.md, "When the direction  */
/* isn't software")                                                                                                    */
/* ------------------------------------------------------------------------------------------------------------------ */

const fitDataScreens = ["the walkthrough", "the return screen at the counter", "the catalog team's weekly list", "the fit list customers see"];

/** How the routine works, step by step: who does what, and what each person sees. */
function FitDataWalkthrough() {
	const { counterPrefill } = useChanges();
	const steps = [
		{
			who: "Store staff",
			what: counterPrefill
				? 'A customer brings back a part that doesn\'t fit. The associate picks "Doesn\'t fit" and confirms the vehicle it was for, filled in from the customer\'s account: one tap.'
				: 'A customer brings back a part that doesn\'t fit. The associate picks "Doesn\'t fit", finds the customer\'s account and picks the vehicle it was for.',
		},
		{ who: "Returns team", what: "Each Monday, the notes from every store become one list for the catalog team: which parts, for which vehicles, how often." },
		{ who: "Catalog team", what: "They fix the fit data, oldest vehicles first, and mark each line done." },
		{ who: "Customers", what: "The fit list on the product page gets more accurate, and so would any fit check later." },
	];
	return (
		<div className='flex flex-col gap-4 p-4'>
			<EditableText as='h2' id='walkthrough-title' className='text-lg font-semibold text-foreground-prominent'>
				How the routine works
			</EditableText>
			<ol className='flex flex-col gap-3'>
				{steps.map((step, index) => (
					<li key={step.who} className='flex gap-3'>
						<span className='grid size-6 shrink-0 place-items-center rounded-full bg-background-subtle text-xs font-semibold text-foreground'>{index + 1}</span>
						<span className='flex flex-col gap-0.5'>
							<span className='flex items-center gap-1.5 text-sm font-semibold text-foreground'>
								<Users className='size-4 text-icon' aria-hidden /> {step.who}
							</span>
							<span className='text-sm text-foreground'>{step.what}</span>
						</span>
					</li>
				))}
			</ol>
			<p className='text-sm text-muted-foreground'>Switch the view above to try each screen.</p>
		</div>
	);
}

/**
 * At the counter: a "doesn't fit" return, with the vehicle noted. As built, the associate finds the customer's account
 * to see the saved vehicle, and a return with none can't be noted. Evaluate's fixes: the vehicle filled in from the
 * account (`counterPrefill`), and picked at the counter when there's none (`counterAskVehicle`).
 */
function FitDataReturn({ data }: { data: FitCheckData }) {
	const { counterPrefill, counterAskVehicle } = useChanges();
	const returns = data.counterReturns?.length ? data.counterReturns : [{ order: "48107", partId: data.parts[0].id, customer: data.customer.name, savedVehicle: true }];
	const [index, setIndex] = React.useState(0);
	const [reason, setReason] = React.useState<string>();
	const [noted, setNoted] = React.useState<string>();
	const [found, setFound] = React.useState(false);
	const [picked, setPicked] = React.useState(false);
	const [asked, setAsked] = React.useState({ year: "", make: "", model: "" });
	const noteButton = useButton("note-vehicle", "Note it");
	const current = returns[index] ?? returns[0];
	const part = data.parts.find((p) => p.id === current.partId) ?? data.parts[0];
	const saved = `${vehicleName(data.vehicle)} ${data.vehicle.trim} ${data.vehicle.engine}`;
	const reset = () => {
		setNoted(undefined);
		setFound(false);
		setPicked(false);
		setAsked({ year: "", make: "", model: "" });
	};

	const note = (vehicle: string, disabled = false) => (
		<Button {...noteButton.props} disabled={disabled} className={cn(noteButton.props.className, "w-fit")} onClick={() => setNoted(vehicle)}>
			{noteButton.label}
		</Button>
	);
	let vehiclePanel: React.ReactNode;
	if (current.savedVehicle && counterPrefill)
		vehiclePanel = (
			<>
				<span className='text-sm text-foreground'>
					{saved} <span className='text-muted-foreground'>(from the customer's account)</span>
				</span>
				{note(saved)}
			</>
		);
	else if (current.savedVehicle)
		vehiclePanel = found ? (
			<>
				<label className='flex items-center gap-2 text-sm text-foreground'>
					<input type='radio' name='return-vehicle' checked={picked} onChange={() => setPicked(true)} />
					{saved} (saved)
				</label>
				{note(saved, !picked)}
			</>
		) : (
			<>
				<span className='text-sm text-muted-foreground'>Find the customer's account to see their saved vehicles.</span>
				<div className='flex flex-wrap items-end gap-2'>
					<label className='flex flex-col gap-1 text-sm font-medium text-foreground'>
						Phone number
						<input
							defaultValue={data.customer.phone}
							className='h-9 rounded-input border border-border bg-background px-2.5 text-sm font-normal text-foreground outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50'
						/>
					</label>
					<Button variant='outline' className='rounded-button-lg' onClick={() => setFound(true)}>
						Find account
					</Button>
				</div>
			</>
		);
	else if (counterAskVehicle) {
		const vehicle = `${asked.year} ${asked.make} ${asked.model}`;
		vehiclePanel = (
			<>
				<span className='text-sm text-muted-foreground'>No saved vehicle. Ask the customer which vehicle it was for.</span>
				<div className='grid grid-cols-3 gap-2'>
					<Field label='Year' value={asked.year} options={data.options.years} onChange={(year) => setAsked((a) => ({ ...a, year }))} />
					<Field label='Make' value={asked.make} options={data.options.makes} onChange={(make) => setAsked((a) => ({ ...a, make }))} />
					<Field label='Model' value={asked.model} options={data.options.models} onChange={(model) => setAsked((a) => ({ ...a, model }))} />
				</div>
				{note(vehicle, !(asked.year && asked.make && asked.model))}
			</>
		);
	} else vehiclePanel = <span className='text-sm text-muted-foreground'>No saved vehicle, so there's nothing to note. The return goes on without it.</span>;

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
			<div role='group' aria-label='Returns at the counter' className='flex flex-wrap gap-2'>
				{returns.map((r, i) => (
					<Button
						key={r.order}
						variant='outline'
						size='sm'
						aria-pressed={i === index}
						className={cn("rounded-button-md", i === index && "border-border-defined")}
						onClick={() => {
							setIndex(i);
							setReason(undefined);
							reset();
						}}
					>
						Order {r.order} · {r.customer}
					</Button>
				))}
			</div>
			<EditableText as='h2' id='return-title' className='text-lg font-semibold text-foreground-prominent'>
				Return
			</EditableText>
			<div className='flex items-center gap-3 rounded-md border border-border p-3'>
				<PartImage part={part} className='size-14 shrink-0' />
				<span className='flex flex-col'>
					<span className='text-sm font-semibold text-foreground'>{part.name}</span>
					<span className='text-sm text-muted-foreground'>
						Order {current.order} · {current.customer} · {part.price}
					</span>
				</span>
			</div>
			<div role='group' aria-label='Why is it coming back?' className='flex flex-col gap-2'>
				<span className='text-sm font-medium text-foreground'>Why is it coming back?</span>
				<div className='flex flex-wrap gap-2'>
					{["Doesn't fit", "Damaged", "Changed mind"].map((r) => (
						<Button
							key={r}
							variant='outline'
							size='sm'
							aria-pressed={reason === r}
							className={cn("rounded-button-md", reason === r && "border-border-defined")}
							onClick={() => {
								setReason(r);
								reset();
							}}
						>
							{r}
						</Button>
					))}
				</div>
			</div>
			{reason === "Doesn't fit" ? (
				noted ? (
					<p className='flex items-center gap-2 text-sm text-foreground'>
						<Check className='size-4 text-success' aria-hidden /> Noted: {noted}, for this week's list to the catalog team.
					</p>
				) : (
					<div className='flex flex-col gap-2 rounded-md bg-background-subtle p-3'>
						<span className='text-sm font-medium text-foreground'>Which vehicle was it for?</span>
						{vehiclePanel}
					</div>
				)
			) : null}
		</div>
	);
}

/** The catalog team's weekly list: parts and the vehicles they didn't fit, to fix oldest first. */
function FitDataWeeklyList({ data }: { data: FitCheckData }) {
	const { weeklyByCount } = useChanges();
	const [fixed, setFixed] = React.useState<string[]>([]);
	const notes = data.returns ?? [];
	type Row = { id: string; partId: string; vehicles: string[]; stores: string[] };
	// One row per note, oldest vehicles first; or, as she asked, one row per part, most returned first.
	let rows: Row[];
	if (weeklyByCount) {
		const groups: Record<string, Row> = {};
		for (const note of notes) {
			const group = groups[note.partId] ?? { id: note.partId, partId: note.partId, vehicles: [], stores: [] };
			groups[note.partId] = group;
			group.vehicles.push(note.vehicle);
			if (!group.stores.includes(note.store)) group.stores.push(note.store);
		}
		rows = Object.values(groups).sort((a, b) => b.vehicles.length - a.vehicles.length);
	} else
		rows = [...notes]
			.sort((a, b) => a.vehicle.localeCompare(b.vehicle))
			.map((note) => ({ id: note.id, partId: note.partId, vehicles: [note.vehicle], stores: [note.store] }));
	return (
		<div className='flex flex-col gap-4 p-4'>
			<div className='sticky top-0 z-10 -mx-4 -mt-4 flex items-center justify-between gap-3 border-b border-border bg-background px-4 pt-4 pb-3'>
				<span className='flex items-center gap-1.5 text-sm font-black tracking-tight text-foreground-prominent'>
					<ClipboardList className='size-4' aria-hidden /> Catalog · Fit data
				</span>
				<span className='text-xs text-muted-foreground'>Week of Nov 17</span>
			</div>
			<EditableText as='h2' id='weekly-title' className='text-lg font-semibold text-foreground-prominent'>
				This week's "doesn't fit" returns
			</EditableText>
			<p className='text-sm text-muted-foreground'>
				{notes.length} notes from 3 stores, {weeklyByCount ? "most-returned parts first" : "oldest vehicles first"}.
			</p>
			<table className='w-full border-collapse text-left text-sm'>
				<thead>
					<tr className='text-xs text-muted-foreground'>
						<th className='pb-2 font-medium'>Part</th>
						<th className='pb-2 font-medium'>Didn't fit</th>
						<th className='pb-2 font-medium'>Store</th>
						<th className='pb-2' />
					</tr>
				</thead>
				<tbody>
					{rows.map((row) => {
						const part = data.parts.find((p) => p.id === row.partId);
						const done = fixed.includes(row.id);
						return (
							<tr key={row.id} className='border-t border-border align-top'>
								<td className='py-2.5 pr-2 text-foreground'>
									<span className='flex flex-col'>
										{part?.name}
										{weeklyByCount ? (
											<span className='text-xs text-muted-foreground'>
												{row.vehicles.length} {row.vehicles.length === 1 ? "return" : "returns"}
											</span>
										) : null}
									</span>
								</td>
								<td className='py-2.5 pr-2 text-foreground'>
									<span className='flex flex-col gap-0.5'>
										{row.vehicles.map((vehicle) => (
											<span key={vehicle}>{vehicle}</span>
										))}
									</span>
								</td>
								<td className='py-2.5 pr-2 text-muted-foreground'>{row.stores.join(", ")}</td>
								<td className='py-2.5 text-right'>
									{done ? (
										<Badge variant='flat' tone='green' size='xxs'>
											Fit data fixed
										</Badge>
									) : (
										<Button variant='outline' size='sm' className='rounded-button-md shadow-xs' onClick={() => setFixed((f) => [...f, row.id])}>
											Fix fit data
										</Button>
									)}
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}

/** What customers see: the fit list on the product page, more accurate each week. */
function FitDataFitList({ data }: { data: FitCheckData }) {
	const { customerReport } = useChanges();
	const [reported, setReported] = React.useState(false);
	const part = data.parts.find((p) => p.id === "spark-plugs") ?? data.parts[0];
	return (
		<ShopScreen screen='fit-list'>
			<ShopHeader cart={0} />
			<PartLayout
				part={part}
				action={
					<Button variant='neutral' className={pillClass()}>
						Add to cart
					</Button>
				}
			>
				<div className='flex flex-col gap-1'>
					<h2 className={screenTitle}>{part.name}</h2>
					<span className='text-lg text-foreground'>{part.price}</span>
				</div>
				<section className='flex flex-col gap-3 rounded-card bg-background-subtle p-4'>
					<EditableText as='span' id='fit-list-title' className={sectionTitle}>
						Fits these vehicles
					</EditableText>
					<ul className='flex flex-col gap-2 text-base text-foreground'>
						{(part.fitsVehicles ?? []).map((vehicle) => (
							<li key={vehicle}>{vehicle}</li>
						))}
						<li className='flex flex-wrap items-center gap-2'>
							2011–2014 Ford F-150 XLT, Lariat 5.0L V8
							<Badge variant='flat' tone='green' size='xxs'>
								Added this week
							</Badge>
						</li>
					</ul>
					{customerReport ? (
						reported ? (
							<p className='flex items-center gap-2 text-sm text-foreground'>
								<Check className='size-4 text-success' aria-hidden /> Thanks. It goes on this week's list to the catalog team.
							</p>
						) : (
							<button
								type='button'
								onClick={() => setReported(true)}
								className='w-fit text-sm font-medium text-foreground underline underline-offset-4 hover:text-foreground-prominent'
							>
								Not right for your vehicle? Tell us
							</button>
						)
					) : null}
				</section>
			</PartLayout>
		</ShopScreen>
	);
}

// Each of its screens is its own audience's, so there's nothing to open on (`openOn`).
function FitDataPrototype({ data, audience, openOn: _openOn, openPart: _openPart, ...view }: PrototypeProps) {
	return (
		<PrototypeFrame {...view}>
			{audience === "walkthrough" ? (
				<FitDataWalkthrough />
			) : audience === "staff" ? (
				<FitDataReturn data={data} />
			) : audience === "catalog" ? (
				<FitDataWeeklyList data={data} />
			) : (
				<FitDataFitList data={data} />
			)}
		</PrototypeFrame>
	);
}

export {
	CheckoutCheckPrototype,
	checkoutScreens,
	FitDataPrototype,
	fitDataScreens,
	FlagReturnsPrototype,
	flagScreens,
	type PrototypeProps,
};
