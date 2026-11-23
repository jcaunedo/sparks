<!--
Created: Nov 21, 2026
Created by: Julio Caunedo
Last updated: Nov 22, 2026 (Plan becomes the Blueprint once it's done: what this part adds shows there, not in a panel during Plan; Sparks thinks one line at a time, in automotive terms, before it replies; Success starts with "Now, let's define what success looks like."; Sparks's confirmation says "in your blueprint"; what success looks like is approved with "Looks right, continue", no question; "What success looks like" is a conversational summary in Sparks's reply, not a card; after "Not quite", Tab puts Sparks's answer in the message box to edit; "Not quite" leaves the question open for her answer in the message box; the card renamed "What success looks like", with a line on what it's for; Sparks calls the brief "what we know", as its card does; after a correction, Sparks says what changed and why it matters before the next question; "Looks right, continue" goes straight into the first direction; the Success criteria card and its approval built; how Sparks gets a starting point for repeat purchases; a target beyond the experiment gets Sparks's reason and "Keep my target" or "Use 25%"; the fourth and last question, what must not get worse, built: online sales; the third question, the target and by when, built: from a past experiment for the returns, an assumption with no starting point; the second question, the main measure, built: Sparks recommends one and says why, the other one quick reply away; one question at a time, starting with the goal, the card only at the end; the first question, the goal, built; Non-goal example: the return policy, not fit data)
Scope: the Define success part of Plan, the third of Plan's five parts: how Sparks turns the problem brief into a goal and measures, where starting points and targets come from, and the Success criteria it adds to the concept.
Purpose: defines what "solved" means for a concept before any solution is explored, so directions are compared, evaluated and handed off against the same yardstick.
-->

# Plan: Define success — Sparks

**Location:** the third part of Plan ([sparks.md](sparks.md), "Plan"). The conversation reaches it as soon as Dana approves the problem brief ([sparks-plan-clarify.md](sparks-plan-clarify.md), "Finishing this part"). She can come back to it by asking Sparks, or, once Plan is done, from the Blueprint ("Let's revisit the success measures").
**Audience:** experienced AutoParts Co. employees who know the business but aren't designers or engineers. The reference user is Dana, a Senior Product Manager.
**Description:** the part of Plan where Sparks proposes what success looks like for the problem, with a starting point and a target for each measure, and Dana chooses what matters.
**Status:** defined. Built as a reference layout: the first question, "What will be different if this works?", on a clarification card with "Yes, that's right" and "Not quite", in the reply that puts the brief in the concept; then "Which result matters most?", with "Yes, that's right", "Repeat purchases instead" and "Not quite"; then "What's the target?" and "What must not get worse?", each with "Yes, that's right" and "Not quite" (`SparksWorkspace`, `ClarificationCard`). Then the Success criteria as a summary card, with "Looks right, continue" and "Not quite" (`SuccessCard`). "Looks right, continue" goes straight into the first direction ([sparks-plan-generate-directions.md](sparks-plan-generate-directions.md)).

---

## Purpose

Before looking at solutions, Dana decides how she'll know the problem is solved. Without that, every solution looks good to someone, and nobody can say whether the one that ships worked.

Sparks proposes the measures from the problem brief, with their starting points taken from AutoParts Co.'s data, so Dana doesn't need to know how to define a metric. She chooses which one matters most and how far it should move.

It works when Dana can say in one sentence what will be different if the concept works, and everything after it can be checked against it: the choice rates the directions on it, Validate estimates it, and Review puts it in front of the people who decide.

These criteria are solution-free on purpose. What a particular solution is expected to achieve is its hypothesis, written once a direction is chosen ([sparks-plan-compare.md](sparks-plan-compare.md), "What we believe"), and checked in Validate.

ℹ️ Related specs: the workspace, Plan and how its parts flow, step states, suggestions, how Sparks talks and company knowledge are in [sparks.md](sparks.md). The problem brief comes from [sparks-plan-clarify.md](sparks-plan-clarify.md).

## Words used in this part

Sparks uses plain words, not the terms product teams use. The concept for review shows both, so the UX team, engineering and the decision owner recognize them.

| Sparks says | Product teams say |
| --- | --- |
| Goal | Objective, outcome |
| Main measure | Primary metric, north star |
| Other measures | Secondary metrics |
| Starting point | Baseline |
| What must not get worse | Guardrails, counter-metrics |
| Not part of this concept | Non-goals, out of scope |
| What we believe (written with the choice) | Hypothesis |

## Starting this part

~~Sparks reads the problem brief and drafts the whole Success criteria section, shown as a Success criteria card in the conversation, each part as a suggestion ("The Success criteria section"). Then it asks Dana one question, the one only she can answer: which result matters most.~~

> ~~If this works, fewer customers will buy parts that don't fit, and more of them will buy from us again. Here's a goal and the measures I'd suggest.~~
>
> ~~[Success criteria card]~~
>
> ~~Which matters most to you?~~

~~Quick replies name the candidate main measures: "Fewer 'doesn't fit' returns", "More repeat purchases". She can also type her own.~~

~~Her choice becomes the main measure; the others become other measures. The card updates to show it.~~

Sparks asks one question at a time, each on a clarification card with its answer drafted from the brief, as in Problem and Clarify. Dana sees the whole Success criteria card only at the end, for approval ("Finishing this part"). The order:

1. **The goal:** "What will be different if this works?" Asked in the same reply that puts the brief in the concept, with no button in between ([sparks-plan-clarify.md](sparks-plan-clarify.md), "Finishing this part").
2. **The main measure:** which result matters most, the one only she can answer. ~~Quick replies name the candidate measures ("Fewer 'doesn't fit' returns", "More repeat purchases"), and she can type her own.~~ Sparks recommends one, with its starting point, and says why in plain words; the other candidate is one quick reply away, and she can type her own. Her choice becomes the main measure; the others become other measures.
3. **The target and by when,** with the starting point from company knowledge.
4. **What must not get worse.**

What's not part of the concept and how the assumptions will be checked are drafted into the card; Dana sees them there at the end.

✅ **Resolved:** Success starts with "**Now, let's define what success looks like.**" (bold, as the start of a new part) instead of confirming that the brief is saved; the brief's save shows on its card and in the Blueprint.

The first question, for "Wrong-part returns":

> ~~Done. That's in your blueprint too.~~ **Now, let's define what success looks like.**
>
> ~~Now, what success looks like.~~ We'll agree on it before looking at any solutions, so later you can tell whether the one you pick works. I'll suggest each part from what we know, one at a time. First, the goal:
>
> [Clarification card] **What will be different if this works?** Customers buying online get a part that fits the first time: fewer orders come back as "doesn't fit", and fewer of those customers stop buying from us. *Suggested by Sparks · from what we know*

✅ **Resolved:** Sparks calls the brief "what we know", as its card does ([sparks-plan-clarify.md](sparks-plan-clarify.md), "The Problem brief"): ~~"Done. That's in your blueprint too.",~~ "from what we know", and "the biggest cost we found" in the main measure's reason.

- **Quick replies:** "Yes, that's right", "Not quite". No "I'm not sure": the goal is Dana's call, not something to check later.
- **"Not quite"** ~~gets "What's off? Tell me in your own words, or edit it on the card."~~ folds the card to its question, and she answers it in the message box, where Sparks's answer is the placeholder and Tab puts it in the box to edit (sparks.md, "Talking with Sparks"). Her words become the answer, marked "Edited by you".
- **The next reply** opens by taking her answer in one line: "Got it, that's the goal." or ~~"Thanks, I've updated the goal."~~, after a correction, what changed and why it matters, in its own paragraph: "Thanks, I've changed the goal. The measures and the target all come from it, so it should say what you want to be different." The other questions do the same after a correction:
  - **The main measure:** "Thanks, I've changed the main measure. It's the one result we'll judge this by, so it should be the one you'd report on."
  - **The target:** "Thanks, I've changed the target. It's what we'll hold the results to, so it should be a number you'd stand behind." (A target beyond what the data supports gets Sparks's reason first, "Starting points and targets".)
  - **What must not get worse:** "Thanks, I've changed what must not get worse. Every idea gets checked against it too, so a fix for the returns can't quietly cost you somewhere else."

  ✅ **Resolved:** a correction gets what changed and why it matters, then the next question (sparks.md, "How Sparks talks to Dana"). Why: "Thanks, I've updated it." didn't say what her change will shape.

The second question, in the reply that takes the goal:

> Got it, that's the goal. Next, the main measure: the one result that tells us whether this worked.
>
> I'd pick the returns. They're the biggest cost in the brief, and they show a change within weeks. Repeat purchases take months to move, so I'd watch them as another measure.
>
> [Clarification card] **Which result matters most?** Fewer online orders returned as "doesn't fit". Today: 18,400 in the last 90 days, 1 in 9 online returns. *Suggested by Sparks · from business performance*

- **Quick replies:** "Yes, that's right", "Repeat purchases instead", "Not quite".
- **"Repeat purchases instead"** puts the other measure on the card: "More repeat purchases from customers whose part didn't fit. No starting point yet: AutoParts Co. doesn't link returns to later purchases today." ("Starting points and targets": never a made-up figure.)
- **"Not quite"** works as for the goal: her words replace Sparks's on the card.
- **Sparks takes the answer** in one line, naming both measures: "Got it: fewer "doesn't fit" returns is the main measure, and repeat purchases another one." (or the other way round), or ~~"Thanks, I've updated the main measure."~~ after a correction, what changed and why it matters ("The goal" lists the lines).

The third question, in the reply that takes the main measure:

> Got it: fewer "doesn't fit" returns is the main measure, and repeat purchases another one. Next, the target: how far returns should drop, and by when.
>
> The vehicle selector cut these returns by about half for the customers who used it, but most skipped it. So across all online orders, I'd aim lower:
>
> [Clarification card] **What's the target?** 25% fewer "doesn't fit" returns within 3 months of launch: from 18,400 to about 13,800 every 90 days. *Suggested by Sparks · from previous experiments*

- **The number and its basis:** the target comes from the closest past result, scaled to everyone it applies to, and the lead-in says why in one sentence. The brief has no deadline, so the time frame is one quarter after launch ("Starting points and targets").
- **The target shows where it lands:** from today's figure to the target figure, so Dana doesn't have to work it out.
- **With no starting point** (she picked repeat purchases, or a measure in her own words), Sparks says any target is a guess for now and suggests one labeled "Assumption", checked in Validate: "10% more of these customers buy from us again within 6 months of launch." (repeat purchases take longer to show).
- **Quick replies:** "Yes, that's right", "Not quite", as for the goal. Her words replace Sparks's on the card.
- **Sparks takes the answer** in one line: "Got it, that's the target." or ~~"Thanks, I've updated the target."~~ after a correction, what changed and why it matters ("The goal" lists the lines).

The fourth and last question, in the reply that takes the target:

> Got it, that's the target. Last, what must not get worse.
>
> A fix can push one number up and another down. If buying a part takes an extra step, fewer people might buy. So I'd keep an eye on online sales:
>
> [Clarification card] **What must not get worse?** Online sales. Today, 3.1% of visits to the site end in an order. *Suggested by Sparks · from business performance*

- **Why in plain words:** Sparks explains the idea with one example from her concept, without the term "guardrail" ("Words used in this part").
- **Solution-free:** the measure is online sales, not how a particular fix performs; the example only shows why it's worth watching.
- **Quick replies:** "Yes, that's right", "Not quite". Her words replace Sparks's on the card.
- **Sparks takes the answer** and says the questions are done: "Got it. That's all I need to ask about success. Next, I'll put it together for you to check."

✅ **Resolved:** for the main measure, Sparks recommends one and says why, instead of asking Dana to choose between equal options. Why: she decides, but she shouldn't need to know which measure is easier to track or quicker to move; Sparks does.

✅ **Resolved:** Success asks one question at a time, starting with the goal, and shows the whole Success criteria card only at the end, instead of drafting the card first and asking which measure matters most. Why: the same as Problem and Clarify: one decision at a time, and no form to review before the first question ([sparks.md](sparks.md), "Talking with Sparks").

~~⚠️ **Gap:** the build stops after the goal: Sparks answers "Got it, that's the goal. Next, which result matters most." and asks nothing more. The main measure and the questions after it aren't built.~~ ~~⚠️ **Gap:** the build stops after the main measure: Sparks takes the answer and says "Next, the target." The target, what must not get worse and the Success criteria card aren't built. When Dana picks repeat purchases, Sparks doesn't yet suggest how to get a starting point.~~ ~~⚠️ **Gap:** the build stops after the target: Sparks takes the answer and says "Next, what must not get worse." What must not get worse and the Success criteria card aren't built.~~ ~~⚠️ **Gap:** the build stops after the last question: Sparks takes the answer and says "Next, I'll put it together for you to check." The Success criteria card (with what's not part of the concept and how the assumptions are checked) and its approval aren't built. When Dana picks repeat purchases, Sparks doesn't yet suggest how to get a starting point, and a target she sets far beyond the experiment isn't questioned yet ("Target looks unlikely").~~ ✅ **Resolved:** the Success part is built end to end: the four questions, the Success criteria card and its approval, the starting point for repeat purchases, and Sparks questioning a target beyond the experiment.

## Measures

**One main measure.** The single result that says whether the concept worked. Everything after it uses it first. One, not several, so the concept has a clear aim and directions can be compared on it.

**Up to three other measures.** Results worth watching that support the main one. More would pull focus from the main one.

Each measure has:

- **What's measured,** in plain words: "Online orders returned as 'doesn't fit'".
- **Starting point:** today's value, from company knowledge, with its source and period: "{percent} of online orders (returns, last 90 days)".
- **Target:** how far it should move: "40% fewer".
- **By when:** "within 3 months of launch".
- **Which part of the problem it answers:** a link to the brief's part, such as "What it costs".

Rules for the measures Sparks proposes:

- **Results, not activity.** Measures describe what changes for people or the business ("fewer wrong-part returns"), not how much something is used ("visits to a fitment checker"). If Dana suggests an activity measure, Sparks asks what result it would lead to and offers that instead. Why: a feature can be used a lot and still not solve the problem.
- **Solution-free.** No measure assumes a solution, because none has been chosen yet. "Fewer 'doesn't fit' returns", not "fitment checker visits". A measure tied to her idea goes to "Ideas to explore" with the idea.
- **Something AutoParts Co. can measure.** Sparks checks company knowledge for data on each measure. When there's none, the measure says "AutoParts Co. doesn't track this today" and which department might help start tracking it. Dana can keep it.
- **The biggest cost is covered.** If no measure answers the brief's "What it costs", Sparks says so and suggests one.

## Starting points and targets

- **Starting points come from data.** Sparks fills them in from company knowledge or Dana's personal knowledge, with the source. With no data, the measure says "No starting point yet", and Sparks suggests how to get one. It never makes one up.
- **Targets are Dana's choice.** Sparks suggests one and says where it comes from: a previous experiment ("Customers who used last year's vehicle selector returned {percent} fewer parts as 'doesn't fit'"), the brief, or a plain guess. A target with no basis is labeled "Assumption", and Validate checks whether it's realistic.
- **A target the data says is unlikely:** Sparks says so and shows why, and Dana decides ([sparks.md](sparks.md), "When the data and Dana disagree"). For "Wrong-part returns", any target of 40% or more for the returns (or "half"), typed or edited on the card, gets:
  > That's more than the vehicle selector managed. It cut these returns by about half, but only for the customers who used it, and most skipped it (previous experiments, 2025).
  >
  > You can keep your target, and I'll mark it as an assumption for Validate to check, or go with 25%.

  Quick replies: "Keep my target", "Use 25%". Her number stays on the card while she decides. "Keep my target" keeps it, labeled "Assumption" in the Success criteria, with "That the target is realistic" under the assumptions Validate checks ("Got it, I've kept your target and marked it as an assumption."); "Use 25%" puts Sparks's target back ("Got it, 25% it is."). Either way, Sparks moves on to the next question.
- **A measure with no starting point:** Sparks says so and how to get one, in the reply that takes her choice. For repeat purchases: "There's no starting point for it yet, but we can get one: the returns team could match returns to later orders from the same customers. I've added that to what we'll check in Validate." Getting the starting point is listed under "How we'll check the assumptions".
- **By when:** Sparks suggests a time frame from the brief's limits (a deadline, a season). When the brief has no deadline, it suggests one quarter. Dana changes it freely.

## What must not get worse

Most solutions can push one measure up by pushing another down: fewer wrong-part returns, but fewer sales because buying takes an extra step; faster checkout, but more returns. Sparks always suggests at least one measure that must not get worse, from the brief's "Who's involved" and "What it costs", with its starting point.

"What must not get worse" is used in the choice and in Validate the same way as the main measure: a direction that hurts one is flagged.

## Not part of this concept

Sparks suggests what the concept doesn't try to solve, from what the brief left out or narrowed down: "Changing the return policy isn't part of this. It's about customers buying the right part in the first place." Dana accepts, edits or adds to it.

Why: it keeps the directions focused, and tells reviewers in Review what's out of scope on purpose.

## Checking the assumptions

The brief's "Assumptions to check" ([sparks-plan-clarify.md](sparks-plan-clarify.md), "The Problem brief") come with Dana into this part. Sparks shows, for the most important ones, how each will be checked:

- **By a measure,** when one already covers it: "That missing vehicle details cause most wrong purchases will show in 'doesn't fit' returns."
- **In Validate,** when no measure does.

No assumption is dropped. Anything not covered by a measure goes to Validate.

## The Success criteria section

What this part adds to the concept, once Dana approves it. Sparks writes it into the concept's spec automatically; Dana sees it on the Success criteria card and, once Plan is done, in the Blueprint ([sparks.md](sparks.md), "The Blueprint").

| Part | Holds | Needed to move on |
| --- | --- | --- |
| Goal | One sentence: what will be different for the people affected and for AutoParts Co. if the concept works | Yes |
| Main measure | What's measured, starting point, target, by when | Yes |
| Other measures | Up to three, each like the main measure | No |
| What must not get worse | Measures that must hold, each with its starting point | No (Sparks always suggests one) |
| Not part of this concept | What the concept doesn't try to solve, and why | No |
| How we'll check the assumptions | Each important assumption and the measure or step that checks it | No |

Each statement shows where it came from: evidence with its source, from Dana, or an assumption ([sparks.md](sparks.md), "Suggestions").

## Finishing this part

Dana can move on when the goal and the main measure are accepted or written by her. The main measure needs a target; its starting point can be "No starting point yet".

- ~~Sparks sums up and asks for approval: "Here's what success looks like: fewer customers buy parts that don't fit, and more of them buy from us again. The main measure is online orders returned as 'doesn't fit', 40% fewer within 3 months. Ready to look at ways to get there?"~~ After the last question, in the reply that takes its answer, Sparks shows the Success criteria whole as a card and asks for approval:
  > Got it. That's all I need to ask. Here's what success looks like:
  >
  > [Success criteria card]
  >
  > From here on, every idea gets checked against this.
  >
  > ~~**Ready to look at ways to get there?**~~
- ✅ **Resolved:** on screen the card is "What success looks like", as Sparks introduces it ("Here's what success looks like:"), and Sparks says "what success looks like" wherever it used to say "your success criteria" (Directions, Compare). The spec keeps "success criteria" (sparks.md, "Cards in the conversation").
- **The summary, not a card** (sparks.md, "Talking with Sparks"): "**Here's what success looks like:**", the goal, then "We'll know it worked by:" with a line each for the main measure, the target, what else we're watching, what must not get worse and what's not part of it, each with its source in brackets or called an assumption, then "How we'll check what we're assuming:" as a list, and one sources line.
- ~~**The Success criteria card** (like the problem card and "What we know", part by part with a line between parts): ~~"Success criteria"~~ "What success looks like", with the line "How we'll know it worked, agreed before we look at any solutions.", and "Draft" until she approves it, then "In your concept"; Goal, Main measure, Target, Other measures, What must not get worse, Not part of this concept, How we'll check the assumptions. Each part says where it came from: "Evidence · {source, period}", "From you" (her words, the goal she confirmed, a measure she picked), "Suggested by Sparks" (what it drafted without asking: other measures, what's not part of the concept) or "Sparks's guess" with the "Assumption" label.~~
- **What Sparks drafts without asking:** the other measures (the candidate she didn't pick), what's not part of the concept ("Changing the return policy. This is about customers buying the right part in the first place.") and how each assumption will be checked ("Checking the assumptions"). She sees them on the card and can correct them with "Not quite".
- Quick replies: "Looks right, continue", "Not quite". "Not quite" gets "What's off? Tell me in your own words, and I'll update it." (the card can't be edited in place); her answer gets "Thanks, I've updated it." and the question again.
- Until the goal and the main measure with a target are in place, the card says what's missing ("Choose a main measure"), and Sparks asks for it instead of moving on.
- Her approval adds the Success criteria to the concept, and Sparks moves on to the directions in the same conversation. There's no button or page between parts ([sparks.md](sparks.md), "Plan").

~~⚠️ **Gap:** after "Yes, let's see them", the build says "Done. Success is in your concept. Next, ways to get there." and stops, because the directions aren't built yet ([sparks-plan-generate-directions.md](sparks-plan-generate-directions.md)). Plan's rule is that the reply that finishes a part asks the next part's first question.~~ ✅ **Resolved:** after "Looks right, continue", Sparks says "Done. Success is in your concept." and shows the first direction in the same reply ([sparks-plan-generate-directions.md](sparks-plan-generate-directions.md), "Starting this part").

The choice, Validate and Review all use these criteria. Success criteria are always in place before anything is built: if Dana asks to build first, Sparks drafts them with her in the conversation and asks her to confirm the main measure ([sparks.md](sparks.md), "Plan"). They're part of Plan, which must be Done before a concept is submitted for a decision ([sparks.md](sparks.md), "Moving through the steps"). Changing them later marks the sections after them in Plan, and later steps that are Done, as Needs a check ([sparks.md](sparks.md), "Moving through the steps").

## States

| State | What shows | What Dana can do |
| --- | --- | --- |
| Sparks is drafting | Sparks thinking ("Weighing returns against repeat purchases…") | Wait, stop it |
| ~~Draft ready~~ | ~~The question about what matters most; the Success criteria card with each part as a suggestion~~ | ~~Choose the main measure; accept, edit or dismiss each part~~ |
| Asking | One question on a clarification card, its answer drafted from the brief, starting with the goal | Confirm it, edit it on the card, or say "Not quite" and answer in her own words |
| Summary ready | The Success criteria card, each part with where it came from | Approve it, or keep refining |
| No starting point | "No starting point yet" on the measure, and how to get one | Keep it, change the measure, add a figure she has |
| Not tracked today | "AutoParts Co. doesn't track this today" and which department might help | Keep it or choose another measure |
| Target looks unlikely | Sparks's reason, with the source | Keep the target, lower it, or keep it as an assumption |
| Biggest cost not covered | Sparks's note and a suggested measure | Accept or dismiss it |
| Ready to move on | The summary question, with "Looks right, continue" and "Not quite" | Approve it, or keep refining |

## Checks

What Dana says → what Sparks must do:

| Dana | Sparks must |
| --- | --- |
| Approves the problem brief | ~~Draft the goal and measures from the brief and ask only which result matters most~~ In the same reply, ask the goal, drafted from the brief, on a clarification card; then one question at a time |
| "Success is people using the fitment checker." | Ask what result that use would lead to, offer that as the measure, and keep the fitment checker under Ideas to explore |
| Chooses a measure AutoParts Co. doesn't track | Say it isn't tracked today, suggest which department might help, and let her keep it |
| Sets a target far beyond what a similar experiment achieved | Show what the experiment achieved, with the source, and let her decide |
| Asks "What's a guardrail?" | Explain it in plain words ("something that must not get worse while we fix this") with an example from her concept |
| Wants two main measures | Explain why one keeps the concept focused, and offer to keep the second as another measure |
| No data for a starting point | Show "No starting point yet" and how to get one, never a made-up figure |
| "Yes, let's see them." | Add the success criteria to the concept and, in the same reply, show the first direction |

## Accessibility

- Each measure reads in one line: what's measured, starting point with source, target and by when.
- A measure marked "Assumption", "No starting point yet" or "Doesn't track this today" says so before its values.

## Acceptance Criteria

- ~~Given an approved problem brief, when the conversation reaches success, then a Success criteria card shows a drafted goal and measures as suggestions, and Sparks asks which result matters most.~~
- Given Dana approves the problem brief, then the same reply asks "What will be different if this works?" on a clarification card, with a goal drafted from the brief, "Yes, that's right" and "Not quite".
- Success asks one question at a time; the Success criteria card shows only once the questions are answered.
- Dana's choice becomes the main measure; there is exactly one.
- No measure names a solution or counts use of a feature.
- Every starting point shows its source and period, or "No starting point yet".
- A target with no basis in company knowledge, Dana's personal knowledge or a previous experiment is labeled "Assumption".
- Sparks always suggests at least one measure under "What must not get worse".
- Every assumption from the brief is either covered by a measure or listed for Validate.
- Sparks moves on to the directions only when the goal and the main measure (with a target) are accepted or written by Dana and she has approved them; there's no button or page in between.
- The concept for review shows each part's name with the product team's term ("Main measure (primary metric)").

## Out of scope

- The workspace, Plan and how its parts flow, step states, suggestions, Sparks's voice and company knowledge access: [sparks.md](sparks.md).
- The problem brief and its assumptions: [sparks-plan-clarify.md](sparks-plan-clarify.md).
- Solutions: [sparks-plan-generate-directions.md](sparks-plan-generate-directions.md).
- Tracking the measures after implementation: Pulse ([sparks.md](sparks.md), "Out of scope").
