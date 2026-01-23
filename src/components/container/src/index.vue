<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavSide from '@/components/container/src/navSide/index.vue'
import NavHeader from '@/components/container/src/navHeader/index.vue'
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <nav-side />
      </el-aside>
      <el-container>
        <el-header>
          <nav-header/>
        </el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>

</style>
