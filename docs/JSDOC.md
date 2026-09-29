# JSDoc Comments

> 本文档说明项目中各核心函数的 JSDoc 注释规范。所有公共函数均应添加 JSDoc 注释，便于维护和 IDE 提示。

## 注释规范

### 基本格式

```js
/**
 * 函数描述（一句话说明功能）
 *
 * @param {类型} 参数名 - 参数说明
 * @param {类型} 参数名 - 参数说明
 * @returns {类型} 返回值说明
 *
 * @example
 * // 使用示例
 * const result = functionName(arg1, arg2);
 */
function functionName(param1, param2) {
  // 实现代码
}
```

### 类型说明

| 类型 | 说明 |
|------|------|
| `string` | 字符串 |
| `number` | 数字 |
| `boolean` | 布尔值 |
| `object` | 对象 |
| `array` | 数组 |
| `Function` | 函数 |
| `HTMLElement` | DOM 元素 |
| `null` | null |
| `undefined` | undefined |
| `*` | 任意类型 |

---

## 核心函数 JSDoc

### 1. esc() - HTML 转义

```js
/**
 * HTML 实体转义，防止 XSS 攻击
 *
 * @param {string} s - 原始字符串
 * @returns {string} 转义后的字符串
 *
 * @example
 * esc('<script>alert(1)</script>')
 * // 返回: '&lt;script&gt;alert(1)&lt;/script&gt;'
 */
function esc(s) { ... }
```

### 2. splitCsv() - CSV 分割

```js
/**
 * 将逗号分隔的字符串分割为数组
 *
 * @param {string} s - 逗号分隔的字符串
 * @returns {string[]} 分割后的字符串数组
 *
 * @example
 * splitCsv('技能1，技能2，技能3')
 * // 返回: ['技能1', '技能2', '技能3']
 */
function splitCsv(s) { ... }
```

### 3. themeInfo() - 主题信息计算

```js
/**
 * 计算主题色和光斑颜色
 *
 * @param {object} theme - 主题配置对象
 * @param {string} theme.a - 主色（十六进制）
 * @param {string} theme.b - 辅色（十六进制）
 * @param {string} [theme.mode='dark'] - 主题模式（'dark' | 'light'）
 * @param {object} [theme.palette] - 亮色主题 palette 配置
 * @returns {object} 主题信息对象
 * @returns {string} return.a - 主色
 * @returns {string} return.b - 辅色
 * @returns {string[]} return.blobs - 三个光斑颜色
 *
 * @example
 * themeInfo({ a: '#ff9d5c', b: '#ffd0a8', mode: 'dark' })
 * // 返回: { a: '#ff9d5c', b: '#ffd0a8', blobs: [...] }
 */
function themeInfo(theme) { ... }
```

### 4. getThemeVarValues() - CSS 变量映射

```js
/**
 * 生成完整的 CSS 自定义属性映射
 *
 * @param {object} theme - 主题配置对象
 * @returns {object} CSS 变量映射对象
 *
 * @example
 * getThemeVarValues({ a: '#ff9d5c', mode: 'dark' })
 * // 返回: { '--amber': '#ff9d5c', '--amber-2': '#ffd0a8', ... }
 */
function getThemeVarValues(theme) { ... }
```

### 5. buildCardInner() - 卡片 HTML 生成

```js
/**
 * 生成卡片内部 HTML 结构
 *
 * @param {object} cfg - 配置对象
 * @param {string} cfg.mode - 模式（'oc' | 'general'）
 * @param {object} cfg.theme - 主题配置
 * @param {string} [cfg.avatar] - 头像 base64 数据
 * @param {string} cfg.title - 标题/姓名
 * @param {string} [cfg.script] - 副标题/头衔
 * @param {string} [cfg.name] - 名字
 * @param {string} [cfg.age] - 年龄
 * @param {string} [cfg.zodiac] - 星座
 * @param {string[]} [cfg.skills] - 技能标签
 * @param {string[]} [cfg.contact] - 联系方式
 * @param {string} [cfg.bio] - 简介
 * @param {string} [cfg.signCn] - 中文签名
 * @param {string} [cfg.signEn] - 英文签名
 * @param {string} [cfg.footMode='default'] - Footer 模式
 * @param {string} [cfg.footCustom=''] - 自定义 Footer 文案
 * @param {boolean} animate - 是否启用入场动画
 * @returns {string} 卡片内部 HTML 字符串
 *
 * @example
 * buildCardInner({ mode: 'oc', title: 'XY俱乐部', name: '小鱼' }, false)
 * // 返回: '<div class="avatar-wrap">...</div>...'
 */
function buildCardInner(cfg, animate) { ... }
```

### 6. buildDoc() - 完整文档生成

```js
/**
 * 生成完整的独立 HTML 卡片文档
 *
 * @param {object} cfg - 配置对象（与 buildCardInner 相同）
 * @param {object} opts - 选项对象
 * @param {boolean} [opts.animate=true] - 是否启用入场动画
 * @returns {string} 完整的 HTML 文档字符串
 *
 * @example
 * buildDoc({ mode: 'oc', title: 'XY俱乐部', name: '小鱼' }, { animate: false })
 * // 返回: '<!DOCTYPE html>...<html>...</html>'
 */
function buildDoc(cfg, opts) { ... }
```

### 7. readCfg() - 配置读取

```js
/**
 * 从 DOM 读取用户输入并生成配置对象
 *
 * @returns {object} 配置对象
 *
 * @example
 * readCfg()
 * // 返回: { mode: 'oc', theme: {...}, title: 'XY俱乐部', name: '小鱼', ... }
 */
function readCfg() { ... }
```

### 8. saveState() - 状态持久化

```js
/**
 * 将当前应用状态保存到 localStorage
 *
 * @returns {void}
 *
 * @example
 * saveState()
 * // 保存到 localStorage: 'xy-intro-card-state-v1'
 */
function saveState() { ... }
```

### 9. loadState() - 状态恢复

```js
/**
 * 从 localStorage 恢复应用状态
 *
 * @returns {boolean} 是否成功恢复
 *
 * @example
 * loadState()
 * // 返回: true（成功）或 false（无数据）
 */
function loadState() { ... }
```

### 10. addInputFeedback() - 输入校验反馈

```js
/**
 * 为输入框添加实时校验和错误提示
 *
 * @param {HTMLElement} el - 输入元素
 * @param {Function} validator - 校验函数（接收 value，返回 boolean）
 * @param {string} errorMsg - 错误提示信息
 *
 * @example
 * addInputFeedback(
 *   document.getElementById('clubName'),
 *   function(v) { return v.trim().length > 0; },
 *   '俱乐部名称不能为空'
 * )
 */
function addInputFeedback(el, validator, errorMsg) { ... }
```

---

## 测试函数 JSDoc

### buildDoc() 测试

```js
/**
 * 测试 buildDoc 函数
 * @test
 */
group('测试 buildDoc', function() { ... });
```

---

## 更新记录

| 日期 | 作者 | 更新内容 |
|------|------|----------|
| 2026-09-29 | Minis | 初始创建，添加核心函数 JSDoc 规范 |
