<template>
    <div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="name" label="名称" width="180">
          <template #default="scope">
            <el-input v-model="scope.row.name" />
          </template>
        </el-table-column>
        <el-table-column prop="age" label="年龄" width="180">
          <template #default="scope">
            <el-input v-model="scope.row.age" />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template #default="scope">
            <el-button @click="removeRow(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button @click="addRow">新增行</el-button>
      <el-button @click="exportTable">导出表格</el-button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { ElMessage } from 'element-plus'
  
  const tableData = ref([
    { name: '张三', age: 25 },
    { name: '李四', age: 30 },
    { name: '王五', age: 35 }
  ])
  
  const addRow = () => {
    tableData.value.push({ name: '', age: '' })
  }
  
  const removeRow = (index) => {
    tableData.value.splice(index, 1)
  }
  
  const exportTable = () => {
    const headers = ['名称', '年龄']
    const rows = tableData.value.map(row => [row.name, row.age])
  
    const csvContent = [
      '\uFEFF' + headers.join(','), // 添加 BOM 以避免 CSV 文件乱码
      ...rows.map(row => row.join(','))
    ].join('\n')
  
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.setAttribute('download', 'table-export.csv')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
  </script>
  
  <style scoped>
  .el-table {
    margin-bottom: 20px;
  }
  </style>
  