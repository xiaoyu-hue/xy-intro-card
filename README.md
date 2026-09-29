<div align="center">

<img src="https://img.shields.io/badge/license-MIT-yellow?style=for-the-badge" alt="license">
<img src="https://img.shields.io/badge/前端-零框架-4FC08D?style=for-the-badge" alt="frontend">
<img src="https://img.shields.io/badge/运行时依赖-零-6B728C?style=for-the-badge" alt="deps">
<img src="https://img.shields.io/badge/单文件-离线可用-2EA44F?style=for-the-badge" alt="offline">
<img src="https://img.shields.io/github/v/release/xiaoyu-hue/xy-intro-card?style=for-the-badge" alt="release">

**[English](./README.en.md) · 中文**

# 🪪 XY 个人介绍模板工具

> 一套**可复用的个人介绍名片生成器**：任何俱乐部 / 团队都能用，改内容即出卡，零依赖、不联网。

`XY` 是作者项目系列的命名前缀。本项目与 [`xy-club`](https://github.com/xiaoyu-hue/xy-club)（俱乐部官网模板）是**同一家族的两件可复用工具**——前者给成员做个人介绍卡，后者承载俱乐部整体站点，视觉同属液态玻璃风格，可配套使用。

> ⚠️ **XY俱乐部 只是默认演示案例，并非专属品牌。** 把演示内容换成任意俱乐部 / 团队，工具逻辑完全不变。

<br>

**[🔗 在线体验（GitHub Pages）](https://xiaoyu-hue.github.io/xy-intro-card/)** · **[📖 快速开始](#quick-start)** · **[♻️ 复用为任意俱乐部](#reuse)** · **[🙏 致谢与依赖](#credits)**

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)

</div>

---

## ✨ 特性

- **零依赖单文件**：字体、图标、头像全部内嵌，不联网也能打开，发给别人就是一张独立卡片
- **两种字段模式**：「人设卡」（名字·年龄·星座·技能·签名，适合俱乐部成员 / 陪玩官）与「通用名片」（姓名·头衔·简介·联系方式）可切换
- **主题色对齐 XY 官网**：落日金 / 深海蓝 / 极光紫 / 晨雾白（暗色液态玻璃），外加米白·晨雾 / 浅灰·云影 / 燕麦·暖调 / 藏蓝·经典（亮色商务中性），共 8 套
- **头像上传 + 自动压缩**：上传即用 `<canvas>` 压到 512px，大图不再卡死
- **实时预览 + 一键下载**：左侧填、右侧看手机效果，点一下导出独立 HTML 卡片
- **移动端优先 + 性能克制**：多断点适配、帧率不足自动降级、尊重系统「减弱动态」、手机端精简毛玻璃层数

## 🌐 在线体验

直接打开 **[https://xiaoyu-hue.github.io/xy-intro-card/](https://xiaoyu-hue.github.io/xy-intro-card/)** 即可使用，无需安装、无需注册。

> 在线版由 GitHub Pages 静态托管，**功能与本地打开文件完全一致**：工具是纯前端单文件，所有计算都在你的浏览器里完成，**不联网、不上传任何数据**（头像与填写的内容都不会离开本机）。

<a id="quick-start"></a>

## 🚀 快速开始

无需安装、无需服务器：

1. 双击打开 `个人介绍卡生成器.html`（任意现代浏览器），或直接用上面的**在线体验**链接
2. 顶部切换「人设卡 / 通用名片」
3. 通用名片模式下可选行业预设（📖 读书会 / 🍽 本地餐企 / 🏢 小型企业），一键填入中性演示数据；也可手动填写
4. 填内容、传头像、选主题色（共 8 套：4 套暗色液态玻璃 + 4 套亮色商务中性），右侧实时预览
5. 满意后点「下载这张卡片」，得到一份独立 HTML，可发给任何人

<a id="reuse"></a>

## ♻️ 复用为任意俱乐部 / 团队

1. 打开生成器，把「XY俱乐部」换成你的俱乐部 / 团队名
2. 通用名片模式下可选 3 个行业预设一键填入，或手动填写；任选 8 套主题之一
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

<a id="credits"></a>

## 🙏 致谢与依赖

> **"If I have seen further, it is by standing on the shoulders of giants."**
> 我看得更远，是因为站在巨人的肩膀上。—— 送给支撑这个项目的开源社区与开放 Web 标准。

本项目**没有引入任何第三方运行时依赖**：没有 npm 包、没有 CDN 外链、没有在线字体托管，字体与图标全部内嵌在单个 HTML 里。

### 运行时依赖

| 项目 | 协议 | 说明 |
|------|------|------|
| 无 | — | 纯原生 HTML / CSS / JavaScript，零第三方库 |

### 依赖的 Web 标准（浏览器内置能力）

| 标准 / API | 说明 |
|-----------|------|
| [Canvas API](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API) | 头像上传后压缩到 512px，避免大图卡死 |
| [Blob / `URL.createObjectURL`](https://developer.mozilla.org/zh-CN/docs/Web/API/URL/createObjectURL) | 把生成的卡片导出为独立 HTML 文件 |
| CSS [`backdrop-filter`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/backdrop-filter) | 液态玻璃（毛玻璃）质感 |
| CSS 自定义属性与 [`color-mix()`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/color_value/color-mix) | 八套主题色（4 套暗色液态玻璃 + 4 套亮色商务中性）计算与切换 |
| [`prefers-reduced-motion`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@media/prefers-reduced-motion) | 尊重系统「减弱动态」无障碍设置 |

### 视觉与设计灵感

液态玻璃（Liquid Glass）语言与 [`xy-club`](https://github.com/xiaoyu-hue/xy-club) 同源，参考当代操作系统中「材质感 + 景深」的设计取向；实现上完全依赖开放的 Web 标准，未使用任何 UI 框架。

### 特别致谢

- **浏览器内置的 Web 标准实现** —— 本项目不实现任何自研算法，压缩、导出、主题与动效全部调用浏览器原生能力。
- **所有为开源社区贡献代码、文档与时间的人。**

## 📄 许可证

[MIT](LICENSE) © 2026 xiaoyu-hue
