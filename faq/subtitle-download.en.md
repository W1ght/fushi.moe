---
title: "How do I find Japanese subtitles for anime? Can Fushi search and download subtitles?"
description: "Yes. Tap \"Search subtitles online\" in the player's subtitle menu and Fushi searches Jimaku, OpenSubtitles, SubDL and the AJATT subtitle library at once, matches files to episodes and can batch-download a whole season; downloaded subtitles are auto-aligned to the video's embedded subtitle track, ready for word lookup and Anki mining."
category: "Video"
order: 84
date: 2026-10-12
lang: en
---

When learning Japanese from anime, subtitles come first: only with Japanese subtitles can you tap words to look them up and mine cards line by line. Raw videos mostly don't include Japanese subtitles, so you need a separate external subtitle. Fushi builds the whole chain — find → download → match to episodes → align timing — into the player, so you don't have to dig through websites, download, unzip and rename files yourself.

This article covers how to use it, which sources exist and what each needs, and what to do when a download's timing is off. If there are no Japanese subtitles anywhere, as a last resort you can [generate one with speech recognition](/faq/asr-subtitles.en).

## Set up subtitle sources first

Subtitle sources are configured in one place, **Settings → Online services → Subtitle sources**. There are four:

| Source | Good for | What it needs |
|---|---|---|
| **Jimaku** | Japanese subtitles for anime and Japanese live action — the first choice for learners | A free API key: sign up or log in to Jimaku, generate one on the account page (jimaku.cc/account) and paste it in |
| **OpenSubtitles** | Multilingual subtitles for films and series | An API key is built into the app, so it works out of the box; optionally log in with your own account for your personal download quota, or enter your own key; you can list wanted languages as comma-separated codes, e.g. `ja,en` |
| **SubDL** | English and multilingual subtitles for films and series, matched by IMDb / TMDB id | A free API key (subdl.com/panel/api); downloads use an anonymous per-IP daily quota |
| **AJATT** | A free Japanese subtitle library (a kitsunekko mirror) | Nothing — it's on by default; subtitle files are downloaded from GitHub |

Each has its own switch; when it's off, it isn't searched even if a key is filled in. The same page has **Default subtitle language**: by default it follows the video's own language (audio track / scraped metadata); pick a language to always prefer it — set it to Japanese if that's what you're learning, and Japanese results are ranked first.

API credentials are never exported with backups; if you use [Fushi interconnect](/faq/interconnect.en), they can be synced to paired devices so you don't have to enter them again on the other device.

## Searching subtitles for one episode in the player

1. Open the episode, go to the player's **subtitle** menu, tap **Search subtitles online** to open the full-screen subtitle workbench, and choose the **This episode** scope.
2. The series name and episode are prefilled from the title and scraped metadata; correct them if needed: put the work's name in **Series name** (try Japanese, English or romaji), and leave **Episode (optional)** empty to list every episode.
3. Jimaku first confirms the **Series** on AniList so different seasons with the same name don't get mixed up; when it can't confirm, it warns that the results were searched by title directly and may include other seasons of the series.
4. Tap **Find subtitles**, pick a source entry below, then choose a file from the results to download. Results can be filtered by **Language** and type, and you can type a keyword into **Filter results (e.g. WEBRip, BD)** to filter by version.
5. When the download finishes it's attached to the episode and selected; the external subtitle appears in the subtitle-track list, and you can tap words to look them up.

Tip: subtitle sites often have both a **BD** and a **WEB** timing for the same show; picking the one that matches your video's version saves most of the alignment work ([how to read release names](/faq/release-names.en)). **Season packs** published by fansub groups work too: Fushi extracts this episode from the pack by episode number. ZIP packs are unpacked directly; RAR / 7z packs can't be unpacked yet — download them from the site, extract them manually, and attach the file with **Import subtitle file…**.

## Batch-download a whole season at once

There's no need to search episode by episode when you're watching a whole show. In the subtitle workbench switch the scope to **Whole collection** (the right-click menu on a collection in the library and the collection detail page also have a **Fetch subtitles for collection** entry):

- Bind the series and pick a subtitle source; Fushi matches each episode to a subtitle file by the episode number in the file name, and splits season-pack subtitles automatically;
- Tap **Download all** to download and attach each episode; it reports how many were fetched when done;
- **Collection subtitle settings** let you set a **Default subtitle language** just for this work (empty = follow the video's own language) and a **Preferred version** — batch downloads pick that version first so the whole season shares one timing, instead of one episode BD and the next WEB.

## Don't want to search by hand: automatic subtitles

Two automatic paths, both only active once a subtitle source is configured:

- **Subtitles with anime downloads**: when you [download anime](/faq/anime-download.en) with Fushi and choose to include subtitles, Japanese subtitles are matched from Jimaku after the download and paired episode by episode.
- **Auto-fetch subtitles after scraping**: with "Auto-fetch subtitles after scraping" on under **Settings → Video → Subtitle behavior and sources**, videos that still have no subtitle after [scraping](/faq/scraping.en) automatically get one from your configured online subtitle sources. It **never overwrites an existing subtitle**.

## Downloaded subtitle out of sync: align to the embedded track

An external subtitle wasn't made for your exact video file, so being a few seconds early or late is common. Many videos carry a text subtitle track of their own (even an English or Chinese one) whose line onsets are exactly aligned with this video, and Fushi uses it as the reference:

- **Automatic**: **Auto-align downloaded subtitles** on the same page (on by default) aligns downloaded subtitles to the video's own subtitle track — it only changes things when the evidence is strong, otherwise it leaves the subtitle as is;
- **Manual**: during playback tap **Align to embedded subtitles** in the subtitle menu. If it matches, a new, aligned subtitle is saved (the original isn't touched); when the result is uncertain a dialog shows the suggested shift and lets you decide; if it doesn't match (wrong episode, different cut) it tells you and leaves things as they were;
- If this subtitle was auto-aligned at download time, the same button offers **Restore original**, restoring the original timing as a new subtitle.

If the video has no text subtitle track to use as a reference, use the sync slider, **Auto-align subtitle**, **Waveform alignment**, or **Retime with speech model** to fix it line by line — see [subtitles don't line up with the picture](/faq/subtitle-sync.en).

## Common situations

- **Searching says no subtitle source is configured, or all online subtitle sources are off**: go to **Settings → Online services → Subtitle sources** and turn on at least one. To just try it out, AJATT and OpenSubtitles need nothing filled in.
- **A source "rejected the API key"**: the key is wrong or expired; generate a new one on that service and paste it again.
- **"No subtitles found for episode N"**: clear the episode field to see every result — some subtitle files have no episode number and Fushi tells you there are unlabeled files you can try; or try another spelling of the title (Japanese original / English) or another source.
- **The results are for a different season**: pick the right season in the series field, or add the season to the series name.
- **Want Chinese / English alongside as a reference**: download one as a secondary subtitle — see [using secondary (bilingual) subtitles as a bridge](/faq/secondary-subtitle.en).
- **You already have a subtitle file locally**: an external subtitle in the same folder with the same name is picked up automatically; for differently named files use **Import subtitle file…** in the subtitle menu. For the differences between subtitle formats see [subtitle formats](/faq/subtitle-formats.en).

If you don't have Fushi yet, get it from the [download page](/download).
