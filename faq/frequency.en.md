---
title: "What is a frequency dictionary, and how does it tell me whether a word is worth learning?"
description: "A frequency dictionary tells you how common a word is in novels, anime and web text. Install one and Fushi's lookup popup shows a frequency rank, mined Anki cards carry it in a field, and new Anki cards can be reordered so common words come first — whether you learn Japanese from anime or flashcards, you start with the most useful words."
category: "Lookup & dictionaries"
order: 122
date: 2026-10-12
lang: en
---

The scarcest resource in learning a language is time. One anime series or light novel holds hundreds or thousands of unknown words; turning every one into a card buries you in reviews, and making none means you never remember them. A **frequency dictionary** answers "which one first": it tells you where a word ranks across a large body of real text — the higher it ranks, the more common it is and the more it's worth learning first.

## What a frequency dictionary is

A frequency dictionary isn't a definition dictionary. It explains nothing; it just gives each word a **rank** (or an occurrence count): take a large corpus — novels, anime subtitles, news, web articles, Wikipedia and so on — count how often each word appears and sort from most to least. する, ある and こと sit at the very top; obscure literary words rank hundreds of thousands down.

For a learner, ranks are in some ways more useful than definitions:

- **Words near the top are words you'll keep meeting.** The first few thousand words cover most everyday text; get them solid and the density of unknown words drops fast.
- **Words far down can wait.** A word ranked past 100,000 may not show up again for a year; making a card for it just adds review load.
- **Different corpora give different frequencies.** Novel, anime and news corpora each lean their own way: if you mostly watch anime, look at anime / subtitle frequencies; if you read light novels, look at novel frequencies. Comparing two frequency dictionaries from different corpora is more accurate than relying on one.

Fushi uses **Yomitan-format** frequency dictionaries (a zip containing `freq` records in `term_meta_bank`). The Yomitan community maintains plenty of free frequency lists built from novels, anime, Wikipedia, web text and other corpora. Import them like any other dictionary — see [How do I import dictionaries](/faq/dictionaries.en) — and they appear in the "Frequency" group in **Settings → Lookup → Dictionaries**. The [recommended pack](/faq/pack.en) already includes frequency dictionaries.

## Reading frequency in the lookup popup

With a frequency dictionary installed, every entry in the popup gets a frequency row:

- **By default it's a single "avg" tag** followed by a number. That's "**Aggregate word frequencies**": Fushi combines the ranks from your frequency dictionaries into one number using the **harmonic mean**. The harmonic mean leans towards the smaller numbers — if one dictionary says the word is very common, the combined value isn't dragged far away by a large number from another.
- **Tap the tag** to expand it into each frequency dictionary's own value (each prefixed with the dictionary's name); tap again to collapse.
- If you don't want the combined value, turn off "**Aggregate word frequencies**" (on by default) under **Settings → Lookup → Entry content** and the popup lists each dictionary's value directly.

Some frequency dictionaries show more than a bare number — a suffix, or special formatting such as reading-specific marks. For the combined value Fushi only uses the leading digits.

### How to read the number

The number is a **rank**: smaller means more common. A rough intuition (it varies with the corpus and dictionary):

| Rank | Roughly means |
|---|---|
| Top 1,000–2,000 | Core high-frequency words you meet almost daily; learn them on sight |
| Top 5,000–10,000 | The working vocabulary of novels and anime; mine these first |
| 10,000–30,000 | Mid-frequency, often tied to particular genres; it's fine to wait until you've met them two or three times |
| Past 30,000 | Low-frequency, technical words, rare spellings; look them up without learning them unless you really want to |

These are rules of thumb, not rules. A word ranked 40,000 that shows up in every episode of the show you're watching is a high-frequency word for you — a frequency list describes the average case, and your own input has the final say.

## Using frequency to decide whether to mine a word

A practical routine:

1. Look words up as usual while watching and reading — **not every word you look up becomes a card**.
2. Glance at the avg number in the popup: if it ranks high and you don't know it, tap the plus and mine it.
3. Let the low-ranked ones go for now. If you keep running into one, mine it then — repeating in your input is itself proof it matters to you.
4. To keep the number of new cards per day under control, see [How many cards a day should I make?](/faq/cards-per-day.en)

Sentence cards stick better than bare word cards because you remember "I saw it in this scene"; Fushi's plus brings the original sentence and audio along by default — see [How do I make my first card?](/faq/first-card.en)

## Frequency on Anki cards: two placeholders

When you mine with the plus, frequency produces two field values:

| Placeholder | Content |
|---|---|
| `{frequencies}` | Each frequency dictionary's value (HTML, good for the back of the card) |
| `{frequency-harmonic-rank}` | The **single rank** after the harmonic mean; 9999999 when no frequency was found |

With the **Lapis deck** Fushi creates in one tap, the `Frequency` field is mapped to `{frequencies}` and `FreqSort` to `{frequency-harmonic-rank}`. `FreqSort` exists for sorting: a plain number that the "Reorder new cards by frequency" feature below can read directly, without looking anything up again. With your own note type, map fields to these placeholders in **Settings → Card creation → Field mappings**.

## Reordering new Anki cards by frequency: common words first

After a mining session Anki shows new cards in the order they were added — a rare word you mined from anime today may come before a common one you mined from a book tomorrow. Fushi can re-queue them by frequency.

Look for "**Reorder new cards by frequency**" under **Settings → Card creation**:

1. Pick a deck (subdecks included; cards in filtered decks are skipped).
2. Choose the "**Frequency source**":
   - **Frequency dictionaries**: look up each card's word in your frequency dictionaries. You can tick which ones to use; hidden frequency dictionaries are not loaded, so unhide them in dictionary management first. Nothing selected means all loaded dictionaries.
   - **Note field**: read the field mapped to `{frequency-harmonic-rank}` (FreqSort in Lapis) directly — no dictionary lookup, the fastest option.
3. With several dictionaries, pick how to "**Combine multiple dictionaries**": "Harmonic mean" or "Lowest rank" (the best rank among them).
4. To flip it so rare words come first, tick "**Rare words first**".
5. Hit "**Preview**" first: it tells you how many new cards there are, how many have a frequency, how many don't (those stay at the end) and how many positions will change. Then hit "**Apply**".

A few rules:

- **Only new cards are touched; review cards never are.** A card that stops being new while the reorder runs is skipped.
- **Mistakes can be undone**: "Undo last reorder" restores the positions saved before the last reorder; cards you've studied since stay where they are.
- **The deck's new card order must be sequential**: if the deck options gather / sort new cards randomly, the written positions are ignored. Set the new card gather / sort order to sequential in Anki's deck options.
- Turn on "**Auto-reposition after mining**" and the deck's new cards are reordered by frequency about 30 seconds after the last card is mined, so you don't have to run it by hand.
- **Only available with AnkiConnect**, i.e. on a computer connected to desktop Anki. Cards mined on a phone with AnkiDroid / AnkiMobile can be reordered on the computer after they sync.

Recommended Anki settings (FSRS, how to use the buttons) are in [What should I set up in Anki after connecting?](/faq/anki-basics.en)

## Common problems

- **No frequency in the popup**: no frequency dictionary is installed, or it's hidden; check the "Frequency" group in dictionary management.
- **Some words have no frequency**: the list doesn't include the word, or it lists a different spelling / reading than the one you found (common with kana spellings and variant kanji). Cards without frequency go to the end when reordering.
- **The avg number is far from one dictionary's value**: the harmonic mean leans towards the smaller (more common) rank; tap the tag to see each dictionary, or turn off "Aggregate word frequencies".
- **The order in Anki didn't change after reordering**: check whether the deck options use random new card order.
- **"Only available with AnkiConnect."**: reordering can't run on a phone; do it on the computer.
