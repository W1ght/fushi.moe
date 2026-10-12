---
title: "iOS 版怎麼裝？為什麼 iPhone 上沒有「發現」和線上源？"
description: "iPhone / iPad 通過 TestFlight 安裝 Fushi，需 iOS 15.1 及以上。按 App Store 稽核規定，iOS 版沒有「瀏覽」模組：發現頁、線上漫畫 / 影片 / 小說源和下載中心都不提供；本地匯入的輕小說、漫畫、番劇照常看，查詞、Anki 制卡、媒體伺服器、互聯都在，遊戲頁是串流接收端。"
category: "安裝與配置"
order: 41.4
date: 2026-10-12
lang: zh-HK
---

iPhone 和 iPad 上的 Fushi 通過 **TestFlight** 安裝，系統需要 **iOS 15.1 或更新**。它和其他平臺是同一套介面、同一套閱讀器和播放器，但按 App Store 的規定少了幾類功能——下面先講怎麼裝，再把少了什麼、為什麼少、怎麼繞一一說清。

## 怎麼在 iPhone / iPad 上安裝？

1. 在 App Store 裡裝蘋果官方的 **TestFlight** 應用。
2. 在 iPhone / iPad 上開啟 Fushi 的 TestFlight 公開邀請連結：[testflight.apple.com/join/j88d69jx](https://testflight.apple.com/join/j88d69jx)（[下載頁](/zh-hk/download) iOS 一行寫的也是「通過 TestFlight 安裝」）。
3. 在 TestFlight 裡點「接受」→「安裝」，裝好後桌面上就有 Fushi 了。
4. 第一次開啟進入新手引導：選語言和主題、勾選功能、裝推薦包、連線 AnkiMobile。制卡在 iOS 上連的是 AnkiMobile，見[怎麼連線 Anki？](/faq/anki.zh-HK)。

**更新**：新版本經 TestFlight 推送，比其他平臺通常晚幾天（要走 Apple 的處理流程）。在 Fushi 的 **設定 → 系統與關於** 點「檢查更新」，發現新版會給你一個「開啟 TestFlight」的按鈕，跳過去點更新即可；iOS 不支援應用內直接安裝，所以沒有「自動安裝更新」開關。

GitHub Releases 裡另有一個 `fushi-<版本>-ios.ipa`，那是**未簽名**的包，只給會自己簽名側載的使用者用；普通使用者走 TestFlight 就好。側載裝的版本功能和 TestFlight 版一樣，下面說的限制同樣存在。

## iOS 版少了哪些功能？

iOS 版沒有「瀏覽」模組。具體來說，下面這幾類在 iPhone / iPad 上都不提供：

| 少了什麼 | 其他平臺上它是什麼 |
|---|---|
| **發現** | 「瀏覽」模組的「發現」頁籤，以及各庫頁（書架、漫畫庫、影片庫、遊戲）裡的「發現」子標籤；內建的外部發現源、影片資源索引器，連你自己配置的 OPDS 伺服器也在這裡 |
| **線上漫畫源** | Mihon 擴充套件、mokuro.moe 卷下載，見[怎麼線上看漫畫並識別文字制卡？](/faq/manga-online.zh-HK) |
| **線上影片源** | Aniyomi 擴充套件，見[怎麼用影片源線上看番劇？](/faq/anime-online.zh-HK) |
| **線上小說源** | LNReader 外掛 |
| **下載中心** | BT / 磁力 / 直鏈下載佇列，以及外接 qBittorrent |
| **藍光 AACS 解密** | 加密的藍光原盤不能直接播（已解密的副本、未加密的原盤照常播放） |

依附在發現頁上的「AI 下載」也隨之沒有，見[AI 下載是什麼？](/faq/ai-download.zh-HK)。

## 為什麼少了？不是 iOS 做不到

這幾樣都不是技術上做不到——同一份程式碼在 Android、Windows、macOS 上都在跑。原因是 **App Store 稽核指南不允許**這些形態：內建的第三方內容索引和種子源、能在執行時載入任意第三方擴充套件倉庫的內容源宿主（Mihon / Aniyomi 擴充套件、LNReader 外掛這類，外掛本身就是第三方程式碼）、通用的 BT / 磁力下載器，以及解除光碟複製保護，都是會被拒絕上架的型別。

所以 Fushi 的做法是：只在 iOS 構建裡把這幾類能力整體拿掉，其他四個平臺不走商店分發，完全不受影響。判斷依據是「這是不是 iOS」，和你從 TestFlight 還是側載裝的無關。

## iOS 上保留了什麼？

除了上面那張表，其他功能和別的平臺一樣：

- **本地匯入和閱讀 / 播放**：EPUB 輕小說、漫畫、本地影片和番劇、有聲書都能匯入，閱讀器、影片播放器、點詞查詞、雙語字幕都在。
- **詞典與制卡**：匯入詞典、推薦包、查詞彈窗、連 AnkiMobile 一鍵制卡（帶原句、截圖、原聲音訊），見[裝好之後怎麼邊看番邊制卡？](/faq/first-card.zh-HK)。
- **媒體伺服器**：Jellyfin / Emby / Plex 照常連線、瀏覽、播放，見[Jellyfin、Emby、Plex 是什麼？](/faq/media-servers.zh-HK)。
- **Fushi 互聯**：和電腦或 [Fushi 服務端](/faq/server.zh-HK)配對，瀏覽對方的媒體庫、拉流播放、同步進度和備份。
- **遊戲頁是串流接收端**：Galgame 文本 / 語音捕獲只在 Windows 上；iPhone / iPad 上的「遊戲」頁列出已配對 Windows 電腦的遊戲庫，可以遠端啟動遊戲並把畫面串流過來玩，制卡由電腦那邊完成。

## 想在 iPhone 上看線上內容怎麼辦？

最順的辦法是讓另一臺裝置當「源頭」，iPhone 只負責看：

1. 在 Windows / Mac 電腦上的 Fushi 裡用線上源或下載功能把書、漫畫、番劇拿到本地媒體庫；家裡有 NAS 的，也可以交給 NAS 上的 [Fushi 服務端](/faq/server.zh-HK)代下載併入庫。
2. 讓那臺電腦或服務端當主機，用 [Fushi 互聯](/faq/interconnect.zh-HK)把 iPhone 和它配對（iOS 只能當客戶端），iPhone 上直接瀏覽對方的庫、拉流播放、同步進度。
3. 或者把內容放進你自己的 Jellyfin / Emby / Plex，在 iPhone 上當媒體伺服器看。

這樣 iPhone 上用的都是「你自己的庫」，不觸碰稽核限制，查詞制卡體驗也完全一樣。全平臺差異總覽見[支援哪些平臺？](/faq/platforms.zh-HK)，其他平臺的裝法見 [Android 怎麼安裝 Fushi？](/faq/android-install.zh-HK)、[macOS 怎麼安裝 Fushi？](/faq/macos-install.zh-HK)。
