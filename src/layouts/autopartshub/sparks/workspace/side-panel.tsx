import * as React from "react";
import { X } from "lucide-react";

import { Button } from "@/components/buttons/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/overlays/tooltip";
import { Typography } from "@/components/typography/typography";
import { cn } from "@/lib/utils";

type SidePanelProps = {
	/** Its heading, e.g. "Comments". */
	title: string;
	/** Buttons before the close button. */
	actions?: React.ReactNode;
	/** The close button's name, e.g. "Close comments". */
	closeLabel: string;
	onClose: () => void;
	/**
	 * Take focus when it opens (the panel itself, not its close button, whose tooltip would open on focus): when she
	 * opened it, not when it opened on its own.
	 */
	autoFocus?: boolean;
	/** Classes for the content area (it scrolls), e.g. the gap between its sections. */
	bodyClassName?: string;
	className?: string;
	children: React.ReactNode;
};

/**
 * A panel on the right edge of the workspace (Comments), as Figma Sparks → "Sparks Project" (63:12460) draws "Plan
 * summary": the screen's full height, a 1px border on its left, a soft gray (background-subtle at 50% on white, as the
 * bottom of the workspace), 28px top and bottom and 32px sides. The title (lg semibold) and its icon buttons (8px apart, the
 * close button last, an X) on one row, then, 24px below, the content, which scrolls. Esc closes it too, from inside.
 */
function SidePanel({ title, actions, closeLabel, onClose, autoFocus = false, bodyClassName, className, children }: SidePanelProps) {
	const titleId = React.useId();
	const panelRef = React.useRef<HTMLElement>(null);
	React.useEffect(() => {
		if (autoFocus) panelRef.current?.focus({ preventScroll: true });
	}, [autoFocus]);
	return (
		<section
			ref={panelRef}
			aria-labelledby={titleId}
			// Focusable from code only, so opening it puts her inside (Tab goes on to its close button).
			tabIndex={-1}
			className={cn(
				"flex min-h-0 flex-1 flex-col gap-6 outline-none border-s border-border bg-[color-mix(in_srgb,var(--background-subtle)_50%,var(--background))] pt-7",
				className,
			)}
			onKeyDown={(event) => {
				// Not a dialog's Esc (React passes it on from its portal): it only closes the dialog.
				if (event.key === "Escape" && event.currentTarget.contains(event.target as Node)) {
					event.stopPropagation();
					onClose();
				}
			}}
		>
			<div className='flex shrink-0 items-center justify-between gap-10 px-8'>
				<Typography as='h2' id={titleId} size='lg' weight='semibold' className='text-foreground'>
					{title}
				</Typography>
				<div className='flex items-center gap-2'>
					{actions}
					{/* Figma "Button" (Type=Icon, Style=Ghost, lg · 36), an X: hides the panel. */}
					<Tooltip>
						<TooltipTrigger asChild>
							<Button variant='ghost' size='icon' aria-label={closeLabel} className={sidePanelButtonClasses} onClick={onClose}>
								<X aria-hidden />
							</Button>
						</TooltipTrigger>
						<TooltipContent side='bottom' sideOffset={6}>
							Close
						</TooltipContent>
					</Tooltip>
				</div>
			</div>
			<div className={cn("scrollbar-subtle flex min-h-0 flex-1 flex-col overflow-y-auto px-8 pb-7", bodyClassName)}>{children}</div>
		</section>
	);
}

/** The side panel's width: 380px to start; she can drag it from 300px up to half the window. */
const sidePanelWidth = { initial: 380, min: 300 } as const;
const maxPanelWidth = () => Math.max(sidePanelWidth.min, Math.floor(window.innerWidth / 2));
const clampPanelWidth = (width: number) => Math.min(maxPanelWidth(), Math.max(sidePanelWidth.min, Math.round(width)));

/**
 * The side panel's width, and the handle on its left edge that changes it (prds/sparks.md, "The concept workspace"):
 * drag it (the panel grows to the left), or focus it and use ←/→ (16px a step; Home and End for the smallest and the
 * largest). Always 300px to half the window; it shrinks with the window when that gets narrower.
 */
function useSidePanelWidth() {
	const [width, setWidth] = React.useState<number>(sidePanelWidth.initial);
	React.useEffect(() => {
		const fit = () => setWidth((current) => clampPanelWidth(current));
		fit();
		window.addEventListener("resize", fit);
		return () => window.removeEventListener("resize", fit);
	}, []);
	return [width, (next: number) => setWidth(clampPanelWidth(next))] as const;
}

/**
 * The handle on the panel's left edge: an 8px strip over the border, the resize cursor, and on hover, focus or while
 * dragging, a 2px line in the brand color. A `separator` she can focus, with the width as its value.
 */
function SidePanelResizer({ width, onWidthChange, label }: { width: number; onWidthChange: (width: number) => void; label: string }) {
	const [dragging, setDragging] = React.useState(false);
	const start = React.useRef<{ x: number; width: number } | null>(null);
	return (
		<div
			role='separator'
			aria-orientation='vertical'
			aria-label={label}
			aria-valuenow={width}
			aria-valuemin={sidePanelWidth.min}
			aria-valuemax={typeof window === "undefined" ? undefined : maxPanelWidth()}
			tabIndex={0}
			data-dragging={dragging || undefined}
			onPointerDown={(event) => {
				event.preventDefault();
				event.currentTarget.setPointerCapture(event.pointerId);
				start.current = { x: event.clientX, width };
				setDragging(true);
			}}
			onPointerMove={(event) => {
				if (!start.current) return;
				// The handle is on the left: moving left makes the panel wider.
				onWidthChange(start.current.width + (start.current.x - event.clientX));
			}}
			onPointerUp={() => {
				start.current = null;
				setDragging(false);
			}}
			onPointerCancel={() => {
				start.current = null;
				setDragging(false);
			}}
			onKeyDown={(event) => {
				const step = event.shiftKey ? 64 : 16;
				const next =
					event.key === "ArrowLeft"
						? width + step
						: event.key === "ArrowRight"
							? width - step
							: event.key === "Home"
								? sidePanelWidth.min
								: event.key === "End"
									? maxPanelWidth()
									: undefined;
				if (next === undefined) return;
				event.preventDefault();
				onWidthChange(next);
			}}
			className='group/resizer absolute inset-y-0 -start-1 z-10 w-2 cursor-col-resize touch-none outline-none'
		>
			<span
				aria-hidden
				className='absolute inset-y-0 start-[3px] w-0.5 bg-primary opacity-0 transition-opacity group-hover/resizer:opacity-100 group-focus-visible/resizer:opacity-100 group-data-[dragging]/resizer:opacity-100 motion-reduce:transition-none'
			/>
		</div>
	);
}

/** The panel row's icon buttons: ghost, 36px, an 18px icon in colors/icon/foreground. */
const sidePanelButtonClasses = "text-icon [&_svg]:size-[18px]";

export { SidePanel, SidePanelResizer, sidePanelButtonClasses, sidePanelWidth, useSidePanelWidth, type SidePanelProps };
