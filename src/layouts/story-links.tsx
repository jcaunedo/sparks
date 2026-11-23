import type { Decorator } from "@storybook/react-vite";
import { SELECT_STORY, STORY_RENDERED, UPDATE_STORY_ARGS } from "storybook/internal/core-events";
import { addons } from "storybook/preview-api";

type StoryArgs = Record<string, unknown>;

/** A link's destination: a story, optionally opened with some of its args changed, or in a new tab. */
type StoryLink = string | { storyId: string; args?: StoryArgs; newTab?: boolean };

/* Args waiting for their story to render, kept across the reload of a standalone story tab. */
const pendingArgsKey = "ucl-story-links:pending-args";

/** Once `storyId` has rendered, set `args` on it (they show in the Controls panel; "Reset controls" undoes them). */
function applyArgsWhenRendered(storyId: string, args: StoryArgs) {
	const channel = addons.getChannel();
	const apply = (renderedId: string) => {
		if (renderedId !== storyId) return;
		channel.off(STORY_RENDERED, apply);
		channel.emit(UPDATE_STORY_ARGS, { storyId, updatedArgs: args });
	};
	channel.on(STORY_RENDERED, apply);
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
 * Opens a story on its own in a new tab (`iframe.html`, no Storybook around it), like an app opening in its own tab.
 * `args` opens it with those args changed; they go through localStorage, since a new tab doesn't share sessionStorage.
 */
function openStoryInNewTab(storyId: string, args?: StoryArgs) {
	try {
		if (args) localStorage.setItem(pendingArgsKey, JSON.stringify({ storyId, args }));
	} catch {
		// No storage: the story opens with its own args.
	}
	window.open(`iframe.html?id=${storyId}&viewMode=story`, "_blank", "noopener");
}

/**
 * Closes a story's tab, like an app tab closing. Browsers only close a tab a script opened (`openStoryInNewTab`); when
 * the tab stays open (inside Storybook, or a tab opened by hand), it goes to `fallbackStoryId` instead.
 */
function closeStoryTab(fallbackStoryId: string) {
	if (window.parent === window) window.close();
	window.setTimeout(() => goToStory(fallbackStoryId), 150);
}

/* Standalone tab, after the reload: apply the args the previous story left. */
try {
	// sessionStorage: this tab reloaded on another story; localStorage: a tab that opened this one.
	const store = sessionStorage.getItem(pendingArgsKey) ? sessionStorage : localStorage;
	const pending = store.getItem(pendingArgsKey);
	if (pending) {
		store.removeItem(pendingArgsKey);
		const { storyId, args } = JSON.parse(pending) as { storyId: string; args: StoryArgs };
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
				else if (target.newTab) openStoryInNewTab(target.storyId, target.args);
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
} as const;

export { goToStory, openStoryInNewTab, closeStoryTab, withStoryLinks, storyIds, type StoryLink };
