import * as React from "react";

import { useMotionPreference } from "./reduced-motion";
import { motionDuration } from "./tokens";

/** Where the next streamed burst ends: one to three words further, so the text arrives unevenly, like real generation. */
function nextChunkEnd(text: string, from: number) {
	let end = from;
	const words = 1 + Math.floor(Math.random() * 3);
	for (let word = 0; word < words && end < text.length; word++) {
		while (end < text.length && /\s/.test(text[end])) end++;
		while (end < text.length && !/\s/.test(text[end])) end++;
	}
	return end;
}

/** How long to wait after a burst: around `streamStep`, plus `streamPause` after a sentence, paragraph or list item. */
function chunkDelay(text: string, end: number) {
	const base = motionDuration.streamStep * (0.6 + Math.random());
	const pause = /[.!?:]$/.test(text.slice(0, end)) || text[end] === "\n" ? motionDuration.streamPause : 0;
	return (base + pause) * 1000;
}

/**
 * Streams `text` in, a few words at a time, while `active`. Returns how many characters to show and whether it's still
 * streaming. Turning `active` off (or reduced motion) shows the whole text at once.
 */
function useStreamedText(text: string, active: boolean) {
	const { prefersReducedMotion } = useMotionPreference();
	const live = active && !prefersReducedMotion;
	const [shown, setShown] = React.useState(live ? 0 : text.length);

	React.useEffect(() => {
		if (!live || shown >= text.length) return;
		const timer = window.setTimeout(() => setShown(nextChunkEnd(text, shown)), chunkDelay(text, shown));
		return () => window.clearTimeout(timer);
	}, [live, shown, text]);

	return live ? { shown, streaming: shown < text.length } : { shown: text.length, streaming: false };
}

export { useStreamedText };
