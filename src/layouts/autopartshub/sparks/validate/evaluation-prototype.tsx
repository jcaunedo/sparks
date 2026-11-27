import * as React from "react";
import { BarChart3, Check, LayoutTemplate, Type, Wrench, type LucideIcon } from "lucide-react";
import { AnimatePresence, motion, useAnimationControls } from "motion/react";

import { layoutSpring, motionDistance, motionDuration, standardTransition, useMotionPreference } from "@/lib/motion";
import { cn } from "@/lib/utils";

import { phoneSize, PrototypeNote, prototypeDeviceClasses, ScreenArrow, type PrototypeAudience } from "../prototype/prototype-panel";
import { PanelAction } from "../shared/panel-action";
import { VersionsMenu } from "../shared/versions-menu";
import type { EvaluationFinding, PrototypeStop } from "./validate-panel";

/*
 * The prototype in Evaluate, with Sparks's agents working it all at once (Figma Sparks "Evaluate", 72:660;
 * prds/sparks-validate.md, "The agents"): the prototype's screens side by side on a strip that slides from one to the
 * next, and over them the agents at work, pointers with their name, each going to the places its steps name, at its
 * own pace. Where a finding happens, a numbered marker drops.
 */

/** A place on the strip: one screen of the prototype (a part, for a product page). */
type ScreenAt = Omit<PrototypeStop, "element">;
const keyOf = (at: ScreenAt) => `${at.view}${at.part ? `:${at.part}` : ""}`;

/**
 * An agent: a scenario (a customer or a store associate, in a situation; screen reader and keyboard ones too) or an
 * expert in a role (UX expert, Copywriter, Engineer, Data analyst). Each stop: where it goes, what Sparks saw there,
 * and the finding it reveals there, if any.
 */
type EvaluationAgent = {
	id: string;
	label: string;
	kind: "customer" | "access" | "expert";
	stops: { at: PrototypeStop; note: string; finding?: string }[];
};

/** A finding's numbered marker, on the element where it happens. */
type EvaluationMarker = { id: string; number: number; title: string; at: PrototypeStop; severity: EvaluationFinding["severity"]; fixed?: boolean };

type EvaluationPrototypeProps = {
	/** The audience each screen is for (its device follows). */
	audienceFor: (view: number) => PrototypeAudience;
	/** The prototype for an audience, opened on a screen (and part). */
	children: (audience: string, at: ScreenAt) => React.ReactNode;
	/** The strip: the prototype's screens in the journey's order, each named. */
	screens: { at: ScreenAt; label: string }[];
	/** The paths and versions, as in Prototype: the title is the menu. */
	paths?: { id: string; label: string }[];
	path?: string;
	onPathChange?: (id: string) => void;
	versions?: { id: string; name: string }[];
	onRestore?: (id: string) => void;
	/** Published: the version the teams see and when, after "Version {n}" under the title (as in Prototype and Review). */
	published?: { version: number; at: string };
	/** "Add to Review": her go-ahead (prds/sparks-validate.md, "Go ahead or keep improving"). Disabled while it runs. */
	onAddToReview?: () => void;
	/** Why "Add to Review" can't be used now (a run is going, or the prototype changed after the last one): disabled, with this in its tooltip. */
	addToReviewBlocked?: string;
	agents: EvaluationAgent[];
	/**
	 * A run in progress: the agents work the prototype, screen by screen, all those on a screen at once. A new `key` starts
	 * one; `done` are the agents already finished (a run picked up again after leaving the step).
	 */
	run?: { key: number; done: string[] };
	onAgentStart?: (id: string) => void;
	onAgentDone?: (id: string) => void;
	/** The screen the agents are on, and how many: for the progress. */
	onScreen?: (label: string, agents: number) => void;
	/** Every agent has been everywhere its steps name. */
	onAgentsDone?: () => void;
	/** One agent going through its stops again, slower, with what Sparks saw at each. */
	watching?: { id: string; key: number };
	onWatchEnd?: () => void;
	markers?: EvaluationMarker[];
	/** All the markers show (a finished run); otherwise each drops when an agent finds it. */
	revealMarkers?: boolean;
	/**
	 * A finding selected in the evaluation: the strip slides to its screen, and its marker pops. `fromScreen`: selected by
	 * the screen in focus (`onScreenFindings`), so the strip stays where it is (DESIGN.md → "The strip doesn't follow what
	 * it selected").
	 */
	focus?: { id: string; key: number; fromScreen?: boolean };
	onMarkerSelect?: (id: string) => void;
	/**
	 * The screen in focus once the run is done (or when the strip moves to another): the findings marked on it, so the
	 * evaluation can bring the first into view.
	 */
	onScreenFindings?: (ids: string[]) => void;
	className?: string;
};

/** The customers' colors: the Sparks logo's, in its order (as the thinking dot), the text dark on citrine. */
const agentColors = [
	{ fill: "var(--sapphire)", text: "text-white" },
	{ fill: "var(--tangerine)", text: "text-white" },
	{ fill: "var(--amethyst)", text: "text-white" },
	{ fill: "var(--clover)", text: "text-white" },
	{ fill: "var(--cerulean)", text: "text-white" },
	{ fill: "var(--citrine)", text: "text-foreground-prominent" },
];
/** Experts are dark, with their role's icon: they review, they don't shop. */
const expertColor = { fill: "var(--gray-800)", text: "text-white" };
const expertIcons: Record<string, LucideIcon> = { ux: LayoutTemplate, copy: Type, engineer: Wrench, data: BarChart3 };

/** The base of an agent's time at a place: a line of Sparks's thinking. Each agent's temperament scales it. */
const stopMs = motionDuration.thinkingStep * 1000;
/** Agents on the same screen start a moment apart, so they don't arrive as one. */
const staggerMs = motionDuration.slow * 1000;
/** The strip's slide to the next screen. */
const slideMs = motionDuration.deliberate * 1000;

type Point = { x: number; y: number };
type Box = Point & { w: number; h: number };
/**
 * Where a working agent is: a screen, and a point on an element there (`fx`, `fy`: where across and down it, 0 to 1), or
 * on the screen itself while it looks around (no `element`); what it saw there, and a counter for its taps.
 */
type Pose = { screen: string; element?: string; fx: number; fy: number; note?: string; pulse: number };

/**
 * How an agent moves, so no two move alike (prds/sparks-validate.md, "The agents"): how fast its hand is (`stiffness`,
 * `damping`, `mass`, for its spring), how many places it glances at before going to the element (`glances`), how long
 * it hovers before it acts (`hoverMs`), how much its hand wanders while it hovers (`wander`), and how long it stays
 * (`dwell`, × `stopMs`). Scenarios get one from their situation (someone in a hurry goes straight there; a first-time
 * buyer looks around and hesitates); experts from how they work; the rest from their id, the same every time.
 */
type Temperament = { stiffness: number; damping: number; mass: number; glances: number; hoverMs: number; wander: number; dwell: number };

/** A random number generator seeded by a string: the same agent always gets the same temperament and route. */
function seeded(seed: string) {
	let h = 2166136261;
	for (const c of seed) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
	return () => {
		h = Math.imul(h ^ (h >>> 15), 2246822507);
		h = Math.imul(h ^ (h >>> 13), 3266489909);
		return ((h ^= h >>> 16) >>> 0) / 4294967296;
	};
}

function temperamentOf(agent: EvaluationAgent): Temperament {
	const r = seeded(agent.id);
	const between = (min: number, max: number) => min + r() * (max - min);
	const said = `${agent.id} ${agent.label}`.toLowerCase();
	if (agent.kind === "expert") {
		// The Copywriter reads slowly, word by word; the Data analyst hops; the Engineer goes straight to what it checks.
		if (agent.id === "copy") return { stiffness: 60, damping: 14, mass: 1.05, glances: 0, hoverMs: 400, wander: 0.015, dwell: 1.1 };
		if (agent.id === "data") return { stiffness: 150, damping: 18, mass: 0.7, glances: 2, hoverMs: 150, wander: 0.03, dwell: 0.9 };
		if (agent.id === "engineer") return { stiffness: 120, damping: 22, mass: 0.8, glances: 0, hoverMs: 250, wander: 0.01, dwell: 1 };
		return { stiffness: 80, damping: 17, mass: 0.9, glances: 1, hoverMs: 350, wander: 0.02, dwell: 1.2 };
	}
	if (/hurry/.test(said)) return { stiffness: 190, damping: 20, mass: 0.6, glances: 0, hoverMs: 80, wander: 0.01, dwell: 0.55 };
	if (/mechanic|counter|store|associate|order|catalog|returns|monday/.test(said))
		return { stiffness: between(120, 150), damping: 20, mass: 0.75, glances: 0, hoverMs: between(150, 300), wander: 0.015, dwell: between(0.7, 0.9) };
	if (/first|new|guest/.test(said)) return { stiffness: 55, damping: 13, mass: 1.1, glances: 2, hoverMs: 600, wander: 0.05, dwell: 1.1 };
	if (/older|plugs|no-fit|missing|careful/.test(said)) return { stiffness: 65, damping: 13, mass: 1.05, glances: 1, hoverMs: 600, wander: 0.04, dwell: 1.1 };
	return {
		stiffness: between(60, 120),
		damping: between(13, 19),
		mass: between(0.8, 1.1),
		glances: Math.round(between(0, 2)),
		hoverMs: between(250, 650),
		wander: between(0.015, 0.035),
		dwell: between(0.8, 1.2),
	};
}

const wait = (ms: number, signal: { cancelled: boolean }) =>
	new Promise<void>((resolve, reject) => setTimeout(() => (signal.cancelled ? reject(new Error("cancelled")) : resolve()), ms));
const targetIn = (root: Element | null | undefined, element?: string) =>
	element ? (root?.querySelector<HTMLElement>(`[data-point="${element}"], [data-agent="${element}"]`) ?? null) : null;

/** The pointer, as in a multiplayer canvas: an arrow in the agent's color, outlined white. */
function Pointer({ fill }: { fill: string }) {
	return (
		<svg aria-hidden width='20' height='22' viewBox='0 0 20 22' className='drop-shadow-sm'>
			<path d='M3 2.2 18 10.4l-7.2 1.9-3.5 7.5Z' fill={fill} stroke='white' strokeWidth='1.8' strokeLinejoin='round' />
		</svg>
	);
}

/** What Sparks saw at a place, under the agent's name (or above it near the bottom), labeled "AI evaluation". */
function AgentNote({ note, pulse, below, className }: { note: string; pulse: number; below: boolean; className?: string }) {
	const { prefersReducedMotion, resolve } = useMotionPreference();
	return (
		<motion.span
			key={`${pulse}-${note}`}
			initial={prefersReducedMotion ? false : { opacity: 0, y: motionDistance.subtle }}
			animate={{ opacity: 1, y: 0 }}
			transition={resolve(standardTransition)}
			className={cn(
				"absolute w-[220px] rounded-lg border border-border bg-background p-2.5 text-xs text-foreground shadow-lg",
				below ? "top-[calc(100%+8px)]" : "bottom-[10px]",
				className ?? "left-[14px]",
				!className && below && "top-[46px]",
			)}
		>
			<span className='block pb-0.5 text-[10px] font-medium tracking-wide text-muted-foreground uppercase'>AI evaluation</span>
			{note}
		</motion.span>
	);
}

/**
 * Evaluate's right panel: the path and its versions (the title is the menu, as in Prototype) and "Add to Review"; then
 * the strip of the prototype's screens, the one in focus in the middle, in a phone with a dark bezel (or a monitor),
 * the others smaller and faded on either side; under it, the way to the others. While it runs, the strip goes through
 * the journey, and every agent with a place on the screen in focus comes in, at its own moment and pace, works there
 * and leaves: only the agents at work show. Done, the strip can be dragged and a screen on either side selected.
 */
function EvaluationPrototype({
	audienceFor,
	children,
	screens,
	paths = [],
	path,
	onPathChange,
	versions = [],
	onRestore,
	published,
	onAddToReview,
	addToReviewBlocked,
	agents,
	run,
	onAgentStart,
	onAgentDone,
	onScreen,
	onAgentsDone,
	watching,
	onWatchEnd,
	markers = [],
	revealMarkers = false,
	focus,
	onMarkerSelect,
	onScreenFindings,
	className,
}: EvaluationPrototypeProps) {
	const { prefersReducedMotion, resolve } = useMotionPreference();
	const stageRef = React.useRef<HTMLDivElement>(null);
	const itemRefs = React.useRef(new Map<string, HTMLDivElement>());
	const scrollerRefs = React.useRef(new Map<string, HTMLDivElement>());
	const track = useAnimationControls();
	// It opens on the finding selected before she left (a fix made in Prototype), if there's one.
	const selectedMarker = focus?.fromScreen ? undefined : markers.find((m) => m.id === focus?.id);
	// Otherwise, with a finished run, on its first open finding.
	const opensOn = selectedMarker ?? (revealMarkers ? markers.find((m) => !m.fixed) : undefined);
	const [index, setIndex] = React.useState(() => Math.max(0, opensOn ? screens.findIndex((s) => keyOf(s.at) === keyOf(opensOn.at)) : 0));
	const [stage, setStage] = React.useState({ w: 0, h: 0 });
	// Only the agents at work have a pose; the others aren't shown.
	const [poses, setPoses] = React.useState<Record<string, Pose>>({});
	const [points, setPoints] = React.useState<Record<string, Point>>({});
	// Each agent's temperament, fixed for it.
	const temperaments = React.useMemo(() => Object.fromEntries(agents.map((a) => [a.id, temperamentOf(a)])), [agents]);
	const [boxes, setBoxes] = React.useState<Record<string, Box>>({});
	const [markerBoxes, setMarkerBoxes] = React.useState<Record<string, Box>>({});
	const [found, setFound] = React.useState<Set<string>>(new Set());
	const running = Boolean(run);
	const busy = running || Boolean(watching);
	const focused = screens[Math.min(index, screens.length - 1)];

	const pose = (id: string, next: Omit<Pose, "pulse"> & { tap?: boolean }) =>
		setPoses((current) => {
			const { tap, ...rest } = next;
			return { ...current, [id]: { ...rest, pulse: (current[id]?.pulse ?? 0) + (tap ? 1 : 0) } };
		});
	const leave = (id: string) =>
		setPoses((current) => {
			const { [id]: _gone, ...rest } = current;
			return rest;
		});
	const goTo = (at: ScreenAt) => {
		const i = screens.findIndex((s) => keyOf(s.at) === keyOf(at));
		if (i >= 0) setIndex(i);
	};
	const step = (by: number) => setIndex((i) => Math.min(screens.length - 1, Math.max(0, i + by)));

	// The stage's size: the devices fit its height.
	React.useLayoutEffect(() => {
		const node = stageRef.current;
		if (!node) return;
		const measure = () => setStage({ w: node.clientWidth, h: node.clientHeight });
		measure();
		const observer = new ResizeObserver(measure);
		observer.observe(node);
		return () => observer.disconnect();
	}, []);
	// The phone at its real size, scaled as a whole to fit the strip's height (never squashed): a phone's proportions.
	const fit = Math.max(0.45, Math.min(1, (stage.h - 40) / phoneSize.height));
	const deviceH = Math.round(phoneSize.height * fit);

	// The strip slides so the screen in focus is in the middle.
	const centerOf = (i: number) => {
		const item = screens[i] && itemRefs.current.get(keyOf(screens[i].at));
		return item ? stage.w / 2 - (item.offsetLeft + item.offsetWidth / 2) : 0;
	};
	const placed = React.useRef(false);
	React.useLayoutEffect(() => {
		if (!stage.w) return;
		// It opens with its screen in the middle already; from then on it slides.
		if (!placed.current) track.set({ x: centerOf(index) });
		else void track.start({ x: centerOf(index) }, resolve({ ...layoutSpring }));
		placed.current = true;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [index, stage.w, deviceH, screens.length]);

	/** Brings an element into view inside its screen's device, if it's out of it. */
	const scrollTo = (screen: string, element?: string) => {
		const scroller = scrollerRefs.current.get(screen);
		const target = targetIn(scroller, element);
		if (!scroller || !target) return;
		const t = target.getBoundingClientRect();
		const s = scroller.getBoundingClientRect();
		// On screen, the phone may be scaled: scrolling is in its own pixels.
		const k = s.height / (scroller.clientHeight || s.height || 1) || 1;
		if (t.top < s.top + 24 || t.bottom > s.bottom - 24)
			scroller.scrollTo({ top: scroller.scrollTop + (t.top - s.top - s.height / 3) / k, behavior: prefersReducedMotion ? "auto" : "smooth" });
	};

	/**
	 * One agent at one place, the way it works: a customer glances around the screen (as many times as its temperament
	 * says), goes to the element, hovers, its hand wandering a little, and taps; an expert goes to the start of what it
	 * reads and moves along it, its note open; a screen reader or keyboard agent's focus lands on the element. With
	 * `watch`, it stays longer and shows what Sparks saw there, whatever kind it is.
	 */
	const act = async (
		agent: EvaluationAgent,
		screen: string,
		stop: EvaluationAgent["stops"][number],
		signal: { cancelled: boolean },
		{ watch = false, arriving = true, last = true }: { watch?: boolean; arriving?: boolean; last?: boolean } = {},
	) => {
		const t = temperaments[agent.id];
		const r = seeded(`${agent.id}-${screen}-${stop.at.element}`);
		const near = (v: number, by: number) => Math.min(0.95, Math.max(0.05, v + (r() - 0.5) * 2 * by));
		const note = watch || agent.kind === "expert" || stop.finding ? stop.note : undefined;
		// Kept brisk: a slow agent is slower than a quick one, never long enough to leave the screen waiting.
		const travelMs = 650 - t.stiffness * 2;
		// It looks around only when it arrives on a screen, and moves on sooner when it has more to do there.
		const dwell = stopMs * t.dwell * (watch ? 1.6 : last ? 0.6 : 0.25);
		if (agent.kind === "access") {
			pose(agent.id, { screen, element: stop.at.element, fx: 0.5, fy: 0.5, note });
			await wait(dwell, signal);
			return;
		}
		// Glancing around the screen first, top to bottom, the way people scan.
		const glances = arriving ? Math.min(2, t.glances) : 0;
		for (let g = 0; g < glances; g++) {
			pose(agent.id, { screen, fx: 0.2 + r() * 0.6, fy: 0.12 + ((g + r() * 0.6) / Math.max(1, glances)) * 0.55 });
			await wait(travelMs * (0.5 + r() * 0.3), signal);
		}
		scrollTo(screen, stop.at.element);
		if (agent.kind === "expert") {
			// Reading along it: from its start to its end, slowly for the Copywriter.
			const fy = near(0.5, 0.15);
			pose(agent.id, { screen, element: stop.at.element, fx: 0.08, fy, note });
			if (stop.finding) setFound((current) => new Set(current).add(stop.finding!));
			await wait(travelMs, signal);
			pose(agent.id, { screen, element: stop.at.element, fx: 0.92, fy: near(fy, 0.05), note });
			await wait(Math.max(dwell - travelMs, travelMs), signal);
			return;
		}
		// Going to it, hovering (the hand wanders a little), then the tap.
		let fx = near(0.55, 0.25);
		let fy = near(0.5, 0.2);
		pose(agent.id, { screen, element: stop.at.element, fx, fy });
		await wait(travelMs, signal);
		// It hovers where it decides (its last place on the screen); on the way, it just acts.
		const hoverMs = last || watch ? Math.min(600, t.hoverMs) : 0;
		const wanders = Math.round(hoverMs / 200);
		for (let w = 0; w < wanders; w++) {
			fx = near(fx, t.wander * 4);
			fy = near(fy, t.wander * 3);
			pose(agent.id, { screen, element: stop.at.element, fx, fy });
			await wait(hoverMs / Math.max(1, wanders), signal);
		}
		pose(agent.id, { screen, element: stop.at.element, fx, fy, note, tap: true });
		if (stop.finding) setFound((current) => new Set(current).add(stop.finding!));
		await wait(dwell, signal);
	};

	// The run: screen by screen through the journey; on each, every agent with a place there comes in from the side, at
	// its own moment, works there, then leaves. Only the agents at work show.
	React.useEffect(() => {
		if (!run) return;
		const signal = { cancelled: false };
		const todo = agents.filter((a) => !run.done.includes(a.id));
		const order = (at: ScreenAt) => screens.findIndex((s) => keyOf(s.at) === keyOf(at));
		setPoses({});
		setFound(new Set());
		(async () => {
			const started = new Set<string>();
			for (let i = 0; i < screens.length; i++) {
				const key = keyOf(screens[i].at);
				const here = todo.filter((a) => a.stops.some((s) => keyOf(s.at) === key));
				if (!here.length) continue;
				setIndex(i);
				onScreen?.(screens[i].label, here.length);
				await wait(slideMs * 0.6, signal);
				// They don't arrive in a line: each at its own moment, the quick ones first, all within about a second.
				const arrival = (a: EvaluationAgent) => seeded(`${a.id}-${key}`)() * staggerMs * 0.8 + (200 - Math.min(200, temperaments[a.id].stiffness)) * 2;
				await Promise.all(
					here.map(async (agent) => {
						await wait(arrival(agent), signal);
						if (!started.has(agent.id)) {
							started.add(agent.id);
							onAgentStart?.(agent.id);
						}
						const stops = agent.stops.filter((s) => keyOf(s.at) === key);
						for (const [n, stop] of stops.entries()) await act(agent, key, stop, signal, { arriving: n === 0, last: n === stops.length - 1 });
						leave(agent.id);
						if (!agent.stops.some((s) => order(s.at) > i)) onAgentDone?.(agent.id);
					}),
				);
			}
			onAgentsDone?.();
		})().catch(() => {});
		return () => {
			signal.cancelled = true;
			setPoses({});
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [run?.key]);

	// Watching one again: alone on the prototype, through every stop, slower, with what Sparks saw at each.
	React.useEffect(() => {
		const agent = agents.find((a) => a.id === watching?.id);
		if (!agent || running) return;
		const signal = { cancelled: false };
		(async () => {
			let previous = "";
			for (const stop of agent.stops) {
				const key = keyOf(stop.at);
				if (key !== previous) {
					goTo(stop.at);
					await wait(slideMs, signal);
				}
				await act(agent, key, stop, signal, { watch: true, arriving: key !== previous });
				previous = key;
			}
			leave(agent.id);
			onWatchEnd?.();
		})().catch(() => {});
		return () => {
			signal.cancelled = true;
			leave(agent.id);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [watching?.key]);

	// A finding selected in the evaluation: the strip goes to its screen.
	React.useEffect(() => {
		if (selectedMarker && !busy) goTo(selectedMarker.at);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [focus?.key]);
	// Once a run is done (all its markers show), the strip goes to the first open finding; a story that opens on a
	// finished run starts there. A finding she selected comes first.
	const revealedBefore = React.useRef(false);
	React.useEffect(() => {
		const first = markers.find((m) => !m.fixed);
		if (revealMarkers && !revealedBefore.current && first && !busy && !selectedMarker) goTo(first.at);
		revealedBefore.current = revealMarkers;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [revealMarkers]);

	// The screen in focus, once it's done: its findings, for the evaluation to show (the two panels move together).
	React.useEffect(() => {
		if (busy || !revealMarkers || !focused) return;
		const here = markers.filter((m) => keyOf(m.at) === keyOf(focused.at));
		onScreenFindings?.([...here.filter((m) => !m.fixed), ...here.filter((m) => m.fixed)].map((m) => m.id));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [index, revealMarkers, busy]);

	// Where everything is, every frame: each working agent's point (on its element, or on its screen while it looks
	// around), the outline of what experts and keyboard agents look at, and each marker. The strip slides and the
	// prototype scrolls under them; only changes re-render.
	React.useEffect(() => {
		let frame = 0;
		const near = (a?: Point, b?: Point) => (!a && !b) || Boolean(a && b && Math.abs(a.x - b.x) < 0.5 && Math.abs(a.y - b.y) < 0.5);
		const nearBox = (a?: Box, b?: Box) => near(a, b) && (!a || !b || (Math.abs(a.w - b.w) < 0.5 && Math.abs(a.h - b.h) < 0.5));
		const tick = () => {
			frame = requestAnimationFrame(tick);
			const s = stageRef.current?.getBoundingClientRect();
			if (!s) return;
			const measure = (node: Element | null | undefined): Box | undefined => {
				if (!node) return undefined;
				const r = node.getBoundingClientRect();
				return { x: r.left - s.left, y: r.top - s.top, w: r.width, h: r.height };
			};
			const nextPoints: Record<string, Point> = {};
			const nextBoxes: Record<string, Box> = {};
			for (const agent of agents) {
				const p = poses[agent.id];
				if (!p) continue;
				const item = itemRefs.current.get(p.screen);
				const element = measure(targetIn(item, p.element));
				const box = element ?? measure(item?.querySelector("[data-device]"));
				if (!box) continue;
				nextPoints[agent.id] = { x: box.x + box.w * p.fx, y: box.y + box.h * p.fy };
				if (agent.kind !== "customer" && element) nextBoxes[agent.id] = element;
			}
			setPoints((current) => (Object.keys(nextPoints).length === Object.keys(current).length && Object.keys(nextPoints).every((id) => near(current[id], nextPoints[id])) ? current : nextPoints));
			setBoxes((current) => (Object.keys(nextBoxes).length === Object.keys(current).length && Object.keys(nextBoxes).every((id) => nearBox(current[id], nextBoxes[id])) ? current : nextBoxes));
			setMarkerBoxes((current) => {
				const next: Record<string, Box> = {};
				for (const marker of markers) {
					const box = measure(targetIn(itemRefs.current.get(keyOf(marker.at)), marker.at.element));
					if (box) next[marker.id] = box;
				}
				const same = Object.keys(next).length === Object.keys(current).length && Object.keys(next).every((id) => nearBox(current[id], next[id]));
				return same ? current : next;
			});
		};
		frame = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(frame);
	}, [agents, poses, markers]);

	const customers = agents.filter((a) => a.kind !== "expert");
	const colorOf = (agent: EvaluationAgent) =>
		agent.kind === "expert" ? expertColor : agentColors[Math.max(0, customers.findIndex((a) => a.id === agent.id)) % agentColors.length];
	// Each agent's hand on its own spring (its temperament); the outlines on a steady one.
	const travelOf = (id: string) => {
		const t = temperaments[id];
		return resolve({ type: "spring", stiffness: t?.stiffness ?? 80, damping: t?.damping ?? 16, mass: t?.mass ?? 0.9 });
	};
	const travel = resolve({ type: "spring", stiffness: 110, damping: 20 });
	const sharing = new Map<string, number>();

	return (
		<section aria-label='Prototype' className={cn("flex min-h-0 flex-1 flex-col rounded-card bg-background-subtle", className)}>
			<div className='flex h-[68px] shrink-0 items-center justify-between gap-3 px-5'>
				<div className='flex min-w-0 items-center'>
					{paths.length ? (
						<VersionsMenu
							title={(paths.find((option) => option.id === path) ?? paths[0]).label}
							versions={versions}
							onRestore={busy ? undefined : onRestore}
							paths={paths}
							path={path}
							onPathChange={busy ? undefined : onPathChange}
							published={published}
						/>
					) : null}
				</div>
				{onAddToReview ? (
					<PanelAction label='Add to Review' onClick={onAddToReview} disabled={running || Boolean(addToReviewBlocked)} hint={addToReviewBlocked} />
				) : null}
			</div>

			<div
				ref={stageRef}
				role='group'
				aria-roledescription='carousel'
				aria-label='Screens of the prototype'
				tabIndex={busy ? -1 : 0}
				onKeyDown={(event) => {
					if (busy || event.target !== event.currentTarget) return;
					if (event.key === "ArrowRight") step(1);
					if (event.key === "ArrowLeft") step(-1);
				}}
				className='relative min-h-0 flex-1 overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset'
			>
				{/* The strip: the screens side by side, the one in focus in the middle. Dragged sideways, it goes to the next or
				    the one before; a screen on either side is selected to bring it in. */}
				<motion.div
					animate={track}
					drag={busy ? false : "x"}
					dragMomentum={false}
					onDragEnd={(_, info) => {
						const by = info.offset.x < -60 ? 1 : info.offset.x > 60 ? -1 : 0;
						if (by) step(by);
						else void track.start({ x: centerOf(index) }, resolve({ ...layoutSpring }));
					}}
					className={cn("absolute top-0 left-0 flex h-full items-start gap-12 pt-2", !busy && "cursor-grab active:cursor-grabbing")}
				>
					{screens.map((screen, i) => {
						const key = keyOf(screen.at);
						const audience = audienceFor(screen.at.view);
						const inFocus = i === index;
						const phone = audience.device === "phone";
						return (
							<motion.div
								key={key}
								ref={(node) => {
									if (node) itemRefs.current.set(key, node);
									else itemRefs.current.delete(key);
								}}
								initial={false}
								animate={{ scale: inFocus ? 1 : 0.86, opacity: inFocus ? 1 : 0.4 }}
								transition={resolve({ ...standardTransition, duration: motionDuration.slow })}
								onClick={inFocus || busy ? undefined : () => setIndex(i)}
								className={cn("flex shrink-0 origin-top flex-col items-center gap-2", !inFocus && !busy && "cursor-pointer")}
							>
								<span className={cn("text-sm whitespace-nowrap first-letter:uppercase", inFocus ? "font-medium text-foreground" : "text-muted-foreground")}>
									{screen.label}
								</span>
								{/* The device: a phone with a dark bezel, or a monitor. Only the one in focus can be used, and not while an
								    agent works it. */}
								{/* The phone takes its scaled size in the strip; inside, it's the real-size device, scaled. */}
								<div data-phone={phone && inFocus ? "" : undefined} className='shrink-0' style={phone ? { width: phoneSize.width * fit, height: deviceH } : undefined}>
								<div
									data-device
									inert={!inFocus || busy}
									// The same device as in Prototype (`prototypeDeviceClasses`).
									className={cn(prototypeDeviceClasses(audience.device), "flex-none overflow-hidden")}
									style={
										phone
											? { transform: `scale(${fit})`, transformOrigin: "0 0" }
											: { width: Math.min(760, Math.max(520, stage.w - 160)), height: Math.round(deviceH * 0.72) }
									}
								>
									<div
										ref={(node) => {
											if (node) scrollerRefs.current.set(key, node);
											else scrollerRefs.current.delete(key);
										}}
										className={cn("scrollbar-subtle h-full overflow-y-auto", phone && "rounded-[34px]")}
									>
										{children(audience.id, screen.at)}
									</div>
								</div>
								</div>
							</motion.div>
						);
					})}
				</motion.div>

				{/* Over the strip: what's simulated, the agents and the markers. Only markers and, once it's done, agents can be selected. */}
				<div className='pointer-events-none absolute inset-0 z-10'>
					{agents.map((agent) => {
						const box = boxes[agent.id];
						const p = poses[agent.id];
						if (!box || !p) return null;
						const access = agent.kind === "access";
						return (
							<motion.div
								key={`${agent.id}-box`}
								aria-hidden
								className='absolute top-0 left-0'
								initial={{ x: box.x - 4, y: box.y - 4, width: box.w + 8, height: box.h + 8, opacity: 0 }}
								animate={{ x: box.x - 4, y: box.y - 4, width: box.w + 8, height: box.h + 8, opacity: 1 }}
								transition={travel}
							>
								{/* A keyboard or screen reader agent's focus ring (solid), or what an expert reads (dashed). */}
								<span
									className={cn("absolute inset-0 rounded-lg border-2", !access && "border-dashed", access && "shadow-[0_0_0_4px_color-mix(in_srgb,currentColor_20%,transparent)]")}
									style={{ borderColor: colorOf(agent).fill, color: colorOf(agent).fill }}
								/>
								{access ? (
									<>
										<span
											className={cn("absolute -top-[30px] left-0 rounded-md px-2 py-1 text-[13px] leading-none font-medium whitespace-nowrap shadow-md", colorOf(agent).text)}
											style={{ backgroundColor: colorOf(agent).fill }}
										>
											{agent.label}
										</span>
										{p.note ? <AgentNote note={p.note} pulse={p.pulse} below className='left-0' /> : null}
									</>
								) : null}
							</motion.div>
						);
					})}
					{markers.map((marker) => {
						const box = markerBoxes[marker.id];
						if (!box || !(revealMarkers || found.has(marker.id))) return null;
						const element = `${keyOf(marker.at)}-${marker.at.element}`;
						const offset = sharing.get(element) ?? 0;
						sharing.set(element, offset + 1);
						return (
							<motion.button
								key={`${marker.id}-${focus?.id === marker.id ? focus.key : 0}`}
								type='button'
								aria-label={`${marker.fixed ? "Fixed" : `Finding ${marker.number}`}: ${marker.title}`}
								initial={prefersReducedMotion ? false : { scale: 0, y: -motionDistance.medium }}
								animate={{ scale: 1, y: 0 }}
								transition={resolve({ type: "spring", stiffness: 420, damping: 18 })}
								onClick={() => onMarkerSelect?.(marker.id)}
								className={cn(
									"pointer-events-auto absolute grid size-[26px] place-items-center rounded-full border-2 border-background text-xs font-semibold text-white shadow-md outline-none focus-visible:ring-2 focus-visible:ring-ring",
									marker.fixed ? "bg-success" : marker.severity === "Blocks" ? "bg-destructive" : marker.severity === "Hurts" ? "bg-warning" : "bg-foreground-defined",
								)}
								style={{ left: box.x + box.w - 14 + offset * 30, top: box.y - 14 }}
							>
								{marker.fixed ? <Check aria-hidden className='size-3.5' strokeWidth={3} /> : marker.number}
							</motion.button>
						);
					})}
					{/* Only the agents at work: each comes in from the side it's nearest, works, and fades out when it's done. */}
					<AnimatePresence>
						{agents.map((agent) => {
							const point = points[agent.id];
							const p = poses[agent.id];
							// Screen reader and keyboard agents don't point: their focus ring (above) carries their name.
							if (!point || !p || agent.kind === "access") return null;
							const color = colorOf(agent);
							const Icon = agent.kind === "expert" ? expertIcons[agent.id] : undefined;
							const side = point.x < stage.w / 2 ? -1 : 1;
							return (
								<motion.div
									key={agent.id}
									className='absolute top-0 left-0'
									initial={prefersReducedMotion ? { x: point.x - 3, y: point.y - 2, opacity: 0 } : { x: point.x - 3 + side * 160, y: point.y + 40, opacity: 0 }}
									animate={{ x: point.x - 3, y: point.y - 2, opacity: 1 }}
									exit={{ opacity: 0, transition: resolve(standardTransition) }}
									transition={travelOf(agent.id)}
								>
									<Pointer fill={color.fill} />
									{/* A tap where a customer acts. */}
									{p.pulse && agent.kind === "customer" && !prefersReducedMotion ? (
										<motion.span
											key={p.pulse}
											aria-hidden
											className='absolute -top-3 -left-3 size-7 rounded-full border-2'
											style={{ borderColor: color.fill }}
											initial={{ scale: 0.3, opacity: 0.9 }}
											animate={{ scale: 1.6, opacity: 0 }}
											transition={{ duration: motionDuration.deliberate }}
										/>
									) : null}
									<span
										aria-hidden
										className={cn("absolute top-[18px] left-[14px] flex items-center gap-1 rounded-md px-2 py-1 text-[13px] leading-none font-medium whitespace-nowrap shadow-md", color.text)}
										style={{ backgroundColor: color.fill }}
									>
										{Icon ? <Icon aria-hidden className='size-3.5' /> : null}
										{agent.label}
									</span>
									{p.note ? <AgentNote note={p.note} pulse={p.pulse} below={point.y < stage.h - 170} /> : null}
								</motion.div>
							);
						})}
					</AnimatePresence>
				</div>
			</div>

			{/* Which screen, the way to the others, and what's simulated. */}
			<div className='flex shrink-0 flex-col items-center gap-1.5 pt-2 pb-4'>
				<div className='flex items-center gap-3'>
					{/* The same arrows as beside the prototype in Prototype (`ScreenArrow`), named with the screen they go to. */}
					<ScreenArrow direction={-1} to={screens[index - 1]?.label} disabled={busy || index === 0} onClick={() => step(-1)} />
					<div className='flex items-center gap-1.5' aria-hidden>
						{screens.map((screen, i) => (
							<span key={keyOf(screen.at)} className={cn("h-1.5 rounded-full transition-all motion-reduce:transition-none", i === index ? "w-5 bg-foreground-prominent" : "w-1.5 bg-border-defined")} />
						))}
					</div>
					<ScreenArrow direction={1} to={screens[index + 1]?.label} disabled={busy || index === screens.length - 1} onClick={() => step(1)} />
				</div>
				<span aria-live='polite' className='sr-only'>
					{focused ? `${focused.label}, ${index + 1} of ${screens.length}` : ""}
				</span>
				{agents.length ? (
					<span className='text-xs text-muted-foreground tabular-nums'>
						{running ? `${Object.keys(poses).length} of ${agents.length} AI agents at work` : `${agents.length} AI agents`}, simulated: not real people.
					</span>
				) : null}
				<PrototypeNote />
			</div>
		</section>
	);
}

export { EvaluationPrototype, type EvaluationAgent, type EvaluationMarker, type EvaluationPrototypeProps };
