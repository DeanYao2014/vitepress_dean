// import { defineConfig } from 'vitepress'

// // https://vitepress.dev/reference/site-config
// export default defineConfig({
//   title: "The way to webgis",
//   description: "用于记录自己的学习心得",
//   themeConfig: {
//     // https://vitepress.dev/reference/default-theme-config
//     nav: [
//       { text: 'Home', link: '/' },
//       { text: 'Examples', link: '/markdown-examples' }
//     ],

//     sidebar: [
//       {
//         text: 'Examples',
//         items: [
//           { text: 'Markdown Examples', link: '/markdown-examples' },
//           { text: 'Runtime API Examples', link: '/api-examples' }
//         ]
//       }
//     ],

//     socialLinks: [
//       { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
//     ]
//   }
// })
import { defineConfig } from 'vitepress'
import { set_sidebar } from './utils/auto_sidebar.mjs'

export default defineConfig({
  base: '/vitepress_dean/', //通常和github的仓库名一致,对应域名;如果你使用的是 Github（或 GitLab）页面并部署到 user.github.io/repo/，请将 base 设置为 /repo/。
  title: 'Webgis之路',
  description: 'A VitePress Site I like it',
  themeConfig: {
    logo: 'logo.png',
    nav: [
      { text: 'Home', items: [
        { text: 'Home', link: '/' },
        { text: 'Markdown Examples', link: '/markdown-examples' }
      ]},
      { text: 'vue3', link: '/vue3/' },
      { text: 'webgis', link: '/webgis/' },
      { text: 'basement', link: '/basement/vitepress快速入门' },
    ],
    sidebar: {
      // 因为设置的doc目录 所以set_sidebar需要从docs读取, 路由是不需要配置docs路径的
      '/vue3/': set_sidebar('vue3'),
      '/webgis/': set_sidebar('webgis'),
      '/basement/': set_sidebar('basement'),
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/DeanYao2014' }
    ],
    footer: {
      copyright: 'Copyright © 2019-present Evan You'
    },
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
  }
})
