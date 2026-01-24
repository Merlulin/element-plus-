<script setup lang="ts">
import Areas from "../lib/pca-code.json";
import { ref, watch } from "vue";

const province = ref<string>("");
const city = ref<string>("");
const area = ref<string>("");
const areas = ref(Areas);

export interface AreaItem {
  code: string;
  name: string;
  children?: AreaItem[];
}

export interface Data {
  code: string;
  name: string;
}

const emit = defineEmits(["change"]);

let selectCities = ref<AreaItem[]>([]);
let selectAreas = ref<AreaItem[]>([]);
watch(
  () => province.value,
  (val) => {
    if (val) {
      let cities = areas.value.find((item) => item.code === val)?.children!;
      selectCities.value = cities;
    }
    city.value = "";
    area.value = "";
  },
);

watch(
  () => city.value,
  (val) => {
    if (val) {
      let areas = selectCities.value.find((item) => item.code === val)?.children!;
      selectAreas.value = areas;
    }
    area.value = "";
  },
);

watch(() => area.value,(val) => {
    if (val) {
      let provinceData: Data = {
        code: province.value,
        name: province.value && areas.value.find((item) => item.code === province.value)?.name || "",
      };
      let cityData: Data = {
        code: city.value,
        name: city.value && selectCities.value.find((item) => item.code === city.value)?.name || "",
      };
      let areaData: Data = {
        code: area.value,
        name: val && selectAreas.value.find((item) => item.code === area.value)?.name || "",
      };
      emit("change", {
        province: provinceData,
        city: cityData,
        area: areaData,
      });
    }
  },
);
</script>
<template>
  <el-select clearable placeholder="选择省份" style="width: 240px" v-model="province">
    <el-option
      v-for="item in areas"
      :key="item.code"
      :value="item.code"
      :label="item.name"
    ></el-option>
  </el-select>
  <el-select
    clearable
    :disabled="!province"
    placeholder="选择城市"
    style="width: 240px; padding: 0 20px"
    v-model="city"
  >
    <el-option
      v-for="item in selectCities"
      :key="item.code"
      :value="item.code"
      :label="item.name"
    ></el-option>
  </el-select>
  <el-select
    clearable
    :disabled="!province || !city"
    placeholder="选择区县"
    style="width: 240px"
    v-model="area"
  >
    <el-option
      v-for="item in selectAreas"
      :key="item.code"
      :value="item.code"
      :label="item.name"
    ></el-option>
  </el-select>
</template>

<style scoped lang="scss"></style>
