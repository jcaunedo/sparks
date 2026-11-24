<!--
Created: Nov 21, 2026
Created by: Julio Caunedo
Last updated: Nov 23, 2026 (the reminder flag shortened to "Check the fit first"; "Yes, evaluate it" starts the run right away, with no plan to approve; progress first, then what Sparks did and what it found; the panel starts blank; a scenario can be added after a run; the run's progress is the same feed as while a prototype is built; the plan has no "Where it stands" line for Evaluate: Plan stays the conversation; the step "Validate" renamed "Evaluate"; back at the choice, she picks on the direction cards, not quick replies; the finished plan, no longer "Blueprint"; the Blueprint no longer repeats the evaluation: one line in "Where it stands", with "Open"; each path in the prototype has its own runs; the spec panel is "Blueprint"; the Evaluation section in the Concept panel built; fixes built for every direction; the evaluation follows the chosen direction; "Go back to the choice" when the read is "Needs another look"; "Fix this in the prototype" only for fixes the prototype can make; "Go ahead to Review" opens Review; built as a reference layout: the plan, the run beside the conversation, the results, fixing in the prototype and running again, and the go-ahead; Evaluate starts from "Yes, evaluate it", not a button; Example range reaches the target (35–50%); what "reaches" means; counts aligned; "Needs a check")
Scope: the Evaluate step of a Sparks concept, the third of four (Plan, Prototype, Evaluate, Review): the scenario-based AI evaluation (scenarios worked through the prototype, and checks against business data, previous experiments, engineering context and the design system), the findings, the evidence status of the hypothesis, Dana's go-ahead, and the Evaluation section of the concept.
Purpose: defines how Dana learns, on her own and in minutes, what could go wrong with her concept and whether it can be built, before anyone else sees it, and how the evaluation stays honest about what an AI evaluation can and can't show.
-->

# Evaluate — Sparks

**Location:** the third of a Sparks concept's four steps. It opens when Dana ~~selects "Continue to Evaluate"~~ answers "Yes, evaluate it" to "Ready for me to put it through its paces?" at the end of Prototype ([sparks-prototype.md](sparks-prototype.md), "Finishing the step"), and whenever she selects Evaluate in the steps. It's optional, the only step that can be skipped ([sparks.md](sparks.md), "Moving through the steps").
**Audience:** experienced AutoParts Co. employees who know the business but aren't designers or engineers. The reference user is Dana, a Senior Product Manager.
**Description:** the step where Sparks works the prototype through realistic scenarios and checks the concept against AutoParts Co.'s data and resources, to surface potential risks, assumptions and usability concerns before Dana brings anyone in.
**Status:** defined. Built as a reference layout from this PRD (not in Figma yet): "Yes, evaluate it" opens Evaluate and runs it, with progress in place and the results coming in beside the conversation, blank at first (`ValidatePanel`); then what Sparks did, what it found and "Do you want to take this to review, or keep improving it?" follow. "Fix this in the prototype", "Run it again" (with what changed since the last run), Stop, and the go-ahead (which needs a run on the current prototype version, and opens Review) work. Each direction gets its own evaluation: its scenarios (for "Complete fit data", the people in the routine: stores, the returns team, the catalog team, customers), findings, assumptions, build needs and estimate, honest about what it can and can't do. "Go back to the choice" reopens the choice in Plan. Every direction has fixes the prototype can make, and the results follow them. Not built: adding a scenario to the run itself, deep links from a finding to its screen, "A run failed" and "A source can't be reached".

---

## Purpose

Before Dana brings anyone in, she wants to know: where could people struggle, how much could it move the measures she chose, and can AutoParts Co. actually build it. Evaluate gives her an early, honest read with a scenario-based AI evaluation: Sparks works the prototype through realistic situations drawn from what AutoParts Co. knows about its customers and teams, and checks the concept against business data, previous experiments, engineering context and the design system.

It works when Dana knows the likely risks and weak spots, has fixed what she can, and reaches Review with an honest account of what's been checked, how, and what still needs real people.

**An AI evaluation isn't research with real people.** It explores possible outcomes under assumptions; it doesn't observe anyone. Sparks never presents scenarios as research participants, never shows their reasoning as quotes from customers, and never says "validated" for what it found ([sparks.md](sparks.md), "Evidence and decisions").

✅ **Resolved:** Evaluate uses scenario-based AI evaluation, not simulated personas presented as research participants. Results are potential risks, assumptions and usability concerns, clearly told apart from real-user validation.

When Prototype made another testable artifact instead of a clickable prototype (a store routine, a process walkthrough), the scenarios are worked through that artifact the same way ([sparks-prototype.md](sparks-prototype.md), "When the direction isn't software").

ℹ️ Related specs: the workspace, step states, suggestions, how Sparks talks, evidence and decisions, and knowledge are in [sparks.md](sparks.md). The prototype comes from [sparks-prototype.md](sparks-prototype.md), the measures from the success criteria in Plan ([sparks-plan-define-success.md](sparks-plan-define-success.md)), the hypothesis and the assumptions to check from the choice in Plan ([sparks-plan-compare.md](sparks-plan-compare.md)).

## What gets evaluated

| Check | Question it answers | Method |
| --- | --- | --- |
| Scenarios | Can people do what they came to do? Where could they struggle? | AI simulation, from customer intelligence and the prototype |
| Effect on the measures | How much could it move the main measure and the others? Could anything that must not get worse get worse? | Business data analysis and AI simulation |
| The hypothesis | Does the evidence support what Dana believes the direction will achieve? | All of the above |
| Assumptions | Is each assumption supported, not supported, or still unknown? | Business data analysis, knowledge, AI simulation |
| Can AutoParts Co. build it | Does the platform have what the concept needs? What's missing? | Engineering context, the prototype's "Needs what AutoParts Co. doesn't have yet" |
| Design system and accessibility | Does it follow the design system and its accessibility standards? | Design system, the prototype |
| What it changes for teams | What would change for each department it touches? | Product ecosystem, the brief's "Who's involved" |

Every result says which method it comes from.

ℹ️ **Paths:** with more than one path in the prototype ([sparks-prototype.md](sparks-prototype.md), "Paths"), Evaluate runs on the path shown, and each path keeps its own runs and results, so they can be compared. A run on one path pauses while she looks at another.

## The evaluation plan

~~When Evaluate opens, Sparks drafts a plan and shows it before running anything:~~ When Evaluate opens, Sparks drafts the plan and runs it; Dana doesn't approve it first. What the plan holds:

- **Scenarios:** realistic situations for each audience in the prototype, built from the segments in the brief's "Who's involved" and from customer intelligence. Each is described as a situation, not a person: "A do-it-yourself customer buys brake pads for a 2012 Honda Civic on a phone." "A store associate helps a customer whose part showed 'We're not sure this fits', during a busy hour."
- **Accessibility scenarios:** at least one with a screen reader and one with only a keyboard, for each audience.
- **What happens in each:** the task, from the direction's "How it works" and the prototype's other paths: "Find brake pads that fit, on the first try." "Tell the customer which version of the part fits."
- **The other checks:** the rows in "What gets evaluated".

~~Dana can add a scenario ("A first-time buyer on a laptop with two saved vehicles"), change one, or remove it. Then she selects "Run the evaluation". The plan is a summary in Sparks's reply, approved like the others: "Looks right, continue" runs it; "Not quite" asks what to add, change or remove (sparks.md, "Talking with Sparks").~~ Once there are results, she can ask for another scenario in words ("Add a scenario with two saved vehicles"): Sparks notes it for the next run and offers "Run it again".

~~✅ **Resolved:** the plan is approved with "Looks right, continue", not a "Run the evaluation" button. Why: it's a summary like Plan's, and the same answer works everywhere.~~ ✅ **Resolved:** there's no plan to approve: "Yes, evaluate it" starts the run, and what was tested comes with the results, as in Prototype. Why: she has just said yes; reading nine scenarios before anything has run asked her to say it twice.

- **Six to ten scenarios** across audiences: enough to show patterns, few enough to read every one.
- **Built from patterns, never from a real person.** Scenarios come from what's typical across AutoParts Co.'s customers and teams, not from any one customer's or employee's record.

✅ **Resolved:** a plan has six to ten scenarios across audiences.

## Running it

- Sparks shows progress in the conversation as each part finishes: "Scenario 3 of 6: brake pads for a 2012 Civic on a phone." "Checking engineering context…" ~~The line updates in place, and ends~~ The same progress as while a prototype is built ([sparks-prototype.md](sparks-prototype.md), "Building it"): a status for each stage ("Planning the test drive…", "Test-driving it through 9 scenarios…", "Running 4 checks…", "Reading the results off the dyno…") over the latest five steps, folding to ~~"Finished: 9 scenarios and 4 checks, on prototype version 2."~~ "Evaluated in 22s", which opens to show every step. Sparks's reply starts with it and nothing else.
- **Beside the conversation, "Evaluation" starts blank,** with Stop. Each scenario comes in as Sparks starts on it, then each check's results, in the order they're done; the newest stays in view until Dana scrolls. ~~Each section fills in when its part is done.~~ Once it's finished, the full results show, the read first.
- **Done, the same reply goes on:** "**Here's what I did:**" (how many scenarios, as whom, how many got the task done; the checks; that it's an AI evaluation), then "**Here's what I found:**" (the read, what changed since the last run, the evidence status), and the question. If Dana has said something since, it comes as a new reply. "Run it again" works the same way.
- Results appear as they come; Dana doesn't have to wait for the whole run to start reading.
- Dana can keep talking to Sparks while it runs, and can stop the run. A stopped run keeps the results it has, marked "Stopped before finishing", and only those: findings come from a finished run.
- A run evaluates the prototype version that's current when it starts, and says which.
- **A path with no run yet** shows "This prototype hasn't been evaluated yet" in Evaluate, with "Evaluate the prototype".

✅ **Resolved:** Evaluate works as Prototype does: progress first, a blank panel that fills in as it goes, then what was done and the conclusions.

## The results

### Sparks's read

Sparks's read comes first: two or three sentences, with one of three reads:

- **"Ready for review":** nothing found that blocks it.
- **"Ready with changes":** worth fixing a few things first; it says which.
- **"Needs another look":** something important doesn't hold, such as the hypothesis, an assumption the concept depends on, or a measure it's unlikely to move. It says where to go back to: a part of Plan, or Prototype.

This is Sparks's recommendation. What Dana does next is hers ("Go ahead or keep improving").

### The hypothesis

What the evidence says about what Dana believes the chosen direction will achieve (written in the choice in Plan, [sparks-plan-compare.md](sparks-plan-compare.md)), as a method and an outcome ([sparks.md](sparks.md), "Evidence status"):

- **Supports hypothesis:** the results point the way the hypothesis says, and the estimated range reaches the target (the target falls within it or below it).
- **Inconclusive:** they point the right way but the range stays below the target, or only for some of the people affected, or there isn't enough to say. It says which.
- **Does not support hypothesis:** the results point the other way. It says why.

> **Simulation supports hypothesis**
> Based on simulated scenarios. Real-user testing is recommended before implementation.
>
> We believed that showing whether a part fits the customer's saved vehicle on every product page would cut "doesn't fit" returns 40% within 3 months of launch. Business data and the scenarios suggest 35–50% fewer. In 5 of 6 scenarios, the right part was chosen on the first try.

- **Confidence depends on the method.** Results from AI simulation are never shown with high confidence; at most medium. Business data analysis can reach high where the data is strong.
- When the outcome combines methods, each shows separately: "Business data supports hypothesis · Simulation inconclusive".
- This becomes the concept's evidence status. It's the first thing in "Effect on the measures" and in the review summary.

### Effect on the measures

For the main measure and each other measure: an estimated range, its method, its confidence, and why.

> **Online orders returned as "doesn't fit":** likely 35–50% fewer, which reaches your 40% target. Medium confidence, business data analysis and AI simulation: customers who used last year's vehicle selector returned {percent} fewer parts as "doesn't fit", and the right part was chosen on the first try in 5 of 6 scenarios. 

- Always a range, never a single number.
- Each estimate says whether it reaches Dana's target.
- Each "What must not get worse" measure shows Safe, Watch or At risk, with the reason.

### Findings

Potential risks, usability concerns and assumptions, most important first. Each finding has:

- **What could go wrong,** in plain words: "In 2 of 6 scenarios, the fit message sits below the price and is easy to miss."
- **Where:** the screen, with a link that opens the prototype there.
- **How much it matters:** "Blocks" (the task can't be done, or the concept can't be built), "Hurts" (it can be done, with trouble), or "Minor".
- **Its method:** AI simulation, business data analysis, or engineering context, with the source.
- ~~**A suggested fix,** when Sparks has one, with "Fix this in the prototype".~~ **A suggested fix,** when Sparks has one. "Fix this in the prototype" shows only when the fix is a change to the prototype; a fix that needs a decision first (another direction, other data, another team's work) shows as a suggestion only, and goes to review with the finding.

✅ **Resolved:** "Fix this in the prototype" is offered only for fixes the prototype can make; the others are suggestions.

✅ **Resolved:** the fixes each direction's prototype can make, and what they change in the results:
- **Fit check before you buy:** the fit message above the price; a next step for "We're not sure this fits".
- **Flag often-returned parts:** the flag worded as a reminder, "Check the fit first". Online sales become Safe, but the read stays "Needs another look": the flag still doesn't say whether a part fits.
- **Fit check at checkout:** the fit checked as parts go in the cart (online sales go from At risk to Watch); "Another vehicle" at checkout, with its year, make and model. With both, the read is "Ready for review".
- **Complete fit data:** the vehicle filled in from the customer's account at the counter, one tap; picking it at the counter when the account has none. The read stays "Needs another look": fixes still wait for the monthly supplier feed.

Showing whether a part fits (that's another direction), separating return reasons in the counts, missing fit data and the monthly feed need a decision or another team's work, so they stay suggestions. "Keep improving" says so when no finding has one, and asks her to describe a change in Prototype or point at what to change.

### Stepping through a scenario

Each scenario can be stepped through: the prototype at each step, what the scenario was trying to do, and where and why Sparks expects trouble, labeled as AI evaluation: "AI evaluation: the fit message is below the price and the reviews. Someone adding to the cart quickly may miss 'Doesn't fit your Civic' and buy the wrong part."

Sparks's reasoning is never written as a customer's words or thoughts, and never appears outside Sparks without its method.

### Assumptions

Each assumption from "To check in Evaluate", and any others in the concept, with one of:

- **Supported,** with the evidence and its method.
- **Not supported,** with the evidence, and what it changes.
- **Still unknown,** with how real-user testing or data could find out.

### Can AutoParts Co. build it

What the concept needs and whether the platform has it: "Saved vehicles: available from Sales." "Fit data for vehicles older than 15 years: incomplete; about {percent} of parts lack it." It confirms or updates the prototype's "Needs what AutoParts Co. doesn't have yet" and the rough effort.

### Design system and accessibility

Whether the prototype follows the design system and its accessibility standards, and anything that doesn't, including what Dana kept under "Departs from the design system" ([sparks-prototype.md](sparks-prototype.md), "Changing it"). How the screen-reader and keyboard scenarios went is here too.

### What it changes for teams

For each department the concept touches: what would change in their day. "Stores: fewer fit questions at the counter; associates need to know what 'We're not sure this fits' means."

### What only real people can tell us

What an AI evaluation can't answer well: whether customers trust the fit message, whether professional mechanics want it at all, whether associates use the counter view. Sparks lists them, with a suggested way to find out each. The list goes to Review, for the UX team ([sparks-review.md](sparks-review.md), "Who to invite").

## Fixing and running again

- **"Fix this in the prototype"** opens Prototype with the suggested fix ready as a suggestion. Dana accepts it or changes it there, and comes back to Evaluate.
- Dana can also go back to the part of Plan a finding points to: the choice, if the direction doesn't hold; the success criteria, if a target turns out unrealistic. Sparks reopens that part in the conversation ([sparks.md](sparks.md), "Plan").
- **"Run again"** runs the plan on the current prototype version. Sparks shows what changed since the last run: "3 of 4 findings fixed. 'Doesn't fit' returns: now likely 40–55% fewer."
- Every run is kept, with the prototype version it evaluated.

## Go ahead or keep improving

When Dana has read the results, Sparks asks: "Do you want to take this to review, or keep improving it?", with "Go ahead to Review" and "Keep improving" as quick replies, right after its read and the evidence status

- **"Go ahead to Review"** records her go-ahead and the evidence status, with a note if she wants to add one, and continues.
- **"Keep improving"** keeps her in Evaluate to fix and run again.
- **"Go back to the choice"** comes first when Sparks's read is "Needs another look" because the direction is unlikely to reach the target on its own. The question becomes "Do you want to go back to the choice, take this to review as it is, or keep improving it?" The choice reopens in the conversation, with the four directions where they were ~~and the one she tried left out of the quick replies~~, picked again with a card's "Generate prototype" ([sparks-plan-compare.md](sparks-plan-compare.md), "Going back to the choice").

✅ **Resolved:** with a "Needs another look" read, "Go back to the choice" is the first answer offered; going ahead to Review as it is and keeping on improving stay open.

**Going ahead with open findings is allowed.** Any finding marked "Blocks" or "Hurts" that's still open, and any assumption not supported, is listed as a known issue for review. Sparks says so once before she continues: "Two findings are still open. They'll go to review as known issues."

**Skipping Evaluate is allowed** ([sparks.md](sparks.md), "Moving through the steps"). The evidence status stays "Not tested", and Review lists it as a gap.

## The Evaluation section

What the step adds to the concept, shown in Evaluate's panel beside the conversation~~; the plan has one line for it in "Where it stands" ([sparks.md](sparks.md), "The finished plan")~~ (Plan stays the conversation, with no "Where it stands": [sparks.md](sparks.md), "The finished plan"):

| Part | Holds | Needed to finish |
| --- | --- | --- |
| Evaluation plan | The scenarios, tasks and checks | Yes |
| Sparks's read | The summary and its read | Yes (from a run) |
| The hypothesis | The outcome by method, with confidence and why | Yes (from a run) |
| Effect on the measures | The estimates, with method, confidence and reasons | Yes (from a run) |
| Findings | Every finding, with its method and status: open or fixed | Yes (from a run) |
| Assumptions | Each assumption's status and evidence | Yes (from a run) |
| Can AutoParts Co. build it | What's available and what's missing | Yes (from a run) |
| Design system and accessibility | What follows the standards and what doesn't | Yes (from a run) |
| What it changes for teams | The change for each department | Yes (from a run) |
| What only real people can tell us | The questions and how to find out | Yes (from a run) |
| Runs | Every run, its prototype version and its read | Yes (kept automatically) |
| Dana's go-ahead | Her go-ahead and her note | Yes |

~~How it shows, as built ("The evaluation" in the Concept panel, under "Evaluate"):~~

- ~~It appears once the first run starts. Until a run finishes, it shows the plan ("9 scenarios, then business data, engineering context, the design system and how teams work."), "The results show here once the run finishes." and the run as "running".~~
- ~~Once a run finishes, it shows that run's results, part by part as in the table: Sparks's read, the hypothesis (the outcome by method, what was found, what it rests on), the effect on each measure (estimate, confidence or status, and why), findings marked "Open" or "Fixed" with how much each matters and its method, assumptions with their status and evidence, then what it needs to be built, design and accessibility, teams and what only real people can tell us.~~
- ~~"Runs" lists every run, newest first, with its prototype version and its read ("stopped before finishing", "running"). "Your go-ahead" says whether she went ahead to Review.~~
- ~~"See the results" opens Evaluate beside the conversation.~~
- ~~With Evaluate skipped, the section says so: "Evaluate was skipped, so the hypothesis isn't tested. Review lists it as a gap."~~

~~✅ **Resolved:** the Evaluation section shows the last finished run, never a run in progress, so the concept always holds results that are complete; a run in progress shows only in "Runs".~~

How it shows in the plan, as built ("Where it stands" → Evaluate, once Evaluate is reached): "Not run yet.", "Run 2 on version 3, running.", "Run 2 on version 3, stopped.", "Run 2 on version 3: Ready for review. Simulation supports hypothesis." (the last run's read and its evidence status), or "Skipped: the hypothesis isn't tested."; "Open" goes to Evaluate, where the full evaluation is.

✅ **Resolved:** the plan no longer repeats the evaluation~~; it has one line on where Evaluate stands, with "Open"~~ (and no "Where it stands": Plan stays the conversation). Why: the evaluation has its own panel in Evaluate, and the plan keeps the spec ([sparks.md](sparks.md), "The finished plan").

⚠️ **Gap:** her note with the go-ahead isn't built.

## Finishing the step

Evaluate is Done when there's a complete run on the current prototype version and Dana has chosen "Go ahead to Review".

- **The prototype changed since the last run:** "Go ahead to Review" isn't available, and the section says why: "The prototype changed after the last run. Run it again to evaluate the current version."
- Selecting "Go ahead to Review" marks Evaluate as Done and opens Review.

✅ **Resolved:** the go-ahead needs a run on the current prototype version, so the review never presents results for a prototype that no longer exists.

## States

| State | What shows | What Dana can do |
| --- | --- | --- |
| ~~Plan ready~~ | ~~The scenarios, tasks and checks~~ | ~~Add, change or remove scenarios and tasks; "Run the evaluation"~~ |
| Getting ready | Progress in the conversation; a blank panel | Wait, stop it |
| Running | Progress by part; results as they arrive | Read results so far, step through a scenario, stop it |
| Stopped | The results so far, marked "Stopped before finishing" | Run again |
| Results ready | What Sparks did and found; Sparks's read, the evidence status, then each part of the results | Step through scenarios, fix in the prototype, go back to Plan, decide |
| A run failed | "I couldn't finish the evaluation. Your prototype and earlier runs are unchanged." and "Try again" | Try again |
| A source can't be reached | The check that depends on it says "Couldn't check {source}" and its confidence drops | Run again later, go on |
| Prototype changed since the last run | "The prototype changed after the last run…" | Run again |
| Ready to continue | Sparks's question and "Go ahead to Review" | Go ahead, keep improving |

## Checks

What Dana says → what Sparks must do:

| Dana | Sparks must |
| --- | --- |
| ~~Opens Evaluate~~ Says "Yes, evaluate it" | ~~Show the plan as scenarios, including screen-reader and keyboard scenarios, and run nothing until she starts it~~ Run scenarios, including screen-reader and keyboard ones, then say what it did and what it found |
| "So customers will love it?" | Say what the evaluation suggests, that it's an AI evaluation, and that how people feel is under "What only real people can tell us" |
| "Add my neighbor as a test customer, she orders a lot." | Explain that scenarios come from patterns, not real people, and offer a scenario like the one she describes |
| "Give me the exact number of returns we'll save." | Give the range, method and confidence, and explain why it can't be exact |
| "Can I say it's validated?" | Say the simulation supports the hypothesis, that it isn't validation with real people, and what real-user testing would confirm |
| Selects "Fix this in the prototype" | Open Prototype with the fix ready as a suggestion |
| Goes ahead with a finding marked "Blocks" still open | Say once that it goes to review as a known issue, then let her continue |
| Changes the prototype, then tries to go ahead | Ask her to run the evaluation again on the current version |
| The hypothesis isn't supported | Show "Simulation does not support hypothesis" (or the method that applies), read "Needs another look", and name where to go back to in Plan |
| The estimate reaches the target for repeat customers only | Show "Inconclusive" and say for whom it holds |
| Engineering context says the platform lacks something | Say what's missing and what that does to the rough effort |

## Accessibility

- Progress is announced as each part finishes, not continuously.
- Stepping through a scenario works from the keyboard, and each step's AI evaluation is readable as text.
- "Blocks", "Hurts" and "Minor", the evidence outcome and its method, and "Supported", "Not supported" and "Still unknown", are written out, never shown by color alone.

## Acceptance Criteria

- Given a finished prototype, when Dana says "Yes, evaluate it", then Sparks runs six to ten scenarios across audiences, including screen-reader and keyboard scenarios~~, and runs nothing until Dana selects "Run the evaluation"~~, showing only its progress until it's done, then what it did and what it found.
- Scenarios are described as situations; none is presented as a research participant or based on a real customer's or employee's record.
- Sparks's reasoning in a scenario is labeled "AI evaluation" and never written as a customer's words.
- The hypothesis shows an outcome (Supports, Inconclusive or Does not support) with its method, and "Simulation supports hypothesis" shows "Based on simulated scenarios. Real-user testing is recommended before implementation."
- Results from AI simulation alone never show high confidence; the word "validated" never appears for them.
- Every estimate of a measure is a range with its method, confidence and reasons, and says whether it reaches Dana's target.
- Every finding shows what could go wrong, where, how much it matters, its method, and a suggested fix when there is one.
- Every assumption from "To check in Evaluate" shows Supported, Not supported or Still unknown.
- "Fix this in the prototype" opens Prototype with the fix as a suggestion; "Run again" shows what changed since the last run.
- "Go ahead to Review" is available only after a complete run on the current prototype version.
- Given Evaluate is skipped, the evidence status is "Not tested" and Review lists it as a gap.
- Open findings marked "Blocks" or "Hurts", and unsupported assumptions, appear in review as known issues.

## Out of scope

- The workspace, step states, suggestions, Sparks's voice, evidence and decisions, and knowledge: [sparks.md](sparks.md).
- Building and changing the prototype: [sparks-prototype.md](sparks-prototype.md).
- Testing with real people, and bringing others in: [sparks-review.md](sparks-review.md).
- Comparing Evaluate's estimates with real outcomes after implementation: a future direction, with Pulse ([sparks.md](sparks.md), "Out of scope").
