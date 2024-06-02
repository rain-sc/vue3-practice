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
    <Sidebar class="sidebar-container" />
    <div class="main-container">
      <div>
        <NavBar />
      </div>
      <AppMain />
    </div>
  </div>
</template>

<style scoped lang="scss">
.sidebar-container {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  width: $sidebar-width;
  background-color: $menu-background;
  transition: width 0.28s;

  :deep(.el-menu) {
    border: none;
  }
}

.main-container {
  position: relative;
  height: 100%;
  margin-left: $sidebar-width;
  overflow-y: auto;
  transition: margin-left 0.28s;

  .fixed-header {
    position: sticky;
    top: 0;
    z-index: 9;
    transition: width 0.28s;
  }
}

.hideSidebar {
  .main-container {
    margin-left: $sidebar-width-collapsed;
  }

  &.layout-top {
    .main-container {
      margin-left: 0;
    }
  }

  &.layout-mix {
    .fixed-header {
      left: $sidebar-width-collapsed;
    }

    .sidebar-container {
      width: 100% !important;
    }

    .mix-container {
      .mix-container__left {
        width: $sidebar-width-collapsed;
      }
    }
  }
}

.layout-left.hideSidebar {
  .sidebar-container {
    width: $sidebar-width-collapsed !important;
  }

  .main-container {
    margin-left: $sidebar-width-collapsed;
  }

  &.mobile {
    .sidebar-container {
      pointer-events: none;
      transition-duration: 0.3s;
      transform: translate3d(-210px, 0, 0);
    }

    .main-container {
      margin-left: 0;
    }
  }
}
</style>
