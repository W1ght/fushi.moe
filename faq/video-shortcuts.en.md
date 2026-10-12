---
title: "What are the most efficient controls and shortcuts for learning Japanese with videos in Fushi?"
description: "The moves you'll use most when learning Japanese from anime: Ctrl+← / → to jump line by line, R to replay the current line, \"Subtitle pause playback mode\" to pause automatically after each line, L for the subtitle list with search and favorites, [ / ] for speed, and holding E for a temporary speed-up. Every shortcut can be changed in \"Keyboard shortcuts\", and gamepads get a full default mapping."
category: "Video"
order: 88
date: 2026-10-12
lang: en
---

The biggest difference between learning a language from video and just watching is that **you keep going back**: you didn't catch a line, so you hear it again; you don't know a word, so you stop and look it up; a line is worth a card, so you rewind to capture it. Ordinary players only offer "back 10 seconds", and dragging the progress bar back and forth kills the flow. Fushi's player works **by line**: each subtitle line is a unit, and jumping, replaying and auto-pausing all go by lines.

Below are the most-used actions and their default keys, grouped by purpose (Windows / Linux keyboards; on macOS, Ctrl combinations become Command; on Android / iOS they also work with an external keyboard). Every key can be changed — see the last section.

## Jumping line by line and replaying the current line

This is the group you'll use most when learning from anime:

| Action | Default key | Gamepad |
|---|---|---|
| Previous subtitle / next subtitle | Ctrl+← / Ctrl+→ | X / Y |
| Replay current subtitle | R | LT |
| Replay previous subtitle | Shift+R | — |
| Seek backward / forward | ← / → (or A / D, J / I) | LB / RB, D-pad left / right |
| Previous / next chapter (videos with chapters) | PageUp / PageDown | — |
| Previous / next frame | , / . | — |

- **Replay current subtitle** returns to the start of the current line and plays it again — the handiest key for listening practice and shadowing: didn't catch it, press R; still didn't, press R again.
- The **seek** step is set in **Settings → Video → Controls and gestures → "Seek seconds"**, 3 seconds by default.
- The "Previous subtitle" / "Next subtitle" buttons on the player's bottom bar fall back to seeking by the step when there are no subtitles, and jump by line when there are.
- On a phone without a keyboard: **Double-tap seek** (double-tap the left / right side of the picture to seek; off by default, turn it on in "Controls and gestures"), horizontal swipes to scrub, and placing buttons such as "Replay this line" on the player (the player's button layout is customizable).

## Pausing automatically after each line

With **Subtitle pause playback mode** on, playback pauses automatically after each subtitle line, giving you time to read the subtitle, look things up and shadow, then press Space to continue. It's ideal for intensive listening: you go line by line and never let three lines slip past unnoticed.

The switch is in **Settings → Video → Subtitle behavior and sources**, and the same switch is in the subtitle group of the player's settings panel, so you can toggle it mid-episode. Combined with "Replay current subtitle" it's the classic workflow: it stops → didn't understand, press R → got it, press Space.

For pure listening practice, do the opposite and hide the subtitle: **B** toggles subtitle blur, **Shift+B** cycles between "no obscuring → blur → hide", **H** hides the main subtitle outright; for the secondary subtitle, **Shift+G** cycles and **Shift+H** hides. How to use it in stages: [using secondary (bilingual) subtitles as a bridge](/faq/secondary-subtitle.en).

## The subtitle list: every line of the episode, search, favorites

Press **L** (gamepad **Start**) to open the subtitle list: every line of the episode in time order, with the current line highlighted:

- Tap a line's text to **look up a word directly**; with "Tap subtitle text to look up (off: tapping only jumps)" turned off, tapping a line just jumps to it; there's also "Jump to this line" in the menu;
- **Ctrl+F** searches the subtitles, filtering lines as you type — great for "that line with やっぱり a moment ago";
- **Ctrl+D** favorites the current line; switch the top of the list to "Favorites" to see only favorited lines, and "Export favorited lines" exports them;
- "Auto-scroll" keeps the list following playback; the text size can be enlarged or reduced.

The subtitle list is a great place to review an episode: after finishing, open the list, skim it from the top, and [mine](/faq/sentence-mining.en) the few lines worth keeping.

## Speed: slow down to catch it, speed up through filler

| Action | Default key |
|---|---|
| Speed up / slow down | ] or = / [ or - |
| Reset speed (back to 1.0×) | Backspace |
| Hold for temporary speed | hold E |

- Each press changes speed by **Settings → Video → Controls and gestures → "Speed step"**, 0.1 by default; the speed button on the player also offers presets between 0.5× and 2.0×.
- **Hold for temporary speed**: while E is held, playback runs at the faster speed, and it returns to normal when you let go — handy for skipping through stretches without dialogue. On phones the equivalent is **long-pressing the picture**, with the speed set in "Long-press speed", 2.0× by default.
- Dropping to 0.8×–0.9× helps a lot when you're starting out, but don't stay slow forever — get back to 1.0× early; natural speed is what you ultimately need to understand.

## Looking up without a mouse, fixing timing, and other common keys

**Keyboard / gamepad lookup**: press **Enter** (gamepad **Select**) to enter the subtitle lookup cursor, move to the word with the arrow keys, Enter to look it up, Esc to leave. There are also "Next word (word sweep)" and "Previous word (word sweep)" actions, unbound by default — assign keys yourself in the shortcut settings if you want them.

**Subtitle timing off**: **Z / X** decrease / increase the subtitle delay (100 ms per press), **Ctrl+Shift+←** aligns the previous subtitle to the current time and **Ctrl+Shift+→** aligns the next one (press it the moment the line starts and it's in sync), **Shift+A** opens subtitle waveform alignment. Details: [subtitles don't line up with the picture](/faq/subtitle-sync.en).

**Others**:

| Action | Default key | Gamepad |
|---|---|---|
| Play / pause | Space, P | A |
| Back / exit | Esc | B |
| Volume + / − | ↑ / ↓ (or 0 / 9) | D-pad up / down |
| Mute | M | — |
| Toggle fullscreen | F, F12 | RT |
| Screenshot / screenshot with subtitles | S / Shift+S | — |
| Toggle mini window / mini window controls | W / Shift+M | — |
| Toggle immersive lock | Shift+L | — |

**Immersive lock** locks the player against accidental touches; which actions remain allowed while locked (lookups, for example) is set in **Settings → Video → Controls and gestures → "Immersive mode"**.

## A practical combo for intensive and extensive listening

No need to memorize every key; these two routines cover most situations:

**Intensive listening (understand every line)**: turn on "Subtitle pause playback mode" → when each line stops, read the subtitle first and tap any unknown word to look it up → didn't catch it, press **R** to hear it again, and if needed **[** to slow down one step → for lines worth a card, tap the plus in the lookup popup, or first **Ctrl+D** to favorite them and handle them all in the subtitle list's "Favorites" after the episode → Space for the next line. A pass like this takes several times longer than normal watching, so save it for the few episodes you love most and want to master.

**Extensive listening (enjoy the story)**: turn auto-pause off and watch at normal speed; only press **Ctrl+←** to go back a line, or tap a subtitle to look something up, when you're really stuck; hold **E** to breeze through stretches without dialogue. Afterwards, skim the subtitle list and mine two or three lines — that's enough.

Alternate between them: extensive listening most of the time for input volume, an occasional intensive episode to polish details. Why input volume matters more than understanding every word: [what is comprehensible input](/faq/comprehensible-input.en).

## Rebinding keys and gamepads

All video shortcuts are in **Settings → System and about → Keyboard shortcuts**, where you can change keys and bind gamepad buttons; macOS, Windows / Linux and phones each get their own platform-adjusted defaults. The default gamepad mapping follows a "remote control" idea: A play / pause, B back, LB / RB and D-pad left / right to seek, D-pad up / down for volume, X / Y previous / next line, LT replay current line, RT fullscreen, Start subtitle list, Select lookup cursor. For gamepads across the whole app see [setting up shortcuts and gamepads](/faq/shortcuts-gamepad.en).

If you don't have Fushi yet, get it from the [download page](/download); for the getting-started flow see [how to learn Japanese with anime in Fushi](/faq/learn-japanese-anime.en).
