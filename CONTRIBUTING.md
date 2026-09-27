# 贡献指南（CONTRIBUTING）

欢迎 Issue 与 PR。参与前请先阅读 [行为准则](CODE_OF_CONDUCT.md)。

## 开始

1. Fork 本仓库并创建分支：`git checkout -b feature/xxx`
2. 改动后跑验证（见 [`docs/TESTING.md`](docs/TESTING.md)）
3. 提交信息用 Conventional Commits（`feat:` / `fix:` / `docs:` / `chore:`）
4. 发起 Pull Request 并说明改动动机

## 两条红线

1. **保持零依赖、零构建**：不引入 React / Vue / 打包器 / 运行时依赖。
2. **保持零数据收集**：不向外发送用户内容，所有数据仅留本地。

## 文档同步

任何改动须同步 [`README.md`](README.md) / [`docs/FIELDS.md`](docs/FIELDS.md) / [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) / [`CHANGELOG.md`](CHANGELOG.md)，规则见 [`docs/DOC_SYNC.md`](docs/DOC_SYNC.md)。

## 决策审查

发版或不可逆操作（公开仓库、删文件、覆盖代码）前，须过 [`docs/DECISION_REVIEW.md`](docs/DECISION_REVIEW.md)。

## 代码规范

- 保持单文件结构：HTML 内联 `<style>` 与 `<script>`。
- 用户输入必须经 `esc()` 转义后入 DOM。
- 新增可选功能优先「不破坏旧卡片兼容性」。
