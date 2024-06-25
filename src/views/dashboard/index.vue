<script setup lang="ts">
import { getDashboardListAPI } from '@/api/dashboard'

defineOptions({
  name: 'Dashboard',
  inheritAttrs: false,
})
const dashboardList = ref()

async function getDashboardList() {
  try {
    const res = await getDashboardListAPI()
    dashboardList.value = res.data.data
  }
  catch (error) {
    console.error(error)
  }
}
onMounted(() => {
  getDashboardList()
})
</script>

<template>
  <div>
    dashboard
  </div>
</template>

<style scoped>

</style>
