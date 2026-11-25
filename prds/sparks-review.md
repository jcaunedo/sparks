<!--
Created: Nov 21, 2026
Created by: Julio Caunedo
Last updated: Nov 25, 2026
Latest update: Review also opens from its explanation, with "Add to Review", besides "Add to Review" in Evaluate and "Go to Review instead" in Prototype. The reviewers' page is laid out as Dana's Review: the idea and the prototype side by side.
Recent updates: Review has no conversation: the idea for review on the left, the final prototype on the right, and what the conversation did is the next step at the top of the idea. Known issues come right after Gaps. "Publish" shows in the header only on Review, and Sparks says when the teams see an earlier version. Only Dana publishes and asks for a decision, not a collaborator.
Scope: Review, the last of a Sparks concept's four steps (Plan, Prototype, Evaluate, Review), where it advances or not: the concept prepared for review, bringing in the UX team, engineering and the departments involved, Dana's recommendation, the decision owner's decision, and what happens after.
Purpose: defines how a concept enters AutoParts Co.'s product process instead of going around it: reviewed by the people who will shape it, decided by the person who owns the decision, and shared with the teams when it advances.
-->

# Review — Sparks

**Location:** the last of a Sparks concept's four steps. It opens when Dana selects ~~"Go ahead to Review"~~ "Add to Review" in Evaluate ([sparks-validate.md](sparks-validate.md), "Go ahead or keep improving"), or when she goes to Review after Prototype without running Evaluate ("Go to Review instead" in Prototype, or "Add to Review" on Review's explanation, [sparks.md](sparks.md), "Moving through the steps"), and whenever she selects Review in the steps once it's open. Reviewers and the decision owner reach it from their invitation.
**Audience:** Dana, who prepares the concept and recommends; the UX team, engineering and the departments she brings in to review it; the decision owner, who decides; the people she shares an advanced concept with.
**Description:** the step where Sparks prepares the concept for review, the right people review its feasibility and value, Dana recommends, and the decision owner decides whether it advances, iterates or stops.
**Status:** defined. Built as a reference layout from this PRD (not in Figma yet), from Dana's side, with the reviewers and the decision owner simulated: ~~"Go ahead to Review"~~ "Add to Review" in Evaluate (or "Go to Review instead", with Evaluate skipped) opens Review with the concept for review ~~beside the conversation~~ beside the final prototype, with no conversation (`ReviewPanel`, `ReviewNextStep`, `PrototypePanel`); Sparks lists what's open, suggests the departments, drafts the invitation; the reviewers' status and views come in; Sparks summarizes and proposes changes; it drafts her recommendation and the decision owner decides; she shares an advanced concept. "Share" shows in the header ~~from Review on~~ in every step, and opens the share popover ([sparks.md](sparks.md), "Sharing a concept"). Everything follows the chosen direction: the concept for review comes from "What we'll build" (the hypothesis, why this direction, the trade-off, the other directions) with that direction's user stories, prototype and evaluation; the departments Sparks suggests (the returns team for "Flag often-returned parts", the catalog team for the others), their views, Sparks's proposals, its recommendation and the decision differ by direction. After the reviews, Sparks can propose a change to the prototype for every direction (the fix the UX team asks for: the flag as a reminder, the fit checked in the cart, the vehicle filled in at the counter), and the reviews and user stories reflect the fixes already made. A decision to go back to the choice reopens it in Plan. Not built: the reviewers' and decision owner's side (commenting, "Unclear" flags, asking Sparks), answering comments one by one, withdrawing, Stop, "Sending failed", and new versions after the decision.

---

## Purpose

Dana has a concept she's explored and experimented with on her own. Review is where it enters AutoParts Co.'s product process: the UX team, engineering and the departments involved judge whether it's feasible and worth it, and the person who owns the decision decides whether it deserves execution.

Sparks doesn't replace that process; it feeds it ([sparks.md](sparks.md), "Purpose"). Dana brings a mature, evidence-backed idea and a recommendation; the person who owns the decision makes it.

It works when:

- reviewers' concerns are heard and answered before the decision;
- the decision owner can decide from the concept alone, without a meeting to explain it;
- the evidence is described honestly: what was tested, how, and what it showed;
- an advanced concept reaches the teams complete, with every decision's reason attached;
- a stopped concept leaves its learnings behind, so the next person with the same idea starts from them.

ℹ️ Related specs: the workspace, step states, suggestions, how Sparks talks, evidence and decisions, sharing, knowledge and the decision log are in [sparks.md](sparks.md). Every section of the concept, from Plan, Prototype and Evaluate, feeds the review.

## Review's screen

Review has no conversation, as Evaluate. Two panels of the same width sit side by side, close to what the teams will get:

- **The idea for review, on the left.** On top, where it stands ("Ready for review", "Published · version 3", "The reviews are in", "Waiting for a decision from…", "Advanced") and, once published, "See what the teams see". Below, on a card: what Sparks did to put it together, the next step, the reviewers once it's published, and the idea, part by part ("What's reviewed").
- **The final prototype, on the right:** the version it would be published at, for each audience and device, screen by screen, with everyone's comments. She tries it and comments; it's changed in Prototype.

**The next step** is a box at the top of the idea, one thing at a time:

1. **"Check it, then publish it":** what the teams get, that gaps and known issues don't stop her, and "Publish" in the header. With Evaluate skipped, "Evaluate it first".
2. **"The teams have it":** the version they see. If hers is newer, it says so and points to "Publish update".
3. **"The reviews are in":** what they say in one sentence, then by topic, and "What Sparks would change", with "Make the changes" and "Not now".
4. **"Ready to ask for a decision?":** what the changes did, if she made them, and "Draft my recommendation". She can leave it for later.
5. **"Your recommendation":** Sparks's draft, with a pen to change it, who it goes to, how much is still open, and "Submit it".
6. **"Sent to {decision owner}",** then the decision and its reason, with what follows: "Share it with them", "Evaluate it" or "Go back to the choice".

**"Publishing it"** is a part of the idea only she sees, before publishing, after Known issues: who reviews it and what each team evaluates, the invitation (with a pen to change it), who it goes to and that her conversation isn't included, and what they get (a fixed copy).

✅ **Resolved:** Review has no conversation; everything it said is in the idea or its next step, and the prototype is beside it. Why: the conversation repeated the idea next to it; Dana should see what the teams will get, the idea and the prototype, and check it before publishing.

⚠️ **Open question:** with no conversation in Review, there's no place to ask Sparks about the idea or to ask for a change in words there (Prototype's and Plan's conversations are where things change). The same as in Evaluate.

## What's reviewed

When Review opens, Sparks prepares the concept for review from the spec, and tells Dana what's in it and what still needs her attention. It uses both Sparks's plain words and the terms product teams use (the success criteria in Plan, [sparks-plan-define-success.md](sparks-plan-define-success.md)).

| Part | Holds | From |
| --- | --- | --- |
| Summary | One page: the problem, who it affects, the goal and main measure, the chosen direction and why, the hypothesis and its evidence status, the recommendation, the known issues and the gaps | Every step |
| Gaps | A skipped Evaluate, missing evidence and unresolved assumptions, each with what it means for the decision | Every step |
| Recommendation | Advance, iterate or stop, and why ("The recommendation") | This step |
| Known issues | Open findings marked "Blocks" or "Hurts", and assumptions not supported | Evaluate |
| What we believe (hypothesis) | The hypothesis and its evidence status: each method used and its outcome | The choice in Plan ([sparks-plan-compare.md](sparks-plan-compare.md)), [sparks-validate.md](sparks-validate.md) |
| What people need to do (user stories) | What each audience must be able to do, one item each: "As a customer buying online, I see whether a part fits my saved vehicle before I add it to the cart." | The chosen direction, the prototype |
| How to know it's done (acceptance criteria) | For each item, the observable results a tester checks: "Given a saved 2015 Ford F-150, when a part that doesn't fit opens, then the page says 'Doesn't fit your F-150' and shows parts that do." "Given a vehicle read from a VIN or an invoice, then I'm asked if it's mine before it's saved." | The prototype's screens and paths, Evaluate's findings |
| The prototype | The version current when she submits, or the other testable artifact, with "What's pretend" and "Sample data" | [sparks-prototype.md](sparks-prototype.md), "The Prototype section" |
| Success criteria | The goal, main measure, other measures, what must not get worse, with starting points and targets | The success criteria in Plan ([sparks-plan-define-success.md](sparks-plan-define-success.md)) |
| Why this direction | The chosen direction, why, the trade-offs accepted, what else was considered | The choice in Plan ([sparks-plan-compare.md](sparks-plan-compare.md)) |
| The evidence | The problem brief and the evaluation, each statement with its source or "Assumption", and each finding with its method | The problem brief (Plan, [sparks-plan-clarify.md](sparks-plan-clarify.md)), [sparks-validate.md](sparks-validate.md) |
| What it needs to be built | What AutoParts Co. doesn't have yet, what's available, and Sparks's rough effort, for engineering to confirm | Prototype, Evaluate's "Can AutoParts Co. build it" |
| Design notes | Anything that departs from the design system, and the accessibility results | Prototype, Evaluate |
| For the UX team to test with real people | "What only real people can tell us", with a suggested way to find out each | [sparks-validate.md](sparks-validate.md), "What only real people can tell us" |
| What it changes for teams | The change for each department | Evaluate |
| Decisions | The decision log | [sparks.md](sparks.md), "The decision log" |
| Open questions | Everything still undecided, from every step | Every step |
| What comes later | Parts left for later | The choice in Plan, Prototype |

Rules:

- **Nothing new.** Sparks restates and organizes what's in the spec; it doesn't add requirements nobody decided. When the spec doesn't answer something the teams will need, it goes under "Open questions", not into a guess.
- **Honest about evidence.** The summary states the evidence status in its first lines, with its method: "Simulation supports hypothesis. Based on simulated scenarios. Real-user testing is recommended before implementation." ([sparks.md](sparks.md), "Evidence and decisions").
- **Each statement keeps its label:** evidence with its source, from Dana, or "Assumption".
- **Gaps are visible, not hidden.** A skipped Evaluate shows in the summary as a gap ("Evaluate was skipped: the hypothesis is not tested").

ℹ️ **Paths:** with more than one path in the prototype ([sparks-prototype.md](sparks-prototype.md), "Paths"), one goes to Review: the path shown when she goes there. Sending another path later starts Review over for it. On Review, the prototype and evaluation shown are that path's. ⚠️ **Gap:** the other paths, as alternatives considered with their results, aren't shown in Review yet.

### Putting it together

Dana watches the idea for review being written. When Review opens, ~~Sparks says "**Now, let's put your idea together for review.** I'm writing it on the right, part by part, from what you decided, with nothing added.", and~~ Sparks's reply is its progress and nothing else, the panel is blank while it gets ready, and then the parts appear on the right one at a time, in the order of the table above:

✅ **Resolved:** Known issues comes right after Gaps, so everything still open is together, after the summary.

- **On the ~~right~~ left:** the parts written so far, each coming in as it's written, then the one being written, with its heading, "Writing…" and placeholder lines. ~~The badge says "Putting it together…" until the last part, then "Ready for review".~~ There's no badge until it's done, then "Ready for review". The view follows the newest part, unless she scrolls up to read one; once it's done, it goes back to the top, where the summary is.
- **~~In the conversation~~ At the top of the same panel:** Sparks's progress in place, as while it builds a prototype ([sparks-prototype.md](sparks-prototype.md), "Building it"): ~~"Writing "Gaps", 2 of 16 parts.",~~ a status for each stage ("Laying out the parts of your idea…", "Writing your idea for review…", "Giving it a final polish…") over the latest five steps ("Gathering what you decided in Plan", "Writing "Gaps"", "Drafting the invitation"), folding to ~~"Wrote all 16 parts."~~ "Put together in 18s", which opens to show every step.
- **Then** ~~Sparks's "**Here's your idea, ready for review.** It's all on the right.",~~ the same reply goes on (a new one, if she's said something since): how she got here ("Done. Evaluate is finished, and the evaluation is in your plan.") and "Your idea is ready for review.", "**Here's what I put together:**" (the idea, the evidence, what's for the teams), then "**Here's what's still open:**", who to invite and the invitation ("Checking it's ready", "Bringing others in"). Nothing can be sent before it's written. ✅ **Resolved:** with no conversation, what comes then is the next step, "Check it, then publish it", and "Publishing it" ("Review's screen").

✅ **Resolved:** the idea for review builds part by part, in real time, instead of appearing whole while Sparks thinks. Why: Dana sees what goes into it and that nothing is added, the way she watches the prototype being built.

✅ **Resolved:** Review works as Prototype and Evaluate do: progress first, a blank panel that fills in as it goes, then what was put together. Why: one way of working in every step; the text that came before said what Sparks was about to do.

## Checking it's ready

Before Dana brings anyone in, Sparks checks the concept and lists what's missing, most important first:

- **Plan or Prototype not Done.** The only things that block submitting for a decision: without Plan's success criteria there's nothing to decide against, and without a prototype (or other testable artifact) there's no concrete concept to decide on ([sparks.md](sparks.md), "Moving through the steps").
- **A skipped Evaluate,** and what it leaves out.
- **Missing evidence:** a hypothesis not tested, measures with no starting point.
- **Unresolved assumptions,** most important first.
- **Risks:** a known issue marked "Blocks", a must-not-get-worse at risk, a broken limit.
- **Gaps in the concept:** an item in "What people need to do" with no acceptance criteria, a screen no item covers, an open question that blocks building.

Each comes with a suggested fix and a recommendation: "The hypothesis hasn't been tested. Running Evaluate takes a few minutes and would make your recommendation stronger." Apart from Plan and Prototype, none of them stops Dana; anything she leaves is listed under "Gaps".

~~✅ **Resolved:** a prototype (or other testable artifact) is required before a concept is submitted for a decision, as are success criteria. Clarify and Evaluate stay optional.~~ ✅ **Resolved:** Plan, which includes the success criteria, and a prototype (or other testable artifact) are required before a concept is submitted for a decision. Evaluate stays optional.

## Bringing others in

### Who to invite

Sparks suggests departments to review the concept, each with what they'd evaluate:

- **The UX team, always:** the experience, the design notes, and what to test with real people.
- **Engineering, always:** whether it can be built as described, what's missing, and the effort.
- **The departments it touches,** from the brief's "Who's involved" and "What it changes for teams": the value for their area and what it changes in their work. "Stores: what changes on fit calls."

Dana chooses the departments and the people in them. Sparks never names or picks individuals (the problem brief in Plan, [sparks-plan-clarify.md](sparks-plan-clarify.md)).

### The invitation

Dana starts it from Sparks's suggestion ~~in the conversation~~ in "Publishing it", or from "Share" in the header. "Share" appears in the header ~~from Review on~~ (in every step, [sparks.md](sparks.md)), ~~and in Review opens the invitation~~ which opens the share popover; the invitation comes from Sparks ~~in the conversation~~ there; before Review it isn't shown ([sparks.md](sparks.md), "Sharing a concept").

Sparks drafts a short invitation Dana can edit: what the concept is, what she'd like from them, and by when.

> I've been working on a way to cut wrong-part returns. It's defined, prototyped and evaluated with AI scenarios, not yet with real customers. Could you review it by Friday? From engineering, I'd most like your view on the fit data.

Sparks shows who will receive it and whether her conversation with Sparks is included (it isn't unless she says so), and sends it only when Dana confirms (~~"Looks right, send it"~~ ~~"Looks right, publish it", or~~ "Publish" in the header; ~~"Not quite"~~ the pen to change it; with Evaluate skipped, also "Evaluate it first"): the invitation goes out with the published version ("Publishing") ([sparks.md](sparks.md), "Sharing a concept"). Reviewers are notified in AutoPartsHUB and by email.

### Publishing

The teams who review get a **fixed version** of the idea: what's in "Idea for review" and the clickable prototype at that version, to try and comment on. Dana keeps working on hers; they see what she published until she publishes an update.

- **"Publish"** is the last button in the header, after "Share", only on Review ([sparks.md](sparks.md), "Share and Publish"). Only Dana, the idea's owner, publishes and asks for a decision: someone she shared it with as "Can edit" (a collaborator) doesn't see "Publish", and Sparks doesn't offer them to ask for a decision ([sparks.md](sparks.md), "Sharing a concept"). ~~It's available once there's a prototype; before, it can't be selected and says why ("Build a prototype first: the teams get your idea and its prototype.").~~ Review opens only with a prototype, so there's always something to publish; while Sparks puts the idea together, it can't be selected and says why ("Putting your idea together…").
- **The first time,** ~~it opens Review:~~ when Review opens, Sparks writes the idea for review ("Putting it together"), then shows what's still open, the teams it would invite and the invitation, and what publishing gives them ("Publishing it"): "**Publishing gives them a fixed copy:** this idea and the prototype as it is now (version 3), to try and comment on. You keep working on yours; when you change it, publish an update. Asking for a decision comes later, when you're ready." She confirms with ~~"Looks right, publish it", or~~ "Publish". ~~Sparks: "Published. The teams now see version 3 of your idea and its prototype, and I've sent them the invitation."~~ The next step says "The teams have it".
- **Publishing before Evaluate is allowed.** The gap shows on what they see ("Gaps": "Evaluate was skipped: the hypothesis is not tested").
- **After changes,** the button reads "Publish update". Selecting it publishes the latest version to the same teams, with no new invitation~~: "Done. The teams now see version 4 of your idea and its prototype, and I've told them what changed."~~. They're told what changed; their feedback on the earlier version stays, marked with the version it was about. With nothing new to publish, it reads "Published" and can't be selected. Since the button shows only on Review, Sparks says so where she makes the change: the first time she changes the prototype after publishing, its reply in Prototype adds "The teams still see version 3. When you want them to see this one, publish an update in Review."
- **On the ~~right~~ left,** the badge says which version they see: "Published · version 3", and "See what the teams see" opens the page they open from the invitation, at that version, in its own tab ("What reviewers see and do").

✅ **Resolved:** "Publish" gives the teams who review a fixed version of the idea and its prototype, for feedback; asking for a decision is a separate, later step. It can be used before Evaluate. Why: reviewers need something that doesn't change under them while they read and try it, and Dana should be able to gather feedback, change the idea, and publish again before anyone decides.

✅ **Resolved:** "Publish" is in the header only on Review ([sparks.md](sparks.md), "Share and Publish").

✅ **Resolved:** the step keeps the name "Review", not "Idea". Why: "idea" already names the whole concept on screen ("New idea", "All ideas", its name in the header), and the steps are what Dana does; what she publishes is the "Idea for review".

### What reviewers see and do

- They open the concept and the prototype from their invitation, on the published idea's page: the version Dana published, never her working copy.
- **The page,** laid out as Dana's Review ("Review's screen"): the idea's name on the left of the header (no menu: it isn't theirs)~~, "Idea" and "Prototype" centered~~; "Comments", the version they see ("Version 3"), notifications and their avatar on the right. Below, the idea for review on the left and its prototype on the right:
  - **Their review,** in a box at the top of the idea, where Dana's Review has her next step:
    - **The invitation:** "Dana Morales asked you to review this idea", her words, the date she'd like it by, and which version this is: "Version 3, published 2 hr ago. Dana keeps working on hers; you see this version until she publishes an update."
    - **Their view:** "Advance", "Advance with changes" or "Don't advance yet", a sentence on why, and "Send your view"; once sent, it shows with "Change your view". The line above it says Dana asks for a decision once the teams have given theirs.
  - **The idea:** the same document as Dana's ("What's reviewed"), without "Publishing it" and her next step. Each part's heading has "Comment" (or how many comments it has): it opens the part's comments and a box to add one right under the heading, with "This part is unclear" (Enter adds it, Esc closes it).
  - **The prototype** at that version, with its audiences and devices, "Add comment" and everyone's pins with their threads ([sparks-prototype.md](sparks-prototype.md), "Commenting on it").
  - **"Comments"** opens the same side panel as Dana's, with everyone's comments, newest first and resolved ones last: who, their team, when, where ("On "Gaps"", or "On the prototype · Customer · Phone · "Save vehicle""), the text, "Unclear", replies and "Resolved". Selecting one opens it where it is: its part of the idea, brought to the top with its comments open, or its thread on the prototype.

  ~~✅ **Resolved:** reviewers get a page of their own for the published idea: their review on the left (the invitation, their view, every comment), and the idea and its prototype on the right, one at a time.~~ ✅ **Resolved:** reviewers get a page of their own for the published idea, laid out as Dana's Review: the idea and its prototype side by side, their review at the top of the idea, comments where they belong and in "Comments". Why: they come to read, try and react; what Dana checks before publishing is what they get, in the same place.

  ⚠️ **Gap:** asking Sparks about the concept isn't built on the page yet. Their comments on parts of the idea show in Dana's Comments panel, under "On the idea", each opening its part in Review ([sparks.md](sparks.md), "The concept workspace"). Answering or resolving a comment on a part isn't designed yet (comments on the prototype have threads).
- They give feedback: comment on any part or point at anything in the prototype, flag a part as "Unclear", or suggest an improvement ([sparks.md](sparks.md), "Feedback"). They can reply to each other.
- They can ask Sparks about the concept ("Why not 'Flag often-returned parts'?"); Sparks answers only from what's shared with them.
- When they've finished, they give their view: "Advance", "Advance with changes" or "Don't advance yet", with a sentence on why.
- They don't edit the spec or the prototype. The concept stays Dana's.
- They don't see her conversation with Sparks unless she included it, or her personal knowledge beyond what the concept quotes ([sparks.md](sparks.md), "Personal knowledge").

### Reviews coming back

- Dana sees each reviewer's status: invited, opened, commented, or their view.
- Sparks summarizes the reviews for her, grouped by topic, and says where reviewers disagree with each other: "The UX team wants the fit message above the price; the stores team is fine with it as is." "Engineering confirms saved vehicles; fit data for older vehicles would need the catalog team."
- For each topic and each "Unclear" flag, Sparks proposes a clarification or a change. Dana accepts, edits or dismisses it, or replies. Feedback never changes the concept or the prototype on its own. In the summary, Sparks lists its proposed changes together and asks once: "Make the changes" or "Not now" (sparks.md, "Sparks decides, Dana approves").

✅ **Resolved:** after the reviews, Sparks proposes its changes as one list with one question, not one decision per comment; ~~the recommendation follows in the same reply~~ then asks "**Ready to ask for a decision?**", with "Draft my recommendation" ~~and "Not yet"~~ (if the prototype changed, it first says the teams still see the earlier version, and to select "Publish update"). ~~"Not yet" leaves it for later: "Okay. Keep working on it, and publish updates as you go. When you're ready for a decision, tell me.", with "Ask for a decision".~~ It waits at the top of the idea until she does.
- Reviewers see when their feedback has been addressed, and how.
- An accepted change to the spec is made there. A change to the prototype is made in Prototype, and Evaluate becomes Needs a check ([sparks-prototype.md](sparks-prototype.md), "Finishing the step"); Sparks says so before she accepts.
- When engineering gives an effort, it replaces Sparks's rough effort, marked as from engineering.
- When the UX team tests with real people, Dana adds what they learned as evidence with the method "Real-user testing". The evidence status then shows both methods ([sparks.md](sparks.md), "Evidence status").

## The recommendation

When Dana asks for a decision ("Draft my recommendation", "Ask for a decision", or in her own words), not before, Sparks drafts a recommendation from what's known: the evidence status, Evaluate's findings, the reviewers' views, the effort, the known issues and the gaps. One of:

- **Advance:** the concept deserves further investment or execution. Says what the teams would do first, including any real-user testing still recommended.
- **Iterate:** it's promising, but something needs another pass first. Names where to go back to (a step, or a part of Plan such as the choice) and what to change.
- **Stop:** it isn't worth pursuing now. Says why and what was learned.

> I'd recommend advancing, with real-user testing first. The simulation supports the hypothesis: "doesn't fit" returns are likely to drop 35–50%, against a target of 40%. That's based on simulated scenarios, so the UX team's test of the fit message with real customers should come before the build. Engineering and the stores support it.

- The recommendation is Dana's. She edits it, or writes her own, and it's recorded as hers.
- It always states the evidence status separately from what it recommends. Recommending Advance doesn't claim the hypothesis is proven.
- If her recommendation goes against the evidence (advancing with a hypothesis the evidence doesn't support), Sparks says so once ([sparks.md](sparks.md), "When the data and Dana disagree").

**Stop is a good outcome.** Sparks never presents it as a failure: an idea that isn't pursued, stopped before anything was built, saves AutoParts Co. the cost of building it, and its learnings stay ("After the decision").

## The decision

1. ~~Dana selects "Submit for a decision".~~ Sparks shows the recommendation it drafted, who it goes to (the product lead for the area the concept belongs to) and what's still open, ~~and asks: "Looks right, submit it" or "Not quite" (to say it in her words)~~ with "Submit it" and a pen to say it in her words. Dana confirms or picks another person with that role.

✅ **Resolved:** submitting is the answer to Sparks's recommendation, not a separate "Submit for a decision" button: the recommendation, the decision owner and what's open come in one reply.
2. Sparks shows what will be sent (the concept, the reviews and her recommendation) and anything still open: reviewers who haven't given their view, comments she hasn't answered, known issues, gaps. Only Plan or Prototype not being Done blocks her.
3. She confirms. The concept shows "Waiting for a decision" (Sparks says "The idea shows…"). The decision owner is notified in AutoPartsHUB and by email.
4. The decision owner reads the concept, the reviews and the recommendation, and decides **Advance**, **Iterate** or **Stop**, with a sentence on why. They can ask Dana questions in comments, or ask Sparks about the concept, before deciding.
5. Dana is told the decision and the reason. It's recorded in "Decisions" ([sparks.md](sparks.md), "The decision log").

While waiting, Dana can withdraw her recommendation to change something; she then submits again.

✅ **Resolved:** the decision owner is the area's product lead: the person who owns product investment decisions for the area. Dana can be her own decision owner only where she holds that role.

What follows each decision:

| Decision | What happens | The concept shows |
| --- | --- | --- |
| Advance | The concept stays in Sparks, ready for Dana to share, without edit rights, with the people, teams or departments who'll carry it forward, or the whole company ([sparks.md](sparks.md), "Sharing a concept"). Sparks suggests who, starting with the reviewers' departments. Review is marked Done | "Advanced", with the date, next to the evidence status |
| Iterate | The concept goes back to the step, or the part of Plan, the decision names, with the decision's reason as Sparks's first message there. What comes after it becomes Needs a check | The step it's on |
| Stop | The concept is closed, with its reasons and learnings documented. Review is marked Done | "Stopped", with the date, next to the evidence status |

✅ **Resolved:** Iterate back to the choice ends with "Go back to the choice": the choice reopens in Plan, the decision's reason first in Decisions, and the prototype and evaluation of the direction she tried stay in the concept. Picking another direction builds its prototype from version 1, and Evaluate and Review start again for it.

✅ **Resolved:** an advanced concept stays in Sparks as a shareable concept that viewers can't change. There's no export and no work tracker integration: the teams explore the prototype and read the problem, success criteria, decisions and spec in Sparks.

## After the decision

- **What was decided is kept as it was.** The decision applies to the version that was submitted; the reviewers' and decision owner's view of it doesn't change under them.
- **Learnings stay.** When a concept is advanced or stopped, its learnings are added to Previous experiments in company knowledge: the problem, the hypothesis, the evidence status and its method, the decision and why, and what was learned. Not the conversation, and nothing from Dana's personal knowledge: a statement based on it is listed as "Based on the owner's own material", without its content. Sparks then shows it to the next person with a similar idea ([sparks-plan-problem.md](sparks-plan-problem.md), "What AutoParts Co. already knows").
- **Company knowledge stays governed.** Learnings added this way follow company knowledge governance: people whose role includes managing company knowledge can review, correct or remove them ([sparks.md](sparks.md), "Company knowledge").
- **An advanced concept can keep evolving.** People she shares it with, such as her developers, can give feedback the same way reviewers do, including flagging anything unclear; Sparks proposes a fix, and Dana decides ([sparks.md](sparks.md), "Feedback"). Changes go into a new version, and people she shared it with see what changed since the version they first saw.

~~✅ **Resolved:** a stopped concept's learnings go into Previous experiments, so the company keeps what it learned and doesn't pay to learn it twice.~~ ✅ **Resolved:** the learnings of every decided concept, advanced or stopped, go into Previous experiments, without anything from the owner's personal knowledge, and under company knowledge governance. The company keeps what it learned and doesn't pay to learn it twice.

## Who can do what

| Capability | Dana | Reviewers | Decision owner | People it's shared with after it advances |
| --- | --- | --- | --- | --- |
| See the concept and the prototype | ✓ | ✓ | ✓ | ✓ |
| See the conversation with Sparks | ✓ | If Dana included it | If Dana included it | If Dana included it |
| Ask Sparks about the concept | ✓ | ✓ | ✓ | ✓ |
| Comment, flag as unclear, suggest an improvement | ✓ | ✓ | ✓ | ✓ |
| Accept, edit or dismiss Sparks's proposed fixes | ✓ | — | — | — |
| Give a view (Advance, Advance with changes, Don't advance yet) | — | ✓ | — | — |
| Change the spec or the prototype | ✓ | — | — | — |
| Invite reviewers, share the concept | ✓ | — | — | — |
| Recommend and submit for a decision | ✓ | — | — | — |
| Decide advance, iterate or stop | — | — | ✓ | — |

## The Review section

What the step adds to the spec:

| Part | Holds | Needed to finish |
| --- | --- | --- |
| The concept for review | Every part in "What's reviewed" | Yes (Sparks prepares it) |
| Reviewers | Each department and person invited, their status and their view | No |
| Comments and answers | Every comment, Sparks's summary, and Dana's answer | No |
| Recommendation | Dana's recommendation and why | Yes |
| Decision | The decision owner, the decision, why, and when | Yes |

~~How it shows, as built ("The review" in the Concept panel, under "Review"):~~

- ~~It appears once Review opens.~~
- ~~**The concept for review,** in short: where it stands (Ready for review, In review, Waiting for a decision, Advanced), its evidence status, and how many known issues and gaps are listed for the reviewers, with "Put together from the sections above, with nothing added." "See it" opens the full concept for review beside the conversation; the panel doesn't repeat it.~~
- ~~**Reviewers:** the same list as beside the conversation: each department's status or view, what it evaluates, and why. "Not sent to anyone yet." before the invitation goes.~~
- ~~**Your recommendation:** her recommendation once drafted, marked "Drafted, not sent yet." or "Sent with the idea and the reviews."~~
- ~~**Decision:** "Advanced", "Back to Evaluate" or "Back to the choice in Plan", by whom and when, with the reason; "Waiting for {decision owner}." while it's with them.~~

~~✅ **Resolved:** the Review section sums up the concept for review instead of repeating it, since every part of it is already in the sections above.~~

How it shows in the plan, as built ("Where it stands" → Review, once Review opens): "Ready for review.", "In review: 2 of 4 views in.", "Waiting for a decision.", or the decision ("Advanced, by {decision owner}, {date}.", "Back to Evaluate…", "Back to the choice in Plan…"); "Open" goes to Review, where the idea for review, the reviewers and her recommendation are. The decision and the reviewers' views are also in "Decisions".

✅ **Resolved:** the plan no longer has a Review section~~; it has one line on where Review stands, with "Open"~~ (and no "Where it stands": Plan stays the conversation, [sparks.md](sparks.md), "The finished plan"). Why: the idea for review has its own panel in Review, and the plan keeps the spec ([sparks.md](sparks.md), "The finished plan").

⚠️ **Gap:** "Comments and answers" isn't built, since reviewers' comments aren't built.

## States

| State | What shows | What Dana can do |
| --- | --- | --- |
| Preparing | ~~What Sparks is putting together~~ The parts written so far, the one being written ("Writing…"), ~~"Putting it together…",~~ and Sparks's progress ~~in the conversation~~ at the top ("Writing "Gaps"") | Wait, read what's written, stop it |
| Ready for review | The concept for review, and the readiness list | Fix items, invite reviewers |
| Plan or Prototype not done | "Finish your plan and build a prototype before submitting for a decision", with a link to what's missing | Go to the missing step; invite reviewers meanwhile |
| Published | "Published · version 3" on the ~~right~~ left; "Published" in the header, not selectable | Keep working; read the teams' feedback; ask for a decision |
| Update to publish | "Publish update" in the header, after a change since the version they see | Publish the update |
| Invitation drafted | The invitation, who will receive it, and whether the conversation is included | Edit it, send it, cancel |
| In review | Each reviewer's status and view; comments as they arrive | Read, answer, change the concept |
| Reviews summarized | Topics, disagreements and suggested responses | Accept, reply, decline |
| Recommendation drafted | Sparks's draft: advance, iterate or stop, why, and the evidence status | Edit it, write her own |
| Waiting for a decision | "Waiting for a decision", with the decision owner's name | Answer their questions, withdraw |
| Advanced | "Advanced" with the date, the decision's reason and the evidence status; Sparks's suggestion of who to share it with | Share it, keep working on a new version |
| Back to iterate | The step or part of Plan the decision named, with its reason | Make the changes, submit again |
| Stopped | "Stopped" with the date, the reasons and the learnings | Read it |
| Sending failed | "That wasn't sent. Nothing changed." and "Try again" | Try again |

## Checks

What Dana says → what Sparks must do:

| Dana | Sparks must |
| --- | --- |
| Opens Review | Prepare the concept from the spec, adding nothing nobody decided, and list gaps, missing evidence, unresolved assumptions and risks |
| Opens it with Evaluate skipped | Show "Not tested" as the evidence status, list it as a gap, and recommend running Evaluate without blocking her |
| Tries to submit before Plan is done or without a prototype | Say what's needed for a decision and take her to the missing step |
| ~~"Who should review this?"~~ Opens "Publishing it" | Suggest the UX team, engineering and the departments the concept changes, each with what they'd evaluate, and no individual names |
| ~~"Send it to the stores team."~~ | Draft the invitation, show who receives it and that the conversation isn't included, and wait for her confirmation |
| Reviewers disagree with each other | Say so in the summary, with both views, and let Dana decide |
| ~~"Just approve it so we can build it."~~ | Say the decision belongs to the decision owner, and offer to prepare her recommendation |
| ~~"Write that it's validated."~~ | Explain that the simulation supports the hypothesis but isn't validation with real people, and keep the evidence status as it is |
| Recommends advancing when the evidence doesn't support the hypothesis | Say so once, with the evidence, and keep her recommendation as hers |
| The decision is Stop | Record the reasons and learnings, tell Dana what was kept and where, without treating it as a failure |
| The decision is Advance | Suggest who to share it with, starting with the reviewers' departments, and share only when she confirms |
| A requirement the teams need that the spec doesn't answer | List it under "Open questions" instead of filling it in |

⚠️ The questions struck through above were asked in Review's conversation, which is gone; they stand until there's a place to ask ("Review's screen", open question).

## Accessibility

- The next step is announced when it changes; when the button she used goes with it, focus moves to the new step.
- The concept for review has one heading per part, in the order of "What's reviewed", so it can be navigated by headings.
- Comments on the prototype are listed in reading order as well as shown on the screen, so they can be reached without pointing.
- Reviewers' views, the evidence status and the decision are written out, never shown by color alone.

## Acceptance Criteria

- Given Evaluate is Done or skipped, when Review opens, then Sparks prepares every part of "What's reviewed" from the spec, and nothing in it is a requirement the spec doesn't contain.
- The parts appear one at a time on the ~~right~~ left as they're written, with Sparks's progress ~~in the conversation~~ at the top; ~~"Here's your idea, ready for review"~~ ~~"Here's what I put together"~~ "Check it, then publish it" comes only once ~~the last part is written~~ every step is done.
- The summary states the evidence status with its method in its first lines, and lists every gap, including a skipped Evaluate.
- "Submit for a decision" isn't available until Plan and Prototype are Done; no other gap blocks it.
- "Publish" ~~can't be selected before there's a prototype, and says why;~~ shows only on Review, and can't be selected while the idea is put together; it gives the teams a fixed version of the idea and its prototype, at the version shown, and publishes only when Dana confirms.
- After a change, "Publish update" publishes the latest version to the same teams; their feedback on the earlier one stays, marked with its version.
- Publishing doesn't ask for a decision: Sparks drafts the recommendation only when Dana asks for one.
- Sparks suggests the UX team and engineering always, plus the departments the concept touches, each with what they'd evaluate, and never names a person.
- "Share" shows in the header ~~only from Review on~~ in every step, ~~and in Review opens the invitation~~ and opens the share popover ([sparks.md](sparks.md), "Sharing a concept"); the invitation is Sparks's draft, in "Publishing it".
- Review shows no conversation and no message box: the idea for review and the final prototype, side by side; the prototype can be tried and commented on there, not changed.
- The teams never see the next step or "Publishing it".
- No invitation, submission or share happens without Dana's confirmation of who gets what; the conversation is included only if she says so.
- Reviewers can view, comment, flag a part as unclear, suggest improvements, ask Sparks and give their view, and can't edit the spec or the prototype.
- Each "Unclear" flag gets a fix proposed by Sparks; nothing changes until Dana accepts it, and the person who flagged it sees when it's addressed.
- Sparks's summary of reviews groups them by topic and shows where reviewers disagree.
- Accepting a change to the prototype marks Evaluate as Needs a check.
- The recommendation states the evidence status separately from advance, iterate or stop; the recommendation recorded is Dana's.
- Sparks suggests the area's product lead as decision owner; only the decision owner can record Advance, Iterate or Stop, and the decision needs a reason.
- Advance keeps the concept in Sparks, shows "Advanced" with the evidence status, and lets Dana share it without edit rights; Iterate reopens the named step or part of Plan; Stop shows "Stopped" with its reasons.
- Advanced and stopped concepts add their learnings to Previous experiments, with nothing from Dana's personal knowledge.
- The recommendation and the decision appear in "Decisions" without anyone writing anything for the log.

## Out of scope

- The workspace, step states, suggestions, Sparks's voice, evidence and decisions, sharing, knowledge and the decision log: [sparks.md](sparks.md).
- How each part of the concept was decided: the PRD of the step that owns it, linked in "What's reviewed".
- Building the advanced concept: the teams' own process.
- Measuring outcomes after implementation: Pulse ([sparks.md](sparks.md), "Out of scope").
