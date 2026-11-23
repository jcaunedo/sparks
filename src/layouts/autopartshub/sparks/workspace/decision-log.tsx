import * as React from "react";

/*
 * The decision log (prds/sparks.md, "The decision log"): every decision on the concept, recorded automatically from the
 * workflow, shown as "Decisions" in the Blueprint, newest first. Entries are never edited or removed: a changed
 * decision is a new entry, and the earlier one stays.
 */

/** One decision: what was decided, who decided it, in which step, and the reason when the workflow already had one. */
type DecisionEntry = {
	/** Stable for the same decision; a changed decision gets a new id. */
	id: string;
	what: string;
	who: string;
	step: string;
	/** The reason, or what was decided in full (a hypothesis, a recommendation), when the workflow already has it. */
	detail?: string;
};

type LoggedDecision = DecisionEntry & { at: Date };

/**
 * Keeps every decision it has seen, with when it first appeared, even after the state it came from changes (going back
 * to the choice resets the later steps, but their decisions stay). Newest first.
 */
function useDecisionLog(entries: DecisionEntry[]): LoggedDecision[] {
	const log = React.useRef(new Map<string, LoggedDecision>());
	for (const entry of entries) if (!log.current.has(entry.id)) log.current.set(entry.id, { ...entry, at: new Date() });
	return [...log.current.values()].reverse();
}

const timeFormat = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });

/** The log, newest first: what was decided, the reason or detail, then who, the step and when. Read only. */
function DecisionLog({ decisions }: { decisions: LoggedDecision[] }) {
	return (
		<ol className='flex flex-col divide-y divide-border'>
			{decisions.map((decision) => (
				<li key={decision.id} className='flex flex-col gap-0.5 py-2.5 text-sm first:pt-0 last:pb-0'>
					<span className='font-medium text-foreground'>{decision.what}</span>
					{decision.detail ? <span className='text-foreground'>{decision.detail}</span> : null}
					<span className='text-xs text-muted-foreground'>
						{decision.who} · {decision.step} · <time dateTime={decision.at.toISOString()}>{timeFormat.format(decision.at)}</time>
					</span>
				</li>
			))}
		</ol>
	);
}

export { DecisionLog, useDecisionLog, type DecisionEntry, type LoggedDecision };
