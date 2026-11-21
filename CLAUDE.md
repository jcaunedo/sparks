# Sparks UCL (Unified Component Library)

Shared React component library for Sparks's frontend applications. Built with React 19, Tailwind CSS 4 and TypeScript, on shadcn/ui and Radix (see "Stack").

## Project

Everything specific to this project is in this section, "Stack", "Figma", DESIGN.md → "Brand names" / "Brand voice", SIZE-SCALE.md (size names and heights) and CONVENTIONS.md → "IDs". The rest of the setup is project-agnostic.

| Item         | Value                                                        |
| ------------ | ------------------------------------------------------------ |
| Project      | Sparks                                                       |
| Package      | `@jcaunedo/ucl`                                              |
| Registry     | GitHub Packages, `@jcaunedo` scope (`https://npm.pkg.github.com`) |
| Repository   | `https://github.com/jcaunedo/sparks`                         |
| Apps         | AutoPartsHUB (`src/layouts/autopartshub/`, Figma: Sparks `ShkgoGYA4VmXg8xqfXBZLJ`). Add each new app here and in ARCHITECTURE.md |
| Brand        | DESIGN.md → "Brand names", "Brand voice"                     |

## How the rules work

- **CLAUDE.md** (this file): how things are built here. Covers the stack, folder structure, component and story conventions and theme tokens.
- **[MOTION.md](MOTION.md)**: the motion system. Covers principles, the named patterns, component guidance, accessibility and validation. Read it before any animation work. The values live in `src/lib/motion/`.
- **[DESIGN.md](DESIGN.md)**: design contracts. Covers why a component is built the way it is, rules that a future edit or Figma/shadcn resync could silently break, and the brand voice.
- **[ARCHITECTURE.md](ARCHITECTURE.md)**: how each app's layouts are wired, one section per app. Covers which file does what, how the pieces connect and which files are sample data to replace.
- **[SIZE-SCALE.md](SIZE-SCALE.md)**: the one height scale every control shares. Covers each step's height and role, the default, and which sizes each control supports. Read it before building or resizing a button, input, select or any control with a `size` prop.
- **[CONVENTIONS.md](CONVENTIONS.md)**: how work is branched, committed, versioned, tagged and traced, and how PRDs are written (status labels, creation header, ID prefixes).
- **[explorations/index.md](explorations/index.md)**: the index of explorations, newest first: claude.ai artifacts, and Storybook explorations (story path instead of a URL). An exploration is published as a claude.ai artifact, and gets its row in the same change, with its open questions in Notes. [explorations/notes.md](explorations/notes.md) compares editing an artifact here with editing it in the browser.
- **Skills** in `.claude/skills/` (`ucl-setup`, `ucl-ds-sync`, `ucl-generate-component`, `ucl-generate-layout`, `sparks-copywriter`) are project-agnostic. They read CLAUDE.md and DESIGN.md before they start (plus MOTION.md when the work involves animation) and take every project value (package, Figma file, categories, apps, component APIs, voice) from them. **When a skill and these files disagree, these files win.**
- **Not defined here?** Ask, then record the answer in the right file so the next run doesn't have to ask again.

## Quick Reference

| Command                   | Purpose                                      |
| ------------------------- | -------------------------------------------- |
| `npm run build`           | Build library to `dist/` (ESM + types + CSS) |
| `npm run dev`             | Watch mode build                             |
| `npm run storybook`       | Launch Storybook on port 6120                |
| `npm run build-storybook` | Build static Storybook site                  |
| `npm run lint`            | Type-check with `tsc --noEmit`               |

`.npmrc` sets `include=dev`, so installs keep dev dependencies even when `NODE_ENV=production` is set in the environment.

## Stack

The stack is set per project so UCL matches what the project's dev team ships. It's the first thing `ucl-setup` asks for. Change a row only after agreeing it with the dev team, then update every section below that depends on it.

| Concern              | Choice                                                     | Status                     |
| -------------------- | ---------------------------------------------------------- | -------------------------- |
| Framework            | React 19 (`react`, `react-dom` as peer dependencies)       | Set                        |
| Base components      | shadcn/ui on Radix (`@radix-ui/react-*`)                   | Set                        |
| Styling              | Tailwind CSS 4, tokens in `src/styles/theme.css` (oklch)   | Set                        |
| Variants             | `class-variance-authority` (`cva`) + `cn()`                | Set                        |
| Icons                | `lucide-react`                                             | Set                        |
| Motion               | `motion` (`motion/react`)                                  | Set                        |
| Forms                | `react-hook-form` + `zod`, optional peer dependencies      | Set                        |
| App rendering        | Bundle marked `"use client"` after build (works for client-only and Next.js apps) | Set |
| Build                | tsup, ESM only                                             | Set                        |
| Workbench            | Storybook 10 (`@storybook/react-vite`, `addon-docs`)       | Set                        |

- **Forms:** the forms library is an optional peer dependency, so apps that use it don't get two copies and apps that don't aren't forced to install it. Form components keep the library out of primitives (`Input`, `Select`…) and add connected fields next to them.
- **Server rendering:** `scripts/add-use-client.mjs` prepends `"use client"` to `dist/index.js` after the build, so apps can import UCL from a Next.js Server Component. Client-only apps ignore it.

## Figma

| Item                    | Value                                     |
| ----------------------- | ----------------------------------------- |
| Design system file      | sparks.ds (`FdKai5pCbpFKZTrGHRvZaT`)      |
| Modes                   | Light + dark                              |

Skills compare every Figma URL's `fileKey` against this table.

ℹ️ sparks.ds holds the logo (the "Branding" page) and a `primitives` variable collection (402 variables, one "Default" mode: color palettes, spacing, radius, font size, line height, paragraph gap). It also has a `semantic` collection (162 variables, one "Light" mode) aliased to those primitives: colors, radius, shadow colors, font family and weight, breakpoints. Both are one-time copies from archielabs.ds (`primitives`, and `semantic`'s "intercept" mode), not linked to it. `theme.css` is synced from both collections, the text styles and the effect styles (DESIGN.md → "Figma → theme.css token map"). ⚠️ No "Dark" mode yet (`.dark` is a derived placeholder), and no button or input, so the control sizes in SIZE-SCALE.md haven't been checked against Figma.

## Architecture

- **Package:** the name in "Project", ESM-only (see "Release & Publishing").
- **Build:** tsup bundles `src/index.ts` → `dist/index.js` + `dist/index.d.ts`. `src/styles/theme.css` is copied raw to `dist/styles.css`.
- **Styling:** two CSS files.
  - `src/styles/theme.css`: design tokens, `@theme inline` mappings, breakpoints, `:root` and `.dark` variables. Ships to consumers as `<package>/styles`.
  - `src/styles/globals.css`: imports Tailwind + `theme.css`. Used only by Storybook.
- **Components:** one folder per component, grouped by category under `src/components/<category>/<name>/`. Each folder holds:
  - `<name>.tsx`
  - `<name>.stories.tsx`
  - `index.ts` barrel
  - optional `<name>.mdx` docs page

  Categories: `brand`, `buttons`, `forms`, `cards`, `data-display`, `feedback`, `overlays`, `navigation`, `typography`. `brand` holds brand marks (the logo), not UI controls. Create a category folder when its first component arrives. Don't invent a category that isn't listed here without asking.
- **Layouts:** full-page reference compositions under `src/layouts/<app>/<name>/`, previewed in Storybook and **not** exported from `src/index.ts`. Layouts used by more than one app go in `src/layouts/shared/`. Apps are listed in "Project". Screens in a multi-screen flow nest under `src/layouts/<app>/<flow>/`. Mock data goes in `sample-*` files, never in the screen (see "Sample Data"). Each app's wiring (which file does what, how the pieces connect, which files are sample data) is in [ARCHITECTURE.md](ARCHITECTURE.md), one section per app. Read the app's section before working on its layouts, and update it in the same change when the wiring changes (a page, flow, step or sample file added, moved or removed); a new app gets its own section.
- **Lib:** `src/lib/`
  - `utils.ts`: `cn()`
  - `breakpoints.ts`: `breakpoints`, `mediaAbove()`
  - `hooks/use-media-query.ts`
  - `motion/`: tokens, transitions, variants, patterns, reduced-motion and scroll helpers
  - `relative-date.ts`: `formatRelativeDate()`
- **Imports:** use the `@/` alias (`@/lib/utils`, `@/components/<category>/<name>`). Import another component through its folder `index.ts`, never a deep relative path.
- **Docs:** Storybook MDX pages live in `src/docs/` (Introduction, Foundations). Sidebar order is Introduction → Foundations → component categories.

## Code style

- Tabs for indentation, double quotes in TS, single quotes in JSX attributes (`data-slot='button'`).
- React 19: `ref` is a regular prop. Don't use `React.forwardRef`.
- Props are typed as `React.ComponentProps<"el"> & VariantProps<typeof <name>Variants> & { …extras }`.
- Named exports only, collected at the bottom of the file: `export { Button, buttonVariants };`.

## Adding a shadcn Primitive (scaffold → relocate)

The shadcn CLI writes a flat file into `src/components/ui/`. Here that folder is only for **staging**:

```bash
npx shadcn add <component>
```

1. Move `src/components/ui/<component>.tsx` → `src/components/<category>/<component>/<component>.tsx`.
2. Rewrite sibling-component imports to the `@/components/<category>/<name>` alias.
3. Convert any `React.forwardRef` to a plain function component (see "Code style").
4. Add `index.ts` re-exporting the component, its variants and its types.
5. Add `<component>.stories.tsx` (see below).
6. Export from `src/index.ts` under the category banner, then delete the empty `src/components/ui/`.

Always check shadcn's current source, not memory: `https://raw.githubusercontent.com/shadcn-ui/ui/main/apps/v4/registry/new-york-v4/ui/<component>.tsx`.

## Creating a Custom Component

Create `src/components/<category>/<name>/` with these files (use `buttons/button/` as the template):

### `<name>.tsx`

- `cva` for variants, with `defaultVariants` set. `cn()` from `@/lib/utils` to merge classes.
- A `size` prop uses the steps, heights and default in SIZE-SCALE.md. Add the component's row there in the same change.
- Default `variant`/`size` in the parameter list, and set `data-slot='<name>'`, `data-variant` and `data-size` on the root element.
- Use `asChild` (`Slot` from `@radix-ui/react-slot`) when the component should be able to render as a link or other element.
- Use tokens through Tailwind utilities (`bg-primary`, `text-muted-foreground`, `rounded-md`). Never raw hex.
- A one-line JSDoc on the exported component.

### `<name>.stories.tsx`

- `const meta = { … } satisfies Meta<typeof Component>` with `title: "<Category>/<Component>"` (e.g. `Buttons/Button`).
- One story per variant/state, plus an `AllVariants` story that renders every variant and size together.
- `tags: ["autodocs"]`, unless the component has its own `<name>.mdx` page. The MDX page replaces autodocs.

### `<name>.mdx` (optional)

Add one when a component needs usage guidance beyond props: when to use each variant, accessibility notes, do's and don'ts. Attach it with `<Meta of={Stories} />` and show stories with `<Canvas of={…} />`. Example: `buttons/button/button.mdx`.

### `index.ts`

Re-export the component, its `<name>Variants` and any prop types. Then add the same names to `src/index.ts` under the category banner:

```ts
/* -------------------------------------------------------------------------- */
/* Buttons                                                                    */
/* -------------------------------------------------------------------------- */

export { Button, buttonVariants } from "@/components/buttons/button";
```

## Updating an Existing Component

- Modify the component file directly. Preserve everything the change doesn't touch.
- Update stories (and the MDX page, if any) when the API changes.
- Update `src/index.ts` when exports change.
- Renaming or removing a `cva` variant key, prop or exported type is **breaking** for consuming apps. Call it out.
- Run `npm run lint` and `npm run build`.

## Current Component APIs

Mirror these names when a new component has the same concept. Keep this list current when components are added.

- **Logo** (`brand/logo`): the Sparks wordmark, an inline SVG.
  - `tone`: `auto` (default; follows `.dark`) | `on-light` | `on-dark`. Colors only the sparkle; the letters never change
  - Resize by height through `className` (`h-6`); the width follows. `aria-label` defaults to "Sparks"
- **AutoPartsHubLogo** (`brand/autoparts-hub-logo`): the AutoPartsHUB logo, an inline SVG. Light backgrounds only (Figma has no dark version yet)
  - `variant`: `wordmark` (default; Figma "Logo") | `symbol` (Figma "Symbol", the AH. mark)
  - 36px tall by default (`h-9`). Resize by height through `className`; the width follows. `aria-label` defaults to "AutoPartsHUB"
- **Button** (`buttons/button`):
  - `variant`: `default` | `secondary` | `outline` | `ghost` | `link` | `destructive`
  - `size`: `default` | `sm` | `lg` | `icon`
  - `asChild` renders the button styles on its child (use for links)
- **PulseLogo**, **FlowLogo**, **SalesLogo**, **CareLogo** (`brand/pulse-logo`, `brand/flow-logo`, `brand/sales-logo`, `brand/care-logo`): the product logos, inline SVGs with no props of their own
  - Render at Figma's size; resize by height through `className`, the width follows. `aria-label` defaults to the product name ("Pulse", "Flow", "Sales", "Care")
  - `PulseLogo` follows the theme (`text-foreground-prominent`); the other three keep fixed artwork colors
- **AppHeader** (`navigation/app-header`): the app's top bar, full width, 96px tall (padding 28 top/bottom, 32 left/right)
  - `logo`: the app's logo, on the left. Figma's two versions: `<AutoPartsHubLogo />` (36px) and `<Logo className='h-8' />` (Sparks, 32px). `children`: what sits on the right (e.g. `<Avatar size='lg'>`)
- **Tabs** (`navigation/tabs`): shadcn's composition (`Tabs` > `TabsList` > `TabsTrigger`, plus `TabsContent`)
  - `TabsList` `variant`: `default` (muted track, white pill) | `line` (underline). `size`: `default` (36px) | `lg` (40px). `baseline` (line only): a 1px line under every tab
  - Triggers take their look from the list; an svg child is a 16px icon. The active indicator slides between tabs (MOTION.md → Tabs)
- **AppCard** (`cards/app-card`): a card introducing an app, `min-h-[220px]`, fills its container's width
  - `logo` (top) and `description` (bottom)
  - `asChild` renders it as its child, a link (`<AppCard asChild …><a href='…' /></AppCard>`); then it lifts on hover (Lift) and shows the focus ring. Without `asChild` it's static
- **Avatar** (`data-display/avatar`): shadcn's Avatar composition (`Avatar` > `AvatarImage` + `AvatarFallback` + optional `AvatarBadge`), plus `AvatarAdd`
  - `size` (on `Avatar` and `AvatarAdd`): `default` (32px) | `lg` (40px). shadcn's names, not SIZE-SCALE.md's (see there)
  - `AvatarFallback` `color`: `1`–`10` (Figma i1–i10, `bg-avatar-N`). Without it, `avatarColorFor()` picks one from the initials, so the same initials always get the same color
  - `AvatarBadge`: the online dot (success). Put `sr-only` text inside it
  - `AvatarAdd`: a round button with a plus icon; `aria-label` defaults to "Add person"
- **EmptyState** (`feedback/empty-state`): the centered message for any view, tab or filter with nothing to show. Same API as verita-ucl's
  - `title` (required), `description`, `icon` (optional slot above the title)
  - `buttonLabel` + `buttonProps` (forwarded to a `sm` primary `Button`); omit `buttonLabel` for no button
  - Centers itself in its parent: give it `flex-1` or a height through `className`
- **Typography** (`typography/typography`):
  - `size`: `xs` | `sm` | `base` | `lg` | `xl` | `2xl` | `3xl` | `4xl` | `5xl` | `6xl` | `7xl` (`xl` and up use `font-display`)
  - `weight`: `regular` | `medium` | `semibold` | `bold` | `black`
  - `as` sets the element; `h1`–`h4` default `size`/`weight` from `typographyHeadings`

## Sample Data

Layouts are reference implementations that the apps rebuild with their own data, so mock data stays separate from the UI. Every developer handoff relies on this: everything in a `sample-*` file gets replaced with API data, and everything else is code to keep.

- **Samples live in typed `sample-*.ts` files** beside the screen or step that uses them (e.g. `<flow>/steps/pricing/sample-pricing.ts`). Use `.tsx` only when the sample renders JSX. Type every sample with the type its screen exports (`export const samplePricing: PricingAnswers = { … }`). Never JSON.
- **Screens and steps take their data through props** and never import a `sample-*` file, not even as a default value (`listings = sampleListings` is not allowed). Data props are required, or default to an empty value (`""`, `[]`, `{}`) that represents real, empty data.
- **Stories pass the samples in**, through `args` or the story's render function (`args: { listings: sampleListings }`).
- **Shared samples:**
  - Data used by several steps of one flow goes in that flow's `shared/sample-*.ts` (e.g. `src/layouts/<app>/<flow>/shared/sample-listing.ts`).
  - Data shared across screens of one app goes in `src/layouts/<app>/sample-data/`.
  - Data shared across apps goes in `src/layouts/shared/sample-data/`.
  - Create these folders only once they're needed.
- **What isn't sample data:** product content stays in the screen. That covers option lists (`ageOptions`, `durationOptions`), navigation items, artwork, and Figma copy for labels or step titles. A sample is made-up data that a user or the API would supply: records, answers, profiles, photos, prices.
- **Exceptions:** a flow component that stitches steps into a clickable prototype may seed itself from `sample-*` files. List each exception here when it's created, and don't add others without agreeing them first.

## Theme & Tokens

All tokens live in `src/styles/theme.css`:

- **`@theme inline`:** maps Tailwind utilities to the CSS variables (`--color-primary: var(--primary)`), so `.dark` overrides work.
- **`@theme` breakpoints:** set 1px past each frame width. See DESIGN.md "Breakpoints include their own width".
- **`:root`:** light values. **`.dark`:** dark values. Colors are written in `oklch`. Don't mix formats.
- **Semantic roles** use shadcn names: `background`, `foreground`, `card`, `popover`, `primary`, `secondary`, `muted`, `accent`, `destructive` (each with `-foreground`), and `border`, `input`, `ring`.
- **Radius:** one `--radius` (0.5rem). `rounded-sm/md/lg` derive from it.
- **Spacing:** Tailwind's default 4px scale. Don't redefine it.

To add a token, add it to `:root` and `.dark`, then map it in `@theme inline`. Adding a token is a minor version; renaming or removing one is breaking.

## Motion System

The motion rules live in [MOTION.md](MOTION.md): principles, personality, the named patterns (Lift, Press, Reveal…), component guidance, accessibility and the validation checklist. **Read it before adding or changing any animation.**

- Import Motion APIs from `motion/react`.
- Take every duration, easing, spring, distance and variant from `src/lib/motion/`. Never write raw motion values in a component.
- Respect reduced motion with `useMotionPreference()` and its `resolve()` helper.

## Key Files

| File                      | Purpose                                                       |
| ------------------------- | ------------------------------------------------------------- |
| `src/index.ts`            | Public API: every consumer-facing export                      |
| `src/styles/theme.css`    | Design tokens and breakpoints, shipped to consumers           |
| `src/styles/globals.css`  | Storybook entry CSS                                           |
| `src/lib/`                | `cn()`, breakpoints, media query hook, motion system          |
| `src/docs/`               | Storybook Introduction and Foundations pages                  |
| `components.json`         | shadcn CLI configuration                                      |
| `tsup.config.ts`          | Library build configuration                                   |
| `.storybook/`             | Storybook setup, Tailwind plugin, `@/` alias, sidebar order   |
| `netlify.toml`            | Netlify hosting for the static Storybook site                 |
| `ARCHITECTURE.md`         | How each app's layouts are wired, one section per app: which file does what, how the pieces connect and which files are sample data to replace |
| `SIZE-SCALE.md`           | The control height scale, and which sizes each control supports |
| `CONVENTIONS.md`          | Branches, commits, IDs, versioning, tags and PRD writing rules |

## Release & Publishing

- **Registry:** set in "Project" (GitHub Packages by default). `publishConfig.registry` in `package.json`, the scope line in `.npmrc` and `registry-url` in `.github/workflows/publish.yml` must match it.
- **Version bump:** `npm run release:patch|minor|major` wraps `npm version`. `preversion` runs `npm run lint`; `npm version` bumps `package.json`, commits and tags `vX.Y.Z`; `postversion` runs `npm run build`.
- **Publish:** `.github/workflows/publish.yml` runs on pushes to `main` that touch `package.json`, compares the version with the previous commit, and publishes only when it changed. Normal merges release nothing. It never publishes while `package.json` has `"private": true` (the unconfigured template; `ucl-setup` removes it) or on a first commit with no previous version, so the first release always comes from `npm run release:*`.
- **Release flow:** commit your work (clean tree) → `npm run release:*` → `git push && git push --tags`.
- **Semver:**
  - **Patch:** fixes and visual tweaks.
  - **Minor:** new components, optional props, variants or tokens.
  - **Major:** removing or renaming a component, prop or token, or changing a default.
  - Below 1.0.0, a minor bump is treated as breaking by package managers.

## Consumer Integration

Apps need a `.npmrc` scoping the package to the registry, plus a read-only token:

```
@jcaunedo:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NPM_TOKEN}
```

```bash
npm install @jcaunedo/ucl
```

```css
/* In the consuming app's global CSS */
@import "tailwindcss";
@import "@jcaunedo/ucl/styles";
@source "../node_modules/@jcaunedo/ucl/dist";
```

`@source` makes Tailwind scan UCL's bundled JS for class names. Without it, component styles silently go missing.

```tsx
import { Button } from "@jcaunedo/ucl";
```

## Keeping PRDs Current

When a change to a component or layout settles or changes a **product decision**, update the PRD in `prds/` that covers it in the same change, without being asked. A product decision is what the product does: a state, a rule (validation, statuses, limits), copy, the steps of a flow, what's shown or hidden and when.

1. **Find the PRD.** Search `prds/` for the file's path, the component's name, or the screen it belongs to. A component is often covered by the PRD of the screen that uses it. There's no rule that every component gets its own PRD.
2. **Update it:** change the rule where it's described, add a ✅ note tagged `✅ **Resolved:**` and nothing more (no date, no who decided, no ID; CONVENTIONS.md → "Status labels"), strike through any earlier decision it replaces instead of deleting it (CONVENTIONS.md → "Superseded decisions"), close or reword any ⚠️ note or open question it answers, and update the header's `Last updated:`.
3. **No PRD covers it → ask** whether to create a dedicated one or add a section to an existing one. Don't create a PRD silently.
4. **Say which PRD you updated** in the reply.

**Not a PRD change:** visual or implementation fixes (spacing, tokens, a Figma value, a bug, a refactor) that don't change what the user sees or can do. Those go to DESIGN.md when a later edit or resync could easily undo them, and nowhere otherwise. Many decisions need both: the PRD records the decision, DESIGN.md the code that protects it.

**Why:** PRDs are the source of truth for product behavior. A decision made only in code is invisible to the team and gets reopened.

## PRD writing conventions

How docs under `prds/` are written (status labels, creation header, ID prefixes) is in [CONVENTIONS.md](CONVENTIONS.md) → "PRD writing" and "IDs". Read it before creating or editing a PRD.
