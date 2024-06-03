<script setup lang="ts">
import { useAppStore } from '@/store'
import logo from '@/assets/common/logo.png'
import defaultSettings from '@/settings'

defineProps({
  collapse: {
    type: Boolean,
    required: true,
  },
})

const appStore = useAppStore()
</script>

<template>
  <div class="logo-container">
    <transition enter-active-class="animate__animated animate__fadeInLeft">
      <router-link v-if="collapse" class="wh-full flex-center" to="/">
        <img v-if="appStore.sidebarLogo" :src="logo" class="logo-image">
      </router-link>

      <router-link v-else class="wh-full flex-center" to="/">
        <img v-if="appStore.sidebarLogo" :src="logo" class="logo-image">
        <span class="logo-title"> {{ defaultSettings.title }}</span>
      </router-link>
    </transition>
  </div>
</template>

<style scoped lang="scss">
.logo-container {
  width: 100%;
  height: $navbar-height;
  background-color: $sidebar-logo-background;

  .logo-image {
    width: 20px;
    height: 20px;
  }

  .logo-title {
    flex-shrink: 0;
    margin-left: 10px;
    font-size: 14px;
    font-weight: bold;
    color: white;
  }
}
</style>
