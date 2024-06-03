<script setup lang="ts">
import type { RouteLocationMatched } from 'vue-router'
import { compile } from 'path-to-regexp'

const breadcrumbs = ref<RouteLocationMatched[]>([])
const route = useRoute()
const router = useRouter()

function getBreadcrumb() {
  let matched = route.matched.filter(
    item => item.meta && item.meta.title,
  )
  const first = matched[0]

  if (!isDashboard(first)) {
    matched = [
      { path: '/dashboard', meta: { title: 'Dashboard' } } as any,
    ].concat(matched)
  }
  breadcrumbs.value = matched.filter((item) => {
    return item.meta && item.meta.title && item.meta.breadcrumb !== false
  })
}

function isDashboard(route: RouteLocationMatched) {
  const name = route && route.name
  if (!name)
    return false

  return (
    name.toString().trim().toLocaleLowerCase()
    === 'Dashboard'.toLocaleLowerCase()
  )
}

function pathCompile(path: string) {
  const toPath = compile(path)
  return toPath(route.params)
}

function handleLink(item: RouteLocationMatched) {
  const { redirect, path } = item
  if (redirect) {
    router.push(redirect as string)
    return
  }
  router.push(pathCompile(path))
}

watch(() => route.path, (path) => {
  if (path.startsWith('/redirect/'))
    return

  getBreadcrumb()
})

onBeforeMount(() => {
  getBreadcrumb()
})
</script>

<template>
  <el-breadcrumb>
    <el-breadcrumb-item v-for="(item, index) in breadcrumbs" :key="item.path">
      <span v-if="item.redirect === 'noRedirect' || index === breadcrumbs.length - 1" class="no-redirect">
        {{ item.meta.title }}
      </span>
      <a v-else @click.prevent="handleLink(item)">
        {{ item.meta.title }}
      </a>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<style lang="scss" scoped>
.el-breadcrumb {
  line-height: var(--v3-navigationbar-height);
  .no-redirect {
    color: var(--el-text-color-placeholder);
  }
  a {
    font-weight: normal;
  }
}
</style>
