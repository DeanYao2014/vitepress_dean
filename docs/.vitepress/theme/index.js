// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import './style.css'

// 导入elementplus组件
import "element-plus/dist/index.css";
import elementplus from "element-plus"
// 导入elementplus组件-中文
import zhCn from 'element-plus/es/locale/lang/zh-cn'
// 导入elementplus组件-暗黑模式
import 'element-plus/theme-chalk/dark/css-vars.css'
// 导入elementplus组件-图标组件
// import * as ElementPlusIconsVue from '@element-plus/icons-vue'

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  // layout属性是必须的
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    // ...
    // 导入elementplus组件
    app.use(elementplus, {
      locale: zhCn,
    });
  }
}
