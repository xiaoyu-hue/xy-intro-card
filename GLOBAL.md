# xy-intro-card 项目记忆（GLOBAL.md）

## 核心规则（永久记住）

### 🚨 版本一致性铁律

**打 tag 的版本必须和文档体系版本、代码版本三者完全一致**

每次发版前必须执行检查清单：

```bash
# 1. 确认代码版本号
grep "version:" 个人介绍卡生成器.html

# 2. 确认文档版本号
grep -E "v[0-9]+\.[0-9]+\.[0-9]+" docs/CHANGELOG.md | head -1
grep -E "v[0-9]+\.[0-9]+\.[0-9]+" docs/README.md | head -1

# 3. 确认 Git Tag 指向正确的 commit（功能提交，非纯文档提交）
git log --oneline -5
git show <tag> --no-patch

# 4. 验证 GitHub Release
curl -s -H "Authorization: token ${GITHUBTOKEN}" \
  "https://api.github.com/repos/xiaoyu-hue/xy-intro-card/releases" | \
  grep -E '"tag_name"|"name"'
```

### 错误案例（2026-09-29 教训）

| 问题 | 后果 | 修复 |
|------|------|------|
| v3.0.0 打在错误的 commit（纯文档提交）上 | 版本历史混乱 | 删除重建，v3.0.1 指向正确 commit |
| GitHub Release 与 Git Tag 不匹配 | 发布记录错误 | 必须同时更新两者 |

### 正确的发版流程

```bash
cd /var/minis/workspace/xy-intro-card-review

# 1. 跑测试和构建检查
node tests/logic.test.js
sh scripts/build-check.sh

# 2. 确认文档已同步（见 DOC_SYNC.md §2）

# 3. 打 tag（格式：v MAJOR.MINOR.PATCH-PhaseN，指向功能 commit）
git tag -a vX.Y.Z-PhaseN <commit-hash> -m "vX.Y.Z-PhaseN: 一句话摘要

## feat
- 新增 ...

## test
- 新增 N 项测试（共 X 项全绿）

## docs
- CHANGELOG/ARCHITECTURE/PRD/FIELDS/TESTING/README 同步

## breaking
- 无（完全向后兼容）"

# 4. 推送（用环境变量 GITHUBTOKEN）
git remote set-url origin "https://${GITHUBTOKEN}@github.com/xiaoyu-hue/xy-intro-card.git"
git push origin main --tags

# 5. 创建 GitHub Release（API，非 git tag）
curl -s -X POST -H "Authorization: token ${GITHUBTOKEN}" \
  -H "Content-Type: application/json" \
  "https://api.github.com/repos/xiaoyu-hue/xy-intro-card/releases" \
  -d '{
    "tag_name": "vX.Y.Z-PhaseN",
    "name": "vX.Y.Z-PhaseN — 一句话标题",
    "body": "完整 release notes（Markdown）",
    "draft": false,
    "prerelease": false
  }'
```

### 版本格式规范

| 元素 | 格式 | 示例 |
|------|------|------|
| Git Tag | `vMAJOR.MINOR.PATCH` 或 `vMAJOR.MINOR.PATCH-PhaseN` | `v3.0.2` |
| 代码 version 字段 | `vMAJOR.MINOR.PATCH` | `version: '3.0.2'` |
| CHANGELOG 标题 | `vMAJOR.MINOR.PATCH-PhaseN` | `## v3.0.2-Phase5` |
| GitHub Release tag_name | 必须与 Git Tag 完全一致 | `v3.0.2` |

**关键**：代码中的 `version` 字段不含 Phase 标记，CHANGELOG 和 Git Tag 包含 Phase 标记。

### 历史版本参考

```
v1.0.0 - 初始版本
v1.1.0 - CSP 安全增强
v1.1.1 - 修复名字重复
v1.2.0 - Footer 自定义
v1.3.0 - 内部模块化重构
v2.0.0 - 系统级响应式与极致流畅度提升
v3.0.0 - 商务主题家族 + 行业预设 + 架构优化（正确 commit: 552f16b）
v3.0.1 - 修复 buildThemeSwatches bug
v3.0.2 - 全面修复：代码拆分 + 测试补充 + ARIA完善
```

---

## 用户偏好

- 零编程基础，不懂代码，但我是最终决策者
- 要求结论先用大白话讲，专业细节放后面展开
- 术语第一次出现必须括号解释
- 给方案要讲清取舍
- 遇到技术缺陷或逻辑漏洞必须先指出并给出替代方案
- 发现重复踩同一个坑时要直接提醒
- 涉及删除、覆盖、花钱、发布等不可逆操作必须先征得同意

## 项目结构

```
/var/minis/workspace/xy-intro-card-review/
├── 个人介绍卡生成器.html    # 主应用（单文件）
├── tests/
│   └── logic.test.js       # 逻辑测试（102项）
├── docs/
│   ├── CHANGELOG.md        # 变更日志
│   ├── ARCHITECTURE.md     # 架构文档
│   ├── PRD.md              # 产品需求文档
│   ├── TESTING.md          # 测试文档
│   ├── COMPREHENSIVE_REVIEW.md  # 综合审查报告
│   └── FIX_SUMMARY.md      # 修复总结
├── scripts/
│   └── build-check.sh      # 构建检查脚本
└── GLOBAL.md               # 全局记忆（本文件）
```

## 技术栈

- **前端**: 纯 HTML + CSS + JavaScript（单文件应用）
- **测试**: Node.js + 自定义测试框架
- **部署**: GitHub Pages
- **版本管理**: Git + GitHub Releases API

## 发版工具链

- Git tag 创建：`git tag -a vX.Y.Z <commit>`
- GitHub Release：通过 REST API 创建
- 环境变量：`GITHUBTOKEN`（已配置）
- Git Author：`xiaoyu-hue <xiaoyu-hue@users.noreply.github.com>`

## 重要提醒

1. **打 tag 前必须确认 commit 指向正确**（功能提交，非纯文档提交）
2. **Git Tag ≠ GitHub Release**：两者独立，必须分别创建
3. **每个 Phase 只打一个 tag**：不要在多个 commit 上打同一个 tag
4. **清理混乱的旧 tag**：删除前确认指向正确的 commit
