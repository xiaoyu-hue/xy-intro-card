# API 参考文档（API Reference）

> 本文档描述 `window.XYIntroCard` 全局 API，供外部脚本和插件调用。

---

## 1. 全局对象

```js
// 在浏览器中访问
window.XYIntroCard
```

所有 API 方法均在 `window.XYIntroCard` 对象上。

---

## 2. 核心方法

### `addTheme(name, config)`

动态添加新主题到生成器。

**参数：**
- `name` (string): 主题唯一标识符（如 `'my-theme'`）
- `config` (object): 主题配置对象

**config 对象结构：**
```js
{
  name: '主题显示名',      // 可选，默认使用传入的 name
  a: '#ff9d5c',           // 主色（强调色）
  b: '#ffd0a8',           // 辅色（可选，自动由 lighten(a) 推导）
  mode: 'dark' | 'light', // 可选，默认 'dark'
  palette: {              // 仅 light 模式需要
    bg: '#f7f4f0',
    text: '#1e2935',
    dim: 'rgba(30,41,53,0.55)',
    glass1: 'rgba(255,255,255,0.75)',
    glass2: 'rgba(255,255,255,0.50)',
    line: 'rgba(148,163,184,0.40)',
    shadow1: 'rgba(15,23,42,0.10)',
    shadow2: 'rgba(15,23,42,0.06)',
    highlight: 'rgba(255,255,255,0.85)',
    edge: 'rgba(148,163,184,0.38)',
    borderInset1: 'rgba(255,255,255,0.92)',
    borderInset2: 'rgba(255,255,255,0.45)',
    chipBg: 'rgba(255,255,255,0.65)',
    chipLine: 'rgba(148,163,184,0.45)',
    pillBg1: 'rgba(255,255,255,0.70)',
    pillBg2: 'rgba(255,255,255,0.45)',
    pillBorder: 'rgba(148,163,184,0.48)',
    pillInset: 'rgba(255,255,255,0.80)',
    signColor: '#334155',
    footColor: 'rgba(30,41,53,0.35)',
    selectionFg: '#1e2935',
    fallbackBg1: 'rgba(240,238,235,0.95)',
    fallbackBg2: 'rgba(225,222,216,0.97)',
    avatarRect: '#f7f4f0',
    avatarBorder: 'rgba(148,163,184,0.40)',
    avatarShadow: 'rgba(15,23,42,0.12)',
    avatarGradStop3: '#c4b5a0',
    nameGradientStart: '#1e2935',
    nameShineStop: 'rgba(255,255,255,0.85)'
  }
}
```

**示例：添加暗色主题**
```js
window.XYIntroCard.addTheme('custom-dark', {
  name: '自定义暗色',
  a: '#9d5cFF',
  b: '#d0a8FF'
});
```

**示例：添加亮色商务主题**
```js
window.XYIntroCard.addTheme('custom-light', {
  name: '自定义亮色',
  a: '#5a6b7c',
  b: '#8a9dad',
  mode: 'light',
  palette: { /* ... 完整 palette 配置 ... */ }
});
```

**兼容旧签名：**
```js
// 旧版仍可工作
window.XYIntroCard.addTheme('legacy', '#ff9d5c', '#ffd0a8');
```

---

### `registerTemplate(name, config)`

注册自定义卡片模板（预留扩展点，暂未实现）。

**参数：**
- `name` (string): 模板名称
- `config` (object): 模板配置对象

---

### `getCurrentTheme()`

获取当前激活的主题对象。

**返回值：**
```js
{
  a: '#ff9d5c',
  b: '#ffd0a8',
  mode: 'dark',
  palette: null
}
```

---

## 3. 属性

### `version`

当前工具版本号。

```js
console.log(window.XYIntroCard.version); // "2.1.0-Phase4"
```

---

### `FEATURES`

浏览器特性检测结果对象。

```js
{
  backdropFilter: true,          // 支持 backdrop-filter
  containerQueries: false,       // 支持容器查询
  intersectionObserver: true,    // 支持 IntersectionObserver
  requestIdleCallback: true,     // 支持 requestIdleCallback
  prefersReducedMotion: false,   // 用户是否请求减弱动态
  highContrast: false,           // 是否高对比度模式
  forcedColors: false            // 是否强制颜色模式
}
```

---

### `onCardExport`

导出回调数组。可在导出前注入自定义逻辑。

```js
window.XYIntroCard.onCardExport.push(function(html) {
  console.log('即将导出卡片，HTML 长度:', html.length);
  return html; // 可修改返回的 HTML
});
```

---

## 4. 内部函数（测试用）

以下函数在测试环境暴露，生产环境不建议直接调用：

| 函数 | 说明 |
|------|------|
| `buildDoc(cfg, opts)` | 生成完整 HTML 卡片 |
| `readCfg()` | 从 DOM 读取当前配置 |
| `esc(str)` | HTML 转义 |
| `themeInfo(theme)` | 计算主题色和 blob 颜色 |
| `getThemeVarValues(theme)` | 获取主题 CSS 变量映射 |
| `INDUSTRY_PRESETS` | 行业预设数据常量 |

---

## 5. 使用示例

```html
<script src="个人介绍卡生成器.html"></script>
<script>
  // 添加自定义主题
  window.XYIntroCard.addTheme('my-brand', {
    name: '我的品牌',
    a: '#1a1a2e',
    b: '#16213e',
    mode: 'dark'
  });

  // 监听导出事件
  window.XYIntroCard.onCardExport.push(function(html) {
    analytics.track('card_exported', { theme: currentTheme });
    return html;
  });

  // 获取当前主题
  var theme = window.XYIntroCard.getCurrentTheme();
  console.log('当前主题:', theme.name);
</script>
```

---

*文档版本：v2.1.0-Phase4*
