import * as React from "react";
import { ChevronDown, MapPin } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { Badge } from "@/components/data-display/badge";
import { Button } from "@/components/buttons/button";
import { Typography } from "@/components/typography/typography";
import { expandVariants, useExpandClip, useMotionPreference } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * One way to solve the problem, as Sparks drafts it (prds/sparks-plan-generate-directions.md, "What each direction
 * shows"). Strategic, not a design: where it changes things, how it rates, and its catch. Screens come in Prototype.
 */
type DirectionDraft = {
	id: string;
	name: string;
	/** One sentence. */
	idea: string;
	/** Where it changes things, in Dana's words: "On the product page", "Behind the scenes: …". */
	where: string;
	/** Its effect on the main measure: a word, never a score. */
	effect: "Big" | "Some" | "Little" | "Unclear";
	effort: { size: "Small" | "Medium" | "Large"; reason: string };
	risk: { level: "Low" | "Medium" | "High"; reason: string };
	/** What must not get worse (online sales): safe, to watch, or at risk. Weighed in Sparks's pick. */
	notWorse: "Safe" | "Watch" | "At risk";
	/** Its main downside, in one line, always shown. */
	catch: string;
	good: string;
	/** Three to five steps, as the person affected would live them. */
	howItWorks: string[];
	/** Which success measures it's likely to move, and why, with the source. */
	expectedImpact: string;
	buildsOn: string;
	unknowns: string[];
	departments: string;
	/** A previous experiment it looks like, and what was learned. */
	triedBefore?: string;
	/** Dana's own idea, from her first message. */
	fromDana?: boolean;
	/** The one Sparks recommends. */
	recommended?: boolean;
};

/** One line of the card: its label, then the text. */
function DirectionLine({ label, children }: { label: string; children: React.ReactNode }) {
	return (
		<div className='flex flex-col gap-0.5'>
			<dt className='text-sm font-medium text-muted-foreground'>{label}</dt>
			<dd className='text-base text-foreground'>{children}</dd>
		</div>
	);
}

/** One rating in the row under the idea: its name, then the word. */
function Rating({ label, value }: { label: string; value: string }) {
	return (
		<div className='flex flex-col gap-0.5'>
			<dt className='text-xs text-muted-foreground'>{label}</dt>
			<dd className='text-sm font-semibold text-foreground'>{value}</dd>
		</div>
	);
}

type DirectionCardProps = {
	direction: DirectionDraft;
	/** Its place among the directions in the reply (1, 2…), Sparks's pick first: "1. Fit check before you buy". */
	number?: number;
	/**
	 * Its call to action, on the right of "More about it" ("Generate prototype", or "Open prototype" once it's built):
	 * the same as the direction's in the Blueprint (`directionActionFor` in workspace/plan-sections.tsx).
	 */
	action?: { label: string; onClick: () => void };
	className?: string;
};

/**
 * A direction as a card in the conversation, shown with the others in one reply: its name and idea, where it changes
 * things, its effect, effort and risk, and its catch; the rest is one select away ("More about it"). "Recommended" on
 * Sparks's pick, "Your idea" on Dana's. No screen preview: Plan stays strategic (prds/sparks-plan-generate-directions.md,
 * "What each direction shows"). Not in Figma yet.
 */
function DirectionCard({ direction, number, action, className }: DirectionCardProps) {
	const [open, setOpen] = React.useState(false);
	const { prefersReducedMotion } = useMotionPreference();
	const clip = useExpandClip();
	const detailsId = React.useId();

	return (
		<section
			aria-label={direction.name}
			className={cn(
				"flex flex-col gap-4 rounded-card border bg-background p-5 shadow-sm",
				direction.recommended ? "border-defined" : "border-border",
				className,
			)}
		>
			<header className='flex flex-col gap-1'>
				{/* The number and name on the left, its labels on the right of the same line. */}
				<div className='flex items-start justify-between gap-3'>
					<Typography as='h3' size='lg' weight='semibold' className='text-foreground-prominent'>
						{number ? `${number}. ` : null}
						{direction.name}
					</Typography>
					{direction.recommended || direction.fromDana ? (
						<div className='flex shrink-0 flex-wrap items-center justify-end gap-2 pt-0.5'>
							{direction.recommended ? (
								<Badge variant='flat' tone='green' size='xs'>
									Recommended
								</Badge>
							) : null}
							{direction.fromDana ? (
								<Badge variant='flat' tone='purple' size='xs'>
									Your idea
								</Badge>
							) : null}
						</div>
					) : null}
				</div>
				<p className='text-base text-foreground'>{direction.idea}</p>
				<p className='flex items-center gap-1.5 pt-1 text-sm text-muted-foreground'>
					<MapPin aria-hidden className='size-3.5 shrink-0' />
					{direction.where}
				</p>
			</header>

			{/* Words, not scores; the reasons are under "More about it". */}
			<dl className='grid grid-cols-3 gap-3 rounded-md bg-background-subtle px-4 py-3'>
				<Rating label='Effect' value={direction.effect} />
				<Rating label='Effort' value={direction.effort.size} />
				<Rating label='Risk' value={direction.risk.level} />
			</dl>

			<dl>
				<DirectionLine label='The catch'>{direction.catch}</DirectionLine>
			</dl>

			<div className='flex flex-col'>
				<div className='flex items-center justify-between gap-3'>
					<Button
						variant='ghost'
						size='sm'
						aria-expanded={open}
						aria-controls={detailsId}
						onClick={() => setOpen((value) => !value)}
						className='-ml-2 w-fit gap-1 rounded-button-md px-2 text-sm font-semibold text-foreground'
					>
						{open ? "Less about it" : "More about it"}
						<ChevronDown aria-hidden className={cn("transition-transform", open && "rotate-180")} />
					</Button>
					{/* The same outlined button as the Blueprint's, named after the direction for screen readers. */}
					{action ? (
						<Button
							variant='outline'
							size='sm'
							aria-label={`${action.label}: ${direction.name}`}
							className='rounded-button-md shadow-xs'
							onClick={action.onClick}
						>
							{action.label}
						</Button>
					) : null}
				</div>
				<AnimatePresence initial={false}>
					{open ? (
						<motion.div
							key='details'
							id={detailsId}
							{...clip}
							variants={expandVariants}
							initial={prefersReducedMotion ? false : "initial"}
							animate='animate'
							exit={prefersReducedMotion ? undefined : "exit"}
						>
							<dl className='flex flex-col gap-3 pt-3'>
								<DirectionLine label="What's good">{direction.good}</DirectionLine>
								<DirectionLine label='How it works'>
									<ol className='flex list-decimal flex-col gap-1 ps-5'>
										{direction.howItWorks.map((step) => (
											<li key={step}>{step}</li>
										))}
									</ol>
								</DirectionLine>
								<DirectionLine label='Expected effect'>{direction.expectedImpact}</DirectionLine>
								{direction.triedBefore ? <DirectionLine label='Tried before'>{direction.triedBefore}</DirectionLine> : null}
								<DirectionLine label='Effort'>
									{direction.effort.size}. {direction.effort.reason}
									<span className='block text-xs text-muted-foreground'>Sparks's estimate. Engineering confirms it in Review.</span>
								</DirectionLine>
								<DirectionLine label='Risk'>
									{direction.risk.level}. {direction.risk.reason}
								</DirectionLine>
								<DirectionLine label='Builds on'>{direction.buildsOn}</DirectionLine>
								<DirectionLine label="What we don't know yet">
									<ul className='flex list-disc flex-col gap-1 ps-5'>
										{direction.unknowns.map((unknown) => (
											<li key={unknown}>{unknown}</li>
										))}
									</ul>
								</DirectionLine>
								<DirectionLine label='Teams it touches'>{direction.departments}</DirectionLine>
							</dl>
						</motion.div>
					) : null}
				</AnimatePresence>
			</div>
		</section>
	);
}

export { DirectionCard, type DirectionCardProps, type DirectionDraft };
