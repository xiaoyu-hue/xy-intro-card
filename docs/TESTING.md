# 测试文档（TESTING）

> 本项目采用 **三层验证体系**：Node 逻辑校验 + 构建门禁 + GitHub Actions CI。

## 1. 分层架构

| 层 | 方法 | 依赖 | 说明 |
|---|---|---|---|
| 逻辑校验 | Node 提取 `<script>` + DOM 桩，跑 `buildDoc` / `applyPreview` / `renderCardPNG` | Node 18+ | 验证导出 HTML 结构 / 字段 / 主题注入 / XSS 防护 / PNG 排版 |
| 初始化冒烟 | `tests/smoke.test.js` 在 DOM 桩里执行 `setup()` | Node 18+ | 抓「打开就崩」的初始化异常、默认模式 |
| 构建检查 | `scripts/build-check.sh` | grep, wc | 验证文件完整性、HTML 结构、CSP 安全策略 |
| CI 门禁 | `.github/workflows/ci.yml` | GitHub Actions | 每次 push/PR 自动运行上述两层 |

## 2. 逻辑测试（tests/logic.test.js）

运行方式：
```bash
node tests/logic.test.js
```

### 测试覆盖（19 组 / 129 条断言，以实际输出为准）

| # | 组 | 关注的回归 |
|---|---|---|
| 1 | XSS 防护 | script / img / 引号 / 单引号被转义 |
| 2 | 空字段处理 | 全空也输出合法 HTML |
| 3 | 超长输入截断 | 输出体积可控 |
| 4 | 暗色主题注入 | 4 套暗色主题的 `--amber` 等变量 |
| 4b | 浅色商务主题注入 | 4 套亮色主题的 30+ palette 变量 |
| 4c | meta theme-color | 暗/亮主题下的 `<meta name=theme-color>` |
| 5 | Footer 模式 | default / produce / custom / hidden |
| 6 | 两种模式字段隔离 | 人设卡字段不串进通用名片 |
| 7 | 行业预设 | 读书会 / 餐企 / 小企业数据注入 |
| 8 | blob 颜色 | 暗/亮主题光斑 alpha |
| 9 | 内部函数导出 | 桩环境里 exports 完整 |
| 10 | localStorage 版本迁移 | 旧 key / 旧版本数据兼容 |
| 11 | 头像上传与处理 | 有头像用 base64、无头像用占位图 |
| 12 | 下载功能 | 导出的 HTML 独立可运行 |
| 13 | 响应式断点 | 断点与容器查询存在性 |
| 14 | 动画降级与性能 | `prefers-reduced-motion`、lite 模式 |
| 15 | 键盘导航 | tabindex / role / Enter / Space |
| 16 | 预览更新 `applyPreview` | 预览写入与失败兜底（防 v3.1.0 回归） |
| 17 | PNG 导出渲染 | 1080 宽、无 NaN/undefined、长简介撑高 |

> 13~15 组属于「源码结构检查」（grep 生成器源码），能挡住误删，但不等于行为正确；行为验证主要靠 1~12、16、17 组。

### 2.1 初始化冒烟测试（tests/smoke.test.js）

```bash
node tests/smoke.test.js
```

在最小 DOM 桩里**完整执行 `setup()`**（loadState → initFormFields → bindEvents → startPreview），用于抓「页面一打开就崩」的初始化期 ReferenceError / TypeError——v3.1.0 的预览 bug 正属此类，逻辑测试因为把 `setup();` 移除而没抓到。顺带断言默认模式是「通用名片」。

## 3. 构建检查（scripts/build-check.sh）

运行方式：
```bash
sh scripts/build-check.sh
```

### 检查项
- 主文件存在
- 包含 DOCTYPE
- 包含 html 标签和 lang 属性
- 包含 buildDoc 函数
- 包含 esc 转义函数
- 包含 CSP 安全策略
- 文件大小合理（<100KB）
- docs 目录完整性（ARCHITECTURE.md、PRD.md、FIELDS.md）

## 4. CI 配置（.github/workflows/ci.yml）

触发条件：push 到 main、pull_request 到 main

Jobs：
1. **check**: 运行构建检查脚本
2. **test**: 运行逻辑测试（需要 Node.js 20）
3. **lint**: 基础 lint 检查
   - HTML 结构完整性
   - 无硬编码密码
   - 无外部 CDN 依赖

## 5. 本地开发工作流

### 提交前检查
```bash
# 运行完整检查（含初始化冒烟）
sh scripts/build-check.sh

# 或单独运行
node tests/logic.test.js
node tests/smoke.test.js
sh scripts/build-check.sh
```

### 回归测试清单（每次改动后人工核对）
- [ ] 两种模式切换，字段正确显示 / 隐藏
- [ ] 八种主题色注入正确（4 套暗色高饱和 blob + 4 套亮色低透明 blob，光斑/文字深浅均正常）
- [ ] 点击行业预设（读书会/餐企/企业），字段一键填入且预览更新
- [ ] 上传 2400×2400 大图：预览不卡死，导出卡约 10KB
- [ ] 未传头像：显示「主题色 + 首字」占位（头像 SVG 背景随主题切换）
- [ ] 导出卡独立打开，视觉与预览一致
- [ ] 移动端视口（375 / 390）不溢出

## 6. 纪律约定

- 改动导出逻辑（`buildDoc` / `CARD_CSS`）必须重跑 §2 逻辑校验。
- 改动视觉（CSS / 动画）必须补 §3 截图对比。
- 新增主题或行业预设后，须同步补充 §2 对应测试用例。
- 文档与代码是否仍对齐，由 [`DOC_SYNC.md`](DOC_SYNC.md) 约束。
- 新增测试用例请遵循现有命名规范：`测试 N: 描述`。
