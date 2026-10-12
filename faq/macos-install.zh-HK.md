---
title: "macOS 怎麼安裝 Fushi？Intel Mac 能用嗎？"
description: "macOS 版只支援 Apple Silicon（M 系列晶片），需 macOS 13.4 及以上，Intel Mac 不再支援。下載 zip 解壓、拖進「應用程式」，首次開啟被 Gatekeeper 攔時在「隱私與安全性」裡點「仍要開啟」。之後應用內自動更新，看番學日語、讀書查詞、Anki 制卡都和其他平臺一樣。"
category: "安裝與配置"
order: 41.3
date: 2026-10-12
lang: zh-HK
---

先看晶片：Fushi 的 macOS 版**只支援 Apple Silicon**（M1 / M2 / M3 / M4 等 M 系列晶片），**Intel Mac 不再支援**。系統版本需要 **macOS 13.4 或更新**。

不確定自己是哪種 Mac：點螢幕左上角蘋果選單 →「關於本機」，「晶片」一欄寫著 Apple M… 就是 Apple Silicon；如果寫的是「處理器 Intel …」，那就是 Intel Mac。

## Intel Mac 還能裝嗎？

從 2026 年 10 月起，macOS 版的程式本體和隨包的原生元件（互聯 P2P、內建 BT 引擎、Anki 同步、精簡版 ffmpeg、Mihon 擴充套件執行時等）全部只編 arm64 一種架構，釋出流程裡有一道檢查專門確認 app 裡沒有混進別的架構。以前發的是同時含 Intel 和 Apple Silicon 的通用包，現在這條路線已經停掉：Intel Mac 上打不開新版，Intel 宿主上的構建指令碼也會直接報錯退出，自己編譯同樣走不通。

Intel Mac 使用者的替代辦法是換一臺裝置當主力：手機、平板（[Android](/faq/android-install.zh-HK) 或 [iOS](/faq/ios-limits.zh-HK)）都能裝；書庫很大的話，放在 Windows 電腦或 NAS 上的 [Fushi 服務端](/faq/server.zh-HK)裡，再用 [Fushi 互聯](/faq/interconnect.zh-HK)讓手機 / 平板瀏覽、拉流、同步進度。注意 Fushi 的瀏覽器擴充套件要配合本機執行的桌面版 Fushi 使用（查詞用的是 app 裡的詞典），所以它也幫不了 Intel Mac，見[瀏覽器裡怎麼查詞？](/faq/browser-lookup.zh-HK)。

## 安裝步驟

1. 在[下載頁](/zh-hk/download)選「正式版」或「除錯版」（區別見[正式版和除錯版有什麼區別？](/faq/channels.zh-HK)），點 macOS 那一行的「下載」。下載頁那一行寫著「僅支援 Apple Silicon（M 系列晶片）」，拿到的是一個 `.zip`，下載完成後會做 SHA-256 校驗。
2. 雙擊 zip 解壓，得到 `fushi.app`。**把它拖進「應用程式」資料夾**再開啟，不要直接在「下載」資料夾裡執行——應用內自動更新替換的就是 app 所在的位置，放在「應用程式」裡最省事。
3. 第一次開啟會進入新手引導：選語言和主題、勾選功能、裝推薦包、連線 Anki（Mac 上裝 Anki 桌面版 + AnkiConnect 外掛，見[怎麼連線 Anki？](/faq/anki.zh-HK)）。

GitHub Releases 裡較新的版本除了 zip 還會附一個同名的 `.dmg`，開啟後把 fushi.app 拖到旁邊的 Applications 圖示上即可，裝出來是同一個 app。

## 首次開啟提示「Apple 無法驗證」怎麼辦？

現在的 macOS 版還沒有經過 Apple 公證（用的是 ad-hoc 簽名），所以第一次開啟時 Gatekeeper 會攔下，提示「Apple 無法驗證 fushi.app 是否包含可能危害 Mac 安全或洩漏隱私的惡意軟體」。這不是包壞了，放行一次即可，任選一種：

1. 先把 fushi.app 拖進「應用程式」，雙擊開啟一次（會被攔）；然後開啟 **系統設定 → 隱私與安全性**，在頁面下方找到 fushi，點「仍要開啟」，再確認一次。
2. 或者在「終端」裡執行：

   ```bash
   xattr -dr com.apple.quarantine /Applications/fushi.app
   ```

   之後正常雙擊即可。

放行一次就夠了，之後的應用內更新不需要重複。dmg 裡也附了一份《開啟說明 How to open.txt》，寫的是同樣的步驟。

## 要給哪些系統許可權？

Fushi 只在你用到對應功能時才會請求，不用的話一個都不必給：

- **輔助功能**：「應用外查詞」（在別的 app 裡選中文字按快捷鍵查詞）要讀取其他應用中選中的文字，需要在「隱私與安全性 → 輔助功能」裡啟用 Fushi；沒授權時快捷鍵只會查剪貼簿裡的文本。用法見[全域性查詞怎麼用？](/faq/global-lookup.zh-HK)。
- **螢幕錄製**：懸浮球的截圖識字需要在「系統設定 → 隱私與安全性 → 螢幕錄製」裡允許 Fushi。

這些授權在應用內更新後會保留，不用每次更新都重新勾一遍。

## 更新和其他注意事項

- **應用內更新**：**設定 → 系統與關於** 的「更新設定」裡可以切「更新通道」、選「首選下載源」、點「檢查更新」，開啟「自動安裝更新」後新版會自動下載並替換 `/Applications` 裡的 fushi.app 再重新開啟；替換失敗會回滾到舊版本，不會留下打不開的半成品。
- **從老版本升級要手動一次**：改成只出 Apple Silicon 包的同時，安裝包檔名從 `-macos.zip` 改成了 `-macos-arm64.zip`。老版本的更新器只認舊檔名，所以它們可能會顯示「已是最新版本」——這時去下載頁手動下載一次新版，覆蓋到「應用程式」裡，之後就能正常自動更新了。
- **資料儲存位置**：桌面版可以在 **設定 → 儲存 → 資料儲存位置** 把書、漫畫、詞典和資料庫搬到外接硬碟或別的目錄，Fushi 會連同資料庫裡的路徑一起遷移。推薦包約 9.5 GB，Mac 內建硬碟小的可以考慮。
- **Galgame 捕獲只在 Windows**：Mac 上的「遊戲」頁是串流接收端，可以從已配對的 Windows 電腦啟動遊戲並串流過來，見[遊戲串流怎麼用？](/faq/game-streaming.zh-HK)。

其他平臺見 [Windows 怎麼安裝 Fushi？](/faq/windows-install.zh-HK)、[iOS 版怎麼裝？為什麼少了一些功能？](/faq/ios-limits.zh-HK)，全平臺差異見[支援哪些平臺？](/faq/platforms.zh-HK)。
