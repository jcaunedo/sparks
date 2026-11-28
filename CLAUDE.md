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
| Apps         | AutoPartsHUB (`src/layouts/autopartshub/`, Figma: Sparks `ShkgoGYA4VmXg8xqfXBZLJ`), with the Sparks app as a flow inside it (`src/layouts/autopartshub/sparks/`). Add each new app here and in ARCHITECTURE.md |
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

ℹ️ sparks.ds holds the logo (the "Branding" page) and a `primitives` variable collection (474 variables, one "Default" mode: color palettes, spacing, radius, font size, line height, paragraph gap), including the six Sparks logo palettes (sapphire, tangerine, amethyst, clover, citrine, cerulean) shown on the "Colors" page. It also has a `semantic` collection (166 variables, one "Light" mode) aliased to those primitives: colors, radius, shadow colors, font family and weight, breakpoints. Both are one-time copies from archielabs.ds (`primitives`, and `semantic`'s "intercept" mode), not linked to it. `theme.css` is synced from both collections, the text styles and the effect styles (DESIGN.md → "Figma → theme.css token map"). ⚠️ No "Dark" mode yet (`.dark` is a derived placeholder). sparks.ds now has a "Button" set ("Buttons" page, node 38:94: Text, Icon and Circle; Solid, Flat, Outlined, Ghost, Link; sizes xs 24, sm 28, md 32, lg 36, xl 40): UCL's `Button` has its shape, spacing and weight at 32, 36 and 40, and its Flat (`flat`); its Circle and Loading, and 24 and 28, aren't built yet (SIZE-SCALE.md). No input. It has the Select list ("Select / Content", "Select / Item", "Select / Section Title", nodes 77:6335–77:6365), synced to `Select` and `DropdownMenu`, but no select trigger. It has "Team assessment" (135:2671), built as `TeamAssessment`, and the Review screens that use it (135:2185, 135:2349).

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

  Categories: `brand`, `buttons`, `forms`, `cards`, `chat`, `data-display`, `feedback`, `overlays`, `navigation`, `typography`. `brand` holds brand marks (the logo), not UI controls. `chat` holds the conversation with an AI assistant: messages, the message box and the cards the assistant shows in the conversation. Create a category folder when its first component arrives. Don't invent a category that isn't listed here without asking.
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

- **Logo** (`brand/logo`): the Sparks logo, an inline SVG.
  - `variant`: `wordmark` (default; Figma "Default") | `symbol` (Figma "Symbol", the "S" and its sparkle, gradient artwork)
  - `tone`: `auto` (default; follows `.dark`) | `on-light` | `on-dark`. Colors only the wordmark's sparkle; the letters and the symbol never change
  - Resize by height through `className` (`h-6`); the width follows. `aria-label` defaults to "Sparks"
- **AutoPartsLogo** (`brand/autoparts-logo`): the AutoParts Co. logo, the retailer's own brand (the shop in Sparks's prototypes), an inline SVG. Light backgrounds only
  - `variant`: `wordmark` (default; Figma "AutoParts Logo", AUTOPARTS Co.) | `symbol` (Figma "AutoPartsHUB Symbol", the AP. mark)
  - 36px tall by default (`h-9`); the prototypes' headers use `h-7.5`. Resize by height through `className`; the width follows. `aria-label` defaults to "AutoParts Co."
- **AutoPartsHubLogo** (`brand/autoparts-hub-logo`): the AutoPartsHUB logo, an inline SVG. Light backgrounds only (Figma has no dark version yet)
  - `variant`: `wordmark` (default; Figma "Logo") | `symbol` (Figma "Symbol", the AH. mark)
  - 36px tall by default (`h-9`). Resize by height through `className`; the width follows. `aria-label` defaults to "AutoPartsHUB"
- **Badge** (`data-display/badge`): a short status or category label, a `span` (sparks.ds "badge")
  - `variant`: `solid` (default) | `flat` | `outline` | `ghost` | `link`. `tone`: `brand` (default), `neutral`, `destructive` (solid); `neutral`, `blue`, `green`, `sky`, `purple`, `red`, `yellow`, `amber` (flat); outline, ghost and link have one tone each
  - `size`: `xxs` (20px, 12px regular text) | `xs` (24px) | `sm` (32px) | `default` (36px) | `lg` (40px). An svg child is its icon. `asChild` renders it on a link
- **TeamAssessment** (`data-display/team-assessment`): how the people asked to assess something have answered so far (sparks.ds "Team assessment", 135:2671). A `section`'s props
  - `summary` (one sentence, lg), `invited`, `support`, `against` (pending is the rest of `invited`); `title` (default "Team assessment")
  - "3 of 5 assessments received" ("60% completed" on its right, muted, received of `invited` rounded), then the bar of everyone invited (support `--success-500`, doesn't support `--destructive-400`, pending the track's `neutral-muted`; segments touch, in that order, each its exact share; `role='img'` with the counts in words) and its legend ("2 support", "1 doesn't support", "5 pending"). New counts move the segments (`layout`, `layoutSpring`)
  - `action` (`{ label, onClick?, hint?, ref? }`, on the title's right, base medium link with a 16px chevron-right after it; without `onClick` it shows at 50% with `hint` in a tooltip). `onRemind` + `remindLabel` ("Send a reminder", on its own line under the legend, on the left, 16px below it, only while someone is pending); `reminded` (a node, e.g. "Reminder sent on …", the latest) follows it, xs muted, 12px after; the link stays, so she can send another
  - `people` (`TeamAssessmentPerson`: `id`, `name`, `team`, `subtitle` (title · team, as in Share), `avatarSrc`, `outcome` `support` | `against` | `pending`, `status` node, `detail` node under the row, e.g. the changes asked for): the legend's items become buttons, and each (or its segment) opens a `Popover` with that outcome's people, ordered by team, each as in Share's lists (32px `Avatar`, name sm semibold, `subtitle` xs muted), their status and `detail` under it. An outcome at 0 opens nothing. `onPersonSelect(id)` (+ `personSelectLabel`, default "See {name}'s assessment"): each person in a popover is a button (the hover fill, the focus ring); selecting one closes the popover, without sending focus back to the legend, and calls it. E.g. Review status at their row in "Reviewers". `footer`: last, after a line, e.g. Review's next step with its buttons (`ReviewNextOnCard`)
  - `variant`: `card` (default; white, 32px padding, on a subtle panel) | `inset` (`background-soft`, 24px/32px, inside a white panel). E.g. Review's team assessment and Review status
- **Table** (`data-display/table`): shadcn's Table as is (`Table` > `TableHeader`/`TableBody`/`TableFooter` > `TableRow` > `TableHead`/`TableCell`, plus `TableCaption`). Not in sparks.ds yet. E.g. Review status's "Assessment criteria"
- **Button** (`buttons/button`):
  - `variant`: `default` | `neutral` (dark, `tone/neutral`) | `flat` (sparks.ds Flat: `neutral-subtle` fill, `neutral` text, `neutral-muted` on hover) | `secondary` | `outline` | `ghost` | `link` | `destructive`
  - `size`: `default` (36px) | `sm` (32px) | `lg` (40px) | `icon`. sparks.ds's corners, padding, weight and icon gap are built in: don't add them again
  - An icon beside the label takes `data-icon`: `inline-start` | `inline-end`. Disabled, `neutral` turns `neutral-muted` with `foreground-subtle` text (not faded); the others fade to 50%. `asChild` renders the button styles on its child (use for links)
- **PulseLogo**, **FlowLogo**, **SalesLogo**, **CareLogo** (`brand/pulse-logo`, `brand/flow-logo`, `brand/sales-logo`, `brand/care-logo`): the product logos, inline SVGs with no props of their own
  - Render at Figma's size; resize by height through `className`, the width follows. `aria-label` defaults to the product name ("Pulse", "Flow", "Sales", "Care")
  - `PulseLogo` follows the theme (`text-foreground-prominent`); the other three keep fixed artwork colors
- **Select** (`forms/select`): shadcn's composition on Radix (`Select` > `SelectTrigger` (`SelectValue`) + `SelectContent` > `SelectGroup` > `SelectLabel` + `SelectItem`, plus `SelectSeparator`, scroll buttons)
  - shadcn's API as is (`SelectContent` `position`: `item-aligned` (default) | `popper`). The list is sparks.ds "Select / Content" (77:6365): `rounded-input`, border, `shadow-xl`, at least 200px, items 2px apart; `SelectItem` "Select / Item" (77:6335): 32px, 6px corners, sm medium, the hover fill when highlighted, a check (`text-icon`) when chosen, 50% when disabled; `SelectLabel` "Select / Section Title" (77:6352): 28px, xs muted. The trigger isn't in sparks.ds yet: shadcn's on the input tokens, 36px
- **Checkbox** (`forms/checkbox`): shadcn's Checkbox on Radix, a 16px box (`checked`/`defaultChecked`, `onCheckedChange`, `disabled`). Pair it with a `<label htmlFor>`. The unchecked border is `icon-muted` (DESIGN.md). Not in sparks.ds yet. E.g. who in a team gets access, in Share
- **PeopleList** (`forms/people-list`): the list of people and departments to pick from while typing in a field, under it (`PeopleList` + `matchPeople(options, query)` + `handlePeopleKeys`, plus `PeopleAvatar`; options are `PeopleOption`: `id`, `kind` `person` | `department`, `name`, `detail`, `avatarSrc`). The menu panel, 36px rows, the field keeps focus (`aria-activedescendant`). `anchor` (a ref to the field) and `inset` (px in from its sides): it floats in its own layer below the field, over any popover or panel around it (DESIGN.md → "One list for picking people"). Not in sparks.ds yet. E.g. `SharePopover`'s field, "@" in a comment
- **RadioGroup** (`forms/radio-group`): shadcn's composition on Radix (`RadioGroup` > `RadioGroupItem`), for choosing one of a few options shown together. Not in sparks.ds yet
  - shadcn's API as is (`value`/`defaultValue`, `onValueChange`, `disabled`). `RadioGroupItem` is the 16px round button alone: put it in a row with a `<label htmlFor>` for its text, one option per row. Give `RadioGroup` an `aria-label`. E.g. a reviewer's view ("Advance", "Advance with changes", "Don't advance yet")
- **DropdownMenu** (`overlays/dropdown-menu`): shadcn's composition on Radix (`DropdownMenu` > `DropdownMenuTrigger` + `DropdownMenuContent` > `DropdownMenuItem`, plus `Label`, `Separator`, `Group`, `CheckboxItem`, `RadioGroup`/`RadioItem`, `Shortcut`, `Sub`/`SubTrigger`/`SubContent`, `Portal`)
  - shadcn's API as is, drawn as sparks.ds's Select panel (the same as `Select`'s list): `rounded-input` (10px), border, `shadow-xl`, `p-1`, items 32px with 6px corners, sm medium, 2px apart; `DropdownMenuLabel` is the section title (28px, xs muted). `DropdownMenuItem` `variant`: `default` | `destructive`. E.g. the Concept panel's "Jump to a section"
- **Dialog** (`overlays/dialog`): shadcn's composition on Radix (`Dialog` > `DialogTrigger` + `DialogContent` > `DialogHeader` (`DialogTitle`, `DialogDescription`) + `DialogFooter`, plus `DialogClose`, `DialogOverlay`, `DialogPortal`)
  - shadcn's API as is (`DialogContent` `showCloseButton`; 512px wide by default); corners `rounded-menu` (16px), the close button a ghost icon button with a tooltip; opening focuses the dialog itself. The window grows in from 95% as it fades in, and shrinks back as it closes (MOTION.md → Dialog). Not in sparks.ds yet. E.g. an image in the idea's library, "Add from library", a reviewer's "Your assessment"
- **Popover** (`overlays/popover`): shadcn's composition on Radix (`Popover` > `PopoverTrigger` + `PopoverContent`, plus `PopoverAnchor`, `PopoverHeader`, `PopoverTitle`, `PopoverDescription`)
  - shadcn's API as is (`PopoverContent` `align`, `side`, `sideOffset`, 288px wide by default); corners `rounded-menu` (16px, sparks.ds radius/menu/container), `shadow-2xl`. E.g. the concept's "Share"
- **PublishItems** (`overlays/publish-popover`): what's published, in a bordered list (8px corners): one idea with paths lists just its paths (`PublishPath`: `name`, `version`), each after a corner arrow, the name medium, "Version: n" on its right, a line between them (the idea is named around the list; sparks.ds 129:2258); several ideas list each idea (`PublishItem`: `name`, `paths`), its name medium, then its paths under it (an idea has no version of its own; `version` on the idea shows only without `paths`); a `ul`'s props plus `items`. Used by `PublishPopover` and the Sparks invitation email
- **PublishPopover** (`overlays/publish-popover`): Publish, a popover from its trigger (`children`, e.g. the dark "Publish" button), 520px (sparks.ds "Publish your idea (popover)", 129:2258: "No team members", "With team members", "Published")
  - `variant`: `publish` (default) | `published` (138:2887: what went out, from a Flat "Published" button: `publishedAt` after a 16px clock, above `link`, 4px apart; then `items` and `audience`; no buttons at the bottom, 20px under the audience)
  - Copy: `title` (lg bold, prominent), `description` (base medium), `link` (where it'll be: a 16px globe and the address, sm medium, `text-link`, 6px apart; opens a new tab, at `linkHref` when given, e.g. a preview of the page, and closes the popover), `itemsLabel` ("What you're sharing"; Sparks passes "Idea solution paths you're sharing") + `items` (`PublishItem`: an idea and its `paths`, each path at the version shared; `PublishItems`), `nextLabel` ("What happens next") + `next`, `publishLabel`, `cancelLabel`
  - `audience` (`{ title, detail?, tone?: "default" | "warning", action?: { label, onClick } }`): who it goes to; the action closes the popover first. `default` (sparks.ds 136:2774): no box: the line semibold, `detail` under it ("Departments: UX team, Engineering, and Catalog"), then the action as a text link (sm medium, `text-link`), 4px apart. `warning`: a box (16px padding and corners) on the warning colors, a solid warning triangle before the line, and an outlined button, full width. "Add a note" and "View invite email" are text links with a 14px icon (square-pen, mail), 24px apart. Opening, focus goes to the popover itself. `preview` (`{ label?, title?, children }`): "View invite email", the content in a dialog over the popover, which stays open. `note` (`{ label?, removeLabel?, fieldLabel?, placeholder?, value, onChange }`): "Add a note" opens an empty field under the links, two lines tall ("Add your note..."); the link then reads "Remove note", which empties and closes it. `blocked`: the publish button can't be selected (e.g. no reviewers). `onPublish` runs after it closes. `open`/`defaultOpen`/`onOpenChange`
- **SharePopover** (`overlays/share-popover`): Share, a popover from its trigger (`children`, e.g. an outlined "Share" button), the same everywhere it shows. Not in sparks.ds yet
  - Copy: `title` (default "Share"), `description` (14px medium, under the title), `rolesHint` (12px muted, 8px under the field). "Copy link" (`link`)
  - A field to add a person or a department (`directory`, `PeopleOption[]`, listed with `PeopleList`; an email gets "Invite"; `onInvite(who, role)`) with the role on its right; `roles` (`ShareRole`: `viewer` "Can view", `commenter` "Can comment" (default), `editor` "Can edit"; all three by default)
  - "Who has access" (`members: ShareMember[]`, the owner first): names semibold, their `detail` (a person's job title and team, a team's size) under it; each role a borderless `Select` (`onRoleChange`) with "Remove" last (`onRemove`). A team's name opens its people with checkboxes (`peopleIn`, `onTeamPeopleChange`)
  - `recommended` (`{ label?, people: ShareSuggestion[], onAdd(name, excluded), addAllLabel? }`): "View recommended reviewers (n)" shows the ones not added yet, closed each time Share opens (selecting it opens them), with "Add all" on its right while they're open (each one left, then focus to the field), each added with its circle-plus (ghost, with a tooltip) or by selecting its row. `open`/`onOpenChange` to open it from elsewhere
- **Tooltip** (`overlays/tooltip`): shadcn's composition on Radix (`Tooltip` > `TooltipTrigger` + `TooltipContent`, plus `TooltipProvider`)
  - shadcn's API as is (`TooltipContent` `side`, `sideOffset`; dark `bg-foreground`, xs, with an arrow). `Tooltip` brings its own provider (no app-level `TooltipProvider` needed). Under the pointer it opens after `motionDuration.tooltipDelay` (1s), every tooltip; on keyboard focus, at once. Not in sparks.ds yet. Every icon-only button names itself in one, below it (`side='bottom' sideOffset={6}`), and keeps its `aria-label`; never `title`
- **AppHeader** (`navigation/app-header`): the app's top bar, full width, 92px tall (padding 28 top/bottom, 24 left/right, a 36px row)
  - `logo`: what sits on the left: the app's logo (`<AutoPartsHubLogo />`, 36px; `<Logo className='h-[26px]' />`, Sparks, 26px) or the page's name: "Sparks Project" has a dark back button ("All ideas"), the concept's name (2xl bold on a 30px line, a dotted underline: selected, it's renamed; no logo, no chevron menu) and where the idea stands, a flat `xs` badge 12px after it (`IdeaStatusBadge`, `sparks/shared/idea-status.tsx`: "Draft", "Ready to publish", "In review"…). The Sparks start page shows the logo alone (Sparks opens in its own tab). `children`: what sits on the right (AutoPartsHUB and the Sparks start page: notifications, a ghost icon button with an 18px bell, then the 36px avatar (`HeaderActions`; no Comments: they're an idea's); in "Sparks Project", Library (a folder), Comments, notifications, Share (its label alone, no icon; no avatars beside it; no Blueprint button), then, on Review only, Publish (Button `neutral`, dark: "Publish" or "Publish update"; "Published" is Button `flat` and opens `PublishPopover` `published`), no close button, no avatar), 12px apart (16px between items on the left)
  - `nav` (optional): navigation centered in the header, such as `<StepNav>`. With it, both sides share the remaining width so the nav stays centered
- **StepNav** (`navigation/step-nav`): a flow's steps as pills (`StepNav` > `StepNavItem`), e.g. Sparks's Plan, Prototype, Evaluate, Review. Give `StepNav` an `aria-label`
  - `StepNavItem` `current`: the sapphire gradient pill with white text, `aria-current="step"`, which slides from the step before (MOTION.md → Step nav); the others are `neutral-muted`. `upcoming`: a step not reached yet that can still be selected, muted gray text with hover (Sparks: to see what the step is). `disabled`: muted gray text, can't be selected. `asChild` renders it on a link
- **Tabs** (`navigation/tabs`): shadcn's composition (`Tabs` > `TabsList` > `TabsTrigger`, plus `TabsContent`)
  - `TabsList` `variant`: `default` (muted track, white pill) | `line` (underline). `size`: `default` (36px) | `lg` (40px). `baseline` (line only): a 1px line under every tab
  - Triggers take their look from the list; an svg child is a 16px icon. The active indicator slides between tabs (MOTION.md → Tabs)
- **AppCard** (`cards/app-card`): a card introducing an app, `min-h-[220px]`, fills its container's width
  - `logo` (top) and `description` (bottom)
  - `asChild` renders it as its child, a link (`<AppCard asChild …><a href='…' /></AppCard>`); then on hover it lifts (Lift), its border turns `border-defined`, its shadow grows to `shadow-lg` and the description turns from `muted-foreground` to `foreground` (Figma "Hover"); it shows the focus ring on keyboard focus. Without `asChild` it's static: no hover
- **Avatar** (`data-display/avatar`): shadcn's Avatar composition (`Avatar` > `AvatarImage` + `AvatarFallback` + optional `AvatarBadge`), plus `AvatarAdd`
  - `size` (on `Avatar` and `AvatarAdd`): `default` (32px) | `lg` (40px). shadcn's names, not SIZE-SCALE.md's (see there)
  - `AvatarFallback` `color`: `1`–`10` (Figma i1–i10, `bg-avatar-N`). Without it, `avatarColorFor()` picks one from the initials, so the same initials always get the same color
  - `AvatarBadge`: the online dot (success). Put `sr-only` text inside it
  - `AvatarAdd`: a round button with a plus icon; `aria-label` defaults to "Add person"
- **ActivityFeed** (`chat/activity-feed`): the AI assistant doing a long piece of work, step by step (a prototype being built, a run, a document being written). A `div`'s props. Not in sparks.ds yet
  - `status` (one live line, `ThinkingIndicator`), `steps` (oldest first, the last in progress; the latest five show), `startedAt` (ms; shows the time counting up)
  - `done` + `doneLabel`: folds to one line ("Built in 18s", a check) that opens every step; `stopped`: a dash instead of the check
- **AssistantMessage** (`chat/assistant-message`): a message from the AI assistant (Sparks): plain text on the page, no bubble, full width. Not in sparks.ds yet
  - `text`: the message. A blank line between paragraphs (12px apart); a line break starts a new line in the paragraph (4px below); lines starting "1. " or "- " make a list; `**bold**` inside a line. A paragraph that's one all-bold line reads as a heading and gets 24px above it (a new section)
  - `stream`: streams the text in with a blinking caret (MOTION.md → AI messages); turning it off shows the rest at once. Reduced motion shows it whole. `onStreamEnd`: called once it's all shown
- **ClarificationCard** (`chat/clarification-card`): a question from the AI assistant with its proposed answer, to confirm with a reply, edit or correct (sparks.ds "clarification-card": State=Default, State=Edit)
  - `question` (semibold), `answer` (strings; line breaks show, a blank line starts a new paragraph; a web address is a link, in the link color, opening a new tab); `badge` (on its own line between the question and the answer, e.g. a `Badge` "Assumption"; hidden while editing); `source` (where the answer came from; hidden while editing)
  - `replies` (the answer buttons under the panel, `QuickReplies`: on the right, the first one last with ↵, and Enter picks it, e.g. "Yes, that's right", "Not quite") + `onReply(reply)`; pass none once it's answered. Hidden while editing. `selectedReply`: the reply picked before, with a check, while the user changes their answer (Sparks's "Change answer"). `enter` (default `true`): passed to `QuickReplies`
  - `onEdit(answer)`: shows the pen; Edit turns the answer into a field with Cancel and Save on the right (Enter saves, Esc cancels). `defaultEditing` opens it in Edit
- **DirectionCard** (`chat/direction-card`): one way to solve a problem, as the AI assistant proposes it (sparks.ds "direction-card", 89:151: State=Collapsed, State=Expanded). A `section`'s props
  - `title` (20px semibold), `number` ("1. …"), `status` (a second line under the title, sm muted, e.g. "Not generated yet", "Generated", "In Review"), `badges` (on the right of the title, e.g. a flat `Badge` `xs`), `description`, `location` (in `decorative-1`, after a globe, or a map pin with `locationKind` `physical`)
  - `ratings` (`{ label, value }[]`, one row of words on `background-subtle`), `lines` (`{ label, content }[]`, always shown, e.g. "The catch"), `details` (shown with "Show more" / "Show less", a brand-color link, or by selecting anywhere on the header, which shows chevrons after the badges: up-down closed, down-up open, subtle until the header is hovered; a list in `content` gets the card's list style), `defaultOpen`
  - `emphasized`: the assistant's pick, with the darker border (`border-muted-foreground`, gray-500; the others `border-foreground-subtle`, gray-400: a step darker than the dashes, so a generated card reads stronger than a `pending` one). `pending`: nothing built from it yet (Sparks's "Not generated yet"), a dashed border (an SVG outline: 6px dashes, 5px gaps, subtle: `border-defined`, `foreground-subtle` when `emphasized`; no shadow). `action` (`{ label, onClick }`): Button Outlined 40px, full width at the bottom
- **QuickReplies** (`chat/quick-replies`): the answers under an assistant's question (sparks.ds "ctas"), Button Outlined 36px, on the right, the first reply last
  - `replies` (the main, "continue" one first) + `onReply(reply)`. `enter` (default `true`): the first reply shows the ↵ key (`CornerDownLeft`) and Enter picks it (`useEnterShortcut`, `lib/hooks`), while focus is on the page or in the empty message box. Only one set on the screen should have it
  - `icons`: an icon before a reply's label, by reply (e.g. "Attach files", "Add from library")
  - `onePerRow`: one reply per row, on the right, the main one last: for a narrow conversation (the Sparks workspace's column beside a preview, so Prototype; Plan keeps them in a row)
  - `selected` (optional): the reply picked before, while the user changes an answer: a 16px check (`text-icon-muted`) after its label and `aria-pressed` (every reply gets `aria-pressed` then)
- **ReplyOptions** (`chat/reply-options`): the choices under an assistant's question when they go further than yes or no, read as a numbered list in the message (a `div`'s props, `role='group'`; give it an `aria-label`). Not in sparks.ds yet
  - `options` (`ReplyOption`: `label`, sent as the answer; `steps`, a short bulleted list under it, e.g. a plan; `detail`, what it does, muted after them), the recommended one first + `onSelect(label)`. Base text, no container, 16px between options: each title numbered as a list ("1. Make this change", the number in the title's style, semibold; what's under it aligned with the title's text) with a subtle underline (`border-defined`) that turns `foreground` on hover and focus. The whole option is the button; ↑/↓ move between options. No ↵ key or Enter shortcut
  - E.g. Sparks's plan for a finding: "Make this change" (the plan's steps), the follow-ups, "Fix all"
- **SectionDivider** (`chat/section-divider`): a zigzag line where a section of the conversation ends (`role='separator'`), its container's full width, `border-defined`. Not in sparks.ds yet
  - `draw`: it has just ended, so the line draws left to right (decided as it appears; reduced motion: just there); `onDrawn`: called once it's there
- **ThinkingIndicator** (`chat/thinking-indicator`): the AI assistant thinking before it replies (Figma: Sparks 27:1932, not in sparks.ds yet). A `div`'s props, `role='status'`
  - `steps`: what it's working through, one line at a time (`motionDuration.thinkingStep` each, sliding up; the last stays). Never a bare "Thinking…"
  - A 10px dot hopping through the Sparks logo colors (the next on each landing) and the line in a gradient of the same colors, rotating through them left to right. Reduced motion: still dot, still gradient (MOTION.md → AI thinking)
- **UserMessage** (`chat/user-message`): a message the user sent to the assistant, as a chat bubble. Children are the text; a `div`'s props
  - Fits its text, wraps long messages and keeps typed line breaks; at most 80% of its container's width. The conversation layout aligns it to the end
- **EmptyState** (`feedback/empty-state`): the centered message for any view, tab or filter with nothing to show. Same API as verita-ucl's
  - `title` (required; a "\n" starts a new line, e.g. Sparks's step explanations break after "your"), `description`, `icon` (optional slot above the title)
  - `buttonLabel` + `buttonProps` (forwarded to a `Button`, sparks.ds Solid · Neutral (dark) lg · 36: 36px, 12px corners, semibold); omit `buttonLabel` for no button. `secondaryButtonLabel` + `secondaryButtonProps`: a second, outlined button, the same size, 8px before the main one (e.g. "Back to Prototype" before "Run evaluation").
  - `children`: optional content between the text and the buttons (e.g. the prototype "Add to Review" is about)
  - Centers itself in its parent: give it `flex-1` or a height through `className`. Its text is at most 720px wide, so a long description stays readable in a wide panel
- **InlineAlert** (`feedback/inline-alert`): a one-line message in the page (sparks.ds "Inline Alert", 124:1584), on shadcn's Alert. A `div`'s props
  - `tone`: `info` (default) | `success` | `destructive` (Figma "Danger") | `warning`: the tone's subtle fill, muted border and text color, and its 16px icon (info, circle-check, circle-alert, solid triangle). `role` is `alert` for destructive and warning, `status` otherwise
  - `children` (the message, base medium), `action` (`{ label, onClick }`: sm medium, underlined, the tone's darker shade on hover), `onDismiss` (the ×: a 24px ghost icon button, 12px icon, `icon-subtle`, with a tooltip; `dismissLabel`, default "Dismiss"). 40px tall for one line, 8px corners. Not used in Sparks's screens yet
- **Toaster** + `toast` (`feedback/sonner`): shadcn's Sonner, on `sonner`: a short confirmation that goes away on its own. Mount `<Toaster />` once near the app's root (`position`, `offset`), then call `toast("…")`, `toast.success`, `toast.info`, `toast.warning`, `toast.error` (`description`, `action: { label, onClick }`) from anywhere
  - The popover tokens, `rounded-menu` (16px), `shadow-xl`, Figtree; title sm semibold, description sm in the foreground color, action a small dark button; each kind's icon in its tone's color. The theme follows `.dark` (no next-themes). Not in sparks.ds yet. E.g. the Sparks workspace's "Added to this idea's library", top center
- **PromptComposer** (`chat/prompt-composer`): the message box for talking to an AI assistant (Sparks), fills its container's width
  - Textarea props go to the textarea (`value`/`defaultValue`/`onChange`, `placeholder`, `aria-label`, `disabled`); `className` styles the frame. Grows with its text up to 240px, then scrolls
  - `onSubmit(value)`: Send button or Enter (Shift+Enter adds a line). Uncontrolled, it clears itself after sending
  - `onAttach` ("+"), `onDictate` (mic), `onVoice` (the main button while empty). `addMenu`: `DropdownMenuItem`s for a menu on "+" instead of `onAttach` (sparks.ds "select-prompt-add"), opening above it; closing it focuses the box, caret at the end The main button swaps voice ↔ Send with `iconSwapVariants` as soon as there's text
  - `suggestion`: a suggested answer, shown as the placeholder while the box is empty, with "Press Tab to edit this suggestion"; Tab puts it in the box, caret at the end (uncontrolled; controlled, handle `onSuggestionAccept(text)`). Shift+Tab still moves focus
  - `attachments` (file names, as chips above the text: solid neutral, dark with white text and icons, as the Badge's) + `onAttachmentRemove(index)`; they can be sent with no text: the main button is Send while there are any
  - `onCancel`: Esc in the box goes back to the state before it was opened (e.g. answering after "Not quite"); uncontrolled, the box clears itself. With a suggestion on offer, the hint adds ", Esc to cancel"
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
