<!--
Created: Nov 20, 2026
Created by: Julio Caunedo
Last updated: Nov 23, 2026 (the home has one tab too: "Add from library" goes back to it; an app's card goes to its tab when it's already open, instead of opening another; the second tab is "My library" again; ~~the tabs are "Apps" and "Library", without "My"~~; selecting a notification opens its concept; notifications open a popover, with Unread and All; Sparks's "Add from library" opens the home on "My library"; the "Knowledge" tab is named "My library"; a notifications button in the header, before the profile photo; Cards open their app in a new tab)
Scope: the AutoPartsHUB home screen (`AutoPartsHubHome`) and the app frame it sits in (`AutoPartsHubShell`): header, welcome, tabs and the user's apps.
Purpose: defines what a signed-in user sees and can do on AutoPartsHUB's first screen, and records what's still undecided for the tabs that aren't designed yet.
-->

# AutoPartsHUB home

**Location:** the first screen after signing in to AutoPartsHUB.
**Audience:** AutoParts Co. employees who use one or more of the apps in AutoPartsHUB, the company's internal workspace (Pulse, Sparks, Flow, Sales, Care).
**Description:** a start page that welcomes the user and opens each app they have access to.
**Source:** `src/layouts/autopartshub/home/home.tsx`, inside `src/layouts/autopartshub/autopartshub.tsx`
**Figma:** Sparks "AutoPartsHUB" (7:1021)
**Status:** ~~"My apps"~~ "Apps" is designed and built. ~~"Knowledge"~~ ~~"Library"~~ "My library" and "Connections" are not yet designed.

---

## Purpose

People at AutoParts Co. work across several apps. Home is where they start: it greets them by name and puts every app they can use one click away, so they don't need to remember separate addresses.

ℹ️ How each card looks and behaves when hovered or focused is the app card's own behavior, the same everywhere it appears.

ℹ️ What the Sparks app does once opened: [sparks.md](sparks.md).

## The header

The header shows on every AutoPartsHUB screen.

- The AutoPartsHUB logo, on the left.
- Notifications (a bell), on the right, before the profile photo.
- The user's profile photo, on the right. With no photo, it shows the first letter of their first name on a colored circle. The same person always gets the same color.

✅ **Resolved:** the header has a notifications button before the profile photo (sparks.ds "header-autopartshub", 32:1145), on every AutoPartsHUB screen and on the Sparks start page. A concept's header in Sparks doesn't have it.

~~🙋 **Open question:** what notifications open (a panel, a page) and what they're about. Until it's designed, the button does nothing.~~

- **Notifications** open a popover from the bell, the same in every AutoPartsHUB header (the home, Sparks's start page and a concept): "Notifications", "Clear all", and two tabs, "Unread" (open first) and "All", newest first. Each one: an unread dot, a person's avatar, a department, or an icon for what happened (done, a warning, an error, an update), its title, one line (cut with an ellipsis), and when ("Just now", "23 min ago", "Yesterday"). Selecting one opens what it's about, the concept, and marks it read: in the same tab inside Sparks, in its own tab from the home (as Sparks opens). The bell shows a dot while any is unread. With nothing unread: "You're all caught up." After "Clear all": "All cleared. Nothing to show here now." and "Notifications older than 60 days are cleared automatically."

✅ **Resolved:** notifications open a simple popover (not designed yet, after a typical notifications panel), with Unread and All. ~~🙋 **Open question:** where selecting a notification takes her (the concept, the comment), beyond marking it read.~~ ✅ **Resolved:** selecting a notification opens its concept.

🙋 **Open question:** what the profile photo does when selected (an account menu, sign out). Until it's decided, it isn't interactive.

## What it shows

In order, top to bottom:

1. "Welcome back, {first name}", for example "Welcome back, Dana".
2. "Connect with the tools, knowledge, and intelligence that power your work."
3. Three tabs: ~~"My apps"~~ "Apps" (selected when the page opens), ~~"Knowledge"~~ ~~"Library"~~ "My library" and "Connections".

~~✅ **Resolved:** the tabs are "Apps" and "Library", without "My": shorter, and the page is already hers ("Welcome back, Dana").~~ ✅ **Resolved:** the tabs are "Apps" and "My library". Why: "Apps" are the company's apps she uses; "My library" is hers (her notes, reports and files), and "My" says so.

~~✅ **Resolved:** the second tab is named "My library" (Sparks → "AutoPartsHUB", 7:1021), the same word as the message box's "Add from library" in Sparks. What it holds is unchanged ("Knowledge and Connections"). Sparks's "Add from library" opens the home on it, in its own tab.~~ ✅ **Resolved:** the second tab is "Library", without "My" (see above).
4. The selected tab's content.

## Apps

One card per app the user has access to. Each card shows the app's logo and a one-line description of what it's for:

| App | Description |
| --- | --- |
| Pulse | "Business performance, analytics, and AI-powered insights." |
| Sparks | "Transform ideas into tangible, testable solutions." |
| Flow | "Monitor operations, fulfillment, and distribution performance." |
| Sales | "Track sales performance, revenue, and growth opportunities." |
| Care | "Manage customer support, service quality, and escalations." |

- ~~Selecting a card opens that app. Screen readers announce it as "Open {app name}".~~ ✅ **Resolved:** selecting a card opens that app in a new tab, so home stays open in this one. ~~Screen readers announce it as "Open {app name} in a new tab".~~ ✅ **Resolved:** each app has one tab: when it's already open, selecting its card again goes to that tab, as she left it (not reloaded), instead of opening another; once she closes it, the card opens a new one. Screen readers announce it as "Open {app name} in its own tab". Why: a second Sparks tab split her work in two, and she lost track of which one held her idea. ✅ **Resolved:** the home has one tab too: Sparks's "Add from library" goes back to the home's tab when it's open, on "My library", instead of opening another.
- Cards fill the row left to right: three per row on desktop, two on tablet, one on phones.

⚠️ **Assumption:** the apps show in the order above, which is Figma's. Also in Open Questions.

## Knowledge and Connections

Both tabs can be selected. Until they have content, each shows the product's standard empty state, centered in the panel:

| Tab | Title | Description |
| --- | --- | --- |
| ~~Knowledge~~ ~~Library~~ My library | ~~"Nothing in Knowledge yet"~~ "Nothing in your library yet" | ~~"When knowledge is added, it'll show up here."~~ "Files, notes and research you add will show up here." |
| Connections | "No connections yet" | "When connections are added, they'll show up here." |

✅ **Resolved:** the two tabs use the same empty state as every other empty view in the product, not a blank panel. A blank panel reads as broken; the empty state says what's missing and that it will appear here. The copy says only that, because neither tab's content is designed yet.

What each tab holds:

- **Connections:** where company data comes from, and which sources are connected. AutoPartsHUB's admins connect the sources and set who can read what; the user sees which sources are connected and what they can access.
- **Knowledge:** what the apps understand and can reference: company knowledge from those sources, and the user's personal knowledge (notes, reports, research and files they add and own), clearly separated by source and ownership. Company knowledge is centrally managed and permission-aware; personal knowledge is the user's alone and never changes company knowledge.

The user doesn't need either tab to use knowledge: apps like Sparks bring it into their work, with its source ([sparks.md](sparks.md), "Knowledge and Connections").

~~✅ **Resolved:** Knowledge is the user's own knowledge, in addition to the company's shared knowledge.~~ ✅ **Resolved:** Connections shows where company data comes from; Knowledge shows what the apps can reference, company and personal, separated by source and ownership.

⚠️ **Gap:** neither tab's content is designed, nor how the user adds personal knowledge. The empty state has no button: the brand voice asks for one action, but neither tab has a defined action yet. Also in Open Questions.

## States

| State | What shows | What the user can do |
| --- | --- | --- |
| Apps listed | The user's app cards | Open any app, switch tabs |
| Library or Connections selected | That tab's empty state ("Knowledge and Connections") | Switch tabs |
| No photo | The first initial in the header | Same as above |
| No apps | Not designed | — |

🙋 **Open question:** what "Apps" shows when the user has no apps.

## On Phones

The header keeps the full logo and the photo. The welcome lines wrap, the three tabs stay in one row, and the cards stack one per row.

## Accessibility

- The welcome line is the page's main heading.
- The tabs follow the standard tab pattern: arrow keys move between them, and the selected tab's panel follows.
- Each card is a single link named ~~"Open {app name} in a new tab"~~ "Open {app name} in its own tab". The logo inside it is part of that link, not a separate image to announce.

## Acceptance Criteria

- Given a signed-in user named Dana, when home opens, then it reads "Welcome back, Dana" and "Apps" is selected.
- Each of the user's apps shows as a card with its logo and description; selecting a card opens that app in a new tab, and home stays open; selecting it again while that tab is open goes to it instead of opening another.
- A user with no profile photo sees their first initial in the header, in the same color on every visit.
- Selecting "Knowledge" shows "Nothing in Knowledge yet" and "When knowledge is added, it'll show up here."; selecting "Connections" shows "No connections yet" and "When connections are added, they'll show up here."; selecting "Apps" brings the cards back.
- Arrow keys move between the tabs.
- On desktop the cards show three per row, on tablet two, on phones one, with no sideways scrolling.

## Open Questions

- 🙋 Which apps does a user see: every app AutoPartsHUB has, or only the ones their role gives them? And in what order? Recommended: only the apps they can open, in the order above.
- 🙋 What does "Apps" show when the user has no apps?
- 🙋 How does the user add personal knowledge, and what can they add (files, notes, links)? The empty state's action depends on it.
- 🙋 What one action should each empty state offer (for example, adding knowledge or connecting a tool), and who can take it?
- 🙋 What does selecting the profile photo do?
