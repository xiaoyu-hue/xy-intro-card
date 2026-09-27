# 文档与版本同步规范（DOC_SYNC）

> 目标：文档、代码、提交信息三者始终一致；唯一真源是**代码与本文档体系**，文档不得滞后于实现。

## 1. 唯一真源

- 功能行为的真源是 `个人介绍卡生成器.html` 的代码。
- 约定与决策的真源是 `docs/` 下的文档。
- 版本与变更的真源是 `CHANGELOG.md` + Git 提交。

## 2. 同步清单（改以下任一项须同步其余）

| 改动类型 | 必须同步更新 |
|---|---|
| 新增 / 修改字段 | `FIELDS.md` → `PRD.md` → 导出模板 → `CHANGELOG.md` |
| 改主题色 / 视觉 | `ARCHITECTURE.md`（§3/§6）→ 预览 → `CHANGELOG.md` |
| 改导出逻辑 | `ARCHITECTURE.md`（§4）→ `TESTING.md` 回归清单 → `CHANGELOG.md` |
| 架构 / 依赖决策 | 新增 / 更新 `docs/adr/*` → `DECISION_REVIEW.md` → `CHANGELOG.md` |
| 任一用户可见行为 | `README.md` 特性列表 → `CHANGELOG.md` |

## 3. 版本规则（SemVer）

- **MAJOR**：不兼容的字段 / 导出结构变更（旧卡可能无法再编辑）
- **MINOR**：新增可选功能（新主题、新模式、新字段）
- **PATCH**：修复、文案、样式微调

## 4. 发布前验证（发版 Checklist）

- [ ] `TESTING.md` §2 逻辑校验通过
- [ ] `TESTING.md` §4 回归清单全部通过
- [ ] 文档同步清单（§2）已覆盖本次改动
- [ ] `CHANGELOG.md` 已追加对应条目
- [ ] 双语文档（`.en.md`）已对齐更新
- [ ] 提交信息符合 Conventional Commits（`feat:` / `fix:` / `docs:` / `chore:`）

## 5. 中英文同步

核心文档保持中英双语（`.md` + `.en.md`）。改中文版须同步英文版，或在本文件标记待译项，但不得长期失衡。
