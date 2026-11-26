<!--
Created: Nov 21, 2026
Created by: Julio Caunedo
Last updated: Nov 25, 2026
Latest update: a new section, "Initial prompt improvement", explains why Sparks improves Dana's first message (she isn't a designer, a rough message leaves gaps and starts from a solution, misunderstandings are cheapest now), how it works step by step, what it uses and leaves out, its two-paragraph structure with the demo's before and after, and why it's built this way. The card's second paragraph now uses only general knowledge of the domain (a return, a call to the store, a customer who trusts us less), not "Returns keep rising" or customers who stop buying. Why: those weren't in Dana's message any more, so "from your message" wasn't true, and she should be able to confirm every word of the first thing she approves. The ✅ tags and the struck-through earlier decisions were removed (git keeps them).
Recent updates: Sparks's question about supporting material offers "Add from library" besides "Attach files", with their "+" menu icons. Files can be sent with no text at any time, and what she added is in the idea's Library. After the problem statement, Sparks asks which live app the idea improves, then for anything that supports it.
Scope: the Problem part of Plan, the first of Plan's five parts: how Dana describes a problem, what Sparks does with it, what company knowledge it brings in, and the Problem section it adds to the concept.
Purpose: defines how a rough idea, in Dana's own words, becomes a problem statement she agrees with, so everything after it builds on the right problem.
-->

# Plan: Problem — Sparks

**Location:** the first part of Plan, the first of Sparks's four steps ([sparks.md](sparks.md), "Plan"). It starts when Dana selects "New idea" on the start page: Sparks introduces itself and asks what problem she wants to solve ([sparks.md](sparks.md), "Sparks's introduction"). Her answer is her first message. She can come back to it by asking Sparks, or, once Plan is done, from the plan ("Let's revisit the problem").
**Audience:** experienced AutoParts Co. employees who know the business but aren't designers or engineers. The reference user is Dana, a Senior Product Manager.
**Description:** the part of Plan where Dana describes a problem the way she'd tell a colleague, and Sparks turns it into a clear problem statement backed by what AutoParts Co. already knows.
**Status:** defined. Built as a reference layout: Sparks's introduction, then the problem one thing at a time (the problem statement, the live app it improves, anything that supports it, who it affects, why it matters; each on a clarification card with its answer buttons, except supporting material, which has no answer to propose), "Not quite", editing an answer, and the agreed problem as a summary (`SparksWorkspace`, `ClarificationCard`, `ProblemCard`). The clarification card is designed in sparks.ds ("clarification-card", 55:2585); the rest of this part isn't in Figma yet. Not built: missing parts, several problems, the solution in the description, nothing found, unreachable sources, reading what's in an attachment or behind a link (attaching files works; only their names are kept).

---

## Purpose

Dana usually knows a problem from what she's seen: an angry call, a report that looks wrong, a team that keeps working around something. She shouldn't need a method or UX vocabulary to start. This part takes her description as it comes and helps her agree on three things: who has the problem, what goes wrong for them, and why it matters to AutoParts Co.

It works when Dana reads the problem statement and thinks "yes, that's it", in a few minutes, and when she learns something from company knowledge she didn't have when she started.

This is where Sparks starts to help Dana think before it helps her build. This part is about the problem only; solutions wait for the directions ([sparks-plan-generate-directions.md](sparks-plan-generate-directions.md)).

ℹ️ Related specs: the workspace, Plan and how its parts flow, step states, suggestions, how Sparks talks and company knowledge are in [sparks.md](sparks.md). This PRD adds only what's specific to Problem.

## Describing the problem

Dana describes the problem in the message box, in her own words, answering the question that ends Sparks's introduction: "What problem do you want to solve? Describe it in your own words, the way you'd tell a colleague. Rough is fine." There's no form, no required format and no template.

- **Any length, any order.** One sentence or a page of notes.
- **Paste** notes, an email thread or a customer quote.
- **Attach files** with "Attach files" in the message box's "+" menu, or when Sparks asks ("Supporting material"): documents, PDFs, spreadsheets and images, such as research, reports and screenshots. They belong to the concept; Sparks offers to keep them in her Knowledge too ([sparks.md](sparks.md), "Personal knowledge").
- **Dictate** with the microphone button. What she says is written into the message box, and she can edit it before sending.
- **Talk it through** with the main button while the box is empty: a voice conversation with Sparks. Once she types, pastes or dictates anything, the button becomes Send ([sparks.md](sparks.md), "The message box").

Dana can dictate (the mic) or have a voice conversation (the main button while the box is empty). The voice conversation isn't designed yet ([sparks.md](sparks.md), "The message box").

Example, as Dana writes it in the demo:

> Too many people buying online get parts that don't fit their car and send them back. I would like to implement in search results, a way to flag parts that get returned a lot, so people double-check before they buy.

It's rough and in her words: what she sees (wrong parts sent back) and the idea she walked in with. Sparks turns it into a problem statement without the idea ("The problem, not the solution").

The demo's first message is shorter: the problem in one sentence and the idea she walked in with. The enhanced prompt says what an expert would expect to follow (a return, a call to the store, a customer who trusts us less), and the data comes later ("Initial prompt improvement").

The "Problem to solve" card is the **enhanced prompt**: Sparks's analysis of her first message, the problem as it interprets it, filled out with general knowledge of the domain (why parts don't fit, what it usually costs; "Initial prompt improvement"), shown back for her to confirm ("Yes, that's it") or correct ("Not quite"). Nothing goes on from her rough message until she has confirmed it. It exists: it's this card.

The demo's first message is Dana's rough description with her own idea in it, not a ready-made problem statement. Why: it shows Sparks turning her words into a clear problem and keeping her idea for later, instead of repeating her back.

Sparks never asks her to rewrite it in a format ("As a user, I want…") or to use terms she didn't use.

## Initial prompt improvement

**In one sentence:** Sparks rewrites Dana's rough first message the way an expert in the domain would describe the problem, from her words and general knowledge of the field only, and shows it back on the "Problem to solve" card for her to confirm before anything builds on it. The team calls this card the **enhanced prompt** ([sparks.md](sparks.md), "The words Sparks uses").

### Why Sparks does it

Dana's first message is rarely a problem statement. In the demo, it's one sentence about the problem and one about the solution she has in mind. Everything Sparks does next (the questions, the success criteria, the directions, the prototype) builds on the problem, so the problem has to be right, complete and agreed before anything else starts.

- **Dana isn't a designer.** She shouldn't need a method, a template or UX vocabulary to state a problem well. Sparks does the writing; she judges whether it's right ([sparks.md](sparks.md), "How Sparks answers Dana's goals").
- **A rough message leaves gaps.** It often says what she sees but not why it happens, when it goes wrong or what it costs. Building on it as it is would mean filling those gaps later, or never.
- **It starts from a solution.** "Flag parts that get returned a lot" is one answer to the problem. Stating the problem on its own keeps other answers open, hers among them ("The problem, not the solution").
- **Misunderstandings are cheapest now.** If Sparks has misread her, she can tell at a glance and correct it in one step, before a plan or a prototype is built on the wrong problem.
- **She sees that Sparks understood her.** A fuller, more precise version of her problem shows it at once; her own words played back wouldn't.

### How it works

1. **Dana sends her first message:** rough, in her own words, often with the idea she walked in with ("Describing the problem").
2. **Sparks reads it** and looks through company knowledge while it thinks ("Popping the hood on support cases…"). What it finds is kept for the later steps, not put on this card ("What it leaves out").
3. **Sparks takes out her idea** and keeps it under "Ideas to explore" ("The problem, not the solution").
4. **Sparks writes the problem as an expert would,** in two short paragraphs ("Structure"), and shows it on the "Problem to solve" card, with "Suggested by Sparks · from your message", "Yes, that's it" and "Not quite".
5. **Dana confirms or corrects it.** "Yes, that's it" makes it the problem statement. "Not quite" or the pen lets her change it, and her words replace Sparks's ("Edited by you"). Nothing goes on until she has confirmed it.

### What it uses

1. **Her message:** what she sees going wrong, and for whom.
2. **General knowledge of the domain:** what anyone who knows the business knows without looking it up. For "Wrong-part returns": what decides whether a part fits (year, make, model, trim, engine), when a wrong part shows up (at install), and what usually follows (a return, a call to the store, a customer who trusts us less).

### What it leaves out

- **Her idea,** kept under "Ideas to explore" for the directions.
- **Numbers, trends ("returns keep rising") and anything from company knowledge.** Sparks keeps what it found for the steps where a fact answers the question: who it affects, why it matters, what's been tried (in the summary) and Clarify.

### Structure

Two short paragraphs:

1. **What happens and why it goes wrong:** who has the problem and what they can't do (customers can't tell whether a part fits their exact vehicle); why it's hard (what fit depends on, and how easy it is to get one detail wrong); the moment it fails (at install); and what follows (they send it back and start over).
2. **What it costs and what solving it means:** the costs an expert would expect, for the customer, the stores and AutoParts Co.; then one sentence that names the problem as a goal: "The problem to solve is helping customers know a part fits their vehicle before they buy it."

For "Wrong-part returns", her message:

> Too many people buying online get parts that don't fit their car and send them back. I would like to implement in search results, a way to flag parts that get returned a lot, so people double-check before they buy.

becomes the card:

> **Problem to solve**
>
> Customers shopping for parts online can't tell for sure whether a part fits their exact vehicle. Whether it fits depends on details like the year, make, model, trim and engine, and it's easy to get one of them wrong or not know it at all. So they order the part that looks right, only find out it doesn't fit when they go to install it, and have to send it back and start over.
>
> That has a cost on several fronts. Each part that doesn't fit is a return to handle. It often brings a call to the store asking "will this fit?", before or after buying. And a customer who gets the wrong part trusts us less next time. The problem to solve is helping customers know a part fits their vehicle before they buy it.
>
> Suggested by Sparks · from your message

### Why it's built this way

- **She can confirm every word.** Everything on it is something she said, or knows from experience. A number or trend she can't check herself doesn't belong in the first thing she approves: it would turn "Yes, that's it" into a guess.
- **An expert's view, not new facts.** General knowledge of the domain fills in the why and the cost, which she knows but didn't write; company data waits for the steps where it answers a question.
- **The problem stays open.** Without her idea in it, the directions can look at other ways to solve it, her idea among them.
- **Everything after builds on it.** The live app, who it affects, why it matters and Clarify all start from it, so nothing goes on until she confirms it.
- **The last sentence is the target.** Naming the problem as a goal ("helping customers know a part fits… before they buy it") gives the success criteria and the directions something to aim at.

The card uses only her message and general knowledge of the domain, with no numbers, trends or company data, so its source line, "from your message", is true. Why: its second paragraph used to say "Returns keep rising", that stores get "will this fit?" calls and that customers stop buying from us. Those came from an earlier, longer demo message; once it was shortened, they were claims she hadn't made, and "Returns keep rising" is a trend only data can show.

The first card is an expert's description of her problem, from her words alone, headed "Problem to solve". Why: Dana sees at once that Sparks understood her, and can confirm it fully; a figure she can't check herself doesn't belong in the first thing she approves. On the problem card, the part is "Description" ().




## What Sparks does with it

After Dana sends her description, in order:

1. **Reads it,** with any files she attached.
2. **Looks through company knowledge** for anything related ("What AutoParts Co. already knows"). While it does, the conversation shows what it's checking: Sparks thinking, one line at a time: "Popping the hood on support cases…", "Running the numbers on sales and returns…", "Going through the service history of past experiments…" ([sparks.md](sparks.md), "The concept workspace").
3. **Goes through the problem with her one thing at a time** ("One thing at a time"): each reply is a short line, one suggestion on a card and one question, with quick replies. She confirms, says "Not quite" or edits the card, and Sparks moves to the next thing.
4. **Sums it up** once everything needed is agreed: the problem as it stands in her concept, on one card, and what comes next.

Sparks goes through the problem one thing at a time, not as one card with every part at once. Why: Dana should focus on one decision at a time; five parts with their buttons on one card is too much to take in, and it reads like a form instead of a conversation.

### One thing at a time

Sparks asks only about what it drafted. It names the concept itself and takes "What happens today" from her own words, so neither needs a question. Two more questions come right after the problem statement: the live app (Sparks proposes it) and supporting material (optional). With "Wrong-part returns":

1. **The problem statement.** Sparks thinks, one line at a time, while it looks through company knowledge, then:
   > Thanks, Dana. Here's the problem as I understand it, in a bit more detail:
   >
   > [Clarification card. "Problem to solve" Two short paragraphs: "Customers shopping for parts online can't tell for sure whether a part fits their exact vehicle. Whether it fits depends on details like the year, make, model, trim and engine, and it's easy to get one of them wrong or not know it at all. So they order the part that looks right, only find out it doesn't fit when they go to install it, and have to send it back and start over." / "That has a cost on several fronts. Each part that doesn't fit is a return to handle. It often brings a call to the store asking "will this fit?", before or after buying. And a customer who gets the wrong part trusts us less next time. The problem to solve is helping customers know a part fits their vehicle before they buy it." Suggested by Sparks · from your message]
   >
   > ["Yes, that's it", "Not quite"]
2. **The live app** ("The live app"). Sparks says it named the concept, why it asks and where its guess comes from:
   > Good. I've named this idea "Wrong-part returns". You can rename it any time.
   >
   > Next, the app you want to improve. I'll start the prototype from what's already live there. You mentioned search results, so my guess is the online store.
   >
   > [Clarification card. "Which app does this improve?" "AutoParts Co. online store, search results" / "https://shop.autopartsco.example/search" Suggested by Sparks · from your message and product ecosystem]
   >
   > ["Yes, that's the one", "Not quite", "It's a new app"]
3. **Supporting material** ("Supporting material"), optional:
   > Got it. I'll start from what's live there today.
   >
   > **Do you have anything that supports your idea?**
   >
   > A report, a document, customer feedback or a link all help. Attach files, add from your library, or paste a link or notes in the message box. It's optional, and I'll keep what you add with this idea, marked as yours.
   >
   > ["Nothing to add", "Attach files", "Add from library"]
4. **Who it affects.** Sparks says what she added, and where its guess comes from, then asks on the card:
   > No problem. (or 'Thanks, I've added "returns-report-q3.pdf" to this idea, marked as yours.') Next, who runs into this most. My guess comes from what customers ask stores about fit.
   >
   > [Clarification card. "Who does it affect most?" "Do-it-yourself customers buying online, most often for vehicles more than 10 years old." Suggested by Sparks · from customer intelligence]
   >
   > ["Yes, that's right", "Not quite"]
5. **Why it matters.** The cost (the number that sizes it is already in the statement) and the assumption called out in plain words, then the card:
   > Last, why it matters. The returns cost shipping, handling and store time (business performance, Aug–Oct 2026). You agreed that a customer who gets the wrong part trusts us less next time. No data shows that yet, so I've marked it as an assumption we'll check later.
   >
   > [Clarification card. "Why does it matter?" "Each return costs shipping, handling and store time, and customers who return a part that doesn't fit are less likely to buy from us again." Suggested by Sparks · from business performance, Assumption]
   >
   > ["Yes, that's right", "Not quite"]

   "You agreed", not "You said": the lost trust comes from the enhanced prompt (the "Problem to solve" card) she confirmed, not from her own message.
6. **The summary.** What's been tried, in one line, then the problem as it stands, then what's next:
   > That's the problem. One thing before we dig in: AutoParts Co. tested a vehicle selector on product pages last year. Customers who used it returned far fewer parts as "doesn't fit", but most skipped it (previous experiments, 2025). I'll bring it back when we look at solutions.
   >
   > **Here's the problem as a whole:** (bold, as it introduces the summary)
   >
   > [Problem summary]
   >
   > Now let's understand it better. The data already tells me how often this happens and what it costs, so I'll only ask what it can't, one question at a time.
   >
   > [Clarification card: Clarify's first question ([sparks-plan-clarify.md](sparks-plan-clarify.md), "Starting the questions")]

#### The live app

The app the idea improves, with its address. Needed to move on: the prototype starts from what customers or teams use today, so it has to be defined in Plan ([sparks-prototype.md](sparks-prototype.md), "What Sparks builds").

- **Sparks proposes it,** with its address, from her message and the product ecosystem. Dana confirms it; she doesn't have to look up a URL.
- **"Not quite"** or the pen: she types the app or pastes its address. "Thanks, I've changed the app. The prototype will start from what's live there, so it has to be the right one."
- **"It's a new app":** nothing is live yet. The answer reads "A new app, with nothing live yet", and Sparks says what it starts from instead: "Got it. With nothing live yet, I'll start from AutoParts Co.'s design system."
- **She can change it later** with the pencil on her answer ([sparks.md](sparks.md), "Changing an answer").

The live app is a question of its own right after the problem statement, with Sparks's guess to confirm, and it always ends defined: an app, or "It's a new app". Why: a prototype that doesn't start from what's in production looks and works like something else, and reviewers can't tell what's new.

⚠️ **Gap:** the demo doesn't open the address. The prototypes' screens are drawn for AutoParts Co.'s store, whatever address she gives.

🙋 **Open question:** how Sparks reads an app that needs a sign-in (an internal app, such as Flow), and whether it can always read what's live.

#### Supporting material

A reminder, not a requirement: Sparks asks once for anything that supports the idea (a report, a document, customer feedback, a link).

- **"Attach files"** opens the file picker and isn't sent as an answer. The files show in the message box, each with a remove button, and go with Send or Enter; they need no text with them here. Her bubble shows the file names.
- **"Add from library"** opens the dialog with everything in My library ([sparks.md](sparks.md), "Adding from My library") and isn't sent as an answer. "Add to idea" there is her answer: her bubble lists what she picked, and Sparks thanks her by name and goes on. "Add from library" in the "+" menu does the same.
- **Icons:** "Attach files" (a paperclip) and "Add from library" (a folder) have the icons they have in the "+" menu.

  "Add from library" is one of the replies, and both have icons. Why: what supports an idea is often in My library already.
- **A link or notes** typed in the message box count too: "Thanks, I've added that to this idea, marked as yours."
- **"Nothing to add"** (↵) goes on: "No problem." If files are waiting in the message box, it sends them instead.
- **Later,** "Attach files" in the "+" menu adds files to any message, with or without text ([sparks.md](sparks.md), "The message box").
- What she added is listed in the Problem summary ("**What you added:**") and belongs to the concept ([sparks.md](sparks.md), "Personal knowledge"). It's also in "Library", in the header, where she can add more or remove some; the summary follows ([sparks.md](sparks.md), "The idea's library").

Sparks asks for supporting material as its own optional question, after the live app. Why: Dana often has a report or customer feedback and doesn't think to bring it; on the same card as the live app it would be two questions at once and easy to skip past.

⚠️ **Gap:** in the demo, Sparks keeps the file names, links and notes but doesn't read them, and doesn't offer to keep them in her Knowledge yet.

The first card, "Problem to solve", is Sparks's improvement of her first message ("Initial prompt improvement").

How it behaves:

- **One question per reply, on its card:** a short lead line from Sparks, then the clarification card with the question, Sparks's answer and the answer buttons. The buttons show once the reply has finished coming in, and only while it's the last message.
- **"Yes" confirms** the answer: the card folds to its question, her bubble shows the answer itself, not "Yes, that's it" (sparks.md, "Talking with Sparks"), and Sparks asks the next thing. **"Not quite"** folds the card to its question, with no bubble and no reply, and the message box takes focus, with Sparks's answer as its placeholder; Tab puts it in the box to edit (sparks.md, "Talking with Sparks"). Typing an answer instead of picking a quick reply works the same. Her words replace Sparks's on the card, marked "Edited by you", and the next reply opens with what changed and why it matters, in its own paragraph, then the next thing as usual. An edit on the card, then "Yes", gets the same. For "Wrong-part returns":
  - **The problem statement:** "Thanks, I've changed the problem to your words. Everything else in your plan builds on it, so it should say it the way you see it." (in place of "Good.", before the concept's name)
  - **The live app:** "Thanks, I've changed the app. The prototype will start from what's live there, so it has to be the right one."
  - **Who it affects:** "Thanks, I've changed who it affects. It decides whose orders and returns I look at from here, so I'd rather go with what you know."
  - **Why it matters:** "Thanks, I've changed why it matters. What success looks like comes from it later, so it should be in your words." (before "That's the problem.")
  - **When her words start "Add…", "Also…", "And also…", "Yes, and also…", "Plus…" or "Include…",** they're added to Sparks's answer instead of replacing it, and the line says so: "Thanks, I've added that to the problem. Everything else in your plan builds on it.", "Thanks, I've added that to the app. The prototype will start from what's live there.", "Thanks, I've added that to who it affects. It decides whose orders and returns I look at from here.", "Thanks, I've added that to why it matters. What success looks like comes from it later."

  "Add…" adds to Sparks's answer instead of replacing it ([sparks.md](sparks.md), "Talking with Sparks").

  After a correction, Sparks says what changed and why it matters, then moves on (sparks.md, "How Sparks talks to Dana"). Why: moving straight on left Dana unsure her correction landed.
- **Company knowledge comes in where it helps,** one fact at a time: the number that sizes the problem with "why it matters", where the guess comes from with "who it affects", and what's been tried in the summary. Each fact shows its source and period in brackets.
- **How a reply comes in:** the lead line writes itself in, then the card appears (MOTION.md → AI messages).

⚠️ **Assumption:** something already tried is mentioned in the summary, once the problem is agreed, not in the first reply ("What AutoParts Co. already knows"). Why: Dana first agrees on the problem without a second thing to take in, and still hears about the experiment before any questions or solutions. A similar concept still comes first, because she may want to open it instead.

Her answer after "Not quite" replaces the card's text, as an edit does, and the summary shows it "Edited by you".

### The clarification card

One question from Sparks, with its answer, in the conversation (sparks.ds "clarification-card", 55:2585):

- **On a gray panel:** the question in semibold ("Who does it affect most?"), Sparks's answer, an edit button (a pen) beside them, and where the answer came from: "Suggested by Sparks", "Suggested by Sparks · from customer intelligence" (the source it draws on) or "Edited by you". An answer that relies on something unproven shows the "Assumption" label on its own line between the question and the answer.
- **Under the panel, the answer buttons:** "Yes, that's it" (or "Yes, that's right") and "Not quite".
- **Edit** (Figma "State=Edit") turns the answer into a field with "Save" and "Cancel" (Enter saves, Esc cancels); where it came from and the answer buttons wait until she's done. Saved, it reads "Edited by you".
- **Answered,** the buttons and the pen go: she changes it from then on by asking Sparks, or, once Plan is done, in the plan.

The "Assumption" label sits on its own line between the question and the answer on a clarification card, and between the part's name and its text in the Problem summary and the brief. Why: it's what Dana should notice before reading the answer, not a footnote.

There's no Accept or Dismiss: the answer buttons confirm it, and "Not quite" or Edit change it.

Each question is a clarification card, with the question, Sparks's answer and the answer buttons together on it (sparks.ds). Why: Dana sees what's asked, the proposed answer and how to reply in one place, and Sparks's text stays a short lead line.

### The Problem summary


The card is called "The problem", with a line on what it's for. Why: next to Clarify's card ("What we know"), she can tell at a glance which is which (sparks.md, "Cards in the conversation").

The problem as it stands in her concept, once everything needed is agreed: a short conversational summary in Sparks's reply, with no card around it, instead of labeled parts, the way Sparks would sum it up for a colleague:

- **A paragraph** on what happens and who it affects most.
- **"It matters because:"** with a short list of reasons; anything still an assumption is said in words ("No data shows that yet, so it's an assumption we'll check.").
- **A line on her idea,** kept for when we look at solutions.
- **The app it improves,** with its address, and **what she added,** when she added something.
- **One sources line** at the bottom: "From your message, product ecosystem, customer intelligence and business performance." ("your changes" once she's corrected a part; "what you added" when she added something).

Once she's corrected a part, the summary uses her words (the demo puts them in place: "**Who it affects most:** …", "**Why it matters:** …"). It's read only, and it shows once, at the end of this part.

No card around the summary: it's part of Sparks's reply, and follows it; at its end, Sparks says "Done. The problem is in your concept." Why: as plain text, it reads as Sparks summing up, not as a form to review.

The Problem summary is a short conversational summary, with a list where it helps, not a list of labeled parts (Name, Description, Who it affects, What goes wrong, Why it matters, each with its source). Why: it reads as Sparks summing up what they agreed, the labeled parts repeated each other ("What goes wrong" said what the description already said), and one sources line is enough at this point.

⚠️ **Gap:** the knowledge items can't be opened yet, and their sources aren't links.

- Dana can also edit the Problem section in the plan, once Plan is done. Sparks confirms it in the conversation and uses the edit from then on ([sparks.md](sparks.md), "The concept workspace").

## The problem, not the solution

People often describe a problem through the solution they have in mind: "We need a fitment checker." When Dana does:

- Sparks asks what the solution would fix, in her terms: "What would a fitment checker fix for customers?"
- The problem statement describes what goes wrong, not the solution.
- Her solution is kept in "Ideas to explore", never dropped, and comes back as a starting point in the directions.

Sparks tells her what it did: "I've kept the fitment checker under Ideas to explore. We'll come back to it when we look at solutions."

When she describes the problem and an idea together, as in the demo, the problem is already there, so Sparks doesn't ask what the idea would fix. It writes the problem without the idea and doesn't mention it in its reply: it thanks her and goes straight to the problem ("Thanks, Dana. Here's the problem as I understand it, in a bit more detail:"). Where it's kept ("Ideas to explore") shows in the Problem summary.

Sparks's first reply doesn't say it's keeping her idea for later. Why: "I'll keep your idea for later, when we look at solutions" was hard to follow at that point and broke the flow from her message to the problem; the idea still waits in "Ideas to explore" and comes back with the directions.

Sparks's first reply talks to Dana, short and plain: it thanks her by name, and checks the problem first ("Problem to solve": the introduction just asked "What problem do you want to solve?", so the card doesn't ask it again). It doesn't name the section or repeat her idea back. Why: her first message gets a reply that sounds like a person listening, not a report of what Sparks filed where.

Why: a problem written around one solution rules out the others before anyone has looked at them. Keeping her idea makes sure it's considered without narrowing the problem.

## When the description needs more

To write a problem statement Sparks needs three things: **who** has the problem, **what goes wrong** for them, and **why it matters**. It works out what it can from her description and company knowledge, and asks only for what's still missing.

- **Something missing:** Sparks asks for that one thing, with its best guess: "Who runs into this most? My guess is do-it-yourself customers buying online for older vehicles."
- **Too vague** ("Checkout needs to be better"): Sparks asks for a real example: "Tell me about the last time this came up. What happened?" A story gives it more to work with than an abstract question.
- **Several problems in one description:** Sparks lists them and asks which one to start with. Each of the others gets a "Start a concept for this" button. Selecting it saves that problem as a new concept in "Your ideas" on the start page, at the start of its Plan, without leaving the current one.
- **Not a problem Sparks can help with** (a request about a single order, a question about someone's account): Sparks says it's for product problems and suggests where to go instead.

**What she might write, in the demo.** The demo starts from Dana's scripted message, but she can type anything:

- **Too little to work with** (a few letters, a couple of words): "I'm not sure I follow yet. What's going wrong, and for whom? A sentence or two in your own words is enough, the way you'd tell a colleague." It waits for her next message.
- **The demo's problem, in other words** (anything about parts that don't fit, or returns): the sharpened card above.
- **Another problem:** Sparks doesn't invent data: "Thanks, Dana. I couldn't find anything about this in AutoParts Co.'s data yet, so I've kept it to what you told me. We'll fill in the rest together." The card holds her words ("Suggested by Sparks · from your message"), and the concept is named from her first words.

⚠️ **Gap:** after another problem, the next steps (who it affects, why it matters, the questions) still follow the demo's script about wrong-part returns. The demo isn't live AI.

Questions about how often, how much, evidence and constraints wait for Sparks's questions ([sparks-plan-clarify.md](sparks-plan-clarify.md)). Sparks doesn't ask them here.

Why: Problem should take minutes, not an interview. Its job is to agree on the problem; the questions go deeper.

## What AutoParts Co. already knows

Problem uses Dana's personal knowledge and four of the company knowledge sources ([sparks.md](sparks.md), "Knowledge and Connections"):

- **Your knowledge:** the notes, reports and files Dana keeps in her Knowledge.

- **Customer intelligence:** support cases, feedback and research about the problem.
- **Business performance:** the numbers it touches, such as sales, conversion and returns.
- **Product ecosystem:** existing apps or workflows that already deal with part of it.
- **Previous experiments:** anything AutoParts Co. has tried on the same problem, and what it learned, including earlier Sparks concepts that were advanced or stopped ([sparks-review.md](sparks-review.md), "After the decision").

Rules for this part:

- Sparks brings in one item at a time, with the question it helps answer ("One thing at a time"). The Problem section lists every item Sparks found, as suggestions Dana keeps or dismisses.
- Each item is one line: what it says, where it comes from and the period it covers. Dana can open the source if she has access to it.
- **Similar concepts are called out too:** Dana's own concepts, concepts shared with her, and decided concepts in Previous experiments. "You started 'Vehicle lookup' in March; it's on Prototype. Want to open it instead, or keep going?" Why: two people shouldn't explore the same idea without knowing it.
- **Something already tried or built is called out first.** "AutoParts Co. tested a vehicle selector on product pages last year. Want to see what it found?" or "Care already records 'doesn't fit' as a return reason." Dana should know before she spends time on something that's been tried or built.
- **Nothing found:** "I didn't find anything about this in company knowledge. That's fine: I'll ask you a few questions next." It doesn't block Plan.
- **A source can't be reached:** "I couldn't check {source} just now, so I may be missing something." The rest of Plan goes on.

## The Problem section

What this part adds to the concept, once Dana approves it. Sparks writes it into the concept's spec automatically; Dana sees it in the Problem summary and, once Plan is done, in the plan ([sparks.md](sparks.md), "The finished plan").

| Part | Holds | Needed to move on |
| --- | --- | --- |
| Concept name | A short name Sparks proposes from her description, for example "Wrong-part returns" | Yes (Sparks fills it in) |
| Problem statement | Two short paragraphs: what happens and why it goes wrong, then what it costs and the problem to solve ("Initial prompt improvement") | Yes |
| The app it improves | The live app and its address, or that it's a new app | Yes |
| Who it affects | The people who have the problem: customers, a team, a partner | Yes |
| What happens today | What goes wrong, and when, in Dana's words | Yes |
| Why it matters | The effect on those people and on AutoParts Co. | Yes |
| What AutoParts Co. already knows | The items Sparks found, each with its source | No |
| Ideas to explore | Solutions Dana mentioned, kept for the directions | No |
| What you added | The files, links and notes Dana added | No |

- Each part shows where it came from: Dana, company knowledge, or a suggestion from Sparks ([sparks.md](sparks.md), "Suggestions").
- "Why it matters" may rely on an assumption ("customers who return a part that doesn't fit are less likely to buy again"). If no evidence supports it, it's labeled "Assumption" and Sparks's questions pick it up.

## Finishing this part

Dana can move on when every part marked "Needed to move on" has been confirmed or written by her.

- Sparks asks about each part it drafted in turn ("One thing at a time"); confirming the last one completes the Problem section.
- Until the needed parts are complete, Sparks asks for the next one instead of moving on.
- Once they're all confirmed, Sparks shows the Problem summary, whole:
  > That's the problem. One thing before we dig in: AutoParts Co. tested a vehicle selector on product pages last year. […] I'll bring it back when we look at solutions.
  >
  > **Here's the problem as a whole:**
  >
  > [Problem summary card, "Draft"]
- No button: the summary goes in the plan and Sparks goes on to the next section by itself, in the same reply, after a zigzag divider ([sparks.md](sparks.md), "Talking with Sparks"). To change the summary, she changes an answer (its pencil).
- Sparks puts the Problem section in the concept (the card says "In your concept"), and the same reply moves on: "Done. The problem is in your plan." (regular, at the summary's end), the divider, Clarify's title in bold ("**Now, let's understand it better and clarify a few things.**") and why it asks so little, then Clarify's first question on its card ([sparks-plan-clarify.md](sparks-plan-clarify.md), "Starting the questions"). There's no button or page between parts, and no reply that only announces questions without asking one ([sparks.md](sparks.md), "Plan").

The Problem summary ends with neither a question nor a button: she has already confirmed each thing in it, so Sparks goes on ([sparks.md](sparks.md), "Talking with Sparks").

Changing the problem after it's approved follows the overview's rule: the sections after it in Plan, and later steps that are Done, become Needs a check ([sparks.md](sparks.md), "Moving through the steps").

## States

| State | What shows | What Dana can do |
| --- | --- | --- |
| Sparks is reading | Her message, then Sparks thinking ("Popping the hood on support cases…") | Wait, stop the reply |
| Asking | One reply at a time: a short lead line, then the clarification card with the question, Sparks's answer and the answer buttons | Confirm it, say "Not quite", edit the card, or reply in her own words |
| Asking for supporting material | The question, with "Nothing to add", "Attach files" and "Add from library"; files picked show in the message box | Attach files, remove one, add from My library, paste a link or notes, or go on without |
| Something missing | Sparks's question about the missing part; the card says what's missing | Answer, or write it on the card |
| Several problems | The list of problems, with "Start a concept for this" for each one she isn't starting with | Pick one; save others as concepts |
| Nothing found in company knowledge | "I didn't find anything about this in company knowledge…" | Go on |
| A source can't be reached | "I couldn't check {source} just now…" | Go on; ask Sparks to check again later |
| An attachment can't be read | "I couldn't open {file name}. Try another format, or paste the text." | Attach again, paste the text |
| Agreed | The summary: what's been tried, the Problem summary, what comes next | Go on to the questions; change it by asking Sparks, or from the plan once Plan is done |

## Checks

What Dana says → what Sparks must do:

| Dana | Sparks must |
| --- | --- |
| "Customers keep buying the wrong parts." | Draft a problem statement and ask one question about what's missing (why it matters), not several |
| "We need a fitment checker." | Ask what it would fix, write the problem without the solution, and keep the fitment checker under Ideas to explore |
| The problem and an idea in one message ("…My idea: in search results, flag parts that get returned a lot") | Write the problem without the idea, keep the idea under Ideas to explore and say so in one line, without asking what it would fix |
| "Checkout needs to be better." | Ask for a recent, real example before drafting anything |
| A paragraph with three different problems | List them, ask which to start with, and offer "Start a concept for this" for the others |
| A problem AutoParts Co. has already tested | Mention the experiment and what it found before anything else it found |
| A problem with nothing in company knowledge | Say so in one line and go on, without blocking Plan |
| "It's the counter app" (or its address), after "Not quite" on the app | Put it on the card in her words and say the prototype will start from what's live there |
| "It's a new app" | Record that nothing is live yet, and say it starts from the design system |
| A file, a link or notes as supporting material | Say what it added, marked as hers, and ask the next thing |
| "Where's order 48213?" | Say Sparks is for product problems and suggest where to check an order |
| "I don't know why it matters." | Offer its best guess from company knowledge, labeled as an assumption, and go on |
| "Yes, that's it." | Confirm the suggestion and ask the next thing; after the last one, show the Problem summary and move on to the questions, saying so in one line |

## Accessibility

- "+" is named "Add to message" and the microphone "Dictate". Attached files are a list named "Attached files"; each remove button is named for its file ("Remove returns-report-q3.pdf"), and removing one, or picking files, puts focus in the message box. While dictating, the button is named "Stop dictating". The main button is named "Start voice conversation" while the box is empty, and "Send" once there's text.
- Each company knowledge item in a reply is read as one line, with its source.
- Each clarification card is a group named by its question ("Who does it affect most?"), and reads the answer and where it came from; the pen is named after the question ("Edit: Who does it affect most?"). The Problem summary is a region named "Problem".
- When a needed part is missing, the card says which before the approval question.

## Acceptance Criteria

- Given a new concept opened with "New idea", when Dana sends the demo's first message ("Too many people buying online get parts that don't fit their car… I would like to implement in search results, a way to flag parts that get returned a lot…"), then Sparks thanks her by nameand shows a clarification card: "Problem to solve", Sparks's fuller description of it (from her message and general knowledge of the domain, with no numbers, trends or company data), and "Yes, that's it" and "Not quite"; the problem statement doesn't mention it.
- Each reply in this part asks one thing, with at most one clarification card; confirming it brings the next one (the live app, supporting material, who it affects, then why it matters), then the Problem summary.
- Plan never goes past the live app without an app, with its address when Sparks knows it, or "It's a new app"; supporting material can always be skipped with one answer.
- Dana can describe the problem by typing, pasting, attaching files or dictating; nothing asks her to follow a format.
- Given a description that names a solution, the problem statement doesn't contain the solution, and the solution appears under Ideas to explore.
- Given a description missing who, what or why, Sparks asks only for the missing part, one question at a time.
- Given several problems in one description, Sparks lists them, and selecting "Start a concept for this" adds a new concept to "Your ideas" without leaving the current one.
- Sparks's reply shows at most three company knowledge items, each with its source; a previous experiment or existing app on the same problem comes first.
- Given nothing related in company knowledge, Sparks says so and Dana can still approve the problem.
- Sparks moves on to its questions only when the concept name, problem statement, the app it improves, who it affects, what happens today and why it matters have been accepted or written by Dana, and she has approved the problem; there's no button or page between the two.
- Once approved, the Problem section is in the plan (shown as a document once Plan is done) without Dana writing anything there.
- Sparks doesn't ask about frequency, evidence or constraints during Problem.

## Open Questions

- 🙋 Where does Sparks send someone who asks about a single order or account? Depends on which AutoPartsHUB app handles it.

## Out of scope

- The workspace, Plan and how its parts flow, step states, suggestions, Sparks's voice and company knowledge access: [sparks.md](sparks.md).
- Frequency, evidence and constraints: [sparks-plan-clarify.md](sparks-plan-clarify.md).
