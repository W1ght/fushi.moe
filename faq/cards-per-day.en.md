---
title: "How many new Anki cards a day? How long should I review? What do I do about a backlog?"
description: "When mining cards while watching anime, 5–20 new cards a day and 15–30 minutes of review are enough. Why the number of new cards decides your review load weeks later, how FSRS and desired retention control the workload, how Fushi's frequency reordering and batch mining help, and how to clear an Anki backlog step by step."
category: "Learning method"
order: 403
date: 2026-10-12
lang: en
---

Almost everyone new to Anki makes the same mistake: on a motivated day they add dozens or a hundred new cards, two or three weeks later every session opens with hundreds of reviews due, and one day they just stop opening Anki. This page covers how many cards to add, how long to review, and how to recover once a backlog has built up. Anki's own settings (FSRS, the four buttons) are in [How do I use Anki?](/faq/anki-basics.en); this page is only about volume.

## How many new cards a day?

**5–20 new cards a day is the recommendation** — the same range the [immersion guide](/immersion) gives. Where you land depends on how much review time you can reliably find every day:

- Short on time or just starting: 5–10.
- About half an hour of review every day: 10–20.
- Want more: hold steady for a month or two, see where your review load settles, then raise it gradually.

The new-cards-per-day limit in Anki's deck options (New cards/day) defaults to 20. It's a ceiling, not a quota you must hit: studying only 5 today is completely fine.

Why be so restrained? Because **the number of new cards doesn't set today's workload — it sets your daily workload for the weeks that follow.** After you learn a card it comes back several times over the next few weeks, at growing intervals. Every extra card you add today turns into a string of reviews spread over the coming weeks. So review load always lags two or three weeks behind new cards; by the time you feel "this is a lot of reviews", the extra cards have long since landed — which is why too many new cards is the reason most people give up on Anki.

## How long should I review each day?

**15 to 30 minutes a day, done properly.** It beats an occasional two-hour session, because spaced repetition depends on reviewing on the day a card is due — skipping a few days hurts much more than doing a little less every day.

Some practical habits:

- **Reviews first, new cards second.** Clear what's due, and add new cards only if you still have energy.
- **On a bad day, do just five minutes.** Five minutes counts. A slow cart is fine as long as you don't fall off — once the habit breaks, getting going again costs far more than you'd expect.
- **Don't agonise during review.** "Again" and "Good" are all the buttons you need; if a card doesn't come back, press Again instead of staring at it for half a minute.
- **Watch your time per card.** If a card regularly takes ages, the card itself is usually the problem (sentence too hard, definition too long), not your memory.

## Control the workload with FSRS and desired retention

If you're still on Anki's old default algorithm, the first thing to do is switch to **FSRS** (steps in [How do I use Anki?](/faq/anki-basics.en)). FSRS predicts when you'll forget from your own review history and gets the same retention with fewer reviews.

FSRS has a "desired retention" setting: the share of cards you want to remember when they come up. The higher you set it, the more often cards come back and the bigger the workload; set it a little lower and intervals get longer and reviews fewer, at the cost of more cards you can't recall when they show up.

The immersion guide suggests **setting retention to 70–80%**. The reasoning: if you learn while watching, you get a huge amount of input outside Anki, and you'll keep running into many of these words in shows and books, so Anki doesn't have to hold every card at a very high recall rate by itself. Hand that part of the job to input and Anki gets much lighter. Once FSRS is on, stop editing the schedule by hand and trust the intervals it computes.

## Fushi features that help you control volume

- **Reorder new cards by frequency**: in **Settings → Card creation**, "Reorder new cards by frequency" rewrites the learning order of a deck's new cards so common words come first; review cards are never touched. The frequency source can be your installed frequency dictionaries or Lapis's FreqSort field; you can preview first and "Undo last reorder" if needed. That way the dozen or so cards you learn each day are always the most common words, and rare ones move to the back — learning them later, or never, costs you little. Turn on "Auto-reposition after mining" and Fushi reorders the deck about 30 seconds after your last mined card. Both work only with AnkiConnect (desktop Anki). Also, if the deck options use random new-card order, reordering has no effect — set the new card gather/sort order to sequential.
- **Batch mining**: when on, cards are saved on the device first and sent to Anki together later. Handy for mining on your phone while watching and dealing with them back at the computer — and for deleting impulse-mined cards before they're sent.
- **Several lines in one card**: when a line spans several subtitles, multi-select them in the subtitle list and mine once instead of making several cards.
- **Mine less**: the most effective volume control happens the moment you mine. Only mine sentences where exactly one word is unknown, and skip sentences you don't understand at all — see [What is sentence mining?](/faq/sentence-mining.en)

## What do I do about a backlog?

Hundreds or thousands of reviews piled up? Don't panic, and don't delete the deck to start over. Work through it in this order:

1. **Stop new cards first.** Set the deck's new-cards-per-day limit to 0 for now, or stop mining in Fushi for a while. As long as new cards keep coming, the backlog only grows.
2. **Set a daily review amount** and clear it over several days to a week or two. Clearing hundreds of cards in one day is exhausting and invites careless answers; your normal review time is enough.
3. **Do the most recently due cards first.** Cards that are long overdue are probably forgotten already, and another day or two makes little difference; cards that just came due benefit most from a timely review.
4. **Press Again when you didn't remember.** After a backlog many cards won't come back — that's normal. Don't press Good just to stop seeing them. FSRS reschedules based on your real answers.
5. **Deal with useless cards.** If a card no longer seems worth it (too rare, sentence too hard, mined by accident), suspend or delete it in Anki instead of spending review time on it.
6. **Bring new cards back after the backlog is gone**, starting lower than before — if you were at 20, start at 10 and raise it once things are stable.

A backlog almost always comes from too many new cards or a break of a few days. Once it's cleared, go for a little every day rather than filling the limit again.

## Common questions

- **Do premade decks and my own mined cards count separately?** Count them together. Whether cards come from a beginner deck like Kaishi or from mining anime, keep the total number of new cards per day in the 5–20 range. Early on the premade deck can take most of the slots; once your basic vocabulary is in place, gradually give them to your own mined cards.
- **Can I study more on weekends?** Watch more and get more input, by all means — but avoid doubling new cards in a burst: they'll all come back together on a few days two or three weeks later.
- **Is it normal that review time keeps growing?** For a while at the start, review load rises along with new cards, then gradually levels off. If it keeps rising past what you can live with, lower the new-card limit.
