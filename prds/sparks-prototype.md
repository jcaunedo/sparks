<!--
Created: Nov 21, 2026
Created by: Julio Caunedo
Last updated: Nov 22, 2026 (Plan becomes the Blueprint once it's done: "What we built" stays in it, the evaluation becomes one line in "Where it stands"; switching the audience keeps the device; the toolbar names the direction the prototype was built from; paths: each direction built is a path in the prototype, with a switcher, its own versions, comments and Validate runs; comments on the prototype show in the Comments panel; comments on the prototype: "Add comment" drops a pin and opens a box to write in, and the pin stays; the toolbar's actions are icon buttons named in tooltips, the device switcher icons; "Point at something" renamed "Edit element"; the spec panel is "Blueprint"; the Prototype section in the Concept panel built; changes in words for the three newer prototypes; Validate's fixes for the three newer prototypes; going back to the choice from Prototype: after a change beyond the direction, or asking for another direction; Validate and Review follow the chosen direction; a new direction starts its prototype at version 1; a prototype for every direction, with product photos; "Yes, test it" opens Validate's plan; changing it built: pointing, typing over text, changes in the conversation, versions; Prototype starts from "Looks right, continue" on what we'll build; built as a reference layout: the Prototype step opens beside the conversation, Sparks builds "Fit check before you buy" screen by screen, then asks if it's ready to test; Prototype starts from "Looks right, continue" and ends with a question and quick replies, not buttons; Prototype shows the first screens Dana sees: Plan has no screen previews; it starts from "Looks right, continue"; Going to Review without Validate needs the same coverage; version at submission; "Needs a check")
Scope: the Prototype step of a Sparks concept, the second of four (Plan, Prototype, Validate, Review): what Sparks builds from the chosen direction, how Dana tries it and changes it without design or engineering skills, versions, and the Prototype section of the concept.
Purpose: defines how the chosen direction becomes a working concept Dana can try (a clickable prototype, or another testable artifact), built from AutoParts Co.'s own design system, ready to be evaluated in Validate.
-->

# Prototype — Sparks

**Location:** the second of a Sparks concept's four steps. It opens when Dana ~~selects "Continue to Prototype"~~ says "Looks right, continue" to "What we'll build" at the end of Plan ([sparks-plan-compare.md](sparks-plan-compare.md), "Finishing Plan"), in the same conversation, with no button, and whenever she selects Prototype in the steps once Plan is Done. It needs Plan's success criteria and chosen direction; if Dana asks to build before Plan is Done, Sparks finishes Plan with her in a few messages first ([sparks.md](sparks.md), "Plan").
**Audience:** experienced AutoParts Co. employees who know the business but aren't designers or engineers. The reference user is Dana, a Senior Product Manager.
**Description:** the step where Sparks builds a clickable prototype of the chosen direction, or another testable artifact when the direction isn't mainly software, and Dana tries it and asks for changes in plain words.
**Status:** defined. Built as a reference layout from this PRD (not in Figma yet): after "Looks right, continue", the steps move to Prototype and the prototype opens beside the conversation (`SparksWorkspace` `preview`, `PrototypePanel`), Sparks builds "Fit check before you buy" screen by screen with its progress in place, then introduces it and asks "Ready for me to put it through its paces?" (`FitCheckPrototype`). ~~Not built: changing it (in words, typing over text, pointing), versions,~~ Changing it is built too: in words, typing over text, pointing ("Point at something", then what to change in the message box), and versions (the "Versions" menu, restoring as the newest). Every direction has its prototype: "Fit check before you buy"; "Flag often-returned parts" (search results with the flag, a flagged part with how often it comes back and its fit list, the cart); "Fit check at checkout" (the shop, the cart, the fit check at checkout with a swap, the store staff order lookup); and "Complete fit data", a routine, so the pieces it uses and a walkthrough ("When the direction isn't software": the walkthrough, the return screen at the counter, the catalog team's weekly list, the fit list customers see). Product photos are freely licensed stand-ins for AutoParts Co.'s own. Validate's fixes work in every prototype: the flag worded as a reminder; the fit checked in the cart and "Another vehicle" at checkout; at the counter, the vehicle filled in from the account, or picked when none is saved ([sparks-validate.md](sparks-validate.md), "Findings"). Going back to the choice in Plan works too: "Go back to the choice" after a change beyond the direction, or asking for it in words ("Let's try a different direction"). The Prototype section is in the Concept panel ("The Prototype section"). Not built: ~~the Prototype section in the Concept panel,~~ "Building failed", ~~going back to the choice in Plan from a change,~~ ~~and, for the three newer prototypes, changes asked for in words (beyond Validate's fixes, typing over text and pointing).~~ Changes in words work in every prototype ("Changing it").

~~⚠️ **Gap:** Validate's scenarios and Review's concept are written for "Fit check before you buy"; after another direction, they still describe it.~~ ✅ **Resolved:** Validate and Review follow the chosen direction: its own scenarios, findings and results in Validate ([sparks-validate.md](sparks-validate.md)), its own user stories, reviewers, recommendation and decision in Review ([sparks-review.md](sparks-review.md)). After going back to the choice, the new direction's prototype starts at version 1; the earlier one stays in the concept.

---

## Purpose

Up to now the concept has been words. Prototype turns it into something Dana can click through: the screens, messages and steps that the people affected would see, looking and behaving like AutoParts Co.'s products.

Dana doesn't need design tools or code. She tells Sparks what to change, or points at something in the prototype and says what's wrong with it. Sparks builds with AutoParts Co.'s design system, so the prototype looks like the company's products and follows its accessibility standards from the start.

It works when Dana has clicked through the whole direction, it does what the direction's "How it works" promised, and she'd be comfortable having it evaluated and, later, shown to the UX team.

ℹ️ Related specs: the workspace, step states, suggestions, how Sparks talks and company knowledge are in [sparks.md](sparks.md). The chosen direction comes from the choice in Plan ([sparks-plan-compare.md](sparks-plan-compare.md)).

## What Sparks builds

**The first screens Dana sees.** Plan has no screen previews: direction cards say in words where each changes things ([sparks-plan-generate-directions.md](sparks-plan-generate-directions.md), "Visual previews"). Prototype starts when Dana says "Looks right, continue" to "What we'll build" ([sparks-plan-compare.md](sparks-plan-compare.md), "Finishing Plan") and designs the one direction she chose.

✅ **Resolved:** the first screens of a concept come in Prototype, not Plan. Why: Plan is the strategic step; screens invite design feedback before the direction is chosen.

From the Chosen direction section, Sparks builds:

- **Every step of "How it works",** as the people affected would live it: for "Fit check before you buy", adding a vehicle, a product page that says the part fits, one that says it doesn't and shows parts that do, and the cart.
- **A view for each audience** the direction touches. When store staff also see something new, the prototype has a store staff view as well as the customer's. Dana switches between them.
- **The main other paths,** from the direction's "What we don't know yet" and the brief: a vehicle missing from the fit data, a customer with two saved vehicles, a part that fits only some versions of a model.
- **On the right device for each audience,** from company knowledge: customers on a phone, store staff on the counter computer. Dana can preview either view on any device.

It uses:

- **The design system:** AutoParts Co.'s components, patterns and accessibility standards. Sparks doesn't invent new components when one exists.
- **What exists today:** when the direction builds on an existing app ("Builds on"), the prototype shows it in that app's context, not on a blank page.
- **Sample data shaped like AutoParts Co.'s:** made-up vehicles, parts, orders and customers that look like the real ones.

✅ **Resolved:** prototypes use realistic synthetic data by default, never actual customer or transaction data. For advanced cases, approved sanitized datasets may be used, with access controls. Sharing a prototype never gives a viewer access to data beyond their own permissions. In the demo, all prototype data is synthetic.

**What the prototype isn't:** it doesn't connect to real systems. Saving a vehicle, placing an order or a store looking up a customer is pretend: it happens on screen, as it would for real, and is listed under "What's pretend". The prototype is a working concept, not production software; developers build that if the concept advances.

## Building it

- Sparks builds screen by screen and shows its progress in the conversation: "Building the product page, 2 of 5 screens." If a screen takes unusually long, Sparks says so. The progress line updates in place (a spinner, then a check: "Built all 5 screens."), and the prototype panel shows "{n} of {total} screens ready" while it builds. A screen not built yet shows "Building {screen}…" in the prototype.
- For "Fit check before you buy", five screens, in order: the vehicle picker, a part that fits, a part that doesn't fit (with the parts that do), the cart (with a pretend order), and the store staff lookup (a customer's saved vehicle, and whether a part fits it). A part with no fit data for the vehicle shows "We're not sure this fits", with why.
- Each screen appears in the preview as soon as it's ready. Dana can start clicking through before the rest is done.
- When it's done, Sparks introduces it in a few lines: what's in it, where to start and what's pretend.

> Your prototype is ready. Start with the customer's phone: add a vehicle, then open a few parts and see which fit. Switch to "Store staff" to see what an associate sees at the counter. Placing an order is pretend; nothing leaves the prototype.

## Trying it

In the Prototype step, the prototype shows beside the conversation, large enough to use, with:

- **The audience switcher** ("Customer", "Store staff").
- **The device switcher** ("Phone", "Desktop"), as icons (a phone, a monitor) named in tooltips. It and the audience switcher sit together in the middle of the toolbar, with the direction's name on the left and the actions on the right.
- **"Try it full screen",** which hides everything but the prototype. Esc or "Back to Sparks" returns to the workspace.
- **"Start over",** which resets the sample data to where it began.
- **On the right, icon buttons named in tooltips:** "Edit element" ("Changing it"), "Add comment" ("Commenting on it"), "Versions ({n})", "Start over", "Try it full screen".

  ✅ **Resolved:** the toolbar's actions are icon buttons, each named in a tooltip on hover and keyboard focus (and in its accessible name), and the device switcher shows icons (`Smartphone`, `Monitor`). The audience switcher keeps its words: "Customer" and "Store staff" have no icon that says them. "Edit element" and "Add comment" fill with the brand color while on; only one is on at a time.
- ~~Each audience opens on its device (the customer on a phone, store staff on a desktop); Dana can switch either.~~ The prototype opens on the first audience's device (the customer on a phone); switching the audience keeps the device she's on, and only the device switcher changes it.

  ✅ **Resolved:** switching the audience doesn't change the device. Why: she picked the device; changing it on her when she looks at the other audience is unexpected. The vehicle picker offers "Use a sample vehicle", so she doesn't have to fill in every field to try it. A line at the bottom of every screen says "Prototype: made-up data, nothing is real."

~~⚠️ **Gap:** what she types while trying it isn't applied yet.~~ ✅ **Resolved:** changes are applied ("Changing it").

The conversation stays beside the prototype, so Dana can ask for changes as she tries it. The full concept stays one click away ~~in the "Blueprint" panel~~ in the Blueprint (Plan in the steps), as supporting context ([sparks.md](sparks.md), "The concept workspace").

## Changing it

Dana changes the prototype in plain words, or by typing over its text:

- **In the conversation:** "Make the fit message name the vehicle first." "Add a way to compare two parts that fit."
- **By typing over text:** she selects any text in the prototype and types over it, as in a document.
- **By pointing:** she selects ~~"Point at something"~~ "Edit element", selects any element in the prototype, and types what she wants changed. Sparks knows which element she means.

Sparks makes the change, says what it changed in one line, and saves a new version ("Versions"): "Done: the "Add to cart" button now says "Add to my cart". I've saved it as version 4." The question that finishes the step stays under each change ("Yes, test it", "Go to Review instead").

How each way works, as built:

- **Pointing:** ~~"Point at something"~~ "Edit element" turns pointing on (Esc turns it off); what she can point at is outlined on hover and focus, and Tab and Enter work too. Selecting an element ends pointing, keeps it outlined, and shows "Pointing at the "Add to cart" button" above the message box, which takes focus with "What should change about it?". Her message applies to that element only ("make it bigger", "call it "…""); anything Sparks can't do to it, it says so.
- **Typing over text:** headings and their lines are editable like a document; leaving the text (or Enter) saves the change as a version, and Sparks says what changed: "Done: "Add your vehicle" now reads "Add your truck"."
- **In the conversation:** a change to the whole prototype ("Make the fit message name the vehicle first"). In the demo, Sparks recognizes the changes in this PRD's examples and checks; for anything else it says what it can do instead, without pretending, listing what works for the direction being prototyped. Each direction understands its own:
  - **Fit check before you buy:** name the vehicle first in the fit message; stock at the nearest store (pretend).
  - **Flag often-returned parts:** say how often a flagged part comes back, under the flag in the search results; open the fit list right away on the part page.
  - **Fit check at checkout:** name the vehicle first; say why a part doesn't fit (the vehicles it does fit); show the price difference on the swap ("+$0.50").
  - **Complete fit data:** sort the weekly list by the parts returned most often, one row per part; let customers say the fit list is wrong for their vehicle ("Not right for your vehicle? Tell us"), which joins the weekly list.
  - Light gray text, restoring a version, a change beyond the direction, real data and sharing work the same in every prototype. Asking to name the vehicle first where there's no fit message gets why ("doesn't check whether a part fits") and what works instead.

✅ **Resolved:** "Point at something" is renamed "Edit element": the old name described the gesture, not what she gets from it. Sparks's replies say "select "Edit element" and tell me what to change about it".

✅ **Resolved:** each newer prototype understands two changes in words of its own, chosen for what that direction shows; each saves a version, like any change.
- **Versions:** "Versions ({n})" opens the list, newest first, each named for what changed, the current one marked "Current" and every other with "Restore". "Go back to how it was" restores the version before the current one. Changing the prototype is something Sparks does on its own when Dana asks ([sparks.md](sparks.md), "What Sparks may do on its own").

When a change goes beyond simple edits:

- **Beyond the chosen direction** ("Also let customers book an installation"): Sparks says it's a new part of the solution and offers to add it to "What comes later" or go back to the choice in Plan. It doesn't build it silently. Why: the prototype is evaluated against the direction Dana chose; adding features drifts away from it unnoticed.
- **Another direction** ("Let's try a different direction"): the choice reopens in Plan, as it does from "Go back to the choice" above.

✅ **Resolved:** going back to the choice from Prototype, from "Go back to the choice" or in her words, reopens the choice in Plan in the same conversation ([sparks-plan-compare.md](sparks-plan-compare.md), "Going back to the choice"). The prototype she leaves stays in the concept; a new pick is built from version 1.
- **Against the design system or its accessibility standards** ("Make the text light gray"): Sparks explains in one sentence and offers the closest option that follows them. If Dana insists, Sparks makes the change and records it under "Departs from the design system", so the UX team sees it in Review.
- **Needs something AutoParts Co. doesn't have** (live stock at the nearest store, which stores don't report in real time): Sparks builds it as pretend and records it under "Needs what AutoParts Co. doesn't have yet", from engineering context. Validate and Review pick it up.

## Paths

Each direction Dana builds is a path in the prototype: Plan's pick first, then each one she tries from a direction card or the Blueprint ("Generate prototype", [sparks-plan-compare.md](sparks-plan-compare.md), "Directions in the blueprint") or picks after going back to the choice. Nothing is replaced.

- **Which direction it is:** the toolbar always starts with the direction the prototype was built from, numbered as on its card ("1. Fit check before you buy"), so it's clear what she's trying.

  ✅ **Resolved:** the prototype names its direction, with one path too.
- **Switching:** with more than one path, ~~a switcher leads the toolbar~~ that name becomes a switcher, in the same place ("Path"), each path named as in the directions ("2. Flag often-returned parts"), in the order built. Switching shows that path where she left it; pointing stops.
- **Each path has its own** build, versions ("Versions ({n})" and restoring), comments ("Commenting on it") and Validate runs ([sparks-validate.md](sparks-validate.md)). A path being built keeps building while she looks at another.
- **In the Blueprint,** "What we built" ~~and "The evaluation"~~ and the Prototype and Validate lines in "Where it stands" are the path shown's, named after it once there's more than one path ("What we built: Flag often-returned parts").
- **Review** is about one path: the one she sends there ([sparks-review.md](sparks-review.md)).

✅ **Resolved:** another direction becomes another path, beside the first, not a replacement. Each path keeps its own versions, comments and evaluation; any path can be validated; one goes to Review.

⚠️ **Gap:** Review doesn't show the other paths as alternatives considered yet, with their results; the Blueprint shows one path's prototype ~~and evaluation~~ and where its evaluation stands at a time (the one shown), not each path's.

## Commenting on it

Dana can leave comments on the prototype itself, pinned where they apply, as notes on what she's trying.

- **"Add comment"** (a speech bubble with a plus) turns commenting on; Esc or the button again turns it off. While it's on, the prototype doesn't respond to clicks: a click drops a pin there instead (Enter does it on the element with focus).
- **The pin and its box:** the pin is her avatar in a white drop whose point marks the spot (blue while it's open). Under it, a box to write in, "Add a comment", with a send button; Enter adds the comment, Shift+Enter starts a new line, Esc or a click outside drops it.
- **After adding it,** the pin stays where she put it. Selecting it opens the comment: who, when, the text and "Delete comment". Commenting stays on, so she can add another.
- **Where pins show:** a pin is attached to what she clicked, so it moves with it and shows only while it's on screen; on the audience and device it was added on.

✅ **Resolved:** comments on the prototype are pinned where she clicks, with a popover to write the comment, and the pin stays after it's added. Built as `PrototypeComments` (`prototype/prototype-comments.tsx`), after a typical comment pin and box from a reference screenshot (not in Figma yet).

✅ **Resolved:** the comments show in the header's Comments panel, under "On the prototype" ([sparks.md](sparks.md), "The concept workspace"); selecting one there opens its pin.

⚠️ **Gap:** ~~the comments stay in the prototype: they don't show in the header's Comments panel,~~ reviewers can't see them or reply in Review, and Sparks doesn't act on them (that's "Edit element"). Not designed: whether a comment can also be sent to Sparks as a change, and mentioning someone (@) or reacting with an emoji, which the example showed.

## Versions

- Every change Dana asks for saves a version, named for what changed ("Fit message names the vehicle first").
- She can open any earlier version and restore it. Restoring saves it as the newest version; nothing is lost.
- Validate evaluates the version that's current when it runs; Review shows the version that's current when she submits for a decision.

## When the direction isn't software

Not every experiment needs an interactive screen. Some directions are mostly a change in how a team works: a store routine, a new returns process, a change to what an email says.

For those, Prototype builds the most appropriate testable artifact instead: the closest thing that can be tried and evaluated.

- **The pieces the process uses:** the script on the store's counter screen, the message or email templates, a form the team fills in. Built with the design system, like any prototype.
- **A step-by-step walkthrough** of the process for each audience: what happens, who does what, and what each person sees or hears.
- **Mixed directions** get both: screens for the parts that are software, a walkthrough for the rest.

Sparks says which kind of artifact it's building and why, before it starts: "This direction is mostly a new store routine, so I'll build the counter screen with its script and a walkthrough of a customer's visit."

Everything else in this step works the same: trying it, changing it in plain words or by pointing, versions, and finishing. Validate evaluates the artifact the same way ([sparks-validate.md](sparks-validate.md), "What gets evaluated").

✅ **Resolved:** Prototype builds a clickable prototype or another appropriate testable artifact, depending on the direction. Not every business experiment needs an interactive screen; what matters is that it can be tried and evaluated.

## The Prototype section

What the step adds to the concept (~~the "Concept" "Blueprint" panel~~ the Blueprint, [sparks.md](sparks.md), "The Blueprint"):

| Part | Holds | Needed to continue |
| --- | --- | --- |
| The prototype | The current version, ready to try | Yes |
| What's in it | Each audience's screens, and which step of "How it works" each one covers | Yes (Sparks fills it in) |
| What's pretend | What happens on screen but not for real: saving a vehicle, placing an order, payments | Yes (Sparks fills it in) |
| Sample data | What the made-up data represents ("12 vehicles and 40 parts, 6 of them with gaps in fit data") | Yes (Sparks fills it in) |
| Needs what AutoParts Co. doesn't have yet | Data or capabilities the real thing would need, with the source | No |
| Departs from the design system | Changes Dana kept that the design system or its standards don't support | No |
| Versions | Every version, newest first | Yes (kept automatically) |

How it shows, as built (`PrototypeSection` in the Blueprint, titled "What we built", after Plan's "What we'll build"; ~~under the "Prototype" step~~ the Blueprint no longer groups sections by step). It stays in the Blueprint, unlike the evaluation and the review, because it's spec: what's pretend and what the real thing would need aren't in the Prototype step's panel, which is the prototype itself. "Where it stands" adds one line for the prototype ("Version 3: …"), with "Open":

- It appears once the prototype is built, and follows every change: the current version and its name, with "Try it" (the prototype beside the conversation).
- "What's in it" says whether every step of the chosen direction's "How it works" is covered ("Covers every step of "How it works" (3 of 3)"), then each audience and device with its screens, and under each screen the steps it covers, one per line. A screen that isn't a step (the cart, the store lookup) says it "shows what happens around it".
- "What's pretend" and "Sample data" are the same lines the concept for review uses ([sparks-review.md](sparks-review.md), "What's reviewed"); sample data says it's made up, shaped like AutoParts Co.'s own, so it's safe to share.
- "Needs what AutoParts Co. doesn't have yet" and "Departs from the design system" fill in from what she asked for (stock at the nearest store; light gray text she kept), and say "None." otherwise.
- "Versions": every version, newest first, numbered, the newest marked "Current".

✅ **Resolved:** the Prototype section shows the coverage of "How it works" first, so Dana sees at a glance whether anything is left out, and lists the steps each screen covers instead of a table.

⚠️ **Gap:** editing the section from the panel (accepting that a step is left out, correcting what's pretend) isn't built.

## Finishing the step

Dana can continue when the prototype covers every step of the chosen direction's "How it works", or she has accepted that a step is left out.

- **A step not covered:** Sparks says which, and offers to build it or record it under "What comes later".
- When it's complete, Sparks asks: "**Ready for me to put it through its paces?** In Validate, I'll work it through realistic scenarios for customers and store staff, and check it against AutoParts Co.'s data." Quick replies: "Yes, test it", "Go to Review instead". She can keep trying and changing it first; the question stays.
- ~~Selecting "Continue to Validate" marks Prototype as Done and opens Validate.~~ "Yes, test it" marks Prototype as Done and starts Validate in the same conversation, with no button: Sparks shows its evaluation plan ([sparks-validate.md](sparks-validate.md), "The evaluation plan").
- Validate is optional. With the same condition, Dana can go to Review instead ("Go to Review instead"): Prototype is marked Done and Validate shows as Skipped ([sparks.md](sparks.md), "Moving through the steps").

✅ **Resolved:** Prototype starts from "Looks right, continue" and ends with a question and its quick replies, not "Continue to Prototype" or "Continue to Validate" buttons. Why: like the parts of Plan, the conversation moves on when Dana answers; a button adds a stop it doesn't need (sparks.md, "Moving through the steps").

Changing the prototype after Validate is Done marks Validate and Review as Needs a check, if they're Done ([sparks.md](sparks.md), "Moving through the steps"). Changing something in Plan after Prototype is Done doesn't rebuild the prototype on its own: Sparks suggests the changes it would make, and Dana accepts them.

The prototype isn't shared with anyone before Review ([sparks.md](sparks.md), "Bringing others in").

## States

| State | What shows | What Dana can do |
| --- | --- | --- |
| Building | Progress by screen; each screen in the preview as it's ready | Try the ready screens, keep talking to Sparks, stop it |
| Ready | Sparks's introduction; the prototype in the preview | Try it, change it, go full screen |
| Changing | The change being made, then a one-line summary of it | Keep trying it, undo by restoring the previous version |
| Change goes beyond the direction | Sparks's note and its options | Add it to "What comes later", go back to the choice in Plan, drop it |
| Change goes against the design system | Sparks's reason and the closest option | Take the option, or keep her change |
| Building failed | "I couldn't finish building {screen}. Your last version is still here." and "Try again" | Try again, keep using the last version |
| A step not covered | Which step, and Sparks's offer | Build it, leave it for later |
| Ready to continue | Sparks's question, with "Yes, test it" and "Go to Review instead" | Continue, go to Review without Validate, or keep changing it |

## Checks

What Dana says → what Sparks must do:

| Dana | Sparks must |
| --- | --- |
| Says "Looks right, continue" at the end of Plan | Build every step of "How it works" for each audience, with the design system and made-up sample data |
| "Use our real customers' vehicles so it feels real." | Explain that prototypes use made-up data by default so they're safe to share, and offer to make the sample data closer to real cases |
| Points at a button and types "too small" | Change that element only, and say what changed |
| "Also let customers book an installation." | Say it's beyond the chosen direction, and offer "What comes later" or going back to the choice in Plan |
| "Make the text light gray." | Explain the accessibility standard in one sentence, offer the closest compliant option, and record it if she insists |
| Asks for live stock at the nearest store | Build it as pretend, and record that AutoParts Co. doesn't have that data today |
| "Go back to how it was an hour ago." | Restore that version as the newest one |
| Asks to send the prototype to her manager | Say others see it in Review, and offer to continue toward it |

## Screen sizes

Dana builds and tries the prototype on a laptop or desktop; she previews the customer's phone view with the device switcher. Using Sparks on a phone isn't designed for now ([sparks.md](sparks.md), "Screen sizes").

## Accessibility

- The prototype follows the design system's accessibility standards, so it can be tried with a keyboard and a screen reader like a real AutoPartsHUB app.
- ~~"Point at something"~~ "Edit element" can also be done from the keyboard: Tab moves between elements and Enter selects one.
- Every icon button has an accessible name, the same words as its tooltip; "Edit element", "Add comment" and the device buttons say whether they're on (`aria-pressed`).
- With "Add comment" on, Enter on the element with focus starts a comment there; the box takes focus; each pin is a button named with the comment ("Dana Morales's comment: …").
- Progress while building is announced at each finished screen, not continuously.
- "Try it full screen" returns focus to the button that opened it when it closes.

## Acceptance Criteria

- Given a chosen direction, when Prototype opens, then Sparks builds a screen for every step of its "How it works", for each audience it touches.
- The prototype uses synthetic data by default; no actual customer or order record appears in it unless an approved, sanitized dataset is used.
- The prototype uses the design system's components; anything Dana kept that departs from it is listed under "Departs from the design system".
- Dana can switch audiences and devices, try it full screen, and start over with fresh sample data.
- Pointing at an element and describing a change changes that element, and Sparks says what changed.
- With "Add comment" on, selecting a spot on the prototype opens a box to write a comment; once added, its pin stays at that spot and opens the comment.
- Every change saves a named version; restoring an earlier one saves it as the newest and loses nothing.
- A change beyond the chosen direction isn't built until Dana chooses what to do with it.
- If building fails, the last working version stays available with "Try again".
- Sparks asks "Ready for me to put it through its paces?" only when every step of "How it works" is covered or Dana has accepted leaving one out.
- Nobody else can open the prototype before Review.

## Out of scope

- The workspace, step states, suggestions, Sparks's voice and company knowledge access: [sparks.md](sparks.md).
- Choosing the direction: [sparks-plan-compare.md](sparks-plan-compare.md).
- Evaluating the prototype: [sparks-validate.md](sparks-validate.md).
