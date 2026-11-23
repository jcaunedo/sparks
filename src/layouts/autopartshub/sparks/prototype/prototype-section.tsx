import * as React from "react";
import { CircleCheck, CircleDashed } from "lucide-react";

import { Badge } from "@/components/data-display/badge";
import { Button } from "@/components/buttons/button";
import { ConceptItems as Items, ConceptPart as Part } from "../workspace/concept-parts";

/*
 * The Prototype section of the concept (prds/sparks-prototype.md, "The Prototype section"): what the step adds to the
 * plan, all of it filled in by Sparks and kept current as the prototype changes.
 */

/** One audience's screens, each with the steps of the direction's "How it works" it covers (0-based). */
type PrototypeContents = { audience: string; device: string; screens: { name: string; covers: number[] }[] };

/** Everything the Prototype section shows. */
type PrototypeSummary = {
	/** The current version: its number and what changed in it. */
	version: { number: number; name: string };
	/** The chosen direction's "How it works", the steps the screens cover. */
	howItWorks: string[];
	contents: PrototypeContents[];
	/** What happens on screen but not for real. */
	pretend: string[];
	/** What the made-up data represents. */
	sampleData: string;
	/** Data or capabilities the real thing would need, with the source. */
	needs: string[];
	/** Changes Dana kept that the design system or its standards don't support. */
	departs: string[];
	/** Every version, oldest first (shown newest first). */
	versions: { id: string; name: string }[];
};

type PrototypeSectionProps = {
	summary: PrototypeSummary;
	/** "Try it": the prototype beside the conversation. */
	onTry?: () => void;
};

const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

/**
 * The Prototype section in the plan: the current version with "Try it", what's in it (each audience's screens
 * and the steps of "How it works" they cover), what's pretend, the sample data, what AutoParts Co. doesn't have yet,
 * what departs from the design system, and every version, newest first. Not in Figma yet.
 */
function PrototypeSection({ summary, onTry }: PrototypeSectionProps) {
	const covered = new Set(summary.contents.flatMap((c) => c.screens.flatMap((s) => s.covers)));
	const missing = summary.howItWorks.filter((_, index) => !covered.has(index));
	return (
		<div className='flex flex-col gap-4'>
			<Part title='The prototype'>
				<div className='flex flex-wrap items-center justify-between gap-2'>
					<span className='text-sm text-foreground'>
						Version {summary.version.number}: {summary.version.name}
					</span>
					{onTry ? (
						<Button variant='outline' size='sm' className='rounded-button-md shadow-xs' onClick={onTry}>
							Try it
						</Button>
					) : null}
				</div>
			</Part>

			<Part title="What's in it">
				<p className='flex items-center gap-1.5 text-sm text-foreground'>
					{missing.length ? (
						<CircleDashed aria-hidden className='size-4 shrink-0 text-icon' />
					) : (
						<CircleCheck aria-hidden className='size-4 shrink-0 text-success' />
					)}
					{missing.length
						? `Covers ${summary.howItWorks.length - missing.length} of the ${summary.howItWorks.length} steps of "How it works".`
						: `Covers every step of "How it works" (${summary.howItWorks.length} of ${summary.howItWorks.length}).`}
				</p>
				<ul className='flex flex-col gap-3 pt-1'>
					{summary.contents.map((group) => (
						<li key={group.audience} className='flex flex-col gap-1.5'>
							<span className='text-xs font-medium text-muted-foreground'>
								{group.audience} · {group.device}
							</span>
							<ul className='flex flex-col gap-1.5'>
								{group.screens.map((screen) => (
									<li key={screen.name} className='flex flex-col gap-0.5 text-sm'>
										<span className='font-medium text-foreground'>{capitalize(screen.name)}</span>
										{screen.covers.length ? (
											<ul className='flex flex-col gap-0.5 text-muted-foreground'>
												{screen.covers.map((step) => (
													<li key={step}>
														Step {step + 1}: {summary.howItWorks[step]}
													</li>
												))}
											</ul>
										) : (
											<span className='text-muted-foreground'>Not a step of "How it works": it shows what happens around it.</span>
										)}
									</li>
								))}
							</ul>
						</li>
					))}
				</ul>
			</Part>

			<Part title="What's pretend">
				<Items items={summary.pretend} />
			</Part>

			<Part title='Sample data'>
				<p className='text-sm text-foreground'>{summary.sampleData}</p>
				<p className='text-xs text-muted-foreground'>Made up, shaped like AutoParts Co.'s own, so it's safe to share.</p>
			</Part>

			<Part title="Needs what AutoParts Co. doesn't have yet">
				<Items items={summary.needs} />
			</Part>

			<Part title='Departs from the design system'>
				<Items items={summary.departs} />
			</Part>

			<Part title='Versions'>
				<ol className='flex flex-col gap-1.5'>
					{[...summary.versions].reverse().map((version, index, list) => (
						<li key={version.id} className='flex flex-wrap items-center gap-2 text-sm text-foreground'>
							<span className='text-muted-foreground'>{list.length - index}.</span>
							{version.name}
							{index === 0 ? (
								<Badge variant='flat' tone='neutral' size='xxs'>
									Current
								</Badge>
							) : null}
						</li>
					))}
				</ol>
			</Part>
		</div>
	);
}

export { PrototypeSection, type PrototypeContents, type PrototypeSectionProps, type PrototypeSummary };
