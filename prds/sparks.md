<!--
Created: Nov 21, 2026
Created by: Julio Caunedo
Last updated: Nov 27, 2026
Latest update: a new idea joins "Your ideas" once it's named (Sparks names it from the problem she described, or she names it herself). Each row has a "…" menu (Open, Duplicate, Archive, Delete, which asks first). A concept reopened fades in at its top and glides to its end, in the middle of the view, nothing replaying. Why: an idea is worth listing once it has a name; she manages ideas from the list; reopening lands on the question waiting for her.
Recent updates: an advanced concept can also be created in Jira, one way, each story linking back to it (sparks-review.md, "Creating it in Jira"). Share's recommended reviewers start closed each time Share opens, and "Add all" shows only while they're open.
Scope: the Sparks app as a whole: how it's reached, the start page, the concept workspace (the conversation, cards and the plan), the four steps (Plan, Prototype, Evaluate, Review) and how a concept moves through them, evidence and decisions, sharing, the decision log, knowledge, and how the Sparks assistant behaves in every step.
Purpose: defines the frame every Sparks step works inside, so each step's own PRD only has to define what's specific to that step.
-->

# Sparks

**Location:** an app in AutoPartsHUB, AutoParts Co.'s internal workspace, opened from the Sparks card on the AutoPartsHUB home ([autopartshub-home.md](autopartshub-home.md), "Apps"). People a concept is shared with open it from their invitation or notification.
**Audience:** experienced AutoParts Co. employees who know the business well but aren't designers or engineers: product managers, operations, sales, customer care. The reference user, and the workflow every Sparks PRD describes, is Dana, a Senior Product Manager.
**Description:** an AI-powered innovation and experimentation platform that turns employees' expertise into testable business opportunities: from a rough problem to an evidence-backed recommendation, and a decision on whether it deserves execution.
**Status:** defined, with a PRD for each part of Plan and for each later step. Designed in Figma: the start page's concept list and the workspace's first moment (Sparks → "Sparks" and "Sparks Project"); the rest isn't designed yet. Built as reference layouts: the start page (`SparksStartPage`) and the workspace with Sparks's introduction, Dana's messages and Plan's Problem part, one thing at a time, then Clarify's questions and brief and Success's four questions and criteria, then the four directions and the question that finishes them, then the comparison and its first question (`SparksWorkspace`, `ClarificationCard` from sparks.ds "clarification-card", `ProblemCard`), from sparks.ds's `AppHeader`, `StepNav`, `PromptComposer`, `UserMessage` and `Badge`, plus `AssistantMessage` (not in sparks.ds yet).
**Figma:** Sparks "Sparks" (1:2), "Sparks Project" (27:1932)

---

## Purpose

**Turn employee expertise into testable business opportunities.**

Dana has years of knowledge about AutoParts Co., a national auto parts retailer with more than 4,000 stores and a large e-commerce business: what frustrates customers, where operations lose time, where the business could grow. What she may lack are the design and engineering skills to turn an idea into something concrete enough to evaluate before developers get involved. So most ideas either wait, or reach the product teams as a rough request. Sparks gives her a structured, guided way to explore a problem, experiment with a solution, and bring the result to the people who decide whether it deserves investment.

**Dana knows the business. AutoPartsHUB knows the company. Sparks bridges the gap between spotting a problem and testing a solution.** Unlike a general AI builder, Sparks works with what AutoParts Co. already knows: its customers, its numbers, its apps, its design system, its technology and what it has tried before ("Knowledge and Connections").

Sparks doesn't replace the UX team, the product organization or engineering. It gives employees a way to bring more mature, evidence-backed ideas into those teams, through the company's product process, not around it.

It works when Dana brings the people who decide a problem that's clearly framed, a solution she chose for stated reasons, a hypothesis and honest evidence about it, and a recommendation they can act on, without needing design or engineering skills to get there. An idea that isn't pursued ends as documented learning, which is a good result too.

**Dana brings the expertise. AI provides the design capabilities. Dana retains control.** That's the principle behind every step: Sparks handles the complexity of design and evaluation, and Dana brings her knowledge of the business and makes the decisions.

The design question every Sparks PRD answers: **how can AI amplify employees' expertise without replacing their judgment or bypassing the established product process?**

Four ideas shape the product:

- **Think first, build second.** Sparks helps Dana think the product through before it helps her build it. Nothing is built until she has chosen a direction for stated reasons.
- **Sparks suggests, Dana decides.** The assistant drafts each step and Dana approves, edits or rejects it. Nothing becomes part of the concept until she approves it.
- **Dana works with ideas and decisions; Sparks manages the specifications.** She talks the idea through with Sparks and approves what matters. Sparks writes each decision into her concept as she goes, so she never has to document anything.
- **Into the process, not around it.** Whether a concept advances is decided by the person who owns that decision in AutoParts Co.'s product process, with the UX team, engineering and the departments involved weighing in ("Bringing others in").

### How Sparks answers Dana's goals

Dana believes in her idea and wants to see it come to life, so she can test whether it's worth building before it reaches her developers. Where each of her goals and frustrations is answered:

**Her goals**

- **Take a problem through ideation to a concrete, testable concept.** Sparks takes her from a rough description, in Plan ("Plan"), to a clickable prototype or other testable artifact ([Prototype](sparks-prototype.md)), evaluated before anyone else sees it ([Evaluate](sparks-validate.md)).
- **Be clear about what success looks like before anything gets built.** In Plan, Sparks proposes success criteria and Dana chooses one main measure, with its starting point and target, before any solution is explored ([sparks-plan-define-success.md](sparks-plan-define-success.md)). Sparks never builds without success criteria ("Plan").
- **Explore more than one direction instead of locking in the first idea.** In Plan, Sparks proposes two to four meaningfully different directions, her own idea among them, ~~each with a visual preview~~ each rated in words, and recommends one ([sparks-plan-generate-directions.md](sparks-plan-generate-directions.md)); the ones she doesn't choose stay on record ([sparks-plan-compare.md](sparks-plan-compare.md)).
- **Hand her developers something they can understand and act on.** [Review](sparks-review.md) turns the spec into what people need to do (user stories) and how to know it's done (acceptance criteria), next to the prototype, the evidence and every decision's reason. Engineering reviews it before the decision. Once it advances, Sparks checks it's ready to build (acceptance criteria, engineering's effort, what to track, no blocking question) and Dana shares it with her product team, who open it on what to build, next to the prototype ([sparks-review.md](sparks-review.md), "Handing it to development").

**Her frustrations**

- **Ideas that stay abstract until they're expensive to build.** Sparks builds a working prototype of her idea for her ([Prototype](sparks-prototype.md)), from her own words, with no design tools or code. She sees it come to life, clicks through it and changes it by saying what she wants, before any developer time is spent.
- **Not knowing whether she's asking the right question.** Plan starts by separating the problem from the solution she walked in with ([sparks-plan-problem.md](sparks-plan-problem.md)). Sparks then checks it against company knowledge ([sparks-plan-clarify.md](sparks-plan-clarify.md)), asks only what the data can't answer, and suggests a different problem statement when the evidence points to one. Sparks says when the data and Dana disagree ("When the data and Dana disagree").
- **Tools that assume she already thinks like a designer or engineer.** She describes things in her own words, by typing, dictating or talking. Sparks asks one question at a time with its best guess, uses no jargon unless she does, drafts everything for her to react to, and builds the prototype from her plain-language requests ("Talking with Sparks").

## The words Sparks uses

Used the same way in the UI, in what the assistant says and in every Sparks PRD.

- **Sparks:** the app, and the assistant inside it. Dana talks to Sparks the way she'd talk to a colleague ("Talking with Sparks").
- **Concept:** one idea Dana works on, from its first description to its decision. She can have several. ~~On screen it was "concept" in some places and "idea" in others.~~ On screen and in what Sparks says it's "idea" ("Your ideas", "New idea", "All ideas", "Share idea", "Here's your idea, ready for review"); the PRDs and the code keep "concept" as the internal term, as they call the plan "the spec".

  ✅ **Resolved:** one word on screen: "idea". Why: it's Dana's own word and the start page's (Figma); two words for one thing made her wonder whether they were different. ~~"Blueprint" stays the name of its spec,~~ The spec is "your plan" ("The finished plan"), "prototype" what Sparks builds.
- **Step:** one of the four steps a concept goes through: Plan, Prototype, Evaluate, Review ("Steps").

  ✅ **Resolved:** the third step stays "Evaluate", not "Evaluation". Why: the four read as what Dana does next (Plan, Prototype, Evaluate, Review), the step's actions use the same word ("Yes, evaluate it", "Evaluate the prototype"), and "Evaluation" names its result, the panel inside the step.
- **Card:** how Sparks shows something it drafted in the conversation (the problem, the success criteria, a direction), for Dana to accept, edit or dismiss ("Cards in the conversation").
- ~~**Blueprint:** the summary of everything decided, opened from the header ("The Blueprint panel") what Plan becomes once it's done: selecting Plan shows it beside the conversation ("The Blueprint"). The PRDs call this record the spec; on screen and in what Sparks says, it's "your concept" on screen and in what Sparks says, it's "your blueprint". The idea itself, the thing Dana works on, shares and puts up for review, is still "the concept". The code still calls the panel `ConceptPanel`. In code, `Blueprint` (`workspace/blueprint.tsx`).~~
- **Plan (the finished plan):** the record of everything decided. ~~Plan is a conversation while it's in progress and a document once it's done: selecting Plan then shows it on its own ("The finished plan").~~ Plan is the conversation it was built in, while it's in progress and once it's done; Dana changes it by changing her answers ("The finished plan", "Changing an answer"). The PRDs call this record the spec; on screen and in what Sparks says, it's "your plan". There's no "Blueprint". ~~In code, `PlanDocument` (`workspace/plan-document.tsx`).~~
- **Enhanced prompt:** the team's name for the "Problem to solve" card: Sparks's analysis of Dana's first message, the problem as it interprets it, filled out with ~~what it found~~ general knowledge of the domain, with no numbers or company data ([sparks-plan-problem.md](sparks-plan-problem.md), "Initial prompt improvement"), shown back for her to confirm or correct ([sparks-plan-problem.md](sparks-plan-problem.md)). Not a word on screen.
- **Suggestion:** something Sparks proposes, on a card or in the plan. It isn't part of the concept until Dana accepts it.
- **Assumption:** something the concept relies on that hasn't been confirmed yet, by Dana or by evidence. It stays labeled until it is.
- **Hypothesis ("What we believe"):** what Dana believes the chosen direction will achieve, and how she'll know. Written in Plan once she chooses a direction, checked in Evaluate.
- **Evidence status:** how the hypothesis has been tested and what the evidence says, such as "Simulation supports hypothesis" ("Evidence and decisions").
- **Decision:** whether a concept is Advanced, Stopped or sent back to iterate, made by its decision owner ("Evidence and decisions").
- **Decision owner:** the area's product lead, who decides whether a concept advances, iterates or stops ([sparks-review.md](sparks-review.md), "The decision").
- **Knowledge:** what Sparks understands and can reference: company knowledge and Dana's personal knowledge ("Knowledge and Connections").
- **Connections:** where company data comes from, and which sources are connected ("Knowledge and Connections").
- **Decisions (the log):** the concept's decision log, kept automatically ("The decision log").

Words to avoid in the UI: design and engineering jargon (wireframe, MVP, schema, sprint, API, persona) unless Dana uses it first. When Sparks needs such a term, it explains it in the same sentence.

## Reaching Sparks

1. Dana selects the Sparks card on the AutoPartsHUB home.
2. Sparks opens in a new tab, on its start page ("The start page"). The AutoPartsHUB home stays open in its own tab.
3. From there she starts a new concept with "New idea" or opens one she's already working on.

~~The start page has the AutoPartsHUB header with the Sparks logo, and a way back to the AutoPartsHUB home and the other apps.~~ The start page has the AutoPartsHUB header with the Sparks logo, ~~comments,~~ notifications and Dana's avatar ([autopartshub-home.md](autopartshub-home.md), "The header"), and no back button. Inside a concept, the header shows the concept instead, ~~with a back button to the start page~~ ~~with a close button that closes the concept's tab~~ with ~~the Sparks logo and~~ "All ideas" in the menu on its name, back to the start page ("The concept workspace").

~~✅ **Resolved:** the header shows the Sparks logo, with a way back to the AutoPartsHUB home.~~ ✅ **Resolved:** Sparks opens in a new tab from the AutoPartsHUB home, so the start page's header shows the Sparks logo without a back button: the home and the other apps stay in the tab Dana came from.

⚠️ **Figma update:** sparks.ds's header ("header-autopartshub" → "Sparks") no longer has the back button, but the Sparks → "Sparks" screen (1:2) still shows it: its header needs the library update.

## The start page

What Dana sees, top to bottom:

~~1. A greeting: "Hi Dana, what problem do you want to solve?"~~
~~2. A line that sets expectations: "Describe it in your own words. Rough is fine: we'll shape it together."~~
~~3. The message box ("The message box"), with the placeholder "Describe a problem or an idea…".~~
~~4. A few starters she can select to fill the message box, for example "Customers keep buying parts that don't fit their car."~~

1. ~~A title, "Turn your ideas into live experiences", and a line under it: "Start with a problem. Sparks helps you shape it into a prototype you can test."~~ ~~A title: "Start with a problem. Sparks helps you shape it into a prototype you can test."~~ ~~A title: "Turn problems into testable prototypes."~~ A title: "Turn ideas into testable prototypes." Nothing under it.
2. ~~Three tabs~~ On the same row as the title, on the right: a search button and "New idea", whichever tab is open.
3. Three tabs: "Your ideas" (selected when the page opens), "Shared with you" and "Archive".
4. The open tab's concepts, most recently edited first, under the column names "Idea", "Share with", "Created", "Evaluation" and "Status".

~~1. Her concepts ("Your concepts"), most recently edited first, with a search button and "New idea" above the list.~~ ~~✅ **Resolved:** "Your ideas" holds her concepts. Each concept is a row: a preview of its prototype (a tile in one of the Sparks logo's colors until it has one), its name, one line on the problem, who can see it ("Only you", "You and 3 others"), when it was last edited ("2 hr ago", "Yesterday") and where it is. Where it is: the step it's on, "Waiting for a decision", "Advanced" or "Stopped" (the last three with their date, as in "Advanced · Nov 12"). Selecting a row opens the concept where she left off.~~

✅ **Resolved:** a concept she starts from "New idea" joins "Your ideas" ~~as soon as she has sent her first message~~ ~~as soon as it's created~~ once it's named: when Sparks names it from the problem she described, or she names it herself. While it's still "New idea", it isn't in the list; once in, it stays. First in the list (most recently edited): its name, her first message as its line ("No problem described yet.", muted, if she named it before describing it), who can see it, created, Evaluate's result once it has one, and the step it's on (or "Waiting for a decision", "Advanced"). Selecting it opens it where she left it, with its conversation. ℹ️ In the Storybook prototype, ~~the demo concept is kept for the browser tab (closing the tab starts the demo over; starting another from "New idea" replaces it)~~ the list starts without it, and it shows once she has created it and goes back with "All ideas"; opening the start page any other way (from the home, or reloading it) starts the demo over, and starting another from "New idea" replaces it; its prototype versions, Evaluate runs and review progress aren't kept, only the step and the conversation. Why (once named): an idea is worth listing once its problem is defined and it has a name to find it by; a list of "New idea" rows left empty would be clutter.

✅ **Resolved:** "Your ideas" holds her concepts. Each concept is a row: a preview of its prototype (a tile in one of the Sparks logo's colors until it has one), its name, one line on the problem, who can see it ("Only you", "You and 3 others"), when it was created ("2 hr ago", "Yesterday", "Nov 3, 2026"), Evaluate's last result and where it is. The list stays sorted by the last edit, most recent first. Evaluate's result: the share of scenarios that worked in the last finished run ("83%"), "Failed" when the last run failed ([sparks-validate.md](sparks-validate.md), "A run failed"), "Not run" before Evaluate has run. Where it is: the step it's on (on Review, "In review"), "Waiting for a decision", "Advanced" or "Stopped" (the last three with their date, as in "Advanced · Nov 12"). Selecting a row opens the concept where she left off.

**Reopening it:** the conversation is as she left it: nothing streams or thinks again. It fades in at its top (Sparks's introduction), then glides down until its end (the latest question and its replies) sits in the middle of the view; any scroll, click or key stops it. Reduced motion: at its end at once.

✅ **Resolved:** a concept reopened fades in at the top of its conversation, then glides to its end, in the middle of the view. Why: she sees what's there on the way down and lands on the question waiting for her, with room under it, instead of the conversation replaying or jumping.

**"…" on each row** (on its right, subtle until the row is hovered, then the icon color; its name, "More actions", in a tooltip): Open, Duplicate, Archive, then, after a line, Delete, in the destructive color.

- **Open:** opens it, as selecting the row does.
- **Duplicate:** a copy, hers ("Only you"), named "{name} (copy)", first in "Your ideas".
- **Archive:** moves it to Archive. In Archive, "Unarchive" moves it back to "Your ideas".
- **Delete:** asks first: "Delete "{name}"?", "It's gone, with its conversation, prototype and evaluation. You can't undo this." (shared: "It's gone for you and everyone you shared it with, …"), with "Cancel" and "Delete". Then it's gone.
- **Shared with you:** Open and Duplicate only: it isn't hers to archive or delete.

✅ **Resolved:** each row has a "…" menu with Open, Duplicate, Archive and Delete. Why: managing her ideas from the list, without opening each one; Delete asks first, since it can't be undone.

⚠️ **Gap:** in the demo, Duplicate, Archive and Delete last until the start page opens again. What a duplicate copies (the conversation, the prototype and its versions, the evaluation; not who it's shared with or the reviews) isn't decided.

✅ **Resolved:** once Review has put the idea together, the row shows where it stands, as the badge in its header does ("Where an idea stands"): "Ready to publish", "In review", then the decision's statuses. A draft still shows the step it's on.

✅ **Resolved:** an idea on Review reads "In review" in the list, not the step's name ~~"Review"~~. The step in the header stays "Review".

~~✅ **Resolved:** rows don't show the evidence status ("Simulation supports hypothesis"), only where the concept is. The evidence status shows inside the concept.~~ ✅ **Resolved:** rows show Evaluate's result as the share of scenarios that worked, not the evidence status: the evidence status, with its method, shows inside the concept, where it can be read with what it rests on.
~~2. Concepts shared with her ("Shared with you"), when there are any, with the same details; who can see it reads "Shared by" and the person's name.~~ ✅ **Resolved:** "Shared with you" is a tab: concepts others shared with her, with the same details; who can see it reads "Shared by" and the person's name. "Archive" holds the concepts she archived, with the same details, out of "Your ideas".

~~Sending the message creates a new concept and opens it on Plan, with her message as the first one in the conversation. Sparks names the concept from what she wrote, and she can rename it at any time. Selecting a starter fills the message box with it, for her to edit or send.~~

~~"New idea" also creates a new concept on Plan, with an empty conversation: Sparks opens by asking what problem she wants to solve.~~ ~~✅ **Resolved:** "New idea" is the only way to start a concept from the start page. It creates a new concept and opens it on Plan, with an empty conversation: Sparks opens by asking what problem she wants to solve. Her first message is the first one in the conversation; Sparks names the concept from it, and she can rename it at any time. Until then, the header reads "New concept".~~ ✅ **Resolved:** "New idea" is the only way to start a concept from the start page. It creates a new concept and opens it on Plan, where Sparks introduces itself in a few lines, says she decides, and asks what problem she wants to solve ("Sparks's introduction"). Her answer is her first message; Sparks names the concept from it, and she can rename it at any time. Until then, the header reads ~~"New concept"~~ "New idea".

✅ **Resolved:** a new concept's header reads "New idea" until Sparks names it, the same words as the button that created it.

✅ **Resolved:** her name wins. Once she renames a concept, Sparks naming it later doesn't replace her name: Sparks's name ("New idea" before it names it) becomes the concept's default name. While her name is shown, ~~the menu on the name offers "Use default name", which goes back to the default name; it isn't offered otherwise~~ ~~hovering the name shows an undo arrow on its right~~ ~~an undo arrow stays on the name's right~~ while she edits the name, an undo arrow on its right, "Use default name", goes back to the default name; it isn't shown otherwise. ✅ **Resolved:** "Use default name" shows only while the name is being edited. Why: outside editing, the arrow beside every renamed idea's name was noise; the way back is where she changes the name. ✅ **Resolved:** in the field, the arrow comes as soon as the name differs from Sparks's, as she types, not only once she has saved a new one, and goes if she types Sparks's name back. Why: a name she's changing is a changed name; the way back should be there while she changes it. Any change of name rolls into place in the header (the old one up and out, the new one up from below).

~~With no concepts yet, "Your concepts" doesn't show. The greeting, the message box and the starters are the whole page.~~ ~~✅ **Resolved:** with no concepts yet, "Your concepts" shows an empty state: "No concepts yet", "Start with a problem you want to solve. Sparks helps you shape it into something you can test." and "New idea".~~ ✅ **Resolved:** a tab with nothing in it shows an empty state under search and "New idea":

- "Your ideas": "No ideas yet" and "Select “New idea” and tell Sparks about a problem you want to solve."
- "Shared with you": "Nothing shared with you yet" and "When someone shares an idea with you, it'll show up here."
- "Archive": "Nothing archived yet" and "Ideas you archive show up here, out of your list."

~~✅ **Resolved:** the start page combines both designs: the greeting, the message box and the starters on top, so starting a concept stays one message away; then Figma's concept list as "Your concepts", with search, "New idea", and rows that show who can see each concept, when it was last edited and where it is.~~ ~~✅ **Resolved:** the start page is Figma's concept list only: "Your concepts", with search, "New idea" and rows that show who can see each concept, when it was last edited and where it is, then "Shared with you". No greeting, message box or starters: Dana describes her problem in the workspace, after "New idea".~~ ✅ **Resolved:** the start page follows Sparks → "Sparks" (1:2): the title, the tabs, search and "New idea", then the rows. No greeting, message box or starters: Dana describes her problem in the workspace, after "New idea".

⚠️ **Assumption:** search filters the open tab by name and problem as Dana types. It isn't designed yet; the button shows but does nothing in the build.

~~⚠️ **Assumption:** the labels' colors: the step name is blue, "Waiting for a decision" amber, "Advanced" green, "Stopped" gray.~~ ✅ **Resolved:** one color per step: Plan purple, Prototype sky, Evaluate yellow, Review blue (an idea on Review reads "In review", purple, as in its header: "Where an idea stands"); "Waiting for a decision" orange-red, "Advanced" green, "Stopped" gray. Plan, Prototype, waiting and advanced follow Sparks → "Sparks" (1:2); Evaluate and Review aren't in Figma yet.

⚠️ **Assumption:** "Archive" holds concepts Dana archived herself, out of her list. How she archives one (and brings it back) isn't designed yet. Also in Open Questions.

~~⚠️ **Assumption:** the line under the title. Figma has a {description} placeholder there.~~ ~~✅ **Resolved:** the start page has one line at the top, the title "Start with a problem. Sparks helps you shape it into a prototype you can test.", and no line under it.~~ ~~✅ **Resolved:** the start page has one line at the top, the title "Turn problems into testable prototypes.", and no line under it.~~ ✅ **Resolved:** the start page has one line at the top, the title "Turn ideas into testable prototypes.", and no line under it. It matches the page's words ("Your ideas", "New idea"). Why: one short line says what Sparks does, instead of a slogan plus an explanation.

⚠️ **Figma update:** "Sparks" (1:2) still has "Turn your ideas into live experiences" as the title, with a {description} line under it, and no empty states for the tabs. Its labels read "In progress" and "Approved", which aren't Sparks statuses: they're the step name and "Advanced" here.

ℹ️ Built as `SparksStartPage` (`src/layouts/autopartshub/sparks/start-page/`); the labels are `Badge` (`src/components/data-display/badge`).

## The concept workspace

Every step happens in the same workspace. ~~The conversation comes first:~~ The conversation comes first, in every step but Evaluate:

- ~~**The header:** a back button to the start page, the Sparks symbol (the "S"), which goes back to the start page, the concept's name, the four steps in the middle with the current one marked and each one's state ("Steps"), the "Concept" button and Dana's avatar, who has access (up to three overlapping avatars, Dana first, only once she has invited someone) beside "Share", "Comments" (a dot when there are new ones), notifications, and a close button (×). From Review on the start, "Share" shows too ("Sharing a concept").~~
- **The header:** ~~the Sparks logo, which goes back to the start page, then~~ a back button ("All ideas", back to the start page), then the concept's name (larger, ~~24px~~ ~~20px semibold~~ ~~20px bold~~ 24px bold on a 30px line, with a dotted underline) ~~with a menu: "Rename" (the name becomes a field: Enter saves, Esc cancels), "Use default name" once she has renamed it, and "All ideas" (back to the start page)~~: selecting it renames it (the text cursor over it; the name becomes editable in place, with no box ~~and the caret at its end~~ and the whole name selected, so typing replaces it: Enter saves, Esc cancels), and once she has renamed it, ~~hovering it shows~~ "Use default name" (an undo arrow) ~~stays on its right~~ shows on its right while she edits it; after the name, a badge with where the idea stands ("Where an idea stands"); the four steps in the middle with the current one marked and each one's state ("Steps"); on the right "Library" (a folder, "The idea's library"), "Comments" (a dot when there are new ones), notifications, ~~who has access (up to three overlapping avatars, Dana first, only once she has invited someone) beside~~ "Share" (who has access is in its popover)~~, and "Blueprint", which opens the Blueprint panel~~, then, on Review only, "Publish" last ("Share and Publish"). No "Blueprint" button: once Plan is done, Plan shows the finished plan ("The finished plan"). No logo, no close button, ~~no back button,~~ no avatar.

  ✅ **Resolved:** the way back is a back button before the concept's name, and the name itself is selected to rename it, with no menu (sparks.ds "Sparks Project", 39:1598). Why: going back and renaming are one step each, not hidden in a menu.

  ✅ **Resolved:** the rename field opens with the whole name selected, so typing replaces it; an arrow key keeps it and moves the caret. Why: renaming usually means a new name.

  ✅ **Resolved:** the concept's header has no Sparks logo: the concept's name leads it, at ~~24px~~ ~~20px bold~~ ~~20px semibold~~ 24px bold (sparks.ds "Sparks Project", 32:1145). "All ideas" in the name's menu is the way back to the start page.

  ✅ **Resolved:** the concept's header follows sparks.ds "header-autopartshub" → "Sparks Project" (32:1145): the Sparks logo in place of the symbol, a menu on the concept's name, "Comments" and notifications first on the right, then who has access with "Share"~~, then "Blueprint" last, Share and Blueprint each with an icon~~, with an icon (Figma's "Blueprint" button isn't used: "The finished plan"). The × is gone; "All ideas" in the name's menu does what it did. What the name's menu holds isn't in Figma: Sparks picked Rename and All concepts.

  ✅ **Resolved:** the concept's header ~~shows who has access beside "Share", and~~ shows "Comments" and notifications before the close button (sparks.ds "header-autopartshub" → "Sparks Project", 32:1145). ~~The start page's header has "Comments" before notifications and the avatar.~~ The start page has no "Comments" ("New comments", below). ~~⚠️ **Gap:** what "Comments" and notifications open isn't designed; they do nothing yet. In the demo, the dot shows from Review on, when reviewers' feedback comes in.~~ "Comments" opens the Comments panel, in the Concept panel's place (one at a time): the reviewers' feedback, each reviewer with what they evaluate, where they are (invited, opened, commented) and their view with why, and how many have given their view; before Review, "No comments yet". ~~Its dot shows while there's feedback she hasn't opened, and opening the panel clears it.~~ A reviewer who has commented or given their view opens their comment (with "All comments" to go back): what they wrote, their view and why, or that their view is still to come. Each shows the unread dot while their latest feedback is new, a comment, then their view, and opening it marks it read; "Comments" shows the dot while any is unread. Notifications open the popover every AutoPartsHUB header has ([autopartshub-home.md](autopartshub-home.md), "The header"). ✅ **Resolved:** no avatars beside "Share" in the concept's header (sparks.ds "Sparks Project", 32:1145). Who has access is listed in Share's popover.

  **New comments.** Comments belong to an idea, so "Comments" is only in an idea's header, never on the start page. Comments others leave while Dana is away are one notification per idea, with how many there are and who wrote them: "3 new comments on Fit check before checkout", "Priya Shah, Marcus Lee and Ana Silva" ("1 new comment on…" for one). Selecting it, in any header's notifications, opens the idea on the step it's on with the Comments panel open, and marks the notification read. Each new comment shows the unread dot in the panel until she opens it, there or on its pin; "Comments" in the header shows the dot while any is unread. Opened from its row instead, the idea has the same dots, with the panel closed.

  ✅ **Resolved:** no "Comments" on the start page; new comments are counted in a notification for each idea, which opens it with Comments open. Why: outside an idea, "Comments" had nothing to open, and one notification per comment would fill the list.

  ⚠️ **Figma update:** sparks.ds's header ("header-autopartshub" → "Sparks", 32:1146) still has Comments.

  ✅ **Resolved:** the Comments panel lists the reviewers' comments on parts of the idea under "On the idea", newest first (who, their team, when, "On "What it needs to be built"", the text and "Unclear"), and in each reviewer's comment; each reviewer shows "1 comment on the idea · 1 open on the prototype". Selecting one, from any step, opens Review with that part brought to the top of the idea for review and marked for a moment.

  ✅ **Resolved:** the Comments panel lists the reviewers' comments on the prototype too, with their team, under "On the prototype" (open ones first, then "Resolved (n)") and in each reviewer's comment, and each reviewer shows "1 open comment on the prototype". Selecting one, from any step, opens Prototype with its thread open on its pin, to reply or resolve ([sparks-prototype.md](sparks-prototype.md), "Commenting on it").

  ✅ **Resolved:** the Comments panel also lists Dana's comments on the prototype ([sparks-prototype.md](sparks-prototype.md), "Commenting on it"), under "On the prototype", newest first, after the reviewers: who, when, where (the audience, the device, what she clicked, e.g. "Customer · Phone · "Add your vehicle""), and the comment. While the prototype is on screen, selecting one shows its audience and device and opens its pin; otherwise they're only listed. The panel is 480px wide in every step, as the plan panel. With nothing in either list: "No comments yet. Comments you add on the prototype, and reviewers' feedback in Review, show up here."

  ✅ **Resolved:** "Comments" opens a panel with the reviewers' feedback, the same list as Review's. ✅ **Resolved:** the Comments panel is a column on the right edge, the screen's full height (the header and everything else narrow beside it), ~~480px,~~ 380px wide to start; she widens or narrows it by dragging its left edge (or with the arrow keys on it), from 300px up to half the window, and it keeps that width when she closes and opens it again, as Sparks "Plan summary" (63:12460): a soft gray with a line on its left, "Comments" and an X to close at the top, then its sections ("Reviewers", "On the idea", "On the prototype"), each titled in 18px semibold, with a line and 24px between them. Why: it reads as a panel of the concept, not a card inside one step's view. ⚠️ **Gap:** comments from people she shared the concept with ("Can comment") aren't simulated yet; answering a comment isn't designed. The current step is a blue pill, in the Sparks logo's blue; the other steps are gray, and a step she hasn't reached yet has lighter text ~~and can't be selected~~ and can still be selected, to see what it is ("Moving through the steps").
- **The conversation with Sparks, centered.** Where Dana does her work: she describes, answers, reacts and asks. Her messages show on the right, as she wrote them, line breaks included. What Sparks drafts shows as cards in the conversation ("Cards in the conversation"). The message box sits at the bottom and reads "Message Sparks…" ("The message box"). ~~When she sends, the conversation scrolls so Sparks's answer starts at the top of the view, and the answer comes in below it;~~ When she sends, the conversation scrolls so her message sits at the top of the view, and Sparks's answer comes in right below it; the view doesn't chase the end of the text, so she reads from the start. ~~As the answer grows, the view follows it until its end reaches the middle of the view, then keeps it there, so she reads at eye level and never has to scroll after it. Scrolling herself stops it.~~ When she scrolls down a long answer herself, the scroll stops once its end reaches the middle of the view: it never goes past. Before the answer, Sparks shows it's thinking: a dot hopping through the Sparks logo's colors, and what it's working through, a line at a time, in the language of the shop ("Popping the hood on support cases…", "Running the numbers on sales and returns…"), never just "Thinking…".

  ~~✅ **Resolved:** the view follows a growing answer until its end reaches the middle of the view (it used to stay put, leaving the end of a long answer at the bottom edge). Her message still goes to the top first.~~ ~~✅ **Resolved:** the automatic scroll only brings her message to the top; it doesn't follow the answer.~~ ✅ **Resolved:** the automatic scroll brings her message to the top; it doesn't follow the answer while it comes in. Once Sparks's reply is done, if it ends with something to do (a card's answers, or the quick replies under it) that's below the view, the conversation scrolls once, only as far as needed, so they're in view, 32px above the message box. Why: a long reply (a summary, the divider and the next section's first question) left the next question and its answers out of sight. If she scrolls herself meanwhile, it stops. Scrolling down by hand, the end of the answer can come up to the middle of the view and no further.

  ✅ **Resolved:** Sparks's thinking state (Figma: Sparks, 27:1932): the dot hops and takes the next logo color each time it lands; the line has ~~the logo's tangerine-to-sapphire gradient moving across it~~ the logo's colors moving across it, rotating through all six in the logo's order, like the dot; each line shows about 1.5 seconds, so the wait grows with what Sparks works through. The lines say what it's doing, in automotive terms, since Dana works for a parts retailer.
- ~~**The Concept panel,** only when Dana opens it ("The Blueprint panel").~~ ~~**On Plan, once Plan is done,** the Blueprint shows beside the conversation, in the prototype's place.~~ **On Plan, once Plan is done,** the plan shows as a document, on its own; the conversation comes back in edit mode ("The finished plan").
- **In Prototype,** the prototype shows beside the conversation, large enough to use ([sparks-prototype.md](sparks-prototype.md), "Trying it").
- **In Evaluate,** there's no conversation and no message box: the prototype, with Sparks's scenarios working it, and the evaluation sit side by side, each half the width ([sparks-validate.md](sparks-validate.md), "Evaluate's screen"; Figma Sparks "Evaluate", 72:660). The conversation is still there when she goes back to another step.
- **In Review,** there's no conversation either: the idea for review, with its next step, and the final prototype sit side by side ([sparks-review.md](sparks-review.md), "Review's screen").

✅ **Resolved:** Evaluate has no conversation: the prototype and the evaluation are side by side. Why: in Evaluate, the prototype is what's being tested, so it stays in view, and the results said everything Sparks's reply would.

~~✅ **Resolved:** when Dana sends a message, the conversation scrolls up so Sparks's answer starts at the top of the view. Why: she reads each answer from its first line, the way it's written, without the text moving under her eyes.~~ ✅ **Resolved:** when Dana sends a message, the conversation scrolls up so her message sits at the top of the view, with Sparks's answer right below it. Why: she sees what she said next to what it answers, and reads the answer from its first line without the text moving under her eyes.

~~✅ **Resolved:** a concept opens in its own tab, from "New idea" or a row on the start page. The × in its header closes that tab, and the start page is still open in the tab she came from. The concept's header has no back button and no avatar (sparks.ds "header-autopartshub" → "Sparks Project", node 39:1598). Why: like Sparks itself opening from the AutoPartsHUB home, each concept is a place she works in, kept apart from the list; closing it is the way back.~~

✅ **Resolved:** a concept opens in the same tab, from "New idea" or a row on the start page. ~~The Sparks symbol (later logo) before the concept's name goes back to the start page, and so does the × (it closes the concept).~~ ~~"All ideas" in the menu on the concept's name goes back to the start page.~~ The back button before the concept's name ("All ideas") goes back to the start page. The concept's header has ~~no back button and~~ no avatar (Sparks → "Sparks Project", node 27:1932). Sparks itself still opens in its own tab from the AutoPartsHUB home ("Reaching Sparks").

ℹ️ The header is built as `AppHeader` with `StepNav` for the steps (`src/components/navigation/`), from sparks.ds "header-autopartshub" → "Sparks Project".

✅ **Resolved:** the current step is marked with the Sparks blue (as in Sparks → "Sparks Project"), not the dark pill of sparks.ds's header component, and steps not reached yet have lighter text.

⚠️ **Figma update:** ~~"Sparks Project" doesn't have the "Concept" button yet, and~~ the step pills show only the current step, without the Done, Skipped and Needs a check marks ("Step states"). sparks.ds's "header-autopartshub" component still draws the current step dark, with dark text on every step.

ℹ️ The workspace is built as `SparksWorkspace` (`src/layouts/autopartshub/sparks/workspace/`): the header, Sparks's introduction, Dana's messages and the message box. Plan's Problem part is built, one thing at a time, with its suggestion cards and the Problem summary ([sparks-plan-problem.md](sparks-plan-problem.md)); the later replies and cards aren't designed yet.

ℹ️ Dana's messages are built as `UserMessage` (`src/components/chat/user-message`), from sparks.ds "user-message".

### Where an idea stands

A badge after the concept's name in the header, in every step, says where the idea stands with the teams:

1. **Draft** (gray): she's working on it, in Plan, Prototype or Evaluate, or while Review puts it together.
2. **Ready to publish** (yellow): Review has put it together and it isn't published yet.
3. **In review** (purple, as in sparks.ds "Sparks Project"): she published it; it's with the teams until she asks for a decision. How far each team is shows in Review.
4. Then the decision's statuses ("Decision status"): **Waiting for a decision** (orange-red), **Advanced** or **Stopped**, with the date ("Advanced · Nov 12").

~~3. **Published** (sky): she published it; no team has opened it yet. 4. **Waiting for feedback** (blue): the teams have opened it and their feedback is coming in. 5. **In review**: every team has given its view; she weighs them and sends her recommendation.~~

The idea's status covers all its paths: decided or waiting for a decision on any path, then in review once any path is published. The start page's rows show the step for a draft (the header has the steps already), then the same labels and colors.

~~✅ **Resolved:** the header shows where the idea stands, as a badge after its name: Draft, Ready to publish, Published, Waiting for feedback, In review, then the decision's statuses. "In review" covers the time between the last view and her recommendation, which none of the four describes, and matches the start page's "In review".~~ ✅ **Resolved:** the header shows where the idea stands, as a badge after its name: Draft, Ready to publish, In review, then the decision's statuses. Once published, it's "In review" until she asks for a decision: no "Published" or "Waiting for feedback". Why: the badge says where the idea is, not how far each team is; Review shows that, and a status that changes every time a team opens it is noise.

### The idea's library

Everything Dana gave the idea, in one place: "Library", a folder in the header, before "Comments". It opens a panel on the right edge, the same as Comments'; one panel at a time.

- **When it shows:** always, in every step. ~~Once there's something in it (the first file she attaches, or the first link), in every step from then on.~~ With nothing in it: "Nothing here yet. Files, links and notes you give Sparks show up here, or add them above."

  ✅ **Resolved:** "Library" is always in the header, even with nothing in it. ~~It shows once Dana has given the idea something.~~
- **What's in it,** each once: **Files** she attached in any message; **Links** in her messages, and the live app's address once she has confirmed it; **Notes** she typed as supporting material.
- **Adding:** "Add files" (the file picker) and "Paste a link"; "Add" shows only once what she typed is a link. Sparks doesn't reply: it's kept, marked as hers.
- **Removing:** "Remove" on each item takes it away at once, with "Undo". The conversation keeps what was said; "What you added" in the Problem summary follows the library. What she attaches, sends or adds again comes back.
- **The live app** can't be removed here: it's an answer in Plan, changed there ("The app this improves. Change it in Plan.").
- **From the conversation,** the folder bounces as what she sent lands in it (a file, a link, notes, the app's address), so she sees where it went. It doesn't for what she adds in the panel.
- **Opening:** a link opens in its own tab. An image opens in a dialog in the middle of the screen, as large as the window allows, with its name on top; the X, Esc or a click outside closes it.

✅ **Resolved:** what Dana gives the idea has its own panel, where she adds more and removes. Why: files and links get lost up the conversation, and she may attach the wrong one.

⚠️ **Gap:** only images open from the panel (other files don't, nor images once the idea is closed and opened again), and Sparks doesn't read what she adds: the demo keeps only their names ([sparks-plan-problem.md](sparks-plan-problem.md), "Supporting material"). What she adds or removes in the panel isn't kept when she closes the idea and opens it again.

⚠️ **Decision needed:** "Library" is the idea's and "My library" (the AutoPartsHUB home) is hers across ideas. The names are close. ~~And "Add from library" could add to this panel.~~ ("Add from library" does now.)

#### Adding from My library

"Add from library", in the message box's "+" menu, opens a dialog with everything in My library, newest first: each file, link and note with its icon, name, what's under it (a file's type and size, a link's address, the start of a note) and when it was added.

- **Searching:** a field on top, ready to type in, looks in names, types ("pdf", "link", "note"), addresses and notes, as she types. Nothing found: "Nothing matches "{what she typed}"", with "Clear search".
- **Picking:** as many as she wants, also across searches; "{n} selected" says how many. What's in the idea already is checked, says "Added" and can't be picked.
- **"Add to idea"** (disabled until she picks something; Enter does it too) sends them: her bubble lists them by name, each with its icon, they're in the idea's Library (the folder bounces), and she's back in the message box, with what she'd typed. ~~Sparks doesn't reply, as with "Add files";~~ Sparks answers as with files sent on their own: "Thanks, I've added … to this idea, marked as yours.", back to the question that's waiting. Files waiting in the message box go with them. When Sparks asked for supporting material, they're her answer ([sparks-plan-problem.md](sparks-plan-problem.md), "Supporting material"). In the Library, a link or a note added this way shows its name. On Plan, "What you added" in the Problem summary includes them. Cancel, the X, Esc or a click outside adds nothing.
- **Nothing in My library:** "Nothing in your library yet".

✅ **Resolved:** what she adds shows in the conversation, from the "+" menu or from Sparks's question. Why: it's the same action in both places, and she sees what Sparks has.

✅ **Resolved:** "Add from library" is a dialog in the idea, not a trip to the AutoPartsHUB home. Why: she finds and adds what she needs without leaving the idea; the home had no way to add to it.

### Sparks's introduction

Every concept's conversation starts with Sparks introducing itself, so Dana knows what she's starting before she writes anything. It's there as soon as "New idea" opens the concept, and it stays at the top of the conversation.

> Hi Dana, I'm Sparks. Together we'll turn your idea into a prototype you can test before anything gets built. I draft, you decide. Everything is saved as you go.
>
> We start with Plan: we'll define the problem, agree on what success looks like, and choose the direction to prototype. Then I'll build it, test it, and help you take it to the teams who decide.

~~Before: "Hi Dana, I'm Sparks. Together we'll turn a problem you've noticed into a prototype you can test, before it reaches your developers. I draft, you decide: nothing goes into your concept until you approve it. Everything is saved as you go."~~
>
> **What problem do you want to solve?**<br>
> Describe it in your own words, the way you'd tell a colleague. Rough is fine.

- **Short and clear, not a tutorial.** ~~Three things: what Sparks does with her, that she decides, and the question.~~ Four things: what she'll end up with, where she starts and what comes after (Plan's three parts in one line, then the later steps in one line), that she decides, and the question. Nothing to click through or dismiss. ~~The four steps in a line each.~~ ~~The steps aren't explained here: the header shows them, and Sparks says what each one does when she gets to it.~~ Each step's details still come when she gets to it.
- ~~**Sets expectations honestly.** It makes clear that nothing is built until she has chosen a direction, that Evaluate is simulated and doesn't replace real customers, and that the product lead decides, not Sparks.~~ **Sets expectations honestly:** what she'll end up with (a prototype she can test before developers), and that nothing goes into her concept without her approval. That Evaluate is simulated, and who decides, is said in Evaluate and Review.
- **Written in as it appears,** a few words at a time, the way Sparks's replies arrive. When a concept she's already started reopens, it's simply there. If she starts typing and sends before it's finished, the rest shows at once.
- **Ends with the question** that starts Plan, in bold, with how to answer it on the line below in regular text. The message box is ready for her answer, with nothing to select first. From her answer on, Sparks guides her with one question at a time, asking only what company knowledge can't answer ([sparks-plan-problem.md](sparks-plan-problem.md), [sparks-plan-clarify.md](sparks-plan-clarify.md)).

~~✅ **Resolved:** when a concept starts, Sparks introduces itself in one short message: what Sparks does, the four steps and what to expect from each, that Dana decides, and the question "What problem do you want to solve?". Why: Dana isn't a designer and is opening a new tool; without it she can't know there are four steps, that nothing gets built before Plan is done, or that she stays in control.~~ ✅ **Resolved:** when a concept starts, Sparks introduces itself in a few lines: what it does with her, that she decides, and the question "What problem do you want to solve?". It doesn't list the four steps. Why: simple and clear first; the header already shows the steps, and each step's own explanation comes when she reaches it.

✅ **Resolved:** the introduction says where Dana starts and what she'll do: Plan first (define the problem, agree on what success looks like, choose the direction to prototype), then Sparks builds it, tests it and helps her take it to the teams who decide. Simple and confident, one line each, without explaining every step. Why: knowing where she starts and what's ahead lets her answer the first question with confidence; the header's steps alone don't say what happens in them.

~~✅ **Resolved:** the steps show as lines with their names in bold, not as a numbered list, and the question is bold with "Describe it in your own words…" on its own line below. Why: the steps are an overview, not instructions to follow in order, and the question is what Dana has to act on.~~ ✅ **Resolved:** the question is bold, with "Describe it in your own words…" on its own line below. Why: the question is what Dana has to act on.

✅ **Resolved:** "I draft, you decide. Everything is saved as you go." ends the first paragraph instead of being a paragraph of its own. Why: it goes with what Sparks and she do together, and the introduction reads shorter.

⚠️ **Assumption:** every new concept starts with the full introduction, including for people who've done a concept before. A shorter one for returning users isn't designed. Also in Open Questions.

ℹ️ Built as `AssistantMessage` (`src/components/chat/assistant-message`) in `SparksWorkspace`: plain text on the page, no bubble, so it reads apart from Dana's messages on the right. sparks.ds has no design for Sparks's messages yet.

### Cards in the conversation

When Sparks drafts something Dana should look at (the problem, the brief, the success criteria, the directions, the comparison, the chosen direction, the evaluation's results), it shows it as a card in the conversation, where they're talking about it.

- Each statement on a card shows where it came from ("Suggestions"), and assumptions are labeled.
- Dana accepts, edits or dismisses on the card, part by part, or just replies in the conversation.
- What she approves goes into her concept automatically. She never copies or writes anything up.

  ~~✅ **Resolved:** Sparks confirms each save in bold, at the start of its reply: "**Done. The problem is in your blueprint.**"~~ ✅ **Resolved:** Sparks confirms each save in regular text, ~~at the start of its reply~~ ("Done. The problem is in your plan."; after a Plan summary, all three, at the summary's end, above the divider), and the bold line after it, on its own with the space of a new section above it, names what comes next: "**Now, let's understand it better and clarify a few things.**", ~~"**Here's how I'll test it:**"~~ "**Here's what I did:**", "**Next, Evaluate.**", ~~"**Now, let's build "Fit check before you buy".**"~~ "**Here's what I built:**" (a build starts with its progress alone, [sparks-prototype.md](sparks-prototype.md), "Building it"). Why: the bold leads Dana to what she does next, not to what's finished. A confirmation with nothing after it ("Done. It's under "What comes later" in your plan…") stays regular. The same for every step's confirmation (the problem, ~~what we know,~~ Plan finished, the prototype, Evaluate finished, an item under "What comes later"). ~~Why: it's the moment something becomes part of her concept, and it should stand out from the rest of the reply.~~ Confirmations of a change to the prototype ("Done: …") stay plain: the change itself is the news. ~~After what we know, Sparks doesn't confirm: it opens Success with "**Now, let's define what success looks like.**", in bold the same way~~ After what we know, Sparks confirms the same way ("Done. What we know is in your plan."), and Success opens with its bold line, "**Now, let's define what success looks like.**", under the divider ([sparks-plan-define-success.md](sparks-plan-define-success.md)). After what success looks like, the confirmation is regular ("Done. What success looks like is in your plan.") and the bold line is the next part's title, "**Next, pick the path to prototype first.**" ([sparks-plan-generate-directions.md](sparks-plan-generate-directions.md)): one bold line per reply.

- **Each summary card has a plain name and one line on what it's for,** so Dana can tell the cards apart at a glance: ~~"The problem" ("What we're solving, in a few lines. Everything after this builds on it."),~~ "What we know" ("What the data says, what you told me, and what we still need to check.") and ~~"Success criteria"~~ "What success looks like" ("How we'll know it worked, agreed before we look at any solutions."). A card doesn't repeat what an earlier card already holds. Where a statement comes from reads the same on every card: "Suggested by Sparks · from customer intelligence", "From business performance, Aug–Oct 2026" (company data, with its period), "From you", "From your message", "Edited by you" or "Sparks's guess".

- **No cards for summaries.** Every Plan summary (the problem, what we know, what success looks like, what we'll build) is part of Sparks's reply, with no card around it: a bold line introducing it ("**Here's what we know so far:**"), a short conversational paragraph, a bulleted list where it helps (with a bold lead-in on each line when the items are different kinds of thing), each fact's source in brackets ("(business performance, Aug–Oct 2026)", "(from you)"), anything unproven said in words ("That's my guess for now, so it's an assumption."), then one sources line under it ("From business performance, previous experiments, customer intelligence, product ecosystem, you and engineering context."). The approval question follows, and Sparks's next reply says it's in her concept. ~~The names and lines above, "Draft" and "In your concept" badges, and per-part source labels~~ no longer show; the spec keeps the section names.

- **A summary is approved with its buttons, not a question.** After each Plan summary, Sparks asks nothing: the buttons say what they do, ~~"Looks right, continue" (approves it, puts it in the concept and moves on) and "Not quite" (asks what's off). The same on all four summaries.~~ The three that end a section (the problem, what we know, what success looks like) have no button: the summary goes in the plan, a divider ends the section and Sparks goes on by itself, in the same reply. She changes a summary by changing one of her answers (its pencil); what she types then answers the question that follows. "What we'll build" has "Build it" and "Not quite".

  ~~✅ **Resolved:** "Continue" ends a section and isn't kept in the conversation.~~ ✅ **Resolved:** no button after a summary that ends a section: Sparks goes on by itself. Why: Dana has already confirmed each answer in the summary; a click to continue is a stop that decides nothing. "Build it" stays, as her message: it's a real decision.

- **A zigzag divider separates Plan's sections.** After the summary, a thin zigzag line draws across the conversation's text, left to right (at once, with reduced motion); then Sparks thinks and replies below it. No name on it: the bold line that follows says what's next. Only between finished sections, nowhere else. The view stays on the summary, so she can read it; if the divider would land just below the view, it moves only enough to show it and the line under it.

  ✅ **Resolved:** a divider between Plan's sections. Why: Plan is one long conversation, and a bold line alone didn't show where a section ended. ~~✅ **Resolved:** it names the section that starts.~~ ✅ **Resolved:** the divider has no name on it. Why: the bold line right under it already says what comes next.

  ✅ **Resolved:** no question after a summary (~~"Does this capture the problem?", "Does this look right?", "Ready to look at ways to get there?", "Ready for me to build it?"~~), and ~~one approval label everywhere: "Looks right, continue"~~ (~~"Looks right", "Yes, let's see them", "Yes, build it"~~). Why: the question repeated what the buttons already say~~, and one label tells Dana it approves and moves on~~. Questions that ask her to choose (~~"Want to go with …?",~~ "Ready for me to put it through its paces?") stay. The directions are chosen on their cards ("Generate prototype"), with no question.

  ✅ **Resolved:** no cards for Plan's summaries: each is conversational text in Sparks's reply. Why: a card of labeled parts reads as a form to review; text reads as Sparks summing up what they agreed, and repeats less.

  ✅ **Resolved:** the summary cards are named for what Dana gets from them, not for the document they become ("The problem", "What we know", "What success looks like"), each with a line on what it's for; the brief no longer repeats who it affects; company data reads "From …", not "Evidence · …". Why: "Problem" and "Problem brief" looked like the same thing twice, and she was approving some lines a second time. The spec keeps its section names (the Problem section, the Problem brief, the success criteria).

### The finished plan

Plan is the conversation it was built in, before and after it's done. It has no other name: on screen and in what Sparks says, it's "your plan".

- **While Plan is in progress:** only the conversation. What Dana approves goes into the plan in the background, and Sparks says so ("Done. The problem is in your plan.").
- **Once Plan is done** (Prototype reached), selecting Plan shows the same conversation, centered, with the message box, exactly as she built it: Sparks's questions and her answers, the summaries, and the direction cards with their actions at the bottom ("Generate prototype", "Open prototype"). Nothing beside it, no document, no "Edit plan", no versions.
- **She changes it by changing an answer** ("Changing an answer"): a pencil on each of her answers to Sparks's questions.
- **No panel, no header button.** There's no "Blueprint" button and no side panel for the plan; the way to it is Plan in the steps. "Comments" keeps its panel, the screen's full height on the right edge, 380px wide to start and resizable.
- **The other steps keep their own views.** The prototype, the evaluation and the idea for review stay in their steps; Plan doesn't summarize where they stand.
- **Paths.** The direction cards in Plan's conversation keep their actions: "Open prototype" once a direction is built, or "Generate prototype", which opens Prototype and builds it as another path at once, in Prototype's conversation, with no "Build it?" ([sparks-plan-compare.md](sparks-plan-compare.md), "Directions in the plan"; [sparks-prototype.md](sparks-prototype.md), "Paths").

✅ **Resolved:** Plan stays the conversation once it's done; there's no plan document. Dana sees exactly what she experienced building the plan, and changes it the same way, by answering again. Why: a view that changed format after "Generate prototype" was another thing to learn, and editing summaries as a document asked her to rewrite what Sparks had drafted from her answers; for the demo, fewer moving parts.


~~Plan is one thing that changes view: a conversation while it's in progress, a document once it's done. It has no other name: on screen and in what Sparks says, it's "your plan".~~

- ~~**While Plan is in progress:** only the conversation. What Dana approves goes into the plan in the background, and Sparks says so ("Done. The problem is in your plan.").~~
- ~~**Once Plan is done** (Prototype reached), selecting Plan shows the plan as a document, on its own: no conversation and no message box. Above it, only its buttons on the right: "Edit plan", "Versions ({n})" and "Jump to a section". No title.~~
- ~~**Edit mode.** "Edit plan" brings the conversation back on the left and lets her type in Plan's four summaries; the button becomes "Done", which hides the conversation again. The conversation also comes back on its own when Sparks says something about the plan: its answer to an edit, "Build it?" for another path, or going back to the choice. Selecting another step leaves edit mode.~~
- ~~**No panel, no header button.** There's no "Blueprint" button and no side panel for the plan; the way to it is Plan in the steps. "Comments" keeps its 480px side panel, which opens beside the plan too.~~
- ~~**The spec, not copies of the other steps.** It shows Plan's sections and "What we built" (the prototype's spec: its screens, what's pretend, what the real thing would need, what departs from the design system). The evaluation and the review stay in their own steps' panels; the plan has "Where it stands", one line per later step reached (the prototype's version, Evaluate's last run and its read, Review's status or decision), each with "Open", which goes to that step.~~
- ~~**Paths.** "Directions" lists every direction Sparks proposed, each with "Open prototype" once it's built, or "Generate prototype", which builds it as another path after Sparks confirms in the conversation ([sparks-plan-compare.md](sparks-plan-compare.md), "Directions in the plan"; [sparks-prototype.md](sparks-prototype.md), "Paths"). "Go back to the choice" brings her to Plan, with the directions in the conversation and in the plan.~~
- ~~It shows only the sections reached so far. A section that may no longer fit shows a warning mark, with the reason.~~
- ~~"Jump to a section" lists the sections; picking one scrolls the plan to it and focuses its heading.~~
- ~~**Editing, like a document.** In edit mode, Dana selects any of Plan's four summaries (the problem, what we know, what success looks like, what we'll build) and types in it, as in Google Docs: no form. Leaving it saves it. The headings stay fixed; the directions, "What we built", "Where it stands" and "Decisions" aren't edited there. Her text replaces Sparks's summary from then on, and its sources line says "Edited by you." Pasted text comes in plain.~~
- ~~**Editing reopens Plan.** Sparks reads each edit, so she doesn't have to say what it affects:~~
  - ~~**Only the wording** (a typo, a rephrasing): nothing else changes. No message in the conversation; the change is a new version and an entry in Decisions ("Reworded the problem").~~
  - ~~**What it means** (a number such as the target, a "not", or a real change of content): Sparks answers in the conversation, under a "Plan" divider when it was on a later step: "Got it. Your change to what success looks like is in your plan, and I'll work from it from now on.", says what may no longer fit ("The prototype was built for the earlier version of what success looks like, and Evaluate's last run measured against it."), and offers: "**Want me to update the prototype to match?**", with "Yes, update it" and "Not now".~~
  - ~~**"Yes, update it":** Prototype opens and the prototype is saved as a new version that matches the plan ("Done. The prototype matches your plan again. I've saved it as version 4."). Sparks never updates it without her yes.~~
  - ~~**"Not now":** nothing changes. Until the prototype matches again, it shows a note: "Built from an earlier version of the plan: you've since changed what success looks like.", with "Update prototype" ([sparks-prototype.md](sparks-prototype.md), "When the plan changes"). "Where it stands" says it too, for the prototype and for Evaluate's last run.~~
  - ~~Changing the direction isn't an edit: it goes through the directions ("Generate prototype", "Go back to the choice").~~
- ~~**Versions.** "Versions ({n})", the same menu as the prototype's, lists every version of the plan, newest first, each named for what changed ("Plan finished", "Changed what success looks like", "Reworded the problem", "Restored version 1"), the current one marked "Current" and every other with "Restore". Restoring saves it again as the newest; nothing is lost. When the restored version means something different from the one she had, Sparks makes the same offer to update the prototype.~~

~~✅ **Resolved:** no "Blueprint": it's all Plan. The plan is the same thing before and after it's done; only the view changes, from a conversation to a document. Once it's done, the document shows on its own, and the conversation comes back only in edit mode. Why: a second name for the same thing made it look like something else (as "idea" and "concept" did); and a finished plan is for reading, so the conversation beside it only competed with it. It comes back when she changes the plan, which is when Sparks has something to say.~~

~~✅ **Resolved:** the plan keeps the spec and one line per later step, not full copies of the evaluation and the review. Why: those have their own panels in their steps; repeating them made it long and showed the same thing in two places. "What we built" stays: what's pretend and what the real thing would need is spec, and the Prototype step's panel is the prototype itself.~~

~~✅ **Resolved:** the finished plan is a document Dana edits in place, and editing it reopens Plan. Sparks decides what an edit affects (only the wording, or what it means); after a change in meaning it offers to update the prototype and builds only on her yes; while the prototype doesn't match the plan, it says so. The plan keeps every version, with restore. Why: once Plan is done, the document is where she looks at her plan, so it's where she changes it; and she shouldn't have to judge what a change breaks.~~

~~⚠️ **Gap:** the steps don't show "Needs a check" marks yet (the note on the prototype and "Where it stands" say it instead); comments on selected text in the plan aren't built (Comments lists the prototype's and the reviewers'); an edit isn't kept when the concept is reopened from the start page (the demo's saved session keeps the conversation only); and when she edits a part again before answering Sparks's offer, Sparks makes the offer again.~~

~~ℹ️ Built as `PlanDocument` (`src/layouts/autopartshub/sparks/workspace/plan-document.tsx`), not in Figma yet. `SparksWorkspace` shows it as the preview on Plan once a later step is reached (unless the story passes another preview), with the conversation column hidden (`conversationHidden`, kept mounted) unless edit mode is on (`editingPlan`, which a new reply from Sparks on Plan turns on). The same frame as the evaluation and the idea for review (`rounded-card bg-background-subtle p-4`), with only its buttons on the right ("Edit plan"/"Done", the outlined button with an icon, as "Share"; "Versions ({n})"; "Jump to a section"), then a white page that scrolls, its sections in a 720px column, 40px apart with a line between them. Sections, in order:~~

- ~~**Plan's:** "The problem", "What we know" and "What success looks like", each once she approves it; "Directions", as soon as Sparks shows them: every direction, with its idea, effect, effort and risk, marked "Chosen", "Recommended" and "Your idea", and its action; and "What we'll build", once she approves it. The problem, what we know, what success looks like and what we'll build show the same summaries as the conversation, in smaller text, from the latest version of each (after a correction, the corrected one).~~
- ~~**"What we built"** ([sparks-prototype.md](sparks-prototype.md), "The Prototype section"), once the prototype is built, with "Try it".~~
- ~~**"Where it stands"** (`PlanSteps`): Prototype ("Version 3: Fit message names the vehicle first."), Evaluate ("Run 2 on version 3: Ready for review. Simulation supports hypothesis.", "Not run yet.", "Skipped: the hypothesis isn't tested."), Review ("In review: 2 of 4 views in.", "Advanced, by …"), each with "Open".~~
- ~~**Decisions:** last, newest first ("The decision log").~~

~~✅ **Resolved:** Plan's sections show the same summaries Dana approved in the conversation, so the plan never words a decision differently from what she approved. The directions are listed compactly, since the full cards are for choosing, not for the record.~~

The plan, before it became Plan's document, shown on its own:

~~The record of everything decided: the concept's spec, organized by what it's about (the problem, what we know, success criteria, the directions, what we'll build and its hypothesis, what we built), where each later step stands, and "Decisions" ("The decision log").~~

- ~~**Plan is a conversation; once it's done, Plan is the Blueprint.** While Plan is in progress there's only the conversation: what Dana approves goes into the Blueprint in the background, and Sparks says so ("Done. The problem is in your blueprint."). Once Plan is done (Prototype reached), selecting Plan shows the Blueprint beside the conversation, in the place the prototype takes in Prototype, the evaluation in Evaluate and the idea for review in Review. Every step then works the same way: the conversation on the left, what the step produced on the right.~~
- ~~**No panel, no header button.** It opens only from "Blueprint" in the header There's no "Blueprint" button and no Blueprint side panel; the way to it is Plan in the steps. "Comments" keeps its 480px side panel, which opens beside the Blueprint too.~~
- ~~**The spec, not copies of the other steps.** It shows Plan's sections and "What we built" (the prototype's spec: its screens, what's pretend, what the real thing would need, what departs from the design system). The evaluation and the review stay in their own steps' panels; the Blueprint has "Where it stands", one line per later step reached (the prototype's version, Evaluate's last run and its read, Review's status or decision), each with "Open", which goes to that step.~~
- ~~**Paths.** "Directions" lists every direction Sparks proposed, each with "Open prototype" once it's built, or "Generate prototype", which builds it as another path after Sparks confirms ([sparks-plan-compare.md](sparks-plan-compare.md), "Directions in the blueprint"; [sparks-prototype.md](sparks-prototype.md), "Paths"). "Go back to the choice" brings her to Plan, with the directions in the conversation and in the Blueprint.~~
- ~~It shows only the sections reached so far. A section that may no longer fit shows a warning mark, with the reason.~~
- ~~"Jump to a section", on the right of its title, lists the sections; picking one scrolls the Blueprint to it and focuses its heading.~~
- ~~**Editing:** small changes (a word, a number, such as the target) can be made in the Blueprint; Sparks confirms each one in the conversation, uses it from then on, and marks any later step that may no longer fit Needs a check ("Moving through the steps"). Bigger changes (a different problem, another direction) go through Sparks in the conversation, so what depends on them stays consistent. "Decisions" can't be edited.~~
- ~~**Editing, like a document.** Dana selects any of Plan's four summaries (the problem, what we know, what success looks like, what we'll build) and types in it, as in Google Docs: no "Edit" button, no form. Leaving it saves it. The headings stay fixed; the directions, "What we built", "Where it stands" and "Decisions" aren't edited there. Her text replaces Sparks's summary from then on, and its sources line says "Edited by you." Pasted text comes in plain.~~
- ~~**Editing reopens Plan.** Sparks reads each edit, so she doesn't have to say what it affects:~~
  - ~~**Only the wording** (a typo, a rephrasing): nothing else changes. No message in the conversation; the change is a new version and an entry in Decisions ("Reworded the problem").~~
  - ~~**What it means** (a number such as the target, a "not", or a real change of content): Sparks answers in the conversation, under a "Plan" divider when it was on a later step: "Got it. Your change to what success looks like is in your blueprint, and I'll work from it from now on.", says what may no longer fit ("The prototype was built for the earlier version of what success looks like, and Evaluate's last run measured against it."), and offers: "**Want me to update the prototype to match?**", with "Yes, update it" and "Not now".~~
  - ~~**"Yes, update it":** Prototype opens and the prototype is saved as a new version that matches the blueprint ("Done. The prototype matches your blueprint again. I've saved it as version 4."). Sparks never updates it without her yes.~~
  - ~~**"Not now":** nothing changes. Until the prototype matches again, it shows a note: "Built from an earlier blueprint: you've since changed what success looks like.", with "Update prototype" ([sparks-prototype.md](sparks-prototype.md), "When the blueprint changes"). "Where it stands" says it too, for the prototype and for Evaluate's last run.~~
  - ~~Changing the direction isn't an edit: it goes through the directions ("Generate prototype", "Go back to the choice").~~
- ~~**Versions.** "Versions ({n})", the same menu as the prototype's, lists every version of the Blueprint, newest first, each named for what changed ("Plan finished", "Changed what success looks like", "Reworded the problem", "Restored version 1"), the current one marked "Current" and every other with "Restore". Restoring saves it again as the newest; nothing is lost. When the restored version means something different from the one she had, Sparks makes the same offer to update the prototype.~~

~~✅ **Resolved:** Plan becomes the Blueprint once it's done, and the Blueprint panel and its header button are gone. Why: Plan was the only step with nothing of its own beside the conversation, so selecting it from Prototype or Evaluate only took the panel away and left the same conversation, still showing what came after Plan. Plan's output is the spec, so that's what Plan shows; the conversation stays one conversation ("Steps in the conversation").~~

~~✅ **Resolved:** the Blueprint keeps the spec and one line per later step, not full copies of the evaluation and the review. Why: those have their own panels in their steps; repeating them made the Blueprint long and showed the same thing in two places. "What we built" stays: what's pretend and what the real thing would need is spec, and the Prototype step's panel is the prototype itself.~~

~~⚠️ **Gap:** nothing in the Blueprint can be edited yet, and a section that may no longer fit doesn't show its warning mark yet.~~

~~✅ **Resolved:** the Blueprint is a document Dana edits in place, and editing it reopens Plan. Sparks decides what an edit affects (only the wording, or what it means); after a change in meaning it offers to update the prototype and builds only on her yes; while the prototype doesn't match the blueprint, it says so. The Blueprint keeps every version, with restore. Why: once Plan is done, the Blueprint is where she looks at her plan, so it's where she changes it; and she shouldn't have to judge what a change breaks.~~

~~⚠️ **Gap:** the steps don't show "Needs a check" marks yet (the note on the prototype and "Where it stands" say it instead); comments on selected text in the Blueprint aren't built (Comments lists the prototype's and the reviewers'); an edit isn't kept when the concept is reopened from the start page (the demo's saved session keeps the conversation only); and when she edits a part again before answering Sparks's offer, Sparks makes the offer again.~~

~~ℹ️ Built as `Blueprint` (`src/layouts/autopartshub/sparks/workspace/blueprint.tsx`), not in Figma yet: `SparksWorkspace` shows it as the preview on Plan once a later step is reached (unless the story passes another preview). The same frame as the evaluation and the idea for review (`rounded-card bg-background-subtle p-4`, "Blueprint" lg semibold with "What you've decided so far. Sparks keeps it up to date." "What you've decided so far. Select any part of Plan to change it." under it, "Versions ({n})" and "Jump to a section" on the right), then a white page that scrolls, its sections in a 720px column, 40px apart with a line between them. Sections, in order:~~

- ~~**Plan's:** "The problem", "What we know" and "What success looks like", each once she approves it; "Directions", as soon as Sparks shows them: every direction, with its idea, effect, effort and risk, marked "Chosen", "Recommended" and "Your idea", and its action; and "What we'll build", once she approves it. The problem, what we know, what success looks like and what we'll build show the same summaries as the conversation, in smaller text, from the latest version of each (after a correction, the corrected one).~~
- ~~**"What we built"** ([sparks-prototype.md](sparks-prototype.md), "The Prototype section"), once the prototype is built, with "Try it".~~
- ~~**"Where it stands"** (`BlueprintSteps`): Prototype ("Version 3: Fit message names the vehicle first."), Evaluate ("Run 2 on version 3: Ready for review. Simulation supports hypothesis.", "Not run yet.", "Skipped: the hypothesis isn't tested."), Review ("In review: 2 of 4 views in.", "Advanced, by …"), each with "Open".~~
- ~~**Decisions:** last, newest first ("The decision log").~~

~~✅ **Resolved:** Plan's sections show the same summaries Dana approved in the conversation, so the Blueprint never words a decision differently from what she approved. The directions are listed compactly, since the full cards are for choosing, not for the record.~~

The plan panel, before Plan became the plan:

~~A summary of everything decided in the conversation: the concept's full spec, organized by what it's about (the problem, the brief, success criteria, directions, the chosen direction and its hypothesis, the prototype, the evaluation, the reviews), plus "Decisions" ("The decision log").~~

- ~~It opens from "Concept" in the header, as a side panel beside the conversation, and closes the same way, with its close button or with Esc. It opens on its own when its first section arrives (the problem, as Dana approves it), and from "Blueprint" in the header. It opens only from "Blueprint" in the header, once there's a section to show, as a 480px panel on the right in every step; with no preview, the conversation stays centered beside it. It closes with its close button, "Concept" "Blueprint" again or Esc, and stays closed until she opens it again.~~

  ~~✅ **Resolved:** the panel and its header button are named "Blueprint" (sparks.ds "Sparks Project", 32:1145), and Sparks's confirmations say "in your blueprint" ("Done. The problem is in your blueprint."). "Concept" still names the idea: the start page's list, sharing, notifications, Review's "should this concept advance". Why: the panel is the structured definition Sparks builds from what Dana approves, and "Blueprint" says that; the idea it describes can still be early, or stopped in Review.~~
- ~~It never opens on its own and never interrupts the conversation. It never interrupts the conversation: opening on its own doesn't move her focus or stop what Sparks is saying. It never opens on its own and never interrupts the conversation.~~

  ~~✅ **Resolved:** the Blueprint panel is closed by default again: it opens only from "Blueprint", and it's 480px wide in every step (as Comments), so the conversation stays centered in Plan instead of moving to a narrow column on the left.~~

  ~~✅ **Resolved:** the Concept panel is open by default. It opens on its own the first time there's something in it, and a concept that already has sections opens with it, except beside a preview (Prototype, Evaluate, Review), where the prototype comes first and "Blueprint" opens it. In Plan, open, it takes the space beside the conversation, which moves to a narrower column on the left (Sparks → "Sparks Project", 55:7660). Why: the concept filling in as she approves is what shows her the conversation is producing something; a closed panel behind a button hid it.~~
- ~~It's available in every step. In Prototype, Evaluate and Review, it's the context behind what Dana is looking at.~~
- ~~She can read and edit it at any time, except "Decisions". An edit there is something Sparks knows about and builds on, kept in sync with the conversation and the prototype; she doesn't need to repeat it in the conversation.~~
- ~~It shows only the sections reached so far. A section that may no longer fit shows a warning mark, with the reason.~~
- ~~"Jump to a section", next to its close button, lists the sections reached so far under their step; picking one scrolls the panel to it.~~
- ~~The directions are in it as soon as Sparks shows them, each with an action, the same as on its card in the conversation: "Generate prototype" (before Plan is done it picks the direction it picks the direction and builds it at once: Prototype opens and the conversation goes on there; after, another path in the prototype, after Sparks confirms) or "Open prototype" ([sparks-plan-compare.md](sparks-plan-compare.md), "Directions in the blueprint"; [sparks-prototype.md](sparks-prototype.md), "Paths").~~

  ~~✅ **Resolved:** the panel's menu button (Sparks → "Sparks Project", 55:7660) jumps to a section. Why: by Review the concept is long, and she should get to the part she's thinking about without scrolling through the rest.~~

~~ℹ️ Built as `ConceptPanel` (`src/layouts/autopartshub/sparks/workspace/concept-panel.tsx`), Figma Sparks → "Sparks Project" (55:7660): "Concept" "Blueprint" shows in the header, the same outlined button as "Share", last on the right, once there's a section to show; the panel, headed "Your concept" "Concept" "Blueprint", opens on its own then. In Plan it takes the space on the right, and the conversation moves to a column on the left; beside a preview it opens on the right of the prototype. opens from it, 480px on the right in every step: in Plan beside the centered conversation, otherwise on the right of the preview. It slides in (fades, with reduced motion). Opened from "Blueprint", it takes focus. Its close button, "Blueprint" again, or Esc inside it closes it, and focus goes back to "Blueprint".~~

~~What it shows, as built, grouped by step under the step's name (Plan, Prototype):~~

- ~~**Plan:** "The problem", "What we know" and "What success looks like", each once she approves it; "Directions", once she picks one: every direction Sparks proposed, with its idea, effect, effort and risk, marked "Chosen", "Recommended" and "Your idea"; and "What we'll build", once she approves it. The problem, what we know, what success looks like and what we'll build show the same summaries as the conversation, in smaller text, from the latest version of each (after a correction, the corrected one).~~
- ~~**Prototype:** "What we built" ([sparks-prototype.md](sparks-prototype.md), "The Prototype section").~~
- ~~**Evaluate:** "The evaluation", once a run starts, or "Skipped" when she went to Review without it ([sparks-validate.md](sparks-validate.md), "The Evaluation section").~~
- ~~**Review:** "The review", once Review opens ([sparks-review.md](sparks-review.md), "The Review section").~~

~~Each section after Plan's has a way to the full view beside the conversation: "Try it", "See the results", "See it".~~

~~✅ **Resolved:** the panel groups its sections by step, and Plan's sections show the same summaries Dana approved in the conversation, so the panel never words a decision differently from what she approved. The directions are listed compactly, since the full cards are for choosing, not for the record.~~

- ~~**Decisions:** last, under no step, newest first ("The decision log").~~

~~⚠️ **Gap:** a section that may no longer fit doesn't show its warning mark yet, and nothing in the panel can be edited yet.~~


~~✅ **Resolved:** Dana works with Sparks through a conversation next to a spec panel, not a form-like wizard or a conversation alone. The conversation keeps the experience friendly and lets her think out loud; the spec keeps the decisions visible, editable and in one place, so nothing she decided gets lost in the conversation.~~ ✅ **Resolved:** conversation-first, with the spec on demand. The conversation stays centered as Dana's main workspace; Sparks shows its drafts and the decisions as cards in it, and builds the concept's spec in the background as she approves them. ~~The full spec opens from "Concept" in the header, as a dismissible side panel that never opens on its own.~~ ~~Once Plan is done, the full spec is Plan's panel, the Blueprint.~~ Once Plan is done, the full spec is the plan itself, shown as a document ("The finished plan"). Why: it keeps Dana focused on her idea while Sparks handles the structure and documentation, and nothing she decided gets lost in the conversation.


### Changing an answer

Each of Dana's answers to a question Sparks asked on a card (the problem, Clarify's questions, Success's) shows a pencil inside her bubble, after the answer, while Plan's conversation is on screen. Its tooltip says "Change answer". Her first message, ~~a summary's "Looks right, continue"~~ "Build it" and a direction picked with "Generate prototype" have none.

- **The question opens again where it was asked.** Her bubble makes way for it: "Changing your answer" on the left (with her words, when she answered in them: 'Changing your answer: "…"'), "Keep my answer" on the right, then the card as Sparks first asked it, Sparks's answer and its replies, the one she picked before with a check.
- **Picking another reply** changes her answer ("Repeat purchases instead", "I'm not sure"). **"Not quite"** folds the card to its question and readies the message box ("Type your new answer…", with Sparks's answer on offer with Tab); what she sends is her new answer, in her words. Editing the answer on the card (the pen) and saving it does the same. Typing in the message box while the card is open also answers it.
- **"Keep my answer"**, Esc, or picking the answer she had changes nothing. After "Not quite", Esc opens the card again. Focus goes back to the pencil.
- **One at a time.** While she changes an answer, the latest question's replies hide, so only one set of replies (and Enter) is active. Selecting another step closes it.
- **What it changes:** her bubble says the new answer, and the summary that answer feeds is drafted again from her answers (the problem, what we know or what success looks like; a changed target also updates "What we'll build"), approved as it was. Sparks's replies in between stay as they were said.
- **Once there's a prototype**, Sparks answers at the end of Plan's conversation: "Got it. I've updated what success looks like with your new answer, and I'll work from it from now on.", what may no longer fit ("The prototype was built for the earlier version of what success looks like."), and "**Want me to update the prototype to match?**", with "Yes, update it" and "Not now":
  - **"Yes, update it":** Prototype opens and the prototype is saved as a new version that matches the plan ("Done. The prototype matches your plan again. I've saved it as version 4."). Sparks never updates it without her yes.
  - **"Not now":** nothing changes. Until the prototype matches again, it shows a note: "Built from an earlier version of the plan: you've since changed what success looks like.", with "Update prototype" ([sparks-prototype.md](sparks-prototype.md), "When the plan changes").
- **Before there's a prototype**, Sparks says nothing: the summary updates in place and Plan goes on where it was.
- Changing the direction isn't changing an answer: it goes through the direction cards ("Generate prototype", "Go back to the choice").

✅ **Resolved:** Dana changes the plan by changing her answers, with a pencil on each, not by editing a document. The question reopens as it was asked, with what she picked marked, and "Keep my answer" to back out; her new answer updates the summary it feeds, and once there's a prototype Sparks offers to update it, building only on her yes. Why: it's the way she built the plan in the first place, so there's nothing new to learn, and Sparks keeps drafting the summaries from her answers.

⚠️ **Gap:** Sparks's replies between the changed answer and the end aren't redone (one may still acknowledge the old answer); a later answer that depended on it (the target, after changing the main measure) isn't asked again; and a change isn't kept when the concept is reopened from the start page beyond what the conversation keeps.

ℹ️ Built in `SparksWorkspace` (`onAnswerChange`; the card shown again is `ChangingAnswer`, `ClarificationCard` with `selectedReply`), with the story doing what a change does (`changeAnswer` in `workspace.stories.tsx`). Not in Figma yet; the interaction follows archie-ucl's "Change answer".
### The message box

The same message box everywhere Dana talks to Sparks: every step of the workspace.

- **Type or paste,** any length. It grows with the text, then scrolls. Enter sends; Shift+Enter starts a new line.
- ~~**"+" (Attach files):** documents, PDFs, spreadsheets and images ([sparks-plan-problem.md](sparks-plan-problem.md), "Describing the problem").~~ **"+" opens a menu** (sparks.ds "select-prompt-add"): ~~"Attach"~~ "Attach files" (documents, PDFs, spreadsheets and images, [sparks-plan-problem.md](sparks-plan-problem.md), "Describing the problem"), ~~"Screenshot"~~ "Add from library" (~~opens "My library" on the AutoPartsHUB home, in its own tab, so the concept stays open; when the home's tab is already open, it goes back to it, on "My library", instead of opening another~~ a dialog to search My library and add from it, "Adding from My library"), ~~"Connect"~~ "Add a connection", and, after a line, "Initial prompt", which puts the demo's first message in the box ("Too many people buying online get parts that don't fit their car…"), ready to send or edit, with the caret at the end, then "Add Plan", while Plan isn't done: it fills Plan's conversation from her first message to the directions, as if she'd answered every question with Sparks's suggestion, shown whole (no thinking or typing), and the view glides from the introduction down to the directions, so the filled-in Plan goes by, ending with "Next, pick the path to prototype first." at the top of the view (not the success summary before it in the same reply), so the demo can start at the choice. Last, "Reset prototype", at any time, starts the demo over: a new idea on Plan, with Sparks's introduction, and the idea she started is gone from "Your ideas". "Go to Review", before them, jumps to Review with the idea put together, ready to publish. ~~"See what the teams see" opens the page reviewers get from the invitation (the published idea), in its own tab, from any step.~~ Closing the menu puts her back in the box.

  ✅ **Resolved:** "Attach files" and "Add a connection", not "Attach" and "Connect": each says what it adds. "Reset prototype" exists so the demo can start over without going back to the start page. "Go to Review" ~~and "See what the teams see"~~ exists so the demo can show Review ~~and the reviewers' page~~ without going through every step first. ⚠️ **Figma update:** sparks.ds "select-prompt-add" has the old names.

  ✅ **Resolved:** the "+" menu has no "See what the teams see". The reviewers' page opens from Publish: the idea's address, or the review link in the invitation ("View invite email").

  ✅ **Resolved:** "+" opens a menu instead of attaching straight away. "Initial prompt" exists so the demo can start without typing Dana's first message. ✅ **Resolved:** "Add Plan" opens with "Next, pick the path to prototype first." at the top: a conversation opened with history starts at the last section of its latest reply. ✅ **Resolved:** after "Add Plan", the view glides there from the introduction instead of jumping, so Dana sees Plan fill in; a concept reopened still opens there at once. ✅ **Resolved:** "Add Plan" exists so the demo can skip to choosing a direction; what it fills in can still be changed with the pencils ("Changing an answer"). ~~⚠️ **Gap:** "Attach" and "Connect" don't do anything yet.~~ ✅ **Resolved:** "Attach" opens the file picker. The files show in the message box above the text, each with a remove button, and go with her next message, which needs some text, except when Sparks asked for files ([sparks-plan-problem.md](sparks-plan-problem.md), "Supporting material"). Her bubble shows their names. While files wait, Enter in the empty box doesn't answer Sparks's question. ✅ **Resolved:** "Attach files" as an answer button (Sparks asked for files) sends the files as soon as she picks them, with no step in the message box; only "+" → "Attach files" puts them in the box to go with what she types. ⚠️ **Gap:** "Add a connection" doesn't do anything yet, and the demo keeps only the files' names. ~~🙋 **Open question:** what the library holds (Dana's files, earlier concepts, company documents) and what "Connect" connects (a source of company knowledge, such as a work tracker or a data tool).~~ ~~✅ **Resolved:** "Add from library" opens "Library" ([autopartshub-home.md](autopartshub-home.md)).~~ ✅ **Resolved:** "Add from library" opens a dialog in the idea ("Adding from My library"). 🙋 **Open question:** what "Add a connection" connects (a source of company knowledge, such as a work tracker or a data tool).
- **Mic (Dictate):** what she says is written into the box, and she can edit it before sending.
- **The main button changes with what's in the box.** While it's empty, it starts a voice conversation with Sparks. As soon as she types, pastes, dictates or attaches anything, it becomes Send (an up arrow). The two icons swap with a short overlapping shrink-and-grow, so the change is noticed but not distracting.
- **Files on their own:** attached files can be sent with no text, at any time. Sparks keeps them ("Thanks, I've added "returns.pdf" to this idea, marked as yours.") and goes back to what it was waiting for: the question card comes under its thanks, still open, with its answers; before her description, it asks for it again. Files never answer a question.

  ✅ **Resolved:** attaching a file turns the main button into Send, and files can go with no text. Why: with a file waiting, a voice button reads as if the file couldn't be sent.
- The box's border is light while it's empty and turns to the full accent color when she's typing or it holds text.

✅ **Resolved:** Sparks offers both dictation (the mic) and a voice conversation (the main button while the box is empty). The main button becomes Send as soon as there's anything in the box.

⚠️ **Gap:** the voice conversation itself isn't designed: what Sparks says out loud, how the conversation shows on screen, how Dana ends it, and how what was said lands in her concept. Also in Open Questions.

ℹ️ Built as `PromptComposer` (`src/components/chat/prompt-composer`), from sparks.ds "prompt-composer".

## Steps

Four steps: **Plan, Prototype, Evaluate and Review.** They show Dana where she is and how far she's come; they aren't a process she has to follow. Sparks guides her through them in the conversation, and she can go back to any of them.

| Step | Sparks | Dana | Adds to the concept |
| --- | --- | --- | --- |
| Plan | Turns her idea into a clear problem, asks only what company knowledge can't answer, proposes success criteria, generates two to four directions ~~with visual previews~~, explains the trade-offs, recommends one and drafts the hypothesis | Describes the problem, answers what she can, chooses the main measure, goes with Sparks's pick or picks another, and approves what we'll build | The problem, the problem brief, the success criteria, the directions, and the chosen direction with its hypothesis |
| Prototype | Builds a clickable prototype of the chosen direction, or another testable artifact when it isn't mainly software, with AutoParts Co.'s design system and synthetic data | Tries it, asks for changes in plain words or by pointing at something | The prototype, what's pretend, and what the real thing would need |
| Evaluate | Runs a scenario-based AI evaluation against business data, engineering context, the design system and previous experiments. Reports potential risks, assumptions and usability concerns, and whether the evidence supports the hypothesis, clearly apart from real-user testing | Reviews the findings, decides whether to go ahead or keep improving | The evaluation, its findings and the evidence status |
| Review | Prepares the concept for review, suggests the UX team, engineering and the departments involved, summarizes their feedback and proposes fixes, and drafts a recommendation (advance, iterate or stop) | Shares it, answers feedback, and submits her recommendation to the decision owner | The reviews, the recommendation and the decision |

✅ **Resolved:** the third step is named "Evaluate", not "Validate" (on screen, in what Sparks says and in the PRDs; the code keeps `validate` as the step's id, and its PRD stays [sparks-validate.md](sparks-validate.md)). Why: in this step, AI agents with the profiles of different customers and store staff evaluate the prototype; "Validate" promised proof that only real people can give.

The three phases are the idea behind the steps, not labels on screen: Plan explores the problem and its solutions, Prototype and Evaluate experiment with one of them, and Review decides whether it deserves execution. Nothing before Review commits AutoParts Co. to building anything.

ℹ️ Each step's detail (what Sparks asks, what its sections contain, its states) is in its own PRD: Plan's in one PRD per part ("Plan"), then [Prototype](sparks-prototype.md), [Evaluate](sparks-validate.md) and [Review](sparks-review.md). This PRD owns only what every step shares.

~~✅ **Resolved:** the steps are grouped into three phases: Explore, Experiment and Advance. They make clear where exploring ends and product development begins: nothing in Explore or Experiment commits AutoParts Co. to building anything.~~ ✅ **Resolved:** Sparks shows four steps: Plan, Prototype, Evaluate and Review. Plan combines what were five steps (Problem, Clarify, Define success, Generate directions, Compare) into one AI-guided conversation. Dana doesn't need to understand or navigate the design activities underneath; Sparks handles them. The steps give her orientation and progress, not barriers. The three phases (Explore, Experiment, Advance) stay as the idea behind the steps, not as labels in the navigation.

✅ **Resolved:** success criteria and the hypothesis are kept apart. The success criteria say which business outcome to improve, without any solution. The hypothesis, written once Dana chooses a direction, says what she believes that solution will achieve. Evaluate says what the evidence says about that belief. This stops Dana from committing to a solution before she understands the problem.

~~✅ **Resolved:** Evaluate is a simulated evaluation run by AI agents against AutoParts Co.'s data and resources, not testing with people Dana shares the prototype with.~~ ✅ **Resolved:** Evaluate is a scenario-based AI evaluation against AutoParts Co.'s data and resources. It doesn't present simulated personas as real research participants. Its results are potential risks, assumptions and usability concerns, clearly told apart from real-user validation. It lets Dana check her concept on her own, in minutes, before anyone else sees it.

~~✅ **Resolved:** the last step is called "Handoff".~~ ~~✅ **Resolved:** the last step is called "Review and decide". It can end in Advance, Iterate or Stop, so it isn't only a handoff.~~ ✅ **Resolved:** the last step is called "Review", one word like the other three. It can end in Advance, Iterate or Stop, so it isn't only a handoff. Not "Preview": "Review" reads both as the step and as what happens in it (the teams review the idea, then it's decided), and it matches "In review"; "Preview" would cover only the moment before publishing, and already names other things (Plan's preview, "View invite email").

⚠️ **Risk:** an AI evaluation explores possible outcomes under assumptions; it doesn't observe people. Its evidence is always labeled with its method, its confidence is capped ("Evidence and decisions"), and Sparks recommends real-user testing before implementation ([sparks-validate.md](sparks-validate.md), "What only real people can tell us").

### Plan

One conversation, in five parts. Dana doesn't navigate them: Sparks moves from one to the next as she approves each, and each adds its section to her concept.

1. **The problem** ([sparks-plan-problem.md](sparks-plan-problem.md)): Dana describes it in her own words. Sparks restates it as a problem statement, separates it from any solution she has in mind, and shows what AutoParts Co. already knows about it, including similar concepts. Then it agrees with her on the live app the idea improves and asks for anything that supports it. Adds "Problem".
2. **A few questions** ([sparks-plan-clarify.md](sparks-plan-clarify.md)): Sparks fills in what knowledge already says, then asks up to six questions only Dana can answer: what people do today, why it happens, what limits apply. Adds the "Problem brief", with evidence and assumptions labeled.
3. **Success** ([sparks-plan-define-success.md](sparks-plan-define-success.md)): Sparks proposes a goal, measures with their starting points from AutoParts Co.'s data, targets, what must not get worse and what's not part of the concept, with no solution in them. Dana chooses the one main measure. Adds "Success criteria".
4. **Directions** ([sparks-plan-generate-directions.md](sparks-plan-generate-directions.md)): Sparks proposes two to four meaningfully different ways to solve the problem, built on what AutoParts Co. already has, ~~each with a visual preview, its trade-offs and a rough effort. It doesn't rank them yet.~~ all in one reply, each with where it changes things, its effect, effort and risk in words, and its catch, and recommends one ~~: "Want to go with …?"~~ before the cards; she picks one with its card's "Generate prototype". Adds "Directions".
5. **The choice** ([sparks-plan-compare.md](sparks-plan-compare.md)): ~~Sparks sets the directions side by side, asks what matters most and recommends one. Dana chooses, confirms why, and confirms the hypothesis Sparks drafts.~~ Dana's pick becomes "What we'll build": the direction, why, what we believe, what it gives up and what to check, drafted by Sparks and approved once (~~"Ready for me to build it?"~~). Adds "Chosen direction".

How Plan moves:

- **In the conversation, not through pages.** Sparks shows each part's draft as a card. Each part ends with Sparks's question (~~"Does the problem sound right?"~~ ~~"Does this capture the problem?"~~, ~~"Does the brief look right?"~~ ~~"Does this look right?"~~, ~~"Want to go with …?"~~, ~~"Ready for me to build it?"~~; the directions end with how to pick instead: "Generate prototype" on a card). Her yes approves that part's section, and Sparks says in one line what comes next, then asks the next part's first question in the same reply: "Now let's understand it better…" followed by Clarify's first question. There are no buttons or pages between parts, and Sparks never stops at an announcement: Dana always has something to answer.

✅ **Resolved:** no "Continue" button between Plan's parts. The reply that finishes one part asks the next part's first question. Why: a button would add a stop the conversation doesn't need, and a reply that only says "I'll ask a few questions" leaves Dana not knowing whether to type or wait. Anything she types instead is added to the concept as context, and the questions go on.
- **Only what's needed, when it's needed.** Each card appears when the conversation gets to it. What she approves goes into her concept in the background; the plan shows only the sections reached so far.
- **Three things need her confirmation:** the problem, the main measure, and the chosen direction with her reason and hypothesis. Everything else Sparks drafts as suggestions she can accept, edit or leave. She can stop the questions at any time ("Let's move on"); what's unanswered becomes assumptions.
- **Building sooner.** If Dana asks to build before Plan is done ("Just build it"), Sparks doesn't send her back through a process. It finishes Plan with her in a few messages: it drafts the success criteria and asks her to confirm the main measure, generates at least two directions, shows them visually, explains the trade-offs in plain words and recommends one. She accepts it, picks another or refines her own idea, confirms the reason and hypothesis Sparks drafts, and Sparks builds. The problem still needs her approval; the brief is filled in from company knowledge, with anything unanswered labeled as an assumption. Why: Dana wants to be clear on success before anything gets built, and to explore more than one direction instead of locking in the first idea, without designing solutions or running a formal comparison herself.
- **Going back.** She can reopen any part from the plan, or by asking ("Let's revisit the success measures"). Sections after it that may no longer fit are marked, with the reason ("Moving through the steps").
- **Plan is Done** when the problem, the success criteria (the goal, and the main measure with a target) and the chosen direction with her reason and hypothesis are approved. ~~Sparks sums up and asks: "Ready for me to build a prototype you can click through?", with "Continue to Prototype".~~ Sparks shows what we'll build and asks ~~"Ready for me to build it?"~~, with ~~"Looks right, continue"~~ "Build it" ([sparks-plan-compare.md](sparks-plan-compare.md), "Finishing Plan"). If Dana reopens a part after Plan is Done (from the plan, a finding in Evaluate or an Iterate decision), Plan is In progress again until she approves that part again; later steps that are Done become Needs a check.

### Step states

| State | Means | Shown as |
| --- | --- | --- |
| Not started | Dana hasn't reached it yet | Plain |
| In progress | She's working on it | Marked as the current step |
| Done | She approved it | A check |
| Skipped | She moved past it without finishing it. Only Evaluate can be skipped | A gap mark, and "Skipped" when selected |
| Needs a check | Something earlier changed after this one was done, and it may no longer fit | A warning mark, with the reason when selected |

Inside Plan, a section of the concept that may no longer fit shows the same warning mark, with the reason.

### Moving through the steps

Sparks guides Dana along the steps in order, but doesn't force the order. It should feel like a conversation with a colleague, not a mandatory process.

- **Plan comes first.** Prototype opens once Plan is Done; if she asks to build earlier, Sparks finishes Plan with her first ("Plan"). Evaluate and Review both open once Prototype is Done. Going to Review without running Evaluate marks Evaluate Skipped.
- **The guided path:** when a step is complete, Sparks asks Dana to approve it, ~~with a button that names the next step: "Continue to Prototype"~~ with a question and its quick replies, as between Plan's parts: ~~"Ready for me to build it?"~~ (~~"Looks right, continue"~~ "Build it"), "Ready for me to put it through its paces?" ("Yes, evaluate it"). Approving marks the step Done and opens the next one, in the same conversation.
- **One button forward per step:** dark, at the top right: "Evaluate" in Prototype and "Add to Review" in Evaluate, on the step's panel; "Publish" in Review, in the header. Plan has none: it moves on in the conversation. The quick replies do the same; the button stays when they've scrolled away.

  ✅ **Resolved:** one button forward per step, at the top right. Why: the next thing to do is never hidden in the conversation, and there's only one.
- **Going anywhere:** Dana can go back to any step she's reached, from the steps, at any time. Evaluate can be skipped: going to Review without it shows Evaluate as Skipped.
- **A step not reached yet** can be selected too, at any time: ~~in place of the prototype (beside the conversation)~~ on its own, with the conversation and the message box hidden, it explains what the step is and what to expect there, under the step's illustration (a line drawing: Prototype, hands drafting with a ruler and set square; Evaluate, hands pointing at a board; Review, a light bulb between laptops), with "Back to {the step she's on}". ~~When it's the next step and it can start (Evaluate, once the prototype is built), its action comes beside it: "Evaluate the prototype", the same as "Yes, evaluate it" in the conversation; her message says "Evaluate the prototype." and Evaluate opens.~~ Once the prototype is built, Evaluate and Review can start from there ("Starting a step from its explanation", below). The step she's on doesn't change, and the conversation stays where it is; selecting her step, or the button, closes it. It's marked as the selected step while it shows.
  - **Prototype:** "Try your idea before anyone builds it". Once Plan is done, Sparks builds a clickable prototype of the direction she chooses, screen by screen, with AutoParts Co.'s design system and made-up data; she tries it there, on a phone or a desktop, and asks for changes in the conversation.
  - **Evaluate:** "See what holds up". After Prototype, ~~Sparks works the prototype through realistic scenarios for customers and store staff~~ AI agents, each with the profile of a different ~~customer or store staff member~~ person who'd use it, try the prototype in realistic scenarios, and Sparks checks it against AutoParts Co.'s data, engineering and design system; she sees what works, what to fix, and how it does against her target.
  - **Review:** "Bring in the teams who decide". Last, ~~the teams who need to weigh in (UX, Engineering, Stores) review the concept and give their view;~~ she checks what the teams will see and publishes it; those who need to weigh in (UX, Engineering, Stores) try it and give their view; then she sends her recommendation, and the decision owner decides whether it moves forward.

  **Starting a step from its explanation:** once the prototype she's on is built, Evaluate's and Review's explanations show which prototype it is, on a card, and the step's action, beside "Back to {the step she's on}":
  - **The card:** the path's name as in Prototype (~~"1. Fit check before you buy"~~ "Fit check before you buy") and its version ("Version 2"). In Review, also where it stands: "Not evaluated yet", "Being evaluated", "Evaluated" or "Changed since it was evaluated".
  - **Evaluate: "Evaluate the prototype",** the same as "Evaluate" in Prototype: her message says "Evaluate the prototype." and Evaluate opens, with the run started.
  - **Review: "Add to Review",** the same as in Evaluate: Review opens and Sparks puts the idea together. Not evaluated yet, it says so under the card: "Evaluating it first is optional, but it makes your recommendation stronger."; going on skips Evaluate, as "Go to Review instead", and in Prototype her message says "Add it to Review." with the same answer from Sparks. While a run is going, or after a change since the last run, the button is disabled and the reason shows there, the same as in Evaluate ([sparks-validate.md](sparks-validate.md), "Finishing the step").

  ✅ **Resolved:** Review's explanation says which prototype and version it's about, and has "Add to Review", and Evaluate's shows the prototype too. Why: with the prototype finished, selecting Review was a dead end, and nothing said what would be reviewed. It's "Add to Review", as in Evaluate, so the same action has one name.

  ✅ **Resolved:** each step's explanation shows its own illustration above the title, in place of an icon. Why: the drawings make each step recognizable at a glance and give the empty view some warmth.

  ✅ **Resolved:** a step not reached yet shows its explanation on its own, without the conversation, as the finished plan does. Why: there's nothing to talk about there yet; the conversation beside it read as if it were.

  ✅ **Resolved:** steps not reached yet are always selectable and explain themselves, instead of being disabled. Why: a disabled step tells Dana nothing; seeing what's ahead, and what she'll get there, makes the four steps a map rather than a locked path. The copy lives with the steps (`sparksSteps` in `shared/steps.ts`).
- **Recommendations, not rules.** Sparks suggests what to do next from the concept's state: "You haven't evaluated the prototype yet. It takes a few minutes and would make your recommendation stronger."
- **Before submitting for a decision:** Plan and Prototype must be Done, so there's a concrete, testable concept to decide on, with success criteria to decide against. Sparks also lists missing evidence, unresolved assumptions, risks and a skipped Evaluate; none of them blocks her, and every gap shows in the concept summary ([sparks-review.md](sparks-review.md), "Checking it's ready").
- **Sparks never moves on without Dana.** It can suggest moving on; only her approval does.
- **Going back:** when Dana changes an approved section, the sections after it in Plan and every later step that's Done become Needs a check. Sparks tells her what may no longer fit and suggests updates; it doesn't rewrite later sections on its own.
- **Leaving and coming back:** everything is saved as she goes. Opening the concept again returns her to the step, and the point in the conversation, where she left off.

~~✅ **Resolved:** flexible progression with required foundations. Problem is required to start; Define success is required before a concept is submitted for a decision, not before exploring; Evaluate is optional; every other step can be skipped or revisited.~~ ~~✅ **Resolved:** AI-guided exploration with minimal requirements for Dana. Problem is required to start. Before prototyping, Sparks makes sure there are success criteria and at least two meaningful directions, and recommends one; Dana accepts it, picks another or refines her idea. A prototype is required before submitting for a decision. Clarify and Evaluate are optional; skipped steps stay visible as gaps.~~ ✅ **Resolved:** AI-guided, with minimal requirements for Dana. Plan comes first, and before anything is built Sparks makes sure there are success criteria and at least two meaningful directions, and recommends one; Dana accepts it, picks another or refines her idea. A prototype is required before submitting for a decision. Plan's questions can be stopped at any time and Evaluate is optional; a skipped Evaluate stays visible as a gap. Sparks handles the complexity; Dana provides the business expertise and makes the decisions.

### Steps in the conversation

~~One conversation for the whole concept: what Sparks and Dana said in every step stays in it, in order, so Sparks keeps the context and Dana can always scroll back.~~

Each step has its own conversation. Plan shows what was said in Plan, Prototype what was said in Prototype, and so on; Plan's conversation never shows in Prototype, or the other way round. Sparks still knows everything said in every step: only what Dana sees is split.

- **A message goes with the step it's answered in.** Sparks's reply belongs to the step it came on. Dana's message goes with the reply that answers it, so the message that moves to another step starts that step's conversation: "Generate a prototype of "Fit check before you buy"." opens Prototype's, followed by what Sparks builds. The introduction opens Plan's.
- **Selecting a step shows its conversation** at its latest message. ~~A finished Plan shows the plan on its own; "Edit plan" brings Plan's conversation back at its latest message.~~ A finished Plan shows its conversation like any other step. Going back to the choice from a later step continues Plan's conversation.
- **What she sends goes at the end of the step she's on.** ~~Sent while editing the plan, it's about Plan:~~ Sent from Plan, it's about Plan: a change there brings the steps after it to Needs a check ("Moving through the steps").

✅ **Resolved:** a conversation per step instead of one conversation for the whole concept with step dividers. Why: the conversation sits beside the step's own view (the prototype, the evaluation), and Plan's cards and questions there read as if they were about it. Sparks keeps the context across steps either way.

- ~~**A divider marks each step it moves to.** When the conversation moves to another step (building the prototype, starting Evaluate, opening Review, going back to the choice in Plan), a divider with the step's name sits above Sparks's first reply there. Dana's message that moved it ("Looks right, continue") stays above the divider, in the step it was said in. Only the conversation moving makes a divider: looking at another step doesn't.~~
- ~~**Selecting a step scrolls the conversation to it.** Selecting a step she has reached scrolls the conversation to where that step last began (Plan in progress: the start of the conversation). Selecting the step the conversation is on now scrolls back to its latest message. A finished Plan shows the plan on its own; "Edit plan" brings the conversation back at its latest message.~~

~~✅ **Resolved:** one conversation with step dividers, not a separate conversation per step. Why: Sparks's answers depend on everything said before; a conversation filtered by step would hide where her next message goes and what Sparks remembers. Selecting a step moves the view to it instead.~~

ℹ️ Built: each reply from Sparks carries the step it came in (`SparksReply` `step`; without it, the same as the reply before, Plan for the first). `SparksWorkspace` shows only the messages of the step selected (Dana's with the reply that answers them) and opens another step's at its latest message. The stories stamp each new reply with the step set in the same event.

## Evidence and decisions

Two separate things, never mixed: what the evidence says about the hypothesis, and what the business decided. A concept can be advanced without evidence that supports it, and stopped even when the evidence supports it.

### Evidence status

Every piece of evidence about the hypothesis has two parts:

- **The method:** AI simulation, real-user testing, or business data analysis.
- **The outcome:** Supports hypothesis, Does not support hypothesis, Inconclusive, or Not tested.

The concept's evidence status combines them in plain words, with one line on what it means:

> **Simulation supports hypothesis**
> Based on simulated scenarios. Real-user testing is recommended before implementation.

- **Confidence depends on the method.** Evidence from AI simulation alone is never shown with high confidence; real-user testing and business data can be. Why: a simulation explores possible outcomes under assumptions; it doesn't establish that a solution works.
- **Not tested** is the status until Evaluate runs, and stays the status when Evaluate is skipped.
- Evidence from more than one method shows each one: "Simulation supports hypothesis · Real-user testing: not tested".

✅ **Resolved:** evidence is described by its method and its outcome, kept as two dimensions. Sparks never says "validated" for a simulation, so an AI evaluation can't pass as proof that a solution works.

### Decision status

Set only by the decision owner, in Review ([sparks-review.md](sparks-review.md), "The decision"):

- **Advanced:** selected for further investment or execution.
- **Stopped:** not pursued, with the reasons documented.
- **Iterate** isn't a final decision: the concept goes back to the step, or the part of Plan, the decision names.

~~"Your ideas" and a shared concept show both: "Advanced · Simulation supports hypothesis".~~ ✅ **Resolved:** a shared concept shows both: "Advanced · Simulation supports hypothesis". The start page's rows show only the decision status ("Advanced · Nov 12").

✅ **Resolved:** decision status (Advanced, Stopped) and evidence status are shown separately and never stand in for each other. Advancing doesn't mean the experiment succeeded.

## Bringing others in

Collaboration is a core part of Sparks. Dana works on her own through Plan, Prototype and Evaluate. In Review, with the concept built and evaluated, she brings in the people who evaluate its feasibility and value: the UX team, engineering, and the departments it touches, such as operations and the business teams.

Why: Dana can think out loud without an audience, and the people she brings in react to a working, evaluated concept with its reasons, not to a rough idea.

- **Who reviews:** Dana chooses. Sparks suggests departments, always including the UX team and engineering, plus the departments in the problem brief's "Who's involved" ([sparks-plan-clarify.md](sparks-plan-clarify.md), "The Problem brief"). It never invites anyone on its own ("What Sparks may do on its own").
- **What reviewers do:** view and comment on the concept and the prototype, and give their view on whether it should advance.
- **What happens with their reviews:** Sparks summarizes them for Dana, grouped by topic. She decides what changes in the concept, and what she recommends. She stays the owner of the concept.
- **Who decides:** the decision owner, the area's product lead. Sparks never decides.

~~✅ **Resolved:** others join at Handoff, not earlier. They can view and comment; Sparks summarizes their comments; Dana decides.~~ ~~✅ **Resolved:** others join at Handoff, the Advance phase, not earlier. Reviewers evaluate feasibility and value; Dana decides what changes and what she recommends; the decision owner decides whether the concept advances.~~ ✅ **Resolved:** others join in Review, the Advance phase, not earlier. Reviewers (the UX team, engineering and the departments involved) evaluate feasibility and value: they view, comment and give their view. Sparks summarizes their reviews; Dana decides what changes and what she recommends; the decision owner (the area's product lead) decides. The details are in [sparks-review.md](sparks-review.md), "Bringing others in".

✅ **Resolved:** the one exception is a collaborator: before Review, Dana can add someone with "Can edit" to work on the idea with her ("Sharing a concept"). Nobody else sees it, or comments on it, until she publishes it in Review.

## Sharing a concept

A concept is private to Dana until she shares it. She shares it twice in its life:

- **For review,** in Review: reviewers give feedback and their view on whether it should advance.
- **After it advances:** the concept stays in Sparks, and Dana can share it with specific people, teams, departments or the whole company. They can explore the prototype and read the problem, success criteria, decisions and the rest of the concept, and give feedback, without changing anything. This is how the teams who carry it forward, such as her developers, receive it: Sparks suggests her product team first, and they open it on what to build ([sparks-review.md](sparks-review.md), "Handing it to development").

~~"Share" shows in the header from Review on. Before that, the concept is Dana's own and there's nothing to share.~~ "Share" shows in the header in every step. ~~Before Review, it shares the concept as it is, for a look: Sparks asks who should see it (her product team, or the people or teams she names), shows exactly who gets access, and shares only when she confirms. They see the concept so far, and the prototype once it's built, without edit rights; their feedback is informal, and the reviews that count come in Review. In Review it opens the invitation, and after the decision it shares the advanced concept.~~ It opens a popover, "Share concept": "Copy link", a field to add a person or a department (a name, an email or a department) with their role on its right, "Invite", and "Who has access": Dana first as "Owner", then everyone she added, ~~as "Can view"~~ each with their role, which she can change there; "Remove", last in the role's menu after a line, in red, takes their access away. A team (a department, here or in "View recommended reviewers") shows its size under its name, in the link color and underlined on hover, since selecting it opens its people; selecting its name opens a popover with its people, each with their photo and ~~email~~ job title and a checkbox, all checked to start, and "Unselect all" / "Select all" at the top; someone she unchecks doesn't get access with the team, which then reads "2 of 4 people". ~~Two roles: "Can view" (the concept and the prototype) and "Can comment" (also leave feedback), "Can comment" by default. Nobody she adds can change anything.~~ Three roles: "Can view" (the concept and the prototype), "Can comment" (also leave feedback) and "Can edit" (a collaborator, who works on it with her), "Can comment" by default. ~~**In Review, "Share" also suggests the reviewers**~~ **"Share" also suggests the reviewers**, in every step once there's a direction, for this idea, with what each would evaluate, ~~behind "View recommended reviewers"~~ under "View recommended reviewers", ~~open each time Share opens (selecting it folds them away)~~ closed each time Share opens (selecting it opens them; "Add all" shows only while they're open), each added with its circle-plus button or by selecting its row ([sparks-review.md](sparks-review.md), "Who to invite"). ~~**Before Review, only "Can edit":** the popover has no role menu, says "People you add work on the idea with you: they can change it, and they see your conversation with Sparks. The teams see it in Review, once you publish it.", and the three roles come with Review.~~ **The same Share in every step:** the three roles, the same description, "Who has access" and the recommended reviewers. It's UCL's `SharePopover` (`components/overlays/share-popover`); the workspace gives it its copy. Adding someone is the confirmation, and her conversation with Sparks stays hidden from everyone but collaborators. The popover is the same in every step; inviting reviewers stays in the conversation, in Review, and the departments Sparks shares an advanced concept with join "Who has access".

✅ **Resolved:** the recommended reviewers start closed each time Share opens, and "Add all" shows only once she opens them.

✅ **Resolved:** under a person's name, in "Who has access", "View recommended reviewers" and a team's people, Share shows their job title and team ("UX lead · UX team"; in a team's list, the title alone), not their email. Someone invited by email who isn't in the directory shows just the email they were invited with. Why: who someone is at the company tells Dana why they're there; an email says nothing she needs.

**Picking who to add.** Typing in the field lists the people (with their team, "Priya Shah · UX team") and departments (with their size, "Catalog · 4 people") whose name, or a word in it, starts with what she typed, then the people whose team does ("eng": Engineering, then its people), at most 8, without those who already have access, under the field. ↑/↓ move, Enter (or a click) picks, Esc closes the list. Picking one adds them at once, with the role on the field's right. ~~An email or a name not in the list is still added as typed, with "Invite".~~ Anyone not in the list is added by email: "Invite" shows only once the field holds a valid email (until then, the field takes the whole row), and Enter does the same. It's the same list as "@" in comments ([sparks-prototype.md](sparks-prototype.md), "Commenting on it").

✅ **Resolved:** Share's field suggests people and departments from the company's directory as she types, and picking one adds them. Why: she shouldn't have to know an exact name or email; and one list for Share and "@" means the same people, shown the same way.

⚠️ **Gap:** the directory is sample data (38 people across ten teams, and ten departments); the real one comes from AutoParts Co.'s directory.

### Share and Publish

Two buttons in the header, two audiences: "Share" in every step, "Publish" on Review only.

- **"Share": people who work on the idea with her.** They see the live version, as it changes. ~~Before Review, only as collaborators ("Can edit"); from Review on, also to view or comment ("Can view", "Can comment").~~ In every step: collaborators ("Can edit") see the live version as it changes; people who view or comment ("Can view", "Can comment") see the idea once she publishes it. Only Dana publishes and asks for a decision.
- **"Publish": the teams who review and decide.** They get a fixed version of the idea and its prototype, and see it until she publishes an update ([sparks-review.md](sparks-review.md), "Publishing"). Publishing is for feedback; asking for a decision comes later, when she's ready.

"Publish" is the dark button, last: "Publish" before the first time ~~(it can't be selected before there's a prototype, and says why)~~ (it can't be selected while Sparks puts the idea together, and says why), "Publish update" after a change, "Published" when the teams have the latest.

✅ **Resolved:** "Publish" is in the header, after "Share", and shows only on Review. Why: Dana isn't an expert at building things; a "Publish" in every step asked her to think about something she couldn't do yet. In Review she checks exactly what's shared, then publishes it.

✅ **Resolved:** "Share" and "Publish" are separate, with separate audiences: Share for collaborators on the live version, Publish for reviewers on a fixed version. Why: two sharing buttons side by side would otherwise read as the same thing; naming who each is for keeps them apart.

Rules for every share:

- **Dana chooses who.** Sparks shows exactly who will get access and shares only when she confirms.
- **Her conversation with Sparks is hidden by default.** She can include it when she shares, per share.
- **Her personal knowledge stays hers.** Viewers see only what the concept quotes from it ("Knowledge and Connections").
- **Sharing never grants access to data beyond the viewer's own permissions.** A fact from a company source the viewer can't access shows its source and that they don't have access, not its content.
- **Viewers can ask Sparks about the concept** ("Why not 'Flag often-returned parts'?"). Sparks answers only from what was shared with them, never from Dana's private conversation or her personal knowledge.
- **Notifications:** people get a notification in AutoPartsHUB and an email when a concept is shared with them or a decision is asked of them. New comments on an idea are a notification too ("New comments", in "The concept workspace").

✅ **Resolved:** an advanced concept stays in Sparks as a shareable concept that viewers can't change~~, instead of being exported or sent to a work tracker~~; once advanced, Dana can also create it in Jira, one way, each story linking back to it ([sparks-review.md](sparks-review.md), "Creating it in Jira"). Dana decides who sees it; the conversation is hidden unless she includes it; viewers can ask Sparks questions answered from the concept only.

~~✅ **Resolved:** "Share" appears in the header only from Review on. Before Review, the concept stays private to Dana.~~

~~✅ **Resolved:** "Share" is in the header in every step (sparks.ds "header-autopartshub" → "Sparks Project", 32:1145). Before Review, it shares the concept as it is, for a look, under the same rules as every share. Why: Dana often wants a colleague's eye early, and asking for it shouldn't wait for a formal review.~~ ✅ **Resolved:** "Share" is in the header in every step (sparks.ds "header-autopartshub" → "Sparks Project", 32:1145), ~~but before Review it only adds collaborators ("Can edit"); "Can view" and "Can comment" come with Review. Someone added in Review keeps their role if she goes back to an earlier step, shown without a menu. Why: collaboration happens in Review, on a version she chose to publish; before that, the idea is her work in progress, shared only with someone who builds it with her.~~

✅ **Resolved:** "Share" is the same in every step: the three roles, the description, who has access and, once there's a direction, the recommended reviewers (each added with its circle-plus, or all at once with "Add all" on the right of "View recommended reviewers", which then closes, focus going to the invite field). People added with "Can view" or "Can comment" before Review see the idea once she publishes it; until then, only collaborators see it. Why: one Share that behaves the same everywhere; she can line up her reviewers as soon as she knows the direction, and the work in progress still stays hers until she publishes.

✅ **Resolved:** "Share" opens a simple popover (not designed yet, after a typical share panel), not a conversation with Sparks: who has access, a field for a person or a department, and "Copy link". Why: sharing is a quick, self-contained task; asking Sparks and confirming in the conversation added steps and filled the conversation with something that isn't about the concept.

~~✅ **Resolved:** two sharing roles, "Can view" and "Can comment" ("Can comment" by default), picked in the invite field and changeable in "Who has access"; no editing role. The reviewers' departments, shared an advanced concept, can comment. Why: some people only need to look, and sharing never lets anyone but Dana change the concept.~~

✅ **Resolved:** three sharing roles, "Can view", "Can comment" and "Can edit" ("Can comment" by default), picked in the invite field and changeable in "Who has access". "Can edit" makes them a collaborator: they work on the idea with her (her answers in Plan, the prototype, Evaluate and Review) and see and take part in her conversation with Sparks; for "Can view" and "Can comment" it stays hidden. The popover says so: ~~"People and departments you add can see the idea and the prototype. With "Can comment", they can also leave feedback. With "Can edit", they work on it with you, in your conversation with Sparks too; otherwise, it stays hidden."~~ "People and departments you add see the idea and its prototype once you publish it. With "Can comment", they can also leave feedback. With "Can edit", they work on it with you right away, in your conversation with Sparks too." ✅ **Resolved:** the description says that viewers and commenters see the published idea, not the work in progress; only "Can edit" sees it before Publish. It's in two parts: who sees it and when, under the title (14px medium, foreground), then what each role adds, 8px under the field (12px regular, muted) (before Review: what a collaborator does, then "The teams see it in Review, once you publish it."). The reviewers' departments, shared an advanced concept, can comment. Why: an idea is often built by more than one person, and a collaborator needs to change it, not only comment on it.

⚠️ **Gap:** only the role is built: what a collaborator sees and does (two people talking to Sparks in one conversation, who changed what, who can publish or ask for a decision) isn't designed yet.

✅ **Resolved:** only Dana, the idea's owner, can publish it and ask for a decision; a collaborator ("Can edit") can't. For a collaborator, "Publish" doesn't show, and Sparks doesn't offer to ask for a decision. Why: publishing and asking for a decision speak for the idea to the teams and the decision owner, so they stay with the person who owns it.

### Feedback

Anyone Dana shares a concept with (reviewers, the decision owner, and the people she shares an advanced concept with) can give feedback on it:

- **Comment** on a specific part of the concept, or point at anything in the prototype and comment there.
- **Flag something as unclear:** "Unclear" on any part, with a note on what's missing. "Which vehicles does 'older' mean?"
- **Suggest an improvement.**

On Dana's side:

- Sparks reads the feedback, summarizes the concerns by topic, and proposes a clarification or improvement for each: "Engineering flagged 'older vehicles' as unclear. Suggested fix: 'vehicles older than 15 years, about {percent} of catalog parts'."
- Dana accepts, edits or dismisses each suggestion. Feedback never changes the concept or its prototype on its own.
- The person who gave it sees when it's been addressed, and how.

Why: requests that come back as "unclear" with no guidance on how to fix them are one of Dana's frustrations. Here, every flag arrives with a suggested fix, and the person who raised it knows it was handled. After it advances, the fix shows in Review's next step, and the comment shows "Addressed." with how ([sparks-review.md](sparks-review.md), "Something unclear after it advances").

✅ **Resolved:** collaborative feedback with AI-assisted resolution. Authorized people comment, flag unclear requirements and suggest improvements; Sparks proposes clarifications; Dana decides; reviewers see when their feedback is addressed. Feedback never changes the concept automatically.

## The decision log

Every concept keeps a log of its decisions, automatically, as Dana and the people she brings in work. Nobody writes anything for it.

- **What's recorded:** each step approved or skipped, and each part of Plan she approves; the main measure chosen; the direction chosen and the hypothesis; each time Dana keeps her answer over the data, or the data over hers; each departure from the design system she keeps; her go-ahead in Evaluate and the evidence status; each reviewer's view, and each comment Dana accepts or declines; her recommendation; the decision owner's decision; each share, and with whom.
- **Each entry:** what was decided, who decided it, when, in which step, and the reason when the workflow already asked for one (the reason for a direction, a reviewer's view, the decision). Sparks never asks for a reason only to fill the log.
- **Where it shows:** ~~"Decisions" in the plan, newest first, available from any step, and to anyone the concept is shared with.~~ "Decisions" in the idea for review ([sparks-review.md](sparks-review.md)), and to anyone the concept is shared with. ⚠️ With no plan document, the log built from the workflow (below) has nowhere to show: Review's "Decisions" shows a fixed sample list for now.
- **It can't be edited.** A changed decision is a new entry; the earlier one stays.

~~How it shows, as built ("Decisions", last in the plan):~~ How it showed while the plan was a document (removed with it): each entry says what was decided, then the reason or what was decided in full when the workflow has it (why the direction, the hypothesis, a reviewer's view, the recommendation, the decision), then who, the step and when. It records:

- **Plan:** agreeing the problem; approving what we know; the main measure; a target kept over the data; each direction chosen (with Sparks's pick when it was another one); approving what we'll build and its hypothesis, which finishes Plan.
- **Prototype:** light gray text kept against the design system; finishing Prototype, with the version.
- **Evaluate:** skipping it, or going ahead to Review, with the evidence status.
- **Review:** each ~~department's~~ reviewer's view and why (a person, with their team); accepting Sparks's changes after the reviews, or keeping the concept as it was; sending the recommendation; the decision owner's decision and why; sharing it.

Entries stay when what they came from changes: after going back to the choice, the first direction's prototype, evaluation and review decisions stay, and the new direction's are new entries.

⚠️ **Gap:** answers kept over the data other than the target, comments accepted or declined (comments aren't built) and shares from "Share" before the decision aren't recorded yet.

✅ **Resolved:** the decision log is captured automatically from the workflow, with no manual documentation. It gives the traceability AutoParts Co. needs (who decided what, when and why) without adding work.

## Talking with Sparks

The tone is conversational, warm and clear, like a sharp, patient colleague who has done this many times. It stays within the product's voice (DESIGN.md, "Brand voice"): friendly, never cute or salesy, no exclamation marks.

How Sparks talks to Dana in every step:

- **Sparks decides, Dana approves.** Dana isn't a designer. Sparks does the weighing: it recommends, drafts and says what it assumed, and asks her to approve, instead of handing her a series of choices. Count her decisions and cut them: one recommendation and one question beats a round of choices; what Sparks can infer (a priority from what success looks like) it infers, and says so. Plan stays strategic: no screens or design-level previews until Prototype.

  ✅ **Resolved:** after what success looks like is agreed, Dana makes two decisions, not about ten: she goes with Sparks's pick (or picks another), then approves "What we'll build" ([sparks-plan-generate-directions.md](sparks-plan-generate-directions.md), [sparks-plan-compare.md](sparks-plan-compare.md)). Why: four keep-or-set-aside answers, "ready to compare?", "what matters most?", then confirming the reason, the hypothesis and "Continue to Prototype" put the burden on her.

- **One question at a time,** with its best guess attached, so Dana reacts instead of starting from nothing: "Who runs into this most? My guess is do-it-yourself customers buying online for older vehicles. Is that right?"
- **Quick replies** under a question when the likely answers are clear ("Yes, that's right", "Not quite"). She can always type her own. Beside a step's own view (Prototype) they sit one per row; in Plan, in a row.
- **The "continue" reply answers to Enter.** The first quick reply, the positive one that moves on ("Yes, that's right", ~~"Looks right, continue",~~ ~~"Yes, build it"~~ "Build it"), shows the Enter key (↵), and pressing Enter picks it, when she isn't typing: focus on the page, or in the empty message box. Enter on another button picks that button; with text in the message box, Enter sends it. When the replies are out of view, Enter brings them into view first, and the next one picks.

  ✅ **Resolved:** Enter never answers a question she can't see. Why: Sparks goes on by itself after a summary, so the next question can be below the view.

  ✅ **Resolved:** every "continue" quick reply shows ↵ and answers to Enter. Why: most of Plan is agreeing with Sparks's draft, and moving on shouldn't need the mouse.
- **An answered question card folds to its question.** Once Dana answers it with a quick reply ("Yes, that's right", or another answer Sparks offered, such as "Repeat purchases instead"), the card shows only its question, as Sparks's text, and her bubble shows the answer itself, as it ended on the card (with her edit, if she made one), not "Yes, that's right". "Not quite", "I'm not sure" and her own words show as she said them.

- **Every card asks a real question about its content** (~~"What problem are you trying to solve?"~~, "Who does it affect most?"), never a yes-or-no check like "Does this sound right?". The one exception is the first card, headed "Problem to solve": Sparks's introduction has just asked "What problem do you want to solve?", and the card doesn't repeat it.

  ✅ **Resolved:** the first card is headed "Problem to solve" instead of asking "What problem are you trying to solve?", so the same question isn't asked twice in a row. **"Not quite" leaves the question open:** the card folds to its question, with no bubble and no reply, and the message box takes focus with ~~"Type your answer…"~~ Sparks's answer as its placeholder and "Press Tab to edit this suggestion": Tab puts that answer in the box, so she changes it instead of typing it again. Her answer goes under the question, and Sparks says what changed and why it matters before the next one. Typing an answer instead of picking a quick reply works the same.

  ✅ **Resolved:** after "Not quite", Esc in the message box cancels it: the card opens again with its answer and its replies, as before she picked "Not quite", and focus goes back to "Not quite". Anything she typed in the box is dropped, as Esc drops an edit on the card. The hint says so: "Press Tab to edit this suggestion, Esc to cancel". Why: "Not quite" is easy to pick by mistake, or she may change her mind once she sees the question again; she needs a way back without answering.

  ✅ **Resolved:** "Not quite" folds the card to its question for her to answer in the message box, instead of Sparks asking "What's off? Tell me in your own words, or edit it on the card." Why: the question is what's being asked; a second question about it adds a step. It's why every card's question must make sense on its own.

  ✅ **Resolved:** answered cards fold to the question, and her bubble holds the answer. Why: the card staying open repeated the answer next to a "Yes, that's right" bubble; this way the conversation reads as Sparks asking and Dana answering, and scrolling back shows what she agreed to.
- **When she corrects a suggestion** (her own words after "Not quite", or an edit on the card), her words replace Sparks's on the card, marked "Edited by you". When her words after "Not quite" start "Add…", "Also…", "And also…", "Yes, and also…", "Plus…" or "Include…" ("Add that stores lose sales too"), they're added to Sparks's answer instead of replacing it ("Thanks, I've added that to why it matters."). An edit on the card always replaces, since she edits the whole answer there. Her bubble then shows the whole answer, Sparks's suggestion with her addition, as it ends on the card, not only what she typed. Then the next reply opens with its own short paragraph: what changed and why it matters for what comes next, then the next question. "Thanks, I've changed who it affects. It decides whose orders and returns I look at from here, so I'd rather go with what you know." Sparks names the part it changed rather than repeating her words, which are on the card.

  ✅ **Resolved:** "Add…" after "Not quite" adds to Sparks's answer instead of replacing it. Why: Dana is building on the suggestion, not rejecting it; replacing it left only her few words ("Why it matters: add that also abc").

  ✅ **Resolved:** a correction gets what changed and why it matters, then the next question, in every part of Plan with question cards (Problem, Clarify, Success). Why: a bare "Thanks, I've updated it." or moving straight on leaves Dana unsure her correction landed, or what it will change. Each part's PRD has its lines.
- **Plain language.** No jargon unless Dana uses it first; when Sparks needs a term, it explains it in the same sentence.
- **Short replies.** What matters now, then the next question. The detail goes on a card or into the concept, not into long replies.
- **It says what it's doing:** "Here are three ways to measure success. Take a look and tell me which one matters most."
- **It's honest about what it doesn't know.** When an answer depends on information Dana hasn't given, it asks or labels it an assumption. It never makes up customer numbers, research findings or costs.

## Suggestions

- Every part of the concept shows where it came from: Dana, company knowledge (with its source), her personal knowledge, or a suggestion from Sparks.
- Anything Sparks proposes shows as a suggestion, marked as Sparks's, with "Accept", "Edit" and "Dismiss", on its card or in the plan.
- What Dana writes or accepts is hers. Sparks never changes or removes it without asking; it proposes the change as a new suggestion.
- Assumptions stay labeled "Assumption" until Dana confirms them or evidence supports them. The concept summary lists any that are still open.

## Knowledge and Connections

What sets Sparks apart from a general AI builder: it works with what AutoParts Co. already knows. Two separate ideas:

- **Connections:** where company data comes from, and which sources are connected. AutoPartsHUB's admins connect the sources and set who can read what. Each person sees, in the AutoPartsHUB home's "Connections" tab, which sources are connected and what they can access.
- **Knowledge:** what Sparks understands and can reference from those sources, plus what each person adds. Shown in the AutoPartsHUB home's "Knowledge" tab, with company knowledge and personal knowledge clearly separated by source and ownership ([autopartshub-home.md](autopartshub-home.md), "Knowledge and Connections").

Dana never has to go to Connections or Knowledge to use them. Sparks brings the relevant knowledge into her workflow, in the step where it helps, with its source.

**Principles:**

- Company knowledge is centrally governed, permission-aware, and available where employees need it.
- Personal knowledge enhances individual exploration; company knowledge remains independently governed.

### Company knowledge

| Source | What it holds | Where it helps most |
| --- | --- | --- |
| Customer intelligence | Customer behavior, feedback, support cases, research | Plan, Evaluate |
| Business performance | Sales, conversion, returns, product categories | Plan (the problem, its size and success measures) |
| Product ecosystem | Existing apps, workflows and what they can do | Plan (directions that build on what exists), Prototype |
| Design system | Components, patterns, accessibility standards | ~~Plan (visual previews),~~ Prototype, Review |
| Engineering context | APIs, technical limits, what the platform can do | Plan (effort and limits), Evaluate, Review |
| Previous experiments | Hypotheses, results and what was learned, including decided Sparks concepts | Plan, Evaluate |

Rules in every step:

- **Only what Dana is allowed to see.** Sparks uses a source only where Dana has access to it. It never shows her something she couldn't see in the app it comes from.
- **Reference, not management.** Dana and Sparks reference company knowledge; they don't change it. Only people whose role includes managing company knowledge can.
- **Every fact shows its source,** and the period it covers when it's data. Dana can open the source if she has access to it.
- **Facts and guesses stay apart.** Something from knowledge is shown as such; something Sparks infers from it is a suggestion or an assumption, never a fact.
- **Nothing found isn't a dead end.** Sparks says so in one line and goes on.

### Personal knowledge

Dana's own notes, reports, research and files, which she adds and owns, in her Knowledge. ℹ️ On the AutoPartsHUB home, that tab is named ~~"Library"~~ "My library" ([autopartshub-home.md](autopartshub-home.md)).

- **It's hers.** Only Dana sees it. Others see only what a concept she shares quotes from it, with its source shown as hers.
- **It influences only her own explorations.** It never overwrites, updates or contributes to company knowledge, including when she shares a concept or its learnings.
- Sparks uses it in her concepts alongside company knowledge, with the same rules: every fact shows its source ("Your knowledge" and the item's name), and facts stay apart from guesses.
- **Attachments:** a file Dana attaches to a concept belongs to that concept. Sparks offers once to keep it in her Knowledge too ("Keep this in your Knowledge for other concepts?"); nothing is saved there without her say.

Concept-specific information (attachments, answers, the prototype) stays scoped to its concept and follows the concept's sharing.

~~✅ **Resolved:** "Knowledge" holds what Dana adds and owns, in addition to the company's shared knowledge.~~ ✅ **Resolved:** Knowledge shows both company knowledge and Dana's personal knowledge, clearly separated by source and ownership. Company knowledge is centrally managed and permission-aware; personal knowledge belongs to Dana and influences only her explorations; concept information follows the concept's sharing. Connections shows where company data comes from.

### When the data and Dana disagree

Dana knows the business, and the data may still show something different. In any step, when something Dana says or chooses doesn't match knowledge, Sparks:

- says so plainly, once, and shows what the data says, with its source;
- offers three ways forward: keep hers, use the data, or keep both and check it in Evaluate;
- never overrules her or argues, and doesn't bring it up again once she's decided.

Her choice is recorded in "Decisions".

Why: Dana's experience and the data each miss things. Showing both, without picking for her, keeps her in charge and stops a wrong belief from shaping the solution unnoticed.

## What Sparks does

| Sparks | Example |
| --- | --- |
| Informs | Explains what's happening and why, or a term she asks about; answers viewers' questions about a shared concept |
| Summarizes | Turns her notes, files, knowledge and reviewers' views into the problem brief, the findings or a summary |
| Recommends | Proposes success measures, recommends a direction, and drafts a recommendation to advance, iterate or stop; Dana and the decision owner decide |
| Generates | Drafts the cards and the concept's sections, writes the hypothesis, ~~makes visual previews,~~ builds the prototype and assembles the concept for review |
| Evaluates | Runs the scenario-based evaluation in Evaluate and reports risks, assumptions, usability concerns and what the evidence says about the hypothesis |
| Prepares an action | Gets invitations, the recommendation and shares ready; Dana confirms |

### What Sparks may do on its own

- **On its own:** ask questions, add suggestions to the concept, mark later sections and steps Needs a check when an earlier one changes, update the prototype when Dana asks for a change, and record decisions in "Decisions".
- **Only with Dana's confirmation, each time:** approve a step or a part of Plan, change something she wrote or accepted, save a file to her Knowledge, send invitations, submit her recommendation, share the concept, delete a concept.
- **Never:** decide whether a concept advances; contact reviewers, decision owners or anyone else on its own; change company knowledge; present an assumption as fact; make up evidence; describe a simulation as validation.

### What Sparks knows

- Everything in the current concept: the conversation, the concept's spec, the files Dana attached, and the prototype.
- The step Dana is on and what she's looking at.
- The company knowledge Dana is allowed to see, and her personal knowledge.
- Nothing from her other concepts, unless she brings it in.

### When something goes wrong

- **A reply fails or is cut off:** the conversation says "Sparks couldn't finish that reply." with "Try again". Her concept and anything she wrote stay as they were.
- **Sparks isn't sure what she means:** it offers its best reading and asks, instead of guessing silently.
- **A request is outside what Sparks does** (for example, writing production code): it says what it can do instead, in one sentence.
- **Dana disagrees with a suggestion:** she dismisses it or says why, and Sparks offers another without arguing.

### Checks

What Dana says → what Sparks must do, in any step:

| Dana | Sparks must |
| --- | --- |
| Describes a rough idea in one sentence | Restate it as a problem and ask one question to sharpen it, not a list of ten |
| Asks "What's a success metric?" | Explain it in plain words with an example from her concept, then go on |
| Says she doesn't know an answer | Record it as an assumption and continue, not block the step |
| Edits a section in the plan | Use it from then on without asking her to repeat it. Only the wording: nothing else. What it means: say what may no longer fit and offer to update the prototype, building only on her yes |
| Changes the problem after choosing a direction | Mark the later sections of Plan, and any later step that's Done, Needs a check, and say what may no longer fit |
| "Just build it" early in Plan | Draft success criteria and at least two directions with her in the conversation, recommend one, draft her reason and the hypothesis, and build once she confirms them |
| "Just approve it so we can build it." | Say the decision belongs to the decision owner, and offer to prepare her recommendation |
| "Can we say it's validated?" after Evaluate | Say the simulation supports the hypothesis, explain that it isn't validation with real people, and suggest what real-user testing would confirm |
| Asks how many customers have the problem | Answer from company knowledge with the source and period, or say it couldn't find it and suggest how to find out |
| Asks about data from a source she can't access | Say it can't use that source for her, without showing any of it |
| Chooses a direction | Record it in "Decisions" with her reason, without asking her to write anything else |
| Shares an advanced concept with a department | Show who gets access and that the conversation is hidden unless she includes it, then share when she confirms |

## States

| State | What shows | What Dana can do |
| --- | --- | --- |
| First visit, no concepts | The title, the tabs, search, "New idea" and "No ideas yet" | Start a concept |
| Concepts saved | The title, the tabs, search, "New idea" and her concepts in "Your ideas" | Start a concept, open one, switch tabs |
| Sparks is replying | A sign that Sparks is writing, in the conversation | Read, select a step, stop the reply |
| Reply failed | "Sparks couldn't finish that reply." and "Try again" | Try again, keep working |
| A step needs review | The warning mark on the step, and the reason when selected | Look at what may no longer fit, accept Sparks's suggested updates, or keep it as is |
| A step was skipped | The gap mark, and Sparks's recommendation when selected | Open it, leave it |
| Waiting for a decision | "Waiting for a decision" in "Your ideas" and on the concept | Read reviews, answer comments, withdraw the recommendation |
| Decided | "Advanced" or "Stopped", with the date, next to the evidence status | Open the concept and its decision; share an advanced concept, or keep working on a new version of it |

## Screen sizes

**Desktop first, mobile supported.** Dana works mostly on a laptop, then on her phone. Sparks's core work happens on a laptop or desktop: talking with Sparks, comparing directions, trying prototypes, collaborating with the UX team and engineering, and weighing evidence to decide.

Mobile comes later, for the moments that fit a phone: capturing an idea (typing or dictating it), answering Sparks's questions, and reading and answering feedback. Its design is out of scope for now.

~~✅ **Resolved:** on phones, the conversation comes first and the spec opens as its own view.~~ ✅ **Resolved:** Sparks is designed desktop-first. Mobile is supported later, for capturing ideas, answering Sparks's questions and reviewing feedback, and isn't designed now. The demo shows desktop only.

## Accessibility

- Each new reply from Sparks is announced to screen readers when it finishes, not word by word.
- The steps work as a list of links: each one says its name and state ("Plan, done", "Evaluate, skipped").
- Each card is a group named after what it holds ("Problem", "Direction: Fit check before you buy").
- ~~"Concept"~~ ~~"Blueprint" opens the panel and moves focus into it; closing it returns focus to the button.~~ ~~The Blueprint is a region named "Blueprint".~~ The finished plan is a region named "Plan"; "Edit plan" is a toggle button (pressed while editing, named "Done"); each editable summary is a multi-line text box named after its section; "Jump to a section" moves focus to the section's heading.
- Each divider in the conversation is a separator named for its step ("Prototype").
- Suggestions on cards and in the plan say they come from Sparks, and "Accept", "Edit" and "Dismiss" name the suggestion they act on.
- The evidence status and the decision status are read as two separate statements.
- Focus stays in the message box after Dana sends a message.

## The demo

Sparks is demonstrated on one concept, end to end: Dana's "Wrong-part returns" (customers buying parts that don't fit their vehicle), on a laptop.

Why this problem: it's a real, costly problem for any auto parts retailer with stores and an online business; it crosses departments (e-commerce, stores, the catalog team, returns), so it shows collaboration; and it has more than one plausible solution, so exploring directions matters.

### What the demo shows

**The goal:** show how Dana moves from a business insight to a testable concept, with AI guiding her and Dana in control throughout. A coherent end-to-end experience comes before showing every capability.

Six moments, in depth:

1. **Plan, the problem:** Sparks introduces itself in a few lines and asks what problem she wants to solve. Dana describes it in her own words, with the idea she walked in with: flag parts that get returned a lot ([sparks-plan-problem.md](sparks-plan-problem.md), "Describing the problem"). Sparks writes the problem without it and keeps the idea for later. Sparks answers with what AutoParts Co. already knows ("doesn't fit" returns, fit questions at stores, last year's vehicle selector test), then helps her sharpen the idea in a short, guided conversation, asking only what the data can't answer. Shows company-aware AI, and that she needs no design vocabulary.
2. **Plan, success:** one choice, the main measure, before anything is built.
3. **Plan, directions and the choice:** four directions in one reply ~~with visual previews~~, rated in words, her idea among them, a plain-language recommendation that says why "Fit check before you buy" should cut more of these returns than her flag, Dana's one-tap choice and "What we'll build" with the hypothesis. Shows exploring more than one direction, and where Dana stays in control.
4. **Prototype:** "Fit check before you buy", clickable, the customer's view. The working output.
5. **Evaluate:** "Simulation supports hypothesis", with two findings. Shows honesty about what's simulated.
6. **Review:** Dana shares the concept with the UX team, engineering and the catalog team; their feedback comes back, one part flagged "Unclear", and Sparks proposes a fix she accepts. Then her recommendation and the decision. Shows cross-department collaboration.

Lightweight and in context, not walked through on their own: the plan, the decision log, Knowledge and Connections (facts in the flow show their source).

Out of scope: the voice conversation (the button shows, the conversation doesn't) and mobile. The demo is desktop only.

Why: these moments are where Sparks answers its design question: AI amplifying Dana's expertise, her judgment kept, the product process respected.

✅ **Resolved:** the demo's scope is the six moments above: three in Plan, then Prototype, Evaluate and Review, with sharing and feedback inside Review. The decision log, Knowledge and Connections stay lightweight; voice and mobile are out of scope.

### What's live, simulated and scripted in the demo

The demo uses live AI on a guided path: it follows a prepared scenario, and Dana can still ask questions, refine ideas and explore alternatives naturally.

- **Live AI:** Sparks's replies in the conversation and what it drafts (the problem statement, the brief, success criteria, directions, the recommendation, the hypothesis, answers to questions, fixes for feedback), generated live from the synthetic company knowledge and the concept so far. Structured prompts and controlled context keep it consistent with the scenario.
- **Simulated company integrations:** company knowledge (returns, store calls, sales, the vehicle selector test) is synthetic, shaped like what a national auto parts retailer would have; every number is illustrative. Connections, permissions, sharing and notifications are shown, not connected or sent.
- **Scripted:** the scenario Dana follows; the prototype of "Fit check before you buy" (built in advance with the design system, and really clickable); ~~the visual previews;~~ Evaluate's results; the reviewers' feedback; and the decision owner's decision. Predefined replies serve as fallbacks when the live AI goes off the path.
- **Not connected:** no real systems, customer data or people.
- **On screen:** the demo carries a "Demo" label and a one-line note on what's live and what's simulated, so nobody mistakes it for a working integration.

✅ **Resolved:** the demo is a hybrid: live AI with a guided demo path, structured prompts and controlled context, and predefined replies as fallbacks. This documentation keeps live AI capabilities, simulated company integrations and scripted interactions apart.

What a real build would need: governed, permission-aware connections to the company's sources; an AI model that answers from that knowledge and cites it; prototype generation from the design system; a scenario evaluation with honest confidence; identity, sharing and notifications; and knowledge governance for the learnings concepts add.

## Acceptance Criteria

- Given Dana on the AutoPartsHUB home, when she selects the Sparks card, then Sparks opens in a new tab on its start page, with "Your ideas" selected.
- Given the start page with no concepts, then "Your ideas" shows "No ideas yet", with search and "New idea" above it.
- Given the start page, when she selects "Shared with you" or "Archive", then that tab's concepts show, or its empty state when it has none.
- Given the start page, when she selects a concept's row, then the concept opens where she left off.
- Given the start page, when she selects "New idea", then a new concept opens on Plan, with Sparks's introduction (what it does with her, that she decides) ending with "What problem do you want to solve?", and the message box ready for her answer.
- Each row in "Your ideas" shows the concept's name, who can see it, when it was last edited and where it is; a concept waiting for a decision, advanced or stopped shows that status with its date.
- The header shows the four steps (Plan, Prototype, Evaluate, Review)~~, the "Blueprint" button~~ and "Share" ~~from Review on~~; the conversation is centered.
- Sparks shows its drafts as cards in the conversation; what Dana approves on a card appears in the plan without her writing anything.
- ~~The Concept panel opens only when Dana selects "Concept", never on its own, and is available in every step.~~ ~~The Concept panel opens on its own when its first section arrives (not beside a preview), opens from "Blueprint" after she closes it, and is available in every step.~~ ~~The Blueprint panel opens only from "Blueprint", never on its own, and is available in every step.~~ ~~While Plan is in progress there's only the conversation; once a later step is reached, selecting Plan shows the Blueprint beside it.~~ ~~While Plan is in progress there's only the conversation; once a later step is reached, selecting Plan shows the plan as a document, on its own, and "Edit plan" brings the conversation back beside it.~~ Plan is the conversation, while it's in progress and once a later step is reached; nothing shows beside it.
- ~~Given Evaluate reached, when she selects Plan, the conversation scrolls to its start and the Blueprint shows beside it; selecting Evaluate again scrolls back to the latest message.~~ ~~Given Evaluate reached, when she selects Plan, the plan shows on its own, without the conversation or the message box; "Edit plan" shows the conversation at its latest message, and "Done" hides it. Selecting Evaluate again shows the conversation at its latest message. A divider marks each step the conversation moved to.~~ Given Evaluate reached, when she selects Plan, Plan's conversation shows at its latest message, centered, with the message box; selecting Evaluate again shows Evaluate's.
- ~~Given Plan done, when she changes the target in the plan and leaves it, then Sparks says what may no longer fit and asks "Want me to update the prototype to match?"; "Not now" leaves a note on the prototype ("Built from an earlier version of the plan: …", with "Update prototype") until it's updated. A typo fixed in the plan adds a version and a Decisions entry, and nothing in the conversation.~~ Given Plan done, when she selects the pencil on her answer to "Which result matters most?" and picks "Repeat purchases instead", then her bubble and "What success looks like" say repeat purchases, and Sparks says what may no longer fit and asks "Want me to update the prototype to match?"; "Not now" leaves a note on the prototype ("Built from an earlier version of the plan: …", with "Update prototype") until it's updated.
- Given she's changing an answer, "Keep my answer" or Esc leaves everything as it was and puts focus back on the pencil; picking the answer she had changes nothing.
- ~~"Versions ({n})" in the plan lists every version, newest first; restoring one saves it as the newest.~~
- In the message box, the main button starts a voice conversation while the box is empty and becomes Send as soon as there's anything in it; Enter sends and Shift+Enter adds a line.
- Plan moves from part to part in the conversation, with no pages or buttons between parts; only Evaluate can be skipped, and it shows as Skipped.
- Given Dana asks to build before Plan is Done, Sparks drafts the success criteria and at least two directions with her in the conversation, recommends one, and builds only once she has chosen and confirmed her reason and the hypothesis. Plan is then Done.
- ~~Before Review, "Share" offers only "Can edit"; "Can view" and "Can comment" are offered from Review on.~~ "Share" is the same in every step: the three roles, and the recommended reviewers once there's a direction; people with "Can view" or "Can comment" see the idea once she publishes it.
- Anyone a concept is shared with can comment, flag a part as unclear and suggest improvements; Sparks proposes a fix for each; nothing changes until Dana accepts, and the person sees when it's addressed.
- Given Plan or Prototype isn't Done, Dana can't submit the concept for a decision; every other gap is listed but doesn't block her.
- Nothing Sparks proposes becomes part of the concept until Dana accepts it.
- A step is marked Done only when Dana approves it; Sparks doesn't move to the next step on its own.
- Given the problem brief and success criteria are approved, when Dana changes the problem statement, then both sections show the warning mark with the reason, and stay as they were.
- Given a concept she left in Plan while choosing a direction, when she opens it again from "Your ideas", then it opens on Plan, at that point in the conversation, with her concept as she left it. A conversation with history opens at its latest reply.
- When a reply fails, the conversation shows "Sparks couldn't finish that reply." with "Try again", and her concept is unchanged.
- The evidence status always names its method and outcome; nowhere does Sparks show "Validated" for an AI simulation.
- Evidence from AI simulation alone is never shown with high confidence.
- A concept's decision status and evidence status show separately, for example "Advanced · Simulation supports hypothesis".
- Sparks never shares the concept, sends invitations or submits a recommendation without Dana's confirmation.
- A shared concept hides Dana's conversation unless she included it, and a viewer never sees content from a company source they can't access.
- Every fact Sparks brings from knowledge shows its source; company knowledge and personal knowledge are labeled apart.
- Nothing from Dana's personal knowledge is added to company knowledge, including when she shares a concept.
- Only the decision owner can record whether a concept advances, iterates or stops.
- Each decision listed in "The decision log" appears in "Decisions" with what, who, when and the step, without anyone writing anything for it; entries can't be edited.

## Open Questions

- 🙋 What does search on the start page match, and does it show results as Dana types?
- ~~🙋 "Idea" or "concept"? The start page says "Your ideas" and "New idea" (Figma), and a new concept's header now reads "New idea" too; the rest of Sparks says "concept" ("your concept", "Success is in your concept"). Recommended: one word everywhere. The spec panel is now "Blueprint" and Sparks says "in your blueprint" ("The Blueprint panel"), which leaves "idea" vs "concept" for the thing itself.~~ ✅ **Resolved:** "idea", everywhere Dana sees it ("Glossary").
- 🙋 How does Dana archive a concept and bring it back, and can a stopped concept be archived automatically?
- 🙋 Are the status labels' colors right (step name blue, "Waiting for a decision" amber, "Advanced" green, "Stopped" gray)?
- 🙋 Should returning users get a shorter introduction when they start another concept, and can Dana ask Sparks to explain the steps again later?
- 🙋 How does the voice conversation work: what Sparks says, what shows on screen, how Dana ends it, and how it lands in her concept?

## Out of scope

- What each part of Plan and each later step asks, shows and adds to the concept: its own PRD: [sparks-plan-problem.md](sparks-plan-problem.md), [sparks-plan-clarify.md](sparks-plan-clarify.md), [sparks-plan-define-success.md](sparks-plan-define-success.md), [sparks-plan-generate-directions.md](sparks-plan-generate-directions.md), [sparks-plan-compare.md](sparks-plan-compare.md), [sparks-prototype.md](sparks-prototype.md), [sparks-validate.md](sparks-validate.md), [sparks-review.md](sparks-review.md).
- Measuring outcomes after implementation: Pulse. Sparks explores opportunities, defines hypotheses, prototypes, validates and decides whether to advance; Pulse monitors actual business performance and measures outcomes after implementation. Comparing those outcomes with what Evaluate predicted is a future direction, not designed now.
- Building the advanced concept: the product and engineering teams' own process.
- Managing connections and company knowledge: AutoPartsHUB's admins and knowledge managers.
- Which apps a user sees on the AutoPartsHUB home: [autopartshub-home.md](autopartshub-home.md).
