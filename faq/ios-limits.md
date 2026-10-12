---
title: "iOS 版怎么装？为什么 iPhone 上没有「发现」和在线源？"
description: "iPhone / iPad 通过 TestFlight 安装 Fushi，需 iOS 15.1 及以上。按 App Store 审核规定，iOS 版没有「浏览」模块：发现页、在线漫画 / 视频 / 小说源和下载中心都不提供；本地导入的轻小说、漫画、番剧照常看，查词、Anki 制卡、媒体服务器、互联都在，游戏页是串流接收端。"
category: "安装与配置"
order: 41.4
date: 2026-10-12
---

iPhone 和 iPad 上的 Fushi 通过 **TestFlight** 安装，系统需要 **iOS 15.1 或更新**。它和其他平台是同一套界面、同一套阅读器和播放器，但按 App Store 的规定少了几类功能——下面先讲怎么装，再把少了什么、为什么少、怎么绕一一说清。

## 怎么在 iPhone / iPad 上安装？

1. 在 App Store 里装苹果官方的 **TestFlight** 应用。
2. 在 iPhone / iPad 上打开 Fushi 的 TestFlight 公开邀请链接：[testflight.apple.com/join/j88d69jx](https://testflight.apple.com/join/j88d69jx)（[下载页](/zh-cn/download) iOS 一行写的也是「通过 TestFlight 安装」）。
3. 在 TestFlight 里点「接受」→「安装」，装好后桌面上就有 Fushi 了。
4. 第一次打开进入新手引导：选语言和主题、勾选功能、装推荐包、连接 AnkiMobile。制卡在 iOS 上连的是 AnkiMobile，见[怎么连接 Anki？](/faq/anki)。

**更新**：新版本经 TestFlight 推送，比其他平台通常晚几天（要走 Apple 的处理流程）。在 Fushi 的 **设置 → 系统与关于** 点「检查更新」，发现新版会给你一个「打开 TestFlight」的按钮，跳过去点更新即可；iOS 不支持应用内直接安装，所以没有「自动安装更新」开关。

GitHub Releases 里另有一个 `fushi-<版本>-ios.ipa`，那是**未签名**的包，只给会自己签名侧载的用户用；普通用户走 TestFlight 就好。侧载装的版本功能和 TestFlight 版一样，下面说的限制同样存在。

## iOS 版少了哪些功能？

iOS 版没有「浏览」模块。具体来说，下面这几类在 iPhone / iPad 上都不提供：

| 少了什么 | 其他平台上它是什么 |
|---|---|
| **发现** | 「浏览」模块的「发现」页签，以及各库页（书架、漫画库、视频库、游戏）里的「发现」子标签；内置的外部发现源、视频资源索引器，连你自己配置的 OPDS 服务器也在这里 |
| **在线漫画源** | Mihon 扩展、mokuro.moe 卷下载，见[怎么在线看漫画并识别文字制卡？](/faq/manga-online) |
| **在线视频源** | Aniyomi 扩展，见[怎么用视频源在线看番剧？](/faq/anime-online) |
| **在线小说源** | LNReader 插件 |
| **下载中心** | BT / 磁力 / 直链下载队列，以及外接 qBittorrent |
| **蓝光 AACS 解密** | 加密的蓝光原盘不能直接播（已解密的副本、未加密的原盘照常播放） |

依附在发现页上的「AI 下载」也随之没有，见[AI 下载是什么？](/faq/ai-download)。

## 为什么少了？不是 iOS 做不到

这几样都不是技术上做不到——同一份代码在 Android、Windows、macOS 上都在跑。原因是 **App Store 审核指南不允许**这些形态：内置的第三方内容索引和种子源、能在运行时加载任意第三方扩展仓库的内容源宿主（Mihon / Aniyomi 扩展、LNReader 插件这类，插件本身就是第三方代码）、通用的 BT / 磁力下载器，以及解除光盘复制保护，都是会被拒绝上架的类型。

所以 Fushi 的做法是：只在 iOS 构建里把这几类能力整体拿掉，其他四个平台不走商店分发，完全不受影响。判断依据是「这是不是 iOS」，和你从 TestFlight 还是侧载装的无关。

## iOS 上保留了什么？

除了上面那张表，其他功能和别的平台一样：

- **本地导入和阅读 / 播放**：EPUB 轻小说、漫画、本地视频和番剧、有声书都能导入，阅读器、视频播放器、点词查词、双语字幕都在。
- **词典与制卡**：导入词典、推荐包、查词弹窗、连 AnkiMobile 一键制卡（带原句、截图、原声音频），见[装好之后怎么边看番边制卡？](/faq/first-card)。
- **媒体服务器**：Jellyfin / Emby / Plex 照常连接、浏览、播放，见[Jellyfin、Emby、Plex 是什么？](/faq/media-servers)。
- **Fushi 互联**：和电脑或 [Fushi 服务端](/faq/server)配对，浏览对方的媒体库、拉流播放、同步进度和备份。
- **游戏页是串流接收端**：Galgame 文本 / 语音捕获只在 Windows 上；iPhone / iPad 上的「游戏」页列出已配对 Windows 电脑的游戏库，可以远程启动游戏并把画面串流过来玩，制卡由电脑那边完成。

## 想在 iPhone 上看在线内容怎么办？

最顺的办法是让另一台设备当「源头」，iPhone 只负责看：

1. 在 Windows / Mac 电脑上的 Fushi 里用在线源或下载功能把书、漫画、番剧拿到本地媒体库；家里有 NAS 的，也可以交给 NAS 上的 [Fushi 服务端](/faq/server)代下载并入库。
2. 让那台电脑或服务端当主机，用 [Fushi 互联](/faq/interconnect)把 iPhone 和它配对（iOS 只能当客户端），iPhone 上直接浏览对方的库、拉流播放、同步进度。
3. 或者把内容放进你自己的 Jellyfin / Emby / Plex，在 iPhone 上当媒体服务器看。

这样 iPhone 上用的都是「你自己的库」，不触碰审核限制，查词制卡体验也完全一样。全平台差异总览见[支持哪些平台？](/faq/platforms)，其他平台的装法见 [Android 怎么安装 Fushi？](/faq/android-install)、[macOS 怎么安装 Fushi？](/faq/macos-install)。
