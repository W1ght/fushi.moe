---
title: "How does Fushi show Japanese pitch accent? Which dictionary do I need?"
description: "Pitch accent comes from a pitch dictionary: install a Yomitan-format pitch dictionary and the lookup popup draws high/low lines over the reading plus the accent position such as [0] or [1]. When you mine an Anki card, the pitch and its heiban / atamadaka / nakadaka / odaka category go onto the card, and Lapis cards colour the word by type."
category: "Lookup & dictionaries"
order: 121
date: 2026-10-12
lang: en
---

Japanese is a **pitch-accent** language: the same string of kana can be different words depending on where the pitch rises and falls — はし read low-high is "bridge", high-low is "chopsticks". Textbooks rarely teach it systematically, and when you learn from anime and light novels you only have your ears, which is why many learners still sound "foreign" after years.

Fushi can draw each word's pitch accent right in the lookup popup and carry it into Anki when you mine. There is only one prerequisite: **install a pitch dictionary**.

## A few terms first: accent nucleus, heiban, atamadaka, nakadaka, odaka

Pitch accent in Tokyo Japanese (the standard language) can be described with one number: the **mora after which the pitch drops** (the accent nucleus).

| Number | Name | Pattern | Example |
|---|---|---|---|
| `[0]` | Heiban (flat) | First mora low, then high all the way; a following particle stays high | さくら [0] |
| `[1]` | Atamadaka (head-high) | First mora high, drops from the second | いのち [1] |
| `[2]` or more, below the mora count | Nakadaka (middle-high) | First mora low, rises, then drops after a mora in the middle | おかし [2] |
| Equal to the mora count | Odaka (tail-high) | Rises like heiban, but a following particle drops | はな (flower) [2] |

Verbs and adjectives usually aren't split into those four; they are just accented or unaccented. Accented ones are called **kifuku**, unaccented ones are heiban.

Morae are counted in kana: small ゃゅょ don't count on their own and merge into the kana before them (きょ is one mora), while the long-vowel mark ー, small っ and ん each count as one.

You don't need to memorise this table — Fushi turns the numbers into visible lines and categories for you. But knowing that `[0]` is heiban and `[1]` is atamadaka lets you read the popup at a glance.

## Which dictionary you need

Pitch data comes from **Yomitan-format pitch dictionaries**: they store `pitch` records in Yomitan's `term_meta_bank` (headword + reading + accent position), not a block of definition text. Once imported, Fushi files them under the "Pitch dictionaries" group in **Settings → Lookup → Dictionaries**.

- If you installed the [recommended pack](/faq/pack.en), a pitch dictionary is already included.
- To add one yourself, find a freely maintained pitch dictionary from the Yomitan community (a zip) and import it in dictionary management; steps in [How do I import dictionaries](/faq/dictionaries.en). One is enough; two or three can cross-check each other.
- **MDX dictionaries can't provide structured pitch**: some MDX monolingual dictionaries write "［0］" or pitch marks in their definitions, but that's just part of the definition text. Fushi doesn't recognise it as pitch data and no pitch section appears. For the high/low lines, install a Yomitan-format pitch dictionary.
- **IPA dictionaries** belong to the same family: Yomitan has an `ipa` mode (common for English and other languages) that stores phonetic transcriptions. Fushi shows them in the same place as pitch accent — an extra `[ˈwɔːtər]`-style tag next to the reading — so other languages get their pronunciation in the same spot.

## What pitch accent looks like in the popup

With a pitch dictionary installed, each entry gets a "pitch" section under its reading:

- **The reading is split into morae** with a line above or below each one: high morae have the line on top, low ones at the bottom, and the mora where the pitch drops gets a downward corner. What you see is the word's pitch contour.
- **A number follows**, e.g. `[0]` or `[3]` — the accent position described above.
- **Words with several accepted pitches** (older and newer readings, say) get several rows.
- **Each row is labelled with its source dictionary.** When several pitch dictionaries give exactly the same result they merge into one row with a single "Pitch · N" tag (N = number of dictionaries); hover to see which ones, or tap on a touchscreen to expand each dictionary's name.

"**Deduplicate pitch accents**" under **Settings → Lookup → Entry content** (on by default) decides how repeats are handled: while on, each pitch pattern is shown once, and a second dictionary that also says `[0]` doesn't draw another row; turn it off and each dictionary shows its own. With a single pitch dictionary the switch makes no difference.

The pitch section's font and colours can be changed separately in **Settings → Lookup → Dictionary styling** (the style editor has a "Pitch accent" part).

## How pitch goes into Anki when you mine

When you tap the plus to mine, pitch produces two field values you can use:

| Placeholder | Content |
|---|---|
| `{pitch-accent-positions}` | The list of accent positions (numbers like `[0]`, `[2]`; transcriptions from IPA dictionaries are merged in too) |
| `{pitch-accent-categories}` | The categories: heiban, atamadaka, nakadaka, odaka, kifuku |

There is also a separate `{phonetic-transcriptions}` that carries only IPA.

With the **Lapis deck** Fushi creates in one tap, these are already mapped: `PitchPosition` ← `{pitch-accent-positions}` and `PitchCategories` ← `{pitch-accent-categories}`; nothing to configure. With your own note type, map the matching fields to these placeholders in **Settings → Card creation → Field mappings**.

When several dictionaries give the same pitch, mining uses the same merged result the popup shows, so five pitch dictionaries don't put five identical `[0]`s on your card.

## How it shows on the card: Lapis pitch graphs and colours

The Lapis card template reads the `PitchPosition` field, **draws the reading as a pitch graph** on the card (the same high/low lines and downward corner as in the popup) and **colours the word by pitch type** — both the word at the top of the card and the bolded target word in the example sentence:

| Type | Colour |
|---|---|
| Heiban | Blue |
| Atamadaka | Red |
| Nakadaka | Orange |
| Odaka | Green |
| Kifuku | Purple |

During reviews you don't need the number; one glance at the colour tells you how the word is pronounced, and over time colour and pitch fuse in your head. For many people this is the least effortful way to learn pitch: **don't memorise it, just see it passively every day in reviews**.

Lapis also understands kana-style pitch notation written into the field (readings with a "＼" drop mark) and some formats that dictionaries put in their definitions; the most reliable route is still letting Fushi fill `{pitch-accent-positions}`.

## Practising pitch: pair it with audio and shadowing

Lines alone aren't enough — pitch is learnt by ear:

- Tap the **speaker** during a lookup to hear the word (the recommended pack includes a local pronunciation library), and listen a few times while looking at the lines; see [How do I install word audio](/faq/word-audio.en).
- Put the word audio and sentence audio on the back of the card; in reviews read it yourself first, then compare with the original.
- When a line in an anime is worth practising, replay and shadow it with Fushi's sentence audio. Mine the whole sentence and the original audio goes onto the card.
- Pitch dictionaries describe a word **said on its own**. In connected speech, particles, compounds and intonation all change the actual pitch, so don't expect every word in a sentence to match the dictionary exactly.

## Common problems

- **No pitch section in the popup**: no pitch dictionary is installed, or it's hidden; check the "Pitch dictionaries" group in dictionary management.
- **Some words have no pitch**: the pitch dictionary doesn't list the word (common for loanwords, proper nouns and rare words), or the reading doesn't match — pitch is paired by headword + reading, so if the dictionary lists a different reading nothing shows.
- **No colours on the card**: check whether the `PitchPosition` field is empty; with a custom note type, colouring is a Lapis template feature that other templates may not have.
- **The same pitch shows twice**: turn on "Deduplicate pitch accents".
- **I want only the number, not the lines**: the lines in the popup are part of its rendering; whether the card shows a graph depends on the template. Lapis styling can be previewed and changed in **Settings → Card creation → Lapis card style**.
