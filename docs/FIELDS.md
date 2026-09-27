# 字段规范（FIELDS）

> 改数据结构 / 导出模板前必读。两种模式字段互不耦合，导出时按 `mode` 选用。

## 模式一：人设卡（`mode: "oc"`）

适合俱乐部成员 / 陪玩官 / 语C 人设介绍。

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `title` | string | 是 | 俱乐部 / 团队名（如「XY俱乐部」） |
| `script` | string | 否 | 英文副标语（如 `where everyday life meets poetry`） |
| `name` | string | 是 | 名字 / 昵称 |
| `age` | string | 否 | 年龄 |
| `zodiac` | string | 否 | 星座（带符号，如 `巨蟹座`） |
| `skills` | string[] | 否 | 技能标签，可多项 |
| `signCn` | string | 否 | 中文签名 / 座右铭 |
| `signEn` | string | 否 | 英文签名 |

## 模式二：通用名片（`mode: "general"`）

适合通用个人介绍 / 职场名片。

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `title` | string | 是 | 姓名 |
| `script` | string | 否 | 头衔 / 身份（如「自由摄影师」） |
| `bio` | string | 否 | 一句话简介 |
| `contact` | string[] | 否 | 联系方式 / 标签，可多项（如「微信：xxx」「邮箱：a@b.com」） |
| `signCn` | string | 否 | 中文签名 |
| `signEn` | string | 否 | 英文签名 |

## 公共规则

- 所有字符串在 `buildDoc` 内经 `esc()` 转义后入 DOM，防止 XSS。
- 空字段在卡片上自动隐藏对应区块，不留空白占位。
- 头像：`avatarData`（压缩后 base64）可选；缺省时按 `title`/`name` 首字生成 SVG 占位。
- 主题色独立于字段，由 `currentTheme = { a, b }` 控制，不参与内容数据。

## 与 xy-club 的数据对照

xy-club 的内容由 JSON 驱动（`services` / `settings` 等），本项目内容由表单驱动；两者**字段语义可对齐**（如俱乐部名 ↔ `title`、技能 ↔ `services` 条目），便于官网与成员名片同源维护。
