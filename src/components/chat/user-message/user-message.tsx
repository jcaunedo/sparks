import * as React from "react";

import { cn } from "@/lib/utils";

type UserMessageProps = React.ComponentProps<"div">;

/**
 * A message the user sent to the assistant, as a chat bubble. Figma sparks.ds → "user-message" (node 41:1916).
 * It fits its text and wraps; aligning it to the end of the conversation is the layout's job.
 */
function UserMessage({ className, ...props }: UserMessageProps) {
	return (
		<div
			data-slot='user-message'
			className={cn(
				// Figma: Sparks accent subtle fill, 12px corners with a 2px bottom-right "tail", 14px × 8px padding.
				"w-fit max-w-[80%] rounded-message rounded-br-message-tail bg-sparks-accent-subtle px-3.5 py-2",
				// Figma "base/base" text. Long messages wrap; line breaks the user typed (Shift+Enter) are kept.
				"text-base text-foreground whitespace-pre-wrap break-words",
				className,
			)}
			{...props}
		/>
	);
}

export { UserMessage, type UserMessageProps };
