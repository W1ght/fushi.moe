---
title: "macOS 怎么安装 Fushi？Intel Mac 能用吗？"
description: "macOS 版只支持 Apple Silicon（M 系列芯片），需 macOS 13.4 及以上，Intel Mac 不再支持。下载 zip 解压、拖进「应用程序」，首次打开被 Gatekeeper 拦时在「隐私与安全性」里点「仍要打开」。之后应用内自动更新，看番学日语、读书查词、Anki 制卡都和其他平台一样。"
category: "安装与配置"
order: 41.3
date: 2026-10-12
---

先看芯片：Fushi 的 macOS 版**只支持 Apple Silicon**（M1 / M2 / M3 / M4 等 M 系列芯片），**Intel Mac 不再支持**。系统版本需要 **macOS 13.4 或更新**。

不确定自己是哪种 Mac：点屏幕左上角苹果菜单 →「关于本机」，「芯片」一栏写着 Apple M… 就是 Apple Silicon；如果写的是「处理器 Intel …」，那就是 Intel Mac。

## Intel Mac 还能装吗？

从 2026 年 10 月起，macOS 版的程序本体和随包的原生组件（互联 P2P、内置 BT 引擎、Anki 同步、精简版 ffmpeg、Mihon 扩展运行时等）全部只编 arm64 一种架构，发布流程里有一道检查专门确认 app 里没有混进别的架构。以前发的是同时含 Intel 和 Apple Silicon 的通用包，现在这条路线已经停掉：Intel Mac 上打不开新版，Intel 宿主上的构建脚本也会直接报错退出，自己编译同样走不通。

Intel Mac 用户的替代办法是换一台设备当主力：手机、平板（[Android](/faq/android-install) 或 [iOS](/faq/ios-limits)）都能装；书库很大的话，放在 Windows 电脑或 NAS 上的 [Fushi 服务端](/faq/server)里，再用 [Fushi 互联](/faq/interconnect)让手机 / 平板浏览、拉流、同步进度。注意 Fushi 的浏览器扩展要配合本机运行的桌面版 Fushi 使用（查词用的是 app 里的词典），所以它也帮不了 Intel Mac，见[浏览器里怎么查词？](/faq/browser-lookup)。

## 安装步骤

1. 在[下载页](/zh-cn/download)选「正式版」或「调试版」（区别见[正式版和调试版有什么区别？](/faq/channels)），点 macOS 那一行的「下载」。下载页那一行写着「仅支持 Apple Silicon（M 系列芯片）」，拿到的是一个 `.zip`，下载完成后会做 SHA-256 校验。
2. 双击 zip 解压，得到 `fushi.app`。**把它拖进「应用程序」文件夹**再打开，不要直接在「下载」文件夹里运行——应用内自动更新替换的就是 app 所在的位置，放在「应用程序」里最省事。
3. 第一次打开会进入新手引导：选语言和主题、勾选功能、装推荐包、连接 Anki（Mac 上装 Anki 桌面版 + AnkiConnect 插件，见[怎么连接 Anki？](/faq/anki)）。

GitHub Releases 里较新的版本除了 zip 还会附一个同名的 `.dmg`，打开后把 fushi.app 拖到旁边的 Applications 图标上即可，装出来是同一个 app。

## 首次打开提示「Apple 无法验证」怎么办？

现在的 macOS 版还没有经过 Apple 公证（用的是 ad-hoc 签名），所以第一次打开时 Gatekeeper 会拦下，提示「Apple 无法验证 fushi.app 是否包含可能危害 Mac 安全或泄漏隐私的恶意软件」。这不是包坏了，放行一次即可，任选一种：

1. 先把 fushi.app 拖进「应用程序」，双击打开一次（会被拦）；然后打开 **系统设置 → 隐私与安全性**，在页面下方找到 fushi，点「仍要打开」，再确认一次。
2. 或者在「终端」里执行：

   ```bash
   xattr -dr com.apple.quarantine /Applications/fushi.app
   ```

   之后正常双击即可。

放行一次就够了，之后的应用内更新不需要重复。dmg 里也附了一份《打开说明 How to open.txt》，写的是同样的步骤。

## 要给哪些系统权限？

Fushi 只在你用到对应功能时才会请求，不用的话一个都不必给：

- **辅助功能**：「应用外查词」（在别的 app 里选中文字按快捷键查词）要读取其他应用中选中的文字，需要在「隐私与安全性 → 辅助功能」里启用 Fushi；没授权时快捷键只会查剪贴板里的文本。用法见[全局查词怎么用？](/faq/global-lookup)。
- **屏幕录制**：悬浮球的截屏识字需要在「系统设置 → 隐私与安全性 → 屏幕录制」里允许 Fushi。

这些授权在应用内更新后会保留，不用每次更新都重新勾一遍。

## 更新和其他注意事项

- **应用内更新**：**设置 → 系统与关于** 的「更新设置」里可以切「更新通道」、选「首选下载源」、点「检查更新」，打开「自动安装更新」后新版会自动下载并替换 `/Applications` 里的 fushi.app 再重新打开；替换失败会回滚到旧版本，不会留下打不开的半成品。
- **从老版本升级要手动一次**：改成只出 Apple Silicon 包的同时，安装包文件名从 `-macos.zip` 改成了 `-macos-arm64.zip`。老版本的更新器只认旧文件名，所以它们可能会显示「已是最新版本」——这时去下载页手动下载一次新版，覆盖到「应用程序」里，之后就能正常自动更新了。
- **数据存储位置**：桌面版可以在 **设置 → 存储 → 数据存储位置** 把书、漫画、词典和数据库搬到外接硬盘或别的目录，Fushi 会连同数据库里的路径一起迁移。推荐包约 9.5 GB，Mac 内置硬盘小的可以考虑。
- **Galgame 捕获只在 Windows**：Mac 上的「游戏」页是串流接收端，可以从已配对的 Windows 电脑启动游戏并串流过来，见[游戏串流怎么用？](/faq/game-streaming)。

其他平台见 [Windows 怎么安装 Fushi？](/faq/windows-install)、[iOS 版怎么装？为什么少了一些功能？](/faq/ios-limits)，全平台差异见[支持哪些平台？](/faq/platforms)。
