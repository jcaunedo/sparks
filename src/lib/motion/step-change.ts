import { cubicBezier, type Transition } from "motion/react";

import { motionDuration } from "./tokens";

/**
 * Step change: one screen of panels giving way to another, with a panel (and what's in it) they share gliding between
 * its two places. Run `animate(0, 1, { ...stepChangeTransition, onUpdate })` and read each part's progress from
 * `stepChangeAt(t)`, so the parts overlap as one move and nothing shows over something else: what leaves clears first,
 * then what's new comes in while the shared panel settles.
 */
const stepChangeTransition: Transition = { duration: motionDuration.slow, ease: "linear" };

/* The standard curve for what moves; a quick start and a gentle finish for what fades. */
const moveEase = cubicBezier(0.4, 0, 0.2, 1);
const fadeEase = cubicBezier(0, 0, 0.2, 1);
const during = (t: number, from: number, to: number) => Math.min(1, Math.max(0, (t - from) / (to - from)));

/** Each part's progress (0–1) at `t`. */
const stepChangeAt = (t: number) => ({
	/** The shared panel and what's in it, from one place to the other. */
	move: moveEase(t),
	/** What leaves, fading out: gone in the first third. */
	leave: fadeEase(during(t, 0, 0.35)),
	/** What's new in the shared panel, fading in. */
	enter: fadeEase(during(t, 0.2, 0.6)),
	/** The panel beside it, coming in once what was there is gone. */
	side: fadeEase(during(t, 0.3, 1)),
	/** The picture of the shared element as it was, fading out over the real one once that's in place. */
	settle: fadeEase(during(t, 0.55, 1)),
});

export { stepChangeAt, stepChangeTransition };
