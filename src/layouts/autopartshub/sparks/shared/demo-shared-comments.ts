import * as React from "react";

/*
 * Prototype only (stories, never a screen): the comments people leave in one story show in the others, as they would in
 * the product. A reviewer's comment on the published idea ("Published idea" story) shows on Dana's Review (the
 * "Workspace" stories), and her replies show back on the reviewer's page. Kept in localStorage, so it works across tabs
 * (a `storage` event brings a change from another tab at once) and across stories in one tab. Only comments added or
 * changed in the demo go there; each story's own sample comments stay its own. "Reset prototype" and the start page
 * starting the demo over clear it.
 */

type SharedComment = { id: string; path?: unknown; node?: unknown };
type Kind = "prototype" | "idea";

const keyFor = (kind: Kind) => `sparks:demo-shared-comments:${kind}`;

/**
 * A comment as it's shared: without `path`, which each story sets for itself (the path it's on), and without `node`, the
 * element its pin was dropped on in this page (it can't leave the page; the other story places the pin by its `point`
 * or `screenAt`).
 */
const shareable = <T extends SharedComment>({ path: _path, node: _node, ...rest }: T) => rest;
const fingerprint = <T extends SharedComment>(comment: T) => JSON.stringify(shareable(comment));

function load(kind: Kind): Record<string, SharedComment> {
	try {
		const saved = localStorage.getItem(keyFor(kind));
		return saved ? (JSON.parse(saved) as Record<string, SharedComment>) : {};
	} catch {
		return {};
	}
}

function save(kind: Kind, changed: SharedComment[]) {
	if (!changed.length) return;
	try {
		const all = load(kind);
		for (const comment of changed) all[comment.id] = shareable(comment);
		localStorage.setItem(keyFor(kind), JSON.stringify(all));
	} catch {
		// No storage: the comment stays in this story only.
	}
}

/** "Reset prototype", or the demo starting over: no comment carries over. */
function clearDemoSharedComments() {
	try {
		localStorage.removeItem(keyFor("prototype"));
		localStorage.removeItem(keyFor("idea"));
	} catch {
		// No storage: there's nothing to clear.
	}
}

/**
 * Keeps one story's comments in step with the shared ones: what's added or changed here is shared; what's shared from
 * another story (or tab) comes in, through `adopt` (e.g. to set its path). `enabled` false holds the incoming ones back
 * (Dana's Review before she publishes: no one has the idea yet); they come in once it's true. `onIncoming`: the ids that
 * just came in and weren't here before (new to her: the unread dot).
 */
function useDemoSharedComments<T extends SharedComment>(
	kind: Kind,
	comments: T[],
	setComments: React.Dispatch<React.SetStateAction<T[]>>,
	{ enabled = true, adopt = (comment: T) => comment, onIncoming }: { enabled?: boolean; adopt?: (comment: T) => T; onIncoming?: (ids: string[]) => void } = {},
) {
	// What each comment was the last time it was shared or came in: the story's own samples count as known, so they
	// aren't shared.
	const known = React.useRef<Map<string, string> | null>(null);
	if (known.current === null) known.current = new Map(comments.map((c) => [c.id, fingerprint(c)]));
	const latest = React.useRef({ adopt, onIncoming });
	latest.current = { adopt, onIncoming };

	// Added or changed here: shared.
	React.useEffect(() => {
		const map = known.current!;
		const changed = comments.filter((c) => map.get(c.id) !== fingerprint(c));
		for (const c of changed) map.set(c.id, fingerprint(c));
		save(kind, changed);
	}, [kind, comments]);

	// Shared elsewhere: in, now and whenever another tab shares one.
	React.useEffect(() => {
		if (!enabled) return;
		const takeIn = () => {
			const map = known.current!;
			const incoming = Object.values(load(kind)).filter((c) => map.get(c.id) !== fingerprint(c)) as T[];
			if (!incoming.length) return;
			for (const c of incoming) map.set(c.id, fingerprint(c));
			let added: string[] = [];
			setComments((current) => {
				const byId = new Map(current.map((c) => [c.id, c]));
				added = incoming.filter((c) => !byId.has(c.id)).map((c) => c.id);
				// A comment she has here keeps its path; a new one gets this story's.
				for (const c of incoming) {
					const here = byId.get(c.id);
					byId.set(c.id, here ? ({ ...c, path: here.path, node: here.node } as T) : latest.current.adopt(c));
				}
				return [...byId.values()];
			});
			requestAnimationFrame(() => {
				if (added.length) latest.current.onIncoming?.(added);
			});
		};
		takeIn();
		const onStorage = (event: StorageEvent) => {
			if (event.key === keyFor(kind)) takeIn();
		};
		window.addEventListener("storage", onStorage);
		return () => window.removeEventListener("storage", onStorage);
	}, [kind, enabled, setComments]);
}

export { clearDemoSharedComments, useDemoSharedComments };
