import * as React from "react";
import { Pen } from "lucide-react";

import { Button } from "@/components/buttons/button";
import { QuickReplies } from "@/components/chat/quick-replies";
import { cn } from "@/lib/utils";

type ClarificationCardProps = Omit<React.ComponentProps<"div">, "children"> & {
	/** What the assistant asks, e.g. "Who does it affect?". */
	question: string;
	/** The assistant's answer for the user to confirm, change or correct. Line breaks show ("\n\n" for a new paragraph). */
	answer: string;
	/** A label between the question and the answer, e.g. a `Badge` "Assumption" when the answer relies on something unproven. */
	badge?: React.ReactNode;
	/** Where the answer came from, e.g. "Suggested by Sparks · from customer intelligence". */
	source?: React.ReactNode;
	/** The answers the user can pick, e.g. "Yes, that's right" and "Not quite", under the card. None once it's answered. */
	replies?: string[];
	/** Picking one of `replies`. */
	onReply?: (reply: string) => void;
	/** The reply the user picked before, while they change their answer: it shows a check (`QuickReplies` `selected`). */
	selectedReply?: string;
	/** Enter picks the first reply (`QuickReplies` `enter`, on by default). Off when another set of replies on the screen has it. */
	enter?: boolean;
	/** Saving an edit of `answer`. Without it, there's no edit button. */
	onEdit?: (answer: string) => void;
	/** Opens in the Edit state (Figma "State=Edit"), e.g. for a story. */
	defaultEditing?: boolean;
};

/**
 * A question from the AI assistant in the conversation, with its answer for the user to confirm with a reply, edit in
 * place or correct (sparks.ds "clarification-card", node 55:2585: State=Default and State=Edit).
 */
function ClarificationCard({
	question,
	answer,
	badge,
	source,
	replies = [],
	onReply,
	selectedReply,
	enter = true,
	onEdit,
	defaultEditing = false,
	className,
	...props
}: ClarificationCardProps) {
	const questionId = React.useId();
	const [editing, setEditing] = React.useState(defaultEditing && Boolean(onEdit));
	const [value, setValue] = React.useState(answer);

	const startEditing = () => {
		setValue(answer);
		setEditing(true);
	};
	const cancel = () => {
		setValue(answer);
		setEditing(false);
	};
	const save = () => {
		const text = value.trim();
		if (!text) return;
		if (text !== answer) onEdit?.(text);
		setEditing(false);
	};

	return (
		<div
			role='group'
			aria-labelledby={questionId}
			data-slot='clarification-card'
			data-state={editing ? "edit" : "default"}
			// Figma: 16px between the panel and the answer buttons (spacing/4).
			className={cn("flex w-full flex-col items-start gap-4", className)}
			{...props}
		>
			{/* Figma "clarification-message": 16px corners, 16px top/bottom, 20px left, 16px right. State=Default is
			    palettes/corn/50, a light yellow that marks a question waiting on the user; State=Edit is background/subtle,
			    with 20px right (no pen, so the field runs the full width). */}
			<div
				className={cn(
					"flex w-full flex-col gap-2 rounded-card py-4 pl-5",
					editing ? "bg-background-subtle pr-5" : "bg-(--corn-50) pr-4",
				)}
			>
				<div className='flex w-full items-start gap-6'>
					{/* The question 4px above the answer; in State=Edit, 8px above the field. */}
					<div className={cn("flex min-w-0 flex-1 flex-col text-base text-foreground", editing ? "gap-2" : "gap-1")}>
						{/* Figma "base -semibold". */}
						<p id={questionId} className='font-semibold'>
							{question}
						</p>
						{/* Figma "badge container": the badge on its own line, 4px of padding above it, so 8px below the question and
						    4px above the answer. sparks.ds draws an xxs "Assumption" badge here. */}
						{/* Figma's "Show badge" property; State=Edit has no badge. */}
						{badge && !editing ? <div className='flex pt-1'>{badge}</div> : null}
						{editing ? (
							// The field, then Cancel and Save 12px below it (spacing/3), on the right.
							<div className='flex w-full flex-col gap-3'>
								{/* Figma "input": background, border, 10px corners, 12px × 8px padding with the 1px border drawn
								    inside it, so 11px × 7px here plus the border (64px tall for two lines, as in Figma). */}
								<textarea
									aria-label={question}
									value={value}
									autoFocus
									rows={Math.max(2, Math.ceil(value.length / 64))}
									onChange={(event) => setValue(event.target.value)}
									onKeyDown={(event) => {
										if (event.key === "Escape") cancel();
										if (event.key === "Enter" && !event.shiftKey) {
											event.preventDefault();
											save();
										}
									}}
									className='w-full resize-none rounded-input border border-border bg-background px-[11px] py-[7px] text-base text-foreground outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50'
								/>
								{/* Figma: on the right, 8px apart, Cancel first and Save last (the main action at the end). */}
								<div className='flex w-full justify-end gap-2'>
									{/* Figma Button Outlined, 36px, shadow-xs. */}
									<Button
										variant='outline'
										className='rounded-button-lg px-3.5 text-sm font-semibold text-foreground shadow-xs'
										onClick={cancel}
									>
										Cancel
									</Button>
									{/* Figma Button Solid · Neutral, 36px: 14px sides, sm semibold, radius/button/lg, the same size as the
									    answer buttons. */}
									<Button
										variant='neutral'
										className='rounded-button-lg px-3.5 text-sm font-semibold'
										disabled={!value.trim()}
										onClick={save}
									>
										Save
									</Button>
								</div>
							</div>
						) : (
							// A blank line in the answer starts a new paragraph.
							<p className='whitespace-pre-line'>{answer}</p>
						)}
					</div>
					{onEdit && !editing ? (
						// Figma Button Ghost · Icon, 32px, a 16px pen. Gone while editing (State=Edit has none).
						<Button
							variant='ghost'
							size='icon'
							aria-label={`Edit: ${question}`}
							// The pen in colors/icon/foreground.
							className='size-8 rounded-button-md text-icon'
							onClick={startEditing}
						>
							<Pen aria-hidden />
						</Button>
					) : null}
				</div>
				{/* Where the answer came from. Hidden while editing, as in Figma's State=Edit. */}
				{source && !editing ? <div className='flex items-center gap-2 text-xs text-muted-foreground'>{source}</div> : null}
			</div>

			{/* Figma "ctas", 16px under the panel (`QuickReplies`): the first reply (the "yes") last, at the right edge, as
			    Save is, with the ↵ key; Enter picks it. Not in State=Edit: they come back once the edit is saved or
			    cancelled. */}
			{replies.length && !editing ? <QuickReplies replies={replies} onReply={onReply} selected={selectedReply} enter={enter} /> : null}
		</div>
	);
}

export { ClarificationCard, type ClarificationCardProps };
