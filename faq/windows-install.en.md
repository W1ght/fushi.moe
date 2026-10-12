---
title: "How do I install Fushi on Windows? Installer or portable version?"
description: "On Windows, download the fushi-…-windows-setup.exe installer. It needs no admin rights, installs for the current user, includes Galgame voice mining and desktop text lookup, and updates itself from inside the app. Here are the install steps, where your data lives, what to do about SmartScreen, and what happened to the portable build."
category: "Setup"
order: 41.1
date: 2026-10-12
lang: en
---

There is one recommended way to install Fushi on Windows: on the [download page](/download), click "Download" on the Windows row, get `fushi-<version>-windows-setup.exe` and double-click it. The download page describes that row as "Includes Galgame voice mining and desktop text lookup" — Galgame text / voice capture only exists on Windows.

## Installer or portable zip?

**Only the installer is published now.** The download page used to have a "Windows (portable)" row for an unzip-and-run `-windows-x64.zip` (no shortcuts, no file associations, no auto-update). That row has been removed, and current versions on GitHub Releases only ship `-windows-setup.exe`. So there is nothing to choose: use the installer.

The installer is already lightweight, and it avoids the things people usually worry about:

- **No admin rights needed.** It installs per user (no UAC prompt), puts the program in `%LOCALAPPDATA%\Fushi` by default and only writes to the current user's side of the registry.
- **It doesn't take over your default player.** The "file association" step only adds Fushi to the right-click "Open with" list for mkv / mp4 and other videos; in the installer's own words, "these options won't change your default player".
- **The desktop shortcut is optional.** "Create a desktop shortcut" is ticked by default; untick it if you don't want one. Later auto-updates won't recreate it, and won't move an icon you've already placed.

If you're upgrading from Hibiki (Fushi's name before the rename), just run the new installer — it upgrades in place and migrates your data automatically.

## Installation steps

1. On the [download page](/download), choose "Stable" (recommended for everyday use) or "Debug" (newest features land here first; see [Stable vs. debug builds](/faq/channels.en)), then click "Download" on the Windows row. The page fetches the file in parallel chunks from several sources inside your browser and checks its SHA-256 afterwards; "SHA-256 verified" means the file is complete. If the download is slow or fails, see [The download is slow or won't open](/faq/download.en).
2. Double-click `setup.exe`. The setup wizard's interface is in Simplified Chinese only; the pages are, in order: install location → (fresh installs only) **data storage location** → shortcuts and file associations → install.
3. Leave "Launch Fushi" ticked on the last page. The first launch opens the onboarding wizard: pick your features, install the recommended pack, connect Anki and you're ready. See [I closed the onboarding wizard halfway. How do I reopen it?](/faq/onboarding.en)

## Where does the program go, and where does my data go?

These are two different things, and the installer asks about them separately:

- The **install location** holds the program itself, which is small.
- The **data storage location** holds books, manga, covers, subtitles, dictionaries and the database. The installer warns that "this data may be much larger than the program itself — pick a location with plenty of space". The default is a `Fushi` folder under Documents. The recommended pack (Japanese dictionaries + pronunciation audio library) alone is about 9.5 GB, so if your C: drive is tight, pick another drive right here.

That page **only appears on a fresh install**. Upgrades, reinstalls and in-app auto-updates never ask again and never touch your existing library. To move your data later, use **Settings → Storage → Data storage location** — Fushi migrates it and rewrites the paths stored in the database. Don't cut and paste the folder by hand. Whether your data stays on your machine is covered in [Where is my data stored? Is anything uploaded?](/faq/data.en)

Uninstalling Fushi (from Windows "Settings → Apps") removes the program folder. Your data storage location is not inside it, so to remove everything you have to delete that folder yourself — check first that you have any backups you need.

## "Windows protected your PC" (SmartScreen) — what now?

Fushi's Windows installer and program files are code-signed by the release pipeline. SmartScreen doesn't only look at signatures, though; it also looks at how many people have downloaded a file. A brand-new release starts at zero downloads, so the blue "Windows protected your PC" screen can occasionally still appear. It doesn't mean anything is wrong with the file:

1. Make sure you got it from the fushi.moe download page or [GitHub Releases](https://github.com/hajisensai/Fushi/releases), and that the download page showed "SHA-256 verified".
2. Click "More info" in the prompt, then "Run anyway".

Antivirus false positives work the same way: the Galgame capture component (installed with the program, under `voice_hook` in the install folder) injects a DLL into the game process, and security software occasionally flags that behaviour. It only runs when you use Galgame capture; if it gets blocked, add Fushi's install folder to your antivirus allow list.

## System requirements and common pitfalls

- **64-bit Windows**: the installer is x64; Windows 10 / 11 recommended. The reader, lookup popup and similar screens use the system's Edge WebView2 component, which Windows 10 / 11 normally already have.
- **Auto-update**: Fushi checks for updates by itself. In **Settings → System and about**, under "Update settings", you can switch the "Update channel", choose a "Preferred download source" and "Check for updates" manually. With "Auto-install updates" on, a new version is downloaded, installed silently and Fushi reopens (your computer does not restart). For picking a channel, see [Stable vs. debug builds](/faq/channels.en).
- **"Component in use" while updating**: if a game is running with Galgame capture attached, the update reports that the Galgame capture component is in use — close the game, then update. If the player component `libmpv-2.dll` is held, close the leftover Fushi processes it lists; if that doesn't help, restart Windows once and install again.
- **Data on a network or removable drive**: you can put the data storage location on an external drive, but if that drive isn't connected at startup, Fushi stalls on the loading screen and tells you so; "Retry" launches this one session with the default location, and the data in the original location is left alone. Only use a drive that's always plugged in.
- **New computer**: on the old one, export a backup in **Settings → Sync & backup**, install Fushi on the new one and import it; or turn on cloud backup or [interconnect backup](/faq/interconnect.en) so you don't have to copy files by hand.
- **Phones and tablets**: to read the same library on your phone, make the Windows PC a host with [Fushi interconnect](/faq/interconnect.en) instead of importing everything again on every device.

For other platforms, see [How do I install Fushi on Android?](/faq/android-install.en) and [How do I install Fushi on macOS?](/faq/macos-install.en); for an overview of platform differences, see [Which platforms are supported?](/faq/platforms.en)
