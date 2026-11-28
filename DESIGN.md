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
- **AutoParts Co.:** the company, a national auto parts retailer (more than 4,000 stores and a large e-commerce business). Written "AutoParts Co.", with the period.
- **AutoPartsHUB:** AutoParts Co.'s internal workspace, where employees open the apps (Pulse, Sparks, Flow, Sales, Care). Use it for the workspace (its home, header, notifications), never for the company.
- **Sparks, the assistant:** the AI inside the Sparks app is also called Sparks ("Ask Sparks", "Message Sparks…"). Never "Archie", "the AI" or "the bot" in copy. See [prds/sparks.md](prds/sparks.md).
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
- **Audiences:**
  - **Sparks app users:** experienced employees who know the business but aren't designers or engineers: product managers, operations, sales, customer care (reference user: Dana, Senior Product Manager). Tone: conversational, warm and clear, like a patient colleague who has done this before. No design or engineering jargon unless the user uses it first; a needed term is explained in the same sentence.
  - ⚠️ **Decision needed:** the other audiences (AutoPartsHUB members, admins) and the tone for each.
- **Terminology:**
  - **Sparks app:** concept, step (Plan, Prototype, Evaluate, Review), card, finished plan, evidence status, decision status, feedback ("Unclear"), spec, suggestion, assumption, what we believe (hypothesis), company knowledge, your knowledge, decision owner, decisions, defined in [prds/sparks.md](prds/sparks.md), "The words Sparks uses".
  - ⚠️ **Decision needed:** the words AutoPartsHUB and the other apps use for their core objects and states, and words to avoid.

---

## Team assessment bar (`data-display/team-assessment`)

**Rule:** the bar is everyone invited: support, doesn't support, then pending, in the legend's order, each `width: count / invited`, with no gap between segments and nothing else in the bar. Pending is the track's gray (`bg-neutral-muted`), so the bar always adds up to 100%. Fills: support `bg-(--success-500)`, doesn't support `bg-(--destructive-400)` (sparks.ds palettes, 135:2671), not `bg-success`/`bg-destructive` (a shade darker). The legend's pending square has a `border-border-defined` line, since its fill is close to white. The bar is `role='img'` with the counts in words; the legend is `aria-hidden` (it says the same).

**Why:** the bar must be mathematically true to the counts (2 / 1 / 2 of 5 invited is 40% / 20% / 40%). sparks.ds's frame shows decorative gaps, an orange pending segment and counts that add up to 10 of 8; don't resync those back.

**Known-good:** `outcomeFill` and the `` style={{ width: `${(count / total) * 100}%` }} `` segments in `team-assessment.tsx`.

## Review status keeps the prototype's box (`sparks/review/review-status.tsx`)

**Rule:** `ReviewStatusPanel`'s outer box is 16px a side, border included (`border px-[15px] py-[15px]`), the same as `PrototypePanel`'s `p-4`; Figma's 20px inset comes from `px-1` on the toolbar and `px-[19px]` on the scrolling area (`-mx-[15px]`). The prototype stays mounted under it (`hidden`), not unmounted.

**Why:** both panels are `flex-1 basis-0`, and a flex item's padding and border are its minimum size: with `px-5` plus a border, opening Review status made the idea's panel 5px narrower and its text reflowed. Unmounting the prototype lost its version, device and screen.

**Known-good:** the `className` on `ReviewStatusPanel`'s `motion.section`, and `cn("min-w-0 basis-0", reviewStatusOpen && … && "hidden")` on Review's `PrototypePanel` in `workspace.stories.tsx`.

## Logo artwork keeps its literal colors (`brand/logo/logo.tsx`)

**Rule:** the Logo's letter colors (`#0063F7`, `#F78000`, `#9139DA`, `#05B328`, `#E4C202`, `#00ADF7`) and its sparkle colors (`#0063F7` on light, the first S's blue; white on dark) stay literal hex in `logo.tsx`. They're the one exception to "never raw hex". The path data is Figma's SVG export (sparks.ds, node `1:31`), copied verbatim. The artwork sits near the top of its 197.842 × 37.1451 box: about 2px above it and 3px below, as in Figma (the letters run from y≈2.15 to 34.15). Figma's "Variant2" is `on-light` (blue sparkle) and "Default" is `on-dark` (white sparkle). The `auto` tone switches the sparkle with `in-[.dark]:text-white`, not `dark:text-white`.

**Why:** these are artwork, not UI colors, and sparks.ds doesn't define them as variables. Turning them into theme tokens would let a theme change recolor the brand mark. `dark:` in Tailwind 4 follows the OS color scheme by default, while `theme.css` switches on the `.dark` class. With `dark:`, the sparkle could turn white on a light page.

**How to apply:** don't tokenize the logo's colors or redraw its paths. To update the artwork, re-export node `1:31` from Figma and replace the paths. Known-good sparkle classes: `auto: "text-[#0063F7] in-[.dark]:text-white"`, `"on-light": "text-[#0063F7]"`, `"on-dark": "text-white"`, with the sparkle path filled with `currentColor`.

---

## Team assessment edges: the chevron's tip, the reminder's padding (`data-display/team-assessment`)

**Rule:** the action's `ChevronRight` (16px, `size-4`) has `-me-[5px]`: lucide's glyph ends ~5px before its box's right edge, so without it "View full report ›" stops short of "% completed" and the bar. With it, the chevron's tip lines up with them (within 1px). The `card` variant is `p-8 has-data-[slot=team-assessment-remind]:pb-6`: 24px at the bottom while the "Send a reminder" row (`data-slot='team-assessment-remind'`, `pt-2`, so 16px under the legend) is last, since the link's 24px line already adds room; 32px under the legend otherwise (sparks.ds 135:2671).

**Why:** asked for: the right edge should be one line, and the card shouldn't grow a gap under the reminder. A Figma resync reads the icon's 16px box and a flat 32px padding, and would undo both.

**How to apply:** in the ReviewPublished story, the chevron's tip and the bar's right end are at the same x; the space under "Send a reminder" is 24px.

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

## AutoParts Co. logo artwork (`brand/autoparts-logo/autoparts-logo.tsx`)

**Rule:** sparks.ds "AutoParts Logo" (node 73:5941: `73:5939` wordmark, `73:5940` symbol). The colors stay literal hex, the same as AutoPartsHUB's: the blue gradient `#0063F7` → `#0025A9` on "AUTO", "PARTS", "A" and "P", each run with its own gradient across its own text box, and orange `#F16521` on "Co." and the dot. The paths are the letters outlined from Google Sans Flex (Google Fonts, OFL) at Figma's settings: 29.035px, optical size 29.035 (Figma sets it to the font size), letter spacing −1% (−0.2904px), kerning on; "AUTO", "PARTS", "A" and "P" Black Italic (wght 900, slnt −10), "Co." ExtraBold (800), the symbol's dot Medium (500). They're placed as Figma's export places them: baseline at y 28, everything shifted right 1.37918px (the italic A's overhang), text boxes at Figma's x (AUTO 0, PARTS 79.18667, Co. 175.0025; A 0, P 21, dot 37). viewBoxes `0 0 222 36` and `0 0 48 36`, the export's bounds, wider than the frames (218 and 46) because "Co." and the dot run past them. Gradient ids come from `React.useId()`. In the prototypes' shop and counter headers it's 20px tall (`h-5`).

**Why:**

- Figma draws it as live text in Google Sans Flex, which apps don't load, so it ships as outlined paths.
- Figma's own export (`exportAsync` with `svgOutlineText`) wasn't available when it was built (the claude.ai Figma connector wasn't connected), so the outlines came from the font itself. The same method reproduces the AutoPartsHUB logo's exported "A" within 0.01px and its "PARTS" within 0.07px, which can't be seen at 36px.
- The same reasons as AutoPartsHUB's for the hex colors, the wider viewBox and `useId()`.

**How to apply:** don't tokenize these colors, redraw the paths by hand, render the letters as text, or replace `useId()` with fixed ids. When the Figma connector is connected, re-export both variants with `exportAsync({ format: "SVG_STRING", svgOutlineText: true })` and replace the paths, gradient coordinates and viewBoxes together, as for AutoPartsHUB.

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

## Button hover colors (`buttons/button/button.tsx`)

**Rule:** sparks.ds "Button" (38:124), State=Hover, per style:

- `neutral` (Style=Solid, the dark fill, e.g. "New idea"): `hover:bg-[color-mix(in_srgb,var(--neutral)_80%,white)]`, Figma's 20% white layer on `colors/tone/neutral/neutral`, so it lightens (#31373f → #5a5f65). ~~`88%, black`~~.
- `destructive` (Solid, Tone=Destructive): `hover:bg-[color-mix(in_srgb,var(--destructive)_80%,black)]`, Figma's 20% black layer. ~~`hover:bg-destructive/90`~~.
- `outline` (Outlined, Tone=Neutral): `hover:border-input-ring hover:bg-accent`: the hover fill (`colors/states/hover`, foreground at 6%) and the darker border (`colors/input/ring`, #9aa1ac).
- `ghost` (Ghost, Tone=Neutral): `hover:bg-accent`, the same hover fill.

**Why:** a darken on #31373f barely shows (the old 12% black was invisible), and Figma lightens it instead. An opacity (`/90`) on a solid fill lets the page through, which lightens a red instead of darkening it; color-mix gives Figma's exact layered color without new tokens.

**How to apply:** at rest → hover, "New idea" goes from #31373f to #5a5f65, and an outlined button's border from #e0e2e6 to #9aa1ac. `default`, `secondary` and `link` aren't in sparks.ds's set as these variants yet. A local `hover:` override on a Button hides these; there are none today.

---

## Button shape and spacing (`buttons/button/button.tsx`)

**Rule:** the sparks.ds "Button" (38:124) look is in the component: semibold text, and per size the corners, side padding and icon gap. An icon beside the label takes `data-icon='inline-start'` or `data-icon='inline-end'` (shadcn's names), which gives its side the smaller padding. `outline` has `text-foreground shadow-xs`.

- `default` (Figma lg · 36): 12px corners, 14px each side, 10px on an icon's side, 6px to the icon.
- `sm` (Figma md · 32): `text-sm`, 12px corners, 12px each side, 8px on an icon's side, 5px to the icon.
- `lg` (Figma xl · 40): `text-base`, 12px corners, 18px each side, 16px before a left icon and 12px after a right one, 8px to the icon.
- `icon` (36px): 12px corners.

```tsx
<Button variant='outline'><Play aria-hidden data-icon='inline-start' /> Run again</Button>
```

**Why:** Button kept shadcn's look (medium, 16px sides, 6px corners, 8px gap) and each place added sparks.ds's by hand. Several added only part of it, so "Run again", "Fix in the prototype", "Evaluate" and "Add to Review" didn't match "Share" or "Publish". CSS can't tell a leading icon from a trailing one (`:first-child` ignores the text), so the icon says it.

**How to apply:** don't add `rounded-button-*`, `px-*`, `font-*` or `shadow-xs` to a Button with a label; a shadcn resync must not bring back `rounded-md font-medium px-4`. "Run again" measures 111 × 36px, 600, 10px / 14px. A 28px ghost button (`size-7`, `h-7`) sets `rounded-button-sm` (10px): 28 isn't a size yet (SIZE-SCALE.md). The AutoParts Co. shop in the prototypes keeps its own lighter buttons (`shopButton`, `shopButtonSm` in `fit-check-prototype.tsx`): it's the retailer's brand, not Sparks's.

---

## App card hover (`cards/app-card/app-card.tsx`)

**Rule:** the hover state (Figma sparks.ds "app-card", `Property 1=Hover`, node 39:1694) applies only to a linked card (`asChild`). On hover: Lift (Motion, `y` only), border `border-border-defined`, shadow `shadow-lg`, description `text-foreground`. At rest the description is `text-muted-foreground` with `border-border` and `shadow-sm`. A static card (no `asChild`) never changes on hover.

**Why:** a hover state on a card that does nothing promises an action that isn't there (MOTION.md → "Cards": no motion on non-interactive cards). Motion owns the lift and CSS owns border, shadow and text color, because MOTION.md forbids animating one property with both; moving the shadow into `whileHover`, or the lift into CSS, breaks that split.

**How to apply:** the known-good code is `appCardLinkedClasses` (`group transition-[border-color,box-shadow] hover:border-border-defined hover:shadow-lg`) added only in the `asChild` branch, and the description's `asChild && "transition-colors group-hover:text-foreground"`. A Figma resync that reads the Default variant alone (`text-foreground` was the old value) must not drop the muted rest color or the hover branch.

---

## Prompt composer (`chat/prompt-composer/prompt-composer.tsx`)

**Rule:** sparks.ds "prompt-composer" (set 39:1840: `Default` 39:1839, `HasValue` 39:1877).
- **Tokens:** at rest the border is `border-border-defined` (Figma binds `colors/border/defined`); ~~`border-sparks-accent/20` at rest~~. The typing border, send button and radius use `border-sparks-accent`, `bg-[image:var(--gradient-sparks)]` and `rounded-composer` (20px). Figma doesn't bind these to variables yet (raw `#00ADF7`, `#0063F7 → #00ADF7`, 20px), so they live in `theme.css` under "Sparks accent": `--sparks-accent` is `var(--cerulean)` and `--sparks-accent-start` is `var(--sapphire)`, the logo palettes' 500s, which have exactly those hex values.
- **Padding:** ~~`border-2 p-3`, not `p-3.5`~~ at rest `border p-[13px]`, with text or focus `border-2 p-3`, never `p-3.5`. Figma's 14px padding is measured from the outer edge, with the stroke inside it; in CSS the border adds to the padding. 1 + 13 = 2 + 12 = 14px in both states, so the text and buttons don't move when the border thickens.
- **No gap:** `gap-0` between the input and the controls (Figma `spacing/none`; ~~`gap-2`~~), so the frame is 112px tall like Figma's (14 + 48 + 36 + 14), ~~120px~~.
- **Border:** full accent when the box holds text (`data-has-value`) **and** on `focus-within`. Figma has no focus state; the strong border is the keyboard focus indicator, since the textarea itself has no outline.
- **Shadow:** `shadow-composer` (`0 16px 30px -12px`, black at 12%; ~~6%~~) while the box is empty, `shadow-none` once it holds text: Figma's `Default` has it and `HasValue` doesn't. It's a raw shadow in Figma, not an effect style, so it lives in `theme.css` as `--shadow-composer`; don't swap in `shadow-lg` or `shadow-2xl`, which are darker and tighter.
- **Main button:** voice (`AudioLines`) while empty, Send (`ArrowUp`) once there's text. The icons overlap as they swap, with `iconSwapVariants` (`iconSwapReducedVariants` under reduced motion) inside `AnimatePresence`; press uses `pressPattern`. CSS owns the hover (`brightness-95`) and the border color; Motion owns scale and opacity.
- **Attached files (not in Figma yet):** `attachments` show above the text, 8px from it, as 28px `rounded-full bg-background-subtle` chips (14px paperclip, `text-sm`, 20px remove button). They make the box sendable with no text, always: the main button is Send while there are any (~~only with `attachmentsAlone`~~). The textarea carries `data-has-attachments` while files wait: `useEnterShortcut` skips it, so Enter there never picks a quick reply over the files.
- Icons are 18px, Figma's instance size; the round buttons are Button `ghost`/`icon` (36px) with `rounded-full`.

**Why:** the colors aren't Figma variables, so a resync that only reads bound variables would find nothing to map and could swap in the nearest existing token (`sky-500`, `brand`, `rounded-card`), which are visibly different. Copying Figma's 14px into `p-3.5` makes the box taller and shifts the content when the border changes from 1px to 2px; keeping one padding for both states does the same.

**How to apply:** when sparks.ds binds these to variables, rename the tokens to match and keep the values. Keep the focus border and the swap; the PRD that owns the behavior is [prds/sparks.md](prds/sparks.md), "The message box".

---

## Assistant message (`chat/assistant-message/assistant-message.tsx`)

**Rule:** Sparks's messages have no bubble: plain `text-base text-foreground` on the page, the conversation's full width, 12px between paragraphs and lists, 24px above a paragraph that's one all-bold line (it reads as a heading, so a new section starts: `mt-3` on top of the `gap-3`), 4px between list items, bold in `font-semibold text-foreground-prominent`. They take a `text` string (blank line between paragraphs, a line break for a new line 4px below, "1. " / "- " lists, `**bold**`), not JSX, so they can stream. A paragraph's lines are `span`s in a `flex flex-col gap-1` `p`, as with a bold question and the line under it ("**What problem do you want to solve?**\nDescribe it…"). With `stream`, the text streams with intercept-ucl's timing (MOTION.md → AI messages): `useStreamedText` reveals the plain text and `truncate()` cuts the parsed blocks to it, so a `**` or a list marker never shows half-written. The caret is a 6 × 16px block (`h-4 w-1.5`, the 16px text's height) pulsing with `pendingSurfaceVariants`. The workspace streams the introduction only when the concept opens with no messages (`isNew`), and stops streaming when Dana sends.

**Why:** without a bubble, Sparks's long, formatted messages read as the page and Dana's short bubbles on the right stand apart. Streaming JSX children couldn't cut text mid-element; slicing the raw string would flash `**`. A reopened concept replaying its introduction would make history look new.

**How to apply:** when sparks.ds draws an assistant message, sync it here and keep `text` + `stream`. Check against `parseBlocks`, `truncate` and the `stream={isNew && messages.length === 0}` in `workspace.tsx`.

---

## cn() knows the radius tokens (`lib/utils.ts`)

**Rule:** `cn()` uses tailwind-merge extended with every `--radius-*` token in `theme.css` that isn't Tailwind's own (`avatar-square`, `button-xs` … `button-xl`, `card`, `composer`, `input`, `menu`, `menu-item`, `message`, `message-tail`, `modal`), and every such `--shadow-*` token (`composer`, `sonner`). Adding a `--radius-*` or `--shadow-*` token means adding its name to that list in the same change.

**Why:** plain tailwind-merge doesn't recognize `rounded-button-lg` as a radius, so `cn("rounded-md", "rounded-button-lg")` kept both, and `rounded-md` won in the CSS. Every `Button` given a sparks.ds radius rendered at 6px instead of 12px (the clarification card's buttons, Save and Cancel, the workspace's quick replies and back button, the start page's search and "New idea"), with nothing failing.

**How to apply:** check with a component that overrides a base radius: the clarification card's "Yes, that's right" must measure 12px (`getComputedStyle(button).borderRadius`). Never work around it with `!rounded-…`.

---

## The darker border is `border-border-defined` (`src/styles/theme.css`)

**Rule:** the token colors/border/defined is `--color-border-defined`, so its Tailwind utility is `border-border-defined` (and `hover:border-border-defined`). `border-defined` isn't a utility: Tailwind ignores it and the element keeps its default border, with no error.

**Why:** the short name was written three times (the direction card's pick, the prototypes' selected options) and never showed.

**How to apply:** for a border color token, the utility is `border-` plus the token's full name after `--color-`: `border-border`, `border-border-defined`, `border-input`.

---

## Clarification card (`chat/clarification-card/clarification-card.tsx`)

**Rule:** sparks.ds "clarification-card" (node 55:2585). Panel: ~~`bg-background-subtle`~~ `bg-(--corn-50)` in Default (palettes/corn/50, #fffbeb, light yellow, a primitive with no semantic token yet) and `bg-background-subtle` in Edit, `rounded-card` (16px), `py-4 pr-4 pl-5`, 8px between rows; question `text-base font-semibold` and answer `text-base`, both `text-foreground`, 4px apart; `badge` on its own line between the question and the answer, in a `pt-1` wrapper (Figma "badge container"), so 8px below the question and 4px above the answer; sparks.ds draws it as the "Assumption" badge, `flat` `amber` at `xxs` (20px). ~~4px from each (not in Figma yet).~~ Every "Assumption" label is that same xxs badge: the clarification card, ~~the summary cards (`SectionCard`: Problem, brief, Success criteria, between the part's name and its text) and the comparison;~~ (the summaries are text now, and say an assumption in words); 24px to the pen (lucide `Pen`, Figma's glyph, in a 32px ghost icon button, `rounded-button-md`, `text-icon`: colors/icon/foreground); source line `text-xs text-muted-foreground`. The answer buttons (Figma "ctas") are part of the component, ~~10px~~ 16px under the panel (`gap-4`, spacing/4) and 10px apart, on the right (`justify-end`), in reverse order so the first reply (the "yes") is last, at the right edge, like Save; reversed in the DOM, not with `flex-row-reverse`, so Tab follows what's on screen. A Sparks reply without a card shows its quick replies the same way. In Edit, the question is 8px above the field (`gap-2`; 4px above the answer in Default), and the field is `rounded-input`, `border-border`, `px-[11px] py-[7px]`, ~~10px~~ 12px (`gap-3`, spacing/3) above ~~Save and Cancel~~ Cancel and Save, on the right (`justify-end`), 8px apart, Save last; ~~the pen stays in place but `invisible`;~~ the pen is removed (not hidden) and the panel's right padding becomes 20px (`pr-5`), so the field runs the full width (542px at Figma's 582); the badge, the source line and the answer buttons hide. Measured against Figma: ~~Default 180px tall (panel 134), 208px with the badge, Edit 166px 170px;~~ Default 186px tall (panel 134), 214px with the badge (Figma 214), Edit 176px (Figma 176); the width follows the container (Figma 584).

The buttons are UCL `Button` ~~with overrides, because `Button` isn't synced with sparks.ds yet~~ as is ("Button shape and spacing"); the classes below are what it now has built in: answer buttons `variant='outline'` at 36px with `rounded-button-lg px-3.5 text-sm font-semibold text-foreground shadow-xs` (Figma Outlined lg: 8px + 6px label padding); ~~Save `variant='neutral' size='sm'` and Cancel `variant='outline' size='sm'` with `rounded-button-md px-3 text-sm font-semibold` (Figma 32px, 4px + 8px label padding).~~ Save `variant='neutral'` and Cancel `variant='outline'` at 36px, the same size as the answer buttons, with `rounded-button-lg px-3.5 text-sm font-semibold` (Cancel adds `text-foreground shadow-xs`). Check: Edit measures ~~170px~~ 176px tall at 582px wide, the field 542px; a `size='sm'` or an `invisible` pen brings back 166px and a 490px field.

**Why:** Figma draws the field's 1px border inside its 12 × 8px padding; CSS adds it outside, so `px-3 py-2` came out 2px taller (66px for two lines, Figma 64).

A Sparks reply without a clarification card shows its quick replies with the same look (`SparksReplyView`).

**How to apply:** keep the answer buttons in the component (sparks.ds has them in State=Default). Keep `px-[11px] py-[7px]` on the field unless it gets an inside border (e.g. a ring instead of a border).

---

## Direction card header opens and closes it (`chat/direction-card/direction-card.tsx`)

**Rule:** sparks.ds "direction-card" (89:151) puts a 20px chevrons icon after the badges, 8px apart (Figma "Labels", `items-center`, `pt-0.5`): lucide `ChevronsUpDown` closed, `ChevronsDownUp` open. It's `text-foreground-subtle` (colors/foreground/subtle), and `text-icon` (colors/icon/foreground) while the header is hovered (`group/header` on the header, `group-hover/header:text-icon` on the button) or the button has keyboard focus. Figma binds colors/icon/foreground on the instance: that's the hover color, not the default. The whole header (title, badges, description, where) toggles the details, with the pointer cursor, only when the card has details. The chevrons are a real `button` (`aria-expanded`, `aria-controls`, `aria-label` "Show more: {title}" / "Show less: {title}", the Tooltip below it) with its own `onClick`; the header's `onClick` returns early when the click came from inside `a, button, [role='button']`. "Show more" / "Show less" stays under the lines.

**Why:** without that early return, a click on the chevrons toggles twice (the button, then the header it bubbles to) and nothing seems to happen; a badge with a popover would also open the card. The header alone isn't focusable, so the button is what keyboard and screen reader users get.

**How to apply:** check: hover the description, the chevrons turn dark; click the chevrons once, the card opens (`data-state="open"`) and the icon becomes down-up. Keep `ChevronsUpDown` / `ChevronsDownUp` (not a rotated chevron) and `text-foreground-subtle` as the resting color on a resync.

---

## Direction card title: 20px, status under it (`chat/direction-card/direction-card.tsx`)

**Rule:** the title is `Typography` `size='xl'` (20px on a 30px line), semibold, `text-foreground-prominent`; sparks.ds "direction-card" (89:151) has 18px (`lg`). `status` is a second line under it, in the same left column (`flex min-w-0 flex-1 flex-col`): `text-sm text-muted-foreground`, no gap. The labels and chevrons on the right sit `pt-[3px]`, centered on the title's 30px line, not on the status line.

**Why:** asked for, so the name reads first in a reply with three or four cards; the status ("Not generated yet", "Generated", "In Review") belongs to the name, not to the badges. A Figma resync reads 18px and would shrink the title back, and would drop the status line, which sparks.ds doesn't have.

**How to apply:** check the `Collapsed` story: "1. Fit check before you buy" is 20px, "Not generated yet" 14px muted under it, "Recommended" level with the title. Keep `size='xl'` and the `status` line until sparks.ds has them.

---

## Direction card not generated yet: dashed border (`chat/direction-card/direction-card.tsx`)

**Rule:** `pending` makes the card's own border `border-transparent`, drops its shadow (`shadow-none`, over the card's `shadow-sm`), and draws a dashed outline over it: an `aria-hidden` SVG, `absolute -inset-px size-[calc(100%+2px)]` (the card is `relative`), with one `rect` at `x/y 0.5`, `rx='15.5'` (the 16px corners on the border's line), `width/height: calc(100% - 1px)`, `stroke='currentColor'`, `strokeDasharray='6 5'` (6px dashes, 5px gaps), no fill. Its color is subtle, a step lighter than the solid border: `text-border-defined` (gray-300), and `text-foreground-subtle` (gray-400) when `emphasized` (the pick stays the darker one). The solid border (`emphasized` variant) is `border-foreground-subtle` (gray-400) and `border-muted-foreground` (gray-500), not sparks.ds's `border`/`border-defined`, so a generated card (solid, darker, with its shadow) reads stronger than one not generated yet (dashed, lighter, flat). Sparks's wrapper (`sparks/plan/direction-card.tsx`) sets `pending={status === "not-generated"}`, so the border turns solid once the prototype is built ("Generated", "In Review"). sparks.ds "direction-card" (89:151) has only a solid border.

**Why:** asked for, so Dana sees at a glance which directions don't have a prototype yet. CSS `border-dashed` can't set a dash's length or gap (the browser's are short and close, and read lighter than the solid line), hence the SVG. A Figma resync reads a solid border and would drop the dashes; "simplifying" back to `border-dashed` would bring back the short, faint ones.

**How to apply:** check the `AllVariants` story: the first three cards ("Not generated yet") have 6px dashes with 5px gaps, following the round corners; the pick's are darker; the last two ("Generated") are solid.

---

## Direction card "Where" icon: globe online, map pin for a place (`chat/direction-card/direction-card.tsx`)

**Rule:** the line saying where a direction changes things starts with a 14px icon (`size-3.5`) in `decorative-1`, like its text: lucide `Globe` when it's online (`locationKind` `online`, the default: a page, the app), `MapPin` when it's a physical place (`physical`: stores, a counter). sparks.ds "direction-card" (89:151) has only the map pin.

**Why:** the icon says what kind of place the change lands in. A Figma resync would put the map pin on every card, online ones included.

**How to apply:** check: "On the product page" shows the globe; the `PhysicalPlace` story ("Behind the scenes: stores…") shows the map pin. Keep the `locationKind` switch until sparks.ds has both.

---

## Sparks conversation scroll (`sparks/workspace/workspace.tsx`, `lib/motion/scroll.ts`)

**Rule:** when a reply is added, the workspace scrolls the `li` of Dana's message it answers (`sent`) to the top of the conversation with `scrollIntoViewSmoothly(item, { align: "start" })`, and gives the newest new reply `minHeight` equal to the scroller's height less its 56px top padding, her message and the ~~16px gap~~ 32px below it (`viewHeight - scrollPadding - sentHeight`). Every message, Sparks's or Dana's, has 32px below it: the list's `gap-4` plus `mb-4` on each `li`; change the two together, since `sentHeight` adds the 32.

The scroller is the whole conversation area, edge to edge (~~`px-8`~~ `px-6`, the header's 24px sides, ~~`pt-14`~~ no top padding: Figma 27:1932 starts the conversation right under the header, whose 28px bottom padding is the space above it; the 728px column centered inside it), so the scrollbar sits at the page's right edge and text scrolls up to the header; ~~`scroll-pt-14` keeps a message scrolled to the top 56px below the header~~ a message scrolled to the top sits right under the header. The message box is 24px from the bottom (`pb-6`, ~~`pb-14`~~). The 24px above the message box is padding outside the scroller (`pt-6` on the box's wrapper), so text is cut 24px above the box, not at its edge. The scrollbar is `scrollbar-subtle` (`theme.css`: `scrollbar-width: thin`, a `--border` thumb on no track). The view never follows the bottom while text streams (prds/sparks.md, "The concept workspace"). The newest new reply has `paddingBottom: viewHeight / 2` (inside its `minHeight`, border-box), so scrolling down a long reply by hand stops with its end at the middle of the scroller, never past it. In `scrollIntoViewSmoothly`, the interruption listeners (wheel, touch, pointer, key) are added on the next animation frame.

**Why:** her message at the top keeps what she said next to its answer (prds/sparks.md; it was the answer's start until the user changed it). Without the `minHeight`, her message can't reach the top while the reply is short (the checking line): the container can't scroll that far. Subtracting her message's height leaves no empty space to scroll past. Adding the listeners in the same event that sends (Enter's keydown, which React handles before it reaches `window`) stopped the scroll before it began. A "stick to bottom" follower, as before, scrolls the answer's start out of view while Dana reads it.

**How to apply:** check against `sent`, `lastIsNewReply`, `scrollPadding` (must equal the scroller's top padding, now 0), the `minHeight` and `paddingBottom` styles on the reply `li` and the `requestAnimationFrame` around the listeners in `scroll.ts`. Don't add back a ResizeObserver that pins the scroll to the bottom, or one that follows the reply while it streams (a follower to the middle was tried and dropped). The automatic scrolls are three, each once: her message to the top when she sends; a section's divider when it ends just below the view (`SectionBreak`); and, once a new reply is done, its end (`endRef` in `SparksReplyView`, `scroll-mb-8`, `align: "nearest"`) when it has quick replies, so its answers are in view (prds/sparks.md: a long reply left the next question's answers out of sight). `paddingBottom` must stay half the scroller's height: less and the end stops below the middle, more and she can scroll it past.

---

## Sparks thinking state (`chat/thinking-indicator/thinking-indicator.tsx`)

**Rule:** Figma Sparks 27:1932 (node 64:13203): a 10px dot (`size-2.5`), 10px gap (`gap-2.5`), the line in base text (16/24) filled with the logo's colors through `bg-clip-text text-transparent`: ~~`linear-gradient(90deg, var(--tangerine), var(--sapphire) 50%, var(--tangerine))` at `background-size: 200% 100%`, animated 0% → -200%~~ `shimmerGradient`, the six colors reversed (sapphire, cerulean, citrine, clover, amethyst, tangerine, back to sapphire) at even stops, `background-size: 600% 100%` (one line per color), `bg-repeat-x`, animated `backgroundPositionX` 0% → -120% over `thinkingShimmer` (7.2s). The dot's colors are the Sparks logo's letters in order, as CSS variables (`--sapphire`, `--tangerine`, `--amethyst`, `--clover`, `--citrine`, `--cerulean`), the same values as `logo.tsx`'s literal hex. The lines are what Sparks is doing, in automotive terms; never a bare "Thinking…".

**Why:** a gradient that starts and ends on the same color is what makes the loop seamless; Figma's static two-stop gradient (sapphire to tangerine) would jump on every loop. With background-size 600%, a position of -120% moves the image one full tile to the right (the offset is (line − 6 lines) × position). The colors are reversed because the image moves right: the next color comes in from the left, so it rotates in the logo's order, like the dot. One line per color keeps about two colors in view, as Figma shows. The color changes on landing because the dot remounts per hop (`key={color}`), which keeps hop and color in step without a timer that drifts.

**How to apply:** keep the tile's first and last stops equal, the 600%/-120% pair together (N colors: N×100% and −100/(N−1)×N%), the reversed order and `key={color}` on the dot. When sparks.ds gets this component, re-measure the dot, gap and text against it.

---

## Section divider (`chat/section-divider/section-divider.tsx`, `sparks/workspace/workspace.tsx`)

**Rule:** the zigzag is a 12×6px mask tile repeated across, over a `bg-border-defined` background; the tile's path runs past both edges (`-6` to `18`). It has no name on it. It's a reply part, `section`, between a summary and what follows it in the same reply (`sampleIntoNext`), with 32px above and below (`my-4` plus the parts' gap). `SectionBreak` draws it, then shows `thinking`, then lets the next part in. When it appears less than 240px below the view, the view moves once, only enough to show it and 96px under it (`scroll-mb-24`); otherwise it stays put.

**Why:** a mask takes the color from a token and fits any width without measuring; a path that stops at the tile's edges leaves a notch at every seam. `border` is too faint for a 1px diagonal. One reply, not two: a second reply scrolls the conversation to its own start, taking the summary away while she reads it. Without the nudge, the divider lands just under the view on a laptop, and Sparks seems to have stopped.

**How to apply:** keep it to finished sections of Plan; another use makes it decoration. The nudge isn't a follower: don't scroll on as the next section streams in. `SparksReplyView`'s reduced-motion skip leaves `section` out, or its thinking never shows. A summary whose button is a decision ("Build it") keeps her message and has no divider.

---

## Sparks at work: progress first, one feed (`chat/activity-feed`, `sparks/prototype/building-screen.tsx`)

**Rule:** a long piece of work (a prototype being built, a run in Evaluate, the idea written for Review) is a reply part of kind `progress`, shown by `ActivityFeed`: never a spinner line. A build's, a run's or the idea for review's reply starts with it and nothing else (`samplePrototypeBuildingReply`, `sampleValidateRunningReply` and `sampleReviewBuildingReply` have one part); what was built, done and found, or put together is appended to the same reply (`goOn`/`withMore` in the workspace story). A status stays the same through a stage, with no counter in it. The prototype panel takes `building` until every step is done, the checks included: no device before the first screen, the controls `invisible` (they keep their place), the screen `inert`. `BuildingScreen` is keyed by screen and animates each piece to its own computed opacity. `ValidatePanel` is blank until `begun`, then shows only what's done, in the order it's done, and the full results (the read first) once `finished`. `ReviewPanel` is blank until `building.begun`, then shows the parts as they're written, and goes back to the top once it's done.

**Why:** the reply used to open with "Here's what we'll build:" while the panel already showed the finished prototype. Appending to the same reply keeps Dana's message at the top: a second reply would scroll the conversation past her message and the progress. Hiding the controls with `invisible` keeps the toolbar's height when they come in. A fixed opacity of 1 would show a disabled button as enabled until the screen changes. A counter in the status ("scenario 3 of 9") swaps the line every second, so it blinks out each time. Showing every section with a "waiting" line from the start reads as results that failed to load.

**How to apply:** a new long task uses `progress`, not its own indicator. In `SparksReplyView`, keep `step` at the whole reply when it isn't animated, or what's appended after she leaves and comes back never finishes (and its quick replies never show). The reply keeps its id as it goes on, so a check on the reply waiting for an answer accepts the progress's id too (`isReviewOpenReply`: `review-building` as well as `review-open`); without it, "Looks right, publish it" does nothing. A new prototype takes `openOn` and lists its screens in `contents` in the order of `screens` (`screenAudience` reads the audience from it).

---

## Menus and select lists share one panel (`forms/select/select.tsx`, `overlays/dropdown-menu/dropdown-menu.tsx`)

**Rule:** sparks.ds "Select / Content" (77:6365), "Select / Item" (77:6335) and "Select / Section Title" (77:6352) draw both `SelectContent` and `DropdownMenuContent`: `rounded-input` (radius/input, 10px) `border border-border bg-popover shadow-xl p-1`, at least `min-w-[200px]`, children `flex flex-col gap-[2px]` (the groups too); items `h-8 rounded-md px-2 py-1.5 text-sm font-medium text-foreground`, `focus:bg-accent` (colors/states/hover; Figma's Hover is the pointer or keyboard highlight), `data-[disabled]:opacity-50`, a 16px check in `text-icon` when chosen (Active), and item icons in `text-icon` too (Figma #31373f; shadcn's muted default replaced); labels `h-7 px-2 py-1.5 text-xs text-muted-foreground` (xs regular). ~~DropdownMenu's `rounded-menu` (16px) and `rounded-menu-item` (8px)~~.

**Why:** Figma has one panel for both, and a menu next to a select must not look like a different component. shadcn draws them with `rounded-md`, `shadow-md` and an 8rem minimum, and its DropdownMenu label is sm medium; a reinstall or a shadcn resync brings those back. The 2px gap has to be on the groups as well, or items inside a `SelectGroup` touch.

**How to apply:** a new list-like overlay (combobox, context menu) uses the same classes. Callers don't restyle the label.

---

## Radio buttons and checkboxes have a border you can see (`forms/radio-group/radio-group.tsx`, `forms/checkbox/checkbox.tsx`)

**Rule:** `RadioGroupItem` and `Checkbox` are `border border-icon-muted` (gray-500) while unchosen or unchecked (`data-[state=checked]:border-primary` once chosen), not shadcn's `border-input`.

**Why:** with `border-input` an unchosen radio button is a faint ring that barely reads as a control on white (it needs 3:1 against the background to be seen as one; `border-defined`, gray-300, is still under it). A shadcn reinstall or resync brings `border-input` back.

**How to apply:** keep the darker border on any new round or square choice control (a checkbox, when it comes).

---

## The "+" menu is 240px (`chat/prompt-composer/prompt-composer.tsx`)

**Rule:** the message box's "+" menu (`DropdownMenuContent` in `PromptComposer`) is `min-w-[240px]`, 40px wider than the menu panel's 200px minimum ("Menus and select lists share one panel").

**Why:** asked for, so its longer items ("Add a connection", "Reset prototype") don't sit tight against the edge. sparks.ds "select-prompt-add" and the shared panel are 200px, so a resync from either brings 200px back.

**How to apply:** keep the class on the "+" menu only; other menus and select lists keep the 200px minimum.

---

## Evaluate's and Review's panels share one text style (`validate/validate-panel.tsx`, `review/review-panel.tsx`, `published/published-idea.tsx`)

**Rule:** the panel's title ("Evaluation", "Idea for review", "Advanced idea") is `Typography as='h2' size='xl' weight='semibold' className='text-foreground'`, the same as the idea's name in the header. Inside, sections are `lg semibold text-foreground-prominent` titles over `text-base` text, secondary lines `text-sm text-muted-foreground`, one under the other with a line between each and 24px on either side (`divide-y divide-border [&>*]:py-6 [&>*:first-child]:pt-0 [&>*:last-child]:pb-0`). Review's next step and the reviewers' page use the same sizes.

**Why:** asked for, so the two panels read as one product, and the panel's title matches the idea's name above it. Figma's "Evaluate" (72:660) still draws the title lg medium, so a resync from it brings that back.

**How to apply:** a new panel beside the prototype uses the same title and section styles.

---

## Popovers have the 2xl shadow (`overlays/popover/popover.tsx`)

**Rule:** `PopoverContent` is `shadow-2xl` (`--shadow-2xl`: `0 16px 50px -12px var(--shadow-color-lg)`), not shadcn's `shadow-md`. Every popover gets it from the component: Share, notifications, a prototype comment's thread.

**Why:** a popover floats over the page and needs to stand apart from it; with `shadow-md` the Share popover blended into the page behind it. A shadcn reinstall or resync brings back `shadow-md`.

**How to apply:** don't set a shadow on a single popover through `className`; change it here so they all match. Menus and select lists keep their own panel, `shadow-xl` ("Menus and select lists share one panel").

---

## Prototype headers stay at the top (`sparks/prototype/fit-check-prototype.tsx`, `more-prototypes.tsx`)

**Rule:** every prototype screen's header (the shop's `ShopHeader` and the fit check's, the counter and catalog headers) is `sticky top-0 z-10 bg-background`; the counter and catalog ones sit in a `p-4` column, so they add `-mx-4 -mt-4 px-4 pt-4` to cover its padding.

**Why:** the prototype scrolls inside its frame (`prototype-panel.tsx`, `overflow-y-auto`); a real store keeps its header, so the prototype does too. Without the background, the page shows through it; without the negative margins, content shows above and beside the counter headers.

**How to apply:** a new prototype screen's header uses the same classes.

---

## Icon buttons have a tooltip (`overlays/tooltip`, `autopartshub/header-icon-button.tsx`)

**Rule:** every icon-only button names itself in a `Tooltip` below it (`<TooltipContent side='bottom' sideOffset={6}>`), on hover and keyboard focus, and keeps the same words as its `aria-label`. Never the `title` attribute. `HeaderIconButton` has it built in (`label`, or `tooltip` when the words differ), and it's the icon button for the headers and the prototype's toolbar ("Edit element", "Add comment", "Versions ({n})", "Try it full screen"); the side panels' buttons ("Jump to a section", "Close"), the device switcher (`Smartphone` "Phone", `Monitor` "Desktop") wrap theirs. A toggle in the toolbar ("Edit element", "Add comment") is `aria-pressed` and fills with `bg-primary` while on (`toggleClasses` in `prototype-panel.tsx`).

Exception: the pencil on Dana's answers in Sparks opens its tooltip above ("Changing an answer").

**Rule (the delay, every tooltip):** a tooltip shows after the pointer has rested on its control for `motionDuration.tooltipDelay` (1s, ~~500ms~~; `TooltipProvider`'s default `delayDuration`, so every `Tooltip` gets it); keyboard focus shows it at once. Don't pass `delayDuration={0}` to a tooltip. Why: opening at once, tooltips flashed on everything the pointer crossed, and one stayed on a button after a menu closed back onto it ("Jump to a section"); a short rest means the person is asking what it is.

**Why:** an icon alone doesn't say what it does; `title` shows late, unstyled and never on keyboard focus. One tooltip everywhere keeps icon buttons reading the same.

**How to apply:** a new icon-only button uses `HeaderIconButton`, or wraps its button in `Tooltip` > `TooltipTrigger asChild`. With another trigger on the same button (a menu, a popover), the tooltip goes outside: `Tooltip` > `TooltipTrigger asChild` > `DropdownMenuTrigger asChild` > `Button`.

## Prototype comment pins (`sparks/prototype/prototype-comments.tsx`)

**Rule:** a pin is `size-9 rounded-full rounded-bl-none p-[3px] shadow-md`, white (`bg-background`), blue (`bg-primary`) while its popover is open, with the author's `Avatar` filling it; it sits `-translate-y-full` at the point, so its square bottom-left corner marks the spot. The pins are in a layer beside the screens (`wrapperRef`), and only the screens (`contentRef`) are observed for changes. `contentRef` is `isolate`, so the screens' own z-indexes (the sticky header `z-20`, the bottom bar `z-10`) stay under the pins; positions are measured again when the device scrolls. A thread's popover focuses itself (`onOpenAutoFocus`), and doesn't give focus back to its pin when another is opening (`onCloseAutoFocus`). A shop screen says which one it is (`ShopScreen` `view`, `part`): a new screen of a prototype passes them, or its comments can't be opened on it.

**Why:** the square corner is the pin's point: rounding it or centering the pin on the spot puts the comment somewhere else. Observing the pin layer too would re-place the pins on every re-place, a loop. Without `isolate`, the pins on "Save vehicle" were there but painted behind the bottom bar. Focus going back to the first pin closed the second thread as it opened, and focus on "Mark as resolved" opened its tooltip over the comment.

**How to apply:** check that a pin's bottom-left corner is on the spot clicked (0px off in the headless check), that the two pins on "Save vehicle" are visible on Review, and that from another screen, selecting one comment in the panel and then another opens each in turn.

## Side panels share one frame (`sparks/workspace/side-panel.tsx`)

**Rule:** Comments and Library are each a `SidePanel`, in one `motion.aside` (`key='side-panel'`; `sidePanel` says which, one at a time, sharing the width), drawn as Sparks "Sparks Project" → "Plan summary" (63:12460): a column on the right edge, the screen's full height, beside the header (`SparksWorkspace`'s root is a row: the column with the header and `main`, then the panel's `motion.aside`, `h-full`, its width from `useSidePanelWidth`: ~~`w-[480px]`~~ 380px to start, 300px at least, half the window at most, changed by dragging `SidePanelResizer` on its left edge: an 8px `separator` over the border (`-start-1 w-2`, `cursor-col-resize`, pointer capture), a 2px `bg-primary` line on hover, focus or drag; ←/→ 16px, Shift 64px, Home/End). The panel: `border-s border-border`, `bg-[color-mix(in_srgb,var(--background-subtle)_50%,var(--background))]` (Figma's unbound #f9fafa, the same mix as the bottom of the workspace), `pt-7`, the title row `px-8` (lg semibold `text-foreground`; buttons 8px apart, `sidePanelButtonClasses`: ghost 36px, 18px icon, `text-icon` at full opacity; the close button last, an `X`), `gap-6`, then the content `px-8 pb-7`, which scrolls. No card inside. Comments' sections: titles `text-lg font-semibold`, `gap-6`, each after the first with `border-t border-border pt-6`. Esc closes from inside. Opening it from "Comments" focuses the panel itself (`tabIndex={-1}`, `outline-none`), not its close button: a `Tooltip` opens on focus, so "Close" showed as soon as it opened. ~~`rounded-card bg-background-subtle`, a 60px row (`px-[21px] py-3`) …, the close button last (`PanelRight`), then `px-6 pb-6` around a white `rounded-avatar-square p-8` card that scrolls … 480px on the right in every step (`sidePanelColumn` in `workspace.tsx`: `w-[512px] pe-8 pb-6`).~~

**Why:** Figma's side panel is a full-height column of the screen, not a card inside the content area; and two panels that look or close differently read as two different things. Changes go in `SidePanel`, not in one panel. There's no token for #f9fafa, so the color is the mix the workspace's background already uses.

**How to apply:** a new panel beside the conversation (history, sources) is a `SidePanel` in the same `aside` and closes the others when it opens. Don't put the panel back inside `main` (the header would stay full width over it). Check: open Comments at 1600px: the panel is 380 wide and the full height, the header ends where it starts; dragging the edge stops at 300 and at 800; narrowing the window to 1200 brings an 800px panel down to 600.

---

## Share's add button turns solid on hover (`overlays/share-popover/share-popover.tsx`: `RecommendedRow`)

**Rule:** in "View recommended reviewers", while a row is hovered (`onPointerEnter`/`onPointerLeave` on the `li`) or its circle-plus has keyboard focus (`:focus-visible`), the 18px outline `CirclePlus` (`text-icon`) swaps for a solid one: `fill-link text-link [&_path]:stroke-background`, through `AnimatePresence` + `iconSwapVariants` (`iconSwapReducedVariants` under reduced motion). The ghost button has no hover fill of its own (`hover:bg-transparent`): the row's `hover:bg-accent` is the hover.

**Why:** the solid icon says the row adds something; a CSS color change alone (the first version) wasn't Motion's icon swap (MOTION.md). Not in Figma.

**How to apply:** check: hover a recommended row, the icon turns solid blue with a white plus, cross-fading; Tab to the button, the same. Keep the swap in `RecommendedRow`, not as `group-hover` classes.

---

## The dark button, disabled, is muted gray (`buttons/button/button.tsx`: `neutral`)

**Rule:** `Button` `variant="neutral"` disabled is `disabled:bg-neutral-muted disabled:text-foreground-subtle disabled:opacity-100`: colors/tone/neutral/muted (#edeff2) with colors/foreground/subtle text (#9aa1ac), not the base `disabled:opacity-50`. The other variants still fade.

**Why:** Figma's disabled "Publish & invite" (Sparks 81:1030) is the muted fill with subtle text; a 50% dark button reads as a different gray. sparks.ds's Button set has no Solid · Neutral variant yet, so a resync from it wouldn't carry this.

**How to apply:** check: Review with no reviewers, "Publish" → "Publish & invite" is light gray with gray text. Keep `opacity-100` with it, or the base class fades it again.

---

## Publish's note field: room for its focus ring while it opens (`overlays/publish-popover/publish-popover.tsx`)

**Rule:** the note's `motion.div` (Expand, with `useExpandClip`) has `-mx-1 -mb-1 px-1 pb-1`: 4px of room on the sides and bottom, taken back by the negative margins, so the layout doesn't move.

```tsx
<motion.div key='note' {...noteClip} className='-mx-1 -mb-1 px-1 pb-1' variants={expandVariants} …>
```

**Why:** "Add a note" focuses the field at once (`autoFocus`), so its 3px focus ring shows while the height is still animating and `useExpandClip` has the wrapper on `overflow: hidden`. Without the room, the ring's sides and bottom are cut until the animation ends.

**How to apply:** check: "Add a note" → the field's blue ring is whole on every side during the opening, not only after. Keep the room on any expanding wrapper whose content is focused as it opens.

---

## Inline alert colors (`feedback/inline-alert/inline-alert.tsx`)

**Rule:** every tone is its subtle fill, its muted border and its own color for the icon, text and action: `border-info-muted bg-info-subtle text-info`, `success`, `destructive`, `warning` the same way. Padding is 1px less than Figma's (`py-[7px] ps-[11px] pe-[7px]`), since Figma draws the border inside its padding and CSS adds it: 40px tall.

**Why:** sparks.ds "Inline Alert" (124:1584) mixes three treatments: Info and Danger on 5% tints with no token (`tone/info/info-05`, `alerts/danger-05`, the border the same as the fill), Success on the tone tokens, Warning on two unbound colors (#fffbea, #e8e4d5). Decided: the tone tokens for all, as Publish's audience box, so the four read as one set. Success uses circle-check, not Figma's "info" icon. ⚠️ Contrast, as in Figma's colors: Info 4.4:1, Success 2.8:1 (#01a746 on #e6f6ec) and Warning 2.5:1 (#f37a00 on #fef3e7) are below 4.5:1 for 16px text; only Danger (4.8:1) passes. Check with design before using it for text people must read (the `-emphasis` shades would pass).

**How to apply:** a resync from 124:1584 shouldn't bring back the 5% tints, the raw warning colors or the info icon on Success. Update Figma to the tone tokens instead.

---

## `background-soft` is a raw value (`src/styles/theme.css`)

**Rule:** `--background-soft: oklch(0.984 0.001 197.14)` (#f9fafa), sparks.ds colors/background/soft, mapped to `bg-background-soft`; `.dark` uses gray-900 as a placeholder. Not used yet (Publish's "who it goes to" box moved to the info colors).

**Why:** in sparks.ds it's a raw color, not an alias of a primitive (unlike `background-subtle`, gray-50, #f5f6f7, which is close but not the same). Don't "fix" it to gray-50.

**How to apply:** check `theme.css` against sparks.ds's semantic colors/background/soft on a resync.

---

## Share popover width (`overlays/share-popover/share-popover.tsx`)

**Rule:** `PopoverContent` is `w-[460px]` (`p-5`), so the invite field leaves the placeholder "Name, email or department" its full width (183px of 219px) beside the longest role, "Can comment", and "Invite".

**Why:** at 400px the role Select ran over the end of the placeholder. Not in Figma yet.

**How to apply:** a longer role label or placeholder needs the popover measured again; don't shrink it back to `w-[400px]` or Popover's default `w-72`.

---

## Quick replies and the Enter key (`chat/quick-replies/quick-replies.tsx`, `lib/hooks/use-enter-shortcut.ts`)

**Rule:** the first reply (the "continue") is last on screen, with `<CornerDownLeft aria-hidden data-icon='inline-end' />` after its label (10px on the key's side, Figma's 8px padding plus the icon's 2px; 14px on the label's), `aria-keyshortcuts='Enter'`. Enter picks it only when focus is on the page (`body`) or in the empty message box (`data-slot='prompt-composer-input'`), with no modifier, not repeating, not while an IME composes. ClarificationCard and the workspace's own replies both render `QuickReplies`, never their own buttons. While the replies are out of view, Enter scrolls to them instead of picking (`scrollMetrics` in `quick-replies.tsx`): the next question can come in below the view. A key pressed before the replies turned on doesn't count (`event.timeStamp < enabledAt` in `useEnterShortcut`): without it, under reduced motion, the Enter that sends her message also answers the next question, whose replies are already there when the event reaches `document`.

**Why:** Enter already means something on a button (press it), in a field (save, send) and in the message box with text (send); the shortcut takes only the Enter no one else uses. The message box swallows an empty Enter (`preventDefault`), so the hook recognizes the empty box by its slot instead of trusting `defaultPrevented` there. Two copies of the buttons would drift, as the card's and the workspace's did before.

**How to apply:** don't widen the hook to every input (the share popover's empty field would answer Sparks), don't drop `pe-2.5` (the key sits too far in), and keep one set of replies with `enter` on at a time: Sparks shows replies only under its last message.

---

## User message (`chat/user-message/user-message.tsx`)

**Rule:** sparks.ds "user-message" (node 41:1916). Background `bg-sparks-accent-subtle` (`--cerulean-200`, #C1E6FF), corners `rounded-message` (12px) with `rounded-br-message-tail` (2px) as the tail, padding `px-3.5 py-2` (14 × 8), text `text-base text-foreground`. In code it also wraps (`whitespace-pre-wrap break-words`) and stops at `max-w-[80%]`; Figma only shows one short, unwrapped line.

**Why:** Figma binds the background to `palettes/cerulean/200` but not the 2px corner, and binds the 12px corners to `radius/avatar-square`. Messages get their own radius tokens so a change to avatars never reshapes them; a resync that follows the avatar binding would couple the two again. The background belongs to the Sparks accent family (`--sparks-accent`, `--sparks-accent-subtle`), which now points to the logo palettes (cerulean, sapphire).

**How to apply:** keep `rounded-message` + `rounded-br-message-tail` and the subtle accent fill. When sparks.ds binds these to variables, rename the tokens to match and keep the values. ⚠️ The `.dark` theme is a placeholder: there, `text-foreground` turns light on this light fill, so the bubble needs a dark-mode value once sparks.ds has a Dark mode.

---

## Empty states (`feedback/empty-state/empty-state.tsx`)

**Rule:** every view, tab or filter with nothing to show uses `EmptyState`, and only its copy changes: optional icon, title (`lg` semibold, foreground), description (`base`, `muted-foreground`), 8px apart, and an optional ~~`sm` primary~~ button 16px below, sparks.ds "Button" Solid · Neutral (`variant='neutral'`, dark), lg · 36: `size` default (36px), ~~with `rounded-button-lg px-3.5 font-semibold` (`emptyStateButtonClasses`),~~ as the Sparks header's Share and Publish (with an optional outlined second button 8px before it, the same size, the main action last, as Cancel before Save). Don't set `size='lg'`: UCL's `lg` is 40px, Figma's lg is 36px (SIZE-SCALE.md). It's ported from verita-ucl's `EmptyState`, with the same layout and props. sparks.ds has no empty-state design.

**Why:** one empty state everywhere, so an empty tab never looks like a broken blank panel and every empty view reads the same. Without a Figma source, this entry is the reference: a later edit shouldn't restyle it per screen.

**How to apply:** copy follows DESIGN.md → "Brand voice" (say what's missing, offer one action when one is defined). A different look for one screen needs a prop here, not local overrides. When sparks.ds gets an empty-state design, sync it into this component.

---

## Badge (`data-display/badge/badge.tsx`)

**Rule:** sparks.ds "badge" (node 21:640): `variant` is Figma's Style (`solid`, `flat`, `outline`, `ghost`, `link`), `tone` its Tone, `size` its Size on SIZE-SCALE.md's names (`xs` 24, `sm` 32, `default` 36 = Figma "md (default)", `lg` 40). Each style draws only some tones, so the colors live in `compoundVariants`:

- Solid: `brand` (`bg-primary`), `neutral` (`bg-neutral`), `destructive` (`bg-destructive text-white`).
- Flat: `neutral` (`bg-neutral-muted text-foreground`), `blue`, `green`, `sky`, `purple`, `red` (the `badge-*` tokens), `yellow` (`bg-(--corn-100) text-(--corn-800)`), `amber` (`bg-(--flamingo-100) text-(--flamingo-700)`).
- Padding and gap per size are Figma's: xxs `px-1.5 py-0.5 gap-1` (20px, `text-xs font-normal`: Figma draws it in regular, the only size not in medium), xs `px-2 py-0.5 gap-1`, sm `px-2.5 py-1.5 gap-1`, default `px-3 py-2 gap-1.5`, lg `px-3.5 py-2.5 gap-1.5`. Text `sm` up to `sm` size, `base` from `default`; icons 12px, then 16px.

**Why:** yellow and amber have no `badge-*` variable in sparks.ds: Figma binds the corn and flamingo primitives directly, so the component reads those primitives through `var()` instead of inventing semantic tokens. A few Figma "md" symbols use a 4px gap instead of 6px; 6px is the set's majority and is used for every `default` badge.

**How to apply:** when sparks.ds adds `colors/badge/yellow` and `amber` variables, add the tokens to `theme.css` and switch those two tones to them. Sparks's statuses use `flat` at `xs` (prds/sparks.md, "The start page").

---

## Plan stays the conversation (`sparks/workspace/workspace.tsx`)

**Rule:** there's no side panel for the plan, no "Blueprint" button in the concept's header and no plan document: on Plan, before and after it's done, `SparksWorkspace` shows Plan's conversation, centered, with the message box (prds/sparks.md, "The finished plan"). Plan gets no `preview`; the conversation column hides only for a step not reached yet:

```tsx
const conversationHidden = Boolean(peeked?.upcoming) || !conversation; // `conversation={false}`: Evaluate and Review
const preview = peeked?.upcoming ? <EmptyState … /> : previewProp;
```

**Why:** a view that changed format after "Generate prototype" (the former `PlanDocument`, with "Edit plan", versions and "Where it stands") was more to learn and more moving parts for the demo; Dana changes the plan by changing her answers instead ("Changing an answer" below). sparks.ds "Sparks Project" (32:1145) and Sparks → "Sparks Project" (55:7660) still draw the "Blueprint" button and the side panel, so a resync from them would bring them back.

**How to apply:** a resync of the concept's header keeps Library, Comments, notifications and Share, plus Publish on Review only ("One dark button per step"). Don't add a plan panel to `sidePanelColumn` or pass Plan a `preview`. In the stories, set the step before adding the reply that starts it (`setStep` then `setMessages`): `WorkspacePrototype` stamps new replies with `stepRef`, and React may compute the new messages at once.

---

## Evaluate: no conversation, agents on the real prototype, all at once (`sparks/validate/evaluation-prototype.tsx`, `validate-panel.tsx`, `sample-validate.ts`)

**Rule:** Evaluate ~~is the one step~~ and Review ("Review: the idea and the prototype" below) are the steps without a conversation (prds/sparks-validate.md, "Evaluate's screen"; Figma Sparks "Evaluate", 72:660): the story passes `conversation={step !== "validate" && step !== "review"}`, and the preview is ~~`EvaluationPrototype` and `ValidatePanel`~~ `ValidatePanel` (left) and `EvaluationPrototype` (right) side by side, Figma's order swapped so "Add to Review" is at the top right like every step's button (`flex gap-4`, each `min-w-0 basis-0`), 24px around them (`px-6 pb-6` in `SparksWorkspace`). The agents find their places by the prototype's own ids: each step's `at.element` in `sampleStops` is a `data-point` (what "Edit element" uses) or a `data-agent` (only for agents):

```tsx
const targetIn = (root, element) => root?.querySelector(`[data-point="${element}"], [data-agent="${element}"]`);
// fit-check-prototype.tsx, ShopHeader: <div data-agent='vehicle-chip' …>
// more-prototypes.tsx: <Badge data-agent='return-flag' …> (ReturnFlag, both wordings), <button data-agent='fit-list' …>
```

Replies asked for in a conversation that starts a run come from `evaluateFrom(step)`, which returns `{ ...sampleValidateStartedReply, step }`: the step she asked from, since `startRun` has already set the step to Evaluate.

**Why:** an element id renamed or a `data-agent` dropped doesn't break anything visible: the agent goes to the whole device instead, and the finding's marker disappears. And without the explicit `step`, "Yes, evaluate it" and Sparks's answer would be stamped Evaluate and vanish from Prototype's conversation.

**How to apply:** renaming a `pointable(...)`/`useButton(...)`/`EditableText` id, or a prototype edit that drops a `data-agent`, updates `sampleStops` in the same change. A new direction's prototype gets its `sampleStops` entry. A Figma resync of Evaluate doesn't bring back a conversation column or quick replies. ~~Agent colors are the logo's (`var(--sapphire)` …), never avatar colors; screen-reader and keyboard agents stay dark and dashed.~~ Customer agents' colors are the logo's (`var(--sapphire)` …), never avatar colors; expert agents are `var(--gray-800)` with their role's icon (`expertIcons`, by expert id: `ux`, `copy`, `engineer`, `data`). The phone is the shared device ("The prototype's device has a dark bezel" below).

**The strip and the agents** (`EvaluationPrototype`): every screen in `screens` is a live prototype opened on its place (`children(audience, at)`), so markers and agents can sit on any of them; positions come from `getBoundingClientRect` every frame, which includes the strip's slide and the side screens' scale. A marker needs its screen in `screens`: the story adds every `at.part` that a stop or a finding names. Agents work all at once, screen by screen in `screens` order, so a scenario's steps must follow that order (a step on an earlier screen than the one before it would be skipped).

---

## The prototype's device has a dark bezel (`sparks/prototype/prototype-panel.tsx`: `prototypeDeviceClasses`)

**Rule:** the prototype sits in one device everywhere it's shown (Prototype, Evaluate's strip, the reviewers' page): a phone with a 10px dark bezel around a 375 × 812 screen (an iPhone's proportions; 395 × 832 with the bezel), or a monitor with an 8px one. The phone is always that size inside: where there's less room, `FitPhone` (Prototype) or the strip (Evaluate) scales it as a whole with `transform: scale()`; it's never squashed or narrowed.

```tsx
const prototypeDeviceClasses = (device: PrototypeDevice) =>
	cn(
		"min-h-0 flex-1 border-[color:var(--gray-800)] bg-background shadow-xl",
		device === "phone" ? "h-[832px] w-[395px] shrink-0 rounded-[44px] border-[10px]" : "min-h-0 w-full flex-1 rounded-[18px] border-[8px]",
	);
```

**Why:** the bezel makes the prototype read as a device, as in Figma Sparks "Evaluate" (72:660). A fixed width with a capped height made it look too wide; scaling keeps a phone's proportions and the 375px the shop's screens are built for. Anything that measures inside a scaled phone in screen pixels divides by the scale: comment pins (`prototype-comments.tsx`: `k`) and Evaluate's scrolling to an element. `--gray-800` is a palette token on purpose: `border-neutral` and `border-foreground-prominent` turn light in dark mode, and a device stays dark.

**How to apply:** a new place that shows the prototype uses `prototypeDeviceClasses` (and `FitPhone` for a phone), never its own border or a `max-h`. Changing the bezel's width changes `phoneSize` and the phone's `w-[…]`/`h-[…]` with it, so the screen stays 375 × 812.

---

## Quick replies beside a preview: one per row (`chat/quick-replies`, `sparks/workspace/workspace.tsx`)

**Rule:** in the conversation's column beside a preview (Prototype), quick replies sit one per row, on the right, the main one last. In Plan (the conversation on its own) they stay in a row.

```tsx
<QuickReplies replies={reply.quickReplies} onReply={onQuickReply} onePerRow={narrow} /> // narrow={Boolean(preview)}
```

**Why:** in the 480px column, three or four replies wrapped unevenly (one, then two, then one). sparks.ds "ctas" draws only the row, so a resync could put it back.

---

## Review: the idea and the prototype (`sparks/review/review-panel.tsx`, `review-next.tsx`)

**Rule:** Review has no conversation: `ReviewPanel` (left) and `PrototypePanel` (right) side by side, `flex gap-4`, each `min-w-0 basis-0`, as Evaluate's panels: a 68px header (`px-5`), then a `rounded-[12px] bg-background p-8` card (`mx-5 mb-6`). What Dana does there is `ReviewNextStep`, one step at a time at the top of the card, in a bordered box, with outlined buttons; what only she sees of the idea before publishing is `PublishingPart`, after Known issues. The teams' page (`PublishedIdea`) has the same two panels and the same `ReviewDocument`, and gets neither: its box at the top is their review. A change to the frame goes in both:

```tsx
<ReviewDocument concept={concept} publishing={next?.kind === "publish" && !building ? <PublishingPart next={next} /> : undefined} … />
```

Without `onPointingChange`, `PrototypePanel` has no "Edit element", and without `onTextChange`, the prototype's text isn't editable (`EditableText`): in Review, Evaluate and the teams' page it can only be tried and commented on.

**Why:** everything the conversation said about the idea is in the idea, so it was said twice; and Dana checks what the teams will get, next to the prototype they'll get. An editable text in those places would look like a change and save nothing.

---

## Pages have 24px around (`navigation/app-header`, every layout in `autopartshub/`)

**Rule:** every page's content sits 24px from the window's left, right and bottom (`px-6 pb-6`), the same as the header's sides (`AppHeader` `px-6`, sparks.ds "header-autopartshub" 32:1145): the home, the Sparks start page, Plan, Prototype, Evaluate, Review, a step not reached yet, the reviewers' page and the prototype full screen. A centered column (1232px, 728px) keeps its width and has at least 24px. The header keeps Figma's 28px top and bottom.

**Why:** the header moved from 32px to 24px; a page left at 32px puts its content 8px off the header. Older Sparks frames in Figma draw 32px (and 48px above the content), so a resync from them would bring it back.

**How to apply:** check at 1200px wide: the header's first and last items, and the page's outer edges, are 24px from the window.

---

## One dark button per step (`sparks/shared/panel-action.tsx`, `sparks/workspace/workspace.tsx`: `publish`)

**Rule:** each step's way forward is one dark button (`PanelAction`, Button `neutral`, 36px, 12px corners) at the top right of its panel: "Evaluate" in Prototype (last in the toolbar, after full screen), "Add to Review" in Evaluate. Review's is "Publish", in the header after Share, and only on Review: `publish={step === "review" ? … : undefined}`. Disabled with a `hint`, its reason shows in a tooltip on a focusable wrapper (`span tabIndex={0}`), since a disabled button gets no hover or focus.

```tsx
<PanelAction label='Add to Review' disabled hint='Wait for the evaluation to finish, or stop it.' />
```

**Why:** Dana isn't an expert at building things: the next thing to do is always at the top right, and Publish shows only where she can check what the teams will get. sparks.ds "Sparks Project" draws Publish in the header whatever the step, so a resync could show it in every step.

---

## "Published" is a Flat button that opens what went out (`sparks/workspace/workspace.tsx`: `publish.published`)

**Rule:** once the teams have the latest version, the header's Publish reads "Published" and is Button `flat` (sparks.ds Flat, 38:324: `bg-neutral-subtle text-neutral`, `hover:bg-neutral-muted`), selectable, not disabled. It opens `PublishPopover` `variant='published'` (sparks.ds 138:2887): "Your idea is published", when (`publishedAt`, a 16px `Clock`, "Fri, Nov 27, 2026, 4:43 PM") and the address 4px under it, "Idea solution paths shared" with each path at the version published, then "Your idea was shared with N team members." with the departments and "Manage reviewers"; no buttons, 20px under the audience. The story passes `publish.published` instead of `disabled` + `hint` for that state. "Publish" and "Publish update" stay Button `neutral`.

```tsx
<PublishPopover variant='published' title='Your idea is published' publishedAt={…} items={…} audience={…}>
	<Button variant='flat'>Published</Button>
</PublishPopover>
```

**Why:** asked for: "Published" isn't a step to take, so it's quieter than the dark button, but it's where Dana checks what the teams got and who has it. Before, it was the dark button, disabled, with a tooltip. A header resync from a Figma frame with the dark "Published" would bring that back.

---

## The strip doesn't follow what it selected (`sparks/validate/evaluation-prototype.tsx`: `focus.fromScreen`)

**Rule:** a finding selected by the screen in focus (`onScreenFindings`) is passed back with `fromScreen: true`, and the strip ignores it; only a finding Dana selects moves the strip, and then "go to the first open finding" doesn't run.

```tsx
const selectedMarker = focus?.fromScreen ? undefined : markers.find((m) => m.id === focus?.id);
```

**Why:** without it, when a run ended on a screen with its own finding ("Complete fit data": the fit list), going to the first finding and selecting the screen's finding undid each other without end, and Evaluate crashed (React "Maximum update depth exceeded").

---

## "Fix in the prototype" opens the finding's page (`sparks/prototype/prototype-panel.tsx`: `openAt`)

**Rule:** `openAt` sets the screen, audience, device and part when its `key` is new, and is dropped (`opened`) as soon as she uses the arrows or the audience switcher. The content's key includes `opened.key`, never the version, so a change shows on the page she's on.

```tsx
<React.Fragment key={`${audience}-${screen ?? "start"}-${opened?.key ?? ""}`}>{children(audience, screen, opened?.part)}</React.Fragment>
```

**Why:** two findings can be on the same screen with different parts (a part that fits, one with no fit data), so the screen alone wouldn't reopen it; and keying by version would send her back to the first page at each change.

---

## The prototype's arrows slide the screens (`sparks/prototype/prototype-panel.tsx`: `frame`, `carouselVariants`)

**Rule:** in the Prototype step, the arrows beside the device move the screens like a carousel (MOTION.md → Carousel): each slide spans the panel's full width, the arrows sit over it, and the frame clips it. Only the arrows slide (`slide.key` changes in `goToScreen`); switching audience or device changes the screen in place.

```tsx
<div className='relative flex min-h-0 w-full flex-1'>
	<AnimatePresence initial={false} custom={slide.direction} mode='popLayout'>
		<motion.div key={slide.key} custom={slide.direction} variants={prefersReducedMotion ? fadeVariants : carouselVariants} initial='initial' animate='animate' exit='exit' className='flex min-h-0 w-full min-w-0 flex-1 flex-col items-center px-14'>
			{shown}
		</motion.div>
	</AnimatePresence>
	<div className='absolute inset-y-0 left-0 z-10 flex items-center'><ScreenArrow direction={-1} … /></div>
	<div className='absolute inset-y-0 right-0 z-10 flex items-center'><ScreenArrow direction={1} … /></div>
</div>
```

**Why:** `carouselVariants` moves each screen by its own width (`x: ±100%`), so the slide has to be as wide as the area that clips it, or a sliver of the device stays in view at the start and end. The arrows are therefore `absolute` over the slide instead of flex siblings, and `px-14` (40px arrow + 16px gap) keeps the device where it was between them. `relative` on the parent is what `mode='popLayout'` positions the leaving screen against; `custom` on `AnimatePresence` makes a screen already leaving follow a quick second click the other way.

**How to apply:** don't put the arrows back as flex siblings of the slide, and don't key the slide by the audience or screen (that would slide on every switch). Evaluate's strip has its own motion (all screens side by side, MOTION.md → "Agents on the prototype").

---

## Prototype title is the versions menu (`sparks/shared/versions-menu.tsx`)

**Rule:** the direction's name on the left of the prototype's toolbar is a `DropdownMenu` trigger (inside the `h2`): base semibold `text-foreground-prominent`, a 16px `ChevronDown` (`text-icon`) 4px after it, and "Version {n}" under it, outside the trigger (`text-xs` ~~`text-foreground-subtle`~~ `text-muted-foreground`, colors/foreground/muted: stronger, so the version and when it was published read). The menu opens with `sideOffset={26}`: 8px under "Version {n}" (its 18px line). No history icon among the toolbar's actions. With more than one path, the paths are radio items at the top of the same menu ("Paths"); there's no separate path `Select`.

**Why:** the trigger is only the name, so the heading stays a heading and "Version {n}" isn't in the button; with the default 8px offset, the menu covered "Version {n}".

**How to apply:** if "Version {n}" changes size or the gap under the name changes, change `sideOffset` with it. A resync of the toolbar shouldn't bring back the History icon button.

**By version** (`shows="version"`, Review and the reviewers' page): the trigger is "Version {n}" and the line under it is when it was published (`published`), or "Not published yet"; the button's `aria-label` keeps the name ("Version 2 of Fit check before you buy"), since the heading no longer says it. With `onView` (reviewers), the menu lists published versions as radio items (`number`, `publishedAt`), no "Restore". Don't use it where the idea's name isn't on screen elsewhere (Prototype, Evaluate).

---

## One list for picking people (`forms/people-list/people-list.tsx`)

**Rule:** Share's field and "@" in a comment on the prototype use the same `PeopleList`, `matchPeople` and `handlePeopleKeys`: the menu panel (`rounded-input border bg-popover p-1 shadow-xl`), 36px rows 2px apart, a 24px `PeopleAvatar` (a `Building2` for a department), the name sm medium, the team or size xs muted on the right. The field keeps focus (`combobox`, `aria-activedescendant`); rows pick on `mousedown` with `preventDefault`; Esc closes only the list (`stopPropagation`, so the popover around it stays). In the comment box, after a pick, the caret is placed in a layout effect on the new text (`pendingCaret`), not in `requestAnimationFrame`.

**Why:** two lists for the same people would drift ("one element, one behavior"). A pick on `click` would blur the field first and close the list; and with `requestAnimationFrame`, typing right after a pick went in before the caret moved ("Can @Lee Carter the fit wording?check").

**How to apply:** a new place to pick people uses `PeopleList`. Check: in the comment box, "@", "ca", Enter, then type at once: the text reads "@Lee Carter " followed by what was typed.

**Rule (it floats over its container):** `PeopleList` renders in its own Radix Popover layer, in a portal, anchored to the field with `anchor` (a ref; `PopoverPrimitive.Anchor virtualRef`), 4px below it, as wide as it less `inset` on each side (`width: calc(var(--radix-popover-trigger-width) - 2 × inset)`; the comment box passes `inset={8}`). The layer never takes focus or dismisses itself (`onOpenAutoFocus`, `onCloseAutoFocus`, `onEscapeKeyDown`, `onPointerDownOutside`, `onFocusOutside` all `preventDefault`): the field opens and closes it. The `ul` scrolls past `--radix-popover-content-available-height`. Callers never position it (no `absolute top-full`).

**Why:** Share's popover scrolls (`overflow-y-auto`), so a list placed `absolute` inside it was cut off at the popover's bottom edge after three rows. In a portal it goes over the popover (and the page), and since it's a Radix layer rendered inside Share's React tree, a click in it doesn't count as outside Share, and Esc reaches the field's `handlePeopleKeys` instead of closing Share.

**How to apply:** check on `--review-ready` with the window 700px tall: Share, type "m": 8 rows, the last below Share's bottom edge, nothing cut off; Esc closes the list and Share stays; a click on a row adds them and the field keeps focus.

---

## Comment pins drag without taking focus (`sparks/prototype/prototype-comments.tsx`: `dragHandlers`)

**Rule:** a pin that can move (the one being written, `data-comment-draft`; a posted one whose author is the viewer, with `onUpdate`) handles `pointerdown` with `setPointerCapture` **and `event.preventDefault()`**, moves after 4px (`dragged` overrides its position), and on `pointerup` re-anchors with `anchorOn(target, point)` (the same as a click with "Add comment" on) on the element under its corner (`document.elementsFromPoint`, inside `contentRef`). The click that ends a drag is cancelled (`justDragged`, `preventDefault` before Radix's toggle). Both popovers use `updatePositionStrategy='always'` so they follow the pin; the draft's `onInteractOutside` ignores its own pin.

**Why:** without `preventDefault` on `pointerdown`, the button takes focus from the comment box, the draft popover re-renders and the pin is replaced under the pointer: the drag stops after one move and the typed text loses its caret. Without the cancelled click, dropping a pin would also open or close its thread. Radix's default position updates don't notice a `left`/`top` change, so the popover would stay behind.

**How to apply:** check on `--review-ready`: "Add comment", click the phone, drag the new pin 80px: the box follows and keeps focus; type and Enter; drag the posted pin: it moves and stays closed; click it: it opens.

---

## The idea's comment layer is as tall as the idea (`sparks/review/review-panel.tsx`: `IdeaCommentLayer`)

**Rule:** `IdeaCommentLayer` passes `fill={false}` to `PrototypeComments`, so its wrapper and content are as tall as the idea (`relative`, `isolate`), not `h-full`. The prototype keeps `fill` (default `true`): the device fills its panel.

**Why:** in a scrolling card (`overflow-y-auto p-8`), an `h-full` layer stopped at the card's height while the idea ran past it, so the card's 32px bottom padding sat mid-content and the last part ("What comes later") touched the card's bottom edge (the reviewers' page).

**How to apply:** check on the reviewers' page (`published-idea--default`): scrolled to the end, 32px below the last part, as on the sides.

---

## Expanding rows keep their spacing inside (`overlays/share-popover/share-popover.tsx`: `ExpandRow`, `ExpandBlock`)

**Rule:** a row that opens or closes with Expand (`expandVariants`, height 0 ↔ auto) has no padding or margin that sets the space around it on the animated element itself: the space goes on a wrapper inside it (`ExpandRow` `space='pt-3'`, the first row's taken off with `[&:first-child>*]:pt-0`); a block that also needs the column's gap taken back uses `-mt-2` on the animated element and `pt-2` inside.

**Why:** with `box-sizing: border-box`, an element at `height: 0` is still as tall as its padding, so the 12px between rows appeared at once when a row came in and vanished at once when it left (a 12px jump in Share's lists, measured frame by frame); inside, it opens and closes with the row.

**How to apply:** check on `--review-ready`, Share: add a recommended reviewer, then remove them: "View recommended reviewers" moves smoothly, no step over ~8px between frames.

---

## Changing an answer (`sparks/workspace/workspace.tsx`: `ChangingAnswer`, `onAnswerChange`)

**Rule:** with `onAnswerChange`, each of Dana's messages in Plan's conversation that answers a confirmed question card (the reply before it has a `suggestion` with `confirmed`, and the message isn't "Not quite") gets a pencil inside its bubble: `UserMessage` `flex items-end gap-2`, the text in a `min-w-0` span, then a `size-5` button (`-me-1 mb-0.5`, a 16px `Pencil`, `text-icon-muted`, `hover:text-icon`, `data-change-answer`, `aria-label` "Change answer: {question}") in a Tooltip above it (`side='top'`), "Change answer". Selecting it hides that bubble (`message.id === changing?.answerId` returns null) and gives that reply `changing`: `ChangingAnswer` shows "Changing your answer" (sm muted) and "Keep my answer" (Button `link`, brand color, `h-auto p-0 text-sm font-normal`) on one row, then the `ClarificationCard` with Sparks's first answer (`suggestion.suggested ?? text`), its `quickReplies`, and `selectedReply` (the reply she picked, a check via `QuickReplies` `selected`). While changing, `showQuickReplies` is false on the latest reply, so one set of replies (and Enter) is active.

**Why:** the tooltip goes above, an exception to "Icon buttons have a tooltip" (below), because the user asked for it, as in archie-ucl. With two sets of replies on screen, both `QuickReplies` would take Enter (`useEnterShortcut`), and Enter would answer the wrong question. The bubble hides so the question reads as reopened in place, as in archie-ucl's "Change answer". `suggested` is stamped by the story on each new reply (`setMessages`), because answering replaces `text` on the card; without it, the card shown again would show her old answer as Sparks's.

**How to apply:** check on `--steps-reached`: 10 pencils; the pencil on "Which result matters most?" opens the card with "Yes, that's right" pressed; "Repeat purchases instead" updates the bubble and "What success looks like" and adds Sparks's "Want me to update the prototype to match?"; Esc (or "Keep my answer") puts focus back on the pencil.

---

## Sparks Project header (`navigation/app-header/app-header.tsx`, `navigation/step-nav/step-nav.tsx`)

**Rule:** sparks.ds "header-autopartshub" → "Sparks Project" (32:1145): on the left, ~~only the concept's name~~ the back button (114:1345: Button `neutral`, `size='icon'` with `size-8 rounded-button-md [&_svg]:size-4`, 32px, 12px corners, a 16px `ArrowLeft`; `aria-label` and tooltip "All ideas", `onClose`), then 16px later (`gap-4`) the concept's name, ~~2xl semibold (24/32, `Typography size='2xl'`)~~ ~~xl semibold (20/30, Figma "xl -semibold")~~ ~~xl bold (20/30, `Typography size='xl' weight='bold'`, Figma 39:1671)~~ 2xl bold on a 30px line (24/30: `Typography size='2xl' weight='bold'` with `leading-[30px]`, Figma 39:1671 `font-size/2xl` with `line-height/xl`; the rename field `text-2xl leading-[30px]`, so nothing moves; the reviewers' page name the same, without the underline). Then the status, `IdeaStatusBadge` (Badge flat `xs`: 24px, 14px medium; Figma 124:1752), 12px after the name (`-ms-1` on the 16px gap; Figma 79:7175 gap 12) in `text-foreground` (Figma colors/foreground/foreground, not prominent), with a dotted underline 5px under the text (`underline decoration-dotted decoration-from-font underline-offset-[5px]`; the Roll's clip has `pt-1 pb-2` with `-mt-1 -mb-2` so the line isn't cut) and no chevron (`ConceptName`: the `h1` holds a button that opens the rename field, ~~tooltip "Rename"~~ no tooltip (`aria-description='Rename'` for screen readers), with `cursor-text`, not the pointer: it's text she edits; ~~a `DropdownMenuTrigger`; menu "Rename", "All ideas"~~; the field ~~is `text-xl font-bold text-foreground` too~~ has no box: no border, background, padding or ring, `h-[30px] leading-[30px]`, the same dotted underline and `field-sizing-content`, so it sits exactly where the name was and nothing moves; ~~it opens with the caret at the end (`setSelectionRange(end, end)`), not the name selected~~ it opens with the whole name selected (`select()` on focus), so typing replaces it). Once she's renamed it, or as soon as what she's typing in the field differs from the default (`draft`, updated by the field's `onChange`, not the saved `shown`), "Use default name" sits after the name (sparks.ds 114:1444: lucide `Undo2`, 18px, `text-icon`, a 32px ghost icon button, tooltip "Use default name: {name}"), ~~`opacity-0` until the name's group is hovered (`group-hover/name:opacity-100`) or it has keyboard focus~~ ~~mounted only while the name's group is hovered or has keyboard focus (`hovered`/`focused` state; focus counts only when `:focus-visible`, so the focus put back on the name after a rename doesn't show it)~~ ~~always there while the name isn't the default (`renamed`, no hover or focus state)~~ mounted only while the name is being edited and isn't the default (`editing && renamed`), after the field: pressing it doesn't blur the field (`onMouseDown` `preventDefault`), focus moving between the field and it keeps the field open (`leftEditing`, by `relatedTarget`), and anywhere else saves what she typed. Why: outside editing it was noise next to every renamed idea's name. It fades in and out (`fadeVariants`) ~~when she renames it and out on "Use default name"~~ (`fadeVariants`, `AnimatePresence initial={false} mode='popLayout'`, the group `relative`), and the status badge after it slides to make room and back (`motion.span layout="position"`, `layoutSpring`; no `layout` with reduced motion). ~~Without hover, the badge stays 12px after the name, renamed or not.~~ While the arrow shows, the badge sits after it; otherwise 12px after the name. Why: a hidden button that kept its 32px left a gap the badge didn't have before the rename. ~~The Sparks logo (`h-[26px]`) before it, back to the start page, 16px apart.~~ No logo: ~~"All ideas" is~~ the back button is the way back; the steps centered; on the right, 12px apart (`gap-3`): Comments (`HeaderIconButton` `dot`: an 8px `bg-(--sky-500)` dot at the top right, Figma's #0f9efe Ellipse), notifications, ~~who has access (`AccessAvatars`, only once someone besides the owner has access: up to three 36px avatars, `border-2 border-background`, `-ms-[7px]`) and Share 8px apart (`gap-2`)~~ Share, with no avatars beside it (who has access is in Share's popover; `AccessAvatars` is gone) last. Share is Button Outlined lg · 36, ~~with a 16px icon (`Share`)~~ its label alone, no icon (sparks.ds 39:1608): `headerButtonClasses` in `workspace.tsx`, `px-3.5` (14px each side), ~~`gap-1.5 ps-2.5 pe-3.5`~~. No close button, ~~no back button,~~ no avatar. Every header in the set is 92px tall (28 + 36 + 28). "All ideas" goes back to the start page, in the same tab (prds/sparks.md, "The concept workspace"). A resync from an older Figma screen must not bring back the logo, the symbol, the ×~~, the back button~~ or the avatars beside Share, or the chevron menu on the name. The start page follows "Sparks" (32:1146): the Sparks logo, 26px tall (`<Logo className='h-[26px]' />`), then on the right comments, notifications and the avatar (`HeaderActions` with `comments`; the AutoPartsHUB shell's has no comments: `HeaderIconButton`s, ghost, 36px, an 18px icon, then `<Avatar size='lg' className='size-9'>`, 36px), 12px apart: AppHeader's right side is `gap-3` (every variant's "Right" gap 12), its left side `gap-4`.

~~**Rule:** Sparks → "Sparks Project" (node 27:1932; sparks.ds "header-autopartshub" → "Sparks Project", 39:1598): on the left, the Sparks symbol (`<Logo variant='symbol' className='h-[27.137px]' />`, 34×27, Figma's instance size), a button back to the start page (`aria-label='Sparks home'`), then the concept's name, 16px apart (`gap-4`); the steps centered; on the right a close button (×) and, Share from Review in every step. No back button and no avatar. Every header in the set is 92px tall (28 + 36 + 28). The symbol and the × both go back to the start page, in the same tab (prds/sparks.md, "The concept workspace"). A resync must not bring back the back button or the avatar, and must not replace the symbol with the wordmark (`Logo`'s default) or round its height to `h-7`. The start page follows "Sparks" (node 32:1146): the Sparks logo, 28px tall (`<Logo className='h-7' />`), then on the right comments, notifications and the avatar (`HeaderActions` with `comments`; the AutoPartsHUB shell's has no comments: `HeaderIconButton`s, ghost, 36px, an 18px icon, the close button's style, then `<Avatar size='lg' className='size-9'>`, 36px), 12px apart: AppHeader's right side is `gap-3` (every variant's "Right" gap 12), its left side `gap-4`. The concept's header, right side: "Concept", then who has access (`AccessAvatars`, only once someone besides the owner has access: up to three 36px avatars, `border-2 border-background`, `-ms-[7px]`) and Share 8px apart (`gap-2`), then Comments (`HeaderIconButton` `dot`: an 8px `bg-(--sky-500)` dot at the top right, Figma's #0f9efe Ellipse), notifications and ×, no back button, because Sparks opens in its own tab (prds/sparks.md, "Reaching Sparks"). A resync must not bring the back button back from an older Figma screen. The variant's optional Share button (`showShareButton`, off by default) isn't used on the start page.~~

1. **Centered steps:** `AppHeader`'s `nav` sits between two sides that each take `flex-1` (`min-w-0`), so the steps stay centered on the page whatever the logo and actions measure (Figma "Left"/"Right" are `flex 1 0 0`). Without `nav`, the header keeps its plain space-between layout.
2. **Step pills (`StepNavItem`):** `h-9 rounded-full border border-transparent px-3 text-base font-medium`, 6px apart (`gap-1.5`). Current: `bg-linear-to-b from-(--sapphire-400) to-(--sapphire-500) text-brand-foreground`, the sapphire gradient from Sparks → "Sparks Project" (27:1932; Figma draws it with raw `#4c8dff` → `#0063f7`, which are exactly those two steps). Others: `bg-neutral-muted text-foreground`. A step not reached yet is `disabled` (links: `aria-disabled`): `text-muted-foreground` (sparks.ds "Sparks Project", 39:1598: `colors/foreground/muted`; ~~`text-foreground-subtle`~~), no hover, no click. Hover (not in Figma): `color-mix(… neutral-muted 92%, black)`, only on steps that can be selected. ~~⚠️ sparks.ds's "header-autopartshub" component still draws the current pill dark (`tone/neutral`) with foreground text on every step: the screen's look was chosen over it, so a resync from that component must not bring the dark pill back.~~ sparks.ds's component now draws the sapphire pill too. It shows a new concept, so its other steps are the not-reached look; a step already reached keeps `text-foreground`, which Figma doesn't draw.
3. **~~Back button and~~ Share** uses Button `outline` as is (~~with header-only overrides~~; "Button shape and spacing"). **Publish**, last, on Review only ("One dark button per step"), is Button `neutral` (dark) as is. Unavailable, it stays dark at 50% and its reason shows in a tooltip on a focusable wrapper (`span tabIndex={0}`), since a disabled button gets no hover or focus. ~~Back is `h-9 w-[38px]` with an 18px `text-icon` arrow.~~
4. **Close button:** Button `ghost` `size='icon'` (36px) with `text-icon [&_svg]:size-[18px]`: Figma "Button" (Type=Icon, Style=Ghost, lg · 36), radius/button/lg, an 18px × in colors/icon/foreground. `aria-label='Close concept'`.
5. **Concept name:** `Typography as='h1' size='xl' weight='semibold'` (20/30, Figma "xl -semibold") in `text-foreground-prominent`. ~~`size='lg'`~~. Figma uses raw black, not a variable; foreground-prominent is the closest text token.
6. **Avatar (AutoPartsHUB and the Sparks start page):** 36px, `<Avatar size='lg' className='size-9'>` (`UserAvatar`), between Avatar's `default` (32) and `lg` (40); `lg` keeps the larger initial. Not `lg` alone: it makes the header 96px, and Figma's set is 92 throughout.

**Why:** ~~UCL's Button `outline` has 8px corners, no shadow and medium text, so the overrides stay local until Button is synced.~~ Button has sparks.ds's look now. The pills come from Figma's "badge" instances, but they're navigation, so `StepNav` renders a `nav` > `ol` with `aria-current="step"`.

**How to apply:** Done, Skipped and Needs a check marks on the pills aren't in Figma yet (prds/sparks.md, "Step states"); add them to `StepNavItem` when they are. Figma's "Sparks Project" has no "Concept" button yet (prds/sparks.md, "The concept workspace").

---

## No "Comments" on the Sparks start page (`autopartshub/header-actions.tsx`)

**Rule:** `HeaderActions` (the home, the Sparks start page) is notifications and the avatar. "Comments" is only in an idea's header and the reviewers' page. New comments are a `comments` notification, one per idea.

**Why:** sparks.ds "header-autopartshub" → "Sparks" (32:1146) still draws Comments before the bell, but outside an idea there's nothing for it to open (prds/sparks.md, "New comments").

**How to apply:** a resync of the start page's header doesn't bring it back.

---

## Step nav's sliding pill (`navigation/step-nav/step-nav.tsx`)

**Rule:** the gradient pill is one element in the row, moved with `x` and `width` to the current item's `offsetLeft`/`offsetWidth` on `layoutSpring`. Not a `layoutId` in each item, as Tabs. The row is `isolate`, and stacks three layers: every item's gray fill (`before:`, `-z-20`), the pill (`-z-10`), the labels. The current label's color changes `motionDuration.instant` later.

**Why:** the row is centered in the header, so it moves when Comments or Library opens; with a `layoutId` the pill animated that too, sliding after its own label (and `layoutDependency` stopped it from sliding at all). With the fill on the button itself, the pill went over or under the pills in between depending on their order. Without the delay, the label is white on light gray until the pill arrives.

**How to apply:** check Plan → Review and back (the pill passes under every label), and that opening Comments moves the pill and its label together.

---

## Sparks Project background and column (`sparks/workspace/workspace.tsx`)

**Rule:** Sparks → "Sparks Project" (node 27:1932).

- **Background:** `bg-linear-to-b from-background from-50% to-[color-mix(in_srgb,var(--background-subtle)_50%,var(--background))]`: white to the middle, then down to a very light gray at the bottom (Sparks → "Sparks Project", 55:7660). Figma draws the end with raw `#fafafb`, which no token has; half `background-subtle` (`#f5f6f7`) and half `background` is `#fafbfb`, one step away, and follows dark mode. ~~`to-background-subtle` (Figma's earlier `#f5f7f8`)~~. The header has no background of its own, so the gradient runs behind it.
- ~~**With the Concept panel open (no preview):** the conversation and the message box move to a 630px column 24px from the left (`w-[654px] ps-6`, content `max-w-[630px]`), Sparks's replies with no inset and Dana's messages 160px clear on the left (`ps-40`); the panel takes the rest, 40px from the column and 24px from the right and bottom (`flex-1 ps-10 pe-6 pb-6`): 1010 × 1001 at 1728 × 1117, as Figma 55:7660. Beside a preview, the panel stays `w-[440px]` on the right.~~ A panel open with no preview leaves the conversation centered in its 728px column, insets included; the panel is 480px on the right ("Side panels share one frame").
- ~~**Concept panel (`workspace/concept-panel.tsx`):** `rounded-card bg-background-subtle`, a 60px row (`px-[21px] py-3`) with "Concept" (lg semibold, `text-foreground`), then "Jump to a section" (an 18px `Menu`, opening a `DropdownMenu` of the sections under their step) and the close button (an 18px `PanelRight`), both ghost icon buttons, 36px, 12px apart, `opacity-60`, then `px-6 pb-6` around a white card, `rounded-avatar-square` (12px) `p-8`, its sections `gap-10` with an `hr` between them, each a title (lg semibold) 8px above its content. Wide (open in Plan, `wide`), the card has `[&_.text-sm]:text-base`: every 14px line in the sections reads at 16px, Figma's base, while the 440px panel beside a preview keeps 14px. At 480px in every step the sections keep their own 14px (`wide` removed). The sections' components stay `text-sm` (they're also the conversation's compact summaries).~~ The finished plan panel is gone: "Plan becomes a document".
- **Column insets:** with no preview beside it (the conversation centered in its 728px column), Sparks's replies, the introduction included, keep ~~144px clear on the right (`pe-36`)~~ 64px clear on the right (`pe-16`, 664px wide, as Figma's "Sparks Project" 27:1932 draws the reply's text and its card), and Dana's messages ~~144px clear on the left (`ps-36`)~~ 64px clear on the left (`ps-16`, with `UserMessage` at `max-w-full` instead of its 80%, at most 664px), the same inset as the replies'. Beside a preview (Prototype, Evaluate, Review) the column is 480px and has no insets.
- **The conversation beside a preview is 15px:** in the 480px column, every `text-base` inside it reads at 15px (`[&_.text-base]:text-[15px]` on the column, not on each component; ~~14px, `text-sm`~~). 15px has no type token: it's a size between `sm` and `base` chosen for the narrow column, and only the font size changes (the line height stays `text-base`'s 1.5): Sparks's messages, Dana's, the cards and the message box. Centered (no preview), it stays 16px. Larger text (a card's `text-lg` title) keeps its size. One class on the column, so a new part in the conversation follows without its own rule. The same class list takes the 24px above a heading in Sparks's messages down to the 12px between paragraphs (`[&_[data-slot=assistant-message]_p]:mt-0`): in the narrow column it read as a double space. Centered (Plan), it stays 24px.
- **Plan → Prototype eases (MOTION.md → "Step change"):** at rest the classes size the conversation column (`min-w-0 flex-1` centered in Plan, `w-[480px] shrink-0` beside a preview). Only while it shifts (`shift`, set when the two-column layout starts or ends) does a layout effect set its width inline, from `<main>`'s width to 480px (or back), on `easeOutTransition`, then clear the inline width. Meanwhile `<main>` is `overflow-hidden` and the preview keeps its final width (`shift.mainWidth - conversationWidth`, `flex: none`) and fades in, so it's pushed in from the right edge instead of being squeezed. Not for a step's empty state (the conversation is hidden there), and instant under reduced motion. ✗ Don't drive the width with Motion's `animate` prop at rest: it left the column at its content's width in Plan, on the left instead of centered. ✗ Don't use Motion's `layout`: it scales the text while it moves. ✗ Don't pass the column to Motion's `animate` either: it keeps the values it animated on an element and writes them again with the next animation, so a width (or an opacity of 0) from one shift came back in another. `animate(0, 1, { onUpdate })` writes the styles (`draw`), and the effect's cleanup clears them.
- **Every other change of step (MOTION.md → "Step change"; `trading` in `workspace.tsx`):** the preview is a `PreviewLayer` keyed by what it shows (`layerId`) in `AnimatePresence mode='popLayout'`; `custom` says whether the one leaving fades or is hidden at once (`usePresenceData`; without it, the step she left showed for a frame over the next). It fades on top (`z-10`, `inert`). `draw` writes the styles of each part: `glidingPanelRef`, a `bg-background-subtle` panel between the two places (`panelLeftIn`: change it if the panels' widths, gap or sides change), what's in it (`[data-layer-content]`, its `margin-left`), the conversation, the panel on the left, and the phone (`[data-phone]`: `FitPhone`, and Evaluate's screen in focus). The phone is a picture (`pictureOf`, a copy of its markup) gliding over the real one, which follows it and takes over as the picture fades. Two phones crossfading in place, as before, read as a glitch.
  - Cleanup clears only the styles it set: clearing `width` on every element took away the phone's own inline size.
  - The copy keeps the ids inside its `svg`s: without them, the AutoParts logo lost its gradient halfway.
  - The phone's size (`FitPhone`) and Evaluate's stage are measured in a layout effect, before the first paint, and the strip is placed (`track.set`) the first time; a screen that starts at another size or place makes the phone land in the wrong spot.
  - Check at 1516px, Prototype → Evaluate: the panel's left edge goes 480 → 766 with its right edge at 1492 in every frame, only one phone shows at a time, and afterwards no inline style is left on `<main>`'s children.
- **No scrollbar flash on the way to Prototype:** the new reply's `minHeight` is the view less her message (`sentHeight`), and her message is measured with a `ResizeObserver` (`sentId` effect), not once when it's sent: "Generate a prototype…" fits one line in Plan's wide column and wraps to two at 480px, and a height measured once left the conversation 24px taller than the view, so it scrolled and the scrollbar showed, then faded. While `shift` is on, the scroller also hides its scrollbar (`[scrollbar-width:none]`). Check: during the shift, the scroller's `scrollHeight` equals its `clientHeight` (688 at 1720 × 940).

- **Space below Dana's messages:** 32px between her message and Sparks's reply (the list's `gap-4` plus `mb-4` on her `li`), the same as below Sparks's replies. Figma's "Sparks Project" frame (27:1932) shows 16px there; 32px was chosen over it, so each exchange reads as its own block.

**Why:** a resync that reads raw hex would add `#f5f7f8` as a new token or a literal; a resync that copies the frame's 16px gap would undo the 32px chosen below her messages; a resync that reads only the 80% of `UserMessage` would widen the bubbles by 2px and drop the reply inset, so Sparks's text would run the full 728px.

**How to apply:** at 1728px, Sparks's text measures 584px (500 to 1084) and a long message of Dana's 584px (644 to 1228). ~~With the Concept panel open in Plan, the conversation runs 24 to 654 and the panel 694 to 1704.~~ With the finished plan on Plan, the conversation is the 480px column on the left, as beside the prototype.

## Sparks start page concept list (`src/layouts/autopartshub/sparks/start-page/start-page.tsx`)

**Rule:** Figma Sparks → "Sparks" (node 1:2).

- **Above the list:** the title on the left and search with "New idea" on the right, on one row; the tabs 16px under it (`gap-4`); the list 32px under the tabs (`Tabs` `gap-8`).
- **"New idea":** a 16px `Plus` on the left of the label, `gap-1.5 ps-2.5 pe-3.5` (106 × 36, as Figma's 51:5056): Figma's 8px padding plus the icon's 2px gives 10px before the plus, the label's 6px sides give 6px between them and 14px after. Not `px-3.5` (no room for the icon, and 4px too wide on the left).
- **Column names** (Figma "Frame 10121829"): "Idea", "Share with", "Created", "Evaluation", "Status", `text-sm text-muted-foreground`, `px-4 py-[11px]` (42px), `rounded-t-lg`, on `bg-[color-mix(in_srgb,var(--background-subtle)_60%,var(--background))]`. Figma's raw `#f9fafa` is exactly that mix, which follows dark mode. `aria-hidden`: each row is one link, and its cells start with their column name in `sr-only` text.
- **Columns:** one grid for the names and every row, each on it (`col-span-full grid grid-cols-subgrid`): `grid-cols-[408px_repeat(3,minmax(0,1fr))_max-content] gap-x-6`. The idea cell has `pe-8` inside its column: its name and summary are cut 32px before the column ends, 56px clear of "Share with" with the gap, without moving the columns. The first track is 408px because in a subgrid the row's 16px padding sits inside the first column: 16 + 392 + the 24px gap puts "Share with" at 680px at 1728, where Figma's starts (its 400px idea block plus a 16px gap). Then three equal columns (sharing, created, validation), then the status as wide as the list's widest label, left-aligned.
- **Rows:** 96px, `px-4 py-5`, a 1px `border-border` between rows and above the first. The idea cell is the preview and the name with the summary, 16px apart. The preview is `h-14 aspect-[4/3] rounded-[4.667px]` (Figma 74.3 × 56). Without a preview image, the tile is a Sparks logo color at 10% on the background, cycling tangerine, amethyst, clover, citrine: `bg-[color-mix(in_srgb,var(--tangerine)_10%,var(--background))]`. Name `lg semibold`, summary `sm` (foreground, not muted: Figma binds foreground).
- **Status badge:** `flat` at `xs` (24px, 14px text). Tones: Plan `purple`, Prototype `sky`, Evaluate `yellow`, Review `blue`, waiting `amber` (the flamingo palette, Figma's orange-red), advanced `green`, stopped `neutral`.

**Why:** Figma's tile and header colors are raw hex values that are exact mixes of existing tokens; `color-mix` reproduces them without new tokens and follows the theme. Figma splits the row's second half into four equal columns, about 178px each at 1728. A long status ("Waiting for a decision · Nov 18" is about 215px) runs over the column before it in equal columns, so the status column is `max-content` and the other three share what's left (about 168px each); the columns still line up from row to row. Don't go back to equal `flex-1` columns per row, and don't set the first track to Figma's 400px, which puts every column 8px off.

**How to apply:** at 1728px, the column names and the cells start at 264, 680, then about 872, 1063 and 1255. A concept with a prototype shows its preview image in the same box.

---

## Clickable elements show the pointer cursor (`src/styles/theme.css`)

**Rule:** one global `@layer base` rule at the end of `theme.css` gives every enabled clickable element the pointer cursor: buttons, `role="button"`, `role="tab"`, `role="option"`, `role="menuitem"`, `summary`, `label[for]`, `select`, checkboxes, radios and file inputs. Disabled ones keep the default cursor. Links have the pointer already.

**Why:** Tailwind 4's preflight sets buttons to `cursor: default`, so tabs, buttons and the avatar's add button showed the arrow on hover. One rule covers every component and every app, instead of `cursor-pointer` on each.

**How to apply:** don't add `cursor-pointer` to components. A new clickable element that isn't a button, link or one of the roles above gets its role (or is added to this rule). `theme.css` ships to consumers, so the apps' own buttons get the pointer too.


**Exception:** the concept's name in the Sparks Project header (`ConceptName`) is a button with `cursor-text`: selecting it turns it into a field, so it shows the text cursor, like the text it is ("Sparks Project header").
---

## Figma → theme.css token map (`src/styles/theme.css`)

**Rule:** `theme.css` mirrors sparks.ds, and only sparks.ds. Every token comes from a sparks.ds variable, text style or effect style, and its comment in `theme.css` names the source. A token with no Figma variable behind it says so in its comment.

- **Primitives** (`primitives` collection) → `:root` as `--<palette>-<step>` in oklch, with the Figma hex in a comment (`--gray-700: oklch(0.334 0.016 255.63); /* #31373f */`). A palette's base alias (`palettes/sky/sky`) → `--sky: var(--sky-500)`. `colors/white`/`black` → `--white`/`--black`. Primitives aren't exposed as Tailwind utilities: components use semantic roles. The exceptions read a primitive through `var()` where Figma itself binds or draws one with no semantic variable: Badge's yellow and amber, and StepNav's current-step gradient (see their entries).
- **Sparks logo palettes** (`palettes/sapphire`, `tangerine`, `amethyst`, `clover`, `citrine`, `cerulean`): one per color in the Sparks logo, generated in OKLCH with the logo color as the 500 (`--sapphire: var(--sapphire-500)`). The other steps follow a Tailwind-like lightness curve, with chroma tapering at both ends and clamped to sRGB; darker citrine and tangerine steps lean slightly warmer so they don't turn olive. Keep the 500s equal to the logo's hex values. The specimen is sparks.ds → "Colors" → "Sparks logo palettes" (node 47:87).
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
- `--info-emphasis`: sparks.ds renamed `colors/tone/info/emphasis` to `colors/tone/info/prominent` (and added `info/defined`). `--info-prominent` and `--info-defined` mirror them; `--info-emphasis` stays as an alias of `--info-prominent` so code that uses it doesn't break. Remove it in a major version.

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
