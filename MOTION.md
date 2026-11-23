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
| `motionDistance.hover`        | 3 px   | Lift                                   |
| `motionDistance.subtle`       | 8 px   | Reveal                                 |
| `motionDistance.small`        | 12 px  | Component transitions                  |
| `motionDistance.medium`       | 24 px  | Panels, Glide                          |
| `motionDistance.large`        | 40 px  | Page transitions                       |
| `motionScale.press`           | 0.98   | Press                                  |
| `motionScale.mediaHover`      | 1.03   | Media inside a Lift card               |

Don't go past `deliberate` (600 ms). A new value goes in `tokens.ts` with a comment saying what it's for, never inline in a component.

## Transitions (`transitions.ts`)

- `standardTransition`: common UI changes. Smooth acceleration, controlled deceleration, no overshoot.
- `enterTransition`: elements arriving. Quick start, gentle finish.
- `exitTransition`: elements leaving. Shorter than enter, decisive.
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
| Dismiss  | Content removed or closed              | `dismissVariants`; table/list rows: `rowRemoveVariants` |
| Confirm  | Lightweight success feedback           | `confirmPattern`                                |
| Pending  | Work in progress on an element's behalf | `pendingIconVariants`, `pendingSurfaceVariants` |

Plus `fadeVariants`, `overlayVariants` (scrims), `panelVariants` (drawers) and `iconSwapVariants` (one small element replacing another in place).

## Component guidance

- **Buttons:** press scale 0.98, fast release, never delay the action for the animation, never animate dimensions.
- **Cards:** Lift on hover, media scale up to 1.03, no motion on non-interactive cards.
- **Inputs:** motion clarifies focus, validation and conditional fields. Keep layout stable. No shake.
- **Menus/dropdowns:** short fade plus a small movement from the trigger.
- **Dialogs/overlays:** `AnimatePresence`, overlay fade, small surface movement, exit shorter than entrance. Usable immediately.
- **Tabs:** active indicator via shared `layoutId`.
- **Lists:** `AnimatePresence` with stable unique keys (never the index). Don't replay entrances on routine data updates.
- **Loading:** subtle opacity pulse. No aggressive or high-contrast loaders.
- **AI messages:** a new message from Sparks streams in like a reply being written (`AssistantMessage`'s `stream`, `useStreamedText` in `src/lib/motion/stream.ts`): bursts of one to three words around `streamStep`, `streamPause` after a sentence, paragraph or list item, and a soft blinking caret (Pending, `pendingSurfaceVariants`) at its end. Bold and lists never show half-written: it streams the plain text and cuts the formatted blocks to it. A message already in the conversation (a reopened concept) shows whole, and sending while one streams shows the rest at once. Under reduced motion it appears whole, with no caret. The same timing as intercept-ucl's AI answers.
- **AI thinking** (`ThinkingIndicator`, `chat/thinking-indicator`): a 10px dot hops `motionDistance.thinkingHop` (6px) per `thinkingHop`, squashing to `motionScale.thinkingSquash` as it lands (from its bottom), and takes the next Sparks logo color (sapphire, tangerine, amethyst, clover, citrine, cerulean) on each landing: one hop per mount, `onAnimationComplete` advances the color. The line's gradient of the six logo colors (a tile six lines wide, one line per color, starting and ending sapphire) moves left to right, one tile per `thinkingShimmer`, linear, so the text's colors rotate in the logo's order, like the dot. Each line shows for `thinkingStep`, then the next slides up `motionDistance.subtle` (`fast`); the last stays. Reduced motion: the dot still and sapphire, the gradient in place, lines fade.
- **Sparks's replies** (`SparksReplyView` in the workspace): first Sparks thinking (`ThinkingIndicator` with the reply's `thinking` lines) for about `thinkingStep` per line, then the parts in order: text streams, a card Reveals (`revealVariants`), and each waits for the one before it to finish. Quick replies Reveal once it's done. Under reduced motion everything appears at once after the thinking.
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
