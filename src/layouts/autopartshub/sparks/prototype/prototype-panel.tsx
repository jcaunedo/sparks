import * as React from "react";
import { History, Maximize2, MessageCirclePlus, Monitor, MousePointerClick, RotateCcw, Smartphone } from "lucide-react";

import { Button } from "@/components/buttons/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/forms/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/overlays/tooltip";
import { cn } from "@/lib/utils";

import { HeaderIconButton } from "../../header-icon-button";
import { PrototypeComments, type PrototypeComment, type PrototypeCommentAuthor } from "./prototype-comments";

type PrototypeAudience = { id: string; label: string; /** The device it suits (customers on a phone, staff at the counter); the prototype opens on the first audience's, and switching audience keeps the device. */ device: PrototypeDevice };
type PrototypeDevice = "phone" | "desktop";

type PrototypePanelProps = {
	/** Who the prototype is for, e.g. "Customer", "Store staff". The first opens first. */
	audiences: PrototypeAudience[];
	/** How many screens are built, of how many: shown while building. */
	readyScreens: number;
	totalScreens: number;
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
/** The versions, newest first, each restorable but the current one. Closes on Esc or a click outside. */
function VersionsMenu({ versions, onRestore }: { versions: { id: string; name: string }[]; onRestore?: (id: string) => void }) {
	const [open, setOpen] = React.useState(false);
	const ref = React.useRef<HTMLDivElement>(null);
	const listId = React.useId();
	React.useEffect(() => {
		if (!open) return;
		const close = (event: MouseEvent | KeyboardEvent) => {
			if (event instanceof KeyboardEvent ? event.key === "Escape" : !ref.current?.contains(event.target as Node)) setOpen(false);
		};
		window.addEventListener("mousedown", close);
		window.addEventListener("keydown", close);
		return () => {
			window.removeEventListener("mousedown", close);
			window.removeEventListener("keydown", close);
		};
	}, [open]);
	const newestFirst = [...versions].reverse();
	return (
		<div ref={ref} className='relative'>
			<HeaderIconButton
				label={`Versions (${versions.length})`}
				aria-expanded={open}
				aria-controls={listId}
				onClick={() => setOpen((value) => !value)}
			>
				<History aria-hidden />
			</HeaderIconButton>
			{open ? (
				<ol
					id={listId}
					aria-label='Versions, newest first'
					className='absolute right-0 z-20 mt-1 flex max-h-80 w-80 flex-col overflow-y-auto rounded-card border border-border bg-background p-1 shadow-lg'
				>
					{newestFirst.map((version, index) => (
						<li key={version.id} className='flex items-center justify-between gap-3 rounded-md px-3 py-2 text-sm'>
							<span className='flex min-w-0 flex-col'>
								<span className='truncate text-foreground' title={version.name}>{version.name}</span>
								<span className='text-xs text-muted-foreground'>Version {versions.length - index}</span>
							</span>
							{index === 0 ? (
								<span className='shrink-0 text-xs text-muted-foreground'>Current</span>
							) : (
								<Button
									variant='outline'
									size='sm'
									className='shrink-0 rounded-button-md'
									onClick={() => {
										onRestore?.(version.id);
										setOpen(false);
									}}
								>
									Restore
								</Button>
							)}
						</li>
					))}
				</ol>
			) : null}
		</div>
	);
}

function PrototypePanel({
	audiences,
	readyScreens,
	totalScreens,
	children,
	pointing = false,
	onPointingChange,
	versions = [],
	onRestore,
	commentAuthor,
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
	const building = readyScreens < totalScreens;
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

	const frame = (
		<div className={cn("flex min-h-0 flex-1 justify-center overflow-hidden", device === "phone" ? "items-start py-4" : "items-stretch")}>
			<div
				className={cn(
					"scrollbar-subtle overflow-y-auto border border-border bg-background shadow-sm",
					device === "phone" ? "h-full max-h-[760px] w-[375px] rounded-[32px]" : "h-full w-full rounded-card",
				)}
			>
				{commentAuthor ? (
					<PrototypeComments
						active={commenting}
						author={commentAuthor}
						scope={{ key: `${audience}-${device}`, audience, audienceLabel: audiences.find((a) => a.id === audience)?.label ?? audience, device }}
						comments={comments}
						onAdd={(comment) => setComments((current) => [...current, comment])}
						onDelete={(id) => setComments((current) => current.filter((comment) => comment.id !== id))}
						openId={onOpenCommentChange ? openComment : undefined}
						onOpenChange={onOpenCommentChange}
					>
						<React.Fragment key={`${audience}-${run}`}>{children(audience)}</React.Fragment>
					</PrototypeComments>
				) : (
					<React.Fragment key={`${audience}-${run}`}>{children(audience)}</React.Fragment>
				)}
			</div>
		</div>
	);

	return (
		<section aria-label='Prototype' className={cn("flex min-h-0 flex-1 flex-col gap-3 rounded-card bg-background-subtle p-4", className)}>
			{/* Three parts: the direction (or the path switcher) on the left, the audience and device together in the middle
			    (centered on the panel: both sides take an equal share), the actions on the right. When the panel is narrow
			    (beside the Blueprint), the actions keep their width and the direction's name truncates. */}
			<div className='grid grid-cols-[1fr_auto_1fr] items-center gap-4'>
				<div className='flex min-w-0 items-center gap-2'>
					{/* Which direction this is, numbered as on its card: its name with one path; with more, the switcher in
					    the same place (the directions she's built, in the order built). */}
					{paths.length === 1 ? (
						<h2 className='min-w-0 truncate text-sm font-semibold text-foreground' title={paths[0].label}>
							{paths[0].label}
						</h2>
					) : null}
					{paths.length > 1 ? (
						<Select value={path} onValueChange={(id) => onPathChange?.(id)}>
							<SelectTrigger aria-label='Path' className='h-9 max-w-64 bg-background'>
								<SelectValue />
							</SelectTrigger>
							<SelectContent position='popper' align='start'>
								{paths.map((option) => (
									<SelectItem key={option.id} value={option.id}>
										{option.label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					) : null}
				</div>
				{/* In the middle, together: who it's for and the device. */}
				<div className='flex shrink-0 items-center gap-2'>
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
				<div className='flex items-center justify-end gap-2'>
					{/* Announced at each finished screen, not continuously. */}
					<span aria-live='polite' className='text-sm text-muted-foreground'>
						{building ? `${readyScreens} of ${totalScreens} screens ready` : ""}
					</span>
					{/* Icon buttons, each named in a tooltip. "Edit element": select an element, then say what to change (Esc
					    stops it). */}
					<HeaderIconButton
						label='Edit element'
						aria-pressed={pointing}
						className={toggleClasses}
						disabled={building}
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
							disabled={building}
							onClick={() => {
								if (!commenting && pointing) onPointingChange?.(false);
								setCommenting(!commenting);
							}}
						>
							<MessageCirclePlus aria-hidden />
						</HeaderIconButton>
					) : null}
					{versions.length ? <VersionsMenu versions={versions} onRestore={onRestore} /> : null}
					<HeaderIconButton label='Start over' onClick={() => setRun((r) => r + 1)}>
						<RotateCcw aria-hidden />
					</HeaderIconButton>
					<HeaderIconButton ref={openerRef} label='Try it full screen' onClick={() => setFullScreen(true)}>
						<Maximize2 aria-hidden />
					</HeaderIconButton>
				</div>
			</div>
			{fullScreen ? null : frame}
			{fullScreen ? (
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

export { PrototypePanel, type PrototypeAudience, type PrototypeDevice, type PrototypePanelProps };
