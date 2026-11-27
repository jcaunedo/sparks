<!--
Created: Nov 21, 2026
Created by: Julio Caunedo
Last updated: Nov 26, 2026
Latest update: the run button reads "Run" before and after a run (no "Run again"), and the buttons on a finding ("Fix in the prototype", Try "{direction}") are outlined, no longer dark. Why: one button, one name; a finding's actions sit under the panel's dark "Run" and "Add to Review" instead of competing with them.
Recent updates: the run button is always dark (Button Solid · Neutral), instead of outlined once there are results. A path with no run yet has "Evaluate the prototype" (outlined) under its empty state, which starts the run. Evaluate has no conversation: the evaluation on the left, the prototype on the right; "Fix in the prototype" opens Prototype on the finding's page with Sparks's plan.
Scope: the Evaluate step of a Sparks concept, the third of four (Plan, Prototype, Evaluate, Review): the scenario-based AI evaluation (scenarios worked through the prototype, and checks against business data, previous experiments, engineering context and the design system), the findings, the evidence status of the hypothesis, Dana's go-ahead, and the Evaluation section of the concept.
Purpose: defines how Dana learns, on her own and in minutes, what could go wrong with her concept and whether it can be built, before anyone else sees it, and how the evaluation stays honest about what an AI evaluation can and can't show.
-->

# Evaluate — Sparks

**Location:** the third of a Sparks concept's four steps. It opens when Dana ~~selects "Continue to Evaluate"~~ answers "Yes, evaluate it" to "Ready for me to put it through its paces?" at the end of Prototype ([sparks-prototype.md](sparks-prototype.md), "Finishing the step"; Sparks's answer stays in Prototype's conversation), and whenever she selects Evaluate in the steps. It's optional, the only step that can be skipped ([sparks.md](sparks.md), "Moving through the steps").
**Audience:** experienced AutoParts Co. employees who know the business but aren't designers or engineers. The reference user is Dana, a Senior Product Manager.
**Description:** the step where Sparks works the prototype through realistic scenarios and checks the concept against AutoParts Co.'s data and resources, to surface potential risks, assumptions and usability concerns before Dana brings anyone in.
**Status:** defined. ✅ **Resolved:** built as a reference layout from this PRD and Figma Sparks "Evaluate" (72:660): Evaluate has no conversation; the prototype (`EvaluationPrototype`, with the path, its versions and "Add to Review") and the evaluation (`ValidatePanel`, with "Run" or Stop) sit side by side. The scenarios work the real prototype as agents, one at a time; findings get numbered markers on it; ~~"Fix this in the prototype" makes the change in place~~ "Fix in the prototype" opens Prototype on the finding's page; "Watch it on the prototype" replays a scenario. Not built: adding a scenario to the run, "A run failed" and "A source can't be reached". ~~Built as a reference layout from this PRD (not in Figma yet): "Yes, evaluate it" opens Evaluate and runs it, with progress in place and the results coming in beside the conversation, blank at first (`ValidatePanel`); then what Sparks did, what it found and "Do you want to take this to review, or keep improving it?" follow. "Fix this in the prototype", "Run it again" (with what changed since the last run), Stop, and the go-ahead (which needs a run on the current prototype version, and opens Review) work. Each direction gets its own evaluation: its scenarios (for "Complete fit data", the people in the routine: stores, the returns team, the catalog team, customers), findings, assumptions, build needs and estimate, honest about what it can and can't do. "Go back to the choice" reopens the choice in Plan. Every direction has fixes the prototype can make, and the results follow them. Not built: adding a scenario to the run itself, deep links from a finding to its screen, "A run failed" and "A source can't be reached".~~

---

## Purpose

Before Dana brings anyone in, she wants to know: where could people struggle, how much could it move the measures she chose, and can AutoParts Co. actually build it. Evaluate gives her an early, honest read with a scenario-based AI evaluation: Sparks works the prototype through realistic situations drawn from what AutoParts Co. knows about its customers and teams, and checks the concept against business data, previous experiments, engineering context and the design system.

It works when Dana knows the likely risks and weak spots, has fixed what she can, and reaches Review with an honest account of what's been checked, how, and what still needs real people.

**An AI evaluation isn't research with real people.** It explores possible outcomes under assumptions; it doesn't observe anyone. Sparks never presents scenarios as research participants, never shows their reasoning as quotes from customers, and never says "validated" for what it found ([sparks.md](sparks.md), "Evidence and decisions").

✅ **Resolved:** Evaluate uses scenario-based AI evaluation, not simulated personas presented as research participants. Results are potential risks, assumptions and usability concerns, clearly told apart from real-user validation.

When Prototype made another testable artifact instead of a clickable prototype (a store routine, a process walkthrough), the scenarios are worked through that artifact the same way ([sparks-prototype.md](sparks-prototype.md), "When the direction isn't software").

ℹ️ Related specs: the workspace, step states, suggestions, how Sparks talks, evidence and decisions, and knowledge are in [sparks.md](sparks.md). The prototype comes from [sparks-prototype.md](sparks-prototype.md), the measures from the success criteria in Plan ([sparks-plan-define-success.md](sparks-plan-define-success.md)), the hypothesis and the assumptions to check from the choice in Plan ([sparks-plan-compare.md](sparks-plan-compare.md)).

## Evaluate's screen

Evaluate has no conversation. Under the header, two panels of the same width sit side by side (Figma Sparks "Evaluate", 72:660):

- **The evaluation, ~~on the right~~ on the left.** On top, "Evaluation" and "Run" (~~"Run again" once there's a run;~~ "Run" before and after a run; Stop while it runs). Below, on a card: the run's progress, then the results ("The results").
- **The prototype, ~~on the left~~ on the right.** On top, the path's name with its menu (the versions, and the other paths), as in Prototype, and "Add to Review", her go-ahead ("Go ahead or keep improving"). ~~Below, the prototype in its device, the same as in Prototype. She can try it whenever no scenario is working on it.~~ Below, the prototype's screens on a strip, the one in focus in a phone with a dark bezel, with the agents over it ("The agents"). She can try the one in focus whenever the agents aren't working.

  ✅ **Resolved:** the evaluation is on the left and the prototype on the right. Why: "Add to Review", the way forward, ends up at the top right, where every step has it ([sparks.md](sparks.md), "Moving through the steps"), and the prototype stays where Prototype shows it. Figma (72:660) draws them the other way round.

✅ **Resolved:** Evaluate has no conversation: the prototype and the evaluation are side by side. Why: the prototype left the screen at the moment Sparks started testing it, so the results talked about screens Dana couldn't see; and Sparks's reply repeated what the results said.

⚠️ **Open question:** with no conversation in Evaluate, there's no place to ask why a scenario struggled, to ask for another scenario in words, or to describe a change the fix buttons don't offer (that's Prototype's conversation today). A message box under the evaluation would cover it without bringing the conversation back. Describing a change no longer waits for this: "Fix in the prototype" opens Prototype's conversation on the finding ("Fixing and running again").

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

- **Scenarios:** realistic situations for each audience in the prototype, built from the segments in the brief's "Who's involved" and from customer intelligence. Each is described as a situation, not a person: "A do-it-yourself customer buys brake pads for a 2012 Honda Civic on a phone." "A store associate helps a customer whose part showed 'We're not sure this fits', during a busy hour." Scenarios cover the audiences in the prototype: store staff ones only where it has a store staff view ("Complete fit data").
- **Accessibility scenarios:** at least one with a screen reader and one with only a keyboard, for each audience.
- **What happens in each:** the task, from the direction's "How it works" and the prototype's other paths: "Find brake pads that fit, on the first try." "Tell the customer which version of the part fits."
- **The other checks:** the rows in "What gets evaluated".

~~Dana can add a scenario ("A first-time buyer on a laptop with two saved vehicles"), change one, or remove it. Then she selects "Run the evaluation". The plan is a summary in Sparks's reply, approved like the others: "Looks right, continue" runs it; "Not quite" asks what to add, change or remove (sparks.md, "Talking with Sparks").~~ ~~Once there are results, she can ask for another scenario in words ("Add a scenario with two saved vehicles"): Sparks notes it for the next run and offers "Run it again".~~ ✅ **Resolved:** no scenario is asked for in words in Evaluate, which has no conversation (see the open question in "Evaluate's screen").

~~✅ **Resolved:** the plan is approved with "Looks right, continue", not a "Run the evaluation" button. Why: it's a summary like Plan's, and the same answer works everywhere.~~ ✅ **Resolved:** there's no plan to approve: "Yes, evaluate it" starts the run, and what was tested comes with the results, as in Prototype. Why: she has just said yes; reading nine scenarios before anything has run asked her to say it twice.

- **Six to ten scenarios** across audiences: enough to show patterns, few enough to read every one.
- **Built from patterns, never from a real person.** Scenarios come from what's typical across AutoParts Co.'s customers and teams, not from any one customer's or employee's record.

✅ **Resolved:** a plan has six to ten scenarios across audiences.

## Running it

- ~~Sparks shows progress in the conversation as each part finishes: "Scenario 3 of 6: brake pads for a 2012 Civic on a phone." "Checking engineering context…" ~~The line updates in place, and ends~~ The same progress as while a prototype is built ([sparks-prototype.md](sparks-prototype.md), "Building it"): a status for each stage ("Planning the test drive…", "Test-driving it through 9 scenarios…", "Running 4 checks…", "Reading the results off the dyno…") over the latest five steps, folding to ~~"Finished: 9 scenarios and 4 checks, on prototype version 2."~~ "Evaluated in 22s", which opens to show every step. Sparks's reply starts with it and nothing else.~~ ✅ **Resolved:** the progress is at the top of the evaluation's card, the same feed as while a prototype is built: a status for each stage ("Planning the test drive…", "Test-driving it through 9 scenarios…", "Running 4 checks…", "Reading the results off the dyno…") over the latest five steps, folding to "Evaluated in 22s", which opens to show every step.
- ~~**Beside the conversation, "Evaluation" starts blank,** with Stop. Each scenario comes in as Sparks starts on it, then each check's results, in the order they're done; the newest stays in view until Dana scrolls. ~~Each section fills in when its part is done.~~ Once it's finished, the full results show, the read first.~~ ✅ **Resolved:** under the progress, each scenario comes in as its agent starts, then each check's results, in the order they're done; the newest stays in view until Dana scrolls. Stop replaces "Run" while it runs. Once it's finished, the full results show, the read first.
- ~~**Done, the same reply goes on:** "**Here's what I did:**" (how many scenarios, as whom, how many got the task done; the checks; that it's an AI evaluation), then "**Here's what I found:**" (the read, what changed since the last run, the evidence status), and the question. If Dana has said something since, it comes as a new reply. "Run it again" works the same way.~~ ✅ **Resolved:** what Sparks did is in the card (the progress, and each scenario with its outcome), and what it found starts the results: its read and the evidence status. Nothing is said in a conversation.
- Results appear as they come; Dana doesn't have to wait for the whole run to start reading.
- ~~Dana can keep talking to Sparks while it runs, and can stop the run.~~ Dana can stop the run. A stopped run keeps the results it has, marked "Stopped before finishing", and only those: findings come from a finished run.
- A run evaluates the prototype version that's current when it starts, and says which.
- **A path with no run yet** shows "This prototype hasn't been evaluated yet" in Evaluate, with "Evaluate the prototype".

  ✅ **Resolved:** "Evaluate the prototype" (outlined) sits under the empty state's text and starts the run, the same as "Run" in the panel's header. The text no longer starts with `Select "Run":`. ~~Until the first run, "Run" stands out too (dark, Button Solid · Neutral); once there are results, "Run again" is outlined, and stands out again only after a change to the prototype.~~ ✅ **Resolved:** "Run" and "Run again" are always dark (Button Solid · Neutral), before the first run and after it.

✅ **Resolved:** Evaluate works as Prototype does: progress first, a blank panel that fills in as it goes, then what was done and the conclusions.

### The agents

~~Each scenario works the real prototype as an agent, so Dana sees where it goes and where it struggles:~~

- ~~**An agent is a tag, named by its situation** in a few words ("In a hurry", "Spark plugs · older truck", "Call at the counter"), never a person's name, in one of the Sparks logo's colors (sapphire, tangerine, amethyst, clover, cerulean, citrine, in that order). Screen-reader and keyboard scenarios are dark, with a dashed outline: they read and tab, they don't point.~~
- ~~**When the scenarios begin, they line up beside the phone,** in the order they'll run. Each in turn goes to every place its steps name: the prototype opens on that screen (and on that part, for a product page), the element is outlined in the agent's color with its tag at the corner, and the agent stays about a second and a half, then goes on. When it's been everywhere, it leaves and the next one starts. A step about data, with no place on the prototype, takes the same moment without moving.~~
- ~~**An agent only goes where its steps say.** The places come with the scenario from the evaluation; the motion never shows more than the evaluation found.~~
- ~~**The prototype can't be used while an agent is on it,** and the path and versions can't be changed. Between scenarios and once it's done, it can.~~
- ~~**Reduced motion:** the agents go from place to place without moving across the screen.~~

~~✅ **Resolved:** the scenarios work the prototype as agents, one at a time, the others waiting beside the phone. Why: Evaluate tests the prototype, so the test happens on it, where Dana can see it, and one at a time matches the progress ("Scenario 3 of 9").~~

~~⚠️ **Open question:** Figma shows several agents on the prototype at once. Running the scenarios that use the same screen together would be quicker to watch, but harder to follow.~~

✅ **Resolved:** every agent works the real prototype at the same time, as in Figma Sparks "Evaluate" (72:660), so Dana sees where each goes and where it struggles:

- **Two kinds of agents.** Each scenario is one, named by its situation in a few words ("In a hurry", "Spark plugs · older truck", "Call at the counter"), never a person's name, in one of the Sparks logo's colors (sapphire, tangerine, amethyst, clover, cerulean, citrine, in that order). And four experts, AI agents in a role, dark, each with its role's icon: **UX expert** (usability and the design system), **Copywriter** (the words on each screen), **Engineer** (what it needs to be built), **Data analyst** (business data and the measures).
- **An agent is a pointer with its name,** as in a multiplayer canvas: an arrow in its color, outlined white, with its name in a tag beside it.
- **The prototype is a strip of its screens,** side by side: the one in focus in the middle, in a phone with a dark bezel, at a real phone's proportions (a 375 × 812 screen, scaled down as a whole when there's less room; a monitor for the store's screens), the ones before and after it smaller and faded on either side, each named above it. Under it, arrows and a dot per screen.
- ~~**While it runs, the strip goes through the journey,** sliding from one screen to the next. On each, every agent with a place there goes to it, a moment apart, all working at once: a customer taps (a ring where it lands), an expert or a keyboard agent outlines what it looks at. Each stays about a second and a half per place. The others float around the phone, drifting slowly, until it's their turn; an agent that's done floats with a check.~~
- ✅ **Resolved:** **While it runs, the strip goes through the journey,** sliding from one screen to the next. **Only the agents at work show:** on each screen, every agent with a place there comes in from the side, at its own moment, works, and fades out when it's done there; the others aren't shown. Under the strip, how many are at work: "4 of 13 AI agents at work, simulated: not real people."
- ✅ **Resolved:** **Each agent works the way its situation suggests, so no two move alike.** A customer glances around the screen first (or not), goes to the element, hovers while its hand wanders a little, then taps (a ring where it taps). Someone in a hurry goes straight there and taps at once; a first-time buyer looks around a lot and hesitates; someone unsure of the fit (an older truck) hovers longest; a pro mechanic or a store associate is quick and sure. Experts read along what they look at, outlined with a dashed line: the Copywriter slowly, the Data analyst in quick hops, the Engineer straight to what it checks. Screen reader and keyboard agents have no pointer: a focus ring, with their name, jumps from element to element. An agent with no hint in its situation still gets its own speed, hesitation and route, the same every time.
- **What they see shows as they work:** an expert's note at each place, and a customer's where something happens, under its name, labeled "AI evaluation". Under the strip: "{n} AI agents, simulated: not real people."
- **A finding drops as it's found:** its numbered marker falls onto the element when an agent gets there, while the run goes on.
- **An agent only goes where its steps say.** The places come with the evaluation; the motion never shows more than the evaluation found. A step about data, with no place on the prototype, has no stop.
- ✅ **Resolved:** **every screen is evaluated.** The strip visits every screen of the prototype; a screen no step reaches gets the UX expert's look ("Nothing to flag on the cart.").
- ✅ **Resolved:** **no long pauses.** Agents arrive on a screen within about a second of it sliding in; an agent looks around only when it arrives, and hovers only where it decides (its last place there); getting ready and the checks after the agents go quickly. Slow agents stay slower than quick ones, but never leave the screen waiting for long.
- **The strip can't be moved, and the prototype can't be used, while it runs**, and the path and versions can't be changed. Once it's done: drag the strip sideways or use the arrows (or ← and → keys), select a screen on either side to bring it in, use the one in focus, and select an agent to watch it again.
- **Reduced motion:** no taps, and agents fade in where they work instead of coming in from the side; the agents and the strip go from place to place without moving across the screen.

Why: the agents working together, on the screens they test, show in seconds what the evaluation does and where things go wrong, which a list of results doesn't.

✅ **Resolved:** experts are AI agents in a role, not people: their tags name a role, their notes are labeled "AI evaluation", and the results list them under "Expert reviews" ("AI agents in a role, not people").

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
- ~~**Where:** the screen, with a link that opens the prototype there.~~ **Where:** the screen, in words. ✅ **Resolved:** a finding that happens on a screen has a number, and a marker with that number sits on the element on the prototype, in the severity's color ("Blocks" red, "Hurts" amber). Selecting the finding opens the prototype there; selecting the marker brings the finding into view in the list. Once a run is done, the prototype opens where the first open finding happens. ✅ **Resolved:** the two panels move together: whenever the screen in focus has a finding (when the run is done, or when Dana moves the strip to it), the evaluation scrolls that finding to the top of its card, highlighted ("Findings" above it for the first one). A finding about the data or every screen has a gray number and no marker.
- **How much it matters:** "Blocks" (the task can't be done, or the concept can't be built), "Hurts" (it can be done, with trouble), or "Minor".
- **Its method:** AI simulation, business data analysis, or engineering context, with the source.
- ~~**A suggested fix,** when Sparks has one, with "Fix this in the prototype".~~ **A suggested fix,** when Sparks has one. ~~"Fix this in the prototype"~~ "Fix in the prototype" shows only when the fix is a change to the prototype; a fix that needs a decision first (another direction, other data, another team's work) shows as a suggestion only, and goes to review with the finding.

✅ **Resolved:** ~~"Fix this in the prototype"~~ "Fix in the prototype" is offered only for fixes the prototype can make; the others are suggestions.

✅ **Resolved:** the fixes each direction's prototype can make, and what they change in the results:
- **Fit check before you buy:** the fit message above the price; a next step for "We're not sure this fits".
- **Flag often-returned parts:** the flag worded as a reminder, "Check the fit first". Online sales become Safe, but the read stays "Needs another look": the flag still doesn't say whether a part fits.
- **Fit check at checkout:** the fit checked as parts go in the cart (online sales go from At risk to Watch); "Another vehicle" at checkout, with its year, make and model. With both, the read is "Ready for review".
- **Complete fit data:** the vehicle filled in from the customer's account at the counter, one tap; picking it at the counter when the account has none. The read stays "Needs another look": fixes still wait for the monthly supplier feed.

Showing whether a part fits (that's another direction), separating return reasons in the counts, missing fit data and the monthly feed need a decision or another team's work, so they stay suggestions. ✅ **Resolved:** a suggestion that's another direction says so and offers it: **Try "{direction}"** builds it as another path, beside this one, as its card's "Generate prototype" does (Prototype opens while it builds); once built, **Open "{direction}"** opens it. E.g. "Flag often-returned parts": "The flag says a part comes back a lot, not whether it fits" suggests "Fit check before you buy". Why: the fix is a whole direction, which the flag's prototype can't become, so the way to fix it is to try that direction; the only way there was "Go back to the choice", at the top of the results. The other suggestions (data, another team's work) still go to review with their finding. "Keep improving" says so when no finding has one, and asks her to describe a change in Prototype or point at what to change.

### Fixing from a scenario

A scenario that ran into trouble shows, under its outcome, the finding behind it: "Finding {n} · {what could go wrong}" (selecting "Finding {n}" shows it on the prototype, as selecting the finding does), then that finding's fix, exactly as on the finding: "Suggested fix: …" with ~~"Fix this in the prototype"~~ "Fix in the prototype" when the prototype can make it, "Suggestion: …" with Try "{direction}" when it's another direction, or "Suggestion: …" alone when it needs a decision first. Fixing it here is the same as fixing it from the finding ("Fixing and running again"): the scenario and the finding both say "Fixed in version {n} · run again to check it" until she runs it again, and the scenario keeps its outcome until then, since nothing has checked the fix yet. Once fixed, "Change the fix in the prototype" takes the button's place, on both. A scenario with no open finding behind it shows nothing more.

✅ **Resolved:** a scenario that struggled shows the finding behind it and its fix, so Dana can fix it where she reads about the trouble, instead of finding it in "Findings" further up. Why: "Spark plugs · older truck" said it struggled with no way to act on it there, while its fix was in another section.

### Stepping through a scenario

Each scenario can be stepped through: the prototype at each step, what the scenario was trying to do, and where and why Sparks expects trouble, labeled as AI evaluation: "AI evaluation: the fit message is below the price and the reviews. Someone adding to the cart quickly may miss 'Doesn't fit your Civic' and buy the wrong part."

✅ **Resolved:** "Watch it on the prototype", on each scenario and each expert once the run is done (or selecting the agent on the prototype): its agent goes through it again, the strip sliding to each of its screens, staying twice as long at each place, with what Sparks saw there under its name, labeled "AI evaluation"; the other agents fade. "Step through" still lists the steps as text.

Sparks's reasoning is never written as a customer's words or thoughts, and never appears outside Sparks without its method.

### Expert reviews

What each expert agent looked at, a note for each place (labeled "AI evaluation"), and what it concludes: "UX expert · Usability and the design system: Clear, except the fit message's place on the product page." Each comes in as its agent finishes.

### Assumptions

Each assumption from "To check in Evaluate", and any others in the concept, with one of:

- **Supported,** with the evidence and its method.
- **Not supported,** with the evidence, and what it changes.
- **Still unknown,** with how real-user testing or data could find out. For "Fit check before you buy": "Most invoices can be read well enough to find the vehicle." (a try with a few hundred real invoices would show how many work).

### Can AutoParts Co. build it

What the concept needs and whether the platform has it: "Saved vehicles: available from Sales." "Fit data for vehicles older than 15 years: incomplete; about {percent} of parts lack it." "Reading VINs and invoices: not available yet, so it's pretend. Picking the vehicle's details works without it." It confirms or updates the prototype's "Needs what AutoParts Co. doesn't have yet" and the rough effort.

### Design system and accessibility

Whether the prototype follows the design system and its accessibility standards, and anything that doesn't, including what Dana kept under "Departs from the design system" ([sparks-prototype.md](sparks-prototype.md), "Changing it"). How the screen-reader and keyboard scenarios went is here too.

### What it changes for teams

For each department the concept touches: what would change in their day. "Stores: fewer fit questions at the counter; associates need to know what 'We're not sure this fits' means."

### What only real people can tell us

What an AI evaluation can't answer well: whether customers trust the fit message, whether professional mechanics want it at all, whether associates use the counter view. Sparks lists them, with a suggested way to find out each. The list goes to Review, for the UX team ([sparks-review.md](sparks-review.md), "Who to invite").

## Fixing and running again

- ~~**"Fix this in the prototype"** opens Prototype with the suggested fix ready as a suggestion. Dana accepts it or changes it there, and comes back to Evaluate.~~ ~~✅ **Resolved:** **"Fix this in the prototype"** makes the change right away, in Evaluate, as a new version of the prototype (in its versions, as any change). The prototype shows where it changed, the finding's marker turns into a check, the finding says "Fixed in version {n} · run again to check it", and the card says "The prototype changed since this run". "Run again" stands out (dark) until she runs it. Why: the prototype is on screen, so going to Prototype to accept the change only moved her away from the results.~~
- ✅ **Resolved:** the button that runs the evaluation reads "Run" before and after a run, not "Run again". Why: the same button doing the same thing keeps one name; what's new since the last run shows in the results.
- ✅ **Resolved:** the buttons on a finding, "Fix in the prototype" and Try "{direction}", are outlined (Button Outlined), ~~dark~~. Why: they're one finding's actions, under the panel's dark buttons ("Run", "Add to Review"); a dark button on every finding competed with them.
- ✅ **Resolved:** **"Fix in the prototype"**, on a finding and on a scenario that ran into it, opens Prototype on the page where the finding happens. Sparks shows its plan first, with suggested follow-ups to pick from; nothing changes until she says so ([sparks-prototype.md](sparks-prototype.md), "Fixing a finding"). Why: a one-click fix left her no part in it; in Prototype she works the solution out with Sparks, in her own words.
- **Back in Evaluate after a fix,** its finding is in view, on both panels: the marker is a check, the finding and the scenario say "Fixed in version {n} · run again to check it", with **"Change the fix in the prototype"** to go on with it, and the card says "The prototype changed since this run". ~~"Run again" stands out (dark) until she runs it.~~ "Run again" is dark, as always.
- The button shows only once a run is finished: not while one is going, nor after one was stopped.
- Dana can also go back to the part of Plan a finding points to: the choice, if the direction doesn't hold; the success criteria, if a target turns out unrealistic. Sparks reopens that part in the conversation ([sparks.md](sparks.md), "Plan"). From Evaluate, "Go back to the choice" is under Sparks's read when it's "Needs another look".
- **~~"Run again"~~ "Run"**, after a run, runs the plan again on the current prototype version. Sparks shows what changed since the last run: "3 of 4 findings fixed. 'Doesn't fit' returns: now likely 40–55% fewer."
- Every run is kept, with the prototype version it evaluated.

## Go ahead or keep improving

~~When Dana has read the results, Sparks asks: "Do you want to take this to review, or keep improving it?", with "Go ahead to Review" and "Keep improving" as quick replies, right after its read and the evidence status~~ ✅ **Resolved:** there's no question to answer: "Add to Review", on the prototype's panel, is her go-ahead, and keeping on improving is fixing findings, or changing the prototype in Prototype, then "Run again".

- ~~**"Go ahead to Review"**~~ **"Add to Review"** records her go-ahead and the evidence status, with a note if she wants to add one, and continues. It can't be used while a run is going. It says why: "Wait for the evaluation to finish, or stop it."
- ~~**"Keep improving"** keeps her in Evaluate to fix and run again.~~
- **"Go back to the choice"** ~~comes first when~~ is a button under Sparks's read when Sparks's read is "Needs another look" because the direction is unlikely to reach the target on its own. ~~The question becomes "Do you want to go back to the choice, take this to review as it is, or keep improving it?"~~ The choice reopens in the conversation, with the four directions where they were ~~and the one she tried left out of the quick replies~~, picked again with a card's "Generate prototype" ([sparks-plan-compare.md](sparks-plan-compare.md), "Going back to the choice").

✅ **Resolved:** with a "Needs another look" read, "Go back to the choice" is the first answer offered; going ahead to Review as it is and keeping on improving stay open.

**Going ahead with open findings is allowed.** Any finding marked "Blocks" or "Hurts" that's still open, and any assumption not supported, is listed as a known issue for review. ~~Sparks says so once, at the top of what it says in Review: "Two findings are still open. They'll go to review as known issues."~~ Review shows them under Known issues, right after the summary and the gaps, and says they don't stop her ([sparks-review.md](sparks-review.md), "Review's screen").

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

Evaluate is Done when there's a complete run on the current prototype version and Dana has chosen ~~"Go ahead to Review"~~ "Add to Review".

- **The prototype changed since the last run:** ~~"Go ahead to Review" isn't available, and the section says why: "The prototype changed after the last run. Run it again to evaluate the current version."~~ "Add to Review" is disabled, and its tooltip says why: "The prototype changed after the last run. Run it again first."
- Selecting ~~"Go ahead to Review"~~ "Add to Review" marks Evaluate as Done and opens Review. With no run at all, it opens Review with Evaluate skipped ("Skipping Evaluate is allowed").

✅ **Resolved:** the go-ahead needs a run on the current prototype version, so the review never presents results for a prototype that no longer exists.

## States

| State | What shows | What Dana can do |
| --- | --- | --- |
| ~~Plan ready~~ | ~~The scenarios, tasks and checks~~ | ~~Add, change or remove scenarios and tasks; "Run the evaluation"~~ |
| Getting ready | ~~Progress in the conversation; a blank panel~~ The progress on the card; ~~the agents lined up beside the phone~~ ~~the agents floating around the phone~~ the first screen, no agents yet | Wait, stop it |
| Running | Progress by part; ~~an agent on the prototype~~ the agents working the screen in focus, the strip sliding through the journey, markers dropping as findings are found; results as they arrive | Read results so far, stop it |
| Stopped | The results so far, marked "Stopped before finishing" | Run again |
| Results ready | ~~What Sparks did and found;~~ Sparks's read, the evidence status, then each part of the results; markers on the prototype | Watch or step through scenarios, fix in the prototype, go back to Plan, decide |
| A run failed | "I couldn't finish the evaluation. Your prototype and earlier runs are unchanged." and "Try again" | Try again |
| A source can't be reached | The check that depends on it says "Couldn't check {source}" and its confidence drops | Run again later, go on |
| Prototype changed since the last run | "The prototype changed since this run…"; "Add to Review" disabled | Run again |
| Ready to continue | ~~Sparks's question and "Go ahead to Review"~~ "Add to Review" | Go ahead, keep improving |

## Checks

What Dana says → what Sparks must do:

| Dana | Sparks must |
| --- | --- |
| ~~Opens Evaluate~~ Says "Yes, evaluate it" | ~~Show the plan as scenarios, including screen-reader and keyboard scenarios, and run nothing until she starts it~~ Run scenarios, including screen-reader and keyboard ones, then say what it did and what it found |
| ~~"So customers will love it?"~~ | Say what the evaluation suggests, that it's an AI evaluation, and that how people feel is under "What only real people can tell us" |
| ~~"Add my neighbor as a test customer, she orders a lot."~~ | Explain that scenarios come from patterns, not real people, and offer a scenario like the one she describes |
| ~~"Give me the exact number of returns we'll save."~~ | Give the range, method and confidence, and explain why it can't be exact |
| ~~"Can I say it's validated?"~~ | Say the simulation supports the hypothesis, that it isn't validation with real people, and what real-user testing would confirm |
| Selects ~~"Fix this in the prototype"~~ "Fix in the prototype" | ~~Open Prototype with the fix ready as a suggestion~~ ~~Make the change as a new version, show it on the prototype,~~ Open Prototype on the finding's page, show a plan and follow-ups, and change nothing until she picks; then make the change as a new version and mark the finding "Fixed in version {n} · run again to check it" |
| Goes ahead with a finding marked "Blocks" still open | ~~Say once that it goes to review as a known issue, then~~ Let her continue, and list it under Known issues in Review |
| Changes the prototype, then tries to go ahead | ~~Ask her to run the evaluation again on the current version~~ Keep "Add to Review" disabled, saying why, until she runs it again |
| The hypothesis isn't supported | Show "Simulation does not support hypothesis" (or the method that applies), read "Needs another look", and name where to go back to in Plan |
| The estimate reaches the target for repeat customers only | Show "Inconclusive" and say for whom it holds |
| Engineering context says the platform lacks something | Say what's missing and what that does to the rough effort |

⚠️ The four questions struck through above were asked in Evaluate's conversation, which is gone; they stand until there's a place to ask ("Evaluate's screen", open question).

## Accessibility

- Progress is announced as each part finishes, not continuously.
- The agents on the prototype show what the progress already says; a marker is a button named for its finding ("Finding 1: The fit message sits below the price and is easy to miss").
- While an agent works on it, the prototype can't be focused or used (`inert`).
- Stepping through a scenario works from the keyboard, and each step's AI evaluation is readable as text.
- "Blocks", "Hurts" and "Minor", the evidence outcome and its method, and "Supported", "Not supported" and "Still unknown", are written out, never shown by color alone.

## Acceptance Criteria

- Given a finished prototype, when Dana says "Yes, evaluate it", then Sparks runs six to ten scenarios across audiences, including screen-reader and keyboard scenarios~~, and runs nothing until Dana selects "Run the evaluation"~~, ~~showing only its progress until it's done, then what it did and what it found~~ in Evaluate, with no conversation: ~~each scenario's agent works the prototype in turn~~ every agent (the scenarios and four experts) works the prototype at once, screen by screen, while the results come in beside it.
- Scenarios are described as situations; none is presented as a research participant or based on a real customer's or employee's record.
- Sparks's reasoning in a scenario is labeled "AI evaluation" and never written as a customer's words.
- The hypothesis shows an outcome (Supports, Inconclusive or Does not support) with its method, and "Simulation supports hypothesis" shows "Based on simulated scenarios. Real-user testing is recommended before implementation."
- Results from AI simulation alone never show high confidence; the word "validated" never appears for them.
- Every estimate of a measure is a range with its method, confidence and reasons, and says whether it reaches Dana's target.
- Every finding shows what could go wrong, where, how much it matters, its method, and a suggested fix when there is one.
- Every assumption from "To check in Evaluate" shows Supported, Not supported or Still unknown.
- ~~"Fix this in the prototype" opens Prototype with the fix as a suggestion~~ ~~"Fix this in the prototype" makes the change as a new version, in Evaluate~~ "Fix in the prototype" opens Prototype on the page where the finding happens, with Sparks's plan, and nothing changes before she agrees; "Run again" shows what changed since the last run.
- ~~"Go ahead to Review"~~ "Add to Review" is available only after a complete run on the current prototype version, or with no run at all (Evaluate skipped).
- Each finding that happens on a screen has a numbered marker on the prototype, and selecting either one shows the other.
- Given Evaluate is skipped, the evidence status is "Not tested" and Review lists it as a gap.
- Open findings marked "Blocks" or "Hurts", and unsupported assumptions, appear in review as known issues.

## Out of scope

- The workspace, step states, suggestions, Sparks's voice, evidence and decisions, and knowledge: [sparks.md](sparks.md).
- Building and changing the prototype: [sparks-prototype.md](sparks-prototype.md).
- Testing with real people, and bringing others in: [sparks-review.md](sparks-review.md).
- Comparing Evaluate's estimates with real outcomes after implementation: a future direction, with Pulse ([sparks.md](sparks.md), "Out of scope").
