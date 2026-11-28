import type { Decorator } from "@storybook/react-vite";
import { SELECT_STORY, STORY_RENDERED, UPDATE_STORY_ARGS } from "storybook/internal/core-events";
import { addons } from "storybook/preview-api";

type StoryArgs = Record<string, unknown>;

/**
 * A link's destination: a story, optionally opened with some of its args changed, or in a new tab. `tab` names that tab
 * (as the screen's `target` does, e.g. "autopartshub-sparks"): when it's already open, it comes to the front as it is.
 */
type StoryLink = string | { storyId: string; args?: StoryArgs; newTab?: boolean; tab?: string };

/* Args waiting for their story to render, kept across the reload of a standalone story tab. */
const pendingArgsKey = "ucl-story-links:pending-args";

/**
 * The args a standalone tab's story was opened with, until they're set on it: Storybook renders a story with its own
 * args first and takes these only after, so a story can use them from its first render (`argsPendingAtLoad`).
 */
let pendingAtLoad: { storyId: string; args: StoryArgs } | undefined;

/** Once `storyId` has rendered, set `args` on it (they show in the Controls panel; "Reset controls" undoes them). */
function applyArgsWhenRendered(storyId: string, args: StoryArgs) {
	const channel = addons.getChannel();
	const apply = (renderedId: string) => {
		if (renderedId !== storyId) return;
		channel.off(STORY_RENDERED, apply);
		channel.emit(UPDATE_STORY_ARGS, { storyId, updatedArgs: args });
		if (pendingAtLoad?.storyId === storyId) pendingAtLoad = undefined;
	};
	channel.on(STORY_RENDERED, apply);
}

/**
 * A story's args with those it was opened with (`goToStory` with args, in a standalone tab) already in, from its first
 * render: without it, the story shows its own args for a moment first (a concept opened from its row showed a new
 * concept, its introduction streaming, then the concept). For a story's `render`.
 */
function argsPendingAtLoad<T extends object>(storyId: string, args: T): T {
	return pendingAtLoad?.storyId === storyId ? { ...args, ...(pendingAtLoad.args as Partial<T>) } : args;
}

/**
 * Prototype navigation between layout stories, Storybook only (not part of any screen).
 * Inside Storybook it selects the story in the sidebar; in a standalone story tab (`iframe.html`) it loads that story.
 * `args` opens the story with those args changed, e.g. the concept a row stands for.
 */
function goToStory(storyId: string, args?: StoryArgs) {
	if (window.parent !== window) {
		if (args) applyArgsWhenRendered(storyId, args);
		addons.getChannel().emit(SELECT_STORY, { storyId });
		// The story that's already open doesn't render again on SELECT_STORY: set its args now.
		if (args) addons.getChannel().emit(UPDATE_STORY_ARGS, { storyId, updatedArgs: args });
		return;
	}
	try {
		if (args) sessionStorage.setItem(pendingArgsKey, JSON.stringify({ storyId, args }));
	} catch {
		// No storage: the story opens with its own args.
	}
	window.location.search = `?id=${storyId}&viewMode=story`;
}

/**
 * A story's address on its own (`iframe.html`, no Storybook around it), relative, so it works wherever Storybook runs:
 * on localhost and on the Netlify site alike. For a link (`href`) that opens a story.
 */
function storyHref(storyId: string) {
	return `iframe.html?id=${storyId}&viewMode=story`;
}

/**
 * Opens a story on its own in a new tab (`iframe.html`, no Storybook around it), like an app opening in its own tab.
 * `args` opens it with those args changed; they go through localStorage, since a new tab doesn't share sessionStorage.
 */
function openStoryInNewTab(storyId: string, args?: StoryArgs, tab?: string) {
	const url = storyHref(storyId);
	// A named tab that's already open (an app she opened before) comes to the front as it is, without reloading:
	// `window.open("", name)` finds it, or opens a blank one, which then loads the story.
	if (tab) {
		const existing = window.open("", tab);
		if (existing) {
			let blank = true;
			try {
				blank = existing.location.href === "about:blank";
			} catch {
				// Another origin: it's open, so leave it as it is.
				blank = false;
			}
			if (!blank) {
				// With args (e.g. the home on "My library"), that tab shows them without reloading.
				if (args) existing.postMessage({ type: showMessage, storyId, args }, window.location.origin);
				existing.focus();
				return;
			}
			try {
				if (args) localStorage.setItem(pendingArgsKey, JSON.stringify({ storyId, args }));
			} catch {
				// No storage: the story opens with its own args.
			}
			existing.location.href = new URL(url, window.location.href).href;
			existing.focus();
			return;
		}
	}
	try {
		if (args) localStorage.setItem(pendingArgsKey, JSON.stringify({ storyId, args }));
	} catch {
		// No storage: the story opens with its own args.
	}
	window.open(url, "_blank", "noopener");
}

/** The message a tab gets when it's brought back with a story to show: `{ type, storyId, args }`. */
const showMessage = "ucl-story-links:show";

/**
 * Names a standalone story's tab, like an app's tab (`target="autopartshub-home"` in the screens), so other tabs can
 * bring it back instead of opening another (`openStoryInNewTab` with `tab`). Inside Storybook it does nothing.
 */
function withTabName(name: string): Decorator {
	return (Story) => {
		if (typeof window !== "undefined" && window.parent === window) window.name = name;
		return <Story />;
	};
}

/**
 * Closes a story's tab, like an app tab closing. Browsers only close a tab a script opened (`openStoryInNewTab`); when
 * the tab stays open (inside Storybook, or a tab opened by hand), it goes to `fallbackStoryId` instead.
 */
function closeStoryTab(fallbackStoryId: string) {
	if (window.parent === window) window.close();
	window.setTimeout(() => goToStory(fallbackStoryId), 150);
}

/* Brought back from another tab with a story to show: the same story gets the args in place; another one loads. */
if (typeof window !== "undefined")
	window.addEventListener("message", (event) => {
		if (event.origin !== window.location.origin || event.data?.type !== showMessage) return;
		const { storyId, args } = event.data as { storyId: string; args?: StoryArgs };
		const current = new URLSearchParams(window.location.search).get("id");
		if (current === storyId) {
			if (args) addons.getChannel().emit(UPDATE_STORY_ARGS, { storyId, updatedArgs: args });
		} else goToStory(storyId, args);
	});

/* Standalone tab, after the reload: apply the args the previous story left. */
try {
	// sessionStorage: this tab reloaded on another story; localStorage: a tab that opened this one.
	const store = sessionStorage.getItem(pendingArgsKey) ? sessionStorage : localStorage;
	const pending = store.getItem(pendingArgsKey);
	if (pending) {
		store.removeItem(pendingArgsKey);
		const { storyId, args } = JSON.parse(pending) as { storyId: string; args: StoryArgs };
		pendingAtLoad = { storyId, args };
		applyArgsWhenRendered(storyId, args);
	}
} catch {
	// No storage or a malformed entry: nothing to apply.
}

/**
 * Makes links inside a story open other stories: `withStoryLinks({ "#sparks": "<story id>" })`, or
 * `{ "#fit-check": { storyId, args } }` to open it with some args changed, `{ "#sparks": { storyId, newTab: true } }`
 * to open it in a new tab. The screen keeps its real `href`s; the story maps the ones the prototype follows.
 * Placeholder links it doesn't map (`#…`) do nothing, so they don't reload or open the same story.
 */
function withStoryLinks(links: Record<string, StoryLink> | (() => Record<string, StoryLink>)): Decorator {
	return (Story) => (
		<div
			style={{ display: "contents" }}
			onClickCapture={(event) => {
				const link = (event.target as HTMLElement).closest("a[href]");
				const href = link?.getAttribute("href") ?? "";
				// A function is read at each click, for links that change while the prototype runs (a concept she started).
				const target = (typeof links === "function" ? links() : links)[href];
				if (!target) {
					if (href.startsWith("#")) event.preventDefault();
					return;
				}
				event.preventDefault();
				if (typeof target === "string") goToStory(target);
				else if (target.newTab) openStoryInNewTab(target.storyId, target.args, target.tab);
				else goToStory(target.storyId, target.args);
			}}
		>
			<Story />
		</div>
	);
}

/** Story IDs the layout prototypes link between. */
const storyIds = {
	autoPartsHubHome: "layouts-autopartshub-home--default",
	sparksStartPage: "layouts-autopartshub-sparks-start-page--default",
	sparksWorkspace: "layouts-autopartshub-sparks-workspace--default",
	sparksPrototypeReady: "layouts-autopartshub-sparks-workspace--prototype-ready",
	sparksReviewReady: "layouts-autopartshub-sparks-workspace--review-ready",
	sparksPublishedIdea: "layouts-autopartshub-sparks-published-idea--default",
	sparksAdvancedIdea: "layouts-autopartshub-sparks-published-idea--advanced",
} as const;

export { goToStory, openStoryInNewTab, closeStoryTab, storyHref, withStoryLinks, withTabName, storyIds, type StoryLink, argsPendingAtLoad };
