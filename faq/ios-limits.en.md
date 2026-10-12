---
title: "How do I install Fushi on iOS? Why is there no Discover or online sources on iPhone?"
description: "Fushi for iPhone / iPad is installed through TestFlight and needs iOS 15.1 or later. Under App Store review rules the iOS build has no Browse module: no Discover page, no online manga / video / novel sources and no download center. Locally imported light novels, manga and anime work as usual, and lookup, Anki mining, media servers and interconnect are all there; the Games page is a streaming client."
category: "Setup"
order: 41.4
date: 2026-10-12
lang: en
---

Fushi on iPhone and iPad is installed through **TestFlight** and needs **iOS 15.1 or later**. It's the same interface, reader and player as on the other platforms, but App Store rules leave out a few kinds of features. Below: how to install it first, then what's missing, why, and how to work around it.

## How do I install it on iPhone / iPad?

1. Install Apple's **TestFlight** app from the App Store.
2. On your iPhone / iPad, open Fushi's public TestFlight invite link: [testflight.apple.com/join/j88d69jx](https://testflight.apple.com/join/j88d69jx) (the iOS row on the [download page](/download) also says "Install via TestFlight").
3. In TestFlight, tap "Accept" → "Install"; Fushi then appears on your home screen.
4. The first launch opens the onboarding wizard: choose language and theme, pick features, install the recommended pack and connect AnkiMobile. On iOS, mining goes to AnkiMobile; see [How do I connect Anki?](/faq/anki.en)

**Updates**: new versions are delivered through TestFlight, usually a few days later than on the other platforms (they go through Apple's processing first). In Fushi, go to **Settings → System and about** and tap "Check for updates"; if there's a new version you get an "Open TestFlight" button that takes you there to update. iOS doesn't allow installing from inside the app, so there's no "Auto-install updates" switch.

GitHub Releases also has a `fushi-<version>-ios.ipa`. That package is **unsigned** and only meant for people who sign and sideload apps themselves; everyone else should use TestFlight. A sideloaded install has the same features as the TestFlight one — the limitations below apply to it too.

## Which features are missing on iOS?

The iOS build has no **Browse** module. Concretely, none of the following is available on iPhone / iPad:

| Missing | What it is on other platforms |
|---|---|
| **Discover** | The "Discover" tab of the Browse module, plus the "Discover" sub-tab of each library page (books, manga, video, games); the built-in external discovery sources and video resource indexers, and even an OPDS server you configured yourself, live here |
| **Online manga sources** | Mihon extensions and mokuro.moe volume downloads; see [How do I read manga online and OCR the text for mining?](/faq/manga-online.en) |
| **Online video sources** | Aniyomi extensions; see [How do I stream anime through a video source?](/faq/anime-online.en) |
| **Online novel sources** | LNReader plugins |
| **Download center** | The BitTorrent / magnet / direct-link download queue, including an external qBittorrent |
| **Blu-ray AACS decryption** | Encrypted Blu-ray discs can't be played directly (decrypted copies and unencrypted discs play as usual) |

"AI download", which sits on the Discover page, is gone as well; see [What is AI download?](/faq/ai-download.en)

## Why are they missing? Not because iOS can't do it

None of these is technically impossible — the same code runs on Android, Windows and macOS. The reason is that **the App Store review guidelines don't allow** these kinds of features: built-in third-party content indexes and torrent sources, content-source hosts that load arbitrary third-party extension repositories at runtime (Mihon / Aniyomi extensions, LNReader plugins — the plugins themselves are third-party code), general-purpose BitTorrent / magnet downloaders, and removing disc copy protection all get apps rejected.

So Fushi removes exactly these capabilities from the iOS build and nothing else; the other four platforms aren't distributed through a store and are completely unaffected. What decides it is "is this iOS?", not whether you installed through TestFlight or sideloaded.

## What does iOS keep?

Apart from that table, everything works as on the other platforms:

- **Local import, reading and playback**: EPUB light novels, manga, local videos and anime, and audiobooks can all be imported; the reader, the video player, tap-to-look-up and bilingual subtitles are all there.
- **Dictionaries and mining**: dictionary import, the recommended pack, the lookup popup, and one-tap cards into AnkiMobile (with sentence, screenshot and original audio); see [It's installed — how do I mine cards while watching anime?](/faq/first-card.en)
- **Media servers**: connect to, browse and play from Jellyfin / Emby / Plex as usual; see [What are Jellyfin, Emby and Plex?](/faq/media-servers.en)
- **Fushi interconnect**: pair with a computer or the [Fushi server](/faq/server.en) to browse its media library, stream from it, and sync progress and backups.
- **The Games page is a streaming client**: Galgame text / voice capture is Windows-only; on iPhone / iPad the "Games" page lists the game libraries of paired Windows PCs, lets you launch a game remotely and streams it to you, with cards created on the PC.

## How can I watch online content on iPhone, then?

The smoothest way is to let another device be the "source" while the iPhone just watches:

1. Use the online sources or download features of Fushi on a Windows / Mac computer to bring books, manga and anime into a local library; if you have a NAS, the [Fushi server](/faq/server.en) on it can also download and import for you.
2. Make that computer or server the host, and pair the iPhone with it through [Fushi interconnect](/faq/interconnect.en) (iOS can only be a client); then browse its library, stream and sync progress right on the iPhone.
3. Or put the content in your own Jellyfin / Emby / Plex and watch it on the iPhone as a media server.

That way everything on the iPhone is "your own library", outside what the review rules restrict, and lookup and mining work exactly the same. For an overview of all platforms, see [Which platforms are supported?](/faq/platforms.en); for other platforms' installs, see [How do I install Fushi on Android?](/faq/android-install.en) and [How do I install Fushi on macOS?](/faq/macos-install.en)
