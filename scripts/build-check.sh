#!/bin/sh
# build-check.sh - xy-intro-card 构建检查门禁
# 
# 运行方式：sh scripts/build-check.sh
# 依赖：grep, wc, Node.js（可选，用于测试）

set -e

echo "▶ xy-intro-card 构建检查"
echo ""

# 检查主文件是否存在
if [ ! -f "个人介绍卡生成器.html" ]; then
  echo "❌ 主文件 个人介绍卡生成器.html 不存在"
  exit 1
fi
echo "✅ 主文件存在"

# 检查 HTML 结构
if grep -q '<!DOCTYPE html>' 个人介绍卡生成器.html; then
  echo "✅ 包含 DOCTYPE"
else
  echo "❌ 缺少 DOCTYPE"
  exit 1
fi

if grep -q '<html lang="zh-CN">' 个人介绍卡生成器.html; then
  echo "✅ 包含 html 标签和 lang 属性"
else
  echo "❌ 缺少 lang 属性"
  exit 1
fi

# 检查核心函数
if grep -q 'function buildDoc' 个人介绍卡生成器.html; then
  echo "✅ 包含 buildDoc 函数"
else
  echo "❌ 缺少 buildDoc 函数"
  exit 1
fi

if grep -q 'function esc' 个人介绍卡生成器.html; then
  echo "✅ 包含 esc 转义函数"
else
  echo "❌ 缺少 XSS 防护函数"
  exit 1
fi

# 检查 CSP meta 标签
if grep -q 'Content-Security-Policy' 个人介绍卡生成器.html; then
  echo "✅ 包含 CSP 安全策略"
else
  echo "⚠️  缺少 CSP meta 标签（建议添加）"
fi

# 检查文件大小
SIZE=$(wc -c < 个人介绍卡生成器.html)
if [ "$SIZE" -lt 100000 ]; then
  echo "✅ 文件大小合理（${SIZE} bytes）"
else
  echo "⚠️  文件较大（${SIZE} bytes），考虑优化"
fi

# 检查文档完整性
if [ -d "docs" ]; then
  echo "✅ docs 目录存在"
  if [ -f "docs/ARCHITECTURE.md" ]; then
    echo "✅ ARCHITECTURE.md 存在"
  fi
  if [ -f "docs/PRD.md" ]; then
    echo "✅ PRD.md 存在"
  fi
  if [ -f "docs/FIELDS.md" ]; then
    echo "✅ FIELDS.md 存在"
  fi
else
  echo "⚠️  docs 目录不存在"
fi

# 可选：运行逻辑测试
if command -v node >/dev/null 2>&1 && [ -f "tests/logic.test.js" ]; then
  echo ""
  echo "▶ 运行逻辑测试..."
  node tests/logic.test.js
else
  echo ""
  echo "ℹ️  Node.js 未安装或测试文件不存在，跳过逻辑测试"
  echo "   安装 Node.js 后可运行: node tests/logic.test.js"
fi

echo ""
echo "✅ 所有检查通过"
