---
hello: world
---

<script setup>
import { ref } from 'vue'
import Demo from '../../components/Demo.vue'
import GisDemo from '../../components/GisDemo.vue'
import ElementPlusDemo from '../../components/ElementPlusDemo.vue'
import Editable from '../../components/Editable.vue'
// import { ElSwitch } from 'element-plus'
// import { Check } from '@element-plus/icons-vue'
const count = ref(0)

import { useData } from 'vitepress'

const { page } = useData()



const value1 = ref(true)
const value2 = ref(true)
</script>

## Markdown Content

The count is: {{ count }}

<button :class="$style.button" @click="count++">Increment</button>


## useData辅助函数
<pre>{{ page }}</pre>


## 导入组件
推荐使用PascalCase
<Demo />

## 转义

:::v-pre
{{ this will be displayed as-is }}
:::

> 默认代码块是保持代码结构, 但是如果代码块备注-vue 会解析内部的语法

```JavaScript-vue
Hello {{ 1 + 1}}
```

## css预处理
VitePress 内置支持 CSS 预处理器：.scss、.sass、.less、.styl 和 .stylus 文件。无需为它们安装 Vite 专用插件，但必须安装相应的预处理器：
```
# .scss and .sass
npm install -D sass

# .less
npm install -D less

# .styl and .stylus
npm install -D stylus
```


## webgis 迟滞
<GisDemo />

## Elementplus
<ElementPlusDemo />

  <el-switch v-model="value1" />
  <el-switch
    v-model="value2"
    class="ml-2"
    style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
  />

<el-icon :size="20">
    <Check />
</el-icon>

## 测试 组件导入 表格
<Editable />


<style module>
.button {
  color: red;
  font-weight: bold;
}
</style>