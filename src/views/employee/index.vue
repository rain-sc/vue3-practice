<script setup lang="ts">
import { getEmployeeListAPI } from '@/api/employee'
import type { EmployeeParamsType } from '@/api/employee/types'

const employeeParams = reactive<EmployeeParamsType>({
  page: 1,
  size: 10,
})

async function getEmployeeList() {
  try {
    const res = await getEmployeeListAPI(employeeParams)
    const resData = res.data.data
    console.log('res', resData)
  }
  catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  getEmployeeList()
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
