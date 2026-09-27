# 架构说明（ARCHITECTURE）

> 本文描述 `个人介绍卡生成器.html` 的内部结构、渲染与导出机制、主题色计算与性能策略。改结构或导出逻辑前先读本文。

## 1. 单文件结构

整个生成器是**一个 HTML 文件**，三段内联：

```
<!DOCTYPE html>
<html>
  <head>
    <style> /* 生成器 UI 样式 + CARD_CSS（导出卡片的样式，存于 JS 常量） */ </style>
  </head>
  <body>
    <!-- 左侧表单 + 右侧预览 iframe + 顶部模式/主题切换 -->
    <script> /* 配置读取、主题计算、实时预览、buildDoc 导出 */ </script>
  </body>
</html>
```

- **零构建、零依赖**：无 npm、无打包器、无外链资源。
- **自包含**：字体走系统回退（Mac/iOS 花体 → Windows 手写体），图标用内联 SVG，头像可选内联 base64。

## 2. 渲染机制（实时预览）

- 左侧表单的每个输入绑定 `input` 事件，改动即调用 `render()`。
- `render()` 读取所有字段 → 组装配置对象 `cfg` → 调 `buildCardInner(cfg)` 生成卡片 HTML 片段 → 写入右侧 `<iframe>` 的 `srcdoc`。
- 预览 iframe 内联了 `CARD_CSS` 与一段轻量入场动画脚本，使预览与最终导出卡视觉一致。

## 3. 主题色计算（themeInfo）

- 主题色由 `currentTheme = { a, b }`（主色 + 浅色）驱动。
- `themeInfo()` 据此推导：
  - `--amber` / `--amber-2` 注入卡片；
  - 光斑（blob）颜色由 `getHue(a)` 取主色色相，配合 `lighten()` / `hslToRgb()` 生成半透明 RGBA；
  - 文字深浅按主色亮度自动选择，保证对比度。
- 四套预设（落日金 / 深海蓝 / 极光紫 / 晨雾白）与 `xy-club` 四套主题同名同色，便于两个项目配套时视觉统一。

## 4. 导出逻辑（buildDoc）

`buildDoc(cfg, { animate })` 产出一份**独立可运行的 HTML 卡片**：

1. 取 `CARD_CSS`（卡片样式常量）；
2. 注入主题变量与光斑颜色；
3. 按 `cfg.mode`（oc / general）选择字段模板；
4. 转义所有用户输入（`esc()`）防 XSS；
5. 头像：有上传数据用压缩后的 base64，否则生成「主题色 + 首字」SVG 占位；
6. 拼接 `<!DOCTYPE html>` + `<style>` + 卡片 DOM + 内联动画脚本（脚本中 `</script>` 写作 `<\/script>` 避免提前闭合）。

导出卡**不依赖生成器本文件**，可单独发给任何人、任意浏览器打开。

## 5. 头像压缩

`handleAvatar(file)`：

- 用 `FileReader` 读图 → 画进 `<canvas>`，最长边缩放到 **512px**，导出 **JPEG quality 0.85**；
- 典型 2400×2400 原图（2–5MB）压到约 **10KB**；
- 修复了早期「整图 base64 直接塞预览导致大图卡死」的问题。

## 6. 性能策略

- **帧率自适应**：`requestAnimationFrame` 监测帧率，低于阈值自动切 `.lite` 降级（减少毛玻璃层数 / 关闭呼吸动画）。
- **后台暂停**：`visibilitychange` 隐藏时暂停动画。
- **尊重系统偏好**：`prefers-reduced-motion` 时关闭入场 / 呼吸动画。
- **移动端精简**：手机端把毛玻璃层数从 5 降到 1，降低 GPU 压力。
- **入场顺序可控**：用 `--i` 序号控制卡片元素出场顺序，新增内容只需补序号，不打乱动画节奏。

## 7. 与 xy-club 的关系

| 维度 | xy-club（官网模板） | 本项目（名片工具） |
|---|---|---|
| 形态 | Node 服务 + 数据驱动官网 + 后台 | 纯前端单文件生成器 |
| 产物 | 俱乐部整站 | 成员个人介绍卡 |
| 视觉 | 液态玻璃 | 液态玻璃（同源风格） |
| 主题 | 4 套（aurora/ocean/mist/sunset） | 4 套同名同色 |
| 复用方式 | 改 JSON 内容 | 改表单内容导出 |
