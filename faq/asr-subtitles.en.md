---
title: "My anime / video has no Japanese subtitles — can speech recognition generate them?"
description: "Yes. \"Generate subtitles with speech recognition\" in Fushi's subtitle menu runs an on-device speech model over the whole episode and produces text subtitles you can tap to look up words and mine Anki cards from. Nothing is uploaded; the first run downloads a model (about 160 MB for the light Japanese one), and it works on all five platforms."
category: "Video"
order: 83
date: 2026-10-12
lang: en
---

The ideal combination for learning Japanese from anime is "raw video + Japanese subtitles": subtitles you can tap for lookups and mine into cards that carry the line's original audio and picture. But plenty of videos have no Japanese subtitles anywhere — obscure older shows, dramas, variety shows, interviews saved from YouTube, lectures you recorded yourself. Fushi's answer is to let the device "listen" itself: an on-device speech recognition (ASR) model turns the whole episode's dialogue into a timed text subtitle, which you then use like any external subtitle.

The short answer: **it works, it runs entirely on your device, and no audio is uploaded**; the cost is a model download the first time, some waiting per episode, and accuracy below a human-made subtitle. If a ready-made subtitle exists, [find that first](/faq/subtitle-download.en) — it's faster and more accurate; transcribe when there's nothing to find.

## Generating subtitles from the player

1. Open the video and go to the player's **subtitle** menu (the subtitle-track group).
2. Tap **Generate subtitles with speech recognition** (its subtitle reads "Create text subtitles for word lookup and flashcards").
3. In the **On-device transcription** panel that opens:
   - **Speech language**: the language spoken in the video — Japanese for anime. Picking the wrong language produces gibberish and is the most common cause of failure;
   - **Model**: each language has a default model; the dropdown says whether it's "Dedicated — most accurate for this language" or multilingual, whether it suits phones or desktops, and how big the download is;
   - **Acceleration**: "Auto (GPU when available)" by default, or "CPU only".
4. If the model isn't downloaded yet, tap **Download model**, then **Start transcription**. The panel shows progress, elapsed time, estimated time left and the speed relative to real time.
5. When it finishes, the subtitle is attached and selected as an external subtitle, and a new entry appears in the subtitle-track list. Tap a word on the subtitle to look it up, tap the plus to [make a card](/faq/first-card.en).

You can **Pause** mid-way; progress is saved at checkpoints, and **Resume transcription** later picks up where it stopped instead of starting over. The generated subtitle is saved per episode, so it's still there the next time you open it.

Where the entry appears: on every local video file, and also when you watch a video from another device over [Fushi interconnect](/faq/interconnect.en) — that host cuts out the episode's full audio track and sends it over, and the transcription runs locally. Pure network streams (direct links, YouTube, online video sources) don't give access to the full audio track, so the entry isn't there.

## How big are the models and where do they live

Models are split by language; you only download the ones you use:

- **Japanese** uses ReazonSpeech's k2-v2 model, a dedicated Japanese model. Phones and computers without a usable GPU run the int8-quantized version, about 160 MB in total; on Windows with a usable GPU the fp32 version is used, whose encoder alone is about 590 MB.
- **English, Mandarin, Cantonese, Korean, Russian, Vietnamese and Thai** each have a dedicated model.
- **German, Spanish, French, Italian, Dutch, Portuguese, Turkish, Indonesian and Arabic** share one multilingual model (Omnilingual, on the order of 1 GB) — wide coverage, but less accurate per language than a dedicated model; the panel marks it "Large — best on a desktop GPU".

Downloaded models are managed under **Settings → Storage → Speech recognition models**: each language shows whether it's downloaded and how much space it takes, how much it needs, or that it's partially downloaded. Delete the ones you don't use to free space; you'll be prompted to download again the next time you transcribe that language. If a model file got corrupted and can't be read, Fushi removes it automatically and asks you to download it again.

If you like tinkering with models, the panel also offers **Add a local model…**: pick a folder containing a sherpa-onnx export (the encoder / decoder / joiner trio, or a single CTC model, plus tokens.txt). The files stay where they are and aren't copied.

## How long does an episode take

It depends on the device and acceleration. Roughly:

- **Windows with a dedicated GPU**: Auto runs the fp32 model on the GPU (DirectML), the fastest combination. The panel says "Running on …" so you can see whether the GPU or the CPU is in use, and tells you when the GPU wasn't available and it fell back to the CPU;
- **macOS / Windows without a GPU / Linux**: Auto uses int8 on the CPU, which is quick enough. macOS also offers a **CoreML (FP32)** acceleration option, but in testing it wasn't necessarily faster than the CPU on the Japanese model, so it isn't the default;
- **Android / iOS**: the light Japanese model runs on phones too, but noticeably slower and with more battery drain and heat — plug in and let it run. The large multilingual model is marked "Large — runs on phones, but slowly".

The "×N speed" figure on the panel is the current speed relative to the audio's duration; one glance tells you how long you'll wait.

On iOS 26 / macOS 26 the model list also has **System speech (Apple)**: it uses the system's own speech model instead of downloading Fushi's, though the first time you use a language the system still downloads its own language assets (kept by the system and shared between apps). This engine can't pause mid-file; stopping discards the current file's progress.

## How accurate is it, and when does it get worse

Speech recognition isn't human transcription — set your expectations accordingly:

- Scenes with **clear dialogue and quiet music** (slice-of-life anime, dramas, interviews, podcast-style content) come out accurate; everyday vocabulary is basically right and more than good enough for lookups and mining;
- Scenes with **heavy music and sound effects** (battles, OP / ED, insert songs) tend to drop lines or get characters wrong;
- **Overlapping speech, shouting, dialects and mumbling** also suffer;
- Names, proper nouns and invented words are often written as a homophone — you couldn't look those up anyway, so it matters little;
- Don't expect much from songs.

Practical tips:

- **Pick the right language** — the wrong one is the usual reason for "it came out as gibberish";
- On Blu-rays / films with several audio tracks, switch the player to the Japanese track first; Fushi transcribes the currently selected audio track;
- Before mining, check that the line matches what you heard; if there's a wrong character, fix it in the card editor before saving rather than memorizing a recognition error;
- Lines in a generated subtitle are cut by speech pauses, so their lengths differ from a human-made subtitle — that's normal.

## Already have a subtitle that's just out of sync? Use "Retime"

If you have a Japanese subtitle whose timing doesn't match this version of the video (BD vs. WEB cuts, or a frame-rate difference that drifts further over time), you don't need to transcribe from scratch. **Retime with speech model** in the subtitle menu listens to the episode and uses the recognition as a reference to correct each line's timing — **without changing a single character of the text or its order** — and saves the result as a new subtitle, leaving the original file untouched. If only a few lines match, it tells you to check the spoken language and whether this subtitle belongs to this episode. More ways to fix timing: [subtitles don't line up with the picture](/faq/subtitle-sync.en).

## Audiobooks use the same transcription

The same on-device transcription also powers audiobooks: when importing an audiobook you can generate subtitles on device, which are then aligned with the text for line-by-line highlighting — see [how audiobooks work](/faq/audiobook.en).

If you don't have Fushi yet, get it from the [download page](/download); on-device transcription works on Android, iOS, Windows, macOS (Apple Silicon) and Linux.
