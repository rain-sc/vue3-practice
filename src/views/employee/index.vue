<script setup lang="ts">
import FileSaver from 'file-saver'
import { exportEmployeeListAPI, getEmployeeListAPI } from '@/api/employee'
import type { EmployeeItemType, EmployeeListBaseType, EmployeeParamsType } from '@/api/employee/types'
import useDepartmentList from '@/hooks/useDepartmentList'
import { employmentTypes } from '@/enums/TableEnum'

defineOptions({
  name: 'Employee',
  inheritAttrs: false,
})
const { getDepartmentList, departmentList, departmentId } = useDepartmentList()
const employeeList = ref<EmployeeItemType[]>([])
const employeeQueryParams = reactive<EmployeeParamsType>({
  page: 1,
  size: 10,
  departmentId: null,
  keyword: '',
})
const loading = ref(false)
const employeeTotal = ref<number>(0)
const departmentTreeRef = ref(ElTree)

async function getEmployeeList() {
  loading.value = true
  try {
    const res = await getEmployeeListAPI(employeeQueryParams)
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
  Object.assign(employeeQueryParams, { departmentId: node.id, page: 1 })
  await getEmployeeList()
}

async function handleSearchEmployeeList() {
  Object.assign(employeeQueryParams, { page: 1 })
  await getEmployeeList()
}

async function handleExportEmployeeList() {
  try {
    const res = await exportEmployeeListAPI()
    FileSaver.saveAs(res.data, 'employee.xlsx')
  }
  catch (error) {
    console.error(error)
  }
}

onMounted(async () => {
  await getDepartmentList()
  await departmentTreeRef.value.setCurrentKey(departmentId.value)
  await getEmployeeList()
})
</script>

<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :lg="4" :xs="24" class="mb-[12px]">
        <el-card shadow="never">
          <el-input
            v-model="employeeQueryParams.keyword"
            type="text"
            size="small"
            placeholder="輸入員工姓名"
            @input="handleSearchEmployeeList"
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
            :highlight-current="true"
            class="mt-2"
            :data="departmentList"
            node-key="id"
            :current-node-key="departmentId"
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
            <el-button @click="handleExportEmployeeList">
              excel導出
            </el-button>
          </el-row>
        </div>
        <el-card shadow="never" class="table-container">
          <el-table
            v-loading="loading"
            :data="employeeList"
          >
            <el-table-column prop="staffPhoto" align="center" label="頭像">
              <template #default="{ row }">
                <el-avatar v-if="row.staffPhoto" :src="row.staffPhoto" :size="30" />
                <span v-else class="username">{{ row.username?.charAt(0) }}</span>
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
            v-model:page="employeeQueryParams.page"
            v-model:limit="employeeQueryParams.size"
            layout="prev, pager, next"
            @pagination="getEmployeeList"
          />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">
.username{
  display: inline-block;
  height: 30px;
  width: 30px;
  line-height: 30px;
  text-align: center;
  border-radius: 50%;
  color: #fff;
  background: #04c9be;
  font-size: 12px;
}
</style>
