<!--
Created: Nov 9, 2026
Created by: Julio Caunedo
Last updated: Nov 20, 2026
Scope: the `size` prop and heights of interactive controls in UCL (buttons, and future inputs, selects, toggles, button groups, segmented controls).
Purpose: keep control heights aligned across components, with the base component library and with Figma, under one set of size names.
-->

# Control Size Scale

Controls that sit in the same row (a form, a toolbar, a filter bar) share one set of heights, so a Button next to an Input lines up without either one being adjusted.

Sparks keeps shadcn/ui's step names and heights.

⚠️ **Gap:** the heights haven't been checked against Figma yet: as of setup, sparks.ds has no Button or Input. Check them when the first control is drawn, and add any height Figma uses that isn't on the scale (see below) before building it.

## Scale

| `size`    | Height | Tailwind | Icon-only square | Role                                     |
| --------- | ------ | -------- | ---------------- | ---------------------------------------- |
| `xs`      | 24 px  | `h-6`    | `size-6`         | Very compact: tags, dense table rows     |
| `sm`      | 32 px  | `h-8`    | `size-8`         | Compact: dense toolbars, inline actions  |
| `default` | 36 px  | `h-9`    | `size-9` (`icon`) | **Default ★**: most surfaces            |
| `lg`      | 40 px  | `h-10`   | `size-10`        | Large / emphasis: hero forms, onboarding |

Use the default unless a density requirement forces otherwise. Don't mix sizes within one row or toolbar.

ℹ️ The heights are shadcn/ui's, value for value, so pasted shadcn code lines up. If setup renames the steps, keep the old shadcn names (`default`, `icon`) as deprecated aliases so pasted code still works, and say so here.

ℹ️ A step Figma draws that isn't on this scale (e.g. 28 px, or 48 px for a main action on phones) needs a decision before it's built: add it to the scale here, or snap the design to the nearest step.

## Component support

| Component | `size` values                    | Default   | Notes |
| --------- | -------------------------------- | --------- | ----- |
| `Button`  | `sm` · `default` · `lg` · `icon` | `default` | shadcn's Button as scaffolded. No `xs` yet |
| `TabsList` | `default` · `lg` | `default` | The list's height; its triggers fit inside (Default: 30 / 34 px inside the 3 px track padding; Line: full height). No `sm` in Figma |
| `Avatar`, `AvatarAdd` | `default` (32 px) · `lg` (40 px) | `default` | ⚠️ Exception: shadcn's Avatar names, not this scale's (here 32 px is `sm` and `default` is 36 px). Avatars aren't row controls, and keeping shadcn's names means pasted shadcn code renders the same size. `default` is the sparks.ds avatar set; `lg` is the header's avatar |

Add a row when a component with a `size` prop arrives, in the same change.

## Rules for a new control

- Use this file's step names and heights for the `size` prop, with the same default. Implement only the steps Figma draws for that control.
- An icon-only variant is a square at the same height (`icon` for the default; `icon-<step>` for the others).
- A component that isn't a control (an Avatar, a Badge) may still use the scale's names when its sizes match these heights.

## Usage

```tsx
// Default (36 px)
<Button>Save</Button>

// Compact row
<Button size="sm">Filter</Button>

// Large / hero form
<Button size="lg">Get started</Button>
```
