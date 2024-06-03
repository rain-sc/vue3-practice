<script setup lang="ts">
import path from 'path-browserify'
import type { RouteRecordRaw } from 'vue-router'
import { isExternal } from '@/utils/index'

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },

  basePath: {
    type: String,
    required: true,
  },
  isNest: {
    type: Boolean,
    default: false,
  },
})

const onlyOneChild = ref()

function resolvePath(routePath: string) {
  if (isExternal(routePath))
    return routePath

  if (isExternal(props.basePath))
    return props.basePath

  const fullPath = path.resolve(props.basePath, routePath)
  return fullPath
}

function hasOneShowingChild(
  children: RouteRecordRaw[] = [],
  parent: RouteRecordRaw,
) {
  const showingChildren = children.filter((route: RouteRecordRaw) => {
    if (route.meta?.hidden) {
      return false
    }
    else {
      route.meta!.hidden = false
      onlyOneChild.value = route
      return true
    }
  })

  if (showingChildren.length === 1)
    return true

  if (showingChildren.length === 0) {
    onlyOneChild.value = { ...parent, path: '', noShowingChildren: true }
    return true
  }
  return false
}
</script>

<template>
  <div v-if="!item.meta || !item.meta.hidden">
    <template
      v-if="
        hasOneShowingChild(item.children, item as RouteRecordRaw)
          && (!onlyOneChild.children || onlyOneChild.noShowingChildren)
          && !item.meta?.alwaysShow
      "
    >
      <AppLink
        v-if="onlyOneChild.meta"
        :to="{
          path: resolvePath(onlyOneChild.path),
          query: onlyOneChild.meta.params,
        }"
      >
        <el-menu-item
          :index="resolvePath(onlyOneChild.path)"
          :class="{ 'submenu-title-noDropdown': !isNest }"
        >
          <SidebarMenuItemTitle
            :icon="onlyOneChild.meta.icon || (item.meta && item.meta.icon)"
            :title="onlyOneChild.meta.title"
          />
        </el-menu-item>
      </AppLink>
    </template>
  </div>
</template>

<style lang="scss">
.hideSidebar {
  .submenu-title-noDropdown {
    position: relative;
    padding: 0 !important;

    .el-tooltip {
      padding: 0 !important;

      .sub-el-icon {
        margin-left: 19px;
      }
    }

    & > span {
      display: inline-block;
      width: 0;
      height: 0;
      overflow: hidden;
      visibility: hidden;
    }
  }

  .el-sub-menu {
    overflow: hidden;

    & > .el-sub-menu__title {
      padding: 0 !important;

      .sub-el-icon {
        margin-left: 19px;
      }

      .el-sub-menu__icon-arrow {
        display: none;
      }
    }
  }

  .el-menu--collapse {
    width: $sidebar-width-collapsed;

    .el-sub-menu {
      & > .el-sub-menu__title {
        & > span {
          display: inline-block;
          width: 0;
          height: 0;
          overflow: hidden;
          visibility: hidden;
        }
      }
    }
  }
}

.el-menu-item:hover {
  background-color: $menu-hover;
}
</style>
