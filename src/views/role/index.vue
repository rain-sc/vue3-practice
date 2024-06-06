<script setup lang="ts">
import { getRoleListAPI } from '@/api/role'

const tableQuery = reactive<RSoleListParamsType>({
  page: '1',
  pagesize: '10',
})
async function getRoleList() {
  try {
    const res = await getRoleListAPI(tableQuery)
    const resData = res.data.data
    console.log(resData)
  }
  catch (error) {
    console.error(error)
  }
}
onMounted(() => {
  getRoleList()
})
</script>

<template>
  <div class="container">
    <div class="app-container">
      f
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
