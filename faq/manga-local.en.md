---
title: "How do I import local manga (CBZ / ZIP / PDF / image folders) into Fushi and look up words and mine cards?"
description: "In the manga library's Import page, use \"Import Manga\" or \"Import folder\": CBZ / ZIP / PDF / .mokuro / image folders are supported, CBR / RAR / CB7 need 7-Zip. After import, on-device manga OCR reads the speech bubbles so you can tap text to look it up and mine Anki cards that carry the sentence and the page image."
category: "Manga"
order: 71
date: 2026-10-12
lang: en
---

Manga is one of the easiest kinds of material to stick with when learning Japanese: the pictures help you guess the meaning, the dialogue is short and colloquial, and your vocabulary grows noticeably over a single volume. The catch is that manga pages are images, so you can't select the text. Fushi's answer is to run **manga OCR** first: it recognises the text in the bubbles and lays an invisible text layer over the page, after which you can tap words and mine cards just like in an e-book. This article covers manga files you already have — how to import them, recognise them and mine from them. For manga you follow online, see [How do I read manga online and OCR the text for mining?](/faq/manga-online.en).

Local import and reading work on every platform, iOS included (per App Store rules the iOS build only lacks online manga sources).

## Which manga formats does Fushi support?

A "volume" in the manga library can be any of the following; Fushi decides by the file's contents, not just its extension:

- **Image folder**: one folder holding one volume's pages, in JPG / JPEG / PNG / WebP / GIF / BMP.
- **CBZ / ZIP**: page images in an archive. `.zip` is also the extension of Yomitan dictionaries, so Fushi opens the archive to check that it really contains page images before importing it as manga.
- **CBR / RAR / CB7**: these need 7-Zip to unpack. The Windows installer ships it; on macOS / Linux `7z` or `7za` has to be installed and on your PATH. If they won't import on a phone, convert them to CBZ or unpack them into an image folder on a computer first.
- **PDF**: scanned manga often comes as a single PDF; the manga library renders it page by page into page images. Note that the same PDF imported from the bookshelf becomes a PDF book in the PDF reader — to read it as manga, import it from the manga library.
- **EPUB (scanned)**: an EPUB that only contains page images can be imported as manga too; a normal EPUB with real text belongs in the bookshelf, see [the e-book reader](/faq/epub-reader.en).
- **.mokuro**: the OCR result file produced by the mokuro tool. Import it together with its page images and the text is already there, no recognition needed — see [What is mokuro?](/faq/mokuro.en).

If you accidentally import a manga archive on the bookshelf, Fushi shows "This looks like manga"; press **Import as manga** to switch to the manga flow.

## How to import: one volume, a batch, or a folder Fushi keeps scanning

Go to the bottom bar's **Manga** → the **Import** tab at the top. There are three buttons:

1. **Import Manga**: opens the import dialog, where you can "Pick manga file" or "Pick manga folder", or just drag files onto the dialog (desktop). For a single volume you can fill in a title; leave it empty to use the file name.
2. **Import folder**: after picking a folder you're asked where it should go — **Add as library source** (keep scanning this folder for new manga, good for a folder you keep adding volumes to) or **Import once only**.
3. **Network**: adds an SFTP / FTP / WebDAV remote library as a source, for manga stored on a NAS.

Batch import rule: if the folder you pick has no page images itself but directly contains a set of whole-volume files (CBZ / ZIP / EPUB / .mokuro and so on), Fushi tells you it found N volume files and will import each as its own book, titled by its file name, and reports how many succeeded, were skipped and failed. A folder that holds both page images and volume files is treated as an image folder.

## Recognise while importing: the OCR import wizard

At the bottom of the import dialog is an **OCR import manga** button that opens the OCR wizard: pick an image folder, optionally fill in a title, then choose —

- **Run OCR**: recognise the whole volume first and then add it to the library, with progress shown as "Page x / y";
- **Import without OCR**: add it now and recognise it later in the reader.

The wizard has an **OCR settings** button that jumps straight to the engine settings, so a model you just downloaded is selectable when you come back. If the folder already has a `.mokuro` file, the wizard tells you to use the normal import instead; running the wizard on a book already in the library is called "Recognize volume text", and if every page already has OCR data it tells you there's no need to run it again (re-running overwrites the data).

## Recognising text and tapping to look up

Local recognition needs a model the first time: **Settings → Manga → Manga OCR**, pick a "Local OCR model" and press **Download models**; if the in-app download won't go through, use **Import local model** to bring in files you downloaded yourself (or a zip containing them). How to choose models and engines is covered in [Manga OCR gets the text wrong — what can I do?](/faq/manga-ocr-tips.en). Note that the factory "Default OCR engine" is **Google Lens**: it needs a network connection and uploads page images to Google, so before recognising it shows a notice and asks for your consent — nothing is uploaded unless you agree. If you don't want uploads, switch the engine to a local model or "Device OCR".

There are two ways to trigger recognition, under the reader's **Reader settings → OCR** → "OCR trigger":

- **On open**: opening a volume starts recognising the whole volume in the background from the current page, with progress in the top-right corner;
- **Manual**: the toolbar gets a **Recognize this volume** button for when you want it.

The results are written back into the manga's data (in the same format mokuro uses), so the next time you open it nothing needs to be re-run. Once recognised:

- **tap the text in a bubble** to bring up the dictionary, just like in an e-book;
- on desktop, hold **Shift** while moving the mouse to look up on hover; with "Lookup OCR text on hover" turned on, you don't need Shift;
- turn on "Show recognized text regions" to see each text box's outline, which helps tell "not recognised" apart from "missed the tap".

## Mining: what goes on the card?

Press the plus in the lookup popup to mine a card. It uses the same Anki settings as every other media type (if Anki isn't connected yet, read [How do I connect Anki?](/faq/anki.en) and [your first card](/faq/first-card.en)):

- **Sentence**: the whole sentence rebuilt from the OCR geometry — the bubble you tapped, not just the single word;
- **Image**: the page where the text you tapped actually is. With two pages shown side by side, it takes the page the text is on, not simply the first of the two;
- word, reading, definitions and the other fields come from the dictionary as usual.

Manga has no voice track, so there's no sentence audio on the card; the word's own pronunciation can still be added as usual, see [word audio](/faq/word-audio.en).

## Reader settings and common problems

The reader settings are split into "Mode / Filters / OCR" pages. Commonly used ones: **Reading direction** (choose "Right to left" for Japanese manga), **Reading mode** (Spread / Webtoon / Vertical pages and so on), **Spread offset** (if page pairs are wrong, switch to "Cover alone" or "Pair from page 1"), **Wide pages alone**, **Crop borders**, **Split wide pages**, plus filters such as brightness, contrast, Invert colors and Grayscale. Settings can be global or set for the current title only.

- **No pages after import**: check that the images are in one of the formats listed above; picking the wrong level (a parent folder full of sub-folders) does this too — pick the specific volume's folder, or use batch import.
- **CBR / RAR won't import**: install 7-Zip on desktop (Windows already has it), convert to CBZ on phones.
- **No page images when picking a .mokuro on iOS**: picking a single .mokuro file on iOS can't bring the page images next to it along. Pick the whole volume folder (the .mokuro plus its page image folder), or pack the volume into a .zip / .cbz and import that.
- **Tapping does nothing**: first make sure the page has been recognised ("Show recognized text regions" shows boxes). No boxes means it hasn't been recognised or the engine isn't set up; if it says there's no OCR engine available, download a model or switch engines in the Manga OCR settings.

If you don't have Fushi yet, head to the [download page](/download); for more ways to learn, see [immersion](/immersion).
