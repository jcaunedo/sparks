import * as React from "react";

/**
 * Enter runs `action`, the screen's main "continue" (e.g. the first quick reply, marked with the ↵ key), while nothing
 * else wants Enter: focus is on the page itself, or in the empty message box (`data-slot='prompt-composer-input'`, with no files attached).
 * Enter on a button or link, in any other field, in the message box with text, with a modifier, or while an IME is
 * composing keeps its own meaning. Pass `undefined` to turn it off; only one should be on at a time.
 */
function useEnterShortcut(action: (() => void) | undefined) {
	const latest = React.useRef(action);
	latest.current = action;
	const enabled = Boolean(action);
	React.useEffect(() => {
		if (!enabled) return;
		// The Enter that sent her message can still be on its way up when the next replies appear (reduced motion shows them
		// at once): a key pressed before this was on isn't for it.
		const enabledAt = performance.now();
		const onKeyDown = (event: KeyboardEvent) => {
			if (event.timeStamp < enabledAt) return;
			if (event.key !== "Enter" || event.repeat || event.isComposing) return;
			if (event.shiftKey || event.altKey || event.ctrlKey || event.metaKey) return;
			const target = event.target instanceof HTMLElement ? event.target : null;
			const emptyMessageBox =
				target instanceof HTMLTextAreaElement && target.dataset.slot === "prompt-composer-input" && !target.value.trim() && !target.dataset.hasAttachments;
			const onPage = !target || target === document.body || target === document.documentElement;
			if (!emptyMessageBox && (!onPage || event.defaultPrevented)) return;
			event.preventDefault();
			latest.current?.();
		};
		document.addEventListener("keydown", onKeyDown);
		return () => document.removeEventListener("keydown", onKeyDown);
	}, [enabled]);
}

export { useEnterShortcut };
