import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { CircleAlert, CircleCheck, Info, TriangleAlert, X } from "lucide-react";

import { Button } from "@/components/buttons/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/overlays/tooltip";
import { cn } from "@/lib/utils";

/*
 * sparks.ds "Inline Alert" (124:1584, Toast · Simple: Info, Success, Danger, Warning), on shadcn's Alert (`role`,
 * `data-slot`). One line in the page: the tone's icon, the message, an optional text action and an optional ×.
 * Colors are each tone's subtle fill and muted border (DESIGN.md → "Inline alert colors"), not Figma's 5% tints.
 */

const inlineAlertVariants = cva(
	// 40px tall for one line: Figma's 8px top and bottom, 12px before the icon and 8px after the × are measured from the
	// edge, with the 1px border inside them (Figma strokes are inside), so 1px less here. 8px corners.
	"flex min-h-10 w-full items-center gap-2 rounded-lg border py-[7px] ps-[11px] pe-[7px] [&>svg]:size-4 [&>svg]:shrink-0",
	{
		variants: {
			// Figma Property 3: Info, Success, Danger (UCL's `destructive`), Warning.
			tone: {
				info: "border-info-muted bg-info-subtle text-info",
				success: "border-success-muted bg-success-subtle text-success",
				destructive: "border-destructive-muted bg-destructive-subtle text-destructive",
				warning: "border-warning-muted bg-warning-subtle text-warning",
			},
		},
		defaultVariants: { tone: "info" },
	},
);

type InlineAlertTone = NonNullable<VariantProps<typeof inlineAlertVariants>["tone"]>;

/** "Action" turns the tone's darker shade on hover. */
const actionHover: Record<InlineAlertTone, string> = {
	info: "hover:text-info-emphasis",
	success: "hover:text-success-emphasis",
	destructive: "hover:text-destructive-emphasis",
	warning: "hover:text-warning-emphasis",
};

/** Each tone's icon: outline, but Warning's solid triangle (the sparks.ds warning icon, as in Publish's audience box). */
function ToneIcon({ tone }: { tone: InlineAlertTone }) {
	if (tone === "success") return <CircleCheck aria-hidden />;
	if (tone === "destructive") return <CircleAlert aria-hidden />;
	if (tone === "warning") return <TriangleAlert aria-hidden className='fill-warning [&>path:not(:first-child)]:stroke-warning-subtle' />;
	return <Info aria-hidden />;
}

type InlineAlertProps = Omit<React.ComponentProps<"div">, "role"> &
	VariantProps<typeof inlineAlertVariants> & {
		/** The message, one sentence (base medium, in the tone's color). */
		children: React.ReactNode;
		/** A text action after the message (sm medium, underlined), e.g. "Undo", "Retry". */
		action?: { label: string; onClick: () => void };
		/** Shows the × (a 24px ghost icon button, with a tooltip); called when it's selected. */
		onDismiss?: () => void;
		/** The ×'s name and tooltip. */
		dismissLabel?: string;
	};

/** A one-line message in the page, in one of four tones, with an optional action and ×. */
function InlineAlert({ tone = "info", children, action, onDismiss, dismissLabel = "Dismiss", className, ...props }: InlineAlertProps) {
	const resolved = tone ?? "info";
	return (
		<div
			data-slot='inline-alert'
			data-variant={resolved}
			// Danger and Warning interrupt (announced at once); Info and Success are announced politely.
			role={resolved === "destructive" || resolved === "warning" ? "alert" : "status"}
			className={cn(inlineAlertVariants({ tone: resolved }), className)}
			{...props}
		>
			<ToneIcon tone={resolved} />
			{/* The message, then the action and the ×, 4px apart. */}
			<div className='flex min-w-0 flex-1 items-center gap-1'>
				<p data-slot='inline-alert-description' className='min-w-0 flex-1 text-base font-medium'>
					{children}
				</p>
				{action ? (
					<button
						type='button'
						onClick={action.onClick}
						className={cn(
							"shrink-0 rounded-sm px-2 text-sm font-medium underline decoration-from-font underline-offset-2 outline-none transition-colors focus-visible:ring-[3px] focus-visible:ring-ring/50 motion-reduce:transition-none",
							actionHover[resolved],
						)}
					>
						{action.label}
					</button>
				) : null}
				{onDismiss ? (
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant='ghost'
								size='icon'
								aria-label={dismissLabel}
								onClick={onDismiss}
								className='size-6 shrink-0 rounded-button-xs text-icon-subtle hover:text-icon [&_svg]:size-3'
							>
								<X aria-hidden />
							</Button>
						</TooltipTrigger>
						<TooltipContent side='bottom' sideOffset={6}>
							{dismissLabel}
						</TooltipContent>
					</Tooltip>
				) : null}
			</div>
		</div>
	);
}

export { InlineAlert, inlineAlertVariants, type InlineAlertProps, type InlineAlertTone };
