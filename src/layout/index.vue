<template>
  <p class="headerTitle">电子商务考试软件</p>
  <el-container class="container">
    <el-aside
      v-if="isFrame"
      :style="{ backgroundColor: themeConfig.backgroundColor }"
      ><Menu></Menu
    ></el-aside>
    <el-container>
      <el-main>
        <div class="main-box">
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup name="layout">
import { useRouter, onBeforeRouteUpdate } from "vue-router";
import { onMounted, ref, watch } from "vue";
import store from "../store/index.js";
import Header from "./header/index.vue";
import Menu from "./menu/index.vue";
const themeConfig = store.getters.themeConfig;
console.log(themeConfig.backgroundColor);

let router = useRouter();
const disabled = ref(false);

watch(
  () => router.currentRoute.value.path,
  (newValue, oldValue) => {
    console.log("watch", newValue);
    console.log("watch", oldValue);
    if (newValue == oldValue) {
    } else {
      disabled.value = true;
      setTimeout(() => {
        disabled.value = false;
      }, 1000);
    }
  },
  { immediate: true }
);

let isFrame = ref(true);
onMounted(() => {
  isFrame.value = window.top === window;
});
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
