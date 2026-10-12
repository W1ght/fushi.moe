---
title: "Fushi 服务端（fushi_server）是什么？怎么部署到 NAS / Linux 服务器？"
description: "fushi_server 是没有界面的 Fushi 主机，带网页管理界面（WebUI），装在 NAS、家用服务器或 VPS 上。手机和电脑用 Fushi 互联配对后，可以流播它上面的番剧、书、漫画，用它的词典查词，并把漫画 OCR、字幕识别（ASR）、番剧代下载交给它跑。附 Linux 部署与 systemd 配置步骤。"
category: "安装与配置"
order: 56
date: 2026-10-12
---

[Fushi 互联](/faq/interconnect)的常见用法是「电脑当主机、手机当客户端」。问题是电脑得一直开着：你在外面想看家里电脑上的番，电脑却睡着了。**fushi_server** 就是为这种情况准备的——一个没有图形界面的 Fushi 主机进程，跑在 NAS、家用服务器或 VPS 上，24 小时在线。

它和桌面版 Fushi 当主机时用的是**同一份**互联主机代码，所以手机、电脑上的 Fushi 不需要任何额外设置：配对一次，它在来源列表里就和一台开着主机服务的电脑一样。

## 它能做什么

| 能力 | 说明 |
|---|---|
| **媒体库主机** | 扫描服务器上的视频、书、漫画目录入库；客户端浏览、流播、同步进度；也能托管有声书与词典包 |
| **漫画整卷 OCR** | 客户端把漫画卷交给它，服务端跑检测 + 识别，回传 mokuro 结果，手机不用下载任何模型 |
| **字幕识别（ASR）** | 把音轨或服务器上的视频转录成 SRT 字幕（带逐词时间轴），见[语音转字幕](/faq/asr-subtitles) |
| **代下载** | 内置 BitTorrent 引擎（也可以外接 qBittorrent），番剧、小说、漫画、有声书下到服务器上后自动入库 |
| **内容订阅** | 追番订阅建在服务端、由服务端定期检查，手机关机也照样追更 |
| **远程查词** | 带上词典引擎时，客户端查不到的词可以去服务端查 |
| **Anki 落地** | 没装 Anki 的手机做的卡，可以经服务端写进 Anki 并同步到 Anki 同步服务器（需要随包的 Anki 同步组件） |
| **WebUI** | 浏览器里看状态、配对 PIN、管理库目录、上传文件、看任务与下载、拉模型、改设置、看日志 |

它**不做**的事：没有游戏库，也不做游戏串流；不做查词发音（本地发音库只做存储中转，供其它设备拉取）；没有发现页界面——订阅要从客户端的发现页建，或在 WebUI 里按搜索词建。

## 下载与运行环境

发布包在 GitHub 的独立仓库 [hajisensai/fushi-server](https://github.com/hajisensai/fushi-server/releases)：

- `fushi_server-<版本>-<序号>-linux-x64.tar.gz`
- `fushi_server-<版本>-<序号>-windows-x64.zip`

beta 是预发布（prerelease），正式版标为 Latest。

目标机要求：

- **Linux x86-64，glibc ≥ 2.35**（Debian 12 / Ubuntu 22.04 及以后）。内置的 BitTorrent 引擎和 OCR / ASR 用的 onnxruntime（CPU 版）都随包，不用另装 libtorrent、libssl。
- **ffmpeg / ffprobe**：视频封面抽帧、ASR 音轨解码、下载后转封装要用。不在 PATH 上时在配置文件里写 `ffmpeg:` / `ffprobe:` 的路径。
- **可选** `avahi-utils`：有 `avahi-publish` 时会在局域网广播自己，手机能自动发现；没有也能手动填地址配对。

NAS 怎么判断能不能跑：x86-64 的 NAS 只要能提供 glibc ≥ 2.35 的 Linux 环境就行——系统本身满足，或者你在 NAS 上自己建一个 Debian 12 / Ubuntu 22.04 以上的虚拟机 / 容器，把包解压进去跑。目前没有官方 Docker 镜像。**ARM 架构的 NAS 和树莓派没有现成包**，需要用 Dart SDK（≥ 3.8）自己构建：在源码的 `packages/fushi_server` 下执行 `dart pub get` 和 `dart build cli`（注意不能用 `dart compile exe`，那样打不进 sqlite3）。

## Linux 部署步骤

### 1. 解压并初始化

```bash
tar -xzf fushi_server-*-linux-x64.tar.gz -C /opt
cd /opt/fushi_server
bin/fushi_server init                # 生成 fushi_server.yaml（含随机 admin_token）
```

### 2. 编辑配置文件

打开 `fushi_server.yaml`，最重要的是 `libraries`——告诉它你的番剧、书、漫画放在哪：

```yaml
data_dir: "data"              # 数据库、互联身份、任务、日志、下载都在这
port: 38765                   # 互联端口，客户端连这个
tls: true                     # 自签证书 + 指纹校验，别关
device_name: "nas"
lan_requires_pin: true        # 配对 PIN，别关
admin_port: 38780             # WebUI 端口；0 = 关闭
metadata_locale: "zh-CN"      # 刮削资料语言
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

`kind` 可以是 `video`、`book`、`manga`。漫画目录目前认 `.mokuro` 卷和纯图片目录，cbz / cbr / pdf 暂时不扫描，这类文件仍在客户端导入。

番剧刮削（封面、简介、分集信息）和 app 用的是同一套资料源（默认主源 AniDB，TMDB 补充），但服务端**没有 app 内置的 TMDB key**，要用 TMDB 就在配置里填 `tmdb_api_key`。刮削是什么见[番剧刮削](/faq/scraping)。

### 3. 启动并首次扫描

```bash
bin/fushi_server serve --scan
```

终端会打印互联端口、TLS 指纹和 WebUI 地址。浏览器打开 `https://<服务器地址>:38780/`（自签证书，浏览器会警告一次），输入配置文件里的 `admin_token` 登录 WebUI。token 忘了用 `fushi_server admin reset-token` 重新生成。

### 4. 设成开机自启（systemd）

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

然后 `systemctl enable --now fushi_server`。

## 手机和电脑怎么连上它

在手机或电脑的 Fushi 里：**设置 → Fushi 互联 → 启用互联 → 配对与设备**，局域网里能自动发现就直接点它；发现不了就手动添加地址 `https://<服务器地址>:38765`。服务端没有弹窗可以点「允许」，所以要输 PIN：6 位 PIN 会显示在服务端终端和 WebUI 的「配对」页上，在 Fushi 里输入即完成配对。

配好之后，客户端那边的用法和连电脑主机完全一样：视频 / 书 / 漫画的来源里多一个 Fushi 互联来源；下载设置里的「下载执行设备」选服务端，番剧就下在 NAS 上；漫画 OCR 引擎里选「互联服务端」那一项，就交给已配对的服务端来跑，本机不下任何模型。

出门在外想连回家：在 WebUI「设置」页的「远程访问」卡片里填公网 / 反代 / DDNS 地址（`public_urls`），或打开 P2P 隧道（`p2p`），已配对的设备会自动学到这些地址，保存即生效、不用重启。

## 日常管理

- **WebUI**：状态、配对、库根、上传（分块断点续传，默认累计配额 50 GB，防止被当网盘用）、任务、下载、订阅、模型、设置、日志都在这里。端口、TLS、绑定地址、torrent 设置改后要重启 `serve`。
- **命令行**：`fushi_server status` 看库和配对概况，`fushi_server pair ls` / `pair revoke <peerId>` 管理已配对设备，`fushi_server models pull <语言|ocr>` 预先拉 ASR / OCR 模型。服务运行中想操作它，用 `fushi_server ctl …`（例如 `ctl scan` 重新扫描、`ctl dl` 看下载队列、`ctl logs -f` 跟日志）；直接打开数据库的离线命令在 `serve` 运行时会被拒绝，这是为了防止并发写坏数据库。
- **GPU 加速**：随包的是 CPU 版 onnxruntime。有 NVIDIA 显卡的话，可以换 GPU 版 onnxruntime（≥ 1.22，配 CUDA 12.x + cuDNN 9），在配置里用 `onnxruntime_library` 指过去，重启后 `fushi_server models status` 会显示 `cuda`；探测失败会自动退回 CPU。

## 常见问题

- **手机发现不了服务端**：多半是没装 avahi，或路由器开了 AP 隔离 / 访客网络。直接手动填 `https://<IP>:38765`。
- **TMDB 一直不可用**：服务端没有内置 key，要自己在配置里填 `tmdb_api_key`，改了重启。
- **Windows 能跑吗**：能，有 `windows-x64` 包；但常开的家用服务器一般是 Linux / NAS，这篇以 Linux 为例。
- **和桌面版 Fushi 当主机有什么区别**：媒体库、互联、下载这些主机能力是同一套，服务端多了 WebUI 和命令行、适合常开；少了图形界面、游戏库和游戏串流。
- 更完整的配置项与命令说明见源码里的 [fushi_server README](https://github.com/hajisensai/Fushi/blob/develop/packages/fushi_server/README.md)。数据迁移与备份见[怎么备份和迁移数据](/faq/backup)。
