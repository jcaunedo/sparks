# Motion System

How motion is designed and built in this library: principles, the named patterns, component guidance, accessibility and validation.

**This file holds the rules, not the values.** Adjust motion values (tokens, durations, easings, springs, distances, variants and patterns) in the code, in `src/lib/motion/`. Storybook shows the current values under Foundations → Motion. Rules for one specific component's motion live in [DESIGN.md](DESIGN.md).

Use Motion for React from `motion/react`. All motion values come from `src/lib/motion/`. Use those exports; don't write raw durations, easings or distances in components.

Motion explains a change in state, preserves spatial continuity and keeps the interface responsive. Don't animate for decoration. If an animation doesn't improve clarity, feedback, orientation or perceived speed, leave it out. When unsure, choose the more subtle option.

## Personality

Calm, refined, natural, responsive. Never bouncy, cartoonish, mechanical or distracting.

- **Prefer:** fade, soft scale, gentle elevation, short directional slide, crossfade, shared-element transition, smooth layout transition, subtle stagger.
- **Use sparingly:** rotation under 2°, parallax, scroll-linked movement, expressive springs.
- **Avoid unless asked:** bounce, shake, spin, elastic overshoot, full-screen wipes, dramatic zoom, long travel.

## Tokens (`src/lib/motion/tokens.ts`)

| Token                         | Value  | Use                                    |
| ----------------------------- | ------ | -------------------------------------- |
| `motionDuration.instant`      | 120 ms | Instant feedback                       |
| `motionDuration.fast`         | 160 ms | Hover/press feedback, exits            |
| `motionDuration.normal`       | 300 ms | Standard UI transitions                |
| `motionDuration.slow`         | 500 ms | Panels, overlays, entrances            |
| `motionDuration.deliberate`   | 600 ms | Page-level transitions, auto-scroll    |
| `motionDuration.streamStep`   | 35 ms  | AI messages: average gap between bursts |
| `motionDuration.streamPause`  | 120 ms | AI messages: extra pause after a sentence or item |
| `motionDuration.thinkingStep` | 1500 ms | AI thinking: each line before the next; a reply waits about this long per line |
| `motionDuration.thinkingHop`  | 600 ms | AI thinking: one hop of the dot (it changes color as it lands) |
| `motionDuration.thinkingShimmer` | 7200 ms | AI thinking: the line's gradient once through the six logo colors |
| `motionDuration.assembleWireframe` | 700 ms | Assemble: the wireframe's blocks, one after another |
| `motionDuration.assembleFill` | 1200 ms | Assemble: the real pieces replacing them |
| `motionDuration.glideScroll`  | 1200 ms | A long auto-scroll meant to be watched ("Add Plan") |
| `motionDuration.tooltipDelay` | 1000 ms | Every tooltip: the pointer's rest before it shows (keyboard focus: at once) |
| `motionDistance.hover`        | 3 px   | Lift                                   |
| `motionDistance.subtle`       | 8 px   | Reveal                                 |
| `motionDistance.small`        | 12 px  | Component transitions                  |
| `motionDistance.medium`       | 24 px  | Panels, Glide                          |
| `motionDistance.large`        | 40 px  | Page transitions                       |
| `motionDistance.bounce`       | 6 px   | Bounce: the first hop                  |
| `motionScale.press`           | 0.98   | Press                                  |
| `motionScale.mediaHover`      | 1.03   | Media inside a Lift card               |

Don't go past `deliberate` (600 ms). A new value goes in `tokens.ts` with a comment saying what it's for, never inline in a component.

## Transitions (`transitions.ts`)

- `standardTransition`: common UI changes. Smooth acceleration, controlled deceleration, no overshoot.
- `enterTransition`: elements arriving. Quick start, gentle finish.
- `exitTransition`: elements leaving. Shorter than enter, decisive.
- `glideScrollTransition`: a long auto-scroll meant to be watched ("Add Plan"). `standardTransition` at `glideScroll` (1.2 s), passed to `scrollIntoViewSmoothly`'s `transition`.
- `easeOutTransition`: a layout shifting between two arrangements (Plan → Prototype). Ease-out at `normal` (300 ms): full speed at the start, settles gently.
- `stepChangeTransition` with `stepChangeAt(t)`: Step change, one step's panels giving way to another's. Linear at `slow` (500 ms); `stepChangeAt` gives each part its own curve and moment (`move`, `leave`, `enter`, `side`, `settle`).
- `carouselTransition`: Carousel. `standardTransition` at `slow` (500 ms), the same for the screen leaving and the one arriving, so they move as one strip (an exception to "exit shorter than enter").
- `subtleSpring` / `responsiveSpring` / `layoutSpring`: press, direct manipulation, layout and shared-element movement. High damping, no visible bounce.

## Vocabulary

Use these named patterns before inventing new motion. Gesture patterns live in `patterns.ts`, presence patterns in `variants.ts`.

| Pattern  | Use for                                | Implementation                                  |
| -------- | -------------------------------------- | ----------------------------------------------- |
| Lift     | Hoverable cards and surfaces           | `liftPattern`, `liftWithMediaPattern`           |
| Press    | Buttons, cards, direct interactions    | `pressPattern`                                  |
| Reveal   | Content appearing in context           | `revealVariants`                                |
| Expand   | A region opening/closing in place      | `expandVariants` + `useExpandClip()`            |
| Connect  | Shared-element transitions             | `layoutId` + `layoutSpring`                     |
| Flow     | Small groups entering together         | `staggerContainerVariants` + children `revealVariants` |
| Glide    | Directional navigation                 | `slideVariants` (`custom={1 \| -1}`), `glidePattern` |
| Carousel | One screen replaced by the next or the one before, as a strip (the prototype's arrows) | `carouselVariants` (`custom={1 \| -1}`, also on `AnimatePresence initial={false} mode="popLayout"`), in a clipping container; each moves its own full width on `carouselTransition` (`standardTransition` at `slow`), the leaving and arriving screens together; reduced motion: `fadeVariants` |
| Dismiss  | Content removed or closed              | `dismissVariants`; table/list rows: `rowRemoveVariants` |
| Confirm  | Lightweight success feedback           | `confirmPattern`                                |
| Feed     | A live list that keeps growing (the assistant's activity feed) | `feedItemVariants` with `AnimatePresence mode="popLayout"` and `layout` (`layoutSpring`) |
| Draw     | A stroked mark drawn on as it appears (a feed step's check) | `drawVariants` on a `motion.path`; reduced motion: `iconSwapReducedVariants`. A whole line (`SectionDivider`): `lineDrawVariants`, uncovered left to right over `deliberate`; reduced motion: it's just there |
| Bounce   | Something landing in what a small icon opens (Sparks's "Library") | `bounceVariants` from animation controls (`start("bounce")`): two hops, `motionDistance.bounce` (6px) then half, over `deliberate`; once per change, never looping. Asked for explicitly: an exception to "avoid bounce", only for this. Reduced motion: `bounceReducedVariants` (a dip in opacity) |
| Pending  | Work in progress on an element's behalf | `pendingIconVariants`, `pendingSurfaceVariants` |
| Roll     | One line of text replaced by another in place (a name that changes) | `rollVariants`: the old moves up and out (`exitTransition` at `normal`), the new comes up from below a beat later (`enterTransition` at `deliberate`, after `fast`), about 0.75s in all, slow enough to notice, both in one grid cell of an `overflow-hidden` container, `AnimatePresence initial={false}`, keyed by the text, with `text-start` on the container (inside a button, text is centered, and the shorter text would drift while both share the cell); reduced motion: `fadeVariants` |

Plus `fadeVariants`, `overlayVariants` (scrims), `panelVariants` (drawers) and `iconSwapVariants` (one small element replacing another in place).

## Component guidance

- **Buttons:** press scale 0.98, fast release, never delay the action for the animation, never animate dimensions.
- **Share's lists** (`SharePopover`, `ExpandRow`): someone added leaves "Recommended reviewers" and comes into "Who has access" with Expand, both at once, and the reverse when they're removed; the last recommended one added, the whole section closes the same way. The space between rows is inside each row, on a wrapper (an animated element can't shrink below its own padding, so padding on it would jump). Rows shown when Share opens don't animate. Reduced motion: at once.
- **Share's recommended reviewers** (`SharePopover`): "View recommended reviewers" opens and closes the list with Expand (`expandVariants` + `useExpandClip`; the 8px above it inside the moving part, `-mt-2` taking back the column's gap, so nothing jumps), and its chevron swaps up and down (`iconSwapVariants`); "Add all" fades in and out with the list (`fadeVariants`). Reduced motion: at once.
- **Sparks Project header's name:** "Use default name" fades in when the name opens for editing, once she has renamed it (`fadeVariants`), and the status badge after it slides over to make room (`layout="position"`, `layoutSpring`), then back as it fades out (`popLayout`). The same slide follows a new name rolling in. Reduced motion: it shows and moves at once.
- **Cards:** Lift on hover, media scale up to 1.03, no motion on non-interactive cards.
- **Inputs:** motion clarifies focus, validation and conditional fields. Keep layout stable. No shake.
- **Menus/dropdowns:** short fade plus a small movement from the trigger.
- **Dialogs/overlays:** `AnimatePresence`, overlay fade, small surface movement, exit shorter than entrance. Usable immediately.
- **Tabs:** active indicator via shared `layoutId`.
- **Step nav** (`StepNav`): the current step's pill slides between steps like the tabs' indicator, on `layoutSpring`, measured inside the row instead of a shared `layoutId` (DESIGN.md → "Step nav's sliding pill"); the label turns white as it arrives (`motionDuration.instant` later). Reduced motion: it switches.
- **Lists:** `AnimatePresence` with stable unique keys (never the index). Don't replay entrances on routine data updates.
- **Loading:** subtle opacity pulse. No aggressive or high-contrast loaders.
- **AI messages:** a new message from Sparks streams in like a reply being written (`AssistantMessage`'s `stream`, `useStreamedText` in `src/lib/motion/stream.ts`): bursts of one to three words around `streamStep`, `streamPause` after a sentence, paragraph or list item, and a soft blinking caret (Pending, `pendingSurfaceVariants`) at its end. Bold and lists never show half-written: it streams the plain text and cuts the formatted blocks to it. A message already in the conversation (a reopened concept) shows whole, and sending while one streams shows the rest at once. Under reduced motion it appears whole, with no caret. The same timing as intercept-ucl's AI answers.
- **AI thinking** (`ThinkingIndicator`, `chat/thinking-indicator`): a 10px dot hops `motionDistance.thinkingHop` (6px) per `thinkingHop`, squashing to `motionScale.thinkingSquash` as it lands (from its bottom), and takes the next Sparks logo color (sapphire, tangerine, amethyst, clover, citrine, cerulean) on each landing: one hop per mount, `onAnimationComplete` advances the color. The line's gradient of the six logo colors (a tile six lines wide, one line per color, starting and ending sapphire) moves left to right, one tile per `thinkingShimmer`, linear, so the text's colors rotate in the logo's order, like the dot. Each line shows for `thinkingStep`, then the next slides up `motionDistance.subtle` (`fast`); the last stays. Reduced motion: the dot still and sapphire, the gradient in place, lines fade.
- **AI work, step by step** (`ActivityFeed`, `chat/activity-feed`): the status is `ThinkingIndicator`; under it the latest five steps (Feed), a check drawn on as each finishes (Draw), the thinking dot at 6px on the one in progress. Done, it folds to one line that opens the steps (Expand). The same as archie-ucl's. Reduced motion: steps fade, no `layout`.
- **The concept's name** (`ConceptName`, `sparks/workspace/workspace.tsx`): Roll whenever it changes: "New idea" rolls up and out as Sparks's name for the concept comes up from below, and the same when Dana renames it (the field closes on the old name, which then rolls to hers). Not on the first render.
- **"Add a note" in Publish** (`PublishPopover`, `overlays/publish-popover`): the note's field opens and closes with Expand (`expandVariants` + `useExpandClip()`), the 16px above it inside the expanding part, so the popover grows and shrinks smoothly; the field takes focus as it opens. Reduced motion: it appears and goes at once.
- **Share's recommended reviewers** (`SharePopover`'s `RecommendedRow`, `overlays/share-popover`): while a row is hovered, or its circle-plus has keyboard focus, the outline circle-plus gives way to a solid one in the link color (`iconSwapVariants`, the two icons overlapping in place). Reduced motion: `iconSwapReducedVariants`, at once.
- **Side panels** (Comments ↔ Library in `SparksWorkspace`, while one is open): the column stays put and only its content changes: a crossfade (`fadeVariants`, `AnimatePresence initial={false} mode="wait"`, keyed by the panel), the one leaving fading out on `exitTransition` (160ms), then the other fading in on `standardTransition` (300ms). No slide: it's the same column, not a new one. Opening or closing the column keeps `panelVariants`. Reduced motion: it switches at once.
- **Library** (the folder in Sparks's header, `SparksWorkspace` `library.addedKey`): Bounce as something Dana gave Sparks in the conversation (a file, a link, notes, the app's address) lands in it. Not on load, nor for what she adds, removes or undoes in the panel.
- **Agents on the prototype** (`EvaluationPrototype`, `sparks/validate/evaluation-prototype.tsx`): the strip of screens slides to the one in focus on `layoutSpring` (`motionDuration.deliberate` between screens while it runs); the others scale to 0.86 and fade on `standardTransition` at `slow`. Only agents at work show: each comes in from the nearer side and fades out (`standardTransition`) when it's done there. Each has a temperament (`temperamentOf`): its own spring (stiffness 45 to 190), how many places it glances at first, how long it hovers and how much its hand wanders, and how long it stays (× `motionDuration.thinkingStep`), from its situation or role, else seeded from its id; arrivals on a screen fall within about a second (`motionDuration.slow` × 0.8, plus up to 400ms for the slowest), quicker agents first. No long pauses: an agent glances around (at most twice) only when it arrives, hovers (at most 600ms) only at its last place on the screen, and stays `thinkingStep` × its dwell × 0.6 (× 0.25 on the way). Experts move along what they read; screen reader and keyboard agents are a focus ring that jumps (`travel` spring). A customer's tap is a ring growing and fading (`deliberate`); a note fades up `motionDistance.subtle`; a marker drops from `motionDistance.medium` above on a short bouncy spring. Reduced motion: agents fade in where they work, no taps, everything jumps, markers just appear.
- **The prototype's arrows** (`PrototypePanel`, `sparks/prototype/prototype-panel.tsx`): Carousel. The next screen comes in from the right as the one shown leaves to the left (the other way going back), across the panel's full width, behind the arrows. Asked for explicitly, so it's an exception to "avoid long travel". Switching the audience or the device doesn't slide. Reduced motion: a crossfade.
- **Assemble** (`BuildingScreen`, `sparks/prototype/building-screen.tsx`): a prototype screen being built, from blank: a gray block where each piece goes, one after another over `assembleWireframe`, then each replaced by the real piece, top to bottom, over `assembleFill` (Reveal). Reduced motion: the screen shows whole.
- **Sparks's replies** (`SparksReplyView` in the workspace): where a section of Plan ends inside one, the divider draws (Draw), Sparks thinks below it, then the next section comes in; first Sparks thinking (`ThinkingIndicator` with the reply's `thinking` lines) for about `thinkingStep` per line, then the parts in order: text streams, a card Reveals (`revealVariants`), and each waits for the one before it to finish. Quick replies Reveal once it's done. Under reduced motion everything appears at once after the thinking.
- **Step change** (Sparks's workspace, Plan → Prototype and back): the conversation eases between the full width and its 480px column on `easeOutTransition`, while the prototype, at its final width, is pushed in from the right edge and fades in. **Every other change of step** (Prototype ↔ Evaluate ↔ Review, Plan ↔ Evaluate or Review, and a step not reached yet, such as "See what holds up") is one 500ms move (`stepChangeTransition`, each part's progress from `stepChangeAt`): the panel on the right glides from one place to the other, and the phone with it, changing size on the way; what leaves clears in the first third (the conversation to the left), then what's new fades in, the panel on the left coming in from the left last. Nothing shows over something else: one phone, one text at a time. When the two steps show different screens, the phone's content changes as it lands. Evaluate opens with its screen in the middle and its finding in view already; its strip and its list don't slide in. Reduced motion: it switches at once. The code contract is in DESIGN.md → "Sparks Project background and column".
- **"Add Plan"** (the "+" menu, `SparksWorkspace`'s `glideToLatest`): the conversation opens at the introduction and scrolls down to the directions' "Next, pick the path to prototype first." (`scrollIntoViewSmoothly`, `align: "start"`, `transition: glideScrollTransition`, 1.2s: slow enough to see the Plan go by, an exception to the 600ms cap), interruptible like the scroll to a new reply. Reduced motion: it starts there.
- **A concept reopened** (`SparksWorkspace`, opened with history): the conversation fades in at its top (`fadeVariants`), then glides down until its end sits in the middle of the view (`scrollIntoViewSmoothly` on the half-view space under it, `align: "end"`, `transition: glideScrollTransition`, 1.2s), interruptible. Nothing streams or thinks again. Reduced motion: at its end at once, no fade.
- **Scrolling to a new reply:** when Dana sends, the conversation scrolls (`scrollIntoViewSmoothly`, `align: "start"`, on `scrollTransition`) so her message sits at the top of the view, and the reply comes in below it without the view following it. Any wheel, touch, click or key stops the scroll, from the frame after it starts (the Enter that sent the message mustn't stop it). Reduced motion: it jumps.

## Layout and presence

- Use `layout` for size/position changes and `layoutId` for shared elements. Don't hand-compute positions Motion can manage.
- Use `AnimatePresence` only for mount/unmount. Its direct children need stable unique keys.
- Animate `opacity` and `transform` by preference. Avoid continuously animating `top`/`left`/`margin`/`padding`/`box-shadow`.
- Never animate the same property with CSS and Motion at once.

## Accessibility

Always respect reduced motion: use `useMotionPreference()` and its `resolve()` helper. Under reduced motion:
- Remove nonessential transforms, parallax and large movement.
- Prefer opacity.
- Keep state-change feedback: it becomes near-instant (`reducedMotionTransition`), it doesn't disappear.

Motion is never the only signal of a state change. Keyboard behavior, focus order and visible focus must survive every animation.

## Validation

After motion work, check that:
- The build passes.
- There's no flash or layout shift.
- Exits complete.
- Rapid repeated interaction doesn't break state.
- Reduced motion works.
- Nothing blocks clicks, scrolling or navigation.
