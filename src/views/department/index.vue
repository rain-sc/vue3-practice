<script setup lang="ts">
import { getDepartmentListAPI } from '@/api/department'
import type { DepartmentListType } from '@/api/department/types'

defineOptions({
  name: 'Department',
  inheritAttrs: false,
})

const departmentList = ref<DepartmentListType[]>([])
const loading = ref<boolean>(false)

async function getDepartmentList() {
  try {
    loading.value = true
    const { data } = await getDepartmentListAPI()
    departmentList.value = transListToTreeData(data.data, 0)
  }
  catch (error) {
    console.error(error)
  }
  finally {
    loading.value = false
  }
}

function transListToTreeData(list: DepartmentListType[], rootValue: number) {
  const treeArray: DepartmentListType[] = []
  list.forEach((item) => {
    if (item.pid === rootValue) {
      const children = transListToTreeData(list, item.id)
      if (children.length)
        item.children = children
      treeArray.push(item)
    }
  })
  return treeArray
}
onMounted(() => {
  getDepartmentList()
})
</script>

<template>
  <div class="app-container">
    <el-card shadow="never" class="table-container">
      <el-table
        v-loading="loading"
        border
        :data="departmentList"
        row-key="id"
        default-expand-all
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column prop="name" label="Departments" min-width="150" />
        <el-table-column prop="managerName" label="Position" min-width="150" />
        <el-table-column label="Actions" fixed="right" align="left" min-width="130">
          <template #default="scope">
            <ElButton
              type="primary"
            >
              新增
            </ElButton>
            <ElButton
              type="success"
            >
              編輯
            </ElButton>
            <ElButton
              type="danger"
            >
              刪除
            </ElButton>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<style scoped lang="scss">

</style>
