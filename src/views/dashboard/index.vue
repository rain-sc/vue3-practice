<script setup lang="ts">
import { useUserStore } from '@/store'
import type { DashboardListType } from '@/api/dashboard/types'
import { getDashboardListAPI } from '@/api/dashboard'

defineOptions({
  name: 'Dashboard',
  inheritAttrs: false,
})

const dashboardList = ref<DashboardListType>()
const userStore = useUserStore()
const userProfile = userStore.userProfile

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
  <div class="dashboard">
    <div class="container p-4">
      <div>
        <div class="bg-[white] p-4">
          <div class="user-in flex items-center">
            <img :src="`${userProfile.staffPhoto}`" class="w-15 mr-2">
            <div class="text-sm">
              {{ userProfile.username }} | {{ userProfile.company }}-{{ userProfile.departmentName }}
            </div>
          </div>
          <div class="flex flex-wrap gap-x-4 mt-2">
            <count-to-item
              title="組織總人數"
              :total="dashboardList?.employeeTotal"
            />
            <count-to-item
              title="正式員工"
              :total="dashboardList?.regularEmployeeTotal"
            />
            <count-to-item
              title="合同待簽署"
              :total="dashboardList?.contractSignTotal"
            />
            <count-to-item
              title="待入職"
              :total="dashboardList?.toBeEmployed"
            />
            <count-to-item
              title="本月待轉正"
              :total="dashboardList?.toBeConfirmed"
            />
            <count-to-item
              title="本月待離職"
              :total="dashboardList?.toBeDismissed"
            />
            <count-to-item
              title="接口總訪問"
              :total="dashboardList?.interfaceAccessTotal"
            />
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- <div>
    <VCalendar transparent borderless />
  </div> -->
</template>

<style scoped>

</style>
