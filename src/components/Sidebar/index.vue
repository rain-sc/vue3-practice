<script setup lang="ts">
import { useAppStore } from '@/store'

const appStore = useAppStore()
</script>

<template>
  <div :class="{ 'has-logo': sidebarLogo }">
    <SidebarLogo v-if="sidebarLogo" :collapse="!appStore.sidebar.opened" />
    <el-scrollbar>
      <!-- <SidebarMenu :menu-list="permissionStore.routes" base-path="" /> -->
    </el-scrollbar>
  </div>
</template>

<style scoped>

</style>
