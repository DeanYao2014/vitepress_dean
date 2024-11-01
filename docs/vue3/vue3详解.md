# vue3

## 导入

`<script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>`

## Pinia

pinia中的this 是当前仓库的实例,所以可以直接使用this.$store.state来获取仓库的state,这样就可以在vue中使用了

解构仓库实例: 直接解构是没有响应式的

### 安装 & 导入

`pnpm install pinia` 

```js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)

app.use(createPinia())

app.mount('#app')
```

### Pinia defineStore的声明
store是一个reactive包装的对象,不需要.value ,通过对象.属性去使用, 直接解构属性丢失响应式;
> 使用sotreToRefs()实现响应式,属性值少完全是可以通过对象.属性使用 ,而不需要解构

+ 选项式: counter.js
```js
import { defineStore } from 'pinia'
// 定义store
export const useCounterStore = defineStore('counter', {
    state: () => ({ count: 0 }),
    actions: {
        increment() {
            this.count++ // this 指向当前仓库,vue3中一般不使用this
        }
    },
    getters: {
        doubleCount: (state) => state.count * 2
    }

})

```
+ 函数式: counter.js
```js
import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useCounterStore = defineStore('counter', () => {
    // 声明state
    const count = ref(0)
    // 声明actions
    const increment = () => {
        count.value++
    }
    // 计算属性 需要使用computed 类似与getters, 
    const doubleCount = computed(() => count.value * 2)
    return { count, increment, doubleCount }
},{
    persist: true// 当前模块持久化
})

```

打印useCounterStore的结构如下:


### Pinia的使用


```js
// 1. 拿到仓库实例, 调用方法即可
const counterStore = useCounterStore()
console.log('counterStore', counterStore) 
// 使用属性
console.log('counterStore.count', counterStore.count)
// 使用方法
counterStore.increment()

// 直接解构 属性是没有响应式的
const { count, increment } = useCounterStore()
console.log('count', count)

// 使用sotreToRefs()实现响应式
const { count, doubleCount } = storeToRefs(useCounterStore())


```

### 持久化pinia
该插件默认使用localstorage进行持久化, 使用`store.$id`作为storage默认的key,
使用`JSON.stringify/ JSON.parse`  进行序列化和反序列化,整个state都会被序列化


+ 安装: ```pnpm install pinia-plugin-persistedstate```
+ 向pinia添加插件:
```js
import { createPinia } from 'pinia'


const pinia = createPinia()
pinia.use(piniaPluginPersistedstate) // 添加插件


import { createApp } from 'vue'
import { createPinia } from 'pinia'

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'  // [!code ++]

import App from './App.vue'

const app = createApp(App)

app.use(createPinia().use(piniaPluginPersistedstate)) // [!code ++]

app.mount('#app')

```

+ 开启持久化
```
defineStore('counter', () => {
    // 声明state
    const count = ref(0)
    // 声明actions
    const increment = () => {
        count.value++
    }
    // 计算属性 需要使用computed 类似与getters, 
    const doubleCount = computed(() => count.value * 2)
    return { count, increment, doubleCount }
},{
    persist: true, //  [!code focus]
    // 默认是defineStore的仓库名
    key: 'counter', // [!code focus]
    // 默认是localStorage
    storage: sessionStorage, // [!code focus]

})
```


