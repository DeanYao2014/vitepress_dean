# Vitepress
详细的请参看官方的介绍
[Vitepress官方网站](https://vitepress.dev/zh/guide/getting-started)
## 安装+配置

Node.js 18版本及以上
```JavaScript
// 安装依赖
pnpm add -D vitepress

// 初始化 vitepress
pnpm vitepress init

// 启动 注意.vitepress是
 pnpm vitepress dev docs


┌  Welcome to VitePress!
│
◇  Where should VitePress initialize the config?
│  ./docs  // 推荐安装到docs目录, 
│
◇  Site title:
│  My Awesome Project // 
│
◇  Site description:
│  A VitePress Site
│
◆  Theme:
│  ● Default Theme (Out of the box, good-looking docs)
│  ○ Default Theme + Customization
│  ○ Custom Theme
└
```
格式:
```
.
├─ docs
│  ├─ .vitepress
│  │  └─ config.js
│  ├─ api-examples.md
│  ├─ markdown-examples.md
│  └─ index.md
└─ package.json
```

## 特殊语法

::: info
this is an info box.
:::

## config.js配置文件
在 VitePress 项目中，图片文件通常保存在 public 文件夹中
根目录下创建 public, vitepress快速入门 文件夹, img可以保存到对应的文件夹下面;
`![1729421140335](/vitepress快速入门/1729421140335.png)`
![1729421140335](/vitepress快速入门/1729421140335.png)