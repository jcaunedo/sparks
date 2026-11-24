# Explorations

An index of the claude.ai artifacts we publish to review ideas: component states, page concepts, flows, and explorations built from the PRDs and synthetic sample data.

This folder only holds links. It isn't part of the UCL library or the prototype: nothing here is built, type-checked, published to npm, or loaded by Storybook.

**Access:** artifacts are private by default. Share one from its page's Share menu before you send the link to someone.

**Editing:** to change an artifact, give Claude its URL. Claude reads the published page and updates it at the same link. See [notes.md](notes.md) for editing from Claude Code versus the browser.

**Data:** synthetic only. No real customer, user or personal information in any artifact.

## Index

Newest first. Use the **Notes** column for open questions the artifact raised.

| Date | Artifact | What it shows | Built from | Figma | Notes |
| --- | --- | --- | --- | --- | --- |
| Nov 23, 2026 | [Evaluate with Agents](https://claude.ai/artifact/8GF6xtkTScNZXumpZWQVWT) | Evaluate with the prototype kept in view, to connect it with Prototype. Version 2 follows Figma: no conversation, with two equal panels, the prototype ("Add to Review") and the evaluation ("Run"). Each scenario is an agent on the prototype's one device: a tag labeled with the situation, or a focus ring for screen reader and keyboard. The device steps through the journey screen by screen, and the agents waiting their turn sit beside it. A numbered marker shows on the element where a scenario struggled. Findings and markers are linked. Scenarios can be watched again. "Fix this in the prototype" changes the screen in place, then "Run again". A toggle switches between all scenarios at once and one at a time. Version 1, with the conversation and a canvas of every screen, is in the artifact's history | [sparks-validate.md](../prds/sparks-validate.md), [sparks-prototype.md](../prds/sparks-prototype.md), `validate/sample-validate.ts` | [Sparks → Evaluate](https://www.figma.com/design/ShkgoGYA4VmXg8xqfXBZLJ/Sparks?node-id=72-660) | ✅ Built in the workspace story (Evaluate: `ValidateRunning`, `ValidateResults`), on the real prototype: fixes are made in place, the run starts on its own after "Yes, evaluate it", ~~scenarios run one at a time~~ every agent works at once, the scenarios plus four experts (UX expert, Copywriter, Engineer, Data analyst), on a strip of the screens that slides through the journey. ⚠️ With no conversation, where does Dana ask why a scenario failed, ask for another scenario, or describe a change the fix buttons don't offer? ⚠️ Sparks's read ("Ready with changes") added above the hypothesis: Figma doesn't have it yet. |
