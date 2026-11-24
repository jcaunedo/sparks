import * as React from "react";
import { Maximize2, TriangleAlert, MessageCirclePlus, Monitor, MousePointerClick, RotateCcw, Smartphone } from "lucide-react";
import { motion } from "motion/react";

import { Button } from "@/components/buttons/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/overlays/tooltip";
import { fadeVariants, revealVariants, useMotionPreference } from "@/lib/motion";
import { cn } from "@/lib/utils";

import { BuildingScreen } from "./building-screen";
import { HeaderIconButton } from "../../header-icon-button";
import { VersionsMenu } from "../shared/versions-menu";
import { PrototypeComments, type CommentMention, type PrototypeComment, type PrototypeCommentAuthor } from "./prototype-comments";

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
	/** The prototype for an audience. A new `key` from "Start over" resets its sample data. */
	children: (audience: string) => React.ReactNode;
	/** "Edit element" is on: Dana selects an element in the prototype instead of using it. */
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
	/** Open a comment's pin (from the Comments panel): shows its audience and device and opens its popover. */
	openComment?: string;
	onOpenCommentChange?: (id: string | undefined) => void;
	className?: string;
};

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
 * versions, "Start over" (fresh sample data) and "Try it full screen" (Esc or "Back to Sparks" returns, focus back on the
 * button), with the prototype in a phone or desktop frame. Not in Figma yet.
 */
function PrototypePanel({
	audiences,
	building: build,
	children,
	pointing = false,
	onPointingChange,
	versions = [],
	onRestore,
	notice,
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
	const [audience, setAudience] = React.useState(audiences[0]?.id ?? "");
	const [device, setDevice] = React.useState<PrototypeDevice>(audiences[0]?.device ?? "phone");
	const [run, setRun] = React.useState(0);
	const [fullScreen, setFullScreen] = React.useState(false);
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
	// Opening a comment from outside shows where it was added first.
	React.useEffect(() => {
		const comment = comments.find((c) => c.id === openComment);
		if (!comment) return;
		setAudience(comment.scope.audience);
		setDevice(comment.scope.device);
		setFullScreen(false);
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

	const note = (
		<p className='flex shrink-0 items-center gap-1.5 pt-2 text-xs text-muted-foreground'>
			<TriangleAlert aria-hidden className='size-3.5 shrink-0' />
			Prototype: made-up data, nothing is real.
		</p>
	);
	const deviceClasses = (shown: PrototypeDevice) =>
		cn(
			"min-h-0 flex-1 border border-border bg-background shadow-sm",
			shown === "phone" ? "max-h-[760px] w-[375px] rounded-[32px]" : "w-full rounded-card",
		);

	// Being built: blank until the first screen, then the device it's for, with the screen assembled in it. Nothing in it
	// can be used yet (`inert`): what it shows changes with each screen.
	const buildingFrame = build?.screen ? (
		<div inert className={cn("flex min-h-0 flex-1 flex-col items-center overflow-hidden", build.screen.device === "phone" && "pt-4")}>
			<motion.div
				key={build.screen.device}
				variants={prefersReducedMotion ? fadeVariants : revealVariants}
				initial='initial'
				animate='animate'
				className={cn(deviceClasses(build.screen.device), "overflow-hidden")}
			>
				<BuildingScreen key={build.screen.key}>{build.screen.content}</BuildingScreen>
			</motion.div>
			{note}
		</div>
	) : (
		<div className='min-h-0 flex-1' />
	);

	const frame = (
		// The device, then under it, outside it, a small note that nothing is real (so nothing in the prototype reads as
		// real, without taking room in its screens).
		<div className={cn("flex min-h-0 flex-1 flex-col items-center overflow-hidden", device === "phone" && "pt-4")}>
			<div
				className={cn(deviceClasses(device), "scrollbar-subtle overflow-y-auto")}
			>
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
						<React.Fragment key={`${audience}-${run}`}>{children(audience)}</React.Fragment>
					</PrototypeComments>
				) : (
					<React.Fragment key={`${audience}-${run}`}>{children(audience)}</React.Fragment>
				)}
			</div>
			{note}
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
							// Switching who it's for keeps the device she's on.
							onChange={setAudience}
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
					<HeaderIconButton
						label='Edit element'
						aria-pressed={pointing}
						className={toggleClasses}
						onClick={() => onPointingChange?.(!pointing)}
					>
						<MousePointerClick aria-hidden />
					</HeaderIconButton>
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
					<HeaderIconButton label='Start over' onClick={() => setRun((r) => r + 1)}>
						<RotateCcw aria-hidden />
					</HeaderIconButton>
					<HeaderIconButton ref={openerRef} label='Try it full screen' onClick={() => setFullScreen(true)}>
						<Maximize2 aria-hidden />
					</HeaderIconButton>
				</div>
			</div>
			{/* The prototype isn't in step with the plan: what changed, and the way to update it. */}
			{notice && !building ? (
				<div role='status' className='flex items-center gap-3 rounded-lg border border-warning-muted bg-warning-subtle px-3 py-2 text-sm text-foreground'>
					<TriangleAlert aria-hidden className='size-4 shrink-0 text-warning' />
					<span className='min-w-0 flex-1'>{notice.text}</span>
					{notice.actionLabel && notice.onAction ? (
						<Button variant='outline' size='sm' className='shrink-0 rounded-button-md bg-background shadow-xs' onClick={notice.onAction}>
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
				<div role='dialog' aria-modal='true' aria-label='Prototype, full screen' className='fixed inset-0 z-50 flex flex-col gap-3 bg-background-subtle p-4'>
					<div className='flex items-center justify-between'>
						<span className='text-sm text-muted-foreground'>Esc to go back</span>
						<Button ref={backRef} variant='outline' size='sm' className='rounded-button-md shadow-xs' onClick={closeFullScreen}>
							Back to Sparks
						</Button>
					</div>
					{frame}
				</div>
			) : null}
		</section>
	);
}

export { PrototypePanel, type PrototypeBuild, type PrototypeAudience, type PrototypeDevice, type PrototypePanelProps };
