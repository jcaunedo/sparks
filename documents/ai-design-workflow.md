<!--
Created: Nov 21, 2026
Created by: Julio Caunedo
Last updated: Nov 21, 2026 (Created)
Scope: how Sparks is designed and built: the AI-assisted workflow across ChatGPT, Claude Code and Figma.
Purpose: answers the assignment's "using an AI platform of your choice", and keeps the tools out of the Sparks PRDs, which stay platform-agnostic.
-->

# AI-assisted product design workflow

Sparks is designed and developed with an established workflow across three tools: **ChatGPT**, **Claude Code** and **Figma**. Together they support product strategy, UX exploration, specifications, visual design and implementation.

The tools assist; the product decisions are mine. It's the same principle Sparks is built on: the expertise and the decisions stay with the person, and AI provides capabilities.

This document covers how Sparks is made. What Sparks does is in the PRDs (`prds/sparks.md` and one PRD per step), which don't depend on any of these tools.

## The tools and what each does

**ChatGPT: product strategy and critique**

- Framing the concept and its positioning: what Sparks is for, who it serves, and how it fits the company's product process.
- Pressure-testing decisions: the steps (from eight to four: Plan, Prototype, Validate, Review), keeping business decisions apart from evidence, how honest the AI evaluation has to be, and what the demo should focus on.

**Claude Code: specifications, validation and implementation**

- **Specifications:** writes and keeps the PRDs current in `prds/`, following the repo's conventions (`CONVENTIONS.md`), with its PRD and copywriting skills.
- **Validation:** checks the PRDs against the design assignment and against each other, and surfaces gaps, conflicts and open decisions for me to settle.
- **Implementation:** turns Figma components into the UCL component library (React, Tailwind, shadcn/ui), reusing the design system's tokens, and records the rules a later edit could undo in `DESIGN.md`.
- **Verification:** type-checks, builds and checks the components in Storybook against the Figma design.

**Figma: visual design and the design system**

- **sparks.ds**, the design system file: tokens, typography and components such as the app card and the prompt composer.
- **Screens and flows** for the AutoPartsHUB workspace and Sparks.

## How they connect

1. **Strategy** (ChatGPT): frame the problem and pressure-test the concept.
2. **Specification** (Claude Code): write the decisions into the PRDs, validate them, and ask me about whatever's still open.
3. **Design** (Figma): design the screens and components the PRDs describe.
4. **Implementation** (Claude Code, reading Figma): build the components and layouts from Figma, with the design system's tokens.
5. **Verification** (Claude Code): check the build against Figma and the PRDs; fixes and new decisions go back into the PRDs and `DESIGN.md`.

The loop repeats per step and per component. Every decision lands in a file in the repo, so the specs, the design system and the code stay in step.

## Where things live

- **Product behavior and decisions:** `prds/`
- **Design rules that protect the build:** `DESIGN.md`, `MOTION.md`, `SIZE-SCALE.md`
- **Components:** `src/components/`, previewed in Storybook
- **Design system:** Figma sparks.ds
- **The assignment brief:** `documents/`
