# 更新日志（CHANGELOG）

> 本项目遵循 [语义化版本](https://semver.org/lang/zh-CN/)（SemVer）。格式参考 [Keep a Changelog](https://keepachangelog.com/zh-CN/)。

## [2.2.0] - 2026-09-29

### refactor

- **架构优化 - SECTION 编号统一**
  - 统一 SECTION 编号为 1-11 连续编号（原编号跳跃：1→1.5→2→3→4→5→6→6.5→6.6→7→8）
  - 提升代码可读性和可维护性

- **引入 AppState 状态管理器**
  - 将分散的全局变量（`currentMode`, `currentTheme`, `avatarData`, `updateTimer`, `preview`）合并为 `AppState` 对象
  - 集中管理应用状态，便于调试和序列化
  - 所有引用已更新为 `AppState.mode/theme/avatar/timer/preview`

- **localStorage 版本迁移**
  - 新增 `STORAGE_VERSION = 'v1'` 版本号常量
  - `saveState()` 保存时写入版本号
  - `loadState()` 检测版本并降级处理旧数据
  - 旧数据无 `mode`/`palette` 字段时自动补全

- **主题色块匹配优化**
  - 为每个主题分配唯一 `key`（基于 `THEMES_CONFIG` 的 key）
  - `active` 状态判断改用 `key` 比较，避免色值相同时误判

### test

- 测试从 51 增加到 70 项（全绿）
- 新增测试 8：blob 颜色验证（暗色高饱和 vs 亮色低透明）
- 新增测试 9：内部函数导出验证（`getThemeVarValues`, `THEMES_CONFIG`）
- 新增测试 10：localStorage 版本迁移验证

### docs

- 新增 `docs/ARCHITECTURE_REVIEW.md`（架构审查报告）
- 更新 `docs/ARCHITECTURE.md`（添加 AppState 说明）
- 更新 `docs/TESTING.md`（测试数量 51→70）
- 更新 `docs/CODE_REVIEW.md`（反映所有修复）

### breaking

- 无（完全向后兼容）

---

## [2.1.0-Phase4] - 2026-09-29

### 新增

- **Phase 4 - 商务中性主题家族**
  - 扩展 `THEMES_CONFIG` 结构：每套主题新增 `mode`（`'dark'` / `'light'`）和可选 `palette` 字段
  - 新增 4 套商务中性主题：
    - **米白·晨雾**（暖米白底 + 灰蓝强调，通用商务名片首选）
    - **浅灰·云影**（冷浅灰底 + 蓝灰强调，科技/咨询类）
    - **燕麦·暖调**（奶油色底 + 棕灰强调，文化/餐饮类）
    - **藏蓝·经典**（纯白底 + 海军蓝强调，金融/法律类最正式）
  - 新增 `themeInfo(theme)` / `getThemeVarValues(theme)` / `getRootVarString(theme)` 三个函数，支持可选 theme 参数（不再强依赖全局状态）
  - 卡片 CSS 扩展 30+ 个可覆盖变量（`--bg-solid`、`--glass-*`、`--card-shadow-*`、`--chip-*`、`--pill-*`、`--sign-color`、`--foot-color`、`--avatar-*`、`--name-gradient-start` 等），默认值=原有暗色硬编码值，light 主题通过 palette 覆盖
  - 导出 HTML 的 `<meta theme-color>` 跟随主题底色（暗色 `#06060b` / 浅色 `#f7f4f0` 等）
  - 浅色主题 blob 动画：使用同色系低饱和度、低 alpha（0.14/0.09/0.07），保持"克制"感
  - UI 主题色块分组渲染：液态玻璃（暗色）/ 商务中性（浅色）两组，中间加标题分隔
  - `placeholder()` / `favicon()` 随主题切换背景填充色
  - localStorage 状态持久化支持新 `mode` / `palette` 字段，并兼容旧 JSON
  - 自定义取色器保留当前主题 mode

- **Phase 4 - 行业预设（通用名片模式）**
  - 新增 3 个中性行业预设按钮：📖 读书会 / 🍽 本地餐企 / 🏢 小型企业
  - 点击按钮一键填入完整演示数据（姓名、头衔、简介、联系方式、签名）
  - 预设与主题自由搭配，互不联动
  - 新增 `INDUSTRY_PRESETS` 常量对象与 `applyIndustryPreset(key)` 函数
  - 新增测试 7（7 个用例）验证预设数据结构与导出内容

### 测试

- 原有 31 个测试全部通过（回归保护）
- 新增 20 个测试（共 51 个）：
  - 测试 4：4 个暗色主题回归 + "不注入浅色变量"断言
  - 测试 4b：浅色商务主题 palette 完整注入
  - 测试 4c：暗色主题 meta theme-color 回归
  - 测试 7：行业预设数据结构验证 + 导出内容验证

### 变更

- API 版本升级为 `2.1.0-Phase4`
- `buildDoc()` 改为接受 `c.theme` 优先于全局 `currentTheme`，便于多主题并发测试

---

## [未发布]

### 新增

- README（中英双语）：补全顶部徽章、「在线体验」入口与「🙏 致谢与依赖」章节
- 新增 `index.html`：GitHub Pages 根路径入口页，自动跳转到生成器

### 变更

- 启用 GitHub Pages（源：`main` 分支根目录），在线体验地址：<https://xiaoyu-hue.github.io/xy-intro-card/>

---

## [2.0.0-Phase3] - 2026-09-28

### 新增

- **Phase 0 - 自动化测试门禁**
  - 新增 `tests/logic.test.js`（31 个测试用例）
  - 新增 `scripts/build-check.sh` 构建检查脚本
  - 新增 `.github/workflows/ci.yml` CI 配置
  - 新增 `Features` 工具函数（特性检测）

- **Phase 1 - 容错与包容性**
  - 新增 localStorage 持久化（防止刷新丢失）
  - 新增输入校验反馈（实时错误提示）
  - 新增 `:focus-visible` 可见焦点指示器
  - 新增高对比度模式适配（`forced-colors`）
  - 新增 ARIA 属性增强（`aria-pressed`, `aria-controls`, `aria-label`）
  - 新增文件类型校验（仅允许图片）

- **Phase 2 - 兼容性修复**
  - 增强 `backdrop-filter` 降级策略（旧浏览器禁用粒子系统）
  - 新增 iOS < 15 特殊兼容样式
  - 新增 `IntersectionObserver` 入场动画（延迟到视口可见时触发）
  - 新增 `requestIdleCallback` 降级（旧浏览器用 setTimeout 替代）

- **Phase 3 - 响应式与拓展性**
  - 新增折叠屏适配断点（768-1100px 竖屏）
  - 新增超宽屏适配（>1400px 居中布局）
  - 新增容器查询支持（配合 iframe 内嵌场景）
  - 改用 `clamp()` 流体排版替代部分固定字号
  - 主题配置外置为 `THEMES_CONFIG` JSON 结构
  - 新增模板注册表 `registerTemplate()` API
  - 新增全局 `window.XYIntroCard` API 暴露

### 变更

- 文档体系增强：更新 `docs/TESTING.md`

---

## [1.0.0] - 2026-09-27

### 新增

- 个人介绍卡生成器：左侧填表、右侧实时预览手机效果
- 两种字段模式：**人设卡**（名字·年龄·星座·技能·签名）与**通用名片**（姓名·头衔·简介·联系方式）可切换
- 四套主题色对齐 `xy-club`：落日金 / 深海蓝 / 极光紫 / 晨雾白
- 头像上传 `<canvas>` 压缩（最长边 512px、JPEG 0.85），修复大图卡死
- 一键下载独立 HTML 卡片，零依赖、不联网
- 性能策略：帧率不足自动降级、后台暂停、尊重 `prefers-reduced-motion`、移动端精简毛玻璃层数
- 与 `xy-club` 同构的文档体系：`docs/`（ARCHITECTURE / PRD / FIELDS / DEPLOY / TESTING / DOC_SYNC / DECISION_REVIEW / ADR / AUTHOR）+ 根目录治理文件（README / CHANGELOG / CONTRIBUTING / SECURITY / CODE_OF_CONDUCT / AGENTS / LICENSE），核心文档中英双语

### 默认演示案例

- XY俱乐部 · 小鱼（21 岁，巨蟹座）作为演示数据；可替换为任意俱乐部 / 团队
