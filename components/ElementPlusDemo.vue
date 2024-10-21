// 创建一个简单的案例 , 创建几个el-button
<template>
    <div>
        <el-button>默认按钮</el-button>
        <el-button type="primary">主要按钮</el-button>
        <el-button type="success">成功按钮</el-button>
        <el-button type="info">信息按钮</el-button>
        <el-button type="warning">警告按钮</el-button>
        <el-button type="danger">危险按钮</el-button>
    </div>
</template>
<script setup>
import { ElButton } from 'element-plus'
import 'element-plus/dist/index.css'
</script>