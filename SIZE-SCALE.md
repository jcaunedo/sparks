<!--
Created: Nov 9, 2026
Created by: Julio Caunedo
Last updated: Nov 21, 2026 (Badge gets `xxs`, 20px, badge only; Badge row; sparks.ds now has a Button set to map)
Scope: the `size` prop and heights of interactive controls in UCL (buttons, and future inputs, selects, toggles, button groups, segmented controls).
Purpose: keep control heights aligned across components, with the base component library and with Figma, under one set of size names.
-->

# Control Size Scale

Controls that sit in the same row (a form, a toolbar, a filter bar) share one set of heights, so a Button next to an Input lines up without either one being adjusted.

Sparks keeps shadcn/ui's step names and heights.

⚠️ **Gap:** sparks.ds now has a "Button" set ("Buttons" page, node 38:94) with five heights: xs 24, sm 28, md 32, lg 36, xl 40. Its names are one step off this scale (Figma's lg is this scale's `default`), and 28 px isn't on it. Decide how the names and the 28 px step map before syncing `Button`. sparks.ds has no Input yet.

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
| `SelectTrigger` | `sm` · `default` | `default` | shadcn's (32 / 36 px). sparks.ds has no trigger yet; its list items are 32 px ("Select / Item"), not a row control |
| `Badge` | `xxs` · `xs` · `sm` · `default` · `lg` | `default` | sparks.ds "badge": xxs 20, xs 24, sm 32, md (default) 36, lg 40; xs to lg match this scale. `xxs` (20px) is badge only, not a scale step: a badge never sits in a row of controls at that size. Not a control, but its heights line up with controls in a row |
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
