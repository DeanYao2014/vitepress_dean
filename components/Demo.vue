<script setup>
import { ref } from 'vue'
const person = ref({
  name: '张三',
  age: 18
})

</script>

<template>
  <div>
    学生信息:<span> {{ person.name }}, {{ person.age }}</span
    >岁
  </div>
</template>

<style lang="css" scoped>
span {
  color: red;
  font-size: 20px;
}
</style>
