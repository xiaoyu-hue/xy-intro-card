# 测试文档（TESTING）

> 本项目采用 **三层验证体系**：Node 逻辑校验 + 构建门禁 + GitHub Actions CI。

## 1. 分层架构

| 层 | 方法 | 依赖 | 说明 |
|---|---|---|---|
| 逻辑校验 | Node 提取 `<script>` + DOM 桩，跑 `buildDoc` | Node 18+ | 验证导出 HTML 结构 / 字段 / 主题注入 / XSS 防护 |
| 构建检查 | `scripts/build-check.sh` | grep, wc | 验证文件完整性、HTML 结构、CSP 安全策略 |
| CI 门禁 | `.github/workflows/ci.yml` | GitHub Actions | 每次 push/PR 自动运行上述两层 |

## 2. 逻辑测试（tests/logic.test.js）

运行方式：
```bash
node tests/logic.test.js
```

### 测试覆盖（70 个用例）

#### 测试 1: XSS 防护（6 项）
- script 标签应被转义为 `&lt;script&gt;`
- img 标签应被转义为 `&lt;img`
- 引号应被转义为 `&quot;`
- alert 文本应保留（作为纯文本）
- 正常文本应保留
- 正常文本应保留（第二组）

#### 测试 2: 空字段处理（3 项）
- 空字段不崩溃，输出有效 HTML
- 应包含 DOCTYPE
- 应包含 html 标签

#### 测试 3: 超长输入截断（2 项）
- 输出长度应在合理范围内（<50KB）
- 长文本应被保留（或截断）

#### 测试 4: 暗色主题注入（8 项）
- 落日金：--amber 和 --amber-2 正确注入
- 深海蓝：--amber 和 --amber-2 正确注入
- 极光紫：--amber 和 --amber-2 正确注入
- 晨雾白：--amber 和 --amber-2 正确注入
- 以上 4 套暗色主题均不应注入浅色专属变量（如 --bg-solid: #f7f4f0）

#### 测试 4b: 亮色商务主题注入（8 项）
- 米白·晨雾（neutral_morning）palette 全套变量正确注入：
  `--amber`、`--bg-solid`、`--text`、`--glass-1`、`--card-shadow-1`、
  `meta theme-color`、`--foot-color`、`--sign-color`

#### 测试 4c: 暗色 meta theme-color 回归（1 项）
- 暗色主题导出卡的 `<meta theme-color>` 应为 `#06060b`

#### 测试 5: Footer 模式（4 项）
- default 模式应包含 ©
- produce 模式应包含「出品」
- custom 模式应包含自定义文案
- hidden 模式不应显示 footer

#### 测试 6: 两种模式字段隔离（8 项）
- oc 模式不应有"关于我"标签
- oc 模式不应有"联系方式"标签
- oc 模式应有"个人信息"标签
- oc 模式应有"游戏技能"标签
- general 模式不应显示年龄
- general 模式不应显示星座
- general 模式应有"关于我"标签
- general 模式应有"联系方式"标签

#### 测试 7: 行业预设数据注入（7 项）
- 应有 3 个行业预设对象（读书会/餐企/企业）
- 各预设均有 `fields.fullName`
- 读书会预设导出后 title、script、签名均正确

#### 测试 8: blob 颜色验证（6 项）
- 暗色主题 blob alpha 应为 .45/.30/.26（高饱和活跃色）
- 亮色主题 blob alpha 应为 0.14/0.09/0.07（低透明克制色）

#### 测试 9: 内部函数导出验证（6 项）
- `getThemeVarValues` 应为函数
- `THEMES_CONFIG` 应包含 4 套亮色商务主题
- `getThemeVarValues` 应返回正确的 CSS 变量值

#### 测试 10: localStorage 版本迁移（4 项）
- 旧版无 mode/palette 时应降级为 dark/null
- 新版有 mode/palette 时应保留

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
# 运行完整检查
sh scripts/build-check.sh

# 或单独运行
node tests/logic.test.js
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
