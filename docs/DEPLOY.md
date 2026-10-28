# 分发与托管（DEPLOY）

> 本项目是纯静态单文件，没有服务器、数据库或构建步骤。分发极简。

## 1. 生成器本身

`index.html` 即是全部。任何方式把它交给用户即可：

- 直接发送文件（微信 / 邮件 / 网盘）
- 静态托管：GitHub Pages、Vercel、Netlify、对象存储静态站点等，把文件丢进去即可访问

> GitHub Pages 说明：仓库根目录的 `index.html` 就是应用本身（站点根地址直接可用）；`个人介绍卡生成器.html` 只是 v3.2.0 之前的旧地址，保留为跳转页，不要删。

无需 `npm install`、无需环境变量、无需持久卷。

## 2. 导出的名片卡片

点「下载完整卡片（HTML）」得到的 `.html` 是**完全独立**的（点「导出 PNG」则得到一张图片，发微信更方便）：

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

# 3. 打 tag（格式：v MAJOR.MINOR.PATCH；tag 必须打在功能提交上，不能打在纯文档提交）
git tag -a v3.2.0 -m "feat: PNG 导出 + 首页改 index.html

- 导出 PNG（Canvas 2D 重绘，1080px 宽自适应高度，零依赖）
- 主文件改名 index.html，旧路径保留跳转页
- 默认进入通用名片；补 description / og 元信息
- fix: 实时预览崩溃、esc 单引号转义、示例卡重导
- test: 129 条断言 + 初始化冒烟测试；docs 同步"

# 4. 推送到远端（含 tag）
git push origin main --tags

# 5. 用 API 创建 Release（或用 GitHub 页面「Draft a new release」）
#    正文直接取 CHANGELOG 对应段落；CI 会自动跑 check + test + smoke + lint
```

## 4. 注意事项

- 导出卡可能内嵌用户头像（base64），体积通常 20–50KB，属正常；若用户上传超大原图，生成器已自动压缩到约 10KB。
- 本工具不收集任何数据，所有内容仅存在于用户本地浏览器。
