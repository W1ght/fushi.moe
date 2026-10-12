---
title: "How do Fushi's study statistics work? How are reading time, characters read, lookups and cards counted?"
description: "The Statistics center on the home screen shows study time, characters read, reading speed (chars/hr), lookups, cards mined, and favorited words and sentences across four tabs — Overview, Read, Watch and Game — along with a study calendar and every immersion session. This page covers where to find it, how each number is counted (idle timeout, first-time viewing only), how to change the hour a new day starts, how to delete mistaken records, and multi-device sync."
category: "Learning method"
order: 404.5
date: 2026-10-12
lang: en
---

The thing that most often makes people give up on immersion is not feeling any progress. Fushi keeps the books for you in the background: how many minutes of anime you watched, how many characters of light novels you read, how many words you looked up, how many cards you made. The numbers aren't for showing off; they let you see things like "I read twenty thousand more characters this week than last" or "my reading speed went from three thousand characters an hour to four thousand" — progress you'd never notice by feel.

All statistics stay on your own device: no account, nothing uploaded (see [Where is my data stored?](/faq/data.en)).

## Where to find your statistics

- **Home screen top toolbar → Statistics center** (the bar-chart icon). This is the main entry point.
- **In the reader**: press `I` or open "Book statistics" from the menu to see this session, the time left for the chapter / book, and the book's total time, characters, lookups and cards; "Open full records" jumps to the Read tab of the Statistics center.
- If you've turned off the home screen in module settings: **Settings → System and about → Home shortcuts → Statistics center**.

The Statistics center has four tabs at the top: **Overview**, **Read**, **Watch** and **Game**. Overview adds the three domains together; the other three each cover one kind of media.

## What's in the Statistics center

All four tabs share the same layout, from top to bottom:

1. **Study calendar**: a calendar shaded by day — the darker, the more you studied; tap a day to switch to that day's data. The "Past week" row above it uses flames to show which of the last 7 days had study.
2. **Range bar**: choose **Day / Week / Month / Year / All / Custom**, and step with "Previous period / Next period"; once you've stepped into the past, a "Today / This week / This month / This year" button takes you back. Weeks start on Monday; "Custom" lets you pick any start and end dates.
3. **Range time chart**: a bar chart of study time for each day in the range (by week or month when the range is long).
4. **Selected range** card: the range's **characters**, **time**, **active days**, **lookups**, **cards mined**, **favorited** words and **favorited sentences**; the Watch tab also shows episodes finished, and the Game tab play sessions. Wherever reading is involved you'll see **reading speed** in chars/hr.
5. **Analysis** (a collapsible section on the Read and Watch tabs): the Read tab has trends, a speed summary (weighted average speed, fastest / slowest day, typical day) and a by-source breakdown (novels / manga / PDF); the Watch tab has an hourly distribution.
6. **Recent sessions**: your latest study sessions; "All sessions" shows the full history.
7. **Breakdown by title**: how long and how many characters for each book, show and game, sortable by time, characters or speed; tap a row to see that title's own session list.

The **Daily goal** card on the home screen lets you "Set goal" (daily / weekly characters, with presets and a "last 7 days average" for reference). The goal counts characters from reading, video subtitles and galgame dialogue combined.

## How each number is counted

Knowing the rules is how you read the numbers correctly.

**Reading time (novels / PDF / manga)**

- The timer only runs while you're actually reading. After a while without turning pages, scrolling and so on, it stops counting — set this under **Settings → Reading → Reading statistics → Idle timeout**; the default is 10 minutes.
- Switching to another app or opening a menu or full-screen panel stops the timer; the lookup popup and the card dialog don't, since they're part of reading.
- **Reading timer start** (same group): **On open** (default), **After page turn** (opening a book doesn't count yet; it starts once you turn past the first page or an audiobook starts playing), or **Manual**. You can pause / resume anytime with the timer button in the reader or the `P` key.

**Characters / pages read**

- A page counts as "read" at the moment you **turn away** from it. Opening a book, glancing at it and closing it doesn't add characters.
- Turning back retracts it; turning forward again restores it as a union — reading the same page back and forth counts once, and parts you skipped don't count.
- So "reading speed (chars/hr)" reflects how much you really read. Speed is only shown once there's at least 1 minute of data.

**Watching time (video / anime)**

- It follows the playback state: playing counts, paused doesn't; if you switch to another window while the video keeps playing, it still counts.
- **Only the first time you see a part counts**: replaying the previous line, dragging back to rewatch, or watching the same episode again the next day doesn't add time; parts you skip by seeking forward don't count either. So for a 24-minute episode, however many times you listen through it, watching time tops out at 24 minutes. Replaying lines for intensive listening is a good habit — it just isn't counted twice.
- Video from media servers such as Jellyfin / Emby and from interconnect peers is counted too.

**Games**

- Galgame dialogue captured by the text hook on Windows counts toward characters; play time is recorded per game session, and sessions under 60 seconds aren't saved.

**Lookups, cards and favorites**

- Each lookup, card and favorited word or sentence in the reader, video player or a game is recorded against that title and date.

## When does "today" start?

Stayed up watching anime until 2 a.m. — is that today or yesterday? Tap **Statistics settings** at the right end of the range bar on any statistics tab and set **Day starts at** (a whole hour from 0 to 23, default 0). With 4, study at 2 a.m. goes to the previous day.

Note that only records written after the change use the new boundary; existing history isn't re-bucketed.

The same dialog has **Clear statistics**, which clears the current tab's domain (all three on Overview). Clearing statistics doesn't touch your favorited words and sentences, your Anki cards or your game library, but it can't be undone.

## Fixing mistakes

- **Delete a mistaken session**: find it under "Recent sessions" or in a title's session list and choose **Delete session** — for example when you left a book open, went to eat, and had set a very long idle timeout.
- **Edit session**: change a session's date (the whole session moves; the time of day stays the same) and its character count.
- **Delete one title's statistics**: "Delete statistics" removes that item's time, characters and lookup / mining counts; favorited words and sentences are kept.
- "Clear all sessions" wipes every session record and asks you to confirm twice.

## Multiple devices and profiles

- **Profiles are isolated**: switch to another profile and the Statistics center shows only that profile's numbers (the statistics settings say "Showing statistics for profile … only"). Handy for studying two languages on one device or sharing it with family.
- **With Fushi Interconnect**: "Share statistics" under "Share with paired devices" (reading and watching time, character counts, lookup and mining counters) is on by default, so phone and computer statistics merge both ways (see the [Interconnect guide](/faq/interconnect.en)).
- **With cloud sync**: **Settings → Sync & backup → What to sync → Sync statistics**. Both sides need a profile with the same name for the statistics to line up.
- Game statistics never leave the device.
- Backup files can include statistics too; see [How do I back up and migrate my data?](/faq/backup.en)
- Coming from **Hoshi Reader**? "Third-party import" brings its reading statistics along.

## Making use of the numbers

Some practical suggestions:

- **Watch the trend, not single days**: a day with only 10 minutes is fine; look at whether the month view's bars are rising overall.
- **Reading speed is the best progress signal**: on light novels of similar difficulty, a steadily rising chars/hr means your reading is becoming automatic.
- **Lookups ÷ characters** roughly reflects how hard the content is for you: looking up less as you get further into the same work is normal progress; if it stays high, consider easier content — see [comprehensible input](/faq/comprehensible-input.en).
- **Don't overdo cards**: for how many cards a day makes sense, see [How many cards should I make per day?](/faq/cards-per-day.en)
- If you want to compare with others, try the experimental leaderboard ("Ranking" in the home toolbar); nothing is uploaded until you sign up.
