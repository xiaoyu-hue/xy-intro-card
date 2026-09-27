# 🪪 XY 个人介绍模板工具

> 一套**可复用的个人介绍名片生成器**：任何俱乐部 / 团队都能用，改内容即出卡，零依赖、不联网。

`XY` 是作者项目系列的命名前缀。本项目与 [`xy-club`](https://github.com/xiaoyu-hue/xy-club)（俱乐部官网模板）是**同一家族的两件可复用工具**——前者给成员做个人介绍卡，后者承载俱乐部整体站点，视觉同属液态玻璃风格，可配套使用。

> ⚠️ **XY俱乐部 只是默认演示案例，并非专属品牌。** 把演示内容换成任意俱乐部 / 团队，工具逻辑完全不变。

## ✨ 特性

- **零依赖单文件**：字体、图标、头像全部内嵌，不联网也能打开，发给别人就是一张独立卡片
- **两种字段模式**：「人设卡」（名字·年龄·星座·技能·签名，适合俱乐部成员 / 陪玩官）与「通用名片」（姓名·头衔·简介·联系方式）可切换
- **主题色对齐 XY 官网**：落日金 / 深海蓝 / 极光紫 / 晨雾白，与 `xy-club` 四套主题同名同色
- **头像上传 + 自动压缩**：上传即用 `<canvas>` 压到 512px，大图不再卡死
- **实时预览 + 一键下载**：左侧填、右侧看手机效果，点一下导出独立 HTML 卡片
- **移动端优先 + 性能克制**：多断点适配、帧率不足自动降级、尊重系统「减弱动态」、手机端精简毛玻璃层数

## 🚀 快速开始

无需安装、无需服务器：

1. 双击打开 `个人介绍卡生成器.html`（任意现代浏览器）
2. 顶部切换「人设卡 / 通用名片」
3. 填内容、传头像、选主题色，右侧实时预览
4. 满意后点「下载这张卡片」，得到一份独立 HTML，可发给任何人

## ♻️ 复用为任意俱乐部 / 团队

1. 打开生成器，把「XY俱乐部」换成你的俱乐部 / 团队名
2. 改名字、年龄 / 头衔、技能 / 联系方式、签名与主题色
3. 为每位成员重复导出，即得一套统一风格的名片

## 📚 文档

完整文档体系见 [`docs/README.md`](docs/README.md)：

| 文档 | 内容 |
|---|---|
| [`docs/README.md`](docs/README.md) | 文档索引 |
| [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) | 架构：单文件结构、渲染机制、主题色计算、导出逻辑、性能策略 |
| [`docs/PRD.md`](docs/PRD.md) | 产品需求：定位、功能、字段规范、验收标准 |
| [`docs/FIELDS.md`](docs/FIELDS.md) | 两种模式字段参考（改数据结构前必读） |
| [`docs/DEPLOY.md`](docs/DEPLOY.md) | 分发与托管：单文件分发 / 静态托管 |
| [`docs/TESTING.md`](docs/TESTING.md) | 验证方式：浏览器手测 + 无头截图 + Node 逻辑校验 |
| [`docs/DOC_SYNC.md`](docs/DOC_SYNC.md) | 文档与版本同步规范 |
| [`docs/DECISION_REVIEW.md`](docs/DECISION_REVIEW.md) | 决策审查清单（发版 / 不可逆操作前必过） |
| [`docs/adr/README.md`](docs/adr/README.md) | 架构决策记录（ADR）索引 |
| [`docs/AUTHOR.md`](docs/AUTHOR.md) | 关于作者 |

根目录治理文件：[`CHANGELOG`](CHANGELOG.md) · [`CONTRIBUTING`](CONTRIBUTING.md) · [`SECURITY`](SECURITY.md) · [`CODE_OF_CONDUCT`](CODE_OF_CONDUCT.md) · [`AGENTS`](AGENTS.md) · [`LICENSE`](LICENSE)

## ⚠️ 不适合什么场景

- 需要后端存储 / 多人在线协作编辑（本工具是纯前端单文件，数据不出本地）
- 需要复杂动画 / 3D（刻意保持轻量优先）
- 需要服务端鉴权（无后端）

## 📄 许可证

[MIT](LICENSE) © 2026 xiaoyu-hue
