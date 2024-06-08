<script setup lang="ts">
import { getEmployeeListAPI } from '@/api/employee'
import type { EmployeeParamsType } from '@/api/employee/types'
import useDepartmentList from '@/hooks/useDepartmentList'

const employeeParams = reactive<EmployeeParamsType>({
  page: 1,
  size: 10,
})
const departmentTreeRef = ref(ElTree)
const { getDepartmentList, departmentList, departmentQueryPrams } = useDepartmentList()

async function getEmployeeList() {
  try {
    const res = await getEmployeeListAPI(employeeParams)
    const resData = res.data.data
    console.log(resData)
  }
  catch (error) {
    console.error(error)
  }
}

function currentChange(node: any) {
  Object.assign(departmentQueryPrams, { departmentId: node.id })
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
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">

</style>
