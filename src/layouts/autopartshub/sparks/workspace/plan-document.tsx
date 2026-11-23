import * as React from "react";
import { Menu } from "lucide-react";

import { Button } from "@/components/buttons/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/overlays/tooltip";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/overlays/dropdown-menu";
import { scrollIntoViewSmoothly, useMotionPreference } from "@/lib/motion";
import { Typography } from "@/components/typography/typography";
import { cn } from "@/lib/utils";

import { sidePanelButtonClasses } from "./side-panel";

/*
 * The Blueprint (prds/sparks.md, "The Blueprint"): what Plan becomes once it's done. Plan is a conversation; once
 * Prototype starts, selecting Plan shows the Blueprint beside the conversation, the way Prototype shows the prototype:
 * the problem, what we know, what success looks like, the directions (each one's prototype, or "Generate prototype"),
 * what we'll build, what we built, where each later step stands, and the decisions.
 */

/** A section of the Blueprint: what it's about and what it holds. */
type BlueprintSection = { id: string; title: string; content: React.ReactNode };

type BlueprintProps = {
	sections: BlueprintSection[];
	className?: string;
};

/**
 * The Blueprint, in the preview's place beside the conversation: the same frame as the evaluation and the idea for
 * review (`rounded-card bg-background-subtle p-4`, the title lg semibold with a line under it), "Jump to a section" on
 * the right, then a white page that scrolls, its sections in a 720px column, 40px apart with a line between them.
 */
function Blueprint({ sections, className }: BlueprintProps) {
	const titleId = React.useId();
	const { prefersReducedMotion } = useMotionPreference();
	// "Jump to a section": the section scrolls into view in the page, and its heading takes focus once the menu closes.
	const headings = React.useRef(new Map<string, HTMLHeadingElement>());
	const jumpTo = React.useRef<string | undefined>(undefined);
	const scrollToSection = (id: string) => {
		const section = headings.current.get(id)?.closest("section");
		if (section) scrollIntoViewSmoothly(section, { reducedMotion: Boolean(prefersReducedMotion), align: "start" });
	};
	return (
		<section aria-labelledby={titleId} className={cn("flex min-h-0 flex-1 flex-col rounded-card bg-background-subtle p-4", className)}>
			<div className='flex items-start justify-between gap-3 pb-3'>
				<div className='flex flex-col'>
					<Typography as='h2' id={titleId} size='lg' weight='semibold' className='text-foreground-prominent'>
						Blueprint
					</Typography>
					<span className='text-xs text-muted-foreground'>What you've decided so far. Sparks keeps it up to date.</span>
				</div>
				{/* Figma "Button" (Type=Icon, Style=Ghost, lg · 36), the menu icon, as the panels' buttons. */}
				<DropdownMenu>
					<Tooltip>
						<TooltipTrigger asChild>
							<DropdownMenuTrigger asChild>
								<Button variant='ghost' size='icon' aria-label='Jump to a section' className={sidePanelButtonClasses} disabled={!sections.length}>
									<Menu aria-hidden />
								</Button>
							</DropdownMenuTrigger>
						</TooltipTrigger>
						<TooltipContent side='bottom' sideOffset={6}>
							Jump to a section
						</TooltipContent>
					</Tooltip>
					<DropdownMenuContent
						align='end'
						onCloseAutoFocus={(event) => {
							const id = jumpTo.current;
							if (!id) return;
							jumpTo.current = undefined;
							event.preventDefault();
							headings.current.get(id)?.focus({ preventScroll: true });
						}}
					>
						{sections.map((section) => (
							<DropdownMenuItem
								key={section.id}
								onSelect={() => {
									jumpTo.current = section.id;
									scrollToSection(section.id);
								}}
							>
								{section.title}
							</DropdownMenuItem>
						))}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
			<div className='scrollbar-subtle min-h-0 flex-1 overflow-y-auto rounded-avatar-square bg-background'>
				<div className='mx-auto flex w-full max-w-[720px] flex-col gap-10 p-8'>
					{sections.length ? (
						sections.map((section, index) => (
							<React.Fragment key={section.id}>
								{index > 0 ? <hr aria-hidden className='shrink-0 border-border' /> : null}
								<section aria-label={section.title} className='flex flex-col gap-2'>
									<Typography
										as='h3'
										ref={(element: HTMLHeadingElement | null) => {
											if (element) headings.current.set(section.id, element);
											else headings.current.delete(section.id);
										}}
										tabIndex={-1}
										size='lg'
										weight='semibold'
										className='scroll-mt-8 text-foreground outline-none'
									>
										{section.title}
									</Typography>
									{section.content}
								</section>
							</React.Fragment>
						))
					) : (
						<p className='text-sm text-muted-foreground'>Nothing here yet. What you approve in the conversation shows up here.</p>
					)}
				</div>
			</div>
		</section>
	);
}

/** A later step in "Where it stands": its name, one line on where it is, and the way to it. */
type BlueprintStepLine = { step: string; text: string; onOpen?: () => void };

/**
 * "Where it stands": one line per step after Plan (where the prototype, the evaluation and the review are), each with
 * "Open", which goes to that step. Their full results stay in each step's own panel, not copied here.
 */
function BlueprintSteps({ lines }: { lines: BlueprintStepLine[] }) {
	return (
		<ul className='flex flex-col divide-y divide-border'>
			{lines.map((line) => (
				<li key={line.step} className='flex items-center justify-between gap-3 py-2.5 text-sm first:pt-0 last:pb-0'>
					<span className='flex min-w-0 flex-col gap-0.5'>
						<span className='font-medium text-foreground'>{line.step}</span>
						<span className='text-muted-foreground'>{line.text}</span>
					</span>
					{line.onOpen ? (
						<Button
							variant='outline'
							size='sm'
							aria-label={`Open ${line.step}`}
							className='shrink-0 rounded-button-md shadow-xs'
							onClick={line.onOpen}
						>
							Open
						</Button>
					) : null}
				</li>
			))}
		</ul>
	);
}

export { Blueprint, BlueprintSteps, type BlueprintProps, type BlueprintSection, type BlueprintStepLine };
