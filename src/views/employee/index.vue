<script setup lang="ts">
import { getEmployeeListAPI } from '@/api/employee'
import type { EmployeeItemType, EmployeeListBaseType, EmployeeParamsType } from '@/api/employee/types'
import useDepartmentList from '@/hooks/useDepartmentList'
import { employmentTypes } from '@/enums/TableEnum'

const departmentTreeRef = ref(ElTree)
const { getDepartmentList, departmentList } = useDepartmentList()
const employeeList = ref<EmployeeItemType[]>([])
const employeeParams = reactive<EmployeeParamsType>({
  page: 1,
  size: 10,
  departmentId: null,
  keyword: '',
})
const loading = ref(false)
const employeeTotal = ref<number>(0)
async function getEmployeeList() {
  loading.value = true
  try {
    const res = await getEmployeeListAPI(employeeParams)
    const resData = res.data.data!
    employeeList.value = resData.rows
    employeeTotal.value = resData.total
  }
  catch (error) {
    console.error(error)
  }
  finally {
    loading.value = false
  }
}

async function currentChange(node: any) {
  Object.assign(employeeParams, { departmentId: node.id, page: 1 })
  await getEmployeeList()
}
onMounted(() => {
  getEmployeeList()
  getDepartmentList()
})
</script>

<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :lg="4" :xs="24" class="mb-[12px]">
        <el-card shadow="never">
          <el-input
            type="text"
            size="small"
            placeholder="輸入員工姓名"
          >
            <template #prefix>
              <el-icon><Search /></el-icon>
            </template>
          </el-input>
          <el-tree
            ref="departmentTreeRef"
            :props="{ children: 'children', label: 'name', disabled: '' }"
            :expand-on-click-node="false"
            default-expand-all
            highlight-current
            class="mt-2"
            :data="departmentList"
            node-key="id"
            @current-change="currentChange"
          />
        </el-card>
      </el-col>

      <el-col :lg="20" :xs="24">
        <div class="search-container">
          <el-row class="opeate-tools" type="flex" justify="end">
            <el-button type="primary">
              新增員工
            </el-button>
            <el-button>
              excel導入
            </el-button>
            <el-button>
              excel導出
            </el-button>
          </el-row>
        </div>
        <el-card shadow="never" class="table-container">
          <el-table
            v-loading="loading"
            :data="employeeList"
            @selection-change="handleSelectionChange"
          >
            <el-table-column prop="staffPhoto" align="center" label="頭像">
              <template #default="{ row }">
                <el-avatar :src="row.staffPhoto" :size="30" />
              </template>
            </el-table-column>
            <el-table-column prop="username" label="姓名" />
            <el-table-column prop="mobile" label="手機號碼" sortable />
            <el-table-column prop="workNumber" label="員工編號" sortable />
            <el-table-column prop="formOfEmployment" label="聘用形式">
              <template #default="{ row }">
                <span v-if="row.formOfEmployment === employmentTypes.regular">正式</span>
                <span v-else-if="row.formOfEmployment === employmentTypes.probationary">非正式</span>
                <span v-else>無</span>
              </template>
            </el-table-column>
            <el-table-column prop="departmentName" label="部門" />
            <el-table-column prop="timeOfEntry" label="入職時間" sortable />
          </el-table>
          <pagination
            v-if="employeeTotal > 0"
            v-model:total="employeeTotal"
            v-model:page="employeeParams.page"
            v-model:limit="employeeParams.size"
            layout="prev, pager, next"
            @pagination="getEmployeeList"
          />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">

</style>
