# 架构说明（ARCHITECTURE）

> 本文描述 `个人介绍卡生成器.html` 的内部结构、渲染与导出机制、主题色计算与性能策略。改结构或导出逻辑前先读本文。

## 1. 单文件结构

整个生成器是**一个 HTML 文件**，分段内联：

```
<!DOCTYPE html>
<html>
  <head>
    <style> /* 生成器 UI 样式 + CARD_CSS（导出卡片的样式，存于 JS 常量） */ </style>
  </head>
  <body>
    <!-- 左侧表单 + 右侧预览 iframe + 顶部模式/主题切换 -->
    <script> /* 配置读取、主题计算、实时预览、buildDoc 导出 */ </script>
  </body>
</html>
```

- **零构建、零依赖**：无 npm、无打包器、无外链资源。
- **自包含**：字体走系统回退（Mac/iOS 花体 → Windows 手写体），图标用内联 SVG，头像可选内联 base64。

## 2. 代码分段（Sections）

| Section | 职责 | 关键函数/变量 |
|---|---|---|
| SECTION 1 | 工具函数 | `esc()`, `splitCsv()`, `hexToRgb()`, `lighten()`, `getHue()` |
| SECTION 1.5 | 特性检测 | `Features` 对象 |
| SECTION 2 | 常量配置 | `ZODIAC`, `THEMES_CONFIG`, `THEMES`, `registerTemplate()` |
| SECTION 3 | 状态管理 | `currentMode`, `currentTheme`, `avatarData` |
| SECTION 4 | 配置读取 | `readCfg()` |
| SECTION 5 | 渲染逻辑 | `themeInfo()`, `buildCardInner()`, `buildDoc()` |
| SECTION 6 | 预览更新 | `loadPreview()`, `updatePreview()`, `scheduleUpdate()`, `setMode()` |
| SECTION 6.5 | 本地持久化 | `saveState()`, `loadState()` |
| SECTION 6.6 | 输入校验 | `addInputFeedback()` |
| SECTION 7 | 交互绑定 | `setup()` |
| SECTION 8 | 全局 API | `window.XYIntroCard` |

## 3. 渲染机制（实时预览）

- 左侧表单的每个输入绑定 `input` 事件，改动即调用 `render()`。
- `render()` 读取所有字段 → 组装配置对象 `cfg` → 调 `buildCardInner(cfg)` 生成卡片 HTML 片段 → 写入右侧 `<iframe>` 的 `srcdoc`。
- 预览 iframe 内联了 `CARD_CSS` 与一段轻量入场动画脚本，使预览与最终导出卡视觉一致。

## 4. 主题色计算（themeInfo）

- 主题色由 `currentTheme = { a, b }`（主色 + 浅色）驱动。
- `themeInfo()` 据此推导：
  - `--amber` / `--amber-2` 注入卡片；
  - 光斑（blob）颜色由 `getHue(a)` 取主色色相，配合 `lighten()` / `hslToRgb()` 生成半透明 RGBA；
  - 文字深浅按主色亮度自动选择，保证对比度。
- 四套预设（落日金 / 深海蓝 / 极光紫 / 晨雾白）与 `xy-club` 四套主题同名同色，便于两个项目配套时视觉统一。

## 5. 导出逻辑（buildDoc）

`buildDoc(cfg, { animate })` 产出一份**独立可运行的 HTML 卡片**：

1. 取 `CARD_CSS`（卡片样式常量）；
2. 注入主题变量与光斑颜色；
3. 按 `cfg.mode`（oc / general）选择字段模板；
4. 转义所有用户输入（`esc()`）防 XSS；
5. 头像：有上传数据用压缩后的 base64，否则生成「主题色 + 首字」SVG 占位；
6. 拼接 `<!DOCTYPE html>` + `<style>` + 卡片 DOM + 内联动画脚本（脚本中 `</script>` 写作 `<\/script>` 避免提前闭合）。

导出卡**不依赖生成器本文件**，可单独发给任何人、任意浏览器打开。

## 6. 头像压缩

`handleAvatar(file)`：

- 用 `FileReader` 读图 → 画进 `<canvas>`，最长边缩放到 **512px**，导出 **JPEG quality 0.85**；
- 典型 2400×2400 原图（2–5MB）压到约 **10KB**；
- 修复了早期「整图 base64 直接塞预览导致大图卡死」的问题。

## 7. 性能策略

- **帧率自适应**：`requestAnimationFrame` 监测帧率，低于阈值自动切 `.lite` 降级（减少毛玻璃层数 / 关闭呼吸动画）。
- **后台暂停**：`visibilitychange` 隐藏时暂停动画。
- **尊重系统偏好**：`prefers-reduced-motion` 时关闭入场 / 呼吸动画。
- **移动端精简**：手机端把毛玻璃层数从 5 降到 1，降低 GPU 压力。
- **入场顺序可控**：用 `--i` 序号控制卡片元素出场顺序，新增内容只需补序号，不打乱动画节奏。
- **IntersectionObserver**：卡片进入视口后才触发入场动画，避免滚动前动画已开始。
- **requestIdleCallback 降级**：粒子系统初始化延迟到浏览器空闲时执行，低配设备更流畅。

## 8. 兼容性策略

- **Feature Detection**：`Features` 对象统一检测 API 支持情况。
- **backdrop-filter 降级**：`@supports not (backdrop-filter)` 块内纯色背景 + 透明度提升，旧浏览器不崩溃。
- **iOS < 15 特殊处理**：使用 `-webkit-backdrop-filter` 前缀确保兼容。
- **容器查询**：`@container` 配合 iframe 内嵌场景，卡片尺寸自适应父容器。
- **高对比度模式**：`@media (forced-colors: active)` 禁用装饰性动画，使用系统颜色。

## 9. 无障碍策略

- **键盘导航**：`:focus-visible` 可见焦点指示器，所有交互元素可通过 Tab 键访问。
- **ARIA 属性**：模式切换按钮使用 `aria-pressed` / `aria-controls`，预览 iframe 使用 `title` 和 `aria-label`。
- **屏幕阅读器**：装饰性元素使用 `aria-hidden="true"`，语义化标签正确使用。
- **高对比度适配**：强制色彩模式下禁用渐变和动画，使用系统颜色。

## 10. 本地持久化

- **自动保存**：`scheduleUpdate()` 后调用 `saveState()`，表单状态写入 localStorage。
- **自动恢复**：`setup()` 时调用 `loadState()`，刷新页面后恢复上次编辑状态。
- **安全限制**：头像 dataURL 过大不保存，避免超出 quota。

## 11. 拓展性设计

- **模板注册表**：`CARD_TEMPLATES` 对象 + `registerTemplate()` 函数，未来可动态注册新卡片风格。
- **主题配置外置**：`THEMES_CONFIG` JSON 结构，未来可从 CDN 加载。
- **全局 API**：`window.XYIntroCard` 暴露插件钩子，供外部扩展使用。

## 12. 测试体系

详见 [`docs/TESTING.md`](TESTING.md)。

| 层 | 方法 | 依赖 | 说明 |
|---|---|---|---|
| 逻辑校验 | Node 提取 `<script>` + DOM 桩，跑 `buildDoc` | Node 18+ | 验证导出 HTML 结构 / 字段 / 主题注入 / XSS 防护 |
| 构建检查 | `scripts/build-check.sh` | grep, wc | 验证文件完整性、HTML 结构、CSP 安全策略 |
| CI 门禁 | `.github/workflows/ci.yml` | GitHub Actions | 每次 push/PR 自动运行上述两层 |

## 13. 与 xy-club 的关系

| 维度 | xy-club（官网模板） | 本项目（名片工具） |
|---|---|---|
| 形态 | Node 服务 + 数据驱动官网 + 后台 | 纯前端单文件生成器 |
| 产物 | 俱乐部整站 | 成员个人介绍卡 |
| 视觉 | 液态玻璃 | 液态玻璃（同源风格） |
| 主题 | 4 套（aurora/ocean/mist/sunset） | 4 套同名同色 |
| 复用方式 | 改 JSON 内容 | 改表单内容导出 |
