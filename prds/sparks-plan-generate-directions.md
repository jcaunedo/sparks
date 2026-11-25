<!--
Created: Nov 21, 2026
Created by: Julio Caunedo
Last updated: Nov 24, 2026 ("Fit check before you buy" adds the vehicle with its VIN, a past repair invoice or its details; a divider starts this part, and the confirmation is above it; the whole header of a direction card opens and closes it, with chevrons after its labels; the step "Validate" renamed "Evaluate"; Sparks's recommendation comes before the direction cards, and the reply ends with how to pick, a card's "Generate prototype": no "Want to go with …?" and no quick replies; the direction card follows sparks.ds "direction-card": "Show more" / "Show less" instead of "More about it", "Generate prototype" full width at the bottom, where it changes things in orange; "in your plan" instead of "in your blueprint"; Plan becomes the Blueprint once it's done: what this part adds shows there, not in a panel during Plan; Sparks thinks one line at a time, in automotive terms, before it replies; each direction card has "Generate prototype"; the directions' reply is titled "Next, pick the path to prototype first.", its confirmation regular, and says the others can be tried later from the Blueprint; Sparks's confirmation says "in your blueprint"; each card's title is numbered, "1. Fit check before you buy", with its labels on the right of the same line; all four directions in one reply, rated, with Sparks's pick and one question, "Want to go with …?"; no screen previews in Plan, and no keeping or setting aside one by one; Sparks says "what success looks like", as the card is named; a set-aside idea is kept "with your ideas for later", as the problem card names it; "Yes, compare them" goes straight into the comparison; the fourth direction, "Complete fit data", built, with a workflow preview and "Changes how teams work"; the question that finishes the part built, and what happens with none kept; the third direction, "Fit check at checkout", built, with a checkout preview; the second direction, Dana's own idea, built, with a search results preview; one direction at a time, each with "Keep it" and "Set it aside"; the first direction, "Fit check before you buy", built, with its preview and details that open; Dana's idea in the demo is flagging often-returned parts, not a fitment checker; One to four kept directions)
Scope: the Generate directions part of Plan, the fourth of Plan's five parts: how Sparks proposes different ways to solve the problem, what each direction shows, Sparks's pick, and the Directions it adds to the concept.
Purpose: defines how Dana sees a real range of solutions, grounded in what AutoParts Co. already has, before she commits to one.
-->

# Plan: Generate directions — Sparks

**Location:** the fourth part of Plan ([sparks.md](sparks.md), "Plan"). The conversation reaches it as soon as Dana approves the success criteria ([sparks-plan-define-success.md](sparks-plan-define-success.md), "Finishing this part"). She can come back to it by asking Sparks, or, once Plan is done, from the plan ("Show me the directions again").
**Audience:** experienced AutoParts Co. employees who know the business but aren't designers or engineers. The reference user is Dana, a Senior Product Manager.
**Description:** the part of Plan where Sparks proposes two to four meaningful, different ways to solve the problem, all at once as short cards in the conversation (where each changes things, its effect, effort and risk, and its catch), recommends one, ~~and asks Dana if she wants to go with it~~ and Dana picks one with its card's "Generate prototype".
**Status:** defined. Built as a reference layout: the reply that puts what success looks like in the concept shows all four directions as cards (`DirectionCard`), Sparks's pick first with "Recommended" and Dana's with "Your idea", after Sparks's recommendation ~~and "Want to go with 'Fit check before you buy'?", with "Yes, go with it" and the other directions' names~~ (`SparksWorkspace`). A card's "Generate prototype" picks it and starts building ([sparks-plan-compare.md](sparks-plan-compare.md), "Directions in the plan"); typed, a direction's name (or "Yes, go with it") goes into "What we'll build" ([sparks-plan-compare.md](sparks-plan-compare.md)). Not built: shaping the directions in words (Sparks says "Thanks, I'll work that in." and points back to the cards).

---

## Purpose

This is the first part of Plan about solutions. Until now, Dana and Sparks have agreed on the problem and what success means. Now Sparks opens the range: different ways to solve the same problem, from a quick fix to a bigger change, each explained in plain words.

Most people stop at the first solution that comes to mind, usually the one they walked in with. Seeing several, side by side with their trade-offs, shows Dana options she wouldn't have thought of and makes her own idea stronger or shows why another one fits better.

~~It works when Dana has two to four directions she understands well enough to explain to a colleague, and she's set aside the rest knowingly.~~ It works when Dana understands the directions well enough to explain them to a colleague, and goes with one in a tap, because Sparks did the weighing and said why.

~~This part widens; the choice narrows ([sparks-plan-compare.md](sparks-plan-compare.md)). Sparks doesn't rank the directions here.~~ This part widens and Sparks narrows: it shows the range and recommends one, so Dana approves instead of weighing everything herself (sparks.md, "Sparks decides, Dana approves").

ℹ️ Related specs: the workspace, Plan and how its parts flow, step states, suggestions, how Sparks talks and company knowledge are in [sparks.md](sparks.md). The problem brief is in [sparks-plan-clarify.md](sparks-plan-clarify.md), the success criteria in [sparks-plan-define-success.md](sparks-plan-define-success.md), and "Ideas to explore" starts in [sparks-plan-problem.md](sparks-plan-problem.md).

## Starting this part

Sparks reads the problem brief, the success criteria and "Ideas to explore", and checks company knowledge: what existing apps already do, what the platform can and can't do, what the design system has, and what's been tried. ~~Then it shows two to four directions as cards in the conversation, as many as are meaningfully different, each as a suggestion, and introduces them:~~ Then it says how many directions it found and shows them one at a time, each as a card, in the order of the example below.

> ~~Here are four different ways to solve it, from a quick fix to a bigger change. Your fitment checker idea is the first one. Take a look and tell me which ones are worth comparing.~~
> ~~Here are four different ways to solve it, from a quick fix to a bigger change. Your idea, flagging parts that get returned a lot, is the second one. Take a look and tell me which ones are worth comparing.~~

~~✅ **Resolved:** each direction card has "Generate prototype" on the right of "Show more" ("Open prototype" once it's built), the same action as in the plan ([sparks-plan-compare.md](sparks-plan-compare.md), "Directions in the plan").~~ ✅ **Resolved:** each direction card ends with "Generate prototype" ("Open prototype" once it's built), a full-width button under "Show more", the same action as in the plan. "Show more" / "Show less" (a link in the brand color, with a chevron) opens and closes the rest; open, it sits under the details (sparks.ds "direction-card", 89:151). The place it changes things shows in the decorative orange, after a map pin. ✅ **Resolved:** the whole header of a card (its name, labels, idea and where) opens and closes the rest too, like "Show more". Chevrons after the labels show it: pointing apart when closed, together when open, light gray until the header is hovered (sparks.ds "direction-card", 89:151).

✅ **Resolved:** the directions' reply is titled "**Next, pick the path to prototype first.**" (bold: what comes next, the first prototype of possibly several paths), after the confirmation, now regular, and says the others can be tried later from the plan, as paths ([sparks-plan-compare.md](sparks-plan-compare.md), "Directions in the plan").

All the directions come in the reply that puts what success looks like in the concept, with no button in between ([sparks-plan-define-success.md](sparks-plan-define-success.md), "Finishing this part"), Sparks's pick first:

> Done. What success looks like is in your plan. (regular, not bold; at the end of the summary)
>
> [Divider]
>
> **Next, pick the path to prototype first.**
>
> ~~Now, ways to get there. I found four,~~ I found four ways to get there, from a quick fix to a bigger change, and your idea is one of them. Your main measure is fewer "doesn't fit" returns, so I weighed which one cuts them most, without putting online sales at risk. Each one can become its own prototype: we'll start with one, and you can try the others later from your plan. ~~Here they are, my pick first:~~
>
> I'd go with "Fit check before you buy". It should cut "doesn't fit" returns the most: customers who used last year's vehicle selector returned far fewer, and this one checks without anyone having to look for it. Customers don't need to know their engine or trim, either: they can enter their VIN or upload an invoice from a past repair. It's Medium effort, since it builds on the vehicles customers already save. The catch is timing: product pages can't change until early January.
>
> Your idea, "Flag often-returned parts", is the quickest to build. But it says a part comes back a lot, not whether it fits, so it would cut fewer of these returns. It could work alongside "Fit check before you buy" later.
>
> Here they are, my pick first. Select "Generate prototype" on the one you want to start with.
>
> [Direction card: "Recommended", Fit check before you buy]
> [Direction card: "Your idea", Flag often-returned parts]
> [Direction card: Fit check at checkout]
> [Direction card: Complete fit data]
>
> ~~**Want to go with "Fit check before you buy"?** Or pick another below.~~

- **Picking:** each card's "Generate prototype" picks it and starts building it ([sparks-plan-compare.md](sparks-plan-compare.md), "Directions in the plan"). ~~**Quick replies:** "Yes, go with it", then the name of each other direction, so choosing another is one tap. Her pick goes straight into "What we'll build" ([sparks-plan-compare.md](sparks-plan-compare.md), "Choosing").~~ No question and no quick replies after the cards. Typing a direction's name, or "Yes, go with it", still picks it and brings "What we'll build" first ([sparks-plan-compare.md](sparks-plan-compare.md), "Choosing").

  ✅ **Resolved:** the recommendation comes before the cards, and the reply ends with how to pick, a card's "Generate prototype", instead of "Want to go with …?" and a quick reply per direction under the cards. Why: she reads why Sparks picks one before comparing the cards, and the cards' own button already does the choosing; a second set of buttons for the same choice, far from the cards, was one too many.
- **Anything else she types** (a doubt, a change) gets "Thanks, I'll work that in." and ~~the question again~~ "When you're ready, select "Generate prototype" on the one you want to start with." ("Shaping the directions").
- **Her idea is always addressed** when it isn't the pick: what it's good at, and plainly why it falls short on the main measure. Never dismissed without a reason.

~~Sparks showed the directions one at a time, each as a card ("Direction 1 of 4") with a screen-like preview and "Is this one worth comparing?", with "Keep it" and "Set it aside"; after the last, it asked "Ready to set them side by side against what success looks like?", with "Yes, compare them" and "Not yet", and with none kept, which one to bring back.~~

✅ **Resolved:** all the directions in one reply, rated, with Sparks's pick and one question, instead of one at a time with "Keep it" or "Set it aside" for each. Why: Dana isn't a designer, and four keep-or-set-aside decisions, then "ready to compare?", then "what matters most?", put the weighing on her. Now Sparks weighs them against what she already agreed and recommends one; she approves it, or picks another, in one tap. The cards are short (no preview), so four at once read easily.

The conversation shows what Sparks is checking while it drafts: ~~"Looking at what Sales and Care already do and what's been tried…"~~ "Looking at what Sales and Care already have in the garage…", "Checking the mileage on past experiments…", "Mapping routes, from a quick fix to a bigger change…", one at a time ([sparks.md](sparks.md), "The concept workspace").

## How the directions differ

Sparks proposes directions that are genuinely different, not versions of the same idea. Across the set:

- **Different approaches.** For example: prevent the problem, help people when it happens, or fix its cause. Or: the customer helps themselves, or a team helps them.
- **Different sizes,** where that's meaningful: a small, quick direction next to a bolder one.
- **Only meaningful alternatives.** Sparks proposes as many as add value, from two to four. It never pads the set with a direction that's only a variation of another.
- **Built on what exists.** At least one direction builds on an existing AutoPartsHUB app or capability, when one is relevant.
- **Not only software.** A direction can be a change in how a team works (a store routine, a new catalog process) when the evidence points to it. Its card says so. Prototype builds a testable artifact for it ([sparks-prototype.md](sparks-prototype.md), "When the direction isn't software").
- **Dana's ideas included.** Every idea under "Ideas to explore" becomes a direction or part of one. If Sparks leaves one out, it says why ("It breaks a limit in the brief") and Dana can bring it back.

✅ **Resolved:** Generate directions produces two to four meaningful alternatives, without forcing more when they add no value.

Example, for wrong-part returns:

1. **Fit check before you buy:** the customer saves their vehicle once, with its VIN, a past repair invoice or its details (year, make, model, trim and engine), and every product page says whether the part fits. ~~(Dana's fitment checker.)~~ ~~Preview: a product page wireframe.~~ Where: on the product page.
2. ~~**Ask a store expert:** from the product page, a chat with staff at the nearest store about whether a part fits. Preview: a conversation example.~~ **Flag often-returned parts:** search results mark parts that get returned a lot, with a reminder to check fit before buying. (Dana's idea.) ~~Preview: a search results wireframe.~~ Where: in search results. Its catch: "It says a part comes back a lot, not whether it fits your car." 
3. **Fit check at checkout:** checkout asks for the vehicle and flags anything in the cart that doesn't fit. ~~Preview: a checkout wireframe.~~ Where: at checkout.
4. **Complete fit data:** the catalog team fills the gaps in fit data for older vehicles, with stores reporting parts that came back as "doesn't fit". ~~Preview: a workflow diagram.~~ Where: behind the scenes, with stores, the returns team and the catalog team.

Why: the first idea is rarely the best one, and comparing only versions of one idea isn't a choice.

✅ **Resolved:** in the demo, Dana's own idea is "Flag often-returned parts", from her first message. It's one of the four directions, rated like the others, and Sparks is honest about its limit: it shows how often a part comes back, not whether it fits her car.

✅ **Resolved:** the ways to identify the car (its VIN, a past repair invoice, or its details) are part of "Fit check before you buy", not a fifth direction and not part of Dana's first message. Why: her message says people should "double-check" without saying how, and that's the gap Sparks's recommendation fills; customers often don't know their engine or trim, and a VIN or an invoice can say it. The card says what's uncertain: how many invoices can be read, and that reading VINs and invoices is new.

## What each direction shows

Each direction is a card in the conversation. ~~The cards sit side by side, and each opens to show its details:~~ ~~The card shows the preview, "Direction {n} of {count}", the name, the idea, what's good, what's hard and anything tried before; "More about it" opens the rest (how it works, expected impact, builds on, rough effort, what we don't know yet, departments it touches). A badge says "Your idea" on Dana's, and "Kept" or "Set aside" once she answers.~~ The card shows "Recommended" on Sparks's pick and "Your idea" on Dana's, the name, the idea, where it changes things ("On the product page"), three ratings in words (Effect, Effort, Risk) and the catch, its main downside in one line. "Show more" opens the rest: what's good, how it works, expected effect, tried before, the reasons for the effort and risk, builds on, what we don't know yet and the teams it touches. The parts:

| Part | Holds |
| --- | --- |
| Name | A short, plain name, numbered in the order shown, Sparks's pick first ("1. Fit check before you buy"), with its labels ("Recommended", "Your idea") right-aligned on the same line |
| ~~Visual preview~~ | ~~A lightweight picture of its key moment ("Visual previews")~~ |
| Where | Where it changes things, in plain words: "On the product page", "At checkout", "Behind the scenes: stores, the returns team and the catalog team" |
| Effect, Effort, Risk | Three words: Big, Some, Little or Unclear effect on the main measure; Small, Medium or Large effort; Low, Medium or High risk. Their reasons are under "Show more" |
| The catch | Its main downside, in one line: a broken limit, something at risk, or its biggest weakness |
| The idea | One sentence |
| How it works | Three to five steps, as the person affected would live them: "You add your car once: enter its VIN, upload an invoice from a past repair, or pick the year, make, model, trim and engine. You check it's the right car, and save it. Every part says 'Fits your 2015 F-150' or 'Doesn't fit'. If it doesn't, you see parts that do." |
| Expected impact | Which success measures it's likely to move, and why: evidence with its source, or an assumption |
| Builds on | Existing apps, data and design system patterns it reuses: "Uses the vehicles customers already save in their account" |
| What's good | Its main strengths, in a few words |
| ~~What's hard~~ | ~~Its main costs and risks, in a few words~~ (the catch, and the effort and risk reasons) |
| Rough effort | Small, Medium or Large, with a one-line reason from engineering context |
| What we don't know yet | The questions it raises, which become assumptions if it's chosen |
| Departments it touches | From the brief's "Who's involved" |

- **Ratings are words, never scores,** and there's no total. ~~"Expected impact" isn't a score. It says which measures a direction aims at, not by how much. The choice and Evaluate do the estimating.~~ Evaluate does the estimating.
- **Rough effort is Sparks's estimate,** labeled as such. It says what makes it small or large ("Needs fit data for every part in the catalog"), never a number of weeks. Engineering confirms effort in Review.
- **What's been tried is called out.** If a direction looks like a previous experiment, the card says so and what was learned: "A vehicle selector was tested on product pages last year. Customers who used it returned far fewer parts as 'doesn't fit', but most skipped it, so returns barely dropped overall."
- **A broken limit is flagged, not hidden.** If a direction conflicts with the brief's "Limits" ("Product pages can't change before the holiday season"), the card says so in its catch. Sparks doesn't propose such a direction on its own, but keeps Dana's idea even when it breaks a limit.

✅ **Resolved:** each direction's title starts with its number (1, 2…, in the order shown), and its labels sit on the right of the title's line, not above it; the plan's "Directions" lists them the same way. Why: Dana can refer to "the second one", and the names line up from card to card.

## Visual previews

~~**Visualize early, commit later.** Each direction has a lightweight visual preview of its key moment, so Dana can understand and compare ideas without design skills, without confusing exploring with building. The preview takes the form that fits the direction: a message preview, a simplified wireframe, a workflow diagram or a conversation example, marked "Preview".~~

~~✅ **Resolved:** each direction includes a visual preview whose form fits the direction (message preview, simplified wireframe, workflow diagram, conversation example), lightweight and clearly conceptual, not a forced hand-drawn style. Ideas beyond digital interfaces get a preview that fits them too.~~

**No screens in Plan.** A direction card says in words where it changes things ("On the product page"); the first screens Dana sees are the prototype of the direction she chose ([sparks-prototype.md](sparks-prototype.md)).

✅ **Resolved:** direction cards have no visual preview. Why: a screen-like preview reads as a design, so Dana reacts to the badge or the button instead of weighing effect, effort and risk, and it looks like the start of the prototype when three of the four are thrown away. Plan stays strategic; Prototype designs and builds the one she chose.

## Sparks's pick

Sparks recommends one direction in the same reply, weighing what Dana already agreed instead of asking her what matters most:

1. **The biggest effect on her main measure** (from what success looks like).
2. **Nothing at risk among what must not get worse** (online sales, for "Wrong-part returns").
3. **The least effort.**

It says what it weighed in one line before the cards ("Your main measure is fewer 'doesn't fit' returns, so I weighed which one cuts them most, without putting online sales at risk."). With no evidence on her main measure (repeat purchases, or one in her own words), it weighs the returns and says so. The recommendation names the catch, and her idea is always addressed when it isn't the pick. It's a suggestion: choosing is hers.

✅ **Resolved:** Sparks doesn't ask "What matters most for this choice?"; it takes the priority from what success looks like and says what it weighed. Why: she's already answered it there, and one fewer decision. If she wants something else weighed, she says so ("Shaping the directions").

## Shaping the directions

Dana works with the directions in the conversation or on the cards:

- ~~**Keep or set aside.** Each card has "Keep" and "Set aside". A direction set aside moves to "Set aside", with the reason if she gives one, and can be brought back.~~ No keeping or setting aside: every direction stays on record, and the ones she doesn't choose go under "Also considered".
- **Weigh something else:** "What if speed matters more?" Sparks reruns its pick for that and says what changed.
- **Change one:** "Make the checkout one cheaper." "What if it used the return reasons Care already records?" Sparks updates the card and says what changed. The change is a suggestion until she accepts it.
- **Ask for another:** "Show me another way." Sparks adds a new card that's different from the ones already there.
- **Combine:** "Mix 1 and 4." Sparks creates a new direction from the parts she names, with its own card. The originals stay as they were.
- **Add her own:** she describes a direction in a sentence; Sparks fills in the rest of the card and marks the idea as hers.
- **Ask about one:** "Why is 3 Large?" Sparks explains in plain words, with the source.

~~Sparks doesn't say which direction it prefers in this part. If Dana asks, it says which measures each one aims at and that it'll set them side by side next.~~

~~Why: ranking too early narrows the options before Dana has looked at all of them.~~ All of these happen in the conversation; ~~there are no buttons on the cards besides "Show more".~~ the only buttons on a card are "Show more" (and the chevrons in its header, which do the same) and "Generate prototype".

⚠️ **Gap:** shaping isn't built: anything she types at the question gets "Thanks, I'll work that in." and the question again.

## The Directions section

What this part adds to the concept, once Dana picks a direction. Sparks writes it into the concept's spec automatically; Dana sees it on the cards and, once Plan is done, in the plan ([sparks.md](sparks.md), "The finished plan").

| Part | Holds | Needed to move on |
| --- | --- | --- |
| ~~Directions to compare~~ Directions | ~~The directions Dana kept, each with its card~~ Every direction Sparks proposed, each with its card | Yes: two to four |
| Sparks's pick | Which one it recommended, and what it weighed | Yes (Sparks fills it in) |
| ~~Set aside~~ | ~~The directions she set aside, with her reasons~~ | ~~No~~ |
| Ideas to explore | Each of Dana's ideas and which direction it became, or why it was left out | No |

Each statement on a card shows where it came from: evidence with its source, from Dana, or a suggestion or assumption from Sparks ([sparks.md](sparks.md), "Suggestions").

## Finishing this part

~~Dana can move on when she has kept one to four directions; with one kept, the choice adds the strongest one she set aside as "The alternative"; with more than four, Sparks asks her to set some aside; then "Ready to set them side by side against what success looks like?", with "Yes, compare them" and "Not yet".~~

The part finishes when Dana picks a direction: ~~answers "Want to go with …?": "Yes, go with it", or another direction's name~~ its card's "Generate prototype", which finishes Plan and starts building ([sparks-plan-compare.md](sparks-plan-compare.md), "Directions in the plan"), or, typed, its name or "Yes, go with it". A typed pick adds the Directions to the concept, and the same reply drafts "What we'll build" ([sparks-plan-compare.md](sparks-plan-compare.md), "Choosing"). There's no button or page between them ([sparks.md](sparks.md), "Plan").

~~✅ **Resolved:** Dana compares two to four directions.~~ ✅ **Resolved:** Sparks proposes two to four directions and recommends one; Dana picks one.

## States

| State | What shows | What Dana can do |
| --- | --- | --- |
| Sparks is drafting | Sparks thinking ("Looking at what Sales and Care already have in the garage…") | Wait, stop it |
| Directions ready | Sparks's line on what it weighed and its recommendation; two to four direction cards, its pick first ("Recommended"), each with "Generate prototype" | Generate a prototype of one, ask about one, ask for a change |
| Updating a direction | The card being updated, then what changed | Accept or dismiss the change |
| A direction breaks a limit | The limit, named in its catch | Pick it anyway, or another |
| Looks like a previous experiment | What was tried and what was learned, under "Show more" | Pick it anyway, or another |

## Checks

What Dana says → what Sparks must do:

| Dana | Sparks must |
| --- | --- |
| Approves what success looks like | Propose two to four meaningfully different directions as cards in one reply, including her ideas from "Ideas to explore", recommend one before the cards, and end with how to pick: "Generate prototype" on a card |
| "Which one is best?" | Repeat its pick and why, with what it weighed |
| "What if speed matters more?" | Rerun its pick for that, and say what changed |
| "Show me another way." | Add a direction that differs from the existing ones, not a version of one |
| "Mix 1 and 4." | Create a new card from the parts she named, and leave 1 and 4 as they were |
| Adds a direction that breaks a limit in the brief | Keep it, and name the limit in its catch |
| Asks how long direction 3 would take | Give its rough effort and the reason, say engineering confirms it in Review, and give no number of weeks |
| A direction that matches a previous experiment | Say what was tried and what was learned, with the source |
| "Generate prototype" on a card | Show "What we'll build" for it, already approved, finish Plan and start building |
| Types "Yes, go with it", or a direction's name | Add the directions to the concept and draft "What we'll build" in the same reply |
| Picks a direction that isn't Sparks's | Say its catch once, without arguing, and go on |

## Accessibility

- Each card is a group named after its direction, and its parts read in the order of the card.
- ~~The quick replies name the directions ("Yes, go with it", "Fit check at checkout");~~ Each card's "Generate prototype" names its direction for screen readers ("Generate prototype: Fit check at checkout"); "Show more" / "Show less" says whether it's open. The chevrons in the header are a button of their own, named "Show more: {direction}" / "Show less: {direction}", so the card opens from the keyboard there too; selecting the rest of the header is a shortcut for the mouse.
- When a card changes, screen readers hear what changed, not the whole card again.

## Acceptance Criteria

- Given approved success criteria, when the conversation reaches the directions, then two to four meaningfully different directions show as cards in one reply, Sparks's pick first, none a mere variation of another, after its recommendation, with no question or quick replies after them.
- Every idea in "Ideas to explore" appears as a direction or part of one, or is listed with the reason it was left out.
- Each card shows its name, the idea, where it changes things, its effect, effort and risk in words, and its catch, with no screen preview; "Show more" shows the rest.
- Rough effort shows Small, Medium or Large and a reason, never a number of weeks or a cost.
- A direction that matches a previous experiment shows what was learned, with the source.
- Sparks recommends one direction, weighing the main measure and what must not get worse, and says what it weighed.
- Dana's idea is addressed when it isn't the pick.
- Combining two directions creates a new card and leaves the originals unchanged.
- "Generate prototype" on a card finishes Plan with that direction and starts building it; a direction's name typed (or "Yes, go with it") brings "What we'll build" in the same reply, with no button or page in between.

## Out of scope

- The workspace, Plan and how its parts flow, step states, suggestions, Sparks's voice and company knowledge access: [sparks.md](sparks.md).
- The measures directions are judged on: [sparks-plan-define-success.md](sparks-plan-define-success.md).
- Choosing one and what we'll build: [sparks-plan-compare.md](sparks-plan-compare.md).
