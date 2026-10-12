---
title: "Which book formats can Fushi import? How do I get EPUB, PDF and TXT into my bookshelf?"
description: "Books can import EPUB, PDF and plain text such as TXT, HTML and Markdown (converted to EPUB automatically); you can also build an audiobook from just subtitles + audio, scan whole folders, and migrate from a Hoshi Reader backup. MOBI / AZW3 and DRM-protected e-books are not supported."
category: "Books"
order: 65
date: 2026-10-12
lang: en
---

The first step to reading light novels in Fushi and looking up words with a tap is getting the books into your bookshelf. This article covers **what you can import, what you can't, which entry points to use**, and how far each format gets you once it's in.

## Supported formats

| Format | What it becomes | Tap-to-look-up | Notes |
|---|---|---|---|
| **EPUB** | The EPUB as-is | Yes | Preferred format: keeps the original layout, furigana, table of contents and illustrations |
| **PDF** | A PDF book, rendered page by page | Yes, for PDFs with a text layer | Progress by page number, bookmarks supported; scanned PDFs have no text — see below |
| **TXT, HTML / HTM / XHTML, Markdown (.md)**, plus RST, Org, CSV, TSV, LOG, JSON, XML | Converted to an EPUB automatically | Yes | Text only, no original layout |
| **Subtitles (SRT / VTT / ASS / SSA / LRC) + audio** | An audiobook rebuilt from the subtitle text | Yes | An alternative when you don't have the book — see [How do I use audiobooks?](/faq/audiobook.en) |

**Not supported**: Kindle formats such as MOBI, AZW3 and KFX, FB2, Word documents (DOCX), and any file with **DRM** (copy protection). Kindle formats have to be converted to EPUB with another tool first; DRM-protected books can't be opened by Fushi, and Fushi offers no way to remove DRM — when buying, prefer stores that sell DRM-free EPUB.

When the same book is available in several formats, **choose EPUB**: it's the only format that keeps the original vertical layout, furigana and table of contents while still letting you change the font size and font freely. PDF suits books where the page layout is the content (textbooks, books full of charts); TXT suits plain-text web-novel archives — the plainest to read, but lookups and mining work just the same.

Manga doesn't go through here: if you pick a manga file such as a CBZ / ZIP image archive or a `.mokuro` file in "Import book", Fushi says "This looks like manga" and, once you confirm, hands it over to the manga importer.

## Entry point 1: Import book (one at a time)

In the bottom bar go to **Books → Import** and tap **Import book** (with an empty bookshelf, "Go to import" gets you here too; the "Import books and audiobooks" step in onboarding is the same dialog):

1. **Pick book file**: choose an EPUB, PDF or text file; the title is filled in from the file name;
2. **Book title** and **Author (optional)** can be edited;
3. To use a different cover, **Pick cover image**;
4. If you just want to read, you can import now. For an audiobook, also **Pick subtitle files** and **Pick audio files**, and Fushi aligns the subtitles with the text.

If a book with the same name is already in your bookshelf, a "Duplicate book" prompt appears: "Yes, add suffix" imports another copy with a numbered suffix, "No, cancel" skips this book.

On desktop (Windows, macOS, Linux) you can also **drag files straight into the bookshelf window**, which opens the same import dialog with the file pre-filled.

## Entry point 2: Import folder (in bulk)

For a whole directory of books use **Books → Import → Import folder**, choose the directory, then pick one of two options:

- **Add as library source**: Fushi remembers the directory and keeps scanning it, so new books you drop in are added automatically;
- **Import once only**: scans and imports, without keeping the scan location.

Folder scanning only picks up **EPUB and PDF** (import TXT and other text files one at a time with "Import book"). Subtitle and audio files with the same name as a book are paired with it as audiobook material. If you delete a book from a library source directory, Fushi removes it from the bookshelf on the next scan (only the library entry is touched — none of your source files are ever deleted); put the file back and the next scan imports it again.

A library source can also be a remote directory: under **Add source** choose **Network** (SFTP / FTP / WebDAV remote library), and Fushi downloads the remote books to the device before importing them — handy if you keep your books on a NAS.

## Entry point 3: migrate from another reader

If you've used Hoshi Reader, your books, reading positions and reading statistics can move over together: in Hoshi Reader, back up your library under "Settings › Backup" to get a `Books_….hoshi` file; then in Fushi open **Settings → Sync & backup → Local backup → Third-party import** and tap **Choose backup file**. Before importing you see a preview of how many books are new and how many are already in your library; books already there aren't imported twice, and importing the same backup again doesn't double-count anything.

Two more routes that don't involve importing files:

- **Online web novels**: read them online with LNReader plugins, or download a range of chapters as an EPUB straight into the bookshelf — see [How do I read web novels online with LNReader plugins?](/faq/novel-online.en) (not available on iOS);
- **Books on another device**: once [Fushi interconnect](/faq/interconnect.en) is set up, books in a computer's or server's library can be read directly on your phone.

## How the formats differ once imported

**EPUB** gives the most complete experience: vertical text, furigana, the book's CSS, illustrations and table of contents are all kept, and all three reading modes and every typography setting are available — see [How do I read EPUB light novels in Fushi?](/faq/epub-reader.en).

**PDF** is shown page by page in a separate PDF reader, with the same layout as the printed edition, but you can't change the font size or switch between vertical and horizontal text. If the PDF has a text layer (exported directly from text), tapping text looks words up and mines cards; a **scanned PDF** (every page is an image) contains no text, so there's nothing to tap — long-press the book in Books and choose "Convert to manga" to turn it into manga page by page, and once manga OCR has recognised it the text becomes tappable; to go back to the PDF, choose "Convert back to book". Image-based EPUBs can be converted the same way.

**TXT and other plain text** is turned into a simple EPUB: paragraphs are split at blank lines and a new chapter starts roughly every 30,000 characters (chapters are named "Chapter 1", "Chapter 2"… — headings like 「第一章」 in the original are not detected); Markdown `#` headings become headings in the text. Once imported, the layout is entirely up to your reader settings — see [Typography settings](/faq/reader-typography.en).

Watch the encoding: UTF-8 / UTF-16 text is recognised correctly on every platform, but **legacy encodings such as Shift-JIS, GBK and Big5 are only detected automatically on Android and iOS**; on Windows, macOS and Linux they come out garbled. Before importing old Japanese TXT files on a computer, re-save them as UTF-8 in a text editor.

## Common situations

- **"Unsupported file format"**: the extension isn't in the table above — MOBI, AZW3 or DOCX, for example.
- **An imported book won't open**: most likely it has DRM, or the EPUB itself is broken.
- **TXT files in a folder weren't picked up**: folder scanning only recognises EPUB and PDF; use "Import book" for TXT.
- **Adding an audiobook to a book you've already imported**: long-press the book in Books and choose "Import audiobook" — see [How do I use audiobooks?](/faq/audiobook.en).
- **Where are books and data stored**: on import the book's content is copied into Fushi's own folder, so a book imported on its own keeps working even if you delete the original file; details in [Where is my data stored?](/faq/data.en).

Haven't installed Fushi yet? Pick your platform on the [download page](/download).
