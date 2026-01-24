<script setup lang="ts">
import { RouterView } from 'vue-router'
import { ref } from 'vue'
import NavSide from '@/components/container/src/navSide/index.vue'
import NavHeader from '@/components/container/src/navHeader/index.vue'

const isCollapse = ref(false)

</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="auto">
        <nav-side :is-collapse="isCollapse"/>
      </el-aside>
      <el-container>
        <el-header>
          <nav-header v-model:isCollapse="isCollapse"/>
        </el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
  .el-header {
    padding: 0;
    border-bottom: 1px solid #eee;
  }
</style>
