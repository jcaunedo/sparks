# Sparks UCL

Sparks's UCL (Unified Component Library): a React component library that lives in its own repo, ships design tokens as CSS, and is reviewed in Storybook before any app uses it. Published as `@jcaunedo/ucl`.

## Getting started

```bash
npm install
npm run storybook
```

Storybook opens at http://localhost:6006. The Claude Code skills in `.claude/` are gitignored and synced between machines by claude-sync (`~/.claude/README.md`).

## How UCL works

The component library lives in its own repo, separate from the apps that use it. It holds the shared UI components plus one CSS file with the design tokens (colors, type, spacing).

| Piece             | What it does                                                                                       | In this repo                                    | Common alternatives                                   |
| ----------------- | -------------------------------------------------------------------------------------------------- | ----------------------------------------------- | ----------------------------------------------------- |
| Bundler           | Compiles the library into a package with three parts: the compiled JS, type definitions and the stylesheet | tsup → `dist/index.js`, `dist/index.d.ts`, `dist/styles.css` | Vite, Rollup                                          |
| Component workbench | Builds and reviews components in isolation. Each component has stories for its states, so design and engineering review the same thing before any app touches it | Storybook 10, hosted on Netlify                 | Ladle                                                 |
| Package registry  | Stores the built package. Each app installs it like any other dependency                           | GitHub Packages                                 | Private npm org, Artifactory, self-hosted Verdaccio   |
| CI pipeline       | Publishes a new package when the version changes                                                   | GitHub Actions (`.github/workflows/publish.yml`) | GitLab CI, CircleCI                                   |

An app only needs a small registry config pointing the package scope at the registry, plus a read-only access token (see [Using UCL in an App](#using-ucl-in-an-app)).

## Tech stack

- React 19, TypeScript (strict)
- Tailwind CSS 4, tokens in `src/styles/theme.css`
- Base components: shadcn/ui on Radix
- Icons: `lucide-react`
- Forms: react-hook-form + zod (optional peer dependencies)
- Motion for React (`motion/react`)
- Storybook 10 with MDX docs
- tsup (ESM bundle + types + CSS)

## Using UCL in an App

### 1. Point the app at GitHub Packages

UCL is published to GitHub Packages, not the public npm registry. Add an `.npmrc` at the app's root so npm fetches the `@jcaunedo` scope from there:

```ini
@jcaunedo:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NPM_TOKEN}
```

`NPM_TOKEN` is a GitHub personal access token (classic) with the `read:packages` scope. GitHub Packages asks for a token even to install public packages.

- **Locally:** create the token at GitHub → Settings → Developer settings → Personal access tokens, and export it in your shell (`export NPM_TOKEN=…`). Never commit it: the `.npmrc` only names the variable.
- **In the app's CI and hosting:** add the same token as a secret named `NPM_TOKEN`.

### 2. Install

```bash
npm install @jcaunedo/ucl
```

`react` and `react-dom` 19 are peer dependencies: the app provides them, so it doesn't get two copies of React. Form components also need `react-hook-form`, `zod` and `@hookform/resolvers`, which are optional peer dependencies.

### 3. Import the styles

In the app's global CSS:

```css
@import "tailwindcss";
@import "@jcaunedo/ucl/styles";
@source "../node_modules/@jcaunedo/ucl/dist";
```

`@source` makes Tailwind scan UCL's compiled JS for class names. **Without it, component styles go missing without any error.** Adjust the path so it's relative to the stylesheet.

### 4. Load the fonts

UCL declares the font tokens (`--font-sans`, `--font-mono` in `theme.css`) but doesn't load the webfonts. Each app loads the fonts those tokens name, for example with `next/font/google` or a Google Fonts `<link>`. Without them, text falls back to the system font.

### 5. Use components

```tsx
import { Button } from "@jcaunedo/ucl";

export function Example() {
	return <Button>Continue</Button>;
}
```

Add the `dark` class to a parent element (usually `<html>`) to switch every token to its dark value.

ℹ️ The build marks the bundle `"use client"` (`scripts/add-use-client.mjs`), so apps with server-side rendering, like Next.js Server Components, can import UCL directly. Client-only apps ignore it.

## Development workflow

1. **Build or update the component in Storybook**, with stories for every state (default, hover, disabled, error, loading, empty, etc.).
2. **Export it from `src/index.ts`**, the library's public entry file, so apps can import it.
3. **Get it reviewed:** design review in Storybook, code review in the PR. Then merge it to `main`.
4. **Bump the version** with one of the [release scripts](#releasing) and push the commit and tag. CI publishes the new version.
5. **In each app**, update the UCL dependency to the new version, check the screens that use it, and ship the app through its normal deploy process.

Production only changes when an app picks up the new version and deploys. Publishing a UCL version never changes a live site by itself.

**Try unpublished changes in an app:** link the library locally first, with `npm link`, [yalc](https://github.com/wclr/yalc), or a local file path dependency (`"@jcaunedo/ucl": "file:../sparks"`).

## Releasing

### Publishing is automated but opt-in

`.github/workflows/publish.yml` watches `main` and publishes a new package **only when the version in `package.json` changes**. Merging normal work releases nothing. A release happens only when someone deliberately bumps the version, which keeps the registry clean and every release intentional.

The workflow also never publishes on a first commit with no previous version to compare, so the first release always comes from `npm run release:*`.

### Helper scripts

These scripts in `package.json` make a release one command:

| Script                                                  | What it does                                                                 |
| ------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `"preversion": "npm run lint"`                          | Runs the type check first and blocks the release if it fails                 |
| `"postversion": "npm run build"`                        | Rebuilds the package after the bump                                          |
| `"release:patch": "npm version patch"`                  | Bumps the version, creates the commit and tags the release (e.g. `v1.4.3`)   |
| `"release:minor": "npm version minor"`                  | Same, for a minor bump                                                       |
| `"release:major": "npm version major"`                  | Same, for a major bump                                                       |

The release flow:

1. Commit your work. The working tree must be clean.
2. Run `npm run release:patch` (or `release:minor` / `release:major`).
3. Run `git push && git push --tags`. CI takes it from there.

ℹ️ Other package managers have equivalent version commands (`yarn version`, `pnpm version`).

### Which version to bump (semantic versioning)

- **Patch** (1.4.2 → 1.4.3): bug fixes and visual tweaks that don't change how the component is used, like fixing padding, a color or an accessibility issue.
- **Minor** (1.4.2 → 1.5.0): new things that don't break existing usage: a new component, a new optional prop, a new variant or a new design token.
- **Major** (1.4.2 → 2.0.0): anything that could break an app: removing or renaming a component, prop or token, changing a default behavior, or requiring a newer framework version.

⚠️ **Below 1.0.0:** package managers treat a minor bump (0.7 → 0.8) as breaking, so apps won't pick it up automatically. That's fine early on, but worth knowing.

## Why it's set up this way

- **Design tokens ship as a CSS file in the package** (`@jcaunedo/ucl/styles`), so apps never copy colors by hand.
- **Apps using Tailwind must scan UCL's built files** for class names (the `@source` line in [Import the styles](#3-import-the-styles)), or styles silently go missing.
- **The bundle is marked as client-side code** in a post-build step, so apps with server-side rendering (e.g. Next.js Server Components) import it cleanly.
- **Peer dependencies stay peers.** React (and the forms libraries) are peer dependencies, not bundled, so apps don't end up with two copies.

## Product specs (PRDs)

The [`prds/`](prds/) folder holds the product's specs (PRDs): one per screen, flow or component. CLAUDE.md and DESIGN.md say how the library is built. A PRD says what the product should do, for whom, and why: its states and rules, its copy, the decisions made (marked ✅ with a date) and what's still open (marked ⚠️). When a layout and its PRD disagree, the PRD says what was intended: fix the code, or update the PRD if the decision changed.

### Keeping PRDs current

When you work on a component or layout with Claude Code, the design decisions you make are added to the related PRD automatically. You don't have to ask. The rule lives in [CLAUDE.md → Keeping PRDs Current](CLAUDE.md), and the `ucl-generate-component` and `ucl-generate-layout` skills check it before they finish.

**What triggers an update:** a change that settles or changes a product decision, meaning what the user sees or can do: a state, a rule (validation, statuses, limits), copy, the steps of a flow, or what's shown or hidden and when.

**What doesn't:** visual or implementation fixes (spacing, tokens, a Figma value, a bug, a refactor) that don't change what the user sees or can do. Those go to DESIGN.md when they could easily be undone, and nowhere otherwise.

**What Claude Code does:**

1. **Finds the PRD that covers the work.** It searches `prds/` for the file's path, the component's name or the screen it belongs to. A component is often covered by the PRD of the screen that uses it. There's no rule that every component gets its own PRD.
2. **Updates it in the same change:** rewrites the rule where it's described, adds a ✅ note tagged just `✅ **Resolved:**` (no date, no who decided, no ID; see [CONVENTIONS.md → PRD writing](CONVENTIONS.md)), strikes through any earlier decision it replaces, closes or rewords any ⚠️ note or open question the decision answers, and updates the header's `Last updated:`.
3. **Asks when no PRD covers the work:** create a dedicated PRD, or add a section to an existing one. It never creates a PRD on its own.
4. **Names the PRD it updated** in its reply, so you can review the change.

ℹ️ When you edit code without Claude Code, follow the same steps by hand.

## Commands

| Command                   | Description                                            |
| ------------------------- | ------------------------------------------------------ |
| `npm run storybook`       | Launch Storybook at http://localhost:6006              |
| `npm run build`           | Build the library to `dist/`                           |
| `npm run dev`             | Build in watch mode                                    |
| `npm run lint`            | Type-check with TypeScript                             |
| `npm run build-storybook` | Build the static Storybook site                        |
| `npm run release:patch`   | Bump the version, tag and build (also `minor`/`major`) |

## Project structure

```text
.claude/                    # Gitignored; synced by claude-sync (links)
  skills/                   # ucl-setup, ucl-ds-sync, ucl-generate-component,
                            # ucl-generate-layout, sparks-copywriter, …
.github/workflows/
  publish.yml               # Publishes when the package.json version changes
scripts/
  add-use-client.mjs        # Marks the bundle "use client" after the build
src/
  index.ts                  # Public API exports
  lib/                      # cn(), breakpoints, motion system, hooks
  styles/
    theme.css               # Design tokens shipped to consumers
    globals.css             # Storybook styles
  docs/                     # Storybook MDX pages (Introduction, Foundations)
  components/
    <category>/             # buttons, forms, cards, feedback, overlays…
      <component-name>/
        <component-name>.tsx
        <component-name>.stories.tsx
        index.ts            # Re-exports the component, variants and types
CLAUDE.md                   # How things are built here (stack, conventions)
ARCHITECTURE.md             # How each app's layouts are wired
CONVENTIONS.md              # Branches, commits, IDs, PRD writing rules
DESIGN.md                   # Design contracts and brand rules
MOTION.md                   # Motion system rules
SIZE-SCALE.md               # The control height scale
netlify.toml                # Hosts the Storybook site on Netlify
```

The rules for building components, tokens and releases are in [CLAUDE.md](CLAUDE.md) and [DESIGN.md](DESIGN.md), and the motion rules are in [MOTION.md](MOTION.md). How each app's layouts are wired (the shell, pages and flows, and which files are sample data to replace) is in [ARCHITECTURE.md](ARCHITECTURE.md). Control heights are in [SIZE-SCALE.md](SIZE-SCALE.md), and branch, commit and PRD writing rules in [CONVENTIONS.md](CONVENTIONS.md). The skills read CLAUDE.md and DESIGN.md before they start, plus MOTION.md when the work involves animation.
