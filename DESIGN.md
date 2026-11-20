# Design & Component Contracts

Durable, team-visible rules about *why* things are built the way they are. Without them, a future edit or a Figma/shadcn resync could silently break these decisions. This file is committed, so it travels with the repo and every contributor (human or AI) sees it. The skills in `.claude/skills/` read it before they start.

Add an entry when a fix or convention:

- took real iteration to land on and could plausibly be "fixed" back to a worse state by someone who doesn't know the history, or
- is a contract between two pieces of code (e.g. two rules that must change together) that isn't obvious from reading either one alone.

Each entry says what the rule is, why it exists, and how to apply it. Don't restate what the code already makes obvious. Name the file it governs in the heading when there is one.

---

## Design quality bar: internal tools and customer-facing products are equal

**Rule:** every product is designed to be intuitive, efficient and human. That bar applies equally to customer-facing experiences and internal or operational tools.

**Why:** it's easy to treat internal screens as lower priority because they have no external audience. This rule stops that assumption from quietly lowering the bar.

**How to apply:** don't reach for a lower-effort pattern (skipping states, motion or copy quality) because a screen is internal-only.

---

## Brand names

- **Sparks:** written "Sparks" in all UI copy (titles, running text, buttons). The all-caps "SPARKS" appears only inside the logo artwork (`Logo`, `brand/logo/`). Never "SPARKS" or "sparks" in copy.
- Identifiers that aren't user-facing (the npm package `@jcaunedo/ucl`, CSS/JS names) keep their lowercase forms.
- ⚠️ **Decision needed:** any other product or feature names, and which names must never be used interchangeably.

---

## Brand voice

The `sparks-copywriter` skill reads this section. Sparks uses the base voice below as is. Fill in the audiences and terminology when they're known.

- **Voice:** clear, direct, calm, helpful.
- **Never:** cute, salesy, vague, blaming.
- **Rules:**
  - Sentence case everywhere: titles, buttons, labels.
  - Buttons are verbs, with their object when it isn't obvious: "Save changes", not "OK".
  - Errors say what happened and what to do next.
  - Empty states say why it's empty and offer one action.
  - No exclamation marks, no "please", no "oops".
- **Audiences:** ⚠️ **Decision needed:** who reads the UI (e.g. builders creating apps, team admins, internal operators), and the tone for each.
- **Terminology:** ⚠️ **Decision needed:** the words the product uses for its core objects and states (e.g. "project", "workspace", "draft"), and words to avoid.

---

## Logo artwork keeps its literal colors (`brand/logo/logo.tsx`)

**Rule:** the Logo's letter colors (`#0063F7`, `#F78000`, `#9139DA`, `#05B328`, `#E4C202`, `#00ADF7`) and its sparkle colors (`#0063F7` on light, the first S's blue; white on dark) stay literal hex in `logo.tsx`. They're the one exception to "never raw hex". The path data is Figma's SVG export (sparks.ds, node `1:31`), copied verbatim. The artwork sits at the top of its 197.842 × 37.1451 box: about 1px above it and 4px below, as in Figma. The `auto` tone switches the sparkle with `in-[.dark]:text-white`, not `dark:text-white`.

**Why:** these are artwork, not UI colors, and sparks.ds doesn't define them as variables. Turning them into theme tokens would let a theme change recolor the brand mark. `dark:` in Tailwind 4 follows the OS color scheme by default, while `theme.css` switches on the `.dark` class. With `dark:`, the sparkle could turn white on a light page.

**How to apply:** don't tokenize the logo's colors or redraw its paths. To update the artwork, re-export node `1:31` from Figma and replace the paths. Known-good sparkle classes: `auto: "text-[#0063F7] in-[.dark]:text-white"`, `"on-light": "text-[#0063F7]"`, `"on-dark": "text-white"`, with the sparkle path filled with `currentColor`.

---

## AutoPartsHUB logo artwork (`brand/autoparts-hub-logo/autoparts-hub-logo.tsx`)

**Rule:** the AutoPartsHUB logo's colors stay literal hex: the blue gradient `#0063F7` → `#0025A9` on "AUTOPARTS" and "A", and orange `#F16521` on "HUB." and "H.". The paths are Figma's SVG export of sparks.ds node 20:141 (variants `20:146` Logo, `20:142` Symbol) with **text outlined**, copied verbatim. The viewBoxes are the export's bounds (`0 0 245 36` and `0 0 50 36`), slightly wider than the Figma frames (243 and 46), because "HUB." and the dot run past them. Gradient ids come from `React.useId()`.

**Why:**

- Figma draws the logo as live text in Google Sans Flex, which apps don't load. Rendering it as text would fall back to another font, so it ships as outlined paths.
- The colors are artwork, not UI colors, and sparks.ds doesn't define them as variables (same exception as the Sparks Logo above).
- The frames clip nothing in Figma, so the overflow is visible there. A viewBox at the frame size would cut off the right edge of "HUB." and the dot.
- A fixed gradient id (`paint0_linear…`) is shared by every logo on the page; if the first one unmounts or is hidden, the others lose their blue fill.

**How to apply:** don't tokenize these colors, redraw the paths, render the letters as text, or replace `useId()` with fixed ids. To update the artwork, re-export both variants with `exportAsync({ format: "SVG_STRING", svgOutlineText: true })` and replace the paths, gradient coordinates and viewBoxes together.

---

## Product logos (`brand/pulse-logo`, `brand/flow-logo`, `brand/sales-logo`, `brand/care-logo`)

**Rule:** the paths are Figma's SVG export of sparks.ds → Branding (nodes 21:419 Pulse, 21:420 Flow, 21:421 Sales, 21:422 Care), copied verbatim. Width, height and viewBox are each node's exact size (e.g. Pulse `126.428 × 44.7273`), not the export's rounded-up integers. Colors:

- **Pulse:** `fill='currentColor'` with `text-foreground-prominent` on the svg, because Figma binds every fill to `colors/foreground/prominent`.
- **Flow:** literal gradient `#00F7EB` → `#FF9328` (at 0.519231) → `#CF0000`.
- **Sales:** one literal gradient `#B5DC00` → `#0C9400`, shared by all five letters. Figma's export repeats it once per letter with identical values.
- **Care:** literal `#D63EC9`.

Gradient ids come from `React.useId()`.

**Why:** the logos are artwork, so their literal colors are exempt from tokens, like the Sparks Logo. Pulse is the exception: Figma binds it to a semantic variable, so it follows the theme like any text. A fixed gradient id is shared by every copy on the page, and hiding one breaks the others' fill.

**How to apply:** don't tokenize the literal colors or hardcode Pulse's (`#222A34`). To update the artwork, re-export the node with `exportAsync({ format: "SVG_STRING" })` and replace the paths and gradient together.

---

## Tabs (`navigation/tabs/tabs.tsx`)

**Rule:** Tabs follows shadcn's structure, with these deliberate differences:

1. **The active look is a sliding indicator.** The white pill (Default) and the 2px underline (Line) are a `motion.span` with a `layoutId` unique to each `Tabs` (`useId()`), rendered inside the active trigger and moved with `resolve(layoutSpring)`. They aren't `data-[state=active]` styles on the trigger. To know which trigger is active, `Tabs` mirrors Radix's value in context. Triggers are `isolate`, and the pill is `-z-10`, so it sits behind the label.
2. **The active pill's shadow is exact:** `shadow-[0_0_4px_-2px_var(--shadow-color-md),0_0_4px_1px_var(--shadow-color-sm)]`. It's `shadow-md`'s colors, blur and spread with no offset, as Figma draws it. It's not `shadow-md` (2px lower) or shadcn's `shadow-sm`.
3. **The list passes `variant`, `size` and `baseline` to triggers through context** (`tabsTriggerVariants` with compound variants), not shadcn's `group-data-[variant=…]` selectors.
4. **Trigger heights are fixed per variant and size:** Default `h-[30px]` / `h-[34px]` (inside the track's `p-[3px]`), Line `h-9` / `h-10`. Default lg uses `text-base` with a fixed height: Figma gives that label no text style and an auto line height, while Line lg uses `base/base -semibold`.
5. **No shadcn `dark:` classes.** `dark:` follows the OS in Tailwind 4, not the `.dark` class, and the tokens already switch with `.dark`.
6. **`baseline`** (Figma "State=Default (line)") is a `before:` 1px `bg-border` line on each Line trigger. The underline indicator renders after it, so it covers the baseline.
7. **The focus ring shows for keyboard focus only.** The trigger tracks `focusedByPointer`: set on pointer down, cleared on key down and blur. It adds the `focus-visible:ring-*` classes only while that's false (and sets `data-focus-source='pointer'` while it's true).

**Why:**

1. MOTION.md asks for the tab indicator on a shared `layoutId`.
2. Snapping the shadow to a token changes its look.
3. Context keeps every trigger's height and padding in one `cva`.
4. Heights come from Figma per variant: Default fits inside the 3px track padding, Line is full height.
5. Shadcn's `dark:` classes would switch on the OS setting, not the app's theme.
6. Without the ordering, the gray baseline would paint over the underline.
7. Radix Tabs calls `focus()` on the tab from its mouse-down handler. The browser treats focus moved by script as keyboard focus, so a plain `focus-visible:` ring showed a box around a tab after a mouse click (a plain `Button` doesn't). Keyboard users still need the ring, so it isn't removed, only skipped for pointer focus.

**How to apply:** keep these on a shadcn resync. A new list variant needs its own indicator style in `tabsIndicatorVariants` and its height and padding in the trigger's compound variants.

⚠️ **No Figma source** (assumed): focus (Button's ring), disabled (`opacity-50`), vertical orientation (shadcn's layout, with the underline on the right). Figma's hidden counter badge, "Alert" badge and alert dot aren't built yet: they wait for a Badge component and a status token (the dot is bound to `alerts-patient/critical`, not in sparks.ds's synced variables).

---

## Avatar (`data-display/avatar/avatar.tsx`)

**Rule:** four choices in the Avatar differ from shadcn or from a plain Figma read, on purpose:

1. **No `overflow-hidden` on the root.** shadcn's root has it; here `AvatarImage` and `AvatarFallback` each carry `rounded-full` instead. Known-good root: `"group/avatar relative flex shrink-0 rounded-full select-none"`.
2. **Initials are 11px** (`text-[11px] font-bold` at `default`), as Figma draws them, not `text-xs` (12px). At `lg` they're `text-sm`.
3. **Initials colors are `--avatar-1` … `--avatar-10`** in `theme.css`, in Figma's i1–i10 order. sparks.ds has them as raw fills, with no variables behind them.
4. **`AvatarBadge` is 8px (`size-2`) at `default`**, Figma's size, not shadcn's `size-2.5`, and filled with `bg-success`, not `bg-primary`.

**Why:**

1. With `overflow-hidden` on the round root, the badge in the corner is clipped by the circle.
2. A sync or cleanup would likely snap 11px to the nearest text token.
3. Without this note, the tokens look like sync misses that a later `ucl-ds-sync` might drop. The order matters: `color={N}` and `avatarColorFor()` map to them by number, so reordering them changes every user's color.
4. A shadcn resync would bring back `size-2.5` and `bg-primary`.

**How to apply:** keep these four on a shadcn or Figma resync. If sparks.ds adds variables for the initials colors, map them to the same `--avatar-N` names in the same order.

⚠️ **No Figma source** (assumed; check when drawn): the `lg` sizes (initials `text-sm`, badge `size-2.5`; Figma only has the 32px set), and `AvatarAdd`'s hover and focus, which reuse Button's outline variant (`hover:bg-accent`, the standard focus ring).


---

## Clickable elements show the pointer cursor (`src/styles/theme.css`)

**Rule:** one global `@layer base` rule at the end of `theme.css` gives every enabled clickable element the pointer cursor: buttons, `role="button"`, `role="tab"`, `role="option"`, `role="menuitem"`, `summary`, `label[for]`, `select`, checkboxes, radios and file inputs. Disabled ones keep the default cursor. Links have the pointer already.

**Why:** Tailwind 4's preflight sets buttons to `cursor: default`, so tabs, buttons and the avatar's add button showed the arrow on hover. One rule covers every component and every app, instead of `cursor-pointer` on each.

**How to apply:** don't add `cursor-pointer` to components. A new clickable element that isn't a button, link or one of the roles above gets its role (or is added to this rule). `theme.css` ships to consumers, so the apps' own buttons get the pointer too.

---

## Figma → theme.css token map (`src/styles/theme.css`)

**Rule:** `theme.css` mirrors sparks.ds, and only sparks.ds. Every token comes from a sparks.ds variable, text style or effect style, and its comment in `theme.css` names the source. A token with no Figma variable behind it says so in its comment.

- **Primitives** (`primitives` collection) → `:root` as `--<palette>-<step>` in oklch, with the Figma hex in a comment (`--gray-700: oklch(0.334 0.016 255.63); /* #31373f */`). A palette's base alias (`palettes/sky/sky`) → `--sky: var(--sky-500)`. `colors/white`/`black` → `--white`/`--black`. Primitives aren't exposed as Tailwind utilities: components use semantic roles.
- **Semantic** (`semantic` collection, Light mode) → `:root, .dark`, referencing primitives, under shadcn role names where one fits (`colors/tone/brand/brand` → `--brand` → `--primary`). The path drops `colors/` and `tone/`, a group's own name (`colors/card/card` → `--card`), and `on-<x>` becomes `<x>-foreground`. Brand "accent" is `--tone-accent`, because shadcn's `--accent` is the hover surface (`colors/states/hover`). Badge names follow the Figma code syntax (`var(--badge-blue)`).
- **Aliases with opacity** (`states/hover`, `states/highlight`, `sidebar/active`) → `color-mix(in oklab, var(--x) N%, transparent)`.
- **Text styles** → `--text-*` with the paired `--text-*--line-height`. Font families → `--font-sans`/`--font-display` (both Figtree, `font-family/font`), `--font-mono` (`font-family/code`). Weights are Tailwind's defaults and letter spacing is 0, so neither is redefined.
- **Effect styles** → `--shadow-xs` … `--shadow-2xl` (colored by `--shadow-color-*`) and `--shadow-sonner`.
- **Semantic radius** → `--radius` (`radius/default`, 8px) plus `--radius-card`, `-input`, `-modal`, `-menu`, `-menu-item`, `-avatar-square`, `-button-xs` … `-button-xl`. badge, pill, chip and full are `rounded-full`.
- **Spacing** matches Tailwind's 4px scale value for value (`spacing/1` = 4px … `spacing/60` = 240px), so it isn't redefined.

**No Figma variable behind these** (decided at the first sync; change them in Figma first if they should differ):

- `--card-foreground`, `--popover-foreground`, `--accent-foreground`, `--secondary-foreground`: `var(--foreground)`.
- `--secondary`: `var(--neutral-muted)`, shadcn's light-gray secondary.
- `--destructive-foreground`: white. Figma has no "on-destructive".
- `--avatar-1` … `--avatar-10`: the avatar initials backgrounds, raw fills in sparks.ds (see "Avatar").

ℹ️ `--foreground-prominent` (`colors/foreground/prominent` → gray/800) was added after the first sync, when Pulse needed it. Its `.dark` placeholder is `var(--white)`, one step past `--foreground`'s gray-50.

**Not mirrored:** `colors/tone/danger/*` duplicates `colors/tone/destructive/*` value for value, so only `--destructive-*` exists. `font-size/xxs`, `line-height/xxxs` and `paragraph-gap/*` aren't used by any text style. `breakpoint/width`/`height` (1728 × 1117) are the cover frame's size, not a CSS breakpoint.

⚠️ **Gap:** sparks.ds has no Dark mode. The `.dark` block in `theme.css` is a derived placeholder (gray steps inverted, brand and tones unchanged). Replace it when the Dark mode exists in Figma.

**Why:** the first sync replaced every template value. Without this list, the tokens Figma doesn't define look like sync misses, and a later sync could "fix" them to something else or drop them.

**How to apply:** resync with `ucl-ds-sync` and keep these rules. A new semantic variable gets a token named by the rule above, a mapping in `@theme inline` and its Figma source in the comment.

---

## Gaps, margins and padding match Figma's literal value

**Rule:** when a Figma spacing value (gap, margin, padding) doesn't exactly match an existing spacing token, use the literal value as an arbitrary Tailwind class (e.g. `gap-[2px]`). Don't round it to the nearest token-backed utility (`gap-2` = 8px) for the sake of "consistency" with another variant or a nearby value. Check every value against the exact Figma node, per variant and state.

**Why:** in a previous UCL, a card's two variants had a real, Figma-authored difference: one used a raw `2px` gap, the other an `8px` token. The `2px` was normalized to `8px` to "avoid a non-token literal". That looked reasonable, but it was wrong. It built and rendered plausibly, so nobody caught it until a pixel comparison against Figma.

**How to apply:**

- Pull the literal value from `get_design_context` or `get_variable_defs` for the **exact node**, not a similar sibling or a different variant.
- If it matches a token's value, use that token's utility.
- If it matches no token, use the arbitrary class. An honest raw value is correct; a token that's a few pixels off is not.
- If the same visual role has different values across variants, keep the difference. If it looks like a Figma slip, ask which value wins instead of picking one.
- Applies to every component and layout, on first build and on every resync.

---

## Icon sizes match Figma's defined instance size

**Rule:** when Figma defines an icon instance at a given size (e.g. 24×24), render it at that size. Don't measure a smaller shape nested inside the instance and conclude the "visible" size is smaller.

**Why:** in a previous UCL, a plus icon was defined at 24×24, but its inner vector measured 16×16 because of a 4px inset in the source asset. It shipped at `size-4` and had to be corrected back to `size-6`. The inset is how the asset was drawn, not an instruction to shrink it.

**How to apply:**

- Take the size from the instance node's own width/height (`get_metadata` / `get_design_context`), not from a child layer.
- If a nested shape seems to disagree with the instance size, ask. Don't substitute the smaller number.

---

## Composed components are black boxes to their parents

**Rule:** once a component is placed inside another component or a layout, the parent never modifies or reaches into its internals. No deep descendant selectors (`[&_svg]:size-12`) that also match elements inside a child component's own markup.

**Why:** in a previous UCL, a card's icon slot used `[&_svg]:size-12` to size a logo passed into it. When a component with its own internal icon went into that slot, the same selector reached two levels down and resized the child's icon too. It rendered something plausible, so nothing caught it short of a visual diff.

**How to apply:**

- Scope slot styling to **direct children only** (`[&>svg]`, `[&>img]`), never `[&_svg]`.
- If a child needs to look different in a given context, add a prop or variant to the child. Don't override it from the parent with CSS.
- Before reusing a slot for a new component, check that the slot's selectors are scoped to direct children.

ℹ️ `Button`'s own `[&_svg]` rules style the icons passed directly into it, which is the component styling its own content. Don't nest another component that renders its own SVG inside a `Button` without checking this.

---

## Breakpoints include their own width (`src/styles/theme.css`, `src/lib/breakpoints.ts`)

**Rule:** a breakpoint covers widths up to and including its frame width. The frames are:

| Name  | Frame width |
| ----- | ----------- |
| `sm`  | 640         |
| `md`  | 768         |
| `lg`  | 1024        |
| `xl`  | 1280        |
| `2xl` | 1536        |
| `2.5xl` | 1728      |
| `3xl` | 1920        |

So the lg frame at exactly 1024px gets the "lg and below" layout, and the next layout starts at 1025px.

**Why:** designs are reviewed at those exact frame widths, and each frame must show the layout designed for it. With Tailwind's default min-width breakpoints, a frame at exactly 1024px got the next layout up. Same convention as bethere-ucl and verita-ai.

**How to apply:**

- `theme.css` registers each Tailwind breakpoint 1px past its frame width (`--breakpoint-lg: 1025px`). `lg:` means above 1024 and `max-lg:` means 1024 and below. Write the usual `lg:`/`xl:` classes, never an arbitrary `min-[1025px]:`.
- `2.5xl` (1728, custom, halfway between `2xl` and `3xl`) is registered as `--breakpoint-2\.5xl`. The dot has to be escaped, because Tailwind turns `--breakpoint-2_5xl` into `max-2.5xl:` only, with no `2.5xl:`.
- JS media queries use `mediaAbove("lg")` from `@/lib/breakpoints` with `useMediaQuery` from `@/lib/hooks/use-media-query`, never a hand-written `(min-width: …)`.
- Keep `theme.css` and `src/lib/breakpoints.ts` in sync when a breakpoint changes.
- Describe breakpoints as "at `lg` (1024) and below" / "above `lg`", not "below `lg`" / "from `lg`".

⚠️ **Constraint:** `theme.css` ships to consumers, so the apps' own `sm:`–`3xl:` classes follow these boundaries too.

---

## Row removal motion: fade out, then the rows below glide up (`src/lib/motion/variants.ts`)

**Rule:** when a row leaves a table or list because its data was removed, it doesn't just vanish. It fades out on `exitTransition` (160ms), then the rows below move up into its space on `layoutSpring`. Use `rowRemoveVariants` with the wiring below, not a one-off animation.

```tsx
const MotionTableRow = motion.create(TableRow);
const { resolve } = useMotionPreference();

<TableBody>
	<AnimatePresence initial={false}>
		{rows.map((row) => (
			<MotionTableRow
				key={row.id}
				layout='position'
				variants={rowRemoveVariants}
				initial='initial'
				animate='animate'
				exit='exit'
				transition={{ layout: resolve(layoutSpring) }}
			>
				…
			</MotionTableRow>
		))}
	</AnimatePresence>
</TableBody>;
```

**Behavior:**

- **Opacity only.** No `y` nudge, because a `<tr>` moving down overlaps the next row's border.
- **No entrance.** `initial` equals `animate` and `AnimatePresence` has `initial={false}`, so rows on first render or added by a data update just appear.
- **Sequenced.** The row finishes fading before the gap closes. That's `AnimatePresence`'s default `"sync"` mode.
- **Reduced motion:** `resolve(layoutSpring)` closes the gap at once. The fade stays, so the removal is still visible.
- **Search/filter changes** use the same motion.

⚠️ **Constraint:** never `mode="popLayout"` on table rows. It pulls the exiting row out with `position: absolute`, and a `<tr>` loses its table layout: its cells collapse while it fades.

⚠️ **Constraint:** keys are the record id, never the array index, or the wrong row fades out.

---

## Heading element → `Typography` `size` pairing (`src/components/typography/typography/typography.tsx`)

**Rule:** `<Typography as="h1">`–`h4` without `size`/`weight` render these defaults (`typographyHeadings`):

| Element | `size` / `weight`   | Font           |
| ------- | ------------------- | -------------- |
| `h1`    | `2xl` / `semibold`  | `font-display` |
| `h2`    | `xl` / `semibold`   | `font-display` |
| `h3`    | `lg` / `semibold`   | `font-sans`    |
| `h4`    | `base` / `semibold` | `font-sans`    |

`h1` is also the page and modal title.

**Why:** the element carries the semantics and the map carries the look, so screens get a consistent heading scale without repeating `size`/`weight` on every heading, and the document outline stays correct.

**How to apply:**

- Pick the element for the document outline, not for its size. If a Figma frame binds a different text style to a heading, keep the element and pass `size`/`weight` explicitly.
- ⚠️ **Decision needed:** these are the template defaults. Confirm them against the project's Figma text styles during `ucl-setup` or `ucl-ds-sync`, and update the table and `typographyHeadings` together.

---

## Text rendering: antialiased, kerned, no faux styles (`src/styles/theme.css`)

**Rule:** one global `@layer base` rule on `html` at the end of `theme.css` sets how every app renders text. Added Oct 25, 2026, same as intercept-ucl.

| Property | Value | Effect |
| --- | --- | --- |
| `-webkit-font-smoothing` / `-moz-osx-font-smoothing` | `antialiased` / `grayscale` | macOS only (Chrome, Safari, Firefox): thinner, crisper text than the platform's heavier default smoothing. Same as Tailwind's `antialiased`. No effect on Windows or Linux |
| `font-kerning` | `normal` | The font's kerning at every size, not only where the browser decides |
| `font-synthesis` | `none` | The browser never fakes bold or italic. A weight an app didn't load falls back to a loaded weight instead of a blurry smeared one |
| `-webkit-text-size-adjust` / `text-size-adjust` | `100%` | iOS doesn't enlarge text after rotation |

**Why:** browser defaults render text heavier on macOS than Figma draws it, and a missing webfont weight shows as faux bold. UCL declares the font tokens but doesn't load the webfonts (CLAUDE.md "Consumer Integration"), so `font-synthesis: none` protects apps that load fewer weights than the components use.

**How to apply:**

- Don't add `antialiased` or these properties to a component. The global rule covers it.
- `text-rendering: optimizeLegibility` is deliberately not set globally: modern browsers already kern and apply ligatures, and on long pages it can slow rendering. Use it per element only if a specific heading needs it.
- Apps load every weight of the project's font that the components use (the `Typography` `weight` values). A weight that isn't loaded falls back to the nearest loaded one. For Sparks: Figtree at 400, 500, 600, 700 and 900 (the weights the text styles use; 300 and 800 are tokens no style uses yet) and Roboto Mono for code.
- Digits that line up in columns use `tabular-nums` per element. That's a typographic choice, not part of this rule.

⚠️ **Constraint:** `theme.css` ships to consumers, so every app's text renders this way, including text outside UCL components. `antialiased` makes text look slightly lighter on macOS: compare it with Figma before changing font weights to make up for it.
