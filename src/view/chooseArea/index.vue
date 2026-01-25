<script setup lang="ts">
const targetArea = (area: any) => {
    console.log('选择的地区信息：', area)
}
</script>
    
<template>
    <m-choose-area @change="targetArea"></m-choose-area>
</template>

<style scoped lang="scss">

</style>