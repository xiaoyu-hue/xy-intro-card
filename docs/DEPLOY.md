# 分发与托管（DEPLOY）

> 本项目是纯静态单文件，没有服务器、数据库或构建步骤。分发极简。

## 1. 生成器本身

`个人介绍卡生成器.html` 即是全部。任何方式把它交给用户即可：

- 直接发送文件（微信 / 邮件 / 网盘）
- 静态托管：GitHub Pages、Vercel、Netlify、对象存储静态站点等，把文件丢进去即可访问

无需 `npm install`、无需环境变量、无需持久卷。

## 2. 导出的名片卡片

点「下载这张卡片」得到的 `.html` 是**完全独立**的：

- 内联了全部样式与脚本，不引用外部资源；
- 不联网也能打开；
- 可像普通文件一样通过任意渠道分享、收藏、嵌入网页 `<iframe>`。

> 提示：若要在官网（如 `xy-club`）展示成员名片，可把导出的 HTML 作为静态资源托管，或用 `<iframe src="名片.html">` 嵌入成员页。

## 3. 版本与发布

- 版本号遵循 [SemVer](https://semver.org/lang/zh-CN/)，变更记录见根目录 [`CHANGELOG.md`](../CHANGELOG.md)。
- 文档与版本同步规则见 [`DOC_SYNC.md`](DOC_SYNC.md)。
- 发版 / 不可逆操作前须过 [`DECISION_REVIEW.md`](DECISION_REVIEW.md)。

### 发版流程（Tag + GitHub Release）

```bash
# 1. 确认测试全绿
node tests/logic.test.js
sh scripts/build-check.sh

# 2. 确认文档已同步（见 DOC_SYNC.md §2）

# 3. 打 tag（格式：v MAJOR.MINOR.PATCH-PhaseN）
git tag -a v2.1.0-Phase4 -m "feat: 商务中性主题家族 + 行业预设

- 新增 4 套亮色商务主题（米白·晨雾 / 浅灰·云影 / 燕麦·暖调 / 藏蓝·经典）
- 扩展 CSS 变量体系 30+，light/dark 双模式共存
- 新增 3 个行业预设按钮（读书会/餐企/企业）
- 51 项测试全绿（原 31 + 新增 20）
- CHANGELOG / ARCHITECTURE / PRD / README 中英双语同步"

# 4. 推送到远端（含 tag）
git push origin main --tags

# 5. 在 GitHub 页面手动创建 Release（tag 已关联）
#    GitHub Actions CI 会自动跑 check + test + lint
```

## 4. 注意事项

- 导出卡可能内嵌用户头像（base64），体积通常 20–50KB，属正常；若用户上传超大原图，生成器已自动压缩到约 10KB。
- 本工具不收集任何数据，所有内容仅存在于用户本地浏览器。
