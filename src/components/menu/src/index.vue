<script setup lang="ts">
    import type { MenuItem } from './type';
    import type { PropType } from 'vue';
    import { toElLine } from '@/utils';
    
    const props = defineProps({
        data: {
            type: Array as PropType<MenuItem[]>,
            default: () => [],
            required: true,
        },
        router: {
            type: Boolean,
            default: false,
        },
        defaultActive: {
            type: String,
            default: '1',
        },
    })

</script>

<template>
    <el-menu :default-active="defaultActive" :router="router">
        <template v-for="(item, index) in data" :key="index" >
            <el-menu-item v-if="!item.children || !item.children.length" :index="item.index">
                <component v-if="item.icon" :is="`el-icon${toElLine(item.icon)}`" style="margin-right: 5px;"></component>
                <span>{{ item.name }}</span>
            </el-menu-item> 
            <el-sub-menu v-else-if="item.children && item.children.length" :index="item.index">
                <template #title>
                    <component v-if="item.icon" :is="`el-icon${toElLine(item.icon)}`" style="margin-right: 5px;"></component>
                    <span>{{ item.name }}</span>
                </template>
                <el-menu-item v-for="(child, childIndex) in item.children" :key="childIndex" :index="child.index">
                    <div>{{ child.name }}</div>
                </el-menu-item>
            </el-sub-menu>
            
        </template>
    </el-menu>
</template>

<style scoped lang="scss">

</style>