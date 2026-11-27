<!--
Created: Nov 21, 2026
Created by: Julio Caunedo
Last updated: Nov 26, 2026
Latest update: the next step at the top of "Reviews" has no box around it, a line under it before "Reviewers"; the Summary ends with the evidence's outcomes, one per line, a green check before each that supports the hypothesis. Also today: the panel has no status badge; a new part, "For engineering to check"; "The evidence" ends with its sources; "Jump to a section" in the panel's header. Why: inside the card, a bordered box was a box in a box; the outcomes read as the summary's conclusion.
Recent updates: before publishing, the idea's card starts with its summary (no alert, no "Put together in 18s"); the header's badge says "Ready to publish". With several paths, the idea's name in Review is a "Paths" menu and publishing shares every path; once published, the idea panel has two tabs, "Idea" and "Reviews".
Scope: Review, the last of a Sparks concept's four steps (Plan, Prototype, Evaluate, Review), where it advances or not: the concept prepared for review, bringing in the UX team, engineering and the departments involved, Dana's recommendation, the decision owner's decision, and what happens after.
Purpose: defines how a concept enters AutoParts Co.'s product process instead of going around it: reviewed by the people who will shape it, decided by the person who owns the decision, and shared with the teams when it advances.
-->

# Review — Sparks

**Location:** the last of a Sparks concept's four steps. It opens when Dana selects ~~"Go ahead to Review"~~ "Add to Review" in Evaluate ([sparks-validate.md](sparks-validate.md), "Go ahead or keep improving"), or when she goes to Review after Prototype without running Evaluate ("Go to Review instead" in Prototype, or "Add to Review" on Review's explanation, [sparks.md](sparks.md), "Moving through the steps"), and whenever she selects Review in the steps once it's open. Reviewers and the decision owner reach it from their invitation.
**Audience:** Dana, who prepares the concept and recommends; the UX team, engineering and the departments she brings in to review it; the decision owner, who decides; the people she shares an advanced concept with.
**Description:** the step where Sparks prepares the concept for review, the right people review its feasibility and value, Dana recommends, and the decision owner decides whether it advances, iterates or stops.
**Status:** defined. Built as a reference layout from this PRD (not in Figma yet), from Dana's side, with the reviewers and the decision owner simulated: ~~"Go ahead to Review"~~ "Add to Review" in Evaluate (or "Go to Review instead", with Evaluate skipped) opens Review with the concept for review ~~beside the conversation~~ beside the final prototype, with no conversation (`ReviewPanel`, `ReviewNextStep`, `PrototypePanel`); Sparks lists what's open, suggests the departments, drafts the invitation; the reviewers' status and views come in; Sparks summarizes and proposes changes; it drafts her recommendation and the decision owner decides; Sparks checks it's ready to build, and she shares the advanced concept with her product team and the reviewers' departments; the team who builds it opens it on what to build (`PublishedIdea` with `advanced`, story "Advanced", Jordan from her product team). "Share" shows in the header ~~from Review on~~ in every step, and opens the share popover ([sparks.md](sparks.md), "Sharing a concept"). Everything follows the chosen direction: the concept for review comes from "What we'll build" (the hypothesis, why this direction, the trade-off, the other directions) with that direction's user stories, prototype and evaluation; the departments Sparks suggests (the returns team for "Flag often-returned parts", the catalog team for the others), their views, Sparks's proposals, its recommendation and the decision differ by direction. After the reviews, Sparks can propose a change to the prototype for every direction (the fix the UX team asks for: the flag as a reminder, the fit checked in the cart, the vehicle filled in at the counter), and the reviews and user stories reflect the fixes already made. A decision to go back to the choice reopens it in Plan. Not built: the reviewers' and decision owner's side (commenting, "Unclear" flags, asking Sparks), answering comments one by one, withdrawing, Stop, "Sending failed", and new versions after the decision. Simulated: a few seconds after she shares it, Jordan flags an acceptance criterion as unclear, and Sparks's fix shows in the next step (story "Unclear addressed" shows his side once it's made).

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

- **The idea for review, on the left,** headed with its name (the direction she chose, "Fit check before you buy"; ~~"Idea for review"~~). With more than one path built, the name is a menu, "Paths", the same as the prototype's title in Prototype: choosing another path opens Review on it, the idea for that path on the left and its prototype on the right. Each path keeps its own review: one already in Review opens as it was; another is put together (Evaluate skipped if it has no finished run). ~~✅ **Resolved:** before it's published, its status reads "Ready to publish", not "Ready for review".~~ ~~✅ **Resolved:** before it's published, there's no status badge: an info alert at the top of the idea's card, 24px above the summary, says "Your idea is ready to publish." with "Publish now", which opens "Publish your idea" (the same as "Publish" in the header). Why: it says what to do next and gives the way to do it, where she's reading.~~ ✅ **Resolved:** before it's published, the panel has no status badge and no alert: the badge after the idea's name in the header says "Ready to publish" ([sparks.md](sparks.md), "Where an idea stands"), and "Publish" is beside it. Why: the header already says where it stands and what to do; the card starts with the idea. Why: it names the next step, "Publish" in the header, and doesn't read like "In review", the start page's label once the teams have it. Evaluate's "Ready for review" (its read of a run) stays: there, Review is the next step. ~~On top, where it stands (~~"Ready for review"~~ ~~"Ready to publish"~~, "Published · version 3", "The reviews are in", "Waiting for a decision from…", "Advanced") ~~and, once published, "See what the teams see"~~.~~ No status on the panel: where the idea stands is the badge after its name in the header ([sparks.md](sparks.md), "Where an idea stands"); what the teams have done shows in "Reviews". ✅ **Resolved:** the panel has no status badge ("Published · version 3", "The reviews are in", "Waiting for a decision from…", "Advanced · Nov 24"), on Dana's Review and the reviewers' page. Why: the header's badge already says where the idea stands; two badges saying it twice, a few lines apart, was noise. Below, on a card: ~~what Sparks did to put it together, the next step, the reviewers once it's published, and the idea, part by part ("What's reviewed")~~ ~~what Sparks did to put it together, then~~ the idea, part by part ("What's reviewed"), with Sparks's progress above it only while it's being put together. On the right of the panel's header, after where it stands, **"Jump to a section"** (a menu icon, with its tooltip) lists the idea's parts as they are on the page, the recommendation once she's sent it; choosing one scrolls the card to it, at its top (from "Reviews", back to "Idea" first). Not while it's being put together. The reviewers' page has the same menu. ✅ **Resolved:** the idea's parts can be reached from a menu in the panel's header. Why: the idea is long (17 parts), and the reviewers and Dana go back to a part again and again. Once it's published, two tabs over the card: **"Idea"** (the idea, starting with its summary) and **"Reviews"**: the next step ("The teams have it", "The reviews are in" with what Sparks would change, "Ready to ask for a decision?"…) and the reviewers with their views. "Reviews" shows a dot while something there is new since she last looked; it doesn't open by itself. Opening a comment on a part of the idea goes to "Idea". Before publishing there are no tabs.

  ✅ **Resolved:** the next step and the reviewers are in a "Reviews" tab, not on top of the idea. Why: the idea reads as the teams get it, starting with its summary, and the reviews have their own place, with "Make the changes" next to them.
- **The final prototype, on the right,** titled with its version, the versions menu as in Prototype ("Version 2", with a chevron), and under it when it was published ("Published Nov 26, 2026, 2:40 PM"; with a newer version since, "Version 1 published …"; before publishing, "Not published yet"). The version it would be published at, for each audience and device, screen by screen, with everyone's comments. She tries it and comments; it's changed in Prototype.

**Comments on the idea** work exactly as on the prototype ([sparks-prototype.md](sparks-prototype.md), "Commenting on it"), for Dana and for the teams:

- **With "Add comment" on** ~~in the Comments panel~~ ~~(the icon in the idea's header, "Idea for review", on Dana's page and the reviewers'; separate from the prototype's)~~ (the one on the prototype's toolbar, on Dana's page and the reviewers': it turns commenting on for the idea and the prototype together; the idea's header has none), a click on the idea drops a pin there (her avatar) and opens the same box to write the comment, with "@" to tag people and teams. The pin is on the part she clicked and moves with it.
- **Selecting text** in the idea shows "Add comment" above the selection, with no mode to turn on: it starts the same comment, pinned where "Add comment" showed, above where the selection starts, so the button becomes the pin, with the text quoted above it, in the thread and in Comments. While its thread is open (from its pin or from Comments), or while she writes it, the text is highlighted in the idea, as with a marker pen.
- **Each pin opens its thread:** the comment, its replies and a box to reply, "Mark as resolved" (its pin leaves the idea) or "Reopen", and "Delete comment" on her own.
- **In Comments,** under "On the idea", with the part ("On "Gaps"") and the quote; selecting one opens its thread on the idea.

~~**Comments on the idea.** With "Add comment" on in the Comments panel, selecting a part of the idea opens its comments and a box to add one under its heading, with "This part is unclear".~~ ~~Each part's heading has "Comment" (or how many comments it has).~~ No "Comment" on the parts' headings.

⚠️ **Gap:** the comment box has no "This part is unclear" yet, so new comments can't flag a part as unclear; the sample flags ("Unclear" in Comments) still show. 🙋 **Open question:** add "Unclear" to the comment box on the idea, as an option the prototype's box doesn't have?

✅ **Resolved:** comments on the idea are the prototype's comments, pinned on the idea: the same "Add comment", pin, box, thread, replies and resolving, on Dana's page and the teams'; selected text starts one too, quoted. Why: one way to comment wherever she is, and the idea reads clean, with no "Comment" on every heading.

**The next step** is ~~a box at the top of the idea~~ at the top of "Reviews", with no box around it (a line under it, as between the idea's parts), one thing at a time:

1. ~~**"Check it, then publish it":** what the teams get, that gaps and known issues don't stop her, and "Publish" in the header, which shows what's shared and who it goes to before it goes.~~ **Before publishing, no box:** the idea starts with its summary; "Share" and "Publish" in the header are the next step. ~~With Evaluate skipped, "Evaluate it first".~~

   ✅ **Resolved:** no "Check it, then publish it" box before publishing, even with Evaluate skipped (no "Evaluate it first" here). Why: it repeated what Share and Publish in the header already say, and pushed the idea down.
2. **"The teams have it":** the version they see. If hers is newer, it says so and points to "Publish update".
3. **"The reviews are in":** what they say in one sentence, then by topic, and "What Sparks would change", with "Make the changes" and "Not now".
4. **"Ready to ask for a decision?":** what the changes did, if she made them, and "Draft my recommendation". She can leave it for later.
5. **"Your recommendation":** Sparks's draft, with a pen to change it, who it goes to, how much is still open, and "Submit it".
6. **"Sent to {decision owner}",** then the decision and its reason, with what follows: "Share it with them", "Evaluate it" or "Go back to the choice".

~~**"Publishing it"** is a part of the idea only she sees, before publishing, after Known issues: who reviews it and what each team evaluates, the invitation (with a pen to change it), who it goes to and that her conversation isn't included, and what they get (a fixed copy).~~ **"Publish" opens "Publish your idea",** a popover from the header, before it goes: ~~who reviews it and what each team evaluates,~~ the invitation (with a pen to change it), who it goes to (who she added with "Share") and that her conversation isn't included, and what they get (a fixed copy), then "Cancel" and "Publish". She makes any change there, at the moment she publishes. With no one added yet, it says so ("No one to send it to yet: add who reviews it with "Share"") and "Publish" can't be selected.

✅ **Resolved:** ~~who reviews it and~~ the invitation is in a popover from "Publish", not a part of the idea; who reviews it is chosen in "Share" ("Who to invite"). Why: they're settings for publishing, so they belong where she publishes; the idea for review stays exactly what the teams get.

✅ **Resolved:** Review has no conversation; everything it said is in the idea or its next step, and the prototype is beside it. Why: the conversation repeated the idea next to it; Dana should see what the teams will get, the idea and the prototype, and check it before publishing.

⚠️ **Open question:** with no conversation in Review, there's no place to ask Sparks about the idea or to ask for a change in words there (Prototype's and Plan's conversations are where things change). The same as in Evaluate.

## What's reviewed

When Review opens, Sparks prepares the concept for review from the spec, and tells Dana what's in it and what still needs her attention. It uses both Sparks's plain words and the terms product teams use (the success criteria in Plan, [sparks-plan-define-success.md](sparks-plan-define-success.md)).

| Part | Holds | From |
| --- | --- | --- |
| Summary | One page: the problem, who it affects, the goal and main measure, the chosen direction and why, the hypothesis and its evidence status, the recommendation, the known issues and the gaps; at its end, the evidence's outcomes, one per method and one per line ("Business data supports hypothesis", "Simulation supports hypothesis"), each that supports the hypothesis after a green check | Every step |
| Gaps | A skipped Evaluate, missing evidence and unresolved assumptions, each with what it means for the decision | Every step |
| Recommendation | Advance, iterate or stop, and why ("The recommendation") | This step |
| Known issues | Open findings marked "Blocks" or "Hurts", and assumptions not supported | Evaluate |
| What we believe (hypothesis) | The hypothesis and its evidence status: each method used and its outcome | The choice in Plan ([sparks-plan-compare.md](sparks-plan-compare.md)), [sparks-validate.md](sparks-validate.md) |
| What people need to do (user stories) | What each audience must be able to do, one item each: "As a customer buying online, I see whether a part fits my saved vehicle before I add it to the cart." | The chosen direction, the prototype |
| How to know it's done (acceptance criteria) | For each item, the observable results a tester checks: "Given a saved 2015 Ford F-150, when a part that doesn't fit opens, then the page says 'Doesn't fit your F-150' and shows parts that do." "Given a vehicle read from a VIN or an invoice, then I'm asked if it's mine before it's saved." | The prototype's screens and paths, Evaluate's findings |
| The prototype | The version current when she submits, or the other testable artifact, with "What's pretend" and "Sample data" | [sparks-prototype.md](sparks-prototype.md), "The Prototype section" |
| Success criteria | The goal, main measure, other measures, what must not get worse, with starting points and targets | The success criteria in Plan ([sparks-plan-define-success.md](sparks-plan-define-success.md)) |
| Why this direction | The chosen direction, why, the trade-offs accepted, what else was considered | The choice in Plan ([sparks-plan-compare.md](sparks-plan-compare.md)) |
| The evidence | The problem brief and the evaluation, each statement with its source or "Assumption", and each finding with its method; under them, one muted line with each source once ("From business performance, previous experiments, Dana, AI simulation and business data analysis.", as Plan's summaries) | The problem brief (Plan, [sparks-plan-clarify.md](sparks-plan-clarify.md)), [sparks-validate.md](sparks-validate.md) |
| What it needs to be built | What AutoParts Co. doesn't have yet, what's available, and Sparks's rough effort, for engineering to confirm | Prototype, Evaluate's "Can AutoParts Co. build it" |
| For engineering to check | What Sparks couldn't settle about building it (speed, systems, data), each with a way to check it: "Can every product page ask the catalog whether a part fits the saved vehicle without slowing the page down? How: a load test with a busy day's traffic." | Evaluate's "Can AutoParts Co. build it", the prototype's "What the real thing would need" |
| What to track | What the build must record so the success criteria can be measured once it's live: the main measure, what must not get worse, and measures with no starting point yet (recording starts before launch). "Every online return marked "doesn't fit", with its order, from launch." | The success criteria in Plan ([sparks-plan-define-success.md](sparks-plan-define-success.md)) |
| Design notes | Anything that departs from the design system, and the accessibility results | Prototype, Evaluate |
| For the UX team to test with real people | "What only real people can tell us", with a suggested way to find out each | [sparks-validate.md](sparks-validate.md), "What only real people can tell us" |
| What it changes for teams | The change for each department | Evaluate |
| Decisions | The decision log | [sparks.md](sparks.md), "The decision log" |
| Open questions | Everything still undecided, from every step | Every step |
| What comes later | Parts left for later | The choice in Plan, Prototype |

✅ **Resolved:** the idea has a part for engineering, "For engineering to check", right after "What it needs to be built", as "For the UX team to test with real people" is the UX team's: questions, each with how to check it, never a guess at the answer. Engineering's reviewers start there; the team who builds it reads it after what it needs (`buildPartTitles`). Why: engineering's part of the review is whether it can be built as described, and the idea should say what's still to check rather than leave it to the reviewers to find.

✅ **Resolved:** the next step in "Reviews" ("The reviews are in", "What Sparks would change"…) has no box around it: it reads as the tab's first part, with a line under it before "Reviewers". Why: inside the card, a bordered box was a box in a box.

✅ **Resolved:** the evidence's outcomes close the Summary, one per line, a green check before each that supports the hypothesis ("Not tested" has none); they're no longer on the right of the reviewers' panel header. Why: next to what they're about, they read as the summary's conclusion; in the header, small and muted, they were easy to miss.

✅ **Resolved:** "The evidence" ends with where it comes from, one line listing each source once ("From …"). Why: the sources are what make it evidence; the line says at a glance what it rests on, and each statement still names its own.

Rules:

- **Nothing new.** Sparks restates and organizes what's in the spec; it doesn't add requirements nobody decided. When the spec doesn't answer something the teams will need, it goes under "Open questions", not into a guess.
- **Honest about evidence.** The summary states the evidence status in its first lines, with its method: "Simulation supports hypothesis. Based on simulated scenarios. Real-user testing is recommended before implementation." ([sparks.md](sparks.md), "Evidence and decisions").
- **Each statement keeps its label:** evidence with its source, from Dana, or "Assumption".
- **What to track restates the success criteria** as what the build must record; it adds no measure Plan didn't agree.
- **Gaps are visible, not hidden.** A skipped Evaluate shows in the summary as a gap ("Evaluate was skipped: the hypothesis is not tested").

ℹ️ **Paths:** with more than one path in the prototype ([sparks-prototype.md](sparks-prototype.md), "Paths"), one goes to Review: the path shown when she goes there. Sending another path later starts Review over for it. On Review, the prototype and evaluation shown are that path's. ⚠️ **Gap:** the other paths, as alternatives considered with their results, aren't shown in Review yet.

### Putting it together

Dana watches the idea for review being written. When Review opens, ~~Sparks says "**Now, let's put your idea together for review.** I'm writing it on the right, part by part, from what you decided, with nothing added.", and~~ Sparks's reply is its progress and nothing else, the panel is blank while it gets ready, and then the parts appear on the right one at a time, in the order of the table above:

✅ **Resolved:** Known issues comes right after Gaps, so everything still open is together, after the summary.

- **On the ~~right~~ left:** the parts written so far, each coming in as it's written, then the one being written, with its heading, "Writing…" and placeholder lines. ~~The badge says "Putting it together…" until the last part, then "Ready for review".~~ There's no badge until it's done, then ~~"Ready for review"~~ ~~"Ready to publish"~~ ~~the alert "Your idea is ready to publish." with "Publish now"~~ the header's badge turns "Ready to publish". The view follows the newest part, unless she scrolls up to read one; once it's done, it goes back to the top, where the summary is.
- **~~In the conversation~~ At the top of the same panel:** Sparks's progress in place, as while it builds a prototype ([sparks-prototype.md](sparks-prototype.md), "Building it"): ~~"Writing "Gaps", 2 of 16 parts.",~~ a status for each stage ("Laying out the parts of your idea…", "Writing your idea for review…", "Giving it a final polish…") over the latest five steps ("Gathering what you decided in Plan", "Writing "Gaps"", "Drafting the invitation"), ~~folding to "Wrote all 16 parts."~~ ~~folding to "Put together in 18s", which opens to show every step.~~ Once it's done, the progress goes and the card starts with the summary. ✅ **Resolved:** no "Put together in 18s" after it's done. Why: how long it took isn't something she acts on.
- **Then** ~~Sparks's "**Here's your idea, ready for review.** It's all on the right.",~~ the same reply goes on (a new one, if she's said something since): how she got here ("Done. Evaluate is finished, and the evaluation is in your plan.") and "Your idea is ready for review.", "**Here's what I put together:**" (the idea, the evidence, what's for the teams), then "**Here's what's still open:**", who to invite and the invitation ("Checking it's ready", "Bringing others in"). Nothing can be sent before it's written. ✅ **Resolved:** with no conversation, what comes then is ~~the next step, "Check it, then publish it", and~~ ~~"Publishing it"~~ the popover from "Publish" ("Review's screen").

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

Sparks suggests departments to review the concept, from the idea itself (its direction, who it involves, what it changes), each with what they'd evaluate:

- **The UX team, always:** the experience, the design notes, and what to test with real people.
- **Engineering, always:** whether it can be built as described, what's missing, and the effort.
- **The departments it touches,** from the brief's "Who's involved" and "What it changes for teams": the value for their area and what it changes in their work. "Catalog team: the fit data it depends on." ~~"Stores: what changes on fit calls."~~ For "Fit check before you buy", Sparks suggests the UX team, engineering and the catalog team, not stores.

Dana chooses the departments and the people in them. ~~Sparks never names or picks individuals (the problem brief in Plan, [sparks-plan-clarify.md](sparks-plan-clarify.md)).~~ Sparks suggests people too, one per suggested department, the person in it who knows the area (Priya Shah for the UX team, Marcus Lee for engineering); she picks, and adds none it doesn't show her. The problem brief still names groups only ([sparks-plan-clarify.md](sparks-plan-clarify.md)).

✅ **Resolved:** Sparks suggests individual reviewers as well as departments, in Share's "View recommended reviewers", people first, then teams; Dana picks which to add. Why: a team of 212 is slow to answer; a named person she can add in one click gets the review moving. The brief keeps groups only, since it describes the problem, not who reviews it.

**In "Share"** ~~**, in Review:**~~ **, in every step once there's a direction:** under "Who has access", "View recommended reviewers (6)" opens who Sparks suggests for this idea: the people first, with their photo and team ("Ana Silva · Catalog team"), then the departments, with how many people each has ("4 people", as under "Who has access"), each with a circle-plus button on its right (ghost, "Add Catalog" in its tooltip) that adds that one ("Can comment"); selecting anywhere on the row adds it too, except a team's name, which opens its people. She picks which. ~~"Sparks suggests, for this idea" lists them, with "Add recommended reviewers", which adds them all.~~ The list is closed until she opens it, leaves out who already has access, and goes once they all have. She can also add any person or department in the field. Who she's added is who "Publish" sends the invitation to.

✅ **Resolved:** reviewers are chosen in "Share", with Sparks's suggestions for this idea behind "View recommended reviewers", each added with its own circle-plus button; "Publish your idea" no longer lists who reviews it, and sends it to who she added. Why: who sees the idea is set in one place, and Sparks does the suggesting; she picks which teams, one at a time.

### The invitation

Review is where others come in. Before it, the only people who see the idea are collaborators she added with "Share" ("Can edit"); ~~"Can view" and "Can comment" are offered from Review on~~ she can add people to view or comment in any step, and they see the idea once she publishes it ([sparks.md](sparks.md), "Sharing a concept").

✅ **Resolved:** collaboration happens only in Review, unless Dana adds a collaborator ("Can edit") earlier. Why: the teams review a version she chose to publish, not her work in progress.

Dana starts it from Sparks's suggestion ~~in the conversation~~ ~~in "Publishing it"~~ in the popover from "Publish", or from "Share" in the header. "Share" appears in the header ~~from Review on~~ (in every step, [sparks.md](sparks.md)), ~~and in Review opens the invitation~~ which opens the share popover; the invitation comes from Sparks ~~in the conversation~~ there; before Review it isn't shown ([sparks.md](sparks.md), "Sharing a concept").

~~Sparks drafts a short invitation Dana can edit: what the concept is, what she'd like from them, and by when.~~

~~> I've been working on a way to cut wrong-part returns. It's defined, prototyped and evaluated with AI scenarios, not yet with real customers. Could you review it by Friday? From engineering, I'd most like your view on the fit data.~~

~~Sparks shows who will receive it and whether her conversation with Sparks is included (it isn't unless she says so), and sends it only when Dana confirms (~~"Looks right, send it"~~ ~~"Looks right, publish it", or~~ "Publish" in the header; ~~"Not quite"~~ the pen to change it; with Evaluate skipped, also "Evaluate it first"): the invitation goes out with the published version ("Publishing") ([sparks.md](sparks.md), "Sharing a concept").~~ ~~The invitation is a standard email, with no draft for Dana to write or edit: reviewers get an invitation to explore the published version of her idea, try the prototype and share feedback.~~ The invitation is an email (Figma: Sparks "Email", 80:763): the Sparks logo, "Dana Morales invited you to review an idea", the idea's name, a message, "Review by:" (a week after she publishes, set by Sparks) and "Version:" ~~,~~; it lists exactly what's shared, as "What you're sharing" in "Publish your idea" does: ~~with one item, its name under the heading and its version under "Review by"; with several, the heading counts them ("Dana Morales invited you to review 2 ideas") and they're listed, each with its version, under it~~ the idea, and under it the paths that go with it, each at the version shared (an idea has no version of its own; a path has several, and one is shared). With one idea and one path: the idea's name under the heading, then "Prototype: {path}" and "Version: n" under "Review by"; with several paths, they're listed under the idea's name. With several ideas, the heading counts the ideas, not the paths ("Dana Morales invited you to review 2 ideas"), and they're listed with their paths.

✅ **Resolved:** publishing shares every path built, not only the one on screen: "What you're sharing" lists them under the idea (the one in Review first), each at its latest version, and the email says "try the prototypes". Why: reviewers compare the directions Dana prototyped.

✅ **Resolved:** what's shared is the idea with its paths under it, each path at its version, in ~~"What you're sharing"~~ "Idea solution paths you're sharing" and in the email; a path isn't a second idea. With one idea, the list is its paths (the idea is named above it, in the description or the email's heading); with several, each idea and its paths under it. Why: the idea is one thing with one or more paths prototyped, and each path has its own versions. Then ~~"Review idea"~~ "View idea" (it opens the published idea's page), then "The Sparks Team · Turning ideas into better experiences." and a confidentiality line. The message is Sparks's standard one for the idea ("I've been working on an idea to reduce wrong-part returns and would love your feedback. Explore the prototype and share your thoughts…"), ~~unless she writes her own with "Add a note" in "Publish your idea", which replaces it~~; her note, if she adds one with "Add a note" in "Publish your idea", goes after it. "View invite email" there shows the email exactly as reviewers get it, in a dialog over the popover. It goes out when she selects "Publish & invite" ("Publishing"), to who she added with "Share"; her conversation with Sparks isn't included. Reviewers are notified in AutoPartsHUB and by email.

~~✅ **Resolved:** no invitation for Dana to draft or edit: reviewers get a standard email invitation, and "Publish your idea" says what happens next. Why: one less thing for her to write and check before publishing; what matters is what's shared and who it goes to.~~

✅ **Resolved:** the invitation is an email with Sparks's standard message; Dana doesn't have to write anything, but "Add a note" ~~(a field prefilled with the message) lets her replace it~~ (an empty field, two lines tall, "Add your note...") adds her own words after it, and "View invite email" shows it as reviewers get it. "Review by" is a week after publishing, set by Sparks. Why: nothing to write by default, her own words when she wants them, and she sees exactly what goes out.

✅ **Resolved:** the email's copy matches what's shared: one idea, its name and version; several, the heading counts them and lists each with its version (the same list as the popover). Why: reviewers see exactly what they're asked to review.

### Publishing

The teams who review get a **fixed version** of the idea: what's in "Idea for review" and the clickable prototype at that version, to try and comment on. Dana keeps working on hers; they see what she published until she publishes an update.

- **"Publish"** is the last button in the header, after "Share", only on Review ([sparks.md](sparks.md), "Share and Publish"). Only Dana, the idea's owner, publishes and asks for a decision: someone she shared it with as "Can edit" (a collaborator) doesn't see "Publish", and Sparks doesn't offer them to ask for a decision ([sparks.md](sparks.md), "Sharing a concept"). ~~It's available once there's a prototype; before, it can't be selected and says why ("Build a prototype first: the teams get your idea and its prototype.").~~ Review opens only with a prototype, so there's always something to publish; while Sparks puts the idea together, it can't be selected and says why ("Putting your idea together…").
- **The first time,** ~~it opens Review:~~ when Review opens, Sparks writes the idea for review ("Putting it together"), then shows what's still open in the next step; "Share" suggests the teams to invite ("Who to invite"), and "Publish" opens ~~the invitation, who it goes to and what publishing gives them ("Publish your idea"): "**Publishing gives them a fixed copy:** this idea and the prototype as it is now (version 3), to try and comment on. You keep working on yours; when you change it, publish an update. Asking for a decision comes later, when you're ready."~~ "Publish your idea" (UCL's `PublishPopover`; Figma: ~~Sparks "Publish your idea (popover)", 81:1031~~ sparks.ds "Publish your idea (popover)", 129:2258): ~~"Share your idea and interactive prototype with your selected reviewers."~~ "Share your Wrong-part returns idea and interactive prototype with your selected reviewers." (the idea's name; "prototypes" with several paths); where it'll be, its address after a globe, in the link color; ~~"What you're sharing", the idea and its prototype, each with the version that goes out ("Wrong-part returns · Version: 3")~~ "Idea solution paths you're sharing": each path after a corner arrow, with the version that goes out ("Fit check before you buy · Version: 3"), the idea named in the line above, not in the list; "What happens next": "Reviewers will receive an email invitation to explore your idea, try the prototype, and share feedback. You can continue working independently and publish updates when you're ready."; who it goes to, in a box (light blue, the info colors): "Your idea will be shared with 3 team members." (each person, and the people in each team she added) with a "Manage reviewers" button, or, as a warning (the warning colors and a solid warning triangle), "No reviewers added yet" with a full-width "Add reviewers to publish and share your idea." button, each opening "Share"; "What happens next" says "your ideas" when several things are shared; "Add a note" and "View invite email", with their icons, in that order: "View invite email" (the email in a dialog) and "Add a note" (~~a field, prefilled with the email's message, that replaces it~~ an empty field, two lines tall, "Add your note...", whose note goes in the email after the message); then "Cancel" and "Publish & invite", which can't be selected until she adds a reviewer (muted gray then). She confirms with ~~"Looks right, publish it", or~~ ~~"Publish" in the popover~~ "Publish & invite".

  ✅ **Resolved:** "Publish your idea" shows what's shared (the idea and its prototype, with their versions), what happens next and how many people it goes to, with a link to change who; the button reads "Publish & invite". Why: Dana checks what goes out and to whom at a glance, and fixes who from the same place. ~~Sparks: "Published. The teams now see version 3 of your idea and its prototype, and I've sent them the invitation."~~ The next step says "The teams have it".
- **Publishing before Evaluate is allowed.** The gap shows on what they see ("Gaps": "Evaluate was skipped: the hypothesis is not tested").
- **After changes,** the button reads "Publish update". Selecting it publishes the latest version to the same teams, with no new invitation~~: "Done. The teams now see version 4 of your idea and its prototype, and I've told them what changed."~~. They're told what changed; their feedback on the earlier version stays, marked with the version it was about. With nothing new to publish, it reads "Published" and can't be selected. Since the button shows only on Review, Sparks says so where she makes the change: the first time she changes the prototype after publishing, its reply in Prototype adds "The teams still see version 3. When you want them to see this one, publish an update in Review."
- **On the prototype,** ~~under its name, the version and when it was published: "Version 2 · Published Nov 26, 2026, 2:40 PM"~~ its title is the version ("Version 2") and under it when it was published ("Published Nov 26, 2026, 2:40 PM"); with a newer version since, "Version 3" over "Version 2 published Nov 26, 2026, 2:40 PM". "Publish update" moves the date.

  ✅ **Resolved:** the prototype's title line shows the published date and time. Why: Dana sees what the teams have, and since when, without opening anything.
- **On the ~~right~~ left,** the badge says which version they see: "Published · version 3"~~, and "See what the teams see" opens the page they open from the invitation, at that version, in its own tab~~ (the page the teams see is a demo shortcut in the "+" menu, not a link on the panel) ("What reviewers see and do").

✅ **Resolved:** "Publish" gives the teams who review a fixed version of the idea and its prototype, for feedback; asking for a decision is a separate, later step. It can be used before Evaluate. Why: reviewers need something that doesn't change under them while they read and try it, and Dana should be able to gather feedback, change the idea, and publish again before anyone decides.

✅ **Resolved:** "Publish" is in the header only on Review ([sparks.md](sparks.md), "Share and Publish").

✅ **Resolved:** the step keeps the name "Review", not "Idea". Why: "idea" already names the whole concept on screen ("New idea", "All ideas", its name in the header), and the steps are what Dana does; what she publishes is the "Idea for review".

### What reviewers see and do

- They open the concept and the prototype from their invitation, on the published idea's page: the version Dana published, never her working copy. **The invitation is the email** (and the AutoPartsHUB notification): "Dana Morales asked you to review this idea", ~~her words and the date she'd like it by~~ a standard invitation to explore the version she published, try the prototype and share feedback; the page doesn't repeat it.
- **The page,** laid out as Dana's Review ("Review's screen"): the idea's name on the left of the header (no menu: it isn't theirs; bold, as in Dana's header, without the dotted underline), with ~~the version they see beside it ("Version 3")~~ where it stands for them beside it, a badge: **"Waiting for your assessment"** (yellow) until they share theirs, **"Assessment shared"** (blue) once they have, **"Advanced"** (with the date) or **"Stopped"** once decided. The version is the prototype's title~~, "Idea" and "Prototype" centered~~; "Comments", notifications, **~~"Share your review"~~ "Share your assessment"** and their avatar on the right.

  ✅ **Resolved:** the reviewers' page shows the idea's status from the team member's point of view, not Dana's: their assessment to give, given, then the decision. Why: what they need to know is whether something is theirs to do; Dana's progress ("Waiting for feedback") is hers. Below, the idea for review on the left and its prototype on the right:
  - ~~**Their review,** in a box at the top of the idea, where Dana's Review has her next step: the invitation ("Dana Morales asked you to review this idea", her words, the date, the version) and their view.~~
  - **Their view, behind ~~"Share your review"~~ "Share your assessment":** the header's dark button (as Dana's "Publish"), before their avatar, opens a popover: ~~"Your review"~~ "Your assessment", "Should it move forward? Dana asks for a decision once the teams have given theirs.", the date she'd like it by and the version ("By Friday, Nov 28 · Version 3, published 2 hr ago. Dana keeps working on hers; you see this version until she publishes an update."), then "Advance", "Advance with changes" or "Don't advance yet", as radio buttons, one per row. Only once one is chosen do the field for a sentence on why ("Why, in a sentence") and ~~"Submit review"~~ "Submit assessment" (the brand-color button, 36px) come in, with the field focused, ready to type. ✅ **Resolved:** the reviewer's part is an "assessment": "Share your assessment", "Your assessment", "Submit assessment". Why: "review" is the step and the whole process; what one reviewer gives is their assessment of it. Sending closes it, and the button becomes ~~"Your view: Advance"~~ "Your assessment: Advance" (outlined), which opens it again with their assessment, why, and ~~"Change your view"~~ "Change your assessment".
  - **The idea:** the same document as Dana's ("What's reviewed"), without her next step. ~~Each part's heading has "Comment" (or how many comments it has).~~ Comments are pinned on the idea, as on the prototype: ~~"Add comment" in the Comments panel~~ "Add comment" on the prototype's toolbar, or selected text ("Comments on the idea").
  - **The idea's panel** is headed with its name ("Fit check before you buy"; ~~"Idea for review"~~, ~~"Advanced idea"~~: an advanced one says so in its badge).
  - **The prototype** at that version, titled "Version 3" with "Published Nov 26, 2026, 2:40 PM" under it; "Version 3" is a menu of the versions published to them, newest first, each with its name and date, "Latest" on the newest and a check on the one shown: choosing an earlier one opens it (the header's version follows). With its audiences and devices, and everyone's pins with their threads; "Add comment" is on the prototype's toolbar, for the prototype and the idea ~~, and the idea's in its header~~; the Comments panel filters what it lists ([sparks-prototype.md](sparks-prototype.md), "Commenting on it").
  - **"Comments"** opens the same side panel as Dana's, with everyone's comments, newest first and resolved ones last: who, their team, when, where ("On "Gaps"", or "On the prototype · Customer · Phone · "Save vehicle""), the text, "Unclear", replies and "Resolved". Selecting one opens it where it is: its part of the idea, brought to the top with its comments open, or its thread on the prototype.

  ~~✅ **Resolved:** reviewers get a page of their own for the published idea: their review on the left (the invitation, their view, every comment), and the idea and its prototype on the right, one at a time.~~ ✅ **Resolved:** reviewers get a page of their own for the published idea, laid out as Dana's Review: the idea and its prototype side by side, ~~their review at the top of the idea,~~ their view behind "Share your review" in the header, comments where they belong and in "Comments". Why: they come to read, try and react; what Dana checks before publishing is what they get, in the same place.

  ✅ **Resolved:** the reviewer's view is behind ~~"Share your review"~~ "Share your assessment" in the header, in a popover, and Dana's invitation is the email that brings them, not a box on the page. Why: the idea starts at the top of the page, the way Dana sees it; the invitation is read once, where it arrives.

  ⚠️ **Gap:** asking Sparks about the concept isn't built on the page yet. Their comments on parts of the idea show in Dana's Comments panel, under "On the idea", each opening its part in Review ([sparks.md](sparks.md), "The concept workspace"). Answering or resolving a comment on a part isn't designed yet (comments on the prototype have threads).
- They give feedback: comment on any part or point at anything in the prototype, flag a part as "Unclear", or suggest an improvement ([sparks.md](sparks.md), "Feedback"). They can reply to each other.
- They can ask Sparks about the concept ("Why not 'Flag often-returned parts'?"); Sparks answers only from what's shared with them.
- When they've finished, they give their view: "Advance", "Advance with changes" or "Don't advance yet", with a sentence on why.
- They don't edit the spec or the prototype. The concept stays Dana's.
- They don't see her conversation with Sparks unless she included it, or her personal knowledge beyond what the concept quotes ([sparks.md](sparks.md), "Personal knowledge").

### Reviews coming back

- Dana sees each reviewer's status: invited, opened, commented, or their view.
- Sparks summarizes the reviews for her, grouped by topic, and says where reviewers disagree with each other: "The UX team wants the fit message above the price; the catalog team needs a date and an owner for the fit data." "Engineering confirms saved vehicles; fit data for older vehicles would need the catalog team."
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

> I'd recommend advancing, with real-user testing first. The simulation supports the hypothesis: "doesn't fit" returns are likely to drop 35–50%, against a target of 40%. That's based on simulated scenarios, so the UX team's test of the fit message with real customers should come before the build. Engineering and the catalog team support it.

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
| Advance | The concept stays in Sparks, ready for Dana to share, without edit rights, with the people, teams or departments who'll carry it forward, or the whole company ([sparks.md](sparks.md), "Sharing a concept"). Sparks checks it's ready to build ("Ready to build") and suggests who, ~~starting with the reviewers' departments~~ starting with her product team, who builds it, then the reviewers' departments. Review is marked Done | "Advanced", with the date, next to the evidence status |
| Iterate | The concept goes back to the step, or the part of Plan, the decision names, with the decision's reason as Sparks's first message there. What comes after it becomes Needs a check | The step it's on |
| Stop | The concept is closed, with its reasons and learnings documented. Review is marked Done | "Stopped", with the date, next to the evidence status |

✅ **Resolved:** Iterate back to the choice ends with "Go back to the choice": the choice reopens in Plan, the decision's reason first in Decisions, and the prototype and evaluation of the direction she tried stay in the concept. Picking another direction builds its prototype from version 1, and Evaluate and Review start again for it.

✅ **Resolved:** an advanced concept stays in Sparks as a shareable concept that viewers can't change. There's no export and no work tracker integration: the teams explore the prototype and read the problem, success criteria, decisions and spec in Sparks.

## After the decision

- **What was decided is kept as it was.** The decision applies to the version that was submitted; the reviewers' and decision owner's view of it doesn't change under them.
- **Learnings stay.** When a concept is advanced or stopped, its learnings are added to Previous experiments in company knowledge: the problem, the hypothesis, the evidence status and its method, the decision and why, and what was learned. Not the conversation, and nothing from Dana's personal knowledge: a statement based on it is listed as "Based on the owner's own material", without its content. Sparks then shows it to the next person with a similar idea ([sparks-plan-problem.md](sparks-plan-problem.md), "What AutoParts Co. already knows").
- **Company knowledge stays governed.** Learnings added this way follow company knowledge governance: people whose role includes managing company knowledge can review, correct or remove them ([sparks.md](sparks.md), "Company knowledge").
- **The team who builds it gets it from Sparks** ("Handing it to development", below).
- **An advanced concept can keep evolving.** People she shares it with, such as her developers, can give feedback the same way reviewers do, including flagging anything unclear; Sparks proposes a fix, and Dana decides ([sparks.md](sparks.md), "Feedback"). Changes go into a new version, and people she shared it with see what changed since the version they first saw.

~~✅ **Resolved:** a stopped concept's learnings go into Previous experiments, so the company keeps what it learned and doesn't pay to learn it twice.~~ ✅ **Resolved:** the learnings of every decided concept, advanced or stopped, go into Previous experiments, without anything from the owner's personal knowledge, and under company knowledge governance. The company keeps what it learned and doesn't pay to learn it twice.

### Handing it to development

The advanced concept is the handoff: no new step, no export. Her product team (Dana's squad, who builds it) gets the same idea, read-only, in the order they need it.

**Ready to build.** When the decision is Advance, the next step shows Sparks's check before she shares it, under "Before your team builds it", each line done (a check) or still open (with a fix):

- every user story has its acceptance criteria;
- the effort is engineering's, not Sparks's rough estimate: "Effort from engineering: about 6 weeks";
- what to track is written, from the success criteria;
- no open question blocks building: "An open question blocks building: "Who fills the fit data gaps for older vehicles, and by when?"", with "Answer it before the team starts, or share it now: it's listed under Open questions for them."

None of them stops her from sharing it; the team sees the same lines.

**Sharing it.** Sparks suggests her product team first, then the reviewers' departments: "Share it with your product team, the online shopping squad, who'll build it, and the teams who'll carry it forward: the UX team, engineering and the catalog team." "Share it with them" adds them all, as "Can comment" ([sparks.md](sparks.md), "Sharing a concept"). Once shared, "See what the teams see" in Review opens the page the team who builds it gets.

**What the team who builds it sees.** The published idea's page, laid out as Review ("What reviewers see and do"), at the version advanced:

- **On top, where reviewers have their review:** "Dana Morales shared this idea with you to build", the decision and its reason ("Morgan Reyes advanced it on Nov 24, 2026: "…""), how to read it, how to ask about something unclear, and "Ready to build", Sparks's check as she shared it. The panel says "Advanced idea", with "Advanced · {date}".
- **What to build first:** what people need to do (user stories) and how to know it's done (acceptance criteria), the prototype, what it needs to be built, what to track, design notes, open questions, known issues, what to test with real people, and what it changes for teams.
- **Then "Why it's built this way":** the summary, success criteria, hypothesis, why this direction, the evidence, gaps, decisions and what comes later.
- The prototype on the right, at that version; comments on any part through "Add comment" in the Comments panel, with "This part is unclear" ([sparks.md](sparks.md), "Feedback"); no view to give.

✅ **Resolved:** the advanced concept is the handoff to development: Sparks checks it's ready to build, suggests her product team first, and the team who builds it opens it on what to build, next to the prototype, with why after it. Why: Dana's goal is to hand her developers something they can understand and act on; the document written for a decision leads with the summary and gaps, and developers need the user stories, what it needs and what's open first.

✅ **Resolved:** "What to track" is a part of the idea, drafted from the success criteria. Why: without it, the main measure Plan agreed on can't be checked after launch; engineering sees it in the review too.

### Something unclear after it advances

The team who builds it flags a part as unclear the way reviewers do: "Add comment", then the part, with "This part is unclear" ([sparks.md](sparks.md), "Feedback"). It's the moment Dana's frustration comes from (requests bounced back as "unclear" with no guidance), so Sparks answers it with a fix, not just a notification.

- **Where it shows:** in Dana's Comments panel, under "On the idea", with "Unclear", and in Review's next step, under what was shared: "Jordan Lee, from your product team, flagged something as unclear", his words, and the part it's on ("On the acceptance criterion: "Given a part with no fit data for my vehicle, …"").
- **Sparks's fix:** "I'd say it this way:", the part as it would read, with a pen to change it, and where Sparks took it from ("From the prototype: its "We're not sure this fits" message says the fit data doesn't cover the vehicle's trim and engine."), then "It changes this criterion only; nothing else in the idea changes." It restates what the concept already decided (the prototype, the spec, a decision); when nothing there answers it, Sparks says so and suggests adding it to the open questions instead of guessing.
- **Her answer:** "Make the change" or "Not now". Made: "Done. It now reads: "…" Jordan sees it's been addressed, and how, and everyone it's shared with sees the new wording." Not now: "Okay. It stays in Comments, flagged as unclear, until you answer it."
- **On their side:** the part reads as changed, and the comment shows "Addressed." with how ("Dana changed the acceptance criterion: "…""), under the part and in "Comments".
- Nothing changes until she makes it; it's recorded in Decisions as a comment she accepted ([sparks.md](sparks.md), "The decision log").

✅ **Resolved:** after it advances, something flagged as unclear gets a fix from Sparks in Review's next step: the part as it would read, from what the concept already decided, with where it comes from; Dana makes it, edits it or leaves it, and the person who flagged it sees how it was addressed. Why: requests bounced back as "unclear" with no guidance are one of Dana's frustrations; here she answers with one click, and the team gets the answer where they asked.

⚠️ **Gap:** a change that touches the prototype (not only the spec's words) would go through Prototype, with Evaluate becoming Needs a check, as after the reviews; it isn't simulated. Answering a flag in her own words, instead of a fix, isn't designed. The fix she makes isn't recorded in Decisions yet.

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

How it shows in the plan, as built ("Where it stands" → Review, once Review opens): ~~"Ready for review."~~ "Ready to publish.", "In review: 2 of 4 views in.", "Waiting for a decision.", or the decision ("Advanced, by {decision owner}, {date}.", "Back to Evaluate…", "Back to the choice in Plan…"); "Open" goes to Review, where the idea for review, the reviewers and her recommendation are. The decision and the reviewers' views are also in "Decisions".

✅ **Resolved:** the plan no longer has a Review section~~; it has one line on where Review stands, with "Open"~~ (and no "Where it stands": Plan stays the conversation, [sparks.md](sparks.md), "The finished plan"). Why: the idea for review has its own panel in Review, and the plan keeps the spec ([sparks.md](sparks.md), "The finished plan").

⚠️ **Gap:** "Comments and answers" isn't built, since reviewers' comments aren't built.

## States

| State | What shows | What Dana can do |
| --- | --- | --- |
| Preparing | ~~What Sparks is putting together~~ The parts written so far, the one being written ("Writing…"), ~~"Putting it together…",~~ and Sparks's progress ~~in the conversation~~ at the top ("Writing "Gaps"") | Wait, read what's written, stop it |
| ~~Ready for review~~ Ready to publish | The concept for review, and the readiness list | Fix items, invite reviewers |
| Plan or Prototype not done | "Finish your plan and build a prototype before submitting for a decision", with a link to what's missing | Go to the missing step; invite reviewers meanwhile |
| Published | "Published · version 3" on the ~~right~~ left; "Published" in the header, not selectable | Keep working; read the teams' feedback; ask for a decision |
| Update to publish | "Publish update" in the header, after a change since the version they see | Publish the update |
| ~~Invitation drafted~~ | ~~The invitation, who will receive it, and whether the conversation is included~~ | ~~Edit it, send it, cancel~~ |
| Ready to publish | "Publish your idea": what's shared with its versions, what happens next, how many people it goes to | Publish & invite (once there's a reviewer), manage reviewers, cancel |
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
| ~~"Who should review this?"~~ ~~Opens "Publishing it"~~ ~~Selects "Publish"~~ Opens "Share" in Review | Suggest the UX team, engineering and the departments the concept changes, each with what they'd evaluate, ~~and no individual names~~ and a person in each, for her to pick from |
| ~~"Send it to the stores team."~~ | Draft the invitation, show who receives it and that the conversation isn't included, and wait for her confirmation |
| Reviewers disagree with each other | Say so in the summary, with both views, and let Dana decide |
| ~~"Just approve it so we can build it."~~ | Say the decision belongs to the decision owner, and offer to prepare her recommendation |
| ~~"Write that it's validated."~~ | Explain that the simulation supports the hypothesis but isn't validation with real people, and keep the evidence status as it is |
| Recommends advancing when the evidence doesn't support the hypothesis | Say so once, with the evidence, and keep her recommendation as hers |
| The decision is Stop | Record the reasons and learnings, tell Dana what was kept and where, without treating it as a failure |
| The decision is Advance | Check it's ready to build, listing what's still open with a fix; suggest who to share it with, starting with her product team, then the reviewers' departments, and share only when she confirms |
| A requirement the teams need that the spec doesn't answer | List it under "Open questions" instead of filling it in |

⚠️ The questions struck through above were asked in Review's conversation, which is gone; they stand until there's a place to ask ("Review's screen", open question).

## Accessibility

- The next step is announced when it changes; when the button she used goes with it, focus moves to the new step.
- The concept for review has one heading per part, in the order of "What's reviewed", so it can be navigated by headings.
- Comments on the prototype are listed in reading order as well as shown on the screen, so they can be reached without pointing.
- Reviewers' views, the evidence status and the decision are written out, never shown by color alone.

## Acceptance Criteria

- Given Evaluate is Done or skipped, when Review opens, then Sparks prepares every part of "What's reviewed" from the spec, and nothing in it is a requirement the spec doesn't contain.
- The parts appear one at a time on the ~~right~~ left as they're written, with Sparks's progress ~~in the conversation~~ at the top; ~~"Here's your idea, ready for review"~~ ~~"Here's what I put together"~~ ~~"Check it, then publish it"~~ the next step comes only once ~~the last part is written~~ every step is done.
- The summary states the evidence status with its method in its first lines, and lists every gap, including a skipped Evaluate.
- "Submit for a decision" isn't available until Plan and Prototype are Done; no other gap blocks it.
- "Publish" ~~can't be selected before there's a prototype, and says why;~~ shows only on Review, and can't be selected while the idea is put together; it gives the teams a fixed version of the idea and its prototype, at the version shown, and publishes only when Dana confirms.
- After a change, "Publish update" publishes the latest version to the same teams; their feedback on the earlier one stays, marked with its version.
- Publishing doesn't ask for a decision: Sparks drafts the recommendation only when Dana asks for one.
- Sparks suggests the UX team and engineering always, plus the departments the concept touches, each with a person in it to add instead or as well; nothing is added until she picks it.
- "Share" shows in the header ~~only from Review on~~ in every step, ~~and in Review opens the invitation~~ and opens the share popover, ~~offering only "Can edit" before Review and every role from Review on~~ the same in every step, every role ([sparks.md](sparks.md), "Sharing a concept"); the invitation is Sparks's draft, in the popover from "Publish".
- ~~In Review,~~ In every step once there's a direction, "Share" has "View recommended reviewers", which opens the departments Sparks suggests for this idea without access yet, each with how many people it has and a circle-plus button that adds it, as "Can comment".
- ~~"Publish", the first time, opens "Publish your idea": the invitation with a pen, who it goes to (who she added with "Share") and what they get, with "Cancel" and "Publish"; with no one added, "Publish" there can't be selected; nothing goes until "Publish" there.~~ "Publish", the first time, opens "Publish your idea": what's shared (the idea and its prototype, each with its version), what happens next, and how many people it goes to with "Manage reviewers" (or "No reviewers added yet" with "Add reviewers to publish and share your idea."), which opens "Share"; "View invite email", which shows the email in a dialog, and "Add a note", ~~whose field replaces the email's message~~ an empty field ("Add your note...") whose note goes in the email after the message, and then reads "Remove note", which empties and closes it; then "Cancel" and "Publish & invite". With no one added, "Publish & invite" can't be selected; nothing goes until she selects it.
- Review shows no conversation and no message box: the idea for review and the final prototype, side by side; the prototype can be tried and commented on there, not changed.
- The teams never see the next step or the "Publish your idea" popover.
- No invitation, submission or share happens without Dana's confirmation of who gets what; the conversation is included only if she says so.
- Reviewers can view, comment, flag a part as unclear, suggest improvements, ask Sparks and give their view, and can't edit the spec or the prototype.
- Each "Unclear" flag gets a fix proposed by Sparks; nothing changes until Dana accepts it, and the person who flagged it sees when it's addressed.
- Sparks's summary of reviews groups them by topic and shows where reviewers disagree.
- Accepting a change to the prototype marks Evaluate as Needs a check.
- The recommendation states the evidence status separately from advance, iterate or stop; the recommendation recorded is Dana's.
- Sparks suggests the area's product lead as decision owner; only the decision owner can record Advance, Iterate or Stop, and the decision needs a reason.
- Advance keeps the concept in Sparks, shows "Advanced" with the evidence status, and lets Dana share it without edit rights; Iterate reopens the named step or part of Plan; Stop shows "Stopped" with its reasons.
- Given the decision is Advance, the next step shows "Before your team builds it": acceptance criteria, engineering's effort, what to track and blocking open questions, each done or with a fix, and none of them stops her from sharing.
- Sparks suggests her product team first when she shares an advanced concept, then the reviewers' departments.
- The team who builds it opens the advanced concept on what people need to do (user stories) and how to know it's done, next to the prototype, with "Ready to build" on top and "Why it's built this way" after what to build.
- Given the team who builds it flags a part as unclear, then Review's next step shows their words, the part, and Sparks's fix with where it comes from; nothing changes until Dana selects "Make the change", and then the part reads as fixed for everyone and the comment shows "Addressed." with how.
- "What to track" restates the success criteria as what the build must record, and adds no measure Plan didn't agree.
- Advanced and stopped concepts add their learnings to Previous experiments, with nothing from Dana's personal knowledge.
- The recommendation and the decision appear in "Decisions" without anyone writing anything for the log.

## Out of scope

- The workspace, step states, suggestions, Sparks's voice, evidence and decisions, sharing, knowledge and the decision log: [sparks.md](sparks.md).
- How each part of the concept was decided: the PRD of the step that owns it, linked in "What's reviewed".
- Building the advanced concept: the teams' own process.
- Measuring outcomes after implementation: Pulse ([sparks.md](sparks.md), "Out of scope").
