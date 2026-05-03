# say-my-life-next

基于 [VitePress](https://vitepress.dev/) 的个人博客 / 文档站点。

## 开发

```bash
pnpm install
pnpm dev
```

本地访问开发服务器（默认端口以终端输出为准）。

## 构建与预览

```bash
pnpm build
pnpm preview
```

构建产物输出到 `docs/.vitepress/dist`。

## 类型检查

```bash
pnpm typecheck
```

## 本地脚本服务（创建文章 / 转发掘金等）

与站点静态构建无关的本地工具，默认监听 `3000` 端口：

```bash
pnpm serves
```

对应代码在 [`scripts/express/`](scripts/express/)（创建 Markdown、掘金正文抓取、大文件上传示例等）。

## 目录说明

| 路径 | 说明 |
|------|------|
| `docs/` | 文档根目录；`docs/public` 为静态资源（构建时拷贝到站点根路径） |
| `docs/.vitepress/` | VitePress 配置、主题、插件与样式 |
| `docs/views/` | 各栏目 Markdown 内容 |
| `scripts/express/` | 本地 Node 工具服务 |

## 部署（GitHub Pages 等）

1. 执行 `pnpm build`。
2. 将 `docs/.vitepress/dist` 目录内容部署到静态托管（如 `gh-pages` 分支或 GitHub Actions `peaceiris/actions-gh-pages`）。

若站点不在域名根路径，请在 `docs/.vitepress/config.ts` 中配置 `base`。
