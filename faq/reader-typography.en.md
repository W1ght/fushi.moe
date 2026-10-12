---
title: "How do I set vertical / horizontal text, fonts, font size, line spacing and furigana in Fushi's reader?"
description: "All the layout for reading Japanese light novels lives in Reader settings: switch vertical and horizontal text with one tap, import your favourite Mincho or Gothic font as the body font, and adjust size, line height, margins and columns with a live preview; furigana can be shown as-is, revealed on tap, dimmed or hidden entirely to practise readings."
category: "Books"
order: 63
date: 2026-10-12
lang: en
---

With the same EPUB, a different font or a bit more line spacing makes a big difference to how tiring it is to read. Every layout option in Fushi's reader can be changed while you're reading; the text re-flows in the new style immediately, without leaving the book. This article goes through direction → fonts → spacing → furigana → themes and book styles, using the same setting names as the app.

## Where to change it

- **While reading**: tap an empty spot to bring up the control bars and tap **Reader settings**. The panel has several pages: **Theme & font** (theme, body font, font size, font weight, furigana), **Layout** (mode, direction, line height, margins, advanced options), **Turning & gestures**, **Audiobook** and **Lookup**. A short Japanese sample text in the panel previews your changes as you make them.
- **Outside a book**: **Settings → Reading**; the "Mode & orientation" and "Typography" groups are the same settings.

These are global reader settings, one set shared by all books.

## Vertical or horizontal

**Reader settings → Layout → Frequently used → Writing direction**: "Vertical" or "Horizontal". The default is vertical, read right to left like a Japanese bunkobon; switch to horizontal for horizontal web novels, English books, or if vertical text just isn't for you. Switching doesn't lose your reading position.

Vertical text has a few extra fine-tuning options under **Layout → Advanced** (hidden when you switch to horizontal):

- **Text orientation**: how Latin letters and digits inside vertical text are set. "Mixed" (default) lays half-width letters on their side to run along the line; "Upright" stands every letter up so it stacks downward like kanji.
- **Font kerning (vertical)**: turns on the font's own vertical kerning, so punctuation and small kana sit more tightly.
- **VPAL (vertical alt)**: turns on the font's proportional vertical glyphs, giving more natural kana spacing. You'll only see a difference if the font actually includes these OpenType features.

Any of the three modes — paginated, scroll, visual novel — can be combined with either direction; see [Which reading mode should I use?](/faq/reader-modes.en).

## Font, size and weight

**Body font** opens the app-wide **Font library**, where you can:

- **Import font file**: pick a TTF / OTF or similar font file from your device;
- **Import from URL**: paste a font file's download address;
- **Add system font**: use a font already installed on your computer;
- **Recommended fonts**: a few common Chinese / Japanese fonts, downloaded with one tap.

For each font you can tick its "Font roles" — "Novel text font", "Dictionary font", "Video subtitle font" and so on are independent of each other; drag fonts to set their priority, so the ones at the top are used first and later ones only fill in missing characters. The default is "Default (book / system font)": nothing is forced, the EPUB's own declared fonts are used, and the system font if there are none.

The font chain also depends on **content language**: the same kanji has different standard glyph shapes in Japanese, Simplified Chinese and Traditional Chinese, and Fushi picks fonts by the book's language. If the EPUB declares its language that's used automatically; if it's wrong or missing, long-press the book in Books and choose "Content language" to set it by hand. The global default is under **Settings → Appearance and interaction → Typography → Default content language**.

**Font size**: 8–128, default 22. On a phone 18–24 is usually comfortable; tablets and computers can go larger. **Font weight**: 100–900, default 400 (normal); go to 500–600 if the screen looks washed out or the font is too thin.

## Line height, paragraphs and margins

- **Line height**: 1–3×, default 1.65. In vertical text this is the spacing between columns; with furigana, too small a line height squeezes the readings, so we suggest not going below 1.6.
- **Paragraph spacing**: extra space between paragraphs, 0–3em, default 0.
- **Paragraph indent**: how many characters to indent each paragraph, default 0 (use the book's own indentation).
- **Text justification**: aligns every line to both edges (top and bottom in vertical text).
- **Top / bottom / left / right margin**: as a percentage of the screen, default 2% left and right and 0 top and bottom. Lower them to fit more text on a phone, raise them for more white space on a tablet.
- **Columns per page**: only in paginated mode, default "Auto"; on wide screens you can set 2 columns.

## Furigana (ruby readings)

How the small readings above kanji in Japanese books are shown is set under **Reader settings → Theme & font → Hide furigana**, with four options:

- **Off** (default): nothing is hidden, furigana is shown as-is;
- **Toggle**: furigana is hidden by default but keeps its space (line spacing doesn't jump); tapping a word reveals only that word's reading, and that tap does not trigger a lookup — good for guessing the reading first and then checking;
- **Hidden**: furigana is not shown at all;
- **Dimmed**: shown as usual but faded so it doesn't compete with the text; works in both light and dark themes.

There's also a "Toggle furigana" shortcut (bound by default to pressing the right stick, R3, on a gamepad; there's no default keyboard key, but you can bind one — see [Shortcuts and gamepad](/faq/shortcuts-gamepad.en)): in "Toggle" it reveals / re-hides all readings on the page at once, in "Dimmed" it temporarily restores full brightness; in "Off" and "Hidden" it has no effect. Lookups don't depend on furigana — even with readings hidden, tapping a word still gives you its reading.

## Themes, book styles and illustrations

- **Theme**: White, Ecru, Eye care, Water blue, Gray, Dark, Black; for night reading use Dark or Black (Black saves more power on OLED screens).
- **Prioritize book styles**: on by default, respecting the EPUB's own CSS (heading styles, special layouts). When the book's styles fight your settings (for example, a hard-coded font size in the book), turn it off so your settings win. Still not happy? Long-press the book in Books and choose "Edit book CSS" to edit that book's stylesheet directly; if you break something, "Reset all" restores it.
- **Blur images (spoiler guard)**: illustrations are shown blurred until you tap to reveal them, so colour plates don't spoil anything as you turn pages.
- **Merge illustration pages into text**: on by default; separate chapters containing just one image are merged into the neighbouring text and shown continuously instead of taking up a page on their own.

## Common situations

- **Changed the font but nothing happened**: first check whether "Prioritize book styles" is on and whether the book's CSS hard-codes a font; then check that the font is ticked as "Novel text font" in the font library and sits near the top.
- **Digits in vertical text lie on their side and look odd**: set "Text orientation" to "Upright".
- **Furigana overlaps the previous line**: increase the line height.
- **Kanji in Japanese text look like Simplified Chinese glyphs**: the book's content language was detected wrongly; long-press the book, choose "Content language" and set it to Japanese.

For the rest of the reader (tap-to-look-up, mining, progress), see [How do I read EPUB light novels in Fushi?](/faq/epub-reader.en); haven't got Fushi yet? Head to the [download page](/download).
