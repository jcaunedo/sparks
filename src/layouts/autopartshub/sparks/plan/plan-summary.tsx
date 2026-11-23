import { AssistantMessage } from "@/components/chat/assistant-message";
import { cn } from "@/lib/utils";

/**
 * A section of the concept summed up in Sparks's reply, with no card around it (prds/sparks.md, "Cards in the
 * conversation"): conversational text in AssistantMessage's format (paragraphs, "- " lists, `**bold**`), then one
 * sources line. The problem, what we know, what success looks like and what we'll build all use it. Not in Figma yet.
 */
function PlanSummary({
	label,
	text,
	sources,
	compact,
	className,
}: {
	/** What it is, for screen readers: "The problem", "What we know". */
	label: string;
	text: string;
	/** Where it comes from, in one line: "From your message, customer intelligence and business performance." */
	sources?: string;
	/** Smaller text, for the plan; the conversation uses the default. */
	compact?: boolean;
	className?: string;
}) {
	return (
		<section aria-label={label} className={cn("flex flex-col gap-2", className)}>
			<AssistantMessage text={text} className={compact ? "gap-2 text-sm" : undefined} />
			{sources ? <p className='text-xs text-muted-foreground'>{sources}</p> : null}
		</section>
	);
}

/** A statement with where it came from in brackets, before its final full stop: "18,400… returns (business performance)." */
function withSource(text: string, source?: string) {
	if (!source) return text;
	const trimmed = text.trim();
	const end = /[.!?]$/.test(trimmed) ? trimmed.slice(-1) : ".";
	const body = /[.!?]$/.test(trimmed) ? trimmed.slice(0, -1) : trimmed;
	return `${body} (${source})${end}`;
}

/** "a, b and c". */
function listInWords(items: string[]) {
	return items.length < 2 ? items.join("") : `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

/** The sources line: each source once, in order ("customer intelligence and product ecosystem" counts as two). */
function sourcesLine(sources: string[]) {
	const each = sources.flatMap((source) => source.toLowerCase().replace(/,.*$/, "").split(" and ")).map((s) => s.trim());
	const unique = each.filter((source, index) => source && each.indexOf(source) === index);
	return unique.length ? `From ${listInWords(unique)}.` : undefined;
}

const lowerFirst = (text: string) => text.charAt(0).toLowerCase() + text.slice(1);

export { PlanSummary, listInWords, lowerFirst, sourcesLine, withSource };
