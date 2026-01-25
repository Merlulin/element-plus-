<script setup lang="ts">
import type list from '@/components/list';
import { toElLine } from '@/utils';
const props = defineProps({
    notificationIcon: {
        type: String,
        default: 'ChatSquare'
    },
    valueNotication: {
        type: Number,
        default: 1
    },
    maxNotification: {
        type: Number,
        default: 99
    },
})
</script>

<template>
    <div>
        <el-popover placement="bottom-start" :width="350" trigger="click">
            <template #reference>
                <el-badge style="cursor:pointer" :value="valueNotication" :max="maxNotification">
                    <el-icon size="2em">
                        <component :is="`el-icon${toElLine(notificationIcon)}`" />
                    </el-icon>
                </el-badge>
            </template>
            <slot></slot>
        </el-popover>
    </div>
</template>

<style scoped lang="scss">

</style>