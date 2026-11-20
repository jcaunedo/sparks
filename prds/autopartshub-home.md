<!--
Created: Nov 20, 2026
Created by: Julio Caunedo
Last updated: Nov 20, 2026 (Created)
Scope: the AutoPartsHUB home screen (`AutoPartsHubHome`) and the app frame it sits in (`AutoPartsHubShell`): header, welcome, tabs and the user's apps.
Purpose: defines what a signed-in user sees and can do on AutoPartsHUB's first screen, and records what's still undecided for the tabs that aren't designed yet.
-->

# AutoPartsHUB home

**Location:** the first screen after signing in to AutoPartsHUB.
**Audience:** AutoPartsHUB team members who use one or more of the apps (Pulse, Sparks, Flow, Sales, Care).
**Description:** a start page that welcomes the user and opens each app they have access to.
**Source:** `src/layouts/autopartshub/home/home.tsx`, inside `src/layouts/autopartshub/autopartshub.tsx`
**Figma:** Sparks "AutoPartsHUB" (7:1021)
**Status:** "My apps" is designed and built. "Knowledge" and "Connections" are not yet designed.

---

## Purpose

People at AutoPartsHUB work across several apps. Home is where they start: it greets them by name and puts every app they can use one click away, so they don't need to remember separate addresses.

ℹ️ How each card looks and behaves when hovered or focused is the app card's own behavior, the same everywhere it appears.

## The header

The header shows on every AutoPartsHUB screen.

- The AutoPartsHUB logo, on the left.
- The user's profile photo, on the right. With no photo, it shows the first letter of their first name on a colored circle. The same person always gets the same color.

🙋 **Open question:** what the profile photo does when selected (an account menu, sign out). Until it's decided, it isn't interactive.

## What it shows

In order, top to bottom:

1. "Welcome back, {first name}", for example "Welcome back, Dana".
2. "Connect with the tools, knowledge, and intelligence that power your work."
3. Three tabs: "My apps" (selected when the page opens), "Knowledge" and "Connections".
4. The selected tab's content.

## My apps

One card per app the user has access to. Each card shows the app's logo and a one-line description of what it's for:

| App | Description |
| --- | --- |
| Pulse | "Business performance, analytics, and AI-powered insights." |
| Sparks | "Transform ideas into tangible, testable solutions." |
| Flow | "Monitor operations, fulfillment, and distribution performance." |
| Sales | "Track sales performance, revenue, and growth opportunities." |
| Care | "Manage customer support, service quality, and escalations." |

- Selecting a card opens that app. Screen readers announce it as "Open {app name}".
- Cards fill the row left to right: three per row on desktop, two on tablet, one on phones.

⚠️ **Assumption:** the apps show in the order above, which is Figma's. Also in Open Questions.

## Knowledge and Connections

Both tabs can be selected, and show an empty panel until their content is designed.

⚠️ **Gap:** neither tab has a design. Their content, and what they show when empty, need one.

## States

| State | What shows | What the user can do |
| --- | --- | --- |
| Apps listed | The user's app cards | Open any app, switch tabs |
| No photo | The first initial in the header | Same as above |
| No apps | Not designed | — |

🙋 **Open question:** what "My apps" shows when the user has no apps.

## On Phones

The header keeps the full logo and the photo. The welcome lines wrap, the three tabs stay in one row, and the cards stack one per row.

## Accessibility

- The welcome line is the page's main heading.
- The tabs follow the standard tab pattern: arrow keys move between them, and the selected tab's panel follows.
- Each card is a single link named "Open {app name}". The logo inside it is part of that link, not a separate image to announce.

## Acceptance Criteria

- Given a signed-in user named Dana, when home opens, then it reads "Welcome back, Dana" and "My apps" is selected.
- Each of the user's apps shows as a card with its logo and description; selecting a card opens that app.
- A user with no profile photo sees their first initial in the header, in the same color on every visit.
- Selecting "Knowledge" or "Connections" switches the tab and shows its (empty) panel; selecting "My apps" brings the cards back.
- Arrow keys move between the tabs.
- On desktop the cards show three per row, on tablet two, on phones one, with no sideways scrolling.

## Open Questions

- 🙋 Which apps does a user see: every app AutoPartsHUB has, or only the ones their role gives them? And in what order? Recommended: only the apps they can open, in the order above.
- 🙋 Does a card open its app in the same tab or a new one? Recommended: the same tab, since home is the starting point and Back returns to it.
- 🙋 What does "My apps" show when the user has no apps?
- 🙋 What do "Knowledge" and "Connections" contain?
- 🙋 What does selecting the profile photo do?
