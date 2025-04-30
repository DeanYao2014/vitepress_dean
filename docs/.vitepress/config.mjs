import { defineConfig } from 'vitepress'
import { set_sidebar } from './utils/auto_sidebar.js'
// 按需导入
// import Components from 'unplugin-vue-components/vite';
// import AutoImport from 'unplugin-auto-import/vite';
// import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';


export default defineConfig({
  base: '/vitepress_dean/', //通常和github的仓库名一致,对应域名;如果你使用的是 Github（或 GitLab）页面并部署到 user.github.io/repo/，请将 base 设置为 /repo/。
  title: '入库标准', // html 的title meta 信息
  description: '给排水入库要求',// meta html 的description
  lang: 'zh-CN',// 可选值:zh-CN、en-US、ja-JP.. meta html 的lang
  // 关闭死链
  ignoreDeadLinks: true,
  // cleanUrl
  cleanUrls: true,
  themeConfig: {
    logo: 'logo.png',// logo图片
    
    nav: [
      // { text: 'vue3', link: '/vue3/' },
      // { text: 'webgis', link: '/webgis/' },
      { text: '入库要求', link: '/basement/' },
    ],
    sidebar: {
      // 因为设置的doc目录 所以set_sidebar需要从docs读取, 路由是不需要配置docs路径的
      // '/vue3/': set_sidebar('vue3'),
      // '/webgis/': set_sidebar('webgis'),
      '/basement/': set_sidebar('basement'),
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/DeanYao2014' }
    ],
    footer: {
      copyright: 'Copyright © 2019-present Dean Yao',
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
  },
  //    按需导入
  // vite: {
  //   plugins: [
  //     AutoImport({
  //       resolvers: [ElementPlusResolver()],
  //     }),
  //     Components({
  //       resolvers: [ElementPlusResolver()],
  //     }),
  //   ],
  // }
})
