---
title: "Can I look up words in image subtitles like Blu-ray PGS or DVD VobSub?"
description: "Yes. When you pause, Fushi runs OCR on the subtitle image on screen and lays the text back in place, so you can tap a word to look it up and mine an Anki card that still carries the line's audio and clip. \"Convert to text subtitles (OCR)\" recognizes the whole track once so you can look things up while playing. PGS, VobSub and DVB are supported, for local and remote playback."
category: "Video"
order: 87
date: 2026-10-12
lang: en
---

The subtitles on Blu-ray discs, BDRips and DVDs are often not text but **images**: Blu-ray uses PGS (`.sup`), DVD uses VobSub (`dvd_subtitle`), and European TV broadcasts use DVB subtitles. The player draws those images straight onto the picture, so they look like text subtitles, but the track contains no text data at all — ordinary players can show them but not select them or look anything up.

Fushi's approach is **OCR (optical character recognition)**: read the characters off the subtitle image and turn them into tappable text. There are two ways to use it; pick whichever suits you. For the difference between the formats themselves see [subtitle formats](/faq/subtitle-formats.en) and [embedded, external and hard subtitles](/faq/subtitle-types.en).

## How to tell it's an image subtitle

In the player's subtitle menu, image subtitle tracks have an image icon, and the subtitle reads "Graphic subtitle · shown on video · pause to look up words (OCR)" or "Image subtitles are read by OCR when paused; tap a word to look it up. Use "Convert to text subtitles" below to look up words while playing." Once selected, the player keeps drawing the subtitle on the picture as usual.

Text subtitles (SRT / ASS / WebVTT, text tracks inside an mkv) don't need any of this — you can tap their words directly.

## Option 1: pause and tap a word

The simplest way needs no setup at all:

1. Select the image subtitle track and watch normally;
2. When you want to look something up, **pause**. Fushi captures the current frame together with the subtitle image and runs OCR on it; "Reading subtitle…" appears below the top bar;
3. When it's done it shows "Subtitle recognized · tap a word", and the recognized text is laid over the subtitle image in its original position. **Tap any character to start a lookup from it**, and the same lookup popup appears as with ordinary subtitles;
4. Tap the plus in the popup to [make a card](/faq/first-card.en). The card is the same as one made from a text subtitle: the line's **sentence audio**, the synced video clip / animated image and the screenshot are all taken from the real on-screen start and end times of that subtitle.

If there's no subtitle in the current frame, it says "No subtitle text here".

This mode recognizes **only the line you need, when you need it**, so there's no waiting up front; the downside is that you can only look things up while paused, and features that depend on a full text timeline — the subtitle list, auto-pause — aren't available.

## Option 2: convert the whole track to text and look up while playing

For exactly the same experience as a text subtitle — tap words during playback, jump between lines in the subtitle list, auto-pause after each line — convert the track once:

1. In the subtitle menu, below the image subtitle track, there's **Convert to text subtitles (OCR)** ("Recognize the whole track once; then tap words to look them up while playing");
2. It explains that every line of the track will be recognized with your OCR settings (shared with manga OCR) and that large files take a while to read. Tap **Start**; to switch the recognition engine first, tap **OCR settings**;
3. A progress card appears at the top left: first "Preparing the OCR engine…", then it recognizes while it reads the subtitle track ("Reading x% · n lines ready, playing along"), then "Recognizing x/y". **Lines near the playhead are recognized first**, and each recognized line becomes a tappable subtitle immediately, so you can start looking things up before the whole track is done;
4. The progress card can be **collapsed** into a small icon with a progress ring so it doesn't cover the picture; tap cancel if you want to stop;
5. When it finishes, the result is attached and selected as a text external subtitle. From then on it's an ordinary external subtitle: tap words to look them up, use the [subtitle list](/faq/video-shortcuts.en), auto-pause, timing adjustment and secondary subtitles.

Recognition is fast: each subtitle image is already a cropped line of text, so Fushi recognizes it as "a line of text" instead of treating it as a whole manga page, runs several recognition sessions in parallel, and recognizes each distinct subtitle image only once. Reading the subtitle track means going through the whole video file once, so on large files, slow disks or a NAS that step takes a while.

## Accuracy and recognition engines

The OCR settings are shared with manga OCR (the OCR part of **Settings → Manga**, or tap **OCR settings** on the progress card / start dialog to jump there). Options:

- **Automatic (never uploads to Lens)**: prefers an offline engine you've already set up;
- **Local ONNX**: fully offline; the chosen model is downloaded on first use, and speed and accuracy depend on the model and hardware;
- **Device OCR**: the system's built-in text recognition — no download, fully offline, nothing uploaded;
- **Google Lens**: needs a connection and uploads the image to Google, no model download;
- With [Fushi interconnect](/faq/interconnect.en), you can also hand the work to a paired interconnect server.

Subtitles are printed and neatly laid out, so they're usually easier to read than manga speech bubbles; but stylized lettering with heavy outlines and shadows, effect subtitles and subtitles overlapping busy backgrounds can produce wrong characters, and subtitles with lots of furigana deserve a closer look. You can also turn on **AI recognition** (also in the OCR settings, off by default): after local recognition, the characters it wasn't sure about (or all of them) are sent to the vision model assigned under "Settings › AI" for a re-read. The re-read never holds up the local result — local text appears first, and the re-read replaces it when it comes back. This uploads the cropped subtitle images to the provider you assigned, billed by them; with no provider assigned, nothing is sent.

Before mining, check that the recognized line matches the picture; fix any wrong characters in the card editor before saving.

## Remote playback, obscuring subtitles and other details

- **Supported formats**: all three image subtitle formats — PGS, VobSub and DVB — work both for pause-to-look-up and for whole-track conversion.
- **Remote playback works too**: when you watch a video on another device over Fushi interconnect, that host extracts the whole subtitle track and sends it back, so your phone doesn't have to read the entire film; when playing from a [media server](/faq/media-servers.en) or a network address, the track is extracted from the stream. Every line has real start and end times, so cards still carry sentence audio. Very old interconnect hosts can't send whole tracks; whole-track conversion then reports a failure, while pause-to-look-up keeps working with the timings recorded during playback.
- **Obscuring subtitles**: the "Obscure subtitles" option for listening practice (blur / hide) blurs image subtitles exactly where the subtitle image is, rather than blurring the whole bottom of the picture — see [using secondary subtitles as a bridge](/faq/secondary-subtitle.en).
- **Recognition runs on the CPU**: in testing, GPU acceleration brought no benefit for subtitle images whose widths vary line by line, so subtitle OCR deliberately runs on the CPU; the "Engine: …" line on the progress card shows the engine actually in use.
- **Earlier conversions have duplicated lines**: early versions of whole-track conversion could repeat the same line several times with furigana fragments mixed in. That's fixed now, but an old converted subtitle keeps the old result — just run "Convert to text subtitles" again.

## Prefer a text subtitle when one exists

However accurate, OCR is still recognition. If you can find a Japanese text subtitle for the same work (most anime have one on Jimaku), using it is simpler — see [how to find Japanese subtitles for anime](/faq/subtitle-download.en).

If you don't have Fushi yet, get it from the [download page](/download).
