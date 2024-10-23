<template>
    <el-dialog
      :visible.sync="visible"
      width="80%"
      :before-close="handleClose"
      title="详细表格"
    >
      <div class="table-container">
        <slot></slot> <!-- 用插槽显示传入的表格内容 -->
      </div>
      
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">关闭</el-button>
      </span>
    </el-dialog>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue';
  import { ElDialog, ElButton } from 'element-plus';
  
  // 定义 props 接收父组件传递的 visible 控制状态
  const props = defineProps({
    visible: {
      type: Boolean,
      default: false,
    },
  });
  
  // 定义 emit 事件
  const emit = defineEmits(['update:visible']);
  
  function handleClose() {
    emit('update:visible', false); // 关闭时发出事件，通知父组件更新状态
  }
  </script>
  
  <style scoped>
  .table-container {
    overflow-x: auto;
    max-height: 80vh; /* 控制表格的最大高度 */
  }
  </style>
  