<script setup lang="ts">
  const props = defineProps<{
    isCollapse: boolean
  }>()
</script>

<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
  >
    <el-menu-item index="1">
      <el-icon><el-icon-menu /></el-icon>
      <span>首页</span>
    </el-menu-item>
    <el-menu-item index="2">
      <el-icon><el-icon-menu /></el-icon>
      <span>图标选择器</span>
    </el-menu-item>
    <el-menu-item index="3">
      <el-icon><el-icon-document /></el-icon>
      <span>标记</span>
    </el-menu-item>
  </el-menu>
</template>

<style scoped lang="scss">

</style>
