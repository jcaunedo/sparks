import * as React from "react";
import { Check, Menu, Pencil } from "lucide-react";

import { Button } from "@/components/buttons/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/overlays/tooltip";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/overlays/dropdown-menu";
import { scrollIntoViewSmoothly, useMotionPreference } from "@/lib/motion";
import { Typography } from "@/components/typography/typography";
import { cn } from "@/lib/utils";

import { VersionsMenu } from "../shared/versions-menu";
import { sidePanelButtonClasses } from "./side-panel";

/*
 * The finished plan (prds/sparks.md, "The finished plan"): Plan is a conversation until it's done; then selecting Plan
 * shows it as a document, on its own: the problem, what we know, what success looks like, the directions (each one's
 * prototype, or "Generate prototype"), what we'll build, what we built, where each later step stands, and the decisions.
 * "Edit plan" makes Plan's four summaries editable in place, with the conversation beside it; "Versions" keeps every
 * version of it.
 */

/** A section of the plan: what it's about and what it holds. */
type PlanSection = { id: string; title: string; content: React.ReactNode };

type PlanDocumentProps = {
	sections: PlanSection[];
	/** Every version of the plan, oldest first; the last is the current one. Without it, there's no "Versions". */
	versions?: { id: string; name: string }[];
	/** Restoring a version saves it again as the newest. */
	onRestore?: (id: string) => void;
	/** Edit mode: Plan's parts are editable and the conversation shows beside it. Without `onEditingChange`, no "Edit plan". */
	editing?: boolean;
	onEditingChange?: (editing: boolean) => void;
	className?: string;
};

/** The toolbar's text button ("Edit plan", "Done"): the same outlined button as "Share" in the header. */
const planButtonClasses = "gap-1.5 rounded-button-lg ps-2.5 pe-3.5 text-sm font-semibold text-foreground shadow-xs";

/**
 * The finished plan, in the preview's place: the same frame as the evaluation and the idea for review
 * (`rounded-card bg-background-subtle p-4`), no title, only its buttons on the right ("Edit plan" or "Done",
 * "Versions ({n})", "Jump to a section"), then a white page that scrolls, its sections in a 720px column, 40px apart
 * with a line between them.
 */
function PlanDocument({ sections, versions = [], onRestore, editing = false, onEditingChange, className }: PlanDocumentProps) {
	const { prefersReducedMotion } = useMotionPreference();
	// "Jump to a section": the section scrolls into view in the page, and its heading takes focus once the menu closes.
	const headings = React.useRef(new Map<string, HTMLHeadingElement>());
	const jumpTo = React.useRef<string | undefined>(undefined);
	const scrollToSection = (id: string) => {
		const section = headings.current.get(id)?.closest("section");
		if (section) scrollIntoViewSmoothly(section, { reducedMotion: Boolean(prefersReducedMotion), align: "start" });
	};
	return (
		<section aria-label='Plan' className={cn("flex min-h-0 flex-1 flex-col rounded-card bg-background-subtle p-4", className)}>
			<div className='flex items-center justify-end gap-2 pb-3'>
				{onEditingChange ? (
					<Button variant='outline' className={planButtonClasses} aria-pressed={editing} onClick={() => onEditingChange(!editing)}>
						{editing ? <Check aria-hidden /> : <Pencil aria-hidden />}
						{editing ? "Done" : "Edit plan"}
					</Button>
				) : null}
				{/* The same "Versions ({n})" as the prototype's. */}
				{versions.length ? <VersionsMenu versions={versions} onRestore={onRestore} /> : null}
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
type PlanStepLine = { step: string; text: string; onOpen?: () => void };

/**
 * "Where it stands": one line per step after Plan (where the prototype, the evaluation and the review are), each with
 * "Open", which goes to that step. Their full results stay in each step's own panel, not copied here.
 */
function PlanSteps({ lines }: { lines: PlanStepLine[] }) {
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

/** Plan's parts Dana can edit in the plan. */
type PlanPartId = "problem" | "brief" | "success" | "chosen";

/** Her edits to Plan's parts: the text she wrote, in AssistantMessage's format, in place of Sparks's summary. */
type PlanEdits = Partial<Record<PlanPartId, string>>;

const escapeHtml = (text: string) => text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const inlineHtml = (line: string) =>
	line
		.split(/(\*\*[^*]+\*\*)/)
		.filter(Boolean)
		.map((part) => (part.startsWith("**") && part.endsWith("**") && part.length > 4 ? `<strong>${escapeHtml(part.slice(2, -2))}</strong>` : escapeHtml(part)))
		.join("");

/**
 * The text as HTML, read the same way as AssistantMessage: a blank line between paragraphs, a line break for a new line,
 * "1. " or "- " lines for a list, `**bold**`. Set as the editable's HTML, so React never owns what Dana changes.
 */
function planHtml(text: string) {
	return text
		.trim()
		.split(/\n{2,}/)
		.map((chunk) => {
			const lines = chunk.split("\n");
			if (lines.every((line) => /^\d+\.\s/.test(line))) return `<ol>${lines.map((l) => `<li>${inlineHtml(l.replace(/^\d+\.\s+/, ""))}</li>`).join("")}</ol>`;
			if (lines.every((line) => /^[-*]\s/.test(line))) return `<ul>${lines.map((l) => `<li>${inlineHtml(l.replace(/^[-*]\s+/, ""))}</li>`).join("")}</ul>`;
			return `<p>${lines.map((l) => `<span>${inlineHtml(l)}</span>`).join("")}</p>`;
		})
		.join("");
}

/** What's in the editable, back in AssistantMessage's format: paragraphs, lines, lists and bold, whatever the browser made of her typing. */
function planTextFrom(element: HTMLElement) {
	const inline = (node: Node): string => {
		if (node.nodeType === Node.TEXT_NODE) return (node.textContent ?? "").replace(/\u00a0/g, " ");
		if (!(node instanceof HTMLElement)) return "";
		if (node.tagName === "BR") return "\n";
		const inner = [...node.childNodes].map(inline).join("");
		if (node.tagName === "STRONG" || node.tagName === "B") return inner.trim() ? `**${inner.trim()}**` : inner;
		// A line (a paragraph's span, or the browser's div for Enter) ends with a line break. Other spans (the browser's
		// styling) are just text.
		if ((node.tagName === "SPAN" && node.parentElement?.tagName === "P") || node.tagName === "DIV" || node.tagName === "P") return `${inner}\n`;
		return inner;
	};
	const lines = (node: Node) =>
		inline(node)
			.split("\n")
			.map((line) => line.replace(/\s+/g, " ").trim())
			.filter(Boolean);
	const blocks: string[] = [];
	for (const child of element.childNodes) {
		if (child instanceof HTMLElement && (child.tagName === "UL" || child.tagName === "OL")) {
			const items = [...child.children].map((li) => lines(li).join(" ")).filter(Boolean);
			if (items.length) blocks.push(items.map((item, i) => `${child.tagName === "OL" ? `${i + 1}.` : "-"} ${item}`).join("\n"));
		} else {
			const text = lines(child);
			if (text.length) blocks.push(text.join("\n"));
		}
	}
	return blocks.join("\n\n");
}

/** AssistantMessage's look in the plan's smaller text (`compact`), for the editable's HTML. */
const planTextClasses = cn(
	"flex w-full flex-col gap-2 text-sm text-foreground break-words",
	"[&_p]:flex [&_p]:flex-col [&_p]:gap-1",
	"[&_ol]:list-decimal [&_ul]:list-disc [&_ol,&_ul]:flex [&_ol,&_ul]:flex-col [&_ol,&_ul]:gap-1 [&_ol,&_ul]:ps-6",
	"[&_strong,&_b]:font-semibold [&_strong,&_b]:text-foreground-prominent",
);

/**
 * One of Plan's parts in the PlanDocument, editable in place like a document (prds/sparks.md, "The finished plan"): it reads as
 * the summary Dana approved; selecting it puts the caret in it, and leaving it (or Esc) saves what she changed, through
 * `onCommit(text, before)`. Pasted text comes in plain. Emptied, it goes back to what it was. The sources line says
 * "Edited by you." once she has.
 */
function PlanText({
	label,
	text,
	sources,
	edited,
	onCommit,
}: {
	label: string;
	text: string;
	sources?: string;
	edited?: boolean;
	onCommit?: (text: string, before: string) => void;
}) {
	const ref = React.useRef<HTMLDivElement>(null);
	// What it shows. Her own changes stay in the DOM as she typed them; a change from outside (restoring a version) draws it
	// again from the text, on a new element.
	const [shown, setShown] = React.useState(text);
	const [revision, setRevision] = React.useState(0);
	const committed = React.useRef(text);
	React.useEffect(() => {
		if (text === committed.current) return;
		committed.current = text;
		setShown(text);
		setRevision((r) => r + 1);
	}, [text]);
	const html = React.useMemo(() => ({ __html: planHtml(shown) }), [shown]);
	// What it read as when she started, so leaving it without a change isn't an edit.
	const atFocus = React.useRef("");
	const commit = () => {
		const element = ref.current;
		if (!element) return;
		const next = planTextFrom(element);
		if (!next) {
			element.innerHTML = planHtml(committed.current);
			return;
		}
		if (next === atFocus.current) return;
		const before = committed.current;
		committed.current = next;
		onCommit?.(next, before);
	};
	return (
		<div className='flex flex-col gap-2'>
			<div
				key={revision}
				ref={ref}
				role='textbox'
				aria-multiline='true'
				aria-label={label}
				contentEditable={Boolean(onCommit)}
				// Plain text in, so pasted styles don't come with it.
				onPaste={(event) => {
					event.preventDefault();
					document.execCommand("insertText", false, event.clipboardData.getData("text/plain"));
				}}
				onFocus={(event) => (atFocus.current = planTextFrom(event.currentTarget))}
				onBlur={commit}
				onKeyDown={(event) => {
					if (event.key === "Escape") {
						event.stopPropagation();
						event.currentTarget.blur();
					}
				}}
				className={cn(
					planTextClasses,
					"-mx-3 -my-2 cursor-text rounded-lg px-3 py-2 outline-none transition-colors",
					onCommit && "hover:bg-background-subtle focus:bg-background focus:ring-2 focus:ring-ring/40",
				)}
				dangerouslySetInnerHTML={html}
			/>
			{sources || edited ? (
				<p className='text-xs text-muted-foreground'>{[edited ? "Edited by you." : "", sources ?? ""].filter(Boolean).join(" ")}</p>
			) : null}
		</div>
	);
}

export { PlanDocument, PlanSteps, PlanText, planHtml, planTextFrom, type PlanEdits, type PlanPartId, type PlanDocumentProps, type PlanSection, type PlanStepLine };
