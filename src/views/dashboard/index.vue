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
function chartComponent(item: string) {
  return defineAsyncComponent(() => import(`../../components/Charts/${item}.vue`))
}

const socialInsuranceOptions = computed(() => {
  return {
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: dashboardList.value?.socialInsurance.xAxis,
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: dashboardList.value?.socialInsurance.yAxis,
        type: 'line',
        areaStyle: {
          color: '#04c9be',
        },
        lineStyle: {
          color: '#04c9be',
        },
      },
    ],
  }
})
const providentFundOptions = computed(() => {
  return {
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: dashboardList.value?.providentFund.xAxis,
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: dashboardList.value?.providentFund.yAxis,
        type: 'line',
        areaStyle: {
          color: '#04c9be',
        },
        lineStyle: {
          color: '#04c9be',
        },
      },
    ],
  }
})

onMounted(() => {
  getDashboardList()
})
</script>

<template>
  <div class="dashboard">
    <div class="container p-4">
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
      <div class="mt-2">
        <component
          :is="chartComponent('Line')"
          id="socialInsuranceLine"
          height="270px"
          width="100%"
          :options="socialInsuranceOptions"
          title="社保申報數據"
          :declaration-total="dashboardList?.socialInsurance.declarationTotal"
          :to-declare-total="dashboardList?.socialInsurance.toDeclareTotal"
          :declaring-total="dashboardList?.socialInsurance.declaringTotal"
          :declared-total="dashboardList?.socialInsurance.declaredTotal"
        />
      </div>
      <div class="mt-2">
        <component
          :is="chartComponent('Line')"
          id="providentFundLine"
          height="100%"
          width="100%"
          :options="providentFundOptions"
          title="公益金申報數據"
          :declaration-total="dashboardList?.providentFund.declarationTotal"
          :to-declare-total="dashboardList?.providentFund.toDeclareTotal"
          :declaring-total="dashboardList?.providentFund.declaringTotal"
          :declared-total="dashboardList?.providentFund.declaredTotal"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
