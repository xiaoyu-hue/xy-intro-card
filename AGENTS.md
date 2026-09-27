# AGENTS.md — AI Agent 协作规则

> 本文件供 AI 编码 / 协作 Agent 阅读，确保对本项目的改动符合约定。

## 项目本质

- 纯前端**单文件**工具：**零依赖、零构建、不收集数据**。
- 与 [`xy-club`](https://github.com/xiaoyu-hue/xy-club) 同属 **XY 系列**，视觉同源（液态玻璃），主题色对齐。

## 底线（红线）

1. 不得引入前端框架 / 打包器 / 运行时依赖（破坏零构建）。
2. 不得外链第三方资源、不得收集或上传用户数据。
3. 不得移除「导出卡独立可运行、不联网」的能力。

## 改动纪律

- 改字段前先读 [`FIELDS.md`](docs/FIELDS.md)；改导出逻辑先读 [`ARCHITECTURE.md`](docs/ARCHITECTURE.md) §4。
- 任何改动须过 [`DECISION_REVIEW.md`](docs/DECISION_REVIEW.md)（发版 / 不可逆操作前必过）。
- 改动后须同步文档（见 [`DOC_SYNC.md`](docs/DOC_SYNC.md) §2 同步清单）并更新 [`CHANGELOG.md`](CHANGELOG.md)。
- 提交信息用 Conventional Commits（`feat:` / `fix:` / `docs:` / `chore:`）。

## 验证

- 逻辑改动跑 [`TESTING.md`](docs/TESTING.md) §2 的 Node 校验。
- 视觉改动补 [`TESTING.md`](docs/TESTING.md) §3 截图。
- 不擅自加自动化测试框架；若引入须先过决策审查并记 ADR。

## 与用户协作

用户是非技术决策者：结论先行、术语解释、如实说明不确定性、不可逆操作先征同意。
