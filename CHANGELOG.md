# 更新日志（CHANGELOG）

> 本项目遵循 [语义化版本](https://semver.org/lang/zh-CN/)（SemVer）。格式参考 [Keep a Changelog](https://keepachangelog.com/zh-CN/)。

## [未发布]

### 新增

- README（中英双语）：补全顶部徽章、「在线体验」入口与「🙏 致谢与依赖」章节
- 新增 `index.html`：GitHub Pages 根路径入口页，自动跳转到生成器

### 变更

- 启用 GitHub Pages（源：`main` 分支根目录），在线体验地址：<https://xiaoyu-hue.github.io/xy-intro-card/>

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
