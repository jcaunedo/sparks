import * as React from "react";
import { ChevronLeft, ChevronRight, Maximize2, TriangleAlert, MessageCirclePlus, Monitor, MousePointerClick, Smartphone } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { Button } from "@/components/buttons/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/overlays/tooltip";
import { carouselVariants, fadeVariants, revealVariants, useMotionPreference } from "@/lib/motion";
import { cn } from "@/lib/utils";

import { BuildingScreen } from "./building-screen";
import { HeaderIconButton } from "../../header-icon-button";
import { PanelAction, type PanelActionProps } from "../shared/panel-action";
import { VersionsMenu } from "../shared/versions-menu";
import { onCommentScreen, PrototypeComments, type CommentMention, type PrototypeComment, type PrototypeCommentAuthor } from "./prototype-comments";

type PrototypeAudience = { id: string; label: string; /** The device it suits (customers on a phone, staff at the counter); the prototype opens on the first audience's, and switching audience keeps the device. */ device: PrototypeDevice };
type PrototypeDevice = "phone" | "desktop";

type PrototypeBuild = {
	readyScreens: number;
	totalScreens: number;
	/** `key`: the screen, so the next one is assembled from blank; `device`: the one it's for. */
	screen?: { key: React.Key; device: PrototypeDevice; content: React.ReactNode };
};

type PrototypePanelProps = {
	/** Who the prototype is for, e.g. "Customer", "Store staff". The first opens first. */
	audiences: PrototypeAudience[];
	/**
	 * While Sparks builds it: nothing to try yet. `screen` is the one being built, assembled as it goes; without it (before
	 * the first), there's no device, only the empty panel (prds/sparks-prototype.md, "Building it").
	 */
	building?: PrototypeBuild;
	/**
	 * The prototype for an audience, opened on a screen (its place in `screens`) when she goes to one with the arrows;
	 * without it, where the journey starts. `part`: the part `openAt` opens a product page on.
	 */
	children: (audience: string, screen?: number, part?: string) => React.ReactNode;
	/**
	 * Opens on this screen, part and element instead of where the journey starts ("Fix in the prototype" in Evaluate). A
	 * new `key` opens it again; once she goes to another screen or audience, she's on her own.
	 */
	openAt?: { key: React.Key; view: number; part?: string; element?: string; /** Its name, when it isn't the screen's own. */ label?: string };
	/**
	 * Every screen Sparks built, in the order it built them, with the audience each is for: the arrows on either side of
	 * the device go through them (prds/sparks-prototype.md, "Trying it").
	 */
	screens?: { name: string; audience: string }[];
	/** "Edit element" is on: Dana selects an element in the prototype instead of using it. Without `onPointingChange`, it can't be changed here, and there's no "Edit element". */
	pointing?: boolean;
	onPointingChange?: (pointing: boolean) => void;
	/** Every version, oldest first; the last is the current one (prds/sparks-prototype.md, "Versions"). */
	versions?: { id: string; name: string }[];
	/** Restoring a version saves it as the newest. */
	onRestore?: (id: string) => void;
	/** Who adds comments ("Add comment"): her name and photo on each pin. Without it, there's no "Add comment". */
	commentAuthor?: PrototypeCommentAuthor;
	/** Who can be tagged with "@" in a comment: people and departments (`PrototypeComments` `mentionable`). */
	mentionable?: CommentMention[];
	/**
	 * The comments on the prototype, with `onCommentsChange` to keep them outside (the Comments panel lists them);
	 * without, the panel keeps its own.
	 */
	comments?: PrototypeComment[];
	onCommentsChange?: (comments: PrototypeComment[]) => void;
	/**
	 * The paths: one per direction built (prds/sparks-prototype.md, "Paths"), labeled as in the directions ("2. Flag
	 * often-returned parts"). One leads the toolbar as its name; with more than one, as a switcher.
	 */
	paths?: { id: string; label: string }[];
	path?: string;
	onPathChange?: (id: string) => void;
	/**
	 * A note above the prototype, e.g. that it was built from an earlier version of the plan (prds/sparks-prototype.md, "When the
	 * plan changes"), with an optional action ("Update prototype"). It stays until the story clears it.
	 */
	notice?: { text: string; actionLabel?: string; onAction?: () => void };
	/** The step's way forward, last in the toolbar ("Evaluate"); hidden while it's being built. */
	action?: PanelActionProps;
	/** Open a comment's pin (from the Comments panel): shows its audience and device and opens its popover. */
	openComment?: string;
	onOpenCommentChange?: (id: string | undefined) => void;
	className?: string;
};

/**
 * The device the prototype sits in, the same in Prototype, Evaluate and the reviewers' page: a phone with a 10px dark
 * bezel (375px of screen, at most 760px tall) or a monitor with an 8px one, the panel's full width. The bezel stays
 * dark in dark mode: it's the device, not the page (DESIGN.md → "The prototype's device has a dark bezel").
 */
const prototypeDeviceClasses = (device: PrototypeDevice) =>
	cn(
		"border-[color:var(--gray-800)] bg-background shadow-xl",
		device === "phone" ? "h-[832px] w-[395px] shrink-0 rounded-[44px] border-[10px]" : "min-h-0 w-full flex-1 rounded-[18px] border-[8px]",
	);

/** A real phone: a 375 × 812 screen (an iPhone's proportions) in its 10px bezel. */
const phoneSize = { width: 395, height: 832 };

/**
 * Fits the real-size phone into the room there is, scaled as a whole (never squashed), so it keeps a phone's
 * proportions and its screen stays 375px wide for the layouts built for it (DESIGN.md → "The prototype's device has a
 * dark bezel"). Fills its parent; the phone sits at the top, centered.
 */
function FitPhone({ children, after, className }: { children: React.ReactNode; /** Right under the phone, e.g. `PrototypeNote`. */ after?: React.ReactNode; className?: string }) {
	const ref = React.useRef<HTMLDivElement>(null);
	const [scale, setScale] = React.useState(1);
	React.useLayoutEffect(() => {
		const node = ref.current;
		if (!node) return;
		// Room for what's under it (about one line). Measured before it's first painted, so it's never at another size.
		const measure = () => setScale(Math.max(0.4, Math.min(1, (node.clientHeight - (after ? 28 : 0)) / phoneSize.height, node.clientWidth / phoneSize.width)));
		measure();
		const observer = new ResizeObserver(measure);
		observer.observe(node);
		return () => observer.disconnect();
	}, []);
	return (
		<div ref={ref} className={cn("flex min-h-0 w-full flex-1 flex-col items-center", className)}>
			{/* `data-phone`: what glides from one step to the next (the workspace's step change). */}
			<div data-phone className='shrink-0' style={{ width: phoneSize.width * scale, height: phoneSize.height * scale }}>
				<div style={{ width: phoneSize.width, height: phoneSize.height, transform: `scale(${scale})`, transformOrigin: "0 0" }}>{children}</div>
			</div>
			{after}
		</div>
	);
}

/** Under the device, outside it: nothing in the prototype is real (without taking room in its screens). Shared with Evaluate. */
function PrototypeNote() {
	return (
		<p className='flex shrink-0 items-center gap-1.5 pt-2 text-xs text-muted-foreground'>
			<TriangleAlert aria-hidden className='size-3.5 shrink-0' />
			Prototype: made-up data, nothing is real.
		</p>
	);
}

/**
 * An arrow beside the prototype that goes to the screen before or after it (Prototype, Evaluate's strip): a 40px round
 * outlined icon button, named in its tooltip with the screen it goes to.
 */
function ScreenArrow({ direction, to, disabled, onClick }: { direction: -1 | 1; to?: string; disabled?: boolean; onClick: () => void }) {
	const label = direction < 0 ? "Screen before" : "Next screen";
	const button = (
		<Button
			variant='outline'
			size='icon'
			aria-label={to ? `${label}: ${to}` : label}
			disabled={disabled}
			onClick={onClick}
			className='size-10 shrink-0 rounded-full [&_svg]:size-5'
		>
			{direction < 0 ? <ChevronLeft aria-hidden /> : <ChevronRight aria-hidden />}
		</Button>
	);
	if (disabled) return button;
	return (
		<Tooltip>
			<TooltipTrigger asChild>{button}</TooltipTrigger>
			<TooltipContent side='bottom' sideOffset={6}>
				<span className='block first-letter:uppercase'>{to ?? label}</span>
			</TooltipContent>
		</Tooltip>
	);
}

/** A toolbar button that turns a mode on and off ("Edit element", "Add comment"): filled with the brand color while on. */
const toggleClasses =
	"aria-pressed:bg-primary aria-pressed:text-primary-foreground aria-pressed:hover:bg-[color-mix(in_srgb,var(--primary)_90%,black)] aria-pressed:hover:text-primary-foreground";

/** A row of buttons for one choice: the audience, or the device. */
function Switcher<T extends string>({
	label,
	value,
	options,
	onChange,
}: {
	label: string;
	value: T;
	options: { id: T; label: string; /** Shown instead of the label, which moves to a tooltip and the button's name. */ icon?: React.ReactNode }[];
	onChange: (id: T) => void;
}) {
	return (
		<div role='group' aria-label={label} className='flex rounded-button-lg bg-muted p-0.5'>
			{options.map((option) => {
				const button = (
					<button
						key={option.id}
						type='button'
						aria-pressed={value === option.id}
						aria-label={option.icon ? option.label : undefined}
						onClick={() => onChange(option.id)}
						className={cn(
							"h-8 rounded-[10px] text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring",
							option.icon ? "grid w-9 place-items-center [&_svg]:size-[18px]" : "px-3",
							value === option.id ? "bg-background text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground",
						)}
					>
						{option.icon ?? option.label}
					</button>
				);
				return option.icon ? (
					<Tooltip key={option.id}>
						<TooltipTrigger asChild>{button}</TooltipTrigger>
						<TooltipContent side='bottom' sideOffset={6}>
							{option.label}
						</TooltipContent>
					</Tooltip>
				) : (
					button
				);
			})}
		</div>
	);
}

/**
 * The prototype beside the conversation in the Prototype step (prds/sparks-prototype.md, "Trying it"): the audience and
 * device switchers (the device as icons), then icon buttons named in tooltips: "Edit element", "Add comment", the
 * versions and "Try it full screen" (Esc or "Back to Sparks" returns, focus back on the
 * button), with the prototype in a phone or desktop frame. Not in Figma yet.
 */
function PrototypePanel({
	audiences,
	building: build,
	children,
	openAt,
	screens = [],
	pointing = false,
	onPointingChange,
	versions = [],
	onRestore,
	notice,
	action,
	commentAuthor,
	mentionable,
	comments: commentsProp,
	onCommentsChange,
	openComment,
	onOpenCommentChange,
	paths = [],
	path,
	onPathChange,
	className,
}: PrototypePanelProps) {
	const openAudience = audiences.find((a) => a.id === (openAt && screens[openAt.view]?.audience)) ?? audiences[0];
	const [audience, setAudience] = React.useState(openAudience?.id ?? "");
	const [device, setDevice] = React.useState<PrototypeDevice>(openAudience?.device ?? "phone");
	// The screen she went to with the arrows; none: where the audience's journey starts (and after she switches audience
	// or starts over). The arrows go on from the first screen of the audience shown.
	const [screen, setScreen] = React.useState<number | undefined>(openAt?.view);
	// Where `openAt` opened it, until she goes to another screen or audience.
	const [opened, setOpened] = React.useState(openAt);
	const screenAt = screen ?? Math.max(0, screens.findIndex((s) => s.audience === audience));
	// Each move with the arrows: the screen slides in from the side it's on (Carousel), the one shown slides out the other
	// way. Switching audience or device changes the screen in place.
	const [slide, setSlide] = React.useState<{ key: number; direction: 1 | -1 }>({ key: 0, direction: 1 });
	const goToScreen = (index: number) => {
		const next = screens[index];
		if (!next) return;
		setSlide((current) => ({ key: current.key + 1, direction: index > screenAt ? 1 : -1 }));
		setScreen(index);
		setOpened(undefined);
		if (next.audience !== audience) {
			setAudience(next.audience);
			setDevice(audiences.find((a) => a.id === next.audience)?.device ?? device);
		}
	};
	const [fullScreen, setFullScreen] = React.useState(false);
	const scrollerRef = React.useRef<HTMLDivElement>(null);
	// Opened again on another place while the panel is already there.
	React.useEffect(() => {
		if (!openAt || openAt.key === opened?.key) return;
		setScreen(openAt.view);
		setOpened(openAt);
		setFullScreen(false);
		if (openAudience) {
			setAudience(openAudience.id);
			setDevice(openAudience.device);
		}
	}, [openAt?.key]);
	// The element it opens on comes into view inside the device (the phone may be scaled: it scrolls in its own pixels).
	React.useEffect(() => {
		const scroller = scrollerRef.current;
		const target = opened?.element ? scroller?.querySelector(`[data-point="${opened.element}"], [data-agent="${opened.element}"]`) : undefined;
		if (!scroller || !target) return;
		const t = target.getBoundingClientRect();
		const s = scroller.getBoundingClientRect();
		const k = s.height / (scroller.clientHeight || s.height || 1) || 1;
		if (t.top < s.top + 24 || t.bottom > s.bottom - 24) scroller.scrollTop += (t.top - s.top - s.height / 3) / k;
	}, [opened?.key]);
	const openerRef = React.useRef<HTMLButtonElement>(null);
	const backRef = React.useRef<HTMLButtonElement>(null);
	const building = Boolean(build);
	const { prefersReducedMotion } = useMotionPreference();
	// Comments on the prototype (prds/sparks-prototype.md, "Commenting on it"): "Add comment" and pointing ("Edit
	// element") are one mode at a time.
	const [commenting, setCommenting] = React.useState(false);
	const [commentsState, setCommentsState] = React.useState<PrototypeComment[]>([]);
	const comments = onCommentsChange ? (commentsProp ?? []) : commentsState;
	const setComments = (update: (current: PrototypeComment[]) => PrototypeComment[]) =>
		onCommentsChange ? onCommentsChange(update(comments)) : setCommentsState(update);
	// Opening a comment (from the Comments panel) goes to where it is first: its audience, device and screen, with its part.
	// Already there, the screen stays as she left it.
	React.useEffect(() => {
		const comment = comments.find((c) => c.id === openComment);
		if (!comment) return;
		const { scope, view, part } = comment;
		const there = scope.audience === audience && scope.device === device && onCommentScreen(scrollerRef.current, comment);
		setAudience(scope.audience);
		setDevice(scope.device);
		setFullScreen(false);
		if (view !== undefined && !there) {
			setScreen(view);
			setOpened({ key: `comment-${comment.id}-${Date.now()}`, view, part });
		}
	}, [openComment]);
	React.useEffect(() => {
		if (pointing) setCommenting(false);
	}, [pointing]);
	// Esc stops commenting, unless it's closing a comment's popover.
	React.useEffect(() => {
		if (!commenting) return;
		const onKey = (event: KeyboardEvent) => {
			if (event.key !== "Escape" || document.querySelector("[data-slot=popover-content]")) return;
			setCommenting(false);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [commenting]);

	const closeFullScreen = React.useCallback(() => {
		setFullScreen(false);
		requestAnimationFrame(() => openerRef.current?.focus());
	}, []);
	// Esc stops pointing.
	React.useEffect(() => {
		if (!pointing) return;
		const onKey = (event: KeyboardEvent) => event.key === "Escape" && onPointingChange?.(false);
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [pointing, onPointingChange]);
	React.useEffect(() => {
		if (!fullScreen) return;
		backRef.current?.focus();
		const onKey = (event: KeyboardEvent) => event.key === "Escape" && closeFullScreen();
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [fullScreen, closeFullScreen]);

	const note = <PrototypeNote />;
	const deviceClasses = prototypeDeviceClasses;

	// Being built: blank until the first screen, then the device it's for, with the screen assembled in it. Nothing in it
	// can be used yet (`inert`): what it shows changes with each screen.
	const buildingFrame = build?.screen ? (
		<div inert className={cn("flex min-h-0 flex-1 flex-col items-center overflow-hidden", build.screen.device === "phone" && "pt-4")}>
			{(() => {
				const assembling = (
					<motion.div
						key={build.screen.device}
						variants={prefersReducedMotion ? fadeVariants : revealVariants}
						initial='initial'
						animate='animate'
						className={cn(deviceClasses(build.screen.device), "overflow-hidden")}
					>
						<BuildingScreen key={build.screen.key}>{build.screen.content}</BuildingScreen>
					</motion.div>
				);
				return build.screen.device === "phone" ? <FitPhone after={note}>{assembling}</FitPhone> : (
					<>
						{assembling}
						{note}
					</>
				);
			})()}
		</div>
	) : (
		<div className='min-h-0 flex-1' />
	);

	const frame = (
		// The device, then under it, outside it, a small note that nothing is real (so nothing in the prototype reads as
		// real, without taking room in its screens).
		<div className={cn("flex min-h-0 flex-1 flex-col items-center overflow-hidden", device === "phone" && "pt-4")}>
			{(() => {
				const deviceView = (
					<div ref={scrollerRef} className={cn(deviceClasses(device), "scrollbar-subtle overflow-y-auto")}>
				{commentAuthor ? (
					<PrototypeComments
						active={commenting}
						author={commentAuthor}
						scope={{ key: `${audience}-${device}`, audience, audienceLabel: audiences.find((a) => a.id === audience)?.label ?? audience, device }}
						comments={comments}
						onAdd={(comment) => setComments((current) => [...current, comment])}
						onDelete={(id) => setComments((current) => current.filter((comment) => comment.id !== id))}
						onUpdate={(updated) => setComments((current) => current.map((comment) => (comment.id === updated.id ? updated : comment)))}
						mentionable={mentionable}
						openId={onOpenCommentChange ? openComment : undefined}
						onOpenChange={onOpenCommentChange}
					>
						<React.Fragment key={`${audience}-${screen ?? "start"}-${opened?.key ?? ""}`}>{children(audience, screen, opened?.part)}</React.Fragment>
					</PrototypeComments>
				) : (
					<React.Fragment key={`${audience}-${screen ?? "start"}-${opened?.key ?? ""}`}>{children(audience, screen, opened?.part)}</React.Fragment>
				)}
					</div>
				);
				const shown = device === "phone" ? <FitPhone after={note}>{deviceView}</FitPhone> : (
					<>
						{deviceView}
						{note}
					</>
				);
				if (screens.length < 2) return shown;
				// The arrows on either side: every screen Sparks built, in order, the audience following the screen. The screens
				// slide between them as a carousel across the panel's full width (the frame clips them), behind the arrows: each
				// slide spans the arrows' room too (`px-14`: a 40px arrow + 16px gap), so it leaves the panel entirely.
				return (
					<div className='relative flex min-h-0 w-full flex-1'>
						<AnimatePresence initial={false} custom={slide.direction} mode='popLayout'>
							<motion.div
								key={slide.key}
								custom={slide.direction}
								variants={prefersReducedMotion ? fadeVariants : carouselVariants}
								initial='initial'
								animate='animate'
								exit='exit'
								className='flex min-h-0 w-full min-w-0 flex-1 flex-col items-center px-14'
							>
								{shown}
							</motion.div>
						</AnimatePresence>
						<div className='absolute inset-y-0 left-0 z-10 flex items-center'>
							<ScreenArrow direction={-1} to={screens[screenAt - 1]?.name} disabled={screenAt === 0} onClick={() => goToScreen(screenAt - 1)} />
						</div>
						<div className='absolute inset-y-0 right-0 z-10 flex items-center'>
							<ScreenArrow
								direction={1}
								to={screens[screenAt + 1]?.name}
								disabled={screenAt === screens.length - 1}
								onClick={() => goToScreen(screenAt + 1)}
							/>
						</div>
						<span aria-live='polite' className='sr-only'>
							{screen !== undefined ? `${opened?.label ?? screens[screenAt]?.name}, ${screenAt + 1} of ${screens.length}` : ""}
						</span>
					</div>
				);
			})()}
		</div>
	);

	return (
		<section aria-label='Prototype' className={cn("flex min-h-0 flex-1 flex-col gap-3 rounded-card bg-background-subtle p-4", className)}>
			{/* Three parts: the direction (or the path switcher) on the left, the audience and device together in the middle
			    (centered on the panel: both sides take an equal share), the actions on the right. When the panel is narrow
			    (beside the plan), the actions keep their width and the direction's name truncates. */}
			<div className='grid grid-cols-[1fr_auto_1fr] items-center gap-4'>
				<div className='flex min-w-0 items-center gap-2'>
					{/* Which direction this is, numbered as on its card, in the style of a heading in Sparks's messages (base
					    semibold, foreground-prominent), with "Version {n}" under it. The title is the menu: the versions, newest
					    first, with "Restore", and with more than one path, the paths to switch between (prds/sparks-prototype.md,
					    "Versions", "Paths"). */}
					{paths.length ? (
						<VersionsMenu
							title={(paths.find((option) => option.id === path) ?? paths[0]).label}
							// No version yet while it's being built.
							versions={building ? [] : versions}
							onRestore={onRestore}
							paths={paths}
							path={path}
							onPathChange={onPathChange}
						/>
					) : null}
				</div>
				{/* In the middle, together: who it's for and the device. */}
				{/* Nothing to switch or do until it's built: the controls keep their place, hidden. */}
				<div className={cn("flex shrink-0 items-center gap-2", building && "invisible")}>
					{audiences.length > 1 ? (
						<Switcher
							label='Audience'
							value={audience}
							options={audiences}
							// Switching who it's for keeps the device she's on, and starts at that audience's first screen.
							onChange={(id) => {
								setAudience(id);
								setScreen(undefined);
								setOpened(undefined);
							}}
						/>
					) : null}
					<Switcher
						label='Device'
						value={device}
						options={[
							{ id: "phone", label: "Phone", icon: <Smartphone aria-hidden /> },
							{ id: "desktop", label: "Desktop", icon: <Monitor aria-hidden /> },
						]}
						onChange={setDevice}
					/>
				</div>
				<div className={cn("flex items-center justify-end gap-2", building && "invisible")}>
					{/* Icon buttons, each named in a tooltip. "Edit element": select an element, then say what to change (Esc
					    stops it). */}
					{onPointingChange ? (
						<HeaderIconButton
							label='Edit element'
							aria-pressed={pointing}
							className={toggleClasses}
							onClick={() => onPointingChange?.(!pointing)}
						>
							<MousePointerClick aria-hidden />
						</HeaderIconButton>
					) : null}
					{/* "Add comment": a click on the prototype drops a pin and opens the comment's popover (Esc stops it). */}
					{commentAuthor ? (
						<HeaderIconButton
							label='Add comment'
							aria-pressed={commenting}
							className={toggleClasses}
							onClick={() => {
								if (!commenting && pointing) onPointingChange?.(false);
								setCommenting(!commenting);
							}}
						>
							<MessageCirclePlus aria-hidden />
						</HeaderIconButton>
					) : null}
					<HeaderIconButton ref={openerRef} label='Try it full screen' onClick={() => setFullScreen(true)}>
						<Maximize2 aria-hidden />
					</HeaderIconButton>
					{action ? <PanelAction {...action} /> : null}
				</div>
			</div>
			{/* The prototype isn't in step with the plan: what changed, and the way to update it. */}
			{notice && !building ? (
				<div role='status' className='flex items-center gap-3 rounded-lg border border-warning-muted bg-warning-subtle px-3 py-2 text-sm text-foreground'>
					<TriangleAlert aria-hidden className='size-4 shrink-0 text-warning' />
					<span className='min-w-0 flex-1'>{notice.text}</span>
					{notice.actionLabel && notice.onAction ? (
						<Button variant='outline' size='sm' className='shrink-0' onClick={notice.onAction}>
							{notice.actionLabel}
						</Button>
					) : null}
				</div>
			) : null}
			{/* Announced at each finished screen, not continuously; the conversation shows the steps. */}
			<span aria-live='polite' className='sr-only'>
				{build?.readyScreens ? `${build.readyScreens} of ${build.totalScreens} screens ready` : ""}
			</span>
			{building ? buildingFrame : fullScreen ? null : frame}
			{fullScreen && !building ? (
				<div role='dialog' aria-modal='true' aria-label='Prototype, full screen' className='fixed inset-0 z-50 flex flex-col gap-3 bg-background-subtle p-6'>
					<div className='flex items-center justify-between'>
						<span className='text-sm text-muted-foreground'>Esc to go back</span>
						<Button ref={backRef} variant='outline' size='sm' onClick={closeFullScreen}>
							Back to Sparks
						</Button>
					</div>
					{frame}
				</div>
			) : null}
		</section>
	);
}

export { FitPhone, phoneSize, PrototypeNote, PrototypePanel, ScreenArrow, prototypeDeviceClasses, type PrototypeBuild, type PrototypeAudience, type PrototypeDevice, type PrototypePanelProps };
