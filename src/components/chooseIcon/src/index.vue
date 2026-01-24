<script setup lang="ts">
import { ref, watch } from "vue";
import * as Icons from "@element-plus/icons";
import { toElLine } from "@/utils";
import { useCopy } from "@/hooks/useCopy";
const props = defineProps<{
  title: string;
  visible: boolean;
}>();

const localVisible = ref<boolean>(props.visible);

const emit = defineEmits(["update:visible"]);

const handleClick = () => {
  emit("update:visible", !props.visible);
};

const clickItem = (item: string) => {
  useCopy(`el-icon${toElLine(item)}`);
  localVisible.value = false;
};

watch(
  () => props.visible,
  (val) => {
    localVisible.value = val;
  },
);

watch(
  () => localVisible.value,
  (val) => {
    emit("update:visible", val);
  },
);
</script>

<template>
  <el-button @click="handleClick">
    <slot></slot>
  </el-button>
  <div class="m-choose-icon-dialog-body-height">
    <el-dialog :title="title" v-model="localVisible">
      <div class="container">
        <div
        class="item"
        v-for="(item, index) in Object.keys(Icons)"
        :key="index"
        @click="clickItem(item)"
        >
          <div>
            <component :is="`el-icon${toElLine(item)}`"></component>
          </div>
          <div class="text">{{ item }}</div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.item {
  width: 25%;
  height: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  cursor: pointer;
}

.text {
  font-size: 14px;
}

svg {
  width: 2em;
  height: 2em;
}
</style>
