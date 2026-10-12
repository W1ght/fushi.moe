---
title: "Fushi's manga OCR gets text wrong or misses it — what can I do? How do vertical/horizontal text, models and engines work?"
description: "When manga OCR is inaccurate, first work out what kind of problem it is: Fushi routes vertical and horizontal text automatically per text box; switch the local model (Manga CTC / Baberu) or the engine (local / device / Google Lens / external mokuro / interconnect server), let \"AI recognition\" re-read the uncertain text, then re-run OCR on the volume."
category: "Manga"
order: 73
date: 2026-10-12
lang: en
---

Manga OCR is guessing text from pictures: irregular speech bubbles, vertical and horizontal text mixed together, furigana squeezed alongside, handwriting and sound effects all over the page — no recogniser is ever 100% right. This article covers what you can adjust in Fushi when recognition goes wrong, and only lists options that actually exist in the app. If you haven't used manga OCR yet, start with [importing local manga](/faq/manga-local.en) or [reading manga online](/faq/manga-online.en).

## First: was it missed, or misread?

Open the reader's **Reader settings → OCR** (the toolbar has a button of the same name too) and turn on **Show recognized text regions**. Every recognised text box gets an outline:

- **No box over a bubble**: that text wasn't detected (a missed box). Common with very small text, text hugging the edge of the page, and heavily stylised title lettering;
- **A box, but the lookup shows the wrong word**: it was detected, but the characters were misread;
- **A box with the right text, but taps don't hit it**: you're most likely tapping outside the box, or on desktop you're trying to look up on hover without holding Shift (or turn on "Lookup OCR text on hover").

If a whole page has no boxes, it simply hasn't been recognised yet. With "OCR trigger" set to **Manual**, press **Recognize this volume** in the toolbar; with **On open**, recognition runs in the background from the current page, with progress in the top-right corner.

## Do I need to switch between vertical and horizontal text?

No — and there's no such switch. Fushi decides the direction **for each text box** automatically:

- a box taller than it is wide (the typical vertical speech bubble) goes to the main recogniser whole;
- a box at least as wide as it is tall (horizontal paragraphs such as title-page blurbs, character introductions, author notes) is first split into lines, each line is recognised on its own, and furigana is filtered out;
- a wide bubble that is really two or three columns of vertical dialogue is decided by a vote over the detected lines; if vertical lines win, it's still recognised whole as vertical text instead of being chopped up.

So problems like "a horizontal paragraph comes out as garbage" or "a vertical line gets cut in half" are usually fixed by switching recognisers, not by looking for a direction setting.

## Switching local models: Manga CTC and Baberu

**Settings → Manga → Manga OCR** currently offers two options under "Local OCR model":

- **Manga CTC (fast)**: the default model, available on all five platforms. A manga-tuned PP-OCRv6 model that reads each text column on its own; small download, fast, and **accurate even on furigana-heavy pages**;
- **Baberu (fast, GPU when available)**: Windows only, about 284 MB including the horizontal-line models. On Windows it uses the GPU for image encoding and the CPU for text decoding, falling back to the CPU when the GPU isn't available; some names and handwriting may be less accurate. A switch applies to newly started OCR tasks.

The same volume can come out differently on the two models, so it's worth trying both. Volumes that were already recognised are not re-run automatically after a model switch; use **Re-run OCR on this volume…** in the reader to redo it with the new model.

If a model won't download, there's **Import local model**: press "Copy download links", download the files yourself in a browser (or pack them into a zip), then "Pick files" / "Pick folder" to import them; a file with the wrong size is reported explicitly with the expected and actual sizes. Models you don't use can be removed with **Delete models** to free space.

## Switching engines: the trade-offs of each

**Default OCR engine** decides who does the recognition:

- **Local ONNX** (shown as "Local · model name"): fully offline, using the local model chosen above — the workhorse for vertical manga;
- **Automatic (never uploads to Lens)**: prefers an offline engine you already set up and never uploads to Lens on its own;
- **Device OCR**: the text recognition built into the system (ML Kit on Android, Apple Vision on iOS / macOS, the system OCR on Windows). No download, fully offline, nothing uploaded — but noticeably weaker on vertical speech bubbles and handwriting than the local model, so treat it as a fallback. On Android it relies on Google Play services and won't work if they are missing or disabled;
- **Google Lens**: the factory default. Needs internet and uploads downscaled page images to Google; before recognising it asks for your consent, and nothing is uploaded unless you agree. Fast with no download, but quality is below the local model, and it isn't an official public API, so it may stop working at any time. It has a "Recognition language" setting;
- **External mokuro**: runs your own installed mokuro command line, desktop only, see [What is mokuro?](/faq/mokuro.en);
- **Fushi Interconnect server**: with a [Fushi interconnect](/faq/interconnect.en) host set up, the paired server does the work and this device downloads no model at all — as long as the server has downloaded the model; otherwise you're told to download it on the server first.

For the best accuracy, prefer a local model; if your device is the bottleneck, use the interconnect server; for a quick look, device OCR or Google Lens is the least hassle.

## Let an AI model re-read uncertain text

The "AI enhancement" group has **AI recognition** with three settings:

- **Off** (default);
- **Only uncertain text**: text boxes are still detected and recognised on-device, and only boxes with low confidence are cropped and sent to a vision model to re-read. This setting needs a local model, because the other engines don't report confidence;
- **All text**: the text in every box goes to the AI model.

The cropped text boxes are uploaded to the provider assigned to manga OCR under "Settings › AI", which bills you for them; with no provider assigned, nothing is sent (an "Open AI settings" button takes you there). The model's reply has to pass local checks before it replaces the original text; if it fails, the on-device result is kept. Volumes recognised before you turned this on have no confidence records, so "Only uncertain text" leaves them alone — re-recognise such a volume with a local model first.

## Speed, memory and other checks

- **Parallel OCR tasks**: defaults to "Automatic (1-2 tasks)"; different books are recognised at the same time, while chapters of one book are processed in order. More tasks use more memory; with "Low memory mode" on, at most one task runs.
- **GPU status**: on Windows it shows "OCR acceleration: …", and if the GPU isn't usable it tells you what it fell back to and why.
- **Chapters read online**: they're recognised as you read, but the results aren't kept; for stable whole-volume results, download first and then recognise.
- **Scan quality**: low-resolution or heavily compressed pages are hard for every engine. If a clearer release of the same title exists, switching versions does more than tweaking settings; volumes that come with good OCR data as `.mokuro` can also be imported directly.
- **Handwritten sound effects, decorative fonts**: a weak spot shared by every recogniser, so some misses here are expected.

The manga reader currently has **no way to draw a box around an area and recognise just that part**; improving recognition comes down to the steps above — switching models, switching engines, AI re-reading and re-running OCR. Once the text is recognised, it's the normal tap-to-look-up and mining flow, see [your first card](/faq/first-card.en).
