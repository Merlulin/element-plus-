<script setup lang="ts">
import {list, actions} from './lib/data';
import type { ListItem, ListAction } from '@/components/list/src/type';

const itemClick = (item: ListItem, index: number) => {
    console.log('item click', item, index);
}

const actionClick = (action: ListAction, index: number) => {
    console.log('action click', action, index);
}
</script>

<template>
    <m-notification>
        <template #default>
            <m-list :options="list" :actions="actions" @itemClick="itemClick" @actionClick="actionClick"></m-list>
        </template>
    </m-notification>
</template>

<style scoped lang="scss">

</style>