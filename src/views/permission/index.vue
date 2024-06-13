<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { addPermissionAPI, deleteCurrentPermissionAPI, getPermissionListAPI } from '@/api/permission'
import type { PermissionItemType } from '@/api/permission/types'
import { transListToTreeData } from '@/utils'

defineOptions({
  name: 'Permission',
  inheritAttrs: false,
})
const permissionList = ref<PermissionItemType[]>([])
const loading = ref(false)
const dialog = reactive({
  visible: false,
  title: '',
  loading: false,
  type: '',
  submitLoading: false,
})
const permissionData = ref<PermissionItemType>({
  name: '',
  code: '',
  description: '',
  type: '',
  pid: '',
  enVisible: '0',
})
const rules = reactive({
  name: [
    {
      required: true,
      message: '權限名稱不能為空',
      trigger: 'blur',
    },
  ],
  code: [
    {
      required: true,
      message: '權限標識不能為空',
      trigger: 'blur',
    },
  ],
})
const permissionFormRef = ref(ElForm)

async function getPermissionList() {
  loading.value = true
  try {
    const res = await getPermissionListAPI()
    const resData = res.data.data
    permissionList.value = transListToTreeData(resData!, 0)
  }
  catch (error) {
    console.error(error)
  }
  finally {
    loading.value = false
  }
}

function closeDialog() {
  permissionFormRef.value.resetFields()
  permissionFormRef.value.clearValidate()
  dialog.submitLoading = false
  dialog.title = ''
  dialog.type = ''
  dialog.visible = false
  permissionData.value = {
    name: '',
    code: '',
    description: '',
    type: '',
    pid: '',
    enVisible: '0',
  }
}

function submitForm() {
  permissionFormRef.value.validate(async (isValid: boolean) => {
    if (isValid) {
      dialog.submitLoading = true
      try {
        await addPermissionAPI(permissionData.value)
        ElMessage.success('新增成功')
      }
      catch (error) {
        console.error(error)
      }
      finally {
        dialog.submitLoading = false
        closeDialog()
        getPermissionList()
      }
    }
  })
}

function openDialog(dialogType: string, pid: number, type: number) {
  dialog.visible = true
  dialog.type = dialogType
  if (dialog.type === 'add') {
    dialog.title = '新增權限點'
    permissionData.value.pid = pid
    permissionData.value.type = type
  }
}

async function handleDeleteCurrentPermission(data: PermissionItemType) {
  try {
    await ElMessageBox.confirm('確認刪除該權限?', '警告', {
      confirmButtonText: '確定',
      cancelButtonText: '取消',
      type: 'warning',
    })
    await deleteCurrentPermissionAPI(data)
    ElMessage.success('刪除成功')
  }
  catch (error) {
    console.error(error)
  }
  finally {
    getPermissionList()
  }
}

onMounted(() => {
  getPermissionList()
})
</script>

<template>
  <div class="container">
    <div class="app-container">
      <el-button
        class="mb-4" type="primary"
        @click="openDialog('add', 0, 1)"
      >
        新增權限
      </el-button>
      <el-table
        v-loading="loading"
        :data="permissionList"
        default-expand-all
        row-key="id"
      >
        <el-table-column label="名稱" prop="name" />
        <el-table-column label="標識" prop="code" />
        <el-table-column label="描述" prop="description" />
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button
              v-if="row.type === 1"
              type="primary"
              link
              size="small"
              @click="openDialog('add', row.id, 2)"
            >
              新增
            </el-button>
            <el-button
              type="primary"
              link
              size="small"
            >
              編輯
            </el-button>
            <el-button
              type="primary"
              link
              size="small"
              @click="handleDeleteCurrentPermission(row)"
            >
              刪除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <ElDialog
        v-model="dialog.visible"
        custom-class="dialogLoading"
        :title="dialog.title"
        width="500px"
        append-to-body
        @close="closeDialog"
      >
        <el-form
          ref="permissionFormRef"
          :model="permissionData"
          label-width="100px"
          :rules="rules"
        >
          <el-form-item label="權限名稱" prop="name">
            <el-input v-model="permissionData.name" style="width:90%" />
          </el-form-item>
          <el-form-item label="權限標識" prop="code">
            <el-input v-model="permissionData.code" style="width:90%" />
          </el-form-item>
          <el-form-item label="權限描述">
            <el-input v-model="permissionData.description" style="width:90%" />
          </el-form-item>
          <el-form-item label="開啟">
            <el-switch
              v-model="permissionData.enVisible"
              active-value="1"
              inactive-value="0"
            />
          </el-form-item>
        </el-form>
        <template #footer>
          <div class="dialog-footer">
            <el-button
              type="primary"
              :loading="dialog.submitLoading"
              @click="submitForm"
            >
              确 定
            </el-button>
            <el-button @click="closeDialog">
              取 消
            </el-button>
          </div>
        </template>
      </ElDialog>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
