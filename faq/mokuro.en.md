---
title: "What is mokuro, and how does Fushi read manga in the .mokuro format?"
description: "mokuro is an open-source OCR tool for Japanese manga that produces .mokuro files holding the text boxes and their text. Fushi imports .mokuro plus page images directly for tap-to-look-up and Anki mining, and stores its own manga OCR results in the same format; on desktop it can call your installed mokuro, and outside iOS a built-in Mokuro catalog offers volumes that already come with OCR."
category: "Manga"
order: 72
date: 2026-10-12
lang: en
---

If you've ever searched a Japanese-learning community for "how do I look up words in manga", you've probably heard of mokuro. This article explains what it is, what a `.mokuro` file contains, and the three mokuro-related things in Fushi: importing existing `.mokuro` files, calling your own mokuro command-line tool, and browsing the built-in Mokuro catalog.

## What is mokuro?

[mokuro](https://github.com/kha-white/mokuro) is an open-source command-line tool: you give it a folder of manga page images, and it detects the speech bubbles page by page on your computer, recognises the Japanese inside them and writes out the results. Open them in its companion reader in a browser and you can select text on the manga pages and look it up with a browser dictionary such as Yomitan.

What it does is remove the "manga is just pictures, you can't select the text" barrier. The cost is installing a Python environment and models on a computer, running recognition over each whole volume, and having the recognition, the lookup and the card-making spread across separate tools.

Newer mokuro (v0.2 onwards) writes a volume's results into a single `.mokuro` file, which is essentially JSON: the size of each page, the position of every text box, whether it's vertical, and the text of each line in the box. The page images themselves aren't inside it — they usually sit in a folder with the same name as the `.mokuro` file, and only the two together make a complete volume.

## How does Fushi read .mokuro?

Fushi's manga reader uses mokuro's data format internally: whether the text was recognised by mokuro or by Fushi's own manga OCR, the results land in the same structure, and the reader uses it to lay an invisible text layer over the page — **tap the text to look it up**, tap the plus to mine (the card carries the whole sentence from that bubble and the page image; see [importing local manga](/faq/manga-local.en)).

To import an existing mokuro volume: bottom bar **Manga** → **Import** → **Import Manga**, then any of these:

- **Pick the `.mokuro` file**: Fushi looks for the page images next to it using the paths recorded in the `.mokuro`;
- **Pick the folder that contains the `.mokuro` and its page image folder**: when the folder holds exactly one `.mokuro`, it's imported as that volume with its OCR — it won't be mistaken for a plain image folder and lose the text;
- **Pick a folder containing several volumes**: when it directly contains several `.mokuro` files, it's batch-imported as one book per volume, each with its own OCR;
- **CBZ / ZIP plus a `.mokuro` of the same name**: a `book.cbz` with `book.mokuro` next to it is recognised too.

**A note for iOS**: picking a single `.mokuro` file on iOS can't bring along the page images beside it (the system only grants access to that one file). Pick the whole volume folder (the .mokuro and its page image folder), or pack the volume into a .zip / .cbz and import that.

When page images don't match, Fushi doesn't silently import a volume with no text or missing pages; it reports exactly which page has no image, so you can check the folder structure. If you run recognition on such a volume after import, the OCR wizard reminds you that every page already has OCR data and there's no need to run it again (re-running overwrites the existing data).

## You don't need mokuro to get text: Fushi's built-in manga OCR

Many people assume manga has to be processed with mokuro before Fushi can read it. It doesn't. Fushi has its own **manga OCR**: download a local model under **Settings → Manga → Manga OCR**, and any CBZ / ZIP / PDF / image folder you import can be recognised right in the reader, with results stored in the mokuro format so nothing needs to be re-run next time. Recognition runs on-device, the default local model runs on all five platforms, and if a phone is too slow you can hand recognition to a paired Fushi interconnect server (see [Fushi interconnect](/faq/interconnect.en)). The differences between engines and how to tune them are in [Manga OCR gets the text wrong — what can I do?](/faq/manga-ocr-tips.en).

So within Fushi, mokuro is more of an "optional external engine" and a "source of ready-made data": a manga library you processed with mokuro in the past can be moved in as-is and keep working.

How to choose between the two:

- **You only read on a phone or tablet**: Fushi's built-in recognition is enough — no computer needed, and no need to finish a whole volume first: "On open" starts recognising from the page you're looking at, so text appears as you read;
- **You already have a whole library processed with mokuro**: import the `.mokuro` files directly; hundreds of volumes don't need recognising again;
- **You prefer a particular recogniser**: on desktop you can switch between the built-in models and external mokuro to compare; re-recognising a volume replaces its results with the new engine's;
- **You don't want to recognise things over and over**: whichever engine you use, the results are stored in that manga's own data (in the mokuro format), so it opens with text from then on and only runs again when you choose "Re-run OCR on this volume…".

## Calling your installed mokuro from Fushi (desktop only)

If you already have mokuro installed on your computer and like its results, Fushi can call it directly:

1. under **Settings → Manga → Manga OCR**, in the "External tools" group, fill in **External mokuro CLI path**; leave it empty to auto-detect (first the `FUSHI_MOKURO` environment variable, then `mokuro` on your PATH);
2. press **Detect** — if it shows "Detected: `<version>`", it was found;
3. set **Default OCR engine** to **External mokuro** ("Calls a mokuro command line you installed yourself. Desktop only.").

From then on, when you use the OCR import wizard or the reader's "Recognize this volume", Fushi runs mokuro over the image folder and imports the resulting `.mokuro`. The common failures each have a clear message — mokuro executable not found, mokuro produced no output for a long time and was stopped, mokuro exited with a non-zero code, mokuro finished but no .mokuro output was found — so check the path and whether mokuro itself runs from the command line.

## The built-in Mokuro catalog: download volumes that already have OCR

Among the manga sources is a **Built-in Mokuro catalog** (by default the catalog at mokuro.moe), with community-prepared manga that already ship with `.mokuro` OCR data:

1. **Browse → Sources** (the manga library's "Sources" tab works the same), choose "Manga" and open the **Built-in Mokuro catalog**;
2. find a title with "Search series", tick the volumes you want and press **Download selected**;
3. each volume goes through three stages — downloading the OCR data, downloading the volume archive, unpacking — large archives resume after interruptions, and temporary server failures are retried automatically; progress is under "Manga catalog downloads" in the download queue, and finished volumes show as "Imported".

Once downloaded, read and tap right away — no recognition step. This entry sits in the same list as the manga sources provided by extensions; turn off the switch on its left and it disappears from Browse. The catalog site address can be changed under **Settings → Manga** in the "Online catalog" group ("Online catalog URL"; empty means the default site).

**Platform limits**: the built-in Mokuro catalog counts as an online manga source, so **the iOS build doesn't have it under App Store rules** (same as Mihon extension sources); it's available on Android, Windows, macOS and Linux. iOS users can still prepare `.mokuro` files plus page images on a computer, pack them as CBZ / ZIP and import them on an iPhone / iPad, see [What's missing from the iOS version?](/faq/ios-limits.en).

For more online manga sources, see [What are Mihon / Aniyomi extensions?](/faq/mihon.en) and [reading manga online](/faq/manga-online.en).
