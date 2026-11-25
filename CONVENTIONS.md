<!--
Created: Nov 9, 2026
Created by: Julio Caunedo
Last updated: Nov 25, 2026
Latest update: the PRD header's update lines: the date, the latest update with its why, and a short paragraph on the recent ones, rewritten on every change. Why: the old line had grown into a changelog that buried the latest change.
Scope: how this repo's work is branched, committed, versioned, tagged and traced, and how docs under `prds/` are written.
Purpose: keep the team's workflow and writing rules in the repo, so they're the same on every machine and for every person or assistant.
-->

# Conventions

How we branch, commit, version and trace work in this repo, and how PRDs are written. These rules add to the build rules in [CLAUDE.md](CLAUDE.md); where the two overlap, CLAUDE.md wins.

## Branches

One branch per unit of work, named by type:

| Prefix    | For                                                                  |
| --------- | -------------------------------------------------------------------- |
| `feat/`   | A new component, layout, token or capability                         |
| `fix/`    | A bug or a visual correction                                         |
| `chore/`  | Tooling, hygiene, config, repo housekeeping                          |
| `design/` | A design-system change driven by Figma (tokens, component visuals)   |
| `docs/`   | Documentation, PRDs, conventions                                     |

## Commits

Format: `type(scope): summary [ID…]`

- `type` is one of the branch prefixes above (`feat`, `fix`, `chore`, `design`, `docs`), plus `ci` for CI config.
- `scope` is the area touched: a component (`button`), a layout or flow, `theme`, `motion`, `prds`, `repo`…
- `[ID…]` cites the PRD IDs the change serves (see "IDs"). Sparks has no outside tracker, so there are no ticket IDs to cite. Leave it out when the work has none.

Examples:

- `feat(button): add the xs size` — `src/components/buttons/button/button.tsx`
- `fix(theme): darken muted-foreground for contrast` — `src/styles/theme.css`
- `docs(prds): add the sign-in PRD` — `prds/sign-in.md`

## IDs

Sparks has no outside tracker (no Jira, Linear or requirements spec). PRDs mint their own IDs.

- **Referenced here, never minted here:** none. If the team adopts a tracker, list its prefixes here, and keep PRD prefixes from colliding with them.
- **Minted here:** repo-local PRD IDs (e.g. `SIGN-` and `SIGN-AC-` for a sign-in PRD and its acceptance criteria). List each prefix here when its PRD is created. None yet.

## Versioning

SemVer, as CLAUDE.md → "Release & Publishing" defines it: patch = fix or visual tweak; minor = new component, prop, variant or token; major = removing or renaming a component, prop or token, or changing a default. Below 1.0.0, a minor bump is treated as breaking by package managers.

A version bump in `package.json` on `main` **publishes** the package. Bump only through the release scripts (`npm run release:patch|minor|major`), never by hand.

## Tags

- `vX.Y.Z`: a published package version (the release scripts create these).

## PRD writing

Conventions for every doc under `prds/`. When a change settles a product decision, CLAUDE.md → "Keeping PRDs Current" says which PRD to update and how.

### Status labels

Every inline prose note that flags a gap, risk, decision, confirmation or fix gets an emoji **plus a bold word label**, right after the emoji:

- ⚠️ for anything unresolved or needing attention: `**Gap:**`, `**Constraint:**`, `**Risk:**`, `**Decision needed:**`, `**Accessibility:**`, `**Conflict:**`, or a more specific word that fits. Use `**Conflict:**` when new information contradicts a decision a spec already made; `**Gap:**` is for something never resolved.
- 🙋 for an open question: something nobody has answered yet. Each bullet in an "Open questions" list starts with it, and an open question written inline reads `🙋 **Open question:**`. It's a question for someone to answer, where ⚠️ flags a known problem. A table of open questions or decisions keyed by ID needs no emoji.
- ✅ for anything resolved, decided or confirmed. The tag is always `✅ **Resolved:**`, and only that: no date, no who decided, no requirement ID, no other word (`Decision`, `Built`, `Confirmed in Figma`, `Copy fix`…). The note follows the tag; its design rationale, functionality and rules go in that text or in the PRD's sections, never in the tag.
- ℹ️ for purely informative notes, with **no bold label**.

Lists where every line already starts with the same emoji don't need labels.

Each of these tags becomes `✅ **Resolved:**`:

- `✅ **Decision (Nov 9, 2026, user's call):**`
- `✅ **Built in the prototype (Nov 4, 2026):**`
- `✅ **Resolved (Nov 4, 2026, user's call; SIGN-012):**`
- `✅ **Shown only after sign-in (Nov 5, 2026, user's call):**`

**Why:** specs must be scannable for status at a glance. The word names the status, so a reader doesn't rely on the icon alone and doesn't mistake framing text for an open risk. A ✅ tag only has to say that the item is resolved.

### Superseded decisions

When a new decision replaces an earlier one, don't delete the earlier one: strike it through, whether it's a ✅ note (tag and all) or the rule's old text, and write the new decision right after it with `✅ **Resolved:**`. The struck text shows what changed; what follows it is what holds now.

> ~~✅ **Resolved:** the password rules show under the field from the start.~~ ✅ **Resolved:** the password rules show only after a failed attempt.
>
> ~~The session ends after 30 minutes without activity.~~ ✅ **Resolved:** the session ends after 8 hours, whatever the activity.

If that decision is replaced too, strike it as well and add the newest after it, so they read oldest to newest.

**Why:** the PRD keeps track of the decisions that were replaced, next to the rule they changed, so an old decision isn't brought back by mistake.

### Creation header

New docs open with this comment block:

```html
<!--
Created: Oct 15, 2026
Created by: <name>
Last updated: Oct 15, 2026
Latest update: Created.
Scope: one or two lines on which spec doc(s) this file governs.
Purpose: one or two lines on why the file exists.
-->
```

Whenever the content changes, rewrite the three update lines (never append to them):

- **Last updated:** the date only.
- **Latest update:** what changed, and what it improves (when it does), then `Why:` and the rationale or decision behind it (when there is one). A sentence or two.
- **Recent updates:** a short paragraph (two to four sentences) on the most recent earlier updates, for context beyond the latest one. Leave it out until there is an earlier update.

The latest update moves into "Recent updates" when the next one comes, and what's older drops out. Several changes in a day share one "Latest update".

**Why:** the header says at a glance what changed last and why, with a little context. A list that grows with every edit buries that, and repeats what the ✅ notes (decisions) and git (history) already keep.

### This project

The profile the PRD skill (`ucl-generate-prd`) reads before writing a PRD.

- **PRD folder:** `prds/`, flat (no category folders yet). One file per screen, flow or shared rule, named for it (`autopartshub-home.md`).
- **Products and audiences:**
  - **AutoParts Co.:** the company (a national auto parts retailer). **AutoPartsHUB:** its internal workspace. Its team members sign in and open the apps they use. Layouts in `src/layouts/autopartshub/`.
  - **The apps** opened from it: Pulse, Sparks, Flow, Sales, Care. Written by those names in copy (DESIGN.md → "Brand names" for Sparks).
  - **Sparks:** the AI-powered innovation and experimentation platform, for experienced employees who know the business but aren't designers or engineers, shown through Dana's workflow (Senior Product Manager). Its assistant is also called Sparks. Specs come first; no Figma or layouts yet.
  - ⚠️ **Decision needed:** the user roles (who sees which apps, admins vs. members).
- **Shared rules and their owners:**
  - [prds/sparks.md](prds/sparks.md): everything the Sparks steps share: the workspace (the centered conversation, cards and the Concept panel), the four steps (Plan, Prototype, Validate, Review), how Plan moves through its five parts, step states and moving between steps, suggestions, company knowledge (what Sparks may read, how it cites it, and what it does when the data and Dana disagree), evidence and decision status, sharing, Knowledge and Connections, bringing others in, the decision log, and how the Sparks assistant talks and what it may do alone. Plan's parts each have a PRD (`prds/sparks-plan-<part>.md`: problem, clarify, define-success, generate-directions, compare), and so does each later step (`prds/sparks-prototype.md`, `prds/sparks-validate.md`, `prds/sparks-review.md`); they link to it instead of restating it. The decision (reviewers, recommendation, decision owner) is owned by [prds/sparks-review.md](prds/sparks-review.md).
  - The first rule several AutoPartsHUB screens share (permissions, which apps a user sees) gets its own PRD, listed here.
- **Copy:** load `sparks-copywriter` before writing UI copy. Copy quoted from Figma is used as is.
- **Building decisions:** a decision about something already built changes the layout or component in the same change. Try it in Storybook (`npm run storybook`); checks: `npm run lint`, `npm run build`.
- **Screen sizes:** phones, tablet (`md`) and desktop (`lg` and up), with the breakpoints in DESIGN.md → "Breakpoints include their own width".
- **Model PRDs:** [prds/autopartshub-home.md](prds/autopartshub-home.md) (a screen), [prds/sparks.md](prds/sparks.md) (an app overview with an AI assistant).
