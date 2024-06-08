<script setup lang="ts">
import { getEmployeeListAPI } from '@/api/employee'
import type { EmployeeParamsType } from '@/api/employee/types'
import type { DepartmentListType } from '@/api/department/types'
import useDepartmentList from '@/hooks/useDepartmentList'

const employeeParams = reactive<EmployeeParamsType>({
  page: 1,
  size: 10,
})
// const departmentList = reactive<DepartmentListType[]>([])
const departmentTreeRef = ref(ElTree)

const { getDepartmentList, departmentList } = useDepartmentList()
// async function getEmployeeList() {
//   try {
//     const res = await getEmployeeListAPI(employeeParams)
//     const resData = res.data.data
//   }
//   catch (error) {
//     console.error(error)
//   }
// }

onMounted(() => {
  // getEmployeeList()
  getDepartmentList()
})
</script>

<template>
  <div class="container">
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
              :props="{ children: 'children', label: 'label', disabled: '' }"
              :expand-on-click-node="false"
              default-expand-all
              highlight-current
              class="mt-2"
              :data="departmentList"
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
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
