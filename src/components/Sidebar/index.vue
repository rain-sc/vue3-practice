<script setup lang="ts">
import router from '@/router'
import { useAppStore } from '@/store'

const appStore = useAppStore()
const sidebarLogo = computed(() => appStore.sidebarLogo)

console.log('router', router)
</script>

<template>
  <div :class="{ 'has-logo': sidebarLogo }">
    <SidebarLogo v-show="sidebarLogo" :collapse="!appStore.sidebar.opened" />
    <el-scrollbar>
      <SidebarMenu :menu-list="router.options.routes" base-path="" />
    </el-scrollbar>
  </div>
</template>

<style lang="scss" scoped>
.has-logo {
  .el-scrollbar {
    height: calc(100vh - $navbar-height);
  }
}
</style>
