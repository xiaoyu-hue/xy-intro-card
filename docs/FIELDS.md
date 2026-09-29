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
- 头像：`avatarData`（压缩后 base64）可选；缺省时按 `title`/`name` 首字生成 SVG 占位，占位 SVG 背景色随主题切换（暗色 `rgb(11,10,18)` / 亮色商务主题取 `palette.avatarRect`）。
- 主题色独立于字段，由 `currentTheme` 对象控制，不参与内容数据。

## 主题配置（Theme）

主题对象结构（自 Phase 4）：

```js
{
  a: '#ff9d5c',            // 主色（强调色）
  b: '#ffd0a8',            // 辅色（高亮色，由 lighten(a) 推导）
  mode: 'dark',            // 'dark' | 'light'，决定 blob 透明度与文字方向
  palette: {               // 仅 light 模式使用，暗色主题不传此字段
    bg: '#f7f4f0',         // 页面背景色（--bg-solid）
    text: '#1e2935',       // 正文文字色
    dim: 'rgba(30,41,53,0.55)', // 次要文字色
    glass1: 'rgba(255,255,255,0.75)',  // 毛玻璃层 1（不透明度高）
    glass2: 'rgba(255,255,255,0.50)',  // 毛玻璃层 2
    line: 'rgba(148,163,184,0.40)',    // 分割线色
    shadow1: 'rgba(15,23,42,0.10)',    // 卡片外阴影 1
    shadow2: 'rgba(15,23,42,0.06)',    // 卡片外阴影 2
    highlight: 'rgba(255,255,255,0.85)', // 卡片高光
    edge: 'rgba(148,163,184,0.38)',     // 卡片底部边缘线
    // ... 详见 THEMES_CONFIG 中任意一套 light 主题的 palette 字段
  }
}
```

现有 8 套预设主题存放在 `THEMES_CONFIG`，用户也可通过 `window.XYIntroCard.addTheme(name, a, b)` 动态追加（新主题默认 `mode: 'dark'`，需手动补 `mode` 和 `palette` 才能走亮色路径）。

## 行业预设（Industry Presets）

行业预设仅作用于「通用名片」模式（`mode: "general"`），点击按钮后调用 `applyIndustryPreset(key)` 将预设文案填入表单字段，然后触发 `scheduleUpdate()` 刷新预览。

- 预设与主题**互不联动**：点预设不改变主题，换主题也不清除已填字段。
- 预设数据存放在 `INDUSTRY_PRESETS` 常量对象中，结构为 `{ [key]: { label, fields: { fullName, titleRole, bio, contact, signCn, signEn } } }`。
- 可按需扩展：在 `INDUSTRY_PRESETS` 中添加新 key 并对应 UI 按钮即可，无需改核心逻辑。

## 与 xy-club 的数据对照

xy-club 的内容由 JSON 驱动（`services` / `settings` 等），本项目内容由表单驱动；两者**字段语义可对齐**（如俱乐部名 ↔ `title`、技能 ↔ `services` 条目），便于官网与成员名片同源维护。
