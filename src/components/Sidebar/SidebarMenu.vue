<script lang="ts" setup>
import path from 'path-browserify'
import { useAppStore } from '@/store'
import variables from '@/assets/styles/variables.module.scss'
import { isExternal } from '@/utils/index'

const props = defineProps({
  menuList: {
    required: true,
    default: () => {
      return []
    },
    type: Array<any>,
  },
  basePath: {
    type: String,
    required: true,
  },
})
const currentRoute = useRoute()
const appStore = useAppStore()

function resolvePath(routePath: string) {
  if (isExternal(routePath))
    return routePath

  if (isExternal(props.basePath))
    return props.basePath

  const fullPath = path.resolve(props.basePath, routePath)
  return fullPath
}
</script>

<template>
  <el-menu
    :default-active="currentRoute.path"
    :collapse="!appStore.sidebar.opened"
    :background-color="variables['menu-background']"
    :text-color="variables['menu-text']"
    :active-text-color="variables['menu-active-text']"
    :unique-opened="false"
    :collapse-transition="false"
    mode="vertical"
  >
    <SidebarMenuItem
      v-for="route in menuList"
      :key="route.path"
      :item="route"
      :base-path="resolvePath(route.path)"
      :is-collapse="!appStore.sidebar.opened"
    />
  </el-menu>
</template>

<style lang="scss" scoped>

</style>
