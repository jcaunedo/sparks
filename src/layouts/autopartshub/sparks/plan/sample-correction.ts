/*
 * Her correction to a Plan summary, after "Not quite" (prds/sparks-plan-problem.md, "Finishing this part"). The AI would
 * rework the summary from her words; the demo adds them to it as a sentence, so the updated version shows what she said.
 */

/** Her words as a sentence: capital first, a full stop at the end. */
export function sampleCorrectionSentence(words: string) {
	const text = words.trim().replace(/\s+/g, " ");
	if (!text) return "";
	const sentence = text.charAt(0).toUpperCase() + text.slice(1);
	return /[.!?]$/.test(sentence) ? sentence : `${sentence}.`;
}

/** A text with her correction worked in: after it, as one more sentence. */
export const sampleWithCorrection = (text: string, words: string) =>
	[text.trim(), sampleCorrectionSentence(words)].filter(Boolean).join(" ");
