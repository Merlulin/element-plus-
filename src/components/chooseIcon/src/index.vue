<script setup lang="ts">
import { ref, watch } from 'vue'
let props = defineProps<{
    title: string,
    visible: boolean
}>()

let localVisible = ref<boolean>(props.visible)

let emit = defineEmits(["update:visible"])
    
let handleClick = () => {
    emit("update:visible", !props.visible)
}

watch(() => props.visible, val => {
    localVisible.value = val
})

watch(() => localVisible.value, val => {
    emit("update:visible", val)
})

</script>

<template>
    <el-button @click="handleClick">
        <slot></slot>
    </el-button>
    <el-dialog :title="title" v-model="localVisible">111</el-dialog>
</template>

<style scoped>

</style>