import * as React from "react";
import { motion } from "motion/react";

import { pendingSurfaceVariants, useStreamedText } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Segment = { text: string; bold: boolean };
/** A paragraph's lines (one per line break) or a list's items. */
type Block = { kind: "p" | "ol" | "ul"; items: Segment[][] };

/** `**bold**` inside a line. */
function parseInline(line: string): Segment[] {
	return line
		.split(/(\*\*[^*]+\*\*)/)
		.filter(Boolean)
		.map((part) =>
			part.startsWith("**") && part.endsWith("**") && part.length > 4
				? { text: part.slice(2, -2), bold: true }
				: { text: part, bold: false },
		);
}

/**
 * Paragraphs are separated by a blank line; a line break inside one starts a new line, 4px below. A block whose lines
 * all start with "1. " or "- " is a list.
 */
function parseBlocks(text: string): Block[] {
	return text
		.trim()
		.split(/\n{2,}/)
		.map((chunk): Block => {
			const lines = chunk.split("\n");
			if (lines.every((line) => /^\d+\.\s/.test(line)))
				return { kind: "ol", items: lines.map((line) => parseInline(line.replace(/^\d+\.\s+/, ""))) };
			if (lines.every((line) => /^[-*]\s/.test(line)))
				return { kind: "ul", items: lines.map((line) => parseInline(line.replace(/^[-*]\s+/, ""))) };
			return { kind: "p", items: lines.map(parseInline) };
		});
}

const lineText = (line: Segment[]) => line.map((segment) => segment.text).join("");

/** A paragraph that's one line, all bold, reads as a heading: a new section starts, so it gets 24px above it. */
const isHeading = (block: Block) =>
	block.kind === "p" && block.items.length === 1 && block.items[0].length > 0 && block.items[0].every((s) => s.bold);

/** The text as it reads, without markup: one "\n" between paragraphs and between list items. What streams. */
function plainText(blocks: Block[]) {
	return blocks.map((block) => block.items.map(lineText).join("\n")).join("\n");
}

/** The blocks cut to the first `budget` characters of their plain text, so markup never shows half-written. */
function truncate(blocks: Block[], budget: number): Block[] {
	const out: Block[] = [];
	let left = budget;
	const cutLine = (line: Segment[]) => {
		const cut: Segment[] = [];
		for (const segment of line) {
			if (left <= 0) break;
			cut.push({ ...segment, text: segment.text.slice(0, left) });
			left -= segment.text.length;
		}
		return cut;
	};
	for (const [index, block] of blocks.entries()) {
		// The "\n" before a block or item; nothing new shows until a character after it has streamed.
		if (index > 0) {
			if (left <= 1) break;
			left -= 1;
		}
		const items: Segment[][] = [];
		for (const [itemIndex, item] of block.items.entries()) {
			if (itemIndex > 0) {
				if (left <= 1) break;
				left -= 1;
			}
			items.push(cutLine(item));
		}
		out.push({ ...block, items });
		if (left <= 0) break;
	}
	return out;
}

const renderLine = (line: Segment[]) =>
	line.map((segment, index) => (segment.bold ? <strong key={index}>{segment.text}</strong> : <React.Fragment key={index}>{segment.text}</React.Fragment>));

type AssistantMessageProps = Omit<React.ComponentProps<"div">, "children"> & {
	/** The message. A blank line between paragraphs, a line break for a new line; "1. " or "- " lines make a list; `**bold**`. */
	text: string;
	/** Streams the text in, a few words at a time, with a blinking caret at its end. Turning it off shows the rest at once. */
	stream?: boolean;
	/** Called once the streamed text is all shown (at once under reduced motion), e.g. to bring in what follows it. */
	onStreamEnd?: () => void;
};

/**
 * A message from the AI assistant (Sparks): plain text on the page, no bubble, the conversation's full width. It can
 * stream in like a reply being written (MOTION.md → "AI messages"). Not in sparks.ds yet.
 */
function AssistantMessage({ text, stream = false, onStreamEnd, className, ...props }: AssistantMessageProps) {
	const blocks = React.useMemo(() => parseBlocks(text), [text]);
	const { shown, streaming } = useStreamedText(plainText(blocks), stream);
	const onStreamEndRef = React.useRef(onStreamEnd);
	onStreamEndRef.current = onStreamEnd;
	React.useEffect(() => {
		if (stream && !streaming) onStreamEndRef.current?.();
	}, [stream, streaming]);
	const visible = streaming ? truncate(blocks, shown) : blocks;

	// A soft blinking block at the end of the text while it streams (Pending). Never shown under reduced motion: the
	// text then appears whole.
	const caret = streaming ? (
		<motion.span
			aria-hidden='true'
			variants={pendingSurfaceVariants}
			initial='idle'
			animate='pending'
			className='ml-0.5 inline-block h-4 w-1.5 translate-y-0.5 rounded-[2px] bg-foreground'
		/>
	) : null;

	return (
		<div
			data-slot='assistant-message'
			data-streaming={streaming || undefined}
			// Screen readers wait for the whole message instead of reading it burst by burst.
			aria-busy={streaming || undefined}
			className={cn(
				// No bubble, so it reads apart from the user's bubbles on the right. Same text as the user's messages.
				"flex w-full flex-col gap-3 text-base text-foreground break-words",
				// Lists: 4px between items, markers kept.
				"[&_ol]:list-decimal [&_ul]:list-disc [&_ol,&_ul]:flex [&_ol,&_ul]:flex-col [&_ol,&_ul]:gap-1 [&_ol,&_ul]:ps-6",
				"[&_strong]:font-semibold [&_strong]:text-foreground-prominent",
				className,
			)}
			{...props}
		>
			{visible.map((block, index) => {
				const last = index === visible.length - 1;
				if (block.kind === "p")
					return (
						// 12px between paragraphs; 24px above a heading-like bold line (a new section), not the first.
						<p key={index} className={cn("flex flex-col gap-1", index > 0 && isHeading(block) && "mt-3")}>
							{block.items.map((line, lineIndex) => (
								<span key={lineIndex}>
									{renderLine(line)}
									{last && lineIndex === block.items.length - 1 ? caret : null}
								</span>
							))}
						</p>
					);
				const List = block.kind;
				return (
					<List key={index}>
						{block.items.map((item, itemIndex) => (
							<li key={itemIndex}>
								{renderLine(item)}
								{last && itemIndex === block.items.length - 1 ? caret : null}
							</li>
						))}
					</List>
				);
			})}
		</div>
	);
}

export { AssistantMessage, type AssistantMessageProps };
