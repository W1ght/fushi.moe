---
title: "What is the Fushi server (fushi_server), and how do I deploy it on a NAS or Linux server?"
description: "fushi_server is a Fushi host with no GUI and a web admin interface (WebUI), meant for a NAS, home server or VPS. Once your phone and computer pair with it through Fushi Interconnect, they can stream its anime, books and manga, look words up in its dictionaries, and hand it manga OCR, subtitle recognition (ASR) and anime downloads. Includes Linux deployment and systemd steps."
category: "Setup"
order: 56
date: 2026-10-12
lang: en
---

The usual way to use [Fushi Interconnect](/faq/interconnect.en) is "computer as host, phone as client". The catch is that the computer has to stay on: you're out and want to watch the anime on your home computer, and it has gone to sleep. **fushi_server** is built for exactly that — a Fushi host process with no graphical interface that runs on a NAS, home server or VPS and stays online around the clock.

It runs the **same** interconnect host code that desktop Fushi uses when it acts as a host, so Fushi on your phone or computer needs no extra setup: pair once, and in your source lists it looks just like a computer with the host service turned on.

## What it can do

| Capability | Description |
|---|---|
| **Media library host** | Scans the video, book and manga folders on the server; clients browse, stream and sync progress. It can also hold audiobooks and dictionary packs |
| **Whole-volume manga OCR** | A client hands it a manga volume; the server runs detection + recognition and sends back mokuro results, so the phone never downloads a model |
| **Subtitle recognition (ASR)** | Transcribes an audio track, or a video on the server, into SRT subtitles (with per-word timings); see [speech-to-subtitles](/faq/asr-subtitles.en) |
| **Downloads on the server** | Built-in BitTorrent engine (or an external qBittorrent); anime, novels, manga and audiobooks land on the server and are added to the library automatically |
| **Content subscriptions** | Airing-show subscriptions live on the server and are checked by the server, so new episodes keep coming while your phone is off |
| **Remote lookup** | With the dictionary engine bundled, words a client can't find locally can be looked up on the server |
| **Anki delivery** | Cards made on a phone without Anki can be written into Anki by the server and synced to an Anki sync server (needs the bundled Anki sync component) |
| **WebUI** | In the browser: status, pairing PIN, library folders, uploads, jobs and downloads, models, settings, logs |

What it **doesn't** do: there is no game library and no game streaming; no word pronunciation playback (local audio databases are only stored there for other devices to fetch); and no discovery UI — subscriptions are created from a client's discovery page, or in the WebUI by search term.

## Downloads and requirements

Release packages are in the separate GitHub repository [hajisensai/fushi-server](https://github.com/hajisensai/fushi-server/releases):

- `fushi_server-<version>-<seq>-linux-x64.tar.gz`
- `fushi_server-<version>-<seq>-windows-x64.zip`

Betas are prereleases; formal releases are marked Latest.

Target machine requirements:

- **Linux x86-64 with glibc ≥ 2.35** (Debian 12 / Ubuntu 22.04 or later). The built-in BitTorrent engine and the onnxruntime (CPU build) used for OCR / ASR ship in the package, so there's no libtorrent or libssl to install.
- **ffmpeg / ffprobe**: used for video cover frames, decoding audio for ASR, and remuxing after downloads. If they aren't on PATH, set `ffmpeg:` / `ffprobe:` paths in the config file.
- **Optional** `avahi-utils`: with `avahi-publish` available the server announces itself on the LAN so phones find it automatically; without it you can still pair by typing the address.

Will it run on my NAS? An x86-64 NAS works as long as it can provide a Linux environment with glibc ≥ 2.35 — either the system itself, or a Debian 12 / Ubuntu 22.04+ virtual machine or container you set up on the NAS and unpack the package into. There is no official Docker image at the moment. **ARM NAS boxes and Raspberry Pis have no prebuilt package**; build it yourself with the Dart SDK (≥ 3.8) by running `dart pub get` and `dart build cli` in `packages/fushi_server` of the source tree (not `dart compile exe` — that can't bundle sqlite3).

## Deploying on Linux

### 1. Unpack and initialize

```bash
tar -xzf fushi_server-*-linux-x64.tar.gz -C /opt
cd /opt/fushi_server
bin/fushi_server init                # writes fushi_server.yaml (with a random admin_token)
```

### 2. Edit the config file

Open `fushi_server.yaml`. The key part is `libraries` — where your anime, books and manga live:

```yaml
data_dir: "data"              # database, interconnect identity, jobs, logs, downloads
port: 38765                   # interconnect port that clients connect to
tls: true                     # self-signed certificate + fingerprint check; leave it on
device_name: "nas"
lan_requires_pin: true        # pairing PIN; leave it on
admin_port: 38780             # WebUI port; 0 = off
metadata_locale: "en"         # language for scraped metadata
libraries:
  - id: "anime"
    path: "/srv/media/anime"
    kind: "video"
    enabled: true
  - id: "manga"
    path: "/srv/media/manga"
    kind: "manga"
    enabled: true
```

`kind` is `video`, `book` or `manga`. Manga folders currently recognize `.mokuro` volumes and plain image folders; cbz / cbr / pdf aren't scanned yet, so import those on a client.

Anime scraping (covers, synopses, episode info) uses the same metadata sources as the app (AniDB as the default primary source, TMDB as a supplement), but the server **does not have the app's built-in TMDB key** — to use TMDB, put your own `tmdb_api_key` in the config. For what scraping is, see [anime scraping](/faq/scraping.en).

### 3. Start it and run the first scan

```bash
bin/fushi_server serve --scan
```

The terminal prints the interconnect port, the TLS fingerprint and the WebUI address. Open `https://<server address>:38780/` in a browser (the certificate is self-signed, so the browser warns once) and sign in to the WebUI with the `admin_token` from the config file. Forgot the token? Run `fushi_server admin reset-token`.

### 4. Start on boot (systemd)

Create `/etc/systemd/system/fushi_server.service`:

```ini
[Unit]
Description=Fushi headless server
After=network-online.target

[Service]
User=fushi
WorkingDirectory=/opt/fushi_server
ExecStart=/opt/fushi_server/bin/fushi_server serve --config /opt/fushi_server/fushi_server.yaml
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

Then `systemctl enable --now fushi_server`.

## Connecting your phone and computer

In Fushi on your phone or computer: **Settings → Fushi Interconnect → Enable interconnect → Pairing & devices**. If the server shows up on the LAN, tap it; if not, add the address `https://<server address>:38765` by hand. The server has no pop-up to tap "Allow" on, so pairing uses a PIN: the 6-digit PIN appears in the server's terminal and on the WebUI's "Pairing" page — enter it in Fushi and you're paired.

After that, the client works exactly as it does with a computer host: the video / book / manga sources gain a Fushi Interconnect source; set "Download on device" in the download settings to the server and anime downloads land on the NAS; choose the "Interconnect server" option as the manga OCR engine and the paired server does the work, with nothing downloaded on the phone.

To reach home while you're out: in the "Remote access" card on the WebUI's Settings page, enter a public / reverse-proxy / DDNS address (`public_urls`) or turn on the P2P tunnel (`p2p`). Paired devices learn these addresses automatically; saving takes effect immediately, no restart.

## Day-to-day management

- **WebUI**: status, pairing, library roots, uploads (chunked and resumable, with a default cumulative quota of 50 GB so it isn't abused as cloud storage), jobs, downloads, subscriptions, models, settings and logs are all here. Changes to the port, TLS, bind address or torrent settings need a restart of `serve`.
- **Command line**: `fushi_server status` summarizes libraries and pairings, `fushi_server pair ls` / `pair revoke <peerId>` manage paired devices, and `fushi_server models pull <language|ocr>` fetches ASR / OCR models ahead of time. To operate a running server, use `fushi_server ctl …` (for example `ctl scan` to rescan, `ctl dl` for the download queue, `ctl logs -f` to follow logs); offline commands that open the database directly are refused while `serve` is running, so concurrent writes can't corrupt it.
- **GPU acceleration**: the package ships the CPU build of onnxruntime. With an NVIDIA card you can switch to the GPU build (≥ 1.22, with CUDA 12.x + cuDNN 9), point `onnxruntime_library` at it in the config, and after a restart `fushi_server models status` shows `cuda`; if detection fails it falls back to CPU automatically.

## Common questions

- **My phone can't find the server**: usually avahi isn't installed, or the router has AP isolation / a guest network. Just enter `https://<IP>:38765` by hand.
- **TMDB is always unavailable**: the server has no built-in key; set `tmdb_api_key` in the config yourself and restart.
- **Does it run on Windows?** Yes, there's a `windows-x64` package; but an always-on home server is usually Linux / a NAS, so this page uses Linux.
- **How is this different from desktop Fushi as a host?** The host capabilities — media library, interconnect, downloads — are the same code; the server adds a WebUI and a command line and is meant to stay on, but has no graphical interface, game library or game streaming.
- For the full list of config options and commands, see the [fushi_server README](https://github.com/hajisensai/Fushi/blob/develop/packages/fushi_server/README.md) in the source tree. For moving and backing up data, see [How do I back up and migrate my data?](/faq/backup.en)
