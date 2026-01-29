<script setup lang="ts">
const data = [
    /* menu data */
    {
        name: '导航1',
        index: '1',
        icon: 'Menu',
        children: [
            {
                name: '导航1-1',
                index: '1-1',
            },
            {
                name: '导航1-2',
                index: '1-2',
            },
        ],
    },
    {
        name: '导航2',
        index: '2',
        icon: 'Grid',
    },
    {
        name: '导航3',
        index: '3',
        icon: 'Document',
    },
]
</script>

<template>
    <m-menu :data="data" style="width: 200px;"></m-menu>
</template>

<style scoped lang="scss">

</style>