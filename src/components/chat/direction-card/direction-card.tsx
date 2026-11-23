import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { ChevronDown, ChevronsDownUp, ChevronsUpDown, MapPin } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { Button } from "@/components/buttons/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/overlays/tooltip";
import { Typography } from "@/components/typography/typography";
import { expandVariants, useExpandClip, useMotionPreference } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** A labeled line of the card: its label (base semibold), then what it says. */
type DirectionCardLine = { label: string; content: React.ReactNode };

/** One rating in the row under the description: its name, then a word ("Effect", "Big"). */
type DirectionCardRating = { label: string; value: string };

const directionCardVariants = cva(
	// sparks.ds "direction-card": white, 1px border, 16px corners, 20px padding, 16px between its parts, shadow-sm.
	"flex flex-col gap-4 rounded-card border bg-background p-5 shadow-sm",
	{
		variants: {
			// The assistant's pick stands out (Figma's only variant, colors/border/defined); the others take the default border.
			emphasized: {
				true: "border-border-defined",
				false: "border-border",
			},
		},
		defaultVariants: { emphasized: false },
	},
);

type DirectionCardProps = Omit<React.ComponentProps<"section">, "title" | "children"> &
	VariantProps<typeof directionCardVariants> & {
		/** Its name, e.g. "Fit check before you buy". */
		title: string;
		/** Its place among the directions shown together (1, 2…): "1. Fit check before you buy". */
		number?: number;
		/** Labels on the right of the title, e.g. a flat green `Badge` "Recommended" (size `xs`). */
		badges?: React.ReactNode;
		/** One sentence: what it is. */
		description: React.ReactNode;
		/** Where it changes things, after a map pin, e.g. "On the product page". */
		location?: React.ReactNode;
		/** Words, not scores, in one row: e.g. Effect, Effort, Risk. */
		ratings?: DirectionCardRating[];
		/** Always shown, under the ratings, e.g. "The catch". */
		lines?: DirectionCardLine[];
		/** Shown with "Show more", e.g. "What's good", "How it works". A list in `content` gets the card's list style. */
		details?: DirectionCardLine[];
		/** Its call to action, full width at the bottom, e.g. "Generate prototype". */
		action?: { label: string; onClick: () => void };
		/** Opens with the details shown (Figma "State=Expanded"), e.g. for a story. */
		defaultOpen?: boolean;
	};

/** A labeled line: label and text 2px apart; lists inside indent 24px, items 4px apart. */
function Line({ label, content }: DirectionCardLine) {
	return (
		<div className='flex flex-col gap-0.5 text-base text-foreground'>
			<dt className='font-semibold'>{label}</dt>
			<dd className='[&_ol]:flex [&_ol]:list-decimal [&_ol]:flex-col [&_ol]:gap-1 [&_ol]:ps-6 [&_ul]:flex [&_ul]:list-disc [&_ul]:flex-col [&_ul]:gap-1 [&_ul]:ps-6'>
				{content}
			</dd>
		</div>
	);
}

/**
 * One way to solve a problem, as the AI assistant proposes it in the conversation (sparks.ds "direction-card", node
 * 89:151: State=Collapsed and State=Expanded): its name and badges, description, where it changes things, its ratings
 * and the lines always shown; the details one select away ("Show more", or anywhere on the header, with the chevrons on the
 * right of the title); and its action, full width at the bottom.
 */
function DirectionCard({
	title,
	number,
	badges,
	description,
	location,
	ratings = [],
	lines = [],
	details = [],
	action,
	defaultOpen = false,
	emphasized = false,
	className,
	...props
}: DirectionCardProps) {
	const [open, setOpen] = React.useState(defaultOpen);
	const { prefersReducedMotion } = useMotionPreference();
	const clip = useExpandClip();
	const detailsId = React.useId();
	const expandable = details.length > 0;
	const toggle = () => setOpen((value) => !value);
	const toggleLabel = open ? "Show less" : "Show more";

	// The whole header opens and closes the details, like "Show more"; a click on a link or button inside it (a badge's
	// popover, the chevrons) does its own thing. Keyboard and screen readers use the chevrons button, which says the state.
	const onHeaderClick = (event: React.MouseEvent<HTMLElement>) => {
		if (!expandable || (event.target as HTMLElement).closest("a, button, [role='button']")) return;
		toggle();
	};

	return (
		<section
			data-slot='direction-card'
			data-state={open ? "open" : "closed"}
			aria-label={title}
			className={cn(directionCardVariants({ emphasized, className }))}
			{...props}
		>
			<header className={cn("group/header flex flex-col gap-1", expandable && "cursor-pointer")} onClick={onHeaderClick}>
				{/* Figma "Title": the number and name on the left, the badges and the chevrons on the right of the same line; 4px more below it. */}
				<div className='flex items-start gap-3 pb-1'>
					<Typography as='h3' size='lg' weight='semibold' className='min-w-0 flex-1 text-foreground-prominent'>
						{number ? `${number}. ` : null}
						{title}
					</Typography>
					{/* Figma "Labels": the badges, then the 20px chevrons (up-down closed, down-up open), 8px apart: foreground-subtle,
					the icon color while the header is hovered. */}
					{badges || expandable ? (
						<div className='flex shrink-0 flex-wrap items-center justify-end gap-2 pt-0.5'>
							{badges}
							{expandable ? (
								<Tooltip>
									<TooltipTrigger asChild>
										<button
											type='button'
											aria-expanded={open}
											aria-controls={detailsId}
											aria-label={`${toggleLabel}: ${title}`}
											onClick={toggle}
											className='rounded-sm text-foreground-subtle outline-none transition-colors group-hover/header:text-icon focus-visible:text-icon focus-visible:ring-[3px] focus-visible:ring-ring/50 motion-reduce:transition-none'
										>
											{open ? <ChevronsDownUp aria-hidden className='size-5' /> : <ChevronsUpDown aria-hidden className='size-5' />}
										</button>
									</TooltipTrigger>
									<TooltipContent side='bottom' sideOffset={6}>
										{toggleLabel}
									</TooltipContent>
								</Tooltip>
							) : null}
						</div>
					) : null}
				</div>
				<p className='text-base text-foreground'>{description}</p>
				{/* Figma "Where": a 14px map pin and the text in colors/decorative/decorative-1. */}
				{location ? (
					<p className='flex items-center gap-1.5 pt-1 text-sm text-decorative-1'>
						<MapPin aria-hidden className='size-3.5 shrink-0' />
						{location}
					</p>
				) : null}
			</header>

			{/* Figma "Ratings": equal columns on background-subtle, 6px corners. */}
			{ratings.length ? (
				<dl className='grid auto-cols-fr grid-flow-col gap-3 rounded-md bg-background-subtle px-4 py-3'>
					{ratings.map((rating) => (
						<div key={rating.label} className='flex flex-col gap-0.5'>
							<dt className='text-xs text-muted-foreground'>{rating.label}</dt>
							<dd className='text-sm font-semibold text-foreground'>{rating.value}</dd>
						</div>
					))}
				</dl>
			) : null}

			{/* The lines, then the details (16px below them) when open, then the toggle 8px below whichever is last. */}
			{lines.length || details.length ? (
				<div className='flex flex-col gap-2'>
					<div className='flex flex-col'>
						{lines.length ? (
							<dl className='flex flex-col gap-4'>
								{lines.map((line) => (
									<Line key={line.label} {...line} />
								))}
							</dl>
						) : null}
						<AnimatePresence initial={false}>
							{open && details.length ? (
								<motion.div
									key='details'
									id={detailsId}
									{...clip}
									variants={expandVariants}
									initial={prefersReducedMotion ? false : "initial"}
									animate='animate'
									exit={prefersReducedMotion ? undefined : "exit"}
								>
									<dl className={cn("flex flex-col gap-4", lines.length && "pt-4")}>
										{details.map((line) => (
											<Line key={line.label} {...line} />
										))}
									</dl>
								</motion.div>
							) : null}
						</AnimatePresence>
					</div>
					{/* "Show more" / "Show less": sm medium in the brand color, a 16px chevron 4px after it. */}
					{expandable ? (
						<Button
							variant='link'
							aria-expanded={open}
							aria-controls={detailsId}
							onClick={toggle}
							className='h-auto w-fit gap-1 p-0 text-sm font-medium [&_svg]:size-4'
						>
							{toggleLabel}
							<ChevronDown aria-hidden className={cn("transition-transform motion-reduce:transition-none", open && "rotate-180")} />
						</Button>
					) : null}
				</div>
			) : null}

			{/* Figma "Generate prototype": Button Outlined xl · 40, full width, 12px corners, base semibold, shadow-xs. */}
			{action ? (
				<Button
					variant='outline'
					size='lg'
					aria-label={`${action.label}: ${title}`}
					className='w-full rounded-button-xl text-base font-semibold text-foreground shadow-xs'
					onClick={action.onClick}
				>
					{action.label}
				</Button>
			) : null}
		</section>
	);
}

export { DirectionCard, directionCardVariants, type DirectionCardLine, type DirectionCardProps, type DirectionCardRating };
