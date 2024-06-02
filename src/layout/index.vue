<script setup lang="ts">
import {
  useAppStore,
} from '@/store'

const appStore = useAppStore()
const classObj = computed(() => ({
  hideSidebar: !appStore.sidebar.opened,
  openSidebar: appStore.sidebar.opened,
}))
</script>

<template>
  <div class="wh-full layout-left" :class="classObj">
    <div class="main-container">
      <div>
        <NavBar />
      </div>
      <AppMain />
    </div>
  </div>
</template>

<style scoped>

</style>
