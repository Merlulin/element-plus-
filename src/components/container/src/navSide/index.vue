<script setup lang="ts">
  const props = defineProps<{
    isCollapse: boolean
  }>()

  const data =  [
  {
    name: '首页',
    index: '/',
    icon: 'House',
  }, {
    name: '选择标签',
    index: '/chooseIcon',
    icon: 'Picture',
  }, {
    name: '选择地图',
    index: '/chooseArea',
    icon: 'Setting',
  }, {
    name: '菜单',
    index: '/menu',
    icon: 'Menu',
  }
]
</script>

<template>  
  <m-menu :data="data" router :defaultActive="$route.path"></m-menu>  
</template>

<style scoped lang="scss">

</style>
