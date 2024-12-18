## Vitepress

VitePress 是一个静态站点生成器SSG, 专为构建快速、以内容为中心的站点而设计.
> 类似的 vuepress,hexo, python得到shpinx mkdocs, react 有docusaurus

1. Vite 驱动：即时服务器启动，始终立即反映 (<100ms) 编辑变化，无需重新加载页面。
2. 内置 Markdown 扩展：frontmatter、表格、语法高亮……应有尽有。具体来说，VitePress 提供了许多用于处理代码块的高级功能，使其真正成为技术文档的理想选择。
3. Vue 增强的 Markdown：每个 Markdown 页面都是 Vue 单文件组件，这要归功于 Vue 模板与 HTML 的 100% 语法兼容性。可以使用 Vue 模板语法或导入的 Vue 组件在静态内容中嵌入交互性。

> VitePress 生成的网站在初次访问时提供静态 HTML，但它变成了单页应用程序（SPA）进行站点内的后续导航
> 预加载: SPA 模型在首次加载后能够提升用户体验。用户在站点内导航时，不会再触发整个页面的刷新。
> 动静加载: 每个 Markdown 页面都被处理为 Vue 组件并编译成 JavaScript, Vue 编译器足够聪明，可以将静态md语法和动态vue部分分开，从而最大限度地减少激活成本和有效负载大小

> 完全的自定义主题
> 加载数据(本地or远程)
> 动态生成路由
> markdown扩展语法
> frontmatter

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

// Vue作为peer dependency, 如果使用Vue组件 or api定义应该安装vue
//安装vue3 最新的稳定版本
pnpm add vue@3 
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

:::tip
VitePress 是仅 ESM 的软件包。不要使用 require() 导入它，并确保最新的 package.json 包含 "type": "module"，或者更改相关文件的文件扩展名，例如 .vitepress/config.js 到 .mjs/.mts。更多详情请参考 Vite 故障排除指南。此外，在异步 CJS 上下文中，可以使用 await import('vitepress') 代替。
:::

### 配置element-plus arcgis

增加额外的功能

```js
// 安装Element-plus icons-vue
pnpm add element-plus
pnpm add @element-plus/icons-vue
// 测试了有个问题 :按需导入组件中可以正常,但是Markdown中使用element-plus有问题 
// pnpm add -D unplugin-vue-components unplugin-auto-import

// 安装arcgis maps sdk for javscript
pnpm add @arcgis/core

```

> 按需导入,我配置之后有问题, 只能在组件中争取的按需导入,在Markdown文件中不能使用
> arcgis maps sdk for javscript基本上是在组件中使用,编写组件,在Markdown的setup中import该组件即可, 样式需在全局导入 `import * as ElementPlusIconsVue from '@element-plus/icons-vue';`

```js
import { defineClientConfig } from '@vuepress/client';
// 导入element-plus icon等相关组件
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

// 全局导入样式
import '@arcgis/core/assets/esri/themes/light/main.css'

export default defineClientConfig({
  enhance({ app }) {
    // 推荐全局导入 Element-Plus 组件
    app.use(ElementPlus);

    // 注册 Element-Plus 图标
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component);
    }
  },
});
```

## 特殊语法

+ `:::`创建自定义容器的语法
  ::: info
  info/danger/warning/info
  this is an info box.
  :::

## config.js配置文件

在 VitePress 项目中，图片文件通常保存在 public 文件夹中
根目录下创建 public, vitepress快速入门 文件夹, img可以保存到对应的文件夹下面;
`![1729421140335](/image/vitepress快速入门/1729421140335.png)`
![1729421140335](/vitepress快速入门/1729421140335.png)

```js
import { defineConfig } from 'vitepress'

export default defineConfig({
  // 设置网站的基础 URL
  base: '/my-project/',

  // 设置网站的标题
  title: 'My VitePress Site',

  // 设置网站的描述，用于 SEO 和 SNS 分享
  description: 'A VitePress Site Example',

  // 设置网站的 logo 图片路径
  logo: '/logo.png',

  themeConfig: {
    // 配置导航栏
    nav: [
      { text: 'Home', link: '/' }, // 导航链接，指向首页
      { text: 'Guide', link: '/guide/' }, // 导航链接，指向指南页面
      {
        text: 'Languages',
        items: [
          { text: 'Chinese', link: '/language/chinese/' }, // 下拉菜单，指向中文页面
          { text: 'Japanese', link: '/language/japanese/' } // 下拉菜单，指向日文页面
        ]
      }
    ],

    // 配置侧边栏
    sidebar: {
      '/guide/': [
        {
          text: 'Introduction',
          children: ['/guide/README.md', '/guide/getting-started.md'] // 侧边栏链接，指向指南介绍和入门页面
        },
        {
          text: 'Advanced',
          children: ['/guide/advanced/config.md', '/guide/advanced/theme.md'] // 侧边栏链接，指向高级配置和主题页面
        }
      ],
      '/api/': [
        '/api/README.md', // 侧边栏链接，指向 API 介绍页面
        '/api/endpoints.md' // 侧边栏链接，指向 API 端点页面
      ]
    },

    // 配置搜索功能
    // search: {
    //   maxSuggestions: 10 // 搜索建议的最大数量
    // },
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索',
            buttonAriaLabel: '搜索'
          },
          modal: {
            noResultsText: '找不到结果',
            resetButtonTitle: '清除查询条件',
            footer: {
              selectText: '选择',
              navigateText: '切换'
            }
          }
        }
      }
    }
    // 配置 Algolia 搜索 
    // algolia搜索可以和本地同时配置
    // algolia: {
    //   apiKey: 'YOUR_ALGOLIA_API_KEY', // Algolia 的 API 密钥
    //   indexName: 'YOUR_INDEX_NAME' // Algolia 索引名称
    // },

    // 配置页脚内容
    footer: {
      message: 'Released under the MIT License.', // 页脚信息
      copyright: 'Copyright © 2024 My Company' // 版权信息
    }
  },

  // 配置 Markdown 渲染选项
  markdown: {
    lineNumbers: true, // 是否在代码块中显示行号
    toc: { includeLevel: [1, 2, 3] }, // 配置目录包含的标题级别
    anchor: { permalink: false }, // 配置标题锚点
    config: (md) => {
      md.use(require('markdown-it-footnote')) // 使用 markdown-it-footnote 插件
    }
  },

  // 设置输出目录
  dest: 'dist'
})
```



## 路由

VitePress 使用给予文件的路由. 路径和根目录有关, 默认我们一般保存在docs文件夹中, 执行
`vitepress dev docs` 就会生成md文件的对应路由; 也可以将md保存在docs/src 某个文件夹下面,设置`srcDir:'src'` 对应生成src文件夹下对应md的路由

+ 根目录Project root: VitePress 将尝试寻找 `.vitepress` 特殊目录的地方
+ 源目录 source directory: 源目录是 Markdown 源文件所在的位置。默认情况下，它与项目根目录相同。`srcDir:'src'` srcDir选项相对于项目根目录解析的, 以上命令相当于从docs/src的目录下生成链接
```text
.                          # 项目根目录
├─ .vitepress              # 配置目录
└─ src                     # 源目录
   ├─ getting-started.md
   └─ index.md
```
生成的链接
```text
src/index.md            -->  /index.html (可以通过 / 访问)
src/getting-started.md  -->  /getting-started.html
```
> 如果 VitePress 项目位于 ./docs，应该运行 `vitepress dev docs` , 以下是package.json中的配置`"docs:dev": "vitepress dev docs",`

```text
docs/index.md            -->  /index.html (可以通过 / 访问)
docs/getting-started.md  -->  /getting-started.html
```

### 链接页面

+ [相对链接git入门](./git入门)
+ [`/`连接到非vitepress页面](/vitepress快速入门/1729421140335.png)
+ [`./`连接到非vitepress页面](./vitepress快速入门/1729421140335.png)
+ [` ` 连接到非vitepress页面](vitepress快速入门/1729421140335.png)

`.` 相对路径, 表示从当前文件所在目录开始查找资源, 同级别目录
`/` 绝对路径,从网站的根目录开始查找资源, 无视当前路径 `http://localhost:5173/{base}`  `config.js` 中配置 `base: '/vitepress_dean/'` 斜杠开始斜杠结尾
` `: 相对路径,没有小时的使用`./`也是表示从当前文件所在目录开始查找,效果与`./`相同 `http://localhost:5173/vitepress_dean/basement/` 


### 路由重写

rewrites
```js
rewrites: {
    'packages/:pkg/src/(.*)': ':pkg/index.md'
}
```

### 自动生成路由
`theme/index.js`
```js
import path from "node:path";
import fs from "node:fs";

// 文件根目录 resolve() 方法用于将相对路径转为绝对路径
const DIR_PATH = path.resolve('docs');
// 白名单,过滤不是文章的文件和文件夹
// WHITE_LIST为什么要把index.md放进去? 可能叫做blacklist 更合理 ,这里的文件名是用来排除的
// const WHITE_LIST = [
const BLACK_LIST = [
  "index.md",
  ".vitepress",
  "node_modules",
  ".idea",
  "assets",
  "image"
];

// 判断是否是文件夹
const isDirectory = (path) => fs.lstatSync(path).isDirectory();

// 取差值: arr1中有的,且arr2中没有
const intersections = (arr1, arr2) =>
  Array.from(new Set(arr1.filter((item) => !new Set(arr2).has(item))));

// 把方法导出直接使用
function getList(params, path1, pathname) {
  // path1 是文件夹的绝对路径
  // pathname 是遍历文件夹的名字
  // params 是文件夹下的所有文件或文件夹:
  // 存放结果
  const res = [];
  // 开始遍历params
  console.log('params', params)
  for (const file of params) {
    // 拼接目录
    // console.log('file', typeof file,path1)
    const dir = path.join(path1, file);
    console.log('dir', dir, file)
    // 判断是否是文件夹
    const isDir = isDirectory(dir);
    if (isDir) {
      // 如果是文件夹,读取之后作为下一次递归参数
      const files = fs.readdirSync(dir);
      res.push({
        text: file,
        collapsible: true,
        items: getList(files, dir, `${pathname}/${file}`),
      });
    } else {
      // 获取名字
      const name = path.basename(file);
      // 排除非 md 文件
      const suffix = path.extname(file);
      if (suffix !== ".md") {
        continue;
      }
      res.push({
        text: name,
        link: `${pathname}/${name}`,
      });
    }
  }
  // 对name做一下处理，把后缀删除
  res.map((item) => {
    item.text = item.text.replace(/\.md$/, "");
  });
  return res;
}

export const set_sidebar = (pathname) => {
  // 获取pathname的路径
  const dirPath = path.join(DIR_PATH, pathname);
  // 读取pathname下的所有文件或者文件夹 , 如果是文件夹,不会递归文件夹中的子文件;
  const files = fs.readdirSync(dirPath);
  // 过滤掉
  const items = intersections(files, BLACK_LIST);
  // getList 函数后面会讲到
  return getList(items, dirPath, pathname);
};
```