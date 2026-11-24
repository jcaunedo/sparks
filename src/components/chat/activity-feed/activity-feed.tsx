import * as React from "react";
import { Check, ChevronRight, Minus } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { ThinkingDot, ThinkingIndicator } from "@/components/chat/thinking-indicator/thinking-indicator";
import {
	drawVariants,
	expandVariants,
	fadeVariants,
	feedItemVariants,
	iconSwapReducedVariants,
	layoutSpring,
	reducedMotionTransition,
	useExpandClip,
	useMotionPreference,
} from "@/lib/motion";
import { cn } from "@/lib/utils";

/*
 * The assistant doing a long piece of work, step by step. The same pattern as archie-ucl's activity feed and "Thought for
 * Ns", with Sparks's own thinking dot and line. Not in sparks.ds yet.
 */

/** The live feed shows this many steps at most; older ones slide out at the top. */
const feedSize = 5;

/** "8s", "1m 20s". */
function formatSeconds(seconds: number) {
	return seconds < 60 ? `${seconds}s` : `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
}

/** How long it's been working, counting up. Hidden from screen readers: the status is the live region. */
function ElapsedTime({ since }: { since: number }) {
	const [now, setNow] = React.useState(() => Date.now());
	React.useEffect(() => {
		const timer = window.setInterval(() => setNow(Date.now()), 1000);
		return () => window.clearInterval(timer);
	}, []);
	return (
		<span aria-hidden className='shrink-0 text-sm text-muted-foreground tabular-nums'>
			· {formatSeconds(Math.max(0, Math.floor((now - since) / 1000)))}
		</span>
	);
}

/** A finished step's check, drawn on from its short stroke (Draw). */
function DrawnCheck() {
	const { prefersReducedMotion } = useMotionPreference();
	return (
		<svg
			aria-hidden
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth={2}
			strokeLinecap='round'
			strokeLinejoin='round'
			className='size-3.5 text-icon-muted'
		>
			<motion.path
				d='M4 12l5 5L20 6'
				variants={prefersReducedMotion ? iconSwapReducedVariants : drawVariants}
				initial='hidden'
				animate='shown'
			/>
		</svg>
	);
}

type ActivityFeedProps = Omit<React.ComponentProps<"div">, "children"> & {
	/** What it's doing overall, in one line that changes in place ("Assembling your prototype…"). */
	status: string;
	/** The steps so far, oldest first. While it works, the last is the one in progress. */
	steps: string[];
	/** When it started (ms), for the time counting up beside the status. */
	startedAt?: number;
	/** It's over: the feed folds to one line, `doneLabel`, that opens to show every step. */
	done?: boolean;
	/** The line it folds to ("Built in 18s"). */
	doneLabel?: string;
	/** It ended before finishing: the line has a dash instead of a check. */
	stopped?: boolean;
};

/**
 * The assistant's work as it happens: one live status, and under it the latest five steps, each new one sliding up at the
 * bottom (Feed), a check drawn on the finished ones and the hopping dot on the one in progress. Done, it folds to one line
 * that opens to show the steps. The feed is hidden from screen readers; the status announces, and the steps can be read
 * once it's done.
 */
function ActivityFeed({ status, steps, startedAt, done = false, doneLabel, stopped = false, className, ...props }: ActivityFeedProps) {
	const { prefersReducedMotion } = useMotionPreference();
	const [open, setOpen] = React.useState(false);
	const clip = useExpandClip();
	const listId = React.useId();
	const first = Math.max(0, steps.length - feedSize);

	if (done) {
		const Icon = stopped ? Minus : Check;
		return (
			<div data-slot='activity-feed' className={cn("flex flex-col", className)} {...props}>
				<button
					type='button'
					aria-expanded={open}
					aria-controls={listId}
					onClick={() => setOpen((current) => !current)}
					className='group flex w-fit max-w-full items-center gap-1.5 rounded-sm text-left text-sm text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-expanded:text-foreground motion-reduce:transition-none'
				>
					<Icon aria-hidden className={cn("size-4 shrink-0", stopped ? "text-icon-muted" : "text-success")} />
					<span className='min-w-0'>{doneLabel}</span>
					<ChevronRight
						aria-hidden
						className='size-4 shrink-0 text-icon-muted transition-transform group-aria-expanded:rotate-90 motion-reduce:transition-none'
					/>
				</button>
				<div id={listId}>
					<AnimatePresence initial={false}>
						{open ? (
							<motion.div
								{...clip}
								variants={expandVariants}
								initial='initial'
								animate='animate'
								exit='exit'
								transition={prefersReducedMotion ? reducedMotionTransition : undefined}
							>
								<ol className='flex flex-col gap-1 pt-2 text-sm text-muted-foreground'>
									{steps.map((step, index) => (
										<li key={index} className='flex items-start gap-1.5'>
											<span aria-hidden className='grid h-5 w-4 shrink-0 place-items-center'>
												<span className='size-1.5 rounded-full bg-border-defined' />
											</span>
											<span className='min-w-0'>{step}</span>
										</li>
									))}
								</ol>
							</motion.div>
						) : null}
					</AnimatePresence>
				</div>
			</div>
		);
	}

	return (
		<div data-slot='activity-feed' className={cn("flex flex-col gap-2", className)} {...props}>
			<div className='flex min-w-0 items-center gap-1.5'>
				<ThinkingIndicator steps={[status]} className='min-w-0' />
				{startedAt ? <ElapsedTime since={startedAt} /> : null}
			</div>
			<ul aria-hidden className='flex flex-col gap-1'>
				<AnimatePresence initial={false} mode='popLayout'>
					{steps.slice(first).map((step, offset) => {
						const index = first + offset;
						const latest = index === steps.length - 1;
						return (
							<motion.li
								key={index}
								layout={!prefersReducedMotion}
								variants={prefersReducedMotion ? fadeVariants : feedItemVariants}
								initial='initial'
								animate='animate'
								exit='exit'
								transition={{ layout: layoutSpring }}
								className={cn("flex items-center gap-2 text-sm", latest ? "text-foreground" : "text-muted-foreground")}
							>
								{/* The status dot's 10px column, so the steps line up under its label (14px icons, 2px over each side). */}
								<span className='-mx-0.5 grid size-3.5 shrink-0 place-items-center'>
									{latest ? (
										<ThinkingDot still={Boolean(prefersReducedMotion)} className='size-1.5' />
									) : (
										// Its own AnimatePresence, so the check draws on a step that was in the feed from its first render.
										<AnimatePresence>
											<DrawnCheck key='check' />
										</AnimatePresence>
									)}
								</span>
								<span className='min-w-0 truncate ps-0.5'>{step}</span>
							</motion.li>
						);
					})}
				</AnimatePresence>
			</ul>
		</div>
	);
}

export { ActivityFeed, formatSeconds, type ActivityFeedProps };
