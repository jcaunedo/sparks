<!--
Created: Nov 21, 2026
Created by: Julio Caunedo
Last updated: Nov 25, 2026
Latest update: "Add comment" moved from the prototype's toolbar to the Comments panel's header, beside its X, on Dana's and the reviewers' pages. Why: adding a comment and reading them belong together; the toolbar keeps what changes and tries the prototype. Also today: Review's explanation has "Add to Review"; every open comment's pin shows over its screen.
Recent updates: "Fit check before you buy" and "Fit check at checkout" have the customer's screens only, with no store staff view, and the vehicle is added with its VIN, a past repair invoice or its details. "Go to Review instead" opens Review, which has no conversation. "Evaluate" is at the end of the toolbar, and "Fix in the prototype" in Evaluate opens here on the finding's page, with Sparks's plan. Quick replies are one per row beside the prototype.
Scope: the Prototype step of a Sparks concept, the second of four (Plan, Prototype, Evaluate, Review): what Sparks builds from the chosen direction, how Dana tries it and changes it without design or engineering skills, versions, and the Prototype section of the concept.
Purpose: defines how the chosen direction becomes a working concept Dana can try (a clickable prototype, or another testable artifact), built from AutoParts Co.'s own design system, ready to be evaluated in Evaluate.
-->

# Prototype — Sparks

**Location:** the second of a Sparks concept's four steps. It opens when Dana ~~selects "Continue to Prototype"~~ says ~~"Looks right, continue"~~ "Build it" to "What we'll build" at the end of Plan ([sparks-plan-compare.md](sparks-plan-compare.md), "Finishing Plan"), in the same conversation, with no button, and whenever she selects Prototype in the steps once Plan is Done. It needs Plan's success criteria and chosen direction; if Dana asks to build before Plan is Done, Sparks finishes Plan with her in a few messages first ([sparks.md](sparks.md), "Plan").
**Audience:** experienced AutoParts Co. employees who know the business but aren't designers or engineers. The reference user is Dana, a Senior Product Manager.
**Description:** the step where Sparks builds a clickable prototype of the chosen direction, or another testable artifact when the direction isn't mainly software, and Dana tries it and asks for changes in plain words.
**Status:** defined. Built as a reference layout from this PRD (not in Figma yet): after "Build it", the steps move to Prototype and the prototype opens beside the conversation (`SparksWorkspace` `preview`, `PrototypePanel`), Sparks builds "Fit check before you buy" step by step with its progress in place (`ActivityFeed`) while the panel, blank at first, assembles each screen (`BuildingScreen`), then says what it built and asks "Ready for me to put it through its paces?" (`FitCheckPrototype`). ~~Not built: changing it (in words, typing over text, pointing), versions,~~ Changing it is built too: in words, typing over text, pointing ("Point at something", then what to change in the message box), and versions (the "Versions" menu, restoring as the newest). Every direction has its prototype: "Fit check before you buy"; "Flag often-returned parts" (search results with the flag, a flagged part with how often it comes back and its fit list, the cart); "Fit check at checkout" (the shop, the cart, the fit check at checkout with a swap, the store staff order lookup); and "Complete fit data", a routine, so the pieces it uses and a walkthrough ("When the direction isn't software": the walkthrough, the return screen at the counter, the catalog team's weekly list, the fit list customers see). Product photos are freely licensed stand-ins for AutoParts Co.'s own. Evaluate's fixes work in every prototype: the flag worded as a reminder; the fit checked in the cart and "Another vehicle" at checkout; at the counter, the vehicle filled in from the account, or picked when none is saved ([sparks-validate.md](sparks-validate.md), "Findings"). Going back to the choice in Plan works too: "Go back to the choice" after a change beyond the direction, or asking for it in words ("Let's try a different direction"). The Prototype section is in the Concept panel ("The Prototype section"). Not built: ~~the Prototype section in the Concept panel,~~ "Building failed", ~~going back to the choice in Plan from a change,~~ ~~and, for the three newer prototypes, changes asked for in words (beyond Evaluate's fixes, typing over text and pointing).~~ Changes in words work in every prototype ("Changing it").

~~⚠️ **Gap:** Evaluate's scenarios and Review's concept are written for "Fit check before you buy"; after another direction, they still describe it.~~ ✅ **Resolved:** Evaluate and Review follow the chosen direction: its own scenarios, findings and results in Evaluate ([sparks-validate.md](sparks-validate.md)), its own user stories, reviewers, recommendation and decision in Review ([sparks-review.md](sparks-review.md)). After going back to the choice, the new direction's prototype starts at version 1; the earlier one stays in the concept.

---

## Purpose

Up to now the concept has been words. Prototype turns it into something Dana can click through: the screens, messages and steps that the people affected would see, looking and behaving like AutoParts Co.'s products.

Dana doesn't need design tools or code. She tells Sparks what to change, or points at something in the prototype and says what's wrong with it. Sparks builds with AutoParts Co.'s design system, so the prototype looks like the company's products and follows its accessibility standards from the start.

It works when Dana has clicked through the whole direction, it does what the direction's "How it works" promised, and she'd be comfortable having it evaluated and, later, shown to the UX team.

ℹ️ Related specs: the workspace, step states, suggestions, how Sparks talks and company knowledge are in [sparks.md](sparks.md). The chosen direction comes from the choice in Plan ([sparks-plan-compare.md](sparks-plan-compare.md)).

## What Sparks builds

**The first screens Dana sees.** Plan has no screen previews: direction cards say in words where each changes things ([sparks-plan-generate-directions.md](sparks-plan-generate-directions.md), "Visual previews"). Prototype starts when Dana says ~~"Looks right, continue"~~ "Build it" to "What we'll build" ([sparks-plan-compare.md](sparks-plan-compare.md), "Finishing Plan") and designs the one direction she chose.

✅ **Resolved:** the first screens of a concept come in Prototype, not Plan. Why: Plan is the strategic step; screens invite design feedback before the direction is chosen.

From the Chosen direction section, Sparks builds:

- **Every step of "How it works",** as the people affected would live it: for "Fit check before you buy", adding a vehicle, a product page that says the part fits, one that says it doesn't and shows parts that do, and the cart.
- **A view for each audience** the direction touches. ~~When store staff also see something new, the prototype has a store staff view as well as the customer's.~~ With more than one, Dana switches between them.

  ✅ **Resolved:** a direction customers use in the shop ("Fit check before you buy", "Flag often-returned parts", "Fit check at checkout") gets the customer's screens only. Why: a store staff view made the prototype harder to take in and wasn't what the direction changes; what stores see is in "What it changes for teams". "Complete fit data" keeps its store staff and catalog team views: the routine is the idea.
- **The main other paths,** from the direction's "What we don't know yet" and the brief: a vehicle missing from the fit data, a customer with two saved vehicles, a part that fits only some versions of a model.
- **On the right device for each audience,** from company knowledge: customers on a phone, store staff on the counter computer. Dana can preview either view on any device.

It uses:

- **The design system:** AutoParts Co.'s components, patterns and accessibility standards. Sparks doesn't invent new components when one exists.
- **The live app:** the app Dana confirmed in Plan ([sparks-plan-problem.md](sparks-plan-problem.md), "The live app"), as it is in production: its screens, navigation and look, so what's new stands out. The progress says so ("Checking the app as it's live today"). For a new app, it starts from the design system and similar apps ("Looking at similar AutoParts Co. apps").

  ✅ **Resolved:** the prototype starts from the live app agreed in Plan. Why: it has to match what's already in production.

  ⚠️ **Gap:** in the demo the screens don't come from the app's address; the progress is scripted.
- **What exists today:** when the direction builds on an existing app ("Builds on"), the prototype shows it in that app's context, not on a blank page.
- **Sample data shaped like AutoParts Co.'s:** made-up vehicles, parts, orders and customers that look like the real ones. Under the device, outside it, a small note says so: "Prototype: made-up data, nothing is real." (12px, muted, with a warning icon), ~~a line at the bottom of the prototype's screens~~ so it doesn't take room in the screens or read as part of the shop.

**How the customer's screens look (every direction):** a big-type retail app, in AutoParts Co.'s colors and logo: large headings, generous space, product photos on a soft gray, one dark full-width pill button per screen, pinned to the bottom of the phone (with the part on the desktop). Every direction's customer screens are built from the same pieces, so the shop looks and behaves the same whichever direction was built; the staff, catalog and walkthrough screens keep their own look. For "Fit check before you buy":

- **The vehicle picker** asks one detail at a time (Year, Make, Model, Trim, Engine, "1 of 5"), as tiles instead of dropdowns; picking one moves to the next. What's picked shows above as chips, and selecting one asks that detail again. Once all five are picked, the vehicle shows as it'll be saved, above "Save vehicle". "Use a sample vehicle" fills in all five.
- **Two other ways to add the vehicle,** above the details, as tiles: "Enter your VIN" and "Upload an invoice". ✅ **Resolved:** a VIN is 17 letters and numbers (never I, O or Q; the field says so when it isn't one), and "Use a sample VIN" fills one in. An invoice is one from a past repair; choosing it reads a sample one. Either fills in all five details and asks "From your VIN. Is this your vehicle?" (or "From repair-invoice-march.pdf. …") before "Save vehicle"; any detail can still be changed, and "Back" returns to all the ways. Why: customers often don't know their trim or engine.

  ⚠️ **Gap:** both are pretend. Any valid VIN reads as the sample vehicle, and no file is picked.
- **The saved vehicle** shows in a bar under the store's header on every screen after it, with "Change".
- **A part:** its photo edge to edge, the name, the price and the fit message, then "Parts that fit your {vehicle}" (when it doesn't fit) as cards with a "Fits" badge, then "Other parts" as a row of photo cards that scrolls sideways (a grid on the desktop).
- **The cart:** the item count and total under "Your cart", each part with its photo, price and fit message, then the subtotal, "Pickup at Store 214: Free" and the total, above "Place order". The pretend order confirms with a check, "Order placed" and "Keep shopping".

The other directions use the same pieces:

- **"Flag often-returned parts":** the search in a rounded gray field; results as rows (photo, name, price, the flag: "Often returned", or "Check the fit first" with Evaluate's fix); the flagged part's page with the fit list as a row that opens in place ("Check the fit list" / "Hide the fit list"), then "Other parts"; the cart and order as above.
- **"Fit check at checkout":** "Popular parts" as a grid of photo cards, each with "Add to cart"; the cart as above, with "Go to checkout"; at checkout, "Which vehicle are these parts for?" as tiles (the saved vehicle; "Another vehicle" with Evaluate's fix), and another vehicle picked like the vehicle picker: year, make and model, one at a time.
- **"Complete fit data":** the fit list customers see, on a part page, in a soft gray panel.

✅ **Resolved:** the flag reads ~~"Often returned: check the fit before you buy"~~ "Often returned", and with Evaluate's fix ~~"Check the fit for your vehicle"~~ "Check the fit first". Why: the longer wording ran past the edge of the phone in the results' rows; the part page still explains why it comes back and to check the fit list.

✅ **Resolved:** the customer's screens follow a big-type retail app style, and the vehicle picker asks one detail at a time as tiles instead of five dropdowns. Why: on a phone, five dropdowns read as a form to fill; one question at a time with large tiles is quicker to tap and shows what's left.

✅ **Resolved:** prototypes use realistic synthetic data by default, never actual customer or transaction data. For advanced cases, approved sanitized datasets may be used, with access controls. Sharing a prototype never gives a viewer access to data beyond their own permissions. In the demo, all prototype data is synthetic.

**What the prototype isn't:** it doesn't connect to real systems. Saving a vehicle, placing an order or a store looking up a customer is pretend: it happens on screen, as it would for real, and is listed under "What's pretend". The prototype is a working concept, not production software; developers build that if the concept advances.

## Building it

- **Progress first.** Sparks's reply starts with its progress and nothing else: no summary of what it will build. One live status, with the time counting up ("Popping the hood on your plan…", "Assembling your prototype…", "Taking it for a test drive…"), and under it the latest five steps, each one checked as it finishes ("Reading your plan", "Building the vehicle picker", "Checking it against the design system"). If a screen takes unusually long, Sparks says so. ~~The progress line updates in place (a spinner, then a check: "Built all 5 screens."), and the prototype panel shows "{n} of {total} screens ready" while it builds. A screen not built yet shows "Building {screen}…" in the prototype.~~
- **Done,** the progress folds to one line, "Built in 22s", that opens to show every step, and the same reply goes on to what Sparks built. If Dana has said something since, it comes as a new reply.
- **The prototype starts blank.** Beside the conversation there's only the direction's name until the first screen. Then the device it's for appears, and the screen is assembled in it: its wireframe first, then each piece, top to bottom. Each screen follows the step in the conversation, on its audience's device. The last one stays while Sparks checks it all.
- **Nothing to use until it's done.** The audience and device switchers and the actions show once it's built, on the journey's start.

✅ **Resolved:** Sparks shows its progress first and says what it built at the end ("**Here's what I built:**"), instead of opening with "Here's what we'll build:"; the same however the build starts (a direction's card, "Build it", another path). Why: Dana has just chosen the direction; a summary of it before anything exists is a second read of the same thing, and the prototype was finished before she'd read it.

✅ **Resolved:** the prototype is blank, then assembled as the conversation's steps advance. Why: the built prototype showing at once, next to text saying it will be built, told two different stories.

✅ **Resolved:** Sparks's progress is the same in Prototype, Evaluate and Review: a status with its steps, folding to one line once it's done.
- For "Fit check before you buy", ~~five~~ four screens, in order: the vehicle picker, a part that fits, a part that doesn't fit (with the parts that do), and the cart (with a pretend order)~~, and the store staff lookup (a customer's saved vehicle, and whether a part fits it)~~. A part with no fit data for the vehicle shows "We're not sure this fits", with why.
- ~~Each screen appears in the preview as soon as it's ready. Dana can start clicking through before the rest is done.~~ ✅ **Resolved:** she can't click through until it's all built. Why: the preview moves from screen to screen as Sparks builds; what she'd be clicking would change under her.
- When it's done, Sparks says what it built: the direction, each audience's screens (with the device), where to start and what's pretend, then the question that finishes the step.

> Done. Your plan is finished, and your prototype is ready.
>
> **Here's what I built:**
>
> **Fit check before you buy:** customers save their vehicle once, with its VIN, a past repair invoice or its details, and every product page says whether the part fits.
>
> - **Customer (phone):** the vehicle picker, a part that fits, a part that doesn't fit and the cart.
>
> ~~Your prototype is ready.~~ Start with the customer's phone: add a vehicle with its VIN, a past invoice or its details, then open a few parts and see which fit. Placing an order is pretend; nothing leaves the prototype.

## Trying it

In the Prototype step, the prototype shows beside the conversation, large enough to use, with:

- **The audience switcher** ("Customer", "Store staff"), when the prototype has more than one audience ("Complete fit data").
- **The device switcher** ("Phone", "Desktop"), as icons (a phone, a monitor) named in tooltips. It and the audience switcher sit together in the middle of the toolbar, with the direction's name on the left and the actions on the right.
- **"Try it full screen",** which hides everything but the prototype. Esc or "Back to Sparks" returns to the workspace.
- ~~**"Start over",** which resets the sample data to where it began.~~ ✅ **Resolved:** no "Start over": the toolbar doesn't have it.
- **Arrows on either side of the device,** to go through every screen Sparks built, in the order it built them, each arrow naming in its tooltip the screen it goes to. A screen for another audience switches the audience and its device ("Complete fit data": the catalog team's weekly list on a desktop). The first and last screens disable the arrow past them; switching the audience ~~or "Start over"~~ goes back to where that audience's journey starts. The screens move like a carousel: the next one slides in from the right as the one shown slides out to the left (the other way going back), across the panel's width, behind the arrows. Switching the audience or the device changes the screen in place, without sliding.

  ✅ **Resolved:** the arrows slide the screens horizontally, like a carousel, so Dana sees which way she moved through the screens. Under reduced motion, the screens crossfade.

  ✅ **Resolved:** arrows beside the prototype go through every screen Sparks built, so Dana can see all of them without finding her way through the journey. The same arrows sit under Evaluate's strip (sparks-validate.md, "The agents") and beside the prototype on the reviewers' page.
- **On the right, icon buttons named in tooltips:** "Edit element" ("Changing it"), ~~"Add comment" ("Commenting on it"),~~ ~~"Versions ({n})",~~ ~~"Start over",~~ "Try it full screen". Then the step's button forward, "Evaluate" ("Finishing the step").

  ✅ **Resolved:** the toolbar's actions are icon buttons, each named in a tooltip on hover and keyboard focus (and in its accessible name), and the device switcher shows icons (`Smartphone`, `Monitor`). The audience switcher keeps its words: "Customer" and "Store staff" have no icon that says them. "Edit element" and "Add comment" fill with the brand color while on; only one is on at a time.
- ~~Each audience opens on its device (the customer on a phone, store staff on a desktop); Dana can switch either.~~ The prototype opens on the first audience's device (the customer on a phone); switching the audience keeps the device she's on, and only the device switcher changes it.

  ✅ **Resolved:** switching the audience doesn't change the device. Why: she picked the device; changing it on her when she looks at the other audience is unexpected. The vehicle picker offers "Use a sample vehicle", so she doesn't have to fill in every field to try it. A line at the bottom of every screen says "Prototype: made-up data, nothing is real."

~~⚠️ **Gap:** what she types while trying it isn't applied yet.~~ ✅ **Resolved:** changes are applied ("Changing it").

The conversation stays beside the prototype, so Dana can ask for changes as she tries it. The full concept stays one click away ~~in the "Blueprint" panel~~ in the plan (Plan in the steps), as supporting context ([sparks.md](sparks.md), "The concept workspace").

## Changing it

Dana changes the prototype in plain words, or by typing over its text:

- **In the conversation:** "Make the fit message name the vehicle first." "Add a way to compare two parts that fit."
- **By typing over text:** she selects any text in the prototype and types over it, as in a document.
- **By pointing:** she selects ~~"Point at something"~~ "Edit element", selects any element in the prototype, and types what she wants changed. Sparks knows which element she means.

Sparks makes the change, says what it changed in one line, and saves a new version ("Versions"): "Done: the "Add to cart" button now says "Add to my cart". I've saved it as version 4." The question that finishes the step stays under each change ("Yes, evaluate it", "Go to Review instead").

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
- **Versions:** ~~"Versions ({n})" opens the list~~ the direction's name on the left of the toolbar is the versions menu: the name with a chevron, and "Version {n}" under it (12px, subtle). It opens the list, newest first, each named for what changed, the current one marked "Current" and every other with "Restore". "Go back to how it was" restores the version before the current one. Changing the prototype is something Sparks does on its own when Dana asks ([sparks.md](sparks.md), "What Sparks may do on its own").

  ✅ **Resolved:** the versions are in a menu on the prototype's name, with "Version {n}" under it, not behind a history icon among the actions; with more than one path, the same menu switches paths. Why: the version is part of what she's looking at, so it reads with the name; and the toolbar keeps one icon fewer.

When a change goes beyond simple edits:

- **Beyond the chosen direction** ("Also let customers book an installation"): Sparks says it's a new part of the solution and offers to add it to "What comes later" or go back to the choice in Plan. It doesn't build it silently. Why: the prototype is evaluated against the direction Dana chose; adding features drifts away from it unnoticed.
- **Another direction** ("Let's try a different direction"): the choice reopens in Plan, as it does from "Go back to the choice" above.

✅ **Resolved:** going back to the choice from Prototype, from "Go back to the choice" or in her words, reopens the choice in Plan in the same conversation ([sparks-plan-compare.md](sparks-plan-compare.md), "Going back to the choice"). The prototype she leaves stays in the concept; a new pick is built from version 1.
- **Against the design system or its accessibility standards** ("Make the text light gray"): Sparks explains in one sentence and offers the closest option that follows them. If Dana insists, Sparks makes the change and records it under "Departs from the design system", so the UX team sees it in Review.
- **Needs something AutoParts Co. doesn't have** (live stock at the nearest store, which stores don't report in real time): Sparks builds it as pretend and records it under "Needs what AutoParts Co. doesn't have yet", from engineering context. Evaluate and Review pick it up.

## Fixing a finding

"Fix in the prototype", on a finding in Evaluate or on a scenario that ran into it ([sparks-validate.md](sparks-validate.md), "Fixing and running again"), brings Dana here to work out the solution with Sparks:

1. **The page.** Prototype opens on the page, the part and the spot where the finding happens, for whoever it happens to (e.g. the spark plugs with no fit data, on the customer's phone). A finding that isn't on one page leaves the prototype where it starts.
2. **The plan first.** Her message names the finding ("Fix finding 2: "We're not sure this fits" leaves people with no next step."). Sparks thinks, then shows its plan: what it will change, step by step, what stays as it is, why, and the version it will be. It asks "Should I make this change?". Nothing has changed yet.
3. **Suggested follow-ups.** The quick replies are "Make this change" (↵) and up to two follow-ups that take it further ("Also name the vehicle first", "Also offer "Tell me when you know""). Picking a follow-up makes the plan and the follow-up together, as one version. She can also say what she'd do instead, in her own words, or point at something ("Edit element"); when Sparks can't do what she asks, it says so and the plan still waits.
4. **Made.** The change shows on the page she's on. Sparks says what it changed and the version, that the finding stays to be checked until the evaluation runs again, and asks "Ready for me to evaluate it again?": "Yes, evaluate it" (↵), "Fix finding {n} next" when the prototype can fix another, and the follow-ups left. "Fix finding {n} next" opens that finding's page and plan, with no trip back to Evaluate.

**Already fixed:** "Change the fix in the prototype" opens the same page; Sparks says what was done and in which version, and asks "What would you change about it?", with the follow-ups left.

The follow-ups, by finding:

- **Fit check before you buy:** the fit message's place: name the vehicle first; make it bigger. "We're not sure this fits": "Tell me when you know" (pretend: nothing is sent); name the vehicle first.
- **Flag often-returned parts:** the flag's words: how often the part comes back; the fit list open.
- **Fit check at checkout:** the late warning: why it doesn't fit; the price difference on the swap. One vehicle: why it doesn't fit; name the vehicle first.
- **Complete fit data:** both counter findings: make "Note it" bigger.

✅ **Resolved:** fixing a finding happens in Prototype's conversation, plan first. Why: Dana finds the solution with Sparks instead of taking a ready-made one, sees the page while they talk, and one recommended plan with a couple of follow-ups keeps it to one decision.

✅ **Resolved:** beside the prototype, quick replies sit one per row; in Plan they stay in a row. Why: in the narrow conversation they wrapped unevenly.

## Paths

Each direction Dana builds is a path in the prototype: Plan's pick first, then each one she tries from a direction card or the plan ("Generate prototype", [sparks-plan-compare.md](sparks-plan-compare.md), "Directions in the plan") or picks after going back to the choice. Nothing is replaced.

- **Which direction it is:** the toolbar always starts with the direction the prototype was built from, numbered as on its card ("1. Fit check before you buy"), so it's clear what she's trying.

  ✅ **Resolved:** the prototype names its direction, with one path too.
- **Switching:** with more than one path, ~~a switcher leads the toolbar~~ ~~that name becomes a switcher, in the same place ("Path"),~~ the same menu lists the paths first ("Paths"), then the versions of the one shown, each path named as in the directions ("2. Flag often-returned parts"), in the order built. Switching shows that path where she left it; pointing stops.
- **Each path has its own** build, versions (in the name's menu, with restoring), comments ("Commenting on it") and Evaluate runs ([sparks-validate.md](sparks-validate.md)). A path being built keeps building while she looks at another.
- **In the plan,** "What we built" ~~and "The evaluation"~~ and the Prototype and Evaluate lines in "Where it stands" are the path shown's, named after it once there's more than one path ("What we built: Flag often-returned parts").
- **Review** is about one path: the one she sends there ([sparks-review.md](sparks-review.md)).

✅ **Resolved:** another direction becomes another path, beside the first, not a replacement. Each path keeps its own versions, comments and evaluation; any path can be validated; one goes to Review.

⚠️ **Gap:** Review doesn't show the other paths as alternatives considered yet, with their results; the plan shows one path's prototype ~~and evaluation~~ and where its evaluation stands at a time (the one shown), not each path's.

## Commenting on it

Dana can leave comments on the prototype itself, pinned where they apply, as notes on what she's trying.

- **"Add comment"** (a speech bubble with a plus), ~~on the prototype's toolbar~~ in the Comments panel's header, beside its X, turns commenting on; Esc, the button again, or closing the panel turns it off. It can be selected while a prototype that takes comments is on screen (built, in Prototype or Review). Elsewhere (Plan, Evaluate, while the prototype is built) it still shows, faded, and can't be selected; its tooltip says "Add comments in Prototype and Review".

  The same comments work on the idea for review, beside the prototype, and can start from selected text there ([sparks-review.md](sparks-review.md), "Comments on the idea").

  ✅ **Resolved:** "Add comment" is in the Comments panel, not on the prototype's toolbar, on Dana's and the reviewers' pages alike. Why: adding a comment and reading them belong together; the toolbar keeps what changes and tries the prototype. While it's on, the prototype doesn't respond to clicks: a click drops a pin there instead (Enter does it on the element with focus).
- **The pin and its box:** the pin is her avatar in a white drop whose point marks the spot (blue while it's open). Under it, a box to write in, "Add a comment", with "@" at the bottom left and a send button on the right; Enter adds the comment, Shift+Enter starts a new line, Esc or a click outside drops it.
- **Tagging people and teams:** "@" (the button, named "Mention someone", or typed after a space) lists the people (with their team) and departments (with their size) whose name starts with what she types after it, under the box: the same list as Share's field ([sparks.md](sparks.md), "Sharing a concept"). ↑/↓ move, Enter, Tab or a click picks, Esc closes only the list. Picking puts "@Priya Shah" in the text; in the thread, the Comments panel and the reviewers' page, a tag shows in the brand color. Replies can tag too.
- **After adding it,** the pin stays where she put it. Selecting it opens the comment: who (and a reviewer's team, "UX team"), when, the text~~ and "Delete comment"~~, then its thread. Commenting stays on, so she can add another.
- **The thread:** the replies, oldest first, and a box to reply (Enter sends). "Mark as resolved" (a check) closes it: its pin leaves the prototype and the comment moves to "Resolved" in the Comments panel, from where it can be opened and reopened ("Reopen"). A reply reopens a resolved comment. "Delete comment" only on one's own.
- **Reviewers comment the same way** on the published version ([sparks-review.md](sparks-review.md), "What reviewers see and do"). Their pins show on Dana's prototype too, with their name and team, and she replies or resolves them there.
- **Where pins show:** every comment that isn't resolved shows its pin, over everything on the screen (the bottom bar too). A pin is attached to what she clicked, so it moves with it and shows only ~~while it's on screen~~ on the screen it was added on (for a part's page, that part's); on the audience and device it was added on.
- **Opening one from the Comments panel** goes to where it is: its path, audience, device and screen (with its part), brought into view if it's further down, with its thread open on its pin. Already on that screen, the screen stays as it is. With another comment open, that one closes. A resolved comment's pin shows while it's open. The same on Dana's side and on the reviewers' page.

✅ **Resolved:** open comments always show as pins on the prototype, and selecting one in the Comments panel takes her to its screen and opens it there.

✅ **Resolved:** comments on the prototype are pinned where she clicks, with a popover to write the comment, and the pin stays after it's added. Built as `PrototypeComments` (`prototype/prototype-comments.tsx`), after a typical comment pin and box from a reference screenshot (not in Figma yet).

✅ **Resolved:** the comments show in the header's Comments panel, under "On the prototype" ([sparks.md](sparks.md), "The concept workspace"); selecting one there goes to its screen and opens its pin.

✅ **Resolved:** comments are threads: anyone who can see them replies, and Dana or the reviewer resolves them. Selecting one in the Comments panel, from any step, opens Prototype on its path (on Review, the prototype there) with its thread open on its pin. Why: reviewers' feedback on the prototype is a conversation about a spot on the screen; it should be answered and closed there.

✅ **Resolved:** comments and replies can tag people and departments with "@", from the same list as Share. Why: a comment is often for a specific team ("@Catalog, is the fit list right?"); tagging says who should answer.

⚠️ **Gap:** a tagged person or department isn't notified yet, and tagging doesn't give access: someone tagged who can't see the concept should be offered to Share. The list is sample data.

⚠️ **Gap:** ~~the comments stay in the prototype: they don't show in the header's Comments panel,~~ ~~reviewers can't see them or reply in Review,~~ Sparks doesn't act on them (that's "Edit element"). Not designed: whether a comment can also be sent to Sparks as a change, and mentioning someone (@) or reacting with an emoji, which the example showed.

## Versions

- Every change Dana asks for saves a version, named for what changed ("Fit message names the vehicle first").
- She can open any earlier version and restore it. Restoring saves it as the newest version; nothing is lost. ~~The plan's versions use the same "Versions ({n})" menu ([sparks.md](sparks.md), "The finished plan").~~
- Evaluate evaluates the version that's current when it runs; Review shows the version that's current when she submits for a decision.

## When the plan changes

Once Plan is done, Dana can change it ~~in the plan ([sparks.md](sparks.md), "The finished plan"). When a change alters what Plan says (not only its wording), the prototype may no longer fit:~~ by changing one of her answers in Plan's conversation ([sparks.md](sparks.md), "Changing an answer"). The summary it feeds changes, so the prototype may no longer fit:

- **Sparks offers first:** "Want me to update the prototype to match?", with "Yes, update it" and "Not now". It never updates the prototype on its own.
- **"Yes, update it"** opens Prototype and saves a new version that matches the plan ("Matched to the plan"), so the earlier one can still be restored.
- **While it doesn't match,** the prototype shows a note above it: "Built from an earlier version of the plan: you've since changed what success looks like." (every part changed since, in words), with "Update prototype", which does the same as "Yes, update it". "Where it stands" in the plan says "Built from an earlier version of the plan." for the prototype and "Run on an earlier version of the plan." for Evaluate's last run.

✅ **Resolved:** after a change in the plan, Sparks offers to update the prototype and waits for her yes; a prototype built from an earlier version of the plan says so until it's updated.

ℹ️ Built: `PrototypePanel` `notice` (`text`, `actionLabel`, `onAction`), a `role='status'` note on `warning-subtle` between the toolbar and the prototype. In the demo, the update saves a version without changing the screens, since the fit check's screens don't depend on the edited text. One note covers every path.

## When the direction isn't software

Not every experiment needs an interactive screen. Some directions are mostly a change in how a team works: a store routine, a new returns process, a change to what an email says.

For those, Prototype builds the most appropriate testable artifact instead: the closest thing that can be tried and evaluated.

- **The pieces the process uses:** the script on the store's counter screen, the message or email templates, a form the team fills in. Built with the design system, like any prototype.
- **A step-by-step walkthrough** of the process for each audience: what happens, who does what, and what each person sees or hears.
- **Mixed directions** get both: screens for the parts that are software, a walkthrough for the rest.

Sparks says which kind of artifact ~~it's building and why, before it starts: "This direction is mostly a new store routine, so I'll build the counter screen with its script and a walkthrough of a customer's visit."~~ it built and why, with what it built: "This direction is mostly a new routine for stores and the catalog team, so I built the screens it uses and a walkthrough of how it fits together."

Everything else in this step works the same: trying it, changing it in plain words or by pointing, versions, and finishing. Evaluate evaluates the artifact the same way ([sparks-validate.md](sparks-validate.md), "What gets evaluated").

✅ **Resolved:** Prototype builds a clickable prototype or another appropriate testable artifact, depending on the direction. Not every business experiment needs an interactive screen; what matters is that it can be tried and evaluated.

## The Prototype section

What the step adds to the concept (~~the "Concept" "Blueprint" panel~~ the plan, [sparks.md](sparks.md), "The finished plan"). ⚠️ With no plan document, nothing shows it on screen yet: the samples keep what's in it, what's pretend and the sample data for each direction (`direction-prototypes.tsx`).

| Part | Holds | Needed to continue |
| --- | --- | --- |
| The prototype | The current version, ready to try | Yes |
| What's in it | Each audience's screens, and which step of "How it works" each one covers | Yes (Sparks fills it in) |
| What's pretend | What happens on screen but not for real: saving a vehicle, placing an order, payments | Yes (Sparks fills it in) |
| Sample data | What the made-up data represents ("12 vehicles and 40 parts, 6 of them with gaps in fit data") | Yes (Sparks fills it in) |
| Needs what AutoParts Co. doesn't have yet | Data or capabilities the real thing would need, with the source | No |
| Departs from the design system | Changes Dana kept that the design system or its standards don't support | No |
| Versions | Every version, newest first | Yes (kept automatically) |

~~How it shows, as built (`PrototypeSection` in the plan, titled "What we built", after Plan's "What we'll build"; ~~under the "Prototype" step~~ the plan no longer groups sections by step). It stays in the plan, unlike the evaluation and the review, because it's spec: what's pretend and what the real thing would need aren't in the Prototype step's panel, which is the prototype itself. "Where it stands" adds one line for the prototype ("Version 3: …"), with "Open":~~ Removed with the plan document (`PrototypeSection`).

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
- When it's complete, Sparks asks: "**Ready for me to put it through its paces?** In Evaluate, I'll work it through realistic scenarios ~~for customers and store staff~~, and check it against AutoParts Co.'s data." Quick replies: "Yes, evaluate it", "Go to Review instead". She can keep trying and changing it first; the question stays.
- ~~Selecting "Continue to Evaluate" marks Prototype as Done and opens Evaluate.~~ ~~"Yes, evaluate it" marks Prototype as Done and starts Evaluate in the same conversation, with no button: ~~Sparks shows its evaluation plan ([sparks-validate.md](sparks-validate.md), "The evaluation plan")~~ Sparks runs the evaluation and says what it found ([sparks-validate.md](sparks-validate.md), "Running it").~~ ✅ **Resolved:** "Yes, evaluate it" marks Prototype as Done and opens Evaluate, where the run starts at once, beside the prototype, with no conversation ([sparks-validate.md](sparks-validate.md), "Evaluate's screen", "Running it"). Sparks's answer stays in Prototype's conversation: "On it. I'm trying it in Evaluate: the scenarios work the prototype there, and the results come in beside it."
- **"Evaluate",** the dark button at the end of the toolbar, does the same as "Yes, evaluate it": Evaluate opens and the run starts. After a change to the prototype, or a run she stopped, it reads "Evaluate again". With results for the version she's on, or a run going, it only opens them. It's hidden while the prototype is built.

  ✅ **Resolved:** Prototype has "Evaluate" in its toolbar, besides the quick reply. Why: "Yes, evaluate it" scrolls away as she talks with Sparks, and each step has its way forward in the same place ([sparks.md](sparks.md), "Moving through the steps").
- Evaluate is optional. With the same condition, Dana can go to Review instead ("Go to Review instead", or "Add to Review" after selecting Review in the steps): Prototype is marked Done and Evaluate shows as Skipped ([sparks.md](sparks.md), "Moving through the steps"). Sparks's answer stays in Prototype's conversation: "On it. The prototype is in your plan, and we'll skip Evaluate. I'm putting your idea together in Review."

✅ **Resolved:** Prototype starts from ~~"Looks right, continue"~~ "Build it" and ends with a question and its quick replies, not "Continue to Prototype" or "Continue to Evaluate" buttons. Why: like the parts of Plan, the conversation moves on when Dana answers; a button adds a stop it doesn't need (sparks.md, "Moving through the steps").

Changing the prototype after Evaluate is Done marks Evaluate and Review as Needs a check, if they're Done ([sparks.md](sparks.md), "Moving through the steps"). Changing something in Plan after Prototype is Done doesn't rebuild the prototype on its own: Sparks suggests the changes it would make, and Dana accepts them.

The prototype isn't shared with anyone before Review ([sparks.md](sparks.md), "Bringing others in").

## States

| State | What shows | What Dana can do |
| --- | --- | --- |
| Building | Progress by step; a blank panel, then each screen as it's assembled | ~~Try the ready screens,~~ Keep talking to Sparks, stop it |
| Ready | "Built in {time}" and what Sparks built; the prototype in the preview | Try it, change it, go full screen |
| Changing | The change being made, then a one-line summary of it | Keep trying it, undo by restoring the previous version |
| Fixing a finding | The page it happens on; Sparks's plan, "Make this change" and the follow-ups | Make it, take it further, say what she'd do instead, leave it |
| Change goes beyond the direction | Sparks's note and its options | Add it to "What comes later", go back to the choice in Plan, drop it |
| Change goes against the design system | Sparks's reason and the closest option | Take the option, or keep her change |
| Building failed | "I couldn't finish building {screen}. Your last version is still here." and "Try again" | Try again, keep using the last version |
| A step not covered | Which step, and Sparks's offer | Build it, leave it for later |
| Ready to continue | Sparks's question, with "Yes, evaluate it" and "Go to Review instead" | Continue, go to Review without Evaluate, or keep changing it |

✅ **Resolved:** the answer that starts Evaluate is "Yes, evaluate it", not "Yes, test it", like the step and its "Evaluate the prototype". Why: one word for the step everywhere; "test" also suggested testing with real people, which Evaluate isn't.

## Checks

What Dana says → what Sparks must do:

| Dana | Sparks must |
| --- | --- |
| Says ~~"Looks right, continue"~~ "Build it" at the end of Plan | Build every step of "How it works" for each audience, with the design system and made-up sample data |
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
- Given a finding the prototype can fix, when Dana selects "Fix in the prototype", then Prototype opens on its page with Sparks's plan, and no version is saved until she picks a reply or asks for a change.
- If building fails, the last working version stays available with "Try again".
- Sparks asks "Ready for me to put it through its paces?" only when every step of "How it works" is covered or Dana has accepted leaving one out.
- Nobody else can open the prototype before Review.

## Out of scope

- The workspace, step states, suggestions, Sparks's voice and company knowledge access: [sparks.md](sparks.md).
- Choosing the direction: [sparks-plan-compare.md](sparks-plan-compare.md).
- Evaluating the prototype: [sparks-validate.md](sparks-validate.md).
