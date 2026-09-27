# 验证方式（TESTING）

> 本项目是纯前端单文件，**没有自动化测试门禁**。验证以「浏览器手测 + 无头截图 + Node 逻辑校验」三层组成。

## 1. 分层

| 层 | 方法 | 依赖 | 说明 |
|---|---|---|---|
| 逻辑校验 | Node 提取 `<script>` + DOM 桩，跑 `buildDoc` | Node 18+ | 验证导出 HTML 结构 / 字段 / 主题注入 |
| 视觉校验 | 无头 Chromium 截图 | chromium | 验证生成器页面与导出卡渲染 |
| 手测 | 人工浏览器操作 | 浏览器 | 验证交互、上传、下载等端到端体验 |

## 2. 逻辑校验（推荐 CI / 提交前）

提取生成器内嵌脚本，以 DOM 桩替代 `document` / `window`，直接调用 `buildDoc(cfg)`：

```js
const fs = require("fs");
const html = fs.readFileSync("个人介绍卡生成器.html", "utf8");
let js = html.match(/<script>([\s\S]*?)<\/script>/)[1].replace(/setup\(\);\s*$/, "");
const stub = "var document={getElementById:()=>null,querySelectorAll:()=>[],addEventListener:()=>{},createElement:()=>({style:{},classList:{toggle(){},add(){},remove(){}},addEventListener(){},appendChild(){},click(){},remove(){},setAttribute(){},removeAttribute(){}}),body:{appendChild(){}}},window={matchMedia:()=>({matches:false}),innerWidth:800,addEventListener:()=>{}};\n";
js = stub + js + "\nmodule.exports={buildDoc};\n";
fs.writeFileSync("/tmp/gen.js", js);
const g = require("/tmp/gen.js");
const doc = g.buildDoc({ mode:"oc", title:"XY俱乐部", name:"小鱼", age:"21", zodiac:"巨蟹座", skills:["文字陪聊"], signCn:"", signEn:"" }, { animate:false });
console.assert(doc.includes("<!DOCTYPE html>") && doc.includes("小鱼"));
```

## 3. 视觉校验

```bash
# 导出卡截图
chromium --headless --no-sandbox --disable-gpu --force-device-scale-factor=2 \
  --window-size=430,960 --screenshot=card.png --virtual-time-budget=3000 \
  "file:///workspace/XY俱乐部-小鱼.html"
```

## 4. 回归清单（每次改动后人工核对）

- [ ] 两种模式切换，字段正确显示 / 隐藏
- [ ] 四种主题色注入正确（含光斑、文字深浅）
- [ ] 上传 2400×2400 大图：预览不卡死，导出卡约 10KB
- [ ] 未传头像：显示「主题色 + 首字」占位
- [ ] 导出卡独立打开，视觉与预览一致
- [ ] 移动端视口（375 / 390）不溢出

## 5. 纪律约定

- 改动导出逻辑（`buildDoc` / `CARD_CSS`）必须重跑 §2 逻辑校验。
- 改动视觉（CSS / 动画）必须补 §3 截图对比。
- 文档与代码是否仍对齐，由 [`DOC_SYNC.md`](DOC_SYNC.md) 约束。
