<!--
Created: Nov 21, 2026
Created by: Julio Caunedo
Last updated: Nov 23, 2026 ("What we'll build" is approved with "Build it"; "Generate prototype" before Plan is done shows Sparks's progress, then what it built, with no "What we'll build" first; "Done. Your plan is finished" comes with what was built; the directions stay as cards in Plan's conversation once Plan is done, with their actions; there's no plan document listing them; the step "Validate" renamed "Evaluate"; no quick replies under the directions: she picks with a card's "Generate prototype", or types a direction's name; back at the choice, the same; after a correction, Sparks shows the updated summary before asking again; "Done. Your plan is finished."; the directions show in the finished plan; the directions show in the Blueprint once Plan is done, where Plan becomes the Blueprint; before, they're picked on their cards; "Generate prototype" before Plan is done starts the build: Prototype opens and the conversation goes on there; confirmations ("Done. … in your blueprint.") are regular; the bold line names what comes next; each direction card and the Blueprint's directions have "Generate prototype" ("Open prototype" once built); the directions show in the Blueprint as soon as Sparks shows them, with "Choose this one", then "Try this one too" (another path, after Sparks confirms) and "Open its prototype"; Sparks's confirmation says "in your blueprint"; going back to the choice from Prototype, Evaluate or Review; what we'll build is approved with "Looks right, continue", no question; "What we'll build" is a conversational summary in Sparks's reply, not a card; the part becomes the choice: no comparison card, no "What matters most?"; her pick brings "What we'll build", drafted in one go, and one question, ~~"Ready for me to build it?"~~; Sparks says "what success looks like", as the card is named; the hypothesis takes who it affects from the problem, not the brief; the recommendation built, ending with "Want to go with …?", the other directions one tap away; how Sparks picks for each priority; a tie on risk said plainly; the first question built: the comparison card in the reply that puts the directions in the concept, then "What matters most for this choice?"; the compact card shows ratings, not previews; the recommendation weighs Dana's idea, flagging often-returned parts; Fit-data trade-off wording; quotes)
Scope: the Compare part of Plan, the last of Plan's five parts: what happens once Dana picks a direction, the Chosen direction ("What we'll build") it adds to the concept, and how Plan finishes.
Purpose: defines how Dana picks one direction for stated reasons, with the trade-offs in view, before anything is built.
-->

# Plan: ~~Compare~~ Choose — Sparks

**Location:** the fifth and last part of Plan ([sparks.md](sparks.md), "Plan"). The conversation reaches it as soon as Dana picks a direction (~~approves the directions to compare~~) ([sparks-plan-generate-directions.md](sparks-plan-generate-directions.md), "Finishing this part"). She can come back to it by asking Sparks, or, once Plan is done, from the plan ("Let's look at the comparison again").
**Audience:** experienced AutoParts Co. employees who know the business but aren't designers or engineers. The reference user is Dana, a Senior Product Manager.
**Description:** the part of Plan where Dana's pick becomes "What we'll build": Sparks drafts, in one card, the direction, why it's the one, what we believe it will achieve, what it gives up, the others and what to check, and asks one question. Her yes finishes Plan.
**Status:** defined. Built as a reference layout: after ~~"Yes, go with it" (or another direction's name)~~ a direction's name or "Yes, go with it", typed, the "What we'll build" card (`ChosenCard`) and ~~"Ready for me to build it?"~~, with "Build it" and "Not quite"; "Build it" marks it "In your concept" and finishes Plan (`SparksWorkspace`). Not built: opening Prototype, and changing the card from what she types after "Not quite".

---

## Purpose

~~Dana has two to four directions she understands. Now she picks one. A good choice weighs what each direction should achieve against what it costs and what could go wrong,~~ Sparks has weighed the directions and recommended one; Dana has picked. Now the choice is written down so anyone reading the concept later can see why she made it, what she gave up and what she expects.

The choice is the last part of Plan. Once Dana chooses, Sparks starts building ([sparks.md](sparks.md), "Purpose": think first, build second).

It works when Dana can say which direction she chose, why, what she gave up, and what she believes it will achieve, having approved it once, and the directions she didn't choose are on record.

ℹ️ Related specs: the workspace, Plan and how its parts flow, step states, suggestions, how Sparks talks and company knowledge are in [sparks.md](sparks.md). The directions come from [sparks-plan-generate-directions.md](sparks-plan-generate-directions.md), the measures from [sparks-plan-define-success.md](sparks-plan-define-success.md), the limits from [sparks-plan-clarify.md](sparks-plan-clarify.md).

## Starting this part

This part starts when Dana ~~answers Sparks's pick~~ picks a direction in words ([sparks-plan-generate-directions.md](sparks-plan-generate-directions.md), "Sparks's pick"): ~~"Yes, go with it", or another direction's name~~ she types its name, or "Yes, go with it" for Sparks's pick. A card's "Generate prototype" skips ~~the question below: "What we'll build" shows already approved~~ "What we'll build" on screen: it goes in the plan in the background, and Sparks starts building ("Directions in the plan"). In the same reply, Sparks drafts everything the concept needs about the direction, shows it as one card, "What we'll build", and asks one question:

> Got it. Here's what we'll build:
>
> ["What we'll build" card]
>
> That's the end of Plan.
>
> ~~**Ready for me to build it?**~~

- **Quick replies:** ~~"Looks right, continue"~~ "Build it", "Not quite". ✅ **Resolved:** unlike the other summaries, which have no button, this one starts the build, so its button says so and shows as her message. "Not quite" gets "What's off? Tell me in your own words, and I'll update it." (the card can't be edited in place); her answer gets ~~"Thanks, I've updated it." and the question again~~ "Thanks, I've updated it.", then "**Here's what we'll build now:**" with the updated summary, her words worked in, and the question again.

  ✅ **Resolved:** after her correction, Sparks shows the updated summary before asking again. Why: "Thanks, I've updated it." alone asked her to approve a version she couldn't see.
- **Against Sparks's pick:** choosing another is fine. Sparks says its catch once, without arguing, and puts it under what it gives up: "Got it: "Fit check at checkout". One thing to keep in mind: a warning at the last step can make some people give up the order. I've put it under what it gives up. Here's what we'll build:"
- While it drafts, it shows "Putting it together…".

✅ **Resolved:** the reason, the hypothesis and the rest of the Chosen direction come together on one card with one question, instead of confirming the reason, then the hypothesis, then "Continue to Prototype". Why: Sparks drafts all of them anyway; three confirmations in a row are three decisions where one approval does (sparks.md, "Sparks decides, Dana approves").

## What changed in this part

~~**The comparison.** Sparks rated every kept direction on the same eight rows (main measure, other measures, what must not get worse, rough effort, risk, limits, builds on, departments) and showed them as a comparison card, each direction's main-measure rating first and the full table one select away; with one kept, it added the strongest set-aside one as "The alternative".~~

~~**What matters most.** Before recommending, it asked "What matters most for this choice?", with "The biggest effect", "The fastest result" and "The lowest risk", and picked for her answer, saying so plainly when they were close on risk.~~

~~**Working through the comparison.** She could ask why a rating, disagree with it, combine directions as a new column, change her priority, or start small.~~

✅ **Resolved:** no comparison card and no "What matters most?". Each direction card carries its effect, effort and risk in words, and Sparks's pick, weighing what success looks like, is in the directions' reply ([sparks-plan-generate-directions.md](sparks-plan-generate-directions.md), "Sparks's pick"). Why: Dana isn't a designer; a table of eight rows and a priority question put the weighing on her. Asking why, disagreeing or combining still happen in words, before she picks ("Shaping the directions" there).

## What we believe

Sparks turns the choice into a hypothesis: what she believes this direction will achieve, and how she'll know. It's on "What we'll build":

> We believe that **showing on every product page whether a part fits the customer's saved vehicle** will **cut wrong-part purchases** by **customers buying online**. We'll know it worked if we reach the target: **25% fewer "doesn't fit" returns within 3 months of launch**.

- **Drafted by Sparks, approved with the card.** It's built from the chosen direction, the problem's "Who it affects" and the main measure and target from what success looks like. ~~Dana confirms it or edits it; she doesn't write it from scratch.~~ She approves it with ~~"Looks right, continue"~~ "Build it", or says what's off.
- **It uses the success criteria; it doesn't change them.** The main measure and target stay as the success part set them. If Dana wants a different target for this direction, she changes it in the success criteria ([sparks-plan-define-success.md](sparks-plan-define-success.md)), and what comes after follows the overview's rule ([sparks.md](sparks.md), "Moving through the steps").
- **Evaluate checks it.** Evaluate says whether the evidence supports it ([sparks-validate.md](sparks-validate.md), "The hypothesis").

The screen says "What we believe"; the concept for review also calls it the hypothesis.

Why the hypothesis lives here and not with the success criteria: success criteria describe the business outcome without any solution, so Dana doesn't commit to one before she understands the problem. Only once she has chosen a direction can she say what she believes it will achieve ([sparks.md](sparks.md), "Steps").

## The Chosen direction section

What this part adds to the concept, once Dana says ~~"Looks right, continue"~~ "Build it". Sparks writes it into the concept's spec automatically; Dana sees it ~~on the Chosen direction "What we'll build" card, with the line "The direction, why it's the one, and what we expect it to do. It's what I'll build next.", the parts reading "The direction", "Why this one", "What we believe", "What it gives up", "Also considered" and "Still to check"~~ as a conversational summary in Sparks's reply, with no card (sparks.md, "Talking with Sparks"): "**Here's what we'll build:**", the direction and why, what we believe, "The trade-off: …", "We also looked at:" (each with its effect and effort) and "Still to check:", and the sources line; and, once Plan is done, in the plan ([sparks.md](sparks.md), "The finished plan").

| Part | Holds | Needed to finish Plan |
| --- | --- | --- |
| Chosen direction | The direction's card | Yes |
| Why this one | ~~Dana's reason~~ The reason, drafted by Sparks from its pick, approved with the card | Yes |
| What we believe (hypothesis) | What the chosen direction should achieve, and how she'll know | Yes (Sparks drafts it, Dana approves it with the card) |
| Trade-offs accepted ("What it gives up") | What the chosen direction is weaker at, and anything at risk or any limit it breaks | Yes (Sparks fills it in) |
| Also considered | The other directions, and why each wasn't chosen | Yes (Sparks fills it in) |
| What comes later | Parts she's leaving for later, if any | No |
| To check in Evaluate ("Still to check") | The chosen direction's assumptions, most important first | Yes (Sparks fills it in) |
| ~~The comparison~~ | ~~The table as it was when she chose~~ The directions' ratings as they were when she chose | Yes (kept automatically) |

## Finishing Plan

Choosing finishes Plan. Plan is Done once Dana has approved the problem, what we know and what success looks like, and said ~~"Looks right, continue"~~ "Build it" to "What we'll build" ([sparks.md](sparks.md), "Plan").

- ~~Sparks sums up and asks: "You chose 'Fit check before you buy' because it should cut wrong-part returns the most for Medium effort. We believe it will cut 'doesn't fit' returns by 40% within 3 months. Ready for me to build a prototype you can click through?"~~ ~~"Continue to Prototype" shows below that question. Selecting it marks Plan as Done and opens Prototype.~~
- ~~"Looks right, continue"~~ "Build it" marks the card "In your concept", marks Plan as Done, and Sparks starts building; once the prototype is built, it says "Done. Your plan is finished, and your prototype is ready." and what it built ([sparks-prototype.md](sparks-prototype.md), "Building it"). ~~Sparks says: "Done. Your plan is finished." (regular), then "**Now, let's build "Fit check before you buy".**" in bold, and how it builds it.~~ Prototype starts in the same conversation, with no button ([sparks-prototype.md](sparks-prototype.md)).

⚠️ **Gap:** the build stops after that line: Prototype isn't built, and Plan isn't marked Done in the steps yet.

If Dana asked to build before reaching this part, Sparks finishes Plan with her in a few messages instead, and "What we'll build" is approved the same way ([sparks.md](sparks.md), "Plan").

Choosing a different direction after Prototype is Done marks Prototype and every later step that's Done as Needs a check ([sparks.md](sparks.md), "Moving through the steps").

## Going back to the choice

Prototype (a change beyond the direction, or asking for another direction, [sparks-prototype.md](sparks-prototype.md), "Changing it"), Evaluate ("Needs another look", [sparks-validate.md](sparks-validate.md), "Go ahead or keep improving") and Review (a decision to iterate on the choice, [sparks-review.md](sparks-review.md), "The decision") can send Dana back here, with "Go back to the choice".

- Sparks says why she's back in one sentence (the request that went beyond the direction, what the evaluation suggests, or that the decision owner's reason is first in Decisions), that the four directions are where she left them, and that the prototype she tried stays in the concept, with what was learned once Evaluate has run on it.
- Then ~~the question again: "Want to go with …?" for Sparks's pick, or~~ "Which would you like to try instead?", with Sparks's pick ("I'd go with …") unless she just tried it, and "Select "Generate prototype" on its card above." ~~The direction she tried isn't among the quick replies.~~ No quick replies: she picks on the cards, where the one she tried says "Open prototype".
- Picking one brings "What we'll build" for it, as in "Choosing"; ~~"Looks right, continue"~~ "Build it" builds its prototype from version 1, and Evaluate and Review start again for it.

✅ **Resolved:** going back to the choice reopens it in the same conversation, ~~without the direction she tried among the quick replies~~ picked on the cards, as the first time; a new pick starts its prototype, evaluation and review fresh, and the earlier ones stay in the concept. ~~(the earlier prototype only as history)~~ The new pick becomes another path in the prototype, beside the one she tried ([sparks-prototype.md](sparks-prototype.md), "Paths").

## Directions in the plan

~~The four directions are in the plan~~ ~~as soon as Sparks shows them~~ ~~(Plan, once Plan is done: [sparks.md](sparks.md), "The finished plan"), in the same order and numbers as the cards ("1. Fit check before you buy"), each with its labels, idea, and effect, effort and risk, and one action. Each direction card in the conversation has the same action, on the right of "More about it": the same label, the same result.~~ The four directions stay as cards in Plan's conversation, before and after Plan is done (there's no plan document: [sparks.md](sparks.md), "The finished plan"). Each card has one action, full width at its bottom.

- **Before Plan is done** ~~(on the direction cards only: the plan shows as a document once Plan is done)~~**: ~~"Choose this one"~~ "Generate prototype"** (not on the one already picked). ~~The same as picking it in the conversation: her pick shows as her message, and Sparks drafts "What we'll build" for it ("Choosing").~~ Her choice and her go-ahead in one: her message says it ("Generate a prototype of "Flag often-returned parts"."), and Sparks~~'s reply shows "What we'll build" for it, already in the plan, then "Done. Plan is finished, and it's all in your plan." and~~ starts building: its reply is only its progress, then what it built ([sparks-prototype.md](sparks-prototype.md), "Building it"). "What we'll build" goes in the plan in the background. Prototype opens at once and the conversation goes on there, beside the prototype as it's built. Picking a direction by name in the conversation still goes through "What we'll build" first ("Choosing").
- **After Plan is done: ~~"Try this one too"~~ "Generate prototype"** on a direction not built yet. Sparks confirms in the conversation before building: what it will build, next to which path, and what it will test (the hypothesis it drafted), then "Build it?" with "Yes, build it" and "Not now". "Yes, build it" builds it as another path and records "Added a path: …" in Decisions, with the hypothesis; "Not now" changes nothing ("It's in your plan whenever you want to try it.").
- **~~"Open its prototype"~~ "Open prototype"** on a direction already built: shows its path in Prototype.
- With more than one path, the path shown is labeled "Showing", the others "Path"; Plan's pick keeps "Chosen".

✅ **Resolved:** the directions can be picked and run from the plan as well as from the conversation. ~~Before Plan is done, picking one there is the same as in the conversation.~~ Before Plan is done, they're picked on their cards in the conversation; the plan shows once Plan is done. After, running another builds it as another path in the prototype, after Sparks confirms in the conversation (Sparks decides, Dana approves; the reason lands in Decisions). Why: the directions she didn't pick are still worth trying, and the plan is where she looks at all of them.

✅ **Resolved:** the action is "Generate prototype" ("Open prototype" once built), on each direction card in the conversation ~~and in the plan alike~~. ~~Before Plan is done, it still goes through "What we'll build" first ("Looks right, continue" builds it);~~ After Plan is done, it goes through Sparks's "Build it?". Why: it says what the choice leads to, a prototype.

✅ **Resolved:** once Plan is done, the directions are run from their cards in Plan's conversation, not from a list in a plan document. Why: Plan stays the conversation it was built in ([sparks.md](sparks.md), "The finished plan"), so the cards are where she already chose.

✅ **Resolved:** before Plan is done, "Generate prototype" builds at once: Sparks ~~shows "What we'll build", already approved,~~ puts "What we'll build" in the plan without showing it, finishes Plan and starts building, and Prototype opens with the conversation beside it. Why: the button already says what she wants; asking her to approve "What we'll build" first made her say it twice.

⚠️ **Open question:** after "Generate prototype", the hypothesis and the trade-off aren't shown until Evaluate. Should what Sparks built include them?

## States

| State | What shows | What Dana can do |
| --- | --- | --- |
| Putting it together | "Putting it together…" | Wait |
| Ready to build | "What we'll build" and ~~"Ready for me to build it?"~~ | ~~Yes, build it~~ Build it; Not quite |
| Correcting | "What's off? Tell me in your own words, and I'll update it." | Say what's off |
| Plan done | The card "In your concept", and the line on what comes next | Wait for the prototype |

## Screen sizes

Designed for a laptop or desktop, like the rest of the workspace. Phones aren't designed for now ([sparks.md](sparks.md), "Screen sizes").

## Checks

What Dana says → what Sparks must do:

| Dana | Sparks must |
| --- | --- |
| "Yes, go with it" | Draft "What we'll build" for Sparks's pick, in the same reply, and ask ~~"Ready for me to build it?"~~ |
| Picks another direction | Draft it for that one, say its catch once without arguing, and put it under what it gives up |
| "Not quite" | Ask what's off, in her own words |
| "Let's say 60% fewer returns for this one." | Explain that the target belongs to what success looks like, and offer to change it there |
| ~~"Looks right, continue"~~ "Build it" | Mark it in the concept, finish Plan, and say what comes next |

## Accessibility

- "What we'll build" is a section named by its title, its parts a list of terms and descriptions read in order.
- The quick replies say what they do (~~"Looks right, continue"~~ "Build it", "Not quite").

## Acceptance Criteria

- Given Dana answers Sparks's pick, then the same reply shows "What we'll build" with the direction, why this one, what we believe, what it gives up, also considered and still to check, and asks ~~"Ready for me to build it?"~~.
- Picking a direction other than Sparks's pick gets its catch once, and it appears under "What it gives up".
- The other directions appear under "Also considered", each with its effect and effort.
- The chosen direction's assumptions appear under "Still to check".
- The hypothesis uses the main measure and target from what success looks like and never changes them.
- ~~"Looks right, continue"~~ "Build it" marks the card "In your concept" and finishes Plan; "Not quite" asks what's off.

## Out of scope

- The workspace, Plan and how its parts flow, step states, suggestions, Sparks's voice and company knowledge access: [sparks.md](sparks.md).
- How directions are proposed and shaped, and Sparks's pick: [sparks-plan-generate-directions.md](sparks-plan-generate-directions.md).
- Building the prototype: [sparks-prototype.md](sparks-prototype.md).
