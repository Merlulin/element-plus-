<script setup lang="ts">
  const props = defineProps<{
    isCollapse: boolean
  }>()

  let emits = defineEmits(['update:isCollapse'])
  let toggle = () => {
    emits('update:isCollapse', !props.isCollapse)
  }
</script>

<template>
  <div class="header">
    <span @click="toggle">
      <el-icon-expand v-if="isCollapse"></el-icon-expand>
      <el-icon-fold v-else></el-icon-fold>
    </span>
    header
  </div>

</template>

<style scoped lang="scss">
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
  }
  .header {
    height: 60px;
    padding: 0 20px;
    display: flex;
    align-items: center;
  }
</style>
