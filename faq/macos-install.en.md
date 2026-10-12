---
title: "How do I install Fushi on macOS? Does it run on Intel Macs?"
description: "Fushi for macOS supports Apple Silicon (M-series) only and needs macOS 13.4 or later; Intel Macs are no longer supported. Unzip the download, drag it into Applications, and if Gatekeeper blocks the first launch click \"Open Anyway\" in Privacy & Security. After that it updates itself, and watching anime, reading, looking words up and mining Anki cards work just like on other platforms."
category: "Setup"
order: 41.3
date: 2026-10-12
lang: en
---

Check your chip first: Fushi for macOS **supports Apple Silicon only** (M1 / M2 / M3 / M4 and other M-series chips) — **Intel Macs are no longer supported**. It needs **macOS 13.4 or later**.

Not sure which Mac you have? Open the Apple menu in the top-left corner → "About This Mac". If the "Chip" line says Apple M…, it's Apple Silicon; if it says "Processor Intel …", it's an Intel Mac.

## Can I still install it on an Intel Mac?

Since October 2026, the macOS app itself and every native component bundled with it (interconnect P2P, the built-in BitTorrent engine, Anki sync, the slimmed-down ffmpeg, the Mihon extension runtime and so on) are built for arm64 only, and the release pipeline has a check that makes sure no other architecture slips into the app. Earlier releases were universal packages containing both Intel and Apple Silicon code; that line has stopped. New versions won't open on an Intel Mac, and the build scripts exit with an error on an Intel host, so building it yourself doesn't work either.

The alternative for Intel Mac users is to make another device your main one: phones and tablets ([Android](/faq/android-install.en) or [iOS](/faq/ios-limits.en)) both work. For a large library, keep it on a Windows PC or in the [Fushi server](/faq/server.en) on a NAS, and use [Fushi interconnect](/faq/interconnect.en) to browse, stream and sync progress from your phone or tablet. Note that Fushi's browser extension works together with the desktop Fushi app running on the same machine (lookups use the app's dictionaries), so it doesn't help on an Intel Mac either; see [How do I look words up in the browser?](/faq/browser-lookup.en)

## Installation steps

1. On the [download page](/download), choose "Stable" or "Debug" (see [Stable vs. debug builds](/faq/channels.en)) and click "Download" on the macOS row. That row says "Apple Silicon (M-series) only"; you get a `.zip`, whose SHA-256 is checked once the download finishes.
2. Double-click the zip to extract `fushi.app`. **Drag it into the Applications folder** before opening it, rather than running it from Downloads — in-app updates replace the app wherever it is, and Applications is the simplest place for that.
3. The first launch opens the onboarding wizard: choose language and theme, pick features, install the recommended pack and connect Anki (on a Mac that means Anki desktop + the AnkiConnect add-on; see [How do I connect Anki?](/faq/anki.en)).

Newer versions on GitHub Releases also come with a `.dmg` of the same name next to the zip: open it and drag fushi.app onto the Applications icon beside it. It installs the same app.

## "Apple could not verify…" on first launch — what now?

The macOS build isn't notarized by Apple yet (it's ad-hoc signed), so Gatekeeper blocks the first launch with "Apple could not verify fushi.app is free of malware that may harm your Mac or compromise your privacy". The package isn't broken; you just have to allow it once, either way:

1. Drag fushi.app into Applications and double-click it once (it gets blocked). Then open **System Settings → Privacy & Security**, scroll down, find fushi and click "Open Anyway", then confirm.
2. Or run this in Terminal:

   ```bash
   xattr -dr com.apple.quarantine /Applications/fushi.app
   ```

   After that, double-click as usual.

You only need to do this once; later in-app updates don't need it again. The dmg includes a "打开说明 How to open.txt" file with the same steps.

## Which system permissions does it need?

Fushi only asks when you use the feature that needs them; if you don't use them, you don't have to grant any:

- **Accessibility**: app-external lookup (select text in another app and press the shortcut to look it up) has to read the text selected in other apps, so enable Fushi under "Privacy & Security → Accessibility". Without it, the shortcut only looks up the text on the clipboard. See [global lookup](/faq/global-lookup.en) for how to use it.
- **Screen Recording**: the floating ball's screen OCR needs Fushi allowed under "System Settings → Privacy & Security → Screen Recording".

These permissions survive in-app updates, so you don't have to tick them again after every update.

## Updates and other notes

- **In-app updates**: in **Settings → System and about**, "Update settings" lets you switch the "Update channel", choose a "Preferred download source" and "Check for updates". With "Auto-install updates" on, a new version is downloaded, replaces fushi.app in `/Applications` and reopens; if the replacement fails it rolls back to the old version, so you never end up with a half-installed app that won't open.
- **Upgrading from an old version takes one manual step**: when the builds became Apple Silicon only, the package name changed from `-macos.zip` to `-macos-arm64.zip`. Old versions' updaters only recognise the old name, so they may say "You're on the latest version". In that case, download the new version from the download page once and put it in Applications over the old one; automatic updates work normally from then on.
- **Data storage location**: on desktop, **Settings → Storage → Data storage location** moves books, manga, dictionaries and the database to an external drive or another folder, and Fushi migrates the paths stored in the database along with them. The recommended pack is about 9.5 GB, so it's worth considering if your Mac's internal drive is small.
- **Galgame capture is Windows-only**: on a Mac the "Games" page is a streaming client — it can launch games on a paired Windows PC and stream them over; see [game streaming](/faq/game-streaming.en).

For other platforms, see [How do I install Fushi on Windows?](/faq/windows-install.en) and [How do I install the iOS version, and why are some features missing?](/faq/ios-limits.en); for all platform differences, see [Which platforms are supported?](/faq/platforms.en)
