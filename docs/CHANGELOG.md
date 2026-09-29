# CHANGELOG

所有版本变更记录。

格式遵循 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)，
并 adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html)。

---

## [v3.0.2] - 2026-09-29

### 🐛 Bug Fixes

- **代码重构**: 拆分 `setup()` 函数为三个子函数（`initFormFields`, `bindEvents`, `startPreview`），提升可维护性
- **可访问性**: 完善 ARIA role 属性，添加 `role="tab"`, `role="region"`, `aria-live="polite"`
- **焦点管理**: 模式切换时自动聚焦目标面板，提升键盘用户体验

### ✨ Features

- **测试扩展**: 新增 32 项测试用例（头像上传、下载功能、响应式断点、动画降级）
- **全局 API**: 暴露 `window.XYIntroCard` 供插件扩展使用
- **模块注释**: 添加架构说明注释，明确全局变量用途

### 📚 Documentation

- **综合审查报告**: 创建 `docs/COMPREHENSIVE_REVIEW.md`（13KB）
- **修复总结**: 创建 `docs/FIX_SUMMARY.md`
- **版本规范**: 更新 `GLOBAL.md`，记录版本一致性铁律

### ✅ 测试统计

- **总数**: 70 → 102 项
- **通过率**: 100%
- **新增测试组**: 测试 11-14

### 📊 代码质量评分

- **修复前**: 87/100
- **修复后**: 92/100
- **提升**: +5 分

### 🔗 相关提交

- `206185e` refactor: 拆分 setup() 为三个子函数提升可维护性
- `6172e6b` test: 补充 4 组新测试用例覆盖核心功能
- `e073315` feat: 完善 ARIA 可访问性支持
- `a6b69cc` docs: 更新模块注释，明确全局变量用途

---

## [v3.0.1] - 2026-09-29

### 🐛 Bug Fixes

- 修复 `buildThemeSwatches` 函数中 `s` 未定义错误
- 主题色块现在正常显示（8个）

### 🧪 Tests

- 70 项测试全绿

### 📖 Documentation

- 创建综合审查报告
- 更新版本历史记录

---

## [v3.0.0] - 2026-09-29

### ✨ Features

- **商务主题家族**: 新增 4 套亮色商务主题（米白·晨雾 / 浅灰·云影 / 燕麦·暖调 / 藏蓝·经典）
- **行业预设**: 新增 3 个行业预设按钮（读书会 / 餐企 / 企业）
- **架构优化**: 引入 AppState 状态管理器，统一 SECTION 编号为 1-11
- **版本迁移**: localStorage 版本迁移机制，兼容旧版数据

### 🧪 Tests

- 新增 39 项测试
- 总计 70 项测试全绿

### 📚 Documentation

- 同步更新所有文档（CHANGELOG / ARCHITECTURE / PRD / FIELDS / TESTING / README）
- 新增 API 文档

### ⚠️ Breaking Changes

- 无（完全向后兼容）

---

## [v2.0.0] - 2026-09-28

### ✨ Features

- 系统级响应式适配（14 个断点）
- 极致流畅度优化（GPU 加速、懒加载）
- 性能自适应（FPS 检测自动降级）
- 容器查询支持

### 🧪 Tests

- 新增 31 项测试

### 📚 Documentation

- 全面更新技术文档

---

## [v1.3.0] - 2026-09-27

### ✨ Features

- Footer 自定义功能（4 种模式）
- 内部模块化重构

---

## [v1.2.0] - 2026-09-26

### ✨ Features

- Footer 自定义选项

---

## [v1.1.1] - 2026-09-25

### 🐛 Bug Fixes

- 修复名字重复显示问题

---

## [v1.1.0] - 2026-09-25

### 🔒 Security

- CSP 安全增强

---

## [v1.0.0] - 2026-09-24

### 🎉 Initial Release

- 初始版本发布
- 基础功能完整
- 8 种主题色
- 实时预览
- 一键下载

---

[v3.0.2]: https://github.com/xiaoyu-hue/xy-intro-card/releases/tag/v3.0.2
[v3.0.1]: https://github.com/xiaoyu-hue/xy-intro-card/releases/tag/v3.0.1
[v3.0.0]: https://github.com/xiaoyu-hue/xy-intro-card/releases/tag/v3.0.0
[v2.0.0]: https://github.com/xiaoyu-hue/xy-intro-card/releases/tag/v2.0.0
[v1.3.0]: https://github.com/xiaoyu-hue/xy-intro-card/releases/tag/v1.3.0
[v1.2.0]: https://github.com/xiaoyu-hue/xy-intro-card/releases/tag/v1.2.0
[v1.1.1]: https://github.com/xiaoyu-hue/xy-intro-card/releases/tag/v1.1.1
[v1.1.0]: https://github.com/xiaoyu-hue/xy-intro-card/releases/tag/v1.1.0
[v1.0.0]: https://github.com/xiaoyu-hue/xy-intro-card/releases/tag/v1.0.0
