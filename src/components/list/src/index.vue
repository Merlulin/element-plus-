<script setup lang="ts">
import type { PropType } from 'vue';
import type { ListItem, ListOption, ListAction } from './type';
import { toElLine } from '@/utils';
const props = defineProps({
    options: {
        type: Array as PropType<ListOption[]>,
        required: true
    },
    actions: {
        type: Array as PropType<ListAction[]>,
        required: true
    }
})

const emit = defineEmits(['itemClick', 'actionClick']);

const itemClick = (item: ListItem, index: number) => {
    emit('itemClick', item, index);
}

const actionClick = (action: ListAction, index: number) => {
    emit('actionClick', action, index);
}

</script>

<template>
    <el-tabs :options="options" class="list-tabs__item">
        <el-tab-pane v-for="(option, index) in options" :key="index" :label="option.title">
            <el-scrollbar height="200px">
                <div class="container" v-for="(item, index) in option.content" :key="index" @click="itemClick(item, index)">
                    <div class="avator" v-if="item.avatar">
                        <el-avatar size="default" :src="item.avatar" />
                    </div>
                    <div class="content">
                        <div class="title" v-if="item.title">
                            <div> {{ item.title }} </div>
                            <div class="tag" v-if="item.tag">
                                <el-tag :type="item.tagType" size="default" style="font-size: 14px;">{{ item.tag
                                }}</el-tag>
                            </div>
                        </div>
                        <div class="desc" v-if="item.desc">{{ item.desc }}</div>
                        <div class="time" v-if="item.time">{{ item.time }}</div>
                    </div>
                </div>
            </el-scrollbar>
            <div class="actions">
                <div class="action-item" :class="{ border: index != actions.length - 1 }" v-for="(action, index) in actions" :key="index" @click="actionClick(action, index)">
                    <div class="action-icon" v-if="action.icon">
                        <component :is="`el-icon-${toElLine(action.icon)}`" />
                    </div>
                    <div>{{ action.text }}</div>
                </div>
            </div>
        </el-tab-pane>
    </el-tabs>
</template>

<style scoped lang="scss">
.container {
    display: flex;
    align-items: center;
    padding: 10px 20px;

    .avator {
        flex: 1;
    }

    .content {
        flex: 3;
        cursor: pointer;
        &:hover {
            color: #409eff;
        }
        .title {
            font-size: 16px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .time {
            font-size: 12px;
            color: #999;
            margin-top: 2px;
        }
    }
}

.actions {
    display: flex;
    align-items: center;
    height: 40px;
    border-top: 1px solid #eee;
    .action-item {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        &:hover {
            color: #409eff;
        }
        .action-icon {
            margin-right: 5px;
            display: flex;
            position: relative;
            align-items: center;
            justify-content: center;
        }
        
    }
}

.border {
    border-right: 1px solid #eee;
}
</style>