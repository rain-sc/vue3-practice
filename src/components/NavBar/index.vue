<script setup lang="ts">
import { ElMessageBox } from 'element-plus'
import { useAppStore, useUserStore } from '@/store'

const userStore = useUserStore()
const appStore = useAppStore()

const userProfile = userStore.userProfile
const visible = ref(false)

async function logout() {
  try {
    await userStore.logout()
  }
  catch (error) {
    console.error(error)
  }
  finally {
    visible.value = false
  }
}
function toggleSideBar() {
  appStore.toggleSidebar()
}
</script>

<template>
  <div class="navbar-container">
    <div class="flex">
      <hamburger
        :is-active="appStore.sidebar.opened"
        @toggle-click="toggleSideBar"
      />
      <breadcrumb />
    </div>
    <div class="flex items-center">
      <div class="flex-center h100% p10px">
        <img
          :src="`${userProfile.staffPhoto}`"
          class="rounded-full mr-10px w24px w24px"
        >
        <span>{{ userProfile.username }}</span>
      </div>

      <el-popover :visible="visible" placement="top" :width="160">
        <p>Are you sure logout?</p>
        <div style="text-align: right; margin: 0">
          <el-button size="small" text @click="visible = false">
            cancel
          </el-button>
          <el-button size="small" type="primary" @click="logout">
            confirm
          </el-button>
        </div>
        <template #reference>
          <el-icon @click="visible = true">
            <SwitchButton />
          </el-icon>
        </template>
      </el-popover>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.navbar-container {
  outline: 1px solid red;
  @apply flex-x-between;

  height: $navbar-height;
  background: var(--el-bg-color);
}
</style>
