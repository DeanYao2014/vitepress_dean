# Vitepress
VitePress 是一个静态站点生成器SSG, 抓为构建快速,以内容为中心的站点而设计;



## Static Site Generator SSG

静态站点生成器（Static Site Generator，SSG）是一种工具，它可以根据模板和数据生成静态的HTML页面。与动态网站不同，`静态网站不需要服务器端渲染`，每次访问时都可以直接从文件系统中读取预先生成的HTML文件。

+ SSG的工作原理：

用户编写模板文件（通常使用模板引擎，如Handlebars或Liquid）和数据文件（如Markdown或JSON）。SSG工具读取模板和数据文件，生成静态HTML页面。生成的HTML页面被写入文件系统中。当用户访问网站时，Web服务器直接返回预先生成的HTML页面，而不需要服务器端渲染。

+ 使用SSG的好处包括：

性能：静态网站比动态网站更快，因为不需要服务器端渲染。
安全：静态网站没有服务器端代码，减少了安全风险。
可扩展：静态网站可以轻松部署在CDN或静态网站托管服务上。

## Server-side Rendering

SSR(Server-Side Rendering) 是指在服务器端渲染网页的技术,与SSG不同,SSR需要在每次请求时动态生成网页内容,服务器接收请求，执行服务器端代码，生成HTML页面，然后返回给客户端。

+ SSR的工作原理：

用户发送请求到服务器。
服务器接收请求，执行服务器端代码（如Node.js、Python等）。
服务器端代码生成HTML页面，可能涉及数据库查询、API调用等。
服务器返回生成的HTML页面给客户端。
客户端渲染HTML页面。

> 原则上只在 Vue 组件的 beforeMount 或 mounted 钩子中访问浏览器或 DOM API


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

:::danger
VitePress 是仅 ESM 的软件包。不要使用 require() 导入它，并确保最新的 package.json 包含 "type": "module"，或者更改相关文件的文件扩展名，例如 .vitepress/config.js 到 .mjs/.mts。更多详情请参考 Vite 故障排除指南。此外，在异步 CJS 上下文中，可以使用 await import('vitepress') 代替。
:::

## 特殊语法

::: info
this is an info box.
:::

## config.js配置文件
在 VitePress 项目中，图片文件通常保存在 public 文件夹中
根目录下创建 public, vitepress快速入门 文件夹, img可以保存到对应的文件夹下面;
`![1729421140335](/vitepress快速入门/1729421140335.png)`
![1729421140335](/vitepress快速入门/1729421140335.png)