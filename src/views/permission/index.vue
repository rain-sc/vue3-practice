<script setup lang="ts">
import { getPermissionListAPI } from '@/api/permission'
import type { PermissionItemType } from '@/api/permission/types'

defineOptions({
  name: 'Permission',
  inheritAttrs: false,
})
const permissionList = ref<PermissionItemType[]>([])
const loading = ref(false)

async function getPermissionList() {
  loading.value = true
  try {
    const res = await getPermissionListAPI()
    const resData = res.data.data
    permissionList.value = resData!
  }
  catch (error) {
    console.error(error)
  }
  finally {
    loading.value = false
  }
}

onMounted(() => {
  getPermissionList()
})
</script>

<template>
  <div class="container">
    <div class="app-container">
      <el-button class="mb-4" type="primary">
        新增權限
      </el-button>
      <el-table
        v-loading="loading"
        :data="permissionList"
      >
        <el-table-column label="名稱" prop="name" />
        <el-table-column label="標識" prop="code" />
        <el-table-column label="描述" prop="description" />
        <el-table-column label="操作">
          <el-button>
            新增
          </el-button>
          <el-button>
            編輯
          </el-button>
          <el-button>
            刪除
          </el-button>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
