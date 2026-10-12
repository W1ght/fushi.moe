---
title: "How does Fushi's lookup popup work? Tap to look up, hover lookup, lookups inside the popup, mining with the plus"
description: "Tap a word while watching anime, reading light novels or manga and the lookup popup opens: several dictionaries in your order, verbs and adjectives deinflected back to their dictionary form, words in a definition tappable for a further lookup, a speaker for word audio and a plus that makes an Anki card. This page walks through every button and setting."
category: "Lookup & dictionaries"
order: 120
date: 2026-10-12
lang: en
---

Every lookup in Fushi ends up in the same place: the **lookup popup**. The reader, video subtitles, manga OCR text, the galgame overlay, the lookup page on the home screen, desktop global lookup and the browser extension all open the same popup — same dictionary order, same layout, same plus button for mining. Learn it once and you know it everywhere.

If you haven't installed dictionaries yet, read [How do I import dictionaries](/faq/dictionaries.en) first, or just install the [recommended pack](/faq/pack.en); an empty popup almost always means no dictionary is loaded yet.

## How to trigger a lookup: tap, hover, Shift

| Where | How |
|---|---|
| Reader text, video / anime subtitles, manga OCR text, galgame dialogue overlay | **Tap** the word |
| Desktop (Windows / macOS / Linux) with "Look up on hover" turned on | **Rest** the mouse on a character — no click needed |
| Browser extension (any web page) | **Hold Shift** and move over the word; see [How do I look words up in the browser](/faq/browser-lookup.en) |
| The lookup page on the home screen | Type or paste some text, then tap a word in it |

What you tap is a **position**, not a word: Fushi takes a run of text starting at the character you tapped and hands it to the dictionary engine for a longest match — the longest entry that matches comes first. Tap the 食 of 食べられなかった and you get 食べる; tap the べ and matching starts from べ. Tapping the first character of a word gives the best results.

The trigger settings live under **Settings → Lookup → Lookup trigger**:

- **Look up on hover**: look up automatically when the mouse hovers over a character; no need to click or hold Shift. Triggers at most one popup layer. Desktop only. Off by default.
- **Resume when leaving lookup**: after a hover lookup in a video, moving the pointer away from the subtitle and the popup closes it and resumes playback. On by default; only applies to lookups started by hovering.
- **Scan non-Japanese text**: when off, the selection stops at non-Japanese characters instead of swallowing neighbouring Latin letters or digits. On by default. Keep it on when you study a language other than Japanese.
- **Maximum dictionary headwords in result**: how many headwords one lookup lists. Lower means a shorter popup; higher shows more "it could also be this word" candidates.

In addition, "Pause on lookup" under **Settings → Lookup → Pronunciation & feedback** (on by default) pauses the video / audiobook while you look something up and continues when you close the popup.

## What's in the popup: several dictionaries, inflection notes, pitch, frequency

An entry reads roughly top to bottom:

1. **Headword and reading**, with a **speaker** (play word audio) and a **plus** (make a card) next to them.
2. **Deinflection tags**: you tapped 食べられなかった, the entry is 食べる, and small tags in between show which transformations it went through (potential, negative, past…). Tags that have an explanation preview it on hover and pin a short grammar note when clicked.
3. **Pitch accent**: only with a pitch dictionary installed — high/low lines drawn over the reading, followed by numbers such as `[0]` or `[2]`; see [How do I show Japanese pitch accent](/faq/pitch-accent.en).
4. **Frequency**: only with a frequency dictionary installed — the word's rank in each frequency list; see [What is a frequency dictionary](/faq/frequency.en).
5. **Definitions** from each term dictionary, one dictionary after another in the order you set in dictionary management.

With many dictionaries the popup gets long. A few switches under **Settings → Lookup → Entry content** are made for exactly that:

- **Collapse dictionaries** (on by default): every dictionary starts collapsed; tap its title to expand. Combined with "Auto-expand rows" you can keep the first row or two expanded and the rest collapsed.
- **Max dictionary columns (auto-fill)**: lays dictionary boxes out in several columns on wide screens; narrow screens use fewer columns automatically.
- **Compact glossaries**: shows glossary entries inline, separated by " | ", instead of one per line.
- **Show expression tags**: shows part-of-speech / usage tags on headwords.

Dictionary order, hiding and per-dictionary collapsing are in **Settings → Lookup → Dictionaries**; fonts and colours are in "Dictionary styling", where each dictionary can be styled on its own.

### Deinflection: why an inflected word still finds its dictionary form

Japanese verbs and adjectives inflect heavily and dictionaries only list the base form. Fushi's dictionary engine ships **deinflection rules**: it walks the text you tapped backwards step by step (なかった → ない → the pre-negative stem → base form), looks every candidate up, puts the hits in the result and shows the path as the tags described above.

It isn't only Japanese. Fushi has deinflection rules for more than a dozen languages, including Japanese, English, German, French, Spanish, Korean, Arabic and Latin; English additionally handles irregular forms and phrasal verbs (gave up → give up). Languages without rules can still be looked up — you just need to hit the base form. Which languages you can look up depends on the dictionaries you import; see [Is it only for Japanese?](/faq/languages.en).

## Tapping words inside the popup: recursive (nested) lookup

A definition contains another word you don't know? **Tap it right there in the popup.** Fushi stacks a new popup on top of the current one and looks the new word up; you can keep tapping inside that one and drill down layer by layer. This is what Yomitan users call recursive lookup.

- While a child popup is open, tapping anywhere in the parent popup (including the definition text) first **closes the popups above it** and returns you to that layer; only after that does tapping a word in the parent look up something new. A stray tap on a lower layer never throws away the layer you are reading.
- Cross-reference links that MDX dictionaries put in their definitions ("→ see …") also re-run the lookup inside the popup instead of navigating it away.
- In standalone lookup screens such as the home lookup page or clipboard lookup, the popup's top bar also has "Back" and "Forward" buttons to move between the words you've looked up.
- Desktop global lookup (the lookup card outside Fushi) supports nesting too; see [Can I look words up in any app on my computer?](/faq/global-lookup.en)

The one exception is "Look up on hover": hovering triggers at most one popup layer, otherwise sweeping the mouse over a definition would set off a chain of popups. To keep drilling down, tap.

## Mining with the plus: one tap, one Anki card

Once Anki is connected (see [How do I connect Anki?](/faq/anki.en)), the **plus** next to an entry is the mining button. A card automatically carries the headword, reading, definition, word audio, pitch accent and frequency, plus the **sentence** you were in, a screenshot or video clip and the original audio — which goes into which field is decided by **Settings → Card creation → Field mappings**. The Lapis deck Fushi creates for you needs no configuration.

A few easily missed details:

- **Using one particular dictionary's definition as the main definition**: long-press that dictionary's title; it turns bold in the accent colour to show it's selected. Mine now and the main definition field uses that dictionary instead of the first one.
- **The word is already in Anki**: the plus turns into a ✓. Tapping it offers a choice: which existing card to overwrite, open it in Anki, add a new duplicate card, or cancel.
- **Wrong sentence / want one more**: "Adjust context" in the popup opens "Select sentence context", where you can add the previous sentence, add the next one or edit the sentence — and preview the audio when there is some — before confirming. You can also "Add this sentence to the card" for several sentences first and turn them into a single card.
- **Anki isn't running**: the card isn't lost; it waits in the pending queue and is sent the next time Anki is reachable.

The full first-card walkthrough is in [How do I make my first card?](/faq/first-card.en); recommended Anki settings are in [What should I set up in Anki after connecting?](/faq/anki-basics.en).

## Keyboard, mouse and gamepad

- **Mouse wheel** scrolls the popup; **Alt + wheel** jumps to the previous / next entry. Scroll speed is "Popup scroll speed" under Settings → Lookup → Entry content.
- The "Dictionary popup" shortcut group (works while the pointer is over a dictionary popup) contains "Play word audio", "Create card (mine)", "Previous word entry" and "Next word entry"; rebind them in **Settings → Keyboard shortcuts**.
- On a gamepad the D-pad up/down switches entries by default.
- On phones you can swipe the popup away; whether swiping closes it, the swipe sensitivity and the "Popup close animation" are all under Settings → Lookup → Popup window.

## Popup too big, too small, or covering the text

**Settings → Lookup → Popup window**:

- **Popup max width / Popup max height**: popup size; on desktop, dragging the popup's bottom-right corner changes these values too. Novels, manga and videos share them.
- **Bottom-docked popup**: instead of following the word, pin the popup as a full-width panel at the bottom of the screen. It can be turned on per context (Dock in novels / Dock in manga / Dock in videos / Dock in games) — great for reading novels on a phone in portrait.
- **Instant popup scroll**: for e-ink screens; the popup jumps by a fixed distance with no scroll animation.
- In vertical novels the popup is placed to the left or right of the current column so it doesn't cover the column you're reading.

## Common problems

- **Tapping does nothing / the popup is empty**: make sure dictionaries are imported and not hidden; type a common word into the home lookup page — if that finds nothing, it's a dictionary problem.
- **The result is always a single character**: you probably tapped the middle or end of the word — tap its first character; or you lack a dictionary for that kind of word.
- **Text in the popup is too small**: the popup's top bar has buttons for larger / smaller dictionary text, and Settings has "Dictionary font size".
- **Several dictionaries repeat the same content**: move the ones you rarely read further down and collapse them; see [How do I import dictionaries](/faq/dictionaries.en).
