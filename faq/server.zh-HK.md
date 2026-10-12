---
title: "Fushi 服務端（fushi_server）是什麼？怎麼部署到 NAS / Linux 伺服器？"
description: "fushi_server 是沒有介面的 Fushi 主機，帶網頁管理介面（WebUI），裝在 NAS、家用伺服器或 VPS 上。手機和電腦用 Fushi 互聯配對後，可以流播它上面的番劇、書、漫畫，用它的詞典查詞，並把漫畫 OCR、字幕識別（ASR）、番劇代下載交給它跑。附 Linux 部署與 systemd 配置步驟。"
category: "安裝與配置"
order: 56
date: 2026-10-12
lang: zh-HK
---

[Fushi 互聯](/faq/interconnect.zh-HK)的常見用法是「電腦當主機、手機當客戶端」。問題是電腦得一直開著：你在外面想看家裡電腦上的番，電腦卻睡著了。**fushi_server** 就是為這種情況準備的——一個沒有圖形介面的 Fushi 主機程序，跑在 NAS、家用伺服器或 VPS 上，24 小時線上。

它和桌面版 Fushi 當主機時用的是**同一份**互聯主機程式碼，所以手機、電腦上的 Fushi 不需要任何額外設定：配對一次，它在來源列表裡就和一臺開著主機服務的電腦一樣。

## 它能做什麼

| 能力 | 說明 |
|---|---|
| **媒體庫主機** | 掃描伺服器上的影片、書、漫畫目錄入庫；客戶端瀏覽、流播、同步進度；也能託管有聲書與詞典包 |
| **漫畫整卷 OCR** | 客戶端把漫畫卷交給它，服務端跑檢測 + 識別，回傳 mokuro 結果，手機不用下載任何模型 |
| **字幕識別（ASR）** | 把音軌或伺服器上的影片轉錄成 SRT 字幕（帶逐詞時間軸），見[語音轉字幕](/faq/asr-subtitles.zh-HK) |
| **代下載** | 內建 BitTorrent 引擎（也可以外接 qBittorrent），番劇、小說、漫畫、有聲書下到伺服器上後自動入庫 |
| **內容訂閱** | 追番訂閱建在服務端、由服務端定期檢查，手機關機也照樣追更 |
| **遠端查詞** | 帶上詞典引擎時，客戶端查不到的詞可以去服務端查 |
| **Anki 落地** | 沒裝 Anki 的手機做的卡，可以經服務端寫進 Anki 並同步到 Anki 同步伺服器（需要隨包的 Anki 同步元件） |
| **WebUI** | 瀏覽器裡看狀態、配對 PIN、管理庫目錄、上傳檔案、看任務與下載、拉模型、改設定、看日誌 |

它**不做**的事：沒有遊戲庫，也不做遊戲串流；不做查詞發音（本地發音庫只做儲存中轉，供其它裝置拉取）；沒有發現頁介面——訂閱要從客戶端的發現頁建，或在 WebUI 裡按搜尋詞建。

## 下載與執行環境

釋出包在 GitHub 的獨立倉庫 [hajisensai/fushi-server](https://github.com/hajisensai/fushi-server/releases)：

- `fushi_server-<版本>-<序號>-linux-x64.tar.gz`
- `fushi_server-<版本>-<序號>-windows-x64.zip`

beta 是預釋出（prerelease），正式版標為 Latest。

目標機要求：

- **Linux x86-64，glibc ≥ 2.35**（Debian 12 / Ubuntu 22.04 及以後）。內建的 BitTorrent 引擎和 OCR / ASR 用的 onnxruntime（CPU 版）都隨包，不用另裝 libtorrent、libssl。
- **ffmpeg / ffprobe**：影片封面抽幀、ASR 音軌解碼、下載後轉封裝要用。不在 PATH 上時在配置檔案裡寫 `ffmpeg:` / `ffprobe:` 的路徑。
- **可選** `avahi-utils`：有 `avahi-publish` 時會在區域網廣播自己，手機能自動發現；沒有也能手動填地址配對。

NAS 怎麼判斷能不能跑：x86-64 的 NAS 只要能提供 glibc ≥ 2.35 的 Linux 環境就行——系統本身滿足，或者你在 NAS 上自己建一個 Debian 12 / Ubuntu 22.04 以上的虛擬機器 / 容器，把包解壓進去跑。目前沒有官方 Docker 映象。**ARM 架構的 NAS 和樹莓派沒有現成包**，需要用 Dart SDK（≥ 3.8）自己構建：在原始碼的 `packages/fushi_server` 下執行 `dart pub get` 和 `dart build cli`（注意不能用 `dart compile exe`，那樣打不進 sqlite3）。

## Linux 部署步驟

### 1. 解壓並初始化

```bash
tar -xzf fushi_server-*-linux-x64.tar.gz -C /opt
cd /opt/fushi_server
bin/fushi_server init                # 生成 fushi_server.yaml（含隨機 admin_token）
```

### 2. 編輯配置檔案

開啟 `fushi_server.yaml`，最重要的是 `libraries`——告訴它你的番劇、書、漫畫放在哪：

```yaml
data_dir: "data"              # 資料庫、互聯身份、任務、日誌、下載都在這
port: 38765                   # 互聯埠，客戶端連這個
tls: true                     # 自簽證書 + 指紋校驗，別關
device_name: "nas"
lan_requires_pin: true        # 配對 PIN，別關
admin_port: 38780             # WebUI 埠；0 = 關閉
metadata_locale: "zh-CN"      # 刮削資料語言
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

`kind` 可以是 `video`、`book`、`manga`。漫畫目錄目前認 `.mokuro` 卷和純圖片目錄，cbz / cbr / pdf 暫時不掃描，這類檔案仍在客戶端匯入。

番劇刮削（封面、簡介、分集資訊）和 app 用的是同一套資料源（預設主源 AniDB，TMDB 補充），但服務端**沒有 app 內建的 TMDB key**，要用 TMDB 就在配置裡填 `tmdb_api_key`。刮削是什麼見[番劇刮削](/faq/scraping.zh-HK)。

### 3. 啟動並首次掃描

```bash
bin/fushi_server serve --scan
```

終端會列印互聯埠、TLS 指紋和 WebUI 地址。瀏覽器開啟 `https://<伺服器地址>:38780/`（自簽證書，瀏覽器會警告一次），輸入配置檔案裡的 `admin_token` 登入 WebUI。token 忘了用 `fushi_server admin reset-token` 重新生成。

### 4. 設成開機自啟（systemd）

新建 `/etc/systemd/system/fushi_server.service`：

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

然後 `systemctl enable --now fushi_server`。

## 手機和電腦怎麼連上它

在手機或電腦的 Fushi 裡：**設定 → Fushi 互聯 → 啟用互聯 → 配對與裝置**，區域網裡能自動發現就直接點它；發現不了就手動新增地址 `https://<伺服器地址>:38765`。服務端沒有彈窗可以點「允許」，所以要輸 PIN：6 位 PIN 會顯示在服務端終端和 WebUI 的「配對」頁上，在 Fushi 裡輸入即完成配對。

配好之後，客戶端那邊的用法和連電腦主機完全一樣：影片 / 書 / 漫畫的來源裡多一個 Fushi 互聯來源；下載設定裡的「下載執行裝置」選服務端，番劇就下在 NAS 上；漫畫 OCR 引擎裡選「互聯服務端」那一項，就交給已配對的服務端來跑，本機不下任何模型。

出門在外想連回家：在 WebUI「設定」頁的「遠端訪問」卡片裡填公網 / 反代 / DDNS 地址（`public_urls`），或開啟 P2P 隧道（`p2p`），已配對的裝置會自動學到這些地址，儲存即生效、不用重啟。

## 日常管理

- **WebUI**：狀態、配對、庫根、上傳（分塊斷點續傳，預設累計配額 50 GB，防止被當網盤用）、任務、下載、訂閱、模型、設定、日誌都在這裡。埠、TLS、繫結地址、torrent 設定改後要重啟 `serve`。
- **命令列**：`fushi_server status` 看庫和配對概況，`fushi_server pair ls` / `pair revoke <peerId>` 管理已配對裝置，`fushi_server models pull <語言|ocr>` 預先拉 ASR / OCR 模型。服務執行中想操作它，用 `fushi_server ctl …`（例如 `ctl scan` 重新掃描、`ctl dl` 看下載佇列、`ctl logs -f` 跟日誌）；直接開啟資料庫的離線命令在 `serve` 執行時會被拒絕，這是為了防止併發寫壞資料庫。
- **GPU 加速**：隨包的是 CPU 版 onnxruntime。有 NVIDIA 顯示卡的話，可以換 GPU 版 onnxruntime（≥ 1.22，配 CUDA 12.x + cuDNN 9），在配置裡用 `onnxruntime_library` 指過去，重啟後 `fushi_server models status` 會顯示 `cuda`；探測失敗會自動退回 CPU。

## 常見問題

- **手機發現不了服務端**：多半是沒裝 avahi，或路由器開了 AP 隔離 / 訪客網路。直接手動填 `https://<IP>:38765`。
- **TMDB 一直不可用**：服務端沒有內建 key，要自己在配置裡填 `tmdb_api_key`，改了重啟。
- **Windows 能跑嗎**：能，有 `windows-x64` 包；但常開的家用伺服器一般是 Linux / NAS，這篇以 Linux 為例。
- **和桌面版 Fushi 當主機有什麼區別**：媒體庫、互聯、下載這些主機能力是同一套，服務端多了 WebUI 和命令列、適合常開；少了圖形介面、遊戲庫和遊戲串流。
- 更完整的配置項與命令說明見原始碼裡的 [fushi_server README](https://github.com/hajisensai/Fushi/blob/develop/packages/fushi_server/README.md)。資料遷移與備份見[怎麼備份和遷移資料](/faq/backup.zh-HK)。
