<script setup lang="ts">
import { getRoleListAPI } from '@/api/role'
import type { RoleItemType, RoleListParamsType } from '@/api/role/types'
import { State } from '@/enums/TableEnum'

defineOptions({
  name: 'Role',
  inheritAttrs: false,
})
const tableQueryParams = reactive<RoleListParamsType>({
  page: 1,
  pagesize: 10,
})
const roleList = ref<RoleItemType[]>([])
const loading = ref(false)
const roleTableRef = ref(ElForm)
const listTotal = ref<number>(0)

async function getRoleList() {
  loading.value = true
  try {
    const res = await getRoleListAPI(tableQueryParams)
    const resData = res.data.data
    roleList.value = resData!.rows
    listTotal.value = resData!.total
  }
  catch (error) {
    console.error(error)
  }
  finally {
    loading.value = false
  }
}

function openMenuDialog() {

}

function openDialog() {

}

function handleDelete() {

}

onMounted(() => {
  getRoleList()
})
</script>

<template>
  <div class="container">
    <div class="app-container">
      <el-card shadow="never" class="table-container">
        <el-table
          ref="roleTableRef"
          v-loading="loading"
          :data="roleList"
          highlight-current-row
          border
        >
          <el-table-column prop="name" align="center" width="200" label="角色" />
          <el-table-column
            align="center" width="200" label="啟用"
          >
            <template #default="scope">
              <span>
                {{ scope.row.state === State.ENABLED ? '已啟用'
                  : scope.row.state === State.DISABLED ? '未啟用'
                    : '無' }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="description" align="center" label="描述" />
          <el-table-column fixed="right" label="操作" width="220">
            <template #default="scope">
              <el-button
                type="primary"
                size="small"
                link
                @click="openMenuDialog(scope.row)"
              >
                <el-icon><Position /></el-icon>分配权限
              </el-button>
              <el-button
                type="primary"
                size="small"
                link
                @click="openDialog(scope.row.id)"
              >
                <el-icon><Edit /></el-icon>编辑
              </el-button>
              <el-button
                type="primary"
                size="small"
                link
                @click="handleDelete(scope.row.id)"
              >
                <el-icon><Delete /></el-icon>删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination
          v-if="listTotal > 0"
          v-model:total="listTotal"
          v-model:page="tableQueryParams.page"
          v-model:limit="tableQueryParams.pagesize"
          layout="total, prev, pager, next"
          @pagination="getRoleList"
        />
      </el-card>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
