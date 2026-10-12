---
title: "Which engines does Fushi's galgame text hook support? How does it work, and how does the lookup card appear on the game screen?"
description: "On Windows, Fushi captures galgame dialogue with an isolated injection helper and bundled LunaHook, then uses per-engine adapters for per-line voice and in-game lookup cards. Support status follows the engine support manifest: SiglusEngine and Unity IL2CPP are verified, KiriKiri, TyranoScript and others are partial, the rest are implemented but unverified."
category: "Games"
order: 87.6
date: 2026-10-12
lang: en
---

[How do I hook a galgame into Fushi?](/faq/galgame.en) covers how to use it; this article answers the lower-level questions: how Fushi gets the dialogue out of a game, why it only works on Windows, which engines are supported and to what degree, and how "tap the text right on the game screen to look it up" works.

The short version: **text hooking is Windows-only**, and "supported" comes in several grades — the engine list below is copied from the engine support manifest in the Fushi repository (`native/galgame_hook/engine-support.yaml`), and anything not verified on a real game is labelled "unverified".

## How it works: injection helper + LunaHook + engine adapters

When you press **Launch and capture** (or **Attach and capture** for a game that's already running), Fushi roughly does this:

1. **Starts an isolated injector**: the injection components are separately built x86 and x64 helpers (an injector exe plus a hook DLL) that are **not linked into the Fushi program** — the main program only starts the injector as a child process. Both helpers are placed in the program folder with the Windows installer at build time, and nothing is downloaded at run time. 32-bit games use the x86 set and 64-bit games the x64 set; Fushi picks per game.
2. **Injects the hook into the game process**: the helper bundles the open-source LunaHook (taken from a [LunaTranslator](https://github.com/HIllya51/LunaTranslator) release, GPLv3 like Fushi) for general text capture. It knows the text functions of a great many engines and separates what it captures into "text threads", which is why the first time you pick the clean dialogue thread in the session panel.
3. **Fills in the rest with engine adapters**: LunaHook only deals with text. Per-line voice and in-game lookup depend on adapters Fushi writes for each engine: taking **this line's** original voice from the game's voice archives or its decoder, or capturing PCM at the engine's audio output (XAudio2 / DirectSound). Only when none of that works does it fall back to recording the system mix (loopback, which includes BGM and sound effects).
4. **Hands everything back through shared memory**: the helper writes dialogue, voice and status into shared memory; the Fushi main program reads it, pairs "this line + this line's voice + a screenshot of this moment", and lets you tap words and mine cards in the dialogue overlay.

Engines are recognised by **their own structural features** (exported functions, plugin interfaces, runtime modules, archive formats and so on), not by a game's file name or title. That means other games on the same engine usually benefit too — and conversely, a newer or packed build of the same engine that changes its structure may need its own adaptation.

## Why Windows only?

The vast majority of galgames are Windows programs, and text hooking is fundamentally about injecting code into the game process and intercepting its function calls — which can only happen on the Windows PC the game runs on. Fushi's hook, helpers and engine adapters are Windows-only (x86 / x64); Android, iOS, macOS and Linux have no text hook and no support is claimed there.

To play on a phone or iPad, keep the game and the hook on the Windows PC and use **game streaming** to push the picture, sound and dialogue to the phone for lookup and mining — see [Can I play the galgames on my PC from a phone or iPad?](/faq/game-streaming.en).

## Which engines are supported? The manifest's actual status

The manifest grades each engine on four levels:

- **Verified**: the listed capabilities were verified on the original launch path of a real game; this covers only the recorded versions and capabilities;
- **Partial**: at least one capture path was verified on a real game, but key capabilities are still limited or unverified;
- **Implemented, unverified**: the code exists, but there isn't enough real-game evidence, so it **doesn't count as supported**;
- **Unavailable**: nothing is implemented yet.

**Verified** ("verified" in the manifest):

- **SiglusEngine**: on anemoi (full release, x86), per-line voice (original Ogg entries in the OVK voice archives under koe, byte-identical to the source) and DirectSound capture were verified; text capture and in-game lookup themselves are still marked unverified.
- **Unity IL2CPP**: on manosaba (x64), LunaHook's generic text capture, TextMeshPro text events and AudioClip voice-resource pairing were verified. Unity Mono is a separate entry, see below.
- **XAudio2 / DirectSound generic capture**: not an engine but the generic audio capture layer; it captured non-silent PCM on the KiriKiriZ and Siglus samples. Note that what it captures may be the whole software-mixed output, not necessarily clean voice.

**Partial** ("partial"):

- **KiriKiri2 / KiriKiri Z**: generic capture got PCM, but the verified sample mixes voice, BGM and sound effects into one output; the archive and decoder hooks installed on an official trial, but no voiced line has been played through yet, so **clean per-line voice is not claimed**.
- **TyranoScript / NW.js**: on the free fully voiced game "かえりみち" (x64), the exported per-line voice matched the game's resource byte for byte; only the `data/sound/v_*` convention with OGG / M4A files is recognised, not custom voice folders or encrypted archives.
- **Artemis Engine (PF8)**: on the "アマナツ" trial (x64), Ogg voice in the PF8 archive's `sound/vo` was verified; PF6 parsing is implemented but hasn't been run on a real sample.
- **CatSystem2 (KIF / INT)**: verified with Ogg in unencrypted `pcm_*.int` using the official "CatSystem2 入門セット" and a locally generated voice; encrypted commercial archives with `__key__.dat` are deliberately rejected, and no voice claim is made for commercial titles.
- **QLIE (FilePack)**: on the "美少女万華鏡 -理と迷宮の少女-" trial (x86), decoded PCM separated per audio source was verified; only that measured version is covered.

**Implemented, unverified** ("implemented_unverified" — the code exists but the evidence doesn't, so it isn't support): elf AI6, RealLive / old VisualArt's, CMVS (Purple Software), Ren'Py / FFmpeg, BGI / Ethornell, Malie System (LIBP), Leaf / AQUAPLUS (a single exact WHITE ALBUM2 profile, not the whole brand), HUNEX GGE, smash / fzmedia (TYPE-MOON), M2 wind3d11 (STEINS;GATE RE:BOOT), Unreal Engine (IoStore), AOS / SFA, Unity (Mono), YU-RIS, FVP, Kogado's Hy engine, LucaSystem.

**Engines not in the manifest**: LunaHook's generic text capture still tries, and plenty of games produce text that way — they just have no dedicated voice or lookup adapter, so voice falls back to generic capture or the system mix. If no text comes out, try a **special code** (H-code); see [How do I hook a galgame into Fushi?](/faq/galgame.en).

## How does the lookup card appear on the game screen?

Besides the dialogue overlay, Fushi is working on **in-game lookup**: instead of looking at the overlay, you tap the text in the game itself and the lookup card pops up over the game. There are two hard parts:

1. **Knowing where each character is on screen** (geometry). There are three sources: the engine's runtime layout information, the engine's exact internal text layout, and **manual calibration** — in the session panel's "In-game lookup", press **Calibrate** and follow the prompts to click the first, a middle and the last character in the game, and Fushi records the text box and character grid. In-game lookup **doesn't use OCR** and currently handles horizontal body text only. The modes are "Auto / Calibrated layer only / Native only / Off".
2. **Not advancing the game when you tap to look up**. Clicking the game screen normally means "next line", so Fushi's "input shield" has to swallow that click when you're looking something up; in games where it can't catch everything, a bare left click may advance the dialogue or trigger a choice at the same time, and the panel flags the click risk.

The card itself is rendered by Fushi: for some engines (such as KiriKiri) the hook draws the card into the game's own layer; otherwise it's a Fushi window placed over the game window that doesn't take the foreground from the game. Touch taps, long presses and swipes must equally not advance the game or steal the foreground — that's a required part of adaptation testing.

**The honest status**: for every engine in the manifest, in-game lookup (geometry, input shield, click risk) is still "implemented, unverified". You can try it, but no engine is guaranteed never to advance the story when you tap a word. The safe choice is still looking up in the dialogue overlay, or saving before you experiment.

## What counts as a successful adaptation?

Fushi has a clear definition of a game being "successfully adapted": **all four of these hold at once** on the user's real launch path, and missing any one makes it only a partial adaptation:

1. **Text**: the current line's text is hooked, and the selected thread is clean dialogue;
2. **Audio**: the voice matching that line is obtained (from engine resources or engine PCM; the system mix alone doesn't count);
3. **In-game lookup**: a Fushi lookup card pops up inside the game screen;
4. **Tapping to look up doesn't advance**: tapping a word with the mouse or with Windows touch doesn't advance the game.

Adaptation is also done only **at the engine level**: when one game has a problem, the fix goes into the general criteria of its engine, never a hard-coded special case for that single game. So when your game doesn't work, the most useful information is **the engine name, the game version, 32/64-bit, and how you launch it** — send it through [in-app feedback](/faq/feedback.en).

For common problems (injection blocked by antivirus, permissions, bitness mismatch, garbled text), see the "Common situations" section of [How do I hook a galgame into Fushi?](/faq/galgame.en); the Windows build is on the [download page](/download).
