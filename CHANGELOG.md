# 更新日志（CHANGELOG）

> 本项目遵循 [语义化版本](https://semver.org/lang/zh-CN/)（SemVer）。格式参考 [Keep a Changelog](https://keepachangelog.com/zh-CN/)。

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
