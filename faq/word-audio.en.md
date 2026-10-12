---
title: "How do I install word audio in Fushi? How do I hear it in lookups and put it on Anki cards?"
description: "Word pronunciation comes from audio sources: the local pronunciation library in the recommended pack (Japanese + English), an audio database in the same format as Yomitan's Local Audio Server, a custom online link, or your computer's library through Fushi Interconnect. Once set up, tap the speaker in the lookup popup to listen, and mined Anki cards get the word audio automatically."
category: "Lookup & dictionaries"
order: 123
date: 2026-10-12
lang: en
---

Every entry in the lookup popup has a **speaker** next to it: tap it to hear the word's standard pronunciation. For Japanese this matters a lot — how a kanji word is read, its pitch, long vowels and doubled consonants are easy to get wrong from kana alone and obvious after one listen. When you mine, that clip also goes onto the Anki card so you can hear it in reviews.

The speaker doesn't make sound on its own, though; it looks for audio in your **audio sources**. This page covers which kinds exist, how to install them and how to use them.

First, two separate things: **word audio** is dictionary-level "how this word is said", one short clip per word; **sentence audio** is the original line from the anime or audiobook you're consuming, cut from the media itself. This page is only about the first. Sentence audio needs no setup — Fushi cuts it from whatever is playing when you mine.

## The easy way: the local library in the recommended pack

After you install the [recommended pack](/faq/pack.en) in the onboarding wizard, you have a **local pronunciation audio library** covering Japanese and English. It lives on your device, so lookups don't touch the network or wait — tap the speaker and it plays. If you only study Japanese or English, the pack is all you need.

If you study another language, or don't want the pack (it's large), read on to set things up yourself.

## Kinds of audio source

Everything lives in **Settings → Lookup → Pronunciation & feedback → Manage audio sources** (the onboarding wizard's "Set up pronunciation audio" opens the same dialog). You can add several sources; they are tried in list order:

| Source | What it is | Good for |
|---|---|---|
| **Local audio** | An audio database file on this device | Offline, fast, frequent lookups |
| **Remote audio** | An http(s) link template that returns an audio file | An existing online pronunciation service |
| **Fushi Interconnect** | The pronunciation library on another paired device (usually your computer) | Phones where you don't want a big file |

### Local audio database

Tap "**Add local audio database**" and pick an audio database file. The format is **the same one** Yomitan's Local Audio Server uses — if you've already downloaded that data for Yomitan (recordings from NHK, dictionaries, jpod, forvo and others), just pick its database file (`entries.db`; the Android build commonly uses `android.db`) and it works without conversion.

The picker has an option "**Reference original file (don't copy)**": keep the database where it is and read from its original path; the source breaks if the file is moved or deleted. These databases are often several GB, so referencing saves you a second copy. On Android, if the system only hands Fushi a temporary copy (no real path), you'll see "The selected file is a temporary copy. Importing a persistent copy instead." — copying is the only option then.

A database usually contains several recording sources (different dictionaries, different speakers). After adding it, use "**Edit sources**" on that source to tick which sub-sources to use and set the "**Source priority**" — e.g. put NHK before forvo so the announcer's standard reading wins.

If you ever see "Audio database unavailable. Select the original DB file again.", you most likely moved or deleted a referenced file; use "Select audio database again" to point it back — your sub-source settings are kept.

### Remote audio (custom link)

Enter an http(s) address using `{term}` (headword) and `{reading}` as placeholders; they are replaced with the current word at lookup time. The link must be http(s) and contain a term or reading placeholder, or it can't be saved. It has to return an audio file.

Links pointing at this device (`127.0.0.1`, `localhost` and so on) get a warning: re-point after switching machines. You could, for example, plug in a Yomitan Local Audio Server you run yourself this way — but since Fushi can read that database directly, "Local audio" above is simpler.

### Fushi Interconnect

Don't want several GB of audio on your phone? Once your computer runs a [Fushi Interconnect](/faq/interconnect.en) host and the phone is paired, add a "**Fushi Interconnect**" source on the phone and lookups fetch audio from the computer's library. While the computer is off that source can't answer, so you may want a remote source after it as a fallback.

## Listening during lookups

- **Tap the speaker**: plays the default source — the first source in your list that has the word.
- **Long-press the speaker (touch) / right-click it (desktop)**: opens a "choose audio source" menu listing every recording each enabled source found for this word (source name + speaker / variant); tap one to play it. With keyboard focus on the speaker, Shift+F10 or the menu key opens it too. The choice **only affects that playback**.
- **Shortcut**: "Play word audio" in the "Dictionary popup" group works while the pointer is over the popup; rebind it in Settings → Keyboard shortcuts.
- **Auto read word on lookup** (Settings → Lookup → Pronunciation & feedback, on by default): plays the first source's audio as soon as the popup opens. Turn it off if it's too noisy.
- **Lookup audio volume**: a slider in the same group that sets the volume of word audio only, independent of videos and audiobooks.

When nothing is found, "No audio available" appears next to the speaker. That's not a malfunction: the database doesn't contain the word, or the headword / reading doesn't match (common for proper nouns, new words and unusual readings).

## How word audio gets onto Anki cards

When you mine with the plus, the word audio fills the field mapped to `{audio}`, and the audio file is stored in Anki's media collection — the card plays it even outside Fushi.

- With the **Lapis deck** Fushi creates in one tap, `ExpressionAudio` is already mapped to `{audio}`; nothing to set up.
- With your own note type, map the audio field to `{audio}` in **Settings → Card creation → Field mappings**.
- Mining uses the **default source** (the same clip the speaker plays), not one you picked temporarily from the long-press menu. To make cards always use a particular recording source, move it to the top in "Manage audio sources" / "Edit sources".
- The card also gets **sentence audio** (`{sentence-audio}`, the original line) — don't confuse the two.

Whether word audio belongs on the front of the card is a study-method question; we recommend keeping it off the front and listening on the back — reasons in [What should I set up in Anki after connecting?](/faq/anki-basics.en)

## Platforms and common problems

- **Not enough storage on the phone**: use "Reference original file" to avoid copying, or simply use a "Fushi Interconnect" source and let the phone ask the computer.
- **Picking a large database on Android is slow / fails**: make sure you picked the database file itself, not an archive; with "Reference original file (don't copy)" ticked and a real file path available, Fushi doesn't make another multi-GB copy.
- **This file isn't a usable audio database**: wrong file (not a Local Audio Server database, or it has no audio).
- **Remote source times out / can't resolve the host**: the link is wrong, the service isn't running or the network can't reach it; delete remote sources you don't use so lookups don't wait for them.
- **Only some words have audio**: no library covers every word. Adding another source (another database or an online one) fills some gaps, but don't chase 100%.
- Pitch accent and audio work best together; see [How do I show Japanese pitch accent](/faq/pitch-accent.en). The popup's other buttons are covered in [How does the lookup popup work?](/faq/lookup-popup.en)
