# VPS 自动更新部署（cron 拉取）

> 本文面向**运维**：把生产站 `https://tokenfleet.cn` 部署到自己 VPS 上的管理员。
> 与 [`docs/release-distribution.md`](release-distribution.md) 配套阅读——前者讲
> 「产物契约」（Release 附件长什么样、怎么手动消费），本文讲「怎么让 VPS 自动消费」。

## 背景

- 每次 push 到 `main`，`.github/workflows/release-dist.yml` 自动构建 `dist/` 并发布为
  GitHub Release 附件：固定文件名 + `releases/latest` 固定 URL、**匿名可下载**、
  带 SHA256 校验文件、仅保留最近 10 个。
- 本方案在 VPS 上用 cron 轮询最新 Release：有新版才下载 → SHA256 校验 → 解压到新目录
  → 符号链接原子切换。全程**无需任何凭证**，VPS 与 GitHub 之间只有匿名公开下载，
  VPS 不需要公网入站端口。
- 更新节奏：模型目录由 `sync-models` workflow 每日 22:00 UTC 同步一次，PR 合并后才会
  发新 Release，因此 **30 分钟轮询**足够，实际更新延迟最多半小时。

## 目录布局

部署根目录默认 `/opt/tokenfleet`（可用环境变量 `TF_BASE` 覆盖，见「安装步骤」）：

```
/opt/tokenfleet/
├── releases/                 各版本站点根，按 Release tag 分目录
│   ├── dist-20260810-123/
│   └── dist-20260811-130/
├── current → releases/dist-20260811-130/   ← 符号链接，web 服务器 root 指向这里
├── .staging/                 下载与校验临时区（失败时残留，便于排查）
└── .deployed-tag             已部署版本标记（内容为 Release tag）
```

web 服务器（如 nginx）的站点 root 配置为 `/opt/tokenfleet/current` 即可。站点是纯静态
Astro 产物，符号链接切换后**无需重启任何服务**。

## 安装步骤

1. 前置依赖：`curl`、`unzip`、`sha256sum`（coreutils 自带）。Debian/Ubuntu 若缺
   `unzip`：`sudo apt install unzip`。脚本是 bash，需要 bash ≥ 4。
2. 取得脚本（仓库公开，直接下载原始文件即可，无需登录）：

   ```bash
   sudo curl -fsSL -o /usr/local/bin/vps-update.sh \
     https://raw.githubusercontent.com/Sallyn0225/tokenfleet-landing/main/scripts/vps-update.sh
   sudo chmod +x /usr/local/bin/vps-update.sh
   ```

3. 首次手动运行（此时无 `.deployed-tag`，会执行一次完整拉取 + 部署，约几秒到几十秒）：

   ```bash
   /usr/local/bin/vps-update.sh
   ```

   成功后检查：`cat /opt/tokenfleet/.deployed-tag` 输出最新 tag；`ls /opt/tokenfleet/current`
   能看到站点文件（`index.html`、`models/`、`_assets/` …）。

4. 配置 cron（root 的 crontab；脚本会创建 `/opt/tokenfleet` 下所有目录，需写权限）：

   ```bash
   sudo crontab -e
   ```

   加入一行：

   ```cron
   */30 * * * * /usr/local/bin/vps-update.sh >> /var/log/tokenfleet-update.log 2>&1
   ```

   日志里**只出现部署动作**：无更新时脚本静默退出，不会刷屏。

5. （可选）需要换部署目录或 fork 仓库时，用环境变量覆盖默认值：

   ```cron
   */30 * * * * TF_BASE=/srv/tokenfleet TF_REPO=你的名字/tokenfleet-landing \
     /usr/local/bin/vps-update.sh >> /var/log/tokenfleet-update.log 2>&1
   ```

## nginx 衔接示例

```nginx
server {
    listen 80;
    server_name 你的域名;
    root /opt/tokenfleet/current;   # 跟随符号链接，更新即生效
    index index.html;
}
```

## （可选）改用 systemd timer

cron 足以覆盖本场景；若服务器已有 systemd 惯例，可改用 timer（journald 记录日志、
开机后自动补跑一次）。两个 unit 文件：

```ini
# /etc/systemd/system/tokenfleet-update.service
[Unit]
Description=Tokenfleet static site auto-update

[Service]
Type=oneshot
ExecStart=/usr/local/bin/vps-update.sh
```

```ini
# /etc/systemd/system/tokenfleet-update.timer
[Unit]
Description=Run tokenfleet auto-update every 30 minutes

[Timer]
OnBootSec=5min
OnUnitActiveSec=30min

[Install]
WantedBy=timers.target
```

启用并查看日志：

```bash
sudo systemctl enable --now tokenfleet-update.timer
journalctl -u tokenfleet-update.service
```

## 回滚

脚本保留最近 3 个版本（更旧的自动清理，`current` 指向的版本不受影响）。回滚一条命令：

```bash
ln -sfn /opt/tokenfleet/releases/<旧tag> /opt/tokenfleet/current
```

> 需要回滚到更早版本时：GitHub Releases 仅保留最近 10 个，更早的联系维护者从源码
> 重新构建。回滚后 `.deployed-tag` 仍是新 tag，下次轮询会把站点切回最新——如确需
> 停留在旧版，把回滚后的 tag 写进 `/opt/tokenfleet/.deployed-tag` 即可。

## 常见问题

| 现象                     | 说明                                                                                                                                         |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| 日志出现 SHA256 校验失败 | 下载不完整或被篡改；脚本此时**不会部署**，站点保持旧版本。重新运行一次，仍失败则联系维护者（`/opt/tokenfleet/.staging/` 残留文件可作证据）。 |
| GitHub API 报限流        | 匿名 API 限额 60 次/小时，30 分钟轮询每天仅 48 次，远低于限额；限流说明请求来源 IP 被他人共享，稍后自动恢复。                                |
| 部署后页面 403 / 404     | 检查 web 服务器用户对 `/opt/tokenfleet` 及 `releases` 各目录有读 + 执行（x）权限（目录需要 x 才能进入）。                                    |
| 部署后页面没变化         | 核对 `/opt/tokenfleet/.deployed-tag` 与 Release 正文记录的 commit SHA、构建时间（UTC / CST）、模型数量，确认部署的是预期版本。               |
| 更新有延迟               | 最长延迟 ≈ 轮询间隔 + Release 发布到下一次轮询的等待，默认 ≤ 30 分钟。模型目录每日只在 22:00 UTC 同步一次，这是设计内的节奏。                |
