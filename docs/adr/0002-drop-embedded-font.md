# ADR-0002: 移除内嵌花体字体，改用系统回退

## 状态
采纳（Accepted） · 2026-09

## 背景

早期成品卡内嵌了一个约 44.5KB 的 base64 花体字体（woff2），使单文件从约 21KB 膨胀到约 110KB，且字体仅覆盖拉丁字符，中文标语无法受益。

## 决策

移除内嵌字体，英文标语改用系统自带花体回退链：`"Apple Chancery", "Snell Roundhand", "Segoe Script", "Bradley Hand", cursive`。

## 权衡

- 收益：导出卡体积从 ~110KB 降到 ~21KB；换人 / 编辑更轻；中文不再有「字体缺字」风险。
- 代价：不同操作系统下花体字样略有差异（macOS/iOS 上的 Apple Chancery 与 Windows 上的 Segoe Script 不完全一致）。这是为体积与通用性接受的有意取舍。
- 若未来坚持像素级统一花体，可重新内嵌字体，但会回到 ~110KB，需单独记 ADR 并过重审。
