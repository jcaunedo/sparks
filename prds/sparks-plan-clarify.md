<!--
Created: Nov 21, 2026
Created by: Julio Caunedo
Last updated: Nov 24, 2026 (Purpose opens with what Clarify is for, and the demo's one-sentence version; after the summary, Sparks goes on by itself, with no button; a zigzag divider ends the section, and the summary ends with "Done. … is in your plan."; the step "Validate" renamed "Evaluate"; after a correction, Sparks shows the updated summary before asking again; "in your plan" instead of "in your blueprint"; Plan becomes the Blueprint once it's done: what this part adds shows there, not in a panel during Plan; confirmations ("Done. … in your blueprint.") are regular; the bold line names what comes next; Sparks thinks one line at a time, in automotive terms, before it replies; after "Looks right, continue" on the brief, Sparks opens Success with "Now, let's define what success looks like."; Sparks's confirmation says "in your blueprint"; what we know is approved with "Looks right, continue", no question; "What we know" is a conversational summary in Sparks's reply, not a card; the brief's card renamed "What we know", with plainer part names, and without "Who's affected most", which is on the problem card; after a correction, Sparks says what changed and why it matters before the next question; Clarify starts in the reply that puts the problem in the concept, after "Looks right, continue" on the Problem summary; "Looks right, continue" goes straight into Success's first question, the goal; the brief summary built: the card, its labels, approval and corrections; "Who's involved" filled from data, not asked; the third question, about limits, built; the second question, "Why does it happen?", built; each reply opens by taking the last answer in one line; one question at a time from the first reply, on clarification cards; the first question built; Part of Plan: one conversation, the brief as a card, no step buttons)
Scope: the Clarify part of Plan, the second of Plan's five parts: how Sparks gathers evidence, what it asks Dana, how facts, Dana's answers and assumptions are told apart, and the Problem brief it adds to the concept.
Purpose: defines how an agreed problem becomes a brief the team can trust, so success measures and solutions rest on what's known and what's assumed is visible.
-->

# Plan: Clarify — Sparks

**Location:** the second part of Plan ([sparks.md](sparks.md), "Plan"). The conversation reaches it as soon as Dana approves the problem ([sparks-plan-problem.md](sparks-plan-problem.md), "Finishing this part"). She can come back to it by asking Sparks, or, once Plan is done, from the plan ("Let's go back to the brief").
**Audience:** experienced AutoParts Co. employees who know the business but aren't designers or engineers. The reference user is Dana, a Senior Product Manager.
**Description:** the part of Plan where Sparks fills in what AutoParts Co.'s data already says about the problem, asks Dana only what the data can't answer, and turns it all into a problem brief.
**Status:** defined. Built as a reference layout: the first three questions ("What do customers do today when they're not sure a part fits?", right after the Problem summary, then "Why does it happen?" and "What does a solution have to work around?") on clarification cards, with "Yes, that's right", "Not quite" and "I'm not sure" (`SparksWorkspace`, `ClarificationCard`). Then the Problem brief as a summary (`BriefCard`), after which Sparks goes straight into Success's first question ([sparks-plan-define-success.md](sparks-plan-define-success.md)).

---

## Purpose

**To understand the problem well enough to choose the right solution.** Problem agrees on *what* the problem is. Clarify fills in what Sparks still needs to know about it: what customers do today, why it happens and what any solution has to work around.

It does that in two ways:

- **It combines what the company knows with what Dana knows.** The data already says how often it happens and what it costs. Sparks asks Dana only about what the data can't answer.
- **It separates facts from guesses.** Each answer is recorded as evidence, as Dana's own knowledge or as an assumption. The assumptions carry forward to be checked in Evaluate, so nobody builds on a guess without knowing it.

It ends with a summary, "Here's what we know so far," which the rest of Plan builds on: the success criteria, the directions and the comparison.

In one sentence, for the demo:

> The purpose of Clarify is to get from *what* the problem is to *why* it happens, and to be honest about what we know and what we're still assuming, before we think about solutions.

After Problem, Dana and Sparks agree on what the problem is. Clarify answers how big it is, who it hits hardest, what it costs, what people do about it today, why it happens and what limits any solution. Those answers decide which success measures make sense and which solutions are worth exploring.

Sparks does the homework first. It reads company knowledge and Dana's personal knowledge before asking anything, so it asks Dana only what she knows and the data doesn't. She answers from experience; when she doesn't know, that's recorded as an assumption, not a blocker.

It works when Dana can see at a glance what the brief knows for sure, what she believes from experience, and what's still a guess.

Dana doesn't see "Clarify" as a stage. To her, it's Sparks asking a few questions in the same conversation.

ℹ️ Related specs: the workspace, Plan and how its parts flow, step states, suggestions, how Sparks talks and company knowledge are in [sparks.md](sparks.md). The problem statement comes from [sparks-plan-problem.md](sparks-plan-problem.md).

## Starting the questions

~~1. Sparks looks through company knowledge and Dana's personal knowledge for evidence on each part of the brief ("The Problem brief"). The conversation shows what it's checking: "Looking at support cases, sales and returns…"~~
~~2. It fills in every part it can, each with its source, as suggestions on a Problem brief card in the conversation.~~
~~3. It tells Dana what it found and what it still needs.~~

~~Clarify starts in the same reply as the Problem summary~~ Clarify starts in the reply that puts the problem in the concept, after Dana says the Problem summary looks right ([sparks-plan-problem.md](sparks-plan-problem.md), "Finishing this part"), with no button and no wait. The reply opens "Done. The problem is in your ~~concept~~ plan." (regular), then Clarify's title in bold: "**Now, let's understand it better and clarify a few things.**" Then:

1. Sparks has already looked through company knowledge and Dana's personal knowledge for each part of the brief ("The Problem brief"), and fills in what it can, with its sources, in the background.
2. It says in one line what comes next, and why it asks so little:
   > ~~Now let's understand it better.~~ **Now, let's understand it better and clarify a few things.**
   >
   > The data already tells me how often this happens and what it costs, so I'll only ask what it can't, one question at a time.

   ✅ **Resolved:** the confirmation is regular and Clarify's start is the bold line, like every part of Plan ([sparks.md](sparks.md), "Cards in the conversation").
3. It asks the first question right away, on a clarification card, with its best guess and where the guess comes from:
   > [Clarification card. "What do customers do today when they're not sure a part fits?" "Most call or visit a store to ask. Some check the fit list on the product page, and some order two options and send back the one that doesn't fit." Suggested by Sparks · from customer intelligence]
   >
   > ["Yes, that's right", "Not quite", "I'm not sure"]

~~> I've filled in what AutoParts Co.'s data says: how many customers this affects and what it costs in returns and lost repeat purchases. I have a few questions only you can answer. First one: what do customers do today when they're not sure a part fits, besides calling a store?~~

✅ **Resolved:** Clarify asks one question at a time from its first reply, each on a clarification card like Problem's, and doesn't show the whole brief as a card of suggestions first. The brief builds up in the background; Dana sees it whole when Sparks sums it up at the end ("Finishing this part"). Why: the same reason as Problem: one decision at a time, and no form to review before the first question.

- **The next question comes in the reply that takes her answer,** after one line on how Sparks took it: "Got it." for a yes, ~~"Thanks, I've added that to the brief." for an answer in her own words,~~ what changed and why it matters, in its own paragraph, for an answer in her own words (after "Not quite", or an edit on the card, which also puts her words on the card, "Edited by you"), "No problem. I'll note it as an assumption, and we'll check it in Evaluate." for "I'm not sure". Never an acknowledgement on its own, then the question in a second reply. The corrections, for "Wrong-part returns":
  - **What people do today:** "Thanks, I've changed what customers do today. Any solution has to fit how people buy now, so the brief should have it right."
  - **Why it happens:** "Thanks, I've changed why it happens. The solutions we look at will go after the cause, so your view counts more than my guess."
  - **Limits:** "Thanks, I've changed what a solution has to work around. I'll check every direction against these limits, so they need to be right." (before "That's all I need to ask.")

  ✅ **Resolved:** a correction gets what changed and why it matters, not just "added to the brief" (sparks.md, "How Sparks talks to Dana"). Why: Dana sees her correction landed and what it will shape.
- **The second question, for "Wrong-part returns": why it happens.** The data can't say, so Sparks's guess starts as an assumption ("The Problem brief"):
  > Got it. Next, why it happens. Nothing in the data says for sure, so this is my best guess:
  >
  > [Clarification card. "Why does it happen?" "Customers often don't know their vehicle's exact details, like the trim or engine size, and our fit data has gaps for vehicles more than 10 years old." Suggested by Sparks, Assumption]
  >
  > ["Yes, that's right", "Not quite", "I'm not sure"]
- **The third question: what any solution has to work around** ("Limits"). It comes from engineering context, so it's not an assumption:
  > Got it. Next, what any solution has to work around. Here's what I found in engineering context:
  >
  > [Clarification card. "What does a solution have to work around?" "Product pages can't change during the holiday freeze, until early January, and fit data comes from a supplier feed that the catalog team updates once a month." Suggested by Sparks · from engineering context]
  >
  > ["Yes, that's right", "Not quite", "I'm not sure"]
- **Typing instead of answering** is fine: what she writes is added to the brief as hers ("From Dana"), and Sparks asks the next question.
- **Answered,** the card loses its answer buttons and its pen, as in Problem. "I'm not sure" labels Sparks's guess "Assumption" on the card, and Sparks says so in one line at the start of its next reply.

If company knowledge has nothing for a part, Sparks says so once, and asks Dana about it instead.

## Asking Dana

- **Only what the data can't answer.** Sparks doesn't ask Dana for something company knowledge or her knowledge already answered. It shows that answer on the card and lets her correct it.
- **One question at a time, most important first.** The parts that most shape the rest of Plan come first: who's affected most, how big the problem is, what it costs.
- **Its best guess comes with each question,** with quick replies: "Yes, that's right", "Not quite" and "I'm not sure".
- **"I'm not sure" is a good answer.** Sparks records its best guess as an assumption and moves on: "No problem. I'll note it as an assumption, and we'll check it in Evaluate."
- **Short.** Sparks asks a handful of questions, not an interview. Once every part of the brief has an answer or an assumption, it offers to move on.
- **Dana can stop the questions** at any time ("Let's move on"). Unanswered parts become assumptions.
- ~~**The card fills in as she answers.** Each answer updates its part of the Problem brief card, so she sees the brief build up without leaving the conversation.~~ **The brief fills in as she answers,** in the background, in the plan (shown as a document once Plan is done); she sees it whole in the summary at the end.

✅ **Resolved:** Sparks asks up to six relevant questions, and none that knowledge already answers. Enough to fill the gaps the data leaves, short enough that Clarify takes minutes.

## Digging deeper

Dana can ask Sparks to look into something at any time: "Can you check whether this is worse for brake parts?" Sparks looks through company knowledge and adds what it finds to the brief, with the source. If it can't find it, it says so and suggests which department might know.

She can also add her own evidence: paste figures, attach a report or a survey, or share what she's heard from a team. Sparks adds it to the brief as hers, and offers to keep it in her Knowledge too ([sparks.md](sparks.md), "Personal knowledge").

## When the data and Dana disagree

Every part of Sparks follows the same rule ([sparks.md](sparks.md), "When the data and Dana disagree"). In Clarify, it looks like this:

> You mentioned most wrong-part returns come from first-time customers. Returns data shows something different: about two thirds are from repeat customers (returns, last 90 days). Want to keep your answer, use the data, or keep both and check it later?

If she keeps both, the part of the brief shows both and becomes an assumption to check in Evaluate.

## When the problem turns out different

Sometimes the evidence shows the problem isn't quite what Problem said: "doesn't fit" returns turn out to be mostly parts for vehicles older than 15 years, where the catalog's fit data has gaps. Sparks suggests an updated problem statement, as a suggestion on the Problem card, and explains why. If Dana accepts it, the Problem section changes and the questions go on. Nothing changes until she accepts.

## Solutions that come up

As in Problem, a solution Dana mentions ("We could add a 'fits your car' badge") goes to "Ideas to explore", and Sparks keeps the question on the problem ([sparks-plan-problem.md](sparks-plan-problem.md), "The problem, not the solution"). Success measures wait for the success part ([sparks-plan-define-success.md](sparks-plan-define-success.md)).

## The Problem brief

What this part adds to the concept, once Dana approves it. Sparks writes it into the concept's spec automatically; Dana sees it on the ~~Problem brief~~ "What we know" card and, once Plan is done, in the plan ([sparks.md](sparks.md), "The finished plan").

**On screen it's "What we know",** with the line "What the data says, what you told me, and what we still need to check." Sparks calls it the same in the conversation ("Here's what we know so far:"); the spec calls it the Problem brief. It holds only what Clarify adds: who it affects is on the problem card ([sparks-plan-problem.md](sparks-plan-problem.md), "The Problem summary") and isn't repeated. Its parts on the card, in order: "How often it happens", "What it costs us", "What customers do about it", "Why it happens", "What we've tried", "What a solution has to work around", "Who's involved", then "Still to check" (the assumptions).

✅ **Resolved:** the card is called "What we know", not "Problem brief", its parts are named in Dana's words, and "Who's affected most" is dropped from it. Why: next to "Problem", "Problem brief" read as the same thing again, and the two cards showed the same sentence for who it affects, so Dana approved it twice.

| Part | Holds | Mostly from |
| --- | --- | --- |
| ~~Who's affected most~~ | ~~The groups that have the problem, and which one most~~ (on the problem card, "Who it affects") | ~~Customer intelligence, Dana~~ |
| How big it is | How often it happens and to how many | Customer intelligence, business performance |
| What it costs | The effect on customers and on the business: returns, lost repeat purchases, store staff time | Business performance, Dana |
| What people do today | How customers and teams work around it, and which apps or workflows are involved | Product ecosystem, Dana |
| Why it happens | The likely causes | Dana, Sparks's suggestions |
| What's been tried | Earlier experiments or fixes, and what they found | Previous experiments, Dana |
| Limits | What any solution must respect: deadlines, budget, rules, teams, technology | Engineering context, Dana |
| Who's involved | The audiences, customer segments and company departments the problem touches or a solution would change. Groups, never named people | Customer intelligence, product ecosystem, Dana |
| Assumptions to check | Every assumption in the brief, most important first | Sparks, from the parts above |

Each part shows where each statement came from ([sparks.md](sparks.md), "Suggestions"):

- **Evidence:** from company knowledge or Dana's personal knowledge, with its source and period. On the card: "From business performance, Aug–Oct 2026".
- **From Dana:** what she said from her own experience.
- **Assumption:** what nobody has confirmed yet.

The brief opens with a two- or three-sentence summary and a line on how much rests on evidence: ~~"6 of 8 parts backed by evidence."~~ "6 of 7 come from company data." ("Assumptions to check" isn't counted.) The summary doesn't say who's affected, which is on the problem card.

"Why it happens" starts as Sparks's suggested causes, labeled as assumptions until Dana or evidence confirms them.

"Who it affects", on the problem card, names the group that has the problem worst. "Who's involved" is wider: every audience, customer segment and department the problem or a solution reaches. For example, for wrong-part returns: do-it-yourself customers buying online, professional mechanics, store staff, the returns team and the catalog team.

The departments in "Who's involved" are also the starting list of departments Sparks suggests bringing in during Review ([sparks.md](sparks.md), "Bringing others in").

✅ **Resolved:** "Who's involved" lists groups (audiences, customer segments, departments), never named people. Sparks doesn't name individuals anywhere in the brief, including when it suggests who might know something.

## Finishing this part

Every part of the brief ends with evidence, an answer from Dana, or an assumption. Clarify never blocks her: anything she doesn't know becomes an assumption.

- ~~When the brief is complete, Sparks shows it whole as a summary card (like Problem's), sums up what matters most and asks for approval: "Here's the brief. The biggest thing we're assuming is that customers don't know their exact vehicle details, and that's why they buy the wrong part. Does it look right?"~~ After the last question, in the reply that takes its answer, Sparks shows the brief whole as a card, names the biggest assumption and asks for approval:
  > Got it. That's all I need to ask. ~~Here's the brief:~~ Here's what we know so far:
  >
  > ["What we know" card]
  >
  > The biggest thing we're assuming is that customers don't know their exact vehicle details, and that's why they buy the wrong part.
  >
  > ~~**Does the brief look right?**~~ ~~**Does this look right?**~~

  When Dana confirmed the causes, the biggest assumption named is the next one ("customers who return a part that doesn't fit buy less from us afterwards").
- **The summary, not a card** (sparks.md, "Talking with Sparks"): "**Here's what we know so far:**", then the short summary (how often, what it costs, what's been tried), "Here's what's behind it:" with a line each for what customers do about it, why it happens, what a solution has to work around and who's involved, each with its source in brackets ("(customer intelligence, last 6 months)", "(from you)") or called a guess, then "Still to check:" as a list, and one sources line. With only one assumption, Sparks doesn't repeat it as "The biggest thing we're assuming…" before the question.
- ~~**The card** (like the problem card, part by part with a line between parts): ~~"Problem brief"~~ "What we know" and its line, with "Draft" until she approves it, then "In your concept"; the two- or three-sentence summary and ~~"{n} of 8 parts backed by evidence."~~ "{n} of 7 come from company data."; each part with where it came from: ~~"Evidence · business performance, Aug–Oct 2026"~~ "From business performance, Aug–Oct 2026" (source and period), "From you", or "Sparks's guess" with the "Assumption" label between the part's name and its text; last, ~~"Assumptions to check"~~ "Still to check" as a list.~~
- **How her answers land in the brief:** a confirmed guess that came from company data stays evidence; a confirmed guess with no data behind it ("Why it happens") becomes hers ("From you"); "I'm not sure" leaves it an assumption; an answer in her own words, or an edit on the card, is hers, in her words.
- ~~Quick replies: "Looks right, continue", "Not quite". "Not quite" gets "What's off? Tell me in your own words, and I'll update it." (the card can't be edited in place); her answer gets~~ No button: the summary goes in the plan and Sparks goes on to the next section by itself, in the same reply, after a zigzag divider ([sparks.md](sparks.md), "Talking with Sparks"). To change the summary, she changes an answer (its pencil). ~~Typing what's off gets "Thanks, I've updated it.", then "**Here's what we know now:**" with the updated summary, her words worked in, and the question again.~~

  ✅ **Resolved:** after her correction, Sparks shows the updated summary before asking again. Why: "Thanks, I've updated it." alone asked her to approve a version she couldn't see.
- If she approves it, or says "Let's move on", before every part is answered, the unanswered parts become assumptions, and Sparks says which.
- ~~Her approval adds the Problem brief to the concept, and Sparks moves on in the same conversation: "Now let's agree on what success looks like."~~ Her approval adds the Problem brief to the concept, and the same reply asks Success's first question, the goal ([sparks-plan-define-success.md](sparks-plan-define-success.md), "Starting this part"). There's no button or page between parts ([sparks.md](sparks.md), "Plan").

✅ **Resolved:** Clarify asks only what the data can't answer: what people do today, why it happens and its limits, for "Wrong-part returns". Who's affected, how big it is, what it costs, what's been tried and who's involved come from company knowledge and show in the brief, not as questions.

✅ **Resolved:** after ~~"Looks right, continue"~~ the summary, "Done. What we know is in your plan." and the divider, Sparks says ~~"Done. The brief is in your concept."~~ ~~"Done. That's in your blueprint too."~~ "**Now, let's define what success looks like.**" and asks Success's first question, the goal, in the same reply, following Plan's rule that the reply that finishes a part asks the next part's first question ([sparks.md](sparks.md), "Plan").

The assumptions stay in the brief and go forward: the success part can set measures for them, and Evaluate checks them.

## States

| State | What shows | What Dana can do |
| --- | --- | --- |
| Sparks is gathering evidence | Sparks thinking ("Lining up what we know with what we're assuming…") | Wait, stop it |
| ~~Evidence filled in~~ First question | ~~Sparks's summary of what it found; the Problem brief card with its parts as suggestions, with sources~~ One line on what comes next, then the first question on a clarification card | Answer, edit Sparks's guess, say "I'm not sure", or type her own answer |
| Asking | One line on how Sparks took the last answer, then one question on a clarification card, with its best guess and the answer buttons | Answer, say "I'm not sure", stop the questions |
| Data and Dana disagree | Both answers, with the source | Keep hers, use the data, or keep both |
| Problem looks different | A suggested change to the problem statement, with the reason | Accept or dismiss it |
| Nothing found for a part | "I didn't find anything on this, so I'll ask you." | Answer or say "I'm not sure" |
| A source can't be reached | "I couldn't check {source} just now, so I may be missing something." | Go on; ask Sparks to check again later |
| ~~Ready to move on~~ Summed up | The summary~~, with "Looks right, continue" and "Not quite"~~, the divider, then the next section | Read it, change an answer, go on |

## Checks

What Dana says → what Sparks must do:

| Dana | Sparks must |
| --- | --- |
| Approves the problem | Fill in what company knowledge answers before asking anything, and ask only about what's left |
| "I'm not sure" | Record its best guess as an assumption and go on, without asking again |
| An answer that contradicts the data | Show both with the source, and let her choose |
| "Let's move on" | Stop asking, turn unanswered parts into assumptions, say which, and ask her to approve the brief |
| "Can you check returns for this?" | Look it up and add it with the source, or say it couldn't find it |
| "We could add a 'fits your car' badge." | Keep it under Ideas to explore and go back to the question |
| Asks about a source she can't access | Say it can't use that source for her, without showing any of it |
| Evidence that points to a different problem | Suggest an updated problem statement with the reason, and change nothing until she accepts |
| ~~"Looks right."~~ Answers the last question | Show what we know, add it to the concept and, in the same reply, after the divider, ask Success's first question, the goal |

## Accessibility

- Each part of the brief says, to screen readers, where its statements come from ("Evidence, support cases, last 90 days"; "Assumption").
- When the data and Dana disagree, both answers and the choice are read in order, before the buttons.
- Sparks's approval question says how many parts are assumptions, or will become assumptions if Dana moves on now.

## Acceptance Criteria

- Given company knowledge with support cases about the problem, when Dana approves the problem, then "How big it is" is filled in with the figure, its source and its period before Sparks asks any question.
- Sparks asks one question at a time, and never asks for something the brief already has from company knowledge.
- Given Dana answers "I'm not sure", then that part shows Sparks's best guess labeled "Assumption", and it appears under Assumptions to check.
- Given Dana's answer contradicts company knowledge, then Sparks shows both with the source, and the brief keeps what she chooses.
- Given Dana says "Let's move on" or approves the brief with parts unanswered, then Sparks stops asking and those parts become assumptions, listed under Assumptions to check.
- Each statement in the brief is labeled as evidence (with its source), from Dana, or an assumption.
- The "What we know" card opens with a summary and how many parts come from company data, and doesn't repeat who it affects.
- A solution Dana mentions goes to Ideas to explore, not into the brief.
- A suggested change to the problem statement changes nothing until Dana accepts it.
- Approving the brief moves the conversation on to success with no button or page in between, and the brief is in the plan (shown as a document once Plan is done).

## Out of scope

- The workspace, Plan and how its parts flow, step states, suggestions, Sparks's voice and company knowledge access: [sparks.md](sparks.md).
- The problem statement and Ideas to explore: [sparks-plan-problem.md](sparks-plan-problem.md).
- Success measures: [sparks-plan-define-success.md](sparks-plan-define-success.md).
