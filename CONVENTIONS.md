<!--
Created: Nov 9, 2026
Created by: Julio Caunedo
Last updated: Nov 18, 2026
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
- `[ID…]` cites the requirement or ticket IDs the change serves (see "IDs"). Leave it out when the work has none.

Examples:

- `feat(button): add the xs size` — `src/components/buttons/button/button.tsx`
- `fix(theme): darken muted-foreground for contrast` — `src/styles/theme.css`
- `docs(prds): add the sign-in PRD` — `prds/sign-in.md`

## IDs

⚠️ **Set at setup:** where the project tracks its work (Jira, Linear, a requirements spec…), the ID prefixes it uses, and whether PRDs here mint their own IDs. `ucl-setup` asks and fills this section.

- **Referenced here, never minted here:** IDs whose source of record is outside the repo (tickets, requirements, decisions). ⚠️ Not set.
- **Minted here:** repo-local PRD IDs (e.g. `SIGN-` and `SIGN-AC-` for a sign-in PRD and its acceptance criteria). Pick prefixes that never collide with an outside prefix, and list each one here when its PRD is created. ⚠️ None yet.

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

New docs open with this comment block. Update `Last updated:` whenever the content changes:

```html
<!--
Created: Oct 15, 2026
Created by: <name>
Last updated: Oct 15, 2026
Scope: one or two lines on which spec doc(s) this file governs.
Purpose: one or two lines on why the file exists.
-->
```
