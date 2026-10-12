---
title: "What is the Lapis card template? What goes into each field when Fushi mines a card, and how do I change it?"
description: "Lapis is the Anki note type Fushi creates for you in one tap: the word, reading, word audio, source sentence, sentence audio, screenshot or animation, pitch accent, frequency and source each get their own field. This page lists Fushi's default field mappings, how to switch between the five card types, and how to restyle the card visually inside Fushi."
category: "Anki & mining"
order: 59.5
date: 2026-10-12
lang: en
---

When you tap the plus button in Fushi, the card isn't just a blob of text: Fushi fills a set of separate fields defined by an Anki note type (card template) called **Lapis**. Once you know what goes into which field, you know why the card looks the way it does and where to go when you want to change it. For the setup steps (installing Anki and connecting it to Fushi) see [How do I connect Anki?](/faq/anki.en); for making your first card see [How do I mine cards while watching anime?](/faq/first-card.en).

## What is Lapis?

Lapis is an open-source Anki note type by Ruri, itokatsu and kuri (donkuri/lapis on GitHub), released under GPL-3.0. It is built for the look-up-and-mine workflow: a single card holds the word, reading, definitions, example sentence, sentence audio and a picture, and the front shows you as little as possible — the full picture is on the back.

Fushi ships the front, back and stylesheet of Lapis **1.7.0** verbatim, plus a small block of extra CSS that fixes styling problems (such as an over-wide pitch-accent tag box, or definition lists on older cards that were indented too far). It doesn't change the upstream structure.

To create it: in **Settings → Card creation**, tap **"Create and use Lapis"**. It adds a note type called Lapis and a deck called Lapis to Anki and selects them as the mining target; the Anki step of the onboarding wizard walks you through the same thing. If Anki already has Lapis, Fushi says "Lapis note type and deck already exist — selected them." and doesn't create a second copy.

A Lapis you installed yourself works too: if the note type's name contains "lapis", or it has all three of the fields `Expression`, `MainDefinition` and `Sentence`, Fushi treats it as Lapis and applies the default mappings to **fields that aren't mapped yet**. Fields you've already mapped by hand are left alone.

## What does Fushi put into each field?

These are Fushi's out-of-the-box field mappings for Lapis. The left column is the Anki field name, the middle is Fushi's placeholder (written exactly the same way in **Settings → Card creation → Field mappings**):

| Lapis field | Placeholder | What goes in |
|---|---|---|
| Expression | `{expression}` | The headword itself (dictionary form, e.g. 食べる) |
| ExpressionFurigana | `{furigana-plain}` | The headword with furigana |
| ExpressionReading | `{reading}` | The reading |
| ExpressionAudio | `{audio}` | **Word audio**, from the word-audio library you installed |
| SelectionText | `{popup-selection-text}` | Text you highlighted inside the lookup popup |
| MainDefinition | `{glossary-first}` | **Main definition**: the dictionary you long-pressed in the popup, or the first one if you didn't pick one |
| Sentence | `{sentence}` | **Source sentence**: the line the word appeared in, with the target word in bold |
| SentenceAudio | `{sentence-audio}` | **Sentence audio**: the original audio of that line in the video, or that sentence of an audiobook |
| Picture | `{card-image}` | **Card image**: a screenshot or animation for video, the cover for books |
| Glossary | `{glossary}` | Definitions from all dictionaries |
| PitchPosition | `{pitch-accent-positions}` | Pitch-accent position (needs a pitch-accent dictionary) |
| PitchCategories | `{pitch-accent-categories}` | Pitch-accent pattern (heiban, atamadaka, …) |
| Frequency | `{frequencies}` | The frequencies reported by each frequency dictionary |
| FreqSort | `{frequency-harmonic-rank}` | An aggregated frequency rank, used by "Reorder new cards by frequency" |
| MiscInfo | `{source-link} {clip-timestamp}` | **Source**: the title of the work (a link back to the spot in Fushi) + the clip time |
| IsWordAndSentenceCard | `x` | Card-type switch, see the next section |

**Fields left empty on purpose**: DefinitionPicture, SentenceFurigana, Hint, IsClickCard, IsSentenceCard and IsAudioCard. Leaving SentenceFurigana empty is what Lapis itself recommends (sentence furigana would show you the readings on the front); the other three `Is…` fields are card-type switches and only one should be filled at a time.

A few more details:

- **Screenshot or animation**: choose under "Video card image" in **Settings → Card creation → Card media**: "Screenshot at mining", "Screenshot at subtitle start", "Animated GIF (subtitle clip)" or "Video clip with sound". The animation format can be AVIF, WebP or GIF; "Image / GIF quality" and "Audio quality" live on the same page.
- **Video clip with sound** needs a note type that can play video: adapt Lapis under "Video playback adaptation" on the same page. Without the adaptation Fushi falls back to GIF + audio and tells you "This note type isn't adapted for video". If you review with AnkiMobile on an iPhone, set "Video clip format" to MP4 (AnkiMobile can't play WebM).
- **Sentence audio cut off at the start or end**: adjust "Audio padding before sentence" and "Audio padding after sentence". The padding never runs into the previous or next line.
- **A line spread over several subtitles**: multi-select them in the subtitle list before mining, and the sentence and its audio cover the whole span.
- **Empty pitch-accent or frequency fields**: usually the matching dictionary isn't installed. The [recommended pack](/faq/pack.en) in the onboarding wizard includes Japanese pitch-accent and frequency dictionaries.

## How do I switch between Lapis's five card types?

Lapis uses a few switch fields to decide what the front shows. The rule: **put anything (by convention `x`) in at most one of them and leave the rest empty.**

| Switch that's filled | Front shows |
|---|---|
| None | **Word card**: just the word |
| IsWordAndSentenceCard (Fushi's default) | **Word + sentence card**: the word, with the source sentence underneath as a hint |
| IsSentenceCard | **Sentence card**: the whole sentence — can you understand it? |
| IsClickCard | **Click card**: the word first; tap it (or press C) to switch to the sentence |
| IsAudioCard | **Audio card**: the sentence with its audio, the bolded target word replaced by [...] |

Fushi's default is word + sentence: no audio on the front, just the word and the sentence it came from, so a review tests "seeing this word in real context, can I recall its reading and meaning?". Why audio stays off the front is explained in [How do I use Anki?](/faq/anki-basics.en)

To change the card type, go to **Settings → Card creation → Field mappings**, tap the field and type `x` into the input box or clear it. (That dialog lets you either pick a placeholder from the list or type text directly — combinations like MiscInfo's two placeholders are written there too.) Field mappings only affect cards you mine **from now on**; cards already in Anki have to be edited in Anki's browser.

## How do I restyle Lapis cards in Fushi?

**Settings → Card creation → Lapis card style** is an editor that doesn't require writing CSS. (It only appears with AnkiConnect and AnkiDroid; AnkiMobile doesn't allow editing note types, so there's no such entry on iPhone.)

- **Visual editor**: a live preview of the Lapis card at the top, switchable between Front and Back. Tap any part of the preview (word, reading, sentence, definition box, primary definition, …) to select it, then adjust font size, text colour, background highlight, bold, alignment, line height, margin and padding, border and corner radius below.
- **Layout**: uses Lapis's own layout switches, so desktop and mobile Anki both follow it — "Image position" (left of the word / right of the word / inside the sentence), "Sentence position" (above / below definitions) and "Audio buttons" (next to the reading / inside the sentence / pinned to the bottom).
- **Custom areas**: show existing fields somewhere else on the card (top of the card, below the word, below the sentence, below the definitions, bottom of the card). Display only: no Anki field is added or deleted.
- **Card font scale**, **Custom CSS**, **Advanced CSS**: scale every font size at once, or append your own CSS (it goes into a protected user section of the stylesheet).

Nothing reaches Anki until you tap **"Apply style to Anki"**, and Fushi backs up first. If Fushi notices the Lapis template in Anki was edited by hand, it asks first ("Template changed in Anki") before overwriting it. If you break something there are three ways back: **"Back up Lapis template"** to save a copy yourself, **"Restore from backup"**, and **"Restore factory Lapis"** (overwrites the styling and front/back templates with the built-in version and resets the font scale, custom CSS and custom areas; your card data is untouched).

## Do I have to use Lapis?

No. Pick a different deck and note type in **Settings → Card creation**, then give each field a placeholder in "Field mappings". Every placeholder in the table above works with any note type, and there are more, such as "Document title" and "Cue sentence". Keep in mind:

- The note type's **first field** must be mapped, or Anki rejects the card ("The first field of the selected note type is empty…");
- after switching note types, if none of the old mappings belong to the new one, Anki also rejects the card — remap them;
- the "Lapis card style" editor only understands Lapis; for other templates, restyle them in Anki yourself.

When in doubt, use Lapis: it's Fushi's default, the factory mappings work out of the box, "Reorder new cards by frequency" can use its FreqSort field directly, and the style editor and backup/restore exist only for it.
